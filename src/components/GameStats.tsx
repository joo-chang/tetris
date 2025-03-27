import { useAppSelector } from "../hooks/reduxHooks";

const GameStats = () => {
  const { score, level, clearedLines } = useAppSelector(
    (state) => state.tetris
  );

  return (
    <div className="bg-gray-900 p-2 border-2 border-gray-700 rounded">
      <div className="mb-4">
        <h3 className="text-white font-bold mb-1">점수</h3>
        <p className="text-white text-xl">{score}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-white font-bold mb-1">레벨</h3>
        <p className="text-white text-xl">{level}</p>
      </div>

      <div>
        <h3 className="text-white font-bold mb-1">제거한 줄</h3>
        <p className="text-white text-xl">{clearedLines}</p>
      </div>
    </div>
  );
};

export default GameStats;
