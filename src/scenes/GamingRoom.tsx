import React from 'react';
import { RoomLighting } from '../components/Lighting/RoomLighting';
import { GamingRoomModel } from '../components/Room/GamingRoomModel';
import { Character } from '../components/Character/Character';
import { CameraRig } from '../components/Camera/CameraRig';
import { InteractionDetector } from '../components/Interactions/InteractionDetector';
import { InteractionIndicator } from '../components/Interactions/InteractionIndicator';
import { PostProcessingEffects } from '../components/Lighting/PostProcessingEffects';
import { AdaptivePerformance } from '../components/UI/AdaptivePerformance';

export const GamingRoom: React.FC = () => {
  return (
    <>
      <RoomLighting />
      <GamingRoomModel />
      <InteractionIndicator />
      <Character />
      <InteractionDetector />
      <CameraRig />
      <PostProcessingEffects />
      <AdaptivePerformance />
    </>
  );
};
