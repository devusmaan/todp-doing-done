


// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// export default function TaskComponent({ task, isOverlay = false }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: task.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//     backgroundColor: isOverlay ? "#fff" : undefined,
//     width: isOverlay ? "280px" : "100%",
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="p-2 rounded shadow bg-white mb-2 cursor-grab"
//     >
//       <div className="text-sm font-medium">{task.title}</div>
//     </div>
//   );
// }