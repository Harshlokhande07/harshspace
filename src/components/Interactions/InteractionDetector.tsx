import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { INTERACTABLES } from '../../data/interactables';
import { useInteractionStore } from '../../store/useInteractionStore';
import { usePlayerStore } from '../../store/usePlayerStore';

/**
 * Checks distance between player and interactable anchors every frame.
 * Zero object allocations inside useFrame.
 */
export const InteractionDetector: React.FC = () => {
  const setNearest = useInteractionStore((s) => s.setNearest);
  const lastNearestId = useRef<string | null>(null);

  useFrame(() => {
    // If an interaction is currently active/open, suspend detection
    if (useInteractionStore.getState().activeId !== null) {
      if (lastNearestId.current !== null) {
        lastNearestId.current = null;
        setNearest(null);
      }
      return;
    }

    const playerPos = usePlayerStore.getState().position;
    const px = playerPos[0];
    const pz = playerPos[2];

    let minDistanceSq = Infinity;
    let foundNearestId: string | null = null;

    // Check distance squared to all interactables (no allocations)
    for (let i = 0; i < INTERACTABLES.length; i++) {
      const item = INTERACTABLES[i];
      const dx = px - item.position[0];
      const dz = pz - item.position[2];
      const distSq = dx * dx + dz * dz;
      const radiusSq = item.radius * item.radius;

      if (distSq <= radiusSq && distSq < minDistanceSq) {
        minDistanceSq = distSq;
        foundNearestId = item.id;
      }
    }

    // Only update store when nearest interactable has changed
    if (foundNearestId !== lastNearestId.current) {
      lastNearestId.current = foundNearestId;
      setNearest(foundNearestId);
    }
  });

  return null;
};
