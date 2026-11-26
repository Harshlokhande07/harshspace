import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { AudioManager } from '../../utils/audioManager';

/**
 * Photorealistic Split AC
 * Matching Sketchfab 3D Model "AC" by giga (5394c50890d94351abf4468e979f11b0)
 *
 * Location: South Wall between Door and Bookshelf:
 * - Split AC unit: position=[-0.10, 2.28, 2.52], rotation=[0, Math.PI, 0]
 *
 * Features:
 * 1. Aerodynamic white split AC casing with chamfered faceplate & dual horizontal accent grooves.
 * 2. Recessed airflow vent with dynamic motor-driven swing flap louver.
 * 3. Translucent hidden digital LED display on AC front (shows dynamic temperature e.g. 22°C).
 * 4. Interactive power toggle & dynamic room temperature simulation (cools when ON, warms when OFF).
 * 5. Subtle cold airflow vapor ribbons when cooling.
 */
export const AirConditioner: React.FC = () => {
  const acOn = useLivingRoomStore((s) => s.acOn);
  const acTemp = useLivingRoomStore((s) => s.acTemp);
  const roomTemp = useLivingRoomStore((s) => s.roomTemp);
  const toggleAc = useLivingRoomStore((s) => s.toggleAc);
  const setRoomTemp = useLivingRoomStore((s) => s.setRoomTemp);

  // References for zero-allocation animation
  const flapRef = useRef<THREE.Group>(null);
  const displayMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const vaporGroupRef = useRef<THREE.Group>(null);

  // 1. AC Unit Front Digital Display Texture
  const acDisplayCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    return canvas;
  }, []);

  const acDisplayTexture = useMemo(() => {
    const texture = new THREE.CanvasTexture(acDisplayCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [acDisplayCanvas]);

  // Update AC Front Display Texture
  useEffect(() => {
    const ctx = acDisplayCanvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 256, 128);

    if (acOn) {
      // Background subtle translucent dark panel
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.roundRect(10, 10, 236, 108, 16);
      ctx.fill();

      // Glowing Cyan LED Digits
      ctx.fillStyle = '#38BDF8';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 12;
      ctx.font = 'bold 54px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${acTemp}°C`, 128, 64);

      // Power indicator dot
      ctx.fillStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(218, 32, 6, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Dim standby dot
      ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.beginPath();
      ctx.arc(218, 32, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    acDisplayTexture.needsUpdate = true;
  }, [acOn, acTemp, acDisplayCanvas, acDisplayTexture]);

  // Frame animation loop: louver motion, cooling mist, and realistic temperature drift
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const time = state.clock.elapsedTime;

    // 1. Animate AC louver flap
    if (flapRef.current) {
      // Louver opens downward ~0.50 rad when ON, closes flush (0 rad) when OFF
      const targetAngle = acOn ? 0.48 + Math.sin(time * 1.5) * 0.04 : 0.02;
      flapRef.current.rotation.x = THREE.MathUtils.damp(
        flapRef.current.rotation.x,
        targetAngle,
        6,
        dt
      );
    }

    // 2. Animate subtle cooling vapor ribbons
    if (vaporGroupRef.current) {
      const vaporTargetY = acOn ? 1.0 : 0.0;
      vaporGroupRef.current.position.y = THREE.MathUtils.damp(
        vaporGroupRef.current.position.y,
        vaporTargetY,
        4,
        dt
      );
    }

    // 3. Smooth Dynamic Room Temperature Drift
    const targetRoomTemp = acOn ? acTemp : 26.5; // Warms to 26.5°C when AC is off
    if (Math.abs(roomTemp - targetRoomTemp) > 0.05) {
      // Gradual drift: 0.15°C per second
      const drift = THREE.MathUtils.damp(roomTemp, targetRoomTemp, 0.08, dt);
      if (Math.abs(drift - roomTemp) > 0.02) {
        setRoomTemp(drift);
      }
    }
  });

  return (
    <>
      {/* =========================================================================
          AIR CONDITIONER SPLIT UNIT (Giga Sketchfab 3D Model replica)
          Mounted on the South Wall at X = -0.10, Y = 2.28, Z = 2.52
          Facing into the room: rotation=[0, Math.PI, 0]
         ========================================================================= */}
      <group
        position={[-0.10, 2.28, 2.52]}
        rotation={[0, Math.PI, 0]}
        onClick={(e) => {
          e.stopPropagation();
          AudioManager.playSound('switch');
          toggleAc();
        }}
      >
        {/* Main Aerodynamic Outer Casing in Smooth White (#F8FAFC) */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.32, 0.22]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.28} metalness={0.05} />
        </mesh>

        {/* Top Chamfered Bezel */}
        <mesh position={[0, 0.155, 0.02]}>
          <boxGeometry args={[1.04, 0.03, 0.19]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.3} metalness={0.05} />
        </mesh>

        {/* Curved Front Aerodynamic Cover Plate */}
        <mesh position={[0, 0.02, 0.112]} castShadow>
          <boxGeometry args={[1.03, 0.26, 0.015]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} metalness={0.08} />
        </mesh>

        {/* 1st Top Accent Groove (Matching giga's Sketchfab AC model) */}
        <mesh position={[0, 0.095, 0.121]}>
          <boxGeometry args={[0.92, 0.012, 0.005]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* 2nd Secondary Horizontal Accent Groove on Right Side */}
        <mesh position={[0.22, 0.035, 0.121]}>
          <boxGeometry args={[0.34, 0.01, 0.005]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Recessed Dark Bottom Airflow Vent Cavity */}
        <mesh position={[0, -0.105, 0.04]}>
          <boxGeometry args={[0.98, 0.085, 0.16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.7} />
        </mesh>

        {/* Interior Air Grille Fins */}
        {[-0.36, -0.18, 0, 0.18, 0.36].map((gx, idx) => (
          <mesh key={idx} position={[gx, -0.105, 0.06]}>
            <boxGeometry args={[0.01, 0.07, 0.10]} />
            <meshStandardMaterial color="#1E293B" roughness={0.6} />
          </mesh>
        ))}

        {/* Motor-Driven Airflow Louver Swing Flap */}
        <group ref={flapRef} position={[0, -0.095, 0.10]}>
          <mesh position={[0, -0.02, 0.015]} castShadow>
            <boxGeometry args={[0.97, 0.038, 0.012]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.2} />
          </mesh>
        </group>

        {/* Hidden Digital LED Temperature Display on Front Faceplate */}
        <mesh position={[0, 0.035, 0.122]}>
          <planeGeometry args={[0.24, 0.12]} />
          <meshBasicMaterial
            ref={displayMaterialRef}
            map={acDisplayTexture}
            transparent
            opacity={acOn ? 0.95 : 0.4}
          />
        </mesh>

        {/* Subtle Cold Air Breeze Mist when Cooling */}
        {acOn && (
          <group ref={vaporGroupRef} position={[0, -0.14, 0.16]}>
            {[-0.32, -0.16, 0, 0.16, 0.32].map((vx, i) => (
              <mesh key={i} position={[vx, -0.08 - i * 0.03, 0.06 + (i % 2) * 0.04]} rotation={[0.45, 0, 0]}>
                <planeGeometry args={[0.12, 0.24]} />
                <meshBasicMaterial
                  color="#BAE6FD"
                  transparent
                  opacity={0.14}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </>
  );
};
