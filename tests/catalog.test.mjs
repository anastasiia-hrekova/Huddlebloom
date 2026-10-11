import test from 'node:test';
import assert from 'node:assert/strict';
import {selectProfiles,rankProfiles} from '../src/domain/catalog.js';
import {profiles} from '../src/data/profiles.js';
test('directory ordering reflects descending profile views',()=>assert.deepEqual(selectProfiles(profiles).map(p=>p.views),[1240,980,760,640,520,410]));
test('combined filters narrow same dataset, never mutate source',()=>{assert.deepEqual(selectProfiles(profiles,{type:'creator',query:'техніку',platform:'YouTube'}).map(p=>p.id),['danylo-lev']);assert.equal(profiles.length,6)});
test('search ignores case and whitespace and matches niches',()=>assert.equal(selectProfiles(profiles,{query:'  FORMA  '})[0].id,'forma-studio'));
test('empty combinations return empty list',()=>assert.equal(selectProfiles(profiles,{type:'creator',platform:'Вебсайт'}).length,0));

test('category ranks are independent and all retains a shared ranking',()=>{
 assert.deepEqual(rankProfiles(profiles,'creator').map(p=>p.id),['maria-koval','danylo-lev']);
 assert.deepEqual(rankProfiles(profiles,'business').map(p=>p.id),['forma-studio','bloom-goods','frame-lab']);
 assert.deepEqual(rankProfiles(profiles,'product').map(p=>p.id),['notely']);
 assert.deepEqual(rankProfiles(profiles).slice(0,5).map(p=>p.id),['maria-koval','forma-studio','danylo-lev','bloom-goods','frame-lab']);
});
