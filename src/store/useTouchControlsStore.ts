import { create } from 'zustand';

interface TouchControlsState {
  isTouch: boolean;
  // Normalized analog movement input: [-1 to 1]
  moveX: number;
  moveZ: number;
  isRunning: boolean;
  isTyping: boolean;

  setIsTouch: (isTouch: boolean) => void;
  setMoveInput: (x: number, z: number, isRunning: boolean) => void;
  resetMoveInput: () => void;
  setIsTyping: (isTyping: boolean) => void;
}

export const useTouchControlsStore = create<TouchControlsState>((set) => ({
  isTouch: false,
  moveX: 0,
  moveZ: 0,
  isRunning: false,
  isTyping: false,

  setIsTouch: (isTouch) => set({ isTouch }),
  setMoveInput: (moveX, moveZ, isRunning) => set({ moveX, moveZ, isRunning }),
  resetMoveInput: () => set({ moveX: 0, moveZ: 0, isRunning: false }),
  setIsTyping: (isTyping) => set({ isTyping }),
}));
