export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}

export interface SnakeState {
  snake: Point[];
  direction: Direction;
  nextDirection: Direction;
  food: Point;
  score: number;
  isGameOver: boolean;
  isWon: boolean;
  gridSize: number;
}

export function createInitialSnakeState(gridSize = 20): SnakeState {
  const mid = Math.floor(gridSize / 2);
  const initialSnake: Point[] = [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];

  return {
    snake: initialSnake,
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    food: spawnFood(initialSnake, gridSize),
    score: 0,
    isGameOver: false,
    isWon: false,
    gridSize,
  };
}

export function isValidDirectionChange(current: Direction, next: Direction): boolean {
  if (current === 'UP' && next === 'DOWN') return false;
  if (current === 'DOWN' && next === 'UP') return false;
  if (current === 'LEFT' && next === 'RIGHT') return false;
  if (current === 'RIGHT' && next === 'LEFT') return false;
  return true;
}

export function spawnFood(snake: Point[], gridSize: number): Point {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  const available: Point[] = [];

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!occupied.has(`${x},${y}`)) {
        available.push({ x, y });
      }
    }
  }

  if (available.length === 0) {
    return { x: -1, y: -1 }; // Board is completely filled!
  }

  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

export function tickSnake(state: SnakeState): SnakeState {
  if (state.isGameOver || state.isWon) return state;

  const dir = state.nextDirection;
  const head = state.snake[0];
  let nextHead: Point = { ...head };

  if (dir === 'UP') nextHead.y -= 1;
  else if (dir === 'DOWN') nextHead.y += 1;
  else if (dir === 'LEFT') nextHead.x -= 1;
  else if (dir === 'RIGHT') nextHead.x += 1;

  // Wall collision check
  if (
    nextHead.x < 0 ||
    nextHead.x >= state.gridSize ||
    nextHead.y < 0 ||
    nextHead.y >= state.gridSize
  ) {
    return { ...state, direction: dir, isGameOver: true };
  }

  // Self collision check (ignoring the tail segment which moves unless eating)
  const isEating = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const bodyToCheck = isEating ? state.snake : state.snake.slice(0, -1);

  if (bodyToCheck.some((p) => p.x === nextHead.x && p.y === nextHead.y)) {
    return { ...state, direction: dir, isGameOver: true };
  }

  const newSnake = [nextHead, ...state.snake];

  if (isEating) {
    const nextFood = spawnFood(newSnake, state.gridSize);
    const isWon = nextFood.x === -1;

    return {
      ...state,
      snake: newSnake,
      direction: dir,
      food: nextFood,
      score: state.score + 10,
      isWon,
    };
  }

  newSnake.pop();

  return {
    ...state,
    snake: newSnake,
    direction: dir,
  };
}
