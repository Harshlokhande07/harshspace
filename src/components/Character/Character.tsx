import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { checkCollision } from '../../utils/collision';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useCameraStore } from '../../store/useCameraStore';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useCharacterActions } from '../../hooks/useCharacterActions';
import { useTouchControlsStore } from '../../store/useTouchControlsStore';
import { AudioManager } from '../../utils/audioManager';
import { HarshModel } from './HarshModel';

export const Character: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const keys = useKeyboard();
  const setPosition = usePlayerStore((s) => s.setPosition);
  const setRotation = usePlayerStore((s) => s.setRotation);
  const cameraMode = useCameraStore((s) => s.mode);

  // Position, velocity, and rotation vectors (allocated once, never inside useFrame)
  const currentPos = useRef(new THREE.Vector3(0, 0.7, 1.2));
  const currentVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const targetRotation = useRef<number>(0);
  const currentRotation = useRef<number>(0);
  const currentSpeed = useRef<number>(0);

  // Tracking refs to avoid per-frame Zustand store updates and duplicate audio triggers
  const lastSavedPos = useRef<[number, number, number]>([0, 0.7, 1.2]);
  const lastSavedRot = useRef<number>(0);
  const lastFootstepMoving = useRef<boolean>(false);
  const lastFootstepRunning = useRef<boolean>(false);

  // Movement physics configuration
  const WALK_SPEED = 3.2;
  const RUN_SPEED = 6.0;
  const ACCELERATION = 22.0;
  const FRICTION = 16.0;
  const RADIUS = 0.35; // Collision radius remains identical to preserve navigation

  const { startAction, exitAction } = useCharacterActions(
    currentPos,
    currentVelocity,
    targetRotation,
    currentRotation
  );

  // Expose action triggers to window so useInteractionControls can call startAction/exitAction directly
  useEffect(() => {
    (window as any).__harshStartAction = startAction;
    (window as any).__harshExitAction = exitAction;
    return () => {
      delete (window as any).__harshStartAction;
      delete (window as any).__harshExitAction;
    };
  }, [startAction, exitAction]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const cameraYaw = useCameraStore.getState().yaw;
    const activeId = useInteractionStore.getState().activeId;
    const isInteractionActive = activeId !== null;
    const isDrinking = useLivingRoomStore.getState().isDrinking;
    const actionState = useCharacterStore.getState().actionState;
    (window as any).__harshActionState = actionState;

    // Seated typing reaction: when seated and PC desktop is open, switch to sit-typing
    if (actionState === 'seated') {
      const targetSitClip = activeId === 'desk-pc' ? 'sit-typing' : 'sit-idle';
      if (useCharacterStore.getState().animState !== targetSitClip) {
        useCharacterStore.getState().setAnimState(targetSitClip, 0.25);
      }
    }

    // Compute camera-relative forward and right vectors on the XZ ground plane
    const fwdX = -Math.sin(cameraYaw);
    const fwdZ = -Math.cos(cameraYaw);
    const rightX = Math.cos(cameraYaw);
    const rightZ = -Math.sin(cameraYaw);

    let moveX = 0;
    let moveZ = 0;

    const touchInput = useTouchControlsStore.getState();
    const isMovingInput =
      keys.forward ||
      keys.backward ||
      keys.left ||
      keys.right ||
      Math.abs(touchInput.moveX) > 0.05 ||
      Math.abs(touchInput.moveZ) > 0.05;

    // Movement allowed ONLY when in free mode, not drinking, and no panel is open
    if (actionState === 'free' && !isInteractionActive && !isDrinking) {
      if (keys.forward) {
        moveX += fwdX;
        moveZ += fwdZ;
      }
      if (keys.backward) {
        moveX -= fwdX;
        moveZ -= fwdZ;
      }
      if (keys.left) {
        moveX -= rightX;
        moveZ -= rightZ;
      }
      if (keys.right) {
        moveX += rightX;
        moveZ += rightZ;
      }

      // Merge touch joystick analog input
      if (Math.abs(touchInput.moveX) > 0.05 || Math.abs(touchInput.moveZ) > 0.05) {
        moveX += rightX * touchInput.moveX - fwdX * touchInput.moveZ;
        moveZ += rightZ * touchInput.moveX - fwdZ * touchInput.moveZ;
      }
    } else if ((actionState === 'seated' || actionState === 'lying') && isMovingInput && !isInteractionActive) {
      // Moving while seated or lying stands the character up
      exitAction();
    }

    // Determine target speed based on Shift key or joystick push ratio
    const isSprinting = keys.shift || touchInput.isRunning;
    const maxSpeed = isSprinting ? RUN_SPEED : WALK_SPEED;

    // Normalize movement direction vector if non-zero
    const inputLength = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (inputLength > 0.001) {
      moveX /= inputLength;
      moveZ /= inputLength;
      // Target rotation angle to face direction of movement
      targetRotation.current = Math.atan2(moveX, moveZ);
    }

    // Accelerate or apply friction to horizontal velocities
    if (inputLength > 0.001 && actionState === 'free') {
      currentVelocity.current.x += moveX * ACCELERATION * dt;
      currentVelocity.current.z += moveZ * ACCELERATION * dt;

      // Clamp horizontal velocity to maximum speed
      const speed = Math.sqrt(
        currentVelocity.current.x * currentVelocity.current.x +
          currentVelocity.current.z * currentVelocity.current.z
      );
      if (speed > maxSpeed) {
        currentVelocity.current.x = (currentVelocity.current.x / speed) * maxSpeed;
        currentVelocity.current.z = (currentVelocity.current.z / speed) * maxSpeed;
      }
    } else {
      // Natural ground deceleration
      const speed = Math.sqrt(
        currentVelocity.current.x * currentVelocity.current.x +
          currentVelocity.current.z * currentVelocity.current.z
      );
      if (speed > 0.001) {
        const drop = FRICTION * dt;
        const newSpeed = Math.max(0, speed - drop);
        currentVelocity.current.x = (currentVelocity.current.x / speed) * newSpeed;
        currentVelocity.current.z = (currentVelocity.current.z / speed) * newSpeed;
      } else {
        currentVelocity.current.x = 0;
        currentVelocity.current.z = 0;
      }
    }

    // Only apply physics/collisions in 'free' mode
    if (actionState === 'free') {
      const nextX = currentPos.current.x + currentVelocity.current.x * dt;
      const nextZ = currentPos.current.z + currentVelocity.current.z * dt;

      if (!checkCollision(nextX, nextZ, RADIUS)) {
        currentPos.current.x = nextX;
        currentPos.current.z = nextZ;
      } else {
        if (!checkCollision(nextX, currentPos.current.z, RADIUS)) {
          currentPos.current.x = nextX;
          currentVelocity.current.z = 0;
        } else if (!checkCollision(currentPos.current.x, nextZ, RADIUS)) {
          currentPos.current.z = nextZ;
          currentVelocity.current.x = 0;
        } else {
          currentVelocity.current.x = 0;
          currentVelocity.current.z = 0;

          // Anti-stuck recovery: if stuck inside an obstacle boundary, gently nudge towards center
          if (checkCollision(currentPos.current.x, currentPos.current.z, RADIUS)) {
            const dirToCenterX = -Math.sign(currentPos.current.x);
            const dirToCenterZ = -Math.sign(currentPos.current.z);
            currentPos.current.x += dirToCenterX * 0.02;
            currentPos.current.z += dirToCenterZ * 0.02;
          }
        }
      }

      // Calculate actual moving speed
      const currentSpeedVal = Math.sqrt(
        currentVelocity.current.x * currentVelocity.current.x +
          currentVelocity.current.z * currentVelocity.current.z
      );
      currentSpeed.current = currentSpeedVal;

      // Update animation state in useCharacterStore ONLY when state changes
      const characterStore = useCharacterStore.getState();
      let targetAnimState = 'idle';
      const isMoving = currentSpeedVal > 0.2;
      const isRunning = keys.shift && currentSpeedVal > WALK_SPEED * 0.9;
      if (isMoving) {
        targetAnimState = isRunning ? 'run' : 'walk';
      }

      // Sync footstep audio loop only when moving/running state toggles
      if (isMoving !== lastFootstepMoving.current || isRunning !== lastFootstepRunning.current) {
        lastFootstepMoving.current = isMoving;
        lastFootstepRunning.current = isRunning;
        AudioManager.setFootstepLoop(isMoving, isRunning);
      }

      if (characterStore.animState !== targetAnimState) {
        characterStore.setAnimState(targetAnimState, 0.25);
      }
    } else {
      currentSpeed.current = 0;
      if (lastFootstepMoving.current) {
        lastFootstepMoving.current = false;
        lastFootstepRunning.current = false;
        AudioManager.setFootstepLoop(false, false);
      }
    }

    // Smoothly interpolate rotation angle towards target direction
    let angleDiff = targetRotation.current - currentRotation.current;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    currentRotation.current += angleDiff * Math.min(1.0, 10.0 * dt);

    // Update 3D mesh position & orientation
    if (meshRef.current) {
      meshRef.current.position.copy(currentPos.current);
      meshRef.current.rotation.y = currentRotation.current;
      // In first-person mode, hide the avatar mesh so camera isn't inside it
      meshRef.current.visible = cameraMode !== 'first';
    }

    // Keep store synchronized for camera and proximity systems ONLY when position or rotation changes
    const curX = currentPos.current.x;
    const curY = currentPos.current.y;
    const curZ = currentPos.current.z;
    const [lastX, lastY, lastZ] = lastSavedPos.current;
    const distSq = (curX - lastX) * (curX - lastX) + (curY - lastY) * (curY - lastY) + (curZ - lastZ) * (curZ - lastZ);

    if (distSq > 0.00005) {
      lastSavedPos.current = [curX, curY, curZ];
      setPosition(lastSavedPos.current);
    }

    if (Math.abs(currentRotation.current - lastSavedRot.current) > 0.01) {
      lastSavedRot.current = currentRotation.current;
      setRotation(currentRotation.current);
    }
  });

  return (
    <group ref={meshRef} position={[0, 0.7, 1.5]}>
      {/* 3D Animated Character Model with Capsule Fallback */}
      <HarshModel speedRef={currentSpeed} />

      {/* Subtle stylish neon player underglow ring (purely emissive material, 0 added lights) */}
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.46, 24]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
