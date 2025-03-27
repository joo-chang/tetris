export type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type Position = {
  x: number;
  y: number;
};

export type TetrisBlock = {
  type: TetrominoType;
  shape: number[][];
  position: Position;
  rotation: number;
};

export type Cell = {
  filled: boolean;
  color: string;
  type?: TetrominoType;
};

export const COLORS = {
  I: "bg-cyan-500",
  J: "bg-blue-600",
  L: "bg-orange-500",
  O: "bg-yellow-400",
  S: "bg-green-500",
  T: "bg-purple-500",
  Z: "bg-red-500",
  ghost: "bg-gray-500/30 border border-gray-300/30",
  empty: "bg-transparent",
};

export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: COLORS.I,
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: COLORS.J,
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: COLORS.L,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: COLORS.O,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: COLORS.S,
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: COLORS.T,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: COLORS.Z,
  },
};

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// 블록 회전 함수
export const rotate = (matrix: number[][], clockwise = true): number[][] => {
  const N = matrix.length;
  const result = Array.from({ length: N }, () => Array(N).fill(0));

  if (clockwise) {
    // 시계 방향으로 90도 회전
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        result[j][N - 1 - i] = matrix[i][j];
      }
    }
  } else {
    // 반시계 방향으로 90도 회전
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        result[N - 1 - j][i] = matrix[i][j];
      }
    }
  }

  return result;
};

// 무작위 테트로미노 생성 함수
export const randomTetromino = (): TetrisBlock => {
  const types = Object.keys(TETROMINOS) as TetrominoType[];
  const randomType = types[Math.floor(Math.random() * types.length)];

  return {
    type: randomType,
    shape: TETROMINOS[randomType].shape,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0,
  };
};

// 초기 보드 생성 함수
export const createEmptyBoard = (): Cell[][] => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({
      filled: false,
      color: COLORS.empty,
    }))
  );
};

// 충돌 검사 함수
export const checkCollision = (
  tetromino: TetrisBlock,
  board: Cell[][],
  offsetX = 0,
  offsetY = 0
): boolean => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      // 테트로미노의 빈 공간은 무시
      if (!tetromino.shape[y][x]) continue;

      // 보드 위치 계산
      const boardX = tetromino.position.x + x + offsetX;
      const boardY = tetromino.position.y + y + offsetY;

      // 보드 범위 체크
      if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
        return true;
      }

      // 이미 채워진 칸인지 체크 (음수 y는 보드 위에 있으므로 무시)
      if (boardY >= 0 && board[boardY][boardX].filled) {
        return true;
      }
    }
  }

  return false;
};

// 테트로미노 위치에 따라 고스트 위치 계산
export const calculateGhostPosition = (
  tetromino: TetrisBlock,
  board: Cell[][]
): number => {
  let ghostY = 0;

  // 보드의 끝까지 또는 다른 블록에 닿을 때까지 아래로 이동
  while (
    !checkCollision(
      {
        ...tetromino,
        position: {
          ...tetromino.position,
          y: tetromino.position.y + ghostY + 1,
        },
      },
      board
    )
  ) {
    ghostY++;
  }

  return ghostY;
};
