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
  loadMore,
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

  const fetchPokemons = async () => {
    setIsLoading(true);

    const interval = {
      limit: limit,
      offset: offset,
    };

    pokemonApi
      .getPokemonsList(interval)
      .then((resourceList) => {
        dispatch(setCurrentResourceList(resourceList));
        return Promise.all(
          resourceList.results.map((p) => pokemonApi.getPokemonByName(p.name)),
        );
      })
      .then((detailedPokemons) => {
        dispatch(setPokemons(detailedPokemons));
      })
      .catch((error) => {
        console.error("Failed to fetch Pokémon details:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPokemons();
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
        p-5 mx-auto
        gap-5 justify-between items-center
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
        style={{
          backgroundImage: "linear-gradient(to bottom, #de3d3d, #961818)",
        }}
        className="
          z-10
          w-full
          p-2 mb-5
          bg-[#CE2223]
          rounded-full
          sticky top-5
        "
      >
        <input
          type="text"
          placeholder="Search a pokemon by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            px-4 py-2
            font-regular placeholder-gray-400
            bg-white
            border-2 border-[#961818] rounded-full
            transition-all
            outline-none sticky focus:ring-none duration-300
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
            key={pokemon.name}
            onClick={() => {
              dispatch(setSelectedPokemon(index));
              ref.current?.OpenModal(ModalAnimation.Reveal);
            }}
          >
            <Card
              pokemon={pokemon}
              themeColor={getTypeTheme(pokemon.types[0].type.name)}
            />
          </button>
        ))}
      </div>

      {/* Load More Button */}
      {currentResourceList?.next && (
        <div
          className="
            "
            >
            <div
            className="
            inline-block
            w-fit
            relative
          "
          >
            {/* Background shape */}
            <div
              className="
                z-0
                h-full w-full
                bg-[#961818]
                rounded-lg
                absolute
              "
            />

            {/* Button */}
            <button
              onClick={() => dispatch(loadMore())}
              disabled={isLoading}
              className="
                w-[250px]
                px-2 py-2
                text-[18px] text-white
                bg-[#CE2223]
                rounded-lg border-3 border-solid border-[#961818]
                cursor-pointer transition-all
                relative disabled:opacity-50 disabled:cursor-not-allowed transform: translate-y-[-5px] hover:translate-y-[0px] duration-300
              "
            >
              {isLoading ? "Loading..." : "Discover more Pokemons"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
