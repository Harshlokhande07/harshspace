import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 1:1 Precise Replica of "Gaming Chair" by Grapxly (Sketchfab)
 * Visual & Design Details:
 * - Matte dark graphite/carbon faux-leather (#18181B / #1F2228) with high-frequency subtle texture
 * - Electric cyan/neon racing trim accents (#00BFFF / #00E5FF)
 * - 5-star heavy-duty nylon starbase with 5 dual-caster racing wheels & cyan accent striping
 * - Central hydraulic gas-lift piston column (#222428) & chrome inner rod
 * - Heavy butterfly tilt-lock mechanism housing with height lever & tension spring knob underneath
 * - Ergonomic racing bucket seat with angled side thigh bolsters and dual cyan racing stripes
 * - Sculpted winged racing backrest tapering from waist to broad shoulder bolsters (#18181B)
 * - Distinct dual aerodynamic harness cutout pass-through ports with glossy black bevels
 * - Elastic-strapped neck/headrest cushion with cyan wedge side panels and top embroidery
 * - Ergonomic lumbar support pillow contoured to lower spine with matching cyan side accents
 * - 4D adjustable concave armrests with textured arm pads, height adjustment pillars, and steel mounting brackets
 * - Rear reclining bracket hinge covers on both sides connecting backrest to base
 */

export const PrimitiveGamingChair: React.FC = () => {
  // Reusable materials & geometries for top performance & zero GC churn
  const {
    baseMat,
    cyanMat,
    leatherMat,
    perforatedMat,
    chromeMat,
    darkSteelMat,
    plasticMat,
    casterMat,
    strapMat,
    harnessBevelMat,
  } = useMemo(() => {
    // Subtle perforated texture canvas for premium bucket center
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1e2126';
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = '#111215';
      for (let y = 4; y < 64; y += 8) {
        for (let x = 4; x < 64; x += 8) {
          ctx.beginPath();
          ctx.arc(x + ((y / 8) % 2 === 0 ? 0 : 4), y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const dotTex = new THREE.CanvasTexture(canvas);
    dotTex.wrapS = THREE.RepeatWrapping;
    dotTex.wrapT = THREE.RepeatWrapping;
    dotTex.repeat.set(4, 4);

    return {
      baseMat: new THREE.MeshStandardMaterial({
        color: '#121316',
        roughness: 0.5,
        metalness: 0.2,
      }),
      cyanMat: new THREE.MeshStandardMaterial({
        color: '#00D2FF',
        roughness: 0.35,
        metalness: 0.1,
        emissive: '#004866',
        emissiveIntensity: 0.25,
      }),
      leatherMat: new THREE.MeshStandardMaterial({
        color: '#1B1D22',
        roughness: 0.45,
        metalness: 0.08,
      }),
      perforatedMat: new THREE.MeshStandardMaterial({
        color: '#21242B',
        map: dotTex,
        roughness: 0.55,
        metalness: 0.05,
      }),
      chromeMat: new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        roughness: 0.15,
        metalness: 0.95,
      }),
      darkSteelMat: new THREE.MeshStandardMaterial({
        color: '#2D3139',
        roughness: 0.35,
        metalness: 0.75,
      }),
      plasticMat: new THREE.MeshStandardMaterial({
        color: '#0D0E10',
        roughness: 0.3,
        metalness: 0.1,
      }),
      casterMat: new THREE.MeshStandardMaterial({
        color: '#15161A',
        roughness: 0.6,
        metalness: 0.1,
      }),
      strapMat: new THREE.MeshStandardMaterial({
        color: '#0A0A0C',
        roughness: 0.85,
      }),
      harnessBevelMat: new THREE.MeshStandardMaterial({
        color: '#08080A',
        roughness: 0.2,
        metalness: 0.3,
      }),
    };
  }, []);

  return (
    <group position={[-1.10, 0, -0.95]} rotation={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. 5-STAR STARBASE & CASTER WHEELS (With Grapxly Cyan Inlays)  */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Central hub */}
        <mesh position={[0, 0.065, 0]} material={baseMat} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.05, 16]} />
        </mesh>
        {/* Central cyan hub ring */}
        <mesh position={[0, 0.08, 0]} material={cyanMat}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
        </mesh>

        {/* 5 Starbase Legs */}
        {[0, 72, 144, 216, 288].map((angleDeg, idx) => {
          const rad = (angleDeg * Math.PI) / 180;
          return (
            <group key={`leg-${idx}`} rotation={[0, rad, 0]}>
              {/* Sloped main arm */}
              <mesh position={[0.16, 0.05, 0]} rotation={[0, 0, -0.09]} material={baseMat} castShadow>
                <boxGeometry args={[0.26, 0.038, 0.046]} />
              </mesh>
              {/* Cyan racing top accent strip */}
              <mesh position={[0.165, 0.071, 0]} rotation={[0, 0, -0.09]} material={cyanMat}>
                <boxGeometry args={[0.23, 0.006, 0.016]} />
              </mesh>
              {/* Wheel caster socket */}
              <mesh position={[0.29, 0.045, 0]} material={baseMat} castShadow>
                <cylinderGeometry args={[0.022, 0.025, 0.04, 12]} />
              </mesh>
              {/* Dual caster wheels */}
              <group position={[0.29, 0.024, 0]}>
                <mesh position={[0, 0, -0.018]} rotation={[Math.PI / 2, 0, 0]} material={casterMat} castShadow>
                  <cylinderGeometry args={[0.025, 0.025, 0.015, 14]} />
                </mesh>
                <mesh position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={casterMat} castShadow>
                  <cylinderGeometry args={[0.025, 0.025, 0.015, 14]} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]} material={darkSteelMat}>
                  <cylinderGeometry args={[0.007, 0.007, 0.045, 8]} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>

      {/* ============================================================== */}
      {/* 2. HYDRAULIC GAS LIFT PISTON & TILT MECHANISM HOUSING          */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Telescoping plastic sheath */}
        <mesh position={[0, 0.16, 0]} material={plasticMat} castShadow>
          <cylinderGeometry args={[0.045, 0.05, 0.14, 16]} />
        </mesh>
        <mesh position={[0, 0.19, 0]} material={plasticMat}>
          <cylinderGeometry args={[0.048, 0.048, 0.03, 16]} />
        </mesh>
        {/* Chrome hydraulic rod */}
        <mesh position={[0, 0.28, 0]} material={chromeMat} castShadow>
          <cylinderGeometry args={[0.028, 0.028, 0.16, 16]} />
        </mesh>

        {/* Heavy butterfly tilt mechanism under-seat box */}
        <mesh position={[0, 0.36, -0.02]} material={darkSteelMat} castShadow>
          <boxGeometry args={[0.26, 0.065, 0.28]} />
        </mesh>
        {/* Cylindrical tilt tension knob */}
        <mesh position={[0, 0.31, 0.06]} material={plasticMat} castShadow>
          <cylinderGeometry args={[0.035, 0.038, 0.07, 16]} />
        </mesh>
        {/* Height adjustment lever with paddle handle */}
        <group position={[0.15, 0.36, -0.04]}>
          <mesh rotation={[0, 0, 0.35]} material={chromeMat}>
            <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
          </mesh>
          <mesh position={[0.07, 0.02, 0]} material={plasticMat}>
            <boxGeometry args={[0.04, 0.015, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 3. RACING BUCKET SEAT BASE (Thigh Bolsters & Cyan Dual Racing Stripes) */}
      {/* ============================================================== */}
      <group position={[0, 0.44, 0]}>
        {/* Main contoured seat center cushion */}
        <mesh position={[0, 0, 0.02]} material={perforatedMat} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.09, 0.48]} />
        </mesh>

        {/* Dual cyan vertical racing stripes running along the seat center */}
        <mesh position={[-0.07, 0.046, 0.02]} material={cyanMat}>
          <boxGeometry args={[0.012, 0.003, 0.478]} />
        </mesh>
        <mesh position={[0.07, 0.046, 0.02]} material={cyanMat}>
          <boxGeometry args={[0.012, 0.003, 0.478]} />
        </mesh>

        {/* Left Thigh Support Wing Bolster */}
        <group position={[-0.23, 0.045, 0.02]} rotation={[0, 0, 0.42]}>
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.08, 0.08, 0.48]} />
          </mesh>
          {/* Cyan racing piped border outer edge */}
          <mesh position={[-0.04, 0.04, 0]} material={cyanMat}>
            <boxGeometry args={[0.01, 0.01, 0.48]} />
          </mesh>
        </group>

        {/* Right Thigh Support Wing Bolster */}
        <group position={[0.23, 0.045, 0.02]} rotation={[0, 0, -0.42]}>
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.08, 0.08, 0.48]} />
          </mesh>
          {/* Cyan racing piped border outer edge */}
          <mesh position={[0.04, 0.04, 0]} material={cyanMat}>
            <boxGeometry args={[0.01, 0.01, 0.48]} />
          </mesh>
        </group>

        {/* Front waterfall edge cushion curve */}
        <mesh position={[0, -0.01, 0.25]} rotation={[0, 0, Math.PI / 2]} material={leatherMat} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.46, 16]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 4. RECLINING HINGES & STEEL CONNECTORS                         */}
      {/* ============================================================== */}
      {[-0.26, 0.26].map((x, i) => (
        <group key={`hinge-${i}`} position={[x, 0.50, -0.19]}>
          <mesh material={darkSteelMat} castShadow>
            <boxGeometry args={[0.025, 0.16, 0.08]} />
          </mesh>
          <mesh position={[x > 0 ? 0.015 : -0.015, 0, 0]} material={plasticMat}>
            <boxGeometry args={[0.01, 0.18, 0.09]} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 5. 4D CONTOURED ARMRESTS (With Height Adjustment & Arm Pads)  */}
      {/* ============================================================== */}
      {[-0.31, 0.31].map((x, i) => {
        const isRight = x > 0;
        return (
          <group key={`armrest-${i}`} position={[x, 0.50, -0.02]}>
            {/* Heavy steel L-bracket mount bolted under seat */}
            <mesh position={[isRight ? -0.03 : 0.03, -0.08, 0]} material={darkSteelMat} castShadow>
              <boxGeometry args={[0.06, 0.025, 0.08]} />
            </mesh>
            {/* Vertical upright pillar stem */}
            <mesh position={[0, 0.07, 0]} material={plasticMat} castShadow>
              <boxGeometry args={[0.04, 0.24, 0.05]} />
            </mesh>
            {/* Height adjustment trigger button */}
            <mesh position={[isRight ? 0.022 : -0.022, 0.12, 0]} material={chromeMat}>
              <boxGeometry args={[0.008, 0.03, 0.02]} />
            </mesh>
            {/* Contoured 4D PU soft arm pad */}
            <group position={[0, 0.19, 0.02]}>
              <mesh material={leatherMat} castShadow>
                <boxGeometry args={[0.09, 0.03, 0.26]} />
              </mesh>
              {/* Slight ergonomic concavity inset */}
              <mesh position={[0, 0.016, 0]} material={plasticMat}>
                <boxGeometry args={[0.07, 0.004, 0.22]} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* ============================================================== */}
      {/* 6. RACING BUCKET BACKREST WITH HARNESS PASS-THROUGH HOLES      */}
      {/* ============================================================== */}
      <group position={[0, 0.88, -0.21]} rotation={[-0.07, 0, 0]}>
        {/* Central spinal backrest pad */}
        <mesh position={[0, 0, 0]} material={perforatedMat} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.74, 0.07]} />
        </mesh>

        {/* Dual cyan center stripes continuing onto backrest */}
        <mesh position={[-0.07, -0.04, 0.036]} material={cyanMat}>
          <boxGeometry args={[0.012, 0.64, 0.002]} />
        </mesh>
        <mesh position={[0.07, -0.04, 0.036]} material={cyanMat}>
          <boxGeometry args={[0.012, 0.64, 0.002]} />
        </mesh>

        {/* Backrest Rear Carbon Shell */}
        <mesh position={[0, 0, -0.038]} material={leatherMat} castShadow>
          <boxGeometry args={[0.48, 0.75, 0.02]} />
        </mesh>

        {/* Waist & Mid-Torso Lateral Side Bolsters */}
        <group position={[-0.20, -0.10, 0.02]} rotation={[0, 0.38, 0]}>
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.09, 0.44, 0.08]} />
          </mesh>
          <mesh position={[-0.045, 0, 0.04]} material={cyanMat}>
            <boxGeometry args={[0.008, 0.44, 0.008]} />
          </mesh>
        </group>
        <group position={[0.20, -0.10, 0.02]} rotation={[0, -0.38, 0]}>
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.09, 0.44, 0.08]} />
          </mesh>
          <mesh position={[0.045, 0, 0.04]} material={cyanMat}>
            <boxGeometry args={[0.008, 0.44, 0.008]} />
          </mesh>
        </group>

        {/* Flared Shoulder Bolster Wings */}
        <group position={[-0.24, 0.16, 0.02]} rotation={[0, 0.45, -0.12]}>
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.13, 0.22, 0.07]} />
          </mesh>
          <mesh position={[-0.06, 0, 0.035]} material={cyanMat}>
            <boxGeometry args={[0.01, 0.22, 0.01]} />
          </mesh>
        </group>
        <group position={[0.24, 0.16, 0.02]} rotation={[0, -0.45, 0.12]}>
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.13, 0.22, 0.07]} />
          </mesh>
          <mesh position={[0.06, 0, 0.035]} material={cyanMat}>
            <boxGeometry args={[0.01, 0.22, 0.01]} />
          </mesh>
        </group>

        {/* Tapered Headrest Top & Outer Cyan Edge Trim */}
        <mesh position={[0, 0.37, 0]} material={leatherMat} castShadow>
          <boxGeometry args={[0.30, 0.14, 0.07]} />
        </mesh>
        {/* Full perimeter cyan border trim arching over top of headrest */}
        <mesh position={[0, 0.442, 0]} material={cyanMat}>
          <boxGeometry args={[0.30, 0.01, 0.072]} />
        </mesh>
        <mesh position={[-0.155, 0.37, 0]} rotation={[0, 0, -0.1]} material={cyanMat}>
          <boxGeometry args={[0.01, 0.14, 0.072]} />
        </mesh>
        <mesh position={[0.155, 0.37, 0]} rotation={[0, 0, 0.1]} material={cyanMat}>
          <boxGeometry args={[0.01, 0.14, 0.072]} />
        </mesh>

        {/* "TYPING" / Grapxly cyan embroidery logo at the headrest crest */}
        <group position={[0, 0.38, 0.038]}>
          <mesh material={cyanMat}>
            <boxGeometry args={[0.09, 0.018, 0.002]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* DUAL AERODYNAMIC HARNESS CUTOUT PORTS (Distinct Grapxly holes) */}
        {/* ============================================================== */}
        {[-0.075, 0.075].map((x, idx) => (
          <group key={`harness-hole-${idx}`} position={[x, 0.23, 0]}>
            {/* Inner pass-through cutout cavity (black void) */}
            <mesh material={plasticMat}>
              <boxGeometry args={[0.065, 0.045, 0.08]} />
            </mesh>
            {/* Front glossy plastic bezel ring */}
            <mesh position={[0, 0, 0.038]} material={harnessBevelMat}>
              <boxGeometry args={[0.078, 0.055, 0.01]} />
            </mesh>
            {/* Rear glossy plastic bezel ring */}
            <mesh position={[0, 0, -0.042]} material={harnessBevelMat}>
              <boxGeometry args={[0.078, 0.055, 0.01]} />
            </mesh>
          </group>
        ))}

        {/* ============================================================== */}
        {/* 7. REMOVABLE HEADREST & LUMBAR CUSHIONS (Grapxly Pillow Set)    */}
        {/* ============================================================== */}
        {/* Headrest Neck Pillow (Trapezoidal with cyan side wedges) */}
        <group position={[0, 0.22, 0.07]}>
          {/* Elastic harness mounting strap */}
          <mesh position={[0, 0, -0.03]} material={strapMat}>
            <boxGeometry args={[0.22, 0.025, 0.005]} />
          </mesh>
          {/* Main cushion center */}
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.065]} />
          </mesh>
          {/* Left cyan accent wedge */}
          <mesh position={[-0.09, 0, 0]} rotation={[0, 0, 0.1]} material={cyanMat} castShadow>
            <boxGeometry args={[0.045, 0.11, 0.062]} />
          </mesh>
          {/* Right cyan accent wedge */}
          <mesh position={[0.09, 0, 0]} rotation={[0, 0, -0.1]} material={cyanMat} castShadow>
            <boxGeometry args={[0.045, 0.11, 0.062]} />
          </mesh>
        </group>

        {/* Ergonomic Lumbar Support Cushion */}
        <group position={[0, -0.14, 0.065]}>
          {/* Vertical elastic harness straps passing down through harness holes */}
          {[-0.075, 0.075].map((sx, sIdx) => (
            <mesh key={`lumb-strap-${sIdx}`} position={[sx, 0.18, -0.025]} material={strapMat}>
              <boxGeometry args={[0.02, 0.32, 0.003]} />
            </mesh>
          ))}
          {/* Main lumbar cushion block */}
          <mesh material={leatherMat} castShadow>
            <boxGeometry args={[0.22, 0.15, 0.06]} />
          </mesh>
          {/* Left cyan wing bolster */}
          <mesh position={[-0.13, 0, 0]} rotation={[0, -0.2, 0]} material={cyanMat} castShadow>
            <boxGeometry args={[0.05, 0.14, 0.055]} />
          </mesh>
          {/* Right cyan wing bolster */}
          <mesh position={[0.13, 0, 0]} rotation={[0, 0.2, 0]} material={cyanMat} castShadow>
            <boxGeometry args={[0.05, 0.14, 0.055]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export const GamingChair: React.FC = () => {
  // Directly render the custom Grapxly replica model
  return <PrimitiveGamingChair />;
};
