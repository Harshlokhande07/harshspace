import { create } from 'zustand';

interface RoomEffectsState {
  deskLampBoost: number; // 0 (normal: 1.2) to 1 (boosted: 2.2)
  windowGlowBoost: number; // 0 (normal: 0.6) to 1 (boosted: 1.8)
  certificateWallGlow: number; // 0 to 1 smooth spotlight/rim highlight
  memoryWallGlow: number; // 0 to 1 smooth spotlight/rim highlight
  setDeskLampBoost: (val: number) => void;
  setWindowGlowBoost: (val: number) => void;
  setCertificateWallGlow: (val: number) => void;
  setMemoryWallGlow: (val: number) => void;
}

export const useRoomEffectsStore = create<RoomEffectsState>((set) => ({
  deskLampBoost: 0,
  windowGlowBoost: 0,
  certificateWallGlow: 0,
  memoryWallGlow: 0,
  setDeskLampBoost: (deskLampBoost) => set({ deskLampBoost }),
  setWindowGlowBoost: (windowGlowBoost) => set({ windowGlowBoost }),
  setCertificateWallGlow: (certificateWallGlow) => set({ certificateWallGlow }),
  setMemoryWallGlow: (memoryWallGlow) => set({ memoryWallGlow }),
}));
