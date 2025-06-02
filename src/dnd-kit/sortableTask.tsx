"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type React from "react"

interface SortableTaskProps {
  id: string
  cardId: number
  isEditing: boolean
  children: React.ReactNode
}

export const SortableTask = ({ id, cardId, isEditing, children }: SortableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: "task",
      cardId,
    },
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    position: "relative",
    touchAction: "none",
    opacity: isDragging ? 0.5 : 1,
    pointerEvents: isDragging ? "none" : "auto",
  }

  return (
    <div ref={setNodeRef} style={style} {...(!isEditing ? attributes : {})} {...(!isEditing ? listeners : {})}>
      {children}
    </div>
  )
}
