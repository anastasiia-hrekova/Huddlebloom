// Fetch only known store endpoints. Never fetch arbitrary user-supplied hosts or redirects.
export class ImportError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
export function parseStoreUrl(input) {
  if (typeof input !== 'string' || input.length > 2048) throw new ImportError('Встав посилання на App Store або Google Play.');
  let url;
  try { url = new URL(input.trim()); } catch { throw new ImportError('Некоректне посилання.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) throw new ImportError('Використай звичайне HTTPS-посилання на магазин.');
  if (url.hostname === 'apps.apple.com') {
    const match = url.pathname.match(/^\/(?:([a-z]{2})\/)?app\/(?:[^/]+\/)?id(\d+)\/?$/i);
    if (!match) throw new ImportError('У посиланні App Store не знайдено ID застосунку.');
    const country = (match[1] || 'ua').toLowerCase();
    return {store:'app-store', id:match[2], country, sourceUrl:`https://apps.apple.com/${country}/app/id${match[2]}`, fetchUrl:`https://itunes.apple.com/lookup?id=${match[2]}&country=${country}&entity=software`};
  }
  if (url.hostname === 'play.google.com' && /^\/store\/apps\/details(?:\/[^/]+)?\/?$/.test(url.pathname)) {
    const id = url.searchParams.get('id');
    if (!id || !/^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)+$/.test(id) || id.length > 255) throw new ImportError('У посиланні Google Play не знайдено коректний ID застосунку.');
    return {store:'google-play', id, country:'ua', sourceUrl:`https://play.google.com/store/apps/details?id=${id}`, fetchUrl:`https://play.google.com/store/apps/details?id=${id}&hl=uk&gl=UA`};
  }
  throw new ImportError('Поки підтримуємо App Store і Google Play. Інші продукти можна додати вручну.');
}
const text = (value, max = 20000) => typeof value === 'string' ? value.slice(0,max).trim() : '';
const number = value => value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : null;
const link = value => { try { const u = new URL(typeof value === 'string' ? value : value?.url); return u.protocol === 'https:' && !u.username && !u.password ? u.href : ''; } catch { return ''; } };
const strings = values => Array.isArray(values) ? values.filter(v=>typeof v==='string').map(v=>text(v,100)).slice(0,100) : [];
const images = values => Array.isArray(values) ? [...new Set(values.map(link).filter(Boolean))].slice(0,20) : [];
export function normalizeApple(payload, source) {
  const app = payload.results?.find(a => String(a.trackId) === source.id && ['software','mac-software'].includes(a.kind));
  if (!app?.trackName) throw new ImportError('Застосунок не знайдено в цьому регіоні App Store.',404);
  return {store:source.store, storeId:source.id, sourceUrl:source.sourceUrl, name:text(app.trackName,100), description:text(app.description), developer:text(app.sellerName || app.artistName,200), website:link(app.sellerUrl), iconUrl:link(app.artworkUrl512 || app.artworkUrl100), screenshots:images([...(app.screenshotUrls || []),...(app.ipadScreenshotUrls || [])]), categories:strings(app.genres), rating:number(app.averageUserRating), ratingCount:number(app.userRatingCount), price:number(app.price), currency:text(app.currency,10), version:text(app.version,100), updatedAt:text(app.currentVersionReleaseDate,100), releaseDate:text(app.releaseDate,100), ageRating:text(app.contentAdvisoryRating,100), languages:strings(app.languageCodesISO2A), platforms:strings(app.supportedDevices), minimumOsVersion:text(app.minimumOsVersion,100), releaseNotes:text(app.releaseNotes), bundleId:text(app.bundleId,255), fileSizeBytes:number(app.fileSizeBytes), developerUrl:link(app.artistViewUrl), importedAt:new Date().toISOString()};
}
export function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (all, entity) => {
    const known = {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
    if (!entity.startsWith('#')) return known[entity.toLowerCase()] || all;
    const code = parseInt(entity.slice(entity[1].toLowerCase()==='x'?2:1),entity[1].toLowerCase()==='x'?16:10);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '';
  });
}
const plain = html => text(decodeHtml(html.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/p>/gi,'\n').replace(/<[^>]+>/g,'')));
function attr(tag,name) { return decodeHtml(tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`,'i'))?.[1] || ''); }
export function normalizeGoogle(html, source) {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].filter(m=>/type\s*=\s*["']application\/ld\+json["']/i.test(m[0].slice(0,m[0].indexOf('>'))));
  const nodes = scripts.flatMap(m=>{try {const data=JSON.parse(m[1]);return Array.isArray(data)?data:(data['@graph'] || [data]);}catch{return [];}});
  const app = nodes.find(a=>[].concat(a['@type'] || []).includes('SoftwareApplication'));
  if (!app?.name) throw new ImportError('Google Play не віддав дані продукту. Перевір посилання або заповни профіль вручну.',502);
  const description = html.match(/<div\b[^>]*data-g-id\s*=\s*["']description["'][^>]*>([\s\S]*?)<\/div>/i)?.[1];
  const offer = Array.isArray(app.offers)?app.offers[0]:app.offers;
  const screenshots = [...html.matchAll(/<img\b[^>]*>/gi)].filter(m=>/data-screenshot-index\s*=/.test(m[0])).map(m=>attr(m[0],'src'));
  return {store:source.store, storeId:source.id, sourceUrl:source.sourceUrl, name:text(app.name,100), description:description?plain(description):text(app.description), developer:text(app.author?.name,200), website:link(app.author?.url), iconUrl:link(app.image), screenshots:images(screenshots.length?screenshots:[].concat(app.screenshot || [])), categories:strings([].concat(app.applicationCategory || [])), rating:number(app.aggregateRating?.ratingValue), ratingCount:number(app.aggregateRating?.ratingCount), price:number(offer?.price), currency:text(offer?.priceCurrency,10), version:text(app.softwareVersion,100), updatedAt:text(app.dateModified,100), ageRating:text(app.contentRating,100), languages:strings([].concat(app.inLanguage || [])), platforms:strings([].concat(app.operatingSystem || [])), importedAt:new Date().toISOString()};
}
async function readLimited(response) {
  const reader = response.body.getReader(); const chunks=[]; let size=0;
  try { for (;;) { const {value,done}=await reader.read(); if(done) break; size+=value.byteLength; if(size>4*1024*1024){await reader.cancel();throw new ImportError('Магазин віддав надто велику відповідь.',502);} chunks.push(value); } } finally {reader.releaseLock();}
  const bytes=new Uint8Array(size); let offset=0; for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;} return new TextDecoder().decode(bytes);
}
const runtimeFetch = (...args) => globalThis.fetch(...args);
export async function importStore(input, fetcher = runtimeFetch) {
  const source = parseStoreUrl(input);
  const controller = new AbortController(); const timer=setTimeout(()=>controller.abort(),12000);
  try {
    const response = await fetcher(source.fetchUrl,{redirect:'manual',signal:controller.signal,headers:{Accept:source.store==='app-store'?'application/json':'text/html','User-Agent':'Huddlebloom/1.0'}});
    if (response.status >= 300 && response.status < 400) throw new ImportError('Магазин перенаправив запит. Використай пряме посилання на сторінку продукту.',502);
    if (!response.ok) throw new ImportError(response.status===404?'Продукт не знайдено. Перевір посилання.':'Магазин тимчасово недоступний. Спробуй пізніше.',response.status===404?404:502);
    const body = await readLimited(response);
    return source.store==='app-store'?normalizeApple(JSON.parse(body),source):normalizeGoogle(body,source);
  } catch(error) {
    if(error instanceof ImportError) throw error;
    throw new ImportError(controller.signal.aborted?'Магазин не відповів вчасно. Спробуй ще раз.':'Не вдалося отримати дані магазину. Можна заповнити профіль вручну.',502);
  } finally {clearTimeout(timer);}
}
export async function handleStoreImport(request, fetcher = runtimeFetch) {
  const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
  if(request.method!=='GET') return new Response(JSON.stringify({error:'Метод не підтримується.'}),{status:405,headers:{...headers,Allow:'GET'}});
  try { const product = await importStore(new URL(request.url).searchParams.get('url'),fetcher);return new Response(JSON.stringify({product}),{headers}); }
  catch(error){return new Response(JSON.stringify({error:error.message}),{status:error.status || 500,headers});}
}
