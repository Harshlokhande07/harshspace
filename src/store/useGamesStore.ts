import { create } from 'zustand';

export type ActiveMiniGame = 'menu' | 'snake' | 'target-shooting';

interface GamesState {
  activeGame: ActiveMiniGame;
  isPaused: boolean;
  snakeHighScore: number;
  targetHighScore: number;

  setActiveGame: (game: ActiveMiniGame) => void;
  setIsPaused: (paused: boolean) => void;
  updateSnakeHighScore: (score: number) => void;
  updateTargetHighScore: (score: number) => void;
}

export const useGamesStore = create<GamesState>((set) => ({
  activeGame: 'menu',
  isPaused: false,
  snakeHighScore: 0,
  targetHighScore: 0,

  setActiveGame: (activeGame) => set({ activeGame, isPaused: false }),
  setIsPaused: (isPaused) => set({ isPaused }),
  updateSnakeHighScore: (score) =>
    set((state) => ({ snakeHighScore: Math.max(state.snakeHighScore, score) })),
  updateTargetHighScore: (score) =>
    set((state) => ({ targetHighScore: Math.max(state.targetHighScore, score) })),
}));
