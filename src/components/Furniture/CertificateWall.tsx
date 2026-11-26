import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useRoomEffectsStore } from '../../store/useRoomEffectsStore';

/**
 * "Composition of frames for wall decoration" by 3D Render Box (Sketchfab f1cdbd8d711b43e58c5edba6caa7b412)
 * Desenio gallery wall replacing the old black certificate frames on the walnut acoustic slat wall.
 *
 * Exact 1:1 original composition of 7 frames with brushed gold/champagne frames:
 * 1. Center Hero Frame (Vertical): Lush botanical Eucalyptus branches & leaves on soft sage
 * 2. Top-Left Frame (Horizontal): Horizontal botanical Eucalyptus branch
 * 3. Top-Center Frame (Vertical): Typography poster "Life is not always perfect..."
 * 4. Middle-Left Frame (Vertical): 3 Phases of the Moon (Crescent, Half, Full)
 * 5. Bottom-Left Frame (Vertical): Iconic B&W Freddie Mercury concert pose (raised fist)
 * 6. Top-Right Frame (Vertical): B&W fine art portrait of woman's shoulder & white drape
 * 7. Bottom-Right Frame (Vertical): Sage green patterned border with typography quote
 */
export const CertificateWall: React.FC = () => {
  const [glow, setGlow] = useState(0);
  const glowRef = useRef(0);
  const spotlightMeshRef = useRef<THREE.Mesh>(null);
  const setCertificateWallGlow = useRoomEffectsStore((s) => s.setCertificateWallGlow);
  const openInteraction = useInteractionStore((s) => s.openInteraction);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const nearestId = useInteractionStore.getState().nearestId;
    const activeId = useInteractionStore.getState().activeId;

    const isNear = nearestId === 'achievements' || activeId === 'achievements';
    const targetGlow = isNear ? 1.0 : 0.0;

    glowRef.current = THREE.MathUtils.damp(glowRef.current, targetGlow, 5.0, dt);

    if (Math.abs(glowRef.current - glow) > 0.02) {
      setGlow(glowRef.current);
      setCertificateWallGlow(glowRef.current);
    }

    if (spotlightMeshRef.current) {
      const mat = spotlightMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = glowRef.current * 0.22;
    }
  });

  // 1. Center Large Frame Texture: Lush Botanical Eucalyptus Branch
  const centerEucalyptusTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext('2d')!;

    // Clean white mat border
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 720);

    // Pale soft sage-ivory background
    ctx.fillStyle = '#E4EAE5';
    ctx.fillRect(24, 24, 464, 672);

    // Subtle watercolor wash
    const grad = ctx.createLinearGradient(0, 0, 512, 720);
    grad.addColorStop(0, '#E8EFE9');
    grad.addColorStop(1, '#DDE5DE');
    ctx.fillStyle = grad;
    ctx.fillRect(24, 24, 464, 672);

    // Main Central Eucalyptus Stems
    ctx.strokeStyle = '#233928';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(256, 680);
    ctx.quadraticCurveTo(248, 420, 252, 220);
    ctx.stroke();

    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(250, 520);
    ctx.quadraticCurveTo(285, 380, 298, 260);
    ctx.stroke();

    // Leaf Pairs along stems
    const leaves = [
      // Left branch leaves
      { x: 220, y: 600, rx: 32, ry: 20, rot: -0.4, col: '#2E4C33' },
      { x: 285, y: 580, rx: 34, ry: 21, rot: 0.35, col: '#3A5F41' },
      { x: 210, y: 520, rx: 36, ry: 22, rot: -0.5, col: '#28442D' },
      { x: 295, y: 490, rx: 35, ry: 21, rot: 0.45, col: '#34553A' },
      { x: 215, y: 440, rx: 33, ry: 20, rot: -0.4, col: '#3F6546' },
      { x: 288, y: 410, rx: 34, ry: 20, rot: 0.3, col: '#2E4C33' },
      { x: 225, y: 360, rx: 30, ry: 18, rot: -0.35, col: '#34553A' },
      { x: 280, y: 330, rx: 30, ry: 18, rot: 0.4, col: '#456D4D' },
      { x: 235, y: 290, rx: 26, ry: 16, rot: -0.3, col: '#2E4C33' },
      { x: 270, y: 260, rx: 25, ry: 15, rot: 0.3, col: '#3A5F41' },
      { x: 245, y: 220, rx: 20, ry: 13, rot: -0.2, col: '#4A7552' },
      { x: 254, y: 190, rx: 16, ry: 11, rot: 0.1, col: '#55825E' },
      // Secondary right branch leaves
      { x: 320, y: 440, rx: 28, ry: 18, rot: 0.5, col: '#3A5F41' },
      { x: 310, y: 370, rx: 26, ry: 17, rot: 0.4, col: '#2E4C33' },
      { x: 325, y: 310, rx: 24, ry: 15, rot: 0.45, col: '#456D4D' },
      { x: 305, y: 250, rx: 20, ry: 13, rot: 0.3, col: '#55825E' },
    ];

    leaves.forEach((l) => {
      ctx.fillStyle = l.col;
      ctx.beginPath();
      ctx.ellipse(l.x, l.y, l.rx, l.ry, l.rot, 0, Math.PI * 2);
      ctx.fill();

      // Delicate leaf center vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(l.x - Math.cos(l.rot) * l.rx * 0.8, l.y - Math.sin(l.rot) * l.rx * 0.8);
      ctx.lineTo(l.x + Math.cos(l.rot) * l.rx * 0.8, l.y + Math.sin(l.rot) * l.rx * 0.8);
      ctx.stroke();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 2. Top-Left Frame Texture: Horizontal Botanical Eucalyptus Branch
  const topLeftEucalyptusTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 440;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 640, 440);

    ctx.fillStyle = '#EFF3EF';
    ctx.fillRect(20, 20, 600, 400);

    // Horizontal delicate branch
    ctx.strokeStyle = '#2B3D2F';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(60, 240);
    ctx.bezierCurveTo(240, 210, 420, 250, 580, 220);
    ctx.stroke();

    // Eucalyptus leaves spread along horizontal stem
    const leaves = [
      { x: 120, y: 220, rx: 32, ry: 19, rot: -0.6, col: '#3A573F' },
      { x: 180, y: 260, rx: 34, ry: 20, rot: 0.5, col: '#45694C' },
      { x: 240, y: 205, rx: 36, ry: 21, rot: -0.4, col: '#2F4834' },
      { x: 300, y: 250, rx: 33, ry: 20, rot: 0.45, col: '#3A573F' },
      { x: 360, y: 215, rx: 35, ry: 21, rot: -0.3, col: '#4D7354' },
      { x: 420, y: 255, rx: 32, ry: 19, rot: 0.35, col: '#2F4834' },
      { x: 480, y: 210, rx: 28, ry: 17, rot: -0.5, col: '#45694C' },
      { x: 530, y: 235, rx: 24, ry: 15, rot: 0.4, col: '#5A8563' },
    ];

    leaves.forEach((l) => {
      ctx.fillStyle = l.col;
      ctx.beginPath();
      ctx.ellipse(l.x, l.y, l.rx, l.ry, l.rot, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 3. Top-Center Frame Texture: Minimalist Typography Poster
  const topCenterQuoteTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 580;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 440, 580);

    ctx.fillStyle = '#FBF9F5';
    ctx.fillRect(20, 20, 400, 540);

    // Elegant motivational typography
    ctx.fillStyle = '#1E1E22';
    ctx.font = '600 19px Georgia, serif';
    ctx.textAlign = 'center';

    const lines = [
      'LIFE IS NOT',
      'ALWAYS PERFECT,',
      'BUT IT’S ALWAYS',
      'WHAT YOU MAKE IT.',
      '',
      'SO MAKE IT COUNT,',
      'MAKE IT MEMORABLE,',
      'AND NEVER LET',
      'ANYONE STEAL YOUR',
      'HAPPINESS.',
    ];

    lines.forEach((line, idx) => {
      ctx.fillText(line, 220, 190 + idx * 28);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 4. Middle-Left Frame Texture: 3 Phases of the Moon (Monochrome)
  const moonPhasesTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 620;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 440, 620);

    ctx.fillStyle = '#F4F4F2';
    ctx.fillRect(20, 20, 400, 580);

    // Moon 1 (Top): Waxing Crescent Moon
    ctx.save();
    ctx.translate(220, 130);
    ctx.fillStyle = '#E5E7EB';
    ctx.beginPath();
    ctx.arc(0, 0, 54, 0, Math.PI * 2);
    ctx.fill();
    // Shadow mask creating crescent
    ctx.fillStyle = '#F4F4F2';
    ctx.beginPath();
    ctx.arc(24, -8, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Moon 2 (Middle): Gibbous / Half Moon with craters
    ctx.save();
    ctx.translate(220, 310);
    ctx.fillStyle = '#D1D5DB';
    ctx.beginPath();
    ctx.arc(0, 0, 56, 0, Math.PI * 2);
    ctx.fill();
    // Half shadow
    ctx.fillStyle = '#9CA3AF';
    ctx.beginPath();
    ctx.arc(0, 0, 56, -Math.PI / 2, Math.PI / 2, false);
    ctx.fill();
    // Crater spots
    ctx.fillStyle = 'rgba(75, 85, 99, 0.4)';
    ctx.beginPath();
    ctx.arc(-14, -12, 12, 0, Math.PI * 2);
    ctx.arc(10, 18, 14, 0, Math.PI * 2);
    ctx.arc(22, -18, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Moon 3 (Bottom): Detailed Full Moon
    ctx.save();
    ctx.translate(220, 490);
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.arc(0, 0, 58, 0, Math.PI * 2);
    ctx.fill();
    // Lunar mare texture patterns
    ctx.fillStyle = 'rgba(100, 116, 139, 0.42)';
    ctx.beginPath();
    ctx.ellipse(-12, -16, 26, 18, 0.3, 0, Math.PI * 2);
    ctx.ellipse(16, 14, 28, 22, -0.4, 0, Math.PI * 2);
    ctx.ellipse(-18, 18, 18, 14, 0.2, 0, Math.PI * 2);
    ctx.ellipse(18, -20, 20, 12, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 5. Bottom-Left Frame Texture: Iconic B&W Freddie Mercury Concert Pose
  const freddieMercuryTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 580;
    const ctx = canvas.getContext('2d')!;

    // Black frame mat
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 440, 580);

    // Deep theatrical black background
    ctx.fillStyle = '#111215';
    ctx.fillRect(20, 20, 400, 540);

    // Stage spotlight beam
    const spot = ctx.createRadialGradient(230, 260, 20, 230, 260, 260);
    spot.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    spot.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spot;
    ctx.fillRect(20, 20, 400, 540);

    // Freddie Mercury Iconic Silhouette (white jacket, raised right fist)
    ctx.fillStyle = '#F8FAFC';
    ctx.beginPath();
    // Raised right arm & fist
    ctx.moveTo(226, 320);
    ctx.lineTo(238, 160);
    ctx.arc(242, 142, 14, 0, Math.PI * 2); // Fist
    ctx.lineTo(258, 165);
    ctx.lineTo(262, 320);
    // Torso in jacket
    ctx.lineTo(285, 390);
    ctx.lineTo(270, 560);
    ctx.lineTo(195, 560);
    ctx.lineTo(185, 390);
    ctx.closePath();
    ctx.fill();

    // Head in profile looking up
    ctx.fillStyle = '#F1F5F9';
    ctx.beginPath();
    ctx.arc(215, 240, 18, 0, Math.PI * 2);
    ctx.fill();

    // Dark hair & mustache
    ctx.fillStyle = '#18181B';
    ctx.beginPath();
    ctx.arc(213, 234, 18, Math.PI, Math.PI * 2);
    ctx.fill();

    // Yellow jacket buckle straps (high contrast graphic lines)
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(205, 330);
    ctx.lineTo(255, 330);
    ctx.moveTo(208, 355);
    ctx.lineTo(258, 355);
    ctx.moveTo(212, 380);
    ctx.lineTo(262, 380);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 6. Top-Right Frame Texture: B&W Fine Art Woman Portrait (Shoulder & Neckline)
  const womanPortraitTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 440;
    canvas.height = 580;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 440, 580);

    // Muted studio monochrome gradient
    const bg = ctx.createLinearGradient(0, 0, 440, 580);
    bg.addColorStop(0, '#2D3036');
    bg.addColorStop(1, '#1A1C20');
    ctx.fillStyle = bg;
    ctx.fillRect(20, 20, 400, 540);

    // Soft portrait highlights on collarbone and graceful neck
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    // Neck line
    ctx.moveTo(190, 80);
    ctx.quadraticCurveTo(205, 200, 160, 280);
    // Shoulder curve
    ctx.quadraticCurveTo(110, 310, 50, 360);
    ctx.lineTo(50, 560);
    ctx.lineTo(390, 560);
    // Right shoulder and back
    ctx.quadraticCurveTo(340, 360, 270, 270);
    ctx.quadraticCurveTo(240, 190, 240, 80);
    ctx.closePath();
    ctx.fill();

    // Draped white linen blouse across lower chest
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(50, 390);
    ctx.quadraticCurveTo(220, 340, 390, 430);
    ctx.lineTo(390, 560);
    ctx.lineTo(50, 560);
    ctx.closePath();
    ctx.fill();

    // Subtle drapery shadows
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(70, 420);
    ctx.quadraticCurveTo(200, 390, 360, 470);
    ctx.moveTo(100, 460);
    ctx.quadraticCurveTo(220, 430, 340, 510);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 7. Bottom-Right Frame Texture: Sage Green Patterned Border with Typography Quote
  const sageBorderQuoteTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 460;
    canvas.height = 580;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 460, 580);

    // Sage Green delicate patterned border
    ctx.fillStyle = '#6E8B75';
    ctx.fillRect(20, 20, 420, 540);

    // Inner ivory parchment box
    ctx.fillStyle = '#FBF9F4';
    ctx.fillRect(44, 44, 372, 492);

    // Thin inner gold accent border line
    ctx.strokeStyle = '#C5A86D';
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 54, 352, 472);

    // Centered motivational quote
    ctx.fillStyle = '#2C3E31';
    ctx.font = '500 17px Georgia, serif';
    ctx.textAlign = 'center';

    const lines = [
      'LIFE IS NOT',
      'ALWAYS PERFECT,',
      'BUT IT’S ALWAYS',
      'WHAT YOU MAKE IT.',
      '',
      'SO MAKE IT COUNT,',
      'MAKE IT MEMORABLE,',
      'AND NEVER LET',
      'ANYONE STEAL YOUR',
      'HAPPINESS.',
    ];

    lines.forEach((line, idx) => {
      ctx.fillText(line, 230, 195 + idx * 26);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Helper component to render an elegant gold framed artwork
  const GoldFramedArtwork: React.FC<{
    position: [number, number, number];
    width: number;
    height: number;
    texture: THREE.Texture;
    title?: string;
  }> = ({ position, width, height, texture }) => {
    const frameDepth = 0.024;
    const frameBorder = 0.024;

    return (
      <group
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          openInteraction('achievements');
        }}
      >
        {/* Outer Brushed Gold Frame (#D4AF37) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width + frameBorder * 2, height + frameBorder * 2, frameDepth]} />
          <meshStandardMaterial
            color="#C8A869"
            metalness={0.75}
            roughness={0.28}
            emissive="#D4AF37"
            emissiveIntensity={glow * 0.35}
          />
        </mesh>

        {/* White Mat Border Inset */}
        <mesh position={[0, 0, frameDepth / 2 - 0.002]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
        </mesh>

        {/* Canvas Artwork Plane */}
        <mesh position={[0, 0, frameDepth / 2 + 0.001]}>
          <planeGeometry args={[width - 0.02, height - 0.02]} />
          <meshStandardMaterial map={texture} roughness={0.65} />
        </mesh>
      </group>
    );
  };

  return (
    <group position={[-1.10, 1.72, -2.57]}>
      {/* Soft Proximity Spotlight Glow Overlay */}
      <mesh ref={spotlightMeshRef} position={[0, 0, 0.005]}>
        <planeGeometry args={[3.2, 1.6]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* =========================================================================
          DESENIO GALLERY WALL (7 FRAMES COMPOSITION by 3D Render Box)
          Exact positions calibrated to the original Sketchfab model
         ========================================================================= */}
      {/* 1. Center Large Frame: Lush Botanical Eucalyptus */}
      <GoldFramedArtwork
        position={[0, -0.04, 0]}
        width={0.52}
        height={0.72}
        texture={centerEucalyptusTexture}
        title="Botanical Eucalyptus"
      />

      {/* 2. Top-Left Frame: Horizontal Eucalyptus Branch */}
      <GoldFramedArtwork
        position={[-0.48, 0.44, 0]}
        width={0.42}
        height={0.28}
        texture={topLeftEucalyptusTexture}
        title="Eucalyptus Horizontal"
      />

      {/* 3. Top-Center Frame: Minimalist Typography Print */}
      <GoldFramedArtwork
        position={[0, 0.49, 0]}
        width={0.32}
        height={0.40}
        texture={topCenterQuoteTexture}
        title="Life Typography"
      />

      {/* 4. Middle-Left Frame: 3 Phases of the Moon */}
      <GoldFramedArtwork
        position={[-0.56, 0.04, 0]}
        width={0.30}
        height={0.40}
        texture={moonPhasesTexture}
        title="Moon Phases"
      />

      {/* 5. Bottom-Left Frame: Freddie Mercury Iconic Pose */}
      <GoldFramedArtwork
        position={[-0.53, -0.40, 0]}
        width={0.28}
        height={0.38}
        texture={freddieMercuryTexture}
        title="Freddie Mercury"
      />

      {/* 6. Top-Right Frame: B&W Woman Portrait */}
      <GoldFramedArtwork
        position={[0.42, 0.32, 0]}
        width={0.30}
        height={0.40}
        texture={womanPortraitTexture}
        title="Fine Art Silhouette"
      />

      {/* 7. Bottom-Right Frame: Sage Green Border Quote */}
      <GoldFramedArtwork
        position={[0.45, -0.21, 0]}
        width={0.36}
        height={0.46}
        texture={sageBorderQuoteTexture}
        title="Sage Border Quote"
      />
    </group>
  );
};
