import process from 'process';

interface CacheEntry {
  data: any;
  timestamp: number;
}

class Cache {
  private store: Map<string, CacheEntry> = new Map();
  private ttl: number;

  constructor(ttlSeconds: number = 3600) {
    this.ttl = ttlSeconds * 1000;
  }

  get(key: string): any | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.ttl) {
      this.store.delete(key);
      return null;
    }
    return entry.data;
  }

  set(key: string, data: any): void {
    this.store.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.store.clear();
  }
}

export const cache = new Cache(parseInt(process.env.CACHE_TTL || '3600'));
