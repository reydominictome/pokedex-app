import Image from "next/image";
import React from "react";
import Pokeball from "@/images/pokeball.png";
import { PokemonSprite, PokemonStats } from "@/types/pokemon";
import { POKEMON_TYPE_COLORS } from "@/constants/types";
import { POKEMON_STAT_LABLES } from "@/constants/stats";
import ProgressBar from "@/components/progress";
import PokemonTypes from "../pokemon-types";
import PokemonStatus from "../pokemon-status";

type PokemonCardProps = {
  name?: string;
  types?: string[];
  sprites?: PokemonSprite;
  stats?: PokemonStats[];
};

function PokedexProfile({ name, types, sprites, stats }: PokemonCardProps) {
  const spritesArray = Object.keys({ ...sprites })
    ?.filter((key) => key !== "front_default")
    .map((key) => ({ ...sprites })[key])
    ?.filter((sprite) => sprite != null && typeof sprite === "string");

  return (
    <div className="flex gap-8">
      <div
        style={{
          border: `4px solid ${POKEMON_TYPE_COLORS[(types || [])[0]]}`,
        }}
        className="flex flex-col gap-4 items-center bg-white rounded-2xl"
      >
        <Image
          width={220}
          height={220}
          src={sprites?.front_default || Pokeball}
          alt={name || ""}
        />
        <div className="flex gap-2 flex-wrap max-w-[440px] items-center justify-center">
          {spritesArray?.map((sprite) => (
            <Image
              width={120}
              height={160}
              src={sprite || Pokeball}
              alt={name || ""}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="capitalize text-3xl">{name}</h1>
          <PokemonTypes types={types} />
        </div>
        <PokemonStatus stats={stats} />
      </div>
    </div>
  );
}

export default PokedexProfile;
