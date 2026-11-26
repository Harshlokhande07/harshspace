import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useCharacterStore } from '../../store/useCharacterStore';
import { INTERACTABLES } from '../../data/interactables';
import { useTouchControlsStore } from '../../store/useTouchControlsStore';

import { useLivingRoomStore } from '../../store/useLivingRoomStore';

export const InteractionPrompt: React.FC = () => {
  const nearestId = useInteractionStore((s) => s.nearestId);
  const activeId = useInteractionStore((s) => s.activeId);
  const actionState = useCharacterStore((s) => s.actionState);
  const isTouch = useTouchControlsStore((s) => s.isTouch);

  const interactable = INTERACTABLES.find((item) => item.id === nearestId);

  // If seated or lying and no panel is open, show posture exit/action prompts
  const isSeatedOrLying = actionState === 'seated' || actionState === 'lying';
  const isVisible = (Boolean(interactable && !activeId) && actionState === 'free') || (isSeatedOrLying && !activeId);

  const isSwitchboard = interactable?.id === 'switchboard';
  const isAcSwitch = interactable?.id === 'ac-switch';
  const acOn = useLivingRoomStore((s) => s.acOn);
  const acTemp = useLivingRoomStore((s) => s.acTemp);
  const roomTemp = useLivingRoomStore((s) => s.roomTemp);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={actionState !== 'free' ? actionState : interactable?.id}
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            boxShadow:
              '0 12px 36px rgba(0, 0, 0, 0.55), 0 0 20px rgba(139, 92, 246, 0.2)',
            borderRadius: '9999px',
            padding: '10px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#f8fafc',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {actionState === 'seated' ? (
            <>
              <kbd
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.25)',
                  color: '#38bdf8',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {isTouch ? 'TAP' : 'E'}
              </kbd>
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>Use PC</span>

              <span style={{ color: '#64748b', margin: '0 2px' }}>•</span>

              <span style={{ color: '#94a3b8' }}>
                <strong style={{ color: '#f8fafc' }}>{isTouch ? 'Tap Stand Up' : 'Esc or move'}</strong> to Stand Up
              </span>
            </>
          ) : actionState === 'lying' ? (
            <>
              <span style={{ color: '#94a3b8' }}>
                <strong style={{ color: '#f8fafc' }}>{isTouch ? 'Tap Stand Up' : 'Esc or move'}</strong> to Get Up
              </span>
            </>
          ) : isAcSwitch ? (
            <>
              <span style={{ color: '#94a3b8' }}>{isTouch ? 'Tap for' : 'Press'}</span>
              <kbd
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.25)',
                  color: '#38bdf8',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {isTouch ? 'AC' : 'E'}
              </kbd>
              {!isTouch && (
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>
                  AC ({acOn ? 'ON' : 'OFF'})
                </span>
              )}

              <span style={{ color: '#64748b', margin: '0 2px' }}>•</span>

              <kbd
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.25)',
                  color: '#10b981',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {isTouch ? 'Temp' : 'T'}
              </kbd>
              {!isTouch && (
                <span style={{ color: '#10b981', fontWeight: 600 }}>
                  Temp {acTemp}°C (Room: {roomTemp}°C)
                </span>
              )}
            </>
          ) : isSwitchboard ? (
            <>
              <span style={{ color: '#94a3b8' }}>{isTouch ? 'Tap button for' : 'Press'}</span>
              <kbd
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.25)',
                  color: '#38bdf8',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {isTouch ? 'Lamp' : 'E'}
              </kbd>
              {!isTouch && <span style={{ color: '#f8fafc', fontWeight: 600 }}>Lamp</span>}

              <span style={{ color: '#64748b', margin: '0 2px' }}>•</span>

              <kbd
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.25)',
                  color: '#10b981',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {isTouch ? 'Fan' : 'F'}
              </kbd>
              {!isTouch && <span style={{ color: '#f8fafc', fontWeight: 600 }}>Fan</span>}
            </>
          ) : interactable ? (
            <>
              <span style={{ color: '#94a3b8' }}>{isTouch ? 'Tap' : 'Press'}</span>
              <kbd
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.25)',
                  color: '#38bdf8',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {isTouch ? 'Action' : 'E'}
              </kbd>
              <span style={{ color: '#94a3b8' }}>to</span>
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>
                {interactable.promptText}
              </span>
            </>
          ) : null}

          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#a855f7',
              boxShadow: '0 0 8px #a855f7',
              marginLeft: '2px',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
