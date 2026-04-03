import { Player } from '../utils/gameLogic';

interface CellProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
}

export const Cell = ({ value, onClick, isWinning }: CellProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
        border-4 border-slate-700
        text-5xl sm:text-6xl font-bold
        transition-all duration-300
        transform hover:scale-105
        ${!value ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-default'}
        ${isWinning ? 'bg-green-200 animate-pulse' : 'bg-white'}
        ${value === 'X' ? 'text-blue-600' : 'text-red-600'}
        rounded-lg shadow-md hover:shadow-xl
        disabled:cursor-default
      `}
      disabled={!!value}
    >
      {value && (
        <span className="animate-[scale-in_0.3s_ease-out]">
          {value}
        </span>
      )}
    </button>
  );
};
