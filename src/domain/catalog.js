export const categories = {all:'Усі', creator:'Креатори', business:'Бізнеси', product:'Digital-продукти'};
export const labels = {creator:'Креатор', business:'Бізнес', product:'Digital-продукт'};
export function selectProfiles(profiles, filters = {}) {
 const q=(filters.query||'').trim().toLocaleLowerCase('uk');
 return profiles.filter(p => (!filters.type || filters.type==='all' || p.type===filters.type) && (!filters.niche || p.tags.includes(filters.niche)) && (!filters.country || p.country===filters.country) && (!filters.platform || p.platforms.includes(filters.platform)) && (!q || [p.name,p.bio,...p.tags].join(' ').toLocaleLowerCase('uk').includes(q))).sort((a,b)=> filters.sort==='name' ? a.name.localeCompare(b.name,'uk') : b.views-a.views || a.id.localeCompare(b.id));
}

// Rankings depend only on category; search and display sorting never change rank.
export function rankProfiles(profiles, type = 'all') {
 return selectProfiles(profiles, {type, sort:'views'});
}
