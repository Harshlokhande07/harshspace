import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useInteractionStore } from '../../store/useInteractionStore';

/**
 * Dual 27" Frameless Gaming/Workstation Monitors (Phase 2 Enhancement)
 * Features:
 * - Ultra-slim 1.5mm micro-edge dark bezels
 * - Heavy-duty articulated gas-spring dual arm mount (#2A2E38) with desk clamp
 * - Left Monitor (Primary Developer Screen):
 *   - Procedural realistic code editor (IDE tabs, line numbers, syntax-highlighted code lines)
 * - Right Monitor (Auxiliary Telemetry Screen angled inward 16°):
 *   - Procedural telemetry dashboard (CPU/GPU radial graphs, network waveform, build terminal)
 * - Soft ambient bias lighting behind monitors casting gentle illumination on the acoustic slat wall
 */
export const Monitor: React.FC = () => {
  const leftScreenMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightScreenMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const biasGlowMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Generate realistic procedural IDE code editor canvas texture for Primary Left Display
  const codeEditorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d')!;

    // Editor Dark Slate Background (#0F172A)
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1024, 576);

    // Top Window Tab Bar (#1E293B)
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, 1024, 38);

    // Active Editor Tab (index.tsx)
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(80, 6, 180, 32);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('⚡ GamingRoom.tsx', 96, 28);

    // Inactive Editor Tab (useCharacter.ts)
    ctx.fillStyle = '#64748B';
    ctx.font = '15px monospace';
    ctx.fillText('useCharacter.ts', 285, 28);

    // Left Line Number Column
    ctx.fillStyle = '#172033';
    ctx.fillRect(0, 38, 64, 538);
    ctx.fillStyle = '#475569';
    ctx.font = '14px monospace';
    for (let i = 1; i <= 24; i++) {
      ctx.fillText(String(i).padStart(2, ' '), 20, 48 + i * 21);
    }

    // Syntax-Highlighted Realistic Code Lines
    const codeTokens = [
      { t: 'import', c: '#C084FC' },
      { t: ' React, { useEffect, useFrame } ', c: '#F8FAFC' },
      { t: 'from', c: '#C084FC' },
      { t: " '@react-three/fiber';", c: '#4ADE80' },
      { t: 'export const', c: '#38BDF8' },
      { t: ' DigitalBattlestation: React.FC', c: '#FACC15' },
      { t: ' = () => {', c: '#F8FAFC' },
      { t: '  const { scene, camera } = useThree();', c: '#38BDF8' },
      { t: '  const [fps, setFps] = useState(120);', c: '#F8FAFC' },
      { t: '  // Calibrate ray-traced ambient reflections', c: '#64748B' },
      { t: '  useEffect(() => {', c: '#C084FC' },
      { t: '    renderer.toneMapping = ACESFilmic;', c: '#FACC15' },
      { t: '    scene.environmentIntensity = 0.85;', c: '#4ADE80' },
      { t: '  }, [scene]);', c: '#C084FC' },
      { t: '  return <WorkstationEngine power="ultra" />;', c: '#38BDF8' },
      { t: '};', c: '#F8FAFC' },
    ];

    let curY = 70;
    codeTokens.forEach((token) => {
      ctx.fillStyle = token.c;
      ctx.font = token.t.startsWith('//') ? 'italic 15px monospace' : '15px monospace';
      ctx.fillText(token.t, 84, curY);
      curY += 21;
    });

    // Bottom Status Bar (#0284C7)
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(0, 552, 1024, 24);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('UTF-8   TypeScript 5.4   main*   ⚡ Ready (120 FPS)', 24, 568);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Generate realistic telemetry & performance dashboard canvas texture for Right Display
  const telemetryTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d')!;

    // Dashboard Background (#0B0F19)
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, 1024, 576);

    // Header Bar
    ctx.fillStyle = '#161F30';
    ctx.fillRect(0, 0, 1024, 44);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('SYSTEM TELEMETRY & HARDWARE MONITOR', 32, 28);
    ctx.fillStyle = '#4ADE80';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('● SYSTEM OPTIMAL', 860, 28);

    // Left Metric Card: CPU & GPU Radial Stats
    ctx.strokeStyle = '#1E293B';
    ctx.strokeRect(32, 64, 460, 240);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('CPU LOAD: 24%  |  4.8 GHz', 54, 98);
    ctx.fillText('GPU LOAD: 42%  |  62°C', 54, 132);
    ctx.fillText('VRAM: 6.4 / 16.0 GB GDDR6X', 54, 166);

    // Live Performance Waveform Chart
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(54, 260);
    for (let x = 0; x < 410; x += 15) {
      const y = 240 - Math.sin(x * 0.05) * 22 - (x % 30);
      ctx.lineTo(54 + x, y);
    }
    ctx.stroke();

    // Right Metric Card: Memory & Network
    ctx.strokeStyle = '#1E293B';
    ctx.strokeRect(524, 64, 468, 240);
    ctx.fillStyle = '#A855F7';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('MEMORY: 14.8 / 32.0 GB DDR5', 546, 98);
    ctx.fillText('FRAME TIME: 8.33 ms (120 Hz)', 546, 132);
    ctx.fillText('NETWORK: 1.2 Gbps ↓  580 Mbps ↑', 546, 166);

    // Bottom Console Stream Log
    ctx.fillStyle = '#111827';
    ctx.fillRect(32, 328, 960, 216);
    ctx.fillStyle = '#10B981';
    ctx.font = '13px monospace';
    ctx.fillText('[LOG 21:52:10] Three.js WebGLRenderer initialized with toneMapping=ACESFilmic', 54, 360);
    ctx.fillText('[LOG 21:52:11] Scene graph loaded: 54 meshes, 4 real-time lights, zero useFrame GC', 54, 386);
    ctx.fillText('[LOG 21:52:12] Spatial audio bus calibrated: footstep cadence & ambient Tokyo rain', 54, 412);
    ctx.fillText('[LOG 21:52:13] HarshOS v2.4 desktop subsystem ready for visitor interaction', 54, 438);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const actionState = useCharacterStore.getState().actionState;
    const activeId = useInteractionStore.getState().activeId;

    const isSeatedOrActive = actionState === 'seated' || activeId === 'desk-pc';
    const targetLeft = isSeatedOrActive ? 1.05 : 0.75;
    const targetRight = isSeatedOrActive ? 0.95 : 0.65;
    const targetBias = isSeatedOrActive ? 0.8 : 0.45;

    if (leftScreenMatRef.current) {
      leftScreenMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        leftScreenMatRef.current.emissiveIntensity,
        targetLeft,
        4.0,
        dt
      );
    }

    if (rightScreenMatRef.current) {
      rightScreenMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        rightScreenMatRef.current.emissiveIntensity,
        targetRight,
        4.0,
        dt
      );
    }

    if (biasGlowMatRef.current) {
      biasGlowMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        biasGlowMatRef.current.emissiveIntensity,
        targetBias,
        3.0,
        dt
      );
    }
  });

  return (
    <group position={[-1.10, 0.74, -2.15]}>
      {/* 1. Heavy Metal Gas-Spring Dual-Arm Mount with Desk Clamp Base (#2A2E38) */}
      <group position={[0, 0, 0]}>
        {/* Desk clamp base plate */}
        <mesh position={[0, 0.02, -0.05]} castShadow>
          <boxGeometry args={[0.16, 0.04, 0.12]} />
          <meshStandardMaterial color="#2A2E38" roughness={0.35} metalness={0.85} />
        </mesh>
        {/* Vertical center riser pole */}
        <mesh position={[0, 0.22, -0.05]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.38, 20]} />
          <meshStandardMaterial color="#2A2E38" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Central dual arm articulation collar */}
        <mesh position={[0, 0.32, -0.05]}>
          <cylinderGeometry args={[0.038, 0.038, 0.06, 20]} />
          <meshStandardMaterial color="#3E4554" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Left cantilever arm */}
        <mesh position={[-0.22, 0.33, 0.02]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.38, 0.035, 0.035]} />
          <meshStandardMaterial color="#2A2E38" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Right cantilever arm */}
        <mesh position={[0.22, 0.33, 0.02]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[0.38, 0.035, 0.035]} />
          <meshStandardMaterial color="#2A2E38" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* 2. Left Monitor: 27" Frameless Primary Display (Facing Player) */}
      <group position={[-0.32, 0.36, 0.10]}>
        {/* Outer Display Shell & Micro-Bezel (Width 0.62m, Height 0.36m, Depth 0.02m) */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.36, 0.02]} />
          <meshStandardMaterial color="#16181F" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Bottom subtle chin badge */}
        <mesh position={[0, -0.174, 0.011]}>
          <boxGeometry args={[0.06, 0.008, 0.002]} />
          <meshStandardMaterial color="#C5B49E" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Code Editor Screen Surface */}
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.612, 0.352]} />
          <meshStandardMaterial
            ref={leftScreenMatRef}
            map={codeEditorTexture}
            emissive="#0F172A"
            emissiveIntensity={0.75}
            roughness={0.15}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* 3. Right Monitor: 27" Frameless Telemetry Display (Angled Inward 16°) */}
      <group position={[0.30, 0.36, 0.06]} rotation={[0, -0.28, 0]}>
        {/* Outer Display Shell & Micro-Bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.36, 0.02]} />
          <meshStandardMaterial color="#16181F" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Bottom chin badge */}
        <mesh position={[0, -0.174, 0.011]}>
          <boxGeometry args={[0.06, 0.008, 0.002]} />
          <meshStandardMaterial color="#C5B49E" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Telemetry Dashboard Screen Surface */}
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.612, 0.352]} />
          <meshStandardMaterial
            ref={rightScreenMatRef}
            map={telemetryTexture}
            emissive="#0B0F19"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* 4. Ambient Bias Backlight (Casting diffused glow on rear walnut acoustic slats) */}
      <mesh position={[0, 0.36, -0.06]}>
        <planeGeometry args={[1.10, 0.34]} />
        <meshStandardMaterial
          ref={biasGlowMatRef}
          color="#000000"
          emissive="#38bdf8"
          emissiveIntensity={0.45}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};
