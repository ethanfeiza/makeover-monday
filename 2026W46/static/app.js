(function(){
'use strict';
var NS='http://www.w3.org/2000/svg',svg=document.getElementById('svg');
function el(t,a,p,x){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(x!==undefined)e.textContent=x;(p||svg).appendChild(e);return e}
function txt(p,x,y,s,o){o=o||{};var t=el('text',{x:x,y:y,'font-size':o.fs||12,'text-anchor':o.a||'start'},p,s);if(o.w)t.setAttribute('font-weight',o.w);if(o.c)t.setAttribute('class',o.c);return t}
function csv(u){return fetch(u).then(function(r){return r.text()}).then(function(s){var L=s.trim().split(/\r?\n/),h=L.shift().split(',');return L.map(function(l){var c=l.split(','),o={};h.forEach(function(k,i){o[k]=c[i]});return o})})}
var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var TIPS={};
Promise.all([csv('../data/exports.csv'),csv('../data/states.csv')]).then(function(r){build(r[0],r[1])});
function money(v){return '$'+(v/1e6).toFixed(1)+'M'}
function build(ex,st){
  var d=el('defs');
  [['gM','#E4572E','#F2A93B'],['gB','#B8864B','#D9B26F']].forEach(function(g){var l=el('linearGradient',{id:g[0],x1:0,y1:1,x2:0,y2:0},d);el('stop',{offset:0,'stop-color':g[1]},l);el('stop',{offset:1,'stop-color':g[2]},l)});
  var pt=el('pattern',{id:'hatch',width:6,height:6,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},d);
  el('rect',{width:6,height:6,fill:'#6B5A4A'},pt);el('line',{x1:0,y1:0,x2:0,y2:6,stroke:'#C9B49A','stroke-width':2},pt);
  el('rect',{x:0,y:0,width:1000,height:617,fill:'#1E1410'});
  var h=txt(svg,500,36,'',{fs:26,w:700,a:'middle'});h.setAttribute('aria-label','Minnesota raises 18% of U.S. turkeys. Mexico buys 71% of Minnesota\u2019s turkey exports.');
  function ts(p,s,c,dy,x){var t=el('tspan',{},p,s);if(c)t.setAttribute('class',c);if(dy){t.setAttribute('x',x);t.setAttribute('dy',dy)}return t}
  ts(h,'Minnesota Raises ');ts(h,'18%','wheat');ts(h,' Of U.S. Turkeys.');
  ts(h,'Mexico Buys ',null,30,500);ts(h,'71%','pump');ts(h,' Of Minnesota\u2019s Turkey Exports.');
  [[20,84,330,470],[362,84,618,470]].forEach(function(c){el('rect',{x:c[0],y:c[1],width:c[2],height:c[3],rx:14,fill:'#2A1C15'});el('rect',{x:c[0]+.5,y:c[1]+.5,width:c[2]-1,height:c[3]-1,rx:14,fill:'none',stroke:'#3A2A20'})});
  var fan=el('g',{transform:'translate(0,-16)',role:'img','aria-label':'Turkey whose tail fan of 100 feathers shows Minnesota turkey export dollars by market, one feather per 1% ($1.04M). Mexico 71 feathers, $73.8M; Canada 4; Panama, Guatemala, Costa Rica, Dominican Republic and China 2 each; all other 15.'});
  txt(fan,671,122,'Minnesota Turkey Export Dollars',{fs:15,w:600,a:'middle'});
  txt(fan,671,138,'Share Of Minnesota\u2019s $104M Turkey Exports By Country',{fs:11,a:'middle',c:'sec'});
  var PX=628,PY=406,R0=2,R1=235,GAPD=3,PITCH=(180-7*GAPD)/99,RQ=40;
  var by={};ex.forEach(function(e){by[e.market]=e});
  var COL={Mexico:'#E4572E',Canada:'#F5B78A',Panama:'#F0DC82','Guatemala':'#B4560F','Costa Rica':'#7F8F3A','Dominican Republic':'#B5303F',China:'#8E4F7A','All other':'#9C8F80'};
  var TXC={Mexico:'#F0704A',Guatemala:'#E08A45','Costa Rica':'#A9BB5E','Dominican Republic':'#E5707A',China:'#C58BB6'};
  var order=['Mexico','Canada','Panama','Guatemala','Costa Rica','Dominican Republic','China','All other'];
  var feathers=el('g',{},fan);
  var OL='#120a06',SC=4.8,tk=el('g',{'pointer-events':'none',transform:'translate('+(PX-18*SC)+','+(PY-20.2*SC)+') scale('+SC+')'},fan);
  el('path',{stroke:OL,'stroke-width':.35,'stroke-opacity':.85,'stroke-linejoin':'round',fill:'#FFAC33',d:'M22.88 33.097c-.098-.18-.25-.302-.418-.391C20.865 31 22 28.999 22 28.999c0-.553 1-2 0-2l-1 1c-1 1-1 4-1 4h-2c-.553 0-1 .447-1 1 0 .553.447 1 1 1h1.107l-.222.12c-.486.263-.667.869-.404 1.356.263.486.869.667 1.356.404l2.639-1.427c.486-.263.667-.869.404-1.355zm-7 0c-.097-.18-.25-.302-.417-.391C13.866 31 15 28.999 15 28.999c0-.553 1-2 0-2l-1 1c-1 1-1 4-1 4h-2c-.553 0-1 .447-1 1 0 .553.447 1 1 1h1.108l-.222.12c-.486.263-.667.869-.404 1.356.263.486.869.667 1.356.404l2.639-1.427c.485-.263.666-.869.403-1.355z'},tk);
  el('ellipse',{cx:18,cy:20.2,rx:12,ry:10.8,fill:'#8a5a2b',stroke:OL,'stroke-width':.35,'stroke-opacity':.85},tk);
  el('path',{stroke:OL,'stroke-width':.35,'stroke-opacity':.85,'stroke-linejoin':'round',d:'M15 19.5C17 15.5 24 14.5 28.5 19.5C26.5 25.5 19 27 15 19.5Z',fill:'#a06c37'},tk);
  el('path',{stroke:OL,'stroke-width':.35,'stroke-opacity':.85,'stroke-linejoin':'round',fill:'#BE1931',d:'M5.134 7c2 5-3 5-2 7s5-2 3-7-1 0-1 0z'},tk);
  el('path',{stroke:OL,'stroke-width':.35,'stroke-opacity':.85,'stroke-linejoin':'round',fill:'#FFAC33',d:'M7 6c0 1.104 1.933 2 0 2S0 7 0 6s1.067-3 3-3 4 1.896 4 3z'},tk);
  el('path',{stroke:OL,'stroke-width':.35,'stroke-opacity':.85,'stroke-linejoin':'round',fill:'#D98A6C',d:'M6 21C6 15 9.209 8 7 8 3 8 3 6.209 3 4s1.791-4 4-4c7 0 6 9 4 13-1.674 3.348-2.022 8-5 8z'},tk);
  el('circle',{fill:'#1E1410',cx:6,cy:3,r:1},tk);
  var labels=el('g',{},fan),idx=0,a=-90,mid={},first={};
  order.forEach(function(m,gi){
    var e=by[m],v=+e.value_usd,n=Math.round(e.share*100),sh=n;
    var rt=+by.Mexico.value_usd/+by.Canada.value_usd;
    var stat=m==='Mexico'?rt.toFixed(1)+'x the next-largest market (Canada)':m==='Canada'?'#2 market, '+rt.toFixed(1)+'x smaller than Mexico':m==='All other'?'Unnamed markets combined':'Tied for #3 with four other markets';
    TIPS[m]={n:m,c:(TXC[m]||COL[m]),rows:[money(v),sh+'% of Total MN Export Dollars',stat]};
    var a0=a;
    for(var i=0;i<n;i++){
      var ang=a+PITCH*i;
      var g=el('g',{class:'mk fe','data-k':m,transform:'translate('+PX+','+PY+') rotate('+ang.toFixed(2)+')',tabindex:idx?-1:0,'aria-label':m+' '+money(v)+', '+sh+'% of exports'},feathers);
      var sg=el('g',{class:'sh'},g);
      var L=R1-R0,f=function(k){return (k*L).toFixed(1)};
      var lf=el('path',{class:'leaf',d:'M0,-'+RQ+' C3,-'+f(.25)+' 6,-'+f(.5)+' 5.5,-'+f(.68)+' C5,-'+f(.86)+' 4,-'+f(.96)+' 0,-'+R1+' C-4,-'+f(.96)+' -5,-'+f(.86)+' -5.5,-'+f(.68)+' C-6,-'+f(.5)+' -3,-'+f(.25)+' 0,-'+RQ+'Z',fill:COL[m],stroke:'#1e1410','stroke-width':.6,'stroke-linejoin':'round'},sg);
      el('line',{class:'leaf',x1:0,y1:-RQ,x2:0,y2:-(R1-6),stroke:'#FFF4E0','stroke-opacity':.25,'stroke-width':.7},sg);
      lf.style.setProperty('--d',(idx*9)+'ms');idx++;
      lf.style.setProperty('--d',(idx++*9)+'ms');
    }
    var a1=a+PITCH*(n-1);mid[m]=(a0+a1)/2;a=a1+PITCH+GAPD;
  });
  var ln=el('g',{class:'ann','pointer-events':'none'},fan);
  var KEY=520,LW=0;
  function lab2(m,x,y,an){var e=by[m],n=Math.round(e.share*100),g=el('g',{},ln);
    var a=txt(g,x,y+9,m,{fs:11,w:700,a:an});a.style.fill=(TXC[m]||COL[m]);
    var b=txt(g,x,y+19,money(+e.value_usd)+' \u2022 '+n+'%',{fs:9,a:an});b.style.fill='#FFF4E0';
    var bb=g.getBBox();return {g:g,w:bb.width,x:bb.x}}
  var RR=R1+7,LH=28;window.__lab={};
  var mth=mid.Mexico*Math.PI/180;
  var ml=lab2('Mexico',PX+(R1+10)*Math.sin(mth)-6,PY-(R1+10)*Math.cos(mth)-26,'end');
  var sm=order.slice(1,7),items=sm.map(function(m){var tdeg=mid[m],t=tdeg*Math.PI/180,o=lab2(m,0,0,'start'),rr=R1+7;
    return {m:m,w:o.w,o:o,x:PX+rr*Math.sin(t)+1,y:PY-rr*Math.cos(t)-22+11*Math.min(1,tdeg/90)}});
  for(var pass=0;pass<4;pass++)for(var q=1;q<items.length;q++){var gap=items[q].y-items[q-1].y;if(gap<24){var d=(24-gap)/2;items[q].y+=d;items[q-1].y-=d}}
  items.forEach(function(it){var x=it.x;if(x+it.w>962)x=962-it.w;
    it.o.g.setAttribute('transform','translate('+x.toFixed(1)+','+it.y.toFixed(1)+')');window.__lab[it.m]=[Math.round(x),Math.round(it.y),Math.round(x+it.w)]});
  var ao=lab2('All other',PX+RR+2,PY+10,'end');
  txt(ln,PX,KEY,'1 feather = 1% of export dollars',{fs:11,a:'middle',c:'sec'});
  // STATES
  var S=el('g',{transform:'translate(0,-16)',role:'img','aria-label':'Dot-rank chart of U.S. turkey production share by state. Minnesota leads at 18%, North Carolina and Arkansas 13% each, then Indiana 9%, Missouri 8%, Virginia 7%, Iowa 5%, Pennsylvania 4%, California 4%, Ohio 3%, all other states 17%.'});
  txt(S,185,126,'Share Of U.S. Turkeys By State',{fs:15,w:600,a:'middle'});
  var X0=134,SC=8.5,Y0=180,YA=Y0+10*30+22;
  el('line',{x1:X0,y1:152,x2:X0+20*SC,y2:152,stroke:'none'},S);
  [0,5,10,15,20].forEach(function(t){var x=X0+t*SC;el('line',{x1:x,y1:154,x2:x,y2:YA,stroke:'#3A2A20','stroke-width':1},S);txt(S,x,KEY,t+'%',{fs:11,a:'middle',c:'sec'})});
  var sg=el('g',{},S),mn=+st[0].share;
  st.forEach(function(s,i){
    var cy=Y0+i*30,v=+s.share*100,isMN=i===0,isO=s.state==='All other',x=X0+v*SC,r=isMN?11:8,k='S'+i;
    var nm=isO?'All other states':s.state;
    TIPS[k]={n:nm,rows:isO?['Share of U.S. turkeys  17%','Combined remaining states']:['Share of U.S. turkeys  '+v.toFixed(0)+'%','Rank  '+s.rank+' of 10',isMN?'Leader of all states':'vs Minnesota  '+(mn/+s.share).toFixed(2)+'x behind']};
    var g=el('g',{class:'mk dt','data-k':k,tabindex:0,'aria-label':nm+' '+v.toFixed(0)+'%'},sg);
    el('rect',{x:24,y:cy-15,width:322,height:30,fill:'transparent'},g);
    txt(g,X0-10,cy+4,nm,{fs:12,a:'end',w:isMN?700:400});
    var sl=el('g',{class:'sl'},g);sl.style.setProperty('--d',(i*40)+'ms');
    el('line',{x1:X0,y1:cy,x2:x-r,y2:cy,stroke:'#4A3528','stroke-width':2},sl);
    var col=isMN?'#F2A93B':'#8C7A5E';
    if(isMN)el('circle',{cx:x,cy:cy,r:r+3,fill:'#F2A93B','fill-opacity':.3},sl);
    var c=el('circle',{cx:x,cy:cy,r:r,fill:isO?'#2A1C15':col},sl);if(isO){c.setAttribute('stroke',col);c.setAttribute('stroke-width',2)}
    txt(sl,x+r+(isMN?9:6),cy+4,v.toFixed(0)+'%',{fs:12,w:isMN?700:400,a:'start',c:isMN?'wheat':'sec'});
  });
  txt(svg,500,584,'VIZ BY: ETHAN FEIZA | DATA: USDA | #MAKEOVERMONDAY',{fs:11,a:'middle',c:'sec'}).setAttribute('letter-spacing','.08em');
  bind();
}
function bind(){
  var app=document.getElementById('app');
  function gk(ev){return ev.target.closest&&ev.target.closest('[data-k]')}
  Tip.bind(app,{frame:document.documentElement,hit:function(ev){var g=gk(ev);return g?g.getAttribute('data-k'):null},
    render:function(k,tip){var t=TIPS[k];if(!t)return;var n=document.createElement('div');n.className='n';n.textContent=t.n;if(t.c)n.style.color=t.c;tip.appendChild(n);
      t.rows.forEach(function(s){var m=document.createElement('div');m.className='m';var i=s.lastIndexOf('  ');if(i>0){m.appendChild(document.createTextNode(s.slice(0,i)+'  '));var b=document.createElement('b');b.textContent=s.slice(i+2);m.appendChild(b)}else m.textContent=s;tip.appendChild(m)})}});
  function clear(){svg.classList.remove('dim');svg.querySelectorAll('.hot').forEach(function(h){h.classList.remove('hot')})}
  app.addEventListener('pointerover',function(ev){clear();var g=gk(ev);if(!g)return;var k=g.getAttribute('data-k');svg.classList.add('dim');svg.querySelectorAll('[data-k="'+k+'"]').forEach(function(h){h.classList.add('hot')})});
  app.addEventListener('pointerleave',clear);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')Tip.hide()});
}
})();
