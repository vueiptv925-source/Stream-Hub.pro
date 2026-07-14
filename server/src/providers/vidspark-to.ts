import { BaseProvider } from './base-provider';

export class VidsparkToProvider extends BaseProvider {
  name = 'VidSpark.to';
  baseUrl = 'https://vidspark.to';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
