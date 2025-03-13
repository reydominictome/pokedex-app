import { usePokedexStore } from "@/providers/pokedex-provider";
import { PokedexPokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import PokedexCard from "./card";
import useQueryParams from "@/hooks/use-query-params";
import Modal from "@/components/modal";
import PokemonDetailsModal from "../pokemon-details-modal";

export default function Pokedex() {
  const pokedex = usePokedexStore((state) => state.pokedex);
  const [pokemonList, setPokemonList] = useState<PokedexPokemon[]>([]);
  const { queryParams } = useQueryParams();
  const { name } = queryParams || {};

  useEffect(() => {
    if (pokedex) {
      pokedex.getPokemonSpeciesList().then((response: any) => {
        const { results } = response;
        setPokemonList(results);
      });
    }
  }, [!!pokedex]);

  return (
    <>
      {name && <PokemonDetailsModal />}
      <div className="grid grid-cols-8 gap-4">
        {pokemonList?.map((pokemon, index) => (
          <PokedexCard key={index + 1} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
