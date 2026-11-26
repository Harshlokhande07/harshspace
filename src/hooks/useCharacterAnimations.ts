import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore } from '../store/useCharacterStore';

/**
 * Normalizes bone track names for Mixamo animations.
 * Mixamo clips often prefix bone names with "mixamorig:..." or have slight variations.
 */
function cleanTrackName(trackName: string, skeletonBones: Set<string>): string {
  // If exact track matches a bone, keep it
  const parts = trackName.split('.');
  const boneName = parts[0];
  const property = parts.slice(1).join('.');

  if (skeletonBones.has(boneName)) {
    return trackName;
  }

  // If boneName has prefix like 'mixamorig:' or 'mixamorig'
  const strippedPrefix = boneName.replace(/^mixamorig\d*[:_]?/i, '');
  for (const b of skeletonBones) {
    if (b === strippedPrefix || b.replace(/^mixamorig\d*[:_]?/i, '') === strippedPrefix) {
      return `${b}.${property}`;
    }
  }

  return trackName;
}

export function useCharacterAnimations(
  rootObject: THREE.Object3D | null,
  clips: THREE.AnimationClip[],
  speedRef?: React.MutableRefObject<number>
) {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  // Initialize AnimationMixer and configure clips
  useEffect(() => {
    if (!rootObject || clips.length === 0) return;

    const mixer = new THREE.AnimationMixer(rootObject);
    mixerRef.current = mixer;

    // Collect all bone names in the character's skeleton
    const skeletonBones = new Set<string>();
    rootObject.traverse((child) => {
      if ((child as THREE.Bone).isBone) {
        skeletonBones.add(child.name);
      }
    });

    const actions: Record<string, THREE.AnimationAction> = {};

    clips.forEach((originalClip) => {
      // Clone clip to safely retarget tracks
      const clip = originalClip.clone();
      const name = clip.name.toLowerCase();

      // Normalize bone names in track if needed
      clip.tracks.forEach((track) => {
        track.name = cleanTrackName(track.name, skeletonBones);
      });

      const action = mixer.clipAction(clip, rootObject);
      action.clampWhenFinished = false;
      action.loop = THREE.LoopRepeat;

      // Identify by standard keywords
      if (name.includes('idle')) actions['idle'] = action;
      else if (name.includes('walk')) actions['walk'] = action;
      else if (name.includes('run')) actions['run'] = action;
      else actions[name] = action;
    });

    actionsRef.current = actions;

    // Start with idle or first available action
    const startKey = actions['idle'] ? 'idle' : Object.keys(actions)[0];
    if (startKey && actions[startKey]) {
      actions[startKey].reset().play();
      currentActionRef.current = actions[startKey];
    }

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(rootObject);
    };
  }, [rootObject, clips]);

  // React to animState changes from useCharacterStore with smooth crossfade
  const animState = useCharacterStore((s) => s.animState);
  const fadeDuration = useCharacterStore((s) => s.fadeDuration);

  useEffect(() => {
    const actions = actionsRef.current;
    const targetAction = actions[animState];

    if (!targetAction || targetAction === currentActionRef.current) return;

    const prevAction = currentActionRef.current;
    currentActionRef.current = targetAction;

    targetAction.reset().fadeIn(fadeDuration).play();

    if (prevAction) {
      prevAction.fadeOut(fadeDuration);
    }
  }, [animState, fadeDuration]);

  // Update mixer and dynamically scale walk/run timeScale to current velocity
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    if (mixerRef.current) {
      mixerRef.current.update(dt);
    }

    // Adjust playback rate (timeScale) to match actual moving speed and reduce foot sliding
    if (speedRef && currentActionRef.current) {
      const currentState = useCharacterStore.getState().animState;
      const speed = speedRef.current;

      if (currentState === 'walk') {
        // Normal walking speed ~ 2.5 m/s
        currentActionRef.current.timeScale = Math.max(0.6, speed / 2.5);
      } else if (currentState === 'run') {
        // Normal running speed ~ 5.5 m/s
        currentActionRef.current.timeScale = Math.max(0.7, speed / 5.2);
      } else {
        currentActionRef.current.timeScale = 1.0;
      }
    }
  });

  return {
    playClip: (name: string, fade = 0.25) => {
      useCharacterStore.getState().setAnimState(name, fade);
    },
  };
}
