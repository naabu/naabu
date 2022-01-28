/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var D=function(n,e){return D=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])},D(n,e)};function J(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");D(n,e);function t(){this.constructor=n}n.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var R=function(){return R=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++){t=arguments[r];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},R.apply(this,arguments)};function K(n,e,t,r){function o(i){return i instanceof t?i:new t(function(s){s(i)})}return new(t||(t=Promise))(function(i,s){function f(p){try{a(r.next(p))}catch(d){s(d)}}function h(p){try{a(r.throw(p))}catch(d){s(d)}}function a(p){p.done?i(p.value):o(p.value).then(f,h)}a((r=r.apply(n,e||[])).next())})}function X(n,e){var t={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,o,i,s;return s={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function f(a){return function(p){return h([a,p])}}function h(a){if(r)throw new TypeError("Generator is already executing.");for(;t;)try{if(r=1,o&&(i=a[0]&2?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[a[0]&2,i.value]),a[0]){case 0:case 1:i=a;break;case 4:return t.label++,{value:a[1],done:!1};case 5:t.label++,o=a[1],a=[0];continue;case 7:a=t.ops.pop(),t.trys.pop();continue;default:if(i=t.trys,!(i=i.length>0&&i[i.length-1])&&(a[0]===6||a[0]===2)){t=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){t.label=a[1];break}if(a[0]===6&&t.label<i[1]){t.label=i[1],i=a;break}if(i&&t.label<i[2]){t.label=i[2],t.ops.push(a);break}i[2]&&t.ops.pop(),t.trys.pop();continue}a=e.call(n,t)}catch(p){a=[6,p],o=0}finally{r=i=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}}function z(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],r=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function L(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var r=t.call(n),o,i=[],s;try{for(;(e===void 0||e-- >0)&&!(o=r.next()).done;)i.push(o.value)}catch(f){s={error:f}}finally{try{o&&!o.done&&(t=r.return)&&t.call(r)}finally{if(s)throw s.error}}return i}function k(n,e,t){if(t||arguments.length===2)for(var r=0,o=e.length,i;r<o;r++)(i||!(r in e))&&(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return n.concat(i||Array.prototype.slice.call(e))}/**
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
 */function Z(n){return A(void 0,n)}function A(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:var t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(var r in e)!e.hasOwnProperty(r)||!q(r)||(n[r]=A(n[r],e[r]));return n}function q(n){return n!=="__proto__"}/**
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
 */var Q=function(){function n(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(t,r){e.resolve=t,e.reject=r})}return n.prototype.wrapCallback=function(e){var t=this;return function(r,o){r?t.reject(r):t.resolve(o),typeof e=="function"&&(t.promise.catch(function(){}),e.length===1?e(r):e(r,o))}},n}();function ee(){try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function te(){return typeof self=="object"&&self.self===self}/**
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
 */var ne="FirebaseError",re=function(n){J(e,n);function e(t,r,o){var i=n.call(this,r)||this;return i.code=t,i.customData=o,i.name=ne,Object.setPrototypeOf(i,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,T.prototype.create),i}return e}(Error),T=function(){function n(e,t,r){this.service=e,this.serviceName=t,this.errors=r}return n.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var o=t[0]||{},i=this.service+"/"+e,s=this.errors[e],f=s?ie(s,o):"Error",h=this.serviceName+": "+f+" ("+i+").",a=new re(i,h,o);return a},n}();function ie(n,e){return n.replace(oe,function(t,r){var o=e[r];return o!=null?String(o):"<"+r+"?>"})}var oe=/\{\$([^}]+)}/g;/**
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
 */function $(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function ae(n,e){var t=new se(n,e);return t.subscribe.bind(t)}var se=function(){function n(e,t){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(r)}).catch(function(o){r.error(o)})}return n.prototype.next=function(e){this.forEachObserver(function(t){t.next(e)})},n.prototype.error=function(e){this.forEachObserver(function(t){t.error(e)}),this.close(e)},n.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},n.prototype.subscribe=function(e,t,r){var o=this,i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");ue(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=x),i.error===void 0&&(i.error=x),i.complete===void 0&&(i.complete=x);var s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{o.finalError?i.error(o.finalError):i.complete()}catch{}}),this.observers.push(i),s},n.prototype.unsubscribeOne=function(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))},n.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},n.prototype.sendOne=function(e,t){var r=this;this.task.then(function(){if(r.observers!==void 0&&r.observers[e]!==void 0)try{t(r.observers[e])}catch(o){typeof console!="undefined"&&console.error&&console.error(o)}})},n.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},n}();function ue(n,e){if(typeof n!="object"||n===null)return!1;for(var t=0,r=e;t<r.length;t++){var o=r[t];if(o in n&&typeof n[o]=="function")return!0}return!1}function x(){}var j=function(){function n(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return n.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},n.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},n.prototype.setServiceProps=function(e){return this.serviceProps=e,this},n.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},n}();/**
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
 */var N="[DEFAULT]";/**
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
 */var le=function(){function n(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return n.prototype.get=function(e){var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var r=new Q;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{var o=this.getOrInitializeService({instanceIdentifier:t});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise},n.prototype.getImmediate=function(e){var t,r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),o=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(o)return null;throw i}else{if(o)return null;throw Error("Service "+this.name+" is not available")}},n.prototype.getComponent=function(){return this.component},n.prototype.setComponent=function(e){var t,r;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,!!this.shouldAutoInitialize()){if(ce(e))try{this.getOrInitializeService({instanceIdentifier:N})}catch{}try{for(var o=z(this.instancesDeferred.entries()),i=o.next();!i.done;i=o.next()){var s=L(i.value,2),f=s[0],h=s[1],a=this.normalizeInstanceIdentifier(f);try{var p=this.getOrInitializeService({instanceIdentifier:a});h.resolve(p)}catch{}}}catch(d){t={error:d}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}}},n.prototype.clearInstance=function(e){e===void 0&&(e=N),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},n.prototype.delete=function(){return K(this,void 0,void 0,function(){var e;return X(this,function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(k(k([],L(e.filter(function(r){return"INTERNAL"in r}).map(function(r){return r.INTERNAL.delete()}))),L(e.filter(function(r){return"_delete"in r}).map(function(r){return r._delete()}))))];case 1:return t.sent(),[2]}})})},n.prototype.isComponentSet=function(){return this.component!=null},n.prototype.isInitialized=function(e){return e===void 0&&(e=N),this.instances.has(e)},n.prototype.getOptions=function(e){return e===void 0&&(e=N),this.instancesOptions.get(e)||{}},n.prototype.initialize=function(e){var t,r;e===void 0&&(e={});var o=e.options,i=o===void 0?{}:o,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(this.name+"("+s+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var f=this.getOrInitializeService({instanceIdentifier:s,options:i});try{for(var h=z(this.instancesDeferred.entries()),a=h.next();!a.done;a=h.next()){var p=L(a.value,2),d=p[0],l=p[1],u=this.normalizeInstanceIdentifier(d);s===u&&l.resolve(f)}}catch(y){t={error:y}}finally{try{a&&!a.done&&(r=h.return)&&r.call(h)}finally{if(t)throw t.error}}return f},n.prototype.onInit=function(e,t){var r,o=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(o,i);var s=this.instances.get(o);return s&&e(s,o),function(){i.delete(e)}},n.prototype.invokeOnInitCallbacks=function(e,t){var r,o,i=this.onInitCallbacks.get(t);if(!!i)try{for(var s=z(i),f=s.next();!f.done;f=s.next()){var h=f.value;try{h(e,t)}catch{}}}catch(a){r={error:a}}finally{try{f&&!f.done&&(o=s.return)&&o.call(s)}finally{if(r)throw r.error}}},n.prototype.getOrInitializeService=function(e){var t=e.instanceIdentifier,r=e.options,o=r===void 0?{}:r,i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:fe(t),options:o}),this.instances.set(t,i),this.instancesOptions.set(t,o),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch{}return i||null},n.prototype.normalizeInstanceIdentifier=function(e){return e===void 0&&(e=N),this.component?this.component.multipleInstances?e:N:e},n.prototype.shouldAutoInitialize=function(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"},n}();function fe(n){return n===N?void 0:n}function ce(n){return n.instantiationMode==="EAGER"}/**
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
 */var pe=function(){function n(e){this.name=e,this.providers=new Map}return n.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},n.prototype.addOrOverwriteComponent=function(e){var t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},n.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new le(e,this);return this.providers.set(e,t),t},n.prototype.getProviders=function(){return Array.from(this.providers.values())},n}();/*! *****************************************************************************
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
***************************************************************************** */function I(){for(var n=0,e=0,t=arguments.length;e<t;e++)n+=arguments[e].length;for(var r=Array(n),o=0,e=0;e<t;e++)for(var i=arguments[e],s=0,f=i.length;s<f;s++,o++)r[o]=i[s];return r}/**
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
 */var _,H=[],c;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(c||(c={}));var B={debug:c.DEBUG,verbose:c.VERBOSE,info:c.INFO,warn:c.WARN,error:c.ERROR,silent:c.SILENT},he=c.INFO,de=(_={},_[c.DEBUG]="log",_[c.VERBOSE]="log",_[c.INFO]="info",_[c.WARN]="warn",_[c.ERROR]="error",_),ve=function(n,e){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];if(!(e<n.logLevel)){var o=new Date().toISOString(),i=de[e];if(i)console[i].apply(console,I(["["+o+"]  "+n.name+":"],t));else throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}},me=function(){function n(e){this.name=e,this._logLevel=he,this._logHandler=ve,this._userLogHandler=null,H.push(this)}return Object.defineProperty(n.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in c))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),n.prototype.setLogLevel=function(e){this._logLevel=typeof e=="string"?B[e]:e},Object.defineProperty(n.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),n.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,I([this,c.DEBUG],e)),this._logHandler.apply(this,I([this,c.DEBUG],e))},n.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,I([this,c.VERBOSE],e)),this._logHandler.apply(this,I([this,c.VERBOSE],e))},n.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,I([this,c.INFO],e)),this._logHandler.apply(this,I([this,c.INFO],e))},n.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,I([this,c.WARN],e)),this._logHandler.apply(this,I([this,c.WARN],e))},n.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,I([this,c.ERROR],e)),this._logHandler.apply(this,I([this,c.ERROR],e))},n}();function ye(n){H.forEach(function(e){e.setLogLevel(n)})}function ge(n,e){for(var t=function(s){var f=null;e&&e.level&&(f=B[e.level]),n===null?s.userLogHandler=null:s.userLogHandler=function(h,a){for(var p=[],d=2;d<arguments.length;d++)p[d-2]=arguments[d];var l=p.map(function(u){if(u==null)return null;if(typeof u=="string")return u;if(typeof u=="number"||typeof u=="boolean")return u.toString();if(u instanceof Error)return u.message;try{return JSON.stringify(u)}catch{return null}}).filter(function(u){return u}).join(" ");a>=(f!=null?f:h.logLevel)&&n({level:c[a].toLowerCase(),message:l,args:p,type:h.name})}},r=0,o=H;r<o.length;r++){var i=o[r];t(i)}}/**
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
 */var O,be=(O={},O["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",O["bad-app-name"]="Illegal App name: '{$appName}",O["duplicate-app"]="Firebase App named '{$appName}' already exists",O["app-deleted"]="Firebase App named '{$appName}' already deleted",O["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",O["invalid-log-argument"]="First argument to `onLog` must be null or a function.",O),C=new T("app","Firebase",be),V="@firebase/app",Ie="0.6.30",Ee="@firebase/analytics",we="@firebase/app-check",Oe="@firebase/auth",Ne="@firebase/database",_e="@firebase/functions",Ce="@firebase/installations",Se="@firebase/messaging",Ae="@firebase/performance",Re="@firebase/remote-config",Le="@firebase/storage",Pe="@firebase/firestore",Fe="firebase-wrapper";/**
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
 */var m,P="[DEFAULT]",De=(m={},m[V]="fire-core",m[Ee]="fire-analytics",m[we]="fire-app-check",m[Oe]="fire-auth",m[Ne]="fire-rtdb",m[_e]="fire-fn",m[Ce]="fire-iid",m[Se]="fire-fcm",m[Ae]="fire-perf",m[Re]="fire-rc",m[Le]="fire-gcs",m[Pe]="fire-fst",m["fire-js"]="fire-js",m[Fe]="fire-js-all",m);/**
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
 */var S=new me("@firebase/app");/**
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
 */var F=function(){function n(e,t,r){var o=this;this.firebase_=r,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=Z(e),this.container=new pe(t.name),this._addComponent(new j("app",function(){return o},"PUBLIC")),this.firebase_.INTERNAL.components.forEach(function(i){return o._addComponent(i)})}return Object.defineProperty(n.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!1,configurable:!0}),n.prototype.delete=function(){var e=this;return new Promise(function(t){e.checkDestroyed_(),t()}).then(function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map(function(t){return t.delete()}))}).then(function(){e.isDeleted_=!0})},n.prototype._getService=function(e,t){var r;t===void 0&&(t=P),this.checkDestroyed_();var o=this.container.getProvider(e);return!o.isInitialized()&&((r=o.getComponent())===null||r===void 0?void 0:r.instantiationMode)==="EXPLICIT"&&o.initialize(),o.getImmediate({identifier:t})},n.prototype._removeServiceInstance=function(e,t){t===void 0&&(t=P),this.container.getProvider(e).clearInstance(t)},n.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(t){S.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,t)}},n.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},n.prototype.toJSON=function(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}},n.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw C.create("app-deleted",{appName:this.name_})},n}();F.prototype.name&&F.prototype.options||F.prototype.delete||console.log("dc");var ze="8.10.0";/**
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
 */function Te(n){var e={},t=new Map,r={__esModule:!0,initializeApp:s,app:i,registerVersion:a,setLogLevel:ye,onLog:p,apps:null,SDK_VERSION:ze,INTERNAL:{registerComponent:h,removeApp:o,components:t,useAsService:d}};r.default=r,Object.defineProperty(r,"apps",{get:f});function o(l){delete e[l]}function i(l){if(l=l||P,!$(e,l))throw C.create("no-app",{appName:l});return e[l]}i.App=n;function s(l,u){if(u===void 0&&(u={}),typeof u!="object"||u===null){var y=u;u={name:y}}var g=u;g.name===void 0&&(g.name=P);var v=g.name;if(typeof v!="string"||!v)throw C.create("bad-app-name",{appName:String(v)});if($(e,v))throw C.create("duplicate-app",{appName:v});var w=new n(l,g,r);return e[v]=w,w}function f(){return Object.keys(e).map(function(l){return e[l]})}function h(l){var u=l.name;if(t.has(u))return S.debug("There were multiple attempts to register component "+u+"."),l.type==="PUBLIC"?r[u]:null;if(t.set(u,l),l.type==="PUBLIC"){var y=function(b){if(b===void 0&&(b=i()),typeof b[u]!="function")throw C.create("invalid-app-argument",{appName:u});return b[u]()};l.serviceProps!==void 0&&A(y,l.serviceProps),r[u]=y,n.prototype[u]=function(){for(var b=[],E=0;E<arguments.length;E++)b[E]=arguments[E];var Y=this._getService.bind(this,u);return Y.apply(this,l.multipleInstances?b:[])}}for(var g=0,v=Object.keys(e);g<v.length;g++){var w=v[g];e[w]._addComponent(l)}return l.type==="PUBLIC"?r[u]:null}function a(l,u,y){var g,v=(g=De[l])!==null&&g!==void 0?g:l;y&&(v+="-"+y);var w=v.match(/\s|\//),b=u.match(/\s|\//);if(w||b){var E=['Unable to register library "'+v+'" with version "'+u+'":'];w&&E.push('library name "'+v+'" contains illegal characters (whitespace or "/")'),w&&b&&E.push("and"),b&&E.push('version name "'+u+'" contains illegal characters (whitespace or "/")'),S.warn(E.join(" "));return}h(new j(v+"-version",function(){return{library:v,version:u}},"VERSION"))}function p(l,u){if(l!==null&&typeof l!="function")throw C.create("invalid-log-argument");ge(l,u)}function d(l,u){if(u==="serverAuth")return null;var y=u;return y}return r}/**
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
 */function U(){var n=Te(F);n.INTERNAL=R(R({},n.INTERNAL),{createFirebaseNamespace:U,extendNamespace:e,createSubscribe:ae,ErrorFactory:T,deepExtend:A});function e(t){A(n,t)}return n}var M=U();/**
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
 */var xe=function(){function n(e){this.container=e}return n.prototype.getPlatformInfoString=function(){var e=this.container.getProviders();return e.map(function(t){if(je(t)){var r=t.getImmediate();return r.library+"/"+r.version}else return null}).filter(function(t){return t}).join(" ")},n}();function je(n){var e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}/**
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
 */function He(n,e){n.INTERNAL.registerComponent(new j("platform-logger",function(t){return new xe(t)},"PRIVATE")),n.registerVersion(V,Ie,e),n.registerVersion("fire-js","")}/**
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
 */if(te()&&self.firebase!==void 0){S.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);var G=self.firebase.SDK_VERSION;G&&G.indexOf("LITE")>=0&&S.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}var Me=M.initializeApp;M.initializeApp=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return ee()&&S.warn(`
      Warning: This is a browser-targeted Firebase bundle but it appears it is being
      run in a Node environment.  If running in a Node environment, make sure you
      are using the bundle specified by the "main" field in package.json.
      
      If you are using Webpack, you can specify "main" as the first item in
      "resolve.mainFields":
      https://webpack.js.org/configuration/resolve/#resolvemainfields
      
      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify "main"
      as the first item in "mainFields", e.g. ['main', 'module'].
      https://github.com/rollup/@rollup/plugin-node-resolve
      `),Me.apply(void 0,n)};var W=M;He(W);var ke=W;export{J as _,R as a,k as b,K as c,X as d,z as e,ke as f,L as g};
