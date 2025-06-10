import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

type ToggleAddCardType = {
  cardName: string;
  setCardName: Dispatch<SetStateAction<string>>;
  handleAddCard: () => void;
  toggleFunction: () => void;
};

export default function ToggleAddCard({
  cardName,
  setCardName,
  handleAddCard,
  toggleFunction,
}: ToggleAddCardType) {
  // const showErrorOrSuccessCard = () => {
  //   if (!cardName.trim()) {
  //     toast.dismiss();
  //     toast.error("Please enter something...", {
  //       duration: 2000,
  //     });
  //     return;
  //   }
  // };



  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (!cardName.trim()) {
        toast.dismiss();
        toast.error("Please enter card", {
          duration: 1000,
        });
        return;
      }
      handleAddCard();
    }
  };

  return (
    <>
      <motion.div
        key="toggle-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="h-fit bg-[#f1f2f4] rounded-xl w-72 min-w-72">
          <div className="p-2">
            <input
              className="py-1 px-3 bg-white text-sm w-full font-bold text-[#e575bb] rounded-sm border-2 border-[#0c66e4]"
              type="text"
              value={cardName}
              onKeyDown={handleKeyDown}
              autoFocus
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Enter list name..."
            />
            <div className="flex items-center gap-1">
              <button
                className="p-2 cursor-pointer font-bold px-3 mt-2 text-sm bg-[#0c66e4] text-white rounded-sm"
                onClick={() => {
                  handleAddCard();
                  // showErrorOrSuccessCard();
                }}
              >
                Add list
              </button>
              <button
                onClick={() => {
                  toggleFunction();
                }}
                className="p-2 cursor-pointer mt-2 text-[#172b4d] text-xl duration-500 rounded-sm transition hover:bg-[#ccced1]"
              >
                <RxCross2 />
              </button>

              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}


// import { useEffect } from "react";
// import Swal from "sweetalert2";
// import { Dispatch, SetStateAction } from "react";
// import toast, { Toaster } from "react-hot-toast";

// type ToggleAddCardType = {
//   cardName: string;
//   setCardName: Dispatch<SetStateAction<string>>;
//   handleAddCard: () => void;
//   toggleFunction: () => void;
// };

// export default function ToggleAddCard({
//   cardName,
//   setCardName,
//   handleAddCard,
//   toggleFunction,
// }: ToggleAddCardType) {


  
//   useEffect(() => {
//     Swal.fire({
//       title: "Enter list name",
//       input: "text",
//       inputValue: cardName,
//       inputPlaceholder: "Enter list name...",
//       confirmButtonText: "Add list",
//       showCancelButton: true,
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#0c66e4",
//       cancelButtonColor: "#d33",
//       inputValidator: (value) => {
//         if (!value.trim()) {
//           return "Please enter a card name!";
//         }
//         return null;
//       },
//       didOpen: () => {
//         const input = Swal.getInput();
//         if (input) {
//           input.addEventListener("keydown", (e) => {
//             if (e.key === "Enter") {
//               (document.querySelector(".swal2-confirm") as HTMLElement)?.click();
//             }
//           });
//         }
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const value = result.value?.trim();
//         if (!value) {
//           toast.error("Card name cannot be empty.");
//           return;
//         }
//         setCardName(value);
//         handleAddCard();
//       } else {
//         toggleFunction(); 
//       }
//     });
//   }, []);

//   return <Toaster position="top-center" reverseOrder={false} />;
// }