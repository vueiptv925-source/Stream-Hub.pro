import { Provider, ProviderResult } from '../types';
import { fetchWithRetry } from '../utils/fetcher';
import { extractM3u8, extractSubtitles } from '../utils/parser';

export abstract class BaseDecryptorProvider implements Provider {
  abstract name: string;
  abstract baseUrl: string;

  async getMovie(id: string): Promise<ProviderResult> {
    return this.fetchAndDecrypt(this.buildMovieUrl(id));
  }

  async getTV(id: string, season: number, episode: number): Promise<ProviderResult> {
    return this.fetchAndDecrypt(this.buildTVUrl(id, season, episode));
  }

  protected abstract buildMovieUrl(id: string): string;
  protected abstract buildTVUrl(id: string, season: number, episode: number): string;

  // دالة فك التشفير الأساسية (يتم توريثها)
  protected abstract decryptContent(html: string): Promise<string | null>;

  private async fetchAndDecrypt(url: string): Promise<ProviderResult> {
    try {
      const html = await fetchWithRetry(url);
      const m3u8 = await this.decryptContent(html);
      const subtitles = extractSubtitles(html);

      if (m3u8) {
        return {
          success: true,
          source: this.name,
          url: m3u8,
          subtitles: subtitles
        };
      }

      return {
        success: false,
        source: this.name,
        error: 'لم يتم العثور على رابط m3u8'
      };
    } catch (error) {
      return {
        success: false,
        source: this.name,
        error: error instanceof Error ? error.message : 'خطأ غير معروف'
      };
    }
  }
}
