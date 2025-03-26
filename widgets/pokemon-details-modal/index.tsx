import { usePokedexStore } from "@/providers/pokedex-provider";
import Modal from "@/components/modal";
import useQueryParams from "@/hooks/use-query-params";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import PokedexProfile from "../pokemon-profile";
import { useUserStore } from "@/providers/user-provider";
import { Button } from "@/components/ui/button";
import PokeballButton from "../pokeball-button";
import supabase from "@/config/supabaseConfig";
import PokeballPreloader from "@/components/pokeball-loader";

function PokemonDetailsModal() {
  const pokedex = usePokedexStore((state) => state.pokedex)!;
  const user = useUserStore((store) => store.user);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams();
  const { name } = queryParams || {};

  const onAddToFavorites = async () => {
    const { error } = await supabase
      .from("pokemon")
      .insert({ owner_id: user.id, name: name });
  };

  useEffect(() => {
    if (name && !pokemon) {
      pokedex.getPokemonByName(name as string).then((response: any) => {
        setPokemon(response);
      });
    }
  }, [name]);

  const title = pokemon?.id ? `Pokedex No. ${pokemon?.id}` : "";

  const profileProps = {
    ...(pokemon || {}),
    types: pokemon?.types?.map((t) => t.type.name),
  }!;

  return (
    <Modal
      title={title}
      onClose={() => {
        setQueryParams({ name: undefined });
      }}
    >
      <div className="p-4 bg-[#e5e7eb] flex flex-col">
        {pokemon ? (
          <PokedexProfile {...profileProps} />
        ) : (
          <PokeballPreloader text="A wild encounter is coming..." />
        )}
      </div>
      {user && (
        <footer className="p-4 bg-[#ef5350] flex justify-end">
          <PokeballButton onClick={onAddToFavorites}>
            <span className="capitalize bold">{name},</span> GET!
          </PokeballButton>
        </footer>
      )}
    </Modal>
  );
}

export default PokemonDetailsModal;
