import * as THREE from 'three';

let cachedWoodFloorTexture: THREE.CanvasTexture | null = null;
let cachedWallTexture: THREE.CanvasTexture | null = null;

/**
 * Creates a photorealistic natural golden oak wood plank texture.
 * Features warm honey/oak tones, realistic subtle grain variation, and clean plank seams.
 */
export function getProceduralWoodTexture(): THREE.CanvasTexture {
  if (cachedWoodFloorTexture) return cachedWoodFloorTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base natural warm oak color
  ctx.fillStyle = '#C8A882';
  ctx.fillRect(0, 0, 512, 512);

  // Planks
  const plankHeight = 64;
  for (let y = 0; y < 512; y += plankHeight) {
    // Subtle plank-to-plank natural warmth and luminosity variation
    const variant = (Math.random() * 16 - 8) | 0;
    const r = Math.min(240, Math.max(180, 204 + variant));
    const g = Math.min(215, Math.max(160, 172 + variant));
    const b = Math.min(185, Math.max(130, 136 + variant));
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, y, 512, plankHeight - 2);

    // Warm subtle plank bevel seam
    ctx.fillStyle = '#9C7A54';
    ctx.fillRect(0, y + plankHeight - 2, 512, 2);

    // Fine organic wood grain lines
    ctx.fillStyle = 'rgba(125, 90, 55, 0.14)';
    for (let i = 0; i < 7; i++) {
      const lineY = y + Math.random() * (plankHeight - 3);
      ctx.fillRect(0, lineY, 512, 1);
    }
  }

  // Staggered vertical plank join seams
  ctx.fillStyle = '#9C7A54';
  ctx.fillRect(160, 0, 2, 128);
  ctx.fillRect(340, 128, 2, 128);
  ctx.fillRect(200, 256, 2, 128);
  ctx.fillRect(380, 384, 2, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  cachedWoodFloorTexture = texture;
  return texture;
}

/**
 * Creates a subtle, light warm-ivory / greige plaster wall texture.
 * Has very fine micro-stipple noise so painted surfaces catch light with realistic tactile depth
 * without darkening the base architectural colors.
 */
export function getProceduralWallTexture(): THREE.CanvasTexture {
  if (cachedWallTexture) return cachedWallTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Base warm light neutral
  ctx.fillStyle = '#F2EDE4';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle per-pixel stipple noise in high-luminance range
  const imgData = ctx.getImageData(0, 0, 256, 256);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() * 12 - 6) | 0;
    data[i] = Math.min(255, Math.max(225, 240 + noise));
    data[i + 1] = Math.min(255, Math.max(220, 235 + noise));
    data[i + 2] = Math.min(255, Math.max(210, 226 + noise));
    data[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);

  cachedWallTexture = texture;
  return texture;
}
