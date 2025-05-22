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
                duration: 2000
            });
            return;
        }

        if (!taskValue.trim()) {
            toast.dismiss()
            toast.error("Please enter task", {
                duration: 2000
            });
            return;
        }
        if (!selectedCard || typeof selectedCard !== 'number') {
            toast.dismiss()
            toast.error("Please select a card", {
                duration: 2000
            });
            return;
        }

        // toast.remove()
        toast.success('Task successfully added!'), {
            duration: 2000
        }
    }





    return (
        <div className='mx-auto h-fit'>

            <div className='flex flex-col bg-gray-100 md:flex-row mx-auto p-4 items-center rounded-lg gap-4 max-w-xl' >
                <input
                    className="py-2 flex-1 border border-gray-300 px-4 bg-[#bb8cd0] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    type="text"
                    value={taskValue}
                    onChange={(e) => setTaskValue(e.target.value)}
                    placeholder="Enter task"
                />
                <select
                    className="flex-1 w-40 px-4 py-2 border border-[#bb8cd0] rounded-lg focus:outline:none focus:ring-2 focus:ring-[#bb8cd0] "
                    value={selectedCard} onChange={(e) => setSelectedCard(Number(e.target.value))}>
                    <option className=' w-35' value="">Select Card</option>
                    {cards.map((card) => (
                        <option key={card.id} value={card.id}>{card.name}</option>
                    ))}

                </select>

                <button className="px-6 py-2 bg-[#bb8cd0] text-white rounded-lg hoverz:bg-blue-700 transition"
                    onClick={handleClickFunc}>Add Task</button>

            </div>
            <div className='flex justify-center mb-5'>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                {/* //  <p className='text-red-500 text-sm font-bold text-right p-3 rounded-2xl'>{error}</p> */}

            </div>
        </div>
    )
}