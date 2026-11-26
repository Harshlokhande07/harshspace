import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCameraStore } from '../../store/useCameraStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useCharacterStore } from '../../store/useCharacterStore';
import { POSES } from '../../data/poses';

// Static scratch vectors to guarantee zero allocations inside useFrame
const scratchEyePos = new THREE.Vector3();
const scratchLookTarget = new THREE.Vector3();
const scratchCamDir = new THREE.Vector3();

export const FirstPersonCamera: React.FC = () => {
  const { camera } = useThree();

  // Initialize from current camera transform for seamless transitions
  const currentCameraPos = useRef(new THREE.Vector3().copy(camera.position));
  const currentLookAt = useRef(
    new THREE.Vector3()
      .copy(camera.position)
      .addScaledVector(camera.getWorldDirection(scratchCamDir), 4)
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    const playerPos = usePlayerStore.getState().position;
    const yaw = useCameraStore.getState().yaw;
    const pitch = useCameraStore.getState().pitch;
    const activePoseId = useCharacterStore.getState().activePoseId;

    // Camera sits at character eye height (adjusted dynamically when seated or lying)
    const poseConfig = activePoseId ? POSES[activePoseId] : null;
    const eyeHeightOffset = poseConfig ? poseConfig.eyeHeightOffset : 1.15;
    const eyeHeight = playerPos[1] + (eyeHeightOffset - 0.7);
    scratchEyePos.set(playerPos[0], eyeHeight, playerPos[2]);

    // View direction vector based on horizontal yaw and vertical pitch
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const dirX = -Math.sin(yaw) * cosPitch;
    const dirY = -sinPitch;
    const dirZ = -Math.cos(yaw) * cosPitch;

    // Projected look target along the view direction
    scratchLookTarget.set(
      scratchEyePos.x + dirX * 6.0,
      scratchEyePos.y + dirY * 6.0,
      scratchEyePos.z + dirZ * 6.0
    );

    // Smooth damping: 6.0 damping coefficient completes ~95% in ~0.5s
    currentCameraPos.current.x = THREE.MathUtils.damp(
      currentCameraPos.current.x,
      scratchEyePos.x,
      6.0,
      dt
    );
    currentCameraPos.current.y = THREE.MathUtils.damp(
      currentCameraPos.current.y,
      scratchEyePos.y,
      6.0,
      dt
    );
    currentCameraPos.current.z = THREE.MathUtils.damp(
      currentCameraPos.current.z,
      scratchEyePos.z,
      6.0,
      dt
    );

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      scratchLookTarget.x,
      8.0,
      dt
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      scratchLookTarget.y,
      8.0,
      dt
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      scratchLookTarget.z,
      8.0,
      dt
    );

    camera.position.copy(currentCameraPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
