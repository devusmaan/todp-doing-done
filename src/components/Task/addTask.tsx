"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";

type Card = {
  id: number;
  name: string;
};

type AddTaskType = {
  taskValue: string;
  setTaskValue: Dispatch<SetStateAction<string>>;
  selectedCard: string | number;
  setSelectedCard: Dispatch<SetStateAction<"" | number>>;
  cards: Card[];
  handleAddTask: () => void;
};

export default function AddTask({
  taskValue,
  setTaskValue,
  selectedCard,
  setSelectedCard,
  cards,
  handleAddTask,
}: AddTaskType) {
  const cardOptions = cards.map((card) => ({
    value: card.id,
    label: card.name,
  }));

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleClickFunc = () => {
    if (!taskValue.trim() && !selectedCard) {
      toast.dismiss();
      toast.error("Please enter task and select a card", {
        duration: 1000,
      });
      return;
    }

    if (!taskValue.trim()) {
      toast.dismiss();
      toast.error("Please enter task", {
        duration: 1000,
      });
      return;
    }

    if (!selectedCard || typeof selectedCard !== "number") {
      toast.dismiss();
      toast.error("Please select a card", {
        duration: 1000,
      });
      return;
    }

    handleAddTask();

    // toast.dismiss();
    // toast.success("Task added successfully", {
    //   duration: 1000,
    // });

    setTaskValue("");
    setSelectedCard("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-5">
      <div className="bg-gray-100 rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:space-x-4 gap-4">
        <div className="w-full flex justify-center md:justify-start">
          <input
            className="w-full max-w-xs py-2 px-4 bg-[#bb8cd0] text-white placeholder-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
            type="text"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            placeholder="Enter task"
          />
        </div>

        <div className="w-full flex justify-center md:justify-start">
          <div className="w-full max-w-xs">
            <Select
              options={cardOptions}
              value={
                cardOptions.find((opt) => opt.value === selectedCard) || null
              }
              onChange={(option) => setSelectedCard(option ? option.value : "")}
              placeholder="Select Card"
              isClearable
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#bb8cd0",
                  borderRadius: "0.5rem",
                  padding: "2px",
                  boxShadow: "none",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f3e6f8" : "white",
                  color: "#4b2564",
                }),
              }} />
          </div>
        </div>

        <div className="w-full flex justify-center md:justify-start">
          <button
            className="w-full max-w-xs py-2 px-6 bg-[rgb(187,140,208)] text-white rounded-lg hover:bg-[#a270bd] transition duration-200"
            onClick={handleClickFunc}
          >
            Add Task
          </button>
        </div>
      </div>
        <Toaster position="top-center" reverseOrder={false} />
   
    </div>
  );
}
