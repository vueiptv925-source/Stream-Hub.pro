import { Provider, ProviderResult } from '../types';
import { VidsrcToProvider } from './vidsrc-to';
import { VidsrcMeProvider } from './vidsrc-me';
import { VidsrcPmProvider } from './vidsrc-pm';
import { VidsrcTopProvider } from './vidsrc-top';
import { VidlinkProProvider } from './vidlink-pro';
import { VsembedRuProvider } from './vsembed-ru';
import { AutoembedCoProvider } from './autoembed-co';
import { MoviesApiProvider } from './movies-api';
import { OneOneOneMoviesProvider } from './one-one-one-movies';
import { VidCoreProvider } from './vid-core';
import { VidsparkToProvider } from './vidspark-to';
import { VidsrcInProvider } from './vidsrc-in';
import { TulnexProvider } from './tulnex-provider';
import { VidZeeProvider } from './vidzee-provider';
import { VideasyProvider } from './videasy-provider';
import { cache } from '../utils/cache';

// ============================================================
// مزود CinePro (يعمل دائمًا)
// ============================================================
class CineProProvider implements Provider {
  name = 'CinePro';
  baseUrl = 'https://core-pro-e7cy.onrender.com';

  async getMovie(id: string): Promise<ProviderResult> {
    try {
      const url = `${this.baseUrl}/v1/movies/${id}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 ثوانٍ مهلة

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      const data = (await response.json()) as any;

      if (data.sources && data.sources.length > 0) {
        const source = data.sources[0];
        const proxyMatch = source.url.match(/data%3D%7B%22url%22%3A%22([^%]+)/);
        const m3u8 = proxyMatch ? decodeURIComponent(proxyMatch[1]) : source.url;
        return {
          success: true,
          source: `CinePro (${source.provider?.name || 'unknown'})`,
          url: m3u8,
          subtitles: data.subtitles || []
        };
      }
      return { success: false, source: this.name, error: 'لم يتم العثور على مصادر' };
    } catch (error) {
      return { success: false, source: this.name, error: error instanceof Error ? error.message : 'خطأ' };
    }
  }

  async getTV(id: string, season: number, episode: number): Promise<ProviderResult> {
    try {
      const url = `${this.baseUrl}/v1/tv/${id}/seasons/${season}/episodes/${episode}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      const data = (await response.json()) as any;

      if (data.sources && data.sources.length > 0) {
        const source = data.sources[0];
        const proxyMatch = source.url.match(/data%3D%7B%22url%22%3A%22([^%]+)/);
        const m3u8 = proxyMatch ? decodeURIComponent(proxyMatch[1]) : source.url;
        return {
          success: true,
          source: `CinePro (${source.provider?.name || 'unknown'})`,
          url: m3u8,
          subtitles: data.subtitles || []
        };
      }
      return { success: false, source: this.name, error: 'لم يتم العثور على مصادر' };
    } catch (error) {
      return { success: false, source: this.name, error: error instanceof Error ? error.message : 'خطأ' };
    }
  }
}

// ============================================================
// مدير المزودات مع تحسين الأداء
// ============================================================
export class ProviderManager {
  private providers: Provider[] = [];

  constructor() {
    this.providers = [
      new TulnexProvider(),
      new VidZeeProvider(),
      new VideasyProvider(),
      new VidsrcToProvider(),
      new VidsrcMeProvider(),
      new VidsrcPmProvider(),
      new VidsrcTopProvider(),
      new VidlinkProProvider(),
      new VsembedRuProvider(),
      new AutoembedCoProvider(),
      new MoviesApiProvider(),
      new OneOneOneMoviesProvider(),
      new VidCoreProvider(),
      new VidsparkToProvider(),
      new VidsrcInProvider()
    ];
  }

  async getMovieSources(id: string) {
    const cacheKey = `movie:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      console.log(`✅ استخدام النتيجة المخزنة مؤقتًا لـ ${id}`);
      return cached;
    }

    // 1. محاولة CinePro أولاً (سريع)
    console.log(`🔄 محاولة CinePro...`);
    const cinepro = new CineProProvider();
    const cineproResult = await cinepro.getMovie(id);
    if (cineproResult.success) {
      console.log(`✅ نجح CinePro`);
      cache.set(cacheKey, cineproResult);
      return cineproResult;
    }

    // 2. إذا فشل CinePro، جرب المصادر الخاصة مع مهلة زمنية
    console.log(`🔄 محاولة المصادر الخاصة (مع مهلة 8 ثوانٍ)...`);
    
    const promises = this.providers.map(provider => 
      this.timeoutPromise(provider.getMovie(id), 8000, provider.name)
    );

    try {
      const result = await Promise.race(promises);
      if (result.success) {
        console.log(`✅ نجح ${result.source}`);
        cache.set(cacheKey, result);
        return result;
      }
    } catch (error) {
      console.log(`⚠️ جميع المصادر فشلت أو تجاوزت المهلة`);
    }

    return {
      success: false,
      source: 'all',
      error: 'جميع المصادر فشلت أو تجاوزت المهلة الزمنية'
    };
  }

  async getTVSources(id: string, season: number, episode: number) {
    const cacheKey = `tv:${id}:${season}:${episode}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      console.log(`✅ استخدام النتيجة المخزنة مؤقتًا لـ ${id}`);
      return cached;
    }

    console.log(`🔄 محاولة CinePro...`);
    const cinepro = new CineProProvider();
    const cineproResult = await cinepro.getTV(id, season, episode);
    if (cineproResult.success) {
      console.log(`✅ نجح CinePro`);
      cache.set(cacheKey, cineproResult);
      return cineproResult;
    }

    console.log(`🔄 محاولة المصادر الخاصة (مع مهلة 8 ثوانٍ)...`);
    
    const promises = this.providers.map(provider => 
      this.timeoutPromise(provider.getTV(id, season, episode), 8000, provider.name)
    );

    try {
      const result = await Promise.race(promises);
      if (result.success) {
        console.log(`✅ نجح ${result.source}`);
        cache.set(cacheKey, result);
        return result;
      }
    } catch (error) {
      console.log(`⚠️ جميع المصادر فشلت أو تجاوزت المهلة`);
    }

    return {
      success: false,
      source: 'all',
      error: 'جميع المصادر فشلت أو تجاوزت المهلة الزمنية'
    };
  }

  // ============================================================
  // دالة مساعدة لإضافة مهلة زمنية للـ Promises
  // ============================================================
  private timeoutPromise<T>(promise: Promise<T>, ms: number, name: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`⏳ ${name}: تجاوز المهلة (${ms}ms)`));
      }, ms);

      promise
        .then(result => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }
}
