
// import React from 'react';
// import { useDraggable } from '@dnd-kit/core';

// export function Draggable({ id, children }:
//     {
//         //  parentId : string,
//     id: string; children: React.ReactNode
//     }
// ) {
//     const { attributes, listeners, setNodeRef, transform } = useDraggable({
//         id,
//         // data: {parentId},
//     });
//     const style = {
//         transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
//         cursor: "grab",
//     }


//     return (
//         <button ref={setNodeRef} style={style} {...listeners} {...attributes} className='p-2 m-2 bg-white shadow rounnded'>
//             {children}
//         </button>
//     );
// }

// components/dnd-kit/DraggableDroppable.tsx

"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import React from "react";

export const Droppable = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef}>{children}</div>;
};

export const Draggable = ({
  id,
  parentId,
  children,
}: {
  id: string;
  parentId: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { parentId },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};