import React from 'react'

import { Card } from 'antd'

import styles from './task-container.module.scss'

interface ITaskContainer {
  title: React.ReactNode
  children: React.ReactNode
}

export const TaskContainer: React.FC<ITaskContainer> = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <Card title={title}>{children}</Card>
    </div>
  )
}
