import React from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface ISortableContainer {
  children: React.ReactNode
  id: UniqueIdentifier
}

export const SortableContainer: React.FC<ISortableContainer> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id,
    animateLayoutChanges: () => true
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined
      }}
    >
      {children}
    </div>
  )
}
