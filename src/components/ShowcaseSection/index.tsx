import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function ShowcaseSection(): ReactNode {
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