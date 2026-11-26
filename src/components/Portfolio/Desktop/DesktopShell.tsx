import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore, DesktopAppId } from '../../../store/useDesktopStore';
import { useInteractionStore } from '../../../store/useInteractionStore';
import { Taskbar } from './Taskbar';
import { DesktopIcon } from './DesktopIcon';
import { AppWindow } from './AppWindow';
import { ProjectsApp } from './ProjectsApp';
import { GamesApp } from './Games/GamesApp';
import { SettingsApp } from './SettingsApp';
import { TerminalApp } from './TerminalApp';
import { useGamesStore } from '../../../store/useGamesStore';
import { useEasterEggStore } from '../../../store/useEasterEggStore';
import { PROFILE } from '../../../data/profile';

export const DesktopShell: React.FC = () => {
  const activeId = useInteractionStore((s) => s.activeId);
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);
  const markDiscovered = useInteractionStore((s) => s.markDiscovered);

  const openApp = useDesktopStore((s) => s.openApp);
  const openAppWindow = useDesktopStore((s) => s.openAppWindow);
  const closeAppWindow = useDesktopStore((s) => s.closeAppWindow);
  const selectProject = useDesktopStore((s) => s.selectProject);

  const isOpen = activeId === 'desk-pc';

  // Mark PC as discovered when desktop opens
  useEffect(() => {
    if (isOpen) {
      markDiscovered('desk-pc');
    }
  }, [isOpen, markDiscovered]);

  // Hierarchical Esc key handler (innermost first):
  // 1. If inside an active game (snake / target) -> return to Games menu
  // 2. If inside project detail -> back to project list
  // 3. If app window open -> close app window
  // 4. If on empty desktop -> exit desktop (return to 3D room / seated state)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();

        const currentActiveGame = useGamesStore.getState().activeGame;
        const currentSelected = useDesktopStore.getState().selectedProjectId;
        const currentOpenApp = useDesktopStore.getState().openApp;

        // Innermost 1: active game inside GamesApp
        if (currentOpenApp === 'games' && currentActiveGame !== 'menu') {
          useGamesStore.getState().setActiveGame('menu');
          return;
        }

        // Innermost 2: active project inside ProjectsApp
        if (currentOpenApp === 'projects' && currentSelected !== null) {
          selectProject(null);
          return;
        }

        // Innermost 3: close open app window
        if (currentOpenApp !== null) {
          closeAppWindow();
          return;
        }

        // Innermost 4: exit desktop back to room / seated posture
        closeInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, selectProject, closeAppWindow, closeInteraction]);

  if (!isOpen) return null;

  const desktopIcons: { id: DesktopAppId; label: string; icon: string }[] = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'games', label: 'MiniGames', icon: '🎮' },
    { id: 'terminal', label: 'Terminal', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(3, 7, 18, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          userSelect: 'none',
        }}
      >
        {/* Full Desktop Monitor Display Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '95vw',
            maxWidth: '1280px',
            height: '88vh',
            maxHeight: '840px',
            backgroundColor: '#0a0f1d',
            backgroundImage: `
              radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 45%),
              radial-gradient(circle at 85% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 36px 36px, 36px 36px',
            borderRadius: '20px',
            border: '2px solid rgba(139, 92, 246, 0.35)',
            boxShadow:
              '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Desktop Wallpaper Brand Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              opacity: 0.08,
            }}
          >
            <div
              style={{
                fontSize: '84px',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              Harsh
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.4em',
                color: '#38bdf8',
                textTransform: 'uppercase',
              }}
            >
              The Digital World
            </div>
          </div>

          {/* Desktop Icons Column (Top-Left) */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 10,
            }}
          >
            {desktopIcons.map((icon) => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                label={icon.label}
                icon={icon.icon}
                isActive={openApp === icon.id}
                onClick={() => openAppWindow(icon.id)}
              />
            ))}

            {/* Secret Encrypted Easter Egg File */}
            <div
              onClick={() => useEasterEggStore.getState().openEasterEgg('secret-pc-file')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 8px',
                borderRadius: '10px',
                cursor: 'pointer',
                width: '84px',
                textAlign: 'center',
                opacity: 0.65,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.65';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Encrypted developer file"
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
              >
                🔐
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#38bdf8',
                  wordBreak: 'break-all',
                }}
              >
                secret.txt
              </span>
            </div>
          </div>

          {/* Active App Window */}
          <AnimatePresence>
            {openApp && (
              <AppWindow
                title={
                  openApp === 'projects'
                    ? 'Project Showcase'
                    : openApp.charAt(0).toUpperCase() + openApp.slice(1)
                }
                icon={
                  openApp === 'projects'
                    ? '📁'
                    : openApp === 'about'
                    ? '👤'
                    : openApp === 'games'
                    ? '🎮'
                    : openApp === 'settings'
                    ? '⚙️'
                    : '⚡'
                }
                onClose={closeAppWindow}
              >
                {openApp === 'projects' && <ProjectsApp />}
                {openApp === 'games' && <GamesApp />}
                {openApp === 'terminal' && <TerminalApp />}
                {openApp === 'settings' && <SettingsApp />}

                {openApp === 'about' && (
                  <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
                      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
                        {PROFILE.name}
                      </h1>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#38bdf8', marginBottom: '10px' }}>
                        {PROFILE.headline}
                      </div>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1' }}>
                        {PROFILE.intro}
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: 700, marginBottom: '8px' }}>
                          Developer Journey
                        </h3>
                        <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94a3b8' }}>
                          {PROFILE.developerJourney}
                        </p>
                      </div>

                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: 700, marginBottom: '8px' }}>
                          Education
                        </h3>
                        <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94a3b8' }}>
                          {PROFILE.educationBackground}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#38bdf8', fontWeight: 700, marginBottom: '10px' }}>
                          Core Strengths
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {PROFILE.strengths.map((s, idx) => (
                            <li key={idx} style={{ fontSize: '13px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ color: '#38bdf8' }}>✓</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#38bdf8', fontWeight: 700, marginBottom: '10px' }}>
                          Interests & Focus
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {PROFILE.interests.map((item, idx) => (
                            <li key={idx} style={{ fontSize: '13px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ color: '#a78bfa' }}>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}


              </AppWindow>
            )}
          </AnimatePresence>

          {/* Desktop Taskbar at Bottom */}
          <Taskbar />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
