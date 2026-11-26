import React from 'react';
import { motion } from 'framer-motion';
import { VISION } from '../../data/vision';
import { useInteractionStore } from '../../store/useInteractionStore';

export const VisionPanel: React.FC = () => {
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);

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
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 80%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow:
            '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.2)',
          borderRadius: '20px',
          padding: '28px',
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
            <span style={{ fontSize: '20px' }}>🌌</span>
            <div>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#f8fafc',
                  letterSpacing: '-0.01em',
                }}
              >
                Window to the Future & Engineering Vision
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                Long-term roadmaps, technologies to explore, and future ambitions.
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

        {/* Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            paddingRight: '6px',
          }}
        >
          {/* 1. Developer Vision Highlight Card */}
          <div
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '14px',
              padding: '20px 24px',
            }}
          >
            <h3
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
                color: '#38bdf8',
                marginBottom: '8px',
              }}
            >
              Guiding Philosophy
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#f1f5f9',
                fontStyle: 'italic',
              }}
            >
              "{VISION.developerVision}"
            </p>
          </div>

          {/* 2. Career Goals & Future Ambitions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(21, 29, 48, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#818cf8',
                  marginBottom: '8px',
                }}
              >
                Career Goals
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1' }}>
                {VISION.careerGoals}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(21, 29, 48, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#a855f7',
                  marginBottom: '8px',
                }}
              >
                Future Ambitions
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1' }}>
                {VISION.futureAmbitions}
              </p>
            </div>
          </div>

          {/* 3. Technologies to Explore */}
          <div
            style={{
              backgroundColor: 'rgba(21, 29, 48, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <h3
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
                color: '#38bdf8',
                marginBottom: '12px',
              }}
            >
              Technologies On The Radar
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {VISION.technologiesToExplore.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#7dd3fc',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                  }}
                >
                  ⚡ {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Concepts & Ideas To Build */}
          <div
            style={{
              backgroundColor: 'rgba(21, 29, 48, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <h3
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
                color: '#a855f7',
                marginBottom: '14px',
              }}
            >
              Concepts & Systems To Build
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {VISION.ideasToBuild.map((idea, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <span style={{ color: '#a855f7', fontWeight: 800 }}>✦</span>
                  <span style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {idea}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <span>Press <kbd style={{ color: '#38bdf8' }}>Esc</kbd> to return to room</span>
          <span style={{ color: '#38bdf8' }}>Looking out into the digital skyline</span>
        </div>
      </motion.div>
    </div>
  );
};
