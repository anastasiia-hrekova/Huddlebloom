import {Eye,MapPin,ArrowRight} from '@phosphor-icons/react';
import {ProfileAvatar} from './ProfileAvatar';
import {labels} from '../domain/catalog';

export function ProfileList({profile,onOpen}) {
  return <article className="profile-row">
    <ProfileAvatar profile={profile}/>
    <div className="row-info">
      <h3>{profile.name}</h3>
      <span className="muted">{labels[profile.type]}</span>
      <p>{profile.bio}</p>
      <div className="tags">{profile.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    </div>
    <div className="row-meta"><span><MapPin size={16}/>{profile.country}</span><span><Eye size={16}/>{new Intl.NumberFormat('uk').format(profile.views)}</span></div>
    <button className="outline row-open" onClick={()=>onOpen(profile)} aria-label={`Переглянути ${profile.name}`}>Профіль <ArrowRight size={18}/></button>
  </article>;
}
