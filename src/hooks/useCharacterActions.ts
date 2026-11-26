import { useRef } from 'react';
import * as THREE from 'three';
import { useCharacterStore } from '../store/useCharacterStore';
import { useLivingRoomStore } from '../store/useLivingRoomStore';
import { POSES } from '../data/poses';

/**
 * Handles smooth character action transitions:
 * - Auto-walking to approach point & turning to anchor yaw
 * - Transitioning into sitting-down / seated / lying-down / lying / drinking
 * - Standing up and placing character at safe exit point
 * - Cancel safety during transitions
 */
export function useCharacterActions(
  currentPos: React.MutableRefObject<THREE.Vector3>,
  currentVelocity: React.MutableRefObject<THREE.Vector3>,
  targetRotation: React.MutableRefObject<number>,
  currentRotation: React.MutableRefObject<number>
) {
  const transitionTimerRef = useRef<number | null>(null);

  // Transition into an action pose
  const startAction = (poseId: 'sit-chair' | 'lie-bed' | 'drink-coffee') => {
    const store = useCharacterStore.getState();
    if (store.actionState !== 'free') return;

    const pose = POSES[poseId];
    store.setActivePoseId(poseId);
    store.setActionState('approaching');

    // Clear any previous timer
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    if (poseId === 'drink-coffee') {
      store.setActionState('drinking');
      useLivingRoomStore.getState().drinkCoffee();
      targetRotation.current = pose.yaw;

      transitionTimerRef.current = window.setTimeout(() => {
        store.setActionState('free');
        store.setActivePoseId(null);
      }, 2000);
      return;
    }

    // For Chair and Bed:
    // Phase 1: Smoothly walk to approach point
    targetRotation.current = pose.yaw;
    store.setAnimState('walk', 0.2);

    transitionTimerRef.current = window.setTimeout(() => {
      // Phase 2: Play transition clip into sitting/lying
      if (poseId === 'sit-chair') {
        store.setActionState('sitting-down');
        store.setAnimState('stand-to-sit', 0.2);

        // Position on anchor
        currentPos.current.set(pose.anchor[0], pose.anchor[1], pose.anchor[2]);
        currentVelocity.current.set(0, 0, 0);
        currentRotation.current = pose.yaw;

        transitionTimerRef.current = window.setTimeout(() => {
          store.setActionState('seated');
          store.setAnimState('sit-idle', 0.25);
        }, 800);
      } else if (poseId === 'lie-bed') {
        store.setActionState('lying-down');
        store.setAnimState('lie-down', 0.2);

        currentPos.current.set(pose.anchor[0], pose.anchor[1], pose.anchor[2]);
        currentVelocity.current.set(0, 0, 0);
        currentRotation.current = pose.yaw;

        transitionTimerRef.current = window.setTimeout(() => {
          store.setActionState('lying');
          store.setAnimState('sleeping', 0.25);
        }, 800);
      }
    }, 450);
  };

  // Exit from current action pose back to free movement
  const exitAction = () => {
    const store = useCharacterStore.getState();
    const poseId = store.activePoseId;
    if (store.actionState === 'free' || !poseId) return;

    const pose = POSES[poseId];

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    if (poseId === 'sit-chair') {
      store.setActionState('standing-up');
      store.setAnimState('sit-to-stand', 0.2);

      transitionTimerRef.current = window.setTimeout(() => {
        currentPos.current.set(pose.exitPoint[0], pose.exitPoint[1], pose.exitPoint[2]);
        currentVelocity.current.set(0, 0, 0);
        store.setActionState('free');
        store.setActivePoseId(null);
        store.setAnimState('idle', 0.25);
      }, 700);
    } else if (poseId === 'lie-bed') {
      store.setActionState('getting-up');
      store.setAnimState('get-up', 0.2);

      transitionTimerRef.current = window.setTimeout(() => {
        currentPos.current.set(pose.exitPoint[0], pose.exitPoint[1], pose.exitPoint[2]);
        currentVelocity.current.set(0, 0, 0);
        store.setActionState('free');
        store.setActivePoseId(null);
        store.setAnimState('idle', 0.25);
      }, 700);
    } else {
      currentPos.current.set(pose.exitPoint[0], pose.exitPoint[1], pose.exitPoint[2]);
      currentVelocity.current.set(0, 0, 0);
      store.setActionState('free');
      store.setActivePoseId(null);
      store.setAnimState('idle', 0.25);
    }
  };

  return {
    startAction,
    exitAction,
  };
}
