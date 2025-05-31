import { createSlice } from "@reduxjs/toolkit";
import type { NamedAPIResourceList, Pokemon } from "pokedex-promise-v2";

export const limit = 10;

export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: {
    offset: 0 as number,
    currentResourceList: null as NamedAPIResourceList | null,
    pokemons: [] as Pokemon[],
    selectedPokemon: 0 as number,
  },
  reducers: {
    incrementOffset: (state) => {
      state.offset += limit;
    },
    decrementOffset: (state) => {
      state.offset -= limit;
    },
    setCurrentResourceList: (state, action) => {
      state.currentResourceList = action.payload;
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { incrementOffset, decrementOffset, setCurrentResourceList, setPokemons, setSelectedPokemon } =
  pokedexSlice.actions;

export default pokedexSlice.reducer;
