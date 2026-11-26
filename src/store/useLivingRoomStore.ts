import { create } from 'zustand';

export type TimeMode = 'auto' | 'day' | 'evening' | 'night';

interface LivingRoomState {
  lampOn: boolean;
  fanOn: boolean;
  fanSpeed: number; // 0 to 1, animated
  acOn: boolean;
  acTemp: number; // target temperature in °C
  roomTemp: number; // dynamic room temperature in °C
  coffeeLevel: number; // 0 to 1
  isDrinking: boolean;
  isRefilling: boolean;
  timeMode: TimeMode;
  timeOfDay: number; // 0 = night, 0.5 = evening, 1 = day (or continuous smoothed value)

  toggleLamp: () => void;
  setLampOn: (on: boolean) => void;
  toggleFan: () => void;
  setFanSpeed: (speed: number) => void;
  toggleAc: () => void;
  setAcOn: (on: boolean) => void;
  setAcTemp: (temp: number) => void;
  setRoomTemp: (temp: number) => void;
  drinkCoffee: () => void;
  setCoffeeLevel: (level: number) => void;
  setTimeMode: (mode: TimeMode) => void;
  setTimeOfDay: (val: number) => void;
}

export const useLivingRoomStore = create<LivingRoomState>((set, get) => ({
  lampOn: true,
  fanOn: true,
  fanSpeed: 1,
  acOn: true,
  acTemp: 22,
  roomTemp: 22.4,
  coffeeLevel: 1,
  isDrinking: false,
  isRefilling: false,
  timeMode: 'auto',
  timeOfDay: 0, // default, will be set on init

  toggleLamp: () => set((state) => ({ lampOn: !state.lampOn })),
  setLampOn: (on) => set({ lampOn: on }),

  toggleFan: () => set((state) => ({ fanOn: !state.fanOn })),
  setFanSpeed: (speed) => set({ fanSpeed: Math.max(0, Math.min(1, speed)) }),

  toggleAc: () => set((state) => ({ acOn: !state.acOn })),
  setAcOn: (on) => set({ acOn: on }),
  setAcTemp: (temp) => set({ acTemp: Math.max(16, Math.min(30, temp)) }),
  setRoomTemp: (temp) => set({ roomTemp: Number(temp.toFixed(1)) }),

  drinkCoffee: () => {
    const { isDrinking, isRefilling, coffeeLevel } = get();
    if (isDrinking || isRefilling) return;

    // Start drinking action
    set({ isDrinking: true });

    setTimeout(() => {
      const nextLevel = Math.max(0, Number((coffeeLevel - 0.25).toFixed(2)));
      set({ coffeeLevel: nextLevel, isDrinking: false });

      // If empty, trigger refill after brief pause
      if (nextLevel <= 0) {
        set({ isRefilling: true });
        setTimeout(() => {
          set({ coffeeLevel: 1, isRefilling: false });
        }, 1800);
      }
    }, 2000);
  },

  setCoffeeLevel: (level) => set({ coffeeLevel: Math.max(0, Math.min(1, level)) }),
  setTimeMode: (mode) => set({ timeMode: mode }),
  setTimeOfDay: (val) => set({ timeOfDay: val }),
}));
