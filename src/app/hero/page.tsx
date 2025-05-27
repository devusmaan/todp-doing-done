"use client"

import Link from "next/link";
import { motion } from 'framer-motion'


export default function Hero() {



    return (

        <div
            style={{
                backgroundImage: `url('/bg.avif')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="relative flex items-center justify-center min-h-screen px-4"
        >
          
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center w-full max-w-xl mx-auto p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">
                    My Trello Web
                </h1>

                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                    Organize your projects visually with drag-and-drop boards.
                    A beautiful and responsive Trello alternative for modern teams.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/login">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#db85ff] hover:bg-[#a86ccb] text-black font-bold px-6 py-3 rounded-md transition duration-300 shadow-md"
                        >
                            About Us
                        </motion.button>
                    </Link>

                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/90 hover:bg-white text-[#5a3d6b] font-bold px-6 py-3 rounded-md transition duration-300 shadow-md"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>

    )
}