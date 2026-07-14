import { BaseProvider } from './base-provider';

export class VidCoreProvider extends BaseProvider {
  name = 'VidCore';
  baseUrl = 'https://vidcore.org';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
