import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES, SkillCategory } from '../../data/skills';
import { useInteractionStore } from '../../store/useInteractionStore';

export const BookshelfPanel: React.FC = () => {
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  // Esc handling: if inside a category, Esc goes back to shelf; otherwise closes panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (selectedCategory !== null) {
          setSelectedCategory(null);
        } else {
          closeInteraction();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [selectedCategory, closeInteraction]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 8, 16, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        userSelect: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '92vw',
          maxWidth: '960px',
          maxHeight: '85vh',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow:
            '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📚</span>
            <div>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#f8fafc',
                  letterSpacing: '-0.01em',
                }}
              >
                Interactive Bookshelf & Skills
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                Select a volume from the shelf to explore proficiencies and coursework.
              </p>
            </div>
          </div>

          <button
            onClick={closeInteraction}
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 4px' }}>
          <AnimatePresence mode="wait">
            {selectedCategory === null ? (
              /* Bookshelf Row View: 8 Book Spines */
              <motion.div
                key="shelf-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                    gap: '14px',
                  }}
                >
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        height: '240px',
                        backgroundColor: 'rgba(21, 29, 48, 0.8)',
                        border: `1px solid ${cat.spineColor}40`,
                        borderLeft: `8px solid ${cat.spineColor}`,
                        borderRadius: '10px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.borderColor = cat.spineColor;
                        e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.5), 0 0 20px ${cat.spineColor}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = `${cat.spineColor}40`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: cat.spineColor,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Vol. {idx + 1}
                        </span>
                        <h3
                          style={{
                            fontSize: '17px',
                            fontWeight: 800,
                            color: '#f8fafc',
                            marginTop: '6px',
                            lineHeight: 1.3,
                          }}
                        >
                          {cat.title}
                        </h3>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#94a3b8',
                            marginBottom: '10px',
                          }}
                        >
                          {cat.items.length} items
                        </div>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: cat.spineColor,
                          }}
                        >
                          Inspect Volume →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Wooden shelf accent bar */}
                <div
                  style={{
                    height: '14px',
                    backgroundColor: '#1f1813',
                    borderRadius: '4px',
                    borderTop: '2px solid #3d2f25',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                  }}
                />
              </motion.div>
            ) : (
              /* Volume Detail View */
              <motion.div
                key="volume-detail"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: 'rgba(21, 29, 48, 0.7)',
                  borderRadius: '16px',
                  border: `1px solid ${selectedCategory.spineColor}50`,
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>←</span>
                    <span>Back to Shelf</span>
                  </button>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: selectedCategory.spineColor,
                      backgroundColor: `${selectedCategory.spineColor}15`,
                      border: `1px solid ${selectedCategory.spineColor}40`,
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {selectedCategory.title}
                  </span>
                </div>

                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
                    {selectedCategory.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                    Verified concepts, competencies, and engineering domains:
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '12px',
                    marginTop: '8px',
                  }}
                >
                  {selectedCategory.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <span
                        style={{
                          color: selectedCategory.spineColor,
                          fontWeight: 700,
                          fontSize: '14px',
                          lineHeight: 1.4,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: '13px', color: '#f1f5f9', lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <span>Press <kbd style={{ color: '#38bdf8' }}>Esc</kbd> to {selectedCategory ? 'return to shelf' : 'exit'}</span>
          <span>8 Volumes Documented</span>
        </div>
      </motion.div>
    </div>
  );
};
