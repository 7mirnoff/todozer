import React from 'react'

import { Card } from 'antd'

import { TaskItem } from '../task-item/task-item'
import styles from './task-container.module.scss'

interface ITaskContainer {
  name: string
}

export const TaskContainer: React.FC<ITaskContainer> = ({ name }) => {
  return (
    <div className={styles.root}>
      <Card title={`Column-${name}`}>
        <TaskItem />
      </Card>
    </div>
  )
}
