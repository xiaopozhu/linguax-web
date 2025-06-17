import React, { useState } from 'react';
import styles from './styles.module.css';

// 定义API响应类型
interface LicenseCreateTempResp {
  licenseKey: string;
}

interface ApiResponse {
  code: number;
  data: any;
  error: string;
}

interface LicenseCreateTempReq {
  email: string;
  days: number;
}

export default function LinguaXFeatures(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [days, setDays] = useState(7);
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // 解析XML并获取最新版本下载链接
  const handleDownload = async () => {
    try {
      setDownloadLoading(true);
      setError('');
      
      // 获取XML内容
      const response = await fetch('https://st.deepzz.com/linguax/appcast.xml');
      const xmlText = await response.text();
      
      // 解析XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // 获取第一个item的enclosure url
      const firstItem = xmlDoc.querySelector('item');
      const enclosure = firstItem?.querySelector('enclosure');
      const downloadUrl = enclosure?.getAttribute('url');
      
      if (downloadUrl) {
        // 创建下载链接
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError('无法获取下载链接');
      }
    } catch (err) {
      setError('获取下载链接失败: ' + (err as Error).message);
    } finally {
      setDownloadLoading(false);
    }
  };

  // 创建临时License
  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || days < 1 || days > 30) {
      setError('请输入有效的邮箱和天数(1-30天)');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setLicenseKey('');

      const requestBody: LicenseCreateTempReq = {
        email,
        days
      };

      const response = await fetch('/app-api/linguax/license/temp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data: ApiResponse = await response.json();

      if (data.code === 0) {
        const licenseData = data.data as LicenseCreateTempResp;
        setLicenseKey(licenseData.licenseKey);
      } else {
        setError(data.error || '创建License失败');
      }
    } catch (err) {
      setError('请求失败: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <h2>立即体验 LinguaX</h2>
          <p>开始您的智能输入法切换之旅，让工作更高效</p>
        </div>
        <div className="row">
          {/* 下载功能 */}
          <div className={`col col--6 ${styles.feature}`}>
            <div className="text--center">
              <h3>🚀 免费下载</h3>
              <p>下载最新版本的 LinguaX 应用，支持 macOS 10.14+ 及 Apple Silicon</p>
              <button 
                className="button button--primary button--lg"
                onClick={handleDownload}
                disabled={downloadLoading}
              >
                {downloadLoading ? '获取下载链接中...' : '下载最新版本'}
              </button>
            </div>
          </div>

          {/* License创建功能 */}
          <div className={`col col--6 ${styles.feature}`}>
            <div className="text--center">
              <h3>🔑 获取试用许可</h3>
              <p>创建临时 License 密钥，免费试用 LinguaX 完整功能</p>
              <form onSubmit={handleCreateLicense} className={styles.licenseForm}>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    placeholder="请输入邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="number"
                    placeholder="天数 (1-30)"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                    min="1"
                    max="30"
                    required
                    className={styles.input}
                  />
                </div>
                <button 
                  type="submit" 
                  className="button button--secondary button--lg"
                  disabled={loading}
                >
                  {loading ? '创建中...' : '创建 License'}
                </button>
              </form>

              {/* 显示结果 */}
              {licenseKey && (
                <div className={styles.success}>
                  <h4>License 创建成功！</h4>
                  <div className={styles.licenseKey}>
                    <code>{licenseKey}</code>
                  </div>
                  <button 
                    className="button button--outline button--sm"
                    onClick={() => navigator.clipboard.writeText(licenseKey)}
                  >
                    复制 License
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
} 