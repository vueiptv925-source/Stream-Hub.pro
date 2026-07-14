import { BaseProvider } from './base-provider';

export class VidlinkProProvider extends BaseProvider {
  name = 'VidLink.pro';
  baseUrl = 'https://vidlink.pro';

  protected buildMovieUrl(id: string): string {
    return `${this.baseUrl}/embed/${id}`;
  }

  protected buildTVUrl(id: string, season: number, episode: number): string {
    return `${this.baseUrl}/embed/${id}/${season}/${episode}`;
  }
}
