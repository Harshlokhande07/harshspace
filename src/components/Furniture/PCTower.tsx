import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Photorealistic Gaming PC Tower & Workstation Rig
 * High-end ATX Showcase Chassis:
 * - Matte dark anodized aluminum chassis frame with CNC beveled chamfers (#14161C)
 * - Ultra-clear tempered glass side panel with realistic reflection & depth
 * - Dual front 140mm intake ARGB halo fans with spinning aerodynamic fan blades
 * - Top 280mm AIO liquid radiator with braided dual coolant hoses & circular infinity-mirror pump block
 * - Triple-slot high-end GPU with brushed aluminum backplate, cooling fins, heatpipes & illuminated logo
 * - Dual RGB DDR5 RAM sticks with frosted diffusers
 * - Perforated power supply shroud with cables & PCIe sleeved extensions
 * - Interactive subtle breathing/wave lighting
 */
export const PCTower: React.FC = () => {
  const gpuLogoMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const aioBlockMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const ramMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const fanHaloMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const fanBladesGroupRef = useRef<THREE.Group>(null);

  // Cached materials & procedural textures
  const {
    caseFrameMat,
    innerChassisMat,
    gpuBodyMat,
    gpuBackplateMat,
    heatpipeMat,
    finStackMat,
    motherboardMat,
    heatsinkMat,
    fanBladeMat,
    tubingMat,
    glassMat,
    meshFilterTex,
  } = useMemo(() => {
    // Top & front dust filter mesh pattern
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#111317';
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = '#08090C';
      for (let y = 3; y < 64; y += 6) {
        for (let x = 3; x < 64; x += 6) {
          ctx.beginPath();
          ctx.arc(x + ((y / 6) % 2 === 0 ? 0 : 3), y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const filterTex = new THREE.CanvasTexture(canvas);
    filterTex.wrapS = THREE.RepeatWrapping;
    filterTex.wrapT = THREE.RepeatWrapping;
    filterTex.repeat.set(6, 12);

    return {
      caseFrameMat: new THREE.MeshStandardMaterial({
        color: '#15171E',
        roughness: 0.28,
        metalness: 0.75,
      }),
      innerChassisMat: new THREE.MeshStandardMaterial({
        color: '#0E1014',
        roughness: 0.5,
        metalness: 0.3,
      }),
      gpuBodyMat: new THREE.MeshStandardMaterial({
        color: '#181A22',
        roughness: 0.35,
        metalness: 0.8,
      }),
      gpuBackplateMat: new THREE.MeshStandardMaterial({
        color: '#4B5563',
        roughness: 0.22,
        metalness: 0.9,
      }),
      heatpipeMat: new THREE.MeshStandardMaterial({
        color: '#D97706',
        roughness: 0.2,
        metalness: 0.92,
      }),
      finStackMat: new THREE.MeshStandardMaterial({
        color: '#CBD5E1',
        roughness: 0.18,
        metalness: 0.95,
      }),
      motherboardMat: new THREE.MeshStandardMaterial({
        color: '#0B0D11',
        roughness: 0.7,
        metalness: 0.2,
      }),
      heatsinkMat: new THREE.MeshStandardMaterial({
        color: '#64748B',
        roughness: 0.25,
        metalness: 0.88,
      }),
      fanBladeMat: new THREE.MeshStandardMaterial({
        color: '#1A1D24',
        roughness: 0.4,
        metalness: 0.2,
      }),
      tubingMat: new THREE.MeshStandardMaterial({
        color: '#181B22',
        roughness: 0.8,
        metalness: 0.1,
      }),
      glassMat: new THREE.MeshPhysicalMaterial({
        color: '#F8FAFC',
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.90,
        thickness: 0.02,
        transparent: true,
        opacity: 0.25,
        reflectivity: 0.6,
      }),
      meshFilterTex: filterTex,
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth subtle gaming battlestation RGB breathing cycle (Cyan -> Indigo -> Violet -> Magenta)
    const r = (Math.sin(t * 1.0) + 1) / 2 * 0.35 + 0.15;
    const g = (Math.sin(t * 1.0 + 2.0) + 1) / 2 * 0.45 + 0.25;
    const b = (Math.sin(t * 1.0 + 4.0) + 1) / 2 * 0.4 + 0.55;

    if (gpuLogoMatRef.current) {
      gpuLogoMatRef.current.emissive.setRGB(r * 0.9, g * 0.8, b);
      gpuLogoMatRef.current.emissiveIntensity = 1.1;
    }
    if (aioBlockMatRef.current) {
      aioBlockMatRef.current.emissive.setRGB(r * 0.7, g * 0.9, b);
      aioBlockMatRef.current.emissiveIntensity = 1.0;
    }
    if (ramMatRef.current) {
      ramMatRef.current.emissive.setRGB(r * 1.1, g * 0.6, b * 1.1);
      ramMatRef.current.emissiveIntensity = 0.9;
    }
    if (fanHaloMatRef.current) {
      fanHaloMatRef.current.emissive.setRGB(r * 0.5, g * 0.85, b);
      fanHaloMatRef.current.emissiveIntensity = 0.85;
    }

    // Continuous smooth fan blade rotation
    if (fanBladesGroupRef.current) {
      fanBladesGroupRef.current.rotation.z += delta * 12.0;
    }
  });

  return (
    <group position={[-0.35, 0.74, -1.95]}>
      {/* ============================================================== */}
      {/* 1. OUTER CHASSIS FRAME & PANELS (0.22m W x 0.49m H x 0.45m D) */}
      {/* ============================================================== */}
      {/* Bottom chassis foot runners with rubber pads */}
      {[-0.09, 0.09].map((fx, i) => (
        <group key={`foot-${i}`} position={[fx, 0.01, 0]}>
          <mesh material={caseFrameMat} castShadow>
            <boxGeometry args={[0.025, 0.02, 0.40]} />
          </mesh>
          {[-0.17, 0.17].map((pz, pi) => (
            <mesh key={pi} position={[0, -0.008, pz]}>
              <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} />
              <meshStandardMaterial color="#0A0B0E" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Main Chassis Skeleton Frame */}
      {/* Top Roof Panel */}
      <mesh position={[0, 0.485, 0]} material={caseFrameMat} castShadow>
        <boxGeometry args={[0.22, 0.02, 0.45]} />
      </mesh>
      {/* Top Magnetic Dust Mesh Inset */}
      <mesh position={[0, 0.496, 0]}>
        <planeGeometry args={[0.18, 0.38]} />
        <meshStandardMaterial map={meshFilterTex} roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Front I/O Port Cluster (Power Button, USB-C, Dual USB 3.0, Audio Jack) */}
      <group position={[0.07, 0.496, 0.19]}>
        {/* Power button with circular status ring */}
        <mesh position={[-0.05, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.004, 16]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* USB-C */}
        <mesh position={[-0.03, 0, 0]}>
          <boxGeometry args={[0.004, 0.002, 0.008]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* USB 3.0 Ports */}
        <mesh position={[-0.01, 0, 0]}>
          <boxGeometry args={[0.004, 0.002, 0.010]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.004, 0.002, 0.010]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>
      </group>

      {/* Rear Steel Panel */}
      <mesh position={[0, 0.25, -0.225]} material={caseFrameMat} castShadow>
        <boxGeometry args={[0.22, 0.45, 0.01]} />
      </mesh>

      {/* Right Solid Steel Side Panel */}
      <mesh position={[-0.108, 0.25, 0]} material={caseFrameMat} castShadow>
        <boxGeometry args={[0.008, 0.45, 0.44]} />
      </mesh>

      {/* Front Bezel Faceplate with Fine Air Intake Slots */}
      <group position={[0, 0.25, 0.225]}>
        <mesh material={caseFrameMat} castShadow>
          <boxGeometry args={[0.22, 0.45, 0.012]} />
        </mesh>
        {/* Fine intake mesh insert */}
        <mesh position={[0, 0, 0.007]}>
          <planeGeometry args={[0.18, 0.41]} />
          <meshStandardMaterial map={meshFilterTex} roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. DUAL FRONT 140mm ARGB INTAKE FANS WITH BLADES               */}
      {/* ============================================================== */}
      {[0.16, 0.33].map((fy, fIdx) => (
        <group key={`front-fan-${fIdx}`} position={[0, fy, 0.21]}>
          {/* Fan Outer Shroud Frame */}
          <mesh material={innerChassisMat}>
            <boxGeometry args={[0.15, 0.15, 0.02]} />
          </mesh>
          {/* ARGB Circular Halo Light Ring */}
          <mesh position={[0, 0, 0.011]}>
            <ringGeometry args={[0.052, 0.065, 32]} />
            <meshStandardMaterial
              ref={fIdx === 0 ? fanHaloMatRef : undefined}
              color="#000000"
              emissive="#38BDF8"
              emissiveIntensity={0.85}
              roughness={0.2}
            />
          </mesh>
          {/* Rotating Blades Hub */}
          <group ref={fIdx === 0 ? fanBladesGroupRef : undefined}>
            <mesh position={[0, 0, 0.005]}>
              <cylinderGeometry args={[0.022, 0.022, 0.016, 16]} />
              <meshStandardMaterial color="#1E232B" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* 7 Aerodynamic Fan Blades */}
            {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5].map((deg, bIdx) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <mesh
                  key={bIdx}
                  position={[Math.cos(rad) * 0.036, Math.sin(rad) * 0.036, 0.005]}
                  rotation={[0.3, 0.3, rad]}
                  material={fanBladeMat}
                >
                  <boxGeometry args={[0.030, 0.014, 0.002]} />
                </mesh>
              );
            })}
          </group>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 3. INTERIOR WORKSTATION COMPONENTS (Motherboard, GPU, AIO, RAM) */}
      {/* ============================================================== */}
      <group position={[-0.01, 0, 0]}>
        {/* Full ATX Dark Matte Motherboard PCB */}
        <mesh position={[-0.082, 0.26, 0]} material={motherboardMat}>
          <boxGeometry args={[0.006, 0.34, 0.30]} />
        </mesh>

        {/* Brushed Titanium VRM & M.2 Heatsink Blocks */}
        <mesh position={[-0.072, 0.38, -0.07]} material={heatsinkMat}>
          <boxGeometry args={[0.014, 0.06, 0.06]} />
        </mesh>
        <mesh position={[-0.072, 0.34, -0.11]} material={heatsinkMat}>
          <boxGeometry args={[0.014, 0.07, 0.035]} />
        </mesh>
        <mesh position={[-0.072, 0.26, 0.02]} material={heatsinkMat}>
          <boxGeometry args={[0.012, 0.015, 0.08]} />
        </mesh>

        {/* 280mm Top AIO Radiator Assembly */}
        <group position={[0, 0.46, -0.02]}>
          {/* Black Radiator Fin Block */}
          <mesh material={innerChassisMat}>
            <boxGeometry args={[0.14, 0.025, 0.30]} />
          </mesh>
        </group>

        {/* AIO Liquid CPU Cooler Pump Block with Infinity Mirror */}
        <group position={[-0.062, 0.34, -0.04]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={innerChassisMat}>
            <cylinderGeometry args={[0.032, 0.032, 0.025, 24]} />
          </mesh>
          {/* Illuminated Circular Infinity Mirror Lens */}
          <mesh position={[0, 0.013, 0]}>
            <circleGeometry args={[0.024, 24]} />
            <meshStandardMaterial
              ref={aioBlockMatRef}
              color="#000000"
              emissive="#38BDF8"
              emissiveIntensity={1.0}
              roughness={0.1}
            />
          </mesh>
          {/* Chrome Beveled Trim Ring */}
          <mesh position={[0, 0.013, 0]}>
            <ringGeometry args={[0.024, 0.030, 24]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Braided Sleeved Dual Coolant Hoses curving upward to radiator */}
          <mesh position={[0, 0.008, 0.04]} rotation={[0.45, 0, 0]} material={tubingMat}>
            <cylinderGeometry args={[0.0055, 0.0055, 0.15, 14]} />
          </mesh>
          <mesh position={[0.01, 0.008, 0.05]} rotation={[0.4, 0, 0]} material={tubingMat}>
            <cylinderGeometry args={[0.0055, 0.0055, 0.15, 14]} />
          </mesh>
        </group>

        {/* Dual High-Speed DDR5 RGB RAM Modules */}
        {[-0.012, 0.012].map((rz, rIdx) => (
          <group key={`ram-${rIdx}`} position={[-0.068, 0.355, 0.02 + rz]}>
            {/* Dark Aluminum Armor Heatspreader */}
            <mesh material={heatsinkMat}>
              <boxGeometry args={[0.007, 0.045, 0.038]} />
            </mesh>
            {/* Frosted Acrylic RGB Light Diffuser Bar */}
            <mesh position={[0, 0.024, 0]}>
              <boxGeometry args={[0.008, 0.006, 0.036]} />
              <meshStandardMaterial
                ref={rIdx === 0 ? ramMatRef : undefined}
                color="#000000"
                emissive="#A855F7"
                emissiveIntensity={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* Triple-Slot Flagship GPU (Brushed Metal Backplate, Exposed Nickel Fins, RGB Side Logo) */}
        <group position={[-0.01, 0.22, 0.02]}>
          {/* GPU Main Shroud Body */}
          <mesh position={[0, 0, 0]} material={gpuBodyMat} castShadow>
            <boxGeometry args={[0.13, 0.058, 0.28]} />
          </mesh>
          {/* Brushed Aluminum Rigid Backplate */}
          <mesh position={[0, 0.030, 0]} material={gpuBackplateMat}>
            <boxGeometry args={[0.128, 0.004, 0.276]} />
          </mesh>
          {/* Exposed Copper Heatpipes */}
          <mesh position={[0.066, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={heatpipeMat}>
            <cylinderGeometry args={[0.004, 0.004, 0.08, 12]} />
          </mesh>
          {/* Aluminum Cooling Fin Stack */}
          <mesh position={[0.066, -0.012, -0.04]} material={finStackMat}>
            <boxGeometry args={[0.004, 0.024, 0.16]} />
          </mesh>
          {/* Illuminated Edge RGB Logo Bar */}
          <mesh position={[0.066, 0.008, 0.04]}>
            <boxGeometry args={[0.004, 0.018, 0.10]} />
            <meshStandardMaterial
              ref={gpuLogoMatRef}
              color="#000000"
              emissive="#38BDF8"
              emissiveIntensity={1.1}
              roughness={0.2}
            />
          </mesh>
          {/* Triple Fans Shroud Underside Detail */}
          {[-0.08, 0, 0.08].map((fz, fIdx) => (
            <mesh key={`gpu-fan-${fIdx}`} position={[0, -0.029, fz]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.025, 0.042, 20]} />
              <meshStandardMaterial color="#0E1014" roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Rear 120mm Exhaust Fan with Subtle Halo Glow */}
        <group position={[-0.05, 0.34, -0.19]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.042, 0.054, 24]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#38BDF8"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Lower PSU Shroud Chamber with Perforated Side Detail */}
        <mesh position={[0, 0.055, 0]} material={innerChassisMat}>
          <boxGeometry args={[0.19, 0.11, 0.42]} />
        </mesh>
        {/* Sleeved PCIe & 24-Pin Cable Combs */}
        <mesh position={[0.05, 0.14, 0.06]} material={caseFrameMat}>
          <boxGeometry args={[0.02, 0.04, 0.04]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 4. TEMPERED GLASS SIDE WINDOW WITH PREMIUM TRANSMISSION       */}
      {/* ============================================================== */}
      <mesh position={[0.111, 0.25, 0]} material={glassMat}>
        <boxGeometry args={[0.006, 0.45, 0.43]} />
      </mesh>
      {/* Four CNC Corner Thumbscrews for Glass Panel */}
      {[
        [-0.19, -0.19],
        [-0.19, 0.19],
        [0.19, -0.19],
        [0.19, 0.19],
      ].map(([py, pz], idx) => (
        <mesh key={`screw-${idx}`} position={[0.115, 0.25 + py, pz]}>
          <cylinderGeometry args={[0.006, 0.006, 0.005, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};
