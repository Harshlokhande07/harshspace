import React, { useMemo, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';
import { useCharacterAnimations } from '../../hooks/useCharacterAnimations';
import { CharacterErrorBoundary } from './CharacterErrorBoundary';
import { MinecraftBoy } from './MinecraftBoy';

// Safe discovery using import.meta.glob (FBX & GLB/GLTF models)
const characterFbxModules = import.meta.glob('/src/assets/character/*.fbx', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const characterGltfModules = import.meta.glob('/src/assets/character/*.{glb,gltf}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Check for explicit files or any character model in directory
const harshFbxUrl = characterFbxModules['/src/assets/character/harsh.fbx'];
const harshGlbUrl =
  characterGltfModules['/src/assets/character/harsh.glb'] ||
  characterGltfModules['/src/assets/character/harsh.gltf'] ||
  characterGltfModules['/src/assets/character/minecraft.glb'] ||
  characterGltfModules['/src/assets/character/boy.glb'] ||
  Object.values(characterGltfModules)[0];

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

/**
 * Loads and renders an external rigged GLB/GLTF model.
 */
const HarshGLTFMesh: React.FC<{ url: string; speedRef?: React.MutableRefObject<number> }> = ({
  url,
  speedRef,
}) => {
  const gltf = useGLTF(url);

  const clonedModel = useMemo(() => {
    const clone = SkeletonUtils.clone(gltf.scene);

    const bbox = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    const targetHeight = 1.7;
    const scaleFactor = size.y > 0.001 ? targetHeight / size.y : 0.01;
    clone.scale.setScalar(scaleFactor);

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
  }, [gltf.scene]);

  useCharacterAnimations(clonedModel, gltf.animations || [], speedRef);

  return <primitive object={clonedModel} />;
};

/**
 * Loads and renders an external rigged FBX model with optional Mixamo clips.
 */
const HarshFBXMesh: React.FC<{ url: string; speedRef?: React.MutableRefObject<number> }> = ({
  url,
  speedRef,
}) => {
  const fbx = useLoader(FBXLoader, url);
  const idleFbx = idleUrl ? useLoader(FBXLoader, idleUrl) : null;
  const walkFbx = walkUrl ? useLoader(FBXLoader, walkUrl) : null;
  const runFbx = runUrl ? useLoader(FBXLoader, runUrl) : null;

  const sitIdleFbx = sitIdleUrl ? useLoader(FBXLoader, sitIdleUrl) : null;
  const sitTypingFbx = sitTypingUrl ? useLoader(FBXLoader, sitTypingUrl) : null;
  const standToSitFbx = standToSitUrl ? useLoader(FBXLoader, standToSitUrl) : null;
  const sitToStandFbx = sitToStandUrl ? useLoader(FBXLoader, sitToStandUrl) : null;
  const drinkingFbx = drinkingUrl ? useLoader(FBXLoader, drinkingUrl) : null;
  const lieDownFbx = lieDownUrl ? useLoader(FBXLoader, lieDownUrl) : null;
  const sleepingFbx = sleepingUrl ? useLoader(FBXLoader, sleepingUrl) : null;
  const getUpFbx = getUpUrl ? useLoader(FBXLoader, getUpUrl) : null;

  const clonedModel = useMemo(() => {
    const clone = SkeletonUtils.clone(fbx);

    const bbox = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    const targetHeight = 1.7;
    const scaleFactor = size.y > 0.001 ? targetHeight / size.y : 0.01;
    clone.scale.setScalar(scaleFactor);

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

/**
 * Main Character Model Component:
 * - If an external GLB/GLTF or FBX file is placed in /src/assets/character/, it mounts and animates it.
 * - Otherwise, it immediately mounts the procedural Rigged Minecraft Boy with full limb swinging,
 *   walking, running, seated keyboard typing, and lying bed animations.
 */
export const HarshModel: React.FC<HarshModelProps> = React.memo((props) => {
  const fallbackBoy = <MinecraftBoy speedRef={props.speedRef} />;

  if (harshGlbUrl) {
    return (
      <CharacterErrorBoundary fallback={fallbackBoy}>
        <Suspense fallback={fallbackBoy}>
          <HarshGLTFMesh url={harshGlbUrl} speedRef={props.speedRef} />
        </Suspense>
      </CharacterErrorBoundary>
    );
  }

  if (harshFbxUrl) {
    return (
      <CharacterErrorBoundary fallback={fallbackBoy}>
        <Suspense fallback={fallbackBoy}>
          <HarshFBXMesh url={harshFbxUrl} speedRef={props.speedRef} />
        </Suspense>
      </CharacterErrorBoundary>
    );
  }

  // Active Default: Rigged Minecraft Boy
  return fallbackBoy;
});
