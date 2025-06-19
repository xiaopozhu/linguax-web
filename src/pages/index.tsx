import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import LinguaXFeatures from '@site/src/components/LinguaXFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
          <div className={styles.orb3}></div>
        </div>
        <div className={styles.gridPattern}></div>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <img src="/img/linguax.png" alt="LinguaX" className={styles.badgeIcon} />
              <span>状态栏 · 轻量级 · 智能切换</span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              让输入法
              <br />
              <span className={styles.titleGradient}>跟随应用切换</span>
            </Heading>
            <p className={styles.heroDescription}>
              LinguaX 是专为 macOS 设计的状态栏输入法管理工具。
              <br />
              <strong>为每个应用配置专属输入法，告别手动切换的烦恼。</strong>
            </p>
            <div className={styles.heroActions}>
              <a href="#download" className={styles.primaryBtn}>
                <span>免费试用</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
              {/* <button className={styles.secondaryBtn}>
                <span>使用教程</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5l8 7-8 7V5z" fill="currentColor"/>
                </svg>
              </button> */}
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1800+</div>
                <div className={styles.statLabel}>用户信赖</div>
              </div>
              {/* <div className={styles.stat}>
                <div className={styles.statNumber}>4.8</div>
                <div className={styles.statLabel}>App Store</div>
              </div> */}
              <div className={styles.stat}>
                <div className={styles.statNumber}>{"< 5MB"}</div>
                <div className={styles.statLabel}>轻量应用</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.appScreenshot}>
              {/* 模拟状态栏 */}
              <div className={styles.mockStatusBar}>
                <div className={styles.statusBarLeft}>
                  <div className={styles.appleMenu}></div>
                  <span className={styles.appMenuText}>LinguaX</span>
                  <span className={styles.menuItem}>配置</span>
                  <span className={styles.menuItem}>帮助</span>
                </div>
                <div className={styles.statusBarRight}>
                  <div className={styles.systemIcons}>
                    <span className={styles.timeDisplay}>14:30</span>
                    <div className={styles.linguaxStatusIcon}>
                      <img src="/img/linguax.png" alt="LinguaX" width="12" height="12" />
                      <span className={styles.currentInputIndicator}>ABC</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <img
                  src="/img/linguax-app.png" 
                  alt="LinguaX 应用界面截图" 
                  className={styles.screenshotImage}
                />
              <div className={styles.screenshotBadge}>
                <span>⚡ 毫秒级响应，无感知切换</span>
              </div>
              <div className={styles.floatingElements}>
                <div className={styles.floatingIcon}>🎯</div>
                <div className={styles.floatingIcon}>⚡</div>
                <div className={styles.floatingIcon}>🪶</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: '🎯',
      title: '智能识别',
      description: '自动识别应用类型，智能推荐合适的输入法',
      highlight: 'AI 驱动'
    },
    {
      icon: '⚡',
      title: '极速切换',
      description: '毫秒级响应，切换应用时自动切换输入法',
      highlight: '无感体验'
    },
    {
      icon: '📱',
      title: '状态栏常驻',
      description: '轻量级设计，常驻状态栏不影响使用',
      highlight: '< 5MB'
    },
    {
      icon: '🎨',
      title: 'macOS 原生',
      description: '完美融入系统设计，支持浅色深色主题',
      highlight: '原生体验'
    },
    {
      icon: '🔒',
      title: '隐私保护',
      description: '所有数据本地存储，不收集任何个人信息',
      highlight: '100% 安全'
    },
    {
      icon: '🆓',
      title: '免费试用',
      description: '无广告干扰，可创建试用许可体验完整功能',
      highlight: '试用友好'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>✨ 核心特性</span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            为什么选择 LinguaX
            <br />
            <span className={styles.titleAccent}>状态栏输入法管理专家</span>
          </Heading>
          <p className={styles.sectionDescription}>
            从智能识别到隐私保护，LinguaX 专为 macOS 状态栏环境优化，
            为您提供最自然的输入法切换体验。
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.cardHeader}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureHighlight}>{feature.highlight}</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section className={styles.showcaseSection}>
      <div className="container">
        <div className={styles.showcaseHeader}>
          <div className={styles.showcaseBadge}>
            <span>🎯 核心体验</span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            状态栏原生体验
            <br />
            <span className={styles.titleAccent}>让切换变得无感知</span>
          </Heading>
          <p className={styles.showcaseDescription}>
            体验真正的 macOS 状态栏应用，无需复杂配置，智能识别应用类型，
            毫秒级响应切换，完美融入系统设计。
          </p>
        </div>

        <div className={styles.showcaseDemo}>
          {/* 状态栏实时模拟 */}
          <div className={styles.statusBarSimulation}>
            <div className={styles.simulationTitle}>
              <span className={styles.titleIcon}>⚡</span>
              实时状态栏演示
            </div>
            <div className={styles.macOSMenuBar}>
              <div className={styles.menuBarLeft}>
                <div className={styles.appleIcon}></div>
                <span className={styles.appName}>VS Code</span>
                <span>文件</span>
                <span>编辑</span>
                <span>视图</span>
              </div>
              <div className={styles.menuBarRight}>
                <div className={styles.menuBarIcons}>
                  <div className={styles.wifiIcon}>📶</div>
                  <div className={styles.batteryIcon}>🔋</div>
                  <div className={styles.timeDisplay}>14:30</div>
                  <div className={styles.linguaxStatusIcon}>
                    <img src="/img/linguax.png" alt="LinguaX" width="12" height="12" />
                    <span className={styles.currentInputIndicator}>ABC</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.simulationNote}>
              <span>💡 状态栏实时显示当前输入法，一目了然</span>
            </div>
          </div>

          {/* 智能切换演示 */}
          <div className={styles.intelligentSwitching}>
            <div className={styles.switchingTitle}>
              <span className={styles.titleIcon}>🧠</span>
              智能切换演示
            </div>
            <div className={styles.switchingFlow}>
              <div className={styles.appTransition}>
                <div className={styles.fromApp}>
                  <div className={styles.appIcon}>💻</div>
                  <div className={styles.appInfo}>
                    <div className={styles.appLabel}>VS Code</div>
                    <div className={styles.inputMethodLabel}>ABC</div>
                  </div>
                </div>
                <div className={styles.transitionArrow}>
                  <div className={styles.arrowHead}>→</div>
                  <div className={styles.switchingLabel}>切换应用</div>
                </div>
                <div className={styles.toApp}>
                  <div className={styles.appIcon}>💬</div>
                  <div className={styles.appInfo}>
                    <div className={styles.appLabel}>微信</div>
                    <div className={styles.inputMethodLabel}>拼音</div>
                  </div>
                </div>
              </div>
              <div className={styles.switchingProcess}>
                <div className={styles.processStep}>
                  <div className={styles.stepLabel}>识别应用</div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepLabel}>智能判断</div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepLabel}>自动切换</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 核心优势展示 */}
        <div className={styles.showcaseAdvantages}>
          <div className={styles.advantageCard}>
            <div className={styles.advantageIcon}>
              <span>🎯</span>
            </div>
            <div className={styles.advantageContent}>
              <h3>智能识别</h3>
              <p>自动识别应用类型，无需手动配置</p>
              <div className={styles.advantageMetric}>
                <span className={styles.metricNumber}>100%</span>
                <span className={styles.metricLabel}>准确率</span>
              </div>
            </div>
          </div>

          <div className={styles.advantageCard}>
            <div className={styles.advantageIcon}>
              <span>⚡</span>
            </div>
            <div className={styles.advantageContent}>
              <h3>极速响应</h3>
              <p>毫秒级切换速度，无感知体验</p>
              <div className={styles.advantageMetric}>
                <span className={styles.metricNumber}>{"<50ms"}</span>
                <span className={styles.metricLabel}>响应时间</span>
              </div>
            </div>
          </div>

          <div className={styles.advantageCard}>
            <div className={styles.advantageIcon}>
              <span>🪶</span>
            </div>
            <div className={styles.advantageContent}>
              <h3>轻量设计</h3>
              <p>纯状态栏应用，系统资源占用极低</p>
              <div className={styles.advantageMetric}>
                <span className={styles.metricNumber}>{"<5MB"}</span>
                <span className={styles.metricLabel}>应用大小</span>
              </div>
            </div>
          </div>
        </div>

        {/* 应用场景展示 */}
        <div className={styles.usageScenarios}>
          <div className={styles.scenariosTitle}>
            <span className={styles.titleIcon}>🎬</span>
            典型使用场景
          </div>
          <div className={styles.scenariosList}>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>👨‍💻</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>编程开发</div>
                <div className={styles.scenarioDesc}>代码编辑器自动切换英文输入</div>
              </div>
            </div>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>💬</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>社交聊天</div>
                <div className={styles.scenarioDesc}>聊天应用自动切换中文输入</div>
              </div>
            </div>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>⌨️</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>终端操作</div>
                <div className={styles.scenarioDesc}>命令行工具自动切换英文输入</div>
              </div>
            </div>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>📝</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>文档编辑</div>
                <div className={styles.scenarioDesc}>根据文档类型智能选择输入法</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    {
      icon: '📥',
      title: '下载安装',
      description: '从官网下载 LinguaX 并拖拽到应用程序文件夹',
      detail: '支持 macOS 13.0+',
      color: 'blue'
    },
    {
      icon: '🎯', 
      title: '智能识别',
      description: 'LinguaX 自动识别应用类型，无需手动配置即可智能切换输入法',
      detail: '自动识别切换',
      color: 'green'
    },
    {
      icon: '🚀',
      title: '开始使用',
      description: '享受自动切换的流畅体验，告别手动操作',
      detail: '完全自动化',
      color: 'purple'
    }
  ];

  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>🚀 快速上手</span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            三步开启
            <br />
            <span className={styles.titleAccent}>智能输入法管理</span>
          </Heading>
        </div>
        
        <div className={styles.workflowContainer}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.workflowStep}>
              <div className={styles.stepConnection}>
                {idx < steps.length - 1 && <div className={styles.stepLine}></div>}
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>{idx + 1}</div>
                <div className={`${styles.stepIcon} ${styles[step.color]}`}>
                  <span>{step.icon}</span>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  <div className={styles.stepDetail}>{step.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "LinguaX 支持哪些 macOS 版本？",
      answer: "LinguaX 支持 macOS 13.0 Ventura 及更高版本，完美兼容 Intel 和 Apple Silicon 芯片的所有 Mac 设备。针对最新的 macOS 系统进行了专门优化。"
    },
    {
      question: "作为状态栏应用会影响系统性能吗？",
      answer: "完全不会。LinguaX 采用高效的轻量级架构，应用大小小于 5MB，内存占用极低，CPU 使用率几乎为零。专为状态栏环境优化，不会影响系统性能。"
    },
    {
      question: "支持哪些配置方式？",
      answer: "LinguaX 提供简洁的应用选择界面，您可以从已安装的应用列表中选择需要配置的应用，为每个应用指定专属的输入法。操作简单直观，适合各类用户使用。"
    },
    {
      question: "输入法切换的响应速度如何？",
      answer: "LinguaX 采用系统级别的监听机制，切换响应时间在毫秒级别，几乎感受不到延迟。切换过程完全在后台进行，不会打断您的工作流程。"
    },
    {
      question: "数据安全和隐私如何保障？",
      answer: "LinguaX 严格遵循 Apple 的隐私政策，所有配置数据都存储在本地，绝不收集或上传任何个人信息。应用不需要网络权限，确保您的隐私绝对安全。"
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <div className={styles.sectionBadge}>
              <span>❓ 常见问题</span>
            </div>
            <Heading as="h2" className={styles.sectionTitle}>
              关于 LinguaX
              <br />
              <span className={styles.titleAccent}>您想了解的都在这里</span>
            </Heading>
          </div>
          
          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <details className={styles.faqDetails}>
                  <summary className={styles.faqQuestion}>
                    <span>{faq.question}</span>
                    <div className={styles.faqIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContainer}>
          <div className={styles.ctaBackground}>
            <div className={styles.ctaGradient}></div>
            <div className={styles.ctaPattern}></div>
          </div>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>🎉 立即体验</span>
            </div>
            <Heading as="h2" className={styles.ctaTitle}>
              让您的 Mac 输入更智能
            </Heading>
            <p className={styles.ctaDescription}>
              加入近两千名用户的行列，体验最自然的输入法切换方式。
              <br />
              <strong>免费试用，无广告，保护隐私，持续更新。</strong>
            </p>
            <div className={styles.ctaActions}>
              <a href="#download" className={styles.ctaPrimaryBtn}>
                <span>免费试用 LinguaX</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>macOS 13.0+</span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Apple Silicon 优化</span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>状态栏常驻</span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>免费试用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - macOS 状态栏输入法管理工具`}
      description="LinguaX 是专为 macOS 设计的轻量级状态栏输入法管理工具，为每个应用自动配置合适的输入法，让切换变得无感知。状态栏常驻，智能、轻量、优雅。">
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <ShowcaseSection />
        <WorkflowSection />
        <div id="download">
          <LinguaXFeatures />
        </div>
        <FAQSection />
        <CTASection />
      </main>
    </Layout>
  );
}
