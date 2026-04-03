export type Player = 'X' | 'O' | null;
export type Board = Player[];

export interface WinningLine {
  indices: number[];
  player: Player;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (board: Board): WinningLine | null => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        indices: combination,
        player: board[a],
      };
    }
  }
  return null;
};

export const checkDraw = (board: Board): boolean => {
  return board.every((cell) => cell !== null) && !checkWinner(board);
};

export const createEmptyBoard = (): Board => {
  return Array(9).fill(null);
};
