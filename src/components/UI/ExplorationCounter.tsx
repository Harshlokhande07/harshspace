import React from 'react';
import { useInteractionStore } from '../../store/useInteractionStore';
import { PORTFOLIO_INTERACTABLES } from '../../data/interactables';

export const ExplorationCounter: React.FC = () => {
  const discoveredIds = useInteractionStore((s) => s.discoveredIds);

  // Derive total count strictly from portfolio interactables (excludes chair & bed)
  const total = PORTFOLIO_INTERACTABLES.length;
  const count = discoveredIds.filter((id) =>
    PORTFOLIO_INTERACTABLES.some((item) => item.id === id)
  ).length;

  const isComplete = count >= total;

  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        left: 24,
        zIndex: 50,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.45)',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        borderRadius: '9999px',
        padding: '8px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: isComplete ? '#10b981' : '#0284c7',
          boxShadow: `0 0 8px ${isComplete ? '#10b981' : '#0284c7'}`,
        }}
      />
      <span
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#0f172a',
          letterSpacing: '0.02em',
        }}
      >
        Explored: <span style={{ color: isComplete ? '#059669' : '#0284c7', fontWeight: 700 }}>{count}</span>
        <span style={{ color: '#64748b' }}>/{total}</span>
      </span>
    </div>
  );
};
