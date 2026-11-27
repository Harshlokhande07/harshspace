import React from 'react';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useDesktopStore } from '../../store/useDesktopStore';
import { useIntroStore } from '../../store/useIntroStore';
import { useCharacterStore } from '../../store/useCharacterStore';
import { QUICK_NAV_ITEMS, QuickNavItem } from '../../data/navigation';

export const QuickNavigation: React.FC = () => {
  const introStep = useIntroStore((s) => s.step);
  const activeId = useInteractionStore((s) => s.activeId);
  const openInteraction = useInteractionStore((s) => s.openInteraction);
  const openAppWindow = useDesktopStore((s) => s.openAppWindow);

  // Visible once intro is completed and no modal/desktop is covering screen
  const isVisible = introStep === 'done' && !activeId;

  const handleNavClick = (item: QuickNavItem) => {
    // If character is seated, lying or mid-action, safely exit posture first
    const actionState = useCharacterStore.getState().actionState;
    if (actionState === 'seated' || actionState === 'lying') {
      (window as any).__harshExitAction?.();
    }

    if (item.id === 'projects') {
      // Open PC Setup desktop with Projects window active
      openAppWindow('projects');
      openInteraction('desk-pc');
    } else {
      openInteraction(item.interactableId);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
        borderRadius: '9999px',
        padding: '5px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        userSelect: 'none',
      }}
    >
      {QUICK_NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 14px',
            color: '#0f172a',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.07)';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#0f172a';
          }}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
