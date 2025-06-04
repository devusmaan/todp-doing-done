"use client";

import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const sections = [
  {
    id: 1,
    title: "About Website",
    content:
      "This is a professional drag-and-drop Kanban board inspired by Trello, built using @dnd-kit, Next.js, Tailwind CSS, and Framer Motion. It allows you to organize tasks easily and intuitively.",
  },
  {
    id: 2,
    title: "About Me",
    content:
      "I am a passionate Frontend Developer skilled in Next.js, Tailwind CSS, and TypeScript. I love building beautiful, user-friendly applications and constantly learning new technologies.",
  },

  {
    id: 3,
    title: "Made By",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-lg">
          Made with ❤️ by <strong>M Usman</strong>
        </p>
        <div className="flex items-center gap-3">
          <FaGithub className="text-xl" />
          <Link
            href="https://github.com/devusmaan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            github.com/devusmaan
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-xl" />
          <Link href="devusmaan@gmail.com" className="hover:underline">
            devusmaan@gmail.com
          </Link>
        </div>
      </div>
    ),
  },
];

export default function AboutUsPage() {
  const [page, setPage] = useState(0);

  const handleNext = () => setPage((prev) => (prev + 1) % sections.length);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + sections.length) % sections.length);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-gray-900 text-white px-6">
      <div className="flex-col items-center justify-center flex bg-black/30 backdrop-blur-2xl p-5 min-w-9/12 rounded-2xl">
        <motion.div
          key={sections[page].id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-center space-y-6"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            {sections[page].title}
          </h1>
          <div className="text-lg leading-relaxed">
            {typeof sections[page].content === "string" ? (
              <p>{sections[page].content}</p>
            ) : (
              sections[page].content
            )}
          </div>
        </motion.div>

        <div className="flex gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="px-5 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-600 rounded-full hover:bg-blue-500 transition"
          >
            Next
          </button>
        </div>
      </div>

      <Link
        className="absolute top-6 left-6 font-bold flex items-center gap-2 text-sm sm:text-base text-white hover:underline"
        href={"/login"}
      >
        <FaArrowLeft /> Back to Login
      </Link>
    </div>
  );
}
