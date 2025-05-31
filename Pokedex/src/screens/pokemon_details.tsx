import { Diameter, Ruler } from "lucide-react";
import FeatureItem from "../components/pokemon details/features";
import NavigateButton from "../components/pokemon details/navigate_button";
import DetailHeader from "../components/pokemon details/detail_header";
import Stat from "../components/pokemon details/stat";
import PokemonTypes from "../components/pokemon details/types";
import { getTypesWeakAgainst } from "../utils/weakness";
import Abilities from "../components/pokemon details/abilities";
import { useDispatch, useSelector } from "react-redux";
import { navigatePokemon } from "../services/pokedex_slice";
import type { RootState } from "../services/pokedex_store";
import type { Pokemon } from "pokedex-promise-v2";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  themeColor: any;
  navigationHidden?: boolean;
}

export default function PokemonDetails({
  pokemon,
  themeColor,
  navigationHidden,
}: PokemonDetailsProps) {
  const dispatch = useDispatch();
  const { currentResourceList } = useSelector(
    (state: RootState) => state.pokedex,
  );

  return (
    // Border
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, var(${themeColor.shade}), var(${themeColor.tint}), var(${themeColor.dark}))`,
        backgroundSize: "100% 300%",
      }}
      className="
        m-5 p-[5px]
        bg-gradient-to-b
        rounded-[20px]
      "
    >
      {/* Modal Background */}
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, var(${themeColor.base}), var(${themeColor.tint}))`,
        }}
        className="
          flex flex-col overflow-y-auto
          w-full max-h-[500px]
          p-5
          rounded-[15px]
          gap-10
          md:w-[720px] md:max-h-fit
        "
      >
        {/* Top Bar */}
        <div
          style={{ backgroundColor: `var(${themeColor.shade}` }}
          className="
            flex flex-row
            font-[400] text-white text-md
            rounded-full
            justify-between
          "
        >
          {pokemon.id > 1 && !navigationHidden ? (
            <NavigateButton
              text={(pokemon.id - 1).toString().padStart(4, "0")}
              themeColor={themeColor}
              iconPosition="left"
              onClick={() => dispatch(navigatePokemon("prev"))}
            />
          ) : (
            <div
              className="
                w-[80px]
              "
            />
          )}
          <h1
            style={{ backgroundColor: `var(${themeColor.dark})` }}
            className="
              h-full
              p-[10px]
              font-medium
            "
          >
            {pokemon.name.toUpperCase()}
          </h1>

          {pokemon.id < (currentResourceList?.count ?? 0) &&
          !navigationHidden ? (
            <NavigateButton
              text={(pokemon.id + 1).toString().padStart(4, "0")}
              themeColor={themeColor}
              iconPosition="right"
              onClick={() => dispatch(navigatePokemon("next"))}
            />
          ) : (
            <div
              className="
                w-[80px]
              "
            />
          )}
        </div>

        {/* Pokemon Image and Details */}
        <div
          className="
            flex flex-col
            gap-[20px] justify-center items-center
            md:flex-row
          "
        >
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id
              .toString()
              .padStart(3, "0")}.png`}
            alt="Pokemon"
            style={{ backgroundColor: `var(${themeColor.shade})` }}
            className="
              object-scale-down
              w-[150px] h-[150px]
              p-[20px]
              rounded-full
            "
          />

          {/* Pokemon Details */}
          <div
            className="
              flex flex-col
              w-full
              gap-[10px] items-center justify-start
              lg:items-start
            "
          >
            {/* Pokemon ID and Types */}
            <div
              className="
                flex flex-row
                w-full
                items-center justify-between
              "
            >
              <p
                style={{
                  backgroundColor: `var(${themeColor.dark})`,
                }}
                className={`
                  w-fit
                  px-3 py-1
                  font-[400] text-white text-[16px]
                  rounded-full
                `}
              >
                #{pokemon.id.toString().padStart(4, "0")}
              </p>

              <div
                className="
                  flex flex-row
                  gap-1
                "
              >
                <PokemonTypes types={pokemon.types} />
              </div>
            </div>

            {/* Height and Weight */}
            <div
              className="
                flex flex-row
                w-full
                gap-2
              "
            >
              <FeatureItem
                label="Height"
                value={`${pokemon.height / 10} m`}
                icon={Ruler}
                themeColor={themeColor}
              />

              <FeatureItem
                label="Weight"
                value={`${pokemon.weight / 10} kg`}
                icon={Diameter}
                themeColor={themeColor}
              />
            </div>

            {/* Abilities */}
            <Abilities abilities={pokemon.abilities} themeColor={themeColor} />
          </div>
        </div>

        {/* Base Stats */}
        <div
          className="
            flex flex-col
            gap-[20px]
          "
        >
          <DetailHeader
            title="Base Stats"
            themeColor={themeColor}
            exp={pokemon.base_experience}
          />
          <div
            className="
              flex flex-wrap
              gap-[10px] justify-center items-center
            "
          >
            {pokemon.stats.map((stat, index) => (
              <Stat
                key={index}
                value={stat.base_stat}
                label={stat.stat.name}
                themeColor={themeColor}
              />
            ))}
          </div>
        </div>

        {/* Weak Against */}
        <div
          className="
            flex flex-col
            w-full
            gap-[20px] justify-center items-center
          "
        >
          <DetailHeader title="Weak Against" themeColor={themeColor} />

          <div
            className="
              flex flex-wrap
              justify-center items-center gap-[10px]
            "
          >
            <PokemonTypes
              types={getTypesWeakAgainst(pokemon.types[0].type.name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
