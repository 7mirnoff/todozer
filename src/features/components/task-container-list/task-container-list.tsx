import React from 'react'

import { TaskContainer } from '../task-container/task-container'
import styles from './task-container-list.module.scss'

export const TaskContainerList: React.FC = () => {
  return (
    <div className={styles.taskContainerList}>
      <div className={styles.taskContainerItem}>
        <TaskContainer />
      </div>
      <div className={styles.taskContainerItem}>
        <TaskContainer />
      </div>
      <div className={styles.taskContainerItem}>
        <TaskContainer />
      </div>
      <div className={styles.taskContainerItem}>
        <TaskContainer />
      </div>
    </div>
  )
}
