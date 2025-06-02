import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";

type TaskShownProps = {
  activeTaskId: string | null;
  task: string;
  taskName: string;
  cardId: number;
  index: number;
  startEditingTask: (cardId: number, index: number) => void;
  handleDeleteTask: (cardId: number, index: number) => void;
};

export default function TaskShown({
  activeTaskId,
  task,
  taskName,
  cardId,
  index,
  startEditingTask,
  handleDeleteTask,
}: TaskShownProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.95,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={`flex justify-between items-center w-full group ${
          activeTaskId === task ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-sm text-gray-800 w-36 break-words">{taskName}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="text-gray-600 hover:bg-[#bababa] p-1 rounded text-xl"
            onMouseDown={() => startEditingTask(cardId, index)}
          >
            <MdEdit />
          </button>
          <button
            onMouseDown={() => {
              toast.error("Task removed successfully", { duration: 2000 });
              handleDeleteTask(cardId, index);
            }}
            className="text-gray-600 hover:bg-[#bababa] p-1 rounded text-xl"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// <motion.div
//   initial={{
//     opacity: 0,
//     y: 10,
//     scale: 0.95,
//   }}
//   animate={{ opacity: 1, y: 0, scale: 1 }}
//   transition={{
//     duration: 0.3,
//     ease: "easeOut",
//   }}
//   whileHover={{ scale: 1.03 }}
//   whileTap={{ scale: 0.97 }}
// >
//   <div
//     className={`flex justify-between items-center w-full group ${
//       activeTaskId === task
//         ? "opacity-0"
//         : "opacity-100"
//     }`}
//   >
//     <p className="text-sm text-gray-800 w-36 break-words">
//       {label}
//     </p>
//     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//       <button
//         className="text-gray-600 hover:bg-[#bababa] p-1 rounded text-xl"
//         onMouseDown={() =>
//           startEditingTask(card.id, index)
//         }
//       >
//         <MdEdit />
//       </button>
//       <button
//         onMouseDown={() => {
//           toast.error(
//             "Task removed successfully",
//             { duration: 2000 }
//           );
//           handleDeleteTask(card.id, index);
//         }}
//         className="text-gray-600 hover:bg-[#bababa] p-1 rounded text-xl"
//       >
//         <MdDelete />
//       </button>
//     </div>
//   </div>
// </motion.div>
