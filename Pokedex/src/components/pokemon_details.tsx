import type { PokemonProps } from "./card";


export default function PokemonDetails({ pokemon, themeColor }: PokemonProps) {
    return (
        <div>
            <h1>{pokemon.name}</h1>
        </div>
    )
}