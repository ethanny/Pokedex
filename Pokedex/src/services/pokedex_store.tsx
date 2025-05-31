import { configureStore } from "@reduxjs/toolkit";
import { pokedexSlice } from "./pokedex_slice";

const store = configureStore({
  reducer: {
    pokedex: pokedexSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
