import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGamesStore } from '../../../../store/useGamesStore';

interface Target {
  id: number;
  x: number; // percentage (5% to 90%)
  y: number; // percentage (5% to 85%)
  size: number; // px (40px to 65px)
  spawnTime: number;
  scored: boolean;
}

const TOTAL_GAME_TIME = 30;
const TARGET_LIFESPAN = 1400; // ms

export const TargetShootingGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_GAME_TIME);
  const [targets, setTargets] = useState<Target[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const targetHighScore = useGamesStore((s) => s.targetHighScore);
  const updateTargetHighScore = useGamesStore((s) => s.updateTargetHighScore);
  const setActiveGame = useGamesStore((s) => s.setActiveGame);

  const nextTargetId = useRef<number>(1);
  const playAreaRef = useRef<HTMLDivElement | null>(null);

  // Update high score
  useEffect(() => {
    if (score > targetHighScore) {
      updateTargetHighScore(score);
    }
  }, [score, targetHighScore, updateTargetHighScore]);

  // Pause/stop when hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isPlaying && !isGameOver) {
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying, isGameOver]);

  // Main countdown timer (30s)
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  // Target spawner and cleanup loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const spawnInterval = setInterval(() => {
      const now = Date.now();
      setTargets((prev) => {
        // Remove expired targets
        const active = prev.filter((t) => now - t.spawnTime < TARGET_LIFESPAN && !t.scored);

        // Keep 2-3 targets on screen
        if (active.length < 3) {
          const newTarget: Target = {
            id: nextTargetId.current++,
            x: Math.floor(Math.random() * 80) + 8, // 8% to 88%
            y: Math.floor(Math.random() * 75) + 10, // 10% to 85%
            size: Math.floor(Math.random() * 20) + 44, // 44px to 64px
            spawnTime: now,
            scored: false,
          };
          return [...active, newTarget];
        }
        return active;
      });
    }, 650);

    return () => clearInterval(spawnInterval);
  }, [isPlaying, isGameOver]);

  // Click target with single-score guarantee
  const handleTargetHit = useCallback((targetId: number, e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setTargets((prev) => {
      const target = prev.find((t) => t.id === targetId);
      if (!target || target.scored) return prev;

      setScore((s) => s + 15);
      return prev.map((t) => (t.id === targetId ? { ...t, scored: true } : t));
    });
  }, []);

  const handleStartOrRestart = () => {
    setScore(0);
    setTimeLeft(TOTAL_GAME_TIME);
    setTargets([]);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '16px',
        color: '#f8fafc',
        userSelect: 'none',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <button
          onClick={() => setActiveGame('menu')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '6px 12px',
            color: '#cbd5e1',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ← Back to Games
        </button>

        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontFamily: 'monospace' }}>
          <div>
            TIME: <strong style={{ color: timeLeft < 10 ? '#f43f5e' : '#38bdf8' }}>{timeLeft}s</strong>
          </div>
          <div>
            SCORE: <strong style={{ color: '#a855f7' }}>{score}</strong>
          </div>
          <div>
            BEST: <strong style={{ color: '#10b981' }}>{targetHighScore}</strong>
          </div>
        </div>
      </div>

      {/* Target Arena Playfield */}
      <div
        ref={playAreaRef}
        style={{
          position: 'relative',
          width: 'min(90vw, 560px)',
          height: 'min(62vh, 420px)',
          borderRadius: '16px',
          border: '2px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
          overflow: 'hidden',
          backgroundColor: '#0a0f1d',
          backgroundImage: `
            radial-gradient(circle at center, rgba(56, 189, 248, 0.06) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
          cursor: isPlaying ? 'crosshair' : 'default',
        }}
      >
        {/* Render Targets */}
        {isPlaying &&
          !isGameOver &&
          targets.map((target) => {
            if (target.scored) return null;
            return (
              <div
                key={target.id}
                onPointerDown={(e) => handleTargetHit(target.id, e)}
                style={{
                  position: 'absolute',
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: '3px solid #38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.25)',
                  boxShadow: '0 0 16px #38bdf8, inset 0 0 10px #38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  animation: 'pulse 1s infinite alternate',
                }}
              >
                {/* Inner Bullseye */}
                <div
                  style={{
                    width: '38%',
                    height: '38%',
                    borderRadius: '50%',
                    backgroundColor: '#f43f5e',
                    boxShadow: '0 0 8px #f43f5e',
                  }}
                />
              </div>
            );
          })}

        {/* Start / Game Over Overlay */}
        {(!isPlaying || isGameOver) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10, 15, 29, 0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            {isGameOver ? (
              <>
                <div style={{ fontSize: '32px' }}>🎯</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#38bdf8' }}>TIME'S UP!</h3>
                <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                  Targets Destroyed: <strong style={{ color: '#a855f7' }}>{score / 15}</strong>
                </p>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Final Score: {score}</p>
                <button
                  onClick={handleStartOrRestart}
                  style={{
                    backgroundColor: '#38bdf8',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Play Again
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: '36px' }}>🎯</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>TARGET REFLEX</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '300px' }}>
                  Tap or click glowing holo-targets before they vanish. 30 seconds to set a new record!
                </p>
                <button
                  onClick={handleStartOrRestart}
                  style={{
                    backgroundColor: '#38bdf8',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 28px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
                  }}
                >
                  Start Challenge
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
