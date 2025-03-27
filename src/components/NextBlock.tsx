import { useAppSelector } from "../hooks/reduxHooks";
import { COLORS, TetrominoType, TETROMINOS } from "../utils/tetrominos";

const NextBlock = () => {
  const { nextBlock } = useAppSelector((state) => state.tetris);

  // 특정 테트로미노에 대한 중앙 정렬 및 패딩 설정
  const getBlockStyles = (type: TetrominoType) => {
    switch (type) {
      case "I":
        return "grid-cols-4 w-28 h-28 p-2";
      case "O":
        return "grid-cols-2 w-20 h-20 p-4";
      default:
        return "grid-cols-3 w-24 h-24 p-2";
    }
  };

  return (
    <div className="bg-gray-900 p-4 border-2 border-gray-700 rounded">
      <h3 className="text-white text-center mb-3 font-bold">다음 블록</h3>

      <div className="flex items-center justify-center">
        <div className={`grid ${getBlockStyles(nextBlock.type)} gap-0`}>
          {nextBlock.shape.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`next-${y}-${x}`}
                className={`w-6 h-6 border border-gray-800 ${
                  cell !== 0 ? COLORS[nextBlock.type] : "bg-transparent"
                }`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NextBlock;
