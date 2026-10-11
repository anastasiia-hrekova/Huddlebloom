import {useEffect,useRef} from 'react';
import {X} from '@phosphor-icons/react';
export function Dialog({title,onClose,children}){const ref=useRef(null);useEffect(()=>{ref.current.showModal();const close=e=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[onClose]);return <dialog ref={ref} onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose()}}><button className="close" aria-label="Закрити" onClick={onClose}><X size={22}/></button><h2>{title}</h2>{children}</dialog>}
