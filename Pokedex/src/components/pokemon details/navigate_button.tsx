import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigateButtonProps {
  text: string;
  themeColor: any;
  onClick?: () => void;
  iconPosition: "left" | "right";
}

export default function NavigateButton({
  text,
  themeColor,
  onClick,
  iconPosition = "left",
}: NavigateButtonProps) {
  return (
    <button
      style={{ backgroundColor: `var(${themeColor.dark})` }}
      onClick={onClick}
      className={`
        flex
        w-[80px] h-full
        py-[10px] px-[5px]
        transition-all cursor-pointer
        hover:opacity-50 duration-300 ease-in-out items-center gap-
        ${iconPosition === "left" ? "rounded-l-full" : "rounded-r-full"}
      `}
    >
      {iconPosition === "left" && <ChevronLeft size={22} />}
      <h1
        className={`
          ${iconPosition === "left" ? "pr-[10px]" : "pl-[10px]"}
        `}
      >
        {text}
      </h1>
      {iconPosition === "right" && <ChevronRight size={22} />}
    </button>
  );
}
