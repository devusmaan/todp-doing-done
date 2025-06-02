"use client";

import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableCard } from "@/dnd-kit/sortableCard";
import { SortableTask } from "@/dnd-kit/sortableTask";
import TaskShown from "../Task/taskShowsinCard";
import EditingTask from "../Task/editingTask";

export interface Card {
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
  updateTasks: (newTaskOrder: Record<number, string[]>) => void;
  setCards: (newCards: Card[]) => void;
}

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
  updateTasks,
  setCards,
}: CardListProps) {
  const [cardOrder, setCardOrder] = useState<number[]>(cards.map((c) => c.id));
  const [taskOrder, setTaskOrder] = useState<Record<string, string[]>>({});
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const activeTaskRef = useRef<HTMLDivElement>(null);
  const [taskDimensions, setTaskDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (activeTaskRef.current) {
      const { offsetWidth, offsetHeight } = activeTaskRef.current;
      setTaskDimensions({ width: offsetWidth, height: offsetHeight });
      console.log(taskDimensions);
    }

    setCardOrder(cards.map((c) => c.id));
    setTaskOrder(tasks);
  }, [cards, tasks, activeTaskId]);

  const sensors = useSensors(useSensor(PointerSensor));

  const startEditingTask = (cardId: number, index: number) => {
    const fullTask = tasks[cardId][index];
    const [visibleText] = fullTask.split("__");
    setEditedValue(visibleText);
    setEditTask({ cardId, index });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type = active.data.current?.type;
    if (type === "task") {
      setActiveTaskId(active.id.toString());
    } else {
      // setActiveTaskId(active.id.toString());
      setActiveTaskId(null);
      console.log(type);
      
    
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeId = active.id.toString();
    const overId = over.id.toString();

    const isCardDrag =
      cardOrder.includes(+activeId) && cardOrder.includes(+overId);
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
      const newTasks = arrayMove(
        activeTasks,
        oldIndex,
        overTasks.indexOf(overId)
      );
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

  // const handleDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   const type = active.data.current?.type;
  //   // console.log(type);
  //   // console.log(over?.id);
  //   // if (type === "task") {
  //   //
  //   // } else {
  //   //       console.log("card");
  //   // }
  // };

  return (
    // <ClientOnlyWrapper>
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          handleDragEnd(event);
        }}
        onDragStart={handleDragStart}
        // onDragOver={handleDragOver}
      >
        <SortableContext
          items={cardOrder.map((id) => id.toString())}
          strategy={horizontalListSortingStrategy}
        >
          {cardOrder.map((cardId) => {
            const card = cards.find((c) => c.id === cardId);
            if (!card) return null;

            return (
              <SortableCard
                key={cardId}
                id={cardId.toString()}
                card={cards.find((c) => c.id === cardId)}
              >
                <div className="bg-[#f1f2f4] rounded-xl h-fit max-h-96 w-72 min-w-72 max-w-full p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-gray-800 wrap-anywhere sticky">
                      {card.name}
                    </h2>
                    <button
                      onMouseDown={() => {
                        deleteCard(card.id);
                      }}
                      className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl"
                    >
                      <RxCross2 />
                    </button>
                  </div>

                  <div className="w-full px-2 overflow-y-auto max-h-72 min-h-0">
                    <SortableContext
                      items={
                        taskOrder[card.id]?.map((task: string) => task) || []
                      }
                      strategy={verticalListSortingStrategy}
                    >
                      {taskOrder[card.id]?.map((task, index) => {
                        const [label] = task.split("__");
                        const isEditing =
                          editTask?.cardId === card.id &&
                          editTask.index === index;

                        return (
                          <SortableTask
                            key={task}
                            id={task}
                            cardId={card.id}
                            isEditing={isEditing}
                          >
                            <div
                              key={task}
                              className={`bg-white rounded-lg mt-2 p-3 mb-2 shadow hover:shadow-md transition flex justify-between items-start
                                
                          
                                `}
                            >
                              {isEditing ? (
                                <EditingTask
                                  editedValue={editedValue}
                                  setEditedValue={setEditedValue}
                                  setEditTask={setEditTask}
                                  handleEditTask={handleEditTask}
                                />
                              ) : (
                                <TaskShown
                                  activeTaskId={activeTaskId}
                                  task={task}
                                  taskName={label}
                                  cardId={card.id}
                                  index={index}
                                  startEditingTask={startEditingTask}
                                  handleDeleteTask={handleDeleteTask}
                                />
                              )}
                            </div>
                          </SortableTask>
                        );
                      })}
                    </SortableContext>
                  </div>
                </div>
              </SortableCard>
            );
          })}
        </SortableContext>
        {activeTaskId && (
          <DragOverlay>
            <div className="bg-white text-sm h-full rounded-lg mt-2 p-3 mb-2 shadow hover:shadow-md transition break-words">
              {/* {car} */}
              {activeTaskId.split("__")[0]}
            </div>

            {/* {activeTaskId && <TaskComponent task={activeTaskId} isOverlay />} */}
          </DragOverlay>
        )}
      </DndContext>
      {/* </ClientOnlyWrapper>
       */}
    </>
  );
}

{
  /* <div className="flex justify-between items-center w-full">
                                      <p className="text-sm text-gray-800 w-36 break-words">
                                        {label}
                                      </p>
                                      <div className="flex gap-2">
                                        <button
                                          className="text-gray-600 hover:bg-[#bababa] py-1.5 px-1.5 rounded text-xl"
                                          onMouseDown={() =>
                                            startEditingTask(card.id, index)
                                          }
                                        >
                                          <MdEdit />
                                        </button>
                                        <button
                                          onMouseDown={() => {
                                            toast.error(
                                              "Task removed successfully",
                                              { duration: 2000 }
                                            );
                                            handleDeleteTask(card.id, index);
                                          }}
                                          className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl"
                                        >
                                          <MdDelete />
                                        </button>
                                      </div> */
}
{
  /* </div> */
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
