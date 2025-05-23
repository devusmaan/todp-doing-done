"use client"


import AuthForm from "@/components/authenticationform";
import { SignupForm } from "@/firebase/firebaseauth";
import Link from "next/link";




export default function SignUp() {



    return (
        <>




            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className=" min-[300px]:py-10 min-[577px]:py-0 bg-white min-[300px]:block min-[577px]:flex justify-center w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">


                    <div className="w-full min-[577px]:py-14 md:w-1/2 bg-white px-4 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">SignUp</h3>

                        <AuthForm signup={true} func={SignupForm} />

                        {/*      
                  <div className="flex justify-between items-center text-sm mt-4 text-gray-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-pink-500" />
                      Remember Me
                    </label>
                    <button className="hover:underline text-pink-500">Forgot Password?</button>
                  </div> */}
                    </div>


                    <div className="w-full min-[300px]:hidden min-[577px]:flex md:w-1/2 bg-gradient-to-r from-[#e574bb] to-[#795fc5] text-white flex flex-col justify-center items-center p-8 text-center">
                        <h1 className="text-3xl font-bold mb-4">Welcome to SignUp</h1>
                        <p className="mb-4">Already have an account?</p>
                        <Link
                            href="/login"
                            className="hover:bg-white text-white border border-white trasparent hover:text-pink-600 font-semibold px-6 py-2 rounded-full shadow-md transition duration-200"
                        >
                            Login
                        </Link>
                    </div>



                    <div className="bg-white w-full min-[300px]:flex min-[577px]:hidden md:w-1/2 flex-nowrap justify-center items-center text-center">
                        <p className="">Already have an account?</p>
                        <Link
                            href="/login"
                            className="text-pink-600 font-semibold px-3 my-3 decoration-2 hover:underline"
                        >
                           Login
                        </Link>
                    </div>
                </div>
            </div>




        </>
    )
}