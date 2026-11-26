import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore, TimeMode } from '../../store/useLivingRoomStore';
import { useGraphicsStore } from '../../store/useGraphicsStore';
import { useInteractionStore } from '../../store/useInteractionStore';

// Scratch color objects to avoid GC allocations in useFrame
const _cSky = new THREE.Color();
const _cGround = new THREE.Color();
const _cDir = new THREE.Color();
const _cDesk = new THREE.Color();
const _cViolet = new THREE.Color();
const _cFog = new THREE.Color();

/**
 * Day/Night Lighting profiles:
 * Exactly 4 real-time lights:
 * 1. Hemisphere Light (sky fill + ground bounce)
 * 2. Directional Light (sun / moon through window)
 * 3. Point Light (warm desk lamp)
 * 4. Point Light (violet PC accent)
 */
interface LightPreset {
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  dirColor: string;
  dirIntensity: number;
  deskColor: string;
  deskBaseIntensity: number;
  violetColor: string;
  violetIntensity: number;
  fogColor: string;
  fogDensity: number;
  clearColor: string;
}

const PRESETS: Record<'day' | 'evening' | 'night', LightPreset> = {
  day: {
    hemiSky: '#93c5fd', // bright sky blue
    hemiGround: '#d6d3d1', // warm neutral ground
    hemiIntensity: 0.95,
    dirColor: '#fffbeb', // bright warm sunlight
    dirIntensity: 2.2,
    deskColor: '#fef08a',
    deskBaseIntensity: 0.6, // desk lamp less dominant in daylight
    violetColor: '#c084fc',
    violetIntensity: 0.4, // RGB gear is subtler in daytime
    fogColor: '#bfdbfe',
    fogDensity: 0.012,
    clearColor: '#93c5fd',
  },
  evening: {
    hemiSky: '#f97316', // warm sunset amber/orange
    hemiGround: '#431407', // deep dusk ground
    hemiIntensity: 0.6,
    dirColor: '#fb923c', // golden hour beam
    dirIntensity: 1.5,
    deskColor: '#fef08a',
    deskBaseIntensity: 1.0,
    violetColor: '#a855f7',
    violetIntensity: 0.75,
    fogColor: '#451a03',
    fogDensity: 0.018,
    clearColor: '#7c2d12',
  },
  night: {
    hemiSky: '#38bdf8', // cool ambient fill
    hemiGround: '#0f172a', // dark floor bounce
    hemiIntensity: 0.38,
    dirColor: '#c7d2fe', // cool moonlight beam
    dirIntensity: 1.1,
    deskColor: '#fef08a', // warm task lamp
    deskBaseIntensity: 1.35, // desk lamp is key focal light
    violetColor: '#a855f7', // vibrant battlestation RGB
    violetIntensity: 0.85,
    fogColor: '#0a0f1d',
    fogDensity: 0.024,
    clearColor: '#030712',
  },
};

export function getResolvedTimeMode(timeMode: TimeMode): 'day' | 'evening' | 'night' {
  if (timeMode !== 'auto') return timeMode;
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;
  if (hours >= 7 && hours < 17) return 'day';
  if (hours >= 17 && hours < 19.5) return 'evening';
  return 'night';
}

