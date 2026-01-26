import React, { useState, useCallback, useRef, useEffect } from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDownload } from '../../hooks/useDownload';
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



// 自定义Hook: License创建功能
const useLicenseCreation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [licenseKey, setLicenseKey] = useState('');

  const createLicense = useCallback(async (email: string, days: number, lang: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');
      setLicenseKey('');

      const requestBody: LicenseCreateReq = { email, days, lang };

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
  const [days, setDays] = useState(30);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const daysInputRef = useRef<HTMLInputElement>(null);
  
  // 获取当前语言环境
  const { i18n } = useDocusaurusContext();
  const currentLang = i18n.currentLocale === 'zh-CN' ? 'zh-CN' : 'en-US';
  
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
      addToast('success', translate({
        id: 'toast.download.success',
        message: '下载已开始，请查看您的下载文件夹',
        description: 'Download success toast message'
      }));
    }
  }, [handleDownload, addToast]);

  // 表单验证和提交
  const validateForm = useCallback((): { isValid: boolean; errorMessage?: string } => {
    if (!email.trim()) {
      return { isValid: false, errorMessage: translate({
        id: 'validation.email.required',
        message: '请输入邮箱地址',
        description: 'Email required validation message'
      }) };
    }
    if (!isValidEmail(email)) {
      return { isValid: false, errorMessage: translate({
        id: 'validation.email.invalid',
        message: '请输入有效的邮箱地址',
        description: 'Email invalid validation message'
      }) };
    }
    if (days < 1 || days > 30) {
      return { isValid: false, errorMessage: translate({
        id: 'validation.days.range',
        message: '试用天数必须在 1-30 天之间',
        description: 'Days range validation message'
      }) };
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

    const success = await createLicense(email, days, currentLang);
    if (success) {
      addToast('success', translate({
        id: 'toast.license.success',
        message: 'License 创建成功！许可文件已发送至您的邮箱',
        description: 'License success toast message'
      }));
    }
  }, [email, days, currentLang, validateForm, createLicense, addToast]);

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
            <span>
              {translate({
                id: 'homepage.download.badge',
                message: '🚀 体验中心',
                description: 'Download section badge'
              })}
            </span>
          </div>
          <h2 id="features-heading" className={styles.sectionTitle}>
            {translate({
              id: 'homepage.download.title',
              message: '立即体验 LinguaX',
              description: 'Download section title'
            })}
            <br />
            <span className={styles.titleAccent}>
              {translate({
                id: 'homepage.download.titleAccent',
                message: '让工作更高效的状态栏体验',
                description: 'Download section title accent'
              })}
            </span>
          </h2>
          <p className={styles.sectionDescription}>
            {translate({
              id: 'homepage.download.description',
              message: '下载应用并创建试用许可，开始您的智能输入法切换之旅，体验状态栏原生应用的轻量与高效。',
              description: 'Download section description'
            })}
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {/* 下载功能 */}
          <div className={styles.featureCard}>
            <div className={styles.cardHeader}>
              <div className={styles.featureIcon}>🚀</div>
              <div className={styles.featureHighlight}>
                {translate({
                  id: 'homepage.download.download.title',
                  message: '免费下载',
                  description: 'Download card title'
                })}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3>
                {translate({
                  id: 'homepage.download.download.title',
                  message: '免费下载',
                  description: 'Download card title'
                })}
              </h3>
              <p>
                {translate({
                  id: 'homepage.download.download.description',
                  message: '下载最新版本的 LinguaX 应用，支持 macOS 13.0+ 及 Apple Silicon',
                  description: 'Download card description'
                })}
              </p>
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
                    {translate({
                      id: 'homepage.download.download.loading',
                      message: '获取下载链接中...',
                      description: 'Download loading text'
                    })}
                  </>
                ) : (
                  translate({
                    id: 'homepage.download.download.button',
                    message: '下载最新版本',
                    description: 'Download button text'
                  })
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
              <div className={styles.featureHighlight}>
                {translate({
                  id: 'homepage.download.license.title',
                  message: '创建试用许可',
                  description: 'License card title'
                })}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3>
                {translate({
                  id: 'homepage.download.license.title',
                  message: '创建试用许可',
                  description: 'License card title'
                })}
              </h3>
              <p>
                {translate({
                  id: 'homepage.download.license.description',
                  message: '创建临时 License 密钥，免费试用 LinguaX 完整功能',
                  description: 'License card description'
                })}
              </p>
              
              <form 
                onSubmit={handleCreateLicense} 
                className={styles.licenseForm}
                noValidate
                onKeyDown={handleKeyDown}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="email-input" className="sr-only">
                    {translate({
                      id: 'homepage.download.license.email.label',
                      message: '邮箱地址',
                      description: 'Email input label'
                    })}
                  </label>
                  <input
                    id="email-input"
                    ref={emailInputRef}
                    type="email"
                    placeholder={translate({
                      id: 'homepage.download.license.email.placeholder',
                      message: '请输入邮箱地址',
                      description: 'Email input placeholder'
                    })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    aria-describedby="email-help"
                    autoComplete="email"
                  />
                  <small id="email-help" className={styles.helpText}>
                    {translate({
                      id: 'homepage.download.license.email.help',
                      message: 'License 许可文件将发送至此邮箱',
                      description: 'Email input help text'
                    })}
                  </small>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="days-input" className="sr-only">
                    {translate({
                      id: 'homepage.download.license.days.label',
                      message: '试用天数',
                      description: 'Days input label'
                    })}
                  </label>
                  <input
                    id="days-input"
                    ref={daysInputRef}
                    type="number"
                    placeholder={translate({
                      id: 'homepage.download.license.days.placeholder',
                      message: '试用天数 (1-30)',
                      description: 'Days input placeholder'
                    })}
                    value={days}
                    onChange={(e) => setDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="30"
                    required
                    className={styles.input}
                    aria-describedby="days-help"
                  />
                  <small id="days-help" className={styles.helpText}>
                    {translate({
                      id: 'homepage.download.license.days.help',
                      message: '可选择 1-30 天的试用期',
                      description: 'Days input help text'
                    })}
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
                          {translate({
                            id: 'homepage.download.license.loading',
                            message: '创建中...',
                            description: 'License loading text'
                          })}
                        </>
                      ) : (
                        translate({
                          id: 'homepage.download.license.button',
                          message: '创建 License',
                          description: 'License button text'
                        })
                      )}
                    </button>
                    
                    {(licenseKey || licenseError) && (
                      <button 
                        type="button"
                        className={`${styles.button} ${styles['button--outline']}`}
                        onClick={handleReset}
                        aria-label="重置表单"
                      >
                        {translate({
                          id: 'homepage.download.license.reset',
                          message: '重新创建',
                          description: 'License reset button text'
                        })}
                      </button>
                    )}
                </div>
                
                <div className={styles.helpText}>
                  {translate({
                    id: 'homepage.download.license.hint',
                    message: '💡 提示：按 Ctrl+Enter 快速提交',
                    description: 'License form hint'
                  })}
                </div>
              </form>

              {/* License 成功结果 */}
              {licenseKey && (
                <div className={styles.success} role="region" aria-labelledby="success-heading">
                  <h4 id="success-heading">
                    {translate({
                      id: 'homepage.download.license.success.title',
                      message: '🎉 License 创建成功！',
                      description: 'License success title'
                    })}
                  </h4>
                  <p>
                    {translate({
                      id: 'homepage.download.license.success.description',
                      message: '许可文件已发送至您的邮箱：',
                      description: 'License success description'
                    })}
                    <strong>{email}</strong>
                  </p>
                  <div className={styles.licenseInstructions}>
                    <p>
                      {translate({
                        id: 'homepage.download.license.success.instructions',
                        message: '📝 使用说明：',
                        description: 'License success instructions title'
                      })}
                    </p>
                    <ol>
                      <li>
                        {translate({
                          id: 'homepage.download.license.success.step1',
                          message: '下载并安装 LinguaX 应用',
                          description: 'License success step 1'
                        })}
                      </li>
                      <li>
                        {translate({
                          id: 'homepage.download.license.success.step2',
                          message: '查收邮箱中的 license.linguaxlicense 文件',
                          description: 'License success step 2'
                        })}
                      </li>
                      <li>
                        {translate({
                          id: 'homepage.download.license.success.step3',
                          message: '双击 license 文件完成激活',
                          description: 'License success step 3'
                        })}
                      </li>
                      <li>
                        {translate({
                          id: 'homepage.download.license.success.step4',
                          message: '开始享受智能输入法切换功能',
                          description: 'License success step 4'
                        })}
                      </li>
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
        <div className={styles.toastContainer} role="region" aria-live="polite" aria-label={translate({
          id: 'homepage.download.toast.label',
          message: '通知消息',
          description: 'Toast container label'
        })}>
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </div>
      </div>
    </section>
  );
} 