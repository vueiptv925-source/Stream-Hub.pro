import CryptoJS from 'crypto-js';

export function decryptPayload(payload: string): string | null {
  try {
    // محاولة فك التشفير باستخدام مفتاح ثابت (مثال)
    const key = 'cinepro-secret-key';
    const bytes = CryptoJS.AES.decrypt(payload, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    // إذا فشل، حاول Base64
    try {
      return Buffer.from(payload, 'base64').toString('utf-8');
    } catch {
      return null;
    }
  }
}
