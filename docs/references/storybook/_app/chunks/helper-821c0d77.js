import{a1 as a,a2 as l}from"./vendor-ef0a5b69.js";function u(t,e){const i=new l,r=i.diff_main(t,e);return i.diff_cleanupSemantic(r),i.diff_prettyHtml(r)}function g(t){if(t){let e=t;return e=e.replace(/\$\$((.|\r\n|\r|\n)+?)\$\$/g,function(i,r){let n=r;r=r.replace(/(\r\n|\r|\n)/g," ");try{n=a.renderToString(r)}catch(f){if(f instanceof a.ParseError)n=("Error in KaTeX '"+r+"': "+f.message).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n="<div class='text-red-700'>"+n+"</div>";else throw f}return n}),e=e.replace(/(\r\n|\r|\n)(?![^<]*>|[^<>]*<\/)/g,"<br>"),e}else return""}function c(t){let e=new Date(t*1e3);const i=s=>`0${s}`.slice(-2);let r=[e.getDate(),e.getMonth()+1].map(i).join("-"),n=[e.getHours(),e.getMinutes(),e.getSeconds()].map(i).join(":");return r+"-"+e.getFullYear()+" "+n}function m(t,e){return t&&(t.length>e?t.substr(0,e-1)+"&hellip;":t)}function d(t,e,i){if(t){let r=e.firestore.Timestamp.now().seconds;return i.format(t*1e3,{now:r*1e3})}return"onbekend"}function p(t,e,i,r){return t&&e?r.format(e*1e3,{now:t*1e3}):"onbekend"}function S(t,e,i,r){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;if(i&&r){if(i.length!==r.length)return!1;for(let n=0;n<i.length;n++)if(i[n]!==r[n])return!1}return!0}async function h(){return{success:!1,successMessage:"",error:!1,errorCode:"",errorMessage:""}}export{h as a,p as b,u as c,S as d,d as f,c as g,g as r,m as t};