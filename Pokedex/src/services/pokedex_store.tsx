import { configureStore } from "@reduxjs/toolkit";
import { pokedexSlice } from "./pokedex_slice";

const store = configureStore({
  reducer: {
    pokedex: pokedexSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
