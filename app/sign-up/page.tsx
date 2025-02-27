"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:3001/users", { email, password });
      if (res.status === 201) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        router.push("/sign-in");
      }
    } catch {
      alert("Đăng ký thất bại!");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp} className="bg-blue-500 text-white px-4 py-2">
        Sign Up
      </Button>
      <p>
        Already have an account?
        <Link className="m-2 hover:text-blue-400" href="/sign-in">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
