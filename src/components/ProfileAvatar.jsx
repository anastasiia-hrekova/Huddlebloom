export function ProfileAvatar({profile}) {
  return profile.avatar ? <img className="avatar" src={profile.avatar} alt=""/> :
    <span className="avatar avatar-initials" style={{background:profile.color}} aria-hidden="true">{profile.name.split(' ').map(word=>word[0]).join('').slice(0,2)}</span>;
}
