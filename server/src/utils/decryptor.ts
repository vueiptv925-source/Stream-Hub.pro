import CryptoJS from 'crypto-js';

export function decryptPayload(encrypted: string, key: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return encrypted;
  }
}

export function decryptBase64(encoded: string): string {
  try {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  } catch {
    return encoded;
  }
}
