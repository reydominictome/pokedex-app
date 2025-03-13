import { usePokedexStore } from "@/providers/pokedex-provider";
import Modal from "@/components/modal";
import useQueryParams from "@/hooks/use-query-params";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import PokedexProfile from "../pokemon-profile";

function PokemonDetailsModal() {
  const pokedex = usePokedexStore((state) => state.pokedex)!;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { queryParams, setQueryParams } = useQueryParams();
  const { name } = queryParams || {};

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
      <div className="p-4 bg-[#e5e7eb]">
        {pokemon && <PokedexProfile {...profileProps} />}
      </div>
    </Modal>
  );
}

export default PokemonDetailsModal;
