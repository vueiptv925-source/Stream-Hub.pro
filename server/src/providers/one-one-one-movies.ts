import { BaseProvider } from './base-provider';

export class OneOneOneMoviesProvider extends BaseProvider {
  name = '111Movies';
  baseUrl = 'https://111movies.net';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
