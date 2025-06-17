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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              {siteConfig.title}
            </Heading>
            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            <p className={styles.heroDescription}>
              专为 macOS 设计的智能输入法自动切换工具，让您的输入法智能跟随应用场景
            </p>
            <div className={styles.heroButtons}>
              <a 
                className="button button--primary button--lg" 
                href="#download"
              >
                🚀 立即下载
              </a>
              <a 
                className="button button--secondary button--outline button--lg" 
                href="#features"
              >
                📖 了解更多
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImagePlaceholder}>
              <div className={styles.macWindow}>
                <div className={styles.macWindowHeader}>
                  <div className={styles.macWindowButtons}>
                    <span className={styles.macButton} style={{backgroundColor: '#ff5f57'}}></span>
                    <span className={styles.macButton} style={{backgroundColor: '#ffbd2e'}}></span>
                    <span className={styles.macButton} style={{backgroundColor: '#28ca42'}}></span>
                  </div>
                  <span className={styles.macWindowTitle}>LinguaX</span>
                </div>
                <div className={styles.macWindowContent}>
                  <div className={styles.appList}>
                    <div className={styles.appItem}>
                      <span className={styles.appIcon}>💻</span>
                      <span>VSCode</span>
                      <span className={styles.inputMethod}>English</span>
                    </div>
                    <div className={styles.appItem}>
                      <span className={styles.appIcon}>🌐</span>
                      <span>Safari</span>
                      <span className={styles.inputMethod}>中文</span>
                    </div>
                    <div className={styles.appItem}>
                      <span className={styles.appIcon}>💬</span>
                      <span>WeChat</span>
                      <span className={styles.inputMethod}>中文</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.heroWave}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="var(--ifm-background-color)"></path>
        </svg>
      </div>
    </header>
  );
}

function FeatureHighlights() {
  const features = [
    {
      title: '🎯 智能识别',
      description: '自动识别当前应用程序，无需手动切换',
      icon: '🤖'
    },
    {
      title: '⚡ 轻量高效',
      description: '占用资源极少，运行流畅不卡顿',
      icon: '🚀'
    },
    {
      title: '🔧 简单配置',
      description: '一次设置，永久使用，开机自启动',
      icon: '⚙️'
    },
    {
      title: '💻 全面兼容',
      description: '支持所有 macOS 版本和 Apple Silicon',
      icon: '✅'
    }
  ];

  return (
    <section id="features" className={styles.featuresSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className={styles.sectionTitle}>
            为什么选择 LinguaX？
          </Heading>
          <p className={styles.sectionSubtitle}>
            四大核心优势，让您的 Mac 输入体验更智能
          </p>
        </div>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--3">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className={styles.showcaseSection}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <div className={styles.showcaseContent}>
              <Heading as="h2" className={styles.showcaseTitle}>
                智能输入法切换，就是这么简单
              </Heading>
              <div className={styles.showcaseFeatures}>
                <div className={styles.showcaseFeature}>
                  <span className={styles.showcaseIcon}>🎯</span>
                  <div>
                    <h4>应用级输入法绑定</h4>
                    <p>为每个应用程序单独指定专属输入法，编程用英文，聊天用中文</p>
                  </div>
                </div>
                <div className={styles.showcaseFeature}>
                  <span className={styles.showcaseIcon}>🧠</span>
                  <div>
                    <h4>智能切换引擎</h4>
                    <p>内置先进算法，学习您的使用习惯，越用越智能</p>
                  </div>
                </div>
                <div className={styles.showcaseFeature}>
                  <span className={styles.showcaseIcon}>⚡</span>
                  <div>
                    <h4>毫秒级响应</h4>
                    <p>切换速度极快，让您感受不到延迟，流畅如丝</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.showcaseImage}>
              <div className={styles.showcaseDemo}>
                <div className={styles.demoStep}>
                  <div className={styles.demoNumber}>1</div>
                  <div className={styles.demoText}>打开应用</div>
                </div>
                <div className={styles.demoArrow}>↓</div>
                <div className={styles.demoStep}>
                  <div className={styles.demoNumber}>2</div>
                  <div className={styles.demoText}>自动识别</div>
                </div>
                <div className={styles.demoArrow}>↓</div>
                <div className={styles.demoStep}>
                  <div className={styles.demoNumber}>3</div>
                  <div className={styles.demoText}>智能切换</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className={styles.comparisonSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className={styles.sectionTitle}>
            LinguaX vs 传统方式
          </Heading>
          <p className={styles.sectionSubtitle}>
            对比传统手动切换，看看 LinguaX 能为您节省多少时间
          </p>
        </div>
        <div className="row">
          <div className="col col--6">
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                <h3>❌ 传统手动切换</h3>
              </div>
              <ul className={styles.comparisonList}>
                <li>需要记住快捷键组合</li>
                <li>经常忘记切换输入法</li>
                <li>在不同应用间频繁切换</li>
                <li>打字效率低，容易出错</li>
                <li>中英文混合输入困扰</li>
              </ul>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                <h3>✅ LinguaX 智能切换</h3>
              </div>
              <ul className={styles.comparisonList}>
                <li>完全自动化，无需记忆</li>
                <li>应用切换时自动匹配</li>
                <li>一次设置，终身受益</li>
                <li>打字流畅，专注内容</li>
                <li>智能学习，越用越好</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FrequentlyAskedQuestions() {
  const faqs = [
    {
      question: "LinguaX 与 Input Source Pro 有什么区别？",
      answer: "LinguaX 相比 Input Source Pro 更加轻量化，占用系统资源更少，启动速度更快。同时具备相似的核心功能：为不同应用指定输入法、智能切换等，但界面更简洁，操作更直观。"
    },
    {
      question: "LinguaX 支持哪些 macOS 版本？",
      answer: "LinguaX 支持 macOS 10.14 (Mojave) 及更高版本，包括最新的 macOS Sonoma。完美兼容 Intel 处理器和 Apple Silicon (M1/M2/M3) 芯片的 Mac 设备。"
    },
    {
      question: "如何为特定应用设置默认输入法？",
      answer: "打开 LinguaX 后，您可以在应用列表中找到想要设置的应用程序，然后为其指定默认的输入法。当您切换到该应用时，LinguaX 会自动切换到预设的输入法。"
    },
    {
      question: "LinguaX 会影响 Mac 的性能吗？",
      answer: "不会。LinguaX 采用轻量级设计，内存占用极少（通常小于 10MB），CPU 使用率几乎为零。它在后台静默运行，不会影响您的正常工作。"
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className={styles.sectionTitle}>
            常见问题
          </Heading>
          <p className={styles.sectionSubtitle}>
            关于 LinguaX 您可能想了解的问题
          </p>
        </div>
        <div className="row">
          <div className="col col--8 col--offset-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <details className={styles.faqDetails}>
                  <summary className={styles.faqQuestion}>
                    <span>❓ {faq.question}</span>
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

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - macOS 智能输入法自动切换工具`}
      description="LinguaX 是专为 macOS 设计的轻量级输入法自动切换应用，支持为不同应用单独指定输入法，内置智能切换引擎，让您的输入法智能跟随应用切换，提升工作效率。">
      <HomepageHeader />
      <main>
        <FeatureHighlights />
        <ProductShowcase />
        <div id="download">
          <LinguaXFeatures />
        </div>
        <ComparisonSection />
        <FrequentlyAskedQuestions />
      </main>
    </Layout>
  );
}
