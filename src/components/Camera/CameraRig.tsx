import React from 'react';
import { useCameraStore } from '../../store/useCameraStore';
import { useCameraInput } from '../../hooks/useCameraInput';
import { ThirdPersonCamera } from './ThirdPersonCamera';
import { FirstPersonCamera } from './FirstPersonCamera';

/**
 * CameraRig manages active camera mode, smooth transition between
 * First-Person and Third-Person views, and mouse drag/scroll listeners.
 */
export const CameraRig: React.FC = () => {
  const mode = useCameraStore((s) => s.mode);

  // Bind mouse drag (left click held) and scroll wheel zooming
  useCameraInput();

  return mode === 'first' ? <FirstPersonCamera /> : <ThirdPersonCamera />;
};
