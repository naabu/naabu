import{_ as A,a as T,e as Q,g as Z,c as v,d as g,b as j,f as fe}from"./index.esm-dda1bb38.js";import{f as Iw}from"./index.esm-dda1bb38.js";import"./auth.esm-1e275db3.js";import{K as ef,Q as tf,_ as rf}from"./index-305d52cd.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ia={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _=function(t,e){if(!t)throw Ht(e)},Ht=function(t){return new Error("Firebase Database ("+ia.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oa=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var i=t.charCodeAt(n);i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):(i&64512)==55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)==56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e},nf=function(t){for(var e=[],r=0,n=0;r<t.length;){var i=t[r++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){var o=t[r++];e[n++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){var o=t[r++],a=t[r++],s=t[r++],u=((i&7)<<18|(o&63)<<12|(a&63)<<6|s&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{var o=t[r++],a=t[r++];e[n++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Xn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],i=0;i<t.length;i+=3){var o=t[i],a=i+1<t.length,s=a?t[i+1]:0,u=i+2<t.length,l=u?t[i+2]:0,c=o>>2,f=(o&3)<<4|s>>4,h=(s&15)<<2|l>>6,d=l&63;u||(d=64,a||(h=64)),n.push(r[c],r[f],r[h],r[d])}return n.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(oa(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):nf(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],i=0;i<t.length;){var o=r[t.charAt(i++)],a=i<t.length,s=a?r[t.charAt(i)]:0;++i;var u=i<t.length,l=u?r[t.charAt(i)]:64;++i;var c=i<t.length,f=c?r[t.charAt(i)]:64;if(++i,o==null||s==null||l==null||f==null)throw Error();var h=o<<2|s>>4;if(n.push(h),l!==64){var d=s<<4&240|l>>2;if(n.push(d),f!==64){var p=l<<6&192|f;n.push(p)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},aa=function(t){var e=oa(t);return Xn.encodeByteArray(e,!0)},sa=function(t){return aa(t).replace(/\./g,"")},ua=function(t){try{return Xn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(t){return la(void 0,t)}function la(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:var r=e;return new Date(r.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(var n in e)!e.hasOwnProperty(n)||!af(n)||(t[n]=la(t[n],e[n]));return t}function af(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var he=function(){function t(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(r,n){e.resolve=r,e.reject=n})}return t.prototype.wrapCallback=function(e){var r=this;return function(n,i){n?r.reject(n):r.resolve(i),typeof e=="function"&&(r.promise.catch(function(){}),e.length===1?e(n):e(n,i))}},t}();/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var r={alg:"none",type:"JWT"},n=e||"demo-project",i=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var a=T({iss:"https://securetoken.google.com/"+n,aud:n,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},t),s="";return[sa(JSON.stringify(r)),sa(JSON.stringify(a)),s].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ca(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(uf())}function lf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fa(){return ia.NODE_ADMIN===!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cf="FirebaseError",ff=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=cf,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,hf.prototype.create),o}return e}(Error),hf=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?df(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new ff(o,u,i);return l},t}();function df(t,e){return t.replace(pf,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var pf=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(t){return JSON.parse(t)}function G(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ha=function(t){var e={},r={},n={},i="";try{var o=t.split(".");e=ar(ua(o[0])||""),r=ar(ua(o[1])||""),i=o[2],n=r.d||{},delete r.d}catch{}return{header:e,claims:r,data:n,signature:i}},vf=function(t){var e=ha(t),r=e.claims;return!!r&&typeof r=="object"&&r.hasOwnProperty("iat")},gf=function(t){var e=ha(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function vt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Jn(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Wr(t,e,r){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=e.call(r,t[i],i,t));return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(t){for(var e=[],r=function(u,l){Array.isArray(l)?l.forEach(function(c){e.push(encodeURIComponent(u)+"="+encodeURIComponent(c))}):e.push(encodeURIComponent(u)+"="+encodeURIComponent(l))},n=0,i=Object.entries(t);n<i.length;n++){var o=i[n],a=o[0],s=o[1];r(a,s)}return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mf=function(){function t(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(var e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}return t.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},t.prototype.compress_=function(e,r){r||(r=0);var n=this.W_;if(typeof e=="string")for(var i=0;i<16;i++)n[i]=e.charCodeAt(r)<<24|e.charCodeAt(r+1)<<16|e.charCodeAt(r+2)<<8|e.charCodeAt(r+3),r+=4;else for(var i=0;i<16;i++)n[i]=e[r]<<24|e[r+1]<<16|e[r+2]<<8|e[r+3],r+=4;for(var i=16;i<80;i++){var o=n[i-3]^n[i-8]^n[i-14]^n[i-16];n[i]=(o<<1|o>>>31)&4294967295}for(var a=this.chain_[0],s=this.chain_[1],u=this.chain_[2],l=this.chain_[3],c=this.chain_[4],f,h,i=0;i<80;i++){i<40?i<20?(f=l^s&(u^l),h=1518500249):(f=s^u^l,h=1859775393):i<60?(f=s&u|l&(s|u),h=2400959708):(f=s^u^l,h=3395469782);var o=(a<<5|a>>>27)+f+c+h+n[i]&4294967295;c=l,l=u,u=(s<<30|s>>>2)&4294967295,s=a,a=o}this.chain_[0]=this.chain_[0]+a&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295},t.prototype.update=function(e,r){if(e!=null){r===void 0&&(r=e.length);for(var n=r-this.blockSize,i=0,o=this.buf_,a=this.inbuf_;i<r;){if(a===0)for(;i<=n;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<r;)if(o[a]=e.charCodeAt(i),++a,++i,a===this.blockSize){this.compress_(o),a=0;break}}else for(;i<r;)if(o[a]=e[i],++a,++i,a===this.blockSize){this.compress_(o),a=0;break}}this.inbuf_=a,this.total_+=r}},t.prototype.digest=function(){var e=[],r=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var n=this.blockSize-1;n>=56;n--)this.buf_[n]=r&255,r/=256;this.compress_(this.buf_);for(var i=0,n=0;n<5;n++)for(var o=24;o>=0;o-=8)e[i]=this.chain_[n]>>o&255,++i;return e},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var b=function(t,e,r,n){var i;if(n<e?i="at least "+e:n>r&&(i=r===0?"none":"no more than "+r),i){var o=t+" failed: Was called with "+n+(n===1?" argument.":" arguments.")+" Expects "+i+".";throw new Error(o)}};function de(t,e){return t+" failed: "+e+" argument "}function Y(t,e,r,n){if(!(n&&!r)&&typeof r!="function")throw new Error(de(t,e)+"must be a valid function.")}function da(t,e,r,n){if(!(n&&!r)&&(typeof r!="object"||r===null))throw new Error(de(t,e)+"must be a valid context object.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yf=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var i=t.charCodeAt(n);if(i>=55296&&i<=56319){var o=i-55296;n++,_(n<t.length,"Surrogate pair missing trail surrogate.");var a=t.charCodeAt(n)-56320;i=65536+(o<<10)+a}i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):i<65536?(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e},Vr=function(t){for(var e=0,r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e++:n<2048?e+=2:n>=55296&&n<=56319?(e+=4,r++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t){return t&&t._delegate?t._delegate:t}var pa=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var va=function(){function t(e,r){this.name=e,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return t.prototype.get=function(e){var r=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(r)){var n=new he;if(this.instancesDeferred.set(r,n),this.isInitialized(r)||this.shouldAutoInitialize())try{var i=this.getOrInitializeService({instanceIdentifier:r});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(r).promise},t.prototype.getImmediate=function(e){var r,n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(r=e==null?void 0:e.optional)!==null&&r!==void 0?r:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error("Service "+this.name+" is not available")}},t.prototype.getComponent=function(){return this.component},t.prototype.setComponent=function(e){var r,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,!!this.shouldAutoInitialize()){if(bf(e))try{this.getOrInitializeService({instanceIdentifier:gt})}catch{}try{for(var i=Q(this.instancesDeferred.entries()),o=i.next();!o.done;o=i.next()){var a=Z(o.value,2),s=a[0],u=a[1],l=this.normalizeInstanceIdentifier(s);try{var c=this.getOrInitializeService({instanceIdentifier:l});u.resolve(c)}catch{}}}catch(f){r={error:f}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}}},t.prototype.clearInstance=function(e){e===void 0&&(e=gt),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},t.prototype.delete=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(j(j([],Z(e.filter(function(n){return"INTERNAL"in n}).map(function(n){return n.INTERNAL.delete()}))),Z(e.filter(function(n){return"_delete"in n}).map(function(n){return n._delete()}))))];case 1:return r.sent(),[2]}})})},t.prototype.isComponentSet=function(){return this.component!=null},t.prototype.isInitialized=function(e){return e===void 0&&(e=gt),this.instances.has(e)},t.prototype.getOptions=function(e){return e===void 0&&(e=gt),this.instancesOptions.get(e)||{}},t.prototype.initialize=function(e){var r,n;e===void 0&&(e={});var i=e.options,o=i===void 0?{}:i,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(this.name+"("+a+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var s=this.getOrInitializeService({instanceIdentifier:a,options:o});try{for(var u=Q(this.instancesDeferred.entries()),l=u.next();!l.done;l=u.next()){var c=Z(l.value,2),f=c[0],h=c[1],d=this.normalizeInstanceIdentifier(f);a===d&&h.resolve(s)}}catch(p){r={error:p}}finally{try{l&&!l.done&&(n=u.return)&&n.call(u)}finally{if(r)throw r.error}}return s},t.prototype.onInit=function(e,r){var n,i=this.normalizeInstanceIdentifier(r),o=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;o.add(e),this.onInitCallbacks.set(i,o);var a=this.instances.get(i);return a&&e(a,i),function(){o.delete(e)}},t.prototype.invokeOnInitCallbacks=function(e,r){var n,i,o=this.onInitCallbacks.get(r);if(!!o)try{for(var a=Q(o),s=a.next();!s.done;s=a.next()){var u=s.value;try{u(e,r)}catch{}}}catch(l){n={error:l}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}},t.prototype.getOrInitializeService=function(e){var r=e.instanceIdentifier,n=e.options,i=n===void 0?{}:n,o=this.instances.get(r);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:Ef(r),options:i}),this.instances.set(r,o),this.instancesOptions.set(r,i),this.invokeOnInitCallbacks(o,r),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,r,o)}catch{}return o||null},t.prototype.normalizeInstanceIdentifier=function(e){return e===void 0&&(e=gt),this.component?this.component.multipleInstances?e:gt:e},t.prototype.shouldAutoInitialize=function(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"},t}();function Ef(t){return t===gt?void 0:t}function bf(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tf=function(){function t(e){this.name=e,this.providers=new Map}return t.prototype.addComponent=function(e){var r=this.getProvider(e.name);if(r.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);r.setComponent(e)},t.prototype.addOrOverwriteComponent=function(e){var r=this.getProvider(e.name);r.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},t.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var r=new va(e,this);return this.providers.set(e,r),r},t.prototype.getProviders=function(){return Array.from(this.providers.values())},t}();/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function Ae(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),i=0,e=0;e<r;e++)for(var o=arguments[e],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _t,x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));var wf={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},Cf=x.INFO,Sf=(_t={},_t[x.DEBUG]="log",_t[x.VERBOSE]="log",_t[x.INFO]="info",_t[x.WARN]="warn",_t[x.ERROR]="error",_t),If=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=new Date().toISOString(),o=Sf[e];if(o)console[o].apply(console,Ae(["["+i+"]  "+t.name+":"],r));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},Rf=function(){function t(e){this.name=e,this._logLevel=Cf,this._logHandler=If,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in x))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?wf[e]:e},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Ae([this,x.DEBUG],e)),this._logHandler.apply(this,Ae([this,x.DEBUG],e))},t.prototype.log=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Ae([this,x.VERBOSE],e)),this._logHandler.apply(this,Ae([this,x.VERBOSE],e))},t.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Ae([this,x.INFO],e)),this._logHandler.apply(this,Ae([this,x.INFO],e))},t.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Ae([this,x.WARN],e)),this._logHandler.apply(this,Ae([this,x.WARN],e))},t.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Ae([this,x.ERROR],e)),this._logHandler.apply(this,Ae([this,x.ERROR],e))},t}(),Af="@firebase/database",kf="0.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ga="";function _a(t){ga=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nf=function(){function t(e){this.domStorage_=e,this.prefix_="firebase:"}return t.prototype.set=function(e,r){r==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),G(r))},t.prototype.get=function(e){var r=this.domStorage_.getItem(this.prefixedName_(e));return r==null?null:ar(r)},t.prototype.remove=function(e){this.domStorage_.removeItem(this.prefixedName_(e))},t.prototype.prefixedName_=function(e){return this.prefix_+e},t.prototype.toString=function(){return this.domStorage_.toString()},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Of=function(){function t(){this.cache_={},this.isInMemoryStorage=!0}return t.prototype.set=function(e,r){r==null?delete this.cache_[e]:this.cache_[e]=r},t.prototype.get=function(e){return Re(this.cache_,e)?this.cache_[e]:null},t.prototype.remove=function(e){delete this.cache_[e]},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ma=function(t){try{if(typeof window!="undefined"&&typeof window[t]!="undefined"){var e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Nf(e)}}catch{}return new Of},mt=ma("localStorage"),Zn=ma("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wt=new Rf("@firebase/database"),ya=function(){var t=1;return function(){return t++}}(),Ea=function(t){var e=yf(t),r=new mf;r.update(e);var n=r.digest();return Xn.encodeByteArray(n)},sr=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r="",n=0;n<t.length;n++){var i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?r+=sr.apply(null,i):typeof i=="object"?r+=G(i):r+=i,r+=" "}return r},yt=null,ba=!0,Ta=function(t,e){_(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(Wt.logLevel=x.VERBOSE,yt=Wt.log.bind(Wt),e&&Zn.set("logging_enabled",!0)):typeof t=="function"?yt=t:(yt=null,Zn.remove("logging_enabled"))},X=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(ba===!0&&(ba=!1,yt===null&&Zn.get("logging_enabled")===!0&&Ta(!0)),yt){var r=sr.apply(null,t);yt(r)}},ur=function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];X.apply(void 0,j([t],Z(e)))}},ei=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r="FIREBASE INTERNAL ERROR: "+sr.apply(void 0,j([],Z(t)));Wt.error(r)},Be=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r="FIREBASE FATAL ERROR: "+sr.apply(void 0,j([],Z(t)));throw Wt.error(r),new Error(r)},ee=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r="FIREBASE WARNING: "+sr.apply(void 0,j([],Z(t)));Wt.warn(r)},Pf=function(){typeof window!="undefined"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ee("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},jr=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Mf=function(t){if(document.readyState==="complete")t();else{var e=!1,r=function(){if(!document.body){setTimeout(r,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",r,!1),window.addEventListener("load",r,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&r()}),window.attachEvent("onload",r))}},ze="[MIN_NAME]",He="[MAX_NAME]",Et=function(t,e){if(t===e)return 0;if(t===ze||e===He)return-1;if(e===ze||t===He)return 1;var r=$r(t),n=$r(e);return r!==null?n!==null?r-n==0?t.length-e.length:r-n:-1:n!==null?1:t<e?-1:1},Df=function(t,e){return t===e?0:t<e?-1:1},lr=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+G(e))},ti=function(t){if(typeof t!="object"||t===null)return G(t);var e=[];for(var r in t)e.push(r);e.sort();for(var n="{",i=0;i<e.length;i++)i!==0&&(n+=","),n+=G(e[i]),n+=":",n+=ti(t[e[i]]);return n+="}",n},wa=function(t,e){var r=t.length;if(r<=e)return[t];for(var n=[],i=0;i<r;i+=e)i+e>r?n.push(t.substring(i,r)):n.push(t.substring(i,i+e));return n};function q(t,e){for(var r in t)t.hasOwnProperty(r)&&e(r,t[r])}var Ca=function(t){_(!jr(t),"Invalid JSON number");var e=11,r=52,n=(1<<e-1)-1,i,o,a,s,u;t===0?(o=0,a=0,i=1/t==-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-n)?(s=Math.min(Math.floor(Math.log(t)/Math.LN2),n),o=s+n,a=Math.round(t*Math.pow(2,r-s)-Math.pow(2,r))):(o=0,a=Math.round(t/Math.pow(2,1-n-r))));var l=[];for(u=r;u;u-=1)l.push(a%2?1:0),a=Math.floor(a/2);for(u=e;u;u-=1)l.push(o%2?1:0),o=Math.floor(o/2);l.push(i?1:0),l.reverse();var c=l.join(""),f="";for(u=0;u<64;u+=8){var h=parseInt(c.substr(u,8),2).toString(16);h.length===1&&(h="0"+h),f=f+h}return f.toLowerCase()},xf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Lf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ff(t,e){var r="Unknown Error";t==="too_big"?r="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?r="Client doesn't have permission to access the desired data.":t==="unavailable"&&(r="The service is unavailable");var n=new Error(t+" at "+e._path.toString()+": "+r);return n.code=t.toUpperCase(),n}var Uf=new RegExp("^-?(0*)\\d{1,10}$"),Sa=-2147483648,ri=2147483647,$r=function(t){if(Uf.test(t)){var e=Number(t);if(e>=Sa&&e<=ri)return e}return null},Vt=function(t){try{t()}catch(e){setTimeout(function(){var r=e.stack||"";throw ee("Exception was thrown by user callback.",r),e},Math.floor(0))}},Bf=function(){var t=typeof window=="object"&&window.navigator&&window.navigator.userAgent||"";return t.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},cr=function(t,e){var r=setTimeout(t,e);return typeof r=="object"&&r.unref&&r.unref(),r};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hf=function(){function t(e,r){var n=this;this.appName_=e,this.appCheckProvider=r,this.appCheck=r==null?void 0:r.getImmediate({optional:!0}),this.appCheck||r==null||r.get().then(function(i){return n.appCheck=i})}return t.prototype.getToken=function(e){var r=this;return this.appCheck?this.appCheck.getToken(e):new Promise(function(n,i){setTimeout(function(){r.appCheck?r.getToken(e).then(n,i):n(null)},0)})},t.prototype.addTokenChangeListener=function(e){var r;(r=this.appCheckProvider)===null||r===void 0||r.get().then(function(n){return n.addTokenListener(e)})},t.prototype.notifyForInvalidToken=function(){ee('Provided AppCheck credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly.')},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wf=function(){function t(e,r,n){var i=this;this.appName_=e,this.firebaseOptions_=r,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(function(o){return i.auth_=o})}return t.prototype.getToken=function(e){var r=this;return this.auth_?this.auth_.getToken(e).catch(function(n){return n&&n.code==="auth/token-not-initialized"?(X("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)}):new Promise(function(n,i){setTimeout(function(){r.auth_?r.getToken(e).then(n,i):n(null)},0)})},t.prototype.addTokenChangeListener=function(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(function(r){return r.addAuthTokenListener(e)})},t.prototype.removeTokenChangeListener=function(e){this.authProvider_.get().then(function(r){return r.removeAuthTokenListener(e)})},t.prototype.notifyForInvalidToken=function(){var e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ee(e)},t}(),fr=function(){function t(e){this.accessToken=e}return t.prototype.getToken=function(e){return Promise.resolve({accessToken:this.accessToken})},t.prototype.addTokenChangeListener=function(e){e(this.accessToken)},t.prototype.removeTokenChangeListener=function(e){},t.prototype.notifyForInvalidToken=function(){},t.OWNER="owner",t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ni="5",Ia="v",Ra="s",Aa="r",ka="f",Na=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Oa="ls",Vf="p",ii="ac",Pa="websocket",Ma="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oi=function(){function t(e,r,n,i,o,a,s){o===void 0&&(o=!1),a===void 0&&(a=""),s===void 0&&(s=!1),this.secure=r,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=o,this.persistenceKey=a,this.includeNamespaceInQueryParams=s,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=mt.get("host:"+e)||this._host}return t.prototype.isCacheableHost=function(){return this.internalHost.substr(0,2)==="s-"},t.prototype.isCustomHost=function(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"},Object.defineProperty(t.prototype,"host",{get:function(){return this._host},set:function(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&mt.set("host:"+this._host,this.internalHost))},enumerable:!1,configurable:!0}),t.prototype.toString=function(){var e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e},t.prototype.toURLString=function(){var e=this.secure?"https://":"http://",r=this.includeNamespaceInQueryParams?"?ns="+this.namespace:"";return""+e+this.host+"/"+r},t}();function jf(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Da(t,e,r){_(typeof e=="string","typeof type must == string"),_(typeof r=="object","typeof params must == object");var n;if(e===Pa)n=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Ma)n=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);jf(t)&&(r.ns=t.namespace);var i=[];return q(r,function(o,a){i.push(o+"="+a)}),n+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $f=function(){function t(){this.counters_={}}return t.prototype.incrementCounter=function(e,r){r===void 0&&(r=1),Re(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=r},t.prototype.get=function(){return of(this.counters_)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ai={},si={};function ui(t){var e=t.toString();return ai[e]||(ai[e]=new $f),ai[e]}function Gf(t,e){var r=t.toString();return si[r]||(si[r]=e()),si[r]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qf=function(){function t(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}return t.prototype.closeAfter=function(e,r){this.closeAfterResponse=e,this.onClose=r,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)},t.prototype.handleResponse=function(e,r){var n=this;this.pendingResponses[e]=r;for(var i=function(){var s=o.pendingResponses[o.currentResponseNum];delete o.pendingResponses[o.currentResponseNum];for(var u=function(c){s[c]&&Vt(function(){n.onMessage_(s[c])})},l=0;l<s.length;++l)u(l);if(o.currentResponseNum===o.closeAfterResponse)return o.onClose&&(o.onClose(),o.onClose=null),"break";o.currentResponseNum++},o=this;this.pendingResponses[this.currentResponseNum];){var a=i();if(a==="break")break}},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xa="start",zf="close",Kf="pLPCommand",Qf="pRTLPCB",La="id",Fa="pw",Ua="ser",Yf="cb",Xf="seg",Jf="ts",Zf="d",eh="dframe",Ba=1870,Ha=30,th=Ba-Ha,rh=25e3,nh=3e4,li=function(){function t(e,r,n,i,o,a,s){var u=this;this.connId=e,this.repoInfo=r,this.applicationId=n,this.appCheckToken=i,this.authToken=o,this.transportSessionId=a,this.lastSessionId=s,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ur(e),this.stats_=ui(r),this.urlFn=function(l){return u.appCheckToken&&(l[ii]=u.appCheckToken),Da(r,Ma,l)}}return t.prototype.open=function(e,r){var n=this;this.curSegmentNum=0,this.onDisconnect_=r,this.myPacketOrderer=new qf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(function(){n.log_("Timed out trying to connect."),n.onClosed_(),n.connectTimeoutTimer_=null},Math.floor(nh)),Mf(function(){if(!n.isClosed_){n.scriptTagHolder=new ih(function(){for(var a=[],s=0;s<arguments.length;s++)a[s]=arguments[s];var u=Z(a,5),l=u[0],c=u[1],f=u[2];if(u[3],u[4],n.incrementIncomingBytes_(a),!!n.scriptTagHolder)if(n.connectTimeoutTimer_&&(clearTimeout(n.connectTimeoutTimer_),n.connectTimeoutTimer_=null),n.everConnected_=!0,l===xa)n.id=c,n.password=f;else if(l===zf)c?(n.scriptTagHolder.sendNewPolls=!1,n.myPacketOrderer.closeAfter(c,function(){n.onClosed_()})):n.onClosed_();else throw new Error("Unrecognized command received: "+l)},function(){for(var a=[],s=0;s<arguments.length;s++)a[s]=arguments[s];var u=Z(a,2),l=u[0],c=u[1];n.incrementIncomingBytes_(a),n.myPacketOrderer.handleResponse(l,c)},function(){n.onClosed_()},n.urlFn);var i={};i[xa]="t",i[Ua]=Math.floor(Math.random()*1e8),n.scriptTagHolder.uniqueCallbackIdentifier&&(i[Yf]=n.scriptTagHolder.uniqueCallbackIdentifier),i[Ia]=ni,n.transportSessionId&&(i[Ra]=n.transportSessionId),n.lastSessionId&&(i[Oa]=n.lastSessionId),n.applicationId&&(i[Vf]=n.applicationId),n.appCheckToken&&(i[ii]=n.appCheckToken),typeof location!="undefined"&&location.hostname&&Na.test(location.hostname)&&(i[Aa]=ka);var o=n.urlFn(i);n.log_("Connecting via long-poll to "+o),n.scriptTagHolder.addTag(o,function(){})}})},t.prototype.start=function(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)},t.forceAllow=function(){t.forceAllow_=!0},t.forceDisallow=function(){t.forceDisallow_=!0},t.isAvailable=function(){return t.forceAllow_?!0:!t.forceDisallow_&&typeof document!="undefined"&&document.createElement!=null&&!xf()&&!Lf()},t.prototype.markConnectionHealthy=function(){},t.prototype.shutdown_=function(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)},t.prototype.onClosed_=function(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))},t.prototype.close=function(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())},t.prototype.send=function(e){var r=G(e);this.bytesSent+=r.length,this.stats_.incrementCounter("bytes_sent",r.length);for(var n=aa(r),i=wa(n,th),o=0;o<i.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[o]),this.curSegmentNum++},t.prototype.addDisconnectPingFrame=function(e,r){this.myDisconnFrame=document.createElement("iframe");var n={};n[eh]="t",n[La]=e,n[Fa]=r,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)},t.prototype.incrementIncomingBytes_=function(e){var r=G(e).length;this.bytesReceived+=r,this.stats_.incrementCounter("bytes_received",r)},t}(),ih=function(){function t(e,r,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ya(),window[Kf+this.uniqueCallbackIdentifier]=e,window[Qf+this.uniqueCallbackIdentifier]=r,this.myIFrame=t.createIFrame_();var o="";if(this.myIFrame.src&&this.myIFrame.src.substr(0,"javascript:".length)==="javascript:"){var a=document.domain;o='<script>document.domain="'+a+'";<\/script>'}var s="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(s),this.myIFrame.doc.close()}catch(u){X("frame writing exception"),u.stack&&X(u.stack),X(u)}}}return t.createIFrame_=function(){var e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{var r=e.contentWindow.document;r||X("No IE domain setting required")}catch{var n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e},t.prototype.close=function(){var e=this;this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.innerHTML="",setTimeout(function(){e.myIFrame!==null&&(document.body.removeChild(e.myIFrame),e.myIFrame=null)},Math.floor(0)));var r=this.onDisconnect;r&&(this.onDisconnect=null,r())},t.prototype.startLongPoll=function(e,r){for(this.myID=e,this.myPW=r,this.alive=!0;this.newRequest_(););},t.prototype.newRequest_=function(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;var e={};e[La]=this.myID,e[Fa]=this.myPW,e[Ua]=this.currentSerial;for(var r=this.urlFn(e),n="",i=0;this.pendingSegs.length>0;){var o=this.pendingSegs[0];if(o.d.length+Ha+n.length<=Ba){var a=this.pendingSegs.shift();n=n+"&"+Xf+i+"="+a.seg+"&"+Jf+i+"="+a.ts+"&"+Zf+i+"="+a.d,i++}else break}return r=r+n,this.addLongPollTag_(r,this.currentSerial),!0}else return!1},t.prototype.enqueueSegment=function(e,r,n){this.pendingSegs.push({seg:e,ts:r,d:n}),this.alive&&this.newRequest_()},t.prototype.addLongPollTag_=function(e,r){var n=this;this.outstandingRequests.add(r);var i=function(){n.outstandingRequests.delete(r),n.newRequest_()},o=setTimeout(i,Math.floor(rh)),a=function(){clearTimeout(o),i()};this.addTag(e,a)},t.prototype.addTag=function(e,r){var n=this;setTimeout(function(){try{if(!n.sendNewPolls)return;var i=n.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){var o=i.readyState;(!o||o==="loaded"||o==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),r())},i.onerror=function(){X("Long-poll script failed to load: "+e),n.sendNewPolls=!1,n.close()},n.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oh=16384,ah=45e3,Gr=null;typeof MozWebSocket!="undefined"?Gr=MozWebSocket:typeof WebSocket!="undefined"&&(Gr=WebSocket);var bt=function(){function t(e,r,n,i,o,a,s){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ur(this.connId),this.stats_=ui(r),this.connURL=t.connectionURL_(r,a,s,i),this.nodeAdmin=r.nodeAdmin}return t.connectionURL_=function(e,r,n,i){var o={};return o[Ia]=ni,typeof location!="undefined"&&location.hostname&&Na.test(location.hostname)&&(o[Aa]=ka),r&&(o[Ra]=r),n&&(o[Oa]=n),i&&(o[ii]=i),Da(e,Pa,o)},t.prototype.open=function(e,r){var n=this;this.onDisconnect=r,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,mt.set("previous_websocket_failure",!0);try{var i,o,a,s;if(!fa()){var o={headers:{"X-Firebase-GMPID":this.applicationId||"","X-Firebase-AppCheck":this.appCheckToken||""}};this.mySock=new Gr(this.connURL,[],o)}}catch(l){this.log_("Error instantiating WebSocket.");var u=l.message||l.data;u&&this.log_(u),this.onClosed_();return}this.mySock.onopen=function(){n.log_("Websocket connected."),n.everConnected_=!0},this.mySock.onclose=function(){n.log_("Websocket connection was disconnected."),n.mySock=null,n.onClosed_()},this.mySock.onmessage=function(l){n.handleIncomingFrame(l)},this.mySock.onerror=function(l){n.log_("WebSocket error.  Closing connection.");var c=l.message||l.data;c&&n.log_(c),n.onClosed_()}},t.prototype.start=function(){},t.forceDisallow=function(){t.forceDisallow_=!0},t.isAvailable=function(){var e=!1;if(typeof navigator!="undefined"&&navigator.userAgent){var r=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(r);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&Gr!==null&&!t.forceDisallow_},t.previouslyFailed=function(){return mt.isInMemoryStorage||mt.get("previous_websocket_failure")===!0},t.prototype.markConnectionHealthy=function(){mt.remove("previous_websocket_failure")},t.prototype.appendFrame_=function(e){if(this.frames.push(e),this.frames.length===this.totalFrames){var r=this.frames.join("");this.frames=null;var n=ar(r);this.onMessage(n)}},t.prototype.handleNewFrameCount_=function(e){this.totalFrames=e,this.frames=[]},t.prototype.extractFrameCount_=function(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){var r=Number(e);if(!isNaN(r))return this.handleNewFrameCount_(r),null}return this.handleNewFrameCount_(1),e},t.prototype.handleIncomingFrame=function(e){if(this.mySock!==null){var r=e.data;if(this.bytesReceived+=r.length,this.stats_.incrementCounter("bytes_received",r.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(r);else{var n=this.extractFrameCount_(r);n!==null&&this.appendFrame_(n)}}},t.prototype.send=function(e){this.resetKeepAlive();var r=G(e);this.bytesSent+=r.length,this.stats_.incrementCounter("bytes_sent",r.length);var n=wa(r,oh);n.length>1&&this.sendString_(String(n.length));for(var i=0;i<n.length;i++)this.sendString_(n[i])},t.prototype.shutdown_=function(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)},t.prototype.onClosed_=function(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))},t.prototype.close=function(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())},t.prototype.resetKeepAlive=function(){var e=this;clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(function(){e.mySock&&e.sendString_("0"),e.resetKeepAlive()},Math.floor(ah))},t.prototype.sendString_=function(e){try{this.mySock.send(e)}catch(r){this.log_("Exception thrown from WebSocket.send():",r.message||r.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}},t.responsesRequiredToBeHealthy=2,t.healthyTimeout=3e4,t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sh=function(){function t(e){this.initTransports_(e)}return Object.defineProperty(t,"ALL_TRANSPORTS",{get:function(){return[li,bt]},enumerable:!1,configurable:!0}),t.prototype.initTransports_=function(e){var r,n,i=bt&&bt.isAvailable(),o=i&&!bt.previouslyFailed();if(e.webSocketOnly&&(i||ee("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),o=!0),o)this.transports_=[bt];else{var a=this.transports_=[];try{for(var s=Q(t.ALL_TRANSPORTS),u=s.next();!u.done;u=s.next()){var l=u.value;l&&l.isAvailable()&&a.push(l)}}catch(c){r={error:c}}finally{try{u&&!u.done&&(n=s.return)&&n.call(s)}finally{if(r)throw r.error}}}},t.prototype.initialTransport=function(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")},t.prototype.upgradeTransport=function(){return this.transports_.length>1?this.transports_[1]:null},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var uh=6e4,lh=5e3,ch=10*1024,fh=100*1024,ci="t",Wa="d",hh="s",Va="r",dh="e",ja="o",$a="a",Ga="n",qa="p",ph="h",za=function(){function t(e,r,n,i,o,a,s,u,l,c){this.id=e,this.repoInfo_=r,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=o,this.onMessage_=a,this.onReady_=s,this.onDisconnect_=u,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ur("c:"+this.id+":"),this.transportManager_=new sh(r),this.log_("Connection created"),this.start_()}return t.prototype.start_=function(){var e=this,r=this.transportManager_.initialTransport();this.conn_=new r(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=r.responsesRequiredToBeHealthy||0;var n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(function(){e.conn_&&e.conn_.open(n,i)},Math.floor(0));var o=r.healthyTimeout||0;o>0&&(this.healthyTimeout_=cr(function(){e.healthyTimeout_=null,e.isHealthy_||(e.conn_&&e.conn_.bytesReceived>fh?(e.log_("Connection exceeded healthy timeout but has received "+e.conn_.bytesReceived+" bytes.  Marking connection healthy."),e.isHealthy_=!0,e.conn_.markConnectionHealthy()):e.conn_&&e.conn_.bytesSent>ch?e.log_("Connection exceeded healthy timeout but has sent "+e.conn_.bytesSent+" bytes.  Leaving connection alive."):(e.log_("Closing unhealthy connection after timeout."),e.close()))},Math.floor(o)))},t.prototype.nextTransportId_=function(){return"c:"+this.id+":"+this.connectionCount++},t.prototype.disconnReceiver_=function(e){var r=this;return function(n){e===r.conn_?r.onConnectionLost_(n):e===r.secondaryConn_?(r.log_("Secondary connection lost."),r.onSecondaryConnectionLost_()):r.log_("closing an old connection")}},t.prototype.connReceiver_=function(e){var r=this;return function(n){r.state_!==2&&(e===r.rx_?r.onPrimaryMessageReceived_(n):e===r.secondaryConn_?r.onSecondaryMessageReceived_(n):r.log_("message on old connection"))}},t.prototype.sendRequest=function(e){var r={t:"d",d:e};this.sendData_(r)},t.prototype.tryCleanupConnection=function(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)},t.prototype.onSecondaryControl_=function(e){if(ci in e){var r=e[ci];r===$a?this.upgradeIfSecondaryHealthy_():r===Va?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):r===ja&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}},t.prototype.onSecondaryMessageReceived_=function(e){var r=lr("t",e),n=lr("d",e);if(r==="c")this.onSecondaryControl_(n);else if(r==="d")this.pendingDataMessages.push(n);else throw new Error("Unknown protocol layer: "+r)},t.prototype.upgradeIfSecondaryHealthy_=function(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:qa,d:{}}}))},t.prototype.proceedWithUpgrade_=function(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:$a,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ga,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()},t.prototype.onPrimaryMessageReceived_=function(e){var r=lr("t",e),n=lr("d",e);r==="c"?this.onControl_(n):r==="d"&&this.onDataMessage_(n)},t.prototype.onDataMessage_=function(e){this.onPrimaryResponse_(),this.onMessage_(e)},t.prototype.onPrimaryResponse_=function(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))},t.prototype.onControl_=function(e){var r=lr(ci,e);if(Wa in e){var n=e[Wa];if(r===ph)this.onHandshake_(n);else if(r===Ga){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(var i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else r===hh?this.onConnectionShutdown_(n):r===Va?this.onReset_(n):r===dh?ei("Server Error: "+n):r===ja?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ei("Unknown control packet command: "+r)}},t.prototype.onHandshake_=function(e){var r=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,r),ni!==n&&ee("Protocol version mismatch detected"),this.tryStartUpgrade_())},t.prototype.tryStartUpgrade_=function(){var e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)},t.prototype.startUpgrade_=function(e){var r=this;this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;var n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),cr(function(){r.secondaryConn_&&(r.log_("Timed out trying to upgrade."),r.secondaryConn_.close())},Math.floor(uh))},t.prototype.onReset_=function(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())},t.prototype.onConnectionEstablished_=function(e,r){var n=this;this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(r,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):cr(function(){n.sendPingOnPrimaryIfNecessary_()},Math.floor(lh))},t.prototype.sendPingOnPrimaryIfNecessary_=function(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:qa,d:{}}}))},t.prototype.onSecondaryConnectionLost_=function(){var e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()},t.prototype.onConnectionLost_=function(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(mt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()},t.prototype.onConnectionShutdown_=function(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()},t.prototype.sendData_=function(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)},t.prototype.close=function(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))},t.prototype.closeConnections_=function(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ka=function(){function t(){}return t.prototype.put=function(e,r,n,i){},t.prototype.merge=function(e,r,n,i){},t.prototype.refreshAuthToken=function(e){},t.prototype.refreshAppCheckToken=function(e){},t.prototype.onDisconnectPut=function(e,r,n){},t.prototype.onDisconnectMerge=function(e,r,n){},t.prototype.onDisconnectCancel=function(e,r){},t.prototype.reportStats=function(e){},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qa=function(){function t(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}return t.prototype.trigger=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];if(Array.isArray(this.listeners_[e]))for(var i=j([],Z(this.listeners_[e])),o=0;o<i.length;o++)i[o].callback.apply(i[o].context,r)},t.prototype.on=function(e,r,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:r,context:n});var i=this.getInitialEvent(e);i&&r.apply(n,i)},t.prototype.off=function(e,r,n){this.validateEventType_(e);for(var i=this.listeners_[e]||[],o=0;o<i.length;o++)if(i[o].callback===r&&(!n||n===i[o].context)){i.splice(o,1);return}},t.prototype.validateEventType_=function(e){_(this.allowedEvents_.find(function(r){return r===e}),"Unknown event: "+e)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ya=function(t){A(e,t);function e(){var r=t.call(this,["online"])||this;return r.online_=!0,typeof window!="undefined"&&typeof window.addEventListener!="undefined"&&!ca()&&(window.addEventListener("online",function(){r.online_||(r.online_=!0,r.trigger("online",!0))},!1),window.addEventListener("offline",function(){r.online_&&(r.online_=!1,r.trigger("online",!1))},!1)),r}return e.getInstance=function(){return new e},e.prototype.getInitialEvent=function(r){return _(r==="online","Unknown event type: "+r),[this.online_]},e.prototype.currentlyOnline=function(){return this.online_},e}(Qa);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Xa=32,Ja=768,N=function(){function t(e,r){if(r===void 0){this.pieces_=e.split("/");for(var n=0,i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[n]=this.pieces_[i],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=r}return t.prototype.toString=function(){for(var e="",r=this.pieceNum_;r<this.pieces_.length;r++)this.pieces_[r]!==""&&(e+="/"+this.pieces_[r]);return e||"/"},t}();function k(){return new N("")}function S(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function rt(t){return t.pieces_.length-t.pieceNum_}function D(t){var e=t.pieceNum_;return e<t.pieces_.length&&e++,new N(t.pieces_,e)}function fi(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function vh(t){for(var e="",r=t.pieceNum_;r<t.pieces_.length;r++)t.pieces_[r]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[r])));return e||"/"}function hr(t,e){return e===void 0&&(e=0),t.pieces_.slice(t.pieceNum_+e)}function Za(t){if(t.pieceNum_>=t.pieces_.length)return null;for(var e=[],r=t.pieceNum_;r<t.pieces_.length-1;r++)e.push(t.pieces_[r]);return new N(e,0)}function H(t,e){for(var r=[],n=t.pieceNum_;n<t.pieces_.length;n++)r.push(t.pieces_[n]);if(e instanceof N)for(var n=e.pieceNum_;n<e.pieces_.length;n++)r.push(e.pieces_[n]);else for(var i=e.split("/"),n=0;n<i.length;n++)i[n].length>0&&r.push(i[n]);return new N(r,0)}function I(t){return t.pieceNum_>=t.pieces_.length}function ae(t,e){var r=S(t),n=S(e);if(r===null)return e;if(r===n)return ae(D(t),D(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function gh(t,e){for(var r=hr(t,0),n=hr(e,0),i=0;i<r.length&&i<n.length;i++){var o=Et(r[i],n[i]);if(o!==0)return o}return r.length===n.length?0:r.length<n.length?-1:1}function hi(t,e){if(rt(t)!==rt(e))return!1;for(var r=t.pieceNum_,n=e.pieceNum_;r<=t.pieces_.length;r++,n++)if(t.pieces_[r]!==e.pieces_[n])return!1;return!0}function _e(t,e){var r=t.pieceNum_,n=e.pieceNum_;if(rt(t)>rt(e))return!1;for(;r<t.pieces_.length;){if(t.pieces_[r]!==e.pieces_[n])return!1;++r,++n}return!0}var _h=function(){function t(e,r){this.errorPrefix_=r,this.parts_=hr(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(var n=0;n<this.parts_.length;n++)this.byteLength_+=Vr(this.parts_[n]);es(this)}return t}();function mh(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Vr(e),es(t)}function yh(t){var e=t.parts_.pop();t.byteLength_-=Vr(e),t.parts_.length>0&&(t.byteLength_-=1)}function es(t){if(t.byteLength_>Ja)throw new Error(t.errorPrefix_+"has a key path longer than "+Ja+" bytes ("+t.byteLength_+").");if(t.parts_.length>Xa)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Xa+") or object contains a cycle "+Tt(t))}function Tt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Eh=function(t){A(e,t);function e(){var r=t.call(this,["visible"])||this,n,i;return typeof document!="undefined"&&typeof document.addEventListener!="undefined"&&(typeof document.hidden!="undefined"?(i="visibilitychange",n="hidden"):typeof document.mozHidden!="undefined"?(i="mozvisibilitychange",n="mozHidden"):typeof document.msHidden!="undefined"?(i="msvisibilitychange",n="msHidden"):typeof document.webkitHidden!="undefined"&&(i="webkitvisibilitychange",n="webkitHidden")),r.visible_=!0,i&&document.addEventListener(i,function(){var o=!document[n];o!==r.visible_&&(r.visible_=o,r.trigger("visible",o))},!1),r}return e.getInstance=function(){return new e},e.prototype.getInitialEvent=function(r){return _(r==="visible","Unknown event type: "+r),[this.visible_]},e}(Qa);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dr=1e3,bh=60*5*1e3,Th=3*1e3,ts=30*1e3,wh=1.3,Ch=3e4,Sh="server_kill",rs=3,wt=function(t){A(e,t);function e(r,n,i,o,a,s,u,l){var c=t.call(this)||this;if(c.repoInfo_=r,c.applicationId_=n,c.onDataUpdate_=i,c.onConnectStatus_=o,c.onServerInfoUpdate_=a,c.authTokenProvider_=s,c.appCheckTokenProvider_=u,c.authOverride_=l,c.id=e.nextPersistentConnectionId_++,c.log_=ur("p:"+c.id+":"),c.interruptReasons_={},c.listens=new Map,c.outstandingPuts_=[],c.outstandingGets_=[],c.outstandingPutCount_=0,c.outstandingGetCount_=0,c.onDisconnectRequestQueue_=[],c.connected_=!1,c.reconnectDelay_=dr,c.maxReconnectDelay_=bh,c.securityDebugCallback_=null,c.lastSessionId=null,c.establishConnectionTimer_=null,c.visible_=!1,c.requestCBHash_={},c.requestNumber_=0,c.realtime_=null,c.authToken_=null,c.appCheckToken_=null,c.forceTokenRefresh_=!1,c.invalidAuthTokenCount_=0,c.invalidAppCheckTokenCount_=0,c.firstConnection_=!0,c.lastConnectionAttemptTime_=null,c.lastConnectionEstablishedTime_=null,l&&!fa())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");return Eh.getInstance().on("visible",c.onVisible_,c),r.host.indexOf("fblocal")===-1&&Ya.getInstance().on("online",c.onOnline_,c),c}return e.prototype.sendRequest=function(r,n,i){var o=++this.requestNumber_,a={r:o,a:r,b:n};this.log_(G(a)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(a),i&&(this.requestCBHash_[o]=i)},e.prototype.get=function(r){var n=this;this.initConnection_();var i=new he,o={p:r._path.toString(),q:r._queryObject},a={action:"g",request:o,onComplete:function(u){var l=u.d;u.s==="ok"?(n.onDataUpdate_(o.p,l,!1,null),i.resolve(l)):i.reject(l)}};this.outstandingGets_.push(a),this.outstandingGetCount_++;var s=this.outstandingGets_.length-1;return this.connected_||setTimeout(function(){var u=n.outstandingGets_[s];u===void 0||a!==u||(delete n.outstandingGets_[s],n.outstandingGetCount_--,n.outstandingGetCount_===0&&(n.outstandingGets_=[]),n.log_("get "+s+" timed out on connection"),i.reject(new Error("Client is offline.")))},Th),this.connected_&&this.sendGet_(s),i.promise},e.prototype.listen=function(r,n,i,o){this.initConnection_();var a=r._queryIdentifier,s=r._path.toString();this.log_("Listen called for "+s+" "+a),this.listens.has(s)||this.listens.set(s,new Map),_(r._queryParams.isDefault()||!r._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(s).has(a),"listen() called twice for same path/queryId.");var u={onComplete:o,hashFn:n,query:r,tag:i};this.listens.get(s).set(a,u),this.connected_&&this.sendListen_(u)},e.prototype.sendGet_=function(r){var n=this,i=this.outstandingGets_[r];this.sendRequest("g",i.request,function(o){delete n.outstandingGets_[r],n.outstandingGetCount_--,n.outstandingGetCount_===0&&(n.outstandingGets_=[]),i.onComplete&&i.onComplete(o)})},e.prototype.sendListen_=function(r){var n=this,i=r.query,o=i._path.toString(),a=i._queryIdentifier;this.log_("Listen on "+o+" for "+a);var s={p:o},u="q";r.tag&&(s.q=i._queryObject,s.t=r.tag),s.h=r.hashFn(),this.sendRequest(u,s,function(l){var c=l.d,f=l.s;e.warnOnListenWarnings_(c,i);var h=n.listens.get(o)&&n.listens.get(o).get(a);h===r&&(n.log_("listen response",l),f!=="ok"&&n.removeListen_(o,a),r.onComplete&&r.onComplete(f,c))})},e.warnOnListenWarnings_=function(r,n){if(r&&typeof r=="object"&&Re(r,"w")){var i=vt(r,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){var o='".indexOn": "'+n._queryParams.getIndex().toString()+'"',a=n._path.toString();ee("Using an unspecified index. Your data will be downloaded and "+("filtered on the client. Consider adding "+o+" at ")+(a+" to your security rules for better performance."))}}},e.prototype.refreshAuthToken=function(r){this.authToken_=r,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},function(){}),this.reduceReconnectDelayIfAdminCredential_(r)},e.prototype.reduceReconnectDelayIfAdminCredential_=function(r){var n=r&&r.length===40;(n||gf(r))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ts)},e.prototype.refreshAppCheckToken=function(r){this.appCheckToken_=r,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},function(){})},e.prototype.tryAuth=function(){var r=this;if(this.connected_&&this.authToken_){var n=this.authToken_,i=vf(n)?"auth":"gauth",o={cred:n};this.authOverride_===null?o.noauth=!0:typeof this.authOverride_=="object"&&(o.authvar=this.authOverride_),this.sendRequest(i,o,function(a){var s=a.s,u=a.d||"error";r.authToken_===n&&(s==="ok"?r.invalidAuthTokenCount_=0:r.onAuthRevoked_(s,u))})}},e.prototype.tryAppCheck=function(){var r=this;this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},function(n){var i=n.s,o=n.d||"error";i==="ok"?r.invalidAppCheckTokenCount_=0:r.onAppCheckRevoked_(i,o)})},e.prototype.unlisten=function(r,n){var i=r._path.toString(),o=r._queryIdentifier;this.log_("Unlisten called for "+i+" "+o),_(r._queryParams.isDefault()||!r._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");var a=this.removeListen_(i,o);a&&this.connected_&&this.sendUnlisten_(i,o,r._queryObject,n)},e.prototype.sendUnlisten_=function(r,n,i,o){this.log_("Unlisten on "+r+" for "+n);var a={p:r},s="n";o&&(a.q=i,a.t=o),this.sendRequest(s,a)},e.prototype.onDisconnectPut=function(r,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",r,n,i):this.onDisconnectRequestQueue_.push({pathString:r,action:"o",data:n,onComplete:i})},e.prototype.onDisconnectMerge=function(r,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",r,n,i):this.onDisconnectRequestQueue_.push({pathString:r,action:"om",data:n,onComplete:i})},e.prototype.onDisconnectCancel=function(r,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",r,null,n):this.onDisconnectRequestQueue_.push({pathString:r,action:"oc",data:null,onComplete:n})},e.prototype.sendOnDisconnect_=function(r,n,i,o){var a={p:n,d:i};this.log_("onDisconnect "+r,a),this.sendRequest(r,a,function(s){o&&setTimeout(function(){o(s.s,s.d)},Math.floor(0))})},e.prototype.put=function(r,n,i,o){this.putInternal("p",r,n,i,o)},e.prototype.merge=function(r,n,i,o){this.putInternal("m",r,n,i,o)},e.prototype.putInternal=function(r,n,i,o,a){this.initConnection_();var s={p:n,d:i};a!==void 0&&(s.h=a),this.outstandingPuts_.push({action:r,request:s,onComplete:o}),this.outstandingPutCount_++;var u=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(u):this.log_("Buffering put: "+n)},e.prototype.sendPut_=function(r){var n=this,i=this.outstandingPuts_[r].action,o=this.outstandingPuts_[r].request,a=this.outstandingPuts_[r].onComplete;this.outstandingPuts_[r].queued=this.connected_,this.sendRequest(i,o,function(s){n.log_(i+" response",s),delete n.outstandingPuts_[r],n.outstandingPutCount_--,n.outstandingPutCount_===0&&(n.outstandingPuts_=[]),a&&a(s.s,s.d)})},e.prototype.reportStats=function(r){var n=this;if(this.connected_){var i={c:r};this.log_("reportStats",i),this.sendRequest("s",i,function(o){var a=o.s;if(a!=="ok"){var s=o.d;n.log_("reportStats","Error sending stats: "+s)}})}},e.prototype.onDataMessage_=function(r){if("r"in r){this.log_("from server: "+G(r));var n=r.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(r.b))}else{if("error"in r)throw"A server-side error has occurred: "+r.error;"a"in r&&this.onDataPush_(r.a,r.b)}},e.prototype.onDataPush_=function(r,n){this.log_("handleServerMessage",r,n),r==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):r==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):r==="c"?this.onListenRevoked_(n.p,n.q):r==="ac"?this.onAuthRevoked_(n.s,n.d):r==="apc"?this.onAppCheckRevoked_(n.s,n.d):r==="sd"?this.onSecurityDebugPacket_(n):ei("Unrecognized action received from server: "+G(r)+`
Are you using the latest client?`)},e.prototype.onReady_=function(r,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(r),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)},e.prototype.scheduleConnect_=function(r){var n=this;_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(function(){n.establishConnectionTimer_=null,n.establishConnection_()},Math.floor(r))},e.prototype.initConnection_=function(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)},e.prototype.onVisible_=function(r){r&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=dr,this.realtime_||this.scheduleConnect_(0)),this.visible_=r},e.prototype.onOnline_=function(r){r?(this.log_("Browser went online."),this.reconnectDelay_=dr,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())},e.prototype.onRealtimeDisconnect_=function(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(!this.visible_)this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime();else if(this.lastConnectionEstablishedTime_){var r=new Date().getTime()-this.lastConnectionEstablishedTime_;r>Ch&&(this.reconnectDelay_=dr),this.lastConnectionEstablishedTime_=null}var n=new Date().getTime()-this.lastConnectionAttemptTime_,i=Math.max(0,this.reconnectDelay_-n);i=Math.random()*i,this.log_("Trying to reconnect in "+i+"ms"),this.scheduleConnect_(i),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*wh)}this.onConnectStatus_(!1)},e.prototype.establishConnection_=function(){return v(this,void 0,void 0,function(){var r,n,i,o,a,s,u,l,c,f,h,d,p,m,y=this;return g(this,function(E){switch(E.label){case 0:if(!this.shouldReconnect_())return[3,4];this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null,r=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),o=this.id+":"+e.nextConnectionId_++,a=this.lastSessionId,s=!1,u=null,l=function(){u?u.close():(s=!0,i())},c=function(C){_(u,"sendRequest call when we're not connected not allowed."),u.sendRequest(C)},this.realtime_={close:l,sendRequest:c},f=this.forceTokenRefresh_,this.forceTokenRefresh_=!1,E.label=1;case 1:return E.trys.push([1,3,,4]),[4,Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)])];case 2:return h=Z.apply(void 0,[E.sent(),2]),d=h[0],p=h[1],s?X("getToken() completed but was canceled"):(X("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,u=new za(o,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,r,n,i,function(C){ee(C+" ("+y.repoInfo_.toString()+")"),y.interrupt(Sh)},a)),[3,4];case 3:return m=E.sent(),this.log_("Failed to get token: "+m),s||(this.repoInfo_.nodeAdmin&&ee(m),l()),[3,4];case 4:return[2]}})})},e.prototype.interrupt=function(r){X("Interrupting connection for reason: "+r),this.interruptReasons_[r]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())},e.prototype.resume=function(r){X("Resuming connection for reason: "+r),delete this.interruptReasons_[r],Jn(this.interruptReasons_)&&(this.reconnectDelay_=dr,this.realtime_||this.scheduleConnect_(0))},e.prototype.handleTimestamp_=function(r){var n=r-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})},e.prototype.cancelSentTransactions_=function(){for(var r=0;r<this.outstandingPuts_.length;r++){var n=this.outstandingPuts_[r];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[r],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])},e.prototype.onListenRevoked_=function(r,n){var i;n?i=n.map(function(a){return ti(a)}).join("$"):i="default";var o=this.removeListen_(r,i);o&&o.onComplete&&o.onComplete("permission_denied")},e.prototype.removeListen_=function(r,n){var i=new N(r).toString(),o;if(this.listens.has(i)){var a=this.listens.get(i);o=a.get(n),a.delete(n),a.size===0&&this.listens.delete(i)}else o=void 0;return o},e.prototype.onAuthRevoked_=function(r,n){X("Auth token revoked: "+r+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(r==="invalid_token"||r==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=rs&&(this.reconnectDelay_=ts,this.authTokenProvider_.notifyForInvalidToken()))},e.prototype.onAppCheckRevoked_=function(r,n){X("App check token revoked: "+r+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(r==="invalid_token"||r==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=rs&&this.appCheckTokenProvider_.notifyForInvalidToken())},e.prototype.onSecurityDebugPacket_=function(r){this.securityDebugCallback_?this.securityDebugCallback_(r):"msg"in r&&console.log("FIREBASE: "+r.msg.replace(`
`,`
FIREBASE: `))},e.prototype.restoreState_=function(){var r,n,i,o;this.tryAuth(),this.tryAppCheck();try{for(var a=Q(this.listens.values()),s=a.next();!s.done;s=a.next()){var u=s.value;try{for(var l=(i=void 0,Q(u.values())),c=l.next();!c.done;c=l.next()){var f=c.value;this.sendListen_(f)}}catch(p){i={error:p}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}}}catch(p){r={error:p}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}for(var h=0;h<this.outstandingPuts_.length;h++)this.outstandingPuts_[h]&&this.sendPut_(h);for(;this.onDisconnectRequestQueue_.length;){var d=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(d.action,d.pathString,d.data,d.onComplete)}for(var h=0;h<this.outstandingGets_.length;h++)this.outstandingGets_[h]&&this.sendGet_(h)},e.prototype.sendConnectStats_=function(){var r={},n="js";r["sdk."+n+"."+ga.replace(/\./g,"-")]=1,ca()?r["framework.cordova"]=1:lf()&&(r["framework.reactnative"]=1),this.reportStats(r)},e.prototype.shouldReconnect_=function(){var r=Ya.getInstance().currentlyOnline();return Jn(this.interruptReasons_)&&r},e.nextPersistentConnectionId_=0,e.nextConnectionId_=0,e}(Ka);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var R=function(){function t(e,r){this.name=e,this.node=r}return t.Wrap=function(e,r){return new t(e,r)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qr=function(){function t(){}return t.prototype.getCompare=function(){return this.compare.bind(this)},t.prototype.indexedValueChanged=function(e,r){var n=new R(ze,e),i=new R(ze,r);return this.compare(n,i)!==0},t.prototype.minPost=function(){return R.MIN},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zr,ns=function(t){A(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return Object.defineProperty(e,"__EMPTY_NODE",{get:function(){return zr},set:function(r){zr=r},enumerable:!1,configurable:!0}),e.prototype.compare=function(r,n){return Et(r.name,n.name)},e.prototype.isDefinedOn=function(r){throw Ht("KeyIndex.isDefinedOn not expected to be called.")},e.prototype.indexedValueChanged=function(r,n){return!1},e.prototype.minPost=function(){return R.MIN},e.prototype.maxPost=function(){return new R(He,zr)},e.prototype.makePost=function(r,n){return _(typeof r=="string","KeyIndex indexValue must always be a string."),new R(r,zr)},e.prototype.toString=function(){return".key"},e}(qr),We=new ns;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Kr=function(){function t(e,r,n,i,o){o===void 0&&(o=null),this.isReverse_=i,this.resultGenerator_=o,this.nodeStack_=[];for(var a=1;!e.isEmpty();)if(e=e,a=r?n(e.key,r):1,i&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}return t.prototype.getNext=function(){if(this.nodeStack_.length===0)return null;var e=this.nodeStack_.pop(),r;if(this.resultGenerator_?r=this.resultGenerator_(e.key,e.value):r={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return r},t.prototype.hasNext=function(){return this.nodeStack_.length>0},t.prototype.peek=function(){if(this.nodeStack_.length===0)return null;var e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}},t}(),ke=function(){function t(e,r,n,i,o){this.key=e,this.value=r,this.color=n!=null?n:t.RED,this.left=i!=null?i:Ke.EMPTY_NODE,this.right=o!=null?o:Ke.EMPTY_NODE}return t.prototype.copy=function(e,r,n,i,o){return new t(e!=null?e:this.key,r!=null?r:this.value,n!=null?n:this.color,i!=null?i:this.left,o!=null?o:this.right)},t.prototype.count=function(){return this.left.count()+1+this.right.count()},t.prototype.isEmpty=function(){return!1},t.prototype.inorderTraversal=function(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)},t.prototype.reverseTraversal=function(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)},t.prototype.min_=function(){return this.left.isEmpty()?this:this.left.min_()},t.prototype.minKey=function(){return this.min_().key},t.prototype.maxKey=function(){return this.right.isEmpty()?this.key:this.right.maxKey()},t.prototype.insert=function(e,r,n){var i=this,o=n(e,i.key);return o<0?i=i.copy(null,null,null,i.left.insert(e,r,n),null):o===0?i=i.copy(null,r,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,r,n)),i.fixUp_()},t.prototype.removeMin_=function(){if(this.left.isEmpty())return Ke.EMPTY_NODE;var e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()},t.prototype.remove=function(e,r){var n,i;if(n=this,r(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,r),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),r(e,n.key)===0){if(n.right.isEmpty())return Ke.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,r))}return n.fixUp_()},t.prototype.isRed_=function(){return this.color},t.prototype.fixUp_=function(){var e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e},t.prototype.moveRedLeft_=function(){var e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e},t.prototype.moveRedRight_=function(){var e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e},t.prototype.rotateLeft_=function(){var e=this.copy(null,null,t.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)},t.prototype.rotateRight_=function(){var e=this.copy(null,null,t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)},t.prototype.colorFlip_=function(){var e=this.left.copy(null,null,!this.left.color,null,null),r=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,r)},t.prototype.checkMaxDepth_=function(){var e=this.check_();return Math.pow(2,e)<=this.count()+1},t.prototype.check_=function(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");var e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)},t.RED=!0,t.BLACK=!1,t}(),Ih=function(){function t(){}return t.prototype.copy=function(e,r,n,i,o){return this},t.prototype.insert=function(e,r,n){return new ke(e,r,null)},t.prototype.remove=function(e,r){return this},t.prototype.count=function(){return 0},t.prototype.isEmpty=function(){return!0},t.prototype.inorderTraversal=function(e){return!1},t.prototype.reverseTraversal=function(e){return!1},t.prototype.minKey=function(){return null},t.prototype.maxKey=function(){return null},t.prototype.check_=function(){return 0},t.prototype.isRed_=function(){return!1},t}(),Ke=function(){function t(e,r){r===void 0&&(r=t.EMPTY_NODE),this.comparator_=e,this.root_=r}return t.prototype.insert=function(e,r){return new t(this.comparator_,this.root_.insert(e,r,this.comparator_).copy(null,null,ke.BLACK,null,null))},t.prototype.remove=function(e){return new t(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ke.BLACK,null,null))},t.prototype.get=function(e){for(var r,n=this.root_;!n.isEmpty();){if(r=this.comparator_(e,n.key),r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null},t.prototype.getPredecessorKey=function(e){for(var r,n=this.root_,i=null;!n.isEmpty();)if(r=this.comparator_(e,n.key),r===0){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else r<0?n=n.left:r>0&&(i=n,n=n.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")},t.prototype.isEmpty=function(){return this.root_.isEmpty()},t.prototype.count=function(){return this.root_.count()},t.prototype.minKey=function(){return this.root_.minKey()},t.prototype.maxKey=function(){return this.root_.maxKey()},t.prototype.inorderTraversal=function(e){return this.root_.inorderTraversal(e)},t.prototype.reverseTraversal=function(e){return this.root_.reverseTraversal(e)},t.prototype.getIterator=function(e){return new Kr(this.root_,null,this.comparator_,!1,e)},t.prototype.getIteratorFrom=function(e,r){return new Kr(this.root_,e,this.comparator_,!1,r)},t.prototype.getReverseIteratorFrom=function(e,r){return new Kr(this.root_,e,this.comparator_,!0,r)},t.prototype.getReverseIterator=function(e){return new Kr(this.root_,null,this.comparator_,!0,e)},t.EMPTY_NODE=new Ih,t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(t,e){return Et(t.name,e.name)}function di(t,e){return Et(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pi;function Ah(t){pi=t}var is=function(t){return typeof t=="number"?"number:"+Ca(t):"string:"+t},os=function(t){if(t.isLeafNode()){var e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Re(e,".sv"),"Priority must be a string or number.")}else _(t===pi||t.isEmpty(),"priority of unexpected type.");_(t===pi||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var as,jt=function(){function t(e,r){r===void 0&&(r=t.__childrenNodeConstructor.EMPTY_NODE),this.value_=e,this.priorityNode_=r,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),os(this.priorityNode_)}return Object.defineProperty(t,"__childrenNodeConstructor",{get:function(){return as},set:function(e){as=e},enumerable:!1,configurable:!0}),t.prototype.isLeafNode=function(){return!0},t.prototype.getPriority=function(){return this.priorityNode_},t.prototype.updatePriority=function(e){return new t(this.value_,e)},t.prototype.getImmediateChild=function(e){return e===".priority"?this.priorityNode_:t.__childrenNodeConstructor.EMPTY_NODE},t.prototype.getChild=function(e){return I(e)?this:S(e)===".priority"?this.priorityNode_:t.__childrenNodeConstructor.EMPTY_NODE},t.prototype.hasChild=function(){return!1},t.prototype.getPredecessorChildName=function(e,r){return null},t.prototype.updateImmediateChild=function(e,r){return e===".priority"?this.updatePriority(r):r.isEmpty()&&e!==".priority"?this:t.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,r).updatePriority(this.priorityNode_)},t.prototype.updateChild=function(e,r){var n=S(e);return n===null?r:r.isEmpty()&&n!==".priority"?this:(_(n!==".priority"||rt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(n,t.__childrenNodeConstructor.EMPTY_NODE.updateChild(D(e),r)))},t.prototype.isEmpty=function(){return!1},t.prototype.numChildren=function(){return 0},t.prototype.forEachChild=function(e,r){return!1},t.prototype.val=function(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()},t.prototype.hash=function(){if(this.lazyHash_===null){var e="";this.priorityNode_.isEmpty()||(e+="priority:"+is(this.priorityNode_.val())+":");var r=typeof this.value_;e+=r+":",r==="number"?e+=Ca(this.value_):e+=this.value_,this.lazyHash_=Ea(e)}return this.lazyHash_},t.prototype.getValue=function(){return this.value_},t.prototype.compareTo=function(e){return e===t.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof t.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))},t.prototype.compareToLeafNode_=function(e){var r=typeof e.value_,n=typeof this.value_,i=t.VALUE_TYPE_ORDER.indexOf(r),o=t.VALUE_TYPE_ORDER.indexOf(n);return _(i>=0,"Unknown leaf type: "+r),_(o>=0,"Unknown leaf type: "+n),i===o?n==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-i},t.prototype.withIndex=function(){return this},t.prototype.isIndexed=function(){return!0},t.prototype.equals=function(e){if(e===this)return!0;if(e.isLeafNode()){var r=e;return this.value_===r.value_&&this.priorityNode_.equals(r.priorityNode_)}else return!1},t.VALUE_TYPE_ORDER=["object","boolean","number","string"],t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ss,us;function kh(t){ss=t}function Nh(t){us=t}var Oh=function(t){A(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.compare=function(r,n){var i=r.node.getPriority(),o=n.node.getPriority(),a=i.compareTo(o);return a===0?Et(r.name,n.name):a},e.prototype.isDefinedOn=function(r){return!r.getPriority().isEmpty()},e.prototype.indexedValueChanged=function(r,n){return!r.getPriority().equals(n.getPriority())},e.prototype.minPost=function(){return R.MIN},e.prototype.maxPost=function(){return new R(He,new jt("[PRIORITY-POST]",us))},e.prototype.makePost=function(r,n){var i=ss(r);return new R(n,new jt("[PRIORITY-POST]",i))},e.prototype.toString=function(){return".priority"},e}(qr),L=new Oh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ph=Math.log(2),Mh=function(){function t(e){var r=function(o){return parseInt(Math.log(o)/Ph,10)},n=function(o){return parseInt(Array(o+1).join("1"),2)};this.count=r(e+1),this.current_=this.count-1;var i=n(this.count);this.bits_=e+1&i}return t.prototype.nextBitIsOne=function(){var e=!(this.bits_&1<<this.current_);return this.current_--,e},t}(),Qr=function(t,e,r,n){t.sort(e);var i=function(u,l){var c=l-u,f,h;if(c===0)return null;if(c===1)return f=t[u],h=r?r(f):f,new ke(h,f.node,ke.BLACK,null,null);var d=parseInt(c/2,10)+u,p=i(u,d),m=i(d+1,l);return f=t[d],h=r?r(f):f,new ke(h,f.node,ke.BLACK,p,m)},o=function(u){for(var l=null,c=null,f=t.length,h=function(E,C){var M=f-E,J=f;f-=E;var W=i(M+1,J),Se=t[M],pt=r?r(Se):Se;d(new ke(pt,Se.node,C,null,W))},d=function(E){l?(l.left=E,l=E):(c=E,l=E)},p=0;p<u.count;++p){var m=u.nextBitIsOne(),y=Math.pow(2,u.count-(p+1));m?h(y,ke.BLACK):(h(y,ke.BLACK),h(y,ke.RED))}return c},a=new Mh(t.length),s=o(a);return new Ke(n||e,s)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vi,$t={},Yr=function(){function t(e,r){this.indexes_=e,this.indexSet_=r}return Object.defineProperty(t,"Default",{get:function(){return _($t&&L,"ChildrenNode.ts has not been loaded"),vi=vi||new t({".priority":$t},{".priority":L}),vi},enumerable:!1,configurable:!0}),t.prototype.get=function(e){var r=vt(this.indexes_,e);if(!r)throw new Error("No index defined for "+e);return r instanceof Ke?r:null},t.prototype.hasIndex=function(e){return Re(this.indexSet_,e.toString())},t.prototype.addIndex=function(e,r){_(e!==We,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var n=[],i=!1,o=r.getIterator(R.Wrap),a=o.getNext();a;)i=i||e.isDefinedOn(a.node),n.push(a),a=o.getNext();var s;i?s=Qr(n,e.getCompare()):s=$t;var u=e.toString(),l=T({},this.indexSet_);l[u]=e;var c=T({},this.indexes_);return c[u]=s,new t(c,l)},t.prototype.addToIndexes=function(e,r){var n=this,i=Wr(this.indexes_,function(o,a){var s=vt(n.indexSet_,a);if(_(s,"Missing index implementation for "+a),o===$t)if(s.isDefinedOn(e.node)){for(var u=[],l=r.getIterator(R.Wrap),c=l.getNext();c;)c.name!==e.name&&u.push(c),c=l.getNext();return u.push(e),Qr(u,s.getCompare())}else return $t;else{var f=r.get(e.name),h=o;return f&&(h=h.remove(new R(e.name,f))),h.insert(e,e.node)}});return new t(i,this.indexSet_)},t.prototype.removeFromIndexes=function(e,r){var n=Wr(this.indexes_,function(i){if(i===$t)return i;var o=r.get(e.name);return o?i.remove(new R(e.name,o)):i});return new t(n,this.indexSet_)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pr,w=function(){function t(e,r,n){this.children_=e,this.priorityNode_=r,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&os(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}return Object.defineProperty(t,"EMPTY_NODE",{get:function(){return pr||(pr=new t(new Ke(di),null,Yr.Default))},enumerable:!1,configurable:!0}),t.prototype.isLeafNode=function(){return!1},t.prototype.getPriority=function(){return this.priorityNode_||pr},t.prototype.updatePriority=function(e){return this.children_.isEmpty()?this:new t(this.children_,e,this.indexMap_)},t.prototype.getImmediateChild=function(e){if(e===".priority")return this.getPriority();var r=this.children_.get(e);return r===null?pr:r},t.prototype.getChild=function(e){var r=S(e);return r===null?this:this.getImmediateChild(r).getChild(D(e))},t.prototype.hasChild=function(e){return this.children_.get(e)!==null},t.prototype.updateImmediateChild=function(e,r){if(_(r,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(r);var n=new R(e,r),i=void 0,o=void 0;r.isEmpty()?(i=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,r),o=this.indexMap_.addToIndexes(n,this.children_));var a=i.isEmpty()?pr:this.priorityNode_;return new t(i,a,o)},t.prototype.updateChild=function(e,r){var n=S(e);if(n===null)return r;_(S(e)!==".priority"||rt(e)===1,".priority must be the last token in a path");var i=this.getImmediateChild(n).updateChild(D(e),r);return this.updateImmediateChild(n,i)},t.prototype.isEmpty=function(){return this.children_.isEmpty()},t.prototype.numChildren=function(){return this.children_.count()},t.prototype.val=function(e){if(this.isEmpty())return null;var r={},n=0,i=0,o=!0;if(this.forEachChild(L,function(u,l){r[u]=l.val(e),n++,o&&t.INTEGER_REGEXP_.test(u)?i=Math.max(i,Number(u)):o=!1}),!e&&o&&i<2*n){var a=[];for(var s in r)a[s]=r[s];return a}else return e&&!this.getPriority().isEmpty()&&(r[".priority"]=this.getPriority().val()),r},t.prototype.hash=function(){if(this.lazyHash_===null){var e="";this.getPriority().isEmpty()||(e+="priority:"+is(this.getPriority().val())+":"),this.forEachChild(L,function(r,n){var i=n.hash();i!==""&&(e+=":"+r+":"+i)}),this.lazyHash_=e===""?"":Ea(e)}return this.lazyHash_},t.prototype.getPredecessorChildName=function(e,r,n){var i=this.resolveIndex_(n);if(i){var o=i.getPredecessorKey(new R(e,r));return o?o.name:null}else return this.children_.getPredecessorKey(e)},t.prototype.getFirstChildName=function(e){var r=this.resolveIndex_(e);if(r){var n=r.minKey();return n&&n.name}else return this.children_.minKey()},t.prototype.getFirstChild=function(e){var r=this.getFirstChildName(e);return r?new R(r,this.children_.get(r)):null},t.prototype.getLastChildName=function(e){var r=this.resolveIndex_(e);if(r){var n=r.maxKey();return n&&n.name}else return this.children_.maxKey()},t.prototype.getLastChild=function(e){var r=this.getLastChildName(e);return r?new R(r,this.children_.get(r)):null},t.prototype.forEachChild=function(e,r){var n=this.resolveIndex_(e);return n?n.inorderTraversal(function(i){return r(i.name,i.node)}):this.children_.inorderTraversal(r)},t.prototype.getIterator=function(e){return this.getIteratorFrom(e.minPost(),e)},t.prototype.getIteratorFrom=function(e,r){var n=this.resolveIndex_(r);if(n)return n.getIteratorFrom(e,function(a){return a});for(var i=this.children_.getIteratorFrom(e.name,R.Wrap),o=i.peek();o!=null&&r.compare(o,e)<0;)i.getNext(),o=i.peek();return i},t.prototype.getReverseIterator=function(e){return this.getReverseIteratorFrom(e.maxPost(),e)},t.prototype.getReverseIteratorFrom=function(e,r){var n=this.resolveIndex_(r);if(n)return n.getReverseIteratorFrom(e,function(a){return a});for(var i=this.children_.getReverseIteratorFrom(e.name,R.Wrap),o=i.peek();o!=null&&r.compare(o,e)>0;)i.getNext(),o=i.peek();return i},t.prototype.compareTo=function(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===vr?-1:0},t.prototype.withIndex=function(e){if(e===We||this.indexMap_.hasIndex(e))return this;var r=this.indexMap_.addIndex(e,this.children_);return new t(this.children_,this.priorityNode_,r)},t.prototype.isIndexed=function(e){return e===We||this.indexMap_.hasIndex(e)},t.prototype.equals=function(e){if(e===this)return!0;if(e.isLeafNode())return!1;var r=e;if(this.getPriority().equals(r.getPriority()))if(this.children_.count()===r.children_.count()){for(var n=this.getIterator(L),i=r.getIterator(L),o=n.getNext(),a=i.getNext();o&&a;){if(o.name!==a.name||!o.node.equals(a.node))return!1;o=n.getNext(),a=i.getNext()}return o===null&&a===null}else return!1;else return!1},t.prototype.resolveIndex_=function(e){return e===We?null:this.indexMap_.get(e.toString())},t.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/,t}(),Dh=function(t){A(e,t);function e(){return t.call(this,new Ke(di),w.EMPTY_NODE,Yr.Default)||this}return e.prototype.compareTo=function(r){return r===this?0:1},e.prototype.equals=function(r){return r===this},e.prototype.getPriority=function(){return this},e.prototype.getImmediateChild=function(r){return w.EMPTY_NODE},e.prototype.isEmpty=function(){return!1},e}(w),vr=new Dh;Object.defineProperties(R,{MIN:{value:new R(ze,w.EMPTY_NODE)},MAX:{value:new R(He,vr)}});ns.__EMPTY_NODE=w.EMPTY_NODE;jt.__childrenNodeConstructor=w;Ah(vr);Nh(vr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xh=!0;function V(t,e){if(e===void 0&&(e=null),t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){var r=t;return new jt(r,V(e))}if(!(t instanceof Array)&&xh){var n=[],i=!1,o=t;if(q(o,function(l,c){if(l.substring(0,1)!=="."){var f=V(c);f.isEmpty()||(i=i||!f.getPriority().isEmpty(),n.push(new R(l,f)))}}),n.length===0)return w.EMPTY_NODE;var a=Qr(n,Rh,function(l){return l.name},di);if(i){var s=Qr(n,L.getCompare());return new w(a,V(e),new Yr({".priority":s},{".priority":L}))}else return new w(a,V(e),Yr.Default)}else{var u=w.EMPTY_NODE;return q(t,function(l,c){if(Re(t,l)&&l.substring(0,1)!=="."){var f=V(c);(f.isLeafNode()||!f.isEmpty())&&(u=u.updateImmediateChild(l,f))}}),u.updatePriority(V(e))}}kh(V);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gi=function(t){A(e,t);function e(r){var n=t.call(this)||this;return n.indexPath_=r,_(!I(r)&&S(r)!==".priority","Can't create PathIndex with empty path or .priority key"),n}return e.prototype.extractChild=function(r){return r.getChild(this.indexPath_)},e.prototype.isDefinedOn=function(r){return!r.getChild(this.indexPath_).isEmpty()},e.prototype.compare=function(r,n){var i=this.extractChild(r.node),o=this.extractChild(n.node),a=i.compareTo(o);return a===0?Et(r.name,n.name):a},e.prototype.makePost=function(r,n){var i=V(r),o=w.EMPTY_NODE.updateChild(this.indexPath_,i);return new R(n,o)},e.prototype.maxPost=function(){var r=w.EMPTY_NODE.updateChild(this.indexPath_,vr);return new R(He,r)},e.prototype.toString=function(){return hr(this.indexPath_,0).join("/")},e}(qr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lh=function(t){A(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.compare=function(r,n){var i=r.node.compareTo(n.node);return i===0?Et(r.name,n.name):i},e.prototype.isDefinedOn=function(r){return!0},e.prototype.indexedValueChanged=function(r,n){return!r.equals(n)},e.prototype.minPost=function(){return R.MIN},e.prototype.maxPost=function(){return R.MAX},e.prototype.makePost=function(r,n){var i=V(r);return new R(n,i)},e.prototype.toString=function(){return".value"},e}(qr),_i=new Lh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gt="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",mi="-",ls="z",cs=786,Fh=function(){var t=0,e=[];return function(r){var n=r===t;t=r;var i,o=new Array(8);for(i=7;i>=0;i--)o[i]=Gt.charAt(r%64),r=Math.floor(r/64);_(r===0,"Cannot push at time == 0");var a=o.join("");if(n){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)a+=Gt.charAt(e[i]);return _(a.length===20,"nextPushId: Length should be 20."),a}}(),fs=function(t){if(t===""+ri)return mi;var e=$r(t);if(e!=null)return""+(e+1);for(var r=new Array(t.length),n=0;n<r.length;n++)r[n]=t.charAt(n);if(r.length<cs)return r.push(mi),r.join("");for(var i=r.length-1;i>=0&&r[i]===ls;)i--;if(i===-1)return He;var o=r[i],a=Gt.charAt(Gt.indexOf(o)+1);return r[i]=a,r.slice(0,i+1).join("")},hs=function(t){if(t===""+Sa)return ze;var e=$r(t);if(e!=null)return""+(e-1);for(var r=new Array(t.length),n=0;n<r.length;n++)r[n]=t.charAt(n);return r[r.length-1]===mi?r.length===1?""+ri:(delete r[r.length-1],r.join("")):(r[r.length-1]=Gt.charAt(Gt.indexOf(r[r.length-1])-1),r.join("")+ls.repeat(cs-r.length))};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(t){return{type:"value",snapshotNode:t}}function qt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function gr(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function _r(t,e,r){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:r}}function Uh(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yi=function(){function t(e){this.index_=e}return t.prototype.updateChild=function(e,r,n,i,o,a){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");var s=e.getImmediateChild(r);return s.getChild(i).equals(n.getChild(i))&&s.isEmpty()===n.isEmpty()||(a!=null&&(n.isEmpty()?e.hasChild(r)?a.trackChildChange(gr(r,s)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):s.isEmpty()?a.trackChildChange(qt(r,n)):a.trackChildChange(_r(r,n,s))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(r,n).withIndex(this.index_)},t.prototype.updateFullNode=function(e,r,n){return n!=null&&(e.isLeafNode()||e.forEachChild(L,function(i,o){r.hasChild(i)||n.trackChildChange(gr(i,o))}),r.isLeafNode()||r.forEachChild(L,function(i,o){if(e.hasChild(i)){var a=e.getImmediateChild(i);a.equals(o)||n.trackChildChange(_r(i,o,a))}else n.trackChildChange(qt(i,o))})),r.withIndex(this.index_)},t.prototype.updatePriority=function(e,r){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(r)},t.prototype.filtersNodes=function(){return!1},t.prototype.getIndexedFilter=function(){return this},t.prototype.getIndex=function(){return this.index_},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ps=function(){function t(e){this.indexedFilter_=new yi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=t.getStartPost_(e),this.endPost_=t.getEndPost_(e)}return t.prototype.getStartPost=function(){return this.startPost_},t.prototype.getEndPost=function(){return this.endPost_},t.prototype.matches=function(e){return this.index_.compare(this.getStartPost(),e)<=0&&this.index_.compare(e,this.getEndPost())<=0},t.prototype.updateChild=function(e,r,n,i,o,a){return this.matches(new R(r,n))||(n=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,r,n,i,o,a)},t.prototype.updateFullNode=function(e,r,n){r.isLeafNode()&&(r=w.EMPTY_NODE);var i=r.withIndex(this.index_);i=i.updatePriority(w.EMPTY_NODE);var o=this;return r.forEachChild(L,function(a,s){o.matches(new R(a,s))||(i=i.updateImmediateChild(a,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,n)},t.prototype.updatePriority=function(e,r){return e},t.prototype.filtersNodes=function(){return!0},t.prototype.getIndexedFilter=function(){return this.indexedFilter_},t.prototype.getIndex=function(){return this.index_},t.getStartPost_=function(e){if(e.hasStart()){var r=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),r)}else return e.getIndex().minPost()},t.getEndPost_=function(e){if(e.hasEnd()){var r=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),r)}else return e.getIndex().maxPost()},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bh=function(){function t(e){this.rangedFilter_=new ps(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft()}return t.prototype.updateChild=function(e,r,n,i,o,a){return this.rangedFilter_.matches(new R(r,n))||(n=w.EMPTY_NODE),e.getImmediateChild(r).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,r,n,i,o,a):this.fullLimitUpdateChild_(e,r,n,o,a)},t.prototype.updateFullNode=function(e,r,n){var i;if(r.isLeafNode()||r.isEmpty())i=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<r.numChildren()&&r.isIndexed(this.index_)){i=w.EMPTY_NODE.withIndex(this.index_);var o=void 0;this.reverse_?o=r.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=r.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);for(var a=0;o.hasNext()&&a<this.limit_;){var s=o.getNext(),u=void 0;if(this.reverse_?u=this.index_.compare(this.rangedFilter_.getStartPost(),s)<=0:u=this.index_.compare(s,this.rangedFilter_.getEndPost())<=0,u)i=i.updateImmediateChild(s.name,s.node),a++;else break}}else{i=r.withIndex(this.index_),i=i.updatePriority(w.EMPTY_NODE);var l=void 0,c=void 0,f=void 0,o=void 0;if(this.reverse_){o=i.getReverseIterator(this.index_),l=this.rangedFilter_.getEndPost(),c=this.rangedFilter_.getStartPost();var h=this.index_.getCompare();f=function(y,E){return h(E,y)}}else o=i.getIterator(this.index_),l=this.rangedFilter_.getStartPost(),c=this.rangedFilter_.getEndPost(),f=this.index_.getCompare();for(var a=0,d=!1;o.hasNext();){var s=o.getNext();!d&&f(l,s)<=0&&(d=!0);var u=d&&a<this.limit_&&f(s,c)<=0;u?a++:i=i.updateImmediateChild(s.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,n)},t.prototype.updatePriority=function(e,r){return e},t.prototype.filtersNodes=function(){return!0},t.prototype.getIndexedFilter=function(){return this.rangedFilter_.getIndexedFilter()},t.prototype.getIndex=function(){return this.index_},t.prototype.fullLimitUpdateChild_=function(e,r,n,i,o){var a;if(this.reverse_){var s=this.index_.getCompare();a=function(C,M){return s(M,C)}}else a=this.index_.getCompare();var u=e;_(u.numChildren()===this.limit_,"");var l=new R(r,n),c=this.reverse_?u.getFirstChild(this.index_):u.getLastChild(this.index_),f=this.rangedFilter_.matches(l);if(u.hasChild(r)){for(var h=u.getImmediateChild(r),d=i.getChildAfterChild(this.index_,c,this.reverse_);d!=null&&(d.name===r||u.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);var p=d==null?1:a(d,l),m=f&&!n.isEmpty()&&p>=0;if(m)return o!=null&&o.trackChildChange(_r(r,n,h)),u.updateImmediateChild(r,n);o!=null&&o.trackChildChange(gr(r,h));var y=u.updateImmediateChild(r,w.EMPTY_NODE),E=d!=null&&this.rangedFilter_.matches(d);return E?(o!=null&&o.trackChildChange(qt(d.name,d.node)),y.updateImmediateChild(d.name,d.node)):y}else return n.isEmpty()?e:f&&a(c,l)>=0?(o!=null&&(o.trackChildChange(gr(c.name,c.node)),o.trackChildChange(qt(r,n))),u.updateImmediateChild(r,n).updateImmediateChild(c.name,w.EMPTY_NODE)):e},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vs=function(){function t(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=L}return t.prototype.hasStart=function(){return this.startSet_},t.prototype.hasStartAfter=function(){return this.startAfterSet_},t.prototype.hasEndBefore=function(){return this.endBeforeSet_},t.prototype.isViewFromLeft=function(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"},t.prototype.getIndexStartValue=function(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_},t.prototype.getIndexStartName=function(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ze},t.prototype.hasEnd=function(){return this.endSet_},t.prototype.getIndexEndValue=function(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_},t.prototype.getIndexEndName=function(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:He},t.prototype.hasLimit=function(){return this.limitSet_},t.prototype.hasAnchoredLimit=function(){return this.limitSet_&&this.viewFrom_!==""},t.prototype.getLimit=function(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_},t.prototype.getIndex=function(){return this.index_},t.prototype.loadsAllData=function(){return!(this.startSet_||this.endSet_||this.limitSet_)},t.prototype.isDefault=function(){return this.loadsAllData()&&this.index_===L},t.prototype.copy=function(){var e=new t;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e},t}();function Hh(t){return t.loadsAllData()?new yi(t.getIndex()):t.hasLimit()?new Bh(t):new ps(t)}function Wh(t,e){var r=t.copy();return r.limitSet_=!0,r.limit_=e,r.viewFrom_="l",r}function Vh(t,e){var r=t.copy();return r.limitSet_=!0,r.limit_=e,r.viewFrom_="r",r}function Ei(t,e,r){var n=t.copy();return n.startSet_=!0,e===void 0&&(e=null),n.indexStartValue_=e,r!=null?(n.startNameSet_=!0,n.indexStartName_=r):(n.startNameSet_=!1,n.indexStartName_=""),n}function jh(t,e,r){var n;if(t.index_===We)typeof e=="string"&&(e=fs(e)),n=Ei(t,e,r);else{var i=void 0;r==null?i=He:i=fs(r),n=Ei(t,e,i)}return n.startAfterSet_=!0,n}function bi(t,e,r){var n=t.copy();return n.endSet_=!0,e===void 0&&(e=null),n.indexEndValue_=e,r!==void 0?(n.endNameSet_=!0,n.indexEndName_=r):(n.endNameSet_=!1,n.indexEndName_=""),n}function $h(t,e,r){var n,i;return t.index_===We?(typeof e=="string"&&(e=hs(e)),i=bi(t,e,r)):(r==null?n=ze:n=hs(r),i=bi(t,e,n)),i.endBeforeSet_=!0,i}function Xr(t,e){var r=t.copy();return r.index_=e,r}function gs(t){var e={};if(t.isDefault())return e;var r;return t.index_===L?r="$priority":t.index_===_i?r="$value":t.index_===We?r="$key":(_(t.index_ instanceof gi,"Unrecognized index type!"),r=t.index_.toString()),e.orderBy=G(r),t.startSet_&&(e.startAt=G(t.indexStartValue_),t.startNameSet_&&(e.startAt+=","+G(t.indexStartName_))),t.endSet_&&(e.endAt=G(t.indexEndValue_),t.endNameSet_&&(e.endAt+=","+G(t.indexEndName_))),t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function _s(t){var e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_)),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_)),t.limitSet_){e.l=t.limit_;var r=t.viewFrom_;r===""&&(t.isViewFromLeft()?r="l":r="r"),e.vf=r}return t.index_!==L&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gh=function(t){A(e,t);function e(r,n,i,o){var a=t.call(this)||this;return a.repoInfo_=r,a.onDataUpdate_=n,a.authTokenProvider_=i,a.appCheckTokenProvider_=o,a.log_=ur("p:rest:"),a.listens_={},a}return e.prototype.reportStats=function(r){throw new Error("Method not implemented.")},e.getListenId_=function(r,n){return n!==void 0?"tag$"+n:(_(r._queryParams.isDefault(),"should have a tag if it's not a default query."),r._path.toString())},e.prototype.listen=function(r,n,i,o){var a=this,s=r._path.toString();this.log_("Listen called for "+s+" "+r._queryIdentifier);var u=e.getListenId_(r,i),l={};this.listens_[u]=l;var c=gs(r._queryParams);this.restRequest_(s+".json",c,function(f,h){var d=h;if(f===404&&(d=null,f=null),f===null&&a.onDataUpdate_(s,d,!1,i),vt(a.listens_,u)===l){var p;f?f===401?p="permission_denied":p="rest_error:"+f:p="ok",o(p,null)}})},e.prototype.unlisten=function(r,n){var i=e.getListenId_(r,n);delete this.listens_[i]},e.prototype.get=function(r){var n=this,i=gs(r._queryParams),o=r._path.toString(),a=new he;return this.restRequest_(o+".json",i,function(s,u){var l=u;s===404&&(l=null,s=null),s===null?(n.onDataUpdate_(o,l,!1,null),a.resolve(l)):a.reject(new Error(l))}),a.promise},e.prototype.refreshAuthToken=function(r){},e.prototype.restRequest_=function(r,n,i){var o=this;return n===void 0&&(n={}),n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(function(a){var s=Z(a,2),u=s[0],l=s[1];u&&u.accessToken&&(n.auth=u.accessToken),l&&l.token&&(n.ac=l.token);var c=(o.repoInfo_.secure?"https://":"http://")+o.repoInfo_.host+r+"?ns="+o.repoInfo_.namespace+_f(n);o.log_("Sending REST request for "+c);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(i&&f.readyState===4){o.log_("REST Response for "+c+" received. status:",f.status,"response:",f.responseText);var h=null;if(f.status>=200&&f.status<300){try{h=ar(f.responseText)}catch{ee("Failed to parse JSON response for "+c+": "+f.responseText)}i(null,h)}else f.status!==401&&f.status!==404&&ee("Got unsuccessful REST response for "+c+" Status: "+f.status),i(f.status);i=null}},f.open("GET",c,!0),f.send()})},e}(Ka);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qh=function(){function t(){this.rootNode_=w.EMPTY_NODE}return t.prototype.getNode=function(e){return this.rootNode_.getChild(e)},t.prototype.updateSnapshot=function(e,r){this.rootNode_=this.rootNode_.updateChild(e,r)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jr(){return{value:null,children:new Map}}function zt(t,e,r){if(I(e))t.value=r,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,r);else{var n=S(e);t.children.has(n)||t.children.set(n,Jr());var i=t.children.get(n);e=D(e),zt(i,e,r)}}function Ti(t,e){if(I(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;var r=t.value;return t.value=null,r.forEachChild(L,function(o,a){zt(t,new N(o),a)}),Ti(t,e)}else if(t.children.size>0){var n=S(e);if(e=D(e),t.children.has(n)){var i=Ti(t.children.get(n),e);i&&t.children.delete(n)}return t.children.size===0}else return!0}function wi(t,e,r){t.value!==null?r(e,t.value):zh(t,function(n,i){var o=new N(e.toString()+"/"+n);wi(i,o,r)})}function zh(t,e){t.children.forEach(function(r,n){e(n,r)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ms=function(){function t(e){this.collection_=e,this.last_=null}return t.prototype.get=function(){var e=this.collection_.get(),r=T({},e);return this.last_&&q(this.last_,function(n,i){r[n]=r[n]-i}),this.last_=e,r},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ys=10*1e3,Kh=30*1e3,Qh=5*60*1e3,Yh=function(){function t(e,r){this.server_=r,this.statsToReport_={},this.statsListener_=new ms(e);var n=ys+(Kh-ys)*Math.random();cr(this.reportStats_.bind(this),Math.floor(n))}return t.prototype.reportStats_=function(){var e=this,r=this.statsListener_.get(),n={},i=!1;q(r,function(o,a){a>0&&Re(e.statsToReport_,o)&&(n[o]=a,i=!0)}),i&&this.server_.reportStats(n),cr(this.reportStats_.bind(this),Math.floor(Math.random()*2*Qh))},t}();function Xh(t,e){t.statsToReport_[e]=!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ne;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ne||(Ne={}));function Ci(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Si(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ii(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jh=function(){function t(e,r,n){this.path=e,this.affectedTree=r,this.revert=n,this.type=Ne.ACK_USER_WRITE,this.source=Ci()}return t.prototype.operationForChild=function(e){if(I(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;var r=this.affectedTree.subtree(new N(e));return new t(k(),r,this.revert)}else return _(S(this.path)===e,"operationForChild called for unrelated child."),new t(D(this.path),this.affectedTree,this.revert)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Es=function(){function t(e,r){this.source=e,this.path=r,this.type=Ne.LISTEN_COMPLETE}return t.prototype.operationForChild=function(e){return I(this.path)?new t(this.source,k()):new t(this.source,D(this.path))},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zr=function(){function t(e,r,n){this.source=e,this.path=r,this.snap=n,this.type=Ne.OVERWRITE}return t.prototype.operationForChild=function(e){return I(this.path)?new t(this.source,k(),this.snap.getImmediateChild(e)):new t(this.source,D(this.path),this.snap)},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ri=function(){function t(e,r,n){this.source=e,this.path=r,this.children=n,this.type=Ne.MERGE}return t.prototype.operationForChild=function(e){if(I(this.path)){var r=this.children.subtree(new N(e));return r.isEmpty()?null:r.value?new Zr(this.source,k(),r.value):new t(this.source,k(),r)}else return _(S(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new t(this.source,D(this.path),this.children)},t.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt=function(){function t(e,r,n){this.node_=e,this.fullyInitialized_=r,this.filtered_=n}return t.prototype.isFullyInitialized=function(){return this.fullyInitialized_},t.prototype.isFiltered=function(){return this.filtered_},t.prototype.isCompleteForPath=function(e){if(I(e))return this.isFullyInitialized()&&!this.filtered_;var r=S(e);return this.isCompleteForChild(r)},t.prototype.isCompleteForChild=function(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)},t.prototype.getNode=function(){return this.node_},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zh=function(){function t(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}return t}();function ed(t,e,r,n){var i=[],o=[];return e.forEach(function(a){a.type==="child_changed"&&t.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&o.push(Uh(a.childName,a.snapshotNode))}),mr(t,i,"child_removed",e,n,r),mr(t,i,"child_added",e,n,r),mr(t,i,"child_moved",o,n,r),mr(t,i,"child_changed",e,n,r),mr(t,i,"value",e,n,r),i}function mr(t,e,r,n,i,o){var a=n.filter(function(s){return s.type===r});a.sort(function(s,u){return rd(t,s,u)}),a.forEach(function(s){var u=td(t,s,o);i.forEach(function(l){l.respondsTo(s.type)&&e.push(l.createEvent(u,t.query_))})})}function td(t,e,r){return e.type==="value"||e.type==="child_removed"||(e.prevName=r.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function rd(t,e,r){if(e.childName==null||r.childName==null)throw Ht("Should only compare child_ events.");var n=new R(e.childName,e.snapshotNode),i=new R(r.childName,r.snapshotNode);return t.index_.compare(n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(t,e){return{eventCache:t,serverCache:e}}function yr(t,e,r,n){return en(new nt(e,r,n),t.serverCache)}function bs(t,e,r,n){return en(t.eventCache,new nt(e,r,n))}function tn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Ct(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ai,nd=function(){return Ai||(Ai=new Ke(Df)),Ai},ve=function(){function t(e,r){r===void 0&&(r=nd()),this.value=e,this.children=r}return t.fromObject=function(e){var r=new t(null);return q(e,function(n,i){r=r.set(new N(n),i)}),r},t.prototype.isEmpty=function(){return this.value===null&&this.children.isEmpty()},t.prototype.findRootMostMatchingPathAndValue=function(e,r){if(this.value!=null&&r(this.value))return{path:k(),value:this.value};if(I(e))return null;var n=S(e),i=this.children.get(n);if(i!==null){var o=i.findRootMostMatchingPathAndValue(D(e),r);if(o!=null){var a=H(new N(n),o.path);return{path:a,value:o.value}}else return null}else return null},t.prototype.findRootMostValueAndPath=function(e){return this.findRootMostMatchingPathAndValue(e,function(){return!0})},t.prototype.subtree=function(e){if(I(e))return this;var r=S(e),n=this.children.get(r);return n!==null?n.subtree(D(e)):new t(null)},t.prototype.set=function(e,r){if(I(e))return new t(r,this.children);var n=S(e),i=this.children.get(n)||new t(null),o=i.set(D(e),r),a=this.children.insert(n,o);return new t(this.value,a)},t.prototype.remove=function(e){if(I(e))return this.children.isEmpty()?new t(null):new t(null,this.children);var r=S(e),n=this.children.get(r);if(n){var i=n.remove(D(e)),o=void 0;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),this.value===null&&o.isEmpty()?new t(null):new t(this.value,o)}else return this},t.prototype.get=function(e){if(I(e))return this.value;var r=S(e),n=this.children.get(r);return n?n.get(D(e)):null},t.prototype.setTree=function(e,r){if(I(e))return r;var n=S(e),i=this.children.get(n)||new t(null),o=i.setTree(D(e),r),a=void 0;return o.isEmpty()?a=this.children.remove(n):a=this.children.insert(n,o),new t(this.value,a)},t.prototype.fold=function(e){return this.fold_(k(),e)},t.prototype.fold_=function(e,r){var n={};return this.children.inorderTraversal(function(i,o){n[i]=o.fold_(H(e,i),r)}),r(e,this.value,n)},t.prototype.findOnPath=function(e,r){return this.findOnPath_(e,k(),r)},t.prototype.findOnPath_=function(e,r,n){var i=this.value?n(r,this.value):!1;if(i)return i;if(I(e))return null;var o=S(e),a=this.children.get(o);return a?a.findOnPath_(D(e),H(r,o),n):null},t.prototype.foreachOnPath=function(e,r){return this.foreachOnPath_(e,k(),r)},t.prototype.foreachOnPath_=function(e,r,n){if(I(e))return this;this.value&&n(r,this.value);var i=S(e),o=this.children.get(i);return o?o.foreachOnPath_(D(e),H(r,i),n):new t(null)},t.prototype.foreach=function(e){this.foreach_(k(),e)},t.prototype.foreach_=function(e,r){this.children.inorderTraversal(function(n,i){i.foreach_(H(e,n),r)}),this.value&&r(e,this.value)},t.prototype.foreachChild=function(e){this.children.inorderTraversal(function(r,n){n.value&&e(r,n.value)})},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qe=function(){function t(e){this.writeTree_=e}return t.empty=function(){return new t(new ve(null))},t}();function Er(t,e,r){if(I(e))return new Qe(new ve(r));var n=t.writeTree_.findRootMostValueAndPath(e);if(n!=null){var i=n.path,o=n.value,a=ae(i,e);return o=o.updateChild(a,r),new Qe(t.writeTree_.set(i,o))}else{var s=new ve(r),u=t.writeTree_.setTree(e,s);return new Qe(u)}}function ki(t,e,r){var n=t;return q(r,function(i,o){n=Er(n,H(e,i),o)}),n}function Ts(t,e){if(I(e))return Qe.empty();var r=t.writeTree_.setTree(e,new ve(null));return new Qe(r)}function Ni(t,e){return St(t,e)!=null}function St(t,e){var r=t.writeTree_.findRootMostValueAndPath(e);return r!=null?t.writeTree_.get(r.path).getChild(ae(r.path,e)):null}function ws(t){var e=[],r=t.writeTree_.value;return r!=null?r.isLeafNode()||r.forEachChild(L,function(n,i){e.push(new R(n,i))}):t.writeTree_.children.inorderTraversal(function(n,i){i.value!=null&&e.push(new R(n,i.value))}),e}function it(t,e){if(I(e))return t;var r=St(t,e);return r!=null?new Qe(new ve(r)):new Qe(t.writeTree_.subtree(e))}function Oi(t){return t.writeTree_.isEmpty()}function Kt(t,e){return Cs(k(),t.writeTree_,e)}function Cs(t,e,r){if(e.value!=null)return r.updateChild(t,e.value);var n=null;return e.children.inorderTraversal(function(i,o){i===".priority"?(_(o.value!==null,"Priority writes must always be leaf nodes"),n=o.value):r=Cs(H(t,i),o,r)}),!r.getChild(t).isEmpty()&&n!==null&&(r=r.updateChild(H(t,".priority"),n)),r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,e){return ks(e,t)}function id(t,e,r,n,i){_(n>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:r,writeId:n,visible:i}),i&&(t.visibleWrites=Er(t.visibleWrites,e,r)),t.lastWriteId=n}function od(t,e,r,n){_(n>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:r,writeId:n,visible:!0}),t.visibleWrites=ki(t.visibleWrites,e,r),t.lastWriteId=n}function ad(t,e){for(var r=0;r<t.allWrites.length;r++){var n=t.allWrites[r];if(n.writeId===e)return n}return null}function sd(t,e){var r=t.allWrites.findIndex(function(l){return l.writeId===e});_(r>=0,"removeWrite called with nonexistent writeId.");var n=t.allWrites[r];t.allWrites.splice(r,1);for(var i=n.visible,o=!1,a=t.allWrites.length-1;i&&a>=0;){var s=t.allWrites[a];s.visible&&(a>=r&&ud(s,n.path)?i=!1:_e(n.path,s.path)&&(o=!0)),a--}if(i){if(o)return ld(t),!0;if(n.snap)t.visibleWrites=Ts(t.visibleWrites,n.path);else{var u=n.children;q(u,function(l){t.visibleWrites=Ts(t.visibleWrites,H(n.path,l))})}return!0}else return!1}function ud(t,e){if(t.snap)return _e(t.path,e);for(var r in t.children)if(t.children.hasOwnProperty(r)&&_e(H(t.path,r),e))return!0;return!1}function ld(t){t.visibleWrites=Ss(t.allWrites,cd,k()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function cd(t){return t.visible}function Ss(t,e,r){for(var n=Qe.empty(),i=0;i<t.length;++i){var o=t[i];if(e(o)){var a=o.path,s=void 0;if(o.snap)_e(r,a)?(s=ae(r,a),n=Er(n,s,o.snap)):_e(a,r)&&(s=ae(a,r),n=Er(n,k(),o.snap.getChild(s)));else if(o.children){if(_e(r,a))s=ae(r,a),n=ki(n,s,o.children);else if(_e(a,r))if(s=ae(a,r),I(s))n=ki(n,k(),o.children);else{var u=vt(o.children,S(s));if(u){var l=u.getChild(D(s));n=Er(n,k(),l)}}}else throw Ht("WriteRecord should have .snap or .children")}}return n}function Is(t,e,r,n,i){if(!n&&!i){var o=St(t.visibleWrites,e);if(o!=null)return o;var a=it(t.visibleWrites,e);if(Oi(a))return r;if(r==null&&!Ni(a,k()))return null;var s=r||w.EMPTY_NODE;return Kt(a,s)}else{var u=it(t.visibleWrites,e);if(!i&&Oi(u))return r;if(!i&&r==null&&!Ni(u,k()))return null;var l=function(h){return(h.visible||i)&&(!n||!~n.indexOf(h.writeId))&&(_e(h.path,e)||_e(e,h.path))},c=Ss(t.allWrites,l,e),s=r||w.EMPTY_NODE;return Kt(c,s)}}function fd(t,e,r){var n=w.EMPTY_NODE,i=St(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(L,function(s,u){n=n.updateImmediateChild(s,u)}),n;if(r){var o=it(t.visibleWrites,e);return r.forEachChild(L,function(s,u){var l=Kt(it(o,new N(s)),u);n=n.updateImmediateChild(s,l)}),ws(o).forEach(function(s){n=n.updateImmediateChild(s.name,s.node)}),n}else{var a=it(t.visibleWrites,e);return ws(a).forEach(function(s){n=n.updateImmediateChild(s.name,s.node)}),n}}function hd(t,e,r,n,i){_(n||i,"Either existingEventSnap or existingServerSnap must exist");var o=H(e,r);if(Ni(t.visibleWrites,o))return null;var a=it(t.visibleWrites,o);return Oi(a)?i.getChild(r):Kt(a,i.getChild(r))}function dd(t,e,r,n){var i=H(e,r),o=St(t.visibleWrites,i);if(o!=null)return o;if(n.isCompleteForChild(r)){var a=it(t.visibleWrites,i);return Kt(a,n.getNode().getImmediateChild(r))}else return null}function pd(t,e){return St(t.visibleWrites,e)}function vd(t,e,r,n,i,o,a){var s,u=it(t.visibleWrites,e),l=St(u,k());if(l!=null)s=l;else if(r!=null)s=Kt(u,r);else return[];if(s=s.withIndex(a),!s.isEmpty()&&!s.isLeafNode()){for(var c=[],f=a.getCompare(),h=o?s.getReverseIteratorFrom(n,a):s.getIteratorFrom(n,a),d=h.getNext();d&&c.length<i;)f(d,n)!==0&&c.push(d),d=h.getNext();return c}else return[]}function gd(){return{visibleWrites:Qe.empty(),allWrites:[],lastWriteId:-1}}function nn(t,e,r,n){return Is(t.writeTree,t.treePath,e,r,n)}function Pi(t,e){return fd(t.writeTree,t.treePath,e)}function Rs(t,e,r,n){return hd(t.writeTree,t.treePath,e,r,n)}function on(t,e){return pd(t.writeTree,H(t.treePath,e))}function _d(t,e,r,n,i,o){return vd(t.writeTree,t.treePath,e,r,n,i,o)}function Mi(t,e,r){return dd(t.writeTree,t.treePath,e,r)}function As(t,e){return ks(H(t.treePath,e),t.writeTree)}function ks(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var md=function(){function t(){this.changeMap=new Map}return t.prototype.trackChildChange=function(e){var r=e.type,n=e.childName;_(r==="child_added"||r==="child_changed"||r==="child_removed","Only child changes supported for tracking"),_(n!==".priority","Only non-priority child changes can be tracked.");var i=this.changeMap.get(n);if(i){var o=i.type;if(r==="child_added"&&o==="child_removed")this.changeMap.set(n,_r(n,e.snapshotNode,i.snapshotNode));else if(r==="child_removed"&&o==="child_added")this.changeMap.delete(n);else if(r==="child_removed"&&o==="child_changed")this.changeMap.set(n,gr(n,i.oldSnap));else if(r==="child_changed"&&o==="child_added")this.changeMap.set(n,qt(n,e.snapshotNode));else if(r==="child_changed"&&o==="child_changed")this.changeMap.set(n,_r(n,e.snapshotNode,i.oldSnap));else throw Ht("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(n,e)},t.prototype.getChanges=function(){return Array.from(this.changeMap.values())},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yd=function(){function t(){}return t.prototype.getCompleteChild=function(e){return null},t.prototype.getChildAfterChild=function(e,r,n){return null},t}(),Ns=new yd,Di=function(){function t(e,r,n){n===void 0&&(n=null),this.writes_=e,this.viewCache_=r,this.optCompleteServerCache_=n}return t.prototype.getCompleteChild=function(e){var r=this.viewCache_.eventCache;if(r.isCompleteForChild(e))return r.getNode().getImmediateChild(e);var n=this.optCompleteServerCache_!=null?new nt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Mi(this.writes_,e,n)},t.prototype.getChildAfterChild=function(e,r,n){var i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ct(this.viewCache_),o=_d(this.writes_,i,r,1,n,e);return o.length===0?null:o[0]},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(t){return{filter:t}}function bd(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Td(t,e,r,n,i){var o=new md,a,s;if(r.type===Ne.OVERWRITE){var u=r;u.source.fromUser?a=xi(t,e,u.path,u.snap,n,i,o):(_(u.source.fromServer,"Unknown source."),s=u.source.tagged||e.serverCache.isFiltered()&&!I(u.path),a=an(t,e,u.path,u.snap,n,i,s,o))}else if(r.type===Ne.MERGE){var l=r;l.source.fromUser?a=Cd(t,e,l.path,l.children,n,i,o):(_(l.source.fromServer,"Unknown source."),s=l.source.tagged||e.serverCache.isFiltered(),a=Li(t,e,l.path,l.children,n,i,s,o))}else if(r.type===Ne.ACK_USER_WRITE){var c=r;c.revert?a=Rd(t,e,c.path,n,i,o):a=Sd(t,e,c.path,c.affectedTree,n,i,o)}else if(r.type===Ne.LISTEN_COMPLETE)a=Id(t,e,r.path,n,o);else throw Ht("Unknown operation type: "+r.type);var f=o.getChanges();return wd(e,a,f),{viewCache:a,changes:f}}function wd(t,e,r){var n=e.eventCache;if(n.isFullyInitialized()){var i=n.getNode().isLeafNode()||n.getNode().isEmpty(),o=tn(t);(r.length>0||!t.eventCache.isFullyInitialized()||i&&!n.getNode().equals(o)||!n.getNode().getPriority().equals(o.getPriority()))&&r.push(ds(tn(e)))}}function Os(t,e,r,n,i,o){var a=e.eventCache;if(on(n,r)!=null)return e;var s=void 0,u=void 0;if(I(r))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){var l=Ct(e),c=l instanceof w?l:w.EMPTY_NODE,f=Pi(n,c);s=t.filter.updateFullNode(e.eventCache.getNode(),f,o)}else{var h=nn(n,Ct(e));s=t.filter.updateFullNode(e.eventCache.getNode(),h,o)}else{var d=S(r);if(d===".priority"){_(rt(r)===1,"Can't have a priority with additional path components");var p=a.getNode();u=e.serverCache.getNode();var m=Rs(n,r,p,u);m!=null?s=t.filter.updatePriority(p,m):s=a.getNode()}else{var y=D(r),E=void 0;if(a.isCompleteForChild(d)){u=e.serverCache.getNode();var C=Rs(n,r,a.getNode(),u);C!=null?E=a.getNode().getImmediateChild(d).updateChild(y,C):E=a.getNode().getImmediateChild(d)}else E=Mi(n,d,e.serverCache);E!=null?s=t.filter.updateChild(a.getNode(),d,E,y,i,o):s=a.getNode()}}return yr(e,s,a.isFullyInitialized()||I(r),t.filter.filtersNodes())}function an(t,e,r,n,i,o,a,s){var u=e.serverCache,l,c=a?t.filter:t.filter.getIndexedFilter();if(I(r))l=c.updateFullNode(u.getNode(),n,null);else if(c.filtersNodes()&&!u.isFiltered()){var f=u.getNode().updateChild(r,n);l=c.updateFullNode(u.getNode(),f,null)}else{var h=S(r);if(!u.isCompleteForPath(r)&&rt(r)>1)return e;var d=D(r),p=u.getNode().getImmediateChild(h),m=p.updateChild(d,n);h===".priority"?l=c.updatePriority(u.getNode(),m):l=c.updateChild(u.getNode(),h,m,d,Ns,null)}var y=bs(e,l,u.isFullyInitialized()||I(r),c.filtersNodes()),E=new Di(i,y,o);return Os(t,y,r,i,E,s)}function xi(t,e,r,n,i,o,a){var s=e.eventCache,u,l,c=new Di(i,e,o);if(I(r))l=t.filter.updateFullNode(e.eventCache.getNode(),n,a),u=yr(e,l,!0,t.filter.filtersNodes());else{var f=S(r);if(f===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),n),u=yr(e,l,s.isFullyInitialized(),s.isFiltered());else{var h=D(r),d=s.getNode().getImmediateChild(f),p=void 0;if(I(h))p=n;else{var m=c.getCompleteChild(f);m!=null?fi(h)===".priority"&&m.getChild(Za(h)).isEmpty()?p=m:p=m.updateChild(h,n):p=w.EMPTY_NODE}if(d.equals(p))u=e;else{var y=t.filter.updateChild(s.getNode(),f,p,h,c,a);u=yr(e,y,s.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function Ps(t,e){return t.eventCache.isCompleteForChild(e)}function Cd(t,e,r,n,i,o,a){var s=e;return n.foreach(function(u,l){var c=H(r,u);Ps(e,S(c))&&(s=xi(t,s,c,l,i,o,a))}),n.foreach(function(u,l){var c=H(r,u);Ps(e,S(c))||(s=xi(t,s,c,l,i,o,a))}),s}function Ms(t,e,r){return r.foreach(function(n,i){e=e.updateChild(n,i)}),e}function Li(t,e,r,n,i,o,a,s){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;var u=e,l;I(r)?l=n:l=new ve(null).setTree(r,n);var c=e.serverCache.getNode();return l.children.inorderTraversal(function(f,h){if(c.hasChild(f)){var d=e.serverCache.getNode().getImmediateChild(f),p=Ms(t,d,h);u=an(t,u,new N(f),p,i,o,a,s)}}),l.children.inorderTraversal(function(f,h){var d=!e.serverCache.isCompleteForChild(f)&&h.value===void 0;if(!c.hasChild(f)&&!d){var p=e.serverCache.getNode().getImmediateChild(f),m=Ms(t,p,h);u=an(t,u,new N(f),m,i,o,a,s)}}),u}function Sd(t,e,r,n,i,o,a){if(on(i,r)!=null)return e;var s=e.serverCache.isFiltered(),u=e.serverCache;if(n.value!=null){if(I(r)&&u.isFullyInitialized()||u.isCompleteForPath(r))return an(t,e,r,u.getNode().getChild(r),i,o,s,a);if(I(r)){var l=new ve(null);return u.getNode().forEachChild(We,function(f,h){l=l.set(new N(f),h)}),Li(t,e,r,l,i,o,s,a)}else return e}else{var c=new ve(null);return n.foreach(function(f,h){var d=H(r,f);u.isCompleteForPath(d)&&(c=c.set(f,u.getNode().getChild(d)))}),Li(t,e,r,c,i,o,s,a)}}function Id(t,e,r,n,i){var o=e.serverCache,a=bs(e,o.getNode(),o.isFullyInitialized()||I(r),o.isFiltered());return Os(t,a,r,n,Ns,i)}function Rd(t,e,r,n,i,o){var a;if(on(n,r)!=null)return e;var s=new Di(n,e,i),u=e.eventCache.getNode(),l=void 0;if(I(r)||S(r)===".priority"){var c=void 0;if(e.serverCache.isFullyInitialized())c=nn(n,Ct(e));else{var f=e.serverCache.getNode();_(f instanceof w,"serverChildren would be complete if leaf node"),c=Pi(n,f)}c=c,l=t.filter.updateFullNode(u,c,o)}else{var h=S(r),d=Mi(n,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=u.getImmediateChild(h)),d!=null?l=t.filter.updateChild(u,h,d,D(r),s,o):e.eventCache.getNode().hasChild(h)?l=t.filter.updateChild(u,h,w.EMPTY_NODE,D(r),s,o):l=u,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=nn(n,Ct(e)),a.isLeafNode()&&(l=t.filter.updateFullNode(l,a,o)))}return a=e.serverCache.isFullyInitialized()||on(n,k())!=null,yr(e,l,a,t.filter.filtersNodes())}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ad=function(){function t(e,r){this.query_=e,this.eventRegistrations_=[];var n=this.query_._queryParams,i=new yi(n.getIndex()),o=Hh(n);this.processor_=Ed(o);var a=r.serverCache,s=r.eventCache,u=i.updateFullNode(w.EMPTY_NODE,a.getNode(),null),l=o.updateFullNode(w.EMPTY_NODE,s.getNode(),null),c=new nt(u,a.isFullyInitialized(),i.filtersNodes()),f=new nt(l,s.isFullyInitialized(),o.filtersNodes());this.viewCache_=en(f,c),this.eventGenerator_=new Zh(this.query_)}return Object.defineProperty(t.prototype,"query",{get:function(){return this.query_},enumerable:!1,configurable:!0}),t}();function kd(t){return t.viewCache_.serverCache.getNode()}function Nd(t){return tn(t.viewCache_)}function Od(t,e){var r=Ct(t.viewCache_);return r&&(t.query._queryParams.loadsAllData()||!I(e)&&!r.getImmediateChild(S(e)).isEmpty())?r.getChild(e):null}function Ds(t){return t.eventRegistrations_.length===0}function Pd(t,e){t.eventRegistrations_.push(e)}function xs(t,e,r){var n=[];if(r){_(e==null,"A cancel should cancel all event registrations.");var i=t.query._path;t.eventRegistrations_.forEach(function(u){var l=u.createCancelEvent(r,i);l&&n.push(l)})}if(e){for(var o=[],a=0;a<t.eventRegistrations_.length;++a){var s=t.eventRegistrations_[a];if(!s.matches(e))o.push(s);else if(e.hasAnyCallback()){o=o.concat(t.eventRegistrations_.slice(a+1));break}}t.eventRegistrations_=o}else t.eventRegistrations_=[];return n}function Ls(t,e,r,n){e.type===Ne.MERGE&&e.source.queryId!==null&&(_(Ct(t.viewCache_),"We should always have a full cache before handling merges"),_(tn(t.viewCache_),"Missing event cache, even though we have a server cache"));var i=t.viewCache_,o=Td(t.processor_,i,e,r,n);return bd(t.processor_,o.viewCache),_(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=o.viewCache,Fs(t,o.changes,o.viewCache.eventCache.getNode(),null)}function Md(t,e){var r=t.viewCache_.eventCache,n=[];if(!r.getNode().isLeafNode()){var i=r.getNode();i.forEachChild(L,function(o,a){n.push(qt(o,a))})}return r.isFullyInitialized()&&n.push(ds(r.getNode())),Fs(t,n,r.getNode(),e)}function Fs(t,e,r,n){var i=n?[n]:t.eventRegistrations_;return ed(t.eventGenerator_,e,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sn,Us=function(){function t(){this.views=new Map}return t}();function Dd(t){_(!sn,"__referenceConstructor has already been defined"),sn=t}function xd(){return _(sn,"Reference.ts has not been loaded"),sn}function Ld(t){return t.views.size===0}function Fi(t,e,r,n){var i,o,a=e.source.queryId;if(a!==null){var s=t.views.get(a);return _(s!=null,"SyncTree gave us an op for an invalid query."),Ls(s,e,r,n)}else{var u=[];try{for(var l=Q(t.views.values()),c=l.next();!c.done;c=l.next()){var s=c.value;u=u.concat(Ls(s,e,r,n))}}catch(f){i={error:f}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}return u}}function Bs(t,e,r,n,i){var o=e._queryIdentifier,a=t.views.get(o);if(!a){var s=nn(r,i?n:null),u=!1;s?u=!0:n instanceof w?(s=Pi(r,n),u=!1):(s=w.EMPTY_NODE,u=!1);var l=en(new nt(s,u,!1),new nt(n,i,!1));return new Ad(e,l)}return a}function Fd(t,e,r,n,i,o){var a=Bs(t,e,n,i,o);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,a),Pd(a,r),Md(a,r)}function Ud(t,e,r,n){var i,o,a=e._queryIdentifier,s=[],u=[],l=at(t);if(a==="default")try{for(var c=Q(t.views.entries()),f=c.next();!f.done;f=c.next()){var h=Z(f.value,2),d=h[0],p=h[1];u=u.concat(xs(p,r,n)),Ds(p)&&(t.views.delete(d),p.query._queryParams.loadsAllData()||s.push(p.query))}}catch(m){i={error:m}}finally{try{f&&!f.done&&(o=c.return)&&o.call(c)}finally{if(i)throw i.error}}else{var p=t.views.get(a);p&&(u=u.concat(xs(p,r,n)),Ds(p)&&(t.views.delete(a),p.query._queryParams.loadsAllData()||s.push(p.query)))}return l&&!at(t)&&s.push(new(xd())(e._repo,e._path)),{removed:s,events:u}}function Hs(t){var e,r,n=[];try{for(var i=Q(t.views.values()),o=i.next();!o.done;o=i.next()){var a=o.value;a.query._queryParams.loadsAllData()||n.push(a)}}catch(s){e={error:s}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n}function ot(t,e){var r,n,i=null;try{for(var o=Q(t.views.values()),a=o.next();!a.done;a=o.next()){var s=a.value;i=i||Od(s,e)}}catch(u){r={error:u}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return i}function Ws(t,e){var r=e._queryParams;if(r.loadsAllData())return un(t);var n=e._queryIdentifier;return t.views.get(n)}function Vs(t,e){return Ws(t,e)!=null}function at(t){return un(t)!=null}function un(t){var e,r;try{for(var n=Q(t.views.values()),i=n.next();!i.done;i=n.next()){var o=i.value;if(o.query._queryParams.loadsAllData())return o}}catch(a){e={error:a}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ln;function Bd(t){_(!ln,"__referenceConstructor has already been defined"),ln=t}function Hd(){return _(ln,"Reference.ts has not been loaded"),ln}var Wd=1,js=function(){function t(e){this.listenProvider_=e,this.syncPointTree_=new ve(null),this.pendingWriteTree_=gd(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}return t}();function Ui(t,e,r,n,i){return id(t.pendingWriteTree_,e,r,n,i),i?Qt(t,new Zr(Ci(),e,r)):[]}function Vd(t,e,r,n){od(t.pendingWriteTree_,e,r,n);var i=ve.fromObject(r);return Qt(t,new Ri(Ci(),e,i))}function st(t,e,r){r===void 0&&(r=!1);var n=ad(t.pendingWriteTree_,e),i=sd(t.pendingWriteTree_,e);if(i){var o=new ve(null);return n.snap!=null?o=o.set(k(),!0):q(n.children,function(a){o=o.set(new N(a),!0)}),Qt(t,new Jh(n.path,o,r))}else return[]}function br(t,e,r){return Qt(t,new Zr(Si(),e,r))}function jd(t,e,r){var n=ve.fromObject(r);return Qt(t,new Ri(Si(),e,n))}function $d(t,e){return Qt(t,new Es(Si(),e))}function Gd(t,e,r){var n=Hi(t,r);if(n){var i=Wi(n),o=i.path,a=i.queryId,s=ae(o,e),u=new Es(Ii(a),s);return Vi(t,o,u)}else return[]}function Bi(t,e,r,n){var i=e._path,o=t.syncPointTree_.get(i),a=[];if(o&&(e._queryIdentifier==="default"||Vs(o,e))){var s=Ud(o,e,r,n);Ld(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));var u=s.removed;a=s.events;var l=u.findIndex(function(C){return C._queryParams.loadsAllData()})!==-1,c=t.syncPointTree_.findOnPath(i,function(C,M){return at(M)});if(l&&!c){var f=t.syncPointTree_.subtree(i);if(!f.isEmpty())for(var h=Qd(f),d=0;d<h.length;++d){var p=h[d],m=p.query,y=zs(t,p);t.listenProvider_.startListening(Tr(m),fn(t,m),y.hashFn,y.onComplete)}}if(!c&&u.length>0&&!n)if(l){var E=null;t.listenProvider_.stopListening(Tr(e),E)}else u.forEach(function(C){var M=t.queryToTagMap.get(hn(C));t.listenProvider_.stopListening(Tr(C),M)});Yd(t,u)}return a}function qd(t,e,r,n){var i=Hi(t,n);if(i!=null){var o=Wi(i),a=o.path,s=o.queryId,u=ae(a,e),l=new Zr(Ii(s),u,r);return Vi(t,a,l)}else return[]}function zd(t,e,r,n){var i=Hi(t,n);if(i){var o=Wi(i),a=o.path,s=o.queryId,u=ae(a,e),l=ve.fromObject(r),c=new Ri(Ii(s),u,l);return Vi(t,a,c)}else return[]}function $s(t,e,r){var n=e._path,i=null,o=!1;t.syncPointTree_.foreachOnPath(n,function(m,y){var E=ae(m,n);i=i||ot(y,E),o=o||at(y)});var a=t.syncPointTree_.get(n);a?(o=o||at(a),i=i||ot(a,k())):(a=new Us,t.syncPointTree_=t.syncPointTree_.set(n,a));var s;if(i!=null)s=!0;else{s=!1,i=w.EMPTY_NODE;var u=t.syncPointTree_.subtree(n);u.foreachChild(function(m,y){var E=ot(y,k());E&&(i=i.updateImmediateChild(m,E))})}var l=Vs(a,e);if(!l&&!e._queryParams.loadsAllData()){var c=hn(e);_(!t.queryToTagMap.has(c),"View does not exist, but we have a tag");var f=Xd();t.queryToTagMap.set(c,f),t.tagToQueryMap.set(f,c)}var h=rn(t.pendingWriteTree_,n),d=Fd(a,e,r,h,i,s);if(!l&&!o){var p=Ws(a,e);d=d.concat(Jd(t,e,p))}return d}function cn(t,e,r){var n=!0,i=t.pendingWriteTree_,o=t.syncPointTree_.findOnPath(e,function(a,s){var u=ae(a,e),l=ot(s,u);if(l)return l});return Is(i,e,o,r,n)}function Kd(t,e){var r=e._path,n=null;t.syncPointTree_.foreachOnPath(r,function(l,c){var f=ae(l,r);n=n||ot(c,f)});var i=t.syncPointTree_.get(r);i?n=n||ot(i,k()):(i=new Us,t.syncPointTree_=t.syncPointTree_.set(r,i));var o=n!=null,a=o?new nt(n,!0,!1):null,s=rn(t.pendingWriteTree_,e._path),u=Bs(i,e,s,o?a.getNode():w.EMPTY_NODE,o);return Nd(u)}function Qt(t,e){return Gs(e,t.syncPointTree_,null,rn(t.pendingWriteTree_,k()))}function Gs(t,e,r,n){if(I(t.path))return qs(t,e,r,n);var i=e.get(k());r==null&&i!=null&&(r=ot(i,k()));var o=[],a=S(t.path),s=t.operationForChild(a),u=e.children.get(a);if(u&&s){var l=r?r.getImmediateChild(a):null,c=As(n,a);o=o.concat(Gs(s,u,l,c))}return i&&(o=o.concat(Fi(i,t,n,r))),o}function qs(t,e,r,n){var i=e.get(k());r==null&&i!=null&&(r=ot(i,k()));var o=[];return e.children.inorderTraversal(function(a,s){var u=r?r.getImmediateChild(a):null,l=As(n,a),c=t.operationForChild(a);c&&(o=o.concat(qs(c,s,u,l)))}),i&&(o=o.concat(Fi(i,t,n,r))),o}function zs(t,e){var r=e.query,n=fn(t,r);return{hashFn:function(){var i=kd(e)||w.EMPTY_NODE;return i.hash()},onComplete:function(i){if(i==="ok")return n?Gd(t,r._path,n):$d(t,r._path);var o=Ff(i,r);return Bi(t,r,null,o)}}}function fn(t,e){var r=hn(e);return t.queryToTagMap.get(r)}function hn(t){return t._path.toString()+"$"+t._queryIdentifier}function Hi(t,e){return t.tagToQueryMap.get(e)}function Wi(t){var e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new N(t.substr(0,e))}}function Vi(t,e,r){var n=t.syncPointTree_.get(e);_(n,"Missing sync point for query tag that we're tracking");var i=rn(t.pendingWriteTree_,e);return Fi(n,r,i,null)}function Qd(t){return t.fold(function(e,r,n){if(r&&at(r)){var i=un(r);return[i]}else{var o=[];return r&&(o=Hs(r)),q(n,function(a,s){o=o.concat(s)}),o}})}function Tr(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Hd())(t._repo,t._path):t}function Yd(t,e){for(var r=0;r<e.length;++r){var n=e[r];if(!n._queryParams.loadsAllData()){var i=hn(n),o=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(o)}}}function Xd(){return Wd++}function Jd(t,e,r){var n=e._path,i=fn(t,e),o=zs(t,r),a=t.listenProvider_.startListening(Tr(e),i,o.hashFn,o.onComplete),s=t.syncPointTree_.subtree(n);if(i)_(!at(s.value),"If we're adding a query, it shouldn't be shadowed");else for(var u=s.fold(function(f,h,d){if(!I(f)&&h&&at(h))return[un(h).query];var p=[];return h&&(p=p.concat(Hs(h).map(function(m){return m.query}))),q(d,function(m,y){p=p.concat(y)}),p}),l=0;l<u.length;++l){var c=u[l];t.listenProvider_.stopListening(Tr(c),fn(t,c))}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zd=function(){function t(e){this.node_=e}return t.prototype.getImmediateChild=function(e){var r=this.node_.getImmediateChild(e);return new t(r)},t.prototype.node=function(){return this.node_},t}(),ep=function(){function t(e,r){this.syncTree_=e,this.path_=r}return t.prototype.getImmediateChild=function(e){var r=H(this.path_,e);return new t(this.syncTree_,r)},t.prototype.node=function(){return cn(this.syncTree_,this.path_)},t}(),tp=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ks=function(t,e,r){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return rp(t[".sv"],e,r);if(typeof t[".sv"]=="object")return np(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},rp=function(t,e,r){switch(t){case"timestamp":return r.timestamp;default:_(!1,"Unexpected server value: "+t)}},np=function(t,e,r){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));var n=t.increment;typeof n!="number"&&_(!1,"Unexpected increment value: "+n);var i=e.node();if(_(i!==null&&typeof i!="undefined","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return n;var o=i,a=o.getValue();return typeof a!="number"?n:a+n},Qs=function(t,e,r,n){return $i(e,new ep(r,t),n)},ji=function(t,e,r){return $i(t,new Zd(e),r)};function $i(t,e,r){var n=t.getPriority().val(),i=Ks(n,e.getImmediateChild(".priority"),r),o;if(t.isLeafNode()){var a=t,s=Ks(a.getValue(),e,r);return s!==a.getValue()||i!==a.getPriority().val()?new jt(s,V(i)):t}else{var u=t;return o=u,i!==u.getPriority().val()&&(o=o.updatePriority(new jt(i))),u.forEachChild(L,function(l,c){var f=$i(c,e.getImmediateChild(l),r);f!==c&&(o=o.updateImmediateChild(l,f))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gi=function(){function t(e,r,n){e===void 0&&(e=""),r===void 0&&(r=null),n===void 0&&(n={children:{},childCount:0}),this.name=e,this.parent=r,this.node=n}return t}();function dn(t,e){for(var r=e instanceof N?e:new N(e),n=t,i=S(r);i!==null;){var o=vt(n.node.children,i)||{children:{},childCount:0};n=new Gi(i,n,o),r=D(r),i=S(r)}return n}function It(t){return t.node.value}function qi(t,e){t.node.value=e,zi(t)}function Ys(t){return t.node.childCount>0}function ip(t){return It(t)===void 0&&!Ys(t)}function pn(t,e){q(t.node.children,function(r,n){e(new Gi(r,t,n))})}function Xs(t,e,r,n){r&&!n&&e(t),pn(t,function(i){Xs(i,e,!0,n)}),r&&n&&e(t)}function op(t,e,r){for(var n=r?t:t.parent;n!==null;){if(e(n))return!0;n=n.parent}return!1}function wr(t){return new N(t.parent===null?t.name:wr(t.parent)+"/"+t.name)}function zi(t){t.parent!==null&&ap(t.parent,t.name,t)}function ap(t,e,r){var n=ip(r),i=Re(t.node.children,e);n&&i?(delete t.node.children[e],t.node.childCount--,zi(t)):!n&&!i&&(t.node.children[e]=r.node,t.node.childCount++,zi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sp=/[\[\].#$\/\u0000-\u001F\u007F]/,up=/[\[\].#$\u0000-\u001F\u007F]/,Ki=10*1024*1024,vn=function(t){return typeof t=="string"&&t.length!==0&&!sp.test(t)},Js=function(t){return typeof t=="string"&&t.length!==0&&!up.test(t)},lp=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Js(t)},Cr=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!jr(t)||t&&typeof t=="object"&&Re(t,".sv")},Ve=function(t,e,r,n){n&&e===void 0||Sr(de(t,"value"),e,r)},Sr=function(t,e,r){var n=r instanceof N?new _h(r,t):r;if(e===void 0)throw new Error(t+"contains undefined "+Tt(n));if(typeof e=="function")throw new Error(t+"contains a function "+Tt(n)+" with contents = "+e.toString());if(jr(e))throw new Error(t+"contains "+e.toString()+" "+Tt(n));if(typeof e=="string"&&e.length>Ki/3&&Vr(e)>Ki)throw new Error(t+"contains a string greater than "+Ki+" utf8 bytes "+Tt(n)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){var i=!1,o=!1;if(q(e,function(a,s){if(a===".value")i=!0;else if(a!==".priority"&&a!==".sv"&&(o=!0,!vn(a)))throw new Error(t+" contains an invalid key ("+a+") "+Tt(n)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);mh(n,a),Sr(t,s,n),yh(n)}),i&&o)throw new Error(t+' contains ".value" child '+Tt(n)+" in addition to actual children.")}},cp=function(t,e){var r,n;for(r=0;r<e.length;r++){n=e[r];for(var i=hr(n),o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!vn(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+n.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(gh);var a=null;for(r=0;r<e.length;r++){if(n=e[r],a!==null&&_e(a,n))throw new Error(t+"contains a path "+a.toString()+" that is ancestor of another path "+n.toString());a=n}},Zs=function(t,e,r,n){if(!(n&&e===void 0)){var i=de(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");var o=[];q(e,function(a,s){var u=new N(a);if(Sr(i,s,H(r,u)),fi(u)===".priority"&&!Cr(s))throw new Error(i+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(u)}),cp(i,o)}},Qi=function(t,e,r){if(!(r&&e===void 0)){if(jr(e))throw new Error(de(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Cr(e))throw new Error(de(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},fp=function(t,e,r){if(!(r&&e===void 0))switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(de(t,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}},Ir=function(t,e,r,n){if(!(n&&r===void 0)&&!vn(r))throw new Error(de(t,e)+'was an invalid key = "'+r+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},Rr=function(t,e,r,n){if(!(n&&r===void 0)&&!Js(r))throw new Error(de(t,e)+'was an invalid path = "'+r+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},hp=function(t,e,r,n){r&&(r=r.replace(/^\/*\.info(\/|$)/,"/")),Rr(t,e,r,n)},me=function(t,e){if(S(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},eu=function(t,e){var r=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!vn(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||r.length!==0&&!lp(r))throw new Error(de(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)},dp=function(t,e,r,n){if(!(n&&r===void 0)&&typeof r!="boolean")throw new Error(de(t,e)+"must be a boolean.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pp=function(){function t(){this.eventLists_=[],this.recursionDepth_=0}return t}();function gn(t,e){for(var r=null,n=0;n<e.length;n++){var i=e[n],o=i.getPath();r!==null&&!hi(o,r.path)&&(t.eventLists_.push(r),r=null),r===null&&(r={events:[],path:o}),r.events.push(i)}r&&t.eventLists_.push(r)}function Yi(t,e,r){gn(t,r),tu(t,function(n){return hi(n,e)})}function ye(t,e,r){gn(t,r),tu(t,function(n){return _e(n,e)||_e(e,n)})}function tu(t,e){t.recursionDepth_++;for(var r=!0,n=0;n<t.eventLists_.length;n++){var i=t.eventLists_[n];if(i){var o=i.path;e(o)?(vp(t.eventLists_[n]),t.eventLists_[n]=null):r=!1}}r&&(t.eventLists_=[]),t.recursionDepth_--}function vp(t){for(var e=0;e<t.events.length;e++){var r=t.events[e];if(r!==null){t.events[e]=null;var n=r.getEventRunner();yt&&X("event: "+r.toString()),Vt(n)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ru="repo_interrupt",gp=25,_p=function(){function t(e,r,n,i){this.repoInfo_=e,this.forceRestClient_=r,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new pp,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Jr(),this.transactionQueueTree_=new Gi,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}return t.prototype.toString=function(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host},t}();function mp(t,e,r){if(t.stats_=ui(t.repoInfo_),t.forceRestClient_||Bf())t.server_=new Gh(t.repoInfo_,function(n,i,o,a){iu(t,n,i,o,a)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(function(){return ou(t,!0)},0);else{if(typeof r!="undefined"&&r!==null){if(typeof r!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{G(r)}catch(n){throw new Error("Invalid authOverride provided: "+n)}}t.persistentConnection_=new wt(t.repoInfo_,e,function(n,i,o,a){iu(t,n,i,o,a)},function(n){ou(t,n)},function(n){Ep(t,n)},t.authTokenProvider_,t.appCheckProvider_,r),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(function(n){t.server_.refreshAuthToken(n)}),t.appCheckProvider_.addTokenChangeListener(function(n){t.server_.refreshAppCheckToken(n.token)}),t.statsReporter_=Gf(t.repoInfo_,function(){return new Yh(t.stats_,t.server_)}),t.infoData_=new qh,t.infoSyncTree_=new js({startListening:function(n,i,o,a){var s=[],u=t.infoData_.getNode(n._path);return u.isEmpty()||(s=br(t.infoSyncTree_,n._path,u),setTimeout(function(){a("ok")},0)),s},stopListening:function(){}}),Xi(t,"connected",!1),t.serverSyncTree_=new js({startListening:function(n,i,o,a){return t.server_.listen(n,o,i,function(s,u){var l=a(s,u);ye(t.eventQueue_,n._path,l)}),[]},stopListening:function(n,i){t.server_.unlisten(n,i)}})}function nu(t){var e=t.infoData_.getNode(new N(".info/serverTimeOffset")),r=e.val()||0;return new Date().getTime()+r}function Ar(t){return tp({timestamp:nu(t)})}function iu(t,e,r,n,i){t.dataUpdateCount++;var o=new N(e);r=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,r):r;var a=[];if(i)if(n){var s=Wr(r,function(h){return V(h)});a=zd(t.serverSyncTree_,o,s,i)}else{var u=V(r);a=qd(t.serverSyncTree_,o,u,i)}else if(n){var l=Wr(r,function(h){return V(h)});a=jd(t.serverSyncTree_,o,l)}else{var c=V(r);a=br(t.serverSyncTree_,o,c)}var f=o;a.length>0&&(f=Xt(t,o)),ye(t.eventQueue_,f,a)}function yp(t,e){t.interceptServerDataCallback_=e}function ou(t,e){Xi(t,"connected",e),e===!1&&wp(t)}function Ep(t,e){q(e,function(r,n){Xi(t,r,n)})}function Xi(t,e,r){var n=new N("/.info/"+e),i=V(r);t.infoData_.updateSnapshot(n,i);var o=br(t.infoSyncTree_,n,i);ye(t.eventQueue_,n,o)}function _n(t){return t.nextWriteId_++}function bp(t,e){var r=Kd(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(function(n){var i=V(n).withIndex(e._queryParams.getIndex()),o=br(t.serverSyncTree_,e._path,i);return Yi(t.eventQueue_,e._path,o),Promise.resolve(i)},function(n){return Yt(t,"get for query "+G(e)+" failed: "+n),Promise.reject(new Error(n))})}function Ji(t,e,r,n,i){Yt(t,"set",{path:e.toString(),value:r,priority:n});var o=Ar(t),a=V(r,n),s=cn(t.serverSyncTree_,e),u=ji(a,s,o),l=_n(t),c=Ui(t.serverSyncTree_,e,u,l,!0);gn(t.eventQueue_,c),t.server_.put(e.toString(),a.val(!0),function(h,d){var p=h==="ok";p||ee("set at "+e+" failed: "+h);var m=st(t.serverSyncTree_,l,!p);ye(t.eventQueue_,e,m),ut(t,i,h,d)});var f=to(t,e);Xt(t,f),ye(t.eventQueue_,f,[])}function Tp(t,e,r,n){Yt(t,"update",{path:e.toString(),value:r});var i=!0,o=Ar(t),a={};if(q(r,function(l,c){i=!1,a[l]=Qs(H(e,l),V(c),t.serverSyncTree_,o)}),i)X("update() called with empty data.  Don't do anything."),ut(t,n,"ok",void 0);else{var s=_n(t),u=Vd(t.serverSyncTree_,e,a,s);gn(t.eventQueue_,u),t.server_.merge(e.toString(),r,function(l,c){var f=l==="ok";f||ee("update at "+e+" failed: "+l);var h=st(t.serverSyncTree_,s,!f),d=h.length>0?Xt(t,e):e;ye(t.eventQueue_,d,h),ut(t,n,l,c)}),q(r,function(l){var c=to(t,H(e,l));Xt(t,c)}),ye(t.eventQueue_,e,[])}}function wp(t){Yt(t,"onDisconnectEvents");var e=Ar(t),r=Jr();wi(t.onDisconnect_,k(),function(i,o){var a=Qs(i,o,t.serverSyncTree_,e);zt(r,i,a)});var n=[];wi(r,k(),function(i,o){n=n.concat(br(t.serverSyncTree_,i,o));var a=to(t,i);Xt(t,a)}),t.onDisconnect_=Jr(),ye(t.eventQueue_,k(),n)}function Cp(t,e,r){t.server_.onDisconnectCancel(e.toString(),function(n,i){n==="ok"&&Ti(t.onDisconnect_,e),ut(t,r,n,i)})}function au(t,e,r,n){var i=V(r);t.server_.onDisconnectPut(e.toString(),i.val(!0),function(o,a){o==="ok"&&zt(t.onDisconnect_,e,i),ut(t,n,o,a)})}function Sp(t,e,r,n,i){var o=V(r,n);t.server_.onDisconnectPut(e.toString(),o.val(!0),function(a,s){a==="ok"&&zt(t.onDisconnect_,e,o),ut(t,i,a,s)})}function Ip(t,e,r,n){if(Jn(r)){X("onDisconnect().update() called with empty data.  Don't do anything."),ut(t,n,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),r,function(i,o){i==="ok"&&q(r,function(a,s){var u=V(s);zt(t.onDisconnect_,H(e,a),u)}),ut(t,n,i,o)})}function Rp(t,e,r){var n;S(e._path)===".info"?n=$s(t.infoSyncTree_,e,r):n=$s(t.serverSyncTree_,e,r),Yi(t.eventQueue_,e._path,n)}function Zi(t,e,r){var n;S(e._path)===".info"?n=Bi(t.infoSyncTree_,e,r):n=Bi(t.serverSyncTree_,e,r),Yi(t.eventQueue_,e._path,n)}function su(t){t.persistentConnection_&&t.persistentConnection_.interrupt(ru)}function Ap(t){t.persistentConnection_&&t.persistentConnection_.resume(ru)}function kp(t,e){if(e===void 0&&(e=!1),typeof console!="undefined"){var r;e?(t.statsListener_||(t.statsListener_=new ms(t.stats_)),r=t.statsListener_.get()):r=t.stats_.get();var n=Object.keys(r).reduce(function(i,o){return Math.max(o.length,i)},0);q(r,function(i,o){for(var a=i,s=i.length;s<n+2;s++)a+=" ";console.log(a+o)})}}function Np(t,e){t.stats_.incrementCounter(e),Xh(t.statsReporter_,e)}function Yt(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),X.apply(void 0,j([n],Z(e)))}function ut(t,e,r,n){e&&Vt(function(){if(r==="ok")e(null);else{var i=(r||"error").toUpperCase(),o=i;n&&(o+=": "+n);var a=new Error(o);a.code=i,e(a)}})}function Op(t,e,r,n,i,o){Yt(t,"transaction on "+e);var a={path:e,update:r,onComplete:n,status:null,order:ya(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},s=eo(t,e,void 0);a.currentInputSnapshot=s;var u=a.update(s.val());if(u===void 0)a.unwatcher(),a.currentOutputSnapshotRaw=null,a.currentOutputSnapshotResolved=null,a.onComplete&&a.onComplete(null,!1,a.currentInputSnapshot);else{Sr("transaction failed: Data returned ",u,a.path),a.status=0;var l=dn(t.transactionQueueTree_,e),c=It(l)||[];c.push(a),qi(l,c);var f=void 0;if(typeof u=="object"&&u!==null&&Re(u,".priority"))f=vt(u,".priority"),_(Cr(f),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");else{var h=cn(t.serverSyncTree_,e)||w.EMPTY_NODE;f=h.getPriority().val()}var d=Ar(t),p=V(u,f),m=ji(p,s,d);a.currentOutputSnapshotRaw=p,a.currentOutputSnapshotResolved=m,a.currentWriteId=_n(t);var y=Ui(t.serverSyncTree_,e,m,a.currentWriteId,a.applyLocally);ye(t.eventQueue_,e,y),mn(t,t.transactionQueueTree_)}}function eo(t,e,r){return cn(t.serverSyncTree_,e,r)||w.EMPTY_NODE}function mn(t,e){if(e===void 0&&(e=t.transactionQueueTree_),e||yn(t,e),It(e)){var r=lu(t,e);_(r.length>0,"Sending zero length transaction queue");var n=r.every(function(i){return i.status===0});n&&Pp(t,wr(e),r)}else Ys(e)&&pn(e,function(i){mn(t,i)})}function Pp(t,e,r){for(var n=r.map(function(h){return h.currentWriteId}),i=eo(t,e,n),o=i,a=i.hash(),s=0;s<r.length;s++){var u=r[s];_(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;var l=ae(e,u.path);o=o.updateChild(l,u.currentOutputSnapshotRaw)}var c=o.val(!0),f=e;t.server_.put(f.toString(),c,function(h){Yt(t,"transaction put response",{path:f.toString(),status:h});var d=[];if(h==="ok"){for(var p=[],m=function(E){r[E].status=2,d=d.concat(st(t.serverSyncTree_,r[E].currentWriteId)),r[E].onComplete&&p.push(function(){return r[E].onComplete(null,!0,r[E].currentOutputSnapshotResolved)}),r[E].unwatcher()},y=0;y<r.length;y++)m(y);yn(t,dn(t.transactionQueueTree_,e)),mn(t,t.transactionQueueTree_),ye(t.eventQueue_,e,d);for(var y=0;y<p.length;y++)Vt(p[y])}else{if(h==="datastale")for(var y=0;y<r.length;y++)r[y].status===3?r[y].status=4:r[y].status=0;else{ee("transaction at "+f.toString()+" failed: "+h);for(var y=0;y<r.length;y++)r[y].status=4,r[y].abortReason=h}Xt(t,e)}},a)}function Xt(t,e){var r=uu(t,e),n=wr(r),i=lu(t,r);return Mp(t,i,n),n}function Mp(t,e,r){if(e.length!==0){for(var n=[],i=[],o=e.filter(function(l){return l.status===0}),a=o.map(function(l){return l.currentWriteId}),s=function(l){var c=e[l],f=ae(r,c.path),h=!1,d;if(_(f!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,d=c.abortReason,i=i.concat(st(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=gp)h=!0,d="maxretry",i=i.concat(st(t.serverSyncTree_,c.currentWriteId,!0));else{var p=eo(t,c.path,a);c.currentInputSnapshot=p;var m=e[l].update(p.val());if(m!==void 0){Sr("transaction failed: Data returned ",m,c.path);var y=V(m),E=typeof m=="object"&&m!=null&&Re(m,".priority");E||(y=y.updatePriority(p.getPriority()));var C=c.currentWriteId,M=Ar(t),J=ji(y,p,M);c.currentOutputSnapshotRaw=y,c.currentOutputSnapshotResolved=J,c.currentWriteId=_n(t),a.splice(a.indexOf(C),1),i=i.concat(Ui(t.serverSyncTree_,c.path,J,c.currentWriteId,c.applyLocally)),i=i.concat(st(t.serverSyncTree_,C,!0))}else h=!0,d="nodata",i=i.concat(st(t.serverSyncTree_,c.currentWriteId,!0))}ye(t.eventQueue_,r,i),i=[],h&&(e[l].status=2,function(W){setTimeout(W,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(d==="nodata"?n.push(function(){return e[l].onComplete(null,!1,e[l].currentInputSnapshot)}):n.push(function(){return e[l].onComplete(new Error(d),!1,null)})))},u=0;u<e.length;u++)s(u);yn(t,t.transactionQueueTree_);for(var u=0;u<n.length;u++)Vt(n[u]);mn(t,t.transactionQueueTree_)}}function uu(t,e){var r,n=t.transactionQueueTree_;for(r=S(e);r!==null&&It(n)===void 0;)n=dn(n,r),e=D(e),r=S(e);return n}function lu(t,e){var r=[];return cu(t,e,r),r.sort(function(n,i){return n.order-i.order}),r}function cu(t,e,r){var n=It(e);if(n)for(var i=0;i<n.length;i++)r.push(n[i]);pn(e,function(o){cu(t,o,r)})}function yn(t,e){var r=It(e);if(r){for(var n=0,i=0;i<r.length;i++)r[i].status!==2&&(r[n]=r[i],n++);r.length=n,qi(e,r.length>0?r:void 0)}pn(e,function(o){yn(t,o)})}function to(t,e){var r=wr(uu(t,e)),n=dn(t.transactionQueueTree_,e);return op(n,function(i){ro(t,i)}),ro(t,n),Xs(n,function(i){ro(t,i)}),r}function ro(t,e){var r=It(e);if(r){for(var n=[],i=[],o=-1,a=0;a<r.length;a++)r[a].status===3||(r[a].status===1?(_(o===a-1,"All SENT items should be at beginning of queue."),o=a,r[a].status=3,r[a].abortReason="set"):(_(r[a].status===0,"Unexpected transaction status in abort"),r[a].unwatcher(),i=i.concat(st(t.serverSyncTree_,r[a].currentWriteId,!0)),r[a].onComplete&&n.push(r[a].onComplete.bind(null,new Error("set"),!1,null))));o===-1?qi(e,void 0):r.length=o+1,ye(t.eventQueue_,wr(e),i);for(var a=0;a<n.length;a++)Vt(n[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(t){for(var e="",r=t.split("/"),n=0;n<r.length;n++)if(r[n].length>0){var i=r[n];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function xp(t){var e,r,n={};t.charAt(0)==="?"&&(t=t.substring(1));try{for(var i=Q(t.split("&")),o=i.next();!o.done;o=i.next()){var a=o.value;if(a.length!==0){var s=a.split("=");s.length===2?n[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):ee("Invalid query segment '"+a+"' in query '"+t+"'")}}}catch(u){e={error:u}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n}var no=function(t,e){var r=Lp(t),n=r.namespace;r.domain==="firebase.com"&&Be(r.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!n||n==="undefined")&&r.domain!=="localhost"&&Be("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),r.secure||Pf();var i=r.scheme==="ws"||r.scheme==="wss";return{repoInfo:new oi(r.host,r.secure,n,e,i,"",n!==r.subdomain),path:new N(r.pathString)}},Lp=function(t){var e="",r="",n="",i="",o="",a=!0,s="https",u=443;if(typeof t=="string"){var l=t.indexOf("//");l>=0&&(s=t.substring(0,l-1),t=t.substring(l+2));var c=t.indexOf("/");c===-1&&(c=t.length);var f=t.indexOf("?");f===-1&&(f=t.length),e=t.substring(0,Math.min(c,f)),c<f&&(i=Dp(t.substring(c,f)));var h=xp(t.substring(Math.min(t.length,f)));l=e.indexOf(":"),l>=0?(a=s==="https"||s==="wss",u=parseInt(e.substring(l+1),10)):l=e.length;var d=e.slice(0,l);if(d.toLowerCase()==="localhost")r="localhost";else if(d.split(".").length<=2)r=d;else{var p=e.indexOf(".");n=e.substring(0,p).toLowerCase(),r=e.substring(p+1),o=n}"ns"in h&&(o=h.ns)}return{host:e,port:u,domain:r,subdomain:n,secure:a,scheme:s,pathString:i,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fu=function(){function t(e,r,n,i){this.eventType=e,this.eventRegistration=r,this.snapshot=n,this.prevName=i}return t.prototype.getPath=function(){var e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path},t.prototype.getEventType=function(){return this.eventType},t.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},t.prototype.toString=function(){return this.getPath().toString()+":"+this.eventType+":"+G(this.snapshot.exportVal())},t}(),hu=function(){function t(e,r,n){this.eventRegistration=e,this.error=r,this.path=n}return t.prototype.getPath=function(){return this.path},t.prototype.getEventType=function(){return"cancel"},t.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},t.prototype.toString=function(){return this.path.toString()+":cancel"},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var du=function(){function t(e,r){this.snapshotCallback=e,this.cancelCallback=r}return t.prototype.onValue=function(e,r){this.snapshotCallback.call(null,e,r)},t.prototype.onCancel=function(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)},Object.defineProperty(t.prototype,"hasCancelCallback",{get:function(){return!!this.cancelCallback},enumerable:!1,configurable:!0}),t.prototype.matches=function(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context},t}();/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fp=function(){function t(e,r){this._repo=e,this._path=r}return t.prototype.cancel=function(){var e=new he;return Cp(this._repo,this._path,e.wrapCallback(function(){})),e.promise},t.prototype.remove=function(){me("OnDisconnect.remove",this._path);var e=new he;return au(this._repo,this._path,null,e.wrapCallback(function(){})),e.promise},t.prototype.set=function(e){me("OnDisconnect.set",this._path),Ve("OnDisconnect.set",e,this._path,!1);var r=new he;return au(this._repo,this._path,e,r.wrapCallback(function(){})),r.promise},t.prototype.setWithPriority=function(e,r){me("OnDisconnect.setWithPriority",this._path),Ve("OnDisconnect.setWithPriority",e,this._path,!1),Qi("OnDisconnect.setWithPriority",r,!1);var n=new he;return Sp(this._repo,this._path,e,r,n.wrapCallback(function(){})),n.promise},t.prototype.update=function(e){me("OnDisconnect.update",this._path),Zs("OnDisconnect.update",e,this._path,!1);var r=new he;return Ip(this._repo,this._path,e,r.wrapCallback(function(){})),r.promise},t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee=function(){function t(e,r,n,i){this._repo=e,this._path=r,this._queryParams=n,this._orderByCalled=i}return Object.defineProperty(t.prototype,"key",{get:function(){return I(this._path)?null:fi(this._path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ref",{get:function(){return new je(this._repo,this._path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_queryIdentifier",{get:function(){var e=_s(this._queryParams),r=ti(e);return r==="{}"?"default":r},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_queryObject",{get:function(){return _s(this._queryParams)},enumerable:!1,configurable:!0}),t.prototype.isEqual=function(e){if(e=pe(e),!(e instanceof t))return!1;var r=this._repo===e._repo,n=hi(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return r&&n&&i},t.prototype.toJSON=function(){return this.toString()},t.prototype.toString=function(){return this._repo.toString()+vh(this._path)},t}();function En(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function lt(t){var e=null,r=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(r=t.getIndexEndValue()),t.getIndex()===We){var n="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){var o=t.getIndexStartName();if(o!==ze)throw new Error(n);if(typeof e!="string")throw new Error(i)}if(t.hasEnd()){var a=t.getIndexEndName();if(a!==He)throw new Error(n);if(typeof r!="string")throw new Error(i)}}else if(t.getIndex()===L){if(e!=null&&!Cr(e)||r!=null&&!Cr(r))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(_(t.getIndex()instanceof gi||t.getIndex()===_i,"unknown index type."),e!=null&&typeof e=="object"||r!=null&&typeof r=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function bn(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}var je=function(t){A(e,t);function e(r,n){return t.call(this,r,n,new vs,!1)||this}return Object.defineProperty(e.prototype,"parent",{get:function(){var r=Za(this._path);return r===null?null:new e(this._repo,r)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){for(var r=this;r.parent!==null;)r=r.parent;return r},enumerable:!1,configurable:!0}),e}(Ee),Tn=function(){function t(e,r,n){this._node=e,this.ref=r,this._index=n}return Object.defineProperty(t.prototype,"priority",{get:function(){return this._node.getPriority().val()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"key",{get:function(){return this.ref.key},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return this._node.numChildren()},enumerable:!1,configurable:!0}),t.prototype.child=function(e){var r=new N(e),n=Rt(this.ref,e);return new t(this._node.getChild(r),n,L)},t.prototype.exists=function(){return!this._node.isEmpty()},t.prototype.exportVal=function(){return this._node.val(!0)},t.prototype.forEach=function(e){var r=this;if(this._node.isLeafNode())return!1;var n=this._node;return!!n.forEachChild(this._index,function(i,o){return e(new t(o,Rt(r.ref,i),L))})},t.prototype.hasChild=function(e){var r=new N(e);return!this._node.getChild(r).isEmpty()},t.prototype.hasChildren=function(){return this._node.isLeafNode()?!1:!this._node.isEmpty()},t.prototype.toJSON=function(){return this.exportVal()},t.prototype.val=function(){return this._node.val()},t}();function pu(t,e){return t=pe(t),t._checkNotDeleted("ref"),e!==void 0?Rt(t._root,e):t._root}function vu(t,e){t=pe(t),t._checkNotDeleted("refFromURL");var r=no(e,t._repo.repoInfo_.nodeAdmin);eu("refFromURL",r);var n=r.repoInfo;return!t._repo.repoInfo_.isCustomHost()&&n.host!==t._repo.repoInfo_.host&&Be("refFromURL: Host name does not match the current database: (found "+n.host+" but expected "+t._repo.repoInfo_.host+")"),pu(t,r.path.toString())}function Rt(t,e){return t=pe(t),S(t._path)===null?hp("child","path",e,!1):Rr("child","path",e,!1),new je(t._repo,H(t._path,e))}function Up(t,e){t=pe(t),me("push",t._path),Ve("push",e,t._path,!0);var r=nu(t._repo),n=Fh(r),i=Rt(t,n),o=Rt(t,n),a;return e!=null?a=io(o,e).then(function(){return o}):a=Promise.resolve(o),i.then=a.then.bind(a),i.catch=a.then.bind(a,void 0),i}function Bp(t){return me("remove",t._path),io(t,null)}function io(t,e){t=pe(t),me("set",t._path),Ve("set",e,t._path,!1);var r=new he;return Ji(t._repo,t._path,e,null,r.wrapCallback(function(){})),r.promise}function Hp(t,e){t=pe(t),me("setPriority",t._path),Qi("setPriority",e,!1);var r=new he;return Ji(t._repo,H(t._path,".priority"),e,null,r.wrapCallback(function(){})),r.promise}function Wp(t,e,r){if(me("setWithPriority",t._path),Ve("setWithPriority",e,t._path,!1),Qi("setWithPriority",r,!1),t.key===".length"||t.key===".keys")throw"setWithPriority failed: "+t.key+" is a read-only object.";var n=new he;return Ji(t._repo,t._path,e,r,n.wrapCallback(function(){})),n.promise}function Vp(t,e){Zs("update",e,t._path,!1);var r=new he;return Tp(t._repo,t._path,e,r.wrapCallback(function(){})),r.promise}function jp(t){return t=pe(t),bp(t._repo,t).then(function(e){return new Tn(e,new je(t._repo,t._path),t._queryParams.getIndex())})}var gu=function(){function t(e){this.callbackContext=e}return t.prototype.respondsTo=function(e){return e==="value"},t.prototype.createEvent=function(e,r){var n=r._queryParams.getIndex();return new fu("value",this,new Tn(e.snapshotNode,new je(r._repo,r._path),n))},t.prototype.getEventRunner=function(e){var r=this;return e.getEventType()==="cancel"?function(){return r.callbackContext.onCancel(e.error)}:function(){return r.callbackContext.onValue(e.snapshot,null)}},t.prototype.createCancelEvent=function(e,r){return this.callbackContext.hasCancelCallback?new hu(this,e,r):null},t.prototype.matches=function(e){return e instanceof t?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1},t.prototype.hasAnyCallback=function(){return this.callbackContext!==null},t}(),_u=function(){function t(e,r){this.eventType=e,this.callbackContext=r}return t.prototype.respondsTo=function(e){var r=e==="children_added"?"child_added":e;return r=r==="children_removed"?"child_removed":r,this.eventType===r},t.prototype.createCancelEvent=function(e,r){return this.callbackContext.hasCancelCallback?new hu(this,e,r):null},t.prototype.createEvent=function(e,r){_(e.childName!=null,"Child events should have a childName.");var n=Rt(new je(r._repo,r._path),e.childName),i=r._queryParams.getIndex();return new fu(e.type,this,new Tn(e.snapshotNode,n,i),e.prevName)},t.prototype.getEventRunner=function(e){var r=this;return e.getEventType()==="cancel"?function(){return r.callbackContext.onCancel(e.error)}:function(){return r.callbackContext.onValue(e.snapshot,e.prevName)}},t.prototype.matches=function(e){return e instanceof t?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1},t.prototype.hasAnyCallback=function(){return!!this.callbackContext},t}();function kr(t,e,r,n,i){var o;if(typeof n=="object"&&(o=void 0,i=n),typeof n=="function"&&(o=n),i&&i.onlyOnce){var a=r,s=function(c,f){Zi(t._repo,t,l),a(c,f)};s.userCallback=r.userCallback,s.context=r.context,r=s}var u=new du(r,o||void 0),l=e==="value"?new gu(u):new _u(e,u);return Rp(t._repo,t,l),function(){return Zi(t._repo,t,l)}}function oo(t,e,r,n){return kr(t,"value",e,r,n)}function mu(t,e,r,n){return kr(t,"child_added",e,r,n)}function yu(t,e,r,n){return kr(t,"child_changed",e,r,n)}function Eu(t,e,r,n){return kr(t,"child_moved",e,r,n)}function bu(t,e,r,n){return kr(t,"child_removed",e,r,n)}function Tu(t,e,r){var n=null,i=r?new du(r):null;e==="value"?n=new gu(i):e&&(n=new _u(e,i)),Zi(t._repo,t,n)}var Oe=function(){function t(){}return t}(),wu=function(t){A(e,t);function e(r,n){var i=t.call(this)||this;return i._value=r,i._key=n,i}return e.prototype._apply=function(r){Ve("endAt",this._value,r._path,!0);var n=bi(r._queryParams,this._value,this._key);if(bn(n),lt(n),r._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ee(r._repo,r._path,n,r._orderByCalled)},e}(Oe);function $p(t,e){return Ir("endAt","key",e,!0),new wu(t,e)}var Gp=function(t){A(e,t);function e(r,n){var i=t.call(this)||this;return i._value=r,i._key=n,i}return e.prototype._apply=function(r){Ve("endBefore",this._value,r._path,!1);var n=$h(r._queryParams,this._value,this._key);if(bn(n),lt(n),r._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ee(r._repo,r._path,n,r._orderByCalled)},e}(Oe);function qp(t,e){return Ir("endBefore","key",e,!0),new Gp(t,e)}var Cu=function(t){A(e,t);function e(r,n){var i=t.call(this)||this;return i._value=r,i._key=n,i}return e.prototype._apply=function(r){Ve("startAt",this._value,r._path,!0);var n=Ei(r._queryParams,this._value,this._key);if(bn(n),lt(n),r._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Ee(r._repo,r._path,n,r._orderByCalled)},e}(Oe);function zp(t,e){return t===void 0&&(t=null),Ir("startAt","key",e,!0),new Cu(t,e)}var Kp=function(t){A(e,t);function e(r,n){var i=t.call(this)||this;return i._value=r,i._key=n,i}return e.prototype._apply=function(r){Ve("startAfter",this._value,r._path,!1);var n=jh(r._queryParams,this._value,this._key);if(bn(n),lt(n),r._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Ee(r._repo,r._path,n,r._orderByCalled)},e}(Oe);function Qp(t,e){return Ir("startAfter","key",e,!0),new Kp(t,e)}var Yp=function(t){A(e,t);function e(r){var n=t.call(this)||this;return n._limit=r,n}return e.prototype._apply=function(r){if(r._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ee(r._repo,r._path,Wh(r._queryParams,this._limit),r._orderByCalled)},e}(Oe);function Xp(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new Yp(t)}var Jp=function(t){A(e,t);function e(r){var n=t.call(this)||this;return n._limit=r,n}return e.prototype._apply=function(r){if(r._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ee(r._repo,r._path,Vh(r._queryParams,this._limit),r._orderByCalled)},e}(Oe);function Zp(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new Jp(t)}var ev=function(t){A(e,t);function e(r){var n=t.call(this)||this;return n._path=r,n}return e.prototype._apply=function(r){En(r,"orderByChild");var n=new N(this._path);if(I(n))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");var i=new gi(n),o=Xr(r._queryParams,i);return lt(o),new Ee(r._repo,r._path,o,!0)},e}(Oe);function tv(t){if(t==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(t==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(t==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Rr("orderByChild","path",t,!1),new ev(t)}var rv=function(t){A(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(r){En(r,"orderByKey");var n=Xr(r._queryParams,We);return lt(n),new Ee(r._repo,r._path,n,!0)},e}(Oe);function nv(){return new rv}var iv=function(t){A(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(r){En(r,"orderByPriority");var n=Xr(r._queryParams,L);return lt(n),new Ee(r._repo,r._path,n,!0)},e}(Oe);function ov(){return new iv}var av=function(t){A(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(r){En(r,"orderByValue");var n=Xr(r._queryParams,_i);return lt(n),new Ee(r._repo,r._path,n,!0)},e}(Oe);function sv(){return new av}var uv=function(t){A(e,t);function e(r,n){var i=t.call(this)||this;return i._value=r,i._key=n,i}return e.prototype._apply=function(r){if(Ve("equalTo",this._value,r._path,!1),r._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(r._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new wu(this._value,this._key)._apply(new Cu(this._value,this._key)._apply(r))},e}(Oe);function lv(t,e){return Ir("equalTo","key",e,!0),new uv(t,e)}function Pe(t){for(var e,r,n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];var o=pe(t);try{for(var a=Q(n),s=a.next();!s.done;s=a.next()){var u=s.value;o=u._apply(o)}}catch(l){e={error:l}}finally{try{s&&!s.done&&(r=a.return)&&r.call(a)}finally{if(e)throw e.error}}return o}Dd(je);Bd(je);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cv="FIREBASE_DATABASE_EMULATOR_HOST",ao={},Su=!1;function fv(t,e,r,n){t.repoInfo_=new oi(e+":"+r,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams),n&&(t.authTokenProvider_=n)}function Iu(t,e,r,n,i){var o=n||t.options.databaseURL;o===void 0&&(t.options.projectId||Be("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),X("Using default host for project ",t.options.projectId),o=t.options.projectId+"-default-rtdb.firebaseio.com");var a=no(o,i),s=a.repoInfo,u,l=void 0;typeof process!="undefined"&&(l=process.env[cv]),l?(u=!0,o="http://"+l+"?ns="+s.namespace,a=no(o,i),s=a.repoInfo):u=!a.repoInfo.secure;var c=i&&u?new fr(fr.OWNER):new Wf(t.name,t.options,e);eu("Invalid Firebase Database URL",a),I(a.path)||Be("Database URL must point to the root of a Firebase Database (not including a child path).");var f=dv(s,t,c,new Hf(t.name,r));return new vv(f,t)}function hv(t,e){var r=ao[e];(!r||r[t.key]!==t)&&Be("Database "+e+"("+t.repoInfo_+") has already been deleted."),su(t),delete r[t.key]}function dv(t,e,r,n){var i=ao[e.name];i||(i={},ao[e.name]=i);var o=i[t.toURLString()];return o&&Be("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new _p(t,Su,r,n),i[t.toURLString()]=o,o}function pv(t){Su=t}var vv=function(){function t(e,r){this._repoInternal=e,this.app=r,this.type="database",this._instanceStarted=!1}return Object.defineProperty(t.prototype,"_repo",{get:function(){return this._instanceStarted||(mp(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_root",{get:function(){return this._rootInternal||(this._rootInternal=new je(this._repo,k())),this._rootInternal},enumerable:!1,configurable:!0}),t.prototype._delete=function(){return this._rootInternal!==null&&(hv(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()},t.prototype._checkNotDeleted=function(e){this._rootInternal===null&&Be("Cannot call "+e+" on a deleted database.")},t}();function gv(t,e,r,n){n===void 0&&(n={}),t=pe(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Be("Cannot call useEmulator() after instance has already been initialized.");var i=t._repoInternal,o=void 0;if(i.repoInfo_.nodeAdmin)n.mockUserToken&&Be('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new fr(fr.OWNER);else if(n.mockUserToken){var a=typeof n.mockUserToken=="string"?n.mockUserToken:sf(n.mockUserToken,t.app.options.projectId);o=new fr(a)}fv(i,e,r,o)}function _v(t){t=pe(t),t._checkNotDeleted("goOffline"),su(t._repo)}function mv(t){t=pe(t),t._checkNotDeleted("goOnline"),Ap(t._repo)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yv={".sv":"timestamp"};function Ev(){return yv}function bv(t){return{".sv":{increment:t}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tv=function(){function t(e,r){this.committed=e,this.snapshot=r}return t.prototype.toJSON=function(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}},t}();function wv(t,e,r){var n;if(t=pe(t),me("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";var i=(n=r==null?void 0:r.applyLocally)!==null&&n!==void 0?n:!0,o=new he,a=function(u,l,c){var f=null;u?o.reject(u):(f=new Tn(c,new je(t._repo,t._path),L),o.resolve(new Tv(l,f)))},s=oo(t,function(){});return Op(t._repo,t._path,e,a,s,i),o.promise}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cv=function(){function t(e){this._delegate=e}return t.prototype.cancel=function(e){b("OnDisconnect.cancel",0,1,arguments.length),Y("OnDisconnect.cancel","onComplete",e,!0);var r=this._delegate.cancel();return e&&r.then(function(){return e(null)},function(n){return e(n)}),r},t.prototype.remove=function(e){b("OnDisconnect.remove",0,1,arguments.length),Y("OnDisconnect.remove","onComplete",e,!0);var r=this._delegate.remove();return e&&r.then(function(){return e(null)},function(n){return e(n)}),r},t.prototype.set=function(e,r){b("OnDisconnect.set",1,2,arguments.length),Y("OnDisconnect.set","onComplete",r,!0);var n=this._delegate.set(e);return r&&n.then(function(){return r(null)},function(i){return r(i)}),n},t.prototype.setWithPriority=function(e,r,n){b("OnDisconnect.setWithPriority",2,3,arguments.length),Y("OnDisconnect.setWithPriority","onComplete",n,!0);var i=this._delegate.setWithPriority(e,r);return n&&i.then(function(){return n(null)},function(o){return n(o)}),i},t.prototype.update=function(e,r){if(b("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){for(var n={},i=0;i<e.length;++i)n[""+i]=e[i];e=n,ee("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Y("OnDisconnect.update","onComplete",r,!0);var o=this._delegate.update(e);return r&&o.then(function(){return r(null)},function(a){return r(a)}),o},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sv=function(){function t(e,r){this.committed=e,this.snapshot=r}return t.prototype.toJSON=function(){return b("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nr=function(){function t(e,r){this._database=e,this._delegate=r}return t.prototype.val=function(){return b("DataSnapshot.val",0,0,arguments.length),this._delegate.val()},t.prototype.exportVal=function(){return b("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()},t.prototype.toJSON=function(){return b("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()},t.prototype.exists=function(){return b("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()},t.prototype.child=function(e){return b("DataSnapshot.child",0,1,arguments.length),e=String(e),Rr("DataSnapshot.child","path",e,!1),new t(this._database,this._delegate.child(e))},t.prototype.hasChild=function(e){return b("DataSnapshot.hasChild",1,1,arguments.length),Rr("DataSnapshot.hasChild","path",e,!1),this._delegate.hasChild(e)},t.prototype.getPriority=function(){return b("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority},t.prototype.forEach=function(e){var r=this;return b("DataSnapshot.forEach",1,1,arguments.length),Y("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(function(n){return e(new t(r._database,n))})},t.prototype.hasChildren=function(){return b("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()},Object.defineProperty(t.prototype,"key",{get:function(){return this._delegate.key},enumerable:!1,configurable:!0}),t.prototype.numChildren=function(){return b("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size},t.prototype.getRef=function(){return b("DataSnapshot.ref",0,0,arguments.length),new At(this._database,this._delegate.ref)},Object.defineProperty(t.prototype,"ref",{get:function(){return this.getRef()},enumerable:!1,configurable:!0}),t}(),Ru=function(){function t(e,r){this.database=e,this._delegate=r}return t.prototype.on=function(e,r,n,i){var o=this,a;b("Query.on",2,4,arguments.length),Y("Query.on","callback",r,!1);var s=t.getCancelAndContextArgs_("Query.on",n,i),u=function(c,f){r.call(s.context,new Nr(o.database,c),f)};u.userCallback=r,u.context=s.context;var l=(a=s.cancel)===null||a===void 0?void 0:a.bind(s.context);switch(e){case"value":return oo(this._delegate,u,l),r;case"child_added":return mu(this._delegate,u,l),r;case"child_removed":return bu(this._delegate,u,l),r;case"child_changed":return yu(this._delegate,u,l),r;case"child_moved":return Eu(this._delegate,u,l),r;default:throw new Error(de("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}},t.prototype.off=function(e,r,n){if(b("Query.off",0,3,arguments.length),fp("Query.off",e,!0),Y("Query.off","callback",r,!0),da("Query.off","context",n,!0),r){var i=function(){};i.userCallback=r,i.context=n,Tu(this._delegate,e,i)}else Tu(this._delegate,e)},t.prototype.get=function(){var e=this;return jp(this._delegate).then(function(r){return new Nr(e.database,r)})},t.prototype.once=function(e,r,n,i){var o=this;b("Query.once",1,4,arguments.length),Y("Query.once","callback",r,!0);var a=t.getCancelAndContextArgs_("Query.once",n,i),s=new he,u=function(c,f){var h=new Nr(o.database,c);r&&r.call(a.context,h,f),s.resolve(h)};u.userCallback=r,u.context=a.context;var l=function(c){a.cancel&&a.cancel.call(a.context,c),s.reject(c)};switch(e){case"value":oo(this._delegate,u,l,{onlyOnce:!0});break;case"child_added":mu(this._delegate,u,l,{onlyOnce:!0});break;case"child_removed":bu(this._delegate,u,l,{onlyOnce:!0});break;case"child_changed":yu(this._delegate,u,l,{onlyOnce:!0});break;case"child_moved":Eu(this._delegate,u,l,{onlyOnce:!0});break;default:throw new Error(de("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return s.promise},t.prototype.limitToFirst=function(e){return b("Query.limitToFirst",1,1,arguments.length),new t(this.database,Pe(this._delegate,Xp(e)))},t.prototype.limitToLast=function(e){return b("Query.limitToLast",1,1,arguments.length),new t(this.database,Pe(this._delegate,Zp(e)))},t.prototype.orderByChild=function(e){return b("Query.orderByChild",1,1,arguments.length),new t(this.database,Pe(this._delegate,tv(e)))},t.prototype.orderByKey=function(){return b("Query.orderByKey",0,0,arguments.length),new t(this.database,Pe(this._delegate,nv()))},t.prototype.orderByPriority=function(){return b("Query.orderByPriority",0,0,arguments.length),new t(this.database,Pe(this._delegate,ov()))},t.prototype.orderByValue=function(){return b("Query.orderByValue",0,0,arguments.length),new t(this.database,Pe(this._delegate,sv()))},t.prototype.startAt=function(e,r){return e===void 0&&(e=null),b("Query.startAt",0,2,arguments.length),new t(this.database,Pe(this._delegate,zp(e,r)))},t.prototype.startAfter=function(e,r){return e===void 0&&(e=null),b("Query.startAfter",0,2,arguments.length),new t(this.database,Pe(this._delegate,Qp(e,r)))},t.prototype.endAt=function(e,r){return e===void 0&&(e=null),b("Query.endAt",0,2,arguments.length),new t(this.database,Pe(this._delegate,$p(e,r)))},t.prototype.endBefore=function(e,r){return e===void 0&&(e=null),b("Query.endBefore",0,2,arguments.length),new t(this.database,Pe(this._delegate,qp(e,r)))},t.prototype.equalTo=function(e,r){return b("Query.equalTo",1,2,arguments.length),new t(this.database,Pe(this._delegate,lv(e,r)))},t.prototype.toString=function(){return b("Query.toString",0,0,arguments.length),this._delegate.toString()},t.prototype.toJSON=function(){return b("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()},t.prototype.isEqual=function(e){if(b("Query.isEqual",1,1,arguments.length),!(e instanceof t)){var r="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(r)}return this._delegate.isEqual(e._delegate)},t.getCancelAndContextArgs_=function(e,r,n){var i={cancel:void 0,context:void 0};if(r&&n)i.cancel=r,Y(e,"cancel",i.cancel,!0),i.context=n,da(e,"context",i.context,!0);else if(r)if(typeof r=="object"&&r!==null)i.context=r;else if(typeof r=="function")i.cancel=r;else throw new Error(de(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return i},Object.defineProperty(t.prototype,"ref",{get:function(){return new At(this.database,new je(this._delegate._repo,this._delegate._path))},enumerable:!1,configurable:!0}),t}(),At=function(t){A(e,t);function e(r,n){var i=t.call(this,r,new Ee(n._repo,n._path,new vs,!1))||this;return i.database=r,i._delegate=n,i}return e.prototype.getKey=function(){return b("Reference.key",0,0,arguments.length),this._delegate.key},e.prototype.child=function(r){return b("Reference.child",1,1,arguments.length),typeof r=="number"&&(r=String(r)),new e(this.database,Rt(this._delegate,r))},e.prototype.getParent=function(){b("Reference.parent",0,0,arguments.length);var r=this._delegate.parent;return r?new e(this.database,r):null},e.prototype.getRoot=function(){return b("Reference.root",0,0,arguments.length),new e(this.database,this._delegate.root)},e.prototype.set=function(r,n){b("Reference.set",1,2,arguments.length),Y("Reference.set","onComplete",n,!0);var i=io(this._delegate,r);return n&&i.then(function(){return n(null)},function(o){return n(o)}),i},e.prototype.update=function(r,n){if(b("Reference.update",1,2,arguments.length),Array.isArray(r)){for(var i={},o=0;o<r.length;++o)i[""+o]=r[o];r=i,ee("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}me("Reference.update",this._delegate._path),Y("Reference.update","onComplete",n,!0);var a=Vp(this._delegate,r);return n&&a.then(function(){return n(null)},function(s){return n(s)}),a},e.prototype.setWithPriority=function(r,n,i){b("Reference.setWithPriority",2,3,arguments.length),Y("Reference.setWithPriority","onComplete",i,!0);var o=Wp(this._delegate,r,n);return i&&o.then(function(){return i(null)},function(a){return i(a)}),o},e.prototype.remove=function(r){b("Reference.remove",0,1,arguments.length),Y("Reference.remove","onComplete",r,!0);var n=Bp(this._delegate);return r&&n.then(function(){return r(null)},function(i){return r(i)}),n},e.prototype.transaction=function(r,n,i){var o=this;b("Reference.transaction",1,3,arguments.length),Y("Reference.transaction","transactionUpdate",r,!1),Y("Reference.transaction","onComplete",n,!0),dp("Reference.transaction","applyLocally",i,!0);var a=wv(this._delegate,r,{applyLocally:i}).then(function(s){return new Sv(s.committed,new Nr(o.database,s.snapshot))});return n&&a.then(function(s){return n(null,s.committed,s.snapshot)},function(s){return n(s,!1,null)}),a},e.prototype.setPriority=function(r,n){b("Reference.setPriority",1,2,arguments.length),Y("Reference.setPriority","onComplete",n,!0);var i=Hp(this._delegate,r);return n&&i.then(function(){return n(null)},function(o){return n(o)}),i},e.prototype.push=function(r,n){var i=this;b("Reference.push",0,2,arguments.length),Y("Reference.push","onComplete",n,!0);var o=Up(this._delegate,r),a=o.then(function(u){return new e(i.database,u)});n&&a.then(function(){return n(null)},function(u){return n(u)});var s=new e(this.database,o);return s.then=a.then.bind(a),s.catch=a.catch.bind(a,void 0),s},e.prototype.onDisconnect=function(){return me("Reference.onDisconnect",this._delegate._path),new Cv(new Fp(this._delegate._repo,this._delegate._path))},Object.defineProperty(e.prototype,"key",{get:function(){return this.getKey()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this.getParent()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){return this.getRoot()},enumerable:!1,configurable:!0}),e}(Ru);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wn=function(){function t(e,r){var n=this;this._delegate=e,this.app=r,this.INTERNAL={delete:function(){return n._delegate._delete()}}}return t.prototype.useEmulator=function(e,r,n){n===void 0&&(n={}),gv(this._delegate,e,r,n)},t.prototype.ref=function(e){if(b("database.ref",0,1,arguments.length),e instanceof At){var r=vu(this._delegate,e.toString());return new At(this,r)}else{var r=pu(this._delegate,e);return new At(this,r)}},t.prototype.refFromURL=function(e){var r="database.refFromURL";b(r,1,1,arguments.length);var n=vu(this._delegate,e);return new At(this,n)},t.prototype.goOffline=function(){return b("database.goOffline",0,0,arguments.length),_v(this._delegate)},t.prototype.goOnline=function(){return b("database.goOnline",0,0,arguments.length),mv(this._delegate)},t.ServerValue={TIMESTAMP:Ev(),increment:function(e){return bv(e)}},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Iv=function(){bt.forceDisallow(),li.forceAllow()},Rv=function(){li.forceDisallow()},Av=function(){return bt.isAvailable()},kv=function(t,e){var r=t._delegate._repo.persistentConnection_;r.securityDebugCallback_=e},Nv=function(t,e){kp(t._delegate._repo,e)},Ov=function(t,e){Np(t._delegate._repo,e)},Pv=function(t){return t._delegate._repo.dataUpdateCount},Mv=function(t,e){return yp(t._delegate._repo,e)};function Dv(t){var e=t.app,r=t.url,n=t.version,i=t.customAuthImpl,o=t.namespace,a=t.nodeAdmin,s=a===void 0?!1:a;_a(n);var u=new va("auth-internal",new Tf("database-standalone"));return u.setComponent(new pa("auth-internal",function(){return i},"PRIVATE")),{instance:new wn(Iu(e,u,void 0,r,s),e),namespace:o}}var xv=Object.freeze({__proto__:null,forceLongPolling:Iv,forceWebSockets:Rv,isWebSocketsAvailable:Av,setSecurityDebugCallback:kv,stats:Nv,statsIncrementCounter:Ov,dataUpdateCount:Pv,interceptServerData:Mv,initStandalone:Dv});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lv=wt;wt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};wt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};var Fv=za,Uv=function(t){var e=wt.prototype.put;return wt.prototype.put=function(r,n,i,o){o!==void 0&&(o=t()),e.call(this,r,n,i,o)},function(){wt.prototype.put=e}},Bv=oi,Hv=function(t){return t._delegate._queryIdentifier},Wv=function(t){pv(t)},Vv=Object.freeze({__proto__:null,DataConnection:Lv,RealTimeConnection:Fv,hijackHash:Uv,ConnectionTarget:Bv,queryIdentifier:Hv,forceRestClient:Wv});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jv=wn.ServerValue;function $v(t){_a(t.SDK_VERSION),t.INTERNAL.registerComponent(new pa("database",function(e,r){var n=r.instanceIdentifier,i=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),a=e.getProvider("app-check-internal");return new wn(Iu(i,o,a,n),i)},"PUBLIC").setServiceProps({Reference:At,Query:Ru,Database:wn,DataSnapshot:Nr,enableLogging:Ta,INTERNAL:xv,ServerValue:jv,TEST_ACCESS:Vv}).setMultipleInstances(!0)),t.registerVersion(Af,kf)}$v(fe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gv(t){t.prototype.loadBundle=ef,t.prototype.namedQuery=tf}Gv(rf);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var qv="FirebaseError",zv=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=qv,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,Kv.prototype.create),o}return e}(Error),Kv=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?Qv(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new zv(o,u,i);return l},t}();function Qv(t,e){return t.replace(Yv,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var Yv=/\{\$([^}]+)}/g,Xv=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Au={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},Jt=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return Object.setPrototypeOf(o,e.prototype),o.code=r,o.details=i,o}return e}(Error);function Jv(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Zv(t,e,r){var n=Jv(t),i=n,o=void 0;try{var a=e&&e.error;if(a){var s=a.status;if(typeof s=="string"){if(!Au[s])return new Jt("internal","internal");n=Au[s],i=s}var u=a.message;typeof u=="string"&&(i=u),o=a.details,o!==void 0&&(o=r.decode(o))}}catch{}return n==="ok"?null:new Jt(n,i,o)}var eg=function(){function t(e,r){var n=this;this.auth=null,this.messaging=null,this.auth=e.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||e.get().then(function(i){return n.auth=i},function(){}),this.messaging||r.get().then(function(i){return n.messaging=i},function(){})}return t.prototype.getAuthToken=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:if(!this.auth)return[2,void 0];r.label=1;case 1:return r.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return e=r.sent(),e?[2,e.accessToken]:[2,void 0];case 3:return r.sent(),[2,void 0];case 4:return[2]}})})},t.prototype.getInstanceIdToken=function(){return v(this,void 0,void 0,function(){return g(this,function(e){switch(e.label){case 0:if(!this.messaging||!("Notification"in self)||Notification.permission!=="granted")return[2,void 0];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.messaging.getToken()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,void 0];case 4:return[2]}})})},t.prototype.getContext=function(){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return e=n.sent(),[4,this.getInstanceIdToken()];case 2:return r=n.sent(),[2,{authToken:e,instanceIdToken:r}]}})})},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tg="type.googleapis.com/google.protobuf.Int64Value",rg="type.googleapis.com/google.protobuf.UInt64Value";function ku(t,e){var r={};for(var n in t)t.hasOwnProperty(n)&&(r[n]=e(t[n]));return r}var ng=function(){function t(){}return t.prototype.encode=function(e){var r=this;if(e==null)return null;if(e instanceof Number&&(e=e.valueOf()),typeof e=="number"&&isFinite(e)||e===!0||e===!1||Object.prototype.toString.call(e)==="[object String]")return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(function(n){return r.encode(n)});if(typeof e=="function"||typeof e=="object")return ku(e,function(n){return r.encode(n)});throw new Error("Data cannot be encoded in JSON: "+e)},t.prototype.decode=function(e){var r=this;if(e==null)return e;if(e["@type"])switch(e["@type"]){case tg:case rg:{var n=Number(e.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+e);return n}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(function(i){return r.decode(i)}):typeof e=="function"||typeof e=="object"?ku(e,function(i){return r.decode(i)}):e},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(t){var e,r=new Promise(function(n,i){e=setTimeout(function(){i(new Jt("deadline-exceeded","deadline-exceeded"))},t)});return{timer:e,promise:r}}var Nu=function(){function t(e,r,n,i,o,a){var s=this;o===void 0&&(o="us-central1"),this.app_=e,this.appCheckProvider=i,this.fetchImpl=a,this.serializer=new ng,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return Promise.resolve(s.deleteService())}},this.contextProvider=new eg(r,n),this.cancelAllRequests=new Promise(function(l){s.deleteService=function(){return l()}});try{var u=new URL(o);this.customDomain=u.origin,this.region="us-central1"}catch{this.customDomain=null,this.region=o}}return Object.defineProperty(t.prototype,"app",{get:function(){return this.app_},enumerable:!1,configurable:!0}),t.prototype._url=function(e){var r=this.app_.options.projectId;if(this.emulatorOrigin!==null){var n=this.emulatorOrigin;return n+"/"+r+"/"+this.region+"/"+e}return this.customDomain!==null?this.customDomain+"/"+e:"https://"+this.region+"-"+r+".cloudfunctions.net/"+e},t.prototype.useEmulator=function(e,r){this.emulatorOrigin="http://"+e+":"+r},t.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},t.prototype.httpsCallable=function(e,r){var n=this;return function(i){return n.call(e,i,r||{})}},t.prototype.postJSON=function(e,r,n){return v(this,void 0,void 0,function(){var i,o,a;return g(this,function(s){switch(s.label){case 0:return n["Content-Type"]="application/json",[4,this.getAppCheckToken()];case 1:i=s.sent(),i!==null&&(n["X-Firebase-AppCheck"]=i),s.label=2;case 2:return s.trys.push([2,4,,5]),[4,this.fetchImpl(e,{method:"POST",body:JSON.stringify(r),headers:n})];case 3:return o=s.sent(),[3,5];case 4:return s.sent(),[2,{status:0,json:null}];case 5:a=null,s.label=6;case 6:return s.trys.push([6,8,,9]),[4,o.json()];case 7:return a=s.sent(),[3,9];case 8:return s.sent(),[3,9];case 9:return[2,{status:o.status,json:a}]}})})},t.prototype.getAppCheckToken=function(){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return e=this.appCheckProvider.getImmediate({optional:!0}),e?[4,e.getToken()]:[3,2];case 1:return r=n.sent(),[2,r.token];case 2:return[2,null]}})})},t.prototype.call=function(e,r,n){return v(this,void 0,void 0,function(){var i,o,a,s,u,l,c,f,h,d,p,m;return g(this,function(y){switch(y.label){case 0:return i=this._url(e),r=this.serializer.encode(r),o={data:r},a={},[4,this.contextProvider.getContext()];case 1:return s=y.sent(),s.authToken&&(a.Authorization="Bearer "+s.authToken),s.instanceIdToken&&(a["Firebase-Instance-ID-Token"]=s.instanceIdToken),u=n.timeout||7e4,l=ig(u),c=l.timer,f=l.promise,[4,Promise.race([Ou(c,this.postJSON(i,o,a)),f,Ou(c,this.cancelAllRequests)])];case 2:if(h=y.sent(),!h)throw new Jt("cancelled","Firebase Functions instance was deleted.");if(d=Zv(h.status,h.json,this.serializer),d)throw d;if(!h.json)throw new Jt("internal","Response is not valid JSON object.");if(p=h.json.data,typeof p=="undefined"&&(p=h.json.result),typeof p=="undefined")throw new Jt("internal","Response is missing data field.");return m=this.serializer.decode(p),[2,{data:m}]}})})},t}();function Ou(t,e){return v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:return[4,e];case 1:return r=n.sent(),clearTimeout(t),[2,r]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var og="functions";function ag(t,e){var r={Functions:Nu};function n(i,o){var a=o.instanceIdentifier,s=i.getProvider("app").getImmediate(),u=i.getProvider("auth-internal"),l=i.getProvider("app-check-internal"),c=i.getProvider("messaging");return new Nu(s,u,c,l,a,e)}t.INTERNAL.registerComponent(new Xv(og,n,"PUBLIC").setServiceProps(r).setMultipleInstances(!0))}var sg="@firebase/functions",ug="0.6.15";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ag(fe,fetch.bind(self));fe.registerVersion(sg,ug);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lg="FirebaseError",Pu=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=lg,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,Mu.prototype.create),o}return e}(Error),Mu=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?cg(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new Pu(o,u,i);return l},t}();function cg(t,e){return t.replace(fg,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var fg=/\{\$([^}]+)}/g,hg=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();function dg(t){return Array.prototype.slice.call(t)}function Du(t){return new Promise(function(e,r){t.onsuccess=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function Cn(t,e,r){var n,i=new Promise(function(o,a){n=t[e].apply(t,r),Du(n).then(o,a)});return i.request=n,i}function pg(t,e,r){var n=Cn(t,e,r);return n.then(function(i){if(!!i)return new Or(i,n.request)})}function Zt(t,e,r){r.forEach(function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]},set:function(i){this[e][n]=i}})})}function so(t,e,r,n){n.forEach(function(i){i in r.prototype&&(t.prototype[i]=function(){return Cn(this[e],i,arguments)})})}function Sn(t,e,r,n){n.forEach(function(i){i in r.prototype&&(t.prototype[i]=function(){return this[e][i].apply(this[e],arguments)})})}function xu(t,e,r,n){n.forEach(function(i){i in r.prototype&&(t.prototype[i]=function(){return pg(this[e],i,arguments)})})}function kt(t){this._index=t}Zt(kt,"_index",["name","keyPath","multiEntry","unique"]);so(kt,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]);xu(kt,"_index",IDBIndex,["openCursor","openKeyCursor"]);function Or(t,e){this._cursor=t,this._request=e}Zt(Or,"_cursor",["direction","key","primaryKey","value"]);so(Or,"_cursor",IDBCursor,["update","delete"]);["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(Or.prototype[t]=function(){var e=this,r=arguments;return Promise.resolve().then(function(){return e._cursor[t].apply(e._cursor,r),Du(e._request).then(function(n){if(!!n)return new Or(n,e._request)})})})});function $e(t){this._store=t}$e.prototype.createIndex=function(){return new kt(this._store.createIndex.apply(this._store,arguments))};$e.prototype.index=function(){return new kt(this._store.index.apply(this._store,arguments))};Zt($e,"_store",["name","keyPath","indexNames","autoIncrement"]);so($e,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]);xu($e,"_store",IDBObjectStore,["openCursor","openKeyCursor"]);Sn($e,"_store",IDBObjectStore,["deleteIndex"]);function Pr(t){this._tx=t,this.complete=new Promise(function(e,r){t.oncomplete=function(){e()},t.onerror=function(){r(t.error)},t.onabort=function(){r(t.error)}})}Pr.prototype.objectStore=function(){return new $e(this._tx.objectStore.apply(this._tx,arguments))};Zt(Pr,"_tx",["objectStoreNames","mode"]);Sn(Pr,"_tx",IDBTransaction,["abort"]);function In(t,e,r){this._db=t,this.oldVersion=e,this.transaction=new Pr(r)}In.prototype.createObjectStore=function(){return new $e(this._db.createObjectStore.apply(this._db,arguments))};Zt(In,"_db",["name","version","objectStoreNames"]);Sn(In,"_db",IDBDatabase,["deleteObjectStore","close"]);function Rn(t){this._db=t}Rn.prototype.transaction=function(){return new Pr(this._db.transaction.apply(this._db,arguments))};Zt(Rn,"_db",["name","version","objectStoreNames"]);Sn(Rn,"_db",IDBDatabase,["close"]);["openCursor","openKeyCursor"].forEach(function(t){[$e,kt].forEach(function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var r=dg(arguments),n=r[r.length-1],i=this._store||this._index,o=i[t].apply(i,r.slice(0,-1));o.onsuccess=function(){n(o.result)}})})});[kt,$e].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(e,r){var n=this,i=[];return new Promise(function(o){n.iterateCursor(e,function(a){if(!a){o(i);return}if(i.push(a.value),r!==void 0&&i.length==r){o(i);return}a.continue()})})})});function uo(t,e,r){var n=Cn(indexedDB,"open",[t,e]),i=n.request;return i&&(i.onupgradeneeded=function(o){r&&r(new In(i.result,o.oldVersion,i.transaction))}),n.then(function(o){return new Rn(o)})}function lo(t){return Cn(indexedDB,"deleteDatabase",[t])}var vg="@firebase/installations",Lu="0.4.32";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fu=1e4,Uu="w:"+Lu,Bu="FIS_v2",gg="https://firebaseinstallations.googleapis.com/v1",_g=60*60*1e3,mg="installations",yg="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ct,Eg=(ct={},ct["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',ct["not-registered"]="Firebase Installation is not registered.",ct["installation-not-found"]="Firebase Installation not found.",ct["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',ct["app-offline"]="Could not process request. Application offline.",ct["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",ct),Ye=new Mu(mg,yg,Eg);function Hu(t){return t instanceof Pu&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function co(t){var e=t.projectId;return gg+"/projects/"+e+"/installations"}function Wu(t){return{token:t.token,requestStatus:2,expiresIn:bg(t.expiresIn),creationTime:Date.now()}}function fo(t,e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return[4,e.json()];case 1:return r=i.sent(),n=r.error,[2,Ye.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})]}})})}function Vu(t){var e=t.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function ju(t,e){var r=e.refreshToken,n=Vu(t);return n.append("Authorization",Tg(r)),n}function ho(t){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return[4,t()];case 1:return e=r.sent(),e.status>=500&&e.status<600?[2,t()]:[2,e]}})})}function bg(t){return Number(t.replace("s","000"))}function Tg(t){return Bu+" "+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wg(t,e){var r=e.fid;return v(this,void 0,void 0,function(){var n,i,o,a,s,u,l;return g(this,function(c){switch(c.label){case 0:return n=co(t),i=Vu(t),o={fid:r,authVersion:Bu,appId:t.appId,sdkVersion:Uu},a={method:"POST",headers:i,body:JSON.stringify(o)},[4,ho(function(){return fetch(n,a)})];case 1:return s=c.sent(),s.ok?[4,s.json()]:[3,3];case 2:return u=c.sent(),l={fid:u.fid||r,registrationStatus:2,refreshToken:u.refreshToken,authToken:Wu(u.authToken)},[2,l];case 3:return[4,fo("Create Installation",s)];case 4:throw c.sent()}})})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(t){return new Promise(function(e){setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(t){var e=btoa(String.fromCharCode.apply(String,j([],Z(t))));return e.replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sg=/^[cdef][\w-]{21}$/,po="";function Ig(){try{var t=new Uint8Array(17),e=self.crypto||self.msCrypto;e.getRandomValues(t),t[0]=112+t[0]%16;var r=Rg(t);return Sg.test(r)?r:po}catch{return po}}function Rg(t){var e=Cg(t);return e.substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t){return t.appName+"!"+t.appId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tr=new Map;function Gu(t,e){var r=er(t);qu(r,e),Ng(r,e)}function Ag(t,e){zu();var r=er(t),n=tr.get(r);n||(n=new Set,tr.set(r,n)),n.add(e)}function kg(t,e){var r=er(t),n=tr.get(r);!n||(n.delete(e),n.size===0&&tr.delete(r),Ku())}function qu(t,e){var r,n,i=tr.get(t);if(!!i)try{for(var o=Q(i),a=o.next();!a.done;a=o.next()){var s=a.value;s(e)}}catch(u){r={error:u}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}}function Ng(t,e){var r=zu();r&&r.postMessage({key:t,fid:e}),Ku()}var Nt=null;function zu(){return!Nt&&"BroadcastChannel"in self&&(Nt=new BroadcastChannel("[Firebase] FID Change"),Nt.onmessage=function(t){qu(t.data.key,t.data.fid)}),Nt}function Ku(){tr.size===0&&Nt&&(Nt.close(),Nt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Og="firebase-installations-database",Pg=1,Ot="firebase-installations-store",vo=null;function go(){return vo||(vo=uo(Og,Pg,function(t){switch(t.oldVersion){case 0:t.createObjectStore(Ot)}})),vo}function An(t,e){return v(this,void 0,void 0,function(){var r,n,i,o,a;return g(this,function(s){switch(s.label){case 0:return r=er(t),[4,go()];case 1:return n=s.sent(),i=n.transaction(Ot,"readwrite"),o=i.objectStore(Ot),[4,o.get(r)];case 2:return a=s.sent(),[4,o.put(e,r)];case 3:return s.sent(),[4,i.complete];case 4:return s.sent(),(!a||a.fid!==e.fid)&&Gu(t,e.fid),[2,e]}})})}function _o(t){return v(this,void 0,void 0,function(){var e,r,n;return g(this,function(i){switch(i.label){case 0:return e=er(t),[4,go()];case 1:return r=i.sent(),n=r.transaction(Ot,"readwrite"),[4,n.objectStore(Ot).delete(e)];case 2:return i.sent(),[4,n.complete];case 3:return i.sent(),[2]}})})}function Mr(t,e){return v(this,void 0,void 0,function(){var r,n,i,o,a,s;return g(this,function(u){switch(u.label){case 0:return r=er(t),[4,go()];case 1:return n=u.sent(),i=n.transaction(Ot,"readwrite"),o=i.objectStore(Ot),[4,o.get(r)];case 2:return a=u.sent(),s=e(a),s!==void 0?[3,4]:[4,o.delete(r)];case 3:return u.sent(),[3,6];case 4:return[4,o.put(s,r)];case 5:u.sent(),u.label=6;case 6:return[4,i.complete];case 7:return u.sent(),s&&(!a||a.fid!==s.fid)&&Gu(t,s.fid),[2,s]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(t){return v(this,void 0,void 0,function(){var e,r,n;return g(this,function(i){switch(i.label){case 0:return[4,Mr(t,function(o){var a=Mg(o),s=Dg(t,a);return e=s.registrationPromise,s.installationEntry})];case 1:return r=i.sent(),r.fid!==po?[3,3]:(n={},[4,e]);case 2:return[2,(n.installationEntry=i.sent(),n)];case 3:return[2,{installationEntry:r,registrationPromise:e}]}})})}function Mg(t){var e=t||{fid:Ig(),registrationStatus:0};return Yu(e)}function Dg(t,e){if(e.registrationStatus===0){if(!navigator.onLine){var r=Promise.reject(Ye.create("app-offline"));return{installationEntry:e,registrationPromise:r}}var n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=xg(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Lg(t)}:{installationEntry:e}}function xg(t,e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,wg(t,e)];case 1:return r=i.sent(),[2,An(t,r)];case 2:return n=i.sent(),Hu(n)&&n.customData.serverCode===409?[4,_o(t)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,An(t,{fid:e.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw n;case 7:return[2]}})})}function Lg(t){return v(this,void 0,void 0,function(){var e,r,n,i;return g(this,function(o){switch(o.label){case 0:return[4,Qu(t)];case 1:e=o.sent(),o.label=2;case 2:return e.registrationStatus!==1?[3,5]:[4,$u(100)];case 3:return o.sent(),[4,Qu(t)];case 4:return e=o.sent(),[3,2];case 5:return e.registrationStatus!==0?[3,7]:[4,mo(t)];case 6:return r=o.sent(),n=r.installationEntry,i=r.registrationPromise,i?[2,i]:[2,n];case 7:return[2,e]}})})}function Qu(t){return Mr(t,function(e){if(!e)throw Ye.create("installation-not-found");return Yu(e)})}function Yu(t){return Fg(t)?{fid:t.fid,registrationStatus:0}:t}function Fg(t){return t.registrationStatus===1&&t.registrationTime+Fu<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ug(t,e){var r=t.appConfig,n=t.platformLoggerProvider;return v(this,void 0,void 0,function(){var i,o,a,s,u,l,c,f;return g(this,function(h){switch(h.label){case 0:return i=Bg(r,e),o=ju(r,e),a=n.getImmediate({optional:!0}),a&&o.append("x-firebase-client",a.getPlatformInfoString()),s={installation:{sdkVersion:Uu}},u={method:"POST",headers:o,body:JSON.stringify(s)},[4,ho(function(){return fetch(i,u)})];case 1:return l=h.sent(),l.ok?[4,l.json()]:[3,3];case 2:return c=h.sent(),f=Wu(c),[2,f];case 3:return[4,fo("Generate Auth Token",l)];case 4:throw h.sent()}})})}function Bg(t,e){var r=e.fid;return co(t)+"/"+r+"/authTokens:generate"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(t,e){return e===void 0&&(e=!1),v(this,void 0,void 0,function(){var r,n,i,o;return g(this,function(a){switch(a.label){case 0:return[4,Mr(t.appConfig,function(s){if(!Ju(s))throw Ye.create("not-registered");var u=s.authToken;if(!e&&Vg(u))return s;if(u.requestStatus===1)return r=Hg(t,e),s;if(!navigator.onLine)throw Ye.create("app-offline");var l=$g(s);return r=Wg(t,l),l})];case 1:return n=a.sent(),r?[4,r]:[3,3];case 2:return o=a.sent(),[3,4];case 3:o=n.authToken,a.label=4;case 4:return i=o,[2,i]}})})}function Hg(t,e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return[4,Xu(t.appConfig)];case 1:r=i.sent(),i.label=2;case 2:return r.authToken.requestStatus!==1?[3,5]:[4,$u(100)];case 3:return i.sent(),[4,Xu(t.appConfig)];case 4:return r=i.sent(),[3,2];case 5:return n=r.authToken,n.requestStatus===0?[2,yo(t,e)]:[2,n]}})})}function Xu(t){return Mr(t,function(e){if(!Ju(e))throw Ye.create("not-registered");var r=e.authToken;return Gg(r)?T(T({},e),{authToken:{requestStatus:0}}):e})}function Wg(t,e){return v(this,void 0,void 0,function(){var r,n,i,n;return g(this,function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,Ug(t,e)];case 1:return r=o.sent(),n=T(T({},e),{authToken:r}),[4,An(t.appConfig,n)];case 2:return o.sent(),[2,r];case 3:return i=o.sent(),Hu(i)&&(i.customData.serverCode===401||i.customData.serverCode===404)?[4,_o(t.appConfig)]:[3,5];case 4:return o.sent(),[3,7];case 5:return n=T(T({},e),{authToken:{requestStatus:0}}),[4,An(t.appConfig,n)];case 6:o.sent(),o.label=7;case 7:throw i;case 8:return[2]}})})}function Ju(t){return t!==void 0&&t.registrationStatus===2}function Vg(t){return t.requestStatus===2&&!jg(t)}function jg(t){var e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+_g}function $g(t){var e={requestStatus:1,requestTime:Date.now()};return T(T({},t),{authToken:e})}function Gg(t){return t.requestStatus===1&&t.requestTime+Fu<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(t){return v(this,void 0,void 0,function(){var e,r,n;return g(this,function(i){switch(i.label){case 0:return[4,mo(t.appConfig)];case 1:return e=i.sent(),r=e.installationEntry,n=e.registrationPromise,n?n.catch(console.error):yo(t).catch(console.error),[2,r.fid]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(t,e){return e===void 0&&(e=!1),v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:return[4,Kg(t.appConfig)];case 1:return n.sent(),[4,yo(t,e)];case 2:return r=n.sent(),[2,r.token]}})})}function Kg(t){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return[4,mo(t)];case 1:return e=r.sent().registrationPromise,e?[4,e]:[3,3];case 2:r.sent(),r.label=3;case 3:return[2]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(t,e){return v(this,void 0,void 0,function(){var r,n,i,o;return g(this,function(a){switch(a.label){case 0:return r=Yg(t,e),n=ju(t,e),i={method:"DELETE",headers:n},[4,ho(function(){return fetch(r,i)})];case 1:return o=a.sent(),o.ok?[3,3]:[4,fo("Delete Installation",o)];case 2:throw a.sent();case 3:return[2]}})})}function Yg(t,e){var r=e.fid;return co(t)+"/"+r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(t){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return e=t.appConfig,[4,Mr(e,function(i){if(!(i&&i.registrationStatus===0))return i})];case 1:if(r=n.sent(),!r)return[3,6];if(r.registrationStatus!==1)return[3,2];throw Ye.create("delete-pending-registration");case 2:if(r.registrationStatus!==2)return[3,6];if(navigator.onLine)return[3,3];throw Ye.create("app-offline");case 3:return[4,Qg(e,r)];case 4:return n.sent(),[4,_o(e)];case 5:n.sent(),n.label=6;case 6:return[2]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(t,e){var r=t.appConfig;return Ag(r,e),function(){kg(r,e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(t){var e,r;if(!t||!t.options)throw Eo("App Configuration");if(!t.name)throw Eo("App Name");var n=["projectId","apiKey","appId"];try{for(var i=Q(n),o=i.next();!o.done;o=i.next()){var a=o.value;if(!t.options[a])throw Eo(a)}}catch(s){e={error:s}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Eo(t){return Ye.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(t){var e="installations";t.INTERNAL.registerComponent(new hg(e,function(r){var n=r.getProvider("app").getImmediate(),i=Zg(n),o=r.getProvider("platform-logger"),a={appConfig:i,platformLoggerProvider:o},s={app:n,getId:function(){return qg(a)},getToken:function(u){return zg(a,u)},delete:function(){return Xg(a)},onIdChange:function(u){return Jg(a,u)}};return s},"PUBLIC")),t.registerVersion(vg,Lu)}e_(fe);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t_="FirebaseError",r_=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=t_,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,Zu.prototype.create),o}return e}(Error),Zu=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?n_(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new r_(o,u,i);return l},t}();function n_(t,e){return t.replace(i_,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var i_=/\{\$([^}]+)}/g,o_=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z,a_=(z={},z["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',z["only-available-in-window"]="This method is available in a Window context.",z["only-available-in-sw"]="This method is available in a service worker context.",z["permission-default"]="The notification permission was not granted and dismissed instead.",z["permission-blocked"]="The notification permission was not granted and blocked instead.",z["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",z["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",z["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",z["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",z["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",z["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",z["token-update-no-token"]="FCM returned no token when updating the user to push.",z["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",z["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",z["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",z["invalid-vapid-key"]="The public VAPID key must be a string.",z["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",z),O=new Zu("messaging","Messaging",a_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var s_="/firebase-messaging-sw.js",u_="/firebase-cloud-messaging-push-scope",kn="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",l_="https://fcmregistrations.googleapis.com/v1",el="FCM_MSG",c_="FirebaseMessaging: ",f_="google.c.a.e",tl="google.c.a.c_id",h_="google.c.a.ts",d_="google.c.a.c_l",p_=1e3,v_=3e3;/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Pt;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Pt||(Pt={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(t){var e=new Uint8Array(t),r=btoa(String.fromCharCode.apply(String,j([],Z(e))));return r.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function g_(t){for(var e="=".repeat((4-t.length%4)%4),r=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(r),i=new Uint8Array(n.length),o=0;o<n.length;++o)i[o]=n.charCodeAt(o);return i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var bo="fcm_token_details_db",__=5,rl="fcm_token_object_Store";function m_(t){return v(this,void 0,void 0,function(){var e,r,n,i,o=this;return g(this,function(a){switch(a.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(e=a.sent(),r=e.map(function(s){return s.name}),!r.includes(bo))return[2,null];a.label=2;case 2:return n=null,[4,uo(bo,__,function(s){return v(o,void 0,void 0,function(){var u,l,c,c,c,f;return g(this,function(h){switch(h.label){case 0:return s.oldVersion<2?[2]:s.objectStoreNames.contains(rl)?(u=s.transaction.objectStore(rl),[4,u.index("fcmSenderId").get(t)]):[2];case 1:return l=h.sent(),[4,u.clear()];case 2:if(h.sent(),!l)return[2];if(s.oldVersion===2){if(c=l,!c.auth||!c.p256dh||!c.endpoint)return[2];n={token:c.fcmToken,createTime:(f=c.createTime)!==null&&f!==void 0?f:Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:Xe(c.vapidKey)}}}else s.oldVersion===3?(c=l,n={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Xe(c.auth),p256dh:Xe(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Xe(c.vapidKey)}}):s.oldVersion===4&&(c=l,n={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Xe(c.auth),p256dh:Xe(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Xe(c.vapidKey)}});return[2]}})})})];case 3:return i=a.sent(),i.close(),[4,lo(bo)];case 4:return a.sent(),[4,lo("fcm_vapid_details_db")];case 5:return a.sent(),[4,lo("undefined")];case 6:return a.sent(),[2,y_(n)?n:null]}})})}function y_(t){if(!t||!t.subscriptionOptions)return!1;var e=t.subscriptionOptions;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var E_="firebase-messaging-database",b_=1,Mt="firebase-messaging-store",To=null;function wo(){return To||(To=uo(E_,b_,function(t){switch(t.oldVersion){case 0:t.createObjectStore(Mt)}})),To}function Nn(t){return v(this,void 0,void 0,function(){var e,r,n,i;return g(this,function(o){switch(o.label){case 0:return e=So(t),[4,wo()];case 1:return r=o.sent(),[4,r.transaction(Mt).objectStore(Mt).get(e)];case 2:return n=o.sent(),n?[2,n]:[3,3];case 3:return[4,m_(t.appConfig.senderId)];case 4:return i=o.sent(),i?[4,Co(t,i)]:[3,6];case 5:return o.sent(),[2,i];case 6:return[2]}})})}function Co(t,e){return v(this,void 0,void 0,function(){var r,n,i;return g(this,function(o){switch(o.label){case 0:return r=So(t),[4,wo()];case 1:return n=o.sent(),i=n.transaction(Mt,"readwrite"),[4,i.objectStore(Mt).put(e,r)];case 2:return o.sent(),[4,i.complete];case 3:return o.sent(),[2,e]}})})}function T_(t){return v(this,void 0,void 0,function(){var e,r,n;return g(this,function(i){switch(i.label){case 0:return e=So(t),[4,wo()];case 1:return r=i.sent(),n=r.transaction(Mt,"readwrite"),[4,n.objectStore(Mt).delete(e)];case 2:return i.sent(),[4,n.complete];case 3:return i.sent(),[2]}})})}function So(t){var e=t.appConfig;return e.appId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w_(t,e){return v(this,void 0,void 0,function(){var r,n,i,o,a,s,u;return g(this,function(l){switch(l.label){case 0:return[4,Ro(t)];case 1:r=l.sent(),n=il(e),i={method:"POST",headers:r,body:JSON.stringify(n)},l.label=2;case 2:return l.trys.push([2,5,,6]),[4,fetch(Io(t.appConfig),i)];case 3:return a=l.sent(),[4,a.json()];case 4:return o=l.sent(),[3,6];case 5:throw s=l.sent(),O.create("token-subscribe-failed",{errorInfo:s});case 6:if(o.error)throw u=o.error.message,O.create("token-subscribe-failed",{errorInfo:u});if(!o.token)throw O.create("token-subscribe-no-token");return[2,o.token]}})})}function C_(t,e){return v(this,void 0,void 0,function(){var r,n,i,o,a,s,u;return g(this,function(l){switch(l.label){case 0:return[4,Ro(t)];case 1:r=l.sent(),n=il(e.subscriptionOptions),i={method:"PATCH",headers:r,body:JSON.stringify(n)},l.label=2;case 2:return l.trys.push([2,5,,6]),[4,fetch(Io(t.appConfig)+"/"+e.token,i)];case 3:return a=l.sent(),[4,a.json()];case 4:return o=l.sent(),[3,6];case 5:throw s=l.sent(),O.create("token-update-failed",{errorInfo:s});case 6:if(o.error)throw u=o.error.message,O.create("token-update-failed",{errorInfo:u});if(!o.token)throw O.create("token-update-no-token");return[2,o.token]}})})}function nl(t,e){return v(this,void 0,void 0,function(){var r,n,i,o,a,s;return g(this,function(u){switch(u.label){case 0:return[4,Ro(t)];case 1:r=u.sent(),n={method:"DELETE",headers:r},u.label=2;case 2:return u.trys.push([2,5,,6]),[4,fetch(Io(t.appConfig)+"/"+e,n)];case 3:return i=u.sent(),[4,i.json()];case 4:if(o=u.sent(),o.error)throw a=o.error.message,O.create("token-unsubscribe-failed",{errorInfo:a});return[3,6];case 5:throw s=u.sent(),O.create("token-unsubscribe-failed",{errorInfo:s});case 6:return[2]}})})}function Io(t){var e=t.projectId;return l_+"/projects/"+e+"/registrations"}function Ro(t){var e=t.appConfig,r=t.installations;return v(this,void 0,void 0,function(){var n;return g(this,function(i){switch(i.label){case 0:return[4,r.getToken()];case 1:return n=i.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":"FIS "+n})]}})})}function il(t){var e=t.p256dh,r=t.auth,n=t.endpoint,i=t.vapidKey,o={web:{endpoint:n,auth:r,p256dh:e}};return i!==kn&&(o.web.applicationPubKey=i),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S_=7*24*60*60*1e3;function Ao(t,e,r){return v(this,void 0,void 0,function(){var n,i,o,a;return g(this,function(s){switch(s.label){case 0:if(Notification.permission!=="granted")throw O.create("permission-blocked");return[4,R_(e,r)];case 1:return n=s.sent(),[4,Nn(t)];case 2:return i=s.sent(),o={vapidKey:r,swScope:e.scope,endpoint:n.endpoint,auth:Xe(n.getKey("auth")),p256dh:Xe(n.getKey("p256dh"))},i?[3,3]:[2,ol(t,o)];case 3:if(A_(i.subscriptionOptions,o))return[3,8];s.label=4;case 4:return s.trys.push([4,6,,7]),[4,nl(t,i.token)];case 5:return s.sent(),[3,7];case 6:return a=s.sent(),console.warn(a),[3,7];case 7:return[2,ol(t,o)];case 8:return Date.now()>=i.createTime+S_?[2,I_({token:i.token,createTime:Date.now(),subscriptionOptions:o},t,e)]:[2,i.token];case 9:return[2]}})})}function Dr(t,e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return[4,Nn(t)];case 1:return r=i.sent(),r?[4,nl(t,r.token)]:[3,4];case 2:return i.sent(),[4,T_(t)];case 3:i.sent(),i.label=4;case 4:return[4,e.pushManager.getSubscription()];case 5:return n=i.sent(),n?[2,n.unsubscribe()]:[2,!0]}})})}function I_(t,e,r){return v(this,void 0,void 0,function(){var n,i,o;return g(this,function(a){switch(a.label){case 0:return a.trys.push([0,3,,5]),[4,C_(e,t)];case 1:return n=a.sent(),i=T(T({},t),{token:n,createTime:Date.now()}),[4,Co(e,i)];case 2:return a.sent(),[2,n];case 3:return o=a.sent(),[4,Dr(e,r)];case 4:throw a.sent(),o;case 5:return[2]}})})}function ol(t,e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return[4,w_(t,e)];case 1:return r=i.sent(),n={token:r,createTime:Date.now(),subscriptionOptions:e},[4,Co(t,n)];case 2:return i.sent(),[2,n.token]}})})}function R_(t,e){return v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:return[4,t.pushManager.getSubscription()];case 1:return r=n.sent(),r?[2,r]:[2,t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:g_(e)})]}})})}function A_(t,e){var r=e.vapidKey===t.vapidKey,n=e.endpoint===t.endpoint,i=e.auth===t.auth,o=e.p256dh===t.p256dh;return r&&n&&i&&o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(t){var e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcm_message_id};return N_(e,t),O_(e,t),P_(e,t),e}function N_(t,e){if(!!e.notification){t.notification={};var r=e.notification.title;r&&(t.notification.title=r);var n=e.notification.body;n&&(t.notification.body=n);var i=e.notification.image;i&&(t.notification.image=i)}}function O_(t,e){!e.data||(t.data=e.data)}function P_(t,e){if(!!e.fcmOptions){t.fcmOptions={};var r=e.fcmOptions.link;r&&(t.fcmOptions.link=r);var n=e.fcmOptions.analytics_label;n&&(t.fcmOptions.analyticsLabel=n)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function al(t){return typeof t=="object"&&!!t&&tl in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(t){return new Promise(function(e){setTimeout(e,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var M_=function(){function t(e){var r=this;this.firebaseDependencies=e,this.isOnBackgroundMessageUsed=null,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",function(n){n.waitUntil(r.onPush(n))}),self.addEventListener("pushsubscriptionchange",function(n){n.waitUntil(r.onSubChange(n))}),self.addEventListener("notificationclick",function(n){n.waitUntil(r.onNotificationClick(n))})}return Object.defineProperty(t.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),t.prototype.setBackgroundMessageHandler=function(e){if(this.isOnBackgroundMessageUsed=!1,!e||typeof e!="function")throw O.create("invalid-bg-handler");this.bgMessageHandler=e},t.prototype.onBackgroundMessage=function(e){var r=this;return this.isOnBackgroundMessageUsed=!0,this.bgMessageHandler=e,function(){r.bgMessageHandler=null}},t.prototype.getToken=function(){var e,r;return v(this,void 0,void 0,function(){var n;return g(this,function(i){switch(i.label){case 0:return this.vapidKey?[3,2]:[4,Nn(this.firebaseDependencies)];case 1:n=i.sent(),this.vapidKey=(r=(e=n==null?void 0:n.subscriptionOptions)===null||e===void 0?void 0:e.vapidKey)!==null&&r!==void 0?r:kn,i.label=2;case 2:return[2,Ao(this.firebaseDependencies,self.registration,this.vapidKey)]}})})},t.prototype.deleteToken=function(){return Dr(this.firebaseDependencies,self.registration)},t.prototype.requestPermission=function(){throw O.create("only-available-in-window")},t.prototype.usePublicVapidKey=function(e){if(this.vapidKey!==null)throw O.create("use-vapid-key-after-get-token");if(typeof e!="string"||e.length===0)throw O.create("invalid-vapid-key");this.vapidKey=e},t.prototype.useServiceWorker=function(){throw O.create("only-available-in-window")},t.prototype.onMessage=function(){throw O.create("only-available-in-window")},t.prototype.onTokenRefresh=function(){throw O.create("only-available-in-window")},t.prototype.onPush=function(e){return v(this,void 0,void 0,function(){var r,n,i,o;return g(this,function(a){switch(a.label){case 0:return r=x_(e),r?[4,ul()]:(console.debug(c_+"failed to get parsed MessagePayload from the PushEvent. Skip handling the push."),[2]);case 1:return n=a.sent(),F_(n)?[2,U_(n,r)]:(i=!1,r.notification?[4,B_(D_(r))]:[3,3]);case 2:a.sent(),i=!0,a.label=3;case 3:return i===!0&&this.isOnBackgroundMessageUsed===!1?[2]:(this.bgMessageHandler&&(o=k_(r),typeof this.bgMessageHandler=="function"?this.bgMessageHandler(o):this.bgMessageHandler.next(o)),[4,sl(p_)]);case 4:return a.sent(),[2]}})})},t.prototype.onSubChange=function(e){var r,n;return v(this,void 0,void 0,function(){var i,o;return g(this,function(a){switch(a.label){case 0:return i=e.newSubscription,i?[3,2]:[4,Dr(this.firebaseDependencies,self.registration)];case 1:return a.sent(),[2];case 2:return[4,Nn(this.firebaseDependencies)];case 3:return o=a.sent(),[4,Dr(this.firebaseDependencies,self.registration)];case 4:return a.sent(),[4,Ao(this.firebaseDependencies,self.registration,(n=(r=o==null?void 0:o.subscriptionOptions)===null||r===void 0?void 0:r.vapidKey)!==null&&n!==void 0?n:kn)];case 5:return a.sent(),[2]}})})},t.prototype.onNotificationClick=function(e){var r,n;return v(this,void 0,void 0,function(){var i,o,a,s,u;return g(this,function(l){switch(l.label){case 0:if(i=(n=(r=e.notification)===null||r===void 0?void 0:r.data)===null||n===void 0?void 0:n[el],i){if(e.action)return[2]}else return[2];return e.stopImmediatePropagation(),e.notification.close(),o=H_(i),o?(a=new URL(o,self.location.href),s=new URL(self.location.origin),a.host!==s.host?[2]:[4,L_(a)]):[2];case 1:return u=l.sent(),u?[3,4]:[4,self.clients.openWindow(o)];case 2:return u=l.sent(),[4,sl(v_)];case 3:return l.sent(),[3,6];case 4:return[4,u.focus()];case 5:u=l.sent(),l.label=6;case 6:return u?(i.messageType=Pt.NOTIFICATION_CLICKED,i.isFirebaseMessaging=!0,[2,u.postMessage(i)]):[2]}})})},t}();function D_(t){var e,r=T({},t.notification);return r.data=(e={},e[el]=t,e),r}function x_(t){var e=t.data;if(!e)return null;try{return e.json()}catch{return null}}function L_(t){return v(this,void 0,void 0,function(){var e,r,n,i,o,a,s;return g(this,function(u){switch(u.label){case 0:return[4,ul()];case 1:e=u.sent();try{for(r=Q(e),n=r.next();!n.done;n=r.next())if(i=n.value,o=new URL(i.url,self.location.href),t.host===o.host)return[2,i]}catch(l){a={error:l}}finally{try{n&&!n.done&&(s=r.return)&&s.call(r)}finally{if(a)throw a.error}}return[2,null]}})})}function F_(t){return t.some(function(e){return e.visibilityState==="visible"&&!e.url.startsWith("chrome-extension://")})}function U_(t,e){var r,n;e.isFirebaseMessaging=!0,e.messageType=Pt.PUSH_RECEIVED;try{for(var i=Q(t),o=i.next();!o.done;o=i.next()){var a=o.value;a.postMessage(e)}}catch(s){r={error:s}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}}function ul(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function B_(t){var e,r=t.actions,n=Notification.maxActions;return r&&n&&r.length>n&&console.warn("This browser only supports "+n+" actions. The remaining actions will not be displayed."),self.registration.showNotification((e=t.title)!==null&&e!==void 0?e:"",t)}function H_(t){var e,r,n,i=(r=(e=t.fcmOptions)===null||e===void 0?void 0:e.link)!==null&&r!==void 0?r:(n=t.notification)===null||n===void 0?void 0:n.click_action;return i||(al(t.data)?self.location.origin:null)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W_=function(){function t(e){var r=this;this.firebaseDependencies=e,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",function(n){return r.messageEventListener(n)})}return Object.defineProperty(t.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),t.prototype.messageEventListener=function(e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return r=e.data,r.isFirebaseMessaging?(this.onMessageCallback&&r.messageType===Pt.PUSH_RECEIVED&&(typeof this.onMessageCallback=="function"?this.onMessageCallback(j_(Object.assign({},r))):this.onMessageCallback.next(Object.assign({},r))),n=r.data,al(n)&&n[f_]==="1"?[4,this.logEvent(r.messageType,n)]:[3,2]):[2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},t.prototype.getVapidKey=function(){return this.vapidKey},t.prototype.getSwReg=function(){return this.swRegistration},t.prototype.getToken=function(e){return v(this,void 0,void 0,function(){return g(this,function(r){switch(r.label){case 0:return Notification.permission!=="default"?[3,2]:[4,Notification.requestPermission()];case 1:r.sent(),r.label=2;case 2:if(Notification.permission!=="granted")throw O.create("permission-blocked");return[4,this.updateVapidKey(e==null?void 0:e.vapidKey)];case 3:return r.sent(),[4,this.updateSwReg(e==null?void 0:e.serviceWorkerRegistration)];case 4:return r.sent(),[2,Ao(this.firebaseDependencies,this.swRegistration,this.vapidKey)]}})})},t.prototype.updateVapidKey=function(e){return v(this,void 0,void 0,function(){return g(this,function(r){return e?this.vapidKey=e:this.vapidKey||(this.vapidKey=kn),[2]})})},t.prototype.updateSwReg=function(e){return v(this,void 0,void 0,function(){return g(this,function(r){switch(r.label){case 0:return!e&&!this.swRegistration?[4,this.registerDefaultSw()]:[3,2];case 1:r.sent(),r.label=2;case 2:if(!e&&!!this.swRegistration)return[2];if(!(e instanceof ServiceWorkerRegistration))throw O.create("invalid-sw-registration");return this.swRegistration=e,[2]}})})},t.prototype.registerDefaultSw=function(){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),e=this,[4,navigator.serviceWorker.register(s_,{scope:u_})];case 1:return e.swRegistration=n.sent(),this.swRegistration.update().catch(function(){}),[3,3];case 2:throw r=n.sent(),O.create("failed-service-worker-registration",{browserErrorMessage:r.message});case 3:return[2]}})})},t.prototype.deleteToken=function(){return v(this,void 0,void 0,function(){return g(this,function(e){switch(e.label){case 0:return this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:e.sent(),e.label=2;case 2:return[2,Dr(this.firebaseDependencies,this.swRegistration)]}})})},t.prototype.requestPermission=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return Notification.permission==="granted"?[2]:[4,Notification.requestPermission()];case 1:if(e=r.sent(),e==="granted")return[2];throw e==="denied"?O.create("permission-blocked"):O.create("permission-default")}})})},t.prototype.usePublicVapidKey=function(e){if(this.vapidKey!==null)throw O.create("use-vapid-key-after-get-token");if(typeof e!="string"||e.length===0)throw O.create("invalid-vapid-key");this.vapidKey=e},t.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw O.create("invalid-sw-registration");if(this.swRegistration)throw O.create("use-sw-after-get-token");this.swRegistration=e},t.prototype.onMessage=function(e){var r=this;return this.onMessageCallback=e,function(){r.onMessageCallback=null}},t.prototype.setBackgroundMessageHandler=function(){throw O.create("only-available-in-sw")},t.prototype.onBackgroundMessage=function(){throw O.create("only-available-in-sw")},t.prototype.onTokenRefresh=function(){return function(){}},t.prototype.logEvent=function(e,r){return v(this,void 0,void 0,function(){var n,i;return g(this,function(o){switch(o.label){case 0:return n=V_(e),[4,this.firebaseDependencies.analyticsProvider.get()];case 1:return i=o.sent(),i.logEvent(n,{message_id:r[tl],message_name:r[d_],message_time:r[h_],message_device_time:Math.floor(Date.now()/1e3)}),[2]}})})},t}();function V_(t){switch(t){case Pt.NOTIFICATION_CLICKED:return"notification_open";case Pt.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}function j_(t){return delete t.messageType,delete t.isFirebaseMessaging,t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(t){var e,r;if(!t||!t.options)throw ko("App Configuration Object");if(!t.name)throw ko("App Name");var n=["projectId","apiKey","appId","messagingSenderId"],i=t.options;try{for(var o=Q(n),a=o.next();!a.done;a=o.next()){var s=a.value;if(!i[s])throw ko(s)}}catch(u){e={error:u}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(e)throw e.error}}return{appName:t.name,projectId:i.projectId,apiKey:i.apiKey,appId:i.appId,senderId:i.messagingSenderId}}function ko(t){return O.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G_="messaging";function q_(t){var e=t.getProvider("app").getImmediate(),r=$_(e),n=t.getProvider("installations").getImmediate(),i=t.getProvider("analytics-internal"),o={app:e,appConfig:r,installations:n,analyticsProvider:i};if(!ll())throw O.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new M_(o):new W_(o)}var z_={isSupported:ll};fe.INTERNAL.registerComponent(new o_(G_,q_,"PUBLIC").setServiceProps(z_));function ll(){return self&&"ServiceWorkerGlobalScope"in self?Q_():K_()}function K_(){return"indexedDB"in window&&indexedDB!==null&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function Q_(){return"indexedDB"in self&&indexedDB!==null&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var cl=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var i=t.charCodeAt(n);i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):(i&64512)==55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)==56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e},Y_=function(t){for(var e=[],r=0,n=0;r<t.length;){var i=t[r++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){var o=t[r++];e[n++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){var o=t[r++],a=t[r++],s=t[r++],u=((i&7)<<18|(o&63)<<12|(a&63)<<6|s&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{var o=t[r++],a=t[r++];e[n++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},X_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],i=0;i<t.length;i+=3){var o=t[i],a=i+1<t.length,s=a?t[i+1]:0,u=i+2<t.length,l=u?t[i+2]:0,c=o>>2,f=(o&3)<<4|s>>4,h=(s&15)<<2|l>>6,d=l&63;u||(d=64,a||(h=64)),n.push(r[c],r[f],r[h],r[d])}return n.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(cl(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Y_(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],i=0;i<t.length;){var o=r[t.charAt(i++)],a=i<t.length,s=a?r[t.charAt(i)]:0;++i;var u=i<t.length,l=u?r[t.charAt(i)]:64;++i;var c=i<t.length,f=c?r[t.charAt(i)]:64;if(++i,o==null||s==null||l==null||f==null)throw Error();var h=o<<2|s>>4;if(n.push(h),l!==64){var d=s<<4&240|l>>2;if(n.push(d),f!==64){var p=l<<6&192|f;n.push(p)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},J_=function(t){var e=cl(t);return X_.encodeByteArray(e,!0)},fl=function(t){return J_(t).replace(/\./g,"")};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var r={alg:"none",type:"JWT"},n=e||"demo-project",i=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var a=T({iss:"https://securetoken.google.com/"+n,aud:n,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},t),s="";return[fl(JSON.stringify(r)),fl(JSON.stringify(a)),s].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var em="FirebaseError",hl=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=em,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,tm.prototype.create),o}return e}(Error),tm=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?rm(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new hl(o,u,i);return l},t}();function rm(t,e){return t.replace(nm,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var nm=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(t){return t&&t._delegate?t._delegate:t}var im=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dl="firebasestorage.googleapis.com",pl="storageBucket",om=2*60*1e3,am=10*60*1e3,$=function(t){A(e,t);function e(r,n){var i=t.call(this,No(r),"Firebase Storage: "+n+" ("+No(r)+")")||this;return i.customData={serverResponse:null},i._baseMessage=i.message,Object.setPrototypeOf(i,e.prototype),i}return e.prototype._codeEquals=function(r){return No(r)===this.code},Object.defineProperty(e.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(r){this.customData.serverResponse=r,this.customData.serverResponse?this.message=this._baseMessage+`
`+this.customData.serverResponse:this.message=this._baseMessage},enumerable:!1,configurable:!0}),e}(hl);function No(t){return"storage/"+t}function Oo(){var t="An unknown error occurred, please check the error payload for server response.";return new $("unknown",t)}function sm(t){return new $("object-not-found","Object '"+t+"' does not exist.")}function um(t){return new $("quota-exceeded","Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function lm(){var t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new $("unauthenticated",t)}function cm(){return new $("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function fm(t){return new $("unauthorized","User does not have permission to access '"+t+"'.")}function hm(){return new $("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function vl(){return new $("canceled","User canceled the upload/download.")}function dm(t){return new $("invalid-url","Invalid URL '"+t+"'.")}function pm(t){return new $("invalid-default-bucket","Invalid default bucket '"+t+"'.")}function vm(){return new $("no-default-bucket","No default bucket found. Did you set the '"+pl+"' property when initializing the app?")}function gl(){return new $("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function gm(){return new $("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.")}function _m(){return new $("no-download-url","The given file does not have any download URLs.")}function rr(t){return new $("invalid-argument",t)}function _l(){return new $("app-deleted","The Firebase app was deleted.")}function ml(t){return new $("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function xr(t,e){return new $("invalid-format","String does not match format '"+t+"': "+e)}function On(t){throw new $("internal-error","Internal error: "+t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mm(t){return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Po=function(){function t(e,r){this.data=e,this.contentType=r||null}return t}();function yl(t,e){switch(t){case be.RAW:return new Po(El(e));case be.BASE64:case be.BASE64URL:return new Po(bl(t,e));case be.DATA_URL:return new Po(Em(e),bm(e))}throw Oo()}function El(t){for(var e=[],r=0;r<t.length;r++){var n=t.charCodeAt(r);if(n<=127)e.push(n);else if(n<=2047)e.push(192|n>>6,128|n&63);else if((n&64512)==55296){var i=r<t.length-1&&(t.charCodeAt(r+1)&64512)==56320;if(!i)e.push(239,191,189);else{var o=n,a=t.charCodeAt(++r);n=65536|(o&1023)<<10|a&1023,e.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|n&63)}}else(n&64512)==56320?e.push(239,191,189):e.push(224|n>>12,128|n>>6&63,128|n&63)}return new Uint8Array(e)}function ym(t){var e;try{e=decodeURIComponent(t)}catch{throw xr(be.DATA_URL,"Malformed data URL.")}return El(e)}function bl(t,e){switch(t){case be.BASE64:{var r=e.indexOf("-")!==-1,n=e.indexOf("_")!==-1;if(r||n){var i=r?"-":"_";throw xr(t,"Invalid character '"+i+"' found: is it base64url encoded?")}break}case be.BASE64URL:{var o=e.indexOf("+")!==-1,a=e.indexOf("/")!==-1;if(o||a){var i=o?"+":"/";throw xr(t,"Invalid character '"+i+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}}var s;try{s=mm(e)}catch{throw xr(t,"Invalid character found")}for(var u=new Uint8Array(s.length),l=0;l<s.length;l++)u[l]=s.charCodeAt(l);return u}var Tl=function(){function t(e){this.base64=!1,this.contentType=null;var r=e.match(/^data:([^,]+)?,/);if(r===null)throw xr(be.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var n=r[1]||null;n!=null&&(this.base64=Tm(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1)}return t}();function Em(t){var e=new Tl(t);return e.base64?bl(be.BASE64,e.rest):ym(e.rest)}function bm(t){var e=new Tl(t);return e.contentType}function Tm(t,e){var r=t.length>=e.length;return r?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var wm={STATE_CHANGED:"state_changed"},se={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Mo(t){switch(t){case"running":case"pausing":case"canceling":return se.RUNNING;case"paused":return se.PAUSED;case"success":return se.SUCCESS;case"canceled":return se.CANCELED;case"error":return se.ERROR;default:return se.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dt;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Dt||(Dt={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Cm=function(){function t(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=Dt.NO_ERROR,this.sendPromise_=new Promise(function(r){e.xhr_.addEventListener("abort",function(){e.errorCode_=Dt.ABORT,r()}),e.xhr_.addEventListener("error",function(){e.errorCode_=Dt.NETWORK_ERROR,r()}),e.xhr_.addEventListener("load",function(){r()})})}return t.prototype.send=function(e,r,n,i){if(this.sent_)throw On("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(r,e,!0),i!==void 0)for(var o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return n!==void 0?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_},t.prototype.getErrorCode=function(){if(!this.sent_)throw On("cannot .getErrorCode() before sending");return this.errorCode_},t.prototype.getStatus=function(){if(!this.sent_)throw On("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}},t.prototype.getResponseText=function(){if(!this.sent_)throw On("cannot .getResponseText() before sending");return this.xhr_.responseText},t.prototype.abort=function(){this.xhr_.abort()},t.prototype.getResponseHeader=function(e){return this.xhr_.getResponseHeader(e)},t.prototype.addUploadProgressListener=function(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)},t.prototype.removeUploadProgressListener=function(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)},t}();function Sm(){return new Cm}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Im=function(){function t(){}return t.prototype.createConnection=function(){return Sm()},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Te=function(){function t(e,r){this.bucket=e,this.path_=r}return Object.defineProperty(t.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isRoot",{get:function(){return this.path.length===0},enumerable:!1,configurable:!0}),t.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},t.prototype.bucketOnlyServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"},t.makeFromBucketSpec=function(e,r){var n;try{n=t.makeFromUrl(e,r)}catch{return new t(e,"")}if(n.path==="")return n;throw pm(e)},t.makeFromUrl=function(e,r){var n=null,i="([A-Za-z0-9.\\-_]+)";function o(Ie){Ie.path.charAt(Ie.path.length-1)==="/"&&(Ie.path_=Ie.path_.slice(0,-1))}var a="(/(.*))?$",s=new RegExp("^gs://"+i+a,"i"),u={bucket:1,path:3};function l(Ie){Ie.path_=decodeURIComponent(Ie.path)}for(var c="v[A-Za-z0-9_]+",f=r.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",d=new RegExp("^https?://"+f+"/"+c+"/b/"+i+"/o"+h,"i"),p={bucket:1,path:3},m=r===dl?"(?:storage.googleapis.com|storage.cloud.google.com)":r,y="([^?#]*)",E=new RegExp("^https?://"+m+"/"+i+"/"+y,"i"),C={bucket:1,path:2},M=[{regex:s,indices:u,postModify:o},{regex:d,indices:p,postModify:l},{regex:E,indices:C,postModify:l}],J=0;J<M.length;J++){var W=M[J],Se=W.regex.exec(e);if(Se){var pt=Se[W.indices.bucket],tt=Se[W.indices.path];tt||(tt=""),n=new t(pt,tt),W.postModify(n);break}}if(n==null)throw dm(e);return n},t}(),Rm=function(){function t(e){this.promise_=Promise.reject(e)}return t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(e){},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Am(t,e,r){var n=1,i=null,o=!1,a=0;function s(){return a===2}var u=!1;function l(){for(var p=[],m=0;m<arguments.length;m++)p[m]=arguments[m];u||(u=!0,e.apply(null,p))}function c(p){i=setTimeout(function(){i=null,t(f,s())},p)}function f(p){for(var m=[],y=1;y<arguments.length;y++)m[y-1]=arguments[y];if(!u){if(p){l.call.apply(l,j([null,p],m));return}var E=s()||o;if(E){l.call.apply(l,j([null,p],m));return}n<64&&(n*=2);var C;a===1?(a=2,C=0):C=(n+Math.random())*1e3,c(C)}}var h=!1;function d(p){h||(h=!0,!u&&(i!==null?(p||(a=2),clearTimeout(i),c(0)):p||(a=1)))}return c(0),setTimeout(function(){o=!0,d(!0)},r),d}function km(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nm(t){return t!==void 0}function Om(t){return typeof t=="function"}function Pm(t){return typeof t=="object"&&!Array.isArray(t)}function Pn(t){return typeof t=="string"||t instanceof String}function wl(t){return Do()&&t instanceof Blob}function Do(){return typeof Blob!="undefined"}function xo(t,e,r,n){if(n<e)throw rr("Invalid value for '"+t+"'. Expected "+e+" or greater.");if(n>r)throw rr("Invalid value for '"+t+"'. Expected "+r+" or less.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t,e){var r=e.match(/^(\w+):\/\/.+/),n=r==null?void 0:r[1],i=e;return n==null&&(i="https://"+e),i+"/v0"+t}function Cl(t){var e=encodeURIComponent,r="?";for(var n in t)if(t.hasOwnProperty(n)){var i=e(n)+"="+e(t[n]);r=r+i+"&"}return r=r.slice(0,-1),r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Mm=function(){function t(e,r,n,i,o,a,s,u,l,c,f){var h=this;this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=r,this.headers_=n,this.body_=i,this.successCodes_=o.slice(),this.additionalRetryCodes_=a.slice(),this.callback_=s,this.errorCallback_=u,this.progressCallback_=c,this.timeout_=l,this.pool_=f,this.promise_=new Promise(function(d,p){h.resolve_=d,h.reject_=p,h.start_()})}return t.prototype.start_=function(){var e=this;function r(i,o){if(o){i(!1,new Mn(!1,null,!0));return}var a=e.pool_.createConnection();e.pendingConnection_=a;function s(u){var l=u.loaded,c=u.lengthComputable?u.total:-1;e.progressCallback_!==null&&e.progressCallback_(l,c)}e.progressCallback_!==null&&a.addUploadProgressListener(s),a.send(e.url_,e.method_,e.body_,e.headers_).then(function(){e.progressCallback_!==null&&a.removeUploadProgressListener(s),e.pendingConnection_=null;var u=a.getErrorCode()===Dt.NO_ERROR,l=a.getStatus();if(!u||e.isRetryStatusCode_(l)){var c=a.getErrorCode()===Dt.ABORT;i(!1,new Mn(!1,null,c));return}var f=e.successCodes_.indexOf(l)!==-1;i(!0,new Mn(f,a))})}function n(i,o){var a=e.resolve_,s=e.reject_,u=o.connection;if(o.wasSuccessCode)try{var l=e.callback_(u,u.getResponseText());Nm(l)?a(l):a()}catch(f){s(f)}else if(u!==null){var c=Oo();c.serverResponse=u.getResponseText(),e.errorCallback_?s(e.errorCallback_(u,c)):s(c)}else if(o.canceled){var c=e.appDelete_?_l():vl();s(c)}else{var c=hm();s(c)}}this.canceled_?n(!1,new Mn(!1,null,!0)):this.backoffId_=Am(r,n,this.timeout_)},t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&km(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()},t.prototype.isRetryStatusCode_=function(e){var r=e>=500&&e<600,n=[408,429],i=n.indexOf(e)!==-1,o=this.additionalRetryCodes_.indexOf(e)!==-1;return r||i||o},t}(),Mn=function(){function t(e,r,n){this.wasSuccessCode=e,this.connection=r,this.canceled=!!n}return t}();function Dm(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function xm(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e!=null?e:"AppManager")}function Lm(t,e){e&&(t["X-Firebase-GMPID"]=e)}function Fm(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function Um(t,e,r,n,i,o){var a=Cl(t.urlParams),s=t.url+a,u=Object.assign({},t.headers);return Lm(u,e),Dm(u,r),xm(u,o),Fm(u,n),new Mm(s,t.method,u,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(){return typeof BlobBuilder!="undefined"?BlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:void 0}function Hm(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=Bm();if(r!==void 0){for(var n=new r,i=0;i<t.length;i++)n.append(t[i]);return n.getBlob()}else{if(Do())return new Blob(t);throw new $("unsupported-environment","This browser doesn't seem to support creating Blobs")}}function Wm(t,e,r){return t.webkitSlice?t.webkitSlice(e,r):t.mozSlice?t.mozSlice(e,r):t.slice?t.slice(e,r):null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lo=function(){function t(e,r){var n=0,i="";wl(e)?(this.data_=e,n=e.size,i=e.type):e instanceof ArrayBuffer?(r?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(r?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=i}return t.prototype.size=function(){return this.size_},t.prototype.type=function(){return this.type_},t.prototype.slice=function(e,r){if(wl(this.data_)){var n=this.data_,i=Wm(n,e,r);return i===null?null:new t(i)}else{var o=new Uint8Array(this.data_.buffer,e,r-e);return new t(o,!0)}},t.getBlob=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(Do()){var n=e.map(function(u){return u instanceof t?u.data_:u});return new t(Hm.apply(null,n))}else{var i=e.map(function(u){return Pn(u)?yl(be.RAW,u).data:u.data_}),o=0;i.forEach(function(u){o+=u.byteLength});var a=new Uint8Array(o),s=0;return i.forEach(function(u){for(var l=0;l<u.length;l++)a[s++]=u[l]}),new t(a,!0)}},t.prototype.uploadData=function(){return this.data_},t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(t){var e;try{e=JSON.parse(t)}catch{return null}return Pm(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vm(t){if(t.length===0)return null;var e=t.lastIndexOf("/");if(e===-1)return"";var r=t.slice(0,e);return r}function jm(t,e){var r=e.split("/").filter(function(n){return n.length>0}).join("/");return t.length===0?r:t+"/"+r}function Sl(t){var e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(t,e){return e}var ue=function(){function t(e,r,n,i){this.server=e,this.local=r||e,this.writable=!!n,this.xform=i||$m}return t}(),Dn=null;function Gm(t){return!Pn(t)||t.length<2?t:Sl(t)}function xn(){if(Dn)return Dn;var t=[];t.push(new ue("bucket")),t.push(new ue("generation")),t.push(new ue("metageneration")),t.push(new ue("name","fullPath",!0));function e(o,a){return Gm(a)}var r=new ue("name");r.xform=e,t.push(r);function n(o,a){return a!==void 0?Number(a):a}var i=new ue("size");return i.xform=n,t.push(i),t.push(new ue("timeCreated")),t.push(new ue("updated")),t.push(new ue("md5Hash",null,!0)),t.push(new ue("cacheControl",null,!0)),t.push(new ue("contentDisposition",null,!0)),t.push(new ue("contentEncoding",null,!0)),t.push(new ue("contentLanguage",null,!0)),t.push(new ue("contentType",null,!0)),t.push(new ue("metadata","customMetadata",!0)),Dn=t,Dn}function qm(t,e){function r(){var n=t.bucket,i=t.fullPath,o=new Te(n,i);return e._makeStorageReference(o)}Object.defineProperty(t,"ref",{get:r})}function zm(t,e,r){var n={};n.type="file";for(var i=r.length,o=0;o<i;o++){var a=r[o];n[a.local]=a.xform(n,e[a.server])}return qm(n,t),n}function Il(t,e,r){var n=Fo(e);if(n===null)return null;var i=n;return zm(t,i,r)}function Km(t,e,r){var n=Fo(e);if(n===null||!Pn(n.downloadTokens))return null;var i=n.downloadTokens;if(i.length===0)return null;var o=encodeURIComponent,a=i.split(","),s=a.map(function(u){var l=t.bucket,c=t.fullPath,f="/b/"+o(l)+"/o/"+o(c),h=ht(f,r),d=Cl({alt:"media",token:u});return h+d});return s[0]}function Uo(t,e){for(var r={},n=e.length,i=0;i<n;i++){var o=e[i];o.writable&&(r[o.server]=t[o.local])}return JSON.stringify(r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rl="prefixes",Al="items";function Qm(t,e,r){var n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r[Rl])for(var i=0,o=r[Rl];i<o.length;i++){var a=o[i],s=a.replace(/\/$/,""),u=t._makeStorageReference(new Te(e,s));n.prefixes.push(u)}if(r[Al])for(var l=0,c=r[Al];l<c.length;l++){var f=c[l],u=t._makeStorageReference(new Te(e,f.name));n.items.push(u)}return n}function Ym(t,e,r){var n=Fo(r);if(n===null)return null;var i=n;return Qm(t,e,i)}var Je=function(){function t(e,r,n,i){this.url=e,this.method=r,this.handler=n,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}return t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(t){if(!t)throw Oo()}function Ln(t,e){function r(n,i){var o=Il(t,i,e);return Ge(o!==null),o}return r}function Xm(t,e){function r(n,i){var o=Ym(t,e,i);return Ge(o!==null),o}return r}function Jm(t,e){function r(n,i){var o=Il(t,i,e);return Ge(o!==null),Km(o,i,t.host)}return r}function nr(t){function e(r,n){var i;return r.getStatus()===401?r.getResponseText().includes("Firebase App Check token is invalid")?i=cm():i=lm():r.getStatus()===402?i=um(t.bucket):r.getStatus()===403?i=fm(t.path):i=n,i.serverResponse=n.serverResponse,i}return e}function Fn(t){var e=nr(t);function r(n,i){var o=e(n,i);return n.getStatus()===404&&(o=sm(t.path)),o.serverResponse=i.serverResponse,o}return r}function kl(t,e,r){var n=e.fullServerUrl(),i=ht(n,t.host),o="GET",a=t.maxOperationRetryTime,s=new Je(i,o,Ln(t,r),a);return s.errorHandler=Fn(e),s}function Zm(t,e,r,n,i){var o={};e.isRoot?o.prefix="":o.prefix=e.path+"/",r&&r.length>0&&(o.delimiter=r),n&&(o.pageToken=n),i&&(o.maxResults=i);var a=e.bucketOnlyServerUrl(),s=ht(a,t.host),u="GET",l=t.maxOperationRetryTime,c=new Je(s,u,Xm(t,e.bucket),l);return c.urlParams=o,c.errorHandler=nr(e),c}function ey(t,e,r){var n=e.fullServerUrl(),i=ht(n,t.host),o="GET",a=t.maxOperationRetryTime,s=new Je(i,o,Jm(t,r),a);return s.errorHandler=Fn(e),s}function ty(t,e,r,n){var i=e.fullServerUrl(),o=ht(i,t.host),a="PATCH",s=Uo(r,n),u={"Content-Type":"application/json; charset=utf-8"},l=t.maxOperationRetryTime,c=new Je(o,a,Ln(t,n),l);return c.headers=u,c.body=s,c.errorHandler=Fn(e),c}function ry(t,e){var r=e.fullServerUrl(),n=ht(r,t.host),i="DELETE",o=t.maxOperationRetryTime;function a(u,l){}var s=new Je(n,i,a,o);return s.successCodes=[200,204],s.errorHandler=Fn(e),s}function ny(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function Nl(t,e,r){var n=Object.assign({},r);return n.fullPath=t.path,n.size=e.size(),n.contentType||(n.contentType=ny(null,e)),n}function iy(t,e,r,n,i){var o=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function s(){for(var M="",J=0;J<2;J++)M=M+Math.random().toString().slice(2);return M}var u=s();a["Content-Type"]="multipart/related; boundary="+u;var l=Nl(e,n,i),c=Uo(l,r),f="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+c+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,h=`\r
--`+u+"--",d=Lo.getBlob(f,n,h);if(d===null)throw gl();var p={name:l.fullPath},m=ht(o,t.host),y="POST",E=t.maxUploadRetryTime,C=new Je(m,y,Ln(t,r),E);return C.urlParams=p,C.headers=a,C.body=d.uploadData(),C.errorHandler=nr(e),C}var Un=function(){function t(e,r,n,i){this.current=e,this.total=r,this.finalized=!!n,this.metadata=i||null}return t}();function Bo(t,e){var r=null;try{r=t.getResponseHeader("X-Goog-Upload-Status")}catch{Ge(!1)}var n=e||["active"];return Ge(!!r&&n.indexOf(r)!==-1),r}function oy(t,e,r,n,i){var o=e.bucketOnlyServerUrl(),a=Nl(e,n,i),s={name:a.fullPath},u=ht(o,t.host),l="POST",c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":""+n.size(),"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},f=Uo(a,r),h=t.maxUploadRetryTime;function d(m){Bo(m);var y;try{y=m.getResponseHeader("X-Goog-Upload-URL")}catch{Ge(!1)}return Ge(Pn(y)),y}var p=new Je(u,l,d,h);return p.urlParams=s,p.headers=c,p.body=f,p.errorHandler=nr(e),p}function ay(t,e,r,n){var i={"X-Goog-Upload-Command":"query"};function o(l){var c=Bo(l,["active","final"]),f=null;try{f=l.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Ge(!1)}f||Ge(!1);var h=Number(f);return Ge(!isNaN(h)),new Un(h,n.size(),c==="final")}var a="POST",s=t.maxUploadRetryTime,u=new Je(r,a,o,s);return u.headers=i,u.errorHandler=nr(e),u}var Ol=256*1024;function sy(t,e,r,n,i,o,a,s){var u=new Un(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw gm();var l=u.total-u.current,c=l;i>0&&(c=Math.min(c,i));var f=u.current,h=f+c,d=c===l?"upload, finalize":"upload",p={"X-Goog-Upload-Command":d,"X-Goog-Upload-Offset":""+u.current},m=n.slice(f,h);if(m===null)throw gl();function y(J,W){var Se=Bo(J,["active","final"]),pt=u.current+c,tt=n.size(),Ie;return Se==="final"?Ie=Ln(e,o)(J,W):Ie=null,new Un(pt,tt,Se==="final",Ie)}var E="POST",C=e.maxUploadRetryTime,M=new Je(r,E,y,C);return M.headers=p,M.body=m.uploadData(),M.progressCallback=s||null,M.errorHandler=nr(t),M}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var uy=function(){function t(e,r,n){var i=Om(e)||r!=null||n!=null;if(i)this.next=e,this.error=r,this.complete=n;else{var o=e;this.next=o.next,this.error=o.error,this.complete=o.complete}}return t}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ir(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];Promise.resolve().then(function(){return t.apply(void 0,e)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pl=function(){function t(e,r,n){var i=this;n===void 0&&(n=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=r,this._metadata=n,this._mappings=xn(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=function(o){i._request=void 0,i._chunkMultiplier=1,o._codeEquals("canceled")?(i._needToFetchStatus=!0,i.completeTransitions_()):(i._error=o,i._transition("error"))},this._metadataErrorHandler=function(o){i._request=void 0,o._codeEquals("canceled")?i.completeTransitions_():(i._error=o,i._transition("error"))},this._promise=new Promise(function(o,a){i._resolve=o,i._reject=a,i._start()}),this._promise.then(null,function(){})}return t.prototype._makeProgressCallback=function(){var e=this,r=this._transferred;return function(n){return e._updateProgress(r+n)}},t.prototype._shouldDoResumable=function(e){return e.size()>256*1024},t.prototype._start=function(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},t.prototype._resolveToken=function(e){var r=this;Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(function(n){var i=n[0],o=n[1];switch(r._state){case"running":e(i,o);break;case"canceling":r._transition("canceled");break;case"pausing":r._transition("paused");break}})},t.prototype._createResumable=function(){var e=this;this._resolveToken(function(r,n){var i=oy(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),o=e._ref.storage._makeRequest(i,r,n);e._request=o,o.getPromise().then(function(a){e._request=void 0,e._uploadUrl=a,e._needToFetchStatus=!1,e.completeTransitions_()},e._errorHandler)})},t.prototype._fetchStatus=function(){var e=this,r=this._uploadUrl;this._resolveToken(function(n,i){var o=ay(e._ref.storage,e._ref._location,r,e._blob),a=e._ref.storage._makeRequest(o,n,i);e._request=a,a.getPromise().then(function(s){s=s,e._request=void 0,e._updateProgress(s.current),e._needToFetchStatus=!1,s.finalized&&(e._needToFetchMetadata=!0),e.completeTransitions_()},e._errorHandler)})},t.prototype._continueUpload=function(){var e=this,r=Ol*this._chunkMultiplier,n=new Un(this._transferred,this._blob.size()),i=this._uploadUrl;this._resolveToken(function(o,a){var s;try{s=sy(e._ref._location,e._ref.storage,i,e._blob,r,e._mappings,n,e._makeProgressCallback())}catch(l){e._error=l,e._transition("error");return}var u=e._ref.storage._makeRequest(s,o,a);e._request=u,u.getPromise().then(function(l){e._increaseMultiplier(),e._request=void 0,e._updateProgress(l.current),l.finalized?(e._metadata=l.metadata,e._transition("success")):e.completeTransitions_()},e._errorHandler)})},t.prototype._increaseMultiplier=function(){var e=Ol*this._chunkMultiplier;e<32*1024*1024&&(this._chunkMultiplier*=2)},t.prototype._fetchMetadata=function(){var e=this;this._resolveToken(function(r,n){var i=kl(e._ref.storage,e._ref._location,e._mappings),o=e._ref.storage._makeRequest(i,r,n);e._request=o,o.getPromise().then(function(a){e._request=void 0,e._metadata=a,e._transition("success")},e._metadataErrorHandler)})},t.prototype._oneShotUpload=function(){var e=this;this._resolveToken(function(r,n){var i=iy(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),o=e._ref.storage._makeRequest(i,r,n);e._request=o,o.getPromise().then(function(a){e._request=void 0,e._metadata=a,e._updateProgress(e._blob.size()),e._transition("success")},e._errorHandler)})},t.prototype._updateProgress=function(e){var r=this._transferred;this._transferred=e,this._transferred!==r&&this._notifyObservers()},t.prototype._transition=function(e){if(this._state!==e)switch(e){case"canceling":this._state=e,this._request!==void 0&&this._request.cancel();break;case"pausing":this._state=e,this._request!==void 0&&this._request.cancel();break;case"running":var r=this._state==="paused";this._state=e,r&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=vl(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}},t.prototype.completeTransitions_=function(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}},Object.defineProperty(t.prototype,"snapshot",{get:function(){var e=Mo(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}},enumerable:!1,configurable:!0}),t.prototype.on=function(e,r,n,i){var o=this,a=new uy(r,n,i);return this._addObserver(a),function(){o._removeObserver(a)}},t.prototype.then=function(e,r){return this._promise.then(e,r)},t.prototype.catch=function(e){return this.then(null,e)},t.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},t.prototype._removeObserver=function(e){var r=this._observers.indexOf(e);r!==-1&&this._observers.splice(r,1)},t.prototype._notifyObservers=function(){var e=this;this._finishPromise();var r=this._observers.slice();r.forEach(function(n){e._notifyObserver(n)})},t.prototype._finishPromise=function(){if(this._resolve!==void 0){var e=!0;switch(Mo(this._state)){case se.SUCCESS:ir(this._resolve.bind(null,this.snapshot))();break;case se.CANCELED:case se.ERROR:var r=this._reject;ir(r.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}},t.prototype._notifyObserver=function(e){var r=Mo(this._state);switch(r){case se.RUNNING:case se.PAUSED:e.next&&ir(e.next.bind(e,this.snapshot))();break;case se.SUCCESS:e.complete&&ir(e.complete.bind(e))();break;case se.CANCELED:case se.ERROR:e.error&&ir(e.error.bind(e,this._error))();break;default:e.error&&ir(e.error.bind(e,this._error))()}},t.prototype.resume=function(){var e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e},t.prototype.pause=function(){var e=this._state==="running";return e&&this._transition("pausing"),e},t.prototype.cancel=function(){var e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bn=function(){function t(e,r){this._service=e,r instanceof Te?this._location=r:this._location=Te.makeFromUrl(r,e.host)}return t.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},t.prototype._newRef=function(e,r){return new t(e,r)},Object.defineProperty(t.prototype,"root",{get:function(){var e=new Te(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return Sl(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parent",{get:function(){var e=Vm(this._location.path);if(e===null)return null;var r=new Te(this._location.bucket,e);return new t(this._service,r)},enumerable:!1,configurable:!0}),t.prototype._throwIfRoot=function(e){if(this._location.path==="")throw ml(e)},t}();function ly(t,e,r){return t._throwIfRoot("uploadBytesResumable"),new Pl(t,new Lo(e),r)}function cy(t){var e={prefixes:[],items:[]};return Ml(t,e).then(function(){return e})}function Ml(t,e,r){return v(this,void 0,void 0,function(){var n,i,o,a;return g(this,function(s){switch(s.label){case 0:return n={pageToken:r},[4,Dl(t,n)];case 1:return i=s.sent(),(o=e.prefixes).push.apply(o,i.prefixes),(a=e.items).push.apply(a,i.items),i.nextPageToken==null?[3,3]:[4,Ml(t,e,i.nextPageToken)];case 2:s.sent(),s.label=3;case 3:return[2]}})})}function Dl(t,e){return v(this,void 0,void 0,function(){var r,n;return g(this,function(i){switch(i.label){case 0:return e!=null&&typeof e.maxResults=="number"&&xo("options.maxResults",1,1e3,e.maxResults),r=e||{},n=Zm(t.storage,t._location,"/",r.pageToken,r.maxResults),[4,t.storage.makeRequestWithTokens(n)];case 1:return[2,i.sent().getPromise()]}})})}function fy(t){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return t._throwIfRoot("getMetadata"),e=kl(t.storage,t._location,xn()),[4,t.storage.makeRequestWithTokens(e)];case 1:return[2,r.sent().getPromise()]}})})}function hy(t,e){return v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:return t._throwIfRoot("updateMetadata"),r=ty(t.storage,t._location,e,xn()),[4,t.storage.makeRequestWithTokens(r)];case 1:return[2,n.sent().getPromise()]}})})}function dy(t){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return t._throwIfRoot("getDownloadURL"),e=ey(t.storage,t._location,xn()),[4,t.storage.makeRequestWithTokens(e)];case 1:return[2,r.sent().getPromise().then(function(n){if(n===null)throw _m();return n})]}})})}function py(t){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:return t._throwIfRoot("deleteObject"),e=ry(t.storage,t._location),[4,t.storage.makeRequestWithTokens(e)];case 1:return[2,r.sent().getPromise()]}})})}function xl(t,e){var r=jm(t._location.path,e),n=new Te(t._location.bucket,r);return new Bn(t.storage,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(t){return/^[A-Za-z]+:\/\//.test(t)}function vy(t,e){return new Bn(t,e)}function Ll(t,e){if(t instanceof Hn){var r=t;if(r._bucket==null)throw vm();var n=new Bn(r,r._bucket);return e!=null?Ll(n,e):n}else return e!==void 0?xl(t,e):t}function gy(t,e){if(e&&Ho(e)){if(t instanceof Hn)return vy(t,e);throw rr("To use ref(service, url), the first argument must be a Storage instance.")}else return Ll(t,e)}function Fl(t,e){var r=e==null?void 0:e[pl];return r==null?null:Te.makeFromBucketSpec(r,t)}function _y(t,e,r,n){n===void 0&&(n={}),t.host="http://"+e+":"+r;var i=n.mockUserToken;i&&(t._overrideAuthToken=typeof i=="string"?i:Z_(i,t.app.options.projectId))}var Hn=function(){function t(e,r,n,i,o,a){this.app=e,this._authProvider=r,this._appCheckProvider=n,this._pool=i,this._url=o,this._firebaseVersion=a,this._bucket=null,this._host=dl,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=om,this._maxUploadRetryTime=am,this._requests=new Set,o!=null?this._bucket=Te.makeFromBucketSpec(o,this._host):this._bucket=Fl(this._host,this.app.options)}return Object.defineProperty(t.prototype,"host",{get:function(){return this._host},set:function(e){this._host=e,this._url!=null?this._bucket=Te.makeFromBucketSpec(this._url,e):this._bucket=Fl(e,this.app.options)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(e){xo("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(e){xo("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e},enumerable:!1,configurable:!0}),t.prototype._getAuthToken=function(){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return this._overrideAuthToken?[2,this._overrideAuthToken]:(e=this._authProvider.getImmediate({optional:!0}),e?[4,e.getToken()]:[3,2]);case 1:if(r=n.sent(),r!==null)return[2,r.accessToken];n.label=2;case 2:return[2,null]}})})},t.prototype._getAppCheckToken=function(){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return e=this._appCheckProvider.getImmediate({optional:!0}),e?[4,e.getToken()]:[3,2];case 1:return r=n.sent(),[2,r.token];case 2:return[2,null]}})})},t.prototype._delete=function(){return this._deleted||(this._deleted=!0,this._requests.forEach(function(e){return e.cancel()}),this._requests.clear()),Promise.resolve()},t.prototype._makeStorageReference=function(e){return new Bn(this,e)},t.prototype._makeRequest=function(e,r,n){var i=this;if(this._deleted)return new Rm(_l());var o=Um(e,this._appId,r,n,this._pool,this._firebaseVersion);return this._requests.add(o),o.getPromise().then(function(){return i._requests.delete(o)},function(){return i._requests.delete(o)}),o},t.prototype.makeRequestWithTokens=function(e){return v(this,void 0,void 0,function(){var r,n,i;return g(this,function(o){switch(o.label){case 0:return[4,Promise.all([this._getAuthToken(),this._getAppCheckToken()])];case 1:return r=o.sent(),n=r[0],i=r[1],[2,this._makeRequest(e,n,i)]}})})},t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function my(t,e,r){return t=ft(t),ly(t,e,r)}function yy(t){return t=ft(t),fy(t)}function Ey(t,e){return t=ft(t),hy(t,e)}function by(t,e){return t=ft(t),Dl(t,e)}function Ty(t){return t=ft(t),cy(t)}function wy(t){return t=ft(t),dy(t)}function Cy(t){return t=ft(t),py(t)}function Ul(t,e){return t=ft(t),gy(t,e)}function Sy(t,e){return xl(t,e)}function Iy(t,e,r,n){n===void 0&&(n={}),_y(t,e,r,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wn=function(){function t(e,r,n){this._delegate=e,this.task=r,this.ref=n}return Object.defineProperty(t.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bl=function(){function t(e,r){this._delegate=e,this._ref=r,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}return Object.defineProperty(t.prototype,"snapshot",{get:function(){return new Wn(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),t.prototype.then=function(e,r){var n=this;return this._delegate.then(function(i){if(e)return e(new Wn(i,n,n._ref))},r)},t.prototype.on=function(e,r,n,i){var o=this,a=void 0;return r&&(typeof r=="function"?a=function(s){return r(new Wn(s,o,o._ref))}:a={next:r.next?function(s){return r.next(new Wn(s,o,o._ref))}:void 0,complete:r.complete||void 0,error:r.error||void 0}),this._delegate.on(e,a,n||void 0,i||void 0)},t}(),Hl=function(){function t(e,r){this._delegate=e,this._service=r}return Object.defineProperty(t.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map(function(r){return new Lr(r,e._service)})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){var e=this;return this._delegate.items.map(function(r){return new Lr(r,e._service)})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lr=function(){function t(e,r){this._delegate=e,this.storage=r}return Object.defineProperty(t.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),t.prototype.toString=function(){return this._delegate.toString()},t.prototype.child=function(e){var r=Sy(this._delegate,e);return new t(r,this.storage)},Object.defineProperty(t.prototype,"root",{get:function(){return new t(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parent",{get:function(){var e=this._delegate.parent;return e==null?null:new t(e,this.storage)},enumerable:!1,configurable:!0}),t.prototype.put=function(e,r){return this._throwIfRoot("put"),new Bl(my(this._delegate,e,r),this)},t.prototype.putString=function(e,r,n){r===void 0&&(r=be.RAW),this._throwIfRoot("putString");var i=yl(r,e),o=T({},n);return o.contentType==null&&i.contentType!=null&&(o.contentType=i.contentType),new Bl(new Pl(this._delegate,new Lo(i.data,!0),o),this)},t.prototype.listAll=function(){var e=this;return Ty(this._delegate).then(function(r){return new Hl(r,e.storage)})},t.prototype.list=function(e){var r=this;return by(this._delegate,e||void 0).then(function(n){return new Hl(n,r.storage)})},t.prototype.getMetadata=function(){return yy(this._delegate)},t.prototype.updateMetadata=function(e){return Ey(this._delegate,e)},t.prototype.getDownloadURL=function(){return wy(this._delegate)},t.prototype.delete=function(){return this._throwIfRoot("delete"),Cy(this._delegate)},t.prototype._throwIfRoot=function(e){if(this._delegate._location.path==="")throw ml(e)},t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ry=function(){function t(e,r){this.app=e,this._delegate=r}return Object.defineProperty(t.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),t.prototype.ref=function(e){if(Ho(e))throw rr("ref() expected a child path but got a URL, use refFromURL instead.");return new Lr(Ul(this._delegate,e),this)},t.prototype.refFromURL=function(e){if(!Ho(e))throw rr("refFromURL() expected a full URL but got a child path, use ref() instead.");try{Te.makeFromUrl(e,this._delegate.host)}catch{throw rr("refFromUrl() expected a valid full URL but got an invalid one.")}return new Lr(Ul(this._delegate,e),this)},t.prototype.setMaxUploadRetryTime=function(e){this._delegate.maxUploadRetryTime=e},t.prototype.setMaxOperationRetryTime=function(e){this._delegate.maxOperationRetryTime=e},t.prototype.useEmulator=function(e,r,n){n===void 0&&(n={}),Iy(this._delegate,e,r,n)},t}(),Ay="@firebase/storage",ky="0.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ny="storage";function Oy(t,e){var r=e.instanceIdentifier,n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal"),a=new Ry(n,new Hn(n,i,o,new Im,r,fe.SDK_VERSION));return a}function Py(t){var e={TaskState:se,TaskEvent:wm,StringFormat:be,Storage:Hn,Reference:Lr};t.INTERNAL.registerComponent(new im(Ny,Oy,"PUBLIC").setServiceProps(e).setMultipleInstances(!0)),t.registerVersion(Ay,ky)}Py(fe);function My(){return"indexedDB"in self&&indexedDB!=null}function Dy(){return new Promise(function(t,e){try{var r=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=function(){i.result.close(),r||self.indexedDB.deleteDatabase(n),t(!0)},i.onupgradeneeded=function(){r=!1},i.onerror=function(){var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(o){e(o)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xy="FirebaseError",Ly=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=xy,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,Wl.prototype.create),o}return e}(Error),Wl=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?Fy(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new Ly(o,u,i);return l},t}();function Fy(t,e){return t.replace(Uy,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var Uy=/\{\$([^}]+)}/g;/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function Me(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),i=0,e=0;e<r;e++)for(var o=arguments[e],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xt,F;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(F||(F={}));var By={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},Hy=F.INFO,Wy=(xt={},xt[F.DEBUG]="log",xt[F.VERBOSE]="log",xt[F.INFO]="info",xt[F.WARN]="warn",xt[F.ERROR]="error",xt),Vy=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=new Date().toISOString(),o=Wy[e];if(o)console[o].apply(console,Me(["["+i+"]  "+t.name+":"],r));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},jy=function(){function t(e){this.name=e,this._logLevel=Hy,this._logHandler=Vy,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in F))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?By[e]:e},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Me([this,F.DEBUG],e)),this._logHandler.apply(this,Me([this,F.DEBUG],e))},t.prototype.log=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Me([this,F.VERBOSE],e)),this._logHandler.apply(this,Me([this,F.VERBOSE],e))},t.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Me([this,F.INFO],e)),this._logHandler.apply(this,Me([this,F.INFO],e))},t.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Me([this,F.WARN],e)),this._logHandler.apply(this,Me([this,F.WARN],e))},t.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Me([this,F.ERROR],e)),this._logHandler.apply(this,Me([this,F.ERROR],e))},t}(),$y=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}(),Gy="@firebase/performance",Vl="0.4.18";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jl=Vl,qy="FB-PERF-TRACE-START",zy="FB-PERF-TRACE-STOP",Wo="FB-PERF-TRACE-MEASURE",$l="_wt_",Gl="_fp",ql="_fcp",zl="_fid",Kl="@firebase/performance/config",Ql="@firebase/performance/configexpire",Ky="performance",Yl="Performance";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te,Qy=(te={},te["trace started"]="Trace {$traceName} was started before.",te["trace stopped"]="Trace {$traceName} is not running.",te["nonpositive trace startTime"]="Trace {$traceName} startTime should be positive.",te["nonpositive trace duration"]="Trace {$traceName} duration should be positive.",te["no window"]="Window is not available.",te["no app id"]="App id is not available.",te["no project id"]="Project id is not available.",te["no api key"]="Api key is not available.",te["invalid cc log"]="Attempted to queue invalid cc event",te["FB not default"]="Performance can only start when Firebase app instance is the default one.",te["RC response not ok"]="RC response is not ok",te["invalid attribute name"]="Attribute name {$attributeName} is invalid.",te["invalid attribute value"]="Attribute value {$attributeValue} is invalid.",te["invalid custom metric name"]="Custom metric name {$customMetricName} is invalid",te["invalid String merger input"]="Input for String merger is invalid, contact support team to resolve.",te),ne=new Wl(Ky,Yl,Qy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze=new jy(Yl);Ze.logLevel=F.INFO;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vo,Xl,ie=function(){function t(e){if(this.window=e,!e)throw ne.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(e){!this.performance||!this.performance.mark||this.performance.mark(e)},t.prototype.measure=function(e,r,n){!this.performance||!this.performance.measure||this.performance.measure(e,r,n)},t.prototype.getEntriesByType=function(e){return!this.performance||!this.performance.getEntriesByType?[]:this.performance.getEntriesByType(e)},t.prototype.getEntriesByName=function(e){return!this.performance||!this.performance.getEntriesByName?[]:this.performance.getEntriesByName(e)},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.requiredApisAvailable=function(){return!fetch||!Promise||!this.navigator||!this.navigator.cookieEnabled?(Ze.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1):My()?!0:(Ze.info("IndexedDB is not supported by current browswer"),!1)},t.prototype.setupObserver=function(e,r){if(!!this.PerformanceObserver){var n=new this.PerformanceObserver(function(i){for(var o=0,a=i.getEntries();o<a.length;o++){var s=a[o];r(s)}});n.observe({entryTypes:[e]})}},t.getInstance=function(){return Vo===void 0&&(Vo=new t(Xl)),Vo},t}();function Yy(t){Xl=t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jl(t,e){var r=t.length-e.length;if(r<0||r>1)throw ne.create("invalid String merger input");for(var n=[],i=0;i<t.length;i++)n.push(t.charAt(i)),e.length>i&&n.push(e.charAt(i));return n.join("")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jo,K=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Jl("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Jl("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getAppId=function(){var e=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!e)throw ne.create("no app id");return e},t.prototype.getProjectId=function(){var e=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!e)throw ne.create("no project id");return e},t.prototype.getApiKey=function(){var e=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!e)throw ne.create("no api key");return e},t.prototype.getFlTransportFullUrl=function(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)},t.getInstance=function(){return jo===void 0&&(jo=new t),jo},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zl;function Xy(){var t=K.getInstance().installationsService.getId();return t.then(function(e){Zl=e}),t}function $o(){return Zl}function Jy(){var t=K.getInstance().installationsService.getToken();return t.then(function(e){}),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var or;(function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"})(or||(or={}));var Zy=["firebase_","google_","ga_"],eE=new RegExp("^[a-zA-Z]\\w*$"),tE=40,rE=100;function nE(){var t=ie.getInstance().navigator;return"serviceWorker"in t?t.serviceWorker.controller?2:3:1}function ec(){var t=ie.getInstance().document,e=t.visibilityState;switch(e){case"visible":return or.VISIBLE;case"hidden":return or.HIDDEN;default:return or.UNKNOWN}}function iE(){var t=ie.getInstance().navigator,e=t.connection,r=e&&e.effectiveType;switch(r){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}function oE(t){if(t.length===0||t.length>tE)return!1;var e=Zy.some(function(r){return t.startsWith(r)});return!e&&!!t.match(eE)}function aE(t){return t.length!==0&&t.length<=rE}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sE="0.0.1",uE={loggingEnabled:!0},lE="FIREBASE_INSTALLATIONS_AUTH";function cE(t){var e=fE();return e?(tc(e),Promise.resolve()):pE(t).then(tc).then(function(r){return hE(r)},function(){})}function fE(){var t=ie.getInstance().localStorage;if(!!t){var e=t.getItem(Ql);if(!(!e||!vE(e))){var r=t.getItem(Kl);if(!!r)try{var n=JSON.parse(r);return n}catch{return}}}}function hE(t){var e=ie.getInstance().localStorage;!t||!e||(e.setItem(Kl,JSON.stringify(t)),e.setItem(Ql,String(Date.now()+K.getInstance().configTimeToLive*60*60*1e3)))}var dE="Could not fetch config, will use default configs";function pE(t){return Jy().then(function(e){var r=K.getInstance().getProjectId(),n="https://firebaseremoteconfig.googleapis.com/v1/projects/"+r+"/namespaces/fireperf:fetch?key="+K.getInstance().getApiKey(),i=new Request(n,{method:"POST",headers:{Authorization:lE+" "+e},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:K.getInstance().getAppId(),app_version:jl,sdk_version:sE})});return fetch(i).then(function(o){if(o.ok)return o.json();throw ne.create("RC response not ok")})}).catch(function(){Ze.info(dE)})}function tc(t){if(!t)return t;var e=K.getInstance(),r=t.entries||{};return r.fpr_enabled!==void 0?e.loggingEnabled=String(r.fpr_enabled)==="true":e.loggingEnabled=uE.loggingEnabled,r.fpr_log_source&&(e.logSource=Number(r.fpr_log_source)),r.fpr_log_endpoint_url&&(e.logEndPointUrl=r.fpr_log_endpoint_url),r.fpr_log_transport_key&&(e.transportKey=r.fpr_log_transport_key),r.fpr_vc_network_request_sampling_rate!==void 0&&(e.networkRequestsSamplingRate=Number(r.fpr_vc_network_request_sampling_rate)),r.fpr_vc_trace_sampling_rate!==void 0&&(e.tracesSamplingRate=Number(r.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=rc(e.tracesSamplingRate),e.logNetworkAfterSampling=rc(e.networkRequestsSamplingRate),t}function vE(t){return Number(t)>Date.now()}function rc(t){return Math.random()<=t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Go=1,qo;function nc(){return Go=2,qo=qo||_E(),qo}function gE(){return Go===3}function _E(){return mE().then(function(){return Xy()}).then(function(t){return cE(t)}).then(function(){return ic()},function(){return ic()})}function mE(){var t=ie.getInstance().document;return new Promise(function(e){if(t&&t.readyState!=="complete"){var r=function(){t.readyState==="complete"&&(t.removeEventListener("readystatechange",r),e())};t.addEventListener("readystatechange",r)}else e()})}function ic(){Go=3}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zo=10*1e3,yE=5.5*1e3,oc=3,EE=1e3,Vn=oc,dt=[],ac=!1;function bE(){ac||(jn(yE),ac=!0)}function jn(t){setTimeout(function(){if(Vn!==0){if(!dt.length)return jn(zo);TE()}},t)}function TE(){var t=dt.splice(0,EE),e=t.map(function(n){return{source_extension_json_proto3:n.message,event_time_ms:String(n.eventTime)}}),r={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:K.getInstance().logSource,log_event:e};wE(r,t).catch(function(){dt=j(j([],t),dt),Vn--,Ze.info("Tries left: "+Vn+"."),jn(zo)})}function wE(t,e){return CE(t).then(function(r){return r.ok||Ze.info("Call to Firebase backend failed."),r.json()}).then(function(r){var n=Number(r.nextRequestWaitMillis),i=zo;isNaN(n)||(i=Math.max(n,i));var o=r.logResponseDetails;Array.isArray(o)&&o.length>0&&o[0].responseAction==="RETRY_REQUEST_LATER"&&(dt=j(j([],e),dt),Ze.info("Retry transport request later.")),Vn=oc,jn(i)})}function CE(t){var e=K.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}function SE(t){if(!t.eventTime||!t.message)throw ne.create("invalid cc log");dt=j(j([],dt),[t])}function IE(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var n=t.apply(void 0,e);SE({message:n,eventTime:Date.now()})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ko;function sc(t,e){Ko||(Ko=IE(AE)),Ko(t,e)}function $n(t){var e=K.getInstance();!e.instrumentationEnabled&&t.isAuto||!e.dataCollectionEnabled&&!t.isAuto||!ie.getInstance().requiredApisAvailable()||t.isAuto&&ec()!==or.VISIBLE||(gE()?Qo(t):nc().then(function(){return Qo(t)},function(){return Qo(t)}))}function Qo(t){if(!!$o()){var e=K.getInstance();!e.loggingEnabled||!e.logTraceAfterSampling||setTimeout(function(){return sc(t,1)},0)}}function RE(t){var e=K.getInstance();if(!!e.instrumentationEnabled){var r=t.url,n=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];r===n||r===i||!e.loggingEnabled||!e.logNetworkAfterSampling||setTimeout(function(){return sc(t,0)},0)}}function AE(t,e){return e===0?kE(t):NE(t)}function kE(t){var e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},r={application_info:uc(),network_request_metric:e};return JSON.stringify(r)}function NE(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};Object.keys(t.counters).length!==0&&(e.counters=t.counters);var r=t.getAttributes();Object.keys(r).length!==0&&(e.custom_attributes=r);var n={application_info:uc(),trace_metric:e};return JSON.stringify(n)}function uc(){return{google_app_id:K.getInstance().getAppId(),app_instance_id:$o(),web_app_info:{sdk_version:jl,page_url:ie.getInstance().getUrl(),service_worker_status:nE(),visibility_state:ec(),effective_connection_type:iE()},application_process_state:0}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var OE=100,PE="_",ME=[Gl,ql,zl];function DE(t,e){return t.length===0||t.length>OE?!1:e&&e.startsWith($l)&&ME.indexOf(t)>-1||!t.startsWith(PE)}function xE(t){var e=Math.floor(t);return e<t&&Ze.info("Metric value should be an Integer, setting the value as : "+e+"."),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fr=function(){function t(e,r,n){r===void 0&&(r=!1),this.name=e,this.isAuto=r,this.state=1,this.customAttributes={},this.counters={},this.api=ie.getInstance(),this.randomId=Math.floor(Math.random()*1e6),this.isAuto||(this.traceStartMark=qy+"-"+this.randomId+"-"+this.name,this.traceStopMark=zy+"-"+this.randomId+"-"+this.name,this.traceMeasure=n||Wo+"-"+this.randomId+"-"+this.name,n&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(this.state!==1)throw ne.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(this.state!==2)throw ne.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),$n(this)},t.prototype.record=function(e,r,n){if(e<=0)throw ne.create("nonpositive trace startTime",{traceName:this.name});if(r<=0)throw ne.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(r*1e3),this.startTimeUs=Math.floor(e*1e3),n&&n.attributes&&(this.customAttributes=T({},n.attributes)),n&&n.metrics)for(var i=0,o=Object.keys(n.metrics);i<o.length;i++){var a=o[i];isNaN(Number(n.metrics[a]))||(this.counters[a]=Number(Math.floor(n.metrics[a])))}$n(this)},t.prototype.incrementMetric=function(e,r){r===void 0&&(r=1),this.counters[e]===void 0?this.putMetric(e,r):this.putMetric(e,this.counters[e]+r)},t.prototype.putMetric=function(e,r){if(DE(e,this.name))this.counters[e]=xE(r);else throw ne.create("invalid custom metric name",{customMetricName:e})},t.prototype.getMetric=function(e){return this.counters[e]||0},t.prototype.putAttribute=function(e,r){var n=oE(e),i=aE(r);if(n&&i){this.customAttributes[e]=r;return}if(!n)throw ne.create("invalid attribute name",{attributeName:e});if(!i)throw ne.create("invalid attribute value",{attributeValue:r})},t.prototype.getAttribute=function(e){return this.customAttributes[e]},t.prototype.removeAttribute=function(e){this.customAttributes[e]!==void 0&&delete this.customAttributes[e]},t.prototype.getAttributes=function(){return T({},this.customAttributes)},t.prototype.setStartTime=function(e){this.startTimeUs=e},t.prototype.setDuration=function(e){this.durationUs=e},t.prototype.calculateTraceMetrics=function(){var e=this.api.getEntriesByName(this.traceMeasure),r=e&&e[0];r&&(this.durationUs=Math.floor(r.duration*1e3),this.startTimeUs=Math.floor((r.startTime+this.api.getTimeOrigin())*1e3))},t.createOobTrace=function(e,r,n){var i=ie.getInstance().getUrl();if(!!i){var o=new t($l+i,!0),a=Math.floor(ie.getInstance().getTimeOrigin()*1e3);o.setStartTime(a),e&&e[0]&&(o.setDuration(Math.floor(e[0].duration*1e3)),o.putMetric("domInteractive",Math.floor(e[0].domInteractive*1e3)),o.putMetric("domContentLoadedEventEnd",Math.floor(e[0].domContentLoadedEventEnd*1e3)),o.putMetric("loadEventEnd",Math.floor(e[0].loadEventEnd*1e3)));var s="first-paint",u="first-contentful-paint";if(r){var l=r.find(function(f){return f.name===s});l&&l.startTime&&o.putMetric(Gl,Math.floor(l.startTime*1e3));var c=r.find(function(f){return f.name===u});c&&c.startTime&&o.putMetric(ql,Math.floor(c.startTime*1e3)),n&&o.putMetric(zl,Math.floor(n*1e3))}$n(o)}},t.createUserTimingTrace=function(e){var r=new t(e,!1,e);$n(r)},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(t){var e=t;if(!(!e||e.responseStart===void 0)){var r=ie.getInstance().getTimeOrigin(),n=Math.floor((e.startTime+r)*1e3),i=e.responseStart?Math.floor((e.responseStart-e.startTime)*1e3):void 0,o=Math.floor((e.responseEnd-e.startTime)*1e3),a=e.name&&e.name.split("?")[0],s={url:a,responsePayloadBytes:e.transferSize,startTimeUs:n,timeToResponseInitiatedUs:i,timeToResponseCompletedUs:o};RE(s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var LE=5e3;function cc(){!$o()||(setTimeout(function(){return UE()},0),setTimeout(function(){return FE()},0),setTimeout(function(){return BE()},0))}function FE(){for(var t=ie.getInstance(),e=t.getEntriesByType("resource"),r=0,n=e;r<n.length;r++){var i=n[r];lc(i)}t.setupObserver("resource",lc)}function UE(){var t=ie.getInstance(),e=t.getEntriesByType("navigation"),r=t.getEntriesByType("paint");if(t.onFirstInputDelay){var n=setTimeout(function(){Fr.createOobTrace(e,r),n=void 0},LE);t.onFirstInputDelay(function(i){n&&(clearTimeout(n),Fr.createOobTrace(e,r,i))})}else Fr.createOobTrace(e,r)}function BE(){for(var t=ie.getInstance(),e=t.getEntriesByType("measure"),r=0,n=e;r<n.length;r++){var i=n[r];fc(i)}t.setupObserver("measure",fc)}function fc(t){var e=t.name;e.substring(0,Wo.length)!==Wo&&Fr.createUserTimingTrace(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var HE=function(){function t(e){this.app=e,ie.getInstance().requiredApisAvailable()&&Dy().then(function(r){r&&(bE(),nc().then(cc,cc))}).catch(function(r){Ze.info("Environment doesn't support IndexedDB: "+r)})}return t.prototype.trace=function(e){return new Fr(e)},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return K.getInstance().instrumentationEnabled},set:function(e){K.getInstance().instrumentationEnabled=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return K.getInstance().dataCollectionEnabled},set:function(e){K.getInstance().dataCollectionEnabled=e},enumerable:!1,configurable:!0}),t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var WE="[DEFAULT]";function VE(t){var e=function(r,n){if(r.name!==WE)throw ne.create("FB not default");if(typeof window=="undefined")throw ne.create("no window");return Yy(window),K.getInstance().firebaseAppInstance=r,K.getInstance().installationsService=n,new HE(r)};t.INTERNAL.registerComponent(new $y("performance",function(r){var n=r.getProvider("app").getImmediate(),i=r.getProvider("installations").getImmediate();return e(n,i)},"PUBLIC")),t.registerVersion(Gy,Vl)}VE(fe);/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function De(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),i=0,e=0;e<r;e++)for(var o=arguments[e],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lt,U;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(U||(U={}));var jE={debug:U.DEBUG,verbose:U.VERBOSE,info:U.INFO,warn:U.WARN,error:U.ERROR,silent:U.SILENT},$E=U.INFO,GE=(Lt={},Lt[U.DEBUG]="log",Lt[U.VERBOSE]="log",Lt[U.INFO]="info",Lt[U.WARN]="warn",Lt[U.ERROR]="error",Lt),qE=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=new Date().toISOString(),o=GE[e];if(o)console[o].apply(console,De(["["+i+"]  "+t.name+":"],r));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},zE=function(){function t(e){this.name=e,this._logLevel=$E,this._logHandler=qE,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in U))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?jE[e]:e},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,De([this,U.DEBUG],e)),this._logHandler.apply(this,De([this,U.DEBUG],e))},t.prototype.log=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,De([this,U.VERBOSE],e)),this._logHandler.apply(this,De([this,U.VERBOSE],e))},t.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,De([this,U.INFO],e)),this._logHandler.apply(this,De([this,U.INFO],e))},t.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,De([this,U.WARN],e)),this._logHandler.apply(this,De([this,U.WARN],e))},t.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,De([this,U.ERROR],e)),this._logHandler.apply(this,De([this,U.ERROR],e))},t}();function hc(){var t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function dc(){return"indexedDB"in self&&indexedDB!=null}function pc(){return new Promise(function(t,e){try{var r=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=function(){i.result.close(),r||self.indexedDB.deleteDatabase(n),t(!0)},i.onupgradeneeded=function(){r=!1},i.onerror=function(){var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(o){e(o)}})}function vc(){return!(!navigator||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var KE="FirebaseError",gc=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=KE,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,_c.prototype.create),o}return e}(Error),_c=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?QE(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new gc(o,u,i);return l},t}();function QE(t,e){return t.replace(YE,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var YE=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var XE=1e3,JE=2,ZE=4*60*60*1e3,eb=.5;function mc(t,e,r){e===void 0&&(e=XE),r===void 0&&(r=JE);var n=e*Math.pow(r,t),i=Math.round(eb*n*(Math.random()-.5)*2);return Math.min(ZE,n+i)}var yc=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tb="firebase_id",rb="origin",nb=60*1e3,ib="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ec="https://www.googletagmanager.com/gtag/js",oe;(function(t){t.EVENT="event",t.SET="set",t.CONFIG="config"})(oe||(oe={}));var Yo;(function(t){t.ADD_SHIPPING_INFO="add_shipping_info",t.ADD_PAYMENT_INFO="add_payment_info",t.ADD_TO_CART="add_to_cart",t.ADD_TO_WISHLIST="add_to_wishlist",t.BEGIN_CHECKOUT="begin_checkout",t.CHECKOUT_PROGRESS="checkout_progress",t.EXCEPTION="exception",t.GENERATE_LEAD="generate_lead",t.LOGIN="login",t.PAGE_VIEW="page_view",t.PURCHASE="purchase",t.REFUND="refund",t.REMOVE_FROM_CART="remove_from_cart",t.SCREEN_VIEW="screen_view",t.SEARCH="search",t.SELECT_CONTENT="select_content",t.SELECT_ITEM="select_item",t.SELECT_PROMOTION="select_promotion",t.SET_CHECKOUT_OPTION="set_checkout_option",t.SHARE="share",t.SIGN_UP="sign_up",t.TIMING_COMPLETE="timing_complete",t.VIEW_CART="view_cart",t.VIEW_ITEM="view_item",t.VIEW_ITEM_LIST="view_item_list",t.VIEW_PROMOTION="view_promotion",t.VIEW_SEARCH_RESULTS="view_search_results"})(Yo||(Yo={}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ob(t,e,r,n,i){return v(this,void 0,void 0,function(){var o,a;return g(this,function(s){switch(s.label){case 0:return i&&i.global?(t(oe.EVENT,r,n),[2]):[3,1];case 1:return[4,e];case 2:o=s.sent(),a=T(T({},n),{send_to:o}),t(oe.EVENT,r,a),s.label=3;case 3:return[2]}})})}function ab(t,e,r,n){return v(this,void 0,void 0,function(){var i;return g(this,function(o){switch(o.label){case 0:return n&&n.global?(t(oe.SET,{screen_name:r}),[2,Promise.resolve()]):[3,1];case 1:return[4,e];case 2:i=o.sent(),t(oe.CONFIG,i,{update:!0,screen_name:r}),o.label=3;case 3:return[2]}})})}function sb(t,e,r,n){return v(this,void 0,void 0,function(){var i;return g(this,function(o){switch(o.label){case 0:return n&&n.global?(t(oe.SET,{user_id:r}),[2,Promise.resolve()]):[3,1];case 1:return[4,e];case 2:i=o.sent(),t(oe.CONFIG,i,{update:!0,user_id:r}),o.label=3;case 3:return[2]}})})}function ub(t,e,r,n){return v(this,void 0,void 0,function(){var i,o,a,s,u;return g(this,function(l){switch(l.label){case 0:if(!(n&&n.global))return[3,1];for(i={},o=0,a=Object.keys(r);o<a.length;o++)s=a[o],i["user_properties."+s]=r[s];return t(oe.SET,i),[2,Promise.resolve()];case 1:return[4,e];case 2:u=l.sent(),t(oe.CONFIG,u,{update:!0,user_properties:r}),l.label=3;case 3:return[2]}})})}function lb(t,e){return v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:return[4,t];case 1:return r=n.sent(),window["ga-disable-"+r]=!e,[2]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re=new zE("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cb(t,e){var r=document.createElement("script");r.src=Ec+"?l="+t+"&id="+e,r.async=!0,document.head.appendChild(r)}function fb(t){var e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}function hb(t,e,r,n,i,o){return v(this,void 0,void 0,function(){var a,s,u,l;return g(this,function(c){switch(c.label){case 0:a=n[i],c.label=1;case 1:return c.trys.push([1,7,,8]),a?[4,e[a]]:[3,3];case 2:return c.sent(),[3,6];case 3:return[4,Promise.all(r)];case 4:return s=c.sent(),u=s.find(function(f){return f.measurementId===i}),u?[4,e[u.appId]]:[3,6];case 5:c.sent(),c.label=6;case 6:return[3,8];case 7:return l=c.sent(),re.error(l),[3,8];case 8:return t(oe.CONFIG,i,o),[2]}})})}function db(t,e,r,n,i){return v(this,void 0,void 0,function(){var o,a,s,u,l,c,f,h,d;return g(this,function(p){switch(p.label){case 0:return p.trys.push([0,4,,5]),o=[],i&&i.send_to?(a=i.send_to,Array.isArray(a)||(a=[a]),[4,Promise.all(r)]):[3,2];case 1:for(s=p.sent(),u=function(m){var y=s.find(function(C){return C.measurementId===m}),E=y&&e[y.appId];if(E)o.push(E);else return o=[],"break"},l=0,c=a;l<c.length&&(f=c[l],h=u(f),h!=="break");l++);p.label=2;case 2:return o.length===0&&(o=Object.values(e)),[4,Promise.all(o)];case 3:return p.sent(),t(oe.EVENT,n,i||{}),[3,5];case 4:return d=p.sent(),re.error(d),[3,5];case 5:return[2]}})})}function pb(t,e,r,n){function i(o,a,s){return v(this,void 0,void 0,function(){var u;return g(this,function(l){switch(l.label){case 0:return l.trys.push([0,6,,7]),o!==oe.EVENT?[3,2]:[4,db(t,e,r,a,s)];case 1:return l.sent(),[3,5];case 2:return o!==oe.CONFIG?[3,4]:[4,hb(t,e,r,n,a,s)];case 3:return l.sent(),[3,5];case 4:t(oe.SET,a),l.label=5;case 5:return[3,7];case 6:return u=l.sent(),re.error(u),[3,7];case 7:return[2]}})})}return i}function vb(t,e,r,n,i){var o=function(){for(var a=[],s=0;s<arguments.length;s++)a[s]=arguments[s];window[n].push(arguments)};return window[i]&&typeof window[i]=="function"&&(o=window[i]),window[i]=pb(o,t,e,r),{gtagCore:o,wrappedGtag:window[i]}}function gb(){for(var t=window.document.getElementsByTagName("script"),e=0,r=Object.values(t);e<r.length;e++){var n=r[e];if(n.src&&n.src.includes(Ec))return n}return null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xe,_b=(xe={},xe["already-exists"]="A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",xe["already-initialized"]="Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",xe["interop-component-reg-failed"]="Firebase Analytics Interop Component failed to instantiate: {$reason}",xe["invalid-analytics-context"]="Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",xe["indexeddb-unavailable"]="IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",xe["fetch-throttle"]="The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",xe["config-fetch-failed"]="Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",xe["no-api-key"]='The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',xe["no-app-id"]='The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',xe),we=new _c("analytics","Analytics",_b);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mb=30,yb=1e3,Eb=function(){function t(e,r){e===void 0&&(e={}),r===void 0&&(r=yb),this.throttleMetadata=e,this.intervalMillis=r}return t.prototype.getThrottleMetadata=function(e){return this.throttleMetadata[e]},t.prototype.setThrottleMetadata=function(e,r){this.throttleMetadata[e]=r},t.prototype.deleteThrottleMetadata=function(e){delete this.throttleMetadata[e]},t}(),bc=new Eb;function bb(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}function Tb(t){var e;return v(this,void 0,void 0,function(){var r,n,i,o,a,s,u;return g(this,function(l){switch(l.label){case 0:return r=t.appId,n=t.apiKey,i={method:"GET",headers:bb(n)},o=ib.replace("{app-id}",r),[4,fetch(o,i)];case 1:if(a=l.sent(),!(a.status!==200&&a.status!==304))return[3,6];s="",l.label=2;case 2:return l.trys.push([2,4,,5]),[4,a.json()];case 3:return u=l.sent(),((e=u.error)===null||e===void 0?void 0:e.message)&&(s=u.error.message),[3,5];case 4:return l.sent(),[3,5];case 5:throw we.create("config-fetch-failed",{httpStatus:a.status,responseMessage:s});case 6:return[2,a.json()]}})})}function wb(t,e,r){return e===void 0&&(e=bc),v(this,void 0,void 0,function(){var n,i,o,a,s,u,l=this;return g(this,function(c){if(n=t.options,i=n.appId,o=n.apiKey,a=n.measurementId,!i)throw we.create("no-app-id");if(!o){if(a)return[2,{measurementId:a,appId:i}];throw we.create("no-api-key")}return s=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new Ib,setTimeout(function(){return v(l,void 0,void 0,function(){return g(this,function(f){return u.abort(),[2]})})},r!==void 0?r:nb),[2,Tc({appId:i,apiKey:o,measurementId:a},s,u,e)]})})}function Tc(t,e,r,n){var i=e.throttleEndTimeMillis,o=e.backoffCount;return n===void 0&&(n=bc),v(this,void 0,void 0,function(){var a,s,u,l,c,f,h;return g(this,function(d){switch(d.label){case 0:a=t.appId,s=t.measurementId,d.label=1;case 1:return d.trys.push([1,3,,4]),[4,Cb(r,i)];case 2:return d.sent(),[3,4];case 3:if(u=d.sent(),s)return re.warn("Timed out fetching this Firebase app's measurement ID from the server."+(" Falling back to the measurement ID "+s)+(' provided in the "measurementId" field in the local Firebase config. ['+u.message+"]")),[2,{appId:a,measurementId:s}];throw u;case 4:return d.trys.push([4,6,,7]),[4,Tb(t)];case 5:return l=d.sent(),n.deleteThrottleMetadata(a),[2,l];case 6:if(c=d.sent(),!Sb(c)){if(n.deleteThrottleMetadata(a),s)return re.warn("Failed to fetch this Firebase app's measurement ID from the server."+(" Falling back to the measurement ID "+s)+(' provided in the "measurementId" field in the local Firebase config. ['+c.message+"]")),[2,{appId:a,measurementId:s}];throw c}return f=Number(c.customData.httpStatus)===503?mc(o,n.intervalMillis,mb):mc(o,n.intervalMillis),h={throttleEndTimeMillis:Date.now()+f,backoffCount:o+1},n.setThrottleMetadata(a,h),re.debug("Calling attemptFetch again in "+f+" millis"),[2,Tc(t,h,r,n)];case 7:return[2]}})})}function Cb(t,e){return new Promise(function(r,n){var i=Math.max(e-Date.now(),0),o=setTimeout(r,i);t.addEventListener(function(){clearTimeout(o),n(we.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Sb(t){if(!(t instanceof gc)||!t.customData)return!1;var e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}var Ib=function(){function t(){this.listeners=[]}return t.prototype.addEventListener=function(e){this.listeners.push(e)},t.prototype.abort=function(){this.listeners.forEach(function(e){return e()})},t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(){return v(this,void 0,void 0,function(){var t;return g(this,function(e){switch(e.label){case 0:return dc()?[3,1]:(re.warn(we.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),[2,!1]);case 1:return e.trys.push([1,3,,4]),[4,pc()];case 2:return e.sent(),[3,4];case 3:return t=e.sent(),re.warn(we.create("indexeddb-unavailable",{errorInfo:t}).message),[2,!1];case 4:return[2,!0]}})})}function Ab(t,e,r,n,i,o){return v(this,void 0,void 0,function(){var a,s,u,l,c,f,h;return g(this,function(d){switch(d.label){case 0:return a=wb(t),a.then(function(p){r[p.measurementId]=p.appId,t.options.measurementId&&p.measurementId!==t.options.measurementId&&re.warn("The measurement ID in the local Firebase config ("+t.options.measurementId+")"+(" does not match the measurement ID fetched from the server ("+p.measurementId+").")+" To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.")}).catch(function(p){return re.error(p)}),e.push(a),s=Rb().then(function(p){if(p)return n.getId()}),[4,Promise.all([a,s])];case 1:return u=d.sent(),l=u[0],c=u[1],gb()||cb(o,l.measurementId),i("js",new Date),f=(h={},h[rb]="firebase",h.update=!0,h),c!=null&&(f[tb]=c),i(oe.CONFIG,l.measurementId,f),[2,l.measurementId]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et={},wc=[],Cc={},Gn="dataLayer",Sc="gtag",Ic,Ur,Xo=!1;function kb(t){if(Xo)throw we.create("already-initialized");t.dataLayerName&&(Gn=t.dataLayerName),t.gtagName&&(Sc=t.gtagName)}function Nb(){var t=[];if(hc()&&t.push("This is a browser extension environment."),vc()||t.push("Cookies are not available."),t.length>0){var e=t.map(function(n,i){return"("+(i+1)+") "+n}).join(" "),r=we.create("invalid-analytics-context",{errorInfo:e});re.warn(r.message)}}function Ob(t,e){Nb();var r=t.options.appId;if(!r)throw we.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)re.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest'+(" measurement ID for this Firebase app. Falling back to the measurement ID "+t.options.measurementId)+' provided in the "measurementId" field in the local Firebase config.');else throw we.create("no-api-key");if(et[r]!=null)throw we.create("already-exists",{id:r});if(!Xo){fb(Gn);var n=vb(et,wc,Cc,Gn,Sc),i=n.wrappedGtag,o=n.gtagCore;Ur=i,Ic=o,Xo=!0}et[r]=Ab(t,wc,Cc,e,Ic,Gn);var a={app:t,logEvent:function(s,u,l){ob(Ur,et[r],s,u,l).catch(function(c){return re.error(c)})},setCurrentScreen:function(s,u){ab(Ur,et[r],s,u).catch(function(l){return re.error(l)})},setUserId:function(s,u){sb(Ur,et[r],s,u).catch(function(l){return re.error(l)})},setUserProperties:function(s,u){ub(Ur,et[r],s,u).catch(function(l){return re.error(l)})},setAnalyticsCollectionEnabled:function(s){lb(et[r],s).catch(function(u){return re.error(u)})},INTERNAL:{delete:function(){return delete et[r],Promise.resolve()}}};return a}var Pb="@firebase/analytics",Mb="0.6.18",Rc="analytics";function Db(t){t.INTERNAL.registerComponent(new yc(Rc,function(r){var n=r.getProvider("app").getImmediate(),i=r.getProvider("installations").getImmediate();return Ob(n,i)},"PUBLIC").setServiceProps({settings:kb,EventName:Yo,isSupported:xb})),t.INTERNAL.registerComponent(new yc("analytics-internal",e,"PRIVATE")),t.registerVersion(Pb,Mb);function e(r){try{var n=r.getProvider(Rc).getImmediate();return{logEvent:n.logEvent}}catch(i){throw we.create("interop-component-reg-failed",{reason:i})}}}Db(fe);function xb(){return v(this,void 0,void 0,function(){var t;return g(this,function(e){switch(e.label){case 0:if(hc())return[2,!1];if(!vc())return[2,!1];if(!dc())return[2,!1];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,pc()];case 2:return t=e.sent(),[2,t];case 3:return e.sent(),[2,!1];case 4:return[2]}})})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Lb="FirebaseError",Jo=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=Lb,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,Ac.prototype.create),o}return e}(Error),Ac=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?Fb(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new Jo(o,u,i);return l},t}();function Fb(t,e){return t.replace(Ub,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var Ub=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bb=1e3,Hb=2,Wb=4*60*60*1e3,Vb=.5;function jb(t,e,r){e===void 0&&(e=Bb),r===void 0&&(r=Hb);var n=e*Math.pow(r,t),i=Math.round(Vb*n*(Math.random()-.5)*2);return Math.min(Wb,n+i)}/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function Le(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),i=0,e=0;e<r;e++)for(var o=arguments[e],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ft,P;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(P||(P={}));var $b={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},Gb=P.INFO,qb=(Ft={},Ft[P.DEBUG]="log",Ft[P.VERBOSE]="log",Ft[P.INFO]="info",Ft[P.WARN]="warn",Ft[P.ERROR]="error",Ft),zb=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=new Date().toISOString(),o=qb[e];if(o)console[o].apply(console,Le(["["+i+"]  "+t.name+":"],r));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},Kb=function(){function t(e){this.name=e,this._logLevel=Gb,this._logHandler=zb,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in P))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?$b[e]:e},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Le([this,P.DEBUG],e)),this._logHandler.apply(this,Le([this,P.DEBUG],e))},t.prototype.log=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Le([this,P.VERBOSE],e)),this._logHandler.apply(this,Le([this,P.VERBOSE],e))},t.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Le([this,P.INFO],e)),this._logHandler.apply(this,Le([this,P.INFO],e))},t.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Le([this,P.WARN],e)),this._logHandler.apply(this,Le([this,P.WARN],e))},t.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Le([this,P.ERROR],e)),this._logHandler.apply(this,Le([this,P.ERROR],e))},t}(),Qb=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Yb=function(){function t(e,r,n,i){this.client=e,this.storage=r,this.storageCache=n,this.logger=i}return t.prototype.isCachedDataFresh=function(e,r){if(!r)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;var n=Date.now()-r,i=n<=e;return this.logger.debug("Config fetch cache check."+(" Cache age millis: "+n+".")+(" Cache max age millis (minimumFetchIntervalMillis setting): "+e+".")+(" Is cache hit: "+i+".")),i},t.prototype.fetch=function(e){return v(this,void 0,void 0,function(){var r,n,i,o,a;return g(this,function(s){switch(s.label){case 0:return[4,Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()])];case 1:return r=s.sent(),n=r[0],i=r[1],i&&this.isCachedDataFresh(e.cacheMaxAgeMillis,n)?[2,i]:(e.eTag=i&&i.eTag,[4,this.client.fetch(e)]);case 2:return o=s.sent(),a=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())],o.status===200&&a.push(this.storage.setLastSuccessfulFetchResponse(o)),[4,Promise.all(a)];case 3:return s.sent(),[2,o]}})})},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var le,Xb=(le={},le["registration-window"]="Undefined window object. This SDK only supports usage in a browser environment.",le["registration-project-id"]="Undefined project identifier. Check Firebase app initialization.",le["registration-api-key"]="Undefined API key. Check Firebase app initialization.",le["registration-app-id"]="Undefined app identifier. Check Firebase app initialization.",le["storage-open"]="Error thrown when opening storage. Original error: {$originalErrorMessage}.",le["storage-get"]="Error thrown when reading from storage. Original error: {$originalErrorMessage}.",le["storage-set"]="Error thrown when writing to storage. Original error: {$originalErrorMessage}.",le["storage-delete"]="Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",le["fetch-client-network"]="Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",le["fetch-timeout"]='The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',le["fetch-throttle"]='The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',le["fetch-client-parse"]="Fetch client could not parse response. Original error: {$originalErrorMessage}.",le["fetch-status"]="Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",le),Ce=new Ac("remoteconfig","Remote Config",Xb);function Jb(t,e){return t instanceof Jo&&t.code.indexOf(e)!==-1}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zb(t){return t===void 0&&(t=navigator),t.languages&&t.languages[0]||t.language}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var eT=function(){function t(e,r,n,i,o,a){this.firebaseInstallations=e,this.sdkVersion=r,this.namespace=n,this.projectId=i,this.apiKey=o,this.appId=a}return t.prototype.fetch=function(e){return v(this,void 0,void 0,function(){var r,n,i,o,a,s,u,l,c,f,h,d,p,m,y,E,C,M,J;return g(this,function(W){switch(W.label){case 0:return[4,Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()])];case 1:r=W.sent(),n=r[0],i=r[1],o=window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com",a=o+"/v1/projects/"+this.projectId+"/namespaces/"+this.namespace+":fetch?key="+this.apiKey,s={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":e.eTag||"*"},u={sdk_version:this.sdkVersion,app_instance_id:n,app_instance_id_token:i,app_id:this.appId,language_code:Zb()},l={method:"POST",headers:s,body:JSON.stringify(u)},c=fetch(a,l),f=new Promise(function(Se,pt){e.signal.addEventListener(function(){var tt=new Error("The operation was aborted.");tt.name="AbortError",pt(tt)})}),W.label=2;case 2:return W.trys.push([2,5,,6]),[4,Promise.race([c,f])];case 3:return W.sent(),[4,c];case 4:return h=W.sent(),[3,6];case 5:throw d=W.sent(),p="fetch-client-network",d.name==="AbortError"&&(p="fetch-timeout"),Ce.create(p,{originalErrorMessage:d.message});case 6:if(m=h.status,y=h.headers.get("ETag")||void 0,h.status!==200)return[3,11];M=void 0,W.label=7;case 7:return W.trys.push([7,9,,10]),[4,h.json()];case 8:return M=W.sent(),[3,10];case 9:throw J=W.sent(),Ce.create("fetch-client-parse",{originalErrorMessage:J.message});case 10:E=M.entries,C=M.state,W.label=11;case 11:if(C==="INSTANCE_STATE_UNSPECIFIED"?m=500:C==="NO_CHANGE"?m=304:(C==="NO_TEMPLATE"||C==="EMPTY_CONFIG")&&(E={}),m!==304&&m!==200)throw Ce.create("fetch-status",{httpStatus:m});return[2,{status:m,eTag:y,config:E}]}})})},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tT=function(){function t(){this.listeners=[]}return t.prototype.addEventListener=function(e){this.listeners.push(e)},t.prototype.abort=function(){this.listeners.forEach(function(e){return e()})},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rT=!1,nT="",kc=0,iT=["1","true","t","yes","y","on"],Zo=function(){function t(e,r){r===void 0&&(r=nT),this._source=e,this._value=r}return t.prototype.asString=function(){return this._value},t.prototype.asBoolean=function(){return this._source==="static"?rT:iT.indexOf(this._value.toLowerCase())>=0},t.prototype.asNumber=function(){if(this._source==="static")return kc;var e=Number(this._value);return isNaN(e)&&(e=kc),e},t.prototype.getSource=function(){return this._source},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oT=60*1e3,aT=12*60*60*1e3,sT=function(){function t(e,r,n,i,o){this.app=e,this._client=r,this._storageCache=n,this._storage=i,this._logger=o,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:oT,minimumFetchIntervalMillis:aT},this.defaultConfig={}}return t.prototype.setLogLevel=function(e){switch(e){case"debug":this._logger.logLevel=P.DEBUG;break;case"silent":this._logger.logLevel=P.SILENT;break;default:this._logger.logLevel=P.ERROR}},Object.defineProperty(t.prototype,"fetchTimeMillis",{get:function(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lastFetchStatus",{get:function(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"},enumerable:!1,configurable:!0}),t.prototype.activate=function(){return v(this,void 0,void 0,function(){var e,r,n;return g(this,function(i){switch(i.label){case 0:return[4,Promise.all([this._storage.getLastSuccessfulFetchResponse(),this._storage.getActiveConfigEtag()])];case 1:return e=i.sent(),r=e[0],n=e[1],!r||!r.config||!r.eTag||r.eTag===n?[2,!1]:[4,Promise.all([this._storageCache.setActiveConfig(r.config),this._storage.setActiveConfigEtag(r.eTag)])];case 2:return i.sent(),[2,!0]}})})},t.prototype.ensureInitialized=function(){var e=this;return this._initializePromise||(this._initializePromise=this._storageCache.loadFromStorage().then(function(){e._isInitializationComplete=!0})),this._initializePromise},t.prototype.fetch=function(){return v(this,void 0,void 0,function(){var e,r,n,i=this;return g(this,function(o){switch(o.label){case 0:e=new tT,setTimeout(function(){return v(i,void 0,void 0,function(){return g(this,function(a){return e.abort(),[2]})})},this.settings.fetchTimeoutMillis),o.label=1;case 1:return o.trys.push([1,4,,6]),[4,this._client.fetch({cacheMaxAgeMillis:this.settings.minimumFetchIntervalMillis,signal:e})];case 2:return o.sent(),[4,this._storageCache.setLastFetchStatus("success")];case 3:return o.sent(),[3,6];case 4:return r=o.sent(),n=Jb(r,"fetch-throttle")?"throttle":"failure",[4,this._storageCache.setLastFetchStatus(n)];case 5:throw o.sent(),r;case 6:return[2]}})})},t.prototype.fetchAndActivate=function(){return v(this,void 0,void 0,function(){return g(this,function(e){switch(e.label){case 0:return[4,this.fetch()];case 1:return e.sent(),[2,this.activate()]}})})},t.prototype.getAll=function(){var e=this;return uT(this._storageCache.getActiveConfig(),this.defaultConfig).reduce(function(r,n){return r[n]=e.getValue(n),r},{})},t.prototype.getBoolean=function(e){return this.getValue(e).asBoolean()},t.prototype.getNumber=function(e){return this.getValue(e).asNumber()},t.prototype.getString=function(e){return this.getValue(e).asString()},t.prototype.getValue=function(e){this._isInitializationComplete||this._logger.debug('A value was requested for key "'+e+'" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.');var r=this._storageCache.getActiveConfig();return r&&r[e]!==void 0?new Zo("remote",r[e]):this.defaultConfig&&this.defaultConfig[e]!==void 0?new Zo("default",String(this.defaultConfig[e])):(this._logger.debug('Returning static value for key "'+e+'". Define a default or remote value if this is unintentional.'),new Zo("static"))},t}();function uT(t,e){return t===void 0&&(t={}),e===void 0&&(e={}),Object.keys(T(T({},t),e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(t,e){var r=t.target.error||void 0;return Ce.create(e,{originalErrorMessage:r&&r.message})}var Ut="app_namespace_store",lT="firebase_remote_config",cT=1;function fT(){return new Promise(function(t,e){var r=indexedDB.open(lT,cT);r.onerror=function(n){e(qn(n,"storage-open"))},r.onsuccess=function(n){t(n.target.result)},r.onupgradeneeded=function(n){var i=n.target.result;switch(n.oldVersion){case 0:i.createObjectStore(Ut,{keyPath:"compositeKey"})}}})}var hT=function(){function t(e,r,n,i){i===void 0&&(i=fT()),this.appId=e,this.appName=r,this.namespace=n,this.openDbPromise=i}return t.prototype.getLastFetchStatus=function(){return this.get("last_fetch_status")},t.prototype.setLastFetchStatus=function(e){return this.set("last_fetch_status",e)},t.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.get("last_successful_fetch_timestamp_millis")},t.prototype.setLastSuccessfulFetchTimestampMillis=function(e){return this.set("last_successful_fetch_timestamp_millis",e)},t.prototype.getLastSuccessfulFetchResponse=function(){return this.get("last_successful_fetch_response")},t.prototype.setLastSuccessfulFetchResponse=function(e){return this.set("last_successful_fetch_response",e)},t.prototype.getActiveConfig=function(){return this.get("active_config")},t.prototype.setActiveConfig=function(e){return this.set("active_config",e)},t.prototype.getActiveConfigEtag=function(){return this.get("active_config_etag")},t.prototype.setActiveConfigEtag=function(e){return this.set("active_config_etag",e)},t.prototype.getThrottleMetadata=function(){return this.get("throttle_metadata")},t.prototype.setThrottleMetadata=function(e){return this.set("throttle_metadata",e)},t.prototype.deleteThrottleMetadata=function(){return this.delete("throttle_metadata")},t.prototype.get=function(e){return v(this,void 0,void 0,function(){var r,n=this;return g(this,function(i){switch(i.label){case 0:return[4,this.openDbPromise];case 1:return r=i.sent(),[2,new Promise(function(o,a){var s=r.transaction([Ut],"readonly"),u=s.objectStore(Ut),l=n.createCompositeKey(e);try{var c=u.get(l);c.onerror=function(f){a(qn(f,"storage-get"))},c.onsuccess=function(f){var h=f.target.result;o(h?h.value:void 0)}}catch(f){a(Ce.create("storage-get",{originalErrorMessage:f&&f.message}))}})]}})})},t.prototype.set=function(e,r){return v(this,void 0,void 0,function(){var n,i=this;return g(this,function(o){switch(o.label){case 0:return[4,this.openDbPromise];case 1:return n=o.sent(),[2,new Promise(function(a,s){var u=n.transaction([Ut],"readwrite"),l=u.objectStore(Ut),c=i.createCompositeKey(e);try{var f=l.put({compositeKey:c,value:r});f.onerror=function(h){s(qn(h,"storage-set"))},f.onsuccess=function(){a()}}catch(h){s(Ce.create("storage-set",{originalErrorMessage:h&&h.message}))}})]}})})},t.prototype.delete=function(e){return v(this,void 0,void 0,function(){var r,n=this;return g(this,function(i){switch(i.label){case 0:return[4,this.openDbPromise];case 1:return r=i.sent(),[2,new Promise(function(o,a){var s=r.transaction([Ut],"readwrite"),u=s.objectStore(Ut),l=n.createCompositeKey(e);try{var c=u.delete(l);c.onerror=function(f){a(qn(f,"storage-delete"))},c.onsuccess=function(){o()}}catch(f){a(Ce.create("storage-delete",{originalErrorMessage:f&&f.message}))}})]}})})},t.prototype.createCompositeKey=function(e){return[this.appId,this.appName,this.namespace,e].join()},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var dT=function(){function t(e){this.storage=e}return t.prototype.getLastFetchStatus=function(){return this.lastFetchStatus},t.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.lastSuccessfulFetchTimestampMillis},t.prototype.getActiveConfig=function(){return this.activeConfig},t.prototype.loadFromStorage=function(){return v(this,void 0,void 0,function(){var e,r,n,i,o,a;return g(this,function(s){switch(s.label){case 0:return e=this.storage.getLastFetchStatus(),r=this.storage.getLastSuccessfulFetchTimestampMillis(),n=this.storage.getActiveConfig(),[4,e];case 1:return i=s.sent(),i&&(this.lastFetchStatus=i),[4,r];case 2:return o=s.sent(),o&&(this.lastSuccessfulFetchTimestampMillis=o),[4,n];case 3:return a=s.sent(),a&&(this.activeConfig=a),[2]}})})},t.prototype.setLastFetchStatus=function(e){return this.lastFetchStatus=e,this.storage.setLastFetchStatus(e)},t.prototype.setLastSuccessfulFetchTimestampMillis=function(e){return this.lastSuccessfulFetchTimestampMillis=e,this.storage.setLastSuccessfulFetchTimestampMillis(e)},t.prototype.setActiveConfig=function(e){return this.activeConfig=e,this.storage.setActiveConfig(e)},t}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pT(t,e){return new Promise(function(r,n){var i=Math.max(e-Date.now(),0),o=setTimeout(r,i);t.addEventListener(function(){clearTimeout(o),n(Ce.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function vT(t){if(!(t instanceof Jo)||!t.customData)return!1;var e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}var gT=function(){function t(e,r){this.client=e,this.storage=r}return t.prototype.fetch=function(e){return v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:return[4,this.storage.getThrottleMetadata()];case 1:return r=n.sent()||{backoffCount:0,throttleEndTimeMillis:Date.now()},[2,this.attemptFetch(e,r)]}})})},t.prototype.attemptFetch=function(e,r){var n=r.throttleEndTimeMillis,i=r.backoffCount;return v(this,void 0,void 0,function(){var o,a,s;return g(this,function(u){switch(u.label){case 0:return[4,pT(e.signal,n)];case 1:u.sent(),u.label=2;case 2:return u.trys.push([2,5,,7]),[4,this.client.fetch(e)];case 3:return o=u.sent(),[4,this.storage.deleteThrottleMetadata()];case 4:return u.sent(),[2,o];case 5:if(a=u.sent(),!vT(a))throw a;return s={throttleEndTimeMillis:Date.now()+jb(i),backoffCount:i+1},[4,this.storage.setThrottleMetadata(s)];case 6:return u.sent(),[2,this.attemptFetch(e,s)];case 7:return[2]}})})},t}(),Nc="@firebase/remote-config",_T="0.1.43";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mT(t){t.INTERNAL.registerComponent(new Qb("remoteConfig",e,"PUBLIC").setMultipleInstances(!0)),t.registerVersion(Nc,_T);function e(r,n){var i=n.instanceIdentifier,o=r.getProvider("app").getImmediate(),a=r.getProvider("installations").getImmediate();if(typeof window=="undefined")throw Ce.create("registration-window");var s=o.options,u=s.projectId,l=s.apiKey,c=s.appId;if(!u)throw Ce.create("registration-project-id");if(!l)throw Ce.create("registration-api-key");if(!c)throw Ce.create("registration-app-id");i=i||"firebase";var f=new hT(c,o.name,i),h=new dT(f),d=new Kb(Nc);d.logLevel=P.ERROR;var p=new eT(a,t.SDK_VERSION,i,u,l,c),m=new gT(p,f),y=new Yb(m,f,h,d),E=new sT(o,y,h,f,d);return E.ensureInitialized(),E}}mT(fe);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yT=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var i=t.charCodeAt(n);i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):(i&64512)==55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)==56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e},ET=function(t){for(var e=[],r=0,n=0;r<t.length;){var i=t[r++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){var o=t[r++];e[n++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){var o=t[r++],a=t[r++],s=t[r++],u=((i&7)<<18|(o&63)<<12|(a&63)<<6|s&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{var o=t[r++],a=t[r++];e[n++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Oc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],i=0;i<t.length;i+=3){var o=t[i],a=i+1<t.length,s=a?t[i+1]:0,u=i+2<t.length,l=u?t[i+2]:0,c=o>>2,f=(o&3)<<4|s>>4,h=(s&15)<<2|l>>6,d=l&63;u||(d=64,a||(h=64)),n.push(r[c],r[f],r[h],r[d])}return n.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(yT(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ET(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],i=0;i<t.length;){var o=r[t.charAt(i++)],a=i<t.length,s=a?r[t.charAt(i)]:0;++i;var u=i<t.length,l=u?r[t.charAt(i)]:64;++i;var c=i<t.length,f=c?r[t.charAt(i)]:64;if(++i,o==null||s==null||l==null||f==null)throw Error();var h=o<<2|s>>4;if(n.push(h),l!==64){var d=s<<4&240|l>>2;if(n.push(d),f!==64){var p=l<<6&192|f;n.push(p)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Pc=function(t){try{return Oc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zn=function(){function t(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(r,n){e.resolve=r,e.reject=n})}return t.prototype.wrapCallback=function(e){var r=this;return function(n,i){n?r.reject(n):r.resolve(i),typeof e=="function"&&(r.promise.catch(function(){}),e.length===1?e(n):e(n,i))}},t}();function Mc(){return"indexedDB"in self&&indexedDB!=null}function bT(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var TT="FirebaseError",wT=function(t){A(e,t);function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name=TT,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,Dc.prototype.create),o}return e}(Error),Dc=function(){function t(e,r,n){this.service=e,this.serviceName=r,this.errors=n}return t.prototype.create=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=r[0]||{},o=this.service+"/"+e,a=this.errors[e],s=a?CT(a,i):"Error",u=this.serviceName+": "+s+" ("+o+").",l=new wT(o,u,i);return l},t}();function CT(t,e){return t.replace(ST,function(r,n){var i=e[n];return i!=null?String(i):"<"+n+"?>"})}var ST=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(t){return JSON.parse(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var IT=function(t){var e={},r={},n={},i="";try{var o=t.split(".");e=xc(Pc(o[0])||""),r=xc(Pc(o[1])||""),i=o[2],n=r.d||{},delete r.d}catch{}return{header:e,claims:r,data:n,signature:i}},RT=function(t){var e=IT(t).claims;return typeof e=="object"&&e.hasOwnProperty("iat")?e.iat:null},Lc=function(){function t(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},t.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},t.prototype.setServiceProps=function(e){return this.serviceProps=e,this},t.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},t}();/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function Fe(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;for(var n=Array(t),i=0,e=0;e<r;e++)for(var o=arguments[e],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bt,B;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(B||(B={}));var AT={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},kT=B.INFO,NT=(Bt={},Bt[B.DEBUG]="log",Bt[B.VERBOSE]="log",Bt[B.INFO]="info",Bt[B.WARN]="warn",Bt[B.ERROR]="error",Bt),OT=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=new Date().toISOString(),o=NT[e];if(o)console[o].apply(console,Fe(["["+i+"]  "+t.name+":"],r));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},PT=function(){function t(e){this.name=e,this._logLevel=kT,this._logHandler=OT,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in B))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?AT[e]:e},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Fe([this,B.DEBUG],e)),this._logHandler.apply(this,Fe([this,B.DEBUG],e))},t.prototype.log=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Fe([this,B.VERBOSE],e)),this._logHandler.apply(this,Fe([this,B.VERBOSE],e))},t.prototype.info=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Fe([this,B.INFO],e)),this._logHandler.apply(this,Fe([this,B.INFO],e))},t.prototype.warn=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Fe([this,B.WARN],e)),this._logHandler.apply(this,Fe([this,B.WARN],e))},t.prototype.error=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];this._userLogHandler&&this._userLogHandler.apply(this,Fe([this,B.ERROR],e)),this._logHandler.apply(this,Fe([this,B.ERROR],e))},t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ue,MT=(Ue={},Ue["already-activated"]="You are trying to activate AppCheck for FirebaseApp {$appName}, while it is already activated. AppCheck can only be activated once.",Ue["use-before-activation"]="AppCheck is being used before activate() is called for FirebaseApp {$appName}. Please make sure you call activate() before instantiating other Firebase services.",Ue["fetch-network-error"]="Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",Ue["fetch-parse-error"]="Fetch client could not parse response. Original error: {$originalErrorMessage}.",Ue["fetch-status-error"]="Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",Ue["storage-open"]="Error thrown when opening storage. Original error: {$originalErrorMessage}.",Ue["storage-get"]="Error thrown when reading from storage. Original error: {$originalErrorMessage}.",Ue["storage-set"]="Error thrown when writing to storage. Original error: {$originalErrorMessage}.",Ue["recaptcha-error"]="ReCAPTCHA error.",Ue),ge=new Dc("appCheck","AppCheck",MT);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fc=new Map,DT={activated:!1,tokenObservers:[]},xT={enabled:!1};function ce(t){return Fc.get(t)||DT}function qe(t,e){Fc.set(t,e)}function ea(){return xT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Uc="https://content-firebaseappcheck.googleapis.com/v1beta",LT="exchangeRecaptchaToken",FT="exchangeDebugToken",Bc={OFFSET_DURATION:5*60*1e3,RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var UT=function(){function t(e,r,n,i,o){if(this.operation=e,this.retryPolicy=r,this.getWaitDuration=n,this.lowerBound=i,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=i,i>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}return t.prototype.start=function(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(function(){})},t.prototype.stop=function(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)},t.prototype.isRunning=function(){return!!this.pending},t.prototype.process=function(e){return v(this,void 0,void 0,function(){var r;return g(this,function(n){switch(n.label){case 0:this.stop(),n.label=1;case 1:return n.trys.push([1,6,,7]),this.pending=new zn,[4,BT(this.getNextRun(e))];case 2:return n.sent(),this.pending.resolve(),[4,this.pending.promise];case 3:return n.sent(),this.pending=new zn,[4,this.operation()];case 4:return n.sent(),this.pending.resolve(),[4,this.pending.promise];case 5:return n.sent(),this.process(!0).catch(function(){}),[3,7];case 6:return r=n.sent(),this.retryPolicy(r)?this.process(!1).catch(function(){}):this.stop(),[3,7];case 7:return[2]}})})},t.prototype.getNextRun=function(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();var r=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),r},t}();function BT(t){return new Promise(function(e){setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hc(){return self.grecaptcha}function Wc(t){if(!ce(t).activated)throw ge.create("use-before-activation",{appName:t.name})}function HT(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,r=t==="x"?e:e&3|8;return r.toString(16)})}function WT(t){return Oc.encodeString(JSON.stringify(t),!1)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(t,e){var r=t.url,n=t.body;return v(this,void 0,void 0,function(){var i,o,a,s,u,l,c,f,h,d;return g(this,function(p){switch(p.label){case 0:i={"Content-Type":"application/json"},o=e.getImmediate({optional:!0}),o&&(i["X-Firebase-Client"]=o.getPlatformInfoString()),a={method:"POST",body:JSON.stringify(n),headers:i},p.label=1;case 1:return p.trys.push([1,3,,4]),[4,fetch(r,a)];case 2:return s=p.sent(),[3,4];case 3:throw u=p.sent(),ge.create("fetch-network-error",{originalErrorMessage:u.message});case 4:if(s.status!==200)throw ge.create("fetch-status-error",{httpStatus:s.status});p.label=5;case 5:return p.trys.push([5,7,,8]),[4,s.json()];case 6:return l=p.sent(),[3,8];case 7:throw c=p.sent(),ge.create("fetch-parse-error",{originalErrorMessage:c.message});case 8:if(f=l.ttl.match(/^([\d.]+)(s)$/),!f||!f[2]||isNaN(Number(f[1])))throw ge.create("fetch-parse-error",{originalErrorMessage:"ttl field (timeToLive) is not in standard Protobuf Duration "+("format: "+l.ttl)});return h=Number(f[1])*1e3,d=Date.now(),[2,{token:l.attestationToken,expireTimeMillis:d+h,issuedAtTimeMillis:d}]}})})}function VT(t,e){var r=t.options,n=r.projectId,i=r.appId,o=r.apiKey;return{url:Uc+"/projects/"+n+"/apps/"+i+":"+LT+"?key="+o,body:{recaptcha_token:e}}}function jT(t,e){var r=t.options,n=r.projectId,i=r.appId,o=r.apiKey;return{url:Uc+"/projects/"+n+"/apps/"+i+":"+FT+"?key="+o,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $T="firebase-app-check-database",GT=1,Br="firebase-app-check-store",jc="debug-token",Kn=null;function $c(){return Kn||(Kn=new Promise(function(t,e){try{var r=indexedDB.open($T,GT);r.onsuccess=function(n){t(n.target.result)},r.onerror=function(n){var i;e(ge.create("storage-open",{originalErrorMessage:(i=n.target.error)===null||i===void 0?void 0:i.message}))},r.onupgradeneeded=function(n){var i=n.target.result;switch(n.oldVersion){case 0:i.createObjectStore(Br,{keyPath:"compositeKey"})}}}catch(n){e(ge.create("storage-open",{originalErrorMessage:n.message}))}}),Kn)}function qT(t){return qc(zc(t))}function zT(t,e){return Gc(zc(t),e)}function KT(t){return Gc(jc,t)}function QT(){return qc(jc)}function Gc(t,e){return v(this,void 0,void 0,function(){var r,n,i,o;return g(this,function(a){switch(a.label){case 0:return[4,$c()];case 1:return r=a.sent(),n=r.transaction(Br,"readwrite"),i=n.objectStore(Br),o=i.put({compositeKey:t,value:e}),[2,new Promise(function(s,u){o.onsuccess=function(l){s()},n.onerror=function(l){var c;u(ge.create("storage-set",{originalErrorMessage:(c=l.target.error)===null||c===void 0?void 0:c.message}))}})]}})})}function qc(t){return v(this,void 0,void 0,function(){var e,r,n,i;return g(this,function(o){switch(o.label){case 0:return[4,$c()];case 1:return e=o.sent(),r=e.transaction(Br,"readonly"),n=r.objectStore(Br),i=n.get(t),[2,new Promise(function(a,s){i.onsuccess=function(u){var l=u.target.result;a(l?l.value:void 0)},r.onerror=function(u){var l;s(ge.create("storage-get",{originalErrorMessage:(l=u.target.error)===null||l===void 0?void 0:l.message}))}})]}})})}function zc(t){return t.options.appId+"-"+t.name}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qn=new PT("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YT(t){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:if(!Mc())return[3,5];e=void 0,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,qT(t)];case 2:return e=n.sent(),[3,4];case 3:return r=n.sent(),Qn.warn("Failed to read token from indexeddb. Error: "+r),[3,4];case 4:return[2,e];case 5:return[2,void 0]}})})}function Kc(t,e){return Mc()?zT(t,e).catch(function(r){Qn.warn("Failed to write token to indexeddb. Error: "+r)}):Promise.resolve()}function XT(){return v(this,void 0,void 0,function(){var t,e;return g(this,function(r){switch(r.label){case 0:t=void 0,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,QT()];case 2:return t=r.sent(),[3,4];case 3:return r.sent(),[3,4];case 4:return t?[2,t]:(e=HT(),KT(e).catch(function(n){return Qn.warn("Failed to persist debug token to indexeddb. Error: "+n)}),console.log("AppCheck debug token: "+e+". You will need to whitelist it in the Firebase console for it to work"),[2,e])}})})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JT(){var t=ea();return t.enabled}function ZT(){return v(this,void 0,void 0,function(){var t;return g(this,function(e){if(t=ea(),t.enabled&&t.token)return[2,t.token.promise];throw Error(`
            Can't get debug token in production mode.
        `)})})}function ew(){var t=bT();if(!(typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)){var e=ea();e.enabled=!0;var r=new zn;e.token=r,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?r.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(XT())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tw={error:"UNKNOWN_ERROR"};function Yn(t,e,r){return r===void 0&&(r=!1),v(this,void 0,void 0,function(){var n,i,o,a,s,u,l,c,f,h;return g(this,function(d){switch(d.label){case 0:return Wc(t),n=ce(t),i=n.token,o=void 0,i?[3,2]:[4,n.cachedTokenPromise];case 1:a=d.sent(),a&&Hr(a)&&(i=a,qe(t,T(T({},n),{token:i})),Yc(t,{token:i.token})),d.label=2;case 2:return!r&&i&&Hr(i)?[2,{token:i.token}]:JT()?(u=Vc,l=jT,c=[t],[4,ZT()]):[3,6];case 3:return[4,u.apply(void 0,[l.apply(void 0,c.concat([d.sent()])),e])];case 4:return s=d.sent(),[4,Kc(t,s)];case 5:return d.sent(),qe(t,T(T({},n),{token:s})),[2,{token:s.token}];case 6:return d.trys.push([6,8,,9]),[4,n.provider.getToken()];case 7:return i=d.sent(),[3,9];case 8:return f=d.sent(),Qn.error(f),o=f,[3,9];case 9:return i?[3,10]:(h=nw(o),[3,12]);case 10:return h={token:i.token},qe(t,T(T({},n),{token:i})),[4,Kc(t,i)];case 11:d.sent(),d.label=12;case 12:return Yc(t,h),[2,h]}})})}function Qc(t,e,r,n,i){var o=ce(t),a={next:n,error:i,type:r},s=T(T({},o),{tokenObservers:j(j([],o.tokenObservers),[a])});if(!s.tokenRefresher){var u=rw(t,e);s.tokenRefresher=u}if(!s.tokenRefresher.isRunning()&&o.isTokenAutoRefreshEnabled&&s.tokenRefresher.start(),o.token&&Hr(o.token)){var l=o.token;Promise.resolve().then(function(){return n({token:l.token})}).catch(function(){})}else o.token==null&&o.cachedTokenPromise.then(function(c){c&&Hr(c)&&n({token:c.token})}).catch(function(){});qe(t,s)}function ta(t,e){var r=ce(t),n=r.tokenObservers.filter(function(i){return i.next!==e});n.length===0&&r.tokenRefresher&&r.tokenRefresher.isRunning()&&r.tokenRefresher.stop(),qe(t,T(T({},r),{tokenObservers:n}))}function rw(t,e){var r=this;return new UT(function(){return v(r,void 0,void 0,function(){var n,i;return g(this,function(o){switch(o.label){case 0:return n=ce(t),n.token?[3,2]:[4,Yn(t,e)];case 1:return i=o.sent(),[3,4];case 2:return[4,Yn(t,e,!0)];case 3:i=o.sent(),o.label=4;case 4:if(i.error)throw i.error;return[2]}})})},function(){return!0},function(){var n=ce(t);if(n.token){var i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+5*60*1e3,o=n.token.expireTimeMillis-5*60*1e3;return i=Math.min(i,o),Math.max(0,i-Date.now())}else return 0},Bc.RETRIAL_MIN_WAIT,Bc.RETRIAL_MAX_WAIT)}function Yc(t,e){for(var r=ce(t).tokenObservers,n=0,i=r;n<i.length;n++){var o=i[n];try{o.type==="EXTERNAL"&&e.error!=null?o.error(e.error):o.next(e)}catch{}}}function Hr(t){return t.expireTimeMillis-Date.now()>0}function nw(t){return{token:WT(tw),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var iw="https://www.google.com/recaptcha/api.js";function ow(t,e){var r=ce(t),n=new zn;qe(t,T(T({},r),{reCAPTCHAState:{initialized:n}}));var i="fire_app_check_"+t.name,o=document.createElement("div");o.id=i,o.style.display="none",document.body.appendChild(o);var a=Hc();return a?a.ready(function(){Xc(t,e,a,i),n.resolve(a)}):sw(function(){var s=Hc();if(!s)throw new Error("no recaptcha");s.ready(function(){Xc(t,e,s,i),n.resolve(s)})}),n.promise}function aw(t){return v(this,void 0,void 0,function(){var e,r;return g(this,function(n){switch(n.label){case 0:return Wc(t),e=ce(t).reCAPTCHAState,[4,e.initialized.promise];case 1:return r=n.sent(),[2,new Promise(function(i,o){var a=ce(t).reCAPTCHAState;r.ready(function(){i(r.execute(a.widgetId,{action:"fire_app_check"}))})})]}})})}function Xc(t,e,r,n){var i=r.render(n,{sitekey:e,size:"invisible"}),o=ce(t);qe(t,T(T({},o),{reCAPTCHAState:T(T({},o.reCAPTCHAState),{widgetId:i})}))}function sw(t){var e=document.createElement("script");e.src=""+iw,e.onload=t,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ra=function(){function t(e){this._siteKey=e}return t.prototype.getToken=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(r){switch(r.label){case 0:if(!this._app||!this._platformLoggerProvider)throw ge.create("use-before-activation",{appName:""});r.label=1;case 1:return r.trys.push([1,3,,4]),[4,aw(this._app)];case 2:return e=r.sent(),[3,4];case 3:throw r.sent(),ge.create("recaptcha-error");case 4:return[2,Vc(VT(this._app,e),this._platformLoggerProvider)]}})})},t.prototype.initialize=function(e,r){this._app=e,this._platformLoggerProvider=r,ow(e,this._siteKey).catch(function(){})},t}(),na=function(){function t(e){this._customProviderOptions=e}return t.prototype.getToken=function(){return v(this,void 0,void 0,function(){var e,r,n;return g(this,function(i){switch(i.label){case 0:if(!this._app)throw ge.create("use-before-activation",{appName:""});return[4,this._customProviderOptions.getToken()];case 1:return e=i.sent(),r=RT(e.token),n=r!==null&&r<Date.now()&&r>0?r*1e3:Date.now(),[2,T(T({},e),{issuedAtTimeMillis:n})]}})})},t.prototype.initialize=function(e){this._app=e},t}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uw(t,e,r,n){var i=ce(t);if(i.activated)throw ge.create("already-activated",{appName:t.name});var o=T(T({},i),{activated:!0});o.cachedTokenPromise=YT(t).then(function(a){return a&&Hr(a)&&qe(t,T(T({},ce(t)),{token:a})),a}),typeof e=="string"?o.provider=new ra(e):e instanceof ra||e instanceof na?o.provider=e:o.provider=new na({getToken:e.getToken}),o.isTokenAutoRefreshEnabled=n===void 0?t.automaticDataCollectionEnabled:n,qe(t,o),o.provider.initialize(t,r)}function lw(t,e){var r=ce(t);r.tokenRefresher&&(e===!0?r.tokenRefresher.start():r.tokenRefresher.stop()),qe(t,T(T({},r),{isTokenAutoRefreshEnabled:e}))}function cw(t,e,r){return v(this,void 0,void 0,function(){var n;return g(this,function(i){switch(i.label){case 0:return[4,Yn(t,e,r)];case 1:if(n=i.sent(),n.error)throw n.error;return[2,{token:n.token}]}})})}function fw(t,e,r,n,i){var o=function(){},a=function(){};return r.next!=null?o=r.next.bind(r):o=r,r.error!=null?a=r.error.bind(r):n&&(a=n),Qc(t,e,"EXTERNAL",o,a),function(){return ta(t,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(t,e){return{app:t,activate:function(r,n){return uw(t,r,e,n)},setTokenAutoRefreshEnabled:function(r){return lw(t,r)},getToken:function(r){return cw(t,e,r)},onTokenChanged:function(r,n,i){return fw(t,e,r,n)},INTERNAL:{delete:function(){for(var r=ce(t).tokenObservers,n=0,i=r;n<i.length;n++){var o=i[n];ta(t,o.next)}return Promise.resolve()}}}}function dw(t,e){return{getToken:function(r){return Yn(t,e,r)},addTokenListener:function(r){return Qc(t,e,"INTERNAL",r)},removeTokenListener:function(r){return ta(t,r)}}}var pw="@firebase/app-check",vw="0.3.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gw="appCheck",Jc="app-check-internal";function _w(t){t.INTERNAL.registerComponent(new Lc(gw,function(e){var r=e.getProvider("app").getImmediate(),n=e.getProvider("platform-logger");return hw(r,n)},"PUBLIC").setServiceProps({ReCaptchaV3Provider:ra,CustomProvider:na}).setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(function(e,r,n){var i=e.getProvider(Jc);i.initialize()})),t.INTERNAL.registerComponent(new Lc(Jc,function(e){var r=e.getProvider("app").getImmediate(),n=e.getProvider("platform-logger");return dw(r,n)},"PUBLIC").setInstantiationMode("EXPLICIT")),t.registerVersion(pw,vw)}_w(fe);ew();var mw="firebase",Zc="8.10.0";/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fe.registerVersion(mw,Zc,"app");fe.SDK_VERSION=Zc;var yw="firebase",Ew="8.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */console.warn(`
It looks like you're using the development build of the Firebase JS SDK.
When deploying Firebase apps to production, it is advisable to only import
the individual SDK components you intend to use.

For the module builds, these are available in the following manner
(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

CommonJS Modules:
const firebase = require('firebase/app');
require('firebase/<PACKAGE>');

ES Modules:
import firebase from 'firebase/app';
import 'firebase/<PACKAGE>';

Typescript:
import firebase from 'firebase/app';
import 'firebase/<PACKAGE>';
`);fe.registerVersion(yw,Ew);export{Iw as default};
