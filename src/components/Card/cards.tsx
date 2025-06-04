"use client";

import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import {
  DndContext,
  // closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  DragOverlay,
  rectIntersection,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "@/dnd-kit/sortableTask";
import { SortableCard } from "@/dnd-kit/sortableCard";
import TaskShown from "../Task/taskShowsinCard";
import EditingTask from "../Task/editingTask";
// import { Draggable } from "@/dnd-kit/dragable";
import { listeners } from "process";

export interface Card {
  id: number;
  name: string;
}

interface CardListProps {
  cards: Card[];
  tasks: Record<number, string[]>;
  // handleDeleteCard: (cardId: number) => void;
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
  // handleDeleteCard,
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
  /// i removed unused activeCardId
  const [, setActiveCardId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [overCardId, setOverCardId] = useState<number | null>(null);
  const activeTaskRef = useRef<HTMLDivElement>(null);

  // i removed unused taskDimensions
  const [, setTaskDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (activeTaskRef.current) {
      const { offsetWidth, offsetHeight } = activeTaskRef.current;
      setTaskDimensions({ width: offsetWidth, height: offsetHeight });
      console.log("offsetWidth: ", offsetWidth, "offsetHeight", offsetHeight);
    }

    setCardOrder(cards.map((c) => c.id));
    setTaskOrder(tasks);
  }, [cards, tasks]);

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
    } else if (type === "card") {
      setActiveCardId(active.id.toString());
      // console.log(active.id);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setOverId(null);
      setOverCardId(null);
      return;
    }

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "task") {
      setOverId(over.id.toString());
      // console.log(activeType);

      if (overType === "task") {
        setOverCardId(over.data.current?.cardId);
        // console.log(overType);
      } else {
        setOverCardId(Number(over.id));
        // console.log(over.id);
      }
    }

    if (activeType === "card") {
      setOverId(over.id.toString());
      // console.log(over.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null);
    setActiveCardId(null);
    setOverId(null);
    setOverCardId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();
    const activeType = active.data.current?.type;

    if (activeType === "card") {
      const activeCardIndex = cardOrder.findIndex(
        (id) => id.toString() === activeId
      );
      let newIndex = activeCardIndex;
      const overCardIndex = cardOrder.findIndex(
        (id) => id.toString() === overId
      );
      if (overCardIndex !== -1) {
        if (activeCardIndex < overCardIndex) {
          newIndex = overCardIndex;
        } else {
          newIndex = overCardIndex;
        }
      }
      if (newIndex !== activeCardIndex && newIndex >= 0) {
        const newCardOrder = arrayMove(cardOrder, activeCardIndex, newIndex);
        setCardOrder(newCardOrder);
        setCards(arrayMove(cards, activeCardIndex, newIndex));
      }
      return;
    }
    if (activeType === "task") {
      const activeCardId = active.data.current?.cardId;
      const overType = over.data.current?.type;
      let targetCardId: number;
      if (overType === "task") {
        targetCardId = over.data.current?.cardId;
      } else {
        targetCardId = Number(overId);
      }
      if (activeCardId === undefined || targetCardId === undefined) return;
      const activeTasks = taskOrder[activeCardId] || [];
      const targetTasks = taskOrder[targetCardId] || [];
      const oldIndex = activeTasks.findIndex((t) => t === activeId);
      if (activeCardId === targetCardId) {
        let newIndex = targetTasks.length;
        if (overType === "task") {
          newIndex = targetTasks.indexOf(overId);
        }
        const newTasks = arrayMove(activeTasks, oldIndex, newIndex);
        const newTaskOrder = { ...taskOrder, [activeCardId]: newTasks };
        setTaskOrder(newTaskOrder);
        updateTasks(newTaskOrder);
      } else {
        const newSource = [...activeTasks];
        newSource.splice(oldIndex, 1);
        const newTarget = [...targetTasks];
        let insertIndex = newTarget.length;
        if (overType === "task") {
          insertIndex = newTarget.indexOf(overId);
        }
        newTarget.splice(insertIndex, 0, activeId);
        const newTaskOrder = {
          ...taskOrder,
          [activeCardId]: newSource,
          [targetCardId]: newTarget,
        };
        setTaskOrder(newTaskOrder);
        updateTasks(newTaskOrder);
      }
    }
  };

  const deleteTask = (cardId: number, index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will remove the task permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // handleDeleteCard(id);
        handleDeleteTask(cardId, index)
        Swal.fire({
          title: "Deleted!",
          text: "Task removed successfully.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const getDropIndicatorIndex = (cardId: number) => {
    if (!activeTaskId || overCardId !== cardId) return -1;
    const cardTasks = taskOrder[cardId] || [];
    if (cardTasks.length === 0) return 0;
    const overIndex = cardTasks.findIndex((task) => task === overId);
    return overIndex >= 0 ? overIndex : cardTasks.length;
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        // collisionDetection={closestCenter}
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <SortableContext
          items={cardOrder.map((id) => id.toString())}
          // items={cardOrder.map(String)}
          strategy={horizontalListSortingStrategy}
        >
          {cardOrder.map((cardId) => {
            const card = cards.find((c) => c.id === cardId);
            if (!card) return null;
            
            const dropIndicatorIndex = getDropIndicatorIndex(cardId);
            const cardTasks = taskOrder[card.id] || [];
            // console.log(card.id);
            return (
              // <div className="" key={cardId}>

              // sortableCard children prop used here
              <SortableCard key={cardId} id={card.id.toString()} card={card}>
                {({ listeners }) => (
                  <div
                    {...listeners}
                    className="bg-gray-100 rounded-xl h-fit max-h-96 w-72 min-w-72 max-w-full p-4"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-[#000000] wrap-anywhere sticky">
                        {card.name}
                      </h2>
                      {/* <button
                        onMouseDown={() => {
                          deleteCard(card.id);
                        }}
                        className="text-gray-600 hover:bg-[#bababa] p-1.5 rounded text-xl"
                      >
                        <RxCross2 />
                      </button> */}
                    </div>

                    <div
                      className="w-full px-2 overflow-y-auto 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-sm
                    [&::-webkit-scrollbar-thumb]:rounded-sm
                  [&::-webkit-scrollbar-track]:bg-[white]
                  [&::-webkit-scrollbar-thumb]:bg-[#dab0ed] hover:[&::-webkit-scrollbar-thumb]:bg-[#bb8cd0]
                    transition-all duration-500 
                    max-h-72"
                    >
                      <SortableContext
                        items={cardTasks}
                        strategy={verticalListSortingStrategy}
                      >
                        {dropIndicatorIndex === 0 && (
                          <div className="h-2 bg-[#bb8cd0] rounded-full my-4 mb-2 opacity-75"></div>
                        )}
                        {cardTasks.map((task, index) => {
                          const [label] = task.split("__");
                          const isEditing =
                            editTask?.cardId === card.id &&
                            editTask.index === index;
                          return (
                            <div className="h-fit" key={task}>
                              <SortableTask
                                id={task}
                                cardId={card.id}
                                isEditing={isEditing}
                              >
                                <div className="bg-white rounded-lg mt-2 p-3 mb-2 shadow hover:shadow-md transition flex justify-between items-start">
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
                                      // handleDeleteTask={handleDeleteTask}
                                      deleteTask={deleteTask}
                                    />
                                  )}
                                </div>
                              </SortableTask>

                              {dropIndicatorIndex !== 0 &&
                                dropIndicatorIndex === index + 1 && (
                                  <div className="h-2 bg-[#bb8cd0] rounded-full mb-2 opacity-75"></div>
                                )}
                            </div>
                          );
                        })}

                        {dropIndicatorIndex !== 0 &&
                          ((cardTasks.length === 0 &&
                            overCardId === card.id &&
                            activeTaskId) ||
                            (dropIndicatorIndex === cardTasks.length &&
                              cardTasks.length > 0)) && (
                            <div className="h-2 bg-[#bb8cd0] my-4 rounded-full mb-2 opacity-75"></div>
                          )}
                      </SortableContext>
                    </div>
                  </div>
                )}
              </SortableCard>
              //  </div>
            );
          })}
        </SortableContext>

        {activeTaskId && (
          <DragOverlay>
            <div
              className="bg-white text-sm rounded-lg p-3 shadow-lg transition break-words border-2 border-[#bb8cd0]"
              style={{
                // width: taskDimensions.width || "auto",
                // minHeight: "50px",
                opacity: 0.9,
              }}
            >
              {activeTaskId.split("__")[0]}
            </div>
          </DragOverlay>
        )}
      </DndContext>
    </>
  );
}
