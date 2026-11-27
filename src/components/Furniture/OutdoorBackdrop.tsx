import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { getResolvedTimeMode } from '../Lighting/DayNightController';

const _cSkyTop = new THREE.Color();
const _cSkyMid = new THREE.Color();
const _cSkyHorizon = new THREE.Color();
const _cCelestial = new THREE.Color();
const _cMist = new THREE.Color();
const _cMountainFar = new THREE.Color();
const _cMountainMid = new THREE.Color();
const _cHill = new THREE.Color();
const _cSnow = new THREE.Color();
const _cLake = new THREE.Color();
const _cCloud = new THREE.Color();

interface PeakData {
  z: number;
  x: number;
  radius: number;
  height: number;
  rotY: number;
}

interface PineTreeData {
  x: number;
  y: number;
  z: number;
  scale: number;
}

interface CloudData {
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  speed: number;
}

/**
 * Scenic Alpine Mountain Vista Exterior Environment
 * Located beyond the West picture window (X < -2.8m).
 *
 * Features:
 * - Dynamic sky gradient backdrop (crisp alpine daylight, golden-hour sunset, starry moonlit night)
 * - Sun / Moon celestial orb with soft atmospheric glow halo
 * - 3-tier parallax mountain ranges:
 *   1. Far-ground jagged snow-capped alpine peaks
 *   2. Mid-ground pine-forested & rocky ridges
 *   3. Fore-ground rolling emerald foothills with 3D pine/evergreen trees
 * - Tranquil reflective alpine valley lake
 * - Drifting soft volumetric clouds & low valley mist
 * - Gentle floating atmospheric breeze motes / evening fireflies
 */
