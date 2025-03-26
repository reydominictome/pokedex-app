'use client';

import React from "react";

import Link from "next/link";
import { useUserStore } from "@/providers/user-provider";

function Navigation() {
  const user = useUserStore((store) => store.user);

  return (
    user && (
      <nav>
        <Link className="text-primary hover:underline" href="/my-pokemon">
          My Pokemon
        </Link>
      </nav>
    )
  );
}

export default Navigation;
