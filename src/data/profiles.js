// Replace this repository adapter with server-backed queries without changing UI components.
export const profiles = [
 {id:'maria-koval',name:'Марія Коваль',type:'creator',tags:['Лайфстайл','Подорожі','UGC'],country:'Україна',platforms:['Instagram','TikTok'],views:1240,image:'/assets/maria-clean.webp',avatar:'/assets/maria-avatar.webp',bio:'Створюю щирий контент про подорожі, лайфстайл і красиві моменти в буднях.'},
 {id:'forma-studio',name:'Forma Studio',type:'business',tags:['Брендинг','Дизайн','Креативні послуги'],country:'Україна',platforms:['Instagram','Вебсайт'],views:980,image:'/assets/forma-clean.webp',avatar:'/assets/forma-avatar.webp',bio:'Бренд-дизайн і візуальні рішення для брендів та бізнесів.'},
 {id:'danylo-lev',name:'Данило Лев',type:'creator',tags:['Відеоконтент','Техно','Огляди'],country:'Україна',platforms:['YouTube','TikTok'],views:760,image:'/assets/danylo-clean.webp',avatar:'/assets/danylo-avatar.webp',bio:'Розповідаю про техніку, творчість і технології простими словами.'},
 {id:'bloom-goods',name:'Bloom Goods',type:'business',tags:['Дизайн','Лайфстайл'],country:'Україна',platforms:['Instagram','Вебсайт'],views:640,color:'#efb39d',bio:'Демо-бренд предметів для дому. Дизайн, деталі та затишок щодня.'},
 {id:'frame-lab',name:'Frame Lab',type:'business',tags:['Відеоконтент','Креативні послуги'],country:'Україна',platforms:['Instagram','YouTube'],views:520,color:'#bcc8ef',bio:'Демонстраційна студія фото й відео для брендів та digital-продуктів.'},
 {id:'notely',name:'Notely',type:'product',tags:['Техно','Дизайн'],country:'Україна',platforms:['Вебсайт'],views:410,color:'#d5ed98',bio:'Демо digital-продукт для нотаток, ідей та щоденних планів.'},
];
export const profileRepository = { async list(){return profiles}, async find(id){return profiles.find(p=>p.id===id)} };
