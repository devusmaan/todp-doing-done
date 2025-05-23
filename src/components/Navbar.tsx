"use client"
import { auth, signOutUser } from "@/firebase/firebaseauth";

import Link from "next/link";
import toast from "react-hot-toast";
import { CgClipboard } from "react-icons/cg";

import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { RxDotsHorizontal } from "react-icons/rx";

export default function Navbar() {

   

    // const showSuccessToast = () => {
    //     signOutUser(auth);
    //     if (!toastShown) {

    //         toast.success('Operation successful!', { id: 'successToast' });

    //         setToastShown(true);
    //     }
    // };

    // useEffect(() => {
    //     setToastShown(false); // Reset toastShown on route change
    // }, [location]);


    // const [error, setError] = useState("");

    const handleSignOutUser = async () => {
        toast.dismiss()

        try {
            await signOutUser(auth);
        }
        catch (e) {
            toast.error("Failed to logout", {
                duration: 500
            })
        }
    }

    // signOutUser(auth, setError)
    // if (error.trim()) {
    //     toast.dismiss()
    //     toast.error(error, {
    //         duration: 2000
    //     });
    //     return
    // }
    // toast.dismiss()
    // toast.success("Logout successfully", {
    //     duration: 2000
    // });

    // }


    return (

        <div className="flex justify-between bg-[#6b4b94] h-14">

            <div className="flex items-center">

                <Link href={"/"} className="text-white text-sm text-center py-1.5 rounded-sm transition hover:bg-[rgb(237,207,255)] px-1 font-bold mx-3">My Trello board</Link>
                <p className="cursor-pointer flex hover:bg-opacity-50 ease-out duration-500 gap-1 rounded-sm transition hover:bg-[rgb(237,207,255)] py-2 px-1 text-white"><CgClipboard className="" />
                    <IoIosArrowDown />
                </p>

            </div>

            <div className="flex items-center gap-2 mr-2">
                {/* <p className="cursor-pointer flex hover:bg-opacity-50 text-xl px-2 ease-out duration-500 gap-1 rounded-sm transition hover:bg-[rgb(237,207,255)] py-2 text-white">
                    <FaRegStar />
                </p> */}
                <button
                    onClick={handleSignOutUser}
                    className="cursor-pointer flex gap-2 px-1.5 items-center ease-out hover:bg-opacity-50 text-black bg-[#ffffff] text-sm duration-500 hover:bg-[#edcfff] rounded-sm text-center font-bold h-8"><FiLogOut /> Logout </button>
                {/* <p className="cursor-pointer hover:bg-opacity-50 ease-out text-lg text-white duration-500 rounded-sm transition hover:bg-[rgb(237,207,255)] py-2 px-2"><RxDotsHorizontal /></p> */}
                <Link href={"/hero"} className="cursor-pointer hover:bg-opacity-50 ease-out text-lg text-white duration-500 rounded-sm transition hover:bg-[rgb(237,207,255)] py-2 px-2" ><RxDotsHorizontal /></Link>

            </div>

        </div >

    )
}