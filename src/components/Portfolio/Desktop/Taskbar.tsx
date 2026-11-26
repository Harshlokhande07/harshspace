import React, { useState, useEffect } from 'react';
import { useDesktopStore, DesktopAppId } from '../../../store/useDesktopStore';
import { useInteractionStore } from '../../../store/useInteractionStore';

export const Taskbar: React.FC = () => {
  const openApp = useDesktopStore((s) => s.openApp);
  const openAppWindow = useDesktopStore((s) => s.openAppWindow);
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);

  // Live digital clock
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps: { id: DesktopAppId; label: string; icon: string }[] = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'games', label: 'Games', icon: '🎮' },
    { id: 'terminal', label: 'Terminal', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '46px',
        backgroundColor: 'rgba(10, 15, 29, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.25)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        zIndex: 50,
        userSelect: 'none',
      }}
    >
      {/* Left: Brand Badge & App switcher chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
              boxShadow: '0 0 8px #38bdf8',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#f8fafc',
              textTransform: 'uppercase',
            }}
          >
            HarshOS
          </span>
        </div>

        {/* Running app items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {apps.map((app) => {
            const isRunning = openApp === app.id;
            return (
              <button
                key={app.id}
                onClick={() => openAppWindow(app.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: isRunning
                    ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)'
                    : 'transparent',
                  border: isRunning
                    ? '1px solid rgba(56, 189, 248, 0.4)'
                    : '1px solid transparent',
                  color: isRunning ? '#ffffff' : '#94a3b8',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{app.icon}</span>
                <span>{app.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Clock & Exit PC button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            fontWeight: 600,
            color: '#cbd5e1',
            letterSpacing: '0.04em',
            padding: '4px 8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {time}
        </div>

        <button
          onClick={closeInteraction}
          title="Exit PC Setup (or press Esc)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.3) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.35)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#fca5a5';
          }}
        >
          <span>✕</span>
          <span>Exit PC</span>
        </button>
      </div>
    </div>
  );
};
