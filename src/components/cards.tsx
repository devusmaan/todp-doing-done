

import { RxCross2 } from 'react-icons/rx';
import { MdKeyboardArrowRight, MdDelete } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

// import Draggable from 'react-draggable';

type Card = {
    id: number,
    name: string
}



type CardlistProps = {
    cards: Card[];
    tasks: Record<string, string[]>;
    handleDeleteCard: (cardId: number) => void;
    handleDeleteTask: (cardId: number, taskIndex: number) => void;
}

export default function CardList({ cards, tasks, handleDeleteCard, handleDeleteTask }: CardlistProps) {


    const deleteCard = () => {

        toast.error("Card removed successfully", {
            duration: 2000
        })
    }



    const deleteTask = () => {

        toast.error("Task removed successfully", {
            duration: 2000
        })

        // toast.custom(
        //     <div
        //         style={{
        //             // opacity: t.visible ? 1 : 0,
        //             transition: "opacity 100ms ease-in-out"
        //         }} >
        //         <p className='flex'> <FaTrash />Here is your toast.</p>
        //         {/* <button onClick={() => toast.dismiss(t.id)}></button> */}
        //     </div>

        //     ,
        //     {
        //         duration: 3000
        //     }
        // );
    };


    return (
        <div className='flex flex-nowrap gap-4 box-border'>
            {cards.map((card) => (
                <div
                    className="bg-[#f1f2f4] rounded-xl h-fit max-h-96 overflow-y-auto w-72 min-w-72 mb-24 max-w-full"
                    key={card.id}>
                    <div className='flex justify-between mx-6 my-3'>
                        <h2 className='text-center font-bold text-sm text-[#203354] whitespace-normal break-all'>
                            {card.name}
                        </h2>
                        <button
                            onClick={() => {
                                handleDeleteCard(card.id)
                                deleteCard()
                            }
                            }
                            className='ease-out text-lg text-[#203354] cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1] py-1 px-1'>
                            <RxCross2 />
                        </button>
                    </div>
                    <ul>
                        {tasks[card.id] && tasks[card.id].map((task, index) => (
                            // <Draggable>
                            <li className='flex items-center justify-between h-fit mb-2 mx-2 bg-white rounded-xl' key={index}>


                                <div className='flex p-2 items-center justify-between gap-2 whitespace-normal break-all'>
                                    <div>
                                        <MdKeyboardArrowRight className='text-xl' />
                                    </div>
                                    {task}
                                </div>
                                <div className='flex items-center justify-between gap-2 mr-2'>
                                    {/* <button className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'>
                                        <MdEdit className='text-xl' />
                                    </button> */}
                                    <button className='p-1.5 cursor-pointer duration-500 rounded-sm transition hover:bg-[#ccced1]'
                                        onClick={() => {
                                            handleDeleteTask(card.id, index)
                                            deleteTask()
                                        }

                                        }>

                                        <MdDelete className='text-xl' />
                                    </button>
                                </div>

                            </li>
                            // </Draggable>

                        ))}
                    </ul>
                </div>
            ))
            }

            <Toaster
                position="top-center"
                reverseOrder={false}
            />


        </div >
    );
};


// handleDeleteCard , index