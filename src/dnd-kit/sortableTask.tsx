"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type React from "react";

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
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : undefined,
    // pointerEvents: isDragging ? "none" : undefined,
    overflow: "hidden"
    // cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      // className="h-fit"
      ref={setNodeRef}
      style={style}
      {...(!isEditing ? attributes : {})}
      {...(!isEditing ? listeners : {})}
    >
      {children}
    </div>
  );
};
