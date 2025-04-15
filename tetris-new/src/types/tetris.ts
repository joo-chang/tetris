// 블록의 종류를 나타내는 타입
export type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

// 블록의 모양을 나타내는 2차원 배열
export type TetrominoShape = number[][];

// 블록의 위치를 나타내는 타입
export interface Position {
  x: number;
  y: number;
}

// 블록의 상태를 나타내는 타입
export interface Tetromino {
  type: TetrominoType;
  shape: TetrominoShape;
  position: Position;
  color: string;
}

// 각 블록의 기본 모양 정의
export const TETROMINO_SHAPES: Record<TetrominoType, TetrominoShape> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

// 각 블록의 색상 정의
export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: "#00f0f0", // 하늘색
  J: "#0000f0", // 파란색
  L: "#f0a000", // 주황색
  O: "#f0f000", // 노란색
  S: "#00f000", // 초록색
  T: "#a000f0", // 보라색
  Z: "#f00000", // 빨간색
};

// 보드의 크기 정의
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

