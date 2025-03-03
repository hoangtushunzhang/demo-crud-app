"use client";

import { useRouter, useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../../../components/ui/button";


export default function DeleteTicket() {
  const { id } = useParams();
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleDelete() {
    const { error } = await supabase.from("Tickets").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete ticket:", error);
    } else {
      router.push("/tickets");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600">Are you sure?</h2>
      <p>This action cannot be undone.</p>

      <div className="mt-6 flex justify-between">
        <Button onClick={() => router.push("/tickets")} className="bg-gray-400 hover:bg-gray-500">
          Cancel
        </Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </div>
    </div>
  );
}
