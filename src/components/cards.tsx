"use client";

import { ClientOnlyWrapper } from './ClientOnlyWrapper'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { SortableCard } from "@/dnd-kit/sortableCard";
import { SortableTask } from "@/dnd-kit/sortableTask";
import { Draggable, Droppable } from '@/dnd-kit/DraggableDroppable';


interface Card {
    id: number;
    name: string;
}

interface CardListProps {
    cards: Card[];
    tasks: Record<number, string[]>;
    handleDeleteCard: (cardId: number) => void;
    handleDeleteTask: (cardId: number, taskIndex: number) => void;
    editTask: { cardId: number; index: number } | null;
    setEditTask: (val: { cardId: number; index: number } | null) => void;
    editedValue: string;
    setEditedValue: (val: string) => void;
    handleEditTask: () => void;
    updateTasks: (newTaskOrder:  Record<number, string[]>) => void;
    setCards: (newCards: Card[]) => void;
}

export default function CardList({ cards, tasks, handleDeleteCard, handleDeleteTask, editTask, setEditTask, editedValue, setEditedValue, handleEditTask, updateTasks, setCards }: CardListProps) {


    const [cardOrder, setCardOrder] = useState<number[]>(cards.map((c) => c.id));
    const [taskOrder, setTaskOrder] = useState<Record<string, string[]>>({});




    useEffect(() => {
        setCardOrder(cards.map((c) => c.id));
        setTaskOrder(tasks);
    }, [cards, tasks]);
   

    const sensors = useSensors(useSensor(PointerSensor));

    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
    //     if (!over || active.id === over.id) return;
    //     const activeId = active.id.toString();
    //     const overId = over.id.toString();
    //     const isCardDrag = cardOrder.includes(+activeId) && cardOrder.includes(+overId);
    //     if (isCardDrag) {
    //         const oldIndex = cardOrder.indexOf(+activeId);
    //         const newIndex = cardOrder.indexOf(+overId);
    //         setCardOrder(arrayMove(cardOrder, oldIndex, newIndex));
    //         return;
    //     }
    //     const activeCardId = active.data.current?.cardId;
    //     const overCardId = over.data.current?.cardId;
    //     if (activeCardId === undefined || overCardId === undefined) return;
    //     const activeTasks = taskOrder[activeCardId];
    //     const overTasks = taskOrder[overCardId];
    //     const oldIndex = activeTasks.indexOf(activeId);
    //     if (activeCardId === overCardId) {
    //         const newTaskList = arrayMove(activeTasks, oldIndex, overTasks.indexOf(overId));
    //         setTaskOrder({ ...taskOrder, [activeCardId]: newTaskList });
    //     } else {
    //         const newSource = [...activeTasks];
    //         newSource.splice(oldIndex, 1);
    //         const newTarget = [...overTasks];
    //         if (newTarget.length === 0) {
    //             newTarget.push(activeId);
    //         } else {
    //             newTarget.splice(overTasks.indexOf(overId), 0, activeId);
    //         }
    //         setTaskOrder({ ...taskOrder, [activeCardId]: newSource, [overCardId]: newTarget });
    //         updateTasks(taskOrder)

            
    //     }
    // };


    const startEditingTask = (cardId: number, index: number) => {
        const fullTask = tasks[cardId][index];
        const [visibleText] = fullTask.split('__');
        setEditedValue(visibleText);
        setEditTask({ cardId, index });
};

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const activeId = active.id.toString();
  const overId = over.id.toString();

  const isCardDrag = cardOrder.includes(+activeId) && cardOrder.includes(+overId);
  if (isCardDrag) {
    const oldIndex = cardOrder.indexOf(+activeId);
    const newIndex = cardOrder.indexOf(+overId);
    const newCardOrder = arrayMove(cardOrder, oldIndex, newIndex);
    setCardOrder(newCardOrder);
    setCards(arrayMove(cards, oldIndex, newIndex));
    return;
  }

  const activeCardId = active.data.current?.cardId;
  const overCardId = over.data.current?.cardId ?? +overId; 

  if (activeCardId === undefined || overCardId === undefined) return;

  const activeTasks = taskOrder[activeCardId] || [];
  const overTasks = taskOrder[overCardId] || [];

  const oldIndex = activeTasks.findIndex((t) => t === activeId);

  if (activeCardId === overCardId) {
    const newTasks = arrayMove(activeTasks, oldIndex, overTasks.indexOf(overId));
    const newTaskOrder = { ...taskOrder, [activeCardId]: newTasks };
    setTaskOrder(newTaskOrder);
    updateTasks(newTaskOrder);
  } else {
    const newSource = [...activeTasks];
    newSource.splice(oldIndex, 1);

    const newTarget = [...overTasks];
    if (newTarget.length === 0) {
      newTarget.push(activeId); 
    } else {
      const insertIndex = newTarget.indexOf(overId);
      newTarget.splice(insertIndex === -1 ? 0 : insertIndex, 0, activeId);
    }

    const newTaskOrder = {
      ...taskOrder,
      [activeCardId]: newSource,
      [overCardId]: newTarget,
    };

    setTaskOrder(newTaskOrder);
    updateTasks(newTaskOrder);
  }
};


    const deleteCard = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will remove the card permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteCard(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Card removed successfully.",
                    icon: "success",
                    timer: 1200,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <ClientOnlyWrapper>
            <DndContext sensors={sensors} collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
            >
                <SortableContext items={cardOrder.map(String)} strategy={verticalListSortingStrategy}>
                    {/* <SortableContext items={taskOrder[cardOrder.i]} strategy={verticalListSortingStrategy}> */}

                    {cardOrder.map((cardId) => {
                        const card = cards.find((c) => c.id === cardId);
                        if (!card) return null;

                        return (
                            <SortableCard key={card.id} id={card.id.toString()}>

                                <Droppable key={card.id} id={card.id.toString()} data={{cardId: card.id}}>
                                    <div className="bg-[#f1f2f4] rounded-xl h-fit max-h-96 w-72 min-w-72 mb-24 max-w-full p-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="font-semibold text-lg text-gray-800">{card.name}</h2>
                                            <button
                                                onMouseDown={() => { deleteCard(card.id) }}
                                                className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl"
                                            // onClick={() => }
                                            >
                                                <RxCross2 />
                                            </button>
                                        </div>

                                        <SortableContext
                                            // items={taskOrder[card.id] || []}
                                            items={taskOrder[card.id]?.map((task: string)=> task )}

                                            strategy={verticalListSortingStrategy}
                                        >
                                            {taskOrder[card.id]?.map((task, index) => {
                                                const [label] = task.split('__');
                                                const isEditing = editTask?.cardId === card.id && editTask.index === index;

                                                return (

                                                    <SortableTask key={task} id={task}
                                                        cardId={card.id}
                                                    >
                                                        <Draggable key={task} id={task} parentId={card.id.toString()} isDragDisabled={isEditing}>

                                                            <div key={task + index + 1} className="bg-white rounded-lg mt-2 p-3 mb-2 shadow hover:shadow-md transition flex justify-between items-start">
                                                                {isEditing ? (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                                    >
                                                                        <div className="flex w-full gap-1.5">
                                                                            <input
                                                                                autoFocus
                                                                                data-no-dnd
                                                                                // ref={inputRef}
                                                                                draggable={false}
                                                                                onMouseDown={(e) => e.stopPropagation()}
                                                                                onPointerDown={(e) => e.stopPropagation()}
                                                                                onDragStart={(e) => e.preventDefault()}
                                                                                type="text"
                                                                                // defaultValue={editedValue}
                                                                                // onMouseDown={(e) => e.stopPropagation(setEditedValue(e.target.value))}
                                                                                value={editedValue}
                                                                                onChange={(e) => setEditedValue(e.target.value)}
                                                                                className="p-2 border border-gray-300 rounded text-sm w-10/12"

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
                                                                    </motion.div>
                                                                ) : (



                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                                        whileHover={{ scale: 1.03 }}
                                                                        whileTap={{ scale: 0.97 }}
                                                                    >
                                                                        <div className="flex justify-between items-center w-full">
                                                                            <p className="text-sm text-gray-800 w-36 break-words">
                                                                                {label}
                                                                            </p>
                                                                            <div className="flex gap-2">
                                                                              <button
                                                                                className="text-gray-600 hover:bg-[#bababa] py-1.5 px-1.5 rounded text-xl"
                                                                                 onMouseDown={() => startEditingTask(card.id, index)}
                                                                                        >
                                                                                                <MdEdit />
                                                                                    </button>
                                                                                <button
                                                                                    onMouseDown={() => {
                                                                                        toast.error("Task removed successfully", { duration: 2000 });
                                                                                        handleDeleteTask(card.id, index);
                                                                                    }}
                                                                                    className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl"
                                                                                >
                                                                                    <MdDelete />
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </motion.div>

                                                                )
                                                                }
                                                            </div>
                                                        </Draggable>
                                                    </SortableTask>
                                                );
                                            })}
                                        </SortableContext>
                                    </div>
                                </Droppable>

                            </SortableCard>
                        );
                    })}

                </SortableContext>
            </DndContext >
        </ClientOnlyWrapper >
    );
}





 // const inputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     setCardOrder(cards.map((c) => c.id));
    //     setTaskOrder(tasks);
    //     // inputRef.current?.focus()
    // }, []);


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







  ///////////////////////////////////////////////////////////


    /// it does not remove tasks and does drag and not drop tasks when other cards have have zero tasks and when others have 1 task then it drag and drop from other cards and when i drag and drop to another container like
    //  for example i have 3 cards named todo, doing, done and when i drop a task from todo to doing then when i will add another task from input it will not add to todo card... and when todo has 1 task and done , doing etc has
    //  zero it will drag task from todo but does not drop in other cards like and when i add other card from input it does not show that new card but i shows success... and when 
    // example i drag the task from todo and drop it on done and then i will add another task on done or todo it will show success but does not added task on them and the card which was not
    // invlove in drag and drop there task will be added when i add


    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
    //     if (!over || active.id === over.id) return;

    //     const activeId = active.id.toString();
    //     const overId = over.id.toString();


    //     const isCardDrag = cardOrder.includes(+activeId) && cardOrder.includes(+overId);
    //     if (isCardDrag) {
    //         const oldIndex = cardOrder.indexOf(+activeId);
    //         const newIndex = cardOrder.indexOf(+overId);
    //         setCardOrder(arrayMove(cardOrder, oldIndex, newIndex));
    //         return;
    //     }

    //     const activeCardId = active.data.current?.cardId;
    //     const overCardId = over.data.current?.cardId;

    //     if (activeCardId === undefined || overCardId === undefined) return;

    //     const activeTasks = taskOrder[activeCardId];
    //     const overTasks = taskOrder[overCardId];

    //     const oldIndex = activeTasks.indexOf(activeId);
    //     const newIndex = overTasks.indexOf(overId);

    //     if (activeCardId === overCardId) {
    //         const newTaskList = arrayMove(activeTasks, oldIndex, newIndex);
    //         setTaskOrder({ ...taskOrder, [activeCardId]: newTaskList });
    //     } else {
    //         const newSource = [...activeTasks];
    //         newSource.splice(oldIndex, 1);

    //         const newTarget = [...overTasks];
    //         newTarget.splice(newIndex, 0, activeId);

    //         setTaskOrder({
    //             ...taskOrder,
    //             [activeCardId]: newSource,
    //             [overCardId]: newTarget,
    //         });
    //     }
    // };


    //// does not add new card when i added and it duplicates tasks when i sort it in its own container
    //  when todo has 1 task and done , doing etc has  zero it will drag task from todo but does not drop in other cards (done, doing etc or new card)


    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
    //     if (!over || active.id === over.id) return;

    //     const activeId = active.id.toString();
    //     const overId = over.id.toString();

    //     const isCardDrag = cardOrder.includes(+activeId) && cardOrder.includes(+overId);
    //     if (isCardDrag) {
    //         const oldIndex = cardOrder.indexOf(+activeId);
    //         const newIndex = cardOrder.indexOf(+overId);
    //         const newCardOrder = arrayMove(cardOrder, oldIndex, newIndex);
    //         setCardOrder(newCardOrder);
    //         return;
    //     }

    //     const activeCardId = active.data.current?.cardId;
    //     const overCardId = over.data.current?.cardId;

    //     if (activeCardId === undefined || overCardId === undefined) return;

    //     const activeTasks = [...(taskOrder[activeCardId] || [])];
    //     const overTasks = [...(taskOrder[overCardId] || [])];

    //     const oldIndex = activeTasks.indexOf(activeId);
    //     const newIndex = overTasks.indexOf(overId);

    //     if (oldIndex === -1) return;

    //     let updatedTaskOrder = { ...taskOrder };

    //     activeTasks.splice(oldIndex, 1);
    //     updatedTaskOrder[activeCardId] = activeTasks;

    //     if (activeCardId === overCardId) {
    //         overTasks.splice(newIndex, 0, activeId);
    //     } else {
    //         if (newIndex === -1) overTasks.push(activeId);
    //         else overTasks.splice(newIndex, 0, activeId);
    //     }
    //     updatedTaskOrder[overCardId] = overTasks;

    //     setTaskOrder(updatedTaskOrder);
    //     updateTasks(updatedTaskOrder);
    // };