import { Dispatch, SetStateAction } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";



type ToggleAddCardType = {
    cardName: string,
    setCardName: Dispatch<SetStateAction<string>>,
    handleAddCard: () => void,
    toggleFunction: () => void,
}






export default function ToggleAddCard({ cardName, setCardName, handleAddCard, toggleFunction }: ToggleAddCardType) {

    // let toastId: string | null = null;

    const showErrorOrSuccessCard = () => {
        if (!cardName.trim()) {
            // if (!toastId) {
            toast.dismiss()
            toast.error("Please enter something...", {
                duration: 2000,
                // onClose: () =>  
            });
            // }
            return;
        }
        showSwal()

    }


    // const notify = () => toast.error("Please enter something...", { duration: 3000 });


    const showSwal = () => {
        Swal.fire({
            title: "Good job!",
            text: "You added the card!",
            icon: "success"
        })
    }


    return (
        <>
            <div className='h-fit bg-[#f1f2f4] rounded-xl w-72 min-w-72'>
                <div className='p-2  mb-56' >
                    <input
                        className="py-1 px-3 bg-white text-sm w-full font-bold text-[#e575bb] rounded-sm border-2 border-[#0c66e4]"
                        type="text"
                        value={cardName}
                        autoFocus
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Enter list name..."
                    />
                    <div className='flex items-center gap-1' >
                        <button
                            className="p-2 cursor-pointer font-bold px-3 mt-2 text-sm bg-[#0c66e4] text-white rounded-sm"
                            onClick={() => {
                                handleAddCard()
                                showErrorOrSuccessCard()

                            }}>
                            Add list
                        </button>
                        <button
                            onClick={() => {
                                toggleFunction()

                            }}
                            className='p-2 cursor-pointer mt-2 text-[#172b4d] text-xl duration-500 rounded-sm transition hover:bg-[#ccced1]'>
                            <RxCross2 />
                        </button>

                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />

                    </div>

                </div>

            </div>

        </>
    )
}