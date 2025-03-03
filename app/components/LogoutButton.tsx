"use client";


import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../components/ui/button";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/sign-in");
    } else {
      console.log(error);
    }
  };

  return (
    <Button className="cursor-pointer" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
