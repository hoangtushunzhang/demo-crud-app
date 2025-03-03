"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 bg-gray-800 text-white rounded-lg"
    >
      Back to HomePage
    </button>
  );
}
