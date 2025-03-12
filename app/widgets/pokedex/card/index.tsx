import { PokedexPokemon } from "@/types/pokemon";
import { generateSpriteImage } from "@/utils/image";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import Pokeball from "../../../../images/pokeball.png";
import queryString from "query-string";
import Link from "next/link";
import { usePathname } from "next/navigation";

function PokedexCard({ pokemon }: { pokemon: PokedexPokemon }) {
  const pathname = usePathname();
  const [imageUrl, setImageUrl] = useState<StaticImageData | string>(Pokeball);
  const splitPokemonUrl = pokemon?.url?.split("/");
  const pokemonId = splitPokemonUrl?.[splitPokemonUrl.length - 2];

  const pokemonName = pokemon.name.split("-").join(" ");

  useEffect(() => {
    setImageUrl(generateSpriteImage(Number(pokemonId) || 0));
  }, [pokemonId]);

  return (
    <Link
      className="flex flex-col items-center border-solid rounded-lg border-2 transition delay-150 duration-300 ease-in-out hover:scale-125"
      href={queryString.stringifyUrl({
        url: pathname,
        query: { pokemonId: pokemonId },
      })}
    >
      <Image
        width={180}
        height={180}
        src={imageUrl}
        alt={pokemon.name}
        onError={() => {
          setImageUrl(Pokeball);
        }}
      />
      <span className="capitalize">{pokemonName}</span>
    </Link>
  );
}

export default React.memo(
  PokedexCard,
  (prevProps, nextProps) => prevProps.pokemon.name === nextProps.pokemon.name
);
