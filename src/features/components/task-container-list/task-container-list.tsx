import React, { useState } from 'react'

import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MeasuringConfiguration,
  MeasuringStrategy,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

import { boardAPI } from '../../services/board-service'
import { SortableContainer } from '../dnd/sortable-container'
import { TaskContainer } from '../task-container/task-container'
import { TaskItem } from '../task-item/task-item'
import styles from './task-container-list.module.scss'

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

export const TaskContainerList: React.FC = () => {
  const { data: columns, error, isLoading } = boardAPI.useFetchAllColumnsQuery(null)
  console.log(columns, error, isLoading)

  const [items, setItems] = useState<UniqueIdentifier[]>(['1', '2', '3', '4'])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const activeIndex = activeId ? items.indexOf(activeId) : -1

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id)
  }

  const handleDragOver = ({ active, over }: DragEndEvent): void => {
    if (!over?.id) {
      return
    }

    if (active.id === over.id) {
      return
    }

    const overIndex = items.indexOf(over.id)

    if (activeIndex !== overIndex) {
      const newIndex = overIndex

      setItems((items) => arrayMove(items, activeIndex, newIndex))
    }
  }

  const handleDragEnd = ({ active, over }: DragEndEvent): void => {
    setActiveId(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className={styles.taskContainerList}>
          {items.map((item) => {
            return (
              <SortableContainer key={item} id={item}>
                <div className={styles.taskContainerItem}>
                  <TaskContainer name={`${item}`}>
                    <TaskItem />
                    <TaskItem />
                  </TaskContainer>
                </div>
              </SortableContainer>
            )
          })}
        </div>
      </SortableContext>
      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
          {activeId ? (
            <TaskContainer name={`${activeId}`}>
              <TaskItem />
            </TaskContainer>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
