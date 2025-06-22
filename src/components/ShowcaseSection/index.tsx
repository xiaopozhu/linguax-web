import type {ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function ShowcaseSection(): ReactNode {
  return (
    <section className={styles.showcaseSection}>
      <div className="container">
        <div className={styles.showcaseHeader}>
          <div className={styles.showcaseBadge}>
            <span>
              {translate({
                id: 'homepage.showcase.badge',
                message: '🎯 核心体验',
                description: 'Showcase section badge'
              })}
            </span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            {translate({
              id: 'homepage.showcase.title',
              message: '状态栏原生体验',
              description: 'Showcase section title'
            })}
            <br />
            <span className={styles.titleAccent}>
              {translate({
                id: 'homepage.showcase.titleAccent',
                message: '让切换变得无感知',
                description: 'Showcase section title accent'
              })}
            </span>
          </Heading>
          <p className={styles.showcaseDescription}>
            {translate({
              id: 'homepage.showcase.description',
              message: '体验真正的 macOS 状态栏应用，无需复杂配置，智能识别应用类型，毫秒级响应切换，完美融入系统设计。',
              description: 'Showcase section description'
            })}
          </p>
        </div>

        <div className={styles.showcaseDemo}>
          {/* 状态栏实时模拟 */}
          <div className={styles.statusBarSimulation}>
            <div className={styles.simulationTitle}>
              <span className={styles.titleIcon}>⚡</span>
              {translate({
                id: 'homepage.showcase.simulation.title',
                message: '实时状态栏演示',
                description: 'Simulation title'
              })}
            </div>
            <div className={styles.macOSMenuBar}>
              <div className={styles.menuBarLeft}>
                <div className={styles.appleIcon}></div>
                <span className={styles.appName}>VS Code</span>
                <span>
                  {translate({
                    id: 'homepage.showcase.menubar.file',
                    message: '文件',
                    description: 'File menu item'
                  })}
                </span>
                <span>
                  {translate({
                    id: 'homepage.showcase.menubar.edit',
                    message: '编辑',
                    description: 'Edit menu item'
                  })}
                </span>
                <span>
                  {translate({
                    id: 'homepage.showcase.menubar.view',
                    message: '视图',
                    description: 'View menu item'
                  })}
                </span>
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
              <span>
                {translate({
                  id: 'homepage.showcase.simulation.note',
                  message: '💡 状态栏实时显示当前输入法，一目了然',
                  description: 'Simulation note'
                })}
              </span>
            </div>
          </div>

          {/* 智能切换演示 */}
          <div className={styles.intelligentSwitching}>
            <div className={styles.switchingTitle}>
              <span className={styles.titleIcon}>🧠</span>
              {translate({
                id: 'homepage.showcase.switching.title',
                message: '智能切换演示',
                description: 'Switching demo title'
              })}
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
                </div>
                <div className={styles.toApp}>
                  <div className={styles.appIcon}>💬</div>
                  <div className={styles.appInfo}>
                    <div className={styles.appLabel}>
                      {translate({
                        id: 'homepage.showcase.app.wechat',
                        message: '微信',
                        description: 'WeChat app name'
                      })}
                    </div>
                    <div className={styles.inputMethodLabel}>
                      {translate({
                        id: 'homepage.showcase.inputmethod.pinyin',
                        message: '拼音',
                        description: 'Pinyin input method'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.switchingProcess}>
                <div className={styles.processStep}>
                  <div className={styles.stepLabel}>
                    {translate({
                      id: 'homepage.showcase.process.recognize',
                      message: '识别应用',
                      description: 'Recognize app step'
                    })}
                  </div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepLabel}>
                    {translate({
                      id: 'homepage.showcase.process.judge',
                      message: '智能判断',
                      description: 'Smart judge step'
                    })}
                  </div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepLabel}>
                    {translate({
                      id: 'homepage.showcase.process.switch',
                      message: '自动切换',
                      description: 'Auto switch step'
                    })}
                  </div>
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
              <h3>
                {translate({
                  id: 'homepage.showcase.advantage.smart.title',
                  message: '智能识别',
                  description: 'Smart recognition advantage title'
                })}
              </h3>
              <p>
                {translate({
                  id: 'homepage.showcase.advantage.smart.description',
                  message: '自动识别应用类型，无需手动配置',
                  description: 'Smart recognition advantage description'
                })}
              </p>
              <div className={styles.advantageMetric}>
                <span className={styles.metricNumber}>100%</span>
                <span className={styles.metricLabel}>
                  {translate({
                    id: 'homepage.showcase.advantage.smart.metric',
                    message: '准确率',
                    description: 'Smart recognition metric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.advantageCard}>
            <div className={styles.advantageIcon}>
              <span>⚡</span>
            </div>
            <div className={styles.advantageContent}>
              <h3>
                {translate({
                  id: 'homepage.showcase.advantage.fast.title',
                  message: '极速响应',
                  description: 'Fast response advantage title'
                })}
              </h3>
              <p>
                {translate({
                  id: 'homepage.showcase.advantage.fast.description',
                  message: '毫秒级切换速度，无感知体验',
                  description: 'Fast response advantage description'
                })}
              </p>
              <div className={styles.advantageMetric}>
                <span className={styles.metricNumber}>{"<50ms"}</span>
                <span className={styles.metricLabel}>
                  {translate({
                    id: 'homepage.showcase.advantage.fast.metric',
                    message: '响应时间',
                    description: 'Fast response metric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.advantageCard}>
            <div className={styles.advantageIcon}>
              <span>🪶</span>
            </div>
            <div className={styles.advantageContent}>
              <h3>
                {translate({
                  id: 'homepage.showcase.advantage.light.title',
                  message: '轻量设计',
                  description: 'Lightweight design advantage title'
                })}
              </h3>
              <p>
                {translate({
                  id: 'homepage.showcase.advantage.light.description',
                  message: '纯状态栏应用，系统资源占用极低',
                  description: 'Lightweight design advantage description'
                })}
              </p>
              <div className={styles.advantageMetric}>
                <span className={styles.metricNumber}>{"<5MB"}</span>
                <span className={styles.metricLabel}>
                  {translate({
                    id: 'homepage.showcase.advantage.light.metric',
                    message: '应用大小',
                    description: 'Lightweight design metric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 应用场景展示 */}
        <div className={styles.usageScenarios}>
          <div className={styles.scenariosTitle}>
            <span className={styles.titleIcon}>🎬</span>
            {translate({
              id: 'homepage.showcase.scenarios.title',
              message: '典型使用场景',
              description: 'Usage scenarios title'
            })}
          </div>
          <div className={styles.scenariosList}>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>👨‍💻</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>
                  {translate({
                    id: 'homepage.showcase.scenarios.dev.label',
                    message: '编程开发',
                    description: 'Development scenario label'
                  })}
                </div>
                <div className={styles.scenarioDesc}>
                  {translate({
                    id: 'homepage.showcase.scenarios.dev.desc',
                    message: '代码编辑器自动切换英文输入',
                    description: 'Development scenario description'
                  })}
                </div>
              </div>
            </div>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>💬</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>
                  {translate({
                    id: 'homepage.showcase.scenarios.chat.label',
                    message: '社交聊天',
                    description: 'Chat scenario label'
                  })}
                </div>
                <div className={styles.scenarioDesc}>
                  {translate({
                    id: 'homepage.showcase.scenarios.chat.desc',
                    message: '聊天应用自动切换中文输入',
                    description: 'Chat scenario description'
                  })}
                </div>
              </div>
            </div>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>⌨️</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>
                  {translate({
                    id: 'homepage.showcase.scenarios.terminal.label',
                    message: '终端操作',
                    description: 'Terminal scenario label'
                  })}
                </div>
                <div className={styles.scenarioDesc}>
                  {translate({
                    id: 'homepage.showcase.scenarios.terminal.desc',
                    message: '命令行工具自动切换英文输入',
                    description: 'Terminal scenario description'
                  })}
                </div>
              </div>
            </div>
            <div className={styles.scenarioItem}>
              <div className={styles.scenarioIcon}>📝</div>
              <div className={styles.scenarioContent}>
                <div className={styles.scenarioLabel}>
                  {translate({
                    id: 'homepage.showcase.scenarios.docs.label',
                    message: '文档编辑',
                    description: 'Document scenario label'
                  })}
                </div>
                <div className={styles.scenarioDesc}>
                  {translate({
                    id: 'homepage.showcase.scenarios.docs.desc',
                    message: '根据文档类型智能选择输入法',
                    description: 'Document scenario description'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 