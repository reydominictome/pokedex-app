"use client";

import { ReactNode, useEffect } from "react";
import {
  createPokedexStore,
  PokedexStoreProvider,
} from "../providers/pokedex-provider";

const pokedex = createPokedexStore();

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const imgRe =
        /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[\/-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/,
      version = 1;
    self.addEventListener("fetch", function (e: any) {
      e.request.url.match(imgRe) &&
        e.respondWith(
          caches.match(e.request).then(function (t) {
            return (
              t ||
              fetch(e.request)
                .then(function (t) {
                  return (
                    e.request.url.match(imgRe) &&
                      caches
                        .open("pokeapi-js-wrapper-images-1")
                        .then(function (t) {
                          t.add(e.request.url);
                        }),
                    t
                  );
                })
                .catch(function (e) {
                  console.error(e);
                })
            );
          })
        );
    }),
      self.addEventListener("install", function (e) {
        (self as any).skipWaiting();
      });
  }, []);
  
  return (
    <PokedexStoreProvider value={pokedex}>{children}</PokedexStoreProvider>
  );
}
