"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";

import { type StoreApi, useStore } from "zustand";

import { createStore } from "zustand/vanilla";

import { Pokedex } from "pokeapi-js-wrapper";

const pokedex = new Pokedex({
  protocol: 'https',
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
});

type State = {
  pokedex: Pokedex | null;
};

export type PokedexStore = State;

export const createPokedexStore = () =>
  createStore<PokedexStore>((set) => ({
    pokedex: pokedex,
  }));

export const MainStoreContext = createContext<StoreApi<PokedexStore> | null>(
  null
);

interface PokedexStoreProviderProps {
  children: ReactNode;
  value: StoreApi<PokedexStore>;
}

export function PokedexStoreProvider({
  children,
  value,
}: PokedexStoreProviderProps) {
  const storeRef = useRef<StoreApi<PokedexStore>>(undefined);

  if (!storeRef.current) {
    storeRef.current = value;
  }

  return (
    <MainStoreContext.Provider value={storeRef.current}>
      {children}
    </MainStoreContext.Provider>
  );
}

export const usePokedexStore = <T,>(
  selector: (_store: PokedexStore) => T
): T => {
  const mainStoreContext = useContext(MainStoreContext);

  if (!mainStoreContext) {
    throw new Error(`usePokdexStore must be used within PokedexStoreProvider`);
  }

  return useStore(mainStoreContext, selector);
};
