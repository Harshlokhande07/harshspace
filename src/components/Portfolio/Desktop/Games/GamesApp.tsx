import React, { lazy, Suspense } from 'react';
import { useGamesStore } from '../../../../store/useGamesStore';
import { GAMES_DATA } from '../../../../data/games';

const SnakeGame = lazy(() =>
  import('./SnakeGame').then((m) => ({ default: m.SnakeGame }))
);

const TargetShootingGame = lazy(() =>
  import('./TargetShootingGame').then((m) => ({ default: m.TargetShootingGame }))
);

export const GamesApp: React.FC = () => {
  const activeGame = useGamesStore((s) => s.activeGame);
  const setActiveGame = useGamesStore((s) => s.setActiveGame);
  const snakeHighScore = useGamesStore((s) => s.snakeHighScore);
  const targetHighScore = useGamesStore((s) => s.targetHighScore);

  if (activeGame === 'snake') {
    return (
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#38bdf8',
              fontFamily: 'monospace',
            }}
          >
            Loading Cyber Snake...
          </div>
        }
      >
        <SnakeGame />
      </Suspense>
    );
  }

  if (activeGame === 'target-shooting') {
    return (
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#38bdf8',
              fontFamily: 'monospace',
            }}
          >
            Loading Target Reflex...
          </div>
        }
      >
        <TargetShootingGame />
      </Suspense>
    );
  }

  // Games Hub Menu View
  return (
    <div
      style={{
        maxWidth: '880px',
        margin: '0 auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        color: '#f8fafc',
        userSelect: 'none',
      }}
    >
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
          HarshOS Arcade
        </h1>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          Select a retro cyberpunk mini-game to play directly inside the workstation.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Game 1: Snake Card */}
        <div
          onClick={() => setActiveGame('snake')}
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
            e.currentTarget.style.boxShadow =
              '0 18px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                }}
              >
                {GAMES_DATA.snake.icon}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#a78bfa',
                  backgroundColor: 'rgba(139, 92, 246, 0.15)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                High Score: {snakeHighScore}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
              {GAMES_DATA.snake.title}
            </h3>

            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#94a3b8', marginBottom: '16px' }}>
              {GAMES_DATA.snake.tagline}
            </p>
          </div>

          <button
            style={{
              width: '100%',
              padding: '10px 0',
              backgroundColor: 'rgba(139, 92, 246, 0.85)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            Launch Cyber Snake →
          </button>
        </div>

        {/* Game 2: Target Shooting Card */}
        <div
          onClick={() => setActiveGame('target-shooting')}
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
            e.currentTarget.style.boxShadow =
              '0 18px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                }}
              >
                {GAMES_DATA['target-shooting'].icon}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                High Score: {targetHighScore}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
              {GAMES_DATA['target-shooting'].title}
            </h3>

            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#94a3b8', marginBottom: '16px' }}>
              {GAMES_DATA['target-shooting'].tagline}
            </p>
          </div>

          <button
            style={{
              width: '100%',
              padding: '10px 0',
              backgroundColor: 'rgba(56, 189, 248, 0.85)',
              color: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            Launch Target Reflex →
          </button>
        </div>
      </div>
    </div>
  );
};
