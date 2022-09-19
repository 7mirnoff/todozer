import React from 'react'

import { Card } from 'antd'

import styles from './task-container.module.scss'

export const TaskContainer: React.FC = () => {
  return (
    <div className={styles.root}>
      <Card title='Column'>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}
