import Image from "next/image";
import React, { useEffect, useState } from "react";
import Pokeball from "@/images/pokeball.png";
import { POKEMON_TYPE_COLOR_BG, POKEMON_TYPE_COLORS } from "@/constants/types";
import PokemonStatus from "../pokemon-status";
import PokemonTypes from "../pokemon-types";
import { Pokemon } from "pokeapi-js-wrapper";
import { usePokedexStore } from "@/providers/pokedex-provider";
import PokeballPreloader from "@/components/pokeball-loader";
import PokeballButton from "../pokeball-button";

type PokemonCardProps = {
  name?: string;
  onDelete?: () => void;
};

function PokemonCard({ name, onDelete }: PokemonCardProps) {
  const pokedex = usePokedexStore((store) => store.pokedex)!;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (name && !pokemon) {
      pokedex.getPokemonByName(name as string).then((response: any) => {
        setPokemon(response);
      });
    }
  }, [name]);

  const types = pokemon?.types?.map((t) => t.type.name);

  return pokemon ? (
    <div
      className="flex gap-4 flex-col p-4 rounded-lg"
      style={{
        backgroundColor: `${POKEMON_TYPE_COLOR_BG[(types || [])[0]]}`,
        border: `4px solid ${POKEMON_TYPE_COLORS[(types || [])[0]]}`,
      }}
    >
      {onDelete && (
        <PokeballButton onClick={onDelete} tooltipClassName="!left-[50%]">Release {name}</PokeballButton>
      )}
      <div className="flex flex-col gap-4 items-center bg-white rounded-2xl">
        <Image
          width={220}
          height={220}
          src={pokemon?.sprites?.front_default || Pokeball}
          alt={name || ""}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="capitalize text-3xl">{name}</h1>
          <PokemonTypes types={types} />
        </div>
        <PokemonStatus stats={pokemon?.stats} />
      </div>
    </div>
  ) : (
    <PokeballPreloader />
  );
}

export default PokemonCard;
