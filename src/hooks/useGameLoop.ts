import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { moveDown } from "../features/tetris/tetrisSlice";

export const useGameLoop = () => {
  const dispatch = useAppDispatch();
  const { gameStatus, dropTime } = useAppSelector((state) => state.tetris);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  useEffect(() => {
    const gameLoop = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (gameStatus === "playing") {
        accumulatedTimeRef.current += deltaTime;

        if (accumulatedTimeRef.current >= dropTime) {
          dispatch(moveDown());
          accumulatedTimeRef.current = 0;
        }
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dispatch, gameStatus, dropTime]);
};
