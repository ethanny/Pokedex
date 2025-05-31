import { useEffect, useRef, useState } from "react";

import type { NamedAPIResourceList } from "pokedex-promise-v2";
import Pokedex from "pokedex-promise-v2";
import {
  AnimatedModal,
  ModalAnimation,
  type AnimatedModalObject,
} from "@dorbus/react-animated-modal";
import PokemonDetails from "../components/home/pokemon_details";
import Card from "../components/home/card";
import { getTypeTheme } from "../utils/type_theme";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementOffset,
  decrementOffset,
  setCurrentResourceList,
  setPokemons,
  setSelectedPokemon,
  limit,
} from "../services/pokedex_slice";
import type { RootState } from "../services/pokedex_store";

export const pokemonApi = new Pokedex();

export default function Home() {
  const dispatch = useDispatch();
  const { offset, currentResourceList, pokemons, selectedPokemon } =
    useSelector((state: RootState) => state.pokedex);

  const ref = useRef<AnimatedModalObject>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const interval = {
      limit: limit,
      offset: offset,
    };
    pokemonApi
      .getPokemonsList(interval)
      .then((resourceList: NamedAPIResourceList) => {
        dispatch(setCurrentResourceList(resourceList));

        Promise.all(
          resourceList.results.map((p) => pokemonApi.getPokemonByName(p.name)),
        )
          .then((detailedPokemons) => {
            dispatch(setPokemons(detailedPokemons));
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
      {/* Pokemon Details Modal */}
      <AnimatedModal
        animation={ModalAnimation.Reveal}
        ref={ref}
        closeOnBackgroundClick={true}
        backgroundStyle={{ opacity: 1 }}
        modalStyle={{
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        {pokemons[selectedPokemon] !== null && pokemons[selectedPokemon] && (
          <PokemonDetails
            pokemon={pokemons[selectedPokemon]}
            themeColor={getTypeTheme(
              pokemons[selectedPokemon].types[0].type.name,
            )}
          />
        )}
      </AnimatedModal>

      {/* Search Bar */}
      <div
        className="
          w-full
          mb-4
          sticky
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

      {/* Pokemon Cards */}
      <div
        className="
          grid grid-cols-2 grid-rows-5
          h-full
          items-center gap-4
          sm:grid-cols-3 sm:grid-rows-4
          md:grid-cols-4 md:grid-rows-3
          lg:grid-cols-5 lg:grid-rows-2
        "
      >
        {filteredPokemons.map((pokemon, index) => (
          <button
            onClick={() => {
              dispatch(setSelectedPokemon(index));
              ref.current?.OpenModal(ModalAnimation.Reveal);
              console.log(pokemon);
            }}
          >
            <Card
              key={pokemon.name}
              pokemon={pokemon}
              themeColor={getTypeTheme(pokemon.types[0].type.name)}
            />
          </button>
        ))}
      </div>

      {/* Pagination */}
      <div
        className="
          flex flex-row
          sticky bottom-0
        "
      >
        {currentResourceList?.previous && (
          <button onClick={() => dispatch(decrementOffset())}>Previous</button>
        )}

        {currentResourceList?.next && (
          <button onClick={() => dispatch(incrementOffset())}>Next</button>
        )}
      </div>
    </div>
  );
}
