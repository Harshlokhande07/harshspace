import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageViewerProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  category?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  category,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Reset zoom & pan when item changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [title, imageUrl]);

  // Keyboard navigation: Left/Right arrows and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        e.stopPropagation();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        e.stopPropagation();
        onNext();
      } else if (e.key === 'Escape' || e.code === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [hasPrev, hasNext, onPrev, onNext, onClose]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoom((z) => Math.max(1, Math.min(3.5, Number((z + delta).toFixed(2)))));
  };

  // Drag to pan when zoomed in
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const hasImage = Boolean(imageUrl && imageUrl.trim() !== '');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 8, 16, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        userSelect: 'none',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'relative',
          width: '92vw',
          maxWidth: '1080px',
          maxHeight: '90vh',
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.2)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top bar with item title, zoom controls & close button */}
        <div
          style={{
            height: '52px',
            padding: '0 20px',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            {category && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                {category}
              </span>
            )}
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#f8fafc',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Zoom Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2px',
              }}
            >
              <button
                onClick={() => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
                disabled={zoom <= 1}
                title="Zoom Out (-)"
                style={{
                  width: '28px',
                  height: '26px',
                  background: 'transparent',
                  border: 'none',
                  color: zoom <= 1 ? '#475569' : '#f8fafc',
                  cursor: zoom <= 1 ? 'default' : 'pointer',
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                  padding: '0 6px',
                  minWidth: '42px',
                  textAlign: 'center',
                }}
              >
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(3.5, Number((z + 0.25).toFixed(2))))}
                disabled={zoom >= 3.5}
                title="Zoom In (+)"
                style={{
                  width: '28px',
                  height: '26px',
                  background: 'transparent',
                  border: 'none',
                  color: zoom >= 3.5 ? '#475569' : '#f8fafc',
                  cursor: zoom >= 3.5 ? 'default' : 'pointer',
                  fontWeight: 700,
                }}
              >
                +
              </button>
              {zoom > 1 && (
                <button
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  title="Reset Zoom"
                  style={{
                    padding: '2px 8px',
                    background: 'rgba(56, 189, 248, 0.2)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#38bdf8',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginLeft: '4px',
                  }}
                >
                  Reset
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              title="Close Preview (Esc)"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Middle: Canvas / Image viewing viewport */}
        <div
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            flex: 1,
            minHeight: '360px',
            backgroundColor: '#090d16',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            cursor: zoom > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
          }}
        >
          {/* Previous / Next on-canvas navigation arrow buttons */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              title="Previous Item (Left Arrow)"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}
            >
              ‹
            </button>
          )}

          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              title="Next Item (Right Arrow)"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}
            >
              ›
            </button>
          )}

          {/* Image plane or SAMPLE Placeholder */}
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging.current ? 'none' : 'transform 0.12s ease-out',
              maxWidth: '85%',
              maxHeight: '85%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {hasImage ? (
              <img
                src={imageUrl}
                alt={title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '580px',
                  height: '380px',
                  backgroundColor: 'rgba(21, 29, 48, 0.85)',
                  border: '2px dashed rgba(56, 189, 248, 0.4)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '28px',
                  textAlign: 'center',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}
                >
                  SAMPLE PREVIEW ASSET
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  {title}
                </h4>
                {subtitle && (
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>
                    {subtitle}
                  </p>
                )}
                <p style={{ fontSize: '12px', color: '#64748b', maxWidth: '380px' }}>
                  Drop your real 1600px image in the corresponding <code style={{ color: '#a78bfa' }}>public/images/</code> folder and update the image path to replace this placeholder.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom panel: Details & Description */}
        <div
          style={{
            padding: '18px 24px',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {subtitle && (
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#38bdf8' }}>
              {subtitle}
            </div>
          )}
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#cbd5e1', margin: 0 }}>
            {description}
          </p>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
            Scroll to zoom • Drag to pan • Arrow keys to navigate • <kbd style={{ color: '#a78bfa' }}>Esc</kbd> to return to gallery
          </div>
        </div>
      </motion.div>
    </div>
  );
};
