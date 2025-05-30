// import type {
//   NamedAPIResource,
//   NamedAPIResourceList,
// } from "pokedex-promise-v2";

// import React, { useState } from "react";

// interface PokedexContextType {
//   pokemons: NamedAPIResource[];
//   currentResourceList?: NamedAPIResourceList;
//   offset: number;
//   isLoading: boolean;
// }

// interface UpdateContextType {
//   setPokemons: (pokemons: NamedAPIResource[]) => void;
// }

// const PokedexContext = React.createContext<PokedexContextType | undefined>(
//   undefined,
// );

// const UpdateContext = React.createContext<UpdateContextType | undefined>

// interface PokedexProviderProps {
//   children: React.ReactNode;
// }

// export function PokedexProvider({ children }: PokedexProviderProps) {
//   const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);
//   const [currentResourceList, setCurrentResourceList] =
//     useState<NamedAPIResourceList>();
//   const [offset, setOffset] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <PokedexContext.Provider
//       value={{ pokemons, currentResourceList, offset, isLoading }}
//     >
//       {children}
//     </PokedexContext.Provider>
//   );
// }
