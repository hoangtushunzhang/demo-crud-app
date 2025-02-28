"use client";
import { Dispatch, SetStateAction } from "react";

interface AuthFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const AuthForm: React.FC<AuthFormProps> = ({email, setEmail, password, setPassword}) => {
  return (
    <>
    <input
      type="email"
      placeholder="Email"
      className="border p-2 mb-2"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
    />
    <input
      type="password"
      placeholder="Password"
      className="border p-2 mb-2"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
    />
    </>
  )
}

export default AuthForm