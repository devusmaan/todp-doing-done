"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Card } from "../Card/cards";
import toast from "react-hot-toast";

type AddAnotherTaskType = {
  cardName: string;
  taskValue: string;
  setTaskValue: Dispatch<SetStateAction<string>>;
  // selectedCard: string | number;
  setSelectedCard: Dispatch<SetStateAction<"" | number>>;
  cards: Card[];
  handleAddTask: () => void;
};

export default function AddAnotherTask({
  cardName,
  taskValue,
  setTaskValue,
  // selectedCard,
  setSelectedCard,
  cards,
  handleAddTask,
}: AddAnotherTaskType) {
  const [toggle, setToggle] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  // const addTaskRef = useRef();

  // const handleClickClosePanelFromOutside = (e: any) => {
  //   if (e.target.className !== "button-addtask") {
  //     setToggle(true);
  //     // console.log(elementRef);
  //   }
  // };

  // useEffect(() => {
  //   document.body.addEventListener(
  //     "mousedown",
  //     handleClickClosePanelFromOutside
  //   );
  //   // element.addEventListener("click", handleClickClosePanelFromOutside)
  //   return () => {
  //     document.body.removeEventListener(
  //       // element.removeEventListener(
  //       "click",
  //       handleClickClosePanelFromOutside
  //     );
  //     setTaskValue("");
  //   };
  // }, [toggle]);

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (addTaskRef.current.contains(e.target)){
  //       setToggle(false)
  //       console.log(addTaskRef.current);

  //     }
  //   }
  // });

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

  // const onBlurFunc = () => {
  //   setToggle(true);
  //   setTaskValue("");
  // };


  return (
    <div>
      {toggle ? (
        <button
          onMouseDown={() => {
            setToggle(false);
          }}
          className="w-full text-[#727272] min-w-45 cursor-pointer flex items-center mt-1 pl-3 hover:bg-[#dedede] py-2.5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform"
        >
          <IoMdAdd className="text-sm text-[#101010] font-bold" />
          Add another task
        </button>
      ) : (
        <div
          // onBlur={() => onBlurFunc()}
          // ref={addTaskRef}
          className="flex w-full gap-1.5 button-addtask mt-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter task"
            draggable={false}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onDragStart={(e) => e.preventDefault()}
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            className="p-1.5 border border-gray-300 rounded-2xl pl-2 text-sm w-10/12 focus:outline-none focus:ring-2 focus:ring-[#a67bba]"
          />

          <button
            onMouseDown={() => {
              setToggle(true);
              setTaskValue("");
            }}
            className="text-gray-600 hover:bg-[#bababa] px-2 my-1 text-sm rounded"
          >
            <RxCross2 />
          </button>

          <button
            onMouseDown={addTask}
            className="bg-[#bb8cd0] text-white text-sm px-2 my-1 rounded hover:bg-[#a67bba]"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
