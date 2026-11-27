import React, { useRef, useEffect, useState } from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useIntroStore } from '../../store/useIntroStore';
import { PORTFOLIO_INTERACTABLES } from '../../data/interactables';

// Luxury bedroom dimensions (Extended): Width 7.2m, Length 5.2m
const ROOM_WIDTH = 7.2;
const ROOM_LENGTH = 5.2;

export const MiniMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const introStep = useIntroStore((s) => s.step);
  const activeId = useInteractionStore((s) => s.activeId);
  const discoveredIds = useInteractionStore((s) => s.discoveredIds);

  // Hidden during intro, active panels, or desktop
  const isVisible = introStep === 'done' && !activeId;

  // Render loop driven by requestAnimationFrame directly on canvas (throttled to ~22fps, zero heavy shadowBlur)
  useEffect(() => {
    if (!isVisible || isCollapsed) return;

    let animId: number;
    let lastDraw = 0;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      // Throttle canvas redraws to ~22 FPS to preserve CPU cycles
      if (now - lastDraw < 45) {
        return;
      }
      lastDraw = now;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background (transparent so 3D world shows through liquid glass)
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.fillRect(0, 0, width, height);

      // Grid coordinate conversion: (worldX, worldZ) -> (canvasX, canvasY)
      // worldX [-2.8, 2.8] -> canvasX [0, width]
      // worldZ [-2.6, 2.6] -> canvasY [0, height]
      const toCanvasX = (wx: number) => ((wx + 2.8) / ROOM_WIDTH) * width;
      const toCanvasY = (wz: number) => ((wz + 2.6) / ROOM_LENGTH) * height;

      // 2. Room wall border outline with entrance door gap
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, width - 6, height - 6);

      // Entrance Door indicator on South wall (bottom right)
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(1.30), height - 3);
      ctx.lineTo(toCanvasX(2.20), height - 3);
      ctx.stroke();

      // Window indicator on West wall (left wall)
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(3, toCanvasY(-1.70));
      ctx.lineTo(3, toCanvasY(0.50));
      ctx.stroke();

      // 2b. Stylized furniture layout silhouettes
      ctx.fillStyle = 'rgba(15, 23, 42, 0.10)';
      // Desk
      ctx.fillRect(
        toCanvasX(-2.05),
        toCanvasY(-2.35),
        toCanvasX(-0.15) - toCanvasX(-2.05),
        toCanvasY(-1.45) - toCanvasY(-2.35)
      );
      // Bed
      ctx.fillRect(
        toCanvasX(0.85),
        toCanvasY(-2.40),
        toCanvasX(2.45) - toCanvasX(0.85),
        toCanvasY(-0.30) - toCanvasY(-2.40)
      );
      // Bedside Table & Gramophone
      ctx.fillStyle = 'rgba(217, 119, 6, 0.25)';
      ctx.fillRect(
        toCanvasX(2.55),
        toCanvasY(-2.40),
        toCanvasX(3.05) - toCanvasX(2.55),
        toCanvasY(-1.90) - toCanvasY(-2.40)
      );
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      // Bookshelf
      ctx.fillRect(
        toCanvasX(-2.50),
        toCanvasY(2.17),
        toCanvasX(-1.20) - toCanvasX(-2.50),
        toCanvasY(2.53) - toCanvasY(2.17)
      );
      // Artist Easel with Blank Painting (Sunlit Window Corner)
      ctx.fillStyle = 'rgba(217, 119, 6, 0.25)';
      ctx.fillRect(
        toCanvasX(-2.30),
        toCanvasY(0.50),
        toCanvasX(-1.95) - toCanvasX(-2.30),
        toCanvasY(0.85) - toCanvasY(0.50)
      );
      // Contact Station
      ctx.fillRect(
        toCanvasX(1.50),
        toCanvasY(1.05),
        toCanvasX(2.20) - toCanvasX(1.50),
        toCanvasY(1.55) - toCanvasY(1.05)
      );
      // Minecraft Aquarium
      ctx.fillStyle = 'rgba(2, 132, 199, 0.20)';
      ctx.fillRect(
        toCanvasX(2.20),
        toCanvasY(2.14),
        toCanvasX(3.10) - toCanvasX(2.20),
        toCanvasY(2.58) - toCanvasY(2.14)
      );
      // Lounge Couch (Eli_ac Furniture Pack)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(
        toCanvasX(3.45),
        toCanvasY(-0.85),
        toCanvasX(4.35) - toCanvasX(3.45),
        toCanvasY(1.05) - toCanvasY(-0.85)
      );
      // Lounge Plants & Lamp
      ctx.fillStyle = 'rgba(5, 150, 105, 0.20)';
      ctx.fillRect(
        toCanvasX(3.70),
        toCanvasY(1.15),
        toCanvasX(4.35) - toCanvasX(3.70),
        toCanvasY(2.25) - toCanvasY(1.15)
      );
      // Air Conditioner on South Wall
      ctx.fillStyle = 'rgba(2, 132, 199, 0.20)';
      ctx.fillRect(
        toCanvasX(-0.62),
        toCanvasY(2.44),
        toCanvasX(0.42) - toCanvasX(-0.62),
        toCanvasY(2.58) - toCanvasY(2.44)
      );

      // 3. Subtle room inner grid lines
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo((width / 4) * i, 0);
        ctx.lineTo((width / 4) * i, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, (height / 4) * i);
        ctx.lineTo(width, (height / 4) * i);
        ctx.stroke();
      }

      // 4. Draw 7 Portfolio Interactables (fast ring halos instead of software blur)
      PORTFOLIO_INTERACTABLES.forEach((item) => {
        const cx = toCanvasX(item.position[0]);
        const cy = toCanvasY(item.position[2]);
        const isDiscovered = discoveredIds.includes(item.id);

        if (isDiscovered) {
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(2, 132, 199, 0.20)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isDiscovered ? '#0284c7' : 'rgba(15, 23, 42, 0.35)';
        ctx.fill();
      });

      // 5. Draw Player Position and Facing Direction (read imperatively from store refs)
      const [px, , pz] = usePlayerStore.getState().position;
      const rotation = usePlayerStore.getState().rotation;

      const playerCanvasX = toCanvasX(px);
      const playerCanvasY = toCanvasY(pz);

      ctx.save();
      ctx.translate(playerCanvasX, playerCanvasY);
      ctx.rotate(rotation);

      // Facing directional pointer triangle
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.moveTo(0, 7); // front tip
      ctx.lineTo(4, -4);
      ctx.lineTo(-4, -4);
      ctx.closePath();
      ctx.fill();

      // Center player dot
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, isCollapsed, discoveredIds]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 72,
        left: 24,
        zIndex: 45,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.45)',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      {/* Header bar with collapse toggle */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isCollapsed ? 0 : '8px',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          MAP
        </span>
        <button
          onClick={() => setIsCollapsed((c) => !c)}
          title={isCollapsed ? 'Expand mini-map' : 'Collapse mini-map'}
          style={{
            background: 'none',
            border: 'none',
            color: '#475569',
            fontSize: '11px',
            cursor: 'pointer',
            padding: '2px 4px',
          }}
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>

      {/* 2D Canvas */}
      {!isCollapsed && (
        <canvas
          ref={canvasRef}
          width={130}
          height={130}
          style={{
            width: '130px',
            height: '130px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            display: 'block',
          }}
        />
      )}
    </div>
  );
};
