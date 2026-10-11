const routes = [
  {id:'north',path:'M 327 260 Q 595 50 890 264',color:'#c5ff16',duration:6},
  {id:'east',path:'M 890 264 Q 1160 40 1420 260 Q 1595 220 1640 400',color:'#1681ff',duration:8},
  {id:'south',path:'M 327 260 Q 560 275 1024 570',color:'#1681ff',duration:7},
  {id:'africa',path:'M 529 480 Q 1000 230 1420 260',color:'#c5ff16',duration:9},
  {id:'ocean',path:'M 494 660 Q 1200 290 1814 700',color:'#1681ff',duration:10},
];
const beacons=[[327,260],[890,264],[1420,260],[1640,400],[529,480],[1024,570],[494,660],[1814,700]];

export function AnimatedMap() {
 return <div className="hero-map animated-map" role="img" aria-label="Анімована карта світу: маячки бізнесів і креаторів та сигнали між ними">
   <img src="/assets/map-hd.webp" alt="" width="1983" height="793"/>
   <svg viewBox="0 0 1983 793" aria-hidden="true" focusable="false">
     <defs>{routes.map(route=><path key={route.id} id={`map-route-${route.id}`} d={route.path}/>)}</defs>
     {routes.map((route,index)=><g key={route.id}>
       <path className="map-flow-line" d={route.path} stroke={route.color} style={{animationDelay:`-${index*2}s`}}/>
       <circle className="map-signal" r="7" fill={route.color}>
         <animateMotion dur={`${route.duration}s`} begin={`-${index*2}s`} repeatCount="indefinite"><mpath href={`#map-route-${route.id}`}/></animateMotion>
       </circle>
     </g>)}
     {beacons.map(([x,y],index)=><circle key={index} className="map-pulse" cx={x} cy={y} r="18" stroke={index%2?'#1681ff':'#c5ff16'} style={{animationDelay:`-${index*.45}s`}}/>)}
   </svg>
 </div>;
}
