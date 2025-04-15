import {
  BOARD_WIDTH,
  Tetromino,
  TetrominoShape,
  TetrominoType,
} from "../types/tetris";
import { TETROMINOS } from "../../../src/utils/tetrominos";

// 2차원 배열을 시계방향으로 90도 회전시키는 함수
export const rotateMatrix = (
  matrix: TetrominoShape,
  clockwise: boolean
): TetrominoShape => {
  const N = matrix.length;
  const rotated: TetrominoShape = Array(N)
    .fill(0)
    .map(() => Array(N).fill(0));

  if (clockwise) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        rotated[j][N - 1 - i] = matrix[i][j];
      }
    }
  } else {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        rotated[N - 1 - j][i] = matrix[i][j];
      }
    }
  }

  return rotated;
};

// 테트로미노를 회전시키는 함수
export const rotateTetromino = (shape: TetrominoShape): TetrominoShape => {
  // O 블록은 회전하지 않음
  if (shape.length === 2) return shape;

  return rotateMatrix(shape, true);
};

// 테트로미노를 왼쪽으로 90도 회전시키는 함수
export const rotateTetrominoLeft = (shape: TetrominoShape): TetrominoShape => {
  return rotateMatrix(shape, false);
};

// 랜덤 테트리스 블록 생성
export const randomTetromino = (): Tetromino => {
  const types = Object.keys(TETROMINOS) as TetrominoType[];
  const randomType = types[Math.floor(Math.random() * types.length)];

  return {
    type: randomType,
    shape: TETROMINOS[randomType].shape,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    color: TETROMINOS[randomType].color,
  };
};
