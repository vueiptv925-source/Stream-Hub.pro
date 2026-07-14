import CryptoJS from 'crypto-js';

export function encryptItemId(itemId: string): string {
  return CryptoJS.AES.encrypt(itemId, 'vidrock-secret').toString();
}

export function decryptItemId(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, 'vidrock-secret');
  return bytes.toString(CryptoJS.enc.Utf8);
}
