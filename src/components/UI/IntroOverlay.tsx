import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIntroStore } from '../../store/useIntroStore';
import { INTRO_CONTENT } from '../../data/intro';

export const IntroOverlay: React.FC = () => {
  const step = useIntroStore((s) => s.step);
  const loadProgress = useIntroStore((s) => s.loadProgress);
  const isLoaded = useIntroStore((s) => s.isLoaded);
  const setLoadProgress = useIntroStore((s) => s.setLoadProgress);
  const enterWorld = useIntroStore((s) => s.enterWorld);
  const skipIntro = useIntroStore((s) => s.skipIntro);
  const setStep = useIntroStore((s) => s.setStep);

  // Expose step to window for input isolation
  useEffect(() => {
    (window as any).__harshIntroStep = step;
  }, [step]);

  // Real asset loading progress simulation with safety timeout
  useEffect(() => {
    if (isLoaded) return;

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 22) + 12;
      if (current >= 100) {
        current = 100;
        setLoadProgress(100);
        clearInterval(interval);
      } else {
        setLoadProgress(current);
      }
    }, 120);

    // Guaranteed safety timeout (never hangs if files are missing or slow)
    const timeout = setTimeout(() => {
      setLoadProgress(100);
      clearInterval(interval);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoaded, setLoadProgress]);

  // Esc key skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.code === 'Escape') && step !== 'done') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, skipIntro]);

  if (step === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: step === 'transition' ? 'none' : 'auto',
        userSelect: 'none',
      }}
    >
      <AnimatePresence>
        {/* Phase 1: Loading & Title Screen */}
        {(step === 'loading' || step === 'title') && (
          <motion.div
            key="title-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#030712',
              backgroundImage: `
                radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
                radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
              `,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            {/* Ambient cyber badge */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '4px 14px',
                borderRadius: '9999px',
                marginBottom: '18px',
              }}
            >
              Interactive 3D Experience
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#f8fafc',
                textShadow: '0 0 32px rgba(56, 189, 248, 0.3)',
                maxWidth: '820px',
                marginBottom: '12px',
                lineHeight: 1.15,
              }}
            >
              {INTRO_CONTENT.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: '#94a3b8',
                maxWidth: '520px',
                lineHeight: 1.6,
                marginBottom: '36px',
              }}
            >
              {INTRO_CONTENT.subtitle}
            </p>

            {/* Action / Progress Area */}
            {step === 'loading' ? (
              <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    height: '4px',
                    width: '100%',
                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${loadProgress}%`,
                      backgroundColor: '#38bdf8',
                      boxShadow: '0 0 12px #38bdf8',
                      transition: 'width 0.15s ease',
                    }}
                  />
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>
                  INITIALIZING ASSETS... {loadProgress}%
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={enterWorld}
                  style={{
                    backgroundColor: '#8b5cf6',
                    backgroundImage: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 42px',
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    boxShadow: '0 12px 32px rgba(139, 92, 246, 0.45)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(139, 92, 246, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.45)';
                  }}
                >
                  {INTRO_CONTENT.enterButtonText} →
                </button>

                <button
                  onClick={skipIntro}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    textDecoration: 'underline',
                  }}
                >
                  Skip Intro (Esc)
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Phase 2: Transition Skip Button */}
        {step === 'transition' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: 32,
              right: 32,
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={skipIntro}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Skip (Esc)
            </button>
          </motion.div>
        )}

        {/* Phase 3: Welcome & Controls Guidance Modal */}
        {step === 'welcome' && (
          <motion.div
            key="welcome-modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(3, 7, 18, 0.72)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.2)',
                borderRadius: '20px',
                padding: '28px',
                color: '#f8fafc',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                Welcome to Harsh's World
              </h2>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94a3b8', marginBottom: '20px' }}>
                {INTRO_CONTENT.welcomeMessage}
              </p>

              {/* Controls Grid */}
              <div
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: '22px',
                  textAlign: 'left',
                }}
              >
                {INTRO_CONTENT.instructions.map((inst, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: '#38bdf8',
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                      }}
                    >
                      {inst.key}
                    </span>
                    <span style={{ color: '#cbd5e1' }}>{inst.desc}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('done')}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  backgroundColor: '#8b5cf6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                }}
              >
                Start Exploring
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
