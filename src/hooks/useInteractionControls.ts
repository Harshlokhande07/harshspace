import { useEffect } from 'react';
import { useInteractionStore } from '../store/useInteractionStore';
import { useLivingRoomStore } from '../store/useLivingRoomStore';
import { useCharacterStore } from '../store/useCharacterStore';
import { useEasterEggStore } from '../store/useEasterEggStore';
import { AudioManager } from '../utils/audioManager';
import { INTERACTABLES } from '../data/interactables';

/**
 * Handles 'E' and 'F' key inputs for proximity interactions,
 * supporting 'panel' interactables, instant 'action' interactables (switchboard, coffee, chair, bed),
 * and seated state transitions ('E: Use PC', 'Esc: Stand Up').
 */
export function useInteractionControls() {
  const openInteraction = useInteractionStore((s) => s.openInteraction);
  const closeInteraction = useInteractionStore((s) => s.closeInteraction);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const code = e.code;
      const interactionState = useInteractionStore.getState();
      const nearestId = interactionState.nearestId;
      const activeId = interactionState.activeId;
      const actionState = useCharacterStore.getState().actionState;
      const introStep = (window as any).__harshIntroStep;

      // Ignore interactions during intro
      if (introStep && introStep !== 'done') {
        return;
      }

      const nearestObj = INTERACTABLES.find((item) => item.id === nearestId);

      // Handle 'E' key press
      if (code === 'KeyE' || key === 'e') {
        // If seated at chair, E opens the PC desktop
        if (actionState === 'seated') {
          if (!activeId) {
            openInteraction('desk-pc');
          }
          return;
        }

        // If currently in a transition (approaching, sitting down, getting up), ignore E
        if (actionState !== 'free') {
          return;
        }

        if (nearestObj) {
          if (nearestObj.kind === 'action') {
            if (nearestObj.id === 'switchboard') {
              AudioManager.playSound('switch');
              useLivingRoomStore.getState().toggleLamp();
            } else if (nearestObj.id === 'coffee') {
              AudioManager.playSound('coffee');
              (window as any).__harshStartAction?.('drink-coffee');
            } else if (nearestObj.id === 'chair') {
              AudioManager.playSound('click');
              (window as any).__harshStartAction?.('sit-chair');
            } else if (nearestObj.id === 'bed') {
              AudioManager.playSound('click');
              (window as any).__harshStartAction?.('lie-bed');
            } else if (nearestObj.id === 'drawer-note') {
              AudioManager.playSound('click');
              useEasterEggStore.getState().openEasterEgg('drawer-note');
            } else if (nearestObj.id === 'secret-cube') {
              AudioManager.playSound('click');
              useEasterEggStore.getState().openEasterEgg('secret-cube');
            }
          } else if (!activeId) {
            AudioManager.playSound('click');
            openInteraction(nearestObj.id);
          }
        }
      }

      // Handle 'F' key press for secondary action on Switchboard (Ceiling Fan)
      if (code === 'KeyF' || key === 'f') {
        if (nearestObj && nearestObj.id === 'switchboard' && actionState === 'free') {
          AudioManager.playSound('switch');
          const nextFan = !useLivingRoomStore.getState().fanOn;
          useLivingRoomStore.getState().toggleFan();
          AudioManager.setFanLoop(nextFan);
        }
      }

      // Handle 'Escape' key press
      if (code === 'Escape' || key === 'escape') {
        // If a panel is currently open
        if (activeId) {
          const hasCustomEscHandler =
            activeId === 'desk-pc' ||
            activeId === 'bookshelf' ||
            activeId === 'achievements' ||
            activeId === 'memories' ||
            activeId === 'contact';

          if (!hasCustomEscHandler) {
            closeInteraction();
          }
          return;
        }

        // If no panel is open, but character is seated or lying: stand up
        if (actionState === 'seated' || actionState === 'lying') {
          (window as any).__harshExitAction?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openInteraction, closeInteraction]);
}
