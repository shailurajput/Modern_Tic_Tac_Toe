interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export const ScoreBoard = ({ scores }: ScoreBoardProps) => {
  return (
    <div className="flex gap-4 justify-center mb-6 flex-wrap">
      <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg min-w-[120px] text-center">
        <div className="text-sm font-semibold opacity-90">Player X</div>
        <div className="text-3xl font-bold">{scores.X}</div>
      </div>
      <div className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg min-w-[120px] text-center">
        <div className="text-sm font-semibold opacity-90">Draws</div>
        <div className="text-3xl font-bold">{scores.draws}</div>
      </div>
      <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg min-w-[120px] text-center">
        <div className="text-sm font-semibold opacity-90">Player O</div>
        <div className="text-3xl font-bold">{scores.O}</div>
      </div>
    </div>
  );
};
