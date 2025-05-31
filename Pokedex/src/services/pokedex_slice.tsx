import { createSlice } from "@reduxjs/toolkit";
import type { NamedAPIResourceList, Pokemon } from "pokedex-promise-v2";

export const limit = 10;
type SortOrder = "ascending" | "descending";
type SortOption = "name" | "id";

export const pokedexSlice = createSlice({
  name: "pokedex",

  initialState: {
    offset: 0 as number,
    currentResourceList: null as NamedAPIResourceList | null,
    pokemons: [] as Pokemon[],
    selectedPokemon: 0 as number,
    pendingNavigation: false as boolean,
    sortOrder: "ascending" as SortOrder,
    sortOption: "id" as SortOption,
  },
  reducers: {
    loadMore: (state) => {
      if (state.currentResourceList?.next) {
        state.offset += limit;
      }
    },
    setCurrentResourceList: (state, action) => {
      state.currentResourceList = action.payload;
    },
    setPokemons: (state, action) => {
      // Append new pokemons to existing list
      state.pokemons = [...state.pokemons, ...action.payload];
      // If there's a pending navigation, wait for new data to arrive before assining new selected pokemon
      if (state.pendingNavigation) {
        state.selectedPokemon = state.pokemons.length - action.payload.length;
        state.pendingNavigation = false;
      }
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    navigatePokemon: (state, action) => {
      const direction = action.payload;
      const currentIndex = state.selectedPokemon;

      if (direction === "next") {
        if (currentIndex < state.pokemons.length - 1) {
          // If not at the end of current list, just increment index
          state.selectedPokemon = currentIndex + 1;
        } else if (state.currentResourceList?.next) {
          // If at the end and there's more to load, load more and mark pending navigation
          state.offset += limit;
          state.pendingNavigation = true;
        }
      } else if (direction === "prev") {
        if (currentIndex > 0) {
          // If not at the start of current list, just decrement index
          state.selectedPokemon = currentIndex - 1;
        }
      }
    },
    toggleSortOrder: (state) => {
      state.sortOrder =
        state.sortOrder === "ascending" ? "descending" : "ascending";
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const {
  loadMore,
  setCurrentResourceList,
  setPokemons,
  setSelectedPokemon,
  navigatePokemon,
  toggleSortOrder,
  setSortOption,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;
