import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInteractionStore } from '../../store/useInteractionStore';
import { INTERACTABLES } from '../../data/interactables';
import { NotebookPanel } from '../Portfolio/NotebookPanel';
import { BookshelfPanel } from '../Portfolio/BookshelfPanel';
import { VisionPanel } from '../Portfolio/VisionPanel';
import { AchievementsPanel } from '../Portfolio/AchievementsPanel';
import { MemoriesPanel } from '../Portfolio/MemoriesPanel';
import { ContactPanel } from '../Portfolio/ContactPanel';

export const InteractionPanel: React.FC = () => {
  const activeId = useInteractionStore((s) => s.activeId);
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);
  const markDiscovered = useInteractionStore((s) => s.markDiscovered);

  const activeItem = INTERACTABLES.find((item) => item.id === activeId);

  useEffect(() => {
    if (activeId) {
      markDiscovered(activeId);
    }
  }, [activeId, markDiscovered]);

  // When PC setup is open, DesktopShell handles the UI
  if (!activeId || activeId === 'desk-pc' || !activeItem) {
    return null;
  }

  // Route specialized panels by sectionId
  if (activeItem.sectionId === 'about') {
    return <NotebookPanel />;
  }

  if (activeItem.sectionId === 'skills') {
    return <BookshelfPanel />;
  }

  if (activeItem.sectionId === 'vision') {
    return <VisionPanel />;
  }

  if (activeItem.sectionId === 'achievements') {
    return <AchievementsPanel />;
  }

  if (activeItem.sectionId === 'memories') {
    return <MemoriesPanel />;
  }

  if (activeItem.sectionId === 'contact') {
    return <ContactPanel />;
  }

  // Generic placeholder dialog for Chair, Bed, and future simple props
  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeInteraction}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5, 8, 16, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />

        {/* Glass modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: '460px',
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            boxShadow:
              '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 28px rgba(139, 92, 246, 0.2)',
            borderRadius: '20px',
            padding: '28px',
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
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#38bdf8',
                  boxShadow: '0 0 10px #38bdf8',
                }}
              />
              <span
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#94a3b8',
                }}
              >
                Interactive Station
              </span>
            </div>

            <button
              onClick={closeInteraction}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '10px',
              letterSpacing: '-0.01em',
            }}
          >
            {activeItem.label}
          </h2>

          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#94a3b8',
              marginBottom: '24px',
            }}
          >
            Content coming soon
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '16px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Press <kbd style={{ color: '#a78bfa' }}>Esc</kbd> or click Close
            </span>
            <button
              onClick={closeInteraction}
              style={{
                background:
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.4) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.6)',
                color: '#ffffff',
                padding: '8px 18px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
