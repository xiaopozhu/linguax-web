import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// 类型定义
interface ApiResponse {
  code: number;
  data: any;
  error: string;
}

interface LicenseCreateReq {
  email: string;
  days: number;
  lang: string;
}

interface ToastMessage {
  type: 'success' | 'error' | 'info';
  message: string;
  id: string;
}

// 工具函数
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

const parseXMLForDownloadUrl = (xmlText: string): string | null => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // 检查解析错误
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML 解析失败');
    }
    
    const firstItem = xmlDoc.querySelector('item');
    const enclosure = firstItem?.querySelector('enclosure');
    return enclosure?.getAttribute('url') || null;
  } catch (error) {
    console.error('XML parsing error:', error);
    return null;
  }
};

// 自定义Hook: 下载功能
const useDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');
      
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
      const downloadUrl = parseXMLForDownloadUrl(xmlText);
      
      if (!downloadUrl) {
        throw new Error('无法从服务器响应中找到下载链接');
      }
      
      // 创建并触发下载
      const link = document.createElement('a');
      link.href = downloadUrl;
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
      const errorMessage = err instanceof Error ? err.message : '下载失败，请稍后重试';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, handleDownload };
};

// 自定义Hook: License创建功能
const useLicenseCreation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [licenseKey, setLicenseKey] = useState('');

  const createLicense = useCallback(async (email: string, days: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');
      setLicenseKey('');

      const requestBody: LicenseCreateReq = { email, days, lang: "zh-cn" };

      const response = await fetch('/app-api/linguax/admin/license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status / 100 === 5) {
        throw new Error(`HTTP ${response.status}: 服务器响应异常`);
      }

      const data: ApiResponse = await response.json();

      if (data.code === 0) {
        // License 已发送到邮箱，无需在前端处理 licenseKey
        setLicenseKey('success'); // 标记成功状态
        return true;
      } else {
        throw new Error(data.error || '创建License失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '请求失败，请检查网络连接';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetLicense = useCallback(() => {
    setLicenseKey('');
    setError('');
  }, []);

  return { loading, error, licenseKey, createLicense, resetLicense };
};

// Toast 通知组件
const Toast: React.FC<{ toast: ToastMessage; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className={`${styles.toast} ${styles[`toast--${toast.type}`]}`} role="alert">
      <span>{toast.message}</span>
      <button 
        className={styles.toastClose}
        onClick={() => onClose(toast.id)}
        aria-label="关闭通知"
      >
        ×
      </button>
    </div>
  );
};

