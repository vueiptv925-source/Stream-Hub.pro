import { BaseDecryptorProvider } from './base-decryptor';
import { deriveKey, decrypt } from './vidzee/decrypt';
import { extractM3u8 } from '../utils/parser';

export class VidZeeProvider extends BaseDecryptorProvider {
  name = 'VidZee';
  baseUrl = 'https://core.vidzee.wtf';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/movie/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/tv/${id}/${season}/${episode}`;
  }

  protected async decryptContent(html: string): Promise<string | null> {
    try {
      console.log('📦 VidZee Raw Response:', html.substring(0, 200) + '...'); // طباعة أول 200 حرف

      // محاولة تحليل JSON
      let data;
      try {
        data = JSON.parse(html);
      } catch (e) {
        // إذا لم يكن JSON، حاول استخراج m3u8 مباشرة من النص
        const directM3u8 = extractM3u8(html);
        if (directM3u8) {
          console.log('✅ VidZee: m3u8 مباشر من النص الخام');
          return directM3u8;
        }
        console.log('⚠️ VidZee: الرد ليس JSON، وليس به m3u8 مباشر');
        return null;
      }

      console.log('📋 VidZee Data Keys:', Object.keys(data));

      // البحث عن m3u8 في جميع المستويات
      const m3u8 = this.deepSearchM3u8(data);
      if (m3u8) {
        console.log('✅ VidZee: تم العثور على m3u8');
        return m3u8;
      }

      // محاولة فك التشفير
      const encryptedFields = ['encrypted', 'data', 'payload', 'response'];
      for (const field of encryptedFields) {
        if (data[field] && typeof data[field] === 'string') {
          console.log(`🔐 VidZee: محاولة فك تشفير الحقل "${field}"`);
          const key = deriveKey(data.tmdbId || data.id || data.movieId || '');
          const decrypted = decrypt(data[field], key);
          const decryptedM3u8 = extractM3u8(decrypted);
          if (decryptedM3u8) {
            console.log('✅ VidZee: تم فك التشفير واستخراج m3u8');
            return decryptedM3u8;
          }
        }
      }

      console.log('❌ VidZee: لم يتم العثور على m3u8');
      return null;
    } catch (error) {
      console.error('❌ VidZee decrypt error:', error);
      return null;
    }
  }

  // بحث عميق في الكائن عن أي رابط m3u8
  private deepSearchM3u8(obj: any): string | null {
    if (!obj || typeof obj !== 'object') return null;

    // إذا كان مصفوفة
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = this.deepSearchM3u8(item);
        if (result) return result;
      }
      return null;
    }

    // فحص الحقول المعروفة
    const knownFields = ['url', 'link', 'stream', 'file', 'source', 'src', 'playlist', 'm3u8', 'hls'];
    for (const field of knownFields) {
      if (obj[field] && typeof obj[field] === 'string' && obj[field].includes('.m3u8')) {
        return obj[field];
      }
    }

    // فحص جميع القيم
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'string' && value.includes('.m3u8')) {
        return value;
      }
      if (typeof value === 'object' && value !== null) {
        const result = this.deepSearchM3u8(value);
        if (result) return result;
      }
    }

    return null;
  }
}
