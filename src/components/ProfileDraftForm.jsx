import {useEffect,useRef,useState} from 'react';

export function ProfileDraftForm({onSaved}) {
 const [form,setForm]=useState({type:'creator',name:'',bio:''});
 con…1126 tokens truncated…430й продукт за посиланням</h3><p>App Store або Google Play — підставимо доступні дані, а ти зможеш їх відредагувати.</p>
   <label>Посилання на сторінку продукту<input type="url" value={storeUrl} onChange={event=>changeUrl(event.target.value)} placeholder="https://apps.apple.com/ua/app/…" maxLength={2048}/></label>
   <button className="blue" type="button" disabled={busy || !storeUrl.trim()} onClick={importProduct}>{busy?'Завантажуємо дані…':'Імпортувати з магазину'}</button>
   <p className="store-help">Наявні назва й короткий опис не перезаписуються. Повторний імпорт оновить дані магазину. Інші продукти додай вручну.</p>
  </section>}
  {error&&<p className="form-error" role="alert">{error}</p>}
  <p role="status" aria-live="polite" className="import-status">{message}</p>
  <label>Ім’я або назва<input name="name" value={form.name} onChange={event=>change('name',event.target.value)} required maxLength={100}/></label>
  <label>{form.type==='product'?'Коротко про продукт':'Коротко про себе'}<textarea name="bio" value={form.bio} onChange={event=>change('bio',event.target.value)} required maxLength={500}/><small>{form.bio.length}/500</small></label>
  {form.type==='product'&&product&&<section className="imported-product" aria-label="Імпортовані дані продукту">
   <div className="imported-heading">{product.iconUrl&&<img src={product.iconUrl} alt="Іконка продукту" referrerPolicy="no-referrer"/>}<div><h3>{product.name}</h3><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer">{product.store==='app-store'?'App Store':'Google Play'} ↗</a></div></div>
   <label>Повний опис із магазину<textarea rows={7} value={product.description} maxLength={20000} onChange={event=>setProduct(previous=>({...previous,description:event.target.value}))}/></label>
   <label>Розробник<input value={product.developer} maxLength={200} onChange={event=>setProduct(previous=>({...previous,developer:event.target.value}))}/></label>
   <label>Сайт продукту<input type="url" value={product.website} maxLength={2048} onChange={event=>setProduct(previous=>({...previous,website:event.target.value}))}/></label>
   <dl className="store-facts">{[
    ['Категорії',product.categories?.join(', ')],['Оцінка магазину',product.rating!==null?`${product.rating} / 5${product.ratingCount!==null?` · ${new Intl.NumberFormat('uk').format(product.ratingCount)} оцінок`:''}`:''],
    ['Ціна в магазині',product.price!==null?(product.price===0?'Безкоштовне завантаження':`${product.price} ${product.currency}`):''],['Версія',product.version],['Оновлено',product.updatedAt],['Перший реліз',product.releaseDate],['Розмір',product.fileSizeBytes?`${(product.fileSizeBytes/1024/1024).toFixed(1)} МБ`:''],['Віковий рейтинг',product.ageRating],['Мінімальна версія ОС',product.minimumOsVersion],['Мови',product.languages?.join(', ')]
   ].filter(([,value])=>value).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   {product.releaseNotes&&<details className="store-release-notes"><summary>Що нового в цій версії</summary><p>{product.releaseNotes}</p></details>}
   {product.screenshots?.length>0&&<><h4>Скриншоти з магазину</h4><div className="store-screenshots">{product.screenshots.map((url,index)=><a key={url} href={url} target="_blank" rel="noopener noreferrer"><img src={url} loading="lazy" referrerPolicy="no-referrer" alt={`Скриншот продукту ${index+1}`}/></a>)}</div></>}
   <p className="store-help">Дані — з відкритої сторінки магазину, можуть бути неповними. Оцінка магазину не впливає на рейтинг Huddlebloom. Зображення зберігаються як посилання.</p>
  </section>}
  <button className="lime" disabled={busy}>Зберегти чернетку</button>
 </form>;
}