// 主组件
export default function LinguaXFeatures(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [days, setDays] = useState(7);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const daysInputRef = useRef<HTMLInputElement>(null);
  
  const { loading: downloadLoading, error: downloadError, handleDownload } = useDownload();
  const { loading: licenseLoading, error: licenseError, licenseKey, createLicense, resetLicense } = useLicenseCreation();

  // Toast 管理
  const addToast = useCallback((type: ToastMessage['type'], message: string) => {
    const toast: ToastMessage = { type, message, id: generateId() };
    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // 下载处理
  const onDownloadClick = useCallback(async () => {
    const success = await handleDownload();
    if (success) {
      addToast('success', '下载已开始，请查看您的下载文件夹');
    }
  }, [handleDownload, addToast]);

  // 表单验证和提交
  const validateForm = useCallback((): { isValid: boolean; errorMessage?: string } => {
    if (!email.trim()) {
      return { isValid: false, errorMessage: '请输入邮箱地址' };
    }
    if (!isValidEmail(email)) {
      return { isValid: false, errorMessage: '请输入有效的邮箱地址' };
    }
    if (days < 1 || days > 30) {
      return { isValid: false, errorMessage: '试用天数必须在 1-30 天之间' };
    }
    return { isValid: true };
  }, [email, days]);

  const handleCreateLicense = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      addToast('error', validation.errorMessage!);
      return;
    }

    const success = await createLicense(email, days);
    if (success) {
      addToast('success', 'License 创建成功！许可文件已发送至您的邮箱');
    }
  }, [email, days, validateForm, createLicense, addToast]);

  // 重置表单
  const handleReset = useCallback(() => {
    setEmail('');
    setDays(30);
    resetLicense();
  }, [resetLicense]);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCreateLicense(e as any);
    }
  }, [handleCreateLicense]);

  return (
    <section className={styles.features} role="region" aria-labelledby="features-heading">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>🚀 体验中心</span>
          </div>
          <h2 id="features-heading" className={styles.sectionTitle}>
            立即体验 LinguaX
            <br />
            <span className={styles.titleAccent}>让工作更高效的状态栏体验</span>
          </h2>
          <p className={styles.sectionDescription}>
            下载应用并创建试用许可，开始您的智能输入法切换之旅，
            体验状态栏原生应用的轻量与高效。
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {/* 下载功能 */}
          <div className={styles.featureCard}>
            <div className={styles.cardHeader}>
              <div className={styles.featureIcon}>🚀</div>
              <div className={styles.featureHighlight}>免费下载</div>
            </div>
            <div className={styles.cardContent}>
              <h3>免费下载</h3>
              <p>下载最新版本的 LinguaX 应用，支持 macOS 13.0+ 及 Apple Silicon</p>
                              <button 
                  className={`${styles.button} ${styles['button--primary']}`}
                  onClick={onDownloadClick}
                  disabled={downloadLoading}
                  aria-describedby={downloadError ? 'download-error' : undefined}
                  type="button"
                >
                {downloadLoading ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true"></span>
                    获取下载链接中...
                  </>
                ) : (
                  '下载最新版本'
                )}
              </button>
              {downloadError && (
                <div id="download-error" className={styles.errorInline} role="alert">
                  {downloadError}
                </div>
              )}
            </div>
            <div className={styles.cardGlow}></div>
          </div>

          {/* License创建功能 */}
          <div className={styles.featureCard}>
            <div className={styles.cardHeader}>
              <div className={styles.featureIcon}>🔑</div>
              <div className={styles.featureHighlight}>试用许可</div>
            </div>
            <div className={styles.cardContent}>
              <h3>创建试用许可</h3>
              <p>创建临时 License 密钥，免费试用 LinguaX 完整功能</p>
              
              <form 
                onSubmit={handleCreateLicense} 
                className={styles.licenseForm}
                noValidate
                onKeyDown={handleKeyDown}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="email-input" className="sr-only">
                    邮箱地址
                  </label>
                  <input
                    id="email-input"
                    ref={emailInputRef}
                    type="email"
                    placeholder="请输入邮箱地址"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    aria-describedby="email-help"
                    autoComplete="email"
                  />
                  <small id="email-help" className={styles.helpText}>
                    License 许可文件将发送至此邮箱
                  </small>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="days-input" className="sr-only">
                    试用天数
                  </label>
                  <input
                    id="days-input"
                    ref={daysInputRef}
                    type="number"
                    placeholder="试用天数 (1-30)"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="30"
                    required
                    className={styles.input}
                    aria-describedby="days-help"
                  />
                  <small id="days-help" className={styles.helpText}>
                    可选择 1-30 天的试用期
                  </small>
                </div>
                
                                  <div className={styles.buttonGroup}>
                    <button 
                      type="submit" 
                      className={`${styles.button} ${styles['button--secondary']}`}
                      disabled={licenseLoading}
                      aria-describedby={licenseError ? 'license-error' : undefined}
                    >
                      {licenseLoading ? (
                        <>
                          <span className={styles.spinner} aria-hidden="true"></span>
                          创建中...
                        </>
                      ) : (
                        '创建 License'
                      )}
                    </button>
                    
                    {(licenseKey || licenseError) && (
                      <button 
                        type="button"
                        className={`${styles.button} ${styles['button--outline']}`}
                        onClick={handleReset}
                        aria-label="重置表单"
                      >
                        重新创建
                      </button>
                    )}
                </div>
                
                <div className={styles.helpText}>
                  💡 提示：按 Ctrl+Enter 快速提交
                </div>
              </form>

              {/* License 成功结果 */}
              {licenseKey && (
                <div className={styles.success} role="region" aria-labelledby="success-heading">
                  <h4 id="success-heading">🎉 License 创建成功！</h4>
                  <p>许可文件已发送至您的邮箱：<strong>{email}</strong></p>
                  <div className={styles.licenseInstructions}>
                    <p>📝 使用说明：</p>
                    <ol>
                      <li>下载并安装 LinguaX 应用</li>
                      <li>查收邮箱中的 license.linguaxlicense 文件</li>
                      <li>双击 license 文件完成激活</li>
                      <li>开始享受智能输入法切换功能</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* License 错误信息 */}
              {licenseError && (
                <div id="license-error" className={styles.errorInline} role="alert">
                  {licenseError}
                </div>
              )}
            </div>
            <div className={styles.cardGlow}></div>
          </div>
        </div>

        {/* Toast 通知 */}
        <div className={styles.toastContainer} role="region" aria-live="polite" aria-label="通知消息">
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </div>
      </div>
    </section>
  );
} 