import type React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/Card/cards"

interface SortableCardProps {
  id: string
  card: Card | undefined
  children: React.ReactNode
}

export function SortableCard({ id, card, children }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "card",
      card,
    },
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
    cursor: isDragging ? "grabbing" : "grab",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="select-none h-fit"
    >
      {children}
    </div>
  )
}


// import { Card } from "@/components/Card/cards"
// import { useSortable } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"


// interface SortableCardProps {
//   id: string
//   card: Card
//   children: React.ReactNode
// }

// export const SortableCard = ({ id, card, children }: SortableCardProps) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id,
//     data: {
//       type: "card",
//       cardId: card.id,
//     },
//   })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//     cursor: "grab",
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   )
// }
