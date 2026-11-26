import React from 'react';
import { useGraphicsStore, GraphicsQuality } from '../../store/useGraphicsStore';

export const GraphicsSelector: React.FC = () => {
  const quality = useGraphicsStore((s) => s.quality);
  const setQuality = useGraphicsStore((s) => s.setQuality);

  const options: { id: GraphicsQuality; label: string }[] = [
    { id: 'low', label: 'Low' },
    { id: 'medium', label: 'Med' },
    { id: 'high', label: 'High' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 180,
        right: 24,
        zIndex: 50,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        boxShadow:
          '0 12px 36px rgba(0, 0, 0, 0.5), 0 0 16px rgba(139, 92, 246, 0.15)',
        borderRadius: '14px',
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 700,
          color: '#94a3b8',
          marginRight: '2px',
        }}
      >
        GFX
      </span>

      <div style={{ display: 'flex', gap: '4px' }}>
        {options.map((opt) => {
          const isActive = quality === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setQuality(opt.id)}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.35) 0%, rgba(139, 92, 246, 0.35) 100%)'
                  : 'rgba(30, 41, 59, 0.5)',
                border: isActive
                  ? '1px solid rgba(56, 189, 248, 0.6)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                color: isActive ? '#f8fafc' : '#94a3b8',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
