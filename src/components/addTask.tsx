import { Dispatch, SetStateAction } from "react"
import toast, { Toaster } from "react-hot-toast"



type Card = {
    id: number,
    name: string
}


type AddTaskType = {
    taskValue: string,
    setTaskValue: Dispatch<SetStateAction<string>>,
    selectedCard: string | number,
    setSelectedCard: Dispatch<SetStateAction<"" | number>>,
    cards: Card[],
    handleAddTask: () => void,
    error: string | null
}



export default function AddTask({ taskValue, setTaskValue, selectedCard, setSelectedCard, cards, handleAddTask, error }: AddTaskType) {


    const handleClickFunc = () => {
        handleAddTask();
        // if (!taskValue.trim() || !selectedCard) {
        //     toast.error(error);
        //     return
        // }
        if (!taskValue.trim() && !selectedCard) {
            toast.dismiss()
            toast.error("Please enter task and select a card", {
                duration: 1000
            });
            return;
        }

        if (!taskValue.trim()) {
            toast.dismiss()
            toast.error("Please enter task", {
                duration: 1000
            });
            return;
        }
        if (!selectedCard || typeof selectedCard !== 'number') {
            toast.dismiss()
            toast.error("Please select a card", {
                duration: 1000
            });
            return;
        }

        // toast.remove()
        toast.success('Task added successfully'), {
            duration: 1000
        }
    }





    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6">
            <div className="bg-gray-100 rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:space-x-4 gap-4">

                <div className="w-full flex justify-center md:justify-start">
                    <input
                        className="w-full max-w-xs py-2 px-4 bg-[#bb8cd0] text-white placeholder-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                        type="text"
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                        placeholder="Enter task"
                    />
                </div>

                <div className="w-full flex justify-center md:justify-start">
                    <select
                        className="w-full max-w-xs py-2 px-4 bg-white text-[#4b2564] border border-[#bb8cd0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb8cd0]"
                        value={selectedCard}
                        onChange={(e) => setSelectedCard(Number(e.target.value))}
                    >
                        <option value="">Select Card</option>
                        {cards.map((card) => (
                            <option key={card.id} value={card.id}>
                                {card.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full flex justify-center md:justify-start">
                    <button
                        className="w-full max-w-xs py-2 px-6 bg-[#bb8cd0] text-white rounded-lg hover:bg-[#a270bd] transition duration-200"
                        onClick={handleClickFunc}
                    >
                        Add Task
                    </button>
                </div>

            </div>

            <div className="flex justify-center mt-4">
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    )
}