export const DayNightController: React.FC = () => {
  const { scene } = useThree();
  const shadows = useGraphicsStore((s) => s.shadows);
  const shadowMapSize = useGraphicsStore((s) => s.shadowMapSize);

  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const deskLampRef = useRef<THREE.PointLight>(null);
  const rgbAccentRef = useRef<THREE.PointLight>(null);

  const timeMode = useLivingRoomStore((s) => s.timeMode);

  // Poll local clock once every 60s when on 'auto'
  useEffect(() => {
    const updateTime = () => {
      const mode = useLivingRoomStore.getState().timeMode;
      if (mode === 'auto') {
        const resolved = getResolvedTimeMode('auto');
        const numVal = resolved === 'day' ? 1 : resolved === 'evening' ? 0.5 : 0;
        useLivingRoomStore.getState().setTimeOfDay(numVal);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const resolvedMode = getResolvedTimeMode(timeMode);
    const preset = PRESETS[resolvedMode];

    const { lampOn } = useLivingRoomStore.getState();
    const activeId = useInteractionStore.getState().activeId;
    const actionState = (window as any).__harshActionState || 'free';
    const isLying = actionState === 'lying' || actionState === 'lying-down';

    // Relaxing bed mode multiplier: slightly dimmer overall light, warmer tint, softer RGB
    const lightDimMultiplier = isLying ? 0.72 : 1.0;
    const rgbSoftMultiplier = isLying ? 0.55 : 1.0;

    // 1. Hemisphere Light interpolation
    if (hemiRef.current) {
      _cSky.set(isLying ? '#f97316' : preset.hemiSky);
      _cGround.set(preset.hemiGround);
      hemiRef.current.color.lerp(_cSky, dt * 2.5);
      hemiRef.current.groundColor.lerp(_cGround, dt * 2.5);
      hemiRef.current.intensity = THREE.MathUtils.damp(
        hemiRef.current.intensity,
        preset.hemiIntensity * lightDimMultiplier,
        3.0,
        dt
      );
    }

    // 2. Directional Window Light interpolation
    if (dirRef.current) {
      _cDir.set(preset.dirColor);
      dirRef.current.color.lerp(_cDir, dt * 2.5);
      dirRef.current.intensity = THREE.MathUtils.damp(
        dirRef.current.intensity,
        preset.dirIntensity * lightDimMultiplier,
        3.0,
        dt
      );
    }

    // 3. Desk Lamp task light with lampOn switch and notebook interaction boost
    if (deskLampRef.current) {
      _cDesk.set(preset.deskColor);
      deskLampRef.current.color.lerp(_cDesk, dt * 2.5);

      let targetDeskIntensity = 0;
      if (lampOn) {
        // Base value from day/night preset, plus Step 6 notebook boost if open
        const boost = activeId === 'notebook' ? 1.0 : 0;
        targetDeskIntensity = (preset.deskBaseIntensity + boost) * lightDimMultiplier;
      }

      deskLampRef.current.intensity = THREE.MathUtils.damp(
        deskLampRef.current.intensity,
        targetDeskIntensity,
        4.5,
        dt
      );
    }

    // 4. Violet Battlestation RGB Accent Light
    if (rgbAccentRef.current) {
      _cViolet.set(preset.violetColor);
      rgbAccentRef.current.color.lerp(_cViolet, dt * 2.5);
      rgbAccentRef.current.intensity = THREE.MathUtils.damp(
        rgbAccentRef.current.intensity,
        preset.violetIntensity * rgbSoftMultiplier,
        3.0,
        dt
      );
    }

    // 5. Scene background & Fog smooth damp
    if (scene) {
      if (!scene.fog) {
        scene.fog = new THREE.FogExp2(preset.fogColor, preset.fogDensity);
      } else if (scene.fog instanceof THREE.FogExp2) {
        _cFog.set(preset.fogColor);
        scene.fog.color.lerp(_cFog, dt * 2.5);
        scene.fog.density = THREE.MathUtils.damp(
          scene.fog.density,
          preset.fogDensity,
          3.0,
          dt
        );
      }
    }
  });

  return (
    <>
      {/* 1. Soft atmospheric hemisphere fill */}
      <hemisphereLight
        ref={hemiRef}
        args={['#38bdf8', '#0f172a', 0.45]}
        position={[0, 2.7, 0]}
      />

      {/* 2. Window directional light beam entering from West window */}
      <directionalLight
        ref={dirRef}
        position={[-4.5, 3.8, -0.6]}
        target-position={[-0.5, 0.6, -0.8]}
        intensity={1.15}
        color="#c7d2fe"
        castShadow={shadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-camera-left={-2.8}
        shadow-camera-right={2.8}
        shadow-camera-top={2.8}
        shadow-camera-bottom={-2.8}
        shadow-bias={-0.0003}
      />

      {/* 3. Warm desk lamp task light */}
      <pointLight
        ref={deskLampRef}
        position={[-1.75, 1.15, -1.95]}
        intensity={1.2}
        distance={3.2}
        decay={2}
        color="#fef08a"
      />

      {/* 4. Battlestation RGB accent light illuminating walnut acoustic slats */}
      <pointLight
        ref={rgbAccentRef}
        position={[-0.7, 1.05, -2.35]}
        intensity={0.8}
        distance={3.0}
        decay={2}
        color="#a855f7"
      />
    </>
  );
};
