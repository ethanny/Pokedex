interface SortButtonProps {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  isLeft: boolean;
  isSelected: boolean;
}

export default function SortButton({
  label,
  onClick,
  isLoading = false,
  isLeft,
  isSelected,
}: SortButtonProps) {

  return (
    <div
      className="
        inline-block
        w-fit
        relative
      "
    >
      {/* Background shape */}
      <div
        className={`
          z-0
          h-full w-full
          bg-[#961818]
          absolute
          ${isLeft ? "rounded-l-lg" : "rounded-r-lg"}
        `}
      />

      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          w-[80px]
          px-1 py-1
          text-[18px]
          border-3 border-solid border-[#961818]
          cursor-pointer transition-all
          relative duration-300 transform hover:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed
          ${isSelected ? "text-white" : "text-[#961818]"}
          ${isSelected ? "bg-[#CE2223]" : "bg-white"}
          ${isLeft ? "rounded-l-lg" : "rounded-r-lg"}
          ${isSelected ? "translate-y-[0px]" : "translate-y-[-5px]"}
        `}
      >
        {label}
      </button>
    </div>
  );
}
