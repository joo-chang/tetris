import Board from "./Board";
import NextBlock from "./NextBlock";
import GameStats from "./GameStats";
import Controls from "./Controls";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { useGameLoop } from "../hooks/useGameLoop";
import { useAppSelector } from "../hooks/reduxHooks";

const Tetris = () => {
  const { gameStatus } = useAppSelector((state) => state.tetris);

  // 키보드 입력 처리를 위한 훅 사용
  useKeyboardControls();

  // 게임 루프(블록 자동 하강) 처리를 위한 훅 사용
  useGameLoop();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">테트리스</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="order-2 md:order-1 flex-shrink-0">
          <Board />
        </div>

        <div className="flex flex-col gap-4 order-1 md:order-2 w-64 flex-shrink-0">
          <NextBlock />
          <GameStats />
          <Controls />
        </div>
      </div>

      {gameStatus === "idle" && (
        <div className="mt-6 text-white text-center">
          <p className="mb-2">게임 시작 버튼을 눌러 게임을 시작하세요.</p>
        </div>
      )}
    </div>
  );
};

export default Tetris;
