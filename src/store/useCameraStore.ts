import { create } from 'zustand';

export type CameraMode = 'first' | 'third';

interface CameraState {
  mode: CameraMode;
  yaw: number;
  pitch: number;
  zoomDistance: number;
  isDragging: boolean;
  setMode: (mode: CameraMode) => void;
  toggleMode: () => void;
  rotate: (dx: number, dy: number) => void;
  zoom: (delta: number) => void;
  setIsDragging: (isDragging: boolean) => void;
}

const MIN_ZOOM = 1.4;
const MAX_ZOOM = 3.6;

export const useCameraStore = create<CameraState>((set) => ({
  mode: 'third',
  yaw: 0,
  pitch: 0.28,
  zoomDistance: 2.6,
  isDragging: false,

  setMode: (mode) =>
    set((state) => {
      if (state.mode === mode) return {};
      // Adjust pitch smoothly when entering first person if looking too far from horizon
      const pitch =
        mode === 'first'
          ? Math.max(-1.1, Math.min(1.1, state.pitch))
          : Math.max(0.05, Math.min(1.25, state.pitch));
      return { mode, pitch };
    }),

  toggleMode: () =>
    set((state) => {
      const nextMode: CameraMode = state.mode === 'third' ? 'first' : 'third';
      const pitch =
        nextMode === 'first'
          ? Math.max(-1.1, Math.min(1.1, state.pitch))
          : Math.max(0.05, Math.min(1.25, state.pitch));
      return { mode: nextMode, pitch };
    }),

  rotate: (dx, dy) =>
    set((state) => {
      const sensitivity = 0.0035;
      const newYaw = state.yaw - dx * sensitivity;

      // In third person, pitch is elevation angle (higher pitch = camera is higher, looking down)
      // In first person, pitch is looking up/down
      const pitchMin = state.mode === 'third' ? 0.05 : -1.25;
      const pitchMax = state.mode === 'third' ? 1.35 : 1.25;

      const newPitch = Math.max(pitchMin, Math.min(pitchMax, state.pitch + dy * sensitivity));

      return { yaw: newYaw, pitch: newPitch };
    }),

  zoom: (delta) =>
    set((state) => {
      if (state.mode !== 'third') return {};
      const zoomSensitivity = 0.002;
      const newZoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, state.zoomDistance + delta * zoomSensitivity)
      );
      return { zoomDistance: newZoom };
    }),

  setIsDragging: (isDragging) => set({ isDragging }),
}));
