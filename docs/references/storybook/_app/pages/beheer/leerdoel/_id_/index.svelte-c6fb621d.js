import{S as _,i as y,s as k,O as r,l as p,f as h,d as g,M as u}from"../../../../chunks/vendor-ef0a5b69.js";/* empty css                                                            */import{p as j}from"../../../../chunks/stores-2d9a71bb.js";import{f as x}from"../../../../chunks/store-6c10047c.js";function m(a){return{c:r,l:r,m:r,d:r}}function S(a){let s,e=a[0]&&m();return{c(){e&&e.c(),s=p()},l(t){e&&e.l(t),s=p()},m(t,i){e&&e.m(t,i),h(t,s,i)},p(t,[i]){t[0]?e||(e=m(),e.c(),e.m(s.parentNode,s)):e&&(e.d(1),e=null)},i:r,o:r,d(t){e&&e.d(t),t&&g(s)}}}function v(a,s,e){let t,i;u(a,j,o=>e(4,t=o)),u(a,x,o=>e(1,i=o));let n,f,c=!1;async function b(){let l=(await n.firestore()).collection("goal").doc(t.params.id),d=await l.get();d.exists&&(f=d.data(),f.id=l.id)}return a.$$.update=()=>{a.$$.dirty&2&&(async()=>{i&&(n=i,await b(),e(0,c=!0))})()},[c,i]}class C extends _{constructor(s){super();y(this,s,v,S,k,{})}}export{C as default};