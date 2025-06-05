"use client";

import AuthForm from "@/components/Auth/authenticationform";
import { loginForm } from "@/firebase/firebaseauth";
import Link from "next/link";

export default function Login() {

  return (
    <>
      <div className="flex flex-col md:flex-row min-[200px]:py-10 bg-gray-100 items-center justify-center min-h-screen p-4">
        <div className="min-[150px]:py-10 min-[577px]:py-0 bg-white min-[577px]:bg-white min-[300px]:block min-[577px]:flex justify-center w-full max-w-4xl rounded-3xl overflow-hidden shadow-xl">
          <div className="w-full min-[577px]:py-14 md:w-1/2 px-4 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Login
            </h3>

            <AuthForm func={loginForm} />

            {/*      
      <div className="flex justify-between items-center text-sm mt-4 text-gray-600">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-pink-500" />
          Remember Me
        </label>
        <button className="hover:underline text-pink-500">Forgot Password?</button>
      </div> */}
          </div>

          <div className="w-full min-[100px]:hidden min-[577px]:flex md:w-1/2 bg-gradient-to-r from-[#e574bb] to-[#795fc5] text-white flex flex-col justify-center items-center p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Login</h1>
            <p className="mb-4">Dont have an account?</p>
            <Link
              href="/signup"
              className="hover:bg-white text-white border border-white trasparent hover:text-pink-600 font-semibold px-6 py-2 rounded-full shadow-md transition duration-200"
            >
              Sign Up
            </Link>
          </div>

          <div className="w-full min-[100px]:flex min-[577px]:hidden md:w-1/2 flex-nowrap justify-center items-center text-center">
            <p className="text-[#1e2939]">Dont have an account?</p>
            <Link
              href="/signup"
              className="text-pink-600 font-semibold px-3 py-2 decoration-2 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
