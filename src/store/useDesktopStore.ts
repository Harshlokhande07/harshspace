import { create } from 'zustand';

export type DesktopAppId = 'projects' | 'about' | 'games' | 'terminal' | 'settings';

interface DesktopState {
  openApp: DesktopAppId | null;
  selectedProjectId: string | null;
  openAppWindow: (app: DesktopAppId) => void;
  closeAppWindow: () => void;
  selectProject: (id: string | null) => void;
  resetDesktop: () => void;
}

export const useDesktopStore = create<DesktopState>((set) => ({
  openApp: 'projects', // Opens Projects app by default on desktop boot
  selectedProjectId: null,

  openAppWindow: (app) => set({ openApp: app }),
  closeAppWindow: () => set({ openApp: null, selectedProjectId: null }),
  selectProject: (id) => set({ selectedProjectId: id }),
  resetDesktop: () => set({ openApp: 'projects', selectedProjectId: null }),
}));
