import React, { useMemo } from 'react';
import { getProceduralWoodTexture, getProceduralWallTexture } from '../../utils/textures';
import { WalnutAcousticWall } from './WalnutAcousticWall';
import { EntranceDoor } from './EntranceDoor';
import { Desk } from '../Furniture/Desk';
import { GamingChair } from '../Furniture/GamingChair';
import { Bed } from '../Furniture/Bed';
import { Monitor } from '../Furniture/Monitor';
import { Keyboard } from '../Furniture/Keyboard';
import { Mouse } from '../Furniture/Mouse';
import { PCTower } from '../Furniture/PCTower';
import { Bookshelf } from '../Furniture/Bookshelf';
import { Lamp } from '../Furniture/Lamp';
import { Plant } from '../Furniture/Plant';
import { Rug } from '../Furniture/Rug';
import { WindowFrame } from '../Furniture/WindowFrame';
import { Notebook } from '../Furniture/Notebook';
import { MemoryWall } from '../Furniture/MemoryWall';
import { ContactStation } from '../Furniture/ContactStation';
import { CeilingFan } from '../Furniture/CeilingFan';
import { Switchboard } from '../Furniture/Switchboard';
import { CoffeeMug } from '../Furniture/CoffeeMug';
import { OutdoorBackdrop } from '../Furniture/OutdoorBackdrop';
import { SecretCube } from '../Furniture/SecretCube';
import { DrawerNote } from '../Furniture/DrawerNote';
import { LoungeFurniturePack } from '../Furniture/LoungeFurniturePack';
import { AirConditioner } from '../Furniture/AirConditioner';
import { IndustrialCeilingLight } from '../Furniture/IndustrialCeilingLight';
import { MinecraftSword } from '../Furniture/MinecraftSword';
import { MinecraftAquarium } from '../Furniture/MinecraftAquarium';
import { MinecraftTorch } from '../Furniture/MinecraftTorch';
import { MinecraftBee } from '../Furniture/MinecraftBee';
import { MinecraftLogo } from '../Furniture/MinecraftLogo';
import { MinecraftGirl } from '../Furniture/MinecraftGirl';
import { MinecraftCamera } from '../Furniture/MinecraftCamera';
import { Gramophone } from '../Furniture/Gramophone';
import { Easel } from '../Furniture/Easel';

/**
 * Photorealistic Extended Bedroom Shell
 * Dimensions: Extended to 7.2m W (X: -2.8 to +4.4) x 5.2m D (Z: -2.6 to +2.6) x 2.8m H
 * Features:
 * - Natural golden oak plank flooring extending through the new lounge suite
 * - Warm Ivory ceiling with architectural shadow gap reveals
 * - North Wall: Warm light greige (#D5CFC3) with natural walnut acoustic slat wall
 * - South Wall: Warm ivory (#E9E2D6) with entrance door
 * - West Wall: Architectural picture window overlooking rainy Tokyo skyline
 * - East Wall (Extended white wall): Features the Eli_ac Furniture Pack:
 *   - Modern light teal-blue couch with tapered oak legs
 *   - Standing brass floor lamp
 *   - 4 framed abstract gallery paintings
 *   - Hexagonal wooden honeycomb floating wall shelves
 *   - 3 designer indoor potted plants (Snake plant, palm, succulent)
 */
