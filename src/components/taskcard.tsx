"use client";

import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import CardList from './cards';
import ToggleAddCard from './toggleAddCard';
import AddTask from './addTask';
import toast from 'react-hot-toast';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { motion } from 'framer-motion';

type Card = {
    id: number;
    name: string;
};

export default function CardTask() {
    const [toggle, setToggle] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cards, setCards] = useState<Card[]>([
        { id: 1, name: 'Todo' },
        { id: 2, name: 'Doing' },
        { id: 3, name: 'Done' },
    ]);
    const [selectedCard, setSelectedCard] = useState<'' | number>('');
    const [taskValue, setTaskValue] = useState('');
    const [tasks, setTasks] = useState<Record<number, string[]>>({
        1: [],
        2: [],
        3: [],
    });
    const [error, setError] = useState<string | null>(null);
    const [error1, setError1] = useState("");
    const [cardId, setCardId] = useState(4);
    const [editTask, setEditTask] = useState<{ cardId: number; index: number } | null>(null);
    const [editedValue, setEditedValue] = useState('');

    const handleEditTask = () => {
        if (!editedValue.trim() || editTask === null) {
            toast.dismiss();
            toast.error("Please enter something...", {
                duration: 2000,
            });
            return;
        }

        const { cardId, index } = editTask;
        const updatedTasks = { ...tasks };
        updatedTasks[cardId][index] = editedValue;

        setTasks(updatedTasks);
        setEditTask(null);
        setEditedValue('');
        toast.dismiss();
        toast.success("Task edited successfully", {
            duration: 2000,
        });
    };

    // const handleEditTask = () => {
    //     if (!editedValue.trim() || editTask === null) {
    //         toast.dismiss()
    //         toast.error("Please enter something...", {
    //             duration: 2000
    //         })
    //         return;
    //     }

    //     const { cardId, index } = editTask;
    //     const updatedTasks = { ...tasks }
    //     updatedTasks[cardId][index] = editedValue

    //     setTasks(updatedTasks);
    //     setEditTask(null);
    //     setEditedValue('');
    //     toast.dismiss();
    //     toast.success("Task edited successfully", {
    //         duration: 2000
    //     });

    // }

    const errorRemoverFunc = () => {
        setTimeout(() => {
            setError("");
        }, 3000);
        return;
    };

    const handleAddCard = () => {
        if (!cardName.trim()) {
            setError1('Please enter...');
            setTimeout(() => {
                setError1("");
            }, 2000);
            return;
        }

        const newCard = { id: cardId, name: cardName };
        setCards([...cards, newCard]);
        setTasks({ ...tasks, [cardId]: [] });
        setCardName('');
        setCardId(cardId + 1);
        setError(null);
        setToggle(false);
    };

    const handleAddTask = () => {
        if (!taskValue.trim() && !selectedCard) {
            setError('Please enter task and select a card');
            errorRemoverFunc();
            return;
        }

        if (!taskValue.trim()) {
            setError('Please enter a task');
            errorRemoverFunc();
            return;
        }
        if (!selectedCard || typeof selectedCard !== 'number') {
            setError('Please select a card');
            errorRemoverFunc();
            return;
        }

        const updatedTasks = { ...tasks };
        if (selectedCard in updatedTasks) {
            updatedTasks[selectedCard].push(taskValue);
        } else {
            updatedTasks[selectedCard] = [taskValue];
        }
        setTasks(updatedTasks);
        setTaskValue('');
        setSelectedCard("");
        setError(null);
    };

    const handleDeleteTask = (cardId: number, taskIndex: number) => {
        const updatedTasks = { ...tasks };
        if (cardId in updatedTasks) {
            updatedTasks[cardId].splice(taskIndex, 1);
            setTasks(updatedTasks);
        }
    };

    // const handleDeleteTask = (cardId: number, taskIndex: number) => {
    //         const updatedTasks = { ...tasks }
    //         if (cardId in updatedTasks) {
    //             updatedTasks[cardId].splice(taskIndex, 1);
    //             setTasks(updatedTasks)
    //         }
    //     }

    const handleDeleteCard = (id: number) => {
        setCards(cards.filter((card) => card.id !== id));
        const updatedTasks = { ...tasks };
        delete updatedTasks[id];
        setTasks(updatedTasks);
    };

    const toggleFunction = () => {
        setToggle(!toggle);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const fromId = parseInt(active.data?.current?.parentId);
        const toId = parseInt(over?.id as string);

        if (fromId === toId) return;

        const task = active.id as string;
        setTasks((prev) => {
            const newTasks = { ...prev };
            newTasks[fromId] = newTasks[fromId].filter((t) => t !== task);
            newTasks[toId] = [...(newTasks[toId] || []), task];
            return newTasks;
        });
    };

    return (
        <div className="bg-gradient-to-r from-[#795fc5] to-[#e574bb] min-h-screen pt-10 w-full">
            <DndContext onDragEnd={handleDragEnd}>
                <AddTask
                    taskValue={taskValue}
                    setTaskValue={setTaskValue}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    cards={cards}
                    handleAddTask={handleAddTask}
                    error={error}
                />

                <div className="mt-7 px-4 md:px-14">
                    <div
                        className="flex flex-nowrap w-full gap-4 overflow-x-auto pb-4 scroll-smooth
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
                        />

                        <div className="text-white h-fit w-72 min-w-72">
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
                                        error1={error1}
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
                                    className="w-full mb-64 min-w-72 cursor-pointer flex items-center justify-center bg-[#bb8cd0] hover:bg-[#a170b8] p-5 rounded-xl gap-1 text-sm font-bold transition-all duration-300 ease-in-out transform shadow-md"
                                >
                                    <IoMdAdd className="text-xl animate-pulse" />
                                    Add another card
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </DndContext>
        </div>
    );
}


