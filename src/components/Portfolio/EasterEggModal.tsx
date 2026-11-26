import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEasterEggStore } from '../../store/useEasterEggStore';
import { useInteractionStore } from '../../store/useInteractionStore';
import { PORTFOLIO_INTERACTABLES } from '../../data/interactables';
import { EASTER_EGGS } from '../../data/easterEggs';

export const EasterEggModal: React.FC = () => {
  const activeEggId = useEasterEggStore((s) => s.activeEggId);
  const closeEasterEgg = useEasterEggStore((s) => s.closeEasterEgg);
  const discoveredIds = useInteractionStore((s) => s.discoveredIds);
  const activeInteractionId = useInteractionStore((s) => s.activeId);
  const hasSeenCelebration = useEasterEggStore((s) => s.hasSeenCelebration);
  const setHasSeenCelebration = useEasterEggStore((s) => s.setHasSeenCelebration);
  const openEasterEgg = useEasterEggStore((s) => s.openEasterEgg);

  // Check celebration unlock: all 7 portfolio milestones discovered, wait until no panel/desktop is open
  useEffect(() => {
    if (hasSeenCelebration) return;

    const allPortfolioDiscovered =
      PORTFOLIO_INTERACTABLES.length > 0 &&
      PORTFOLIO_INTERACTABLES.every((item) => discoveredIds.includes(item.id));

    if (allPortfolioDiscovered && activeInteractionId === null && activeEggId === null) {
      // Delay slightly for smooth atmosphere
      const timeout = setTimeout(() => {
        setHasSeenCelebration(true);
        openEasterEgg('celebration-unlock');
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [
    discoveredIds,
    activeInteractionId,
    activeEggId,
    hasSeenCelebration,
    setHasSeenCelebration,
    openEasterEgg,
  ]);

  // Innermost Esc closes easter egg first
  useEffect(() => {
    if (!activeEggId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeEasterEgg();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [activeEggId, closeEasterEgg]);

  if (!activeEggId) return null;

  const egg = EASTER_EGGS[activeEggId];
  if (!egg) return null;

  const isCelebration = activeEggId === 'celebration-unlock';

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 95,
          backgroundColor: 'rgba(3, 7, 18, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          userSelect: 'none',
        }}
        onClick={closeEasterEgg}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: 'rgba(15, 23, 42, 0.96)',
            border: `1px solid ${isCelebration ? 'rgba(74, 222, 128, 0.5)' : 'rgba(139, 92, 246, 0.45)'}`,
            boxShadow: `0 24px 60px rgba(0, 0, 0, 0.75), 0 0 30px ${
              isCelebration ? 'rgba(74, 222, 128, 0.25)' : 'rgba(139, 92, 246, 0.2)'
            }`,
            borderRadius: '20px',
            padding: '26px',
            color: '#f8fafc',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Top Icon Badge */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: isCelebration ? 'rgba(74, 222, 128, 0.15)' : 'rgba(139, 92, 246, 0.15)',
              border: `1px solid ${isCelebration ? 'rgba(74, 222, 128, 0.4)' : 'rgba(139, 92, 246, 0.4)'}`,
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            {isCelebration ? '🏆' : activeEggId === 'secret-cube' ? '💎' : activeEggId === 'drawer-note' ? '📜' : '🔒'}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
            {egg.title}
          </h2>

          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: isCelebration ? '#4ade80' : '#38bdf8',
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            {egg.subtitle}
          </div>

          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '16px',
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#cbd5e1',
              fontStyle: 'italic',
              marginBottom: '22px',
              textAlign: 'left',
            }}
          >
            {egg.content}
          </div>

          <button
            onClick={closeEasterEgg}
            style={{
              width: '100%',
              padding: '10px 0',
              backgroundColor: isCelebration ? '#10b981' : '#8b5cf6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Dismiss (Esc)
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
