import type { FC } from 'react';

/**
 * High-tech glassmorphic fallback displayed when the client browser or hardware
 * cannot initialize a WebGL context.
 */
export const WebGLFallback: FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#030712',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.15)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          WebGL Hardware Acceleration Required
        </h1>
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#94a3b8',
            marginBottom: '20px',
          }}
        >
          <strong>Harsh - The Digital World</strong> is an interactive real-time 3D experience
          powered by Three.js and WebGL. It looks like 3D graphics acceleration is disabled or
          unsupported in your current browser.
        </p>

        <div
          style={{
            textAlign: 'left',
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '10px',
            padding: '16px 20px',
            fontSize: '13px',
            color: '#cbd5e1',
            lineHeight: 1.5,
            marginBottom: '24px',
          }}
        >
          <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '8px' }}>
            To view this portfolio:
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            <li>Enable <em>"Use hardware acceleration when available"</em> in browser settings</li>
            <li>Try Chrome, Firefox, Edge, Safari, or a modern mobile browser</li>
            <li>Ensure graphics drivers are up to date</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#7c3aed')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#8b5cf6')}
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
};
