

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type SignupType = {
    signup?: boolean;
    func: (email: string, password: string, setError: (error: string) => void) => void;
};

export default function AuthForm({ signup, func }: SignupType) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState("");


    // const errorRemover = () => {
    //     setTimeout(() => {
    //         setError("");
    //     }, 3000);
    // }


    const notifySuccess = () => {
        if (signup) {
             toast.dismiss()
            toast.error("Signup successfully", {
                duration: 2000
            })

        }
        else {
            toast.dismiss()
            toast.success("Login successfully", {
                duration: 2000
            })

        }

    }

    const notifyError = () => {
        toast.dismiss()
        toast.error(error, {
            duration: 2000
        })
    }

    const handleSubmit = async () => {
        setError("");
        setLoading(true);

        // if (!taskValue.trim() && !selectedCard) {
        //     setError('Please enter task and select a card');
        //     errorRemoverFunc();
        //     return;
        // }

        // if (!taskValue.trim()) {
        //     setError('Please enter a task');
        //     errorRemoverFunc();
        //     return;
        // }
        // if (!selectedCard || typeof selectedCard !== 'number') {
        //     setError('Please select a card');
        //     errorRemoverFunc();
        //     return;
        // }

        if (!email.trim() && !password.trim()) {
            toast.dismiss()
            toast.error("Please enter email and password", {
                duration: 2000
            })

            return
        }
        if (!email.trim()) {
            toast.dismiss()
            toast.error("Please enter email", {
                duration: 2000
            })

            return
        }
        if (!password.trim()) {
            toast.dismiss()
            toast.error("Please enter password", {
                duration: 2000
            })

            return
        }

        try {
            await func(email, password, setError);
            // notifySuccess()

            if (error.trim()) {
                 notifyError()
                 return
            }

             notifySuccess()

            // toast.dismiss()

        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");


            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full sm:w-80 md:w-96 p-4 flex justify-center">


            <div className="">



                <label className="items-center">
                    <div className="text-sm ml-2 mb-1">
                        Email
                    </div>
                    <input
                        autoFocus
                        type="text"
                        className="placeholder-[#dddddd] text-sm mb-4 min-[295px]:w-72 sm:w-80 py-1.5 px-4 bg-[#bb8cd0] focus:outline-none focus:ring-2 focus:ring-[#dddddd] rounded-xl"
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </label>

                <label className=" items-center">
                    <div className="text-sm ml-2 mb-1">
                        Password
                    </div>

                    <input
                        type="Type your password"
                        className="placeholder-[#dddddd] text-sm min-[295px]:w-72 sm:w-80 py-1.5 px-4 bg-[#bb8cd0] focus:outline-none focus:ring-2 focus:ring-[#dddddd] rounded-xl"
                        placeholder={` Type your password`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                </label>


                {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

                <div className="flex justify-center mt-6">

                    <button
                        className="cursor-pointer w-32 text-white rounded-xl font-bold md:bg-[#e574bb] min-[295px]:bg-gradient-to-r min-[295px]:from-[#795fc5] min-[295px]:to-[#e574bb] py-1.5 text-center bg-[#bb8cd0] align-middle "
                        onClick={handleSubmit}

                    // disabled={loading}
                    >




                        {
                            // loading ? "Loading..." :
                            (signup ? "SIGNUP" : "LOGIN")}
                    </button>


                </div>
            </div>




            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div >
    );
}