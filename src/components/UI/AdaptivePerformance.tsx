import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGraphicsStore } from '../../store/useGraphicsStore';
import { PERFORMANCE_CONFIG } from '../../data/performance';

/**
 * Monitors frame-rate with hysteresis and steps quality down/up
 * automatically if user has not set a manual preference.
 * Runs purely inside the Three.js Canvas loop and returns null.
 */
export const AdaptivePerformance: React.FC = () => {
  const stepDownQuality = useGraphicsStore((s) => s.stepDownQuality);
  const stepUpQuality = useGraphicsStore((s) => s.stepUpQuality);
  const isAuto = useGraphicsStore((s) => s.isAuto);

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const lowFpsStartTime = useRef<number | null>(null);
  const highFpsStartTime = useRef<number | null>(null);
  const lastAdjustmentTime = useRef<number>(performance.now());

  useFrame(() => {
    frameCount.current++;
    const now = performance.now();
    const elapsed = now - lastTime.current;

    if (elapsed >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / elapsed);
      frameCount.current = 0;
      lastTime.current = now;

      // Adaptive quality adjustment with hysteresis and minimum 10-second cooldown
      const timeSinceLastAdjustment = now - lastAdjustmentTime.current;
      if (isAuto && timeSinceLastAdjustment > 10000) {
        if (currentFps < PERFORMANCE_CONFIG.lowFpsThreshold) {
          if (!lowFpsStartTime.current) {
            lowFpsStartTime.current = now;
          } else if (now - lowFpsStartTime.current > PERFORMANCE_CONFIG.sustainedDurationMs) {
            stepDownQuality();
            lastAdjustmentTime.current = now;
            lowFpsStartTime.current = null;
          }
          highFpsStartTime.current = null;
        } else if (currentFps > PERFORMANCE_CONFIG.recoveryFpsThreshold) {
          if (!highFpsStartTime.current) {
            highFpsStartTime.current = now;
          } else if (now - highFpsStartTime.current > PERFORMANCE_CONFIG.recoveryDurationMs) {
            stepUpQuality();
            lastAdjustmentTime.current = now;
            highFpsStartTime.current = null;
          }
          lowFpsStartTime.current = null;
        } else {
          lowFpsStartTime.current = null;
          highFpsStartTime.current = null;
        }
      }
    }
  });

  return null;
};
