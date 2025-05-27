"use client";

import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { Draggable, Droppable } from "@/dnd-kit/DraggableDroppable";
import { motion } from "framer-motion";
import Swal from "sweetalert2";



type Card = {
    id: number;
    name: string;
};

type CardListProps = {
    cards: Card[];
    tasks: Record<number, string[]>;
    handleDeleteCard: (cardId: number) => void;
    handleDeleteTask: (cardId: number, taskIndex: number) => void;
    editTask: { cardId: number; index: number } | null;
    setEditTask: (val: { cardId: number; index: number } | null) => void;
    editedValue: string;
    setEditedValue: (val: string) => void;
    handleEditTask: () => void;
};

export default function CardList({
    cards,
    tasks,
    handleDeleteCard,
    handleDeleteTask,
    editTask,
    setEditTask,
    editedValue,
    setEditedValue,
    handleEditTask,
}: CardListProps) {


    const deleteCard = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will remove the card permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteCard(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Card removed successfully.',
                    icon: 'success',
                    timer: 1200,
                    showConfirmButton: false,
                });
            }
        });
    };


    // const deleteTask = (cardId: number, index: number) => {
    //     toast.error("Task removed successfully", { duration: 2000 });
    //     handleDeleteTask(cardId, index);
    // };

    // Prevent drag from interfering with clicks on buttons inside draggable
    // const stopPropagation = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };

    return (
        <>
            {cards.map((card) => (
                <Droppable key={card.id} id={card.id.toString()}>
                    <div

                        className="bg-[#f1f2f4] rounded-xl h-fit max-h-96 w-72 min-w-72 mb-24 max-w-full p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-gray-800">{card.name}</h2>
                            <button
                                className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl"
                                onClick={() => deleteCard(card.id)}
                            >
                                <RxCross2 />
                            </button>
                        </div>

                        {tasks[card.id]?.map((task, index) => {


                            const isEditing =
                                editTask?.cardId === card.id && editTask.index === index;

                            return (

                                <div key={index} className="bg-white rounded-lg mt-2 p-3 mb-2 shadow hover:shadow-md transition flex justify-between items-start">
                                    {isEditing ? (
                                        <motion.div
                                            key="editing-task"
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            <div className="flex w-full gap-1.5">
                                                <input
                                                    type="text"
                                                    value={editedValue}
                                                    onChange={(e) => setEditedValue(e.target.value)}
                                                    className="p-2 border border-gray-300 rounded text-sm w-10/12"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => setEditTask(null)}
                                                    className="text-gray-600 hover:bg-[#bababa] px-2 my-1 text-sm rounded"
                                                >
                                                    <RxCross2 />
                                                </button>
                                                <button
                                                    onClick={handleEditTask}
                                                    className="bg-[#bb8cd0] text-white text-sm px-2 my-1 rounded hover:bg-[#a67bba] w-fit"
                                                >
                                                    Save
                                                </button>

                                            </div>
                                        </motion.div>
                                    ) :

                                        (
                                            <motion.div
                                                key="add-btn"
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >

                                                <div className="flex justify-between items-center w-full z-50">
                                                    <Draggable key={task} id={task} parentId={card.id.toString()} isDragDisabled={isEditing}>

                                                        <div className="flex items-center justify-between gap-2 whitespace-normal break-all">
                                                            <p className="text-sm text-gray-800 w-36 h-full
                                                    bg-white rounded-lg pl-2 transition flex justify-between items-start">{task}</p>
                                                        </div>
                                                    </Draggable>

                                                    <div className="flex gap-2">
                                                        <button
                                                            className="text-gray-600 hover:bg-[#bababa] py-1.5 px-1.5 rounded text-xl"
                                                            onClick={(e) => {
                                                                // stopPropagation(e);
                                                                setEditTask({ cardId: card.id, index });
                                                                setEditedValue(task);

                                                            }} >

                                                            <MdEdit />
                                                        </button>

                                                        <button
                                                            onClick={(e) => {

                                                                // stopPropagation(e);
                                                                toast.error("Task removed successfully", { duration: 2000 });
                                                                handleDeleteTask(card.id, index);
                                                                // deleteTask(card.id, index);
                                                            }}
                                                            className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl">
                                                            <MdDelete />

                                                        </button>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        )
                                    }
                                </div>

                            );
                        })}
                    </div>
                </Droppable >
            ))
            }
        </>
    );
}


//  <div className="flex justify-between items-center w-full z-50">
//                                                 <Draggable key={task} id={task} parentId={card.id.toString()} isDragDisabled={isEditing}>

//                                                     <p className="text-sm text-gray-800 w-36 h-full
//                                                     bg-white rounded-lg pl-2 transition flex justify-between items-start">{task}</p>

//                                                 </Draggable>

//                                                 <div className="flex items-center gap-2">
//                                                     <button
//                                                         className="text-gray-600 hover:bg-[#bababa] py-1.5 px-1.5 rounded text-xl"
//                                                         onClick={(e) => {
//                                                             stopPropagation(e);
//                                                             setEditTask({ cardId: card.id, index });
//                                                             setEditedValue(task);
//                                                             console.log("edit");

//                                                         }} >

//                                                         <MdEdit />
//                                                     </button>

//                                                     <button
//                                                         onClick={(e) => {

//                                                             stopPropagation(e);
//                                                             toast.error("Task removed successfully", { duration: 2000 });
//                                                             handleDeleteTask(card.id, index);
//                                                             // deleteTask(card.id, index);
//                                                         }}
//                                                         className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl">
//                                                         <MdDelete />

//                                                     </button>
//                                                 </div>
//                                             </div>