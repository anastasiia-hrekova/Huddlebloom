import assetsWorker from './index.js';
import {handleStoreImport, parseStoreUrl} from '../server/store-import.js';
export default {
  async fetch(request, env, ctx) {
    if(new URL(request.url).pathname !== '/api/store-import') return assetsWorker.fetch(request,env);
    if(request.method !== 'GET') return handleStoreImport(request);
    // Canonical cache keys ignore tracking parameters, so repeated imports reuse metadata.
    try {
      const source = parseStoreUrl(new URL(request.url).searchParams.get('url'));
      const key = new Request(`https://huddlebloom-cache.invalid/${source.store}/${source.country}/${source.id}`);
      const cache = globalThis.caches?.default;
      const cached = cache && await cache.match(key);
      if(cached) return cached;
      const response = await handleStoreImport(request);
      if(response.ok && cache){const copy = new Response(response.clone().body,response);copy.headers.set('Cache-Control','public, max-age=3600');ctx.waitUntil(cache.put(key,copy));}
      return response;
    } catch {return handleStoreImport(request);}
  }
};
