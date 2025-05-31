import { ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSortOrder } from "../../services/pokedex_slice";
import type { RootState } from "../../services/pokedex_store";

interface SortButtonProps {
  isLoading: boolean;
}

export default function SortingOrderButton({ isLoading }: SortButtonProps) {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: RootState) => state.pokedex.sortOrder);

  return (
    <button
      onClick={() => dispatch(toggleSortOrder())}
      disabled={isLoading}
      className={`
        mr-4 px-2 py-2
        text-[18px]
        bg-white
        border-3 border-solid border-[#961818] rounded-full
        cursor-pointer transition-all
        relative duration-300 transform hover:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed
        ${sortOrder === "descending" ? "rotate-180" : ""}
      `}
    >
      <ArrowUpNarrowWide color="#961818" />
    </button>
  );
}
