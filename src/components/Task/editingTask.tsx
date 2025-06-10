"use client";

import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

interface EditingTaskProps {
  editedValue: string;
  setEditedValue: (val: string) => void;
  setEditTask: (val: null) => void;
  handleEditTask: () => void;
}

export default function EditingTask({
  editedValue,
  setEditedValue,
  setEditTask,
  handleEditTask,
}: EditingTaskProps) {
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (!editedValue.trim()) {
        toast.dismiss();
        toast.error("Please enter task", {
          duration: 1000,
        });
        return;
      }
      handleEditTask();
    }
  };

  return (
    <div className="flex w-full gap-1.5">
      <input
        autoFocus
        data-no-dnd
        onKeyDown={handleKeyDown}
        draggable={false}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onDragStart={(e) => e.preventDefault()}
        type="text"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        className="p-2 border text-black border-gray-300 rounded text-sm w-10/12"
      />
      <button
        onMouseDown={() => setEditTask(null)}
        className="text-gray-600 hover:bg-[#bababa] px-2 my-1 text-sm rounded"
      >
        <RxCross2 />
      </button>
      <button
        onMouseDown={handleEditTask}
        className="bg-[#bb8cd0] text-white text-sm px-2 my-1 rounded hover:bg-[#a67bba]"
      >
        Save
      </button>
    </div>
  );
}

// <motion.div
//   initial={{
//     opacity: 0,
//     y: 30,
//     scale: 0.95,
//   }}
//   animate={{ opacity: 1, y: 0, scale: 1 }}
//   transition={{
//     duration: 0.3,
//     ease: "easeOut",
//   }}
// >
//   <div className="flex w-full gap-1.5">
//     <input
//       autoFocus
//       data-no-dnd
//       draggable={false}
//       onMouseDown={(e) => e.stopPropagation()}
//       onPointerDown={(e) => e.stopPropagation()}
//       onDragStart={(e) => e.preventDefault()}
//       type="text"
//       value={editedValue}
//       onChange={(e) =>
//         setEditedValue(e.target.value)
//       }
//       className="p-2 border border-gray-300 rounded text-sm w-10/12"
//     />
//     <button
//       onMouseDown={() => setEditTask(null)}
//       className="text-gray-600 hover:bg-[#bababa] px-2 my-1 text-sm rounded"
//     >
//       <RxCross2 />
//     </button>
//     <button
//       onMouseDown={handleEditTask}
//       className="bg-[#bb8cd0] text-white text-sm px-2 my-1 rounded hover:bg-[#a67bba]"
//     >
//       Save
//     </button>
//   </div>
// </motion.div>
