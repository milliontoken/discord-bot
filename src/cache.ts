import * as NodeCache from 'node-cache';

class Cache {
  cache: NodeCache;
  constructor() {
    const cacheOptions: NodeCache.Options = {
      stdTTL: 10, // keys live for 10 seconds
      useClones: true,
    };

    this.cache = new NodeCache(cacheOptions);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: unknown, ttl?: string | number) {
    return this.cache.set(key, value, ttl);
  }

  has(key: string) {
    return this.cache.has(key);
  }
}

export const cache = new Cache();
