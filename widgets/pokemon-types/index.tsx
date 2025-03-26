import { POKEMON_TYPE_COLORS } from "@/constants/types";

function PokemonTypes({ types }: { types?: string[] }) {
  return (
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
  );
}

export default PokemonTypes;