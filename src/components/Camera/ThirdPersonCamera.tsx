import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCameraStore } from '../../store/useCameraStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useIntroStore } from '../../store/useIntroStore';

// Static scratch vectors to guarantee zero allocations inside useFrame
const scratchTargetPos = new THREE.Vector3();
const scratchTargetLookAt = new THREE.Vector3();
const scratchCamDir = new THREE.Vector3();
const scratchIntroPos = new THREE.Vector3(0.0, 2.30, 2.35); // Cinematic entrance view framing workstation, feature wall & Tokyo window
const scratchIntroLookAt = new THREE.Vector3(-0.40, 0.95, -1.20);

export const ThirdPersonCamera: React.FC = () => {
  const { camera } = useThree();
  const setStep = useIntroStore((s) => s.setStep);
  const introProgressRef = useRef(0);

  // Initialize tracking position and look target from current camera transform for seamless transitions
  const currentCameraPos = useRef(new THREE.Vector3().copy(camera.position));
  const currentLookAt = useRef(
    new THREE.Vector3()
      .copy(camera.position)
      .addScaledVector(camera.getWorldDirection(scratchCamDir), 4)
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const introStep = useIntroStore.getState().step;

    // If still in loading or title phase, hold the wide cinematic room view
    if (introStep === 'loading' || introStep === 'title') {
      currentCameraPos.current.copy(scratchIntroPos);
      currentLookAt.current.copy(scratchIntroLookAt);
      camera.position.copy(currentCameraPos.current);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // If in transition phase, interpolate introCameraProgress smoothly to 1 (takes ~3.2 seconds)
    if (introStep === 'transition') {
      introProgressRef.current = Math.min(1, introProgressRef.current + dt * 0.3);
      if (introProgressRef.current >= 1) {
        setStep('welcome');
      }
    }

    const playerPos = usePlayerStore.getState().position;
    const yaw = useCameraStore.getState().yaw;
    const pitch = useCameraStore.getState().pitch;
    const zoomDistance = useCameraStore.getState().zoomDistance;
    const introCameraProgress = introProgressRef.current;

    // Spherical orbit coordinates around the character
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const sinYaw = Math.sin(yaw);
    const cosYaw = Math.cos(yaw);

    const targetEyeY = playerPos[1] + 0.45;

    // Normal player camera orbit target clamped within interior room boundaries
    const rawCamX = playerPos[0] + zoomDistance * sinYaw * cosPitch;
    const rawCamY = targetEyeY + zoomDistance * sinPitch;
    const rawCamZ = playerPos[2] + zoomDistance * cosYaw * cosPitch;

    // Interior room safety boundary margins (Width 7.2m, Length 5.2m, Height 2.8m)
    const playerCamX = Math.max(-2.65, Math.min(4.25, rawCamX));
    const playerCamY = Math.max(0.40, Math.min(2.65, rawCamY));
    const playerCamZ = Math.max(-2.45, Math.min(2.45, rawCamZ));

    // Smoothly blend between wide intro view and player camera
    const t = introStep === 'transition' ? introCameraProgress : 1.0;
    // Ease-in-out cubic curve
    const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    scratchTargetPos.set(
      THREE.MathUtils.lerp(scratchIntroPos.x, playerCamX, easeT),
      THREE.MathUtils.lerp(scratchIntroPos.y, playerCamY, easeT),
      THREE.MathUtils.lerp(scratchIntroPos.z, playerCamZ, easeT)
    );

    scratchTargetLookAt.set(
      THREE.MathUtils.lerp(scratchIntroLookAt.x, playerPos[0], easeT),
      THREE.MathUtils.lerp(scratchIntroLookAt.y, targetEyeY, easeT),
      THREE.MathUtils.lerp(scratchIntroLookAt.z, playerPos[2], easeT)
    );

    // Smooth damping
    const dampRate = introStep === 'transition' ? 3.0 : 6.0;
    currentCameraPos.current.x = THREE.MathUtils.damp(
      currentCameraPos.current.x,
      scratchTargetPos.x,
      dampRate,
      dt
    );
    currentCameraPos.current.y = THREE.MathUtils.damp(
      currentCameraPos.current.y,
      scratchTargetPos.y,
      dampRate,
      dt
    );
    currentCameraPos.current.z = THREE.MathUtils.damp(
      currentCameraPos.current.z,
      scratchTargetPos.z,
      dampRate,
      dt
    );

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      scratchTargetLookAt.x,
      dampRate,
      dt
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      scratchTargetLookAt.y,
      dampRate,
      dt
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      scratchTargetLookAt.z,
      dampRate,
      dt
    );

    camera.position.copy(currentCameraPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
