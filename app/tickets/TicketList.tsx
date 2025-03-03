"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../components/ui/button";

interface Ticket {
  id: number;
  title: string;
  body: string;
  priority: string;
}

export default function TicketList() {
  const supabase = createClientComponentClient();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Fetch tickets from Supabase
  useEffect(() => {
    async function fetchTickets() {
      const { data: tickets, error } = await supabase.from("Tickets").select("*");
      if (error) {
        console.error("Failed to fetch tickets:", error);
      } else {
        setTickets(tickets || []);
      }
    }
    fetchTickets();
  }, [supabase]);

  // Lọc tickets dựa vào search và filter
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter ? ticket.priority === priorityFilter : true;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Ticket List</h2>
        <Link href="/tickets/create">
          <Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all">
            + Create Ticket
          </Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Ticket List */}
      {filteredTickets.length > 0 ? (
        <div className="grid gap-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Ticket Details */}
              <Link href={`/tickets/${ticket.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {ticket.title}
                </h3>
                <p className="text-gray-600 mt-2">{ticket.body.slice(0, 100)}...</p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm font-semibold text-white rounded-md ${
                    ticket.priority === "high"
                      ? "bg-red-500"
                      : ticket.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {ticket.priority} Priority
                </span>
              </Link>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <Link href={`/tickets/edit/${ticket.id}`}>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                    Edit
                  </Button>
                </Link>
                <Link href={`/tickets/delete/${ticket.id}`}>
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                    Delete
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No tickets available.</p>
      )}
    </div>
  );
}
