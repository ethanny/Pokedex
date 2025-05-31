interface PokemonTypesProps {
  types: any[];
}

export default function PokemonTypes({ types }: PokemonTypesProps) {
  return (
    <>
      {types.map((typeInfo, index) => (
        <div
          key={index}
          style={{
            backgroundColor: `var(--color-${typeInfo.type.name}-shade)`,
          }}
          className={`
            inline-flex
            px-1 py-1
            rounded-[10px]
            items-center justify-center
          `}
        >
          <div
            className="
              flex flex-row
              px-[5px] pr-[8px]
              font-[400] text-white text-[16px]
              items-center justify-center gap-1
            "
          >
            <img
              src={`/src/assets/images/${typeInfo.type.name}.svg`}
              alt={typeInfo.type.name}
              aria-label={typeInfo.type.name}
              className="
                object-cover
                h-[14px]
                scale-150
              "
            />
            <p>
              {typeInfo.type.name.charAt(0).toUpperCase() +
                typeInfo.type.name.slice(1)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
