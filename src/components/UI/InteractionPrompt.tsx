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
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.10) 100%)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.45)',
            boxShadow:
              '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
            borderRadius: '9999px',
            padding: '10px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#0f172a',
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
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#0f172a',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {isTouch ? 'TAP' : 'E'}
              </kbd>
              <span style={{ color: '#0f172a', fontWeight: 700 }}>Use PC</span>

              <span style={{ color: '#94a3b8', margin: '0 2px' }}>•</span>

              <span style={{ color: '#475569' }}>
                <strong style={{ color: '#0f172a' }}>{isTouch ? 'Tap Stand Up' : 'Esc or move'}</strong> to Stand Up
              </span>
            </>
          ) : actionState === 'lying' ? (
            <>
              <span style={{ color: '#475569' }}>
                <strong style={{ color: '#0f172a' }}>{isTouch ? 'Tap Stand Up' : 'Esc or move'}</strong> to Get Up
              </span>
            </>
          ) : isAcSwitch ? (
            <>
              <span style={{ color: '#475569' }}>{isTouch ? 'Tap for' : 'Press'}</span>
              <kbd
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#0f172a',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {isTouch ? 'AC' : 'E'}
              </kbd>
              {!isTouch && (
                <span style={{ color: '#0f172a', fontWeight: 700 }}>
                  AC ({acOn ? 'ON' : 'OFF'})
                </span>
              )}

              <span style={{ color: '#94a3b8', margin: '0 2px' }}>•</span>

              <kbd
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#059669',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {isTouch ? 'Temp' : 'T'}
              </kbd>
              {!isTouch && (
                <span style={{ color: '#059669', fontWeight: 700 }}>
                  Temp {acTemp}°C (Room: {roomTemp}°C)
                </span>
              )}
            </>
          ) : isSwitchboard ? (
            <>
              <span style={{ color: '#475569' }}>{isTouch ? 'Tap button for' : 'Press'}</span>
              <kbd
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#0f172a',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {isTouch ? 'Lamp' : 'E'}
              </kbd>
              {!isTouch && <span style={{ color: '#0f172a', fontWeight: 700 }}>Lamp</span>}

              <span style={{ color: '#94a3b8', margin: '0 2px' }}>•</span>

              <kbd
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#059669',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {isTouch ? 'Fan' : 'F'}
              </kbd>
              {!isTouch && <span style={{ color: '#0f172a', fontWeight: 700 }}>Fan</span>}
            </>
          ) : interactable ? (
            <>
              <span style={{ color: '#475569' }}>{isTouch ? 'Tap' : 'Press'}</span>
              <kbd
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: '#0f172a',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {isTouch ? 'Action' : 'E'}
              </kbd>
              <span style={{ color: '#475569' }}>to</span>
              <span style={{ color: '#0f172a', fontWeight: 700 }}>
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
