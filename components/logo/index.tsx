'use client';

import Image from "next/image";
import Pokedex from "./pokedex.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex gap-2 items-center font-semibold" href={window.location.origin}>
      <Image height={24} width={24} src={Pokedex} alt="logo" />
      Pokedex
    </Link>
  );
}
