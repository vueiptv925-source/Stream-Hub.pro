import { BaseProvider } from './base-provider';

export class AutoembedCoProvider extends BaseProvider {
  name = 'AutoEmbed.co';
  baseUrl = 'https://autoembed.co';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