// const handleAddCard = () => {
//         if (!cardName.trim()) {
//             setError1('Please enter...');
//             setTimeout(() => {
//                 setError1("")
//             }, 2000);
//             return
//         }

//         const newCard = { id: cardId, name: cardName };
//         setCards([...cards, newCard]);
//         setTasks({ ...tasks, [cardId]: [] });
//         setCardName('');
//         setCardId(cardId + 1);
//         setError(null);
//         setToggle(false);
//     };

//     const handleAddTask = () => {


//         if (!taskValue.trim() && !selectedCard) {
//             setError('Please enter task and select a card');
//             errorRemoverFunc();
//             return;
//         }

//         if (!taskValue.trim()) {
//             setError('Please enter a task');
//             errorRemoverFunc();
//             return;
//         }
//         if (!selectedCard || typeof selectedCard !== 'number') {
//             setError('Please select a card');
//             errorRemoverFunc();
//             return;
//         }

//         const updatedTasks = { ...tasks };
//         if (selectedCard in updatedTasks) {
//             updatedTasks[selectedCard].push(taskValue);
//         } else {
//             updatedTasks[selectedCard] = [taskValue];
//         }
//         setTasks(updatedTasks);
//         setTaskValue('');
//         setSelectedCard("");
//         setError(null);
//     };


//     const handleDeleteTask = (cardId: number, taskIndex: number) => {
//         const updatedTasks = { ...tasks }
//         if (cardId in updatedTasks) {
//             updatedTasks[cardId].splice(taskIndex, 1);
//             setTasks(updatedTasks)
//         }
//     }

//     const handleDeleteCard = (id: number) => {
//         setCards(cards.filter((card) => card.id !== id));
//         const updatedTasks = { ...tasks }
//         delete updatedTasks[id];
//         setTasks(updatedTasks);

//     }


//     const toggleFunction = () => {
//         if (toggle === true) {
//             setToggle(false)
//         } else {
//             setToggle(true)
//         }
//     }
