import{S as z,i as F,s as L,j as _,k as M,m as h,n as P,o as k,f as g,_ as j,x as f,u as l,v as $,d as w,l as S,w as B,M as H,Y as v,Z as y,r as N}from"../../../chunks/vendor-ef0a5b69.js";import{C as Y}from"../../../chunks/create-eba036e3.js";import{f as Z}from"../../../chunks/store-6c10047c.js";import{S as A}from"../../../chunks/show-4db925d1.js";import"../../../chunks/stores-2d9a71bb.js";import"../../../chunks/checkPlayerHasProfile-5552aa6e.js";import"../../../chunks/form-bd5287f8.js";import"../../../chunks/quizzesForm-6a31a65a.js";import"../../../chunks/dialog-12cfde9a.js";import"../../../chunks/helper-821c0d77.js";import"../../../chunks/resultFeedback-cc00a4e5.js";import"../../../chunks/helper-d6a45b8d.js";import"../../../chunks/navigation-51f4a605.js";import"../../../chunks/singletons-12a22614.js";function C(o){let a,n,e,r,t,c;function m(s){o[3](s)}let i={};o[1]!==void 0&&(i.breadcrumbs=o[1]),a=new A({props:i}),v.push(()=>y(a,"breadcrumbs",m));function q(s){o[4](s)}let b={};return o[0]!==void 0&&(b.firebase=o[0]),r=new Y({props:b}),v.push(()=>y(r,"firebase",q)),{c(){_(a.$$.fragment),e=M(),_(r.$$.fragment)},l(s){h(a.$$.fragment,s),e=P(s),h(r.$$.fragment,s)},m(s,u){k(a,s,u),g(s,e,u),k(r,s,u),c=!0},p(s,u){const p={};!n&&u&2&&(n=!0,p.breadcrumbs=s[1],j(()=>n=!1)),a.$set(p);const d={};!t&&u&1&&(t=!0,d.firebase=s[0],j(()=>t=!1)),r.$set(d)},i(s){c||(f(a.$$.fragment,s),f(r.$$.fragment,s),c=!0)},o(s){l(a.$$.fragment,s),l(r.$$.fragment,s),c=!1},d(s){$(a,s),s&&w(e),$(r,s)}}}function D(o){let a,n,e=o[0]&&C(o);return{c(){e&&e.c(),a=S()},l(r){e&&e.l(r),a=S()},m(r,t){e&&e.m(r,t),g(r,a,t),n=!0},p(r,[t]){r[0]?e?(e.p(r,t),t&1&&f(e,1)):(e=C(r),e.c(),f(e,1),e.m(a.parentNode,a)):e&&(N(),l(e,1,1,()=>{e=null}),B())},i(r){n||(f(e),n=!0)},o(r){l(e),n=!1},d(r){e&&e.d(r),r&&w(a)}}}function E(o,a,n){let e;H(o,Z,i=>n(2,e=i));let r,t=[{url:"/beheer",value:"Beheer"},{url:"/beheer/leerdoel",value:"Leerdoel"},{url:"/beheer/leerdoel/maken",value:"Leerdoel maken"}];function c(i){t=i,n(1,t)}function m(i){r=i,n(0,r),n(2,e)}return o.$$.update=()=>{o.$$.dirty&4&&(async()=>{e&&n(0,r=e)})()},[r,t,e,c,m]}class re extends z{constructor(a){super();F(this,a,E,D,L,{})}}export{re as default};