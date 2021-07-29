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

  async get(key: string) {
    return await this.cache.get(key);
  }

  async set(key: string, value: unknown, ttl?: string | number) {
    return await this.cache.set(key, value, ttl);
  }

  async has(key: string) {
    return await this.cache.has(key);
  }
}

export const cache = new Cache();
