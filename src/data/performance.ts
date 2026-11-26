export interface PerformanceConfig {
  lowFpsThreshold: number; // FPS below which we consider performance degraded
  recoveryFpsThreshold: number; // FPS above which we consider performance recovered
  sustainedDurationMs: number; // duration low FPS must persist before stepping down
  recoveryDurationMs: number; // duration high FPS must persist before stepping up
  maxDrawCallsWarning: number;
}

export const PERFORMANCE_CONFIG: PerformanceConfig = {
  lowFpsThreshold: 28,
  recoveryFpsThreshold: 55,
  sustainedDurationMs: 4000,
  recoveryDurationMs: 7000,
  maxDrawCallsWarning: 150,
};

/**
 * Detects initial capability. Starts at 'medium' per performance architecture rules.
 */
export function detectInitialQuality(): 'low' | 'medium' | 'high' {
  return 'medium';
}
