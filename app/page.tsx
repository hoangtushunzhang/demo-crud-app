import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if(!data.session) {
    redirect("/sign-in")
  }
  const user = data?.session?.user
    ? { email: data.session.user.email ?? "" }
    : undefined;
  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-400 text-white p-6">
   
      <h1 className="text-5xl font-extrabold drop-shadow-lg animate-fadeIn">
        Welcome to <span className="text-yellow-300">Tickets</span>
      </h1>

      <p className="text-lg mt-3 opacity-90 animate-fadeIn delay-200">
        Do you want to buy a ticket? 🎟️
      </p>

      <Link
        href="/tickets"
        className="mt-6 px-6 py-3 text-lg font-bold bg-yellow-400 text-black rounded-full shadow-md 
        hover:bg-yellow-500 transition-transform transform hover:scale-105 active:scale-95 
        animate-bounce delay-500"
      >
        🎟 Get Your Tickets
      </Link>
    </div>
    </>
  );
}
