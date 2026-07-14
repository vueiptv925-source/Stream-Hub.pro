import { BaseProvider } from './base-provider';

export class VidsrcMeProvider extends BaseProvider {
  name = 'VidSrc.me';
  baseUrl = 'https://vidsrc.me';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
