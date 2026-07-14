import { BaseDecryptorProvider } from './base-decryptor';
import { decryptResponse } from './videasy/decryptor';

export class VideasyProvider extends BaseDecryptorProvider {
  name = 'Videasy';
  baseUrl = 'https://api.videasy.net';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/cuevana/sources-with-title?tmdbId=${id}&mediaType=movie`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/cuevana/sources-with-title?tmdbId=${id}&mediaType=tv&seasonId=${season}&episodeId=${episode}`;
  }

  protected async decryptContent(html: string): Promise<string | null> {
    try {
      const data = JSON.parse(html);
      if (data.encrypted) {
        const decrypted = await decryptResponse(data.encrypted, data.tmdbId || '');
        if (decrypted.sources && decrypted.sources.length > 0) {
          return decrypted.sources[0].url;
        }
      }
      return null;
    } catch {
      return null;
    }
  }
}
