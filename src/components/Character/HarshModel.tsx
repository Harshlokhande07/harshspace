import React, { useMemo, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';
import { useCharacterAnimations } from '../../hooks/useCharacterAnimations';
import { CharacterErrorBoundary } from './CharacterErrorBoundary';
import { useCharacterStore } from '../../store/useCharacterStore';

// Stylized capsule fallback that adjusts pose when seated or lying
export const CapsuleAvatar: React.FC = () => {
  const actionState = useCharacterStore((s) => s.actionState);

  const isSeated = actionState === 'seated' || actionState === 'sitting-down';
  const isLying = actionState === 'lying' || actionState === 'lying-down';

  // Adjust posture for capsule fallback
  const groupY = isSeated ? -0.25 : isLying ? -0.45 : 0;
  const groupRotX = isLying ? -Math.PI / 2 : 0;

  return (
    <group position={[0, groupY, 0]} rotation={[groupRotX, 0, 0]}>
      {/* Capsule body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.3, isSeated ? 0.5 : 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.4}
          metalness={0.2}
          emissive="#0284c7"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Visor indicating forward facing direction */}
      <mesh position={[0, isSeated ? 0.16 : 0.28, 0.26]}>
        <boxGeometry args={[0.28, 0.12, 0.1]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
          emissive="#38bdf8"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
};

// Safe discovery using import.meta.glob (all files optional, never causes build failure)
const characterFbxModules = import.meta.glob('/src/assets/character/*.fbx', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const harshUrl = characterFbxModules['/src/assets/character/harsh.fbx'];
const idleUrl = characterFbxModules['/src/assets/character/idle.fbx'];
const walkUrl = characterFbxModules['/src/assets/character/walk.fbx'];
const runUrl = characterFbxModules['/src/assets/character/run.fbx'];

// Optional action clips
const sitIdleUrl = characterFbxModules['/src/assets/character/sit-idle.fbx'];
const sitTypingUrl = characterFbxModules['/src/assets/character/sit-typing.fbx'];
const standToSitUrl = characterFbxModules['/src/assets/character/stand-to-sit.fbx'];
const sitToStandUrl = characterFbxModules['/src/assets/character/sit-to-stand.fbx'];
const drinkingUrl = characterFbxModules['/src/assets/character/drinking.fbx'];
const lieDownUrl = characterFbxModules['/src/assets/character/lie-down.fbx'];
const sleepingUrl = characterFbxModules['/src/assets/character/sleeping.fbx'];
const getUpUrl = characterFbxModules['/src/assets/character/get-up.fbx'];

interface HarshModelProps {
  speedRef?: React.MutableRefObject<number>;
}

const HarshMeshInner: React.FC<HarshModelProps> = ({ speedRef }) => {
  if (!harshUrl) {
    return <CapsuleAvatar />;
  }

  // Load harsh FBX and available animation clips
  const fbx = useLoader(FBXLoader, harshUrl);
  const idleFbx = idleUrl ? useLoader(FBXLoader, idleUrl) : null;
  const walkFbx = walkUrl ? useLoader(FBXLoader, walkUrl) : null;
  const runFbx = runUrl ? useLoader(FBXLoader, runUrl) : null;

  // Optional action clips
  const sitIdleFbx = sitIdleUrl ? useLoader(FBXLoader, sitIdleUrl) : null;
  const sitTypingFbx = sitTypingUrl ? useLoader(FBXLoader, sitTypingUrl) : null;
  const standToSitFbx = standToSitUrl ? useLoader(FBXLoader, standToSitUrl) : null;
  const sitToStandFbx = sitToStandUrl ? useLoader(FBXLoader, sitToStandUrl) : null;
  const drinkingFbx = drinkingUrl ? useLoader(FBXLoader, drinkingUrl) : null;
  const lieDownFbx = lieDownUrl ? useLoader(FBXLoader, lieDownUrl) : null;
  const sleepingFbx = sleepingUrl ? useLoader(FBXLoader, sleepingUrl) : null;
  const getUpFbx = getUpUrl ? useLoader(FBXLoader, getUpUrl) : null;

  // Clone skinned model cleanly with SkeletonUtils
  const clonedModel = useMemo(() => {
    const clone = SkeletonUtils.clone(fbx);

    // Compute bounding box to normalize scale to ~1.7m height with feet grounded
    const bbox = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    const targetHeight = 1.7;
    const scaleFactor = size.y > 0.001 ? targetHeight / size.y : 0.01;
    clone.scale.setScalar(scaleFactor);

    // Offset so feet touch ground (y = -0.7 relative to character center at y = 0.7)
    bbox.setFromObject(clone);
    clone.position.y = -bbox.min.y - 0.7;

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
      }
    });

    return clone;
  }, [fbx]);

  // Aggregate animation clips from harsh.fbx and animation FBXs
  const clips = useMemo(() => {
    const list: THREE.AnimationClip[] = [];

    const addClip = (animFbx: any, name: string) => {
      if (animFbx?.animations?.[0]) {
        const c = animFbx.animations[0].clone();
        c.name = name;
        list.push(c);
      }
    };

    if (fbx.animations) {
      fbx.animations.forEach((c) => {
        c.name = c.name || 'idle';
        list.push(c);
      });
    }

    addClip(idleFbx, 'idle');
    addClip(walkFbx, 'walk');
    addClip(runFbx, 'run');

    // Action clips
    addClip(sitIdleFbx, 'sit-idle');
    addClip(sitTypingFbx, 'sit-typing');
    addClip(standToSitFbx, 'stand-to-sit');
    addClip(sitToStandFbx, 'sit-to-stand');
    addClip(drinkingFbx, 'drinking');
    addClip(lieDownFbx, 'lie-down');
    addClip(sleepingFbx, 'sleeping');
    addClip(getUpFbx, 'get-up');

    return list;
  }, [
    fbx,
    idleFbx,
    walkFbx,
    runFbx,
    sitIdleFbx,
    sitTypingFbx,
    standToSitFbx,
    sitToStandFbx,
    drinkingFbx,
    lieDownFbx,
    sleepingFbx,
    getUpFbx,
  ]);

  useCharacterAnimations(clonedModel, clips, speedRef);

  return <primitive object={clonedModel} />;
};

export const HarshModel: React.FC<HarshModelProps> = React.memo((props) => {
  return (
    <CharacterErrorBoundary fallback={<CapsuleAvatar />}>
      <Suspense fallback={<CapsuleAvatar />}>
        <HarshMeshInner {...props} />
      </Suspense>
    </CharacterErrorBoundary>
  );
});
