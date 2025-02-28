'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import AuthForm from "../AuthForm";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login", email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </Button>
      </form>
      <p>
        Don’t have an account?
        <Link className="m-2 hover:text-blue-400" href="/sign-up">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
