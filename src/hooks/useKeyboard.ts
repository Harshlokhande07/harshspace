import { useEffect, useState } from 'react';
import { useInteractionStore } from '../store/useInteractionStore';
import { useIntroStore } from '../store/useIntroStore';
import { useTouchControlsStore } from '../store/useTouchControlsStore';

export interface MovementKeys {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  shift: boolean;
}

export function useKeyboard(): MovementKeys {
  const [keys, setKeys] = useState<MovementKeys>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  });

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        useTouchControlsStore.getState().setIsTyping(true);
      }
    };

    const handleFocusOut = () => {
      useTouchControlsStore.getState().setIsTyping(false);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore character movement while typing in text inputs, when intro is playing, or when an interaction panel is active
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable ||
        useInteractionStore.getState().activeId !== null ||
        useIntroStore.getState().step !== 'done'
      ) {
        return;
      }

      const code = e.code;
      const key = e.key.toLowerCase();

      if (code === 'KeyW' || code === 'ArrowUp' || key === 'w') {
        setKeys((k) => ({ ...k, forward: true }));
      }
      if (code === 'KeyS' || code === 'ArrowDown' || key === 's') {
        setKeys((k) => ({ ...k, backward: true }));
      }
      if (code === 'KeyA' || code === 'ArrowLeft' || key === 'a') {
        setKeys((k) => ({ ...k, left: true }));
      }
      if (code === 'KeyD' || code === 'ArrowRight' || key === 'd') {
        setKeys((k) => ({ ...k, right: true }));
      }
      if (code === 'ShiftLeft' || code === 'ShiftRight' || e.shiftKey) {
        setKeys((k) => ({ ...k, shift: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      const code = e.code;
      const key = e.key.toLowerCase();

      if (code === 'KeyW' || code === 'ArrowUp' || key === 'w') {
        setKeys((k) => ({ ...k, forward: false }));
      }
      if (code === 'KeyS' || code === 'ArrowDown' || key === 's') {
        setKeys((k) => ({ ...k, backward: false }));
      }
      if (code === 'KeyA' || code === 'ArrowLeft' || key === 'a') {
        setKeys((k) => ({ ...k, left: false }));
      }
      if (code === 'KeyD' || code === 'ArrowRight' || key === 'd') {
        setKeys((k) => ({ ...k, right: false }));
      }
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        setKeys((k) => ({ ...k, shift: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}
