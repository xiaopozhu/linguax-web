import { useState, useCallback, useEffect } from 'react';

// 类型定义
interface ReleaseInfo {
  version?: string;
  downloadUrl?: string;
  title?: string;
  releaseDate?: string;
}

interface UseDownloadReturn {
  loading: boolean;
  error: string;
  releaseInfo: ReleaseInfo | null;
  handleDownload: () => Promise<boolean>;
}

interface GlobalReleaseState {
  releaseInfo: ReleaseInfo | null;
  loading: boolean;
  error: string;
  fetchPromise: Promise<void> | null;
}

// 全局缓存状态
let globalState: GlobalReleaseState = {
  releaseInfo: null,
  loading: false,
  error: '',
  fetchPromise: null,
};

// 订阅者列表，用于通知状态更新
const subscribers = new Set<() => void>();

// 通知所有订阅者状态更新
const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

// 工具函数
const parseXMLForReleaseInfo = (xmlText: string): ReleaseInfo | null => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // 检查解析错误
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML 解析失败');
    }
    
    const firstItem = xmlDoc.querySelector('item');
    if (!firstItem) {
      throw new Error('无法找到 item 元素');
    }

    const enclosure = firstItem.querySelector('enclosure');
    const title = firstItem.querySelector('title')?.textContent;
    const pubDate = firstItem.querySelector('pubDate')?.textContent;
    const downloadUrl = enclosure?.getAttribute('url');

    if (!downloadUrl) {
      throw new Error('无法找到下载链接');
    }

    // 解析主版本号和构建号（使用命名空间）
    const SPARKLE_NS = 'http://www.andymatuschak.org/xml-namespaces/sparkle';
    const shortVersion = firstItem.getElementsByTagNameNS(SPARKLE_NS, 'shortVersionString')[0]?.textContent;
    const buildNumber = firstItem.getElementsByTagNameNS(SPARKLE_NS, 'version')[0]?.textContent;
    console.log(title, shortVersion, buildNumber);
    // 组合显示
    let version = shortVersion || title;
    if (version && buildNumber) {
      version = `${version} (${buildNumber})`;
    }

    return {
      version,
      downloadUrl,
      title: title || undefined,
      releaseDate: pubDate || undefined,
    };
  } catch (error) {
    console.error('XML parsing error:', error);
    return null;
  }
};

// 全局获取版本信息函数
const fetchGlobalReleaseInfo = async (): Promise<void> => {
  // 如果已经在加载中，返回现有的 Promise
  if (globalState.fetchPromise) {
    return globalState.fetchPromise;
  }

  // 如果已经有缓存的数据，直接返回
  if (globalState.releaseInfo && !globalState.error) {
    return Promise.resolve();
  }

  globalState.fetchPromise = (async () => {
    try {
      globalState.loading = true;
      globalState.error = '';
      notifySubscribers();
      
      const response = await fetch('https://st.deepzz.com/linguax/appcast.xml', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/xml, text/xml, */*'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const xmlText = await response.text();
      const info = parseXMLForReleaseInfo(xmlText);
      
      if (!info) {
        throw new Error('无法从服务器响应中解析版本信息');
      }
      
      globalState.releaseInfo = info;
      globalState.error = '';
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取版本信息失败，请稍后重试';
      globalState.error = errorMessage;
      globalState.releaseInfo = null;
    } finally {
      globalState.loading = false;
      globalState.fetchPromise = null;
      notifySubscribers();
    }
  })();

  return globalState.fetchPromise;
};

// 页面加载时自动获取版本信息
export const initializeReleaseInfo = () => {
  if (typeof window !== 'undefined') {
    fetchGlobalReleaseInfo().catch(console.error);
  }
};

// 自定义Hook: 下载功能
export const useDownload = (): UseDownloadReturn => {
  const [, forceUpdate] = useState({});

  // 强制组件重新渲染
  const triggerRerender = useCallback(() => {
    forceUpdate({});
  }, []);

  // 订阅全局状态变化
  useEffect(() => {
    subscribers.add(triggerRerender);
    return () => {
      subscribers.delete(triggerRerender);
    };
  }, [triggerRerender]);

  // 组件挂载时尝试获取版本信息（如果还没有的话）
  useEffect(() => {
    if (!globalState.releaseInfo && !globalState.loading && !globalState.fetchPromise) {
      fetchGlobalReleaseInfo().catch(console.error);
    }
  }, []);

  const handleDownload = useCallback(async (): Promise<boolean> => {
    try {
      // 确保有版本信息
      if (!globalState.releaseInfo) {
        await fetchGlobalReleaseInfo();
      }

      if (!globalState.releaseInfo?.downloadUrl) {
        throw new Error('无法获取下载链接');
      }
      
      // 创建并触发下载
      const link = document.createElement('a');
      link.href = globalState.releaseInfo.downloadUrl;
      link.download = '';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      try {
        link.click();
        return true;
      } finally {
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Download error:', err);
      return false;
    }
  }, []);

  return { 
    loading: globalState.loading, 
    error: globalState.error, 
    releaseInfo: globalState.releaseInfo, 
    handleDownload 
  };
}; 