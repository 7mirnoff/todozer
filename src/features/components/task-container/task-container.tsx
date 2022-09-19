import React from 'react'

import { Card } from 'antd'

import { TaskItem } from '../task-item/task-item'
import styles from './task-container.module.scss'

export const TaskContainer: React.FC = () => {
  return (
    <div className={styles.root}>
      <Card title='Column'>
        <TaskItem />
      </Card>
    </div>
  )
}
