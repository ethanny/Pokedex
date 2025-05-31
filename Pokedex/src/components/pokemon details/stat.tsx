import { getStatColor } from "../../utils/stat_colors";

interface StatProps {
  value: number;
  label: string;
  themeColor: any;
}

export default function Stat({ value, label, themeColor }: StatProps) {
  const statColor = getStatColor(label.toLocaleLowerCase());
  return (
    <div
      className="
        flex flex-row
        w-fit
        pr-[10px]
        bg-white/70
        rounded-full
        gap-[5px] justify-center items-center
      "
    >
      <p
        style={{
          backgroundColor: `var(${statColor})`,
        }}
        className="
          px-[10px] py-[5px]
          font-[400] text-white text-[14px]
          rounded-full
        "
      >
        {value}
      </p>

      <p
        style={{
          color: `var(${themeColor.shade})`,
        }}
        className="
          font-[400] text-white text-[14px]
        "
      >
        {label.toUpperCase()}
      </p>
    </div>
  );
}
