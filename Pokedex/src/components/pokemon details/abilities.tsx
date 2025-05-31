import { EyeOff } from "lucide-react";

interface AbilitiesProps {
  abilities: any[];
  themeColor: any;
}

export default function Abilities({ abilities, themeColor }: AbilitiesProps) {
  return (
    <div
      className="
        flex flex-col
        w-full
        gap-1
      "
    >
      <p
        style={{
          color: `var(${themeColor.dark})`,
        }}
        className="
          font-[400] text-[14px] text-white text-start
        "
      >
        Abilities
      </p>

      <div
        className="
          flex flex-row
          w-full
          font-medium text-white text-[16px]
          gap-2
        "
      >
        {abilities.map((ability) => (
          <div
            style={{
              backgroundColor: `var(${themeColor.dark})`,
            }}
            className="
              flex flex-row
              w-full
              py-[5px] px-[10px]
              rounded-[5px]
              justify-between items-center skew-x-[-10deg]
            "
          >
            <p key={ability.ability.name}>
              {ability.ability.name.charAt(0).toUpperCase() +
                ability.ability.name.slice(1)}
            </p>
            {ability.is_hidden && (
              <EyeOff
                className="
                  w-4 h-4
                "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
