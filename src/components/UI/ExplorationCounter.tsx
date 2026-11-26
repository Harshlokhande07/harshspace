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
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        boxShadow:
          '0 12px 36px rgba(0, 0, 0, 0.5), 0 0 16px rgba(139, 92, 246, 0.15)',
        borderRadius: '9999px',
        padding: '8px 16px',
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
          backgroundColor: isComplete ? '#4ade80' : '#38bdf8',
          boxShadow: `0 0 8px ${isComplete ? '#4ade80' : '#38bdf8'}`,
        }}
      />
      <span
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#f8fafc',
          letterSpacing: '0.02em',
        }}
      >
        Explored: <span style={{ color: isComplete ? '#4ade80' : '#38bdf8' }}>{count}</span>
        <span style={{ color: '#64748b' }}>/{total}</span>
      </span>
    </div>
  );
};