export const OutdoorBackdrop: React.FC = () => {
  const skyUniformsRef = useRef({
    uTopColor: { value: new THREE.Color('#0284C7') },
    uMidColor: { value: new THREE.Color('#7DD3FC') },
    uHorizonColor: { value: new THREE.Color('#FEF3C7') },
  });

  const celestialMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const starsMatRef = useRef<THREE.PointsMaterial>(null);
  const lakeMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const mistMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const motesMatRef = useRef<THREE.PointsMaterial>(null);

  const cloudGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const motesPointsRef = useRef<THREE.Points>(null);

  // Shared reactive materials for multi-instance mountain tiers & clouds
  const { farMountainMat, midMountainMat, hillMat, snowMat, cloudMat } = useMemo(
    () => ({
      farMountainMat: new THREE.MeshStandardMaterial({
        color: '#64748B',
        roughness: 0.92,
        flatShading: true,
      }),
      midMountainMat: new THREE.MeshStandardMaterial({
        color: '#365E53',
        roughness: 0.95,
        flatShading: true,
      }),
      hillMat: new THREE.MeshStandardMaterial({
        color: '#2F684E',
        roughness: 0.95,
        flatShading: true,
      }),
      snowMat: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        roughness: 0.65,
        flatShading: true,
      }),
      cloudMat: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        transparent: true,
        opacity: 0.85,
        roughness: 1.0,
      }),
    }),
    []
  );

  // Custom vertical gradient shader for realistic atmospheric sky
  const skyShaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: skyUniformsRef.current,
        side: THREE.DoubleSide,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uTopColor;
          uniform vec3 uMidColor;
          uniform vec3 uHorizonColor;
          varying vec2 vUv;
          void main() {
            float h = clamp(vUv.y, 0.0, 1.0);
            vec3 col = mix(uHorizonColor, uMidColor, smoothstep(0.08, 0.48, h));
            col = mix(col, uTopColor, smoothstep(0.45, 0.95, h));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    []
  );

  // Far-ground towering snow-capped alpine peaks (X = -15.5 to -13.2)
  const farPeaks: PeakData[] = useMemo(
    () => [
      { z: -6.8, x: -14.8, radius: 3.4, height: 6.4, rotY: 0.4 },
      { z: -3.6, x: -15.4, radius: 4.0, height: 7.8, rotY: 1.1 },
      { z: -0.5, x: -14.5, radius: 3.6, height: 7.2, rotY: 2.2 }, // Center hero peak
      { z: 2.4, x: -15.2, radius: 3.8, height: 6.9, rotY: 0.9 },
      { z: 5.4, x: -14.4, radius: 3.3, height: 5.8, rotY: 1.7 },
    ],
    []
  );

  // Mid-ground rocky & forested ridges (X = -11.2 to -9.2)
  const midPeaks: PeakData[] = useMemo(
    () => [
      { z: -5.4, x: -10.4, radius: 3.0, height: 4.1, rotY: 0.7 },
      { z: -2.2, x: -11.0, radius: 3.1, height: 4.4, rotY: 1.9 },
      { z: 0.8, x: -10.2, radius: 2.9, height: 3.9, rotY: 0.3 },
      { z: 3.8, x: -10.8, radius: 3.2, height: 4.2, rotY: 2.5 },
    ],
    []
  );

  // Foreground rolling hills (X = -6.6 to -5.0)
  const foreHills: PeakData[] = useMemo(
    () => [
      { z: -3.2, x: -5.8, radius: 2.6, height: 1.65, rotY: 0.2 },
      { z: 1.9, x: -5.6, radius: 2.5, height: 1.55, rotY: 1.4 },
      { z: -0.7, x: -6.8, radius: 2.8, height: 1.25, rotY: 0.8 },
    ],
    []
  );

  // Pine / Evergreen trees framing the valley view
  const pineTrees: PineTreeData[] = useMemo(
    () => [
      { x: -4.4, y: 0.15, z: -2.5, scale: 1.05 },
      { x: -4.9, y: 0.20, z: -2.0, scale: 0.85 },
      { x: -5.2, y: 0.35, z: -3.0, scale: 1.15 },
      { x: -4.6, y: 0.10, z: 1.2, scale: 0.95 },
      { x: -5.1, y: 0.28, z: 1.7, scale: 1.1 },
      { x: -4.3, y: 0.05, z: 0.65, scale: 0.75 },
      { x: -5.5, y: 0.30, z: -1.4, scale: 0.8 },
      { x: -5.9, y: 0.35, z: 0.2, scale: 0.9 },
    ],
    []
  );

  // Soft drifting alpine clouds
  const clouds: CloudData[] = useMemo(
    () => [
      { x: -12.5, y: 5.2, z: -4.5, scaleX: 1.6, scaleY: 0.55, speed: 0.08 },
      { x: -13.2, y: 4.7, z: 0.2, scaleX: 1.9, scaleY: 0.6, speed: 0.06 },
      { x: -11.8, y: 5.6, z: 3.8, scaleX: 1.4, scaleY: 0.5, speed: 0.09 },
    ],
    []
  );

  // Starfield positions for night sky
  const starPositions = useMemo(() => {
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = -17.2 + Math.random() * 0.4;
      positions[i * 3 + 1] = 2.6 + Math.random() * 6.5;
      positions[i * 3 + 2] = -9.5 + Math.random() * 18.0;
    }
    return positions;
  }, []);

  // Gentle floating breeze motes / evening fireflies outside window
  const { motePositions, moteSpeeds } = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = -3.3 - Math.random() * 2.2;
      positions[i * 3 + 1] = 0.5 + Math.random() * 2.2;
      positions[i * 3 + 2] = -2.2 + Math.random() * 3.2;
      speeds[i] = 0.2 + Math.random() * 0.4;
    }
    return { motePositions: positions, moteSpeeds: speeds };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const timeMode = useLivingRoomStore.getState().timeMode;
    const resolved = getResolvedTimeMode(timeMode);
    const t = state.clock.getElapsedTime();

    // 1. Sky Gradient Colors
    const topHex =
      resolved === 'day'
        ? '#0284C7' // Crisp alpine cobalt sky
        : resolved === 'evening'
          ? '#312E81' // Deep twilight indigo
          : '#020617'; // Deep starry night

    const midHex =
      resolved === 'day'
        ? '#7DD3FC' // Clear sky blue
        : resolved === 'evening'
          ? '#DB2777' // Rose-magenta sunset band
          : '#0F172A'; // Midnight slate

    const horizonHex =
      resolved === 'day'
        ? '#FEF3C7' // Warm sunlit alpine haze
        : resolved === 'evening'
          ? '#FB923C' // Glowing golden-orange sunset
          : '#1E1B4B'; // Deep violet horizon

    _cSkyTop.set(topHex);
    _cSkyMid.set(midHex);
    _cSkyHorizon.set(horizonHex);
    skyUniformsRef.current.uTopColor.value.lerp(_cSkyTop, dt * 2.5);
    skyUniformsRef.current.uMidColor.value.lerp(_cSkyMid, dt * 2.5);
    skyUniformsRef.current.uHorizonColor.value.lerp(_cSkyHorizon, dt * 2.5);

    // 2. Sun / Moon Color & Star Opacity
    const celestialHex =
      resolved === 'day'
        ? '#FEF9C3'
        : resolved === 'evening'
          ? '#FDBA74'
          : '#F8FAFC';

    if (celestialMatRef.current) {
      _cCelestial.set(celestialHex);
      celestialMatRef.current.color.lerp(_cCelestial, dt * 2.5);
    }
    if (haloMatRef.current) {
      haloMatRef.current.color.lerp(_cCelestial, dt * 2.5);
      haloMatRef.current.opacity = THREE.MathUtils.damp(
        haloMatRef.current.opacity,
        resolved === 'evening' ? 0.35 : resolved === 'day' ? 0.25 : 0.18,
        2.5,
        dt
      );
    }
    if (starsMatRef.current) {
      starsMatRef.current.opacity = THREE.MathUtils.damp(
        starsMatRef.current.opacity,
        resolved === 'night' ? 0.9 : resolved === 'evening' ? 0.25 : 0.0,
        2.5,
        dt
      );
    }

    // 3. Mountain, Hill, Snow & Lake Colors
    _cMountainFar.set(
      resolved === 'day' ? '#64748B' : resolved === 'evening' ? '#5B4563' : '#1E293B'
    );
    _cMountainMid.set(
      resolved === 'day' ? '#365E53' : resolved === 'evening' ? '#3B2F4A' : '#111827'
    );
    _cHill.set(
      resolved === 'day' ? '#2F684E' : resolved === 'evening' ? '#27403B' : '#0B1D19'
    );
    _cSnow.set(
      resolved === 'day' ? '#F8FAFC' : resolved === 'evening' ? '#FED7AA' : '#94A3B8'
    );
    _cLake.set(
      resolved === 'day' ? '#38BDF8' : resolved === 'evening' ? '#F472B6' : '#1E293B'
    );

    farMountainMat.color.lerp(_cMountainFar, dt * 2.5);
    midMountainMat.color.lerp(_cMountainMid, dt * 2.5);
    hillMat.color.lerp(_cHill, dt * 2.5);
    snowMat.color.lerp(_cSnow, dt * 2.5);
    if (lakeMatRef.current) lakeMatRef.current.color.lerp(_cLake, dt * 2.5);

    // 4. Valley Mist & Clouds
    if (mistMatRef.current) {
      _cMist.set(
        resolved === 'day' ? '#F1F5F9' : resolved === 'evening' ? '#FDBA74' : '#334155'
      );
      mistMatRef.current.color.lerp(_cMist, dt * 2.5);
    }
    _cCloud.set(
      resolved === 'day' ? '#FFFFFF' : resolved === 'evening' ? '#FBCFE8' : '#334155'
    );
    cloudMat.color.lerp(_cCloud, dt * 2.5);
    cloudMat.opacity = THREE.MathUtils.damp(
      cloudMat.opacity,
      resolved === 'night' ? 0.35 : 0.85,
      2.5,
      dt
    );

    // Drift clouds gently along Z
    for (let i = 0; i < clouds.length; i++) {
      const grp = cloudGroupRefs.current[i];
      if (grp) {
        grp.position.z += clouds[i].speed * dt;
        if (grp.position.z > 7.5) {
          grp.position.z = -7.5;
        }
      }
    }

    // 5. Gentle floating motes / fireflies
    if (motesMatRef.current) {
      motesMatRef.current.opacity = THREE.MathUtils.damp(
        motesMatRef.current.opacity,
        resolved === 'day' ? 0.35 : 0.75,
        2.5,
        dt
      );
    }
    if (motesPointsRef.current) {
      const posAttr = motesPointsRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      const count = arr.length / 3;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(t * 1.2 + i) * 0.08 * dt;
        arr[i * 3 + 2] += moteSpeeds[i] * dt * 0.3;
        if (arr[i * 3 + 2] > 1.2) {
          arr[i * 3 + 2] = -2.2;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Dynamic Gradient Sky Backdrop */}
      <mesh position={[-18.0, 4.2, -0.6]} rotation={[0, Math.PI / 2, 0]} material={skyShaderMaterial}>
        <planeGeometry args={[28, 16]} />
      </mesh>

      {/* 2. Starfield (visible at Evening/Night) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={starsMatRef}
          size={0.08}
          color="#F8FAFC"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </points>

      {/* 3. Celestial Sun / Moon Orb & Halo */}
      <group position={[-16.8, 4.3, -2.3]}>
        <mesh>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshBasicMaterial ref={celestialMatRef} color="#FEF9C3" />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[1.3, 32]} />
          <meshBasicMaterial
            ref={haloMatRef}
            color="#FEF9C3"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 4. Far-Ground Majestic Snow-Capped Alpine Peaks */}
      {farPeaks.map((peak, idx) => (
        <group key={`far-${idx}`} position={[peak.x, -0.2, peak.z]} rotation={[0, peak.rotY, 0]}>
          {/* Mountain Rocky Base */}
          <mesh position={[0, peak.height / 2, 0]} material={farMountainMat}>
            <coneGeometry args={[peak.radius, peak.height, 7]} />
          </mesh>
          {/* Crisp Snow Cap Peak (Upper 42%) */}
          <mesh position={[0, peak.height * 0.79, 0]} material={snowMat}>
            <coneGeometry args={[peak.radius * 0.425, peak.height * 0.425, 7]} />
          </mesh>
        </group>
      ))}

      {/* 5. Mid-Ground Forested & Rocky Ridges */}
      {midPeaks.map((peak, idx) => (
        <group key={`mid-${idx}`} position={[peak.x, -0.2, peak.z]} rotation={[0, peak.rotY, 0]}>
          <mesh position={[0, peak.height / 2, 0]} material={midMountainMat}>
            <coneGeometry args={[peak.radius, peak.height, 6]} />
          </mesh>
        </group>
      ))}

      {/* 6. Alpine Valley Floor & Tranquil Reflective Lake */}
      <mesh position={[-8.0, 0.02, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 16]} />
        <meshStandardMaterial
          ref={lakeMatRef}
          color="#38BDF8"
          roughness={0.12}
          metalness={0.45}
        />
      </mesh>

      {/* 7. Foreground Rolling Emerald Foothills */}
      {foreHills.map((hill, idx) => (
        <group key={`hill-${idx}`} position={[hill.x, -0.2, hill.z]} rotation={[0, hill.rotY, 0]}>
          <mesh position={[0, hill.height / 2, 0]} material={hillMat}>
            <coneGeometry args={[hill.radius, hill.height, 8]} />
          </mesh>
        </group>
      ))}

      {/* 8. Foreground Alpine Pine / Evergreen Trees */}
      {pineTrees.map((tree, idx) => (
        <group key={`tree-${idx}`} position={[tree.x, tree.y, tree.z]} scale={tree.scale}>
          {/* Trunk */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.4, 6]} />
            <meshStandardMaterial color="#4A3525" roughness={0.9} />
          </mesh>
          {/* Tiered Pine Foliage */}
          <mesh position={[0, 0.55, 0]}>
            <coneGeometry args={[0.32, 0.55, 7]} />
            <meshStandardMaterial color="#1B4332" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <coneGeometry args={[0.24, 0.48, 7]} />
            <meshStandardMaterial color="#2D6A4F" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 1.12, 0]}>
            <coneGeometry args={[0.16, 0.38, 7]} />
            <meshStandardMaterial color="#40916C" roughness={0.85} flatShading />
          </mesh>
        </group>
      ))}

      {/* 9. Drifting Soft Alpine Clouds */}
      {clouds.map((cloud, idx) => (
        <group
          key={`cloud-${idx}`}
          ref={(el) => {
            cloudGroupRefs.current[idx] = el;
          }}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={[1, cloud.scaleY, cloud.scaleX]}
        >
          <mesh position={[0, 0, 0]} material={cloudMat}>
            <sphereGeometry args={[0.7, 12, 10]} />
          </mesh>
          <mesh position={[0.1, -0.1, 0.65]} material={cloudMat}>
            <sphereGeometry args={[0.52, 10, 8]} />
          </mesh>
          <mesh position={[-0.1, -0.1, -0.65]} material={cloudMat}>
            <sphereGeometry args={[0.48, 10, 8]} />
          </mesh>
        </group>
      ))}

      {/* 10. Low Alpine Valley Mist Ribbon */}
      <mesh position={[-12.2, 1.35, -0.6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 2.2]} />
        <meshStandardMaterial
          ref={mistMatRef}
          color="#F1F5F9"
          transparent
          opacity={0.22}
          roughness={1.0}
          depthWrite={false}
        />
      </mesh>

      {/* 11. Gentle Atmospheric Breeze Motes / Fireflies */}
      <points ref={motesPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={motePositions.length / 3}
            array={motePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={motesMatRef}
          size={0.04}
          color="#FEF08A"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
