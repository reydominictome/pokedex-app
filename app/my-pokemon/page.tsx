"use client";

import PokeballPreloader from "@/components/pokeball-loader";
import supabase from "@/config/supabaseConfig";
import { useUserStore } from "@/providers/user-provider";
import PokemonCard from "@/widgets/pokemon-card";
import { useEffect, useState } from "react";

export default function MyPokemonPage() {
  const user = useUserStore((store) => store.user);
  const [myPokemon, setMyPokemon] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const retrievePokemon = async () => {
      setIsLoading(true);

      const { data } = await supabase
        .from("pokemon")
        .select("*")
        .eq("owner_id", user?.id);

      setMyPokemon(data!);
      setIsLoading(false);
    };

    retrievePokemon();
  }, [refetch]);

  return isLoading ? (
    <PokeballPreloader text="Getting your Pokemon..." />
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {myPokemon.map((pokemon) => {
        const onDelete = async () => {
          await supabase.from("pokemon").delete().eq("id", pokemon.id);

          setRefetch((prev) => prev + 1);
        };

        return <PokemonCard name={pokemon.name} onDelete={onDelete} />;
      })}
    </div>
  );
}
