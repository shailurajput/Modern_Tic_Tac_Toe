import { Player } from '../utils/gameLogic';

interface WinnerModalProps {
  winner: Player;
  isDraw: boolean;
  onRestart: () => void;
}

export const WinnerModal = ({ winner, isDraw, onRestart }: WinnerModalProps) => {
  if (!winner && !isDraw) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fade-in_0.3s_ease-out]">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-[slide-up_0.4s_ease-out]">
        <div className="text-center">
          {isDraw ? (
            <>
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">It's a Draw!</h2>
              <p className="text-gray-600 mb-6">Well played both!</p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold mb-2">
                <span className={winner === 'X' ? 'text-blue-600' : 'text-red-600'}>
                  Player {winner}
                </span>{' '}
                <span className="text-gray-800">Wins!</span>
              </h2>
              <p className="text-gray-600 mb-6">Congratulations!</p>
            </>
          )}
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
