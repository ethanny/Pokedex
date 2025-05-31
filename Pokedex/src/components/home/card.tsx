import type { Pokemon } from "pokedex-promise-v2";

interface PokemonProps {
  pokemon: Pokemon;
  themeColor: any;
}

export default function Card({ pokemon, themeColor }: PokemonProps) {
  const imageId = pokemon.id.toString().padStart(3, "0");
  return (
    <>
      {/* Card container */}
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, var(${themeColor.tint}), var(${themeColor.shade}), var(${themeColor.dark}))`,
          backgroundSize: "100% 300%",
        }}
        className={`
          p-[5px]
          bg-gradient-to-b
          rounded-[15px]
          cursor-pointer
          duration-300 hover:scale-105 ease-in-out hover:bg-[length:100%_200%] hover:animate-bounceUpDown
        `}
      >
        {/* Card column content */}
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, var(${themeColor.base}), var(${themeColor.tint}))`,
          }}
          className={`
            inline-flex flex-col
            h-full w-full
            rounded-[10px]
            justify-between items-center relative
          `}
        >
          <img
            src="/src/assets/images/mask.jpg"
            alt=""
            className="
              object-cover
              w-full h-full
              rounded-[10px]
              transition-all opacity-0 animate-sweep
              hover:opacity-50 absolute mix-blend-plus-lighter [mask-image:linear-gradient(to_right,_black_0%,_transparent_100%)] [mask-size:200%_100%] duration-300 ease-in-out
            "
          />

          {/* Card header */}
          <div
            className="
              flex flex-row
              w-full
              p-[10px]
              justify-between items-start
            "
          >
            <p
              style={{
                backgroundColor: `var(${themeColor.shade})`,
              }}
              className={`
                inline-flex
                px-3 py-1
                font-regular text-white text-xs
                rounded-[5px]
                justify-start items-center gap-1 skew-x-[-10deg]
              `}
            >
              #{pokemon.id.toString().padStart(4, "0")}
            </p>

            {/* type */}
            <div
              className="
                flex flex-row
                gap-0.5
              "
            >
              {pokemon.types.map((typeInfo, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: `var(--color-${typeInfo.type.name}-shade)`,
                  }}
                  className={`
                    inline-flex
                    px-1 py-1
                    rounded-full
                    items-center justify-center
                  `}
                >
                  <img
                    src={`/src/assets/images/${typeInfo.type.name}.svg`}
                    alt={typeInfo.type.name}
                    aria-label={typeInfo.type.name}
                    className="
                      object-cover
                      w-[14px] h-[14px]
                    "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pokemon image */}
          <div
            className="

            "
          >
            {pokemon && (
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageId}.png`}
                alt="Pokemon"
                loading="lazy"
                aria-label={pokemon.name}
                className="
                  object-scale-down
                  h-40 w-50
                  p-[30px]
                  transition-all
                  duration-300 ease-in-out
                "
              />
            )}
          </div>

          {/* Name */}
          <h1
            style={{
              backgroundColor: `var(${themeColor.shade})`,
            }}
            className={`
              inline-flex
              w-full
              px-2 py-2
              font-[400] text-white text-[14px]
              rounded-b-[10px]
              translate-y-[-1px]
            `}
          >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
        </div>
      </div>
    </>
  );
}
