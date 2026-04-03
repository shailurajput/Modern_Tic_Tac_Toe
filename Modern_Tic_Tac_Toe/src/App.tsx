import { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { WinnerModal } from './components/WinnerModal';
import { useSound } from './hooks/useSound';
import {
  createEmptyBoard,
  checkWinner,
  checkDraw,
  Player,
  Board as BoardType,
} from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningIndices, setWinningIndices] = useState<number[]>([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const { playClickSound, playWinSound, playDrawSound, toggleMute, isMuted } = useSound();

  useEffect(() => {
    const winningLine = checkWinner(board);
    if (winningLine) {
      setWinner(winningLine.player);
      setWinningIndices(winningLine.indices);
      setScores((prev) => ({
        ...prev,
        [winningLine.player as 'X' | 'O']: prev[winningLine.player as 'X' | 'O'] + 1,
      }));
      playWinSound();
    } else if (checkDraw(board)) {
      setIsDraw(true);
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      playDrawSound();
    }
  }, [board, playWinSound, playDrawSound]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    playClickSound();
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setWinningIndices([]);
  };

  const handleReset = () => {
    handleRestart();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2 drop-shadow-lg">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 text-lg">Challenge your friend!</p>
        </div>

        <ScoreBoard scores={scores} />

        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <span className="text-gray-600 font-semibold">Current Player: </span>
            <span
              className={`text-2xl font-bold ${
                currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'
              }`}
            >
              {currentPlayer}
            </span>
          </div>
          <button
            onClick={toggleMute}
            className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-600" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <Board
            board={board}
            onCellClick={handleCellClick}
            winningIndices={winningIndices}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Game
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Reset Scores
          </button>
        </div>
      </div>

      <WinnerModal winner={winner} isDraw={isDraw} onRestart={handleRestart} />
    </div>
  );
}

export default App;
