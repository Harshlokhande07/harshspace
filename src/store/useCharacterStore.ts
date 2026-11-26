import { create } from 'zustand';

export type CharacterAnimationState = 'idle' | 'walk' | 'run' | string;

export type CharacterActionState =
  | 'free'
  | 'approaching'
  | 'sitting-down'
  | 'seated'
  | 'standing-up'
  | 'lying-down'
  | 'lying'
  | 'getting-up'
  | 'drinking';

interface CharacterStore {
  animState: CharacterAnimationState;
  actionState: CharacterActionState;
  activePoseId: 'sit-chair' | 'lie-bed' | 'drink-coffee' | null;
  fadeDuration: number;

  setAnimState: (state: CharacterAnimationState, fadeDuration?: number) => void;
  setActionState: (actionState: CharacterActionState) => void;
  setActivePoseId: (poseId: 'sit-chair' | 'lie-bed' | 'drink-coffee' | null) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  animState: 'idle',
  actionState: 'free',
  activePoseId: null,
  fadeDuration: 0.25,

  setAnimState: (animState, fadeDuration = 0.25) =>
    set((state) => {
      if (state.animState === animState) return {};
      return { animState, fadeDuration };
    }),

  setActionState: (actionState) =>
    set((state) => {
      if (state.actionState === actionState) return {};
      return { actionState };
    }),

  setActivePoseId: (activePoseId) =>
    set((state) => {
      if (state.activePoseId === activePoseId) return {};
      return { activePoseId };
    }),
}));
