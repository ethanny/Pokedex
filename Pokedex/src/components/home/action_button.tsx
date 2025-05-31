interface ActionButtonProps {
  label: string;
  loadingLabel?: string;
  onClick: () => void;
  isLoading: boolean;
  width?: string;
}

export default function ActionButton({
  label,
  loadingLabel = "Finding Pokemons",
  onClick,
  isLoading = false,
  width = "250px",
}: ActionButtonProps) {
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
        className="
          z-0
          h-full w-full
          bg-[#961818]
          rounded-lg
          absolute
        "
      />

      {/* Action button */}
      <button
        onClick={onClick}
        disabled={isLoading}
        style={{ width }}
        className="
          px-2 py-2
          text-[18px] text-white
          bg-[#CE2223]
          rounded-lg border-3 border-solid border-[#961818]
          cursor-pointer transition-all
          relative disabled:opacity-50 disabled:cursor-not-allowed transform translate-y-[-5px] hover:translate-y-[0px] duration-300
        "
      >
        {isLoading ? loadingLabel : label}
      </button>
    </div>
  );
}
