"use client"

import { emailVerification } from "@/firebase/firebaseauth"




export default function EmailVerification() {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#795fc5] to-[#e574bb] p-6">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h3 className="text-2xl font-semibold text-center text-[#bb8cd0] mb-4">Email Verification Sent!</h3>
                    <p className="text-gray-700 text-center mb-6">
                        Kindly verify your email to complete the registration process.
                    </p>
                    <p className="text-gray-600 text-sm text-center">
                        If you did not receive the email, check your spam folder or click{" "}
                        <button
                            onClick={() => { emailVerification() }}
                            className="text-[#bb8cd0] hover:underline">
                            here
                        </button> to resend.
                    </p>
                </div>
            </div>
        </>
    )
}