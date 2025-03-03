"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface AuthFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ email, setEmail, password, setPassword, error }) => {
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  return (
    <div className="w-full space-y-4">
      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            !validateEmail(email) && touched.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
          }`}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          value={email}
        />
        {!validateEmail(email) && touched.email && <p className="text-red-500 text-xs mt-1">Invalid email format</p>}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            password.length < 6 && touched.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
          }`}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          value={password}
        />
        {password.length < 6 && touched.password && <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>}
      </div>

      {/* Global Error Message */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default AuthForm;
