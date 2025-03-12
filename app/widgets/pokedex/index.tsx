import { usePokedexStore } from "@/app/providers/pokedex-provider";
import { PokedexPokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import PokedexCard from "./card";

export default function Pokedex() {
  const pokedex = usePokedexStore((state) => state.pokedex);
  const [pokemonList, setPokemonList] = useState<PokedexPokemon[]>([]);

  useEffect(() => {
    if (pokedex) {
      pokedex.getPokemonSpeciesList().then((response: any) => {
        const { results } = response;
        setPokemonList(results);
      });
    }
  }, [!!pokedex]);

  return (
    <div className="grid grid-cols-8 gap-4">
      {pokemonList?.map((pokemon, index) => (
        <PokedexCard key={index + 1} pokemon={pokemon} />
      ))}
    </div>
  );
}
