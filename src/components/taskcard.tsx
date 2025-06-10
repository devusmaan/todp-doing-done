"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import CardList from "./Card/cards";
import ToggleAddCard from "./Card/toggleAddCard";
// import AddTask from "./Task/addTask";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  saveCard,
  saveTasks,
  saveUserData,
  subscribeToUserData,
} from "@/firebase/firebasefirestore";
import { useAuth } from "@/context/use-auth";
import Loader from "./UI/Loader";
import Swal from "sweetalert2";

type Card = {
  id: number;
  name: string;
};

export default function CardTask() {
  const { user, loading } = useAuth();
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const showSwal = () => {
    Swal.fire({
      title: "Good job!",
      text: "You added the card!",
      icon: "success",
    });
  };

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = subscribeToUserData(user.uid, (data) => {
      if (data.cards) {
        setCards(data.cards);
        const maxId = Math.max(...data.cards.map((card) => card.id), 0);
        setCardId(maxId + 1);
        if (data.tasks) {
          setTasks(data.tasks);
        }
      }
      setIsDataLoaded(true);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || !isDataLoaded) return;

    const timeoutId = setTimeout(() => {
      saveUserData(user.uid, cards, tasks);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cards, tasks, user?.uid, isDataLoaded]);

  const handleEditTask = useCallback(() => {
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

    if (user?.uid) {
      saveTasks(user.uid, updatedTasks);
    }

    toast.dismiss();
    toast.success("Task edited successfully", {
      duration: 1000,
    });
  }, [editedValue, editTask, tasks, user?.uid]);

  const handleAddCard = useCallback(() => {
    if (!cardName.trim()) {
      toast.dismiss();
      toast.error("Please enter card name", {
        duration: 1000,
      });
      return;
    }

    const isDuplicate = cards.some(
      (card) => card.name.trim().toLowerCase() === cardName.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Card name already exists", {
        duration: 1000,
      });
      return;
    }

    const newCard = { id: cardId, name: cardName };
    const updatedCards = [...cards, newCard];
    const updatedTasks = { ...tasks, [cardId]: [] };

    setCards(updatedCards);
    setTasks(updatedTasks);
    setCardName("");
    setCardId(cardId + 1);
    setToggle(false);

    if (user?.uid) {
      saveUserData(user.uid, updatedCards, updatedTasks);
      showSwal();
    }
  }, [cardName, cardId, cards, tasks, user, setCards, setTasks]);

  const handleAddTask = useCallback(() => {
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

    if (user?.uid) {
      saveTasks(user.uid, updatedTasks);
    }

    toast.success("Task added successfully", {
      duration: 1000,
    });
  }, [taskValue, selectedCard, tasks, user?.uid]);

  const handleDeleteTask = useCallback(
    async (cardId: number, taskIndex: number) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will remove the task permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const updatedTasks = { ...tasks };
        if (cardId in updatedTasks) {
          updatedTasks[cardId].splice(taskIndex, 1);
          setTasks(updatedTasks);

          if (user?.uid) {
            saveTasks(user.uid, updatedTasks);
          }

          await Swal.fire({
            title: "Deleted!",
            text: "Task removed successfully.",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
        }
      }
    },
    [tasks, user?.uid]
  );

  const updateTasks = useCallback(
    (newTaskOrder: Record<number, string[]>) => {
      setTasks(newTaskOrder);
      if (user?.uid) {
        saveTasks(user.uid, newTaskOrder);
      }
    },
    [user?.uid]
  );

  const updateCards = useCallback(
    (newCards: Card[]) => {
      setCards(newCards);

      if (user?.uid) {
        saveCard(user.uid, newCards);
      }
    },
    [user?.uid]
  );

  const toggleFunction = () => {
    setToggle(!toggle);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-r from-[#795fc5] to-[#e574bb] md:h-[91.3vh] max-[767px]:min-h-screen pt-4 w-full">
      {/* <AddTask
        taskValue={taskValue}
        setTaskValue={setTaskValue}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cards={cards}
        handleAddTask={handleAddTask}
      /> */}

      {/* {toggle ? (
        <ToggleAddCard
          cardName={cardName}
          setCardName={setCardName}
          handleAddCard={handleAddCard}
          toggleFunction={toggleFunction}
        />
      ) : (
        <div className="flex justify-center">
          <motion.button
            key="add-btn"
            onClick={toggleFunction}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-72 cursor-pointer flex items-center justify-center bg-[#bb8cd0] hover:bg-[#a170b8] p-5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform shadow-md"
          >
            <IoMdAdd className="text-xl animate-pulse" />
            Add another card
          </motion.button>
        </div>
      )} */}

      <div className="px-4 md:px-14 mt-8">
        <div
          className="flex flex-nowrap w-full gap-4 overflow-x-auto overflow-y-hidden
          [&::-webkit-scrollbar]:h-3
          [&::-webkit-scrollbar-track]:bg-white
          [&::-webkit-scrollbar-thumb]:bg-[#c5c5c5] hover:[&::-webkit-scrollbar-thumb]:bg-[#b1b1b1]
          transition-all duration-300"
        >
          <CardList
            taskValue={taskValue}
            setTaskValue={setTaskValue}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            handleAddTask={handleAddTask}
            cards={cards}
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            editTask={editTask}
            setEditTask={setEditTask}
            editedValue={editedValue}
            setEditedValue={setEditedValue}
            handleEditTask={handleEditTask}
            updateTasks={updateTasks}
            setCards={updateCards}
          />


          <div className="text-white h-fit mb-[365px]">
            {toggle ? (
              <ToggleAddCard
                cardName={cardName}
                setCardName={setCardName}
                handleAddCard={handleAddCard}
                toggleFunction={toggleFunction}
              />
            ) : (
              <motion.button
                key="add-btn"
                onClick={toggleFunction}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-72 cursor-pointer flex items-center justify-center bg-[#bb8cd0] hover:bg-[#a170b8] p-5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform shadow-md"
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
