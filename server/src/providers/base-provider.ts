import { Provider, ProviderResult } from '../types';
import { fetchWithRetry } from '../utils/fetcher';
import { extractSubtitles, followIframeToM3u8 } from '../utils/parser';

export abstract class BaseProvider implements Provider {
  abstract name: string;
  abstract baseUrl: string;

  async getMovie(id: string): Promise<ProviderResult> {
    return this.fetchAndExtract(this.buildMovieUrl(id));
  }

  async getTV(id: string, season: number, episode: number): Promise<ProviderResult> {
    return this.fetchAndExtract(this.buildTVUrl(id, season, episode));
  }

  protected abstract buildMovieUrl(id: string): string;
  protected abstract buildTVUrl(id: string, season: number, episode: number): string;

  private async fetchAndExtract(url: string): Promise<ProviderResult> {
    try {
      console.log(`🔍 بدء الاستخراج من: ${url}`);

      // Fetch the page first to extract subtitles from it
      const html = await fetchWithRetry(url);

      // Follow iframe chain to find m3u8 - pass the original URL as base for resolution
      const m3u8 = await followIframeToM3u8(url, 4);

      // Extract subtitles from the page
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
        error: 'لم يتم العثور على رابط m3u8 بعد تتبع جميع iframes',
        subtitles: subtitles
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
