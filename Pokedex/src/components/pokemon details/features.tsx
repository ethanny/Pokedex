import type { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  label: string;
  value: string;
  icon: LucideIcon;
  themeColor: any;
}

export default function FeatureItem({
  label,
  value,
  icon: Icon,
  themeColor,
}: FeatureItemProps) {
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
        {label}
      </p>

      <div
        style={{
          border: `2px solid var(${themeColor.dark})`,
        }}
        className="
          flex flex-row
          p-[5px]
          font-medium text-[14px]
          bg-white/70
          rounded-[10px]
          gap-2 items-center
        "
      >
        <Icon style={{ color: `var(${themeColor.dark})` }} size={22} />
        <p style={{ color: `var(${themeColor.dark})` }}>{value}</p>
      </div>
    </div>
  );
}
