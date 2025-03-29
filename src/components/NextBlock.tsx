import { useAppSelector } from "../hooks/reduxHooks";
import { COLORS, TetrominoType } from "../utils/tetrominos";

const NextBlock = () => {
  const { nextBlock } = useAppSelector((state) => state.tetris);

  // 고정된 셀 크기
  const cellSize = 22; // px

  // 블록에 따른 오프셋 계산 (중앙 정렬을 위해)
  const getBlockOffset = (type: TetrominoType) => {
    switch (type) {
      case "I":
        return { x: cellSize, y: cellSize * 1.5 };
      case "O":
        return { x: cellSize * 1.5, y: cellSize * 1.5 };
      case "J":
      case "L":
        return { x: cellSize * 1.5, y: cellSize };
      case "S":
      case "Z":
        return { x: cellSize * 1.5, y: cellSize };
      case "T":
        return { x: cellSize * 1.5, y: cellSize };
      default:
        return { x: cellSize, y: cellSize };
    }
  };

  // 미리보기 박스 크기 (4x4 셀 크기)
  const boxSize = cellSize * 4;
  const offset = getBlockOffset(nextBlock.type);

  // 중앙에 블록 배치를 위한 행/열 계산
  const getActualBlocks = () => {
    const shape = nextBlock.shape;
    const blocks = [];

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          blocks.push({ x, y });
        }
      }
    }

    return blocks;
  };

  return (
    <div className="bg-gray-900 p-4 border-2 border-gray-700 rounded w-full">
      <h3 className="text-white text-center mb-3 font-bold">다음 블록</h3>

      <div
        className="flex items-center justify-center"
        style={{ height: "100px" }}
      >
        <div
          className="relative bg-gray-800/50 rounded"
          style={{
            width: `${boxSize}px`,
            height: `${boxSize}px`,
          }}
        >
          {getActualBlocks().map((block, index) => (
            <div
              key={index}
              className={`absolute border border-gray-800 ${
                COLORS[nextBlock.type]
              }`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                left: `${offset.x + block.x * cellSize - 20}px`,
                top: `${offset.y + block.y * cellSize}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextBlock;
