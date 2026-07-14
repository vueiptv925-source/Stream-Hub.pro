import { BaseProvider } from './base-provider';

export class MoviesApiProvider extends BaseProvider {
  name = 'MoviesAPI';
  baseUrl = 'https://moviesapi.to';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/api/movie/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/api/tv/${id}/${season}/${episode}`;
  }
}
