import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useInteractionStore } from '../../store/useInteractionStore';

interface MinecraftBoyProps {
  speedRef?: React.MutableRefObject<number>;
}

/**
 * Procedural Rigged Minecraft Boy Character
 * Faithfully recreates the "Rigged Mine Craft Boy" aesthetic:
 * - Classic voxel proportions (Head, 3D Layered Hair, Torso, Arms, Legs)
 * - Stylish modern streetwear: Navy/cyan hoodie with front pocket & drawstrings,
 *   denim jeans, and high-top sneakers with white rubber soles
 * - Expressive anime-style eyes and layered fringe hair
 * - Full kinematic limb articulation:
 *   - Walking: natural pendulum limb swinging matching footstep velocity
 *   - Running: wider, dynamic athletic stride with forward torso pitch
 *   - Idle: subtle organic breathing and rhythmic weight shifting
 *   - Seated: 90° hip flexion, knees over chair, arms typing at keyboard
 *   - Lying: smooth 90° horizontal recline on the bed mattress
 */
export const MinecraftBoy: React.FC<MinecraftBoyProps> = ({ speedRef }) => {
  // References for articulating joints
  const rootGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const torsoGroupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  // High-quality procedural pixel skin texture for face and torso details
  const faceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Warm natural skin base (#E8BE9B)
    ctx.fillStyle = '#E8BE9B';
    ctx.fillRect(0, 0, 128, 128);

    // Subtle skin shading around cheeks and chin
    ctx.fillStyle = '#DCB08D';
    ctx.fillRect(0, 96, 128, 32);
    ctx.fillStyle = '#EFA899';
    // Cheerful blush dots
    ctx.fillRect(16, 76, 20, 10);
    ctx.fillRect(92, 76, 20, 10);

    // Eyes (Anime Minecraft Boy style)
    // Sclera (White)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(20, 48, 28, 24);
    ctx.fillRect(80, 48, 28, 24);

    // Iris (Deep Vibrant Cyan #0284C7 / #38BDF8)
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(28, 48, 20, 24);
    ctx.fillRect(80, 48, 20, 24);

    // Pupil (Midnight Blue)
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(34, 52, 14, 20);
    ctx.fillRect(80, 52, 14, 20);

    // Eye Highlights (Pure White sparkle)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(30, 50, 8, 8);
    ctx.fillRect(82, 50, 8, 8);
    ctx.fillRect(40, 62, 4, 4);
    ctx.fillRect(92, 62, 4, 4);

    // Eyebrows (Dark Brown #3D2619)
    ctx.fillStyle = '#3D2619';
    ctx.fillRect(18, 40, 32, 6);
    ctx.fillRect(78, 40, 32, 6);

    // Confident mouth line
    ctx.fillStyle = '#B47858';
    ctx.fillRect(52, 88, 24, 6);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(56, 90, 16, 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Streetwear Hoodie Front Decal Texture
  const hoodieTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Main Hoodie Fabric: Deep Navy Charcoal (#1E293B)
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, 128, 128);

    // Center Electric Cyan Geometric Accent Stripes (#38BDF8)
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(24, 20, 80, 12);
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(32, 34, 64, 8);

    // Drawstrings (White cords hanging down)
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(48, 16, 4, 44);
    ctx.fillRect(76, 16, 4, 44);
    // Silver drawstring aglets
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(47, 56, 6, 6);
    ctx.fillRect(75, 56, 6, 6);

    // Kangaroo Front Pocket
    ctx.fillStyle = '#172033';
    ctx.fillRect(20, 72, 88, 44);
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(20, 72, 88, 4); // Cyan pocket rim

    // Bottom ribbed hem
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 118, 128, 10);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const clock = state.clock.getElapsedTime();
    const actionState = useCharacterStore.getState().actionState;
    const animState = useCharacterStore.getState().animState;
    const activeId = useInteractionStore.getState().activeId;
    const speed = speedRef ? speedRef.current : 0;

    const isMoving = speed > 0.15;
    const isRunning = animState === 'run' || speed > 3.8;
    const isSeated = actionState === 'seated' || actionState === 'sitting-down';
    const isLying = actionState === 'lying' || actionState === 'lying-down';

    // 1. Root group transform adjustments for postures
    if (rootGroupRef.current) {
      if (isLying) {
        rootGroupRef.current.position.y = -0.42;
        rootGroupRef.current.rotation.x = -Math.PI / 2;
        rootGroupRef.current.rotation.z = Math.PI / 2;
      } else if (isSeated) {
        rootGroupRef.current.position.y = -0.22;
        rootGroupRef.current.rotation.x = 0;
        rootGroupRef.current.rotation.z = 0;
      } else {
        // Natural walking vertical bounce bobbing
        const bounce = isMoving ? Math.abs(Math.sin(clock * (isRunning ? 14 : 9))) * 0.04 : 0;
        rootGroupRef.current.position.y = bounce;
        rootGroupRef.current.rotation.x = 0;
        rootGroupRef.current.rotation.z = 0;
      }
    }

    // 2. Torso pitch (leans slightly forward when sprinting)
    if (torsoGroupRef.current) {
      const targetTorsoPitch = isRunning ? 0.14 : isMoving ? 0.05 : 0;
      torsoGroupRef.current.rotation.x = THREE.MathUtils.damp(
        torsoGroupRef.current.rotation.x,
        targetTorsoPitch,
        8.0,
        dt
      );
    }

    // 3. Head articulation (idle look-around & subtle breathing bob)
    if (headGroupRef.current) {
      if (isSeated) {
        // Slight downward tilt toward screens/keyboard
        headGroupRef.current.rotation.x = THREE.MathUtils.damp(
          headGroupRef.current.rotation.x,
          0.18,
          6.0,
          dt
        );
        headGroupRef.current.rotation.y = THREE.MathUtils.damp(
          headGroupRef.current.rotation.y,
          0,
          6.0,
          dt
        );
      } else if (isLying) {
        headGroupRef.current.rotation.x = 0;
        headGroupRef.current.rotation.y = 0;
      } else if (isMoving) {
        // Head stays focused forward with micro-yaw sync
        const headYaw = Math.sin(clock * (isRunning ? 7 : 4.5)) * 0.04;
        headGroupRef.current.rotation.y = headYaw;
        headGroupRef.current.rotation.x = 0.02;
      } else {
        // Idle gentle breathing & wandering gaze
        headGroupRef.current.rotation.y = Math.sin(clock * 0.6) * 0.12;
        headGroupRef.current.rotation.x = Math.sin(clock * 1.2) * 0.03;
      }
    }

    // 4. Arms & Legs kinematic articulation
    if (leftArmRef.current && rightArmRef.current && leftLegRef.current && rightLegRef.current) {
      if (isLying) {
        // Relaxed resting arms and legs on bed
        leftArmRef.current.rotation.x = THREE.MathUtils.damp(leftArmRef.current.rotation.x, 0.05, 6.0, dt);
        rightArmRef.current.rotation.x = THREE.MathUtils.damp(rightArmRef.current.rotation.x, 0.05, 6.0, dt);
        leftArmRef.current.rotation.z = THREE.MathUtils.damp(leftArmRef.current.rotation.z, -0.15, 6.0, dt);
        rightArmRef.current.rotation.z = THREE.MathUtils.damp(rightArmRef.current.rotation.z, 0.15, 6.0, dt);
        leftLegRef.current.rotation.x = THREE.MathUtils.damp(leftLegRef.current.rotation.x, 0, 6.0, dt);
        rightLegRef.current.rotation.x = THREE.MathUtils.damp(rightLegRef.current.rotation.x, 0, 6.0, dt);
      } else if (isSeated) {
        // Seated: Legs bent 90° at hips
        leftLegRef.current.rotation.x = THREE.MathUtils.damp(leftLegRef.current.rotation.x, -Math.PI / 2, 8.0, dt);
        rightLegRef.current.rotation.x = THREE.MathUtils.damp(rightLegRef.current.rotation.x, -Math.PI / 2, 8.0, dt);
        leftLegRef.current.rotation.y = 0;
        rightLegRef.current.rotation.y = 0;

        // Seated typing reaction vs resting
        const isTyping = activeId === 'desk-pc' || animState === 'sit-typing';
        if (isTyping) {
          // Arms reaching forward onto keyboard with rapid typing motion
          const typingL = Math.sin(clock * 16) * 0.08;
          const typingR = Math.cos(clock * 16) * 0.08;
          leftArmRef.current.rotation.x = -1.15 + typingL;
          rightArmRef.current.rotation.x = -1.15 + typingR;
          leftArmRef.current.rotation.z = -0.18;
          rightArmRef.current.rotation.z = 0.18;
        } else {
          // Resting on thighs / armrests
          leftArmRef.current.rotation.x = THREE.MathUtils.damp(leftArmRef.current.rotation.x, -0.75, 6.0, dt);
          rightArmRef.current.rotation.x = THREE.MathUtils.damp(rightArmRef.current.rotation.x, -0.75, 6.0, dt);
          leftArmRef.current.rotation.z = -0.15;
          rightArmRef.current.rotation.z = 0.15;
        }
      } else if (isMoving) {
        // Active Locomotion (Walk / Run limb swings)
        const freq = isRunning ? 12 : 7.2;
        const armAmp = isRunning ? 1.05 : 0.65;
        const legAmp = isRunning ? 0.95 : 0.58;

        const swing = Math.sin(clock * freq);

        // Arms swing opposite to each other, matching classic Minecraft animation
        leftArmRef.current.rotation.x = -swing * armAmp;
        rightArmRef.current.rotation.x = swing * armAmp;
        leftArmRef.current.rotation.z = 0.04;
        rightArmRef.current.rotation.z = -0.04;

        // Legs swing opposite to arms
        leftLegRef.current.rotation.x = swing * legAmp;
        rightLegRef.current.rotation.x = -swing * legAmp;
        leftLegRef.current.rotation.y = 0;
        rightLegRef.current.rotation.y = 0;
      } else {
        // Idle: Subtle gentle swaying & breathing
        const idleSway = Math.sin(clock * 2) * 0.04;
        leftArmRef.current.rotation.x = THREE.MathUtils.damp(leftArmRef.current.rotation.x, idleSway, 5.0, dt);
        rightArmRef.current.rotation.x = THREE.MathUtils.damp(rightArmRef.current.rotation.x, -idleSway, 5.0, dt);
        leftArmRef.current.rotation.z = THREE.MathUtils.damp(leftArmRef.current.rotation.z, 0.06, 5.0, dt);
        rightArmRef.current.rotation.z = THREE.MathUtils.damp(rightArmRef.current.rotation.z, -0.06, 5.0, dt);

        leftLegRef.current.rotation.x = THREE.MathUtils.damp(leftLegRef.current.rotation.x, 0, 8.0, dt);
        rightLegRef.current.rotation.x = THREE.MathUtils.damp(rightLegRef.current.rotation.x, 0, 8.0, dt);
      }
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* =========================================================================
          1. HEAD & 3D LAYERED HAIR (Pivot at neck: Y = 0.40)
          Standard Minecraft head is 0.44m cube with 3D outer hair shell
         ========================================================================= */}
      <group ref={headGroupRef} position={[0, 0.40, 0]}>
        {/* Main Base Head Cube with Pixel Face Map */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          {/* Materials for [right, left, top, bottom, front, back] */}
          <meshStandardMaterial attach="material-0" color="#E8BE9B" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#E8BE9B" roughness={0.7} />
          <meshStandardMaterial attach="material-2" color="#261811" roughness={0.6} /> {/* Hair top */}
          <meshStandardMaterial attach="material-3" color="#DCB08D" roughness={0.7} /> {/* Neck */}
          <meshStandardMaterial attach="material-4" map={faceTexture} roughness={0.5} /> {/* Face */}
          <meshStandardMaterial attach="material-5" color="#261811" roughness={0.6} /> {/* Hair back */}
        </mesh>

        {/* 3D Layered Hair Shell (Minecraft 1.8+ outer layer: Dark Chestnut Brown #2D1D15) */}
        {/* Hair Cap (Top & Sides) */}
        <mesh position={[0, 0.25, -0.01]} castShadow>
          <boxGeometry args={[0.45, 0.38, 0.45]} />
          <meshStandardMaterial color="#2B1C14" roughness={0.55} />
        </mesh>

        {/* 3D Cool Anime Fringe Bangs (protruding over forehead) */}
        <group position={[0, 0.36, 0.22]}>
          {/* Center fringe lock */}
          <mesh position={[0, -0.05, 0.02]} rotation={[0.08, 0, 0.1]} castShadow>
            <boxGeometry args={[0.14, 0.14, 0.04]} />
            <meshStandardMaterial color="#362319" roughness={0.55} />
          </mesh>
          {/* Left fringe strand */}
          <mesh position={[-0.14, -0.07, 0.02]} rotation={[0.1, 0, -0.15]} castShadow>
            <boxGeometry args={[0.12, 0.16, 0.04]} />
            <meshStandardMaterial color="#2B1C14" roughness={0.55} />
          </mesh>
          {/* Right fringe strand with electric cyan hair clip/streak */}
          <mesh position={[0.14, -0.06, 0.02]} rotation={[0.06, 0, 0.15]} castShadow>
            <boxGeometry args={[0.12, 0.15, 0.04]} />
            <meshStandardMaterial color="#38BDF8" roughness={0.4} emissive="#0284C7" emissiveIntensity={0.2} />
          </mesh>
        </group>

        {/* Headset / Gaming Audio Band (folded neatly around neck/hair) */}
        <mesh position={[0, 0.32, -0.02]}>
          <boxGeometry args={[0.47, 0.04, 0.38]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Headset Ear Cups */}
        <mesh position={[-0.235, 0.20, 0]}>
          <boxGeometry args={[0.04, 0.14, 0.12]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.2} emissive="#38BDF8" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.235, 0.20, 0]}>
          <boxGeometry args={[0.04, 0.14, 0.12]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.2} emissive="#38BDF8" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* =========================================================================
          2. TORSO (Pivot at waist/center: Y = 0.15)
          Minecraft torso is 0.42m W x 0.58m H x 0.22m D
         ========================================================================= */}
      <group ref={torsoGroupRef} position={[0, 0.12, 0]}>
        {/* Main Streetwear Hoodie Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.56, 0.22]} />
          {/* Materials for [right, left, top, bottom, front, back] */}
          <meshStandardMaterial attach="material-0" color="#1E293B" roughness={0.75} />
          <meshStandardMaterial attach="material-1" color="#1E293B" roughness={0.75} />
          <meshStandardMaterial attach="material-2" color="#0F172A" roughness={0.8} /> {/* Shoulders */}
          <meshStandardMaterial attach="material-3" color="#0F172A" roughness={0.8} /> {/* Waist */}
          <meshStandardMaterial attach="material-4" map={hoodieTexture} roughness={0.65} /> {/* Front */}
          <meshStandardMaterial attach="material-5" color="#1E293B" roughness={0.75} /> {/* Back */}
        </mesh>

        {/* 3D Folded Hood Geometry on upper back */}
        <mesh position={[0, 0.20, -0.13]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.36, 0.18, 0.08]} />
          <meshStandardMaterial color="#161E2E" roughness={0.7} />
        </mesh>

        {/* Cyan Contrast Hood Interior Lining Rim */}
        <mesh position={[0, 0.28, -0.09]}>
          <boxGeometry args={[0.32, 0.03, 0.04]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.5} />
        </mesh>
      </group>

      {/* =========================================================================
          3. LEFT ARM (Pivot at left shoulder: X = -0.31, Y = 0.36, Z = 0)
          Minecraft arm is 0.19m W x 0.56m H x 0.20m D
         ========================================================================= */}
      <group ref={leftArmRef} position={[-0.31, 0.36, 0]}>
        {/* Upper Sleeve (Navy Hoodie #1E293B) */}
        <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.38, 0.20]} />
          <meshStandardMaterial color="#1E293B" roughness={0.75} />
        </mesh>

        {/* Forearm & Hand (Warm Skin Tone #E8BE9B) */}
        <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.18, 0.19]} />
          <meshStandardMaterial color="#E8BE9B" roughness={0.7} />
        </mesh>

        {/* Left Wrist Watch / Smart Band in Cyber Cyan */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.195, 0.035, 0.205]} />
          <meshStandardMaterial color="#0284C7" emissive="#38BDF8" emissiveIntensity={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          4. RIGHT ARM (Pivot at right shoulder: X = +0.31, Y = 0.36, Z = 0)
         ========================================================================= */}
      <group ref={rightArmRef} position={[0.31, 0.36, 0]}>
        {/* Upper Sleeve (Navy Hoodie #1E293B) */}
        <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.38, 0.20]} />
          <meshStandardMaterial color="#1E293B" roughness={0.75} />
        </mesh>

        {/* Forearm & Hand (Warm Skin Tone #E8BE9B) */}
        <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.18, 0.19]} />
          <meshStandardMaterial color="#E8BE9B" roughness={0.7} />
        </mesh>

        {/* Right Wristband Accent */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.195, 0.025, 0.205]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
      </group>

      {/* =========================================================================
          5. LEFT LEG (Pivot at left hip: X = -0.11, Y = -0.16, Z = 0)
          Minecraft leg is 0.19m W x 0.54m H x 0.20m D
         ========================================================================= */}
      <group ref={leftLegRef} position={[-0.11, -0.16, 0]}>
        {/* Charcoal Denim Pants (#1E232E) */}
        <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.38, 0.20]} />
          <meshStandardMaterial color="#1E232E" roughness={0.85} />
        </mesh>

        {/* High-Top Sneaker Upper (#0284C7 Electric Cyan Canvas) */}
        <mesh position={[0, -0.42, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.192, 0.14, 0.24]} />
          <meshStandardMaterial color="#0284C7" roughness={0.6} />
        </mesh>

        {/* White Sneaker Rubber Sole & Toe Cap */}
        <mesh position={[0, -0.495, 0.03]} receiveShadow>
          <boxGeometry args={[0.198, 0.035, 0.26]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* =========================================================================
          6. RIGHT LEG (Pivot at right hip: X = +0.11, Y = -0.16, Z = 0)
         ========================================================================= */}
      <group ref={rightLegRef} position={[0.11, -0.16, 0]}>
        {/* Charcoal Denim Pants (#1E232E) */}
        <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.38, 0.20]} />
          <meshStandardMaterial color="#1E232E" roughness={0.85} />
        </mesh>

        {/* High-Top Sneaker Upper (#0284C7 Electric Cyan Canvas) */}
        <mesh position={[0, -0.42, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.192, 0.14, 0.24]} />
          <meshStandardMaterial color="#0284C7" roughness={0.6} />
        </mesh>

        {/* White Sneaker Rubber Sole & Toe Cap */}
        <mesh position={[0, -0.495, 0.03]} receiveShadow>
          <boxGeometry args={[0.198, 0.035, 0.26]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.05} />
        </mesh>
      </group>
    </group>
  );
};
