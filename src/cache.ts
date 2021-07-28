import * as NodeCache from 'node-cache';

const cacheOptions: NodeCache.Options = {
  stdTTL: 10, // keys live for 10 seconds
  useClones: true,
};

export const cache = new NodeCache(cacheOptions);
