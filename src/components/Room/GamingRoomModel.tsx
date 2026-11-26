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
import { CertificateWall } from '../Furniture/CertificateWall';
import { MemoryWall } from '../Furniture/MemoryWall';
import { ContactStation } from '../Furniture/ContactStation';
import { CeilingFan } from '../Furniture/CeilingFan';
import { Switchboard } from '../Furniture/Switchboard';
import { CoffeeMug } from '../Furniture/CoffeeMug';
import { OutdoorBackdrop } from '../Furniture/OutdoorBackdrop';
import { SecretCube } from '../Furniture/SecretCube';
import { DrawerNote } from '../Furniture/DrawerNote';

/**
 * Photorealistic Luxury Modern Bedroom Shell
 * Bright, colorful & balanced architectural palette:
 * - Floor: Natural golden oak planks
 * - Ceiling: Warm white (#F2EFE8)
 * - North Wall: Warm light greige (#D5CFC3) with natural walnut acoustic slats (#68452F)
 * - South Wall: Warm ivory (#E9E2D6) with medium walnut door (#6C462C)
 * - East Wall: Soft warm greige (#D9D2C6)
 * - West Wall: Warm ivory (#EAE4D9) with architectural picture window
 * - Skirting: Warm neutral architectural trim (#C8C0B2)
 */
export const GamingRoomModel: React.FC = () => {
  const woodTexture = useMemo(() => getProceduralWoodTexture(), []);
  const wallTexture = useMemo(() => getProceduralWallTexture(), []);

  return (
    <group>
      {/* 1. Floor: 5.6m x 5.2m natural warm golden oak planks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[5.6, 5.2]} />
        <meshStandardMaterial
          map={woodTexture}
          roughness={0.42}
          metalness={0.03}
        />
      </mesh>

      {/* 2. Ceiling: 5.6m x 5.2m at height 2.8m in Warm White (#F2EFE8) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.8, 0]} receiveShadow>
        <planeGeometry args={[5.6, 5.2]} />
        <meshStandardMaterial
          color="#F2EFE8"
          roughness={0.88}
          metalness={0.01}
        />
      </mesh>

      {/* 3. Baseboards / Skirting (0.08m tall) in Warm Architectural Neutral (#C8C0B2) */}
      {/* North Wall Baseboard */}
      <mesh position={[0, 0.04, -2.575]} receiveShadow>
        <boxGeometry args={[5.56, 0.08, 0.02]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* South Wall Baseboard Left of Door */}
      <mesh position={[-0.75, 0.04, 2.575]} receiveShadow>
        <boxGeometry args={[4.06, 0.08, 0.02]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* South Wall Baseboard Right of Door */}
      <mesh position={[2.525, 0.04, 2.575]} receiveShadow>
        <boxGeometry args={[0.55, 0.08, 0.02]} />
        <meshStandardMaterial color="#C8C0B2" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* East Wall Baseboard */}
      <mesh position={[2.775, 0.04, 0]} receiveShadow>
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

      {/* 4. North / Back Wall (Z = -2.60m) in Warm Light Greige (#D5CFC3) */}
      <mesh position={[0, 1.4, -2.675]} receiveShadow>
        <boxGeometry args={[5.6, 2.8, 0.15]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#D5CFC3"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
      {/* Natural Walnut Acoustic Slat Feature Wall behind Workstation */}
      <WalnutAcousticWall position={[-1.30, 1.40, -2.59]} width={3.0} height={2.80} />

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
      {/* Right section (X: 2.25 to 2.80 -> center 2.525, width 0.55) */}
      <mesh position={[2.525, 1.4, 2.675]} receiveShadow>
        <boxGeometry args={[0.55, 2.8, 0.15]} />
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

      {/* 7. East Wall (X = +2.80m) in Soft Warm Greige (#D9D2C6) */}
      <mesh position={[2.875, 1.4, 0]} receiveShadow>
        <boxGeometry args={[0.15, 2.8, 5.2]} />
        <meshStandardMaterial
          map={wallTexture}
          color="#D9D2C6"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* 8. Window Frame & Tokyo Skyline Backdrop */}
      <WindowFrame />
      <OutdoorBackdrop />

      {/* 9. Ceiling Fan */}
      <CeilingFan />

      {/* 10. Wall Mounted Art & Portfolios */}
      <Switchboard />
      <CertificateWall />
      <MemoryWall />

      {/* 11. Furniture Pieces */}
      <ContactStation />
      <Desk />
      <DrawerNote />
      <CoffeeMug />
      <Notebook />
      <GamingChair />
      <Bed />
      <Monitor />
      <Keyboard />
      <Mouse />
      <PCTower />
      <Bookshelf />
      <SecretCube />
      <Lamp />
      <Plant />
      <Rug />
    </group>
  );
};

export const GrayboxRoom = GamingRoomModel;
