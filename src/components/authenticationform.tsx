

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



    // const notifySuccess = () => {
    //     toast.dismiss()
    //     if (signup) {

    //         toast.error("Signup successfully", {
    //             duration: 2000
    //         })

    //     }
    //     else {

    //         toast.success("Login successfully", {
    //             duration: 2000
    //         })

    //     }

    // }

    const notifyError = () => {
        toast.dismiss()
        toast.error(error, {
            duration: 2000
        })
    }

    const handleSubmit = async () => {
        setError("");
        // setLoading(true);



        if (!email.trim() && !password.trim()) {
            toast.dismiss()
            toast.error("Please enter email and password", {
                duration: 1000
            })

            return
        }
        if (!email.trim()) {
            toast.dismiss()
            toast.error("Please enter email", {
                duration: 1000
            })

            return
        }
        if (!password.trim()) {
            toast.dismiss()
            toast.error("Please enter password", {
                duration: 1000
            })

            return
        }

        try {
            await func(email, password, setError);
            // notifySuccess()

            if (error.trim()) {
                notifyError()
                return;
            }

            // {
            //     signup ? toast.success("Sign up successfully") :  toast.success("Sign In successfully")
            // }

            // notifySuccess()

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
                    <div className="text-xs font-extrabold ml-2 mb-1">
                        EMAIL
                    </div>
                    <input
                        autoFocus
                        type="text"
                        className="placeholder-[#767676] text-sm mb-4 min-[295px]:w-72 sm:w-80 py-2.5 px-4 bg-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#dddddd] rounded-3xl"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </label>

                <label className=" items-center">
                    <div className="text-xs font-extrabold ml-2 mb-1">
                        Password
                    </div>

                    <input
                        type="Type your password"
                        className="placeholder-[#767676] text-sm min-[295px]:w-72 sm:w-80 py-2.5 px-4 bg-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#dddddd] rounded-3xl"
                        placeholder={`Password`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                </label>


                {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

                <div className="flex justify-center mt-6">

                    <button
                        className="cursor-pointer text-white min-[295px]:w-72 rounded-3xl sm:w-80 py-2.5 md:bg-[#e574bb] min-[295px]:bg-gradient-to-r min-[295px]:from-[#795fc5] min-[295px]:to-[#e574bb] bg-[#bb8cd0] "
                        onClick={handleSubmit}

                    // disabled={loading}
                    >




                        {
                            // loading ? "Loading..." :
                            (signup ? "Sign Up" : "Login")}
                    </button>


                </div>
            </div>




            
        </div >
    );
}