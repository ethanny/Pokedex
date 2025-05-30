import { useEffect, useState } from "react";
import { pokemonApi } from "../screens/home";
import type { Pokemon } from "pokedex-promise-v2";
import Skeleton from "react-loading-skeleton";

interface CardProps {
  name: string;
}

export default function Card({ name }: CardProps) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    pokemonApi
      .getPokemonByName(name)
      .then((pokemon: Pokemon) => {
        setPokemon(pokemon);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        className="
          w-full h-full
          bg-amber-300
        "
      >
        {" "}
      </div>
    );
  }

  return (
    <>
      {/* Card container */}
      <div
        className="
          w-full h-full
          p-[5px]
          bg-gradient-to-b from-grass-tint via-grass-shade to-grass-dark bg-[length:100%_300%]
          rounded-[15px]
          duration-300 hover:scale-105 ease-in-out hover:bg-[length:100%_200%] hover:animate-bounceUpDown
        "
      >
        {/* Card column content */}
        <div
          className="
            inline-flex flex-col
            h-full w-full
            bg-gradient-to-b from-[var(--color-grass)] to-[var(--color-grass-tint)]
            rounded-[10px]
            justify-between items-center relative
          "
        >
          {/* Mask overlay */}
          <img
            src="/src/assets/images/mask.jpg"
            alt=""
            className="
              object-cover
              w-full h-full
              rounded-[10px]
              transition-all opacity-0
              hover:opacity-50 absolute mix-blend-plus-lighter [mask-image:linear-gradient(to_right,_black_0%,_transparent_100%)] [mask-size:200%_100%]  duration-300 ease-in-out animate-sweep
            "
          />

          {/* Card header */}
          <div
            className="
              flex flex-row
              w-full
              p-[5px]
              justify-between items-center
            "
          >
            <p
              className="
                inline-flex
                p-[5px] px-3 py-1
                font-regular text-white text-xs
                bg-grass-shade
                rounded-full
                justify-start items-center gap-1
              "
            >
              #{pokemon?.id?.toString().padStart(4, "0")}
            </p>

            {/* Id */}
            <p
              className="
                inline-flex
                p-[5px] px-3 py-1
                font-regular text-white text-xs
                bg-[var(--color-grass-shade)]
                rounded-full
                justify-start items-center gap-1
              "
            >
              #0132
            </p>
          </div>

          {/* Pokemon image */}
          <img
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
            alt="Pokemon"
            className="
              object-cover
              h-full w-full
              p-[30px]
            "
          />

          {/* Name */}
          <p
            className="
              inline-flex
              w-full
              px-2 py-2
              font-regular text-white text-[14px]
              bg-grass-shade
              rounded-b-[10px]
              translate-y-[-1px]
            "
          >
            {pokemon?.name &&
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </p>
        </div>
      </div>
    </>
  );
}
