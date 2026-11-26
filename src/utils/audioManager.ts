import { useAudioStore } from '../store/useAudioStore';

// Safe glob discovery for optional sound assets (never fails build if missing)
const audioModules = import.meta.glob('/src/assets/audio/*.{mp3,ogg}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Find matching url by keyword
function findAudioUrl(keyword: string): string | undefined {
  const keys = Object.keys(audioModules);
  const found = keys.find((k) => k.toLowerCase().includes(keyword.toLowerCase()));
  return found ? audioModules[found] : undefined;
}

class AudioManagerClass {
  private hasInteracted = false;
  private musicAudio: HTMLAudioElement | null = null;
  private fanAudio: HTMLAudioElement | null = null;
  private footstepAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window === 'undefined') return;

    // Unlock on first user gesture
    const unlock = () => {
      if (this.hasInteracted) return;
      this.hasInteracted = true;
      this.updateMusicPlayback();

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    window.addEventListener('touchstart', unlock);

    // Pause all audio when document is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.musicAudio?.pause();
        this.fanAudio?.pause();
        this.footstepAudio?.pause();
      } else {
        this.updateMusicPlayback();
      }
    });

    // Subscribe to store changes to adjust volumes immediately
    useAudioStore.subscribe(() => {
      this.applyVolumes();
    });
  }

  public unlockGesture() {
    this.hasInteracted = true;
    this.updateMusicPlayback();
  }

  // Play one-shot SFX: 'click', 'switch', 'coffee'
  public playSound(name: 'click' | 'switch' | 'coffee') {
    const { muted, effectsVolume } = useAudioStore.getState();
    if (muted || effectsVolume <= 0) return;

    const url = findAudioUrl(name);
    if (!url) return;

    try {
      const audio = new Audio(url);
      audio.volume = effectsVolume;
      audio.play().catch(() => {});
    } catch {}
  }

  // Manage background music loop
  public updateMusicPlayback() {
    const { muted, musicEnabled, musicVolume } = useAudioStore.getState();
    const url = findAudioUrl('music');

    if (!url || !this.hasInteracted) return;

    if (!this.musicAudio) {
      try {
        this.musicAudio = new Audio(url);
        this.musicAudio.loop = true;
      } catch {
        return;
      }
    }

    if (muted || !musicEnabled) {
      this.musicAudio.pause();
    } else {
      this.musicAudio.volume = musicVolume;
      if (this.musicAudio.paused) {
        this.musicAudio.play().catch(() => {});
      }
    }
  }

  // Manage fan sound loop (synced with fanOn)
  public setFanLoop(isOn: boolean) {
    const { muted, effectsVolume } = useAudioStore.getState();
    const url = findAudioUrl('fan');

    if (!url) return;

    if (!this.fanAudio) {
      try {
        this.fanAudio = new Audio(url);
        this.fanAudio.loop = true;
      } catch {
        return;
      }
    }

    if (isOn && !muted && effectsVolume > 0 && this.hasInteracted) {
      this.fanAudio.volume = effectsVolume * 0.45;
      if (this.fanAudio.paused) {
        this.fanAudio.play().catch(() => {});
      }
    } else {
      this.fanAudio.pause();
    }
  }

  // Manage footsteps loop (synced with moving)
  public setFootstepLoop(isMoving: boolean, isRunning: boolean) {
    const { muted, effectsVolume } = useAudioStore.getState();
    const url = findAudioUrl('footstep');

    if (!url) return;

    if (!this.footstepAudio) {
      try {
        this.footstepAudio = new Audio(url);
        this.footstepAudio.loop = true;
      } catch {
        return;
      }
    }

    if (isMoving && !muted && effectsVolume > 0 && this.hasInteracted) {
      this.footstepAudio.volume = effectsVolume * 0.55;
      this.footstepAudio.playbackRate = isRunning ? 1.45 : 1.0;
      if (this.footstepAudio.paused) {
        this.footstepAudio.play().catch(() => {});
      }
    } else {
      this.footstepAudio.pause();
    }
  }

  private applyVolumes() {
    const { muted, musicEnabled, musicVolume, effectsVolume } = useAudioStore.getState();
    if (this.musicAudio) {
      if (muted || !musicEnabled) {
        this.musicAudio.pause();
      } else {
        this.musicAudio.volume = musicVolume;
        if (this.musicAudio.paused && this.hasInteracted) {
          this.musicAudio.play().catch(() => {});
        }
      }
    }

    if (this.fanAudio) {
      if (muted || effectsVolume <= 0) {
        this.fanAudio.pause();
      } else {
        this.fanAudio.volume = effectsVolume * 0.45;
      }
    }

    if (this.footstepAudio) {
      if (muted || effectsVolume <= 0) {
        this.footstepAudio.pause();
      } else {
        this.footstepAudio.volume = effectsVolume * 0.55;
      }
    }
  }
}

export const AudioManager = new AudioManagerClass();