export const GamingRoomModel: React.FC = () => {
  const woodTexture = useMemo(() => getProceduralWoodTexture(), []);
  const wallTexture = useMemo(() => getProceduralWallTexture(), []);

  return (
    <group>
      {/* 1. Extended Floor: 7.2m x 5.2m natural warm golden oak planks (Center X = 0.8) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.8, 0, 0]} receiveShadow>
        <planeGeometry args={[7.2, 5.2]} />
        <meshStandardMaterial
          map={woodTexture}
          roughness={0.42}
          metalness={0.03}
        />
      </mesh>

      {/* 2. Extended Ceiling: 7.2m x 5.2m at height 2.8m in Warm White (#F2EFE8) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.8, 2.8, 0]} receiveShadow>
        <planeGeometry args={[7.2, 5.2]} />
        <meshStandardMaterial
          color="#F2EFE8"
          roughness={0.88}
          metalness={0.01}
        />
      </mesh>

      {/* Architectural Ceiling Shadow Gap Trim (North, South, East, West perimeters at Y = 2.785) */}
      <mesh position={[0.8, 2.785, -2.58]}>
        <boxGeometry args={[7.16, 0.03, 0.02]} />
        <meshStandardMaterial color="#BDB5A8" roughness={0.6} />
      </mesh>
      <mesh position={[0.8, 2.785, 2.58]}>
        <boxGeometry args={[7.16, 0.03, 0.02]} />
        <meshStandardMaterial color="#BDB5A8" roughness={0.6} />
      </mesh>
      <mesh position={[-2.78, 2.785, 0]}>
        <boxGeometry args={[0.02, 0.03, 5.16]} />
        <meshStandardMaterial color="#BDB5A8" roughness={0.6} />
      </mesh>
      <mesh position={[4.38, 2.785, 0]}>
        <boxGeometry args={[0.02, 0.03, 5.16]} />
        <meshStandardMaterial color="#BDB5A8" roughness={0.6} />
      </mesh>

      {/* Flush architectural ceiling downlight bezels */}
      {[-1.3, 1.3, 3.1].map((cx, i) =>
        [-1.0, 1.0].map((cz, j) => (
          <group key={`${i}-${j}`} position={[cx, 2.798, cz]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <ringGeometry args={[0.045, 0.065, 24]} />
              <meshStandardMaterial color="#DDD6CB" roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, -0.001]}>
              <circleGeometry args={[0.044, 20]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.2} />
            </mesh>
          </group>
        ))
      )}

      {/* Entrance Doorway Floor Threshold Trim (Brushed Brass #B59E7A) */}
      <mesh position={[1.75, 0.005, 2.58]}>
        <boxGeometry args={[0.96, 0.01, 0.08]} />
        <meshStandardMaterial color="#B59E7A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3. Baseboards / Skirting (0.08m tall) in Warm Architectural Neutral (#C8C0B2) */}
      {/* North Wall Baseboard */}
      <mesh position={[0.8, 0.04, -2.575]} receiveShadow>
        <boxGeometry args={[7.16, 0.08, 0.02]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* South Wall Baseboard Left of Door */}
      <mesh position={[-0.75, 0.04, 2.575]} receiveShadow>
        <boxGeometry args={[4.06, 0.08, 0.02]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* South Wall Baseboard Right of Door (Extending to X = 4.4m) */}
      <mesh position={[3.325, 0.04, 2.575]} receiveShadow>
        <boxGeometry args={[2.15, 0.08, 0.02]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Extended East Wall Baseboard */}
      <mesh position={[4.375, 0.04, 0]} receiveShadow>
        <boxGeometry args={[0.02, 0.08, 5.16]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* West Wall Baseboard North */}
      <mesh position={[-2.775, 0.04, -2.15]} receiveShadow>
        <boxGeometry args={[0.02, 0.08, 0.86]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* West Wall Baseboard South */}
      <mesh position={[-2.775, 0.04, 1.55]} receiveShadow>
        <boxGeometry args={[0.02, 0.08, 2.06]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* 4. North / Back Wall (Z = -2.60m) extended to 7.2m in Warm Light Greige (#D5CFC3) */}
      <mesh position={[0.8, 1.4, -2.675]} receiveShadow>
        <boxGeometry args={[7.2, 2.8, 0.15]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#D5CFC3"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Natural Walnut Acoustic Slat Feature Wall behind Workstation */}
      <WalnutAcousticWall position={[-1.30, 1.40, -2.59]} width={3.0} height={2.80} />
      {/* Minecraft Diamond Sword mounted directly in the middle of the acoustic wall */}
      <MinecraftSword />
      {/* Minecraft Torches flanking the Minecraft Sword on the acoustic slat wall */}
      <MinecraftTorch position={[-2.25, 1.70, -2.56]} isWallMounted={true} />
      <MinecraftTorch position={[-0.35, 1.70, -2.56]} isWallMounted={true} />

      {/* 5. South / Front Wall (Z = +2.60m) in Warm Ivory (#E9E2D6) */}
      {/* Left section (X: -2.80 to 1.25 -> center -0.775, width 4.05) */}
      <mesh position={[-0.775, 1.4, 2.675]} receiveShadow>
        <boxGeometry args={[4.05, 2.8, 0.15]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#E9E2D6"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Right section (X: 2.25 to 4.40 -> center 3.325, width 2.15) */}
      <mesh position={[3.325, 1.4, 2.675]} receiveShadow>
        <boxGeometry args={[2.15, 2.8, 0.15]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#E9E2D6"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Transom Header above Door (X: 1.25 to 2.25, Y: 2.18 to 2.80) */}
      <mesh position={[1.75, 2.49, 2.675]} receiveShadow>
        <boxGeometry args={[1.0, 0.62, 0.15]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#E9E2D6"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Static Entrance Door */}
      <EntranceDoor position={[1.75, 1.075, 2.59]} />

      {/* 6. West / Window Wall (X = -2.80m) in Warm Ivory (#EAE4D9) */}
      {/* North section (Z: -2.60 to -1.70 -> center -2.15, depth 0.90) */}
      <mesh position={[-2.875, 1.4, -2.15]} receiveShadow>
        <boxGeometry args={[0.15, 2.8, 0.90]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#EAE4D9"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* South section (Z: 0.50 to 2.60 -> center 1.55, depth 2.10) */}
      <mesh position={[-2.875, 1.4, 1.55]} receiveShadow>
        <boxGeometry args={[0.15, 2.8, 2.10]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#EAE4D9"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Bottom Sill Section below window (Y: 0 to 0.50, Z: -1.70 to 0.50) */}
      <mesh position={[-2.875, 0.25, -0.60]} receiveShadow>
        <boxGeometry args={[0.15, 0.50, 2.20]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#EAE4D9"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Top Header Section above window (Y: 2.35 to 2.80, Z: -1.70 to 0.50) */}
      <mesh position={[-2.875, 2.575, -0.60]} receiveShadow>
        <boxGeometry args={[0.15, 0.45, 2.20]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#EAE4D9"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* 7. Extended East Wall (X = +4.40m) in Warm Ivory Plaster (#EDE8DF) */}
      <mesh position={[4.475, 1.4, 0]} receiveShadow>
        <boxGeometry args={[0.15, 2.8, 5.2]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#EDE8DF"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* 8. Window Frame & Tokyo Skyline Backdrop */}
      <WindowFrame />
      <OutdoorBackdrop />

      {/* Functional Ceiling Elements & Room Companions */}
      <CeilingFan />
      <IndustrialCeilingLight />
      <MinecraftBee />

      {/* 10. Wall Mounted Art & Portfolios */}
      <Switchboard />
      <AirConditioner />
      <MemoryWall />

      {/* 11. Furniture Pieces */}
      <ContactStation />
      <MinecraftAquarium />
      <Desk />
      <DrawerNote />
      <CoffeeMug />
      <Notebook />
      <GamingChair />
      <Bed />
      {/* Bedside Nightstand Table with authentic Minecraft Gramophone */}
      <Gramophone />
      {/* 3D Minecraft Logo mounted in the middle of the wall above the bed */}
      <MinecraftLogo />
      <Monitor />
      <Keyboard />
      <Mouse />
      <PCTower />
      <Bookshelf />
      {/* Minecraft Girl Skin standing next to Bookshelf on interaction spot */}
      <MinecraftGirl />
      {/* Oppenheimer Minecraft Camera on tripod in East-South corner */}
      <MinecraftCamera />
      {/* Blockbench Minecraft Artist Easel with Blank Painting in sunlit artist corner */}
      <Easel />
      <SecretCube />
      <Lamp />
      <Plant />
      <Rug />

      {/* 12. Furniture Pack / Indoor Plants & Paintings (Eli_ac Sketchfab) along East Wall */}
      <LoungeFurniturePack />
    </group>
  );
};

export const GrayboxRoom = GamingRoomModel;
