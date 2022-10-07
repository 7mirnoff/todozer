import React from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'

interface IDraggable {
  children: React.ReactNode
  id: UniqueIdentifier
}

export const Draggable: React.FC<IDraggable> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id,
    animateLayoutChanges: () => true
  })

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  )
}
