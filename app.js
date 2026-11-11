const $=id=>document.getElementById(id);
const esc=t=>{const d=document.createElement('div');d.textContent=t;return d.innerHTML};
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let tema=null,i=0,pts=0,name='',done=false,resMode='rec';

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));$(id).classList.add('on');window.scrollTo(0,0)}

function cardHTML(t,main){
  return `<button class="card ${main?'main':''}" data-id="${esc(t.id)}"><small>Quiz · ${esc(t.mes)} · ${esc(t.enfoque)}</small><strong>${esc(t.titulo)}</strong><span>${esc(t.resumen||'')}</span></button>`;
}
function home(){
  $('fam').textContent=FAMILIA;
  $('foot').textContent='Altar Familiar · '+FAMILIA+' · Mentalidad Cristo';
  $('actual').innerHTML=cardHTML(TEMAS[0],true);
  const rest=TEMAS.slice(1);
  $('anteriores').innerHTML=rest.length?'<p class="label" style="margin-top:14px">Temas anteriores</p>'+rest.map(t=>cardHTML(t,false)).join(''):'';
  document.querySelectorAll('.card').forEach(c=>c.onclick=()=>openTema(c.dataset.id));
  show('s-home');
}
function openTema(id){
  tema=TEMAS.find(t=>t.id===id)||TEMAS[0];
  $('t-meta').textContent='Quiz · '+tema.mes+' · Enfoque: '+tema.enfoque;
  $('t-titulo').textContent=tema.titulo;
  $('t-verso').textContent='«'+tema.versiculo+'»';
  $('t-ref').textContent=tema.referencia;
  $('name').value='';
  show('s-tema');
}
function render(){
  const x=tema.preguntas[i];done=false;
  $('count').textContent=(i+1)+' / '+tema.preguntas.length;
  $('q').textContent=x.q;
  $('hint').style.display='none';$('hint').textContent=x.h||'';$('hintbtn').style.display=x.h?'block':'none';
  $('fb').style.display='none';$('next').style.display='none';
  $('opts').innerHTML='';
  x.o.forEach((t,k)=>{const b=document.createElement('button');b.className='opt';b.textContent=t;b.onclick=()=>pick(k);$('opts').appendChild(b)});
}
function pick(k){
  if(done)return;done=true;
  const x=tema.preguntas[i],bs=[...document.querySelectorAll('.opt')];
  bs.forEach(b=>b.disabled=true);
  const good=k===x.a;if(good)pts++;
  bs[x.a].classList.add('ok');if(!good)bs[k].classList.add('bad');
  const fb=$('fb');fb.className='fb '+(good?'ok':'bad');
  fb.innerHTML='<b>'+(good?'¡Correcto!':'Casi')+'</b>'+esc(x.e||'');fb.style.display='block';
  $('hintbtn').style.display='none';$('hint').style.display='none';
  $('next').textContent=i===tema.preguntas.length-1?'Ver mi resultado':'Siguiente';$('next').style.display='block';
  $('prog').style.width=((i+1)/tema.preguntas.length*100)+'%';
  fb.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function finish(){
  const tot=tema.preguntas.length;
  $('pts').textContent=pts;$('tot').textContent='/'+tot;
  $('endwho').textContent=name?name.toUpperCase():'RESULTADO';
  const r=pts/tot;
  $('msg').textContent=pts===tot?'¡Perfecto! Estás firme en Él. 🍇':r>=.6?'¡Muy bien! Sigue permaneciendo en Él.':'Buen intento. Vuelvan a leer el pasaje en familia y jueguen otra vez.';
  $('endverse').innerHTML='«'+esc(tema.versiculo.length>170?tema.versiculo.slice(0,167).trim()+'…':tema.versiculo)+'» <b>'+esc(tema.referencia)+'</b>';
  show('s-end');
  guardar(tema.id,name,pts,tot);
}
$('go').onclick=()=>{name=$('name').value.trim();if(!name){$('name').focus();$('name').placeholder='Escribe tu nombre para empezar';return}i=0;pts=0;$('who').textContent=name;show('s-quiz');$('prog').style.width='0';render()};
$('name').addEventListener('keydown',e=>{if(e.key==='Enter')$('go').click()});
$('hintbtn').onclick=()=>{$('hint').style.display='block';$('hintbtn').style.display='none'};
$('next').onclick=()=>{if(i<tema.preguntas.length-1){i++;render()}else finish()};
$('again').onclick=()=>openTema(tema.id);
$('home').onclick=home;
$('back1').onclick=home;
$('brand').onclick=home;
$('share').onclick=async()=>{
  const data={title:'Altar Familiar · '+FAMILIA,text:'Juega el quiz "'+tema.titulo+'" del Altar Familiar ('+tema.referencia+')',url:location.href};
  try{if(navigator.share){await navigator.share(data)}else{await navigator.clipboard.writeText(location.href);$('share').textContent='¡Enlace copiado!'}}catch(e){}
};

/* ---------- Resultados guardados (Supabase) ---------- */
const H=()=>({apikey:SUPA.key,Authorization:'Bearer '+SUPA.key,'Content-Type':'application/json'});
const api=p=>SUPA.url+'/rest/v1/'+SUPA.tabla+p;
async function guardar(id,nombre,puntos,total){
  $('saved').textContent='Guardando tu resultado…';
  try{
    const r=await fetch(api(''),{method:'POST',headers:{...H(),Prefer:'return=minimal'},body:JSON.stringify({tema:id,nombre,puntos,total})});
    $('saved').textContent=r.ok?'✓ Resultado guardado':'No se pudo guardar el resultado';
  }catch(e){$('saved').textContent='No se pudo guardar (sin conexión)'}
}
function fecha(iso){
  const d=new Date(iso),m=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return d.getDate()+' '+m[d.getMonth()]+' · '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
}
async function verResultados(){
  $('r-meta').textContent='Resultados · '+tema.mes;
  $('r-titulo').textContent=tema.titulo;
  $('r-list').innerHTML='<p class="empty">Cargando…</p>';$('r-resum').textContent='';
  show('s-res');
  try{
    const r=await fetch(api('?tema=eq.'+encodeURIComponent(tema.id)+'&select=nombre,puntos,total,creado&order=creado.desc&limit=200'),{headers:H()});
    if(!r.ok)throw 0;
    const rows=await r.json();
    pintar(rows);
  }catch(e){$('r-list').innerHTML='<p class="empty">No se pudieron cargar los resultados. Revisa tu conexión e inténtalo de nuevo.</p>'}
}
let cache=[];
function pintar(rows){
  if(rows)cache=rows;
  const list=[...cache];
  if(resMode==='top')list.sort((x,y)=>(y.puntos/y.total)-(x.puntos/x.total)||new Date(x.creado)-new Date(y.creado));
  if(!list.length){$('r-resum').textContent='';$('r-list').innerHTML='<p class="empty">Todavía no hay resultados.<br>¡Sé el primero en jugar!</p>';return}
  const prom=list.reduce((s,x)=>s+x.puntos/x.total,0)/list.length*100;
  $('r-resum').textContent=list.length+(list.length===1?' participación':' participaciones')+' · promedio '+Math.round(prom)+'%';
  $('r-list').innerHTML=list.map((x,k)=>`<div class="row"><span class="pos">${resMode==='top'?(k+1):'•'}</span><span class="nm">${esc(x.nombre)}<small>${fecha(x.creado)}</small></span><span class="sc">${x.puntos}<small>/${x.total}</small></span></div>`).join('');
}
$('verres1').onclick=verResultados;$('verres2').onclick=verResultados;
$('back2').onclick=()=>openTema(tema.id);
$('tab-rec').onclick=()=>{resMode='rec';$('tab-rec').classList.add('on');$('tab-top').classList.remove('on');pintar()};
$('tab-top').onclick=()=>{resMode='top';$('tab-top').classList.add('on');$('tab-rec').classList.remove('on');pintar()};
/* ---------- Temas desde la base de datos (si falla, usa temas.js) ---------- */
async function cargarTemas(){
  try{
    const r=await fetch(SUPA.url+'/rest/v1/altar_temas?select=datos&publicado=eq.true&order=orden.desc&limit=50',{headers:{apikey:SUPA.key,Authorization:'Bearer '+SUPA.key}});
    if(!r.ok)throw 0;
    const rows=await r.json();
    const t=rows.map(x=>x.datos).filter(x=>x&&x.id&&x.preguntas&&x.preguntas.length);
    if(t.length)window.TEMAS=t;
  }catch(e){}
  home();
}
cargarTemas();
