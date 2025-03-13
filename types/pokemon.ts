type BasePokemon = {
  name: string;
};

export type PokedexPokemon = BasePokemon & {
  url: string;
};

export type PokemonSprite = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

export type PokemonStats = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type Pokemon = BasePokemon & {
  id: number;
  name: string;
  sprites: PokemonSprite;
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: PokemonStats[];
};
