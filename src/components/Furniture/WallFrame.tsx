import React, { Suspense, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface WallFrameProps {
  title: string;
  imageUrl?: string;
  width?: number;
  height?: number;
  glowIntensity?: number;
  frameColor?: string;
}

/**
 * Procedural sample canvas texture generator for when an image is not yet provided.
 */
function createSampleTexture(title: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d')!;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 360);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 360);

  // Border outline
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 480, 328);

  // Subtle diagonal watermark stripes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let i = -360; i < 512; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 360, 360);
    ctx.stroke();
  }

  // "SAMPLE" stamp
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SAMPLE ASSET', 256, 140);

  // Item Title
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px sans-serif';
  const cleanTitle = title.replace('[SAMPLE - replace me]', '').trim();
  ctx.fillText(cleanTitle.length > 36 ? cleanTitle.slice(0, 34) + '...' : cleanTitle, 256, 185);

  ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
  ctx.font = '12px sans-serif';
  ctx.fillText('Drop image in public/images/', 256, 220);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const ImagePlane: React.FC<{ url: string; width: number; height: number }> = ({
  url,
  width,
  height,
}) => {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={[0, 0, 0.012]}>
      <planeGeometry args={[width - 0.1, height - 0.1]} />
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.05} />
    </mesh>
  );
};

const FallbackPlane: React.FC<{ width: number; height: number; title: string }> = ({
  width,
  height,
  title,
}) => {
  const sampleTexture = useMemo(() => createSampleTexture(title), [title]);

  return (
    <mesh position={[0, 0, 0.012]}>
      <planeGeometry args={[width - 0.1, height - 0.1]} />
      <meshStandardMaterial map={sampleTexture} roughness={0.5} metalness={0.05} />
    </mesh>
  );
};

export const WallFrame: React.FC<WallFrameProps> = ({
  title,
  imageUrl,
  width = 0.76,
  height = 0.54,
  glowIntensity = 0,
  frameColor = '#0f172a',
}) => {
  const hasValidImage = Boolean(imageUrl && imageUrl.trim() !== '');

  return (
    <group>
      {/* Outer picture frame border (Black / Dark charcoal wood) */}
      <mesh position={[0, 0, 0.008]}>
        <boxGeometry args={[width, height, 0.024]} />
        <meshStandardMaterial color={frameColor} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Frame emissive rim highlight (active on proximity) */}
      {glowIntensity > 0.01 && (
        <mesh position={[0, 0, 0.009]}>
          <boxGeometry args={[width + 0.015, height + 0.015, 0.022]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#38bdf8"
            emissiveIntensity={glowIntensity * 0.8}
            roughness={1}
            transparent
            opacity={glowIntensity}
          />
        </mesh>
      )}

      {/* Mat / Passe-partout insert */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width - 0.05, height - 0.05]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </mesh>

      {/* Picture / Certificate surface */}
      {hasValidImage ? (
        <Suspense fallback={<FallbackPlane width={width} height={height} title={title} />}>
          <ImagePlane url={imageUrl!} width={width} height={height} />
        </Suspense>
      ) : (
        <FallbackPlane width={width} height={height} title={title} />
      )}
    </group>
  );
};
