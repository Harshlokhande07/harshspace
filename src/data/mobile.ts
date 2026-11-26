export interface MobileConfig {
  joystickRadius: number;
  joystickThumbRadius: number;
  runThreshold: number; // 0 to 1, push thumb beyond this ratio to sprint
  touchLookSensitivity: number;
  pinchZoomSensitivity: number;
}

export const MOBILE_CONFIG: MobileConfig = {
  joystickRadius: 55, // px
  joystickThumbRadius: 24, // px
  runThreshold: 0.8, // 80% deflection triggers sprint
  touchLookSensitivity: 0.005,
  pinchZoomSensitivity: 0.012,
};

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}
