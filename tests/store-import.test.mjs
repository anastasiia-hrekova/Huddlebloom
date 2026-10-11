import assert from 'node:assert/strict';
import test from 'node:test';
import {parseStoreUrl,normalizeApple,normalizeGoogle,importStore,handleStoreImport} from '../server/store-import.js';
import worker from '../worker/app.js';

const apple = 'https://apps.apple.com/ua/app/jess/id6783284490?utm_source=test';
const play = 'https://play.google.com/store/apps/details?id=com.example.app&hl=en';
test('canonical store URLs strip untrusted parameters and keep Apple storefront',()=>{
 assert.deepEqual(parseStoreUrl(apple),{store:'app-store',id:'6783284490',country:'ua',sourceUrl:'https://apps.apple.com/ua/app/id6783284490',fetchUrl:'https://itunes.apple.com/lookup?id=6783284490&country=ua&entity=software'});
 assert.equal(parseStoreUrl('https://apps.apple.com/app/id123').country,'ua');
 assert.equal(parseStoreUrl('https://apps.apple.com/us/app/id123').country,'us');
 assert.equal(parseStoreUrl(play).fetchUrl,'https://play.google.com/store/apps/details?id=com.example.app&hl=uk&gl=UA');
});
test('blocks SSRF, credentials, ports, insecure URLs, malformed paths and app IDs',()=>{
 for(const url of [null,'','https://127.0.0.1/app/id1','https://apps.apple.com.evil.test/app/id1','https://apps.apple.com@evil.test/app/id1','https://user:pass@apps.apple.com/app/id1','https://apps.apple.com:444/app/id1','http://apps.apple.com/app/id1','https://apps.apple.com/ua/app/id1/extra','https://play.google.com/store/apps/details?id=a%26redirect%3Dhttp%3A%2F%2Flocalhost','https://play.google.com/store/apps','https://apps.apple.com/ua/app/name']) assert.throws(()=>parseStoreUrl(url));
});
test('Apple retains long descriptions and optional metadata without inventing ratings',()=>{
 const p=normalizeApple({results:[{trackId:6783284490,kind:'software',trackName:'Jess',description:'a'.repeat(1600),artworkUrl512:'https://example.test/icon.png',screenshotUrls:['https://example.test/1.png','javascript:alert(1)'],genres:['Lifestyle'],price:0,userRatingCount:0}]},parseStoreUrl(apple));
 assert.equal(p.description.length,1600);assert.equal(p.price,0);assert.equal(p.rating,null);assert.equal(p.ratingCount,0);assert.equal(p.screenshots.length,1);assert.equal(p.website,'');
 assert.throws(()=>normalizeApple({results:[{trackId:999,kind:'software',trackName:'Other'}]},parseStoreUrl(apple)));
});
test('Play reads full description, screens and JSON-LD with quote/order variations',()=>{
 const html=`<script type='application/ld+json'>${JSON.stringify({'@graph':[{'@type':'SoftwareApplication',name:'A < B',description:'Short',image:'javascript:bad',author:{name:'Creator',url:'https://example.test'},offers:[{price:'0',priceCurrency:'UAH'}],aggregateRating:{ratingValue:'4.7',ratingCount:'123'}}]})}</script><div inert data-g-id='description'>Full<br>description &amp; more &#x1F43E;</div><img data-screenshot-index="0" src="https://example.test/screen.png">`;
 const p=normalizeGoogle(html,parseStoreUrl(play));assert.equal(p.description,'Full\ndescription & more 🐾');assert.equal(p.name,'A < B');assert.equal(p.rating,4.7);assert.equal(p.ratingCount,123);assert.equal(p.price,0);assert.equal(p.iconUrl,'');assert.equal(p.screenshots.length,1);
 assert.throws(()=>normalizeGoogle('<html>Consent wall</html>',parseStoreUrl(play)));
});
test('network requests use canonical destinations and never follow redirects',async()=>{
 const product=await importStore(apple,async(url,options)=>{
  assert.equal(url,parseStoreUrl(apple).fetchUrl);assert.equal(options.redirect,'error');assert.ok(options.signal);
  return Response.json({results:[{trackId:6783284490,kind:'software',trackName:'Jess'}]});
 });assert.equal(product.name,'Jess');
 let calls=0;await assert.rejects(importStore('https://internal.test',async()=>{calls++;}),/підтримуємо/);assert.equal(calls,0);
});
test('returns safe errors for unavailable, malformed and oversized upstream replies',async()=>{
 for(const response of [new Response('missing',{status:404}),new Response('invalid json'),new Response('x'.repeat(4*1024*1024+1))]){
  const result=await handleStoreImport(new Request(`https://example.test/api/store-import?url=${encodeURIComponent(apple)}`),async()=>response);
  assert.ok(result.status>=400);assert.ok((await result.json()).error);assert.match(result.headers.get('content-type'),/application\/json/);
 }
 const method=await handleStoreImport(new Request('https://example.test/api/store-import',{method:'POST'}));assert.equal(method.status,405);
});
test('API wrapper keeps assets routing and rejects invalid store URLs without asset fallback',async()=>{
 let calls=0;const env={ASSETS:{fetch:async()=>{calls++;return new Response('asset');}}};
 const assets=await worker.fetch(new Request('https://example.test/logo.png'),env,{});assert.equal(await assets.text(),'asset');
 const api=await worker.fetch(new Request('https://example.test/api/store-import?url=https://internal.test'),env,{});assert.equal(api.status,400);assert.equal(calls,1);
});
