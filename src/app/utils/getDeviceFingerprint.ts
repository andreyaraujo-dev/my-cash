import { localStorageKeys } from '@/app/config/localStorageKeys.ts';

function createFingerprint() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const values = new Uint32Array(4);
    crypto.getRandomValues(values);
    return Array.from(values)
      .map((value) => value.toString(16))
      .join('-');
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getDeviceFingerprint() {
  const existingFingerprint = localStorage.getItem(localStorageKeys.DEVICE_FINGERPRINT);
  if (existingFingerprint) {
    return existingFingerprint;
  }

  const fingerprint = createFingerprint();
  localStorage.setItem(localStorageKeys.DEVICE_FINGERPRINT, fingerprint);
  return fingerprint;
}
