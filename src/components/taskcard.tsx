"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CardList from "./cards";
import ToggleAddCard from "./toggleAddCard";
import AddTask from "./addTask";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type Card = {
  id: number;
  name: string;
};

export default function CardTask() {
  const [toggle, setToggle] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: "Todo" },
    { id: 2, name: "Doing" },
    { id: 3, name: "Done" },
  ]);
  const [selectedCard, setSelectedCard] = useState<"" | number>("");
  const [taskValue, setTaskValue] = useState("");
  const [tasks, setTasks] = useState<Record<number, string[]>>({
    1: [],
    2: [],
    3: [],
  });
  const [cardId, setCardId] = useState(4);
  const [editTask, setEditTask] = useState<{
    cardId: number;
    index: number;
  } | null>(null);
  const [editedValue, setEditedValue] = useState("");

  const handleEditTask = () => {
    if (!editedValue.trim() || editTask === null) {
      toast.dismiss();
      toast.error("Please enter something...", {
        duration: 1000,
      });
      return;
    }
    const { cardId, index } = editTask;
    const updatedTasks = { ...tasks };
    const originalTask = updatedTasks[cardId][index];
    const [, uniqueId] = originalTask.split("__");
    const newTaskValue = `${editedValue}__${uniqueId}`;
    updatedTasks[cardId][index] = newTaskValue;
    setTasks(updatedTasks);
    setEditTask(null);
    setEditedValue("");
    toast.dismiss();
    toast.success("Task edited successfully", {
      duration: 1000,
    });
  };

  const handleAddCard = () => {
    if (!cardName.trim()) {
      toast.error("Please enter...", {
        duration: 1000,
      });
      return;
    }

    const newCard = { id: cardId, name: cardName };
    setCards([...cards, newCard]);
    setTasks({ ...tasks, [cardId]: [] });
    setCardName("");
    setCardId(cardId + 1);
    setToggle(false);
  };

  const handleAddTask = () => {
    if (!taskValue.trim() && !selectedCard) {
      toast.dismiss();
      toast.error("Please enter task and select a card", { duration: 1000 });
      return;
    }
    if (!taskValue.trim()) {
      toast.dismiss();
      toast.error("Please enter a task", { duration: 1000 });
      return;
    }
    if (!selectedCard || typeof selectedCard !== "number") {
      toast.dismiss();
      toast.error("Please select a card", { duration: 1000 });
      return;
    }

    const uniqueTask = `${taskValue}__${Date.now()}`;
    const updatedTasks = { ...tasks };
    if (selectedCard in updatedTasks) {
      updatedTasks[selectedCard].push(uniqueTask);
    } else {
      updatedTasks[selectedCard] = [uniqueTask];
    }
    setTasks(updatedTasks);
    setTaskValue("");
    setSelectedCard("");
  };

  const handleDeleteTask = (cardId: number, taskIndex: number) => {
    const updatedTasks = { ...tasks };
    if (cardId in updatedTasks) {
      updatedTasks[cardId].splice(taskIndex, 1);
      setTasks(updatedTasks);
    }
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
    const updatedTasks = { ...tasks };
    delete updatedTasks[id];
    setTasks(updatedTasks);
  };

  const toggleFunction = () => {
    setToggle(!toggle);
  };

  return (
    <div className="bg-gradient-to-r from-[#795fc5] to-[#e574bb] md:h-[91.3vh] max-[767px]:min-h-screen pt-4 w-full">
      <AddTask
        taskValue={taskValue}
        setTaskValue={setTaskValue}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cards={cards}
        handleAddTask={handleAddTask}
      />

      <div className="px-4 md:px-14 h-fit">
        <div
          className="flex flex-nowrap w-full gap-4 overflow-x-auto scroll-smooth
          [&::-webkit-scrollbar]:h-3
          [&::-webkit-scrollbar-track]:bg-white
          [&::-webkit-scrollbar-thumb]:bg-[#c5c5c5] hover:[&::-webkit-scrollbar-thumb]:bg-[#b1b1b1]
          transition-all duration-300"
        >
          <CardList
            cards={cards}
            tasks={tasks}
            handleDeleteCard={handleDeleteCard}
            handleDeleteTask={handleDeleteTask}
            editTask={editTask}
            setEditTask={setEditTask}
            editedValue={editedValue}
            setEditedValue={setEditedValue}
            handleEditTask={handleEditTask}
            updateTasks={(newTaskOrder) => setTasks(newTaskOrder)}
            setCards={setCards}
          />
          <div className="text-white h-fit w-72 min-w-72 mb-80">
            {toggle ? (
              <motion.div
                key="toggle-card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ToggleAddCard
                  cardName={cardName}
                  setCardName={setCardName}
                  handleAddCard={handleAddCard}
                  toggleFunction={toggleFunction}
                />
              </motion.div>
            ) : (
              <motion.button
                key="add-btn"
                onClick={toggleFunction}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full min-w-72 cursor-pointer flex items-center justify-center bg-[#bb8cd0] hover:bg-[#a170b8] p-5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform shadow-md"
              >
                <IoMdAdd className="text-xl animate-pulse" />
                Add another card
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
