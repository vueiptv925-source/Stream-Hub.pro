import CryptoJS from 'crypto-js';

export async function decryptResponse(blob: string, tmdbId: string): Promise<any> {
  try {
    const key = CryptoJS.SHA256(tmdbId + 'videasy-salt').toString();
    const bytes = CryptoJS.AES.decrypt(blob, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return { sources: [], subtitles: [] };
  }
}
