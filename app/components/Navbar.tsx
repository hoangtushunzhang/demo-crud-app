// import Link from "next/link";
"use client";
import LogoutButton from "./LogoutButton";
import { motion } from "motion/react";
interface NavbarProps {
  user?: { email: string };
}
const Navbar = ({ user }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-md transition-all duration-300 ease-out"
    >
      <div className="flex justify-between items-center border-b-4 border-gradient px-10 py-4">
        <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
          <h1 className="text-3xl font-extrabold text-gray-800 hover:text-blue-500 transition-all duration-200">
            🚀 TMA Internship
          </h1>
        </motion.div>

        {user && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-all"
          >
            👋 Hello, {user.email}
          </motion.span>
        )}

        <LogoutButton />
      </div>
    </motion.nav>
  );
};

export default Navbar;
