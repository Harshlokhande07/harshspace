import React from 'react';
import { DayNightController } from './DayNightController';

/**
 * High-performance cinematic room lighting restricted to exactly 4 real-time lights:
 * 1. Soft hemisphere light (sky fill + ground bounce)
 * 2. Shadow-casting directional window light (sun / moonlight)
 * 3. Warm desk lamp task light (dimmed smoothly by lamp switch & notebook reaction)
 * 4. Violet RGB accent point light around the battlestation
 *
 * Driven smoothly across Day / Evening / Night keyframes by DayNightController.
 */
export const RoomLighting: React.FC = () => {
  return <DayNightController />;
};
