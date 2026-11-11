const $=id=>document.getElementById(id);
const esc=t=>{const d=document.createElement('div');d.textContent=t;return d.innerHTML};
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let tema=null,i=0,pts=0,name=store.get('nombre',''),done=false;

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));$(id).classList.add('on');window.scrollTo(0,0)}

function cardHTML(t,main){
  return `<button class="card ${main?'main':''}" data-id="${esc(t.id)}"><small>${esc(t.mes)} · ${esc(t.enfoque)}</small><strong>${esc(t.titulo)}</strong><span>${esc(t.resumen||'')}</span></button>`;
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
  $('t-meta').textContent=tema.mes+' · Enfoque: '+tema.enfoque;
  $('t-titulo').textContent=tema.titulo;
  $('t-verso').textContent='«'+tema.versiculo+'»';
  $('t-ref').textContent=tema.referencia;
  $('name').value=name;
  const best=store.get('mejor_'+tema.id,null);
  $('last').textContent=best?('Tu mejor resultado: '+best.pts+'/'+best.tot+(best.nombre?' · '+best.nombre:'')):'';
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
  const best=store.get('mejor_'+tema.id,null);
  if(!best||pts>=best.pts)store.set('mejor_'+tema.id,{pts,tot,nombre:name});
  show('s-end');
}
$('go').onclick=()=>{name=$('name').value.trim();store.set('nombre',name);i=0;pts=0;$('who').textContent=name;show('s-quiz');$('prog').style.width='0';render()};
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
home();
