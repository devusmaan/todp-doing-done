// "use client";

// import { useDraggable, useDroppable } from "@dnd-kit/core";
// import React from "react";

// export const Droppable = ({ id, children }: { id: string; children: React.ReactNode }) => {
//   const { setNodeRef } = useDroppable({ id });
//   return <div ref={setNodeRef}>{children}</div>;
// };

// export const Draggable = ({ id, parentId, children }: { id: string; parentId: string; children: React.ReactNode }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//     data: { parentId },
//   });

//   const style = {
//     transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
//     cursor: "grab",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {children}
//     </div>
//   );
// };


// "use client";

// import { useDraggable, useDroppable } from "@dnd-kit/core";
// import React from "react";

// type DraggableProps = {
//   id: string;
//   parentId: string;
//   isDragDisabled?: boolean;
//   children: React.ReactNode;
// };

// export const Droppable = ({
//   id,
//   children,
//   data,
// }: {
//   id: string;
//   children: React.ReactNode;
//   data?: Record<string, any>;
// }) => {
//   const { setNodeRef } = useDroppable({ id, data });
//   return <div ref={setNodeRef}>

//     {children}

//   </div>;
// };




// export const Draggable = ({
//   id,
//   parentId,
//   isDragDisabled = false,
//   children,
// }: DraggableProps) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//     data: { parentId },
//     disabled: isDragDisabled,
//   });

//   const style = {
//     // zIndex: isDragDisabled ? 100 : 1,
//     transform: transform
//       ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//       : undefined,
//     cursor: isDragDisabled ? "default" : "grab",
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...(isDragDisabled ? {} : listeners)}
//       {...attributes}
//     >
//       {children}
//     </div>
//   );
// };