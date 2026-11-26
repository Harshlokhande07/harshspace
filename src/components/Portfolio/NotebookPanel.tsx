import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../data/profile';
import { useInteractionStore } from '../../store/useInteractionStore';

export const NotebookPanel: React.FC = () => {
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);
  const [activeSpread, setActiveSpread] = useState<0 | 1>(0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 8, 16, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        userSelect: 'none',
      }}
    >
      {/* Outer dark glass frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '92vw',
          maxWidth: '1000px',
          maxHeight: '85vh',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          boxShadow:
            '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 30px rgba(251, 191, 36, 0.15)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>📖</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#fef08a',
              }}
            >
              Developer Journal & About Me
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Page flip toggle tabs */}
            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '8px',
                padding: '3px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <button
                onClick={() => setActiveSpread(0)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  backgroundColor: activeSpread === 0 ? '#d97706' : 'transparent',
                  color: activeSpread === 0 ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Page 1: Bio & Journey
              </button>
              <button
                onClick={() => setActiveSpread(1)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  backgroundColor: activeSpread === 1 ? '#d97706' : 'transparent',
                  color: activeSpread === 1 ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Page 2: Strengths & Ambitions
              </button>
            </div>

            <button
              onClick={closeInteraction}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Two-page warm paper open book spread */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            borderRadius: '14px',
            backgroundColor: '#fef3c7',
            backgroundImage:
              'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.06) 100%)',
            boxShadow: 'inset 0 0 20px rgba(180, 83, 9, 0.15)',
            border: '1px solid #fde68a',
            padding: '28px',
            color: '#1c1917',
          }}
        >
          <AnimatePresence mode="wait">
            {activeSpread === 0 ? (
              <motion.div
                key="spread-0"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                }}
              >
                {/* Left Page: Intro & Headline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h1
                      style={{
                        fontSize: '32px',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: '#78350f',
                        marginBottom: '4px',
                      }}
                    >
                      {PROFILE.name}
                    </h1>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#b45309',
                        marginBottom: '12px',
                      }}
                    >
                      {PROFILE.headline}
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#451a03' }}>
                      {PROFILE.intro}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #fde68a',
                      paddingTop: '16px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '8px',
                      }}
                    >
                      Education Background
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#451a03' }}>
                      {PROFILE.educationBackground}
                    </p>
                  </div>
                </div>

                {/* Right Page: Developer Journey */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '8px',
                      }}
                    >
                      Developer Journey
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#451a03' }}>
                      {PROFILE.developerJourney}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #fde68a',
                      paddingTop: '16px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '8px',
                      }}
                    >
                      Core Interests
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {PROFILE.interests.map((item, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#451a03', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#d97706', fontWeight: 800 }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="spread-1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                }}
              >
                {/* Left Page: Strengths & Hobbies */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '10px',
                      }}
                    >
                      Key Strengths
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {PROFILE.strengths.map((s, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#451a03', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                          <span style={{ color: '#d97706', fontWeight: 800 }}>✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #fde68a',
                      paddingTop: '16px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '10px',
                      }}
                    >
                      Hobbies & Free Time
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {PROFILE.hobbies.map((h, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#451a03', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#d97706', fontWeight: 800 }}>▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Page: Current Goals & Future Ambitions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '10px',
                      }}
                    >
                      Current Learning Goals
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {PROFILE.currentLearningGoals.map((goal, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#451a03', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                          <span style={{ color: '#b45309', fontWeight: 800 }}>⚡</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #fde68a',
                      paddingTop: '16px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#92400e',
                        fontWeight: 800,
                        marginBottom: '8px',
                      }}
                    >
                      Future Ambitions
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#451a03', fontStyle: 'italic' }}>
                      "{PROFILE.futureAmbitions}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer instructions */}
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <span>Press <kbd style={{ color: '#fef08a' }}>Esc</kbd> to close notebook</span>
          <button
            onClick={() => setActiveSpread((prev) => (prev === 0 ? 1 : 0))}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f59e0b',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {activeSpread === 0 ? 'Turn to Page 2 →' : '← Turn to Page 1'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
