import{S as C,i as R,s as y,j as S,m as w,o as z,_,x as p,u as b,v as q,l as h,f as E,w as F,d as P,M as k,Y as g,Z as d,r as H}from"../../../../chunks/vendor-ef0a5b69.js";import{E as M}from"../../../../chunks/edit-21428d00.js";import{p as N}from"../../../../chunks/stores-2d9a71bb.js";import{f as W}from"../../../../chunks/store-6c10047c.js";import"../../../../chunks/checkPlayerHasProfile-5552aa6e.js";import"../../../../chunks/form-bd5287f8.js";import"../../../../chunks/quizzesForm-6a31a65a.js";import"../../../../chunks/dialog-12cfde9a.js";import"../../../../chunks/helper-821c0d77.js";import"../../../../chunks/goal-e580c954.js";import"../../../../chunks/tabs-86d92abc.js";import"../../../../chunks/navigation-51f4a605.js";import"../../../../chunks/singletons-12a22614.js";/* empty css                                                            */import"../../../../chunks/resultFeedback-cc00a4e5.js";import"../../../../chunks/helper-d6a45b8d.js";function j(r){let t,o,e,s,n;function l(a){r[5](a)}function f(a){r[6](a)}function m(a){r[7](a)}let u={};return r[1]!==void 0&&(u.goalRef=r[1]),r[2]!==void 0&&(u.battleCol=r[2]),r[0]!==void 0&&(u.firebase=r[0]),t=new M({props:u}),g.push(()=>d(t,"goalRef",l)),g.push(()=>d(t,"battleCol",f)),g.push(()=>d(t,"firebase",m)),{c(){S(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,i){z(t,a,i),n=!0},p(a,i){const c={};!o&&i&2&&(o=!0,c.goalRef=a[1],_(()=>o=!1)),!e&&i&4&&(e=!0,c.battleCol=a[2],_(()=>e=!1)),!s&&i&1&&(s=!0,c.firebase=a[0],_(()=>s=!1)),t.$set(c)},i(a){n||(p(t.$$.fragment,a),n=!0)},o(a){b(t.$$.fragment,a),n=!1},d(a){q(t,a)}}}function Y(r){let t,o,e=r[0]&&r[1]&&j(r);return{c(){e&&e.c(),t=h()},l(s){e&&e.l(s),t=h()},m(s,n){e&&e.m(s,n),E(s,t,n),o=!0},p(s,[n]){s[0]&&s[1]?e?(e.p(s,n),n&3&&p(e,1)):(e=j(s),e.c(),p(e,1),e.m(t.parentNode,t)):e&&(H(),b(e,1,1,()=>{e=null}),F())},i(s){o||(p(e),o=!0)},o(s){b(e),o=!1},d(s){e&&e.d(s),s&&P(t)}}}function Z(r,t,o){let e,s;k(r,N,i=>o(3,e=i)),k(r,W,i=>o(4,s=i));let n,l,f;function m(i){l=i,o(1,l),o(4,s),o(0,n),o(3,e)}function u(i){f=i,o(2,f),o(4,s),o(0,n),o(3,e)}function a(i){n=i,o(0,n),o(4,s),o(3,e)}return r.$$.update=()=>{r.$$.dirty&25&&(async()=>{if(s){o(0,n=s);let i=await n.firestore();o(1,l=i.collection("goals").doc(e.params.id)),o(2,f=i.collection("goals/"+e.params.id+"/battles"))}})()},[n,l,f,e,s,m,u,a]}class $ extends C{constructor(t){super();R(this,t,Z,Y,y,{})}}export{$ as default};