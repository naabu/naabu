import{S as b,i as d,s as y,M as c}from"./vendor-9a64f523.js";import{s as j}from"./stores-bd9665ba.js";import{f as S}from"./store-b78dac0d.js";import{r as w}from"./helper-13ceec00.js";function _(s,i,e){let n,r;c(s,j,t=>e(5,n=t)),c(s,S,t=>e(4,r=t));let{firebase:a}=i,{activities:o}=i,{mounted:u=!1}=i,{status:f}=i;async function m(){let t=await a.firestore();n.user&&e(1,o=await w(t,f,n.user.uid))}return s.$$set=t=>{"firebase"in t&&e(0,a=t.firebase),"activities"in t&&e(1,o=t.activities),"mounted"in t&&e(2,u=t.mounted),"status"in t&&e(3,f=t.status)},s.$$.update=()=>{s.$$.dirty&16&&(async()=>{r&&(e(0,a=r),await m(),e(2,u=!0))})()},[a,o,u,f,r]}class A extends b{constructor(i){super();d(this,i,_,null,y,{firebase:0,activities:1,mounted:2,status:3})}}export{A as G};