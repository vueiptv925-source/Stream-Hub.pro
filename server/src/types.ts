export interface ProviderResult {
  success: boolean;
  source: string;
  url?: string;
  subtitles?: Subtitle[];
  error?: string;
}

export interface Subtitle {
  lang: string;
  url: string;
}

export interface MediaRequest {
  id: string;
  type: 'movie' | 'tv';
  season?: number;
  episode?: number;
}

export interface Provider {
  name: string;
  getMovie(id: string): Promise<ProviderResult>;
  getTV(id: string, season: number, episode: number): Promise<ProviderResult>;
}
