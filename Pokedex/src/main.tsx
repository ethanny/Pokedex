import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./screens/home";
import { Provider } from 'react-redux'
import pokedexStore from "./services/pokedex_store";


createRoot(document.getElementById("root")!).render(
  <Provider store={pokedexStore}>
  <StrictMode>
    <Home/>
  </StrictMode>,
  </Provider>
);
