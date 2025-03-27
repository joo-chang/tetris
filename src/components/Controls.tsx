import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  startGame,
  pauseGame,
  resumeGame,
} from "../features/tetris/tetrisSlice";

const Controls = () => {
  const dispatch = useAppDispatch();
  const { gameStatus } = useAppSelector((state) => state.tetris);

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handlePauseResume = () => {
    if (gameStatus === "playing") {
      dispatch(pauseGame());
    } else if (gameStatus === "paused") {
      dispatch(resumeGame());
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {(gameStatus === "idle" || gameStatus === "gameOver") && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleStartGame}
        >
          {gameStatus === "gameOver" ? "다시 시작" : "게임 시작"}
        </button>
      )}

      {(gameStatus === "playing" || gameStatus === "paused") && (
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePauseResume}
        >
          {gameStatus === "playing" ? "일시정지" : "계속하기"}
        </button>
      )}

      <div className="mt-4 bg-gray-900 p-3 border-2 border-gray-700 rounded text-white">
        <h3 className="font-bold mb-2">조작법</h3>
        <ul className="text-sm space-y-1">
          <li>← → : 좌우 이동</li>
          <li>↓ : 아래로 이동</li>
          <li>↑ : 시계방향 회전</li>
          <li>Z : 반시계방향 회전</li>
          <li>스페이스바 : 하드 드롭</li>
        </ul>
      </div>
    </div>
  );
};

export default Controls;
