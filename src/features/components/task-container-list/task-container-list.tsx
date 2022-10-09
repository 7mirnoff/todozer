import React, { useEffect, useState } from 'react'

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
import { Button } from 'antd'
import { createPortal } from 'react-dom'

import { IColumn } from '../../../models/column'
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
  const { data: columns, error: fetchColumnsError, isLoading } = boardAPI.useFetchAllColumnsQuery(null)
  const [createColumn, { error: createColumnsError }] = boardAPI.useCreateColumnMutation()
  const [deleteColumn] = boardAPI.useDeleteColumnMutation()
  const [updateColumn] = boardAPI.useUpdateColumnMutation()

  console.log(columns, fetchColumnsError, isLoading, createColumnsError)

  const [items, setItems] = useState<UniqueIdentifier[]>([])

  useEffect(() => {
    if (columns) {
      setItems(columns.map((column) => column.code))
    }
  }, [])

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

  const handleCreateColumn = async (): Promise<void> => {
    const name = prompt()
    await createColumn({ name } as IColumn)
  }

  const handleRemoveColumn = async (column: IColumn): Promise<void> => {
    await deleteColumn(column)
  }

  const handleUpdateColumn = async (column: IColumn): Promise<void> => {
    const name = prompt()
    await updateColumn({ ...column, name: name ?? column.name })
  }

  if (!columns?.length) {
    return <div>Нет данных</div>
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
      <SortableContext items={columns.map((column) => column.code)} strategy={horizontalListSortingStrategy}>
        <div className={styles.taskContainerList}>
          {columns.map((column) => {
            return (
              <SortableContainer key={column.code} id={column.code}>
                <div className={styles.taskContainerItem}>
                  <TaskContainer title={`Column-${column.name}`}>
                    <TaskItem />
                    <TaskItem />
                    <Button
                      onClick={(evt) => {
                        console.log(evt)
                        evt.stopPropagation()
                        void handleRemoveColumn(column)
                      }}
                    >
                      Remove new column
                    </Button>
                    <Button
                      onClick={() => {
                        void handleUpdateColumn(column)
                      }}
                    >
                      Update new column
                    </Button>
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
            <TaskContainer title={`Column-${activeId}`}>
              <TaskItem />
            </TaskContainer>
          ) : null}
        </DragOverlay>,
        document.body
      )}
      <Button onClick={handleCreateColumn}>Add new column</Button>
    </DndContext>
  )
}
