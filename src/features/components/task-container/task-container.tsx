import React from 'react'

import { Card } from 'antd'

import styles from './task-container.module.scss'

interface ITaskContainer {
  name: string
  children: React.ReactNode
}

export const TaskContainer: React.FC<ITaskContainer> = ({ name, children }) => {
  return (
    <div className={styles.root}>
      <Card title={`Column-${name}`}>{children}</Card>
    </div>
  )
}
