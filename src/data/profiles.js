// Replace this repository adapter with server-backed queries without changing UI components.
export const profiles = [
 {id:'maria-koval',name:'Марія Коваль',type:'creator',tags:['Лайфстайл','Подорожі','UGC'],country:'Україна',platforms:['Instagram','TikTok'],views:1240,image:'/assets/maria-clean.webp',avatar:'/assets/maria-avatar.webp',bio:'Створюю щирий контент про подорожі, лайфстайл і красиві моменти в буднях.'},
 {id:'forma-studio',name:'Forma Studio',type:'business',tags:['Брендинг','Дизайн','Креативні послуги'],country:'Україна',platforms:['Instagram','Вебсайт'],views:980,image:'/assets/forma-clean.webp',avatar:'/assets/forma-avatar.webp',bio:'Бренд-дизайн і візуальні рішення для брендів та бізнесів.'},
 {id:'danylo-lev',name:'Данило Лев',type:'creator',tags:['Відеоконтент','Техно','Огляди'],country:'Україна',platforms:['YouTube','TikTok'],views:760,image:'/assets/danylo-clean.webp',avatar:'/assets/danylo-avatar.webp',bio:'Розповідаю про техніку, творчість і технології простими словами.'},
];
export const profileRepository = { async list(){return profiles}, async find(id){return profiles.find(p=>p.id===id)} };
