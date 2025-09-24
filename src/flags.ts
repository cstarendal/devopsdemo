export type FeatureKey = 'newFeature' | 'smiley';

const STORAGE_KEY_PREFIX = 'feature:';

function getEnvName(): string {
  return import.meta.env.VITE_ENV_NAME ?? 'Local';
}

export function readFeatureFlag(feature: FeatureKey): boolean {
  const env = getEnvName();
  if (env === 'Staging') return true; // always ON in staging
  if (env === 'Production') {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + feature);
    if (raw === null) return false; // default OFF in production
    return raw === 'true';
  }
  // Local/dev: default ON for convenience
  const raw = localStorage.getItem(STORAGE_KEY_PREFIX + feature);
  if (raw === null) return true;
  return raw === 'true';
}

export function writeFeatureFlag(feature: FeatureKey, value: boolean): void {
  localStorage.setItem(STORAGE_KEY_PREFIX + feature, String(value));
}

export function getEnvLabel(): string {
  return getEnvName();
}

