"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";

import { type StoreApi, useStore } from "zustand";
import { persist } from "zustand/middleware";

import { createStore } from "zustand/vanilla";

type State = {
  user: any;
};

type Action = {
  updateUser: (_: any) => void;
};

export type UserStore = State & Action;

export const createUserStore = () =>
  createStore<UserStore>()(
    persist(
      (set) => ({
        user: null,
        updateUser: (user: any) =>
          set(() => ({
            user,
          })),
      }),
      { name: "codechum_playground" }
    )
  );

export const MainStoreContext = createContext<StoreApi<UserStore> | null>(null);

interface UserStoreProviderProps {
  children: ReactNode;
  value: StoreApi<UserStore>;
}

export function UserStoreProvider({ children, value }: UserStoreProviderProps) {
  const storeRef = useRef<StoreApi<UserStore>>(undefined);

  if (!storeRef.current) {
    storeRef.current = value;
  }

  return (
    <MainStoreContext.Provider value={storeRef.current}>
      {children}
    </MainStoreContext.Provider>
  );
}

export const useUserStore = <T,>(selector: (_store: UserStore) => T): T => {
  const mainStoreContext = useContext(MainStoreContext);

  if (!mainStoreContext) {
    throw new Error(`usePokdexStore must be used within UserStoreProvider`);
  }

  return useStore(mainStoreContext, selector);
};
