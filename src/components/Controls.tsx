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
    <div className="flex flex-col ">
      {(gameStatus === "idle" || gameStatus === "gameOver") && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleStartGame}
        >
          {gameStatus === "gameOver" ? "다시 시작" : "게임 시작"}
        </button>
      )}

      {(gameStatus === "playing" || gameStatus === "paused") && (
        <button
          className={`${
            gameStatus === "playing"
              ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
              : "bg-green-500 hover:bg-green-600 focus:ring-green-500"
          } text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2`}
          onClick={handlePauseResume}
        >
          {gameStatus === "playing" ? "일시정지" : "계속하기"}
        </button>
      )}

      <div className="mt-4 bg-gray-900 p-4 border-2 border-gray-700 rounded-lg shadow-md text-white">
        <h3 className="font-bold text-lg mb-3">조작법</h3>
        <ul className="text-sm space-y-2">
          <li className="flex items-center">
            <span className="bg-gray-700 px-2 py-1 rounded mr-2 text-xs">
              ←→
            </span>
            <span>좌우 이동</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-700 px-2 py-1 rounded mr-2 text-xs">
              ↓
            </span>
            <span>아래로 이동</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-700 px-2 py-1 rounded mr-2 text-xs">
              ↑
            </span>
            <span>시계방향 회전</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-700 px-2 py-1 rounded mr-2 text-xs">
              Z
            </span>
            <span>반시계방향 회전</span>
          </li>
          <li className="flex items-center">
            <span className="bg-gray-700 px-2 py-1 rounded mr-2 text-xs whitespace-nowrap">
              Space
            </span>
            <span>하드 드롭</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Controls;
