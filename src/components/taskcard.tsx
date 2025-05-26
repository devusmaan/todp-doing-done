"use client"

import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import CardList from './cards';
import ToggleAddCard from './toggleAddCard';
import AddTask from './addTask';
import toast from 'react-hot-toast';


type Card = {
    id: number;
    name: string;
}

export default function CardTask() {
    const [toggle, setToggle] = useState(false)
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
            toast.dismiss()
            toast.error("Please enter something...", {
                duration: 2000
            })
            return;
        }

        const { cardId, index } = editTask;
        const updatedTasks = { ...tasks }
        updatedTasks[cardId][index] = editedValue

        setTasks(updatedTasks);
        setEditTask(null);
        setEditedValue('');
        toast.dismiss();
        toast.success("Task edited successfully", {
            duration: 2000
        });

    }



    const errorRemoverFunc = () => {
        setTimeout(() => {
            setError("")
        }, 3000);
        return
    }

    const handleAddCard = () => {
        if (!cardName.trim()) {
            setError1('Please enter...');
            setTimeout(() => {
                setError1("")
            }, 2000);
            return
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
        const updatedTasks = { ...tasks }
        if (cardId in updatedTasks) {
            updatedTasks[cardId].splice(taskIndex, 1);
            setTasks(updatedTasks)
        }
    }

    const handleDeleteCard = (id: number) => {
        setCards(cards.filter((card) => card.id !== id));
        const updatedTasks = { ...tasks }
        delete updatedTasks[id];
        setTasks(updatedTasks);

    }


    const toggleFunction = () => {
        if (toggle === true) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    // const handleDragEnd = (event: any) => {
    //     const { active, over } = event;
    //     if (!over) return;

    //     const fromId = parseInt(active.data?.current?.parentId);
    //     const toId = parseInt(over.id);

    //     if (fromId === toId) return;

    //     const task = active.id;
    //     setTasks((prev) => {
    //         const newTasks = { ...prev };
    //         newTasks[fromId] = newTasks[fromId].filter((t) => t !== task);
    //         newTasks[toId] = [...(newTasks[toId] || []), task];
    //         return newTasks;
    //     });
    // };

    return (



        <div className="bg-gradient-to-r from-[#795fc5] to-[#e574bb] min-h-96 pt-10 h-screen w-full">
            {/* <DndContext onDragEnd={handleDragEnd}> */}

            <AddTask
                taskValue={taskValue}
                setTaskValue={setTaskValue}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                cards={cards}
                handleAddTask={handleAddTask}
                error={error}
            />
            {/* </DndContext> */}
            {/* <DndContext ></DndContext> */}

            <div className={`mt-7 mx-14`}>

                <div className={`flex flex-nowrap w-full gap-4 box-border overflow-x-scroll   [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}>
                    {/* <Droppable id={cards.id} children={undefined}> */}
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
                    {/* </Droppable> */}

                    <div className='text-white h-fit w-72 min-w-72'>
                        {
                            toggle ?

                                <ToggleAddCard
                                    cardName={cardName}
                                    setCardName={setCardName}
                                    handleAddCard={handleAddCard}
                                    toggleFunction={toggleFunction}
                                    error1={error1}
                                />

                                :
                                <button
                                    onClick={() => { toggleFunction() }}
                                    className='w-full mb-64 min-w-72 cursor-pointer flex items-center bg-[#bb8cd0] p-4 rounded-xl gap-1 text-sm font-bold hover:bg-[#a170b8]'>
                                    <IoMdAdd className='text-xl' />
                                    Add another card
                                </button>
                        }
                    </div>

                </div>

            </div>
        </div>

    );
}