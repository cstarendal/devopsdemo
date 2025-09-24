export type FeatureKey = 'newFeature' | 'smiley' | 'heart';

const STORAGE_KEY_PREFIX = 'feature:';
let envOverride: string | null = null;

function getEnvName(): string {
  return envOverride ?? (import.meta.env.VITE_ENV_NAME ?? 'Local');
}

export function readFeatureFlag(feature: FeatureKey): boolean {
  const env = getEnvLabel();
  if (env === 'Staging') return true; // always ON in staging
  if (env === 'Production') {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + feature);
    if (raw === null) return false; // default OFF in production
    return raw === 'true';
  }
  // Local/dev: default OFF for predictability
  const raw = localStorage.getItem(STORAGE_KEY_PREFIX + feature);
  if (raw === null) return false;
  return raw === 'true';
}

export function writeFeatureFlag(feature: FeatureKey, value: boolean): void {
  localStorage.setItem(STORAGE_KEY_PREFIX + feature, String(value));
}

export function getEnvLabel(): string {
  return getEnvName();
}

// Test helpers
export function __setEnvOverride(name: string | null) {
  envOverride = name;
}

