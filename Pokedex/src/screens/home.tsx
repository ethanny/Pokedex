import { useEffect, useState } from "react";
import Card from "../components/card";
import type {
  NamedAPIResource,
  NamedAPIResourceList,
} from "pokedex-promise-v2";
import Pokedex from "pokedex-promise-v2";
export const pokemonApi = new Pokedex();

export default function Home() {
  const [currentResourceList, setCurrentResourceList] =
    useState<NamedAPIResourceList>();
  const [pokemonEndpoints, setPokemonEndpoints] = useState<NamedAPIResource[]>(
    [],
  );

  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const interval = {
      limit: 10,
      offset: offset,
    };
    pokemonApi
      .getPokemonsList(interval)
      .then((resourceList: NamedAPIResourceList) => {
        setIsLoading(false);
        console.log(resourceList);
        setCurrentResourceList(resourceList);

        setPokemonEndpoints(resourceList.results);

        // Promise.all(
        //   resourceList.results.map((p) => pokemonApi.getPokemonByName(p.name)),
        // )
        //   .then((detailedPokemons) => {
        //     setPokemons(detailedPokemons);
        //     setIsLoading(false);
        //   })
        //   .catch((error) => {
        //     console.error("Failed to fetch Pokémon details:", error);
        //     setIsLoading(false);
        //   });
      });
  }, [offset]);

  if (isLoading) return <div className="h-screen w-screen"> "Loading..."; </div>

  return (
    <div
      className="
        flex flex-col
        w-full max-w-[1000px] min-h-screen
        p-4 mx-auto
        justify-between items-center
      "
    >
      {/* <div>
        {pokemonEndpoints.map((p) => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div> */}

      <div
        className="
          flex flex-row
        "
      >
        {currentResourceList?.next && (
          <button onClick={() => setOffset(offset + 10)}>Next</button>
        )}
        {currentResourceList?.previous && (
          <button onClick={() => setOffset(offset - 10)}>Previous</button>
        )}
      </div>
      <div
        className="
          grid grid-cols-2
          items-center gap-4
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {pokemonEndpoints.map((p) => (
          <Card key={p.name} name={p.name} />
        ))}
      </div>
      <h1>Hello</h1>
    </div>
  );
}
