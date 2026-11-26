import React, { useEffect } from 'react';
import { useCameraStore } from '../../store/useCameraStore';
import { useInteractionStore } from '../../store/useInteractionStore';

export const CameraSwitcher: React.FC = () => {
  const mode = useCameraStore((s) => s.mode);
  const setMode = useCameraStore((s) => s.setMode);
  const toggleMode = useCameraStore((s) => s.toggleMode);

  // Bind the 'V' key to toggle camera mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field or interacting with modal
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        useInteractionStore.getState().activeId !== null
      ) {
        return;
      }

      if (e.code === 'KeyV' || e.key.toLowerCase() === 'v') {
        toggleMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMode]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        right: 24,
        zIndex: 50,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        boxShadow:
          '0 12px 36px rgba(0, 0, 0, 0.5), 0 0 16px rgba(139, 92, 246, 0.15)',
        borderRadius: '16px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        userSelect: 'none',
        minWidth: '170px',
      }}
    >
      {/* Header with status badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '8px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 700,
            color: '#94a3b8',
          }}
        >
          View Mode
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '6px',
            backgroundColor:
              mode === 'first'
                ? 'rgba(168, 85, 247, 0.25)'
                : 'rgba(6, 182, 212, 0.25)',
            color: mode === 'first' ? '#c084fc' : '#22d3ee',
            border: `1px solid ${
              mode === 'first'
                ? 'rgba(168, 85, 247, 0.4)'
                : 'rgba(6, 182, 212, 0.4)'
            }`,
          }}
        >
          {mode === 'first' ? '1st Person' : '3rd Person'}
        </span>
      </div>

      {/* Switch buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          onClick={() => setMode('first')}
          style={{
            background:
              mode === 'first'
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(67, 56, 202, 0.35) 100%)'
                : 'rgba(30, 41, 59, 0.5)',
            border:
              mode === 'first'
                ? '1px solid rgba(168, 85, 247, 0.6)'
                : '1px solid rgba(255, 255, 255, 0.06)',
            color: mode === 'first' ? '#f8fafc' : '#94a3b8',
            padding: '8px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: mode === 'first' ? 600 : 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
          }}
        >
          <span>First Person</span>
          {mode === 'first' && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#c084fc',
                boxShadow: '0 0 8px #c084fc',
              }}
            />
          )}
        </button>

        <button
          onClick={() => setMode('third')}
          style={{
            background:
              mode === 'third'
                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.35) 0%, rgba(14, 116, 144, 0.35) 100%)'
                : 'rgba(30, 41, 59, 0.5)',
            border:
              mode === 'third'
                ? '1px solid rgba(6, 182, 212, 0.6)'
                : '1px solid rgba(255, 255, 255, 0.06)',
            color: mode === 'third' ? '#f8fafc' : '#94a3b8',
            padding: '8px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: mode === 'third' ? 600 : 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
          }}
        >
          <span>Third Person</span>
          {mode === 'third' && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22d3ee',
                boxShadow: '0 0 8px #22d3ee',
              }}
            />
          )}
        </button>
      </div>

      {/* Keyboard shortcut hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          fontSize: '11px',
          color: '#64748b',
          marginTop: '2px',
        }}
      >
        <span>Press</span>
        <kbd
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#a78bfa',
            padding: '1px 5px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          V
        </kbd>
        <span>to toggle</span>
      </div>
    </div>
  );
};
