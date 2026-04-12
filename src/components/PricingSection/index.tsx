import React, { useState, useCallback, useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// 类型定义
interface ApiResponse {
  code: number;
  data: string;
  error: string;
}

interface ToastMessage {
  type: 'success' | 'error' | 'info';
  message: string;
  id: string;
}

// 工具函数
const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

// 自定义Hook: 购买功能
const usePurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { siteConfig } = useDocusaurusContext();

  const purchaseLifetime = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/app-api/stripe-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Deepzz-App': 'com.deepzz.LinguaX'
        },
        body: JSON.stringify({ 
          price_id: siteConfig.customFields?.stripePriceId || 'price_1S8bHeGdWkwYJsQdAT9XjkTs:payment'
        }),
      });

      if (response.status / 100 === 5) {
        throw new Error(`HTTP ${response.status}: 服务器响应异常`);
      }

      const data: ApiResponse = await response.json();

      if (data.code === 0) {
        // 跳转到支付页面
        window.location.href = data.data;
        return true;
      } else {
        throw new Error(data.error || '创建支付会话失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '请求失败，请检查网络连接';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, purchaseLifetime };
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
export default function PricingSection(): React.JSX.Element {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const { loading: purchaseLoading, error: purchaseError, purchaseLifetime } = usePurchase();
  
  // 获取本地化的下载链接
  const downloadUrl = useBaseUrl('/download');

  // Toast 管理
  const addToast = useCallback((type: ToastMessage['type'], message: string) => {
    const toast: ToastMessage = { type, message, id: generateId() };
    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // 处理购买
  const handlePurchase = useCallback(async () => {
    const success = await purchaseLifetime();
    if (!success) {
      addToast('error', purchaseError || '购买失败，请重试');
    }
  }, [purchaseLifetime, purchaseError, addToast]);

  // 处理免费试用
  const handleFreeTrial = useCallback(() => {
    // 跳转到首页的下载区域，保持当前语言环境
    window.location.href = downloadUrl;
  }, [downloadUrl]);

  // 检查URL参数，显示支付结果
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const cancel = urlParams.get('cancel');

    if (success === 'true') {
      addToast('success', translate({
        id: 'pricing.purchase.success',
        message: 'License已发往您所填写的邮箱中，如未收到请联系邮箱 hello@linguax.app',
        description: 'Purchase success message'
      }));
      // 清理URL参数
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (cancel === 'true') {
      addToast('info', translate({
        id: 'pricing.purchase.cancelled',
        message: '支付已取消',
        description: 'Purchase cancelled message'
      }));
      // 清理URL参数
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [addToast]);

  return (
    <section id="pricing" className={styles.pricing} role="region" aria-labelledby="pricing-heading">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>
              {translate({
                id: 'pricing.badge',
                message: '💰 选择版本',
                description: 'Pricing section badge'
              })}
            </span>
          </div>
          <h2 id="pricing-heading" className={styles.sectionTitle}>
            {translate({
              id: 'pricing.title',
              message: '选择适合您的版本',
              description: 'Pricing section title'
            })}
            <br />
            <span className={styles.titleAccent}>
              {translate({
                id: 'pricing.titleAccent',
                message: '免费试用或终身使用',
                description: 'Pricing section title accent'
              })}
            </span>
          </h2>
          <p className={styles.sectionDescription}>
            {translate({
              id: 'pricing.description',
              message: 'LinguaX 提供免费试用和终身版本，满足不同用户需求。免费版本可重复试用，终身版本一次付费永久使用。',
              description: 'Pricing section description'
            })}
          </p>
        </div>
        
        <div className={styles.pricingGrid}>
          {/* 免费版本 */}
          <div className={`${styles.pricingCard} ${styles.pricingCardFree}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🆓</div>
              <div className={styles.cardTitle}>
                {translate({
                  id: 'pricing.free.title',
                  message: '免费版本',
                  description: 'Free version title'
                })}
              </div>
              <div className={styles.cardPrice}>
                <span className={styles.priceSymbol}>$</span>
                <span className={styles.priceAmount}>0</span>
                <span className={styles.pricePeriod}>
                  {translate({
                    id: 'pricing.free.period',
                    message: '永久免费',
                    description: 'Free version period'
                  })}
                </span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <ul className={styles.featureList}>
                <li>
                  {translate({
                    id: 'pricing.free.feature1',
                    message: '30天试用License，可重复获取',
                    description: 'Free version feature 1'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.free.feature2',
                    message: '完整功能体验',
                    description: 'Free version feature 2'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.free.feature3',
                    message: '无广告干扰',
                    description: 'Free version feature 3'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.free.feature4',
                    message: '社区支持',
                    description: 'Free version feature 4'
                  })}
                </li>
              </ul>
              <button 
                className={`${styles.button} ${styles.buttonSecondary}`}
                onClick={handleFreeTrial}
                type="button"
              >
                {translate({
                  id: 'pricing.free.button',
                  message: '开始免费试用',
                  description: 'Free version button'
                })}
              </button>
            </div>
            <div className={styles.cardGlow}></div>
          </div>

          {/* 终身版本 */}
          <div className={`${styles.pricingCard} ${styles.pricingCardLifetime} ${styles.pricingCardPopular}`}>
            <div className={styles.popularBadge}>
              {translate({
                id: 'pricing.lifetime.popular',
                message: '推荐',
                description: 'Lifetime version popular badge'
              })}
            </div>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>💎</div>
              <div className={styles.cardTitle}>
                {translate({
                  id: 'pricing.lifetime.title',
                  message: '终身版本',
                  description: 'Lifetime version title'
                })}
              </div>
              <div className={styles.cardPrice}>
                <span className={styles.priceSymbol}>$</span>
                <span className={styles.priceAmount}>9.9</span>
                <span className={styles.pricePeriod}>
                  {translate({
                    id: 'pricing.lifetime.period',
                    message: '一次付费',
                    description: 'Lifetime version period'
                  })}
                </span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <ul className={styles.featureList}>
                <li>
                  {translate({
                    id: 'pricing.lifetime.feature1',
                    message: '99年License有效期',
                    description: 'Lifetime version feature 1'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.lifetime.feature2',
                    message: '应用终身免费更新',
                    description: 'Lifetime version feature 2'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.lifetime.feature3',
                    message: '最多支持3台设备',
                    description: 'Lifetime version feature 3'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.lifetime.feature4',
                    message: '邮件客服支持',
                    description: 'Lifetime version feature 4'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.lifetime.feature5',
                    message: '优先功能体验',
                    description: 'Lifetime version feature 5'
                  })}
                </li>
                <li>
                  {translate({
                    id: 'pricing.lifetime.feature6',
                    message: '3天无理由退款保证',
                    description: 'Lifetime version feature 6'
                  })}
                </li>
              </ul>
              <button 
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={handlePurchase}
                disabled={purchaseLoading}
                aria-describedby={purchaseError ? 'purchase-error' : undefined}
                type="button"
              >
                {purchaseLoading ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true"></span>
                    {translate({
                      id: 'pricing.lifetime.loading',
                      message: '处理中...',
                      description: 'Lifetime version loading text'
                    })}
                  </>
                ) : (
                  translate({
                    id: 'pricing.lifetime.button',
                    message: '立即购买 $9.9',
                    description: 'Lifetime version button'
                  })
                )}
              </button>
              {purchaseError && (
                <div id="purchase-error" className={styles.errorInline} role="alert">
                  {purchaseError}
                </div>
              )}
            </div>
            <div className={styles.cardGlow}></div>
          </div>
        </div>

        {/* Toast 通知 */}
        <div className={styles.toastContainer} role="region" aria-live="polite" aria-label={translate({
          id: 'pricing.toast.label',
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
