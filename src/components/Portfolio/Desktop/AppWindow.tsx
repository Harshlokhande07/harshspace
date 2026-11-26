import React from 'react';
import { motion } from 'framer-motion';

interface AppWindowProps {
  title: string;
  icon?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  title,
  icon = '📁',
  onClose,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
        right: '24px',
        bottom: '62px',
        backgroundColor: 'rgba(11, 17, 32, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        boxShadow:
          '0 24px 70px rgba(0, 0, 0, 0.75), 0 0 30px rgba(139, 92, 246, 0.15)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 20,
      }}
    >
      {/* Window Titlebar */}
      <div
        style={{
          height: '42px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px' }}>{icon}</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#f8fafc',
              letterSpacing: '0.02em',
            }}
          >
            {title}
          </span>
        </div>

        {/* Window controls (Min, Max, Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onClose}
            title="Close Window (Esc)"
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '7px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: 1,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content Body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '24px',
          color: '#f8fafc',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
