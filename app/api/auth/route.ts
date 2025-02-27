import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const { data: users } = await axios.get("http://localhost:3002/users");
    type User = { email: string; password: string };
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ token: `fake-token-${user.email}` });
  } catch {
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
  }
}
