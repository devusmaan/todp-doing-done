"use client"


import AuthForm from "@/components/authenticationform";
import { loginForm } from "@/firebase/firebaseauth";
import Link from "next/link";



export default function Login() {




    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen md:from-[#e574bb] md:to-[#795fc5] sm:bg-gradient-to-r sm:from-[#795fc5] sm:to-[#e574bb]">
                <div className="flex flex-col justify-center items-center bg-white gap-4 h-screen my-16 rounded-2xl px-3">
                    <h3 className="font-bold text-3xl text-center">LOGIN</h3>
                    <AuthForm func={loginForm} />
                    <div>
                        <p>
                            Does have not an account? <Link className="hover:text-[#bb8cd0] duration-200 transition font-bold" href={"/signup"}>Signup here.</Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}  