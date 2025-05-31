import { useEffect, useRef, useState } from "react";
import Pokedex, { type Pokemon } from "pokedex-promise-v2";
import {
  ModalAnimation,
  type AnimatedModalObject,
} from "@dorbus/react-animated-modal";
import Card from "../components/home/card";
import { getTypeTheme } from "../utils/type_theme";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMore,
  setCurrentResourceList,
  setPokemons,
  setSelectedPokemon,
  limit,
  setSortOption,
} from "../services/pokedex_slice";
import type { RootState } from "../services/pokedex_store";
import SortButton from "../components/home/sort_button";
import ActionButton from "../components/home/action_button";
import SortingOrderButton from "../components/home/sorting_order_button";
import toast, { Toaster } from "react-hot-toast";
import PokemonModals from "../components/pokemon details/modals";

export const pokemonApi = new Pokedex();

export default function Home() {
  const dispatch = useDispatch();
  const {
    offset,
    currentResourceList,
    pokemons,
    selectedPokemon,
    sortOption,
    sortOrder,
  } = useSelector((state: RootState) => state.pokedex);

  const ref = useRef<AnimatedModalObject>(null);
  const searchRef = useRef<AnimatedModalObject>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);

  // Fetch paginated pokemons
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
      .catch(() => {
        toast.error("Failed to fetch Pokémon.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //fetch a specific pokemon not previously fetched
  const searchSpecificPokemon = async (pokemonNameId: string) => {
    pokemonNameId.replace(/^0+/, "");
    setIsLoading(true);

    pokemonApi
      .getPokemonByName(pokemonNameId)
      .then((pokemon) => {
        setSearchedPokemon(pokemon);
        searchRef.current?.OpenModal(ModalAnimation.Reveal);
      })
      .catch(() => {
        toast.error("Failed to fetch Pokémon. Pokemon does not exist.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const filteredPokemons = pokemons
    .filter((pokemon) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        pokemon.name.toLowerCase().includes(searchLower) ||
        pokemon.id.toString().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortOption === "id") {
        return sortOrder === "ascending" ? a.id - b.id : b.id - a.id;
      } else {
        return sortOrder === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  return (
    <div
      className="
        flex flex-col
        w-full max-w-[1000px] min-h-screen
        p-5 mx-auto
        gap-5 items-center justify-between
      "
    >
      <Toaster />

      {/* Pokemon Search and Details Modal */}
      <PokemonModals
        pokemons={pokemons}
        selectedPokemon={selectedPokemon}
        searchedPokemon={searchedPokemon}
        ref={ref}
        searchRef={searchRef}
      />
      {/* Search Bar */}
      <div
        style={{
          backgroundImage: "linear-gradient(to bottom, #de3d3d, #961818)",
        }}
        className="
          flex flex-row z-10
          w-full
          p-2 mb-5
          bg-[#CE2223]
          rounded-full
          gap-1 sticky top-5
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

        <button
          disabled={isLoading || searchQuery.length === 0}
          onClick={() => {
            searchSpecificPokemon(searchQuery);
          }}
          className="
            px-4 py-2
            text-[#961818]
            bg-white
            border-2 border-[#961818] rounded-full
            transition-all
            hover:bg-[#961818]/20 hover:text-white duration-300
          "
        >
          Search
        </button>
      </div>

      {/* Sorting Buttons */}
      <div
        className="
          flex flex-row
          h-full
          justify-center items-center
        "
      >
        <SortingOrderButton isLoading={isLoading} />

        <SortButton
          label="ID"
          onClick={() => dispatch(setSortOption("id"))}
          isLoading={isLoading}
          isLeft={true}
          isSelected={sortOption === "id"}
        />

        <SortButton
          label="Name"
          onClick={() => dispatch(setSortOption("name"))}
          isLoading={isLoading}
          isLeft={false}
          isSelected={sortOption === "name"}
        />
      </div>

      {/* Pokemon Cards */}
      <div
        className="
          grid grid-cols-2 grid-rows-5
          w-full
          items-center gap-4
          sm:grid-cols-3 sm:grid-rows-4
          md:grid-cols-4 md:grid-rows-3
          lg:grid-cols-5 lg:grid-rows-2
        "
      >
        {filteredPokemons.length === 0 && (
          // Error and empty state
          <div
            className="
              h-full
              p-[50px]
              text-black/30 text-center text-xl font-medium
              col-span-full row-span-full items-center justify-center
            "
          >
            <p>
              No Pokémon found.
              <br /> Try another search, load more pokémons, or tap on the
              search button.
            </p>
          </div>
        )}

        {filteredPokemons.map((pokemon) => (
          <button
            key={pokemon.name}
            onClick={() => {
              dispatch(setSelectedPokemon(pokemon.id - 1));
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
      <div
        className="
          flex
          w-full
          mt-auto
          justify-center
        "
      >
        {currentResourceList?.next && (
          <ActionButton
            label="Discover more Pokemons"
            onClick={() => dispatch(loadMore())}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
