import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { getResolvedTimeMode } from '../Lighting/DayNightController';

const _cSky = new THREE.Color();
const _cWindowLit = new THREE.Color();
const _cMist = new THREE.Color();
const _cBuilding = new THREE.Color();

interface BuildingData {
  pos: [number, number, number]; // [Z offset, Y height, X distance]
  size: [number, number, number]; // [width, height, depth]
  hasSpire?: boolean;
  windowRows: number;
}

/**
 * Photorealistic Rainy Modern Tokyo High-rise Exterior Environment (Phase 3 Polish)
 * Located beyond the West window (X < -2.8m).
 * Features:
 * - Multi-tiered contemporary Tokyo skyscrapers, residential towers & spires
 * - Luminous window grids (warm interior lights, cool office cyan, amber suites)
 * - Pulsing rooftop aircraft beacon lights
 * - Exterior falling rain streak particle system outside window
 * - Distant rain mist planes & overcast Tokyo sky backdrop
 * - Reactive Day / Evening / Night atmospheric lighting
 */
export const OutdoorBackdrop: React.FC = () => {
  const skyMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const mistMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const litWindowMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const beaconRef = useRef<THREE.MeshBasicMaterial>(null);
  const rainPointsRef = useRef<THREE.Points>(null);

  // Shared material for high-rise buildings
  const buildingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#64748B',
        roughness: 0.35,
        metalness: 0.6,
      }),
    []
  );

  // Layered architectural high-rise data
  const buildings: BuildingData[] = useMemo(
    () => [
      // Fore-ground modern glass towers (X = -4.5 to -6.5)
      { pos: [-1.2, 2.2, -4.5], size: [1.4, 5.2, 1.4], windowRows: 8 },
      { pos: [0.3, 1.8, -5.2], size: [1.6, 4.4, 1.5], windowRows: 6 },
      { pos: [1.8, 2.6, -4.8], size: [1.3, 6.0, 1.3], hasSpire: true, windowRows: 9 },

      // Mid-ground major Tokyo corporate skyscrapers (X = -7.0 to -9.5)
      { pos: [-2.6, 3.6, -7.2], size: [2.2, 8.0, 2.0], hasSpire: true, windowRows: 12 },
      { pos: [-0.6, 4.4, -8.5], size: [2.5, 9.8, 2.2], windowRows: 14 },
      { pos: [1.2, 3.8, -7.8], size: [2.0, 8.5, 1.8], windowRows: 11 },
      { pos: [3.2, 3.0, -8.0], size: [1.8, 7.0, 1.8], windowRows: 10 },

      // Far-ground Tokyo skyline silhouette & mega-towers (X = -11.0 to -14.0)
      { pos: [-3.8, 5.2, -12.0], size: [3.0, 12.0, 2.8], windowRows: 16 },
      { pos: [-1.8, 6.5, -13.5], size: [3.4, 15.0, 3.2], hasSpire: true, windowRows: 18 },
      { pos: [0.8, 5.8, -12.5], size: [3.2, 13.5, 3.0], windowRows: 15 },
      { pos: [3.0, 4.8, -11.5], size: [2.8, 11.0, 2.6], windowRows: 14 },
    ],
    []
  );

  // Exterior Tokyo rain streaks (lightweight, zero memory allocations in useFrame)
  const { rainPositions, rainVelocities } = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Window bounds: X from -3.0 to -4.2, Y from 0.4 to 3.2, Z from -2.0 to 0.8
      positions[i * 3 + 0] = -3.0 - Math.random() * 1.4; // X outside window
      positions[i * 3 + 1] = 0.4 + Math.random() * 2.8;  // Y height
      positions[i * 3 + 2] = -2.0 + Math.random() * 2.8; // Z span
      velocities[i] = 4.5 + Math.random() * 3.5;
    }
    return { rainPositions: positions, rainVelocities: velocities };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const timeMode = useLivingRoomStore.getState().timeMode;
    const resolved = getResolvedTimeMode(timeMode);
    const time = state.clock.getElapsedTime();

    // 1. Sky & Overcast Colors
    const skyHex =
      resolved === 'day'
        ? '#E2E8F0' // Bright rainy overcast Tokyo daylight
        : resolved === 'evening'
          ? '#451a03' // Rainy amber Tokyo twilight
          : '#050814'; // Moody dark Tokyo night

    if (skyMatRef.current) {
      _cSky.set(skyHex);
      skyMatRef.current.color.lerp(_cSky, dt * 2.5);
    }

    // 1b. Skyscraper Facades Color
    const bldgHex =
      resolved === 'day'
        ? '#64748B' // Sleek modern glass/steel towers in daylight
        : resolved === 'evening'
          ? '#3D2D24' // Twilight silhouette
          : '#111625'; // Dark night skyscraper

    _cBuilding.set(bldgHex);
    buildingMat.color.lerp(_cBuilding, dt * 2.5);

    // 2. High-Rise Window Lights
    const windowColor =
      resolved === 'day'
        ? '#fef08a' // Subtle warm office interior lights
        : resolved === 'evening'
          ? '#fed7aa' // Amber evening glow
          : '#fde047'; // Bright Tokyo high-rise windows

    const windowIntensity =
      resolved === 'day' ? 0.6 : resolved === 'evening' ? 1.4 : 2.2;

    if (litWindowMatRef.current) {
      _cWindowLit.set(windowColor);
      litWindowMatRef.current.emissive.lerp(_cWindowLit, dt * 2.5);
      litWindowMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        litWindowMatRef.current.emissiveIntensity,
        windowIntensity,
        3.0,
        dt
      );
    }

    // 3. Rooftop Aviation Beacon Blinking
    if (beaconRef.current) {
      const pulse = Math.sin(time * 3.5) > 0.4 ? 1.0 : 0.15;
      beaconRef.current.color.setRGB(pulse, 0.08 * pulse, 0.08 * pulse);
    }

    // 4. Rainy Mist Layer
    if (mistMatRef.current) {
      const mistColor =
        resolved === 'day'
          ? '#F1F5F9'
          : resolved === 'evening'
            ? '#7c2d12'
            : '#0f172a';
      _cMist.set(mistColor);
      mistMatRef.current.color.lerp(_cMist, dt * 2.0);
    }

    // 5. Falling rain streak animation outside window
    if (rainPointsRef.current) {
      const posAttr = rainPointsRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      const count = arr.length / 3;

      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] -= rainVelocities[i] * dt;
        // Wind slant in Z
        arr[i * 3 + 2] -= 0.6 * dt;

        // Reset if fallen below sill
        if (arr[i * 3 + 1] < 0.4) {
          arr[i * 3 + 1] = 3.2;
          arr[i * 3 + 2] = -2.0 + Math.random() * 2.8;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Distant Overcast Tokyo Sky Backdrop Cylinder (Radius 16m) */}
      <mesh position={[-14.0, 4.0, -0.6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[26, 18]} />
        <meshBasicMaterial ref={skyMatRef} color="#050814" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Rainy Tokyo Skyline Skyscrapers */}
      {buildings.map((b, idx) => {
        const [bz, by, bx] = b.pos;
        const [w, h, d] = b.size;

        return (
          <group key={idx} position={[bx, by - h / 2 + 0.2, bz]}>
            {/* Main Skyscraper Tower Body */}
            <mesh
              material={buildingMat}
              castShadow
              receiveShadow
              position={[0, h / 2, 0]}
            >
              <boxGeometry args={[d, h, w]} />
            </mesh>

            {/* Lit Window Bands / Vertical Glass Curtain Strips */}
            {Array.from({ length: Math.min(b.windowRows, 10) }).map((_, rIdx) => {
              const yPos = 0.8 + (rIdx * (h - 1.2)) / b.windowRows;
              return (
                <mesh
                  key={rIdx}
                  position={[d / 2 + 0.01, yPos, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                >
                  <planeGeometry args={[w * 0.82, 0.12]} />
                  <meshStandardMaterial
                    ref={litWindowMatRef}
                    color="#fde047"
                    emissive="#fde047"
                    emissiveIntensity={1.8}
                    roughness={0.2}
                  />
                </mesh>
              );
            })}

            {/* Rooftop Plant Mechanical Penthouse */}
            <mesh position={[0, h + 0.2, 0]}>
              <boxGeometry args={[d * 0.65, 0.4, w * 0.65]} />
              <meshStandardMaterial color="#05070a" roughness={0.7} metalness={0.5} />
            </mesh>

            {/* Communications Spire / Antenna with Blinking Red Warning Beacon */}
            {b.hasSpire && (
              <group position={[0, h + 0.4, 0]}>
                <mesh position={[0, 0.6, 0]}>
                  <cylinderGeometry args={[0.02, 0.06, 1.2, 6]} />
                  <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.8} />
                </mesh>
                {/* Red Beacon */}
                <mesh position={[0, 1.22, 0]}>
                  <sphereGeometry args={[0.06, 8, 8]} />
                  <meshBasicMaterial ref={beaconRef} color="#ef4444" />
                </mesh>
              </group>
            )}
          </group>
        );
      })}

      {/* 3. Tokyo Tower / Communications Spire in Mid-Distance */}
      <group position={[-9.2, 0, 1.6]}>
        {/* Lattice Spire Pyramidal Base */}
        <mesh position={[0, 3.5, 0]}>
          <cylinderGeometry args={[0.2, 0.9, 7.0, 4]} />
          <meshStandardMaterial
            color="#dc2626" // Tokyo Tower vermilion red
            roughness={0.4}
            metalness={0.6}
            wireframe={true}
          />
        </mesh>
        {/* Observation Deck Pod */}
        <mesh position={[0, 4.8, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.6, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
            roughness={0.3}
          />
        </mesh>
        {/* Upper Needle */}
        <mesh position={[0, 7.2, 0]}>
          <cylinderGeometry args={[0.03, 0.15, 4.2, 6]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Top Warning Light */}
        <mesh position={[0, 9.35, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* 4. Atmospheric Rainy Mist / Fog Depth Planes */}
      <mesh position={[-5.8, 2.5, -0.6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial
          ref={mistMatRef}
          color="#0f172a"
          transparent={true}
          opacity={0.22}
          roughness={1.0}
        />
      </mesh>
      <mesh position={[-9.8, 3.5, -0.6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial
          ref={mistMatRef}
          color="#0f172a"
          transparent={true}
          opacity={0.3}
          roughness={1.0}
        />
      </mesh>

      {/* 5. Exterior Window Rain Streak Particles */}
      <points ref={rainPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rainPositions.length / 3}
            array={rainPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#cbd5e1"
          transparent={true}
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
