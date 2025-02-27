"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { saveToken } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      const user = res.data.find((u: { email: string; password: string }) => u.email === email && u.password === password);
      
      if (user) {
        saveToken(user.email);
        router.push("/");
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch {
      alert("Đăng nhập thất bại!");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
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
      <Button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-500/90 cursor-pointer rounded-sm"
      >
        Login
      </Button>
      <p>
        Don’t have an account?
        <Link className="m-2 hover:text-blue-400" href="/sign-up">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;
