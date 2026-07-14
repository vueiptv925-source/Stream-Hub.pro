import { BaseProvider } from './base-provider';

export class VidsrcInProvider extends BaseProvider {
  name = 'VidSrc.in';
  baseUrl = 'https://vidsrc.in';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
