import React from 'react';
import { useGraphicsStore, GraphicsQuality } from '../../../store/useGraphicsStore';
import { useLivingRoomStore, TimeMode } from '../../../store/useLivingRoomStore';
import { useAudioStore } from '../../../store/useAudioStore';
import { AudioManager } from '../../../utils/audioManager';

export const SettingsApp: React.FC = () => {
  const quality = useGraphicsStore((s) => s.quality);
  const isAuto = useGraphicsStore((s) => s.isAuto);
  const setQuality = useGraphicsStore((s) => s.setQuality);
  const setAutoQuality = useGraphicsStore((s) => s.setAutoQuality);

  const timeMode = useLivingRoomStore((s) => s.timeMode);
  const setTimeMode = useLivingRoomStore((s) => s.setTimeMode);

  const muted = useAudioStore((s) => s.muted);
  const toggleMute = useAudioStore((s) => s.toggleMute);

  const timeModes: { id: TimeMode; label: string; icon: string }[] = [
    { id: 'auto', label: 'Local Clock', icon: '🕒' },
    { id: 'day', label: 'Day', icon: '☀️' },
    { id: 'evening', label: 'Sunset', icon: '🌇' },
    { id: 'night', label: 'Night', icon: '🌙' },
  ];

  const qualities: { id: GraphicsQuality; label: string }[] = [
    { id: 'low', label: 'Low (Mobile / iGPU)' },
    { id: 'medium', label: 'Medium (Balanced)' },
    { id: 'high', label: 'High (Full Fidelity)' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
          HarshOS System Settings
        </h2>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          Configure environment lighting, real-time graphics rendering quality, and audio.
        </p>
      </div>

      {/* Time of Day / Environment */}
      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8', marginBottom: '12px' }}>
          Environment Lighting & Skybox
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
          {timeModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                AudioManager.playSound('click');
                setTimeMode(mode.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: `1px solid ${timeMode === mode.id ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
                backgroundColor: timeMode === mode.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.5)',
                color: timeMode === mode.id ? '#38bdf8' : '#e2e8f0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Graphics & Post-Processing */}
      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a78bfa' }}>
            Graphics Fidelity & Performance
          </h3>
          <button
            onClick={() => {
              AudioManager.playSound('click');
              setAutoQuality(!isAuto);
            }}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: `1px solid ${isAuto ? '#34d399' : 'rgba(255, 255, 255, 0.15)'}`,
              backgroundColor: isAuto ? 'rgba(52, 211, 153, 0.15)' : 'transparent',
              color: isAuto ? '#34d399' : '#94a3b8',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Auto Adaptive: {isAuto ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {qualities.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                AudioManager.playSound('click');
                setQuality(q.id);
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: `1px solid ${quality === q.id && !isAuto ? '#a78bfa' : 'rgba(255, 255, 255, 0.1)'}`,
                backgroundColor: quality === q.id && !isAuto ? 'rgba(167, 139, 250, 0.15)' : 'rgba(30, 41, 59, 0.5)',
                color: quality === q.id && !isAuto ? '#a78bfa' : '#e2e8f0',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Preferences */}
      <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f87171', marginBottom: '12px' }}>
          Audio & Sound FX
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>Master Audio Output</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Mute or unmute all ambient BGM and sound effects</div>
          </div>
          <button
            onClick={() => {
              AudioManager.playSound('click');
              toggleMute();
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${muted ? 'rgba(239, 68, 68, 0.5)' : 'rgba(52, 211, 153, 0.5)'}`,
              backgroundColor: muted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(52, 211, 153, 0.15)',
              color: muted ? '#f87171' : '#34d399',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {muted ? '🔇 Muted' : '🔊 Active'}
          </button>
        </div>
      </div>
    </div>
  );
};
