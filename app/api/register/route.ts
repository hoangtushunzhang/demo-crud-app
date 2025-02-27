import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Kiểm tra user đã tồn tại chưa
    const { data: users } = await axios.get("http://localhost:3002/users");
    interface User {
      email: string;
      password: string;
    }

    const existingUser = users.find((u: User) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Gửi request đăng ký user
    const newUser = { email, password };
    await axios.post("http://localhost:3002/users", newUser);

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register user", details: error }, { status: 500 });
  }
}
