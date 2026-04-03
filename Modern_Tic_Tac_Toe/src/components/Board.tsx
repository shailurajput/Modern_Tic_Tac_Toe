import { Board as BoardType } from '../utils/gameLogic';
import { Cell } from './Cell';

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  winningIndices: number[];
}

export const Board = ({ board, onCellClick, winningIndices }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-slate-800 p-3 rounded-xl shadow-2xl">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinning={winningIndices.includes(index)}
        />
      ))}
    </div>
  );
};
