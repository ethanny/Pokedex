import { useEffect, useRef, useState } from "react";
import Card, { getTypeBgVariants } from "../components/card";
import type {
  NamedAPIResource,
  NamedAPIResourceList,
  Pokemon,
} from "pokedex-promise-v2";
import Pokedex from "pokedex-promise-v2";
import {
  AnimatedModal,
  ModalAnimation,
  type AnimatedModalObject,
} from "@dorbus/react-animated-modal";
export const pokemonApi = new Pokedex();

export default function Home() {
  const [currentResourceList, setCurrentResourceList] =
    useState<NamedAPIResourceList>();
  const [pokemonEndpoints, setPokemonEndpoints] = useState<NamedAPIResource[]>(
    [],
  );
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const [searchQuery, setSearchQuery] = useState("");

  const [offset, setOffset] = useState<number>(0);

  const ref = useRef<AnimatedModalObject>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const interval = {
      limit: 10,
      offset: offset,
    };
    pokemonApi
      .getPokemonsList(interval)
      .then((resourceList: NamedAPIResourceList) => {
        setCurrentResourceList(resourceList);
        setPokemonEndpoints(resourceList.results);

        Promise.all(
          resourceList.results.map((p) => pokemonApi.getPokemonByName(p.name)),
        )
          .then((detailedPokemons) => {
            setPokemons(detailedPokemons);
          })
          .catch((error) => {
            console.error("Failed to fetch Pokémon details:", error);
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [offset]);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemon.id.toString().includes(searchLower)
    );
  });

  return (
    <div
      className="
        flex flex-col
        w-full max-w-[1000px] min-h-screen
        p-4 mx-auto
        justify-between items-center
      "
    >
      <AnimatedModal

        animation={ModalAnimation.BlowUp}
        ref={ref}
        closeOnBackgroundClick={true}
        backgroundStyle={{ opacity: 1 }}
        modalStyle={{
          padding: 0,
        }}
      >
        <div>Hello</div>
      </AnimatedModal>
      <div
        className="
          w-full
          mb-4
          sticky bottom-0
        "
      >
        <input
          type="text"
          placeholder="Search a by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            px-4 py-2
            border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      <div
        onClick={() => ref.current?.OpenModal(ModalAnimation.Reveal)}
        className="
          grid grid-cols-2 grid-rows-5
          h-full
          items-center gap-4
          sm:grid-cols-3 sm:grid-rows-4
          md:grid-cols-4 md:grid-rows-3
          lg:grid-cols-5 lg:grid-rows-2
        "
      >
        {filteredPokemons.map((pokemon) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            themeColor={getTypeBgVariants(pokemon.types[0].type.name)}
          />
        ))}
      </div>

      <div
        className="
          flex flex-row
          sticky bottom-0
        "
      >
        {currentResourceList?.previous && (
          <button onClick={() => setOffset(offset - 10)}>Previous</button>
        )}

        {currentResourceList?.next && (
          <button onClick={() => setOffset(offset + 10)}>Next</button>
        )}
      </div>
    </div>
  );
}
