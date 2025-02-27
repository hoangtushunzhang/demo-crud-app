"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push("/sign-in");
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push("/sign-in");
  };

  if (!isAuth) return null; // Chờ kiểm tra đăng nhập trước khi render

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to Home Page</h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </>
  );
}
