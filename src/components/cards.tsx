"use client"

import { RxCross2 } from 'react-icons/rx';
import { MdKeyboardArrowRight, MdDelete, MdEdit } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
// import { Draggable } from '@/dnd-kit/Draggable';


// import Draggable from 'react-draggable';

type Card = {
    id: number,
    name: string
}



type CardlistProps = {
    cards: Card[];
    tasks: Record<string, string[]>;
    handleDeleteCard: (cardId: number) => void;
    handleDeleteTask: (cardId: number, taskIndex: number) => void;
    editTask: { cardId: number; index: number } | null;
    setEditTask: (val: { cardId: number; index: number } | null) => void;
    editedValue: string;
    setEditedValue: (val: string) => void
    handleEditTask: () => void
}

export default function CardList({ cards, tasks, handleDeleteCard, handleDeleteTask, editTask, setEditTask, editedValue, setEditedValue, handleEditTask }: CardlistProps) {



    const deleteCard = () => {

        toast.error("Card removed successfully", {
            duration: 2000
        })
    }



    const deleteTask = () => {

        toast.error("Task removed successfully", {
            duration: 2000
        })

    };



    // function handleDragEnd(event: { over: any; }) {
    //     const { over } = event;

    //     // If the item is dropped over a container, set it as the parent
    //     // otherwise reset the parent to `null`
    //     setParent(over ? over.id : null);
    // }


    return (
        <div className='flex flex-nowrap gap-4 box-border'>
            {cards.map((card) => (

                <div
                    className="bg-[#f1f2f4] rounded-xl h-fit max-h-96 overflow-y-auto w-72 min-w-72 mb-24 max-w-full"
                    key={card.id}>
                    {/* <DndContext onDragEnd={handleDragEnd}> */}
                    {/* {parent === null ? draggableMarkup : null} */}
                    <div className='flex justify-between mx-6 my-3'>
                        <h2 className='text-center font-bold text-sm text-[#203354] whitespace-normal break-all'>
                            {card.name}
                        </h2>
                        <button
                            onClick={() => {
                                handleDeleteCard(card.id)
                                deleteCard()
                            }
                            }
                            className='ease-out text-lg text-[#203354] cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1] py-1 px-1'>
                            <RxCross2 />
                        </button>
                    </div>


                    <ul>
                        {tasks[card.id] && tasks[card.id].map((task, index) => (

                            <li className='flex items-center justify-between h-fit mb-2 mx-2 bg-white rounded-xl' key={index}>

                                {/* <div className='flex p-2 items-center justify-between gap-2 whitespace-normal break-all'>
                                    <div>
                                        <MdKeyboardArrowRight className='text-xl' />
                                    </div>
                                    {task}
                                </div> */}
                                {editTask?.cardId === card.id && editTask.index === index ? (
                                    <div
                                        className="flex items-center gap-2 p-2 w-full animate-slide-in mr-3"
                                    >
                                        <input
                                            value={editedValue}
                                            onChange={(e) => setEditedValue(e.target.value)}
                                            className='w-10/12 text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-[#bb8cd0]'
                                            autoFocus
                                        />
                                        <button
                                            className='cursor-pointer duration-300 transition hover:bg-[#e2e2e2] p-1 rounded text-xl text-gray-600'
                                            onClick={() => setEditTask(null)}
                                        >
                                            <RxCross2 />
                                        </button>
                                        <button
                                            onClick={handleEditTask}
                                            className="text-xs font-semibold text-white bg-[#203354] hover:bg-[#2b456e] px-3 py-1.5 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex p-2 items-center justify-between gap-2 whitespace-normal break-all'>
                                        <div>
                                            <MdKeyboardArrowRight className='text-xl' />
                                        </div>
                                        {task}
                                    </div>
                                )}

                                <div className='flex items-center justify-between gap-2 mr-2'>


                                    {/* <button
                                        onClick={() => {
                                            handleEditTask()
                                        }}
                                        className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'>
                                        <MdEdit className='text-xl' />
                                    </button> */}

                                    {/* <button
                                        onClick={() => {
                                            setEditTask({ cardId: card.id, index });
                                            setEditedValue(task);
                                        }}
                                        className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'>
                                        <MdEdit className='text-xl' />
                                    </button>


                                    <button className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'
                                        onClick={() => {
                                            handleDeleteTask(card.id, index)
                                            deleteTask()
                                        }

                                        }>

                                        <MdDelete className='text-xl' />
                                    </button> */}

                                    {!(editTask?.cardId === card.id && editTask.index === index) && (
                                        <div className='flex items-center justify-between gap-2 mr-2 '>
                                            <button
                                                onClick={() => {
                                                    setEditTask({ cardId: card.id, index });
                                                    setEditedValue(task);
                                                }}
                                                className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'>
                                                <MdEdit className='text-xl' />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeleteTask(card.id, index);
                                                    deleteTask();
                                                }}
                                                className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'>
                                                <MdDelete className='text-xl' />
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </li>
                            // </Draggable>

                        ))}
                    </ul>
                </div>
            ))
            }

            <Toaster
                position="top-center"
                reverseOrder={false}
            />


        </div >
    );
};


// handleDeleteCard , index