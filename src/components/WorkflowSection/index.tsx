import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function WorkflowSection(): ReactNode {
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