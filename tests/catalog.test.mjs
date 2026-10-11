import test from 'node:test';
import assert from 'node:assert/strict';
import {selectProfiles} from '../src/domain/catalog.js';
import {profiles} from '../src/data/profiles.js';
test('directory ordering reflects descending profile views',()=>assert.deepEqual(selectProfiles(profiles).map(p=>p.views),[1240,980,760]));
test('combined filters narrow same dataset, never mutate source',()=>{assert.deepEqual(selectProfiles(profiles,{type:'creator',query:'техніку',platform:'YouTube'}).map(p=>p.id),['danylo-lev']);assert.equal(profiles.length,3)});
test('search ignores case and whitespace and matches niches',()=>assert.equal(selectProfiles(profiles,{query:'  FORMA  '})[0].id,'forma-studio'));
test('empty combinations return empty list',()=>assert.equal(selectProfiles(profiles,{type:'business',platform:'YouTube'}).length,0));
