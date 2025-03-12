type BasePokemon = {
    name: string;
}

export type PokedexPokemon = BasePokemon & {
    url: string;
}