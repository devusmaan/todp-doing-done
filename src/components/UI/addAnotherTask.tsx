"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Card } from "../Card/cards";
import toast from "react-hot-toast";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";


type AddAnotherTaskType = {
  cardName: string;
  taskValue: string;
  setTaskValue: Dispatch<SetStateAction<string>>;
  setSelectedCard: Dispatch<SetStateAction<"" | number>>;
  cards: Card[];
  handleAddTask: () => void;
};

export default function AddAnotherTask({
  cardName,
  taskValue,
  setTaskValue,
  setSelectedCard,
  cards,
  handleAddTask,
}: AddAnotherTaskType) {
  const [toggle, setToggle] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  
  useOnClickOutside(containerRef, () => {
    if (!toggle) {
      setToggle(true);
      setTaskValue("");
    }
  });

  
  useEffect(() => {
    if (!toggle) {
      inputRef.current?.focus();
      const matchingCard = cards.find(
        (card) => card.name.toLowerCase() === cardName.toLowerCase()
      );
      if (matchingCard) {
        setSelectedCard(matchingCard.id);
      }
    }
  }, [toggle, cardName, cards, setSelectedCard]);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (!taskValue.trim()) {
        toast.dismiss();
        toast.error("Please enter task", {
          duration: 1000,
        });
        return;
      }
      handleAddTask();
      setToggle(true);
    }
  };

  const addTask = () => {
    if (!taskValue.trim()) {
      toast.dismiss();
      toast.error("Please enter task", {
        duration: 1000,
      });
      return;
    }
    handleAddTask();
    setTaskValue("");
    setToggle(true);
  };

  return (
    <div ref={containerRef}>
      {toggle ? (
        <button
          onClick={() => {
            setToggle(false);
            setTaskValue("");
          }}
          className="w-full text-[#727272] min-w-45 cursor-pointer flex items-center mt-1 pl-3 hover:bg-[#dedede] py-2.5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform"
        >
          <IoMdAdd className="text-sm text-[#101010] font-bold" />
          Add another task
        </button>
      ) : (
        <div className="flex w-full gap-1.5 button-addtask mt-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter task"
            draggable={false}
            onKeyDown={handleKeyDown}
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            className="p-1.5 border border-gray-300 text-black rounded-xl pl-2 text-sm w-10/12 focus:outline-none focus:ring-2 focus:ring-[#a67bba]"
          />

          <button
            onClick={() => {
              setToggle(true);
              setTaskValue("");
            }}
            className="text-gray-600 hover:bg-[#bababa] px-2 my-1 text-sm rounded"
          >
            <RxCross2 />
          </button>

          <button
            onClick={addTask}
            className="bg-[#bb8cd0] text-white text-sm px-2 my-1 rounded hover:bg-[#a67bba]"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}