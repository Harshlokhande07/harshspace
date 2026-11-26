import React from 'react';
import { EffectComposer, Bloom, N8AO, SMAA } from '@react-three/postprocessing';
import { useGraphicsStore } from '../../store/useGraphicsStore';

/**
 * Post-processing pipeline with adaptive quality presets:
 * - Low: Effects bypassed entirely for maximum framerate
 * - Medium: Subtle emissive bloom on screens/RGB and SMAA antialiasing
 * - High: Adds N8AO contact ambient occlusion for deeper shadows
 */
export const PostProcessingEffects: React.FC = () => {
  const quality = useGraphicsStore((s) => s.quality);

  if (quality === 'low') {
    return null;
  }

  if (quality === 'medium') {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.85}
          luminanceSmoothing={0.3}
          intensity={0.45}
          mipmapBlur
        />
        <SMAA />
      </EffectComposer>
    );
  }

  // High quality: Bloom + half-resolution N8AO + SMAA
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.85}
        luminanceSmoothing={0.3}
        intensity={0.4}
        mipmapBlur
      />
      <N8AO
        halfRes
        aoRadius={0.7}
        intensity={1.0}
        distanceFalloff={0.2}
        quality="low"
      />
      <SMAA />
    </EffectComposer>
  );
};
