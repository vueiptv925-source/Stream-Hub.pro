import { BaseProvider } from './base-provider';

export class VidsrcTopProvider extends BaseProvider {
  name = 'VidSrc.top';
  baseUrl = 'https://vid-src.top';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/movie/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/tv/${id}/${season}/${episode}`;
  }
}
