import { createSlice } from "@reduxjs/toolkit";
import {
  TetrisBlock,
  Cell,
  randomTetromino,
  createEmptyBoard,
  checkCollision,
  rotate,
  TETROMINOS,
  COLORS,
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from "../../utils/tetrominos";

export type GameStatus = "idle" | "playing" | "paused" | "gameOver";

interface TetrisState {
  board: Cell[][];
  currentBlock: TetrisBlock;
  nextBlock: TetrisBlock;
  gameStatus: GameStatus;
  score: number;
  level: number;
  clearedLines: number;
  dropTime: number;
}

const initialState: TetrisState = {
  board: createEmptyBoard(),
  currentBlock: randomTetromino(),
  nextBlock: randomTetromino(),
  gameStatus: "idle",
  score: 0,
  level: 1,
  clearedLines: 0,
  dropTime: 1000, // 초기 드롭 시간 (ms)
};

const tetrisSlice = createSlice({
  name: "tetris",
  initialState,
  reducers: {
    moveLeft: (state) => {
      // 왼쪽으로 이동 (충돌이 없는 경우)
      if (!checkCollision(state.currentBlock, state.board, -1, 0)) {
        state.currentBlock.position.x -= 1;
      }
    },
    moveRight: (state) => {
      // 오른쪽으로 이동 (충돌이 없는 경우)
      if (!checkCollision(state.currentBlock, state.board, 1, 0)) {
        state.currentBlock.position.x += 1;
      }
    },
    moveDown: (state) => {
      // 아래로 이동 (충돌이 없는 경우)
      if (!checkCollision(state.currentBlock, state.board, 0, 1)) {
        state.currentBlock.position.y += 1;
      } else {
        // 충돌이 있으면 블록을 보드에 고정하고 다음 블록으로 전환
        lockBlock(state);
      }
    },
    hardDrop: (state) => {
      // 블록을 가능한 가장 아래로 즉시 이동
      while (!checkCollision(state.currentBlock, state.board, 0, 1)) {
        state.currentBlock.position.y += 1;
        // 하드 드롭에 의한 점수 추가 (1칸당 2점)
        state.score += 2;
      }
      lockBlock(state);
    },
    rotateBlock: (state) => {
      const rotated = {
        ...state.currentBlock,
        shape: rotate(state.currentBlock.shape),
        rotation: (state.currentBlock.rotation + 1) % 4,
      };

      // 회전 후 충돌이 없는지 확인
      if (!checkCollision(rotated, state.board)) {
        state.currentBlock = rotated;
      } else {
        // 벽 킥 시도 (SRS 시스템 간소화)
        // 오른쪽 벽에 닿으면 왼쪽으로, 왼쪽 벽에 닿으면 오른쪽으로 이동 시도
        const offsetsToTry = [
          { x: -1, y: 0 }, // 왼쪽
          { x: 1, y: 0 }, // 오른쪽
          { x: 0, y: -1 }, // 위
          { x: -2, y: 0 }, // 왼쪽 2칸
          { x: 2, y: 0 }, // 오른쪽 2칸
        ];

        for (const offset of offsetsToTry) {
          const kickedRotated = {
            ...rotated,
            position: {
              x: rotated.position.x + offset.x,
              y: rotated.position.y + offset.y,
            },
          };

          if (!checkCollision(kickedRotated, state.board)) {
            state.currentBlock = kickedRotated;
            break;
          }
        }
      }
    },
    rotateBlockCounterClockwise: (state) => {
      const rotated = {
        ...state.currentBlock,
        shape: rotate(state.currentBlock.shape, false),
        rotation: (state.currentBlock.rotation + 3) % 4, // -1 + 4 = 3
      };

      // 회전 후 충돌이 없는지 확인
      if (!checkCollision(rotated, state.board)) {
        state.currentBlock = rotated;
      } else {
        // 벽 킥 시도 (간소화된 SRS)
        const offsetsToTry = [
          { x: -1, y: 0 }, // 왼쪽
          { x: 1, y: 0 }, // 오른쪽
          { x: 0, y: -1 }, // 위
          { x: -2, y: 0 }, // 왼쪽 2칸
          { x: 2, y: 0 }, // 오른쪽 2칸
        ];

        for (const offset of offsetsToTry) {
          const kickedRotated = {
            ...rotated,
            position: {
              x: rotated.position.x + offset.x,
              y: rotated.position.y + offset.y,
            },
          };

          if (!checkCollision(kickedRotated, state.board)) {
            state.currentBlock = kickedRotated;
            break;
          }
        }
      }
    },
    startGame: (state) => {
      state.board = createEmptyBoard();
      state.currentBlock = randomTetromino();
      state.nextBlock = randomTetromino();
      state.gameStatus = "playing";
      state.score = 0;
      state.level = 1;
      state.clearedLines = 0;
      state.dropTime = 1000;
    },
    pauseGame: (state) => {
      if (state.gameStatus === "playing") {
        state.gameStatus = "paused";
      }
    },
    resumeGame: (state) => {
      if (state.gameStatus === "paused") {
        state.gameStatus = "playing";
      }
    },
    gameOver: (state) => {
      state.gameStatus = "gameOver";
    },
  },
});

// 블록을 보드에 고정하고 줄 삭제 확인 및 다음 블록 설정
const lockBlock = (state: TetrisState) => {
  // 현재 블록을 보드에 고정
  const { shape, position, type } = state.currentBlock;
  const color = TETROMINOS[type].color;

  // 블록 모양을 순회하며 보드에 블록 위치 표시
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const boardY = position.y + y;
        const boardX = position.x + x;

        // 보드 범위 내인지 확인
        if (
          boardY >= 0 &&
          boardY < BOARD_HEIGHT &&
          boardX >= 0 &&
          boardX < BOARD_WIDTH
        ) {
          state.board[boardY][boardX] = { filled: true, color, type };
        }
      }
    }
  }

  // 완성된 줄 찾기
  const newBoard = state.board.filter(
    (row) => !row.every((cell) => cell.filled)
  );
  const clearedLinesCount = state.board.length - newBoard.length;

  // 지워진 줄 수만큼 새 빈 줄 추가
  if (clearedLinesCount > 0) {
    const emptyRows = Array.from({ length: clearedLinesCount }, () =>
      Array.from({ length: BOARD_WIDTH }, () => ({
        filled: false,
        color: COLORS.empty,
      }))
    );
    newBoard.unshift(...emptyRows);

    // 점수 계산 (라인 수에 따라 점수 차등 지급)
    const linePoints = [0, 100, 300, 500, 800]; // 0, 1, 2, 3, 4줄 제거 시 점수
    state.score += linePoints[clearedLinesCount] * state.level;
    state.clearedLines += clearedLinesCount;

    // 레벨 업 (10줄 제거마다 레벨 업)
    const newLevel = Math.floor(state.clearedLines / 10) + 1;
    if (newLevel > state.level) {
      state.level = newLevel;
      // 레벨에 따라 드롭 시간 감소 (최소 100ms)
      state.dropTime = Math.max(100, 1000 - (state.level - 1) * 100);
    }
  }

  state.board = newBoard;

  // 다음 블록으로 전환
  state.currentBlock = state.nextBlock;
  state.nextBlock = randomTetromino();

  // 게임 오버 체크 (새 블록이 초기 위치에서 충돌하는지)
  if (checkCollision(state.currentBlock, state.board)) {
    state.gameStatus = "gameOver";
  }
};

export const {
  moveLeft,
  moveRight,
  moveDown,
  hardDrop,
  rotateBlock,
  rotateBlockCounterClockwise,
  startGame,
  pauseGame,
  resumeGame,
  gameOver,
} = tetrisSlice.actions;

export default tetrisSlice.reducer;
