export default function Card() {
  return (
    <>
      {/* Card container */}
      <div
        className="
          w-full h-full
          p-[5px]
          bg-gradient-to-b from-grass-tint via-grass-shade to-grass-dark
          rounded-[15px]
        "
      >
        {/* Card column content */}
        <div
          className="
            inline-flex flex-col
            h-full w-full
            bg-gradient-to-b from-[var(--color-grass)] to-[var(--color-grass-tint)]
            rounded-[10px]
            justify-between items-center
          "
        >
          {/* Card header */}
          <div
            className="
              flex flex-row
              w-full
              p-[5px]
              justify-between items-center
            "
          >
            {/* Id */}
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
              #0132
            </p>

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
          <div>
            <img
              src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
              alt="Pokemon"
              className="
                object-cover
                w-full h-full
                p-[30px]
              "
            />
          </div>

          {/* Name */}
          <p
            className="
              inline-flex
              w-full
              px-2 py-1
              font-regular text-white text-xl
              bg-grass-shade
              rounded-b-[10px]
            "
          >
            Bulbasaur
          </p>
        </div>
      </div>
    </>
  );
}
