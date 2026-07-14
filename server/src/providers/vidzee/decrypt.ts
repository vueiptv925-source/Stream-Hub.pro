import CryptoJS from 'crypto-js';

export function deriveKey(tmdbId: string): string {
  return CryptoJS.SHA256(tmdbId + 'vidzee-salt').toString();
}

export function decrypt(encrypted: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
