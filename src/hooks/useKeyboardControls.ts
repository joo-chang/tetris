import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  moveLeft,
  moveRight,
  moveDown,
  hardDrop,
  rotateBlock,
  rotateBlockCounterClockwise,
} from "../features/tetris/tetrisSlice";

export const useKeyboardControls = () => {
  const dispatch = useAppDispatch();
  const { gameStatus } = useAppSelector((state) => state.tetris);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameStatus !== "playing") return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          dispatch(moveLeft());
          break;
        case "ArrowRight":
          event.preventDefault();
          dispatch(moveRight());
          break;
        case "ArrowDown":
          event.preventDefault();
          dispatch(moveDown());
          break;
        case "ArrowUp":
          event.preventDefault();
          dispatch(rotateBlock());
          break;
        case "z":
        case "Z":
          event.preventDefault();
          dispatch(rotateBlockCounterClockwise());
          break;
        case " ": // 스페이스바
          event.preventDefault();
          dispatch(hardDrop());
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, gameStatus]);
};
