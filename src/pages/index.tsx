import type { ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDownload } from '@site/src/hooks/useDownload';
import StructuredData from '@site/src/components/StructuredData';
import '@site/src/css/landing.css';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const pricingUrl = useBaseUrl('/pricing');
  const downloadUrl = useBaseUrl('/download');
  const changelogUrl = useBaseUrl('/docs/releases/changelog');
  const pushToTalkGuideUrl = useBaseUrl('/docs/use-cases/push-to-talk-voice-typing-mac');
  const smoothScrollGuideUrl = useBaseUrl('/docs/use-cases/fix-choppy-mouse-scrolling-macos');
  const sideButtonGuideUrl = useBaseUrl('/docs/use-cases/map-mouse-side-buttons-macos');
  const logiAlternativeGuideUrl = useBaseUrl('/docs/use-cases/logi-options-plus-alternative-macos');
  const inputAutomationGuideUrl = useBaseUrl('/docs/use-cases/auto-switch-input-source-app-domain-mac');
  const pageUrl = `${siteConfig.url}${useBaseUrl('/')}`;
  const pageTitle = translate({
    id: 'landing.home.meta.title',
    message: 'LinguaX - Mouse Enhancement + Input Automation for macOS',
    description: 'Home page title'
  });
  const pageDescription = translate({
    id: 'landing.home.meta.description',
    message: 'LinguaX gives third-party mice a pro macOS feel — smooth scrolling, gesture and side-button mapping, and push-to-talk voice typing — plus automatic input-source switching. Start free, upgrade once.',
    description: 'Home page description'
  });
  const { releaseInfo } = useDownload();

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <StructuredData type="website" pagePath="/" pageName="Home" />
      <Head>
        <link rel="canonical" href={pageUrl} />
        <meta
          name="keywords"
          content={translate({
            id: 'landing.home.meta.keywords',
            message: 'LinguaX, macOS mouse enhancement, smooth scrolling macOS, mouse gesture mapping, mouse side button remap Mac, push to talk mac, push to talk voice typing, app-specific mouse behavior, input source automation, domain input switching'
          })}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteConfig.url}/img/linguax-home.png`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteConfig.url}/img/linguax-home.png`} />
      </Head>
      <main className="lx-page">
        <section className="lx-hero lx-reveal">
          <div className="lx-chip">
            <Translate id="landing.home.hero.chip" description="Home hero chip">macOS 13+ · Apple Silicon &amp; Intel · Menu bar app</Translate>
          </div>
          <h1>
            <Translate id="landing.home.hero.title.line1" description="Home hero title line1">Your third-party mouse.</Translate>
            <span className="highlight">
              <Translate id="landing.home.hero.title.line2" description="Home hero title line2">Finally at home on macOS.</Translate>
            </span>
          </h1>
          <p>
            <Translate id="landing.home.hero.description" description="Home hero description">
              LinguaX is a macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching — smooth scrolling, gesture and button mapping, and input source rules by app and website.
            </Translate>
          </p>
          <div className="lx-actions">
            <a className="lx-btn lx-btn-primary" href={downloadUrl}>
              <Translate id="landing.home.cta.download" description="Home download cta">Download Free</Translate>
            </a>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.home.cta.pricing" description="Home pricing cta">See Pricing</Translate>
            </a>
          </div>
          <div className="lx-note">
            <Translate id="landing.home.note" description="Home note">Pricing: free trial, then a one-time Lifetime purchase ($9.9), no subscription.</Translate>
            {releaseInfo?.version ? ` ${translate({
              id: 'landing.home.note.versionPrefix',
              message: 'Current version:',
              description: 'Home current version label'
            })} v${releaseInfo.version}` : ''}
            {' '}
            <a href={changelogUrl}>
              <Translate id="landing.home.note.changelog" description="Home changelog link">See latest changelog</Translate>
            </a>
          </div>
          <div className="lx-feature-pills">
            <span className="lx-pill lx-pill-active">
              🖱 <Translate id="landing.home.pills.mouse" description="Home pill mouse">Mouse+ Enhancement</Translate>
            </span>
            <span className="lx-pill lx-pill-active">
              🎙 <Translate id="landing.home.pills.ptt" description="Home pill ptt">Push-to-Talk Voice</Translate>
            </span>
            <span className="lx-pill">
              ⌨️ <Translate id="landing.home.pills.input" description="Home pill input">Input Source Automation</Translate>
            </span>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label"><Translate id="landing.home.pain.section.label" description="Pain section label">The problem</Translate></div>
          <h2><Translate id="landing.home.pain.title" description="Pain section title">Small frictions that add up every day</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card1.title" description="Pain card1 title">Third-party mice never quite feel right</Translate></h3>
              <p><Translate id="landing.home.pain.card1.description" description="Pain card1 description">Scrolling feels choppy, inertia is off, and macOS gives you almost no tuning controls for non-Apple mice.</Translate></p>
            </article>
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card2.title" description="Pain card2 title">Side buttons are wasted real estate</Translate></h3>
              <p><Translate id="landing.home.pain.card2.description" description="Pain card2 description">Most third-party button mapping tools are clunky or app-unaware. You end up ignoring the buttons.</Translate></p>
            </article>
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card3.title" description="Pain card3 title">Voice and language switching still breaks focus</Translate></h3>
              <p><Translate id="landing.home.pain.card3.description" description="Pain card3 description">Reaching for a key to start dictation, then manually switching input source — every single time.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="landing.home.mouseplus.section.label" description="Mouse+ section label">Core feature</Translate>
          </div>
          <h2>
            <Translate id="landing.home.mouseplus.title" description="Mouse+ section title">Mouse Enhancement for macOS</Translate>
          </h2>
          <p className="lx-section-desc">
            <Translate id="landing.home.mouseplus.description" description="Mouse+ section description">Everything your third-party mouse needs to feel like it belongs on macOS.</Translate>
          </p>
          <div className="lx-feature-block">
            <div className="lx-feature-block-tag">
              🖱 <Translate id="landing.home.mouseplus.block.tag" description="Mouse+ block tag">Mouse+ Enhancement</Translate>
            </div>
            <h3>
              <Translate id="landing.home.mouseplus.block.title" description="Mouse+ block title">Smooth, mappable, per-app configurable</Translate>
            </h3>
            <p>
              <Translate id="landing.home.mouseplus.block.description" description="Mouse+ block description">Works with any USB or Bluetooth mouse. No driver install needed — just LinguaX.</Translate>
            </p>
            <div className="lx-sub-grid">
              <div className="lx-sub-card lx-stagger">
                <span className="lx-sub-card-icon">〰️</span>
                <h4><Translate id="landing.home.mouseplus.sub1.title" description="Mouse+ sub1 title">Smooth Scrolling</Translate></h4>
                <p>
                  <Translate id="landing.home.mouseplus.sub1.description" description="Mouse+ sub1 description">Tunable scroll curve for any mouse. Adjust speed and inertia. Per-app overrides when one app needs a different sensitivity.</Translate>{' '}
                  See the <a href={smoothScrollGuideUrl}><Translate id="landing.home.mouseplus.sub1.guide.link" description="Mouse+ sub1 guide link">smooth scrolling guide</Translate></a>.
                </p>
              </div>
              <div className="lx-sub-card lx-stagger">
                <span className="lx-sub-card-icon">✳️</span>
                <h4><Translate id="landing.home.mouseplus.sub2.title" description="Mouse+ sub2 title">Gesture &amp; Button Mapping</Translate></h4>
                <p>
                  <Translate id="landing.home.mouseplus.sub2.description" description="Mouse+ sub2 description">Map clicks, long-press, and directional drags to real actions: app launch, system controls, media, or custom scripts.</Translate>{' '}
                  <a href={sideButtonGuideUrl}><Translate id="landing.home.mouseplus.sub2.guide.link" description="Mouse+ sub2 guide link">Map side buttons →</Translate></a>
                </p>
              </div>
              <div className="lx-sub-card lx-stagger">
                <span className="lx-sub-card-icon">⧉</span>
                <h4><Translate id="landing.home.mouseplus.sub3.title" description="Mouse+ sub3 title">App-Scoped Overrides</Translate></h4>
                <p>
                  <Translate id="landing.home.mouseplus.sub3.description" description="Mouse+ sub3 description">Override any button or scroll behavior for a specific app without touching the global config.</Translate>
                </p>
              </div>
            </div>
            <div className="lx-screenshot-row">
              <figure className="lx-shot lx-stagger">
                <ThemedImage
                  alt={translate({ id: 'landing.home.mouseplus.shot1.alt', message: 'LinguaX Mouse+ smooth scrolling and feel tuning', description: 'Mouse+ screenshot 1 alt' })}
                  sources={{ light: useBaseUrl('/img/linguax-mouse.png'), dark: useBaseUrl('/img/linguax-mouse-dark.png') }}
                />
                <figcaption><Translate id="landing.home.mouseplus.shot1.caption" description="Mouse+ screenshot 1 caption">Smooth scrolling and feel tuning</Translate></figcaption>
              </figure>
              <figure className="lx-shot lx-stagger">
                <ThemedImage
                  alt={translate({ id: 'landing.home.mouseplus.shot2.alt', message: 'LinguaX Mouse+ button mapping and app overrides', description: 'Mouse+ screenshot 2 alt' })}
                  sources={{ light: useBaseUrl('/img/linguax-mouse-settings.png'), dark: useBaseUrl('/img/linguax-mouse-settings-dark.png') }}
                />
                <figcaption><Translate id="landing.home.mouseplus.shot2.caption" description="Mouse+ screenshot 2 caption">Button mapping and app-scoped settings</Translate></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="landing.home.ptt.section.label" description="PTT section label">Standout feature</Translate>
          </div>
          <h2>
            <Translate id="landing.home.ptt.title" description="PTT section title">Push-to-Talk Voice Typing on Mac</Translate>
          </h2>
          <p className="lx-section-desc">
            <Translate id="landing.home.ptt.description" description="PTT section description">Hold a mouse side button to start voice dictation. Release to stop. Your hands never leave the mouse.</Translate>
          </p>
          <div className="lx-ptt-block">
            <div>
              <div className="lx-ptt-label">
                <Translate id="landing.home.ptt.label" description="PTT how it works label">How it works</Translate>
              </div>
              <h3>
                <Translate id="landing.home.ptt.block.title" description="PTT block title">One hold. Instant dictation.</Translate>
              </h3>
              <p>
                <Translate id="landing.home.ptt.block.description" description="PTT block description">LinguaX maps a mouse side button to hold the macOS Fn / Globe key. While held, macOS Dictation activates. Release the button and dictation stops — just like a walkie-talkie.</Translate>
                {' '}
                <a href={pushToTalkGuideUrl}>
                  <Translate id="landing.home.ptt.guide.link" description="PTT guide link">Full setup guide →</Translate>
                </a>
              </p>
              <div className="lx-ptt-how">
                <div className="lx-ptt-how-step">
                  <div className="lx-ptt-step-num">1</div>
                  <span className="lx-ptt-step-text">
                    <Translate id="landing.home.ptt.step1" description="PTT step 1">Map any side button to "Hold Globe Key" in the Mapping panel</Translate>
                  </span>
                </div>
                <div className="lx-ptt-how-step">
                  <div className="lx-ptt-step-num">2</div>
                  <span className="lx-ptt-step-text">
                    <Translate id="landing.home.ptt.step2" description="PTT step 2">Hold the button — macOS Dictation starts immediately</Translate>
                  </span>
                </div>
                <div className="lx-ptt-how-step">
                  <div className="lx-ptt-step-num">3</div>
                  <span className="lx-ptt-step-text">
                    <Translate id="landing.home.ptt.step3" description="PTT step 3">Release — dictation stops. No keyboard required.</Translate>
                  </span>
                </div>
              </div>
              <div className="lx-ptt-compat">
                <span className="lx-ptt-compat-label">
                  <Translate id="landing.home.ptt.compat.label" description="PTT compat label">Works with:</Translate>
                </span>
                <span className="lx-compat-tag">macOS Dictation</span>
                <span className="lx-compat-tag">Wispr Flow</span>
                <span className="lx-compat-tag">superwhisper</span>
                <span className="lx-compat-tag"><Translate id="landing.home.ptt.compat.generic" description="PTT compat generic app">Any push-to-talk app</Translate></span>
              </div>
            </div>
            <div className="lx-ptt-visual">
              <div className="lx-ptt-visual-icon">🎙</div>
              <div className="lx-ptt-visual-caption">
                <Translate id="landing.home.ptt.visual.hold" description="PTT visual caption hold">Hold side button</Translate>
              </div>
              <div className="lx-ptt-visual-sub">↓ Fn/Globe held down ↓</div>
              <div className="lx-ptt-visual-caption">
                <Translate id="landing.home.ptt.visual.active" description="PTT visual caption active">Voice dictation active</Translate>
              </div>
            </div>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="landing.home.input.section.label" description="Input section label">Companion feature</Translate>
          </div>
          <h2>
            <Translate id="landing.home.input.title" description="Input section title">Automatic Input Source Switching</Translate>
          </h2>
          <div className="lx-two-col-block">
            <div>
              <h3><Translate id="landing.home.input.block.title" description="Input block title">Your input context follows your focus</Translate></h3>
              <p>
                <Translate id="landing.home.input.block.p1" description="Input block p1">Set one rule per app and one per domain. LinguaX switches input source automatically whenever context changes.</Translate>
              </p>
              <p>
                <Translate id="landing.home.input.block.p2" description="Input block p2">Falls back to your default input source when no rule matches. Works in the background, invisible when working correctly.</Translate>
                {' '}
                <a href={inputAutomationGuideUrl}>
                  <Translate id="landing.home.input.guide.link" description="Input guide link">Setup guide for app and domain rules →</Translate>
                </a>
              </p>
            </div>
            <div className="lx-rule-list">
              {[
                { icon: '💻', app: 'Xcode', input: '→ English', badge: 'App Rule' },
                { icon: '💬', app: 'WeChat', input: '→ 中文 (Pinyin)', badge: 'App Rule' },
                { icon: '🌐', app: 'linear.app', input: '→ English', badge: 'Domain Rule' },
                { icon: '🌐', app: 'zhihu.com', input: '→ 中文 (Pinyin)', badge: 'Domain Rule' },
              ].map((rule) => (
                <div key={rule.app} className="lx-rule-row">
                  <span className="lx-rule-icon">{rule.icon}</span>
                  <div className="lx-rule-text">
                    <div className="lx-rule-app-name">{rule.app}</div>
                    <div className="lx-rule-input-name">{rule.input}</div>
                  </div>
                  <span className="lx-rule-badge">{rule.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2>
            <Translate id="landing.home.compare.title" description="Comparison table title">LinguaX vs Logi Options+: Mouse Enhancement for macOS</Translate>
          </h2>
          <p className="lx-section-desc">
            <Translate id="landing.home.compare.description" description="Comparison table description">How LinguaX compares to Logi Options+ and macOS built-in controls for third-party mice.</Translate>
          </p>
          <div className="lx-table-wrap">
            <table className="lx-table">
              <thead>
                <tr>
                  <th><Translate id="landing.home.compare.col.feature" description="Compare col feature">Feature</Translate></th>
                  <th><Translate id="landing.home.compare.col.lx" description="Compare col lx">LinguaX</Translate></th>
                  <th><Translate id="landing.home.compare.col.logi" description="Compare col logi">Logi Options+</Translate></th>
                  <th><Translate id="landing.home.compare.col.macos" description="Compare col macos">macOS Built-in</Translate></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Translate id="landing.home.compare.row1.feature" description="Compare row1 feature">Works with any third-party mouse</Translate></td>
                  <td className="lx-cell-yes"><Translate id="landing.home.compare.row1.lx" description="Compare row1 lx">✓ Yes</Translate></td>
                  <td className="lx-cell-partial"><Translate id="landing.home.compare.row1.logi" description="Compare row1 logi">Logitech only</Translate></td>
                  <td className="lx-cell-partial"><Translate id="landing.home.compare.row1.macos" description="Compare row1 macos">Limited</Translate></td>
                </tr>
                <tr>
                  <td><Translate id="landing.home.compare.row2.feature" description="Compare row2 feature">Smooth scrolling (tunable)</Translate></td>
                  <td className="lx-cell-yes">✓ Yes</td>
                  <td className="lx-cell-yes"><Translate id="landing.home.compare.row2.logi" description="Compare row2 logi">✓ Yes</Translate></td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row2.macos" description="Compare row2 macos">✗ No</Translate></td>
                </tr>
                <tr>
                  <td><Translate id="landing.home.compare.row3.feature" description="Compare row3 feature">Per-app scroll override</Translate></td>
                  <td className="lx-cell-yes">✓ Yes</td>
                  <td className="lx-cell-partial"><Translate id="landing.home.compare.row3.logi" description="Compare row3 logi">Partial</Translate></td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row3.macos" description="Compare row3 macos">✗ No</Translate></td>
                </tr>
                <tr>
                  <td><Translate id="landing.home.compare.row4.feature" description="Compare row4 feature">Side button to any action</Translate></td>
                  <td className="lx-cell-yes">✓ Yes</td>
                  <td className="lx-cell-yes">✓ Yes</td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row4.macos" description="Compare row4 macos">✗ No</Translate></td>
                </tr>
                <tr>
                  <td><Translate id="landing.home.compare.row5.feature" description="Compare row5 feature">Push-to-talk voice input</Translate></td>
                  <td className="lx-cell-yes">✓ Yes</td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row5.logi" description="Compare row5 logi">✗ No</Translate></td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row5.macos" description="Compare row5 macos">✗ No</Translate></td>
                </tr>
                <tr>
                  <td><Translate id="landing.home.compare.row6.feature" description="Compare row6 feature">Input source automation</Translate></td>
                  <td className="lx-cell-yes">✓ Yes</td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row6.logi" description="Compare row6 logi">✗ No</Translate></td>
                  <td className="lx-cell-no"><Translate id="landing.home.compare.row6.macos" description="Compare row6 macos">✗ No</Translate></td>
                </tr>
                <tr>
                  <td><Translate id="landing.home.compare.row7.feature" description="Compare row7 feature">Pricing</Translate></td>
                  <td className="lx-cell-yes"><Translate id="landing.home.compare.row7.lx" description="Compare row7 lx">Free trial + $9.9 lifetime</Translate></td>
                  <td><Translate id="landing.home.compare.row7.logi" description="Compare row7 logi">Free (Logitech only)</Translate></td>
                  <td><Translate id="landing.home.compare.row7.macos" description="Compare row7 macos">Free (limited)</Translate></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.shots.title" description="Screenshots section title">Real product, not a concept</Translate></h2>
          <div className="lx-grid lx-grid-4">
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card1.alt',
                  message: 'LinguaX overview with key modules',
                  description: 'Screenshot 1 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-home.png'),
                  dark: useBaseUrl('/img/linguax-home-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card1.caption" description="Screenshot 1 caption">Overview with rule and device status</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card2.alt',
                  message: 'LinguaX app and input source rule mapping',
                  description: 'Screenshot 2 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-input-method-app-mapping.png'),
                  dark: useBaseUrl('/img/linguax-input-method-app-mapping-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card2.caption" description="Screenshot 2 caption">App and domain input rules</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card3.alt',
                  message: 'LinguaX Mouse+ enhancement settings',
                  description: 'Screenshot 3 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-mouse.png'),
                  dark: useBaseUrl('/img/linguax-mouse-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card3.caption" description="Screenshot 3 caption">Mouse+ feel tuning and gesture entry</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card5.alt',
                  message: 'LinguaX settings and permissions',
                  description: 'Screenshot 5 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-settings.png'),
                  dark: useBaseUrl('/img/linguax-settings-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card5.caption" description="Screenshot 5 caption">Permissions, language, updates, and license</Translate></figcaption>
            </figure>
          </div>
        </section>

        <section className="lx-section lx-proof lx-reveal">
          <h2><Translate id="landing.home.audience.title" description="Audience title">Who usually benefits most</Translate></h2>
          <ul className="lx-list">
            <li><Translate id="landing.home.audience.item1" description="Audience item1">People using third-party mice who want smoother scrolling and more reliable button control on macOS.</Translate></li>
            <li><Translate id="landing.home.audience.item2" description="Audience item2">Developers, designers, and operators who rely on repeatable mouse and keyboard actions daily.</Translate></li>
            <li><Translate id="landing.home.audience.item3" description="Audience item3">Multilingual users who also want input automation without adding extra complexity.</Translate></li>
            <li>
              <Translate id="landing.home.audience.item4" description="Audience item4">
                People who have tried Logi Options+ or macOS built-in controls and found them too limited or device-locked.
              </Translate>
            </li>
          </ul>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.guides.title" description="Home guides section title">Popular guides for real-world workflows</Translate></h2>
          <ul className="lx-guide-list">
            <li>
              <a className="lx-guide-link" href={pushToTalkGuideUrl}>
                🎙 <Translate id="landing.home.guides.item5" description="Home guide item 5">How to push-to-talk for voice typing with a mouse button</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={smoothScrollGuideUrl}>
                〰️ <Translate id="landing.home.guides.item1" description="Home guide item 1">How to fix choppy mouse scrolling on macOS</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={sideButtonGuideUrl}>
                🖱 <Translate id="landing.home.guides.item2" description="Home guide item 2">How to map mouse side buttons on macOS</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={inputAutomationGuideUrl}>
                ⌨️ <Translate id="landing.home.guides.item4" description="Home guide item 4">How to auto switch input source by app and website domain</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={logiAlternativeGuideUrl}>
                ⚖️ <Translate id="landing.home.guides.item3" description="Home guide item 3">How to evaluate a Logi Options+ alternative on macOS</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
          </ul>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.compat.title" description="Compatibility section title">Compatibility and privacy</Translate></h2>
          <div className="lx-grid lx-grid-3" style={{gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}}>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card1.title" description="Compatibility card1 title">Built for modern macOS</Translate></h3>
              <p><Translate id="landing.home.compat.card1.description" description="Compatibility card1 description">macOS 13+ on Apple Silicon and Intel. Runs as a menu bar background app. No driver install needed.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card2.title" description="Compatibility card2 title">Local-first, diagnosable</Translate></h3>
              <p><Translate id="landing.home.compat.card2.description" description="Compatibility card2 description">All rules run locally. Optional iCloud sync. Built-in diagnostics and changelog-driven updates for long-term stability.</Translate></p>
            </article>
          </div>
        </section>

        <section id="download" className="lx-section lx-cta lx-reveal">
          <h2><Translate id="landing.home.cta.title" description="Home CTA title">Try LinguaX in your real routine</Translate></h2>
          <p><Translate id="landing.home.cta.description" description="Home CTA description">Start with a full-feature trial. It is a one-time purchase with no subscription, and your rules stay on your Mac.</Translate></p>
          <div className="lx-actions">
            <a className="lx-btn lx-btn-primary" href={downloadUrl}>
              <Translate id="landing.home.cta.download2" description="Home CTA secondary download">Download Free</Translate>
            </a>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.home.cta.compare" description="Home CTA compare">Compare Plans</Translate>
            </a>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.faq.title" description="Home FAQ title">FAQ</Translate></h2>
          <div className="lx-faq">
            <h3><Translate id="landing.home.faq.q1" description="Home FAQ question1">Is LinguaX mainly for mouse enhancement?</Translate></h3>
            <p><Translate id="landing.home.faq.a1" description="Home FAQ answer1">Yes. Mouse+ is the main focus, with smooth scrolling, gesture/button mapping, and app-specific overrides.</Translate></p>
            <h3><Translate id="landing.home.faq.q2" description="Home FAQ question2">Do I still get input automation?</Translate></h3>
            <p><Translate id="landing.home.faq.a2" description="Home FAQ answer2">Yes. LinguaX also provides app and domain input switching to keep typing aligned with your active context.</Translate></p>
            <h3><Translate id="landing.home.faq.q3" description="Home FAQ question3">What is the pricing model?</Translate></h3>
            <p><Translate id="landing.home.faq.a3" description="Home FAQ answer3">You can start with a full-feature trial and upgrade to Lifetime with one-time pricing when ready.</Translate></p>
            <h3><Translate id="landing.home.faq.q4" description="Home FAQ question4">Is setup complicated?</Translate></h3>
            <p><Translate id="landing.home.faq.a4" description="Home FAQ answer4">Usually no. Most users can get a useful first setup in a few minutes and refine later if needed.</Translate></p>
            <h3><Translate id="landing.home.faq.q5" description="Home FAQ question5">Does LinguaX work with any mouse, or only Logitech?</Translate></h3>
            <p><Translate id="landing.home.faq.a5" description="Home FAQ answer5">Any USB or Bluetooth mouse. No brand restriction, no driver needed.</Translate></p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
