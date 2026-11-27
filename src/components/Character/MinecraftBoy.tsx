import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useInteractionStore } from '../../store/useInteractionStore';

interface MinecraftBoyProps {
  speedRef?: React.MutableRefObject<number>;
}

/**
 * Original "Rigged Mine Craft Boy" by Riyan on Sketchfab (b03eee79043a464eb5d077f8da142185):
 * - Authentic 1:1 color scheme from the original Sketchfab model:
 *   - Head: Dark chocolate brown hair, blue eyes, open smiling mouth, peach skin
 *   - Torso: Vibrant orange t-shirt with cream collar notch, black waist belt
 *   - Arms: Short orange sleeves with bare peach skin forearms and hands
 *   - Legs: Classic vibrant royal blue jeans
 *   - Shoes: Dark graphite grey shoes
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

  // Exact 1:1 Face texture matching the Sketchfab model
  const faceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Warm peach skin base (#E8BE9B / #E5B892)
    ctx.fillStyle = '#E5B892';
    ctx.fillRect(0, 0, 128, 128);

    // Dark Chocolate Brown Hair fringe across forehead (#3A2418)
    ctx.fillStyle = '#3A2418';
    ctx.fillRect(0, 0, 128, 28);
    // Hair bangs stepped cuts
    ctx.fillRect(0, 28, 36, 12);
    ctx.fillRect(92, 28, 36, 12);
    ctx.fillRect(36, 28, 20, 6);
    ctx.fillRect(72, 28, 20, 6);

    // Sideburns
    ctx.fillRect(0, 40, 16, 24);
    ctx.fillRect(112, 40, 16, 24);

    // Eyes: Classic Minecraft 2-tone Blue Eyes
    // Left eye (from viewer perspective)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(28, 52, 14, 20); // White sclera
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(42, 52, 16, 20); // Royal blue iris
    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(48, 56, 10, 16); // Deep blue pupil

    // Right eye (from viewer perspective)
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(70, 52, 16, 20); // Royal blue iris
    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(70, 56, 10, 16); // Deep blue pupil
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(86, 52, 14, 20); // White sclera

    // Open Smiling Mouth with maroon mouth cavity & tongue accent
    ctx.fillStyle = '#6B1616';
    ctx.fillRect(50, 84, 28, 16); // Dark maroon interior
    ctx.fillStyle = '#991B1B';
    ctx.fillRect(54, 88, 20, 12); // Tongue
    ctx.fillStyle = '#C27C60';
    ctx.fillRect(48, 82, 32, 2);  // Upper lip shadow

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Helper to draw pixel-perfect Minecraft font "HARSH"
  const drawHarshText = (ctx: CanvasRenderingContext2D, startX: number, startY: number, pixelScale = 3) => {
    const letters: Record<string, number[][]> = {
      H: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      A: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      R: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      S: [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
      ],
    };

    const word = ['H', 'A', 'R', 'S', 'H'];
    const letterW = 5 * pixelScale; // 15px
    const spacing = 2 * pixelScale; // 6px
    word.forEach((char, charIdx) => {
      const grid = letters[char];
      const charX = startX + charIdx * (letterW + spacing);
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (grid[row][col] === 1) {
            const px = charX + col * pixelScale;
            const py = startY + row * pixelScale;
            // Black 3D drop shadow
            ctx.fillStyle = '#0F172A';
            ctx.fillRect(px + 2, py + 2, pixelScale, pixelScale);
            // Crisp White letter pixel
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(px, py, pixelScale, pixelScale);
          }
        }
      }
    });
  };

  // Exact 1:1 Torso texture with custom "HARSH" lettering across the chest
  const torsoTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Vibrant Orange T-shirt base (#EA580C)
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(0, 0, 128, 128);

    // Subtle orange pixel grid variations for authentic Minecraft look
    ctx.fillStyle = '#F97316';
    for (let x = 0; x < 128; x += 16) {
      for (let y = 0; y < 112; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }

    // Light Cream / White Rectangular Collar Patch below neck (#FEF3C7)
    ctx.fillStyle = '#FEF3C7';
    ctx.fillRect(48, 0, 32, 24);
    ctx.fillStyle = '#FDE68A';
    ctx.fillRect(52, 4, 24, 16);

    // Black Waist Belt at bottom
    ctx.fillStyle = '#18181B';
    ctx.fillRect(0, 116, 128, 12);
    ctx.fillStyle = '#27272A';
    ctx.fillRect(0, 116, 128, 3);

    // Draw bold pixel-art "HARSH" across the front chest
    drawHarshText(ctx, 14, 52, 3);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Back Torso texture with "HARSH" jersey nameplate on back
  const torsoBackTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Vibrant Orange T-shirt base (#EA580C)
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(0, 0, 128, 128);

    // Subtle orange pixel grid variations
    ctx.fillStyle = '#F97316';
    for (let x = 0; x < 128; x += 16) {
      for (let y = 0; y < 112; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }

    // Back collar seam
    ctx.fillStyle = '#C2410C';
    ctx.fillRect(48, 0, 32, 8);

    // Black Waist Belt at bottom
    ctx.fillStyle = '#18181B';
    ctx.fillRect(0, 116, 128, 12);
    ctx.fillStyle = '#27272A';
    ctx.fillRect(0, 116, 128, 3);

    // Draw bold pixel-art "HARSH" across upper back
    drawHarshText(ctx, 14, 44, 3);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Denim Jeans & Shoe Texture for Legs
  const legFrontTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Royal Blue Denim Base (#1D4ED8)
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(0, 0, 64, 128);

    // Pixelated denim shading
    ctx.fillStyle = '#2563EB';
    for (let x = 0; x < 64; x += 16) {
      for (let y = 0; y < 100; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }

    // Dark grey shoes at bottom
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, 102, 64, 26);
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(0, 120, 64, 8);

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

        const isTyping = activeId === 'desk-pc' || animState === 'sit-typing';
        if (isTyping) {
          const typingL = Math.sin(clock * 16) * 0.08;
          const typingR = Math.cos(clock * 16) * 0.08;
          leftArmRef.current.rotation.x = -1.15 + typingL;
          rightArmRef.current.rotation.x = -1.15 + typingR;
          leftArmRef.current.rotation.z = -0.18;
          rightArmRef.current.rotation.z = 0.18;
        } else {
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

        leftArmRef.current.rotation.x = -swing * armAmp;
        rightArmRef.current.rotation.x = swing * armAmp;
        leftArmRef.current.rotation.z = 0.04;
        rightArmRef.current.rotation.z = -0.04;

        leftLegRef.current.rotation.x = swing * legAmp;
        rightLegRef.current.rotation.x = -swing * legAmp;
        leftLegRef.current.rotation.y = 0;
        rightLegRef.current.rotation.y = 0;
      } else {
        // Idle
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
          1. HEAD & HAIR (Pivot at neck: Y = 0.40)
          Standard Minecraft head: 0.42m cube with chocolate brown hair on top/back/sides
         ========================================================================= */}
      <group ref={headGroupRef} position={[0, 0.40, 0]}>
        {/* Main Head Cube */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          {/* Materials for [right, left, top, bottom, front, back] */}
          {/* Right face: Peach skin + hair sideburn */}
          <meshStandardMaterial attach="material-0" color="#3A2418" roughness={0.7} />
          {/* Left face: Peach skin + hair sideburn */}
          <meshStandardMaterial attach="material-1" color="#3A2418" roughness={0.7} />
          {/* Top face: Solid Chocolate Brown Hair (#3A2418) */}
          <meshStandardMaterial attach="material-2" color="#3A2418" roughness={0.65} />
          {/* Bottom face: Peach neck (#E5B892) */}
          <meshStandardMaterial attach="material-3" color="#E5B892" roughness={0.7} />
          {/* Front face: Pixel Face Map with Blue Eyes & Smiling Mouth */}
          <meshStandardMaterial attach="material-4" map={faceTexture} roughness={0.5} />
          {/* Back face: Solid Chocolate Brown Hair (#3A2418) */}
          <meshStandardMaterial attach="material-5" color="#3A2418" roughness={0.65} />
        </mesh>
      </group>

      {/* =========================================================================
          2. TORSO (Pivot at waist/center: Y = 0.12)
          Original Orange T-shirt (#EA580C) with cream collar notch and black belt
         ========================================================================= */}
      <group ref={torsoGroupRef} position={[0, 0.12, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.56, 0.22]} />
          {/* Materials for [right, left, top, bottom, front, back] */}
          <meshStandardMaterial attach="material-0" color="#EA580C" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#EA580C" roughness={0.7} />
          <meshStandardMaterial attach="material-2" color="#EA580C" roughness={0.7} /> {/* Shoulders */}
          <meshStandardMaterial attach="material-3" color="#18181B" roughness={0.8} /> {/* Waist belt base */}
          <meshStandardMaterial attach="material-4" map={torsoTexture} roughness={0.6} /> {/* Front */}
          <meshStandardMaterial attach="material-5" map={torsoBackTexture} roughness={0.6} /> {/* Back */}
        </mesh>
      </group>

      {/* =========================================================================
          3. LEFT ARM (Pivot at left shoulder: X = -0.31, Y = 0.36, Z = 0)
          Short orange sleeve on top (1/3), bare peach skin forearm & hand on bottom (2/3)
         ========================================================================= */}
      <group ref={leftArmRef} position={[-0.31, 0.36, 0]}>
        {/* Upper Orange Short Sleeve */}
        <mesh position={[0, -0.09, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.18, 0.20]} />
          <meshStandardMaterial color="#EA580C" roughness={0.7} />
        </mesh>

        {/* Bare Peach Skin Forearm & Hand */}
        <mesh position={[0, -0.37, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.188, 0.38, 0.198]} />
          <meshStandardMaterial color="#E5B892" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          4. RIGHT ARM (Pivot at right shoulder: X = +0.31, Y = 0.36, Z = 0)
          Short orange sleeve on top (1/3), bare peach skin forearm & hand on bottom (2/3)
         ========================================================================= */}
      <group ref={rightArmRef} position={[0.31, 0.36, 0]}>
        {/* Upper Orange Short Sleeve */}
        <mesh position={[0, -0.09, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.18, 0.20]} />
          <meshStandardMaterial color="#EA580C" roughness={0.7} />
        </mesh>

        {/* Bare Peach Skin Forearm & Hand */}
        <mesh position={[0, -0.37, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.188, 0.38, 0.198]} />
          <meshStandardMaterial color="#E5B892" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          5. LEFT LEG (Pivot at left hip: X = -0.11, Y = -0.16, Z = 0)
          Vibrant Royal Blue Jeans (#1D4ED8) with dark grey shoes (#374151)
         ========================================================================= */}
      <group ref={leftLegRef} position={[-0.11, -0.16, 0]}>
        {/* Main Leg Mesh */}
        <mesh position={[0, -0.27, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.54, 0.20]} />
          {/* Materials for [right, left, top, bottom, front, back] */}
          <meshStandardMaterial attach="material-0" color="#1D4ED8" roughness={0.8} />
          <meshStandardMaterial attach="material-1" color="#1D4ED8" roughness={0.8} />
          <meshStandardMaterial attach="material-2" color="#1D4ED8" roughness={0.8} />
          <meshStandardMaterial attach="material-3" color="#1F2937" roughness={0.7} /> {/* Shoe sole */}
          <meshStandardMaterial attach="material-4" map={legFrontTexture} roughness={0.7} /> {/* Front */}
          <meshStandardMaterial attach="material-5" color="#1D4ED8" roughness={0.8} /> {/* Back */}
        </mesh>
      </group>

      {/* =========================================================================
          6. RIGHT LEG (Pivot at right hip: X = +0.11, Y = -0.16, Z = 0)
          Vibrant Royal Blue Jeans (#1D4ED8) with dark grey shoes (#374151)
         ========================================================================= */}
      <group ref={rightLegRef} position={[0.11, -0.16, 0]}>
        {/* Main Leg Mesh */}
        <mesh position={[0, -0.27, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.54, 0.20]} />
          {/* Materials for [right, left, top, bottom, front, back] */}
          <meshStandardMaterial attach="material-0" color="#1D4ED8" roughness={0.8} />
          <meshStandardMaterial attach="material-1" color="#1D4ED8" roughness={0.8} />
          <meshStandardMaterial attach="material-2" color="#1D4ED8" roughness={0.8} />
          <meshStandardMaterial attach="material-3" color="#1F2937" roughness={0.7} /> {/* Shoe sole */}
          <meshStandardMaterial attach="material-4" map={legFrontTexture} roughness={0.7} /> {/* Front */}
          <meshStandardMaterial attach="material-5" color="#1D4ED8" roughness={0.8} /> {/* Back */}
        </mesh>
      </group>
    </group>
  );
};
