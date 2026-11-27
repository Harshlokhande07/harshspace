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
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        boxShadow:
          '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
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
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          paddingBottom: '8px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 800,
            color: '#0f172a',
          }}
        >
          View Mode
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor:
              mode === 'first'
                ? 'rgba(147, 51, 234, 0.12)'
                : 'rgba(2, 132, 199, 0.12)',
            color: mode === 'first' ? '#7e22ce' : '#0284c7',
            border: `1px solid ${
              mode === 'first'
                ? 'rgba(147, 51, 234, 0.25)'
                : 'rgba(2, 132, 199, 0.25)'
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
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(0, 0, 0, 0.04)',
            border:
              mode === 'first'
                ? '1px solid rgba(0, 0, 0, 0.12)'
                : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow:
              mode === 'first'
                ? '0 2px 8px rgba(0, 0, 0, 0.06)'
                : 'none',
            color: mode === 'first' ? '#0f172a' : '#475569',
            padding: '8px 12px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: mode === 'first' ? 700 : 500,
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
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#9333ea',
                boxShadow: '0 0 6px rgba(147, 51, 234, 0.4)',
              }}
            />
          )}
        </button>

        <button
          onClick={() => setMode('third')}
          style={{
            background:
              mode === 'third'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(0, 0, 0, 0.04)',
            border:
              mode === 'third'
                ? '1px solid rgba(0, 0, 0, 0.12)'
                : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow:
              mode === 'third'
                ? '0 2px 8px rgba(0, 0, 0, 0.06)'
                : 'none',
            color: mode === 'third' ? '#0f172a' : '#475569',
            padding: '8px 12px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: mode === 'third' ? 700 : 500,
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
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                boxShadow: '0 0 6px rgba(2, 132, 199, 0.4)',
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
          color: '#475569',
          marginTop: '2px',
        }}
      >
        <span>Press</span>
        <kbd
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            color: '#0f172a',
            padding: '1px 6px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'monospace',
            fontWeight: 800,
          }}
        >
          V
        </kbd>
        <span>to toggle</span>
      </div>
    </div>
  );
};
