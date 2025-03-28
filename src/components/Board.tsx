import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  Cell,
  COLORS,
  TetrisBlock,
  calculateGhostPosition,
  createEmptyBoard,
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from "../utils/tetrominos";

const Board = () => {
  const { board, currentBlock, gameStatus } = useAppSelector(
    (state) => state.tetris
  );
  const [renderedBoard, setRenderedBoard] = useState<Cell[][]>(
    createEmptyBoard()
  );

  // 현재 블록과 고스트 블록을 포함한 렌더링용 보드 생성
  useEffect(() => {
    updateRenderedBoard();
  }, [board, currentBlock, gameStatus]);

  const updateRenderedBoard = () => {
    // 보드 복사
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (gameStatus === "playing" || gameStatus === "paused") {
      // 고스트 블록 위치 계산
      const ghostY = calculateGhostPosition(currentBlock, board);

      // 고스트 블록 그리기
      if (ghostY > 0) {
        drawBlockOnBoard(
          {
            ...currentBlock,
            position: {
              ...currentBlock.position,
              y: currentBlock.position.y + ghostY,
            },
          },
          newBoard,
          COLORS.ghost
        );
      }

      // 현재 블록 그리기
      drawBlockOnBoard(currentBlock, newBoard);
    }

    setRenderedBoard(newBoard);
  };

  // 보드에 블록 그리기 함수
  const drawBlockOnBoard = (
    block: TetrisBlock,
    boardCopy: Cell[][],
    overrideColor?: string
  ) => {
    const { shape, position, type } = block;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;

          // 보드 범위 내이고 음수 Y가 아닌 경우에만 그리기
          if (
            boardY >= 0 &&
            boardY < boardCopy.length &&
            boardX >= 0 &&
            boardX < boardCopy[0].length
          ) {
            boardCopy[boardY][boardX] = {
              filled: true,
              color: overrideColor || COLORS[type],
              type,
            };
          }
        }
      }
    }

    return boardCopy;
  };

  // 보드와 셀 크기 고정
  const boardWidth = 300; // px
  const boardHeight = 610; // px
  const cellWidth = boardWidth / BOARD_WIDTH;
  const cellHeight = boardHeight / BOARD_HEIGHT;

  return (
    <div
      className="border-2 border-gray-700 bg-gray-900 relative"
      style={{
        width: `${boardWidth}px`,
        height: `${boardHeight}px`,
      }}
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
        }}
      >
        {renderedBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`border border-gray-800 ${
                cell.filled ? cell.color : "bg-gray-800/50"
              }`}
              style={{
                width: `${cellWidth}px`,
                height: `${cellHeight - 1}px`,
              }}
            />
          ))
        )}
      </div>

      {gameStatus === "paused" && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-gray-800/90 px-8 py-10 rounded-lg shadow-lg text-center">
            <div className="text-white text-3xl md:text-4xl font-bold mb-4">
              일시정지
            </div>
            <div className="text-gray-300 text-sm md:text-base">
              계속하려면 일시정지 버튼을 클릭하세요
            </div>
          </div>
        </div>
      )}

      {gameStatus === "gameOver" && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
          <div className="bg-gray-800/90 px-8 py-10 rounded-lg shadow-lg text-center">
            <div className="text-white text-3xl md:text-4xl font-bold mb-4">
              게임 오버
            </div>
            <div className="text-gray-300 text-sm md:text-base">
              다시 시작하려면 버튼을 클릭하세요
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
