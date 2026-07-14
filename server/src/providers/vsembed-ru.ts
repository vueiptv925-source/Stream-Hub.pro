import { BaseProvider } from './base-provider';

export class VsembedRuProvider extends BaseProvider {
  name = 'VsEmbed.ru';
  baseUrl = 'https://vsembed.ru';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
