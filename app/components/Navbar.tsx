"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth";

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    removeToken();
    router.push("/sign-in");
  };

  return (
    <div className="flex justify-between items-center border-b-2 px-20 py-3">
      <h1 className="text-3xl font-bold">Demo</h1>
      {isLoggedIn ? (
        <button className="bg-red-500 text-white px-4 py-2" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link href="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2">Sign In</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
