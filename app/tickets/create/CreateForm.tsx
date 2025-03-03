"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function CreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    const newTicket = { title, body, priority };
  
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });
  
      const result = await res.json();
  
      if (result.error) {
        console.error("❌ API Error:", result.error);
      } else {
        setTitle("");
        setBody("");
        setPriority("low");
        router.refresh(); 
        router.push("/tickets");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <label className="flex flex-col font-semibold text-gray-700 mb-4">
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="p-2 border rounded-md focus:border-blue-500"
        />
      </label>
      <label className="flex flex-col font-semibold text-gray-700 mb-4">
        <span>Body:</span>
        <input
          required
          type="text"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className="p-2 border rounded-md focus:border-blue-500"
        />
      </label>
      <label className="flex flex-col font-semibold text-gray-700 mb-4">
        <span>Priority:</span>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="p-2 border rounded-md"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Ticket"}
      </button>
    </form>
  );
}
