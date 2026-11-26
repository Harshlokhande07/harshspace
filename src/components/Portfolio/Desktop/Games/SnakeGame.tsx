import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  SnakeState,
  Direction,
  createInitialSnakeState,
  isValidDirectionChange,
  tickSnake,
} from '../../../../utils/snakeLogic';
import { useGamesStore } from '../../../../store/useGamesStore';

const GRID_SIZE = 20;
const TICK_INTERVAL = 110;

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<SnakeState>(() => createInitialSnakeState(GRID_SIZE));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const snakeHighScore = useGamesStore((s) => s.snakeHighScore);
  const updateSnakeHighScore = useGamesStore((s) => s.updateSnakeHighScore);
  const setActiveGame = useGamesStore((s) => s.setActiveGame);

  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  // Handle high score updates
  useEffect(() => {
    if (gameState.score > snakeHighScore) {
      updateSnakeHighScore(gameState.score);
    }
  }, [gameState.score, snakeHighScore, updateSnakeHighScore]);

  // Pause when browser tab hides
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && !gameStateRef.current.isGameOver) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  // Safe direction update (guards against fast double-press self collision)
  const queueDirection = useCallback((newDir: Direction) => {
    setGameState((prev) => {
      if (isValidDirectionChange(prev.direction, newDir)) {
        return { ...prev, nextDirection: newDir };
      }
      return prev;
    });
  }, []);

  // Keyboard navigation inside SnakeGame
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      const key = e.key.toLowerCase();

      // Prevent page scrolling with arrows/space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(code)) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (code === 'ArrowUp' || key === 'w') queueDirection('UP');
      else if (code === 'ArrowDown' || key === 's') queueDirection('DOWN');
      else if (code === 'ArrowLeft' || key === 'a') queueDirection('LEFT');
      else if (code === 'ArrowRight' || key === 'd') queueDirection('RIGHT');
      else if (code === 'Space') {
        if (isPlaying && !gameStateRef.current.isGameOver) {
          setIsPaused((p) => !p);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isPlaying, queueDirection]);

  // Main game tick loop
  useEffect(() => {
    if (!isPlaying || isPaused || gameState.isGameOver || gameState.isWon) return;

    const interval = setInterval(() => {
      setGameState((prev) => tickSnake(prev));
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, gameState.isGameOver, gameState.isWon]);

  // 2D Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const cellSize = size / GRID_SIZE;

    // Clear board
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, size, size);

    // Subtle grid background lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }

    // Render Food (Glowing energy pellet)
    if (gameState.food.x >= 0 && gameState.food.y >= 0) {
      const foodX = gameState.food.x * cellSize + cellSize / 2;
      const foodY = gameState.food.y * cellSize + cellSize / 2;
      const radius = cellSize * 0.38;

      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(foodX, foodY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Render Snake Body
    gameState.snake.forEach((segment, idx) => {
      const isHead = idx === 0;
      const x = segment.x * cellSize + 1.5;
      const y = segment.y * cellSize + 1.5;
      const w = cellSize - 3;
      const h = cellSize - 3;
      const radius = isHead ? 6 : 4;

      ctx.save();
      if (isHead) {
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#c084fc';
      } else {
        ctx.fillStyle = '#8b5cf6';
      }

      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.fill();
      ctx.restore();
    });
  }, [gameState]);

  // Touch swipe support
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartPos.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartPos.current.x;
    const dy = t.clientY - touchStartPos.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 25) {
      if (absX > absY) {
        queueDirection(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        queueDirection(dy > 0 ? 'DOWN' : 'UP');
      }
    }
    touchStartPos.current = null;
  };

  const handleStartOrRestart = () => {
    setGameState(createInitialSnakeState(GRID_SIZE));
    setIsPlaying(true);
    setIsPaused(false);
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
      {/* Top Header Controls Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
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
            SCORE: <strong style={{ color: '#38bdf8' }}>{gameState.score}</strong>
          </div>
          <div>
            BEST: <strong style={{ color: '#a855f7' }}>{snakeHighScore}</strong>
          </div>
        </div>
      </div>

      {/* Main Canvas Play Area */}
      <div
        style={{
          position: 'relative',
          width: 'min(70vh, 420px)',
          height: 'min(70vh, 420px)',
          borderRadius: '16px',
          border: '2px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.15)',
          overflow: 'hidden',
          backgroundColor: '#0a0f1d',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={420}
          height={420}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* Start / Game Over Overlay */}
        {(!isPlaying || isPaused || gameState.isGameOver || gameState.isWon) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10, 15, 29, 0.85)',
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
            {gameState.isGameOver ? (
              <>
                <div style={{ fontSize: '32px' }}>💥</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f43f5e' }}>GAME OVER</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Final Score: {gameState.score}</p>
                <button
                  onClick={handleStartOrRestart}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
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
            ) : gameState.isWon ? (
              <>
                <div style={{ fontSize: '32px' }}>🏆</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#10b981' }}>GRID COMPLETED!</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Perfect score achieved!</p>
                <button
                  onClick={handleStartOrRestart}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#fff',
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
            ) : isPaused ? (
              <>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#38bdf8' }}>PAUSED</h3>
                <button
                  onClick={() => setIsPaused(false)}
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
                  Resume
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: '36px' }}>🐍</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>CYBER SNAKE</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '260px' }}>
                  Navigate with WASD / Arrow keys. Eat energy pellets to grow.
                </p>
                <button
                  onClick={handleStartOrRestart}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 28px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  Start Game
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* On-Screen Mobile D-Pad Controls */}
      <div
        style={{
          marginTop: '12px',
          display: 'grid',
          gridTemplateAreas: `
            ". up ."
            "left . right"
            ". down ."
          `,
          gap: '6px',
        }}
      >
        <button
          onClick={() => queueDirection('UP')}
          style={{
            gridArea: 'up',
            width: '42px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ▲
        </button>
        <button
          onClick={() => queueDirection('LEFT')}
          style={{
            gridArea: 'left',
            width: '42px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ◀
        </button>
        <button
          onClick={() => queueDirection('DOWN')}
          style={{
            gridArea: 'down',
            width: '42px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ▼
        </button>
        <button
          onClick={() => queueDirection('RIGHT')}
          style={{
            gridArea: 'right',
            width: '42px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
};
