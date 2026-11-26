import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useCameraStore } from '../store/useCameraStore';
import { useInteractionStore } from '../store/useInteractionStore';
import { useIntroStore } from '../store/useIntroStore';
import { MOBILE_CONFIG } from '../data/mobile';

/**
 * Handles mouse drag & wheel zoom on desktop,
 * and single-finger look & two-finger pinch-to-zoom on touch devices.
 * Uses pointer IDs so look and virtual joystick movement work concurrently.
 */
export function useCameraInput() {
  const { gl } = useThree();

  useEffect(() => {
    const dom = gl.domElement;
    if (!dom) return;

    let isMouseDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Track active touch pointer IDs on the right-hand / screen area
    const activeTouches = new Map<number, { x: number; y: number }>();
    let initialPinchDistance = 0;

    const getDistance = (t1: { x: number; y: number }, t2: { x: number; y: number }) => {
      const dx = t1.x - t2.x;
      const dy = t1.y - t2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Pointer Down
    const onPointerDown = (e: PointerEvent) => {
      if (
        useInteractionStore.getState().activeId !== null ||
        useIntroStore.getState().step !== 'done'
      ) {
        return;
      }

      if (e.pointerType === 'mouse') {
        if (e.button !== 0) return;
        isMouseDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        useCameraStore.getState().setIsDragging(true);
        try {
          dom.setPointerCapture(e.pointerId);
        } catch {}
      } else if (e.pointerType === 'touch') {
        // Ignore touches that began on the left 40% of the screen (reserved for joystick)
        if (e.clientX < window.innerWidth * 0.42 && e.clientY > window.innerHeight * 0.4) {
          return;
        }

        activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activeTouches.size === 2) {
          const points = Array.from(activeTouches.values());
          initialPinchDistance = getDistance(points[0], points[1]);
        }
      }
    };

    // Pointer Move
    const onPointerMove = (e: PointerEvent) => {
      if (
        useInteractionStore.getState().activeId !== null ||
        useIntroStore.getState().step !== 'done'
      ) {
        isMouseDragging = false;
        activeTouches.clear();
        useCameraStore.getState().setIsDragging(false);
        return;
      }

      if (e.pointerType === 'mouse') {
        if (!isMouseDragging) return;
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        useCameraStore.getState().rotate(dx, dy);
      } else if (e.pointerType === 'touch') {
        if (!activeTouches.has(e.pointerId)) return;

        const prevTouch = activeTouches.get(e.pointerId)!;
        const dx = e.clientX - prevTouch.x;
        const dy = e.clientY - prevTouch.y;
        activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activeTouches.size === 1) {
          // Single-finger touch camera look
          useCameraStore
            .getState()
            .rotate(dx * 1.25, dy * 1.25);
        } else if (activeTouches.size === 2) {
          // Pinch to zoom
          const points = Array.from(activeTouches.values());
          const newDistance = getDistance(points[0], points[1]);
          if (initialPinchDistance > 0) {
            const delta = (initialPinchDistance - newDistance) * MOBILE_CONFIG.pinchZoomSensitivity;
            useCameraStore.getState().zoom(delta);
            initialPinchDistance = newDistance;
          }
        }
      }
    };

    // Pointer Up & Cancel
    const onPointerUpOrCancel = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        isMouseDragging = false;
        useCameraStore.getState().setIsDragging(false);
      } else if (e.pointerType === 'touch') {
        activeTouches.delete(e.pointerId);
        if (activeTouches.size < 2) {
          initialPinchDistance = 0;
        }
      }
    };

    // Mouse Wheel Zoom
    const onWheel = (e: WheelEvent) => {
      if (
        useInteractionStore.getState().activeId !== null ||
        useIntroStore.getState().step !== 'done'
      ) {
        return;
      }
      e.preventDefault();
      useCameraStore.getState().zoom(e.deltaY * 0.005);
    };

    // Reset all on window blur or tab hide
    const handleReset = () => {
      isMouseDragging = false;
      activeTouches.clear();
      initialPinchDistance = 0;
      useCameraStore.getState().setIsDragging(false);
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUpOrCancel);
    dom.addEventListener('pointercancel', onPointerUpOrCancel);
    dom.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('blur', handleReset);
    document.addEventListener('visibilitychange', handleReset);

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUpOrCancel);
      dom.removeEventListener('pointercancel', onPointerUpOrCancel);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('blur', handleReset);
      document.removeEventListener('visibilitychange', handleReset);
    };
  }, [gl]);
}
