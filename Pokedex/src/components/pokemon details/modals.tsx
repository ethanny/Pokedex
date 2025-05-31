import { type RefObject } from "react";
import {
  AnimatedModal,
  ModalAnimation,
  type AnimatedModalObject,
} from "@dorbus/react-animated-modal";
import type { Pokemon } from "pokedex-promise-v2";
import PokemonDetails from "../../screens/pokemon_details";
import { getTypeTheme } from "../../utils/type_theme";

interface PokemonModalsProps {
  pokemons: Pokemon[];
  selectedPokemon: number;
  searchedPokemon: Pokemon | null;
  ref: RefObject<AnimatedModalObject | null>;
  searchRef: RefObject<AnimatedModalObject | null>;
}

export default function PokemonModals({
  pokemons,
  selectedPokemon,
  searchedPokemon,
  ref,
  searchRef,
}: PokemonModalsProps) {
  return (
    <>
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

      <AnimatedModal
        animation={ModalAnimation.Reveal}
        ref={searchRef}
        closeOnBackgroundClick={true}
        backgroundStyle={{ opacity: 1 }}
        modalStyle={{
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        {searchedPokemon !== null && (
          <PokemonDetails
            navigationHidden={true}
            pokemon={searchedPokemon}
            themeColor={getTypeTheme(searchedPokemon.types[0].type.name)}
          />
        )}
      </AnimatedModal>
    </>
  );
}
