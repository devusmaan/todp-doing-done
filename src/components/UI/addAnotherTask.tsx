"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Card } from "../Card/cards";

type AddAnotherTaskType = {
  cardName: string;
  taskValue: string;
  setTaskValue: Dispatch<SetStateAction<string>>;
  selectedCard: string | number;
  setSelectedCard: Dispatch<SetStateAction<"" | number>>;
  cards: Card[];
  handleAddTask: () => void;
};

export default function AddAnotherTask({
  cardName,
  taskValue,
  setTaskValue,
  selectedCard,
  setSelectedCard,
  cards,
  handleAddTask,
}: AddAnotherTaskType) {
  const [toggle, setToggle] = useState(true);

  const addTask = () => {};

  return (
    <div>
      {toggle ? (
        <button
          onMouseDown={() => {
            setToggle(false);
          }}
          className="w-full min-w-45 cursor-pointer flex items-center mt-0.5 pl-3 hover:bg-[#ececec] py-2.5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform"
        >
          <IoMdAdd className="text-sm animate-pulse" />
          Add another task
        </button>
      ) : (
        <div className="flex w-full gap-1.5">
          <input
            autoFocus
            // data-no-dnd
            draggable={false}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onDragStart={(e) => e.preventDefault()}
            type="text"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            className="p-2 border border-gray-300 rounded text-sm w-10/12"
          />

          <button
            onMouseDown={() => {
              setToggle(true);
            }}
            className="text-gray-600 hover:bg-[#bababa] px-2 my-1 text-sm rounded"
          >
            <RxCross2 />
          </button>
          <button
            // onMouseDown={handleEditTask}
            className="bg-[#bb8cd0] text-white text-sm px-2 my-1 rounded hover:bg-[#a67bba]"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
