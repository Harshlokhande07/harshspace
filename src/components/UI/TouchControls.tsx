import React, { useRef, useState, useEffect } from 'react';
import { useTouchControlsStore } from '../../store/useTouchControlsStore';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useIntroStore } from '../../store/useIntroStore';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { useCameraStore } from '../../store/useCameraStore';
import { AudioManager } from '../../utils/audioManager';
import { INTERACTABLES } from '../../data/interactables';
import { MOBILE_CONFIG, isTouchDevice } from '../../data/mobile';

export const TouchControls: React.FC = () => {
  const [activeTouchId, setActiveTouchId] = useState<number | null>(null);
  const [thumbPos, setThumbPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const joystickBaseRef = useRef<HTMLDivElement | null>(null);

  const introStep = useIntroStore((s) => s.step);
  const activeInteractionId = useInteractionStore((s) => s.activeId);
  const nearestId = useInteractionStore((s) => s.nearestId);
  const actionState = useCharacterStore((s) => s.actionState);
  const isTyping = useTouchControlsStore((s) => s.isTyping);
  const isTouch = useTouchControlsStore((s) => s.isTouch);
  const setIsTouch = useTouchControlsStore((s) => s.setIsTouch);
  const setMoveInput = useTouchControlsStore((s) => s.setMoveInput);
  const resetMoveInput = useTouchControlsStore((s) => s.resetMoveInput);

  const toggleCameraMode = useCameraStore((s) => s.toggleMode);
  const cameraMode = useCameraStore((s) => s.mode);

  // Auto-detect touch capability
  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, [setIsTouch]);

  // Hidden during intro, modals, desktop, or when keyboard is open for typing
  const isVisible = isTouch && introStep === 'done' && !activeInteractionId && !isTyping;

  const nearestObj = INTERACTABLES.find((item) => item.id === nearestId);
  const isSeatedOrLying = actionState === 'seated' || actionState === 'lying';
  const isSwitchboard = nearestObj?.id === 'switchboard';
  const isAcSwitch = nearestObj?.id === 'ac-switch';

  // Virtual Joystick Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (activeTouchId !== null) return;
    setActiveTouchId(e.pointerId);

    const base = joystickBaseRef.current;
    if (!base) return;

    try {
      base.setPointerCapture(e.pointerId);
    } catch {}

    updateJoystick(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerId !== activeTouchId) return;
    updateJoystick(e.clientX, e.clientY);
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent) => {
    if (e.pointerId !== activeTouchId) return;
    setActiveTouchId(null);
    setThumbPos({ x: 0, y: 0 });
    resetMoveInput();
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    const base = joystickBaseRef.current;
    if (!base) return;

    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxRadius = MOBILE_CONFIG.joystickRadius;
    const clampedDistance = Math.min(distance, maxRadius);
    const angle = Math.atan2(dy, dx);

    const thumbX = Math.cos(angle) * clampedDistance;
    const thumbY = Math.sin(angle) * clampedDistance;

    setThumbPos({ x: thumbX, y: thumbY });

    // Normalize deflection: [-1 to 1]
    const normX = thumbX / maxRadius;
    const normZ = thumbY / maxRadius;
    const ratio = clampedDistance / maxRadius;
    const isRunning = ratio > MOBILE_CONFIG.runThreshold;

    setMoveInput(normX, normZ, isRunning);
  };

  // Reset inputs when tab changes or window blurs
  useEffect(() => {
    const resetAll = () => {
      setActiveTouchId(null);
      setThumbPos({ x: 0, y: 0 });
      resetMoveInput();
    };

    window.addEventListener('blur', resetAll);
    document.addEventListener('visibilitychange', resetAll);
    return () => {
      window.removeEventListener('blur', resetAll);
      document.removeEventListener('visibilitychange', resetAll);
    };
  }, [resetMoveInput]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 48,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* 1. Left Virtual Joystick Area */}
      <div
        ref={joystickBaseRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        style={{
          position: 'absolute',
          bottom: 'max(28px, env(safe-area-inset-bottom))',
          left: 'max(24px, env(safe-area-inset-left))',
          width: '124px',
          height: '124px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          touchAction: 'none',
        }}
      >
        {/* Joystick Thumb knob */}
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 35% 35%, #334155, #0f172a)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            transform: `translate(${thumbPos.x}px, ${thumbPos.y}px)`,
            transition: activeTouchId === null ? 'transform 0.15s ease-out' : 'none',
          }}
        />
      </div>

      {/* 2. Right Action Buttons Cluster */}
      <div
        style={{
          position: 'absolute',
          bottom: 'max(28px, env(safe-area-inset-bottom))',
          right: 'max(20px, env(safe-area-inset-right))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          pointerEvents: 'auto',
        }}
      >
        {/* Stand Up / Get Up Button (Visible when seated or lying) */}
        {isSeatedOrLying && (
          <button
            onClick={() => {
              AudioManager.playSound('click');
              (window as any).__harshExitAction?.();
            }}
            style={{
              minWidth: '100px',
              height: '46px',
              borderRadius: '9999px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0 16px',
              boxShadow: '0 6px 20px rgba(239, 68, 68, 0.45)',
              cursor: 'pointer',
            }}
          >
            Stand Up
          </button>
        )}

        {/* Primary Interact Button (E) */}
        {(Boolean(nearestObj) || actionState === 'seated') && (
          <button
            onClick={() => {
              if (actionState === 'seated') {
                AudioManager.playSound('click');
                useInteractionStore.getState().openInteraction('desk-pc');
                return;
              }

              if (nearestObj) {
                AudioManager.playSound('click');
                if (nearestObj.kind === 'action') {
                  if (nearestObj.id === 'switchboard') {
                    useLivingRoomStore.getState().toggleLamp();
                  } else if (nearestObj.id === 'ac-switch') {
                    useLivingRoomStore.getState().toggleAc();
                  } else if (nearestObj.id === 'coffee') {
                    (window as any).__harshStartAction?.('drink-coffee');
                  } else if (nearestObj.id === 'chair') {
                    (window as any).__harshStartAction?.('sit-chair');
                  } else if (nearestObj.id === 'bed') {
                    (window as any).__harshStartAction?.('lie-bed');
                  }
                } else {
                  useInteractionStore.getState().openInteraction(nearestObj.id);
                }
              }
            }}
            style={{
              minWidth: '96px',
              height: '48px',
              borderRadius: '9999px',
              backgroundColor: '#38bdf8',
              backgroundImage: 'linear-gradient(135deg, #38bdf8, #0284c7)',
              color: '#0f172a',
              border: 'none',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0 16px',
              boxShadow: '0 6px 20px rgba(56, 189, 248, 0.45)',
              cursor: 'pointer',
            }}
          >
            {actionState === 'seated' ? 'Use PC' : nearestObj?.label || 'Interact'}
          </button>
        )}

        {/* Fan Toggle Button (F) - only when near switchboard */}
        {isSwitchboard && actionState === 'free' && (
          <button
            onClick={() => {
              AudioManager.playSound('switch');
              const nextFan = !useLivingRoomStore.getState().fanOn;
              useLivingRoomStore.getState().toggleFan();
              AudioManager.setFanLoop(nextFan);
            }}
            style={{
              minWidth: '86px',
              height: '44px',
              borderRadius: '9999px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0 14px',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.45)',
              cursor: 'pointer',
            }}
          >
            Toggle Fan
          </button>
        )}

        {/* Temp Adjust Button (T) - only when near AC switch */}
        {isAcSwitch && actionState === 'free' && (
          <button
            onClick={() => {
              AudioManager.playSound('click');
              const cur = useLivingRoomStore.getState().acTemp;
              const next = cur <= 18 ? 26 : cur - 2;
              useLivingRoomStore.getState().setAcTemp(next);
            }}
            style={{
              minWidth: '86px',
              height: '44px',
              borderRadius: '9999px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0 14px',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.45)',
              cursor: 'pointer',
            }}
          >
            Cycle Temp
          </button>
        )}

        {/* Camera View Switcher Button (V) */}
        <button
          onClick={() => {
            AudioManager.playSound('click');
            toggleCameraMode();
          }}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            color: '#0f172a',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
            cursor: 'pointer',
          }}
          title="Toggle camera view"
        >
          {cameraMode === 'first' ? '1P' : '3P'}
        </button>
      </div>
    </div>
  );
};
