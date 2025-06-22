import type {ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function WorkflowSection(): ReactNode {
  const steps = [
    {
      icon: '📥',
      title: translate({
        id: 'homepage.workflow.step1.title',
        message: '下载安装',
        description: 'Workflow step 1 title'
      }),
      description: translate({
        id: 'homepage.workflow.step1.description',
        message: '从官网下载 LinguaX 并拖拽到应用程序文件夹',
        description: 'Workflow step 1 description'
      }),
      detail: translate({
        id: 'homepage.workflow.step1.detail',
        message: '支持 macOS 13.0+',
        description: 'Workflow step 1 detail'
      }),
      color: 'blue'
    },
    {
      icon: '🎯', 
      title: translate({
        id: 'homepage.workflow.step2.title',
        message: '智能识别',
        description: 'Workflow step 2 title'
      }),
      description: translate({
        id: 'homepage.workflow.step2.description',
        message: 'LinguaX 自动识别应用类型，无需手动配置即可智能切换输入法',
        description: 'Workflow step 2 description'
      }),
      detail: translate({
        id: 'homepage.workflow.step2.detail',
        message: '自动识别切换',
        description: 'Workflow step 2 detail'
      }),
      color: 'green'
    },
    {
      icon: '🚀',
      title: translate({
        id: 'homepage.workflow.step3.title',
        message: '开始使用',
        description: 'Workflow step 3 title'
      }),
      description: translate({
        id: 'homepage.workflow.step3.description',
        message: '享受自动切换的流畅体验，告别手动操作',
        description: 'Workflow step 3 description'
      }),
      detail: translate({
        id: 'homepage.workflow.step3.detail',
        message: '完全自动化',
        description: 'Workflow step 3 detail'
      }),
      color: 'purple'
    }
  ];

  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>
              {translate({
                id: 'homepage.workflow.badge',
                message: '🚀 快速上手',
                description: 'Workflow section badge'
              })}
            </span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            {translate({
              id: 'homepage.workflow.title',
              message: '三步开启',
              description: 'Workflow section title'
            })}
            <br />
            <span className={styles.titleAccent}>
              {translate({
                id: 'homepage.workflow.titleAccent',
                message: '智能输入法管理',
                description: 'Workflow section title accent'
              })}
            </span>
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