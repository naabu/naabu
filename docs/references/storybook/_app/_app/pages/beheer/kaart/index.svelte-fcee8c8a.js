import{S as _e,i as ve,s as be,Y as Ee,Z as $e,e as n,t as z,k as D,c as i,a as o,g as C,d as s,n as T,b as r,f as R,H as t,h as ge,j as ae,m as se,o as re,a7 as ke,I as xe,_ as je,x as le,u as ne,v as ie,K as Ie,L as De,M as Te,A as Ae,O as Se}from"../../../chunks/vendor-9a64f523.js";import{M as Ve}from"../../../chunks/management-336a91b5.js";import{S as Be}from"../../../chunks/show-4b835def.js";import{b as He,a as Me}from"../../../chunks/algolia-177da4a5.js";import{s as Ne}from"../../../chunks/stores-bd9665ba.js";import"../../../chunks/tabs-ee43e290.js";import"../../../chunks/navigation-51f4a605.js";import"../../../chunks/singletons-12a22614.js";/* empty css                                                         */function we(u,a,c){const l=u.slice();return l[9]=a[c],l}function ye(u){let a,c,l,f=u[9].title+"",A,b,j,g,y=u[9].image+"",k,B,h,_,E,H,I,M,m,S,q,W,x,Y,O,V;return{c(){a=n("tr"),c=n("td"),l=n("div"),A=z(f),b=D(),j=n("td"),g=n("div"),k=z(y),B=z("}"),h=D(),_=n("td"),E=n("a"),H=z("Bekijken"),M=D(),m=n("a"),S=z("Wijzigen"),W=D(),x=n("a"),Y=z("Paden"),V=D(),this.h()},l(p){a=i(p,"TR",{});var d=o(a);c=i(d,"TD",{class:!0});var F=o(c);l=i(F,"DIV",{class:!0});var N=o(l);A=C(N,f),N.forEach(s),F.forEach(s),b=T(d),j=i(d,"TD",{class:!0});var U=o(j);g=i(U,"DIV",{class:!0});var Z=o(g);k=C(Z,y),B=C(Z,"}"),Z.forEach(s),U.forEach(s),h=T(d),_=i(d,"TD",{class:!0});var P=o(_);E=i(P,"A",{href:!0,class:!0});var X=o(E);H=C(X,"Bekijken"),X.forEach(s),M=T(P),m=i(P,"A",{href:!0,class:!0});var J=o(m);S=C(J,"Wijzigen"),J.forEach(s),W=T(P),x=i(P,"A",{href:!0,class:!0});var K=o(x);Y=C(K,"Paden"),K.forEach(s),P.forEach(s),V=T(d),d.forEach(s),this.h()},h(){r(l,"class","text-sm font-medium text-gray-900"),r(c,"class","px-6 py-4 whitespace-nowrap"),r(g,"class","description text-sm text-gray-900"),r(j,"class","px-6 py-4"),r(E,"href",I="/kaart/"+u[9].objectID),r(E,"class","text-indigo-600 hover:text-indigo-900"),r(m,"href",q="/beheer/kaart/"+u[9].objectID+"/wijzigen"),r(m,"class","text-indigo-600 hover:text-indigo-900"),r(x,"href",O="/beheer/kaart/"+u[9].objectID+"/paden"),r(x,"class","text-indigo-600 hover:text-indigo-900"),r(_,"class","px-6 py-4 whitespace-nowrap text-right text-sm font-medium")},m(p,d){R(p,a,d),t(a,c),t(c,l),t(l,A),t(a,b),t(a,j),t(j,g),t(g,k),t(g,B),t(a,h),t(a,_),t(_,E),t(E,H),t(_,M),t(_,m),t(m,S),t(_,W),t(_,x),t(x,Y),t(a,V)},p(p,d){d&2&&f!==(f=p[9].title+"")&&ge(A,f),d&2&&y!==(y=p[9].image+"")&&ge(k,y),d&2&&I!==(I="/kaart/"+p[9].objectID)&&r(E,"href",I),d&2&&q!==(q="/beheer/kaart/"+p[9].objectID+"/wijzigen")&&r(m,"href",q),d&2&&O!==(O="/beheer/kaart/"+p[9].objectID+"/paden")&&r(x,"href",O)},d(p){p&&s(a)}}}function ze(u){let a,c,l,f,A,b,j,g,y,k,B,h,_,E,H,I,M,m,S,q,W,x,Y,O,V,p,d,F,N,U,Z,P;function X(e){u[4](e)}let J={};u[2]!==void 0&&(J.breadcrumbs=u[2]),a=new Be({props:J}),Ee.push(()=>$e(a,"breadcrumbs",X)),f=new Ve({props:{mainSelected:"map"}});let K=u[1],w=[];for(let e=0;e<K.length;e+=1)w[e]=ye(we(u,K,e));return{c(){ae(a.$$.fragment),l=D(),ae(f.$$.fragment),A=D(),b=n("a"),j=z("Nieuwe kaart maken"),g=D(),y=n("div"),k=n("input"),B=D(),h=n("div"),_=n("div"),E=n("div"),H=n("div"),I=n("table"),M=n("thead"),m=n("tr"),S=n("th"),q=z("Titel"),W=D(),x=n("th"),Y=z("Image"),O=D(),V=n("th"),p=n("span"),d=z("Edit"),F=D(),N=n("tbody");for(let e=0;e<w.length;e+=1)w[e].c();this.h()},l(e){se(a.$$.fragment,e),l=T(e),se(f.$$.fragment,e),A=T(e),b=i(e,"A",{href:!0});var v=o(b);j=C(v,"Nieuwe kaart maken"),v.forEach(s),g=T(e),y=i(e,"DIV",{});var L=o(y);k=i(L,"INPUT",{type:!0}),L.forEach(s),B=T(e),h=i(e,"DIV",{class:!0});var $=o(h);_=i($,"DIV",{class:!0});var Q=o(_);E=i(Q,"DIV",{class:!0});var oe=o(E);H=i(oe,"DIV",{class:!0});var ce=o(H);I=i(ce,"TABLE",{class:!0});var ee=o(I);M=i(ee,"THEAD",{class:!0});var ue=o(M);m=i(ue,"TR",{});var G=o(m);S=i(G,"TH",{scope:!0,class:!0});var de=o(S);q=C(de,"Titel"),de.forEach(s),W=T(G),x=i(G,"TH",{scope:!0,class:!0});var fe=o(x);Y=C(fe,"Image"),fe.forEach(s),O=T(G),V=i(G,"TH",{scope:!0,class:!0});var he=o(V);p=i(he,"SPAN",{class:!0});var me=o(p);d=C(me,"Edit"),me.forEach(s),he.forEach(s),G.forEach(s),ue.forEach(s),F=T(ee),N=i(ee,"TBODY",{class:!0});var pe=o(N);for(let te=0;te<w.length;te+=1)w[te].l(pe);pe.forEach(s),ee.forEach(s),ce.forEach(s),oe.forEach(s),Q.forEach(s),$.forEach(s),this.h()},h(){r(b,"href","kaart/maken"),r(k,"type","text"),r(S,"scope","col"),r(S,"class","px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"),r(x,"scope","col"),r(x,"class","px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"),r(p,"class","sr-only"),r(V,"scope","col"),r(V,"class","relative px-6 py-3"),r(M,"class","bg-gray-50"),r(N,"class","bg-white divide-y divide-gray-200"),r(I,"class","min-w-full divide-y divide-gray-200"),r(H,"class","shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"),r(E,"class","py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"),r(_,"class","-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"),r(h,"class","flex flex-col")},m(e,v){re(a,e,v),R(e,l,v),re(f,e,v),R(e,A,v),R(e,b,v),t(b,j),R(e,g,v),R(e,y,v),t(y,k),ke(k,u[0]),R(e,B,v),R(e,h,v),t(h,_),t(_,E),t(E,H),t(H,I),t(I,M),t(M,m),t(m,S),t(S,q),t(m,W),t(m,x),t(x,Y),t(m,O),t(m,V),t(V,p),t(p,d),t(I,F),t(I,N);for(let L=0;L<w.length;L+=1)w[L].m(N,null);U=!0,Z||(P=[xe(k,"input",u[5]),xe(k,"keyup",u[3])],Z=!0)},p(e,[v]){const L={};if(!c&&v&4&&(c=!0,L.breadcrumbs=e[2],je(()=>c=!1)),a.$set(L),v&1&&k.value!==e[0]&&ke(k,e[0]),v&2){K=e[1];let $;for($=0;$<K.length;$+=1){const Q=we(e,K,$);w[$]?w[$].p(Q,v):(w[$]=ye(Q),w[$].c(),w[$].m(N,null))}for(;$<w.length;$+=1)w[$].d(1);w.length=K.length}},i(e){U||(le(a.$$.fragment,e),le(f.$$.fragment,e),U=!0)},o(e){ne(a.$$.fragment,e),ne(f.$$.fragment,e),U=!1},d(e){ie(a,e),e&&s(l),ie(f,e),e&&s(A),e&&s(b),e&&s(g),e&&s(y),e&&s(B),e&&s(h),Ie(w,e),Z=!1,De(P)}}}function Ce(u,a,c){let l;Te(u,Ne,h=>c(7,l=h));let f,A=He(l.environment),b="",j=[],g=[{url:"/beheer",value:"Beheer"},{url:"/beheer/kaart",value:"Kaarten"}];Ae(async()=>{f=Me().initIndex(A),await y()});async function y(){const h=await f.search(b);c(1,j=h.hits)}function k(h){g=h,c(2,g)}function B(){b=this.value,c(0,b)}return[b,j,g,y,k,B]}class Pe extends _e{constructor(a){super();ve(this,a,Ce,ze,be,{})}}function Ke(u){let a,c;return a=new Pe({}),{c(){ae(a.$$.fragment)},l(l){se(a.$$.fragment,l)},m(l,f){re(a,l,f),c=!0},p:Se,i(l){c||(le(a.$$.fragment,l),c=!0)},o(l){ne(a.$$.fragment,l),c=!1},d(l){ie(a,l)}}}class Ge extends _e{constructor(a){super();ve(this,a,null,Ke,be,{})}}export{Ge as default};