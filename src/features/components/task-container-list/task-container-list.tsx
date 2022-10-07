import React, { useState } from 'react'

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringConfiguration,
  MeasuringStrategy,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { Draggable } from '../dnd/draggable'
import { TaskContainer } from '../task-container/task-container'
import styles from './task-container-list.module.scss'

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

export const TaskContainerList: React.FC = () => {
  const [items, setItems] = useState<UniqueIdentifier[]>(['1', '2', '3', '4'])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const activeIndex = activeId ? items.indexOf(activeId) : -1

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = ({ over }: DragEndEvent): void => {
    console.log(over)
    if (over) {
      const overIndex = items.indexOf(over.id)

      if (activeIndex !== overIndex) {
        const newIndex = overIndex

        setItems((items) => arrayMove(items, activeIndex, newIndex))
      }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <SortableContext items={items}>
        <div className={styles.taskContainerList}>
          {items.map((item) => {
            return (
              <Draggable key={item} id={item}>
                <div className={styles.taskContainerItem}>
                  <TaskContainer name={`${item}`} />
                </div>
              </Draggable>
            )
          })}
        </div>
      </SortableContext>
      <DragOverlay>{activeId ? <TaskContainer name={`${activeId}`} /> : null}</DragOverlay>
    </DndContext>
  )
}
