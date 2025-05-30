"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface SortableTaskProps {
  id: string;
  cardId: number;
  isEditing: boolean;
  children: React.ReactNode;
}

export const SortableTask = ({
  id,
  cardId,
  isEditing,
  children,
}: SortableTaskProps) => {
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
      type: "task",
      cardId,
    },
  });

const style: React.CSSProperties = {
  transform: CSS.Transform.toString(transform),
  transition,
  zIndex: isDragging ? 999 : "auto",
  position: "relative",
  touchAction: "none",
  minHeight: isDragging ? 0 : "50px",
  opacity: isDragging ? 0 : 1,
  // margin: isDragging ? 0 : undefined,
  // padding: isDragging ? 0 : undefined,
  background: isDragging ? "transparent" : undefined,
  // overflow: "hidden",
  pointerEvents: isDragging ? "none" : "auto",
};

  return (
    <div ref={setNodeRef} style={style} 
    {...(!isEditing ? attributes : {})} {...(!isEditing ? listeners : {} )}>
      {children}
    </div>
  );
};

// "use client"

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import React from "react";

// export const SortableTask = ({ id, children }: { id: string; children: React.ReactNode }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//   const style = {
//     // zIndex: 100,
//     transform: CSS.Transform.toString(transform),
//     transition,
//     cursor: "grab",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {children}
//     </div>
//   );
// };
