import React from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  label,
  icon,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: '84px',
        padding: '10px 6px',
        borderRadius: '12px',
        backgroundColor: isActive
          ? 'rgba(56, 189, 248, 0.16)'
          : 'rgba(30, 41, 59, 0.35)',
        border: isActive
          ? '1px solid rgba(56, 189, 248, 0.5)'
          : '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer',
        color: '#f8fafc',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.35)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#38bdf8',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textAlign: 'center',
          color: '#f1f5f9',
          letterSpacing: '0.02em',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
          maxWidth: '78px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
};
