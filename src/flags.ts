export type FeatureKey = 'newFeature' | 'smiley' | 'heart' | 'greenSmiley' | 'toggleButton';

const VERSION = import.meta.env.VITE_APP_VERSION ?? 'dev';
const STORAGE_KEY_PREFIX = `feature:${VERSION}:`;
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

export function resetOverridesForCurrentVersion(): void {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (!k) continue
    if (k.startsWith(STORAGE_KEY_PREFIX)) keys.push(k)
  }
  keys.forEach((k) => localStorage.removeItem(k))
}

