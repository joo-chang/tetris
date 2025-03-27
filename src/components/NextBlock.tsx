import { useAppSelector } from "../hooks/reduxHooks";
import { COLORS } from "../utils/tetrominos";

const NextBlock = () => {
  const { nextBlock } = useAppSelector((state) => state.tetris);

  return (
    <div className="bg-gray-900 p-2 border-2 border-gray-700 rounded">
      <h3 className="text-white text-center mb-2 font-bold">다음 블록</h3>

      <div className="grid grid-cols-4 w-24 h-24">
        {nextBlock.shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`next-${y}-${x}`}
              className={`w-6 h-6 border border-gray-800 ${
                cell === 1 ? COLORS[nextBlock.type] : "bg-transparent"
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NextBlock;
