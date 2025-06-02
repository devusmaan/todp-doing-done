import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type SignupType = {
  signup?: boolean;
  func: (email: string, password: string) => void;
};

export default function AuthForm({ signup, func }: SignupType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    toast.dismiss();

    if (!email.trim() && !password.trim()) {
      toast.dismiss();
      toast.error("Please enter email and password", {
        duration: 1000,
      });

      return;
    }
    if (!email.trim()) {
      toast.dismiss();
      toast.error("Please enter email", {
        duration: 1000,
      });

      return;
    }
    if (!password.trim()) {
      toast.dismiss();
      toast.error("Please enter password", {
        duration: 1000,
      });

      return;
    }
    try {
      await func(email, password);
    } catch {
      toast.error("An error occurred. Please try again.", {
        duration: 1000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full sm:w-80 md:w-96 p-4 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="min-[797x]"
      >
        <label className="items-center">
          <div className="text-xs font-extrabold ml-2 mb-1 text-[#333] tracking-wide">
            EMAIL
          </div>
          <input
            autoFocus
            type="text"
            className="placeholder-[#767676] text-[#1e2939] text-sm mb-4 min-[295px]:w-72 sm:w-80 py-2.5 px-4 bg-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#bb8cd0] rounded-3xl transition-all duration-200 shadow-inner"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="items-center">
          <div className="text-xs font-extrabold ml-2 mb-1 text-[#333] tracking-wide">
            PASSWORD
          </div>
          <input
            type="password"
            className="placeholder-[#767676] text-[#1e2939] text-sm min-[295px]:w-72 sm:w-80 py-2.5 px-4 bg-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#bb8cd0] rounded-3xl transition-all duration-200 shadow-inner"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer text-white min-[295px]:w-72 sm:w-80 py-2.5 rounded-3xl 
        bg-gradient-to-r from-[#795fc5] to-[#e574bb] hover:from-[#6b50b5] hover:to-[#d65ca6] 
        shadow-md transition duration-300 font-semibold tracking-wide"
            onClick={handleSubmit}
          >
            {signup ? "Sign Up" : "Login"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
