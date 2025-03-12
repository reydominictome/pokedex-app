import Image from "next/image";
import Pokedex from "./pokedex.png";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center font-semibold">
      <Image height={24} width={24} src={Pokedex} alt="logo" />
      Pokedex
    </div>
  );
}
