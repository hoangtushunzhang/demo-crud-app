"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthForm from "../AuthForm";
import { FormEvent, useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col items-center">
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account?
        <Link className="m-2 hover:text-blue-400" href="/sign-in">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
