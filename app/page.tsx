'use client';

import Pokedex from "./widgets/pokedex";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">National Pokedex</h2>
        <Pokedex />
      </main>
    </>
  );
}
