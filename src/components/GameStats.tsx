import { useAppSelector } from "../hooks/reduxHooks";

const GameStats = () => {
  const { score, level, clearedLines } = useAppSelector(
    (state) => state.tetris
  );

  return (
    <div className="bg-gray-900 p-4 border-2 border-gray-700 rounded-lg shadow-md w-full">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800 p-3 rounded-lg text-center">
          <h3 className="text-white font-bold mb-1 text-sm">점수</h3>
          <p className="text-white text-lg md:text-xl font-bold">{score}</p>
        </div>

        <div className="bg-gray-800 p-3 rounded-lg text-center">
          <h3 className="text-white font-bold mb-1 text-sm">레벨</h3>
          <p className="text-white text-lg md:text-xl font-bold">{level}</p>
        </div>

        <div className="bg-gray-800 p-3 rounded-lg text-center">
          <h3 className="text-white font-bold mb-1 text-sm">라인</h3>
          <p className="text-white text-lg md:text-xl font-bold">
            {clearedLines}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
