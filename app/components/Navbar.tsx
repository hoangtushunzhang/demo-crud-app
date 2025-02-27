import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b-2 px-20 py-3">
      <h1 className="text-3xl font-bold">Demo</h1>
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
};

export default Navbar;
