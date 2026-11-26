import React, { Suspense, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Safe glob discovery for optional GLB models (never fails build if missing)
export const modelModules = import.meta.glob('/src/assets/models/*.glb', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function getModelUrl(fileName: string): string | undefined {
  return modelModules[`/src/assets/models/${fileName}`];
}

interface ModelLoaderProps {
  url?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  targetSize?: [number, number, number]; // [width, height, depth]
  verticalOffset?: number;
  fallback: React.ReactNode;
  castShadow?: boolean;
  receiveShadow?: boolean;
  hasBakedLighting?: boolean;
}

class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any) {
    console.warn('GLB furniture model failed to load, falling back to primitive:', err);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const GLTFInstance: React.FC<{
  url: string;
  targetSize?: [number, number, number];
  verticalOffset?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  hasBakedLighting?: boolean;
}> = ({
  url,
  targetSize,
  verticalOffset = 0,
  castShadow = true,
  receiveShadow = true,
  hasBakedLighting = false,
}) => {
  const gltf = useGLTF(url);

  const processedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    let totalTriangles = 0;
    const lightsToRemove: THREE.Object3D[] = [];

    // 1. Cull any punctual lights inside GLB to enforce strict 4-light ceiling
    clone.traverse((child) => {
      if ((child as THREE.Light).isLight) {
        lightsToRemove.push(child);
      } else if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) {
          const count = mesh.geometry.index
            ? mesh.geometry.index.count / 3
            : mesh.geometry.attributes.position.count / 3;
          totalTriangles += Math.round(count);
        }

        // Configure shadows (suppress castShadow if baked lighting is present to avoid double-darkening)
        mesh.castShadow = hasBakedLighting ? false : castShadow;
        mesh.receiveShadow = receiveShadow;

        // Ensure materials preserve AO, lightmaps, and emissive channels
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.aoMap) {
            mat.aoMapIntensity = hasBakedLighting ? 0.7 : 1.0;
          }
        }
      }
    });

    lightsToRemove.forEach((light) => {
      light.parent?.remove(light);
    });

    // Dev-only polygon count warnings
    if (import.meta.env.DEV && totalTriangles > 45000) {
      console.warn(
        `[Performance Warning] Model '${url}' has ${totalTriangles} triangles, which may impact frame rate.`
      );
    }

    // 2. Measure bounding box and auto-fit to target dimensions
    const bbox = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    if (targetSize && size.x > 0.001 && size.y > 0.001 && size.z > 0.001) {
      // Uniformly scale to fit within target bounding dimensions
      const scaleX = targetSize[0] / size.x;
      const scaleY = targetSize[1] / size.y;
      const scaleZ = targetSize[2] / size.z;
      const uniformScale = Math.min(scaleX, scaleY, scaleZ);

      clone.scale.setScalar(uniformScale);

      // Re-measure after scaling and ground base flat on y = verticalOffset
      bbox.setFromObject(clone);
      clone.position.y = -bbox.min.y + verticalOffset;
    }

    return clone;
  }, [gltf.scene, targetSize, verticalOffset, castShadow, receiveShadow, hasBakedLighting, url]);

  return <primitive object={processedScene} />;
};

export const ModelLoader: React.FC<ModelLoaderProps> = ({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  targetSize,
  verticalOffset = 0,
  fallback,
  castShadow = true,
  receiveShadow = true,
  hasBakedLighting = false,
}) => {
  if (!url) {
    return <>{fallback}</>;
  }

  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <group position={position} rotation={rotation}>
          <GLTFInstance
            url={url}
            targetSize={targetSize}
            verticalOffset={verticalOffset}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            hasBakedLighting={hasBakedLighting}
          />
        </group>
      </Suspense>
    </ModelErrorBoundary>
  );
};
