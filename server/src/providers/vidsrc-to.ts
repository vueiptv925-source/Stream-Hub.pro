import { BaseProvider } from './base-provider';

export class VidsrcToProvider extends BaseProvider {
  name = 'VidSrc.to';
  baseUrl = 'https://vidsrc.to';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/movie/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/tv/${id}/${season}/${episode}`;
  }
}
