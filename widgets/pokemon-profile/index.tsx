import Image from "next/image";
import React from "react";
import Pokeball from "@/images/pokeball.png";
import { PokemonSprite, PokemonStats } from "@/types/pokemon";
import { POKEMON_TYPE_COLORS } from "@/constants/types";
import { Progress } from "@radix-ui/react-progress";
import { POKEMON_STAT_LABLES } from "@/constants/stats";
import ProgressBar from "@/components/progress";

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
          <div className="flex gap-2">
            {types?.map((t) => {
              return (
                <span
                  style={{
                    backgroundColor: POKEMON_TYPE_COLORS[t],
                  }}
                  className={`capitalize text-white p-1 rounded-lg`}
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="capitalize text-2xl">Stats</h1>
          <div className="flex flex-col gap-2">
            {stats?.map((stat) => (
              <StatusBar label={POKEMON_STAT_LABLES[stat.stat.name]} value={stat.base_stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ gridTemplateColumns: '60px 1fr', }} className="grid gap-4">
      <span>{label}</span>
      <div className="w-[260px]">
        <ProgressBar max={255} value={value} />
      </div>
    </div>
  );
}

export default PokedexProfile;
