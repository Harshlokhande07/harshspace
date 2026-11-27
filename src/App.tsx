import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { GamingRoom } from './scenes/GamingRoom';
import { CameraSwitcher } from './components/UI/CameraSwitcher';
import { SettingsPanel } from './components/UI/SettingsPanel';
import { ExplorationCounter } from './components/UI/ExplorationCounter';
import { InteractionPrompt } from './components/UI/InteractionPrompt';
import { InteractionPanel } from './components/UI/InteractionPanel';
import { PoseTuner } from './components/UI/PoseTuner';
import { DesktopShell } from './components/Portfolio/Desktop/DesktopShell';
import { IntroOverlay } from './components/UI/IntroOverlay';
import { MiniMap } from './components/UI/MiniMap';
import { QuickNavigation } from './components/UI/QuickNavigation';
import { EasterEggModal } from './components/Portfolio/EasterEggModal';
import { TouchControls } from './components/UI/TouchControls';
import { useAudioStore } from './store/useAudioStore';
import { useInteractionStore } from './store/useInteractionStore';
import { AudioManager } from './utils/audioManager';
import { useInteractionControls } from './hooks/useInteractionControls';
import { useGraphicsStore } from './store/useGraphicsStore';
import './App.css';

export const App: React.FC = () => {
  // Bind 'E', 'F', and 'Escape' keyboard interaction handlers
  useInteractionControls();

  const shadows = useGraphicsStore((s) => s.shadows);
  const pixelRatio = useGraphicsStore((s) => s.pixelRatio);

  const muted = useAudioStore((s) => s.muted);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const activeId = useInteractionStore((s) => s.activeId);
  const is3DRenderingPaused = activeId !== null;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Scene full screen with ACES Filmic Tone Mapping */}
      <Canvas
        frameloop={is3DRenderingPaused ? 'demand' : 'always'}
        shadows={shadows}
        dpr={pixelRatio}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.20,
        }}
        camera={{ position: [0, 4, 6], fov: 50 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <GamingRoom />
      </Canvas>

      {/* Exploration progress badge (top-left) */}
      <ExplorationCounter />

      {/* Camera switcher HUD (top-right) */}
      <CameraSwitcher />

      {/* Settings Panel & Environment Switcher (top-right, with Time of Day and Graphics Quality) */}
      <SettingsPanel />

      {/* Quick Audio Mute Button (Top-Right, next to Settings gear) */}
      <button
        onClick={() => {
          AudioManager.playSound('click');
          toggleMute();
        }}
        title={muted ? 'Unmute Audio' : 'Mute Audio'}
        style={{
          position: 'absolute',
          top: 232,
          right: 24,
          zIndex: 50,
          backgroundColor: muted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: `1px solid ${muted ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.85)'}`,
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
          borderRadius: '14px',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: muted ? '#dc2626' : '#0f172a',
          fontSize: '16px',
          transition: 'all 0.2s ease',
        }}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {/* Proximity Interaction Prompt (bottom-center) */}
      <InteractionPrompt />

      {/* Active Interaction Modal Panel (for Chair, Bed, etc.) */}
      <InteractionPanel />

      {/* Desktop OS Interface for PC Setup */}
      <DesktopShell />

      {/* Dev Pose Tuner */}
      <PoseTuner />

      {/* MiniMap 2D Canvas Overlay */}
      <MiniMap />

      {/* Quick Navigation Top Bar */}
      <QuickNavigation />

      {/* Easter Egg Hidden Modal & Celebration Message */}
      <EasterEggModal />

      {/* Cinematic Intro Screen & Loading Overlay */}
      <IntroOverlay />

      {/* On-Screen Mobile Analog Joystick & Touch Action Buttons */}
      <TouchControls />

      {/* On-screen control guidance */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          zIndex: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '9999px',
          padding: '8px 18px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          color: '#475569',
          fontSize: '11px',
          fontFamily: 'monospace',
          display: 'flex',
          gap: '14px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span>
          <strong style={{ color: '#0f172a' }}>WASD</strong> Move
        </span>
        <span>
          <strong style={{ color: '#0f172a' }}>Shift</strong> Run
        </span>
        <span>
          <strong style={{ color: '#0f172a' }}>Drag</strong> Look
        </span>
        <span>
          <strong style={{ color: '#0f172a' }}>Scroll</strong> Zoom
        </span>
        <span>
          <strong style={{ color: '#0f172a' }}>V</strong> View
        </span>
        <span>
          <strong style={{ color: '#0f172a' }}>E / F</strong> Interact
        </span>
        <span>
          <strong style={{ color: '#0f172a' }}>Esc</strong> Back
        </span>
      </div>
    </div>
  );
};

export default App;
