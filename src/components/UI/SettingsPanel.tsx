import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLivingRoomStore, TimeMode } from '../../store/useLivingRoomStore';
import { useGraphicsStore, GraphicsQuality } from '../../store/useGraphicsStore';
import { useAudioStore } from '../../store/useAudioStore';
import { AudioManager } from '../../utils/audioManager';
import { MODEL_CREDITS } from '../../data/credits';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const timeMode = useLivingRoomStore((s) => s.timeMode);
  const setTimeMode = useLivingRoomStore((s) => s.setTimeMode);

  const quality = useGraphicsStore((s) => s.quality);
  const setQuality = useGraphicsStore((s) => s.setQuality);

  const muted = useAudioStore((s) => s.muted);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const musicEnabled = useAudioStore((s) => s.musicEnabled);
  const toggleMusic = useAudioStore((s) => s.toggleMusic);
  const musicVolume = useAudioStore((s) => s.musicVolume);
  const setMusicVolume = useAudioStore((s) => s.setMusicVolume);
  const effectsVolume = useAudioStore((s) => s.effectsVolume);
  const setEffectsVolume = useAudioStore((s) => s.setEffectsVolume);

  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Escape' || e.key === 'Escape') && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const timeOptions: { id: TimeMode; label: string; icon: string }[] = [
    { id: 'auto', label: 'Auto', icon: '🕒' },
    { id: 'day', label: 'Day', icon: '☀️' },
    { id: 'evening', label: 'Eve', icon: '🌅' },
    { id: 'night', label: 'Night', icon: '🌙' },
  ];

  const gfxOptions: { id: GraphicsQuality; label: string }[] = [
    { id: 'low', label: 'Low' },
    { id: 'medium', label: 'Medium' },
    { id: 'high', label: 'High' },
  ];

  return (
    <>
      {/* 1. Glass Gear Button (Top-right next to Camera Switcher) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title="Settings & Environment"
        style={{
          position: 'absolute',
          top: 180,
          right: 24,
          zIndex: 50,
          backgroundColor: isOpen
            ? 'rgba(139, 92, 246, 0.45)'
            : 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow:
            '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 14px rgba(139, 92, 246, 0.2)',
          borderRadius: '12px',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#f8fafc',
          transition: 'all 0.2s ease',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {/* 2. Compact Glass Settings Flyout Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 232,
              right: 24,
              zIndex: 50,
              width: '240px',
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              boxShadow:
                '0 16px 40px rgba(0, 0, 0, 0.65), 0 0 20px rgba(139, 92, 246, 0.15)',
              borderRadius: '16px',
              padding: '16px',
              color: '#f8fafc',
              userSelect: 'none',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#e2e8f0',
                }}
              >
                Environment
              </span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '2px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Time of Day Section */}
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginBottom: '8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Time of Day
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '4px',
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  borderRadius: '10px',
                  padding: '4px',
                }}
              >
                {timeOptions.map((opt) => {
                  const active = timeMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setTimeMode(opt.id)}
                      style={{
                        padding: '6px 2px',
                        border: 'none',
                        borderRadius: '7px',
                        fontSize: '11px',
                        fontWeight: active ? 700 : 500,
                        backgroundColor: active
                          ? 'rgba(139, 92, 246, 0.9)'
                          : 'transparent',
                        color: active ? '#ffffff' : '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: '13px' }}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Model Author Credits Section (Hidden when empty) */}
            {MODEL_CREDITS.length > 0 && (
              <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  3D Model Credits
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {MODEL_CREDITS.map((credit) => (
                    <div
                      key={credit.id}
                      style={{
                        fontSize: '11px',
                        backgroundColor: 'rgba(30, 41, 59, 0.5)',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ color: '#cbd5e1' }}>{credit.name}</span>
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#38bdf8', textDecoration: 'none' }}
                      >
                        {credit.author}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio & Sound Section */}
            <div style={{ marginBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
              <div
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginBottom: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Audio & Music</span>
                <button
                  onClick={() => {
                    AudioManager.playSound('click');
                    toggleMute();
                  }}
                  style={{
                    backgroundColor: muted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                    border: `1px solid ${muted ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                    color: muted ? '#f87171' : '#34d399',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {muted ? 'MUTED' : 'UNMUTED'}
                </button>
              </div>

              {/* Music On/Off Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#cbd5e1' }}>Background Music</span>
                <button
                  onClick={() => {
                    AudioManager.playSound('click');
                    toggleMusic();
                    AudioManager.updateMusicPlayback();
                  }}
                  style={{
                    backgroundColor: musicEnabled ? '#8b5cf6' : '#334155',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {musicEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Music Volume Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', width: '42px' }}>Music</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ fontSize: '10px', fontFamily: 'monospace', width: '28px', textAlign: 'right' }}>
                  {Math.round(musicVolume * 100)}%
                </span>
              </div>

              {/* SFX Volume Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', width: '42px' }}>SFX</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={effectsVolume}
                  onChange={(e) => setEffectsVolume(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ fontSize: '10px', fontFamily: 'monospace', width: '28px', textAlign: 'right' }}>
                  {Math.round(effectsVolume * 100)}%
                </span>
              </div>
            </div>

            {/* Model Author Credits Section (Hidden when empty) */}
            {MODEL_CREDITS.length > 0 && (
              <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  3D Model Credits
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {MODEL_CREDITS.map((credit) => (
                    <div
                      key={credit.id}
                      style={{
                        fontSize: '11px',
                        backgroundColor: 'rgba(30, 41, 59, 0.5)',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ color: '#cbd5e1' }}>{credit.name}</span>
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#38bdf8', textDecoration: 'none' }}
                      >
                        {credit.author}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Graphics Quality Section */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginBottom: '8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Graphics Quality
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '4px',
                  backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  borderRadius: '10px',
                  padding: '4px',
                }}
              >
                {gfxOptions.map((opt) => {
                  const active = quality === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setQuality(opt.id)}
                      style={{
                        padding: '6px 0',
                        border: 'none',
                        borderRadius: '7px',
                        fontSize: '11px',
                        fontWeight: active ? 700 : 500,
                        backgroundColor: active
                          ? 'rgba(56, 189, 248, 0.9)'
                          : 'transparent',
                        color: active ? '#0f172a' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Model Author Credits Section (Hidden when empty) */}
            {MODEL_CREDITS.length > 0 && (
              <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  3D Model Credits
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {MODEL_CREDITS.map((credit) => (
                    <div
                      key={credit.id}
                      style={{
                        fontSize: '11px',
                        backgroundColor: 'rgba(30, 41, 59, 0.5)',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ color: '#cbd5e1' }}>{credit.name}</span>
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#38bdf8', textDecoration: 'none' }}
                      >
                        {credit.author}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
