"use client";

import type React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/Card/cards";
// import { useEffect, useState } from "react";

interface SortableCardProps {
  id: string;
  card: Card;
   children: (props: {
    listeners: ReturnType<typeof useSortable>["listeners"];
    attributes: ReturnType<typeof useSortable>["attributes"];
  }) => React.ReactNode;
}

/// up is child prop types

export function SortableCard({ id, card, children }: SortableCardProps) {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

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
      cardId: card?.id,
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    // height: "auto",
    position: "relative",
    opacity: isDragging ? 1 : 1,
    touchAction: "none",
    // cursor: isDragging ? "grabbing" : "pointer",
    // height: "fit-content"
    // minHeight: 100,
    // height: isDragging? "auto" : undefined
  };

  return (
    <div
      className="select-none"
      ref={setNodeRef}
      style={style}
      // {...attributes}
      // {...listeners} i added props to children to fix drag
    >

     {children({ listeners, attributes})
     }
    </div>
  )
}


// import { Card } from "@/components/Card/cards";
// import { useSortable } from "@dnd-kit/sortable";

// interface SortableCardProps {
//   id: string;
//   card: Card | undefined;
//   children: (props: {
//     listeners: ReturnType<typeof useSortable>["listeners"];
//     attributes: ReturnType<typeof useSortable>["attributes"];
//   }) => React.ReactNode;
// }
// export function SortableCard({ id, card, children }: SortableCardProps) {
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
//       card,
//     },
//   });

//   const style: React.CSSProperties = {
//     transform: CSS.Translate.toString(transform),
//     transition,
//     zIndex: isDragging ? 999 : "auto",
//     opacity: isDragging ? 0.5 : 1,
//     touchAction: "none",
//     cursor: isDragging ? "grabbing" : "grab",
//     height: isDragging ? "auto" : undefined,
//     minHeight: 100,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} className="select-none">
//       {children({ listeners, attributes })}
//     </div>
//   );
// }
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
