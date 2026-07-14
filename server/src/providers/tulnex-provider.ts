import { BaseDecryptorProvider } from './base-decryptor';
import { decryptPayload } from './tulnex/decrypt';
import { extractM3u8 } from '../utils/parser';

export class TulnexProvider extends BaseDecryptorProvider {
  name = 'Tulnex';
  baseUrl = 'https://api.tulnex.com';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/onion/movie/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/onion/tv/${id}/${season}/${episode}`;
  }

  protected async decryptContent(html: string): Promise<string | null> {
    try {
      const data = JSON.parse(html);
      if (data.payload) {
        const decrypted = decryptPayload(data.payload);
        if (decrypted) {
          return extractM3u8(decrypted);
        }
      }
      return null;
    } catch {
      return null;
    }
  }
}
