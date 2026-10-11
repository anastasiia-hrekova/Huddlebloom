import {copyFileSync,mkdirSync} from 'node:fs';
// Preserve the original Sites asset worker and package the API wrapper alongside it.
mkdirSync('dist/server/server',{recursive:true});
copyFileSync('worker/index.js','dist/server/assets.js');
copyFileSync('server/store-import.js','dist/server/server/store-import.js');
const {readFileSync,writeFileSync}=await import('node:fs');
writeFileSync('dist/server/index.js',readFileSync('worker/app.js','utf8').replace("'./index.js'","'./assets.js'").replace("'../server/store-import.js'","'./server/store-import.js'"));
