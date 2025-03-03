import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamicParams = true;

interface Ticket {
  id: number;
  title: string;
  body: string;
  priority: string;
  user_id: string;
}

interface Params {
  params: { id: string };
}

async function getTicket(id: number): Promise<Ticket | null> {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ Error fetching ticket:", error);
    return null;
  }

  return ticket;
}

export async function generateMetadata({ params }: Params) {
  const ticket = await getTicket(Number(params.id));

  if (!ticket) {
    return { title: "Ticket Not Found" };
  }

  return {
    title: `Help Desk App | ${ticket.title}`,
  };
}

export async function generateStaticParams() {
  const supabase = createServerComponentClient({ cookies });
  const { data: tickets, error } = await supabase.from("Tickets").select("id");

  if (error) {
    console.error("❌ Error fetching tickets:", error);
    return [];
  }

  return tickets?.map((ticket) => ({ id: ticket.id.toString() })) || [];
}

export default async function TicketDetails({ params }: Params) {
  const ticket = await getTicket(Number(params.id));

  if (!ticket) {
    notFound();
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-900">{ticket.title}</h2>
      <p className="text-sm text-gray-500 mt-1">
        Created by User ID: {ticket.user_id}
      </p>
      <p className="text-gray-700 mt-4">{ticket.body}</p>

      <div
        className={`inline-block px-3 py-1 mt-4 rounded-full text-white text-sm font-semibold ${
          ticket.priority === "high"
            ? "bg-red-500"
            : ticket.priority === "medium"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      >
        {ticket.priority} priority
      </div>
      <Link className="mx-20 text-blue-500" href={"/tickets"} > Back to all tickets</Link>
    </div>
  );
}
