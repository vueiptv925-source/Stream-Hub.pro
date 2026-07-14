import { BaseProvider } from './base-provider';

export class VidsrcPmProvider extends BaseProvider {
  name = 'VidSrc.pm';
  baseUrl = 'https://vidsrc.pm';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
