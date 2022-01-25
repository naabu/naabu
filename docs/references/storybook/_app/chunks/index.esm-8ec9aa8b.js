import{p as te,_ as x,q as _,s as W,D as $,r as Ee,t as ot,u as vc,v as gc,b as v,c as g,w as Ur,d as Ko,e as _c,x as qt,y as zo,z as w,A as Pn,B as ue,E as mc,F as Br,m as U,G as T,H as G,L as Kt,I as yc,S as bc,a as q,J as Tc,K as $o,M as Nn,N as fe,O as Qo,C as he,f as ae,o as Ct,n as Yo,P as wc,Q as Ec,R as Cc,T as It,U as zt,V as Wr,W as $t,X as jr,l as Xo,Y as Jo,Z as Ic,$ as Sc}from"./index.esm-61ff5ac9.js";import{f as aT}from"./index.esm-61ff5ac9.js";import"./auth.esm-ffa6483c.js";import{K as Rc,Q as kc,_ as Ac}from"./index-0ece83d9.js";var Pc="@firebase/database",Nc="0.11.0";/**
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
 */var Zo="";function es(t){Zo=t}/**
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
 */var Oc=function(){function t(e){this.domStorage_=e,this.prefix_="firebase:"}return t.prototype.set=function(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),W(n))},t.prototype.get=function(e){var n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Br(n)},t.prototype.remove=function(e){this.domStorage_.removeItem(this.prefixedName_(e))},t.prototype.prefixedName_=function(e){return this.prefix_+e},t.prototype.toString=function(){return this.domStorage_.toString()},t}();/**
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
 */var Mc=function(){function t(){this.cache_={},this.isInMemoryStorage=!0}return t.prototype.set=function(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n},t.prototype.get=function(e){return Ee(this.cache_,e)?this.cache_[e]:null},t.prototype.remove=function(e){delete this.cache_[e]},t}();/**
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
 */var ts=function(t){try{if(typeof window!="undefined"&&typeof window[t]!="undefined"){var e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Oc(e)}}catch{}return new Mc},st=ts("localStorage"),Vr=ts("sessionStorage");/**
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
 */var St=new Kt("@firebase/database"),ns=function(){var t=1;return function(){return t++}}(),rs=function(t){var e=yc(t),n=new bc;n.update(e);var r=n.digest();return zo.encodeByteArray(r)},Qt=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n="",r=0;r<t.length;r++){var i=t[r];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?n+=Qt.apply(null,i):typeof i=="object"?n+=W(i):n+=i,n+=" "}return n},at=null,is=!0,os=function(t,e){_(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(St.logLevel=Ct.VERBOSE,at=St.log.bind(St),e&&Vr.set("logging_enabled",!0)):typeof t=="function"?at=t:(at=null,Vr.remove("logging_enabled"))},K=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(is===!0&&(is=!1,at===null&&Vr.get("logging_enabled")===!0&&os(!0)),at){var n=Qt.apply(null,t);at(n)}},Yt=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];K.apply(void 0,q([t],ue(e)))}},Hr=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE INTERNAL ERROR: "+Qt.apply(void 0,q([],ue(t)));St.error(n)},Pe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE FATAL ERROR: "+Qt.apply(void 0,q([],ue(t)));throw St.error(n),new Error(n)},Q=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE WARNING: "+Qt.apply(void 0,q([],ue(t)));St.warn(n)},xc=function(){typeof window!="undefined"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Q("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},On=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Dc=function(t){if(document.readyState==="complete")t();else{var e=!1,n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Ue="[MIN_NAME]",Ne="[MAX_NAME]",ut=function(t,e){if(t===e)return 0;if(t===Ue||e===Ne)return-1;if(e===Ue||t===Ne)return 1;var n=Mn(t),r=Mn(e);return n!==null?r!==null?n-r==0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1},Lc=function(t,e){return t===e?0:t<e?-1:1},Xt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+W(e))},Gr=function(t){if(typeof t!="object"||t===null)return W(t);var e=[];for(var n in t)e.push(n);e.sort();for(var r="{",i=0;i<e.length;i++)i!==0&&(r+=","),r+=W(e[i]),r+=":",r+=Gr(t[e[i]]);return r+="}",r},ss=function(t,e){var n=t.length;if(n<=e)return[t];for(var r=[],i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function j(t,e){for(var n in t)t.hasOwnProperty(n)&&e(n,t[n])}var as=function(t){_(!On(t),"Invalid JSON number");var e=11,n=52,r=(1<<e-1)-1,i,o,s,a,u;t===0?(o=0,s=0,i=1/t==-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),o=a+r,s=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(o=0,s=Math.round(t/Math.pow(2,1-r-n))));var l=[];for(u=n;u;u-=1)l.push(s%2?1:0),s=Math.floor(s/2);for(u=e;u;u-=1)l.push(o%2?1:0),o=Math.floor(o/2);l.push(i?1:0),l.reverse();var c=l.join(""),f="";for(u=0;u<64;u+=8){var h=parseInt(c.substr(u,8),2).toString(16);h.length===1&&(h="0"+h),f=f+h}return f.toLowerCase()},Fc=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Uc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Bc(t,e){var n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");var r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}var Wc=new RegExp("^-?(0*)\\d{1,10}$"),us=-2147483648,qr=2147483647,Mn=function(t){if(Wc.test(t)){var e=Number(t);if(e>=us&&e<=qr)return e}return null},Rt=function(t){try{t()}catch(e){setTimeout(function(){var n=e.stack||"";throw Q("Exception was thrown by user callback.",n),e},Math.floor(0))}},jc=function(){var t=typeof window=="object"&&window.navigator&&window.navigator.userAgent||"";return t.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Jt=function(t,e){var n=setTimeout(t,e);return typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */var Vc=function(){function t(e,n){var r=this;this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(function(i){return r.appCheck=i})}return t.prototype.getToken=function(e){var n=this;return this.appCheck?this.appCheck.getToken(e):new Promise(function(r,i){setTimeout(function(){n.appCheck?n.getToken(e).then(r,i):r(null)},0)})},t.prototype.addTokenChangeListener=function(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(function(r){return r.addTokenListener(e)})},t.prototype.notifyForInvalidToken=function(){Q('Provided AppCheck credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly.')},t}();/**
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
 */var Hc=function(){function t(e,n,r){var i=this;this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(function(o){return i.auth_=o})}return t.prototype.getToken=function(e){var n=this;return this.auth_?this.auth_.getToken(e).catch(function(r){return r&&r.code==="auth/token-not-initialized"?(K("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(r)}):new Promise(function(r,i){setTimeout(function(){n.auth_?n.getToken(e).then(r,i):r(null)},0)})},t.prototype.addTokenChangeListener=function(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(function(n){return n.addAuthTokenListener(e)})},t.prototype.removeTokenChangeListener=function(e){this.authProvider_.get().then(function(n){return n.removeAuthTokenListener(e)})},t.prototype.notifyForInvalidToken=function(){var e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Q(e)},t}(),Zt=function(){function t(e){this.accessToken=e}return t.prototype.getToken=function(e){return Promise.resolve({accessToken:this.accessToken})},t.prototype.addTokenChangeListener=function(e){e(this.accessToken)},t.prototype.removeTokenChangeListener=function(e){},t.prototype.notifyForInvalidToken=function(){},t.OWNER="owner",t}();/**
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
 */var Kr="5",ls="v",cs="s",fs="r",hs="f",ds=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ps="ls",Gc="p",zr="ac",vs="websocket",gs="long_polling";/**
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
 */var $r=function(){function t(e,n,r,i,o,s,a){o===void 0&&(o=!1),s===void 0&&(s=""),a===void 0&&(a=!1),this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=o,this.persistenceKey=s,this.includeNamespaceInQueryParams=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=st.get("host:"+e)||this._host}return t.prototype.isCacheableHost=function(){return this.internalHost.substr(0,2)==="s-"},t.prototype.isCustomHost=function(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"},Object.defineProperty(t.prototype,"host",{get:function(){return this._host},set:function(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&st.set("host:"+this._host,this.internalHost))},enumerable:!1,configurable:!0}),t.prototype.toString=function(){var e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e},t.prototype.toURLString=function(){var e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?"?ns="+this.namespace:"";return""+e+this.host+"/"+n},t}();function qc(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function _s(t,e,n){_(typeof e=="string","typeof type must == string"),_(typeof n=="object","typeof params must == object");var r;if(e===vs)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===gs)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);qc(t)&&(n.ns=t.namespace);var i=[];return j(n,function(o,s){i.push(o+"="+s)}),r+i.join("&")}/**
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
 */var Kc=function(){function t(){this.counters_={}}return t.prototype.incrementCounter=function(e,n){n===void 0&&(n=1),Ee(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n},t.prototype.get=function(){return Cc(this.counters_)},t}();/**
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
 */var Qr={},Yr={};function Xr(t){var e=t.toString();return Qr[e]||(Qr[e]=new Kc),Qr[e]}function zc(t,e){var n=t.toString();return Yr[n]||(Yr[n]=e()),Yr[n]}/**
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
 */var $c=function(){function t(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}return t.prototype.closeAfter=function(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)},t.prototype.handleResponse=function(e,n){var r=this;this.pendingResponses[e]=n;for(var i=function(){var a=o.pendingResponses[o.currentResponseNum];delete o.pendingResponses[o.currentResponseNum];for(var u=function(c){a[c]&&Rt(function(){r.onMessage_(a[c])})},l=0;l<a.length;++l)u(l);if(o.currentResponseNum===o.closeAfterResponse)return o.onClose&&(o.onClose(),o.onClose=null),"break";o.currentResponseNum++},o=this;this.pendingResponses[this.currentResponseNum];){var s=i();if(s==="break")break}},t}();/**
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
 */var ms="start",Qc="close",Yc="pLPCommand",Xc="pRTLPCB",ys="id",bs="pw",Ts="ser",Jc="cb",Zc="seg",ef="ts",tf="d",nf="dframe",ws=1870,Es=30,rf=ws-Es,of=25e3,sf=3e4,Jr=function(){function t(e,n,r,i,o,s,a){var u=this;this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.transportSessionId=s,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Yt(e),this.stats_=Xr(n),this.urlFn=function(l){return u.appCheckToken&&(l[zr]=u.appCheckToken),_s(n,gs,l)}}return t.prototype.open=function(e,n){var r=this;this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new $c(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(function(){r.log_("Timed out trying to connect."),r.onClosed_(),r.connectTimeoutTimer_=null},Math.floor(sf)),Dc(function(){if(!r.isClosed_){r.scriptTagHolder=new af(function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];var u=ue(s,5),l=u[0],c=u[1],f=u[2];if(u[3],u[4],r.incrementIncomingBytes_(s),!!r.scriptTagHolder)if(r.connectTimeoutTimer_&&(clearTimeout(r.connectTimeoutTimer_),r.connectTimeoutTimer_=null),r.everConnected_=!0,l===ms)r.id=c,r.password=f;else if(l===Qc)c?(r.scriptTagHolder.sendNewPolls=!1,r.myPacketOrderer.closeAfter(c,function(){r.onClosed_()})):r.onClosed_();else throw new Error("Unrecognized command received: "+l)},function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];var u=ue(s,2),l=u[0],c=u[1];r.incrementIncomingBytes_(s),r.myPacketOrderer.handleResponse(l,c)},function(){r.onClosed_()},r.urlFn);var i={};i[ms]="t",i[Ts]=Math.floor(Math.random()*1e8),r.scriptTagHolder.uniqueCallbackIdentifier&&(i[Jc]=r.scriptTagHolder.uniqueCallbackIdentifier),i[ls]=Kr,r.transportSessionId&&(i[cs]=r.transportSessionId),r.lastSessionId&&(i[ps]=r.lastSessionId),r.applicationId&&(i[Gc]=r.applicationId),r.appCheckToken&&(i[zr]=r.appCheckToken),typeof location!="undefined"&&location.hostname&&ds.test(location.hostname)&&(i[fs]=hs);var o=r.urlFn(i);r.log_("Connecting via long-poll to "+o),r.scriptTagHolder.addTag(o,function(){})}})},t.prototype.start=function(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)},t.forceAllow=function(){t.forceAllow_=!0},t.forceDisallow=function(){t.forceDisallow_=!0},t.isAvailable=function(){return t.forceAllow_?!0:!t.forceDisallow_&&typeof document!="undefined"&&document.createElement!=null&&!Fc()&&!Uc()},t.prototype.markConnectionHealthy=function(){},t.prototype.shutdown_=function(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)},t.prototype.onClosed_=function(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))},t.prototype.close=function(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())},t.prototype.send=function(e){var n=W(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);for(var r=Tc(n),i=ss(r,rf),o=0;o<i.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[o]),this.curSegmentNum++},t.prototype.addDisconnectPingFrame=function(e,n){this.myDisconnFrame=document.createElement("iframe");var r={};r[nf]="t",r[ys]=e,r[bs]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)},t.prototype.incrementIncomingBytes_=function(e){var n=W(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)},t}(),af=function(){function t(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ns(),window[Yc+this.uniqueCallbackIdentifier]=e,window[Xc+this.uniqueCallbackIdentifier]=n,this.myIFrame=t.createIFrame_();var o="";if(this.myIFrame.src&&this.myIFrame.src.substr(0,"javascript:".length)==="javascript:"){var s=document.domain;o='<script>document.domain="'+s+'";<\/script>'}var a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(u){K("frame writing exception"),u.stack&&K(u.stack),K(u)}}}return t.createIFrame_=function(){var e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{var n=e.contentWindow.document;n||K("No IE domain setting required")}catch{var r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e},t.prototype.close=function(){var e=this;this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.innerHTML="",setTimeout(function(){e.myIFrame!==null&&(document.body.removeChild(e.myIFrame),e.myIFrame=null)},Math.floor(0)));var n=this.onDisconnect;n&&(this.onDisconnect=null,n())},t.prototype.startLongPoll=function(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););},t.prototype.newRequest_=function(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;var e={};e[ys]=this.myID,e[bs]=this.myPW,e[Ts]=this.currentSerial;for(var n=this.urlFn(e),r="",i=0;this.pendingSegs.length>0;){var o=this.pendingSegs[0];if(o.d.length+Es+r.length<=ws){var s=this.pendingSegs.shift();r=r+"&"+Zc+i+"="+s.seg+"&"+ef+i+"="+s.ts+"&"+tf+i+"="+s.d,i++}else break}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1},t.prototype.enqueueSegment=function(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()},t.prototype.addLongPollTag_=function(e,n){var r=this;this.outstandingRequests.add(n);var i=function(){r.outstandingRequests.delete(n),r.newRequest_()},o=setTimeout(i,Math.floor(of)),s=function(){clearTimeout(o),i()};this.addTag(e,s)},t.prototype.addTag=function(e,n){var r=this;setTimeout(function(){try{if(!r.sendNewPolls)return;var i=r.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){var o=i.readyState;(!o||o==="loaded"||o==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=function(){K("Long-poll script failed to load: "+e),r.sendNewPolls=!1,r.close()},r.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))},t}();/**
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
 */var uf=16384,lf=45e3,xn=null;typeof MozWebSocket!="undefined"?xn=MozWebSocket:typeof WebSocket!="undefined"&&(xn=WebSocket);var lt=function(){function t(e,n,r,i,o,s,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Yt(this.connId),this.stats_=Xr(n),this.connURL=t.connectionURL_(n,s,a,i),this.nodeAdmin=n.nodeAdmin}return t.connectionURL_=function(e,n,r,i){var o={};return o[ls]=Kr,typeof location!="undefined"&&location.hostname&&ds.test(location.hostname)&&(o[fs]=hs),n&&(o[cs]=n),r&&(o[ps]=r),i&&(o[zr]=i),_s(e,vs,o)},t.prototype.open=function(e,n){var r=this;this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,st.set("previous_websocket_failure",!0);try{var i,o,s,a;if(!$o()){var o={headers:{"X-Firebase-GMPID":this.applicationId||"","X-Firebase-AppCheck":this.appCheckToken||""}};this.mySock=new xn(this.connURL,[],o)}}catch(l){this.log_("Error instantiating WebSocket.");var u=l.message||l.data;u&&this.log_(u),this.onClosed_();return}this.mySock.onopen=function(){r.log_("Websocket connected."),r.everConnected_=!0},this.mySock.onclose=function(){r.log_("Websocket connection was disconnected."),r.mySock=null,r.onClosed_()},this.mySock.onmessage=function(l){r.handleIncomingFrame(l)},this.mySock.onerror=function(l){r.log_("WebSocket error.  Closing connection.");var c=l.message||l.data;c&&r.log_(c),r.onClosed_()}},t.prototype.start=function(){},t.forceDisallow=function(){t.forceDisallow_=!0},t.isAvailable=function(){var e=!1;if(typeof navigator!="undefined"&&navigator.userAgent){var n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&xn!==null&&!t.forceDisallow_},t.previouslyFailed=function(){return st.isInMemoryStorage||st.get("previous_websocket_failure")===!0},t.prototype.markConnectionHealthy=function(){st.remove("previous_websocket_failure")},t.prototype.appendFrame_=function(e){if(this.frames.push(e),this.frames.length===this.totalFrames){var n=this.frames.join("");this.frames=null;var r=Br(n);this.onMessage(r)}},t.prototype.handleNewFrameCount_=function(e){this.totalFrames=e,this.frames=[]},t.prototype.extractFrameCount_=function(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){var n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e},t.prototype.handleIncomingFrame=function(e){if(this.mySock!==null){var n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{var r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}},t.prototype.send=function(e){this.resetKeepAlive();var n=W(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);var r=ss(n,uf);r.length>1&&this.sendString_(String(r.length));for(var i=0;i<r.length;i++)this.sendString_(r[i])},t.prototype.shutdown_=function(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)},t.prototype.onClosed_=function(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))},t.prototype.close=function(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())},t.prototype.resetKeepAlive=function(){var e=this;clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(function(){e.mySock&&e.sendString_("0"),e.resetKeepAlive()},Math.floor(lf))},t.prototype.sendString_=function(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}},t.responsesRequiredToBeHealthy=2,t.healthyTimeout=3e4,t}();/**
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
 */var cf=function(){function t(e){this.initTransports_(e)}return Object.defineProperty(t,"ALL_TRANSPORTS",{get:function(){return[Jr,lt]},enumerable:!1,configurable:!0}),t.prototype.initTransports_=function(e){var n,r,i=lt&&lt.isAvailable(),o=i&&!lt.previouslyFailed();if(e.webSocketOnly&&(i||Q("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),o=!0),o)this.transports_=[lt];else{var s=this.transports_=[];try{for(var a=te(t.ALL_TRANSPORTS),u=a.next();!u.done;u=a.next()){var l=u.value;l&&l.isAvailable()&&s.push(l)}}catch(c){n={error:c}}finally{try{u&&!u.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}}},t.prototype.initialTransport=function(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")},t.prototype.upgradeTransport=function(){return this.transports_.length>1?this.transports_[1]:null},t}();/**
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
 */var ff=6e4,hf=5e3,df=10*1024,pf=100*1024,Zr="t",Cs="d",vf="s",Is="r",gf="e",Ss="o",Rs="a",ks="n",As="p",_f="h",Ps=function(){function t(e,n,r,i,o,s,a,u,l,c){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=o,this.onMessage_=s,this.onReady_=a,this.onDisconnect_=u,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Yt("c:"+this.id+":"),this.transportManager_=new cf(n),this.log_("Connection created"),this.start_()}return t.prototype.start_=function(){var e=this,n=this.transportManager_.initialTransport();this.conn_=new n(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=n.responsesRequiredToBeHealthy||0;var r=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(function(){e.conn_&&e.conn_.open(r,i)},Math.floor(0));var o=n.healthyTimeout||0;o>0&&(this.healthyTimeout_=Jt(function(){e.healthyTimeout_=null,e.isHealthy_||(e.conn_&&e.conn_.bytesReceived>pf?(e.log_("Connection exceeded healthy timeout but has received "+e.conn_.bytesReceived+" bytes.  Marking connection healthy."),e.isHealthy_=!0,e.conn_.markConnectionHealthy()):e.conn_&&e.conn_.bytesSent>df?e.log_("Connection exceeded healthy timeout but has sent "+e.conn_.bytesSent+" bytes.  Leaving connection alive."):(e.log_("Closing unhealthy connection after timeout."),e.close()))},Math.floor(o)))},t.prototype.nextTransportId_=function(){return"c:"+this.id+":"+this.connectionCount++},t.prototype.disconnReceiver_=function(e){var n=this;return function(r){e===n.conn_?n.onConnectionLost_(r):e===n.secondaryConn_?(n.log_("Secondary connection lost."),n.onSecondaryConnectionLost_()):n.log_("closing an old connection")}},t.prototype.connReceiver_=function(e){var n=this;return function(r){n.state_!==2&&(e===n.rx_?n.onPrimaryMessageReceived_(r):e===n.secondaryConn_?n.onSecondaryMessageReceived_(r):n.log_("message on old connection"))}},t.prototype.sendRequest=function(e){var n={t:"d",d:e};this.sendData_(n)},t.prototype.tryCleanupConnection=function(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)},t.prototype.onSecondaryControl_=function(e){if(Zr in e){var n=e[Zr];n===Rs?this.upgradeIfSecondaryHealthy_():n===Is?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Ss&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}},t.prototype.onSecondaryMessageReceived_=function(e){var n=Xt("t",e),r=Xt("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)},t.prototype.upgradeIfSecondaryHealthy_=function(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:As,d:{}}}))},t.prototype.proceedWithUpgrade_=function(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Rs,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ks,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()},t.prototype.onPrimaryMessageReceived_=function(e){var n=Xt("t",e),r=Xt("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)},t.prototype.onDataMessage_=function(e){this.onPrimaryResponse_(),this.onMessage_(e)},t.prototype.onPrimaryResponse_=function(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))},t.prototype.onControl_=function(e){var n=Xt(Zr,e);if(Cs in e){var r=e[Cs];if(n===_f)this.onHandshake_(r);else if(n===ks){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(var i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===vf?this.onConnectionShutdown_(r):n===Is?this.onReset_(r):n===gf?Hr("Server Error: "+r):n===Ss?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Hr("Unknown control packet command: "+n)}},t.prototype.onHandshake_=function(e){var n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Kr!==r&&Q("Protocol version mismatch detected"),this.tryStartUpgrade_())},t.prototype.tryStartUpgrade_=function(){var e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)},t.prototype.startUpgrade_=function(e){var n=this;this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;var r=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(r,i),Jt(function(){n.secondaryConn_&&(n.log_("Timed out trying to upgrade."),n.secondaryConn_.close())},Math.floor(ff))},t.prototype.onReset_=function(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())},t.prototype.onConnectionEstablished_=function(e,n){var r=this;this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Jt(function(){r.sendPingOnPrimaryIfNecessary_()},Math.floor(hf))},t.prototype.sendPingOnPrimaryIfNecessary_=function(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:As,d:{}}}))},t.prototype.onSecondaryConnectionLost_=function(){var e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()},t.prototype.onConnectionLost_=function(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(st.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()},t.prototype.onConnectionShutdown_=function(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()},t.prototype.sendData_=function(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)},t.prototype.close=function(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))},t.prototype.closeConnections_=function(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)},t}();/**
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
 */var Ns=function(){function t(){}return t.prototype.put=function(e,n,r,i){},t.prototype.merge=function(e,n,r,i){},t.prototype.refreshAuthToken=function(e){},t.prototype.refreshAppCheckToken=function(e){},t.prototype.onDisconnectPut=function(e,n,r){},t.prototype.onDisconnectMerge=function(e,n,r){},t.prototype.onDisconnectCancel=function(e,n){},t.prototype.reportStats=function(e){},t}();/**
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
 */var Os=function(){function t(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}return t.prototype.trigger=function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];if(Array.isArray(this.listeners_[e]))for(var i=q([],ue(this.listeners_[e])),o=0;o<i.length;o++)i[o].callback.apply(i[o].context,n)},t.prototype.on=function(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});var i=this.getInitialEvent(e);i&&n.apply(r,i)},t.prototype.off=function(e,n,r){this.validateEventType_(e);for(var i=this.listeners_[e]||[],o=0;o<i.length;o++)if(i[o].callback===n&&(!r||r===i[o].context)){i.splice(o,1);return}},t.prototype.validateEventType_=function(e){_(this.allowedEvents_.find(function(n){return n===e}),"Unknown event: "+e)},t}();/**
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
 */var Ms=function(t){x(e,t);function e(){var n=t.call(this,["online"])||this;return n.online_=!0,typeof window!="undefined"&&typeof window.addEventListener!="undefined"&&!Ko()&&(window.addEventListener("online",function(){n.online_||(n.online_=!0,n.trigger("online",!0))},!1),window.addEventListener("offline",function(){n.online_&&(n.online_=!1,n.trigger("online",!1))},!1)),n}return e.getInstance=function(){return new e},e.prototype.getInitialEvent=function(n){return _(n==="online","Unknown event type: "+n),[this.online_]},e.prototype.currentlyOnline=function(){return this.online_},e}(Os);/**
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
 */var xs=32,Ds=768,A=function(){function t(e,n){if(n===void 0){this.pieces_=e.split("/");for(var r=0,i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}return t.prototype.toString=function(){for(var e="",n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"},t}();function k(){return new A("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ze(t){return t.pieces_.length-t.pieceNum_}function O(t){var e=t.pieceNum_;return e<t.pieces_.length&&e++,new A(t.pieces_,e)}function ei(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function mf(t){for(var e="",n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function en(t,e){return e===void 0&&(e=0),t.pieces_.slice(t.pieceNum_+e)}function Ls(t){if(t.pieceNum_>=t.pieces_.length)return null;for(var e=[],n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new A(e,0)}function D(t,e){for(var n=[],r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof A)for(var r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else for(var i=e.split("/"),r=0;r<i.length;r++)i[r].length>0&&n.push(i[r]);return new A(n,0)}function S(t){return t.pieceNum_>=t.pieces_.length}function ne(t,e){var n=I(t),r=I(e);if(n===null)return e;if(n===r)return ne(O(t),O(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function yf(t,e){for(var n=en(t,0),r=en(e,0),i=0;i<n.length&&i<r.length;i++){var o=ut(n[i],r[i]);if(o!==0)return o}return n.length===r.length?0:n.length<r.length?-1:1}function ti(t,e){if(ze(t)!==ze(e))return!1;for(var n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function de(t,e){var n=t.pieceNum_,r=e.pieceNum_;if(ze(t)>ze(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}var bf=function(){function t(e,n){this.errorPrefix_=n,this.parts_=en(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(var r=0;r<this.parts_.length;r++)this.byteLength_+=Nn(this.parts_[r]);Fs(this)}return t}();function Tf(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Nn(e),Fs(t)}function wf(t){var e=t.parts_.pop();t.byteLength_-=Nn(e),t.parts_.length>0&&(t.byteLength_-=1)}function Fs(t){if(t.byteLength_>Ds)throw new Error(t.errorPrefix_+"has a key path longer than "+Ds+" bytes ("+t.byteLength_+").");if(t.parts_.length>xs)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+xs+") or object contains a cycle "+ct(t))}function ct(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */var Ef=function(t){x(e,t);function e(){var n=t.call(this,["visible"])||this,r,i;return typeof document!="undefined"&&typeof document.addEventListener!="undefined"&&(typeof document.hidden!="undefined"?(i="visibilitychange",r="hidden"):typeof document.mozHidden!="undefined"?(i="mozvisibilitychange",r="mozHidden"):typeof document.msHidden!="undefined"?(i="msvisibilitychange",r="msHidden"):typeof document.webkitHidden!="undefined"&&(i="webkitvisibilitychange",r="webkitHidden")),n.visible_=!0,i&&document.addEventListener(i,function(){var o=!document[r];o!==n.visible_&&(n.visible_=o,n.trigger("visible",o))},!1),n}return e.getInstance=function(){return new e},e.prototype.getInitialEvent=function(n){return _(n==="visible","Unknown event type: "+n),[this.visible_]},e}(Os);/**
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
 */var tn=1e3,Cf=60*5*1e3,If=3*1e3,Us=30*1e3,Sf=1.3,Rf=3e4,kf="server_kill",Bs=3,ft=function(t){x(e,t);function e(n,r,i,o,s,a,u,l){var c=t.call(this)||this;if(c.repoInfo_=n,c.applicationId_=r,c.onDataUpdate_=i,c.onConnectStatus_=o,c.onServerInfoUpdate_=s,c.authTokenProvider_=a,c.appCheckTokenProvider_=u,c.authOverride_=l,c.id=e.nextPersistentConnectionId_++,c.log_=Yt("p:"+c.id+":"),c.interruptReasons_={},c.listens=new Map,c.outstandingPuts_=[],c.outstandingGets_=[],c.outstandingPutCount_=0,c.outstandingGetCount_=0,c.onDisconnectRequestQueue_=[],c.connected_=!1,c.reconnectDelay_=tn,c.maxReconnectDelay_=Cf,c.securityDebugCallback_=null,c.lastSessionId=null,c.establishConnectionTimer_=null,c.visible_=!1,c.requestCBHash_={},c.requestNumber_=0,c.realtime_=null,c.authToken_=null,c.appCheckToken_=null,c.forceTokenRefresh_=!1,c.invalidAuthTokenCount_=0,c.invalidAppCheckTokenCount_=0,c.firstConnection_=!0,c.lastConnectionAttemptTime_=null,c.lastConnectionEstablishedTime_=null,l&&!$o())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");return Ef.getInstance().on("visible",c.onVisible_,c),n.host.indexOf("fblocal")===-1&&Ms.getInstance().on("online",c.onOnline_,c),c}return e.prototype.sendRequest=function(n,r,i){var o=++this.requestNumber_,s={r:o,a:n,b:r};this.log_(W(s)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),i&&(this.requestCBHash_[o]=i)},e.prototype.get=function(n){var r=this;this.initConnection_();var i=new $,o={p:n._path.toString(),q:n._queryObject},s={action:"g",request:o,onComplete:function(u){var l=u.d;u.s==="ok"?(r.onDataUpdate_(o.p,l,!1,null),i.resolve(l)):i.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;var a=this.outstandingGets_.length-1;return this.connected_||setTimeout(function(){var u=r.outstandingGets_[a];u===void 0||s!==u||(delete r.outstandingGets_[a],r.outstandingGetCount_--,r.outstandingGetCount_===0&&(r.outstandingGets_=[]),r.log_("get "+a+" timed out on connection"),i.reject(new Error("Client is offline.")))},If),this.connected_&&this.sendGet_(a),i.promise},e.prototype.listen=function(n,r,i,o){this.initConnection_();var s=n._queryIdentifier,a=n._path.toString();this.log_("Listen called for "+a+" "+s),this.listens.has(a)||this.listens.set(a,new Map),_(n._queryParams.isDefault()||!n._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(a).has(s),"listen() called twice for same path/queryId.");var u={onComplete:o,hashFn:r,query:n,tag:i};this.listens.get(a).set(s,u),this.connected_&&this.sendListen_(u)},e.prototype.sendGet_=function(n){var r=this,i=this.outstandingGets_[n];this.sendRequest("g",i.request,function(o){delete r.outstandingGets_[n],r.outstandingGetCount_--,r.outstandingGetCount_===0&&(r.outstandingGets_=[]),i.onComplete&&i.onComplete(o)})},e.prototype.sendListen_=function(n){var r=this,i=n.query,o=i._path.toString(),s=i._queryIdentifier;this.log_("Listen on "+o+" for "+s);var a={p:o},u="q";n.tag&&(a.q=i._queryObject,a.t=n.tag),a.h=n.hashFn(),this.sendRequest(u,a,function(l){var c=l.d,f=l.s;e.warnOnListenWarnings_(c,i);var h=r.listens.get(o)&&r.listens.get(o).get(s);h===n&&(r.log_("listen response",l),f!=="ok"&&r.removeListen_(o,s),n.onComplete&&n.onComplete(f,c))})},e.warnOnListenWarnings_=function(n,r){if(n&&typeof n=="object"&&Ee(n,"w")){var i=ot(n,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){var o='".indexOn": "'+r._queryParams.getIndex().toString()+'"',s=r._path.toString();Q("Using an unspecified index. Your data will be downloaded and "+("filtered on the client. Consider adding "+o+" at ")+(s+" to your security rules for better performance."))}}},e.prototype.refreshAuthToken=function(n){this.authToken_=n,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},function(){}),this.reduceReconnectDelayIfAdminCredential_(n)},e.prototype.reduceReconnectDelayIfAdminCredential_=function(n){var r=n&&n.length===40;(r||vc(n))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Us)},e.prototype.refreshAppCheckToken=function(n){this.appCheckToken_=n,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},function(){})},e.prototype.tryAuth=function(){var n=this;if(this.connected_&&this.authToken_){var r=this.authToken_,i=gc(r)?"auth":"gauth",o={cred:r};this.authOverride_===null?o.noauth=!0:typeof this.authOverride_=="object"&&(o.authvar=this.authOverride_),this.sendRequest(i,o,function(s){var a=s.s,u=s.d||"error";n.authToken_===r&&(a==="ok"?n.invalidAuthTokenCount_=0:n.onAuthRevoked_(a,u))})}},e.prototype.tryAppCheck=function(){var n=this;this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},function(r){var i=r.s,o=r.d||"error";i==="ok"?n.invalidAppCheckTokenCount_=0:n.onAppCheckRevoked_(i,o)})},e.prototype.unlisten=function(n,r){var i=n._path.toString(),o=n._queryIdentifier;this.log_("Unlisten called for "+i+" "+o),_(n._queryParams.isDefault()||!n._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");var s=this.removeListen_(i,o);s&&this.connected_&&this.sendUnlisten_(i,o,n._queryObject,r)},e.prototype.sendUnlisten_=function(n,r,i,o){this.log_("Unlisten on "+n+" for "+r);var s={p:n},a="n";o&&(s.q=i,s.t=o),this.sendRequest(a,s)},e.prototype.onDisconnectPut=function(n,r,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",n,r,i):this.onDisconnectRequestQueue_.push({pathString:n,action:"o",data:r,onComplete:i})},e.prototype.onDisconnectMerge=function(n,r,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",n,r,i):this.onDisconnectRequestQueue_.push({pathString:n,action:"om",data:r,onComplete:i})},e.prototype.onDisconnectCancel=function(n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",n,null,r):this.onDisconnectRequestQueue_.push({pathString:n,action:"oc",data:null,onComplete:r})},e.prototype.sendOnDisconnect_=function(n,r,i,o){var s={p:r,d:i};this.log_("onDisconnect "+n,s),this.sendRequest(n,s,function(a){o&&setTimeout(function(){o(a.s,a.d)},Math.floor(0))})},e.prototype.put=function(n,r,i,o){this.putInternal("p",n,r,i,o)},e.prototype.merge=function(n,r,i,o){this.putInternal("m",n,r,i,o)},e.prototype.putInternal=function(n,r,i,o,s){this.initConnection_();var a={p:r,d:i};s!==void 0&&(a.h=s),this.outstandingPuts_.push({action:n,request:a,onComplete:o}),this.outstandingPutCount_++;var u=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(u):this.log_("Buffering put: "+r)},e.prototype.sendPut_=function(n){var r=this,i=this.outstandingPuts_[n].action,o=this.outstandingPuts_[n].request,s=this.outstandingPuts_[n].onComplete;this.outstandingPuts_[n].queued=this.connected_,this.sendRequest(i,o,function(a){r.log_(i+" response",a),delete r.outstandingPuts_[n],r.outstandingPutCount_--,r.outstandingPutCount_===0&&(r.outstandingPuts_=[]),s&&s(a.s,a.d)})},e.prototype.reportStats=function(n){var r=this;if(this.connected_){var i={c:n};this.log_("reportStats",i),this.sendRequest("s",i,function(o){var s=o.s;if(s!=="ok"){var a=o.d;r.log_("reportStats","Error sending stats: "+a)}})}},e.prototype.onDataMessage_=function(n){if("r"in n){this.log_("from server: "+W(n));var r=n.r,i=this.requestCBHash_[r];i&&(delete this.requestCBHash_[r],i(n.b))}else{if("error"in n)throw"A server-side error has occurred: "+n.error;"a"in n&&this.onDataPush_(n.a,n.b)}},e.prototype.onDataPush_=function(n,r){this.log_("handleServerMessage",n,r),n==="d"?this.onDataUpdate_(r.p,r.d,!1,r.t):n==="m"?this.onDataUpdate_(r.p,r.d,!0,r.t):n==="c"?this.onListenRevoked_(r.p,r.q):n==="ac"?this.onAuthRevoked_(r.s,r.d):n==="apc"?this.onAppCheckRevoked_(r.s,r.d):n==="sd"?this.onSecurityDebugPacket_(r):Hr("Unrecognized action received from server: "+W(n)+`
Are you using the latest client?`)},e.prototype.onReady_=function(n,r){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(n),this.lastSessionId=r,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)},e.prototype.scheduleConnect_=function(n){var r=this;_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(function(){r.establishConnectionTimer_=null,r.establishConnection_()},Math.floor(n))},e.prototype.initConnection_=function(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)},e.prototype.onVisible_=function(n){n&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=tn,this.realtime_||this.scheduleConnect_(0)),this.visible_=n},e.prototype.onOnline_=function(n){n?(this.log_("Browser went online."),this.reconnectDelay_=tn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())},e.prototype.onRealtimeDisconnect_=function(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(!this.visible_)this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime();else if(this.lastConnectionEstablishedTime_){var n=new Date().getTime()-this.lastConnectionEstablishedTime_;n>Rf&&(this.reconnectDelay_=tn),this.lastConnectionEstablishedTime_=null}var r=new Date().getTime()-this.lastConnectionAttemptTime_,i=Math.max(0,this.reconnectDelay_-r);i=Math.random()*i,this.log_("Trying to reconnect in "+i+"ms"),this.scheduleConnect_(i),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Sf)}this.onConnectStatus_(!1)},e.prototype.establishConnection_=function(){return v(this,void 0,void 0,function(){var n,r,i,o,s,a,u,l,c,f,h,d,p,m,y=this;return g(this,function(b){switch(b.label){case 0:if(!this.shouldReconnect_())return[3,4];this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null,n=this.onDataMessage_.bind(this),r=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),o=this.id+":"+e.nextConnectionId_++,s=this.lastSessionId,a=!1,u=null,l=function(){u?u.close():(a=!0,i())},c=function(C){_(u,"sendRequest call when we're not connected not allowed."),u.sendRequest(C)},this.realtime_={close:l,sendRequest:c},f=this.forceTokenRefresh_,this.forceTokenRefresh_=!1,b.label=1;case 1:return b.trys.push([1,3,,4]),[4,Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)])];case 2:return h=ue.apply(void 0,[b.sent(),2]),d=h[0],p=h[1],a?K("getToken() completed but was canceled"):(K("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,u=new Ps(o,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,n,r,i,function(C){Q(C+" ("+y.repoInfo_.toString()+")"),y.interrupt(kf)},s)),[3,4];case 3:return m=b.sent(),this.log_("Failed to get token: "+m),a||(this.repoInfo_.nodeAdmin&&Q(m),l()),[3,4];case 4:return[2]}})})},e.prototype.interrupt=function(n){K("Interrupting connection for reason: "+n),this.interruptReasons_[n]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())},e.prototype.resume=function(n){K("Resuming connection for reason: "+n),delete this.interruptReasons_[n],Ur(this.interruptReasons_)&&(this.reconnectDelay_=tn,this.realtime_||this.scheduleConnect_(0))},e.prototype.handleTimestamp_=function(n){var r=n-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:r})},e.prototype.cancelSentTransactions_=function(){for(var n=0;n<this.outstandingPuts_.length;n++){var r=this.outstandingPuts_[n];r&&"h"in r.request&&r.queued&&(r.onComplete&&r.onComplete("disconnect"),delete this.outstandingPuts_[n],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])},e.prototype.onListenRevoked_=function(n,r){var i;r?i=r.map(function(s){return Gr(s)}).join("$"):i="default";var o=this.removeListen_(n,i);o&&o.onComplete&&o.onComplete("permission_denied")},e.prototype.removeListen_=function(n,r){var i=new A(n).toString(),o;if(this.listens.has(i)){var s=this.listens.get(i);o=s.get(r),s.delete(r),s.size===0&&this.listens.delete(i)}else o=void 0;return o},e.prototype.onAuthRevoked_=function(n,r){K("Auth token revoked: "+n+"/"+r),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(n==="invalid_token"||n==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Bs&&(this.reconnectDelay_=Us,this.authTokenProvider_.notifyForInvalidToken()))},e.prototype.onAppCheckRevoked_=function(n,r){K("App check token revoked: "+n+"/"+r),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(n==="invalid_token"||n==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Bs&&this.appCheckTokenProvider_.notifyForInvalidToken())},e.prototype.onSecurityDebugPacket_=function(n){this.securityDebugCallback_?this.securityDebugCallback_(n):"msg"in n&&console.log("FIREBASE: "+n.msg.replace(`
`,`
FIREBASE: `))},e.prototype.restoreState_=function(){var n,r,i,o;this.tryAuth(),this.tryAppCheck();try{for(var s=te(this.listens.values()),a=s.next();!a.done;a=s.next()){var u=a.value;try{for(var l=(i=void 0,te(u.values())),c=l.next();!c.done;c=l.next()){var f=c.value;this.sendListen_(f)}}catch(p){i={error:p}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}}}catch(p){n={error:p}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}for(var h=0;h<this.outstandingPuts_.length;h++)this.outstandingPuts_[h]&&this.sendPut_(h);for(;this.onDisconnectRequestQueue_.length;){var d=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(d.action,d.pathString,d.data,d.onComplete)}for(var h=0;h<this.outstandingGets_.length;h++)this.outstandingGets_[h]&&this.sendGet_(h)},e.prototype.sendConnectStats_=function(){var n={},r="js";n["sdk."+r+"."+Zo.replace(/\./g,"-")]=1,Ko()?n["framework.cordova"]=1:_c()&&(n["framework.reactnative"]=1),this.reportStats(n)},e.prototype.shouldReconnect_=function(){var n=Ms.getInstance().currentlyOnline();return Ur(this.interruptReasons_)&&n},e.nextPersistentConnectionId_=0,e.nextConnectionId_=0,e}(Ns);/**
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
 */var R=function(){function t(e,n){this.name=e,this.node=n}return t.Wrap=function(e,n){return new t(e,n)},t}();/**
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
 */var Dn=function(){function t(){}return t.prototype.getCompare=function(){return this.compare.bind(this)},t.prototype.indexedValueChanged=function(e,n){var r=new R(Ue,e),i=new R(Ue,n);return this.compare(r,i)!==0},t.prototype.minPost=function(){return R.MIN},t}();/**
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
 */var Ln,Ws=function(t){x(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return Object.defineProperty(e,"__EMPTY_NODE",{get:function(){return Ln},set:function(n){Ln=n},enumerable:!1,configurable:!0}),e.prototype.compare=function(n,r){return ut(n.name,r.name)},e.prototype.isDefinedOn=function(n){throw qt("KeyIndex.isDefinedOn not expected to be called.")},e.prototype.indexedValueChanged=function(n,r){return!1},e.prototype.minPost=function(){return R.MIN},e.prototype.maxPost=function(){return new R(Ne,Ln)},e.prototype.makePost=function(n,r){return _(typeof n=="string","KeyIndex indexValue must always be a string."),new R(n,Ln)},e.prototype.toString=function(){return".key"},e}(Dn),Oe=new Ws;/**
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
 */var Fn=function(){function t(e,n,r,i,o){o===void 0&&(o=null),this.isReverse_=i,this.resultGenerator_=o,this.nodeStack_=[];for(var s=1;!e.isEmpty();)if(e=e,s=n?r(e.key,n):1,i&&(s*=-1),s<0)this.isReverse_?e=e.left:e=e.right;else if(s===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}return t.prototype.getNext=function(){if(this.nodeStack_.length===0)return null;var e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n},t.prototype.hasNext=function(){return this.nodeStack_.length>0},t.prototype.peek=function(){if(this.nodeStack_.length===0)return null;var e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}},t}(),Ce=function(){function t(e,n,r,i,o){this.key=e,this.value=n,this.color=r!=null?r:t.RED,this.left=i!=null?i:Be.EMPTY_NODE,this.right=o!=null?o:Be.EMPTY_NODE}return t.prototype.copy=function(e,n,r,i,o){return new t(e!=null?e:this.key,n!=null?n:this.value,r!=null?r:this.color,i!=null?i:this.left,o!=null?o:this.right)},t.prototype.count=function(){return this.left.count()+1+this.right.count()},t.prototype.isEmpty=function(){return!1},t.prototype.inorderTraversal=function(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)},t.prototype.reverseTraversal=function(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)},t.prototype.min_=function(){return this.left.isEmpty()?this:this.left.min_()},t.prototype.minKey=function(){return this.min_().key},t.prototype.maxKey=function(){return this.right.isEmpty()?this.key:this.right.maxKey()},t.prototype.insert=function(e,n,r){var i=this,o=r(e,i.key);return o<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):o===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()},t.prototype.removeMin_=function(){if(this.left.isEmpty())return Be.EMPTY_NODE;var e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()},t.prototype.remove=function(e,n){var r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Be.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()},t.prototype.isRed_=function(){return this.color},t.prototype.fixUp_=function(){var e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e},t.prototype.moveRedLeft_=function(){var e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e},t.prototype.moveRedRight_=function(){var e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e},t.prototype.rotateLeft_=function(){var e=this.copy(null,null,t.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)},t.prototype.rotateRight_=function(){var e=this.copy(null,null,t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)},t.prototype.colorFlip_=function(){var e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)},t.prototype.checkMaxDepth_=function(){var e=this.check_();return Math.pow(2,e)<=this.count()+1},t.prototype.check_=function(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");var e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)},t.RED=!0,t.BLACK=!1,t}(),Af=function(){function t(){}return t.prototype.copy=function(e,n,r,i,o){return this},t.prototype.insert=function(e,n,r){return new Ce(e,n,null)},t.prototype.remove=function(e,n){return this},t.prototype.count=function(){return 0},t.prototype.isEmpty=function(){return!0},t.prototype.inorderTraversal=function(e){return!1},t.prototype.reverseTraversal=function(e){return!1},t.prototype.minKey=function(){return null},t.prototype.maxKey=function(){return null},t.prototype.check_=function(){return 0},t.prototype.isRed_=function(){return!1},t}(),Be=function(){function t(e,n){n===void 0&&(n=t.EMPTY_NODE),this.comparator_=e,this.root_=n}return t.prototype.insert=function(e,n){return new t(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ce.BLACK,null,null))},t.prototype.remove=function(e){return new t(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ce.BLACK,null,null))},t.prototype.get=function(e){for(var n,r=this.root_;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null},t.prototype.getPredecessorKey=function(e){for(var n,r=this.root_,i=null;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")},t.prototype.isEmpty=function(){return this.root_.isEmpty()},t.prototype.count=function(){return this.root_.count()},t.prototype.minKey=function(){return this.root_.minKey()},t.prototype.maxKey=function(){return this.root_.maxKey()},t.prototype.inorderTraversal=function(e){return this.root_.inorderTraversal(e)},t.prototype.reverseTraversal=function(e){return this.root_.reverseTraversal(e)},t.prototype.getIterator=function(e){return new Fn(this.root_,null,this.comparator_,!1,e)},t.prototype.getIteratorFrom=function(e,n){return new Fn(this.root_,e,this.comparator_,!1,n)},t.prototype.getReverseIteratorFrom=function(e,n){return new Fn(this.root_,e,this.comparator_,!0,n)},t.prototype.getReverseIterator=function(e){return new Fn(this.root_,null,this.comparator_,!0,e)},t.EMPTY_NODE=new Af,t}();/**
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
 */function Pf(t,e){return ut(t.name,e.name)}function ni(t,e){return ut(t,e)}/**
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
 */var ri;function Nf(t){ri=t}var js=function(t){return typeof t=="number"?"number:"+as(t):"string:"+t},Vs=function(t){if(t.isLeafNode()){var e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ee(e,".sv"),"Priority must be a string or number.")}else _(t===ri||t.isEmpty(),"priority of unexpected type.");_(t===ri||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */var Hs,kt=function(){function t(e,n){n===void 0&&(n=t.__childrenNodeConstructor.EMPTY_NODE),this.value_=e,this.priorityNode_=n,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Vs(this.priorityNode_)}return Object.defineProperty(t,"__childrenNodeConstructor",{get:function(){return Hs},set:function(e){Hs=e},enumerable:!1,configurable:!0}),t.prototype.isLeafNode=function(){return!0},t.prototype.getPriority=function(){return this.priorityNode_},t.prototype.updatePriority=function(e){return new t(this.value_,e)},t.prototype.getImmediateChild=function(e){return e===".priority"?this.priorityNode_:t.__childrenNodeConstructor.EMPTY_NODE},t.prototype.getChild=function(e){return S(e)?this:I(e)===".priority"?this.priorityNode_:t.__childrenNodeConstructor.EMPTY_NODE},t.prototype.hasChild=function(){return!1},t.prototype.getPredecessorChildName=function(e,n){return null},t.prototype.updateImmediateChild=function(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:t.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)},t.prototype.updateChild=function(e,n){var r=I(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(_(r!==".priority"||ze(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,t.__childrenNodeConstructor.EMPTY_NODE.updateChild(O(e),n)))},t.prototype.isEmpty=function(){return!1},t.prototype.numChildren=function(){return 0},t.prototype.forEachChild=function(e,n){return!1},t.prototype.val=function(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()},t.prototype.hash=function(){if(this.lazyHash_===null){var e="";this.priorityNode_.isEmpty()||(e+="priority:"+js(this.priorityNode_.val())+":");var n=typeof this.value_;e+=n+":",n==="number"?e+=as(this.value_):e+=this.value_,this.lazyHash_=rs(e)}return this.lazyHash_},t.prototype.getValue=function(){return this.value_},t.prototype.compareTo=function(e){return e===t.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof t.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))},t.prototype.compareToLeafNode_=function(e){var n=typeof e.value_,r=typeof this.value_,i=t.VALUE_TYPE_ORDER.indexOf(n),o=t.VALUE_TYPE_ORDER.indexOf(r);return _(i>=0,"Unknown leaf type: "+n),_(o>=0,"Unknown leaf type: "+r),i===o?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-i},t.prototype.withIndex=function(){return this},t.prototype.isIndexed=function(){return!0},t.prototype.equals=function(e){if(e===this)return!0;if(e.isLeafNode()){var n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1},t.VALUE_TYPE_ORDER=["object","boolean","number","string"],t}();/**
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
 */var Gs,qs;function Of(t){Gs=t}function Mf(t){qs=t}var xf=function(t){x(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.compare=function(n,r){var i=n.node.getPriority(),o=r.node.getPriority(),s=i.compareTo(o);return s===0?ut(n.name,r.name):s},e.prototype.isDefinedOn=function(n){return!n.getPriority().isEmpty()},e.prototype.indexedValueChanged=function(n,r){return!n.getPriority().equals(r.getPriority())},e.prototype.minPost=function(){return R.MIN},e.prototype.maxPost=function(){return new R(Ne,new kt("[PRIORITY-POST]",qs))},e.prototype.makePost=function(n,r){var i=Gs(n);return new R(r,new kt("[PRIORITY-POST]",i))},e.prototype.toString=function(){return".priority"},e}(Dn),M=new xf;/**
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
 */var Df=Math.log(2),Lf=function(){function t(e){var n=function(o){return parseInt(Math.log(o)/Df,10)},r=function(o){return parseInt(Array(o+1).join("1"),2)};this.count=n(e+1),this.current_=this.count-1;var i=r(this.count);this.bits_=e+1&i}return t.prototype.nextBitIsOne=function(){var e=!(this.bits_&1<<this.current_);return this.current_--,e},t}(),Un=function(t,e,n,r){t.sort(e);var i=function(u,l){var c=l-u,f,h;if(c===0)return null;if(c===1)return f=t[u],h=n?n(f):f,new Ce(h,f.node,Ce.BLACK,null,null);var d=parseInt(c/2,10)+u,p=i(u,d),m=i(d+1,l);return f=t[d],h=n?n(f):f,new Ce(h,f.node,Ce.BLACK,p,m)},o=function(u){for(var l=null,c=null,f=t.length,h=function(b,C){var N=f-b,z=f;f-=b;var L=i(N+1,z),Te=t[N],it=n?n(Te):Te;d(new Ce(it,Te.node,C,null,L))},d=function(b){l?(l.left=b,l=b):(c=b,l=b)},p=0;p<u.count;++p){var m=u.nextBitIsOne(),y=Math.pow(2,u.count-(p+1));m?h(y,Ce.BLACK):(h(y,Ce.BLACK),h(y,Ce.RED))}return c},s=new Lf(t.length),a=o(s);return new Be(r||e,a)};/**
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
 */var ii,At={},Bn=function(){function t(e,n){this.indexes_=e,this.indexSet_=n}return Object.defineProperty(t,"Default",{get:function(){return _(At&&M,"ChildrenNode.ts has not been loaded"),ii=ii||new t({".priority":At},{".priority":M}),ii},enumerable:!1,configurable:!0}),t.prototype.get=function(e){var n=ot(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Be?n:null},t.prototype.hasIndex=function(e){return Ee(this.indexSet_,e.toString())},t.prototype.addIndex=function(e,n){_(e!==Oe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var r=[],i=!1,o=n.getIterator(R.Wrap),s=o.getNext();s;)i=i||e.isDefinedOn(s.node),r.push(s),s=o.getNext();var a;i?a=Un(r,e.getCompare()):a=At;var u=e.toString(),l=w({},this.indexSet_);l[u]=e;var c=w({},this.indexes_);return c[u]=a,new t(c,l)},t.prototype.addToIndexes=function(e,n){var r=this,i=Pn(this.indexes_,function(o,s){var a=ot(r.indexSet_,s);if(_(a,"Missing index implementation for "+s),o===At)if(a.isDefinedOn(e.node)){for(var u=[],l=n.getIterator(R.Wrap),c=l.getNext();c;)c.name!==e.name&&u.push(c),c=l.getNext();return u.push(e),Un(u,a.getCompare())}else return At;else{var f=n.get(e.name),h=o;return f&&(h=h.remove(new R(e.name,f))),h.insert(e,e.node)}});return new t(i,this.indexSet_)},t.prototype.removeFromIndexes=function(e,n){var r=Pn(this.indexes_,function(i){if(i===At)return i;var o=n.get(e.name);return o?i.remove(new R(e.name,o)):i});return new t(r,this.indexSet_)},t}();/**
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
 */var nn,E=function(){function t(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Vs(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}return Object.defineProperty(t,"EMPTY_NODE",{get:function(){return nn||(nn=new t(new Be(ni),null,Bn.Default))},enumerable:!1,configurable:!0}),t.prototype.isLeafNode=function(){return!1},t.prototype.getPriority=function(){return this.priorityNode_||nn},t.prototype.updatePriority=function(e){return this.children_.isEmpty()?this:new t(this.children_,e,this.indexMap_)},t.prototype.getImmediateChild=function(e){if(e===".priority")return this.getPriority();var n=this.children_.get(e);return n===null?nn:n},t.prototype.getChild=function(e){var n=I(e);return n===null?this:this.getImmediateChild(n).getChild(O(e))},t.prototype.hasChild=function(e){return this.children_.get(e)!==null},t.prototype.updateImmediateChild=function(e,n){if(_(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);var r=new R(e,n),i=void 0,o=void 0;n.isEmpty()?(i=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),o=this.indexMap_.addToIndexes(r,this.children_));var s=i.isEmpty()?nn:this.priorityNode_;return new t(i,s,o)},t.prototype.updateChild=function(e,n){var r=I(e);if(r===null)return n;_(I(e)!==".priority"||ze(e)===1,".priority must be the last token in a path");var i=this.getImmediateChild(r).updateChild(O(e),n);return this.updateImmediateChild(r,i)},t.prototype.isEmpty=function(){return this.children_.isEmpty()},t.prototype.numChildren=function(){return this.children_.count()},t.prototype.val=function(e){if(this.isEmpty())return null;var n={},r=0,i=0,o=!0;if(this.forEachChild(M,function(u,l){n[u]=l.val(e),r++,o&&t.INTEGER_REGEXP_.test(u)?i=Math.max(i,Number(u)):o=!1}),!e&&o&&i<2*r){var s=[];for(var a in n)s[a]=n[a];return s}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n},t.prototype.hash=function(){if(this.lazyHash_===null){var e="";this.getPriority().isEmpty()||(e+="priority:"+js(this.getPriority().val())+":"),this.forEachChild(M,function(n,r){var i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":rs(e)}return this.lazyHash_},t.prototype.getPredecessorChildName=function(e,n,r){var i=this.resolveIndex_(r);if(i){var o=i.getPredecessorKey(new R(e,n));return o?o.name:null}else return this.children_.getPredecessorKey(e)},t.prototype.getFirstChildName=function(e){var n=this.resolveIndex_(e);if(n){var r=n.minKey();return r&&r.name}else return this.children_.minKey()},t.prototype.getFirstChild=function(e){var n=this.getFirstChildName(e);return n?new R(n,this.children_.get(n)):null},t.prototype.getLastChildName=function(e){var n=this.resolveIndex_(e);if(n){var r=n.maxKey();return r&&r.name}else return this.children_.maxKey()},t.prototype.getLastChild=function(e){var n=this.getLastChildName(e);return n?new R(n,this.children_.get(n)):null},t.prototype.forEachChild=function(e,n){var r=this.resolveIndex_(e);return r?r.inorderTraversal(function(i){return n(i.name,i.node)}):this.children_.inorderTraversal(n)},t.prototype.getIterator=function(e){return this.getIteratorFrom(e.minPost(),e)},t.prototype.getIteratorFrom=function(e,n){var r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,function(s){return s});for(var i=this.children_.getIteratorFrom(e.name,R.Wrap),o=i.peek();o!=null&&n.compare(o,e)<0;)i.getNext(),o=i.peek();return i},t.prototype.getReverseIterator=function(e){return this.getReverseIteratorFrom(e.maxPost(),e)},t.prototype.getReverseIteratorFrom=function(e,n){var r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,function(s){return s});for(var i=this.children_.getReverseIteratorFrom(e.name,R.Wrap),o=i.peek();o!=null&&n.compare(o,e)>0;)i.getNext(),o=i.peek();return i},t.prototype.compareTo=function(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===rn?-1:0},t.prototype.withIndex=function(e){if(e===Oe||this.indexMap_.hasIndex(e))return this;var n=this.indexMap_.addIndex(e,this.children_);return new t(this.children_,this.priorityNode_,n)},t.prototype.isIndexed=function(e){return e===Oe||this.indexMap_.hasIndex(e)},t.prototype.equals=function(e){if(e===this)return!0;if(e.isLeafNode())return!1;var n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){for(var r=this.getIterator(M),i=n.getIterator(M),o=r.getNext(),s=i.getNext();o&&s;){if(o.name!==s.name||!o.node.equals(s.node))return!1;o=r.getNext(),s=i.getNext()}return o===null&&s===null}else return!1;else return!1},t.prototype.resolveIndex_=function(e){return e===Oe?null:this.indexMap_.get(e.toString())},t.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/,t}(),Ff=function(t){x(e,t);function e(){return t.call(this,new Be(ni),E.EMPTY_NODE,Bn.Default)||this}return e.prototype.compareTo=function(n){return n===this?0:1},e.prototype.equals=function(n){return n===this},e.prototype.getPriority=function(){return this},e.prototype.getImmediateChild=function(n){return E.EMPTY_NODE},e.prototype.isEmpty=function(){return!1},e}(E),rn=new Ff;Object.defineProperties(R,{MIN:{value:new R(Ue,E.EMPTY_NODE)},MAX:{value:new R(Ne,rn)}});Ws.__EMPTY_NODE=E.EMPTY_NODE;kt.__childrenNodeConstructor=E;Nf(rn);Mf(rn);/**
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
 */var Uf=!0;function F(t,e){if(e===void 0&&(e=null),t===null)return E.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){var n=t;return new kt(n,F(e))}if(!(t instanceof Array)&&Uf){var r=[],i=!1,o=t;if(j(o,function(l,c){if(l.substring(0,1)!=="."){var f=F(c);f.isEmpty()||(i=i||!f.getPriority().isEmpty(),r.push(new R(l,f)))}}),r.length===0)return E.EMPTY_NODE;var s=Un(r,Pf,function(l){return l.name},ni);if(i){var a=Un(r,M.getCompare());return new E(s,F(e),new Bn({".priority":a},{".priority":M}))}else return new E(s,F(e),Bn.Default)}else{var u=E.EMPTY_NODE;return j(t,function(l,c){if(Ee(t,l)&&l.substring(0,1)!=="."){var f=F(c);(f.isLeafNode()||!f.isEmpty())&&(u=u.updateImmediateChild(l,f))}}),u.updatePriority(F(e))}}Of(F);/**
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
 */var oi=function(t){x(e,t);function e(n){var r=t.call(this)||this;return r.indexPath_=n,_(!S(n)&&I(n)!==".priority","Can't create PathIndex with empty path or .priority key"),r}return e.prototype.extractChild=function(n){return n.getChild(this.indexPath_)},e.prototype.isDefinedOn=function(n){return!n.getChild(this.indexPath_).isEmpty()},e.prototype.compare=function(n,r){var i=this.extractChild(n.node),o=this.extractChild(r.node),s=i.compareTo(o);return s===0?ut(n.name,r.name):s},e.prototype.makePost=function(n,r){var i=F(n),o=E.EMPTY_NODE.updateChild(this.indexPath_,i);return new R(r,o)},e.prototype.maxPost=function(){var n=E.EMPTY_NODE.updateChild(this.indexPath_,rn);return new R(Ne,n)},e.prototype.toString=function(){return en(this.indexPath_,0).join("/")},e}(Dn);/**
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
 */var Bf=function(t){x(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.compare=function(n,r){var i=n.node.compareTo(r.node);return i===0?ut(n.name,r.name):i},e.prototype.isDefinedOn=function(n){return!0},e.prototype.indexedValueChanged=function(n,r){return!n.equals(r)},e.prototype.minPost=function(){return R.MIN},e.prototype.maxPost=function(){return R.MAX},e.prototype.makePost=function(n,r){var i=F(n);return new R(r,i)},e.prototype.toString=function(){return".value"},e}(Dn),si=new Bf;/**
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
 */var Pt="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ai="-",Ks="z",zs=786,Wf=function(){var t=0,e=[];return function(n){var r=n===t;t=n;var i,o=new Array(8);for(i=7;i>=0;i--)o[i]=Pt.charAt(n%64),n=Math.floor(n/64);_(n===0,"Cannot push at time == 0");var s=o.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)s+=Pt.charAt(e[i]);return _(s.length===20,"nextPushId: Length should be 20."),s}}(),$s=function(t){if(t===""+qr)return ai;var e=Mn(t);if(e!=null)return""+(e+1);for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t.charAt(r);if(n.length<zs)return n.push(ai),n.join("");for(var i=n.length-1;i>=0&&n[i]===Ks;)i--;if(i===-1)return Ne;var o=n[i],s=Pt.charAt(Pt.indexOf(o)+1);return n[i]=s,n.slice(0,i+1).join("")},Qs=function(t){if(t===""+us)return Ue;var e=Mn(t);if(e!=null)return""+(e-1);for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t.charAt(r);return n[n.length-1]===ai?n.length===1?""+qr:(delete n[n.length-1],n.join("")):(n[n.length-1]=Pt.charAt(Pt.indexOf(n[n.length-1])-1),n.join("")+Ks.repeat(zs-n.length))};/**
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
 */function Ys(t){return{type:"value",snapshotNode:t}}function Nt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function on(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function sn(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function jf(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */var ui=function(){function t(e){this.index_=e}return t.prototype.updateChild=function(e,n,r,i,o,s){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");var a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(s!=null&&(r.isEmpty()?e.hasChild(n)?s.trackChildChange(on(n,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?s.trackChildChange(Nt(n,r)):s.trackChildChange(sn(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)},t.prototype.updateFullNode=function(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(M,function(i,o){n.hasChild(i)||r.trackChildChange(on(i,o))}),n.isLeafNode()||n.forEachChild(M,function(i,o){if(e.hasChild(i)){var s=e.getImmediateChild(i);s.equals(o)||r.trackChildChange(sn(i,o,s))}else r.trackChildChange(Nt(i,o))})),n.withIndex(this.index_)},t.prototype.updatePriority=function(e,n){return e.isEmpty()?E.EMPTY_NODE:e.updatePriority(n)},t.prototype.filtersNodes=function(){return!1},t.prototype.getIndexedFilter=function(){return this},t.prototype.getIndex=function(){return this.index_},t}();/**
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
 */var Xs=function(){function t(e){this.indexedFilter_=new ui(e.getIndex()),this.index_=e.getIndex(),this.startPost_=t.getStartPost_(e),this.endPost_=t.getEndPost_(e)}return t.prototype.getStartPost=function(){return this.startPost_},t.prototype.getEndPost=function(){return this.endPost_},t.prototype.matches=function(e){return this.index_.compare(this.getStartPost(),e)<=0&&this.index_.compare(e,this.getEndPost())<=0},t.prototype.updateChild=function(e,n,r,i,o,s){return this.matches(new R(n,r))||(r=E.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,o,s)},t.prototype.updateFullNode=function(e,n,r){n.isLeafNode()&&(n=E.EMPTY_NODE);var i=n.withIndex(this.index_);i=i.updatePriority(E.EMPTY_NODE);var o=this;return n.forEachChild(M,function(s,a){o.matches(new R(s,a))||(i=i.updateImmediateChild(s,E.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)},t.prototype.updatePriority=function(e,n){return e},t.prototype.filtersNodes=function(){return!0},t.prototype.getIndexedFilter=function(){return this.indexedFilter_},t.prototype.getIndex=function(){return this.index_},t.getStartPost_=function(e){if(e.hasStart()){var n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()},t.getEndPost_=function(e){if(e.hasEnd()){var n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()},t}();/**
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
 */var Vf=function(){function t(e){this.rangedFilter_=new Xs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft()}return t.prototype.updateChild=function(e,n,r,i,o,s){return this.rangedFilter_.matches(new R(n,r))||(r=E.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,o,s):this.fullLimitUpdateChild_(e,n,r,o,s)},t.prototype.updateFullNode=function(e,n,r){var i;if(n.isLeafNode()||n.isEmpty())i=E.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=E.EMPTY_NODE.withIndex(this.index_);var o=void 0;this.reverse_?o=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);for(var s=0;o.hasNext()&&s<this.limit_;){var a=o.getNext(),u=void 0;if(this.reverse_?u=this.index_.compare(this.rangedFilter_.getStartPost(),a)<=0:u=this.index_.compare(a,this.rangedFilter_.getEndPost())<=0,u)i=i.updateImmediateChild(a.name,a.node),s++;else break}}else{i=n.withIndex(this.index_),i=i.updatePriority(E.EMPTY_NODE);var l=void 0,c=void 0,f=void 0,o=void 0;if(this.reverse_){o=i.getReverseIterator(this.index_),l=this.rangedFilter_.getEndPost(),c=this.rangedFilter_.getStartPost();var h=this.index_.getCompare();f=function(y,b){return h(b,y)}}else o=i.getIterator(this.index_),l=this.rangedFilter_.getStartPost(),c=this.rangedFilter_.getEndPost(),f=this.index_.getCompare();for(var s=0,d=!1;o.hasNext();){var a=o.getNext();!d&&f(l,a)<=0&&(d=!0);var u=d&&s<this.limit_&&f(a,c)<=0;u?s++:i=i.updateImmediateChild(a.name,E.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)},t.prototype.updatePriority=function(e,n){return e},t.prototype.filtersNodes=function(){return!0},t.prototype.getIndexedFilter=function(){return this.rangedFilter_.getIndexedFilter()},t.prototype.getIndex=function(){return this.index_},t.prototype.fullLimitUpdateChild_=function(e,n,r,i,o){var s;if(this.reverse_){var a=this.index_.getCompare();s=function(C,N){return a(N,C)}}else s=this.index_.getCompare();var u=e;_(u.numChildren()===this.limit_,"");var l=new R(n,r),c=this.reverse_?u.getFirstChild(this.index_):u.getLastChild(this.index_),f=this.rangedFilter_.matches(l);if(u.hasChild(n)){for(var h=u.getImmediateChild(n),d=i.getChildAfterChild(this.index_,c,this.reverse_);d!=null&&(d.name===n||u.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);var p=d==null?1:s(d,l),m=f&&!r.isEmpty()&&p>=0;if(m)return o!=null&&o.trackChildChange(sn(n,r,h)),u.updateImmediateChild(n,r);o!=null&&o.trackChildChange(on(n,h));var y=u.updateImmediateChild(n,E.EMPTY_NODE),b=d!=null&&this.rangedFilter_.matches(d);return b?(o!=null&&o.trackChildChange(Nt(d.name,d.node)),y.updateImmediateChild(d.name,d.node)):y}else return r.isEmpty()?e:f&&s(c,l)>=0?(o!=null&&(o.trackChildChange(on(c.name,c.node)),o.trackChildChange(Nt(n,r))),u.updateImmediateChild(n,r).updateImmediateChild(c.name,E.EMPTY_NODE)):e},t}();/**
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
 */var Js=function(){function t(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=M}return t.prototype.hasStart=function(){return this.startSet_},t.prototype.hasStartAfter=function(){return this.startAfterSet_},t.prototype.hasEndBefore=function(){return this.endBeforeSet_},t.prototype.isViewFromLeft=function(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"},t.prototype.getIndexStartValue=function(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_},t.prototype.getIndexStartName=function(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ue},t.prototype.hasEnd=function(){return this.endSet_},t.prototype.getIndexEndValue=function(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_},t.prototype.getIndexEndName=function(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ne},t.prototype.hasLimit=function(){return this.limitSet_},t.prototype.hasAnchoredLimit=function(){return this.limitSet_&&this.viewFrom_!==""},t.prototype.getLimit=function(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_},t.prototype.getIndex=function(){return this.index_},t.prototype.loadsAllData=function(){return!(this.startSet_||this.endSet_||this.limitSet_)},t.prototype.isDefault=function(){return this.loadsAllData()&&this.index_===M},t.prototype.copy=function(){var e=new t;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e},t}();function Hf(t){return t.loadsAllData()?new ui(t.getIndex()):t.hasLimit()?new Vf(t):new Xs(t)}function Gf(t,e){var n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="l",n}function qf(t,e){var n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function li(t,e,n){var r=t.copy();return r.startSet_=!0,e===void 0&&(e=null),r.indexStartValue_=e,n!=null?(r.startNameSet_=!0,r.indexStartName_=n):(r.startNameSet_=!1,r.indexStartName_=""),r}function Kf(t,e,n){var r;if(t.index_===Oe)typeof e=="string"&&(e=$s(e)),r=li(t,e,n);else{var i=void 0;n==null?i=Ne:i=$s(n),r=li(t,e,i)}return r.startAfterSet_=!0,r}function ci(t,e,n){var r=t.copy();return r.endSet_=!0,e===void 0&&(e=null),r.indexEndValue_=e,n!==void 0?(r.endNameSet_=!0,r.indexEndName_=n):(r.endNameSet_=!1,r.indexEndName_=""),r}function zf(t,e,n){var r,i;return t.index_===Oe?(typeof e=="string"&&(e=Qs(e)),i=ci(t,e,n)):(n==null?r=Ue:r=Qs(n),i=ci(t,e,r)),i.endBeforeSet_=!0,i}function Wn(t,e){var n=t.copy();return n.index_=e,n}function Zs(t){var e={};if(t.isDefault())return e;var n;return t.index_===M?n="$priority":t.index_===si?n="$value":t.index_===Oe?n="$key":(_(t.index_ instanceof oi,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=W(n),t.startSet_&&(e.startAt=W(t.indexStartValue_),t.startNameSet_&&(e.startAt+=","+W(t.indexStartName_))),t.endSet_&&(e.endAt=W(t.indexEndValue_),t.endNameSet_&&(e.endAt+=","+W(t.indexEndName_))),t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function ea(t){var e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_)),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_)),t.limitSet_){e.l=t.limit_;var n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==M&&(e.i=t.index_.toString()),e}/**
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
 */var $f=function(t){x(e,t);function e(n,r,i,o){var s=t.call(this)||this;return s.repoInfo_=n,s.onDataUpdate_=r,s.authTokenProvider_=i,s.appCheckTokenProvider_=o,s.log_=Yt("p:rest:"),s.listens_={},s}return e.prototype.reportStats=function(n){throw new Error("Method not implemented.")},e.getListenId_=function(n,r){return r!==void 0?"tag$"+r:(_(n._queryParams.isDefault(),"should have a tag if it's not a default query."),n._path.toString())},e.prototype.listen=function(n,r,i,o){var s=this,a=n._path.toString();this.log_("Listen called for "+a+" "+n._queryIdentifier);var u=e.getListenId_(n,i),l={};this.listens_[u]=l;var c=Zs(n._queryParams);this.restRequest_(a+".json",c,function(f,h){var d=h;if(f===404&&(d=null,f=null),f===null&&s.onDataUpdate_(a,d,!1,i),ot(s.listens_,u)===l){var p;f?f===401?p="permission_denied":p="rest_error:"+f:p="ok",o(p,null)}})},e.prototype.unlisten=function(n,r){var i=e.getListenId_(n,r);delete this.listens_[i]},e.prototype.get=function(n){var r=this,i=Zs(n._queryParams),o=n._path.toString(),s=new $;return this.restRequest_(o+".json",i,function(a,u){var l=u;a===404&&(l=null,a=null),a===null?(r.onDataUpdate_(o,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise},e.prototype.refreshAuthToken=function(n){},e.prototype.restRequest_=function(n,r,i){var o=this;return r===void 0&&(r={}),r.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(function(s){var a=ue(s,2),u=a[0],l=a[1];u&&u.accessToken&&(r.auth=u.accessToken),l&&l.token&&(r.ac=l.token);var c=(o.repoInfo_.secure?"https://":"http://")+o.repoInfo_.host+n+"?ns="+o.repoInfo_.namespace+mc(r);o.log_("Sending REST request for "+c);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(i&&f.readyState===4){o.log_("REST Response for "+c+" received. status:",f.status,"response:",f.responseText);var h=null;if(f.status>=200&&f.status<300){try{h=Br(f.responseText)}catch{Q("Failed to parse JSON response for "+c+": "+f.responseText)}i(null,h)}else f.status!==401&&f.status!==404&&Q("Got unsuccessful REST response for "+c+" Status: "+f.status),i(f.status);i=null}},f.open("GET",c,!0),f.send()})},e}(Ns);/**
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
 */var Qf=function(){function t(){this.rootNode_=E.EMPTY_NODE}return t.prototype.getNode=function(e){return this.rootNode_.getChild(e)},t.prototype.updateSnapshot=function(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)},t}();/**
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
 */function jn(){return{value:null,children:new Map}}function Ot(t,e,n){if(S(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{var r=I(e);t.children.has(r)||t.children.set(r,jn());var i=t.children.get(r);e=O(e),Ot(i,e,n)}}function fi(t,e){if(S(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;var n=t.value;return t.value=null,n.forEachChild(M,function(o,s){Ot(t,new A(o),s)}),fi(t,e)}else if(t.children.size>0){var r=I(e);if(e=O(e),t.children.has(r)){var i=fi(t.children.get(r),e);i&&t.children.delete(r)}return t.children.size===0}else return!0}function hi(t,e,n){t.value!==null?n(e,t.value):Yf(t,function(r,i){var o=new A(e.toString()+"/"+r);hi(i,o,n)})}function Yf(t,e){t.children.forEach(function(n,r){e(r,n)})}/**
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
 */var ta=function(){function t(e){this.collection_=e,this.last_=null}return t.prototype.get=function(){var e=this.collection_.get(),n=w({},e);return this.last_&&j(this.last_,function(r,i){n[r]=n[r]-i}),this.last_=e,n},t}();/**
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
 */var na=10*1e3,Xf=30*1e3,Jf=5*60*1e3,Zf=function(){function t(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new ta(e);var r=na+(Xf-na)*Math.random();Jt(this.reportStats_.bind(this),Math.floor(r))}return t.prototype.reportStats_=function(){var e=this,n=this.statsListener_.get(),r={},i=!1;j(n,function(o,s){s>0&&Ee(e.statsToReport_,o)&&(r[o]=s,i=!0)}),i&&this.server_.reportStats(r),Jt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Jf))},t}();function eh(t,e){t.statsToReport_[e]=!0}/**
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
 */var Ie;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ie||(Ie={}));function di(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function pi(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function vi(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */var th=function(){function t(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Ie.ACK_USER_WRITE,this.source=di()}return t.prototype.operationForChild=function(e){if(S(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;var n=this.affectedTree.subtree(new A(e));return new t(k(),n,this.revert)}else return _(I(this.path)===e,"operationForChild called for unrelated child."),new t(O(this.path),this.affectedTree,this.revert)},t}();/**
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
 */var ra=function(){function t(e,n){this.source=e,this.path=n,this.type=Ie.LISTEN_COMPLETE}return t.prototype.operationForChild=function(e){return S(this.path)?new t(this.source,k()):new t(this.source,O(this.path))},t}();/**
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
 */var Vn=function(){function t(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Ie.OVERWRITE}return t.prototype.operationForChild=function(e){return S(this.path)?new t(this.source,k(),this.snap.getImmediateChild(e)):new t(this.source,O(this.path),this.snap)},t}();/**
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
 */var gi=function(){function t(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Ie.MERGE}return t.prototype.operationForChild=function(e){if(S(this.path)){var n=this.children.subtree(new A(e));return n.isEmpty()?null:n.value?new Vn(this.source,k(),n.value):new t(this.source,k(),n)}else return _(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new t(this.source,O(this.path),this.children)},t.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"},t}();/**
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
 */var $e=function(){function t(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}return t.prototype.isFullyInitialized=function(){return this.fullyInitialized_},t.prototype.isFiltered=function(){return this.filtered_},t.prototype.isCompleteForPath=function(e){if(S(e))return this.isFullyInitialized()&&!this.filtered_;var n=I(e);return this.isCompleteForChild(n)},t.prototype.isCompleteForChild=function(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)},t.prototype.getNode=function(){return this.node_},t}();/**
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
 */var nh=function(){function t(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}return t}();function rh(t,e,n,r){var i=[],o=[];return e.forEach(function(s){s.type==="child_changed"&&t.index_.indexedValueChanged(s.oldSnap,s.snapshotNode)&&o.push(jf(s.childName,s.snapshotNode))}),an(t,i,"child_removed",e,r,n),an(t,i,"child_added",e,r,n),an(t,i,"child_moved",o,r,n),an(t,i,"child_changed",e,r,n),an(t,i,"value",e,r,n),i}function an(t,e,n,r,i,o){var s=r.filter(function(a){return a.type===n});s.sort(function(a,u){return oh(t,a,u)}),s.forEach(function(a){var u=ih(t,a,o);i.forEach(function(l){l.respondsTo(a.type)&&e.push(l.createEvent(u,t.query_))})})}function ih(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function oh(t,e,n){if(e.childName==null||n.childName==null)throw qt("Should only compare child_ events.");var r=new R(e.childName,e.snapshotNode),i=new R(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
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
 */function Hn(t,e){return{eventCache:t,serverCache:e}}function un(t,e,n,r){return Hn(new $e(e,n,r),t.serverCache)}function ia(t,e,n,r){return Hn(t.eventCache,new $e(e,n,r))}function Gn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ht(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */var _i,sh=function(){return _i||(_i=new Be(Lc)),_i},le=function(){function t(e,n){n===void 0&&(n=sh()),this.value=e,this.children=n}return t.fromObject=function(e){var n=new t(null);return j(e,function(r,i){n=n.set(new A(r),i)}),n},t.prototype.isEmpty=function(){return this.value===null&&this.children.isEmpty()},t.prototype.findRootMostMatchingPathAndValue=function(e,n){if(this.value!=null&&n(this.value))return{path:k(),value:this.value};if(S(e))return null;var r=I(e),i=this.children.get(r);if(i!==null){var o=i.findRootMostMatchingPathAndValue(O(e),n);if(o!=null){var s=D(new A(r),o.path);return{path:s,value:o.value}}else return null}else return null},t.prototype.findRootMostValueAndPath=function(e){return this.findRootMostMatchingPathAndValue(e,function(){return!0})},t.prototype.subtree=function(e){if(S(e))return this;var n=I(e),r=this.children.get(n);return r!==null?r.subtree(O(e)):new t(null)},t.prototype.set=function(e,n){if(S(e))return new t(n,this.children);var r=I(e),i=this.children.get(r)||new t(null),o=i.set(O(e),n),s=this.children.insert(r,o);return new t(this.value,s)},t.prototype.remove=function(e){if(S(e))return this.children.isEmpty()?new t(null):new t(null,this.children);var n=I(e),r=this.children.get(n);if(r){var i=r.remove(O(e)),o=void 0;return i.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,i),this.value===null&&o.isEmpty()?new t(null):new t(this.value,o)}else return this},t.prototype.get=function(e){if(S(e))return this.value;var n=I(e),r=this.children.get(n);return r?r.get(O(e)):null},t.prototype.setTree=function(e,n){if(S(e))return n;var r=I(e),i=this.children.get(r)||new t(null),o=i.setTree(O(e),n),s=void 0;return o.isEmpty()?s=this.children.remove(r):s=this.children.insert(r,o),new t(this.value,s)},t.prototype.fold=function(e){return this.fold_(k(),e)},t.prototype.fold_=function(e,n){var r={};return this.children.inorderTraversal(function(i,o){r[i]=o.fold_(D(e,i),n)}),n(e,this.value,r)},t.prototype.findOnPath=function(e,n){return this.findOnPath_(e,k(),n)},t.prototype.findOnPath_=function(e,n,r){var i=this.value?r(n,this.value):!1;if(i)return i;if(S(e))return null;var o=I(e),s=this.children.get(o);return s?s.findOnPath_(O(e),D(n,o),r):null},t.prototype.foreachOnPath=function(e,n){return this.foreachOnPath_(e,k(),n)},t.prototype.foreachOnPath_=function(e,n,r){if(S(e))return this;this.value&&r(n,this.value);var i=I(e),o=this.children.get(i);return o?o.foreachOnPath_(O(e),D(n,i),r):new t(null)},t.prototype.foreach=function(e){this.foreach_(k(),e)},t.prototype.foreach_=function(e,n){this.children.inorderTraversal(function(r,i){i.foreach_(D(e,r),n)}),this.value&&n(e,this.value)},t.prototype.foreachChild=function(e){this.children.inorderTraversal(function(n,r){r.value&&e(n,r.value)})},t}();/**
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
 */var We=function(){function t(e){this.writeTree_=e}return t.empty=function(){return new t(new le(null))},t}();function ln(t,e,n){if(S(e))return new We(new le(n));var r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){var i=r.path,o=r.value,s=ne(i,e);return o=o.updateChild(s,n),new We(t.writeTree_.set(i,o))}else{var a=new le(n),u=t.writeTree_.setTree(e,a);return new We(u)}}function mi(t,e,n){var r=t;return j(n,function(i,o){r=ln(r,D(e,i),o)}),r}function oa(t,e){if(S(e))return We.empty();var n=t.writeTree_.setTree(e,new le(null));return new We(n)}function yi(t,e){return dt(t,e)!=null}function dt(t,e){var n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ne(n.path,e)):null}function sa(t){var e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(M,function(r,i){e.push(new R(r,i))}):t.writeTree_.children.inorderTraversal(function(r,i){i.value!=null&&e.push(new R(r,i.value))}),e}function Qe(t,e){if(S(e))return t;var n=dt(t,e);return n!=null?new We(new le(n)):new We(t.writeTree_.subtree(e))}function bi(t){return t.writeTree_.isEmpty()}function Mt(t,e){return aa(k(),t.writeTree_,e)}function aa(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);var r=null;return e.children.inorderTraversal(function(i,o){i===".priority"?(_(o.value!==null,"Priority writes must always be leaf nodes"),r=o.value):n=aa(D(t,i),o,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(D(t,".priority"),r)),n}/**
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
 */function qn(t,e){return ha(e,t)}function ah(t,e,n,r,i){_(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=ln(t.visibleWrites,e,n)),t.lastWriteId=r}function uh(t,e,n,r){_(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=mi(t.visibleWrites,e,n),t.lastWriteId=r}function lh(t,e){for(var n=0;n<t.allWrites.length;n++){var r=t.allWrites[n];if(r.writeId===e)return r}return null}function ch(t,e){var n=t.allWrites.findIndex(function(l){return l.writeId===e});_(n>=0,"removeWrite called with nonexistent writeId.");var r=t.allWrites[n];t.allWrites.splice(n,1);for(var i=r.visible,o=!1,s=t.allWrites.length-1;i&&s>=0;){var a=t.allWrites[s];a.visible&&(s>=n&&fh(a,r.path)?i=!1:de(r.path,a.path)&&(o=!0)),s--}if(i){if(o)return hh(t),!0;if(r.snap)t.visibleWrites=oa(t.visibleWrites,r.path);else{var u=r.children;j(u,function(l){t.visibleWrites=oa(t.visibleWrites,D(r.path,l))})}return!0}else return!1}function fh(t,e){if(t.snap)return de(t.path,e);for(var n in t.children)if(t.children.hasOwnProperty(n)&&de(D(t.path,n),e))return!0;return!1}function hh(t){t.visibleWrites=ua(t.allWrites,dh,k()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function dh(t){return t.visible}function ua(t,e,n){for(var r=We.empty(),i=0;i<t.length;++i){var o=t[i];if(e(o)){var s=o.path,a=void 0;if(o.snap)de(n,s)?(a=ne(n,s),r=ln(r,a,o.snap)):de(s,n)&&(a=ne(s,n),r=ln(r,k(),o.snap.getChild(a)));else if(o.children){if(de(n,s))a=ne(n,s),r=mi(r,a,o.children);else if(de(s,n))if(a=ne(s,n),S(a))r=mi(r,k(),o.children);else{var u=ot(o.children,I(a));if(u){var l=u.getChild(O(a));r=ln(r,k(),l)}}}else throw qt("WriteRecord should have .snap or .children")}}return r}function la(t,e,n,r,i){if(!r&&!i){var o=dt(t.visibleWrites,e);if(o!=null)return o;var s=Qe(t.visibleWrites,e);if(bi(s))return n;if(n==null&&!yi(s,k()))return null;var a=n||E.EMPTY_NODE;return Mt(s,a)}else{var u=Qe(t.visibleWrites,e);if(!i&&bi(u))return n;if(!i&&n==null&&!yi(u,k()))return null;var l=function(h){return(h.visible||i)&&(!r||!~r.indexOf(h.writeId))&&(de(h.path,e)||de(e,h.path))},c=ua(t.allWrites,l,e),a=n||E.EMPTY_NODE;return Mt(c,a)}}function ph(t,e,n){var r=E.EMPTY_NODE,i=dt(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(M,function(a,u){r=r.updateImmediateChild(a,u)}),r;if(n){var o=Qe(t.visibleWrites,e);return n.forEachChild(M,function(a,u){var l=Mt(Qe(o,new A(a)),u);r=r.updateImmediateChild(a,l)}),sa(o).forEach(function(a){r=r.updateImmediateChild(a.name,a.node)}),r}else{var s=Qe(t.visibleWrites,e);return sa(s).forEach(function(a){r=r.updateImmediateChild(a.name,a.node)}),r}}function vh(t,e,n,r,i){_(r||i,"Either existingEventSnap or existingServerSnap must exist");var o=D(e,n);if(yi(t.visibleWrites,o))return null;var s=Qe(t.visibleWrites,o);return bi(s)?i.getChild(n):Mt(s,i.getChild(n))}function gh(t,e,n,r){var i=D(e,n),o=dt(t.visibleWrites,i);if(o!=null)return o;if(r.isCompleteForChild(n)){var s=Qe(t.visibleWrites,i);return Mt(s,r.getNode().getImmediateChild(n))}else return null}function _h(t,e){return dt(t.visibleWrites,e)}function mh(t,e,n,r,i,o,s){var a,u=Qe(t.visibleWrites,e),l=dt(u,k());if(l!=null)a=l;else if(n!=null)a=Mt(u,n);else return[];if(a=a.withIndex(s),!a.isEmpty()&&!a.isLeafNode()){for(var c=[],f=s.getCompare(),h=o?a.getReverseIteratorFrom(r,s):a.getIteratorFrom(r,s),d=h.getNext();d&&c.length<i;)f(d,r)!==0&&c.push(d),d=h.getNext();return c}else return[]}function yh(){return{visibleWrites:We.empty(),allWrites:[],lastWriteId:-1}}function Kn(t,e,n,r){return la(t.writeTree,t.treePath,e,n,r)}function Ti(t,e){return ph(t.writeTree,t.treePath,e)}function ca(t,e,n,r){return vh(t.writeTree,t.treePath,e,n,r)}function zn(t,e){return _h(t.writeTree,D(t.treePath,e))}function bh(t,e,n,r,i,o){return mh(t.writeTree,t.treePath,e,n,r,i,o)}function wi(t,e,n){return gh(t.writeTree,t.treePath,e,n)}function fa(t,e){return ha(D(t.treePath,e),t.writeTree)}function ha(t,e){return{treePath:t,writeTree:e}}/**
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
 */var Th=function(){function t(){this.changeMap=new Map}return t.prototype.trackChildChange=function(e){var n=e.type,r=e.childName;_(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),_(r!==".priority","Only non-priority child changes can be tracked.");var i=this.changeMap.get(r);if(i){var o=i.type;if(n==="child_added"&&o==="child_removed")this.changeMap.set(r,sn(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&o==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&o==="child_changed")this.changeMap.set(r,on(r,i.oldSnap));else if(n==="child_changed"&&o==="child_added")this.changeMap.set(r,Nt(r,e.snapshotNode));else if(n==="child_changed"&&o==="child_changed")this.changeMap.set(r,sn(r,e.snapshotNode,i.oldSnap));else throw qt("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)},t.prototype.getChanges=function(){return Array.from(this.changeMap.values())},t}();/**
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
 */var wh=function(){function t(){}return t.prototype.getCompleteChild=function(e){return null},t.prototype.getChildAfterChild=function(e,n,r){return null},t}(),da=new wh,Ei=function(){function t(e,n,r){r===void 0&&(r=null),this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}return t.prototype.getCompleteChild=function(e){var n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);var r=this.optCompleteServerCache_!=null?new $e(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return wi(this.writes_,e,r)},t.prototype.getChildAfterChild=function(e,n,r){var i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ht(this.viewCache_),o=bh(this.writes_,i,n,1,r,e);return o.length===0?null:o[0]},t}();/**
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
 */function Eh(t){return{filter:t}}function Ch(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Ih(t,e,n,r,i){var o=new Th,s,a;if(n.type===Ie.OVERWRITE){var u=n;u.source.fromUser?s=Ci(t,e,u.path,u.snap,r,i,o):(_(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered()&&!S(u.path),s=$n(t,e,u.path,u.snap,r,i,a,o))}else if(n.type===Ie.MERGE){var l=n;l.source.fromUser?s=Rh(t,e,l.path,l.children,r,i,o):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),s=Ii(t,e,l.path,l.children,r,i,a,o))}else if(n.type===Ie.ACK_USER_WRITE){var c=n;c.revert?s=Ph(t,e,c.path,r,i,o):s=kh(t,e,c.path,c.affectedTree,r,i,o)}else if(n.type===Ie.LISTEN_COMPLETE)s=Ah(t,e,n.path,r,o);else throw qt("Unknown operation type: "+n.type);var f=o.getChanges();return Sh(e,s,f),{viewCache:s,changes:f}}function Sh(t,e,n){var r=e.eventCache;if(r.isFullyInitialized()){var i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=Gn(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(Ys(Gn(e)))}}function pa(t,e,n,r,i,o){var s=e.eventCache;if(zn(r,n)!=null)return e;var a=void 0,u=void 0;if(S(n))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){var l=ht(e),c=l instanceof E?l:E.EMPTY_NODE,f=Ti(r,c);a=t.filter.updateFullNode(e.eventCache.getNode(),f,o)}else{var h=Kn(r,ht(e));a=t.filter.updateFullNode(e.eventCache.getNode(),h,o)}else{var d=I(n);if(d===".priority"){_(ze(n)===1,"Can't have a priority with additional path components");var p=s.getNode();u=e.serverCache.getNode();var m=ca(r,n,p,u);m!=null?a=t.filter.updatePriority(p,m):a=s.getNode()}else{var y=O(n),b=void 0;if(s.isCompleteForChild(d)){u=e.serverCache.getNode();var C=ca(r,n,s.getNode(),u);C!=null?b=s.getNode().getImmediateChild(d).updateChild(y,C):b=s.getNode().getImmediateChild(d)}else b=wi(r,d,e.serverCache);b!=null?a=t.filter.updateChild(s.getNode(),d,b,y,i,o):a=s.getNode()}}return un(e,a,s.isFullyInitialized()||S(n),t.filter.filtersNodes())}function $n(t,e,n,r,i,o,s,a){var u=e.serverCache,l,c=s?t.filter:t.filter.getIndexedFilter();if(S(n))l=c.updateFullNode(u.getNode(),r,null);else if(c.filtersNodes()&&!u.isFiltered()){var f=u.getNode().updateChild(n,r);l=c.updateFullNode(u.getNode(),f,null)}else{var h=I(n);if(!u.isCompleteForPath(n)&&ze(n)>1)return e;var d=O(n),p=u.getNode().getImmediateChild(h),m=p.updateChild(d,r);h===".priority"?l=c.updatePriority(u.getNode(),m):l=c.updateChild(u.getNode(),h,m,d,da,null)}var y=ia(e,l,u.isFullyInitialized()||S(n),c.filtersNodes()),b=new Ei(i,y,o);return pa(t,y,n,i,b,a)}function Ci(t,e,n,r,i,o,s){var a=e.eventCache,u,l,c=new Ei(i,e,o);if(S(n))l=t.filter.updateFullNode(e.eventCache.getNode(),r,s),u=un(e,l,!0,t.filter.filtersNodes());else{var f=I(n);if(f===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),r),u=un(e,l,a.isFullyInitialized(),a.isFiltered());else{var h=O(n),d=a.getNode().getImmediateChild(f),p=void 0;if(S(h))p=r;else{var m=c.getCompleteChild(f);m!=null?ei(h)===".priority"&&m.getChild(Ls(h)).isEmpty()?p=m:p=m.updateChild(h,r):p=E.EMPTY_NODE}if(d.equals(p))u=e;else{var y=t.filter.updateChild(a.getNode(),f,p,h,c,s);u=un(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function va(t,e){return t.eventCache.isCompleteForChild(e)}function Rh(t,e,n,r,i,o,s){var a=e;return r.foreach(function(u,l){var c=D(n,u);va(e,I(c))&&(a=Ci(t,a,c,l,i,o,s))}),r.foreach(function(u,l){var c=D(n,u);va(e,I(c))||(a=Ci(t,a,c,l,i,o,s))}),a}function ga(t,e,n){return n.foreach(function(r,i){e=e.updateChild(r,i)}),e}function Ii(t,e,n,r,i,o,s,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;var u=e,l;S(n)?l=r:l=new le(null).setTree(n,r);var c=e.serverCache.getNode();return l.children.inorderTraversal(function(f,h){if(c.hasChild(f)){var d=e.serverCache.getNode().getImmediateChild(f),p=ga(t,d,h);u=$n(t,u,new A(f),p,i,o,s,a)}}),l.children.inorderTraversal(function(f,h){var d=!e.serverCache.isCompleteForChild(f)&&h.value===void 0;if(!c.hasChild(f)&&!d){var p=e.serverCache.getNode().getImmediateChild(f),m=ga(t,p,h);u=$n(t,u,new A(f),m,i,o,s,a)}}),u}function kh(t,e,n,r,i,o,s){if(zn(i,n)!=null)return e;var a=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(S(n)&&u.isFullyInitialized()||u.isCompleteForPath(n))return $n(t,e,n,u.getNode().getChild(n),i,o,a,s);if(S(n)){var l=new le(null);return u.getNode().forEachChild(Oe,function(f,h){l=l.set(new A(f),h)}),Ii(t,e,n,l,i,o,a,s)}else return e}else{var c=new le(null);return r.foreach(function(f,h){var d=D(n,f);u.isCompleteForPath(d)&&(c=c.set(f,u.getNode().getChild(d)))}),Ii(t,e,n,c,i,o,a,s)}}function Ah(t,e,n,r,i){var o=e.serverCache,s=ia(e,o.getNode(),o.isFullyInitialized()||S(n),o.isFiltered());return pa(t,s,n,r,da,i)}function Ph(t,e,n,r,i,o){var s;if(zn(r,n)!=null)return e;var a=new Ei(r,e,i),u=e.eventCache.getNode(),l=void 0;if(S(n)||I(n)===".priority"){var c=void 0;if(e.serverCache.isFullyInitialized())c=Kn(r,ht(e));else{var f=e.serverCache.getNode();_(f instanceof E,"serverChildren would be complete if leaf node"),c=Ti(r,f)}c=c,l=t.filter.updateFullNode(u,c,o)}else{var h=I(n),d=wi(r,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=u.getImmediateChild(h)),d!=null?l=t.filter.updateChild(u,h,d,O(n),a,o):e.eventCache.getNode().hasChild(h)?l=t.filter.updateChild(u,h,E.EMPTY_NODE,O(n),a,o):l=u,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(s=Kn(r,ht(e)),s.isLeafNode()&&(l=t.filter.updateFullNode(l,s,o)))}return s=e.serverCache.isFullyInitialized()||zn(r,k())!=null,un(e,l,s,t.filter.filtersNodes())}/**
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
 */var Nh=function(){function t(e,n){this.query_=e,this.eventRegistrations_=[];var r=this.query_._queryParams,i=new ui(r.getIndex()),o=Hf(r);this.processor_=Eh(o);var s=n.serverCache,a=n.eventCache,u=i.updateFullNode(E.EMPTY_NODE,s.getNode(),null),l=o.updateFullNode(E.EMPTY_NODE,a.getNode(),null),c=new $e(u,s.isFullyInitialized(),i.filtersNodes()),f=new $e(l,a.isFullyInitialized(),o.filtersNodes());this.viewCache_=Hn(f,c),this.eventGenerator_=new nh(this.query_)}return Object.defineProperty(t.prototype,"query",{get:function(){return this.query_},enumerable:!1,configurable:!0}),t}();function Oh(t){return t.viewCache_.serverCache.getNode()}function Mh(t){return Gn(t.viewCache_)}function xh(t,e){var n=ht(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!S(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function _a(t){return t.eventRegistrations_.length===0}function Dh(t,e){t.eventRegistrations_.push(e)}function ma(t,e,n){var r=[];if(n){_(e==null,"A cancel should cancel all event registrations.");var i=t.query._path;t.eventRegistrations_.forEach(function(u){var l=u.createCancelEvent(n,i);l&&r.push(l)})}if(e){for(var o=[],s=0;s<t.eventRegistrations_.length;++s){var a=t.eventRegistrations_[s];if(!a.matches(e))o.push(a);else if(e.hasAnyCallback()){o=o.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=o}else t.eventRegistrations_=[];return r}function ya(t,e,n,r){e.type===Ie.MERGE&&e.source.queryId!==null&&(_(ht(t.viewCache_),"We should always have a full cache before handling merges"),_(Gn(t.viewCache_),"Missing event cache, even though we have a server cache"));var i=t.viewCache_,o=Ih(t.processor_,i,e,n,r);return Ch(t.processor_,o.viewCache),_(o.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=o.viewCache,ba(t,o.changes,o.viewCache.eventCache.getNode(),null)}function Lh(t,e){var n=t.viewCache_.eventCache,r=[];if(!n.getNode().isLeafNode()){var i=n.getNode();i.forEachChild(M,function(o,s){r.push(Nt(o,s))})}return n.isFullyInitialized()&&r.push(Ys(n.getNode())),ba(t,r,n.getNode(),e)}function ba(t,e,n,r){var i=r?[r]:t.eventRegistrations_;return rh(t.eventGenerator_,e,n,i)}/**
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
 */var Qn,Ta=function(){function t(){this.views=new Map}return t}();function Fh(t){_(!Qn,"__referenceConstructor has already been defined"),Qn=t}function Uh(){return _(Qn,"Reference.ts has not been loaded"),Qn}function Bh(t){return t.views.size===0}function Si(t,e,n,r){var i,o,s=e.source.queryId;if(s!==null){var a=t.views.get(s);return _(a!=null,"SyncTree gave us an op for an invalid query."),ya(a,e,n,r)}else{var u=[];try{for(var l=te(t.views.values()),c=l.next();!c.done;c=l.next()){var a=c.value;u=u.concat(ya(a,e,n,r))}}catch(f){i={error:f}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(i)throw i.error}}return u}}function wa(t,e,n,r,i){var o=e._queryIdentifier,s=t.views.get(o);if(!s){var a=Kn(n,i?r:null),u=!1;a?u=!0:r instanceof E?(a=Ti(n,r),u=!1):(a=E.EMPTY_NODE,u=!1);var l=Hn(new $e(a,u,!1),new $e(r,i,!1));return new Nh(e,l)}return s}function Wh(t,e,n,r,i,o){var s=wa(t,e,r,i,o);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,s),Dh(s,n),Lh(s,n)}function jh(t,e,n,r){var i,o,s=e._queryIdentifier,a=[],u=[],l=Xe(t);if(s==="default")try{for(var c=te(t.views.entries()),f=c.next();!f.done;f=c.next()){var h=ue(f.value,2),d=h[0],p=h[1];u=u.concat(ma(p,n,r)),_a(p)&&(t.views.delete(d),p.query._queryParams.loadsAllData()||a.push(p.query))}}catch(m){i={error:m}}finally{try{f&&!f.done&&(o=c.return)&&o.call(c)}finally{if(i)throw i.error}}else{var p=t.views.get(s);p&&(u=u.concat(ma(p,n,r)),_a(p)&&(t.views.delete(s),p.query._queryParams.loadsAllData()||a.push(p.query)))}return l&&!Xe(t)&&a.push(new(Uh())(e._repo,e._path)),{removed:a,events:u}}function Ea(t){var e,n,r=[];try{for(var i=te(t.views.values()),o=i.next();!o.done;o=i.next()){var s=o.value;s.query._queryParams.loadsAllData()||r.push(s)}}catch(a){e={error:a}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}function Ye(t,e){var n,r,i=null;try{for(var o=te(t.views.values()),s=o.next();!s.done;s=o.next()){var a=s.value;i=i||xh(a,e)}}catch(u){n={error:u}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}return i}function Ca(t,e){var n=e._queryParams;if(n.loadsAllData())return Yn(t);var r=e._queryIdentifier;return t.views.get(r)}function Ia(t,e){return Ca(t,e)!=null}function Xe(t){return Yn(t)!=null}function Yn(t){var e,n;try{for(var r=te(t.views.values()),i=r.next();!i.done;i=r.next()){var o=i.value;if(o.query._queryParams.loadsAllData())return o}}catch(s){e={error:s}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}return null}/**
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
 */var Xn;function Vh(t){_(!Xn,"__referenceConstructor has already been defined"),Xn=t}function Hh(){return _(Xn,"Reference.ts has not been loaded"),Xn}var Gh=1,Sa=function(){function t(e){this.listenProvider_=e,this.syncPointTree_=new le(null),this.pendingWriteTree_=yh(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}return t}();function Ri(t,e,n,r,i){return ah(t.pendingWriteTree_,e,n,r,i),i?xt(t,new Vn(di(),e,n)):[]}function qh(t,e,n,r){uh(t.pendingWriteTree_,e,n,r);var i=le.fromObject(n);return xt(t,new gi(di(),e,i))}function Je(t,e,n){n===void 0&&(n=!1);var r=lh(t.pendingWriteTree_,e),i=ch(t.pendingWriteTree_,e);if(i){var o=new le(null);return r.snap!=null?o=o.set(k(),!0):j(r.children,function(s){o=o.set(new A(s),!0)}),xt(t,new th(r.path,o,n))}else return[]}function cn(t,e,n){return xt(t,new Vn(pi(),e,n))}function Kh(t,e,n){var r=le.fromObject(n);return xt(t,new gi(pi(),e,r))}function zh(t,e){return xt(t,new ra(pi(),e))}function $h(t,e,n){var r=Ai(t,n);if(r){var i=Pi(r),o=i.path,s=i.queryId,a=ne(o,e),u=new ra(vi(s),a);return Ni(t,o,u)}else return[]}function ki(t,e,n,r){var i=e._path,o=t.syncPointTree_.get(i),s=[];if(o&&(e._queryIdentifier==="default"||Ia(o,e))){var a=jh(o,e,n,r);Bh(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));var u=a.removed;s=a.events;var l=u.findIndex(function(C){return C._queryParams.loadsAllData()})!==-1,c=t.syncPointTree_.findOnPath(i,function(C,N){return Xe(N)});if(l&&!c){var f=t.syncPointTree_.subtree(i);if(!f.isEmpty())for(var h=Jh(f),d=0;d<h.length;++d){var p=h[d],m=p.query,y=Pa(t,p);t.listenProvider_.startListening(fn(m),Zn(t,m),y.hashFn,y.onComplete)}}if(!c&&u.length>0&&!r)if(l){var b=null;t.listenProvider_.stopListening(fn(e),b)}else u.forEach(function(C){var N=t.queryToTagMap.get(er(C));t.listenProvider_.stopListening(fn(C),N)});Zh(t,u)}return s}function Qh(t,e,n,r){var i=Ai(t,r);if(i!=null){var o=Pi(i),s=o.path,a=o.queryId,u=ne(s,e),l=new Vn(vi(a),u,n);return Ni(t,s,l)}else return[]}function Yh(t,e,n,r){var i=Ai(t,r);if(i){var o=Pi(i),s=o.path,a=o.queryId,u=ne(s,e),l=le.fromObject(n),c=new gi(vi(a),u,l);return Ni(t,s,c)}else return[]}function Ra(t,e,n){var r=e._path,i=null,o=!1;t.syncPointTree_.foreachOnPath(r,function(m,y){var b=ne(m,r);i=i||Ye(y,b),o=o||Xe(y)});var s=t.syncPointTree_.get(r);s?(o=o||Xe(s),i=i||Ye(s,k())):(s=new Ta,t.syncPointTree_=t.syncPointTree_.set(r,s));var a;if(i!=null)a=!0;else{a=!1,i=E.EMPTY_NODE;var u=t.syncPointTree_.subtree(r);u.foreachChild(function(m,y){var b=Ye(y,k());b&&(i=i.updateImmediateChild(m,b))})}var l=Ia(s,e);if(!l&&!e._queryParams.loadsAllData()){var c=er(e);_(!t.queryToTagMap.has(c),"View does not exist, but we have a tag");var f=ed();t.queryToTagMap.set(c,f),t.tagToQueryMap.set(f,c)}var h=qn(t.pendingWriteTree_,r),d=Wh(s,e,n,h,i,a);if(!l&&!o){var p=Ca(s,e);d=d.concat(td(t,e,p))}return d}function Jn(t,e,n){var r=!0,i=t.pendingWriteTree_,o=t.syncPointTree_.findOnPath(e,function(s,a){var u=ne(s,e),l=Ye(a,u);if(l)return l});return la(i,e,o,n,r)}function Xh(t,e){var n=e._path,r=null;t.syncPointTree_.foreachOnPath(n,function(l,c){var f=ne(l,n);r=r||Ye(c,f)});var i=t.syncPointTree_.get(n);i?r=r||Ye(i,k()):(i=new Ta,t.syncPointTree_=t.syncPointTree_.set(n,i));var o=r!=null,s=o?new $e(r,!0,!1):null,a=qn(t.pendingWriteTree_,e._path),u=wa(i,e,a,o?s.getNode():E.EMPTY_NODE,o);return Mh(u)}function xt(t,e){return ka(e,t.syncPointTree_,null,qn(t.pendingWriteTree_,k()))}function ka(t,e,n,r){if(S(t.path))return Aa(t,e,n,r);var i=e.get(k());n==null&&i!=null&&(n=Ye(i,k()));var o=[],s=I(t.path),a=t.operationForChild(s),u=e.children.get(s);if(u&&a){var l=n?n.getImmediateChild(s):null,c=fa(r,s);o=o.concat(ka(a,u,l,c))}return i&&(o=o.concat(Si(i,t,r,n))),o}function Aa(t,e,n,r){var i=e.get(k());n==null&&i!=null&&(n=Ye(i,k()));var o=[];return e.children.inorderTraversal(function(s,a){var u=n?n.getImmediateChild(s):null,l=fa(r,s),c=t.operationForChild(s);c&&(o=o.concat(Aa(c,a,u,l)))}),i&&(o=o.concat(Si(i,t,r,n))),o}function Pa(t,e){var n=e.query,r=Zn(t,n);return{hashFn:function(){var i=Oh(e)||E.EMPTY_NODE;return i.hash()},onComplete:function(i){if(i==="ok")return r?$h(t,n._path,r):zh(t,n._path);var o=Bc(i,n);return ki(t,n,null,o)}}}function Zn(t,e){var n=er(e);return t.queryToTagMap.get(n)}function er(t){return t._path.toString()+"$"+t._queryIdentifier}function Ai(t,e){return t.tagToQueryMap.get(e)}function Pi(t){var e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new A(t.substr(0,e))}}function Ni(t,e,n){var r=t.syncPointTree_.get(e);_(r,"Missing sync point for query tag that we're tracking");var i=qn(t.pendingWriteTree_,e);return Si(r,n,i,null)}function Jh(t){return t.fold(function(e,n,r){if(n&&Xe(n)){var i=Yn(n);return[i]}else{var o=[];return n&&(o=Ea(n)),j(r,function(s,a){o=o.concat(a)}),o}})}function fn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Hh())(t._repo,t._path):t}function Zh(t,e){for(var n=0;n<e.length;++n){var r=e[n];if(!r._queryParams.loadsAllData()){var i=er(r),o=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(o)}}}function ed(){return Gh++}function td(t,e,n){var r=e._path,i=Zn(t,e),o=Pa(t,n),s=t.listenProvider_.startListening(fn(e),i,o.hashFn,o.onComplete),a=t.syncPointTree_.subtree(r);if(i)_(!Xe(a.value),"If we're adding a query, it shouldn't be shadowed");else for(var u=a.fold(function(f,h,d){if(!S(f)&&h&&Xe(h))return[Yn(h).query];var p=[];return h&&(p=p.concat(Ea(h).map(function(m){return m.query}))),j(d,function(m,y){p=p.concat(y)}),p}),l=0;l<u.length;++l){var c=u[l];t.listenProvider_.stopListening(fn(c),Zn(t,c))}return s}/**
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
 */var nd=function(){function t(e){this.node_=e}return t.prototype.getImmediateChild=function(e){var n=this.node_.getImmediateChild(e);return new t(n)},t.prototype.node=function(){return this.node_},t}(),rd=function(){function t(e,n){this.syncTree_=e,this.path_=n}return t.prototype.getImmediateChild=function(e){var n=D(this.path_,e);return new t(this.syncTree_,n)},t.prototype.node=function(){return Jn(this.syncTree_,this.path_)},t}(),id=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Na=function(t,e,n){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return od(t[".sv"],e,n);if(typeof t[".sv"]=="object")return sd(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},od=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:_(!1,"Unexpected server value: "+t)}},sd=function(t,e,n){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));var r=t.increment;typeof r!="number"&&_(!1,"Unexpected increment value: "+r);var i=e.node();if(_(i!==null&&typeof i!="undefined","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;var o=i,s=o.getValue();return typeof s!="number"?r:s+r},Oa=function(t,e,n,r){return Mi(e,new rd(n,t),r)},Oi=function(t,e,n){return Mi(t,new nd(e),n)};function Mi(t,e,n){var r=t.getPriority().val(),i=Na(r,e.getImmediateChild(".priority"),n),o;if(t.isLeafNode()){var s=t,a=Na(s.getValue(),e,n);return a!==s.getValue()||i!==s.getPriority().val()?new kt(a,F(i)):t}else{var u=t;return o=u,i!==u.getPriority().val()&&(o=o.updatePriority(new kt(i))),u.forEachChild(M,function(l,c){var f=Mi(c,e.getImmediateChild(l),n);f!==c&&(o=o.updateImmediateChild(l,f))}),o}}/**
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
 */var xi=function(){function t(e,n,r){e===void 0&&(e=""),n===void 0&&(n=null),r===void 0&&(r={children:{},childCount:0}),this.name=e,this.parent=n,this.node=r}return t}();function tr(t,e){for(var n=e instanceof A?e:new A(e),r=t,i=I(n);i!==null;){var o=ot(r.node.children,i)||{children:{},childCount:0};r=new xi(i,r,o),n=O(n),i=I(n)}return r}function pt(t){return t.node.value}function Di(t,e){t.node.value=e,Li(t)}function Ma(t){return t.node.childCount>0}function ad(t){return pt(t)===void 0&&!Ma(t)}function nr(t,e){j(t.node.children,function(n,r){e(new xi(n,t,r))})}function xa(t,e,n,r){n&&!r&&e(t),nr(t,function(i){xa(i,e,!0,r)}),n&&r&&e(t)}function ud(t,e,n){for(var r=n?t:t.parent;r!==null;){if(e(r))return!0;r=r.parent}return!1}function hn(t){return new A(t.parent===null?t.name:hn(t.parent)+"/"+t.name)}function Li(t){t.parent!==null&&ld(t.parent,t.name,t)}function ld(t,e,n){var r=ad(n),i=Ee(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,Li(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Li(t))}/**
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
 */var cd=/[\[\].#$\/\u0000-\u001F\u007F]/,fd=/[\[\].#$\u0000-\u001F\u007F]/,Fi=10*1024*1024,rr=function(t){return typeof t=="string"&&t.length!==0&&!cd.test(t)},Da=function(t){return typeof t=="string"&&t.length!==0&&!fd.test(t)},hd=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Da(t)},dn=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!On(t)||t&&typeof t=="object"&&Ee(t,".sv")},Me=function(t,e,n,r){r&&e===void 0||pn(fe(t,"value"),e,n)},pn=function(t,e,n){var r=n instanceof A?new bf(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ct(r));if(typeof e=="function")throw new Error(t+"contains a function "+ct(r)+" with contents = "+e.toString());if(On(e))throw new Error(t+"contains "+e.toString()+" "+ct(r));if(typeof e=="string"&&e.length>Fi/3&&Nn(e)>Fi)throw new Error(t+"contains a string greater than "+Fi+" utf8 bytes "+ct(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){var i=!1,o=!1;if(j(e,function(s,a){if(s===".value")i=!0;else if(s!==".priority"&&s!==".sv"&&(o=!0,!rr(s)))throw new Error(t+" contains an invalid key ("+s+") "+ct(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Tf(r,s),pn(t,a,r),wf(r)}),i&&o)throw new Error(t+' contains ".value" child '+ct(r)+" in addition to actual children.")}},dd=function(t,e){var n,r;for(n=0;n<e.length;n++){r=e[n];for(var i=en(r),o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!rr(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(yf);var s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&de(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},La=function(t,e,n,r){if(!(r&&e===void 0)){var i=fe(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");var o=[];j(e,function(s,a){var u=new A(s);if(pn(i,a,D(n,u)),ei(u)===".priority"&&!dn(a))throw new Error(i+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(u)}),dd(i,o)}},Ui=function(t,e,n){if(!(n&&e===void 0)){if(On(e))throw new Error(fe(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!dn(e))throw new Error(fe(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},pd=function(t,e,n){if(!(n&&e===void 0))switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(fe(t,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}},vn=function(t,e,n,r){if(!(r&&n===void 0)&&!rr(n))throw new Error(fe(t,e)+'was an invalid key = "'+n+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},gn=function(t,e,n,r){if(!(r&&n===void 0)&&!Da(n))throw new Error(fe(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},vd=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),gn(t,e,n,r)},pe=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Fa=function(t,e){var n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!rr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!hd(n))throw new Error(fe(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)},gd=function(t,e,n,r){if(!(r&&n===void 0)&&typeof n!="boolean")throw new Error(fe(t,e)+"must be a boolean.")};/**
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
 */var _d=function(){function t(){this.eventLists_=[],this.recursionDepth_=0}return t}();function ir(t,e){for(var n=null,r=0;r<e.length;r++){var i=e[r],o=i.getPath();n!==null&&!ti(o,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:o}),n.events.push(i)}n&&t.eventLists_.push(n)}function Bi(t,e,n){ir(t,n),Ua(t,function(r){return ti(r,e)})}function ve(t,e,n){ir(t,n),Ua(t,function(r){return de(r,e)||de(e,r)})}function Ua(t,e){t.recursionDepth_++;for(var n=!0,r=0;r<t.eventLists_.length;r++){var i=t.eventLists_[r];if(i){var o=i.path;e(o)?(md(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function md(t){for(var e=0;e<t.events.length;e++){var n=t.events[e];if(n!==null){t.events[e]=null;var r=n.getEventRunner();at&&K("event: "+n.toString()),Rt(r)}}}/**
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
 */var Ba="repo_interrupt",yd=25,bd=function(){function t(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new _d,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=jn(),this.transactionQueueTree_=new xi,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}return t.prototype.toString=function(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host},t}();function Td(t,e,n){if(t.stats_=Xr(t.repoInfo_),t.forceRestClient_||jc())t.server_=new $f(t.repoInfo_,function(r,i,o,s){ja(t,r,i,o,s)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(function(){return Va(t,!0)},0);else{if(typeof n!="undefined"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{W(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new ft(t.repoInfo_,e,function(r,i,o,s){ja(t,r,i,o,s)},function(r){Va(t,r)},function(r){Ed(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(function(r){t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(function(r){t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=zc(t.repoInfo_,function(){return new Zf(t.stats_,t.server_)}),t.infoData_=new Qf,t.infoSyncTree_=new Sa({startListening:function(r,i,o,s){var a=[],u=t.infoData_.getNode(r._path);return u.isEmpty()||(a=cn(t.infoSyncTree_,r._path,u),setTimeout(function(){s("ok")},0)),a},stopListening:function(){}}),Wi(t,"connected",!1),t.serverSyncTree_=new Sa({startListening:function(r,i,o,s){return t.server_.listen(r,o,i,function(a,u){var l=s(a,u);ve(t.eventQueue_,r._path,l)}),[]},stopListening:function(r,i){t.server_.unlisten(r,i)}})}function Wa(t){var e=t.infoData_.getNode(new A(".info/serverTimeOffset")),n=e.val()||0;return new Date().getTime()+n}function _n(t){return id({timestamp:Wa(t)})}function ja(t,e,n,r,i){t.dataUpdateCount++;var o=new A(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;var s=[];if(i)if(r){var a=Pn(n,function(h){return F(h)});s=Yh(t.serverSyncTree_,o,a,i)}else{var u=F(n);s=Qh(t.serverSyncTree_,o,u,i)}else if(r){var l=Pn(n,function(h){return F(h)});s=Kh(t.serverSyncTree_,o,l)}else{var c=F(n);s=cn(t.serverSyncTree_,o,c)}var f=o;s.length>0&&(f=Lt(t,o)),ve(t.eventQueue_,f,s)}function wd(t,e){t.interceptServerDataCallback_=e}function Va(t,e){Wi(t,"connected",e),e===!1&&Sd(t)}function Ed(t,e){j(e,function(n,r){Wi(t,n,r)})}function Wi(t,e,n){var r=new A("/.info/"+e),i=F(n);t.infoData_.updateSnapshot(r,i);var o=cn(t.infoSyncTree_,r,i);ve(t.eventQueue_,r,o)}function or(t){return t.nextWriteId_++}function Cd(t,e){var n=Xh(t.serverSyncTree_,e);return n!=null?Promise.resolve(n):t.server_.get(e).then(function(r){var i=F(r).withIndex(e._queryParams.getIndex()),o=cn(t.serverSyncTree_,e._path,i);return Bi(t.eventQueue_,e._path,o),Promise.resolve(i)},function(r){return Dt(t,"get for query "+W(e)+" failed: "+r),Promise.reject(new Error(r))})}function ji(t,e,n,r,i){Dt(t,"set",{path:e.toString(),value:n,priority:r});var o=_n(t),s=F(n,r),a=Jn(t.serverSyncTree_,e),u=Oi(s,a,o),l=or(t),c=Ri(t.serverSyncTree_,e,u,l,!0);ir(t.eventQueue_,c),t.server_.put(e.toString(),s.val(!0),function(h,d){var p=h==="ok";p||Q("set at "+e+" failed: "+h);var m=Je(t.serverSyncTree_,l,!p);ve(t.eventQueue_,e,m),Ze(t,i,h,d)});var f=Gi(t,e);Lt(t,f),ve(t.eventQueue_,f,[])}function Id(t,e,n,r){Dt(t,"update",{path:e.toString(),value:n});var i=!0,o=_n(t),s={};if(j(n,function(l,c){i=!1,s[l]=Oa(D(e,l),F(c),t.serverSyncTree_,o)}),i)K("update() called with empty data.  Don't do anything."),Ze(t,r,"ok",void 0);else{var a=or(t),u=qh(t.serverSyncTree_,e,s,a);ir(t.eventQueue_,u),t.server_.merge(e.toString(),n,function(l,c){var f=l==="ok";f||Q("update at "+e+" failed: "+l);var h=Je(t.serverSyncTree_,a,!f),d=h.length>0?Lt(t,e):e;ve(t.eventQueue_,d,h),Ze(t,r,l,c)}),j(n,function(l){var c=Gi(t,D(e,l));Lt(t,c)}),ve(t.eventQueue_,e,[])}}function Sd(t){Dt(t,"onDisconnectEvents");var e=_n(t),n=jn();hi(t.onDisconnect_,k(),function(i,o){var s=Oa(i,o,t.serverSyncTree_,e);Ot(n,i,s)});var r=[];hi(n,k(),function(i,o){r=r.concat(cn(t.serverSyncTree_,i,o));var s=Gi(t,i);Lt(t,s)}),t.onDisconnect_=jn(),ve(t.eventQueue_,k(),r)}function Rd(t,e,n){t.server_.onDisconnectCancel(e.toString(),function(r,i){r==="ok"&&fi(t.onDisconnect_,e),Ze(t,n,r,i)})}function Ha(t,e,n,r){var i=F(n);t.server_.onDisconnectPut(e.toString(),i.val(!0),function(o,s){o==="ok"&&Ot(t.onDisconnect_,e,i),Ze(t,r,o,s)})}function kd(t,e,n,r,i){var o=F(n,r);t.server_.onDisconnectPut(e.toString(),o.val(!0),function(s,a){s==="ok"&&Ot(t.onDisconnect_,e,o),Ze(t,i,s,a)})}function Ad(t,e,n,r){if(Ur(n)){K("onDisconnect().update() called with empty data.  Don't do anything."),Ze(t,r,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,function(i,o){i==="ok"&&j(n,function(s,a){var u=F(a);Ot(t.onDisconnect_,D(e,s),u)}),Ze(t,r,i,o)})}function Pd(t,e,n){var r;I(e._path)===".info"?r=Ra(t.infoSyncTree_,e,n):r=Ra(t.serverSyncTree_,e,n),Bi(t.eventQueue_,e._path,r)}function Vi(t,e,n){var r;I(e._path)===".info"?r=ki(t.infoSyncTree_,e,n):r=ki(t.serverSyncTree_,e,n),Bi(t.eventQueue_,e._path,r)}function Ga(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Ba)}function Nd(t){t.persistentConnection_&&t.persistentConnection_.resume(Ba)}function Od(t,e){if(e===void 0&&(e=!1),typeof console!="undefined"){var n;e?(t.statsListener_||(t.statsListener_=new ta(t.stats_)),n=t.statsListener_.get()):n=t.stats_.get();var r=Object.keys(n).reduce(function(i,o){return Math.max(o.length,i)},0);j(n,function(i,o){for(var s=i,a=i.length;a<r+2;a++)s+=" ";console.log(s+o)})}}function Md(t,e){t.stats_.incrementCounter(e),eh(t.statsReporter_,e)}function Dt(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r="";t.persistentConnection_&&(r=t.persistentConnection_.id+":"),K.apply(void 0,q([r],ue(e)))}function Ze(t,e,n,r){e&&Rt(function(){if(n==="ok")e(null);else{var i=(n||"error").toUpperCase(),o=i;r&&(o+=": "+r);var s=new Error(o);s.code=i,e(s)}})}function xd(t,e,n,r,i,o){Dt(t,"transaction on "+e);var s={path:e,update:n,onComplete:r,status:null,order:ns(),applyLocally:o,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Hi(t,e,void 0);s.currentInputSnapshot=a;var u=s.update(a.val());if(u===void 0)s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete&&s.onComplete(null,!1,s.currentInputSnapshot);else{pn("transaction failed: Data returned ",u,s.path),s.status=0;var l=tr(t.transactionQueueTree_,e),c=pt(l)||[];c.push(s),Di(l,c);var f=void 0;if(typeof u=="object"&&u!==null&&Ee(u,".priority"))f=ot(u,".priority"),_(dn(f),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");else{var h=Jn(t.serverSyncTree_,e)||E.EMPTY_NODE;f=h.getPriority().val()}var d=_n(t),p=F(u,f),m=Oi(p,a,d);s.currentOutputSnapshotRaw=p,s.currentOutputSnapshotResolved=m,s.currentWriteId=or(t);var y=Ri(t.serverSyncTree_,e,m,s.currentWriteId,s.applyLocally);ve(t.eventQueue_,e,y),sr(t,t.transactionQueueTree_)}}function Hi(t,e,n){return Jn(t.serverSyncTree_,e,n)||E.EMPTY_NODE}function sr(t,e){if(e===void 0&&(e=t.transactionQueueTree_),e||ar(t,e),pt(e)){var n=Ka(t,e);_(n.length>0,"Sending zero length transaction queue");var r=n.every(function(i){return i.status===0});r&&Dd(t,hn(e),n)}else Ma(e)&&nr(e,function(i){sr(t,i)})}function Dd(t,e,n){for(var r=n.map(function(h){return h.currentWriteId}),i=Hi(t,e,r),o=i,s=i.hash(),a=0;a<n.length;a++){var u=n[a];_(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;var l=ne(e,u.path);o=o.updateChild(l,u.currentOutputSnapshotRaw)}var c=o.val(!0),f=e;t.server_.put(f.toString(),c,function(h){Dt(t,"transaction put response",{path:f.toString(),status:h});var d=[];if(h==="ok"){for(var p=[],m=function(b){n[b].status=2,d=d.concat(Je(t.serverSyncTree_,n[b].currentWriteId)),n[b].onComplete&&p.push(function(){return n[b].onComplete(null,!0,n[b].currentOutputSnapshotResolved)}),n[b].unwatcher()},y=0;y<n.length;y++)m(y);ar(t,tr(t.transactionQueueTree_,e)),sr(t,t.transactionQueueTree_),ve(t.eventQueue_,e,d);for(var y=0;y<p.length;y++)Rt(p[y])}else{if(h==="datastale")for(var y=0;y<n.length;y++)n[y].status===3?n[y].status=4:n[y].status=0;else{Q("transaction at "+f.toString()+" failed: "+h);for(var y=0;y<n.length;y++)n[y].status=4,n[y].abortReason=h}Lt(t,e)}},s)}function Lt(t,e){var n=qa(t,e),r=hn(n),i=Ka(t,n);return Ld(t,i,r),r}function Ld(t,e,n){if(e.length!==0){for(var r=[],i=[],o=e.filter(function(l){return l.status===0}),s=o.map(function(l){return l.currentWriteId}),a=function(l){var c=e[l],f=ne(n,c.path),h=!1,d;if(_(f!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,d=c.abortReason,i=i.concat(Je(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=yd)h=!0,d="maxretry",i=i.concat(Je(t.serverSyncTree_,c.currentWriteId,!0));else{var p=Hi(t,c.path,s);c.currentInputSnapshot=p;var m=e[l].update(p.val());if(m!==void 0){pn("transaction failed: Data returned ",m,c.path);var y=F(m),b=typeof m=="object"&&m!=null&&Ee(m,".priority");b||(y=y.updatePriority(p.getPriority()));var C=c.currentWriteId,N=_n(t),z=Oi(y,p,N);c.currentOutputSnapshotRaw=y,c.currentOutputSnapshotResolved=z,c.currentWriteId=or(t),s.splice(s.indexOf(C),1),i=i.concat(Ri(t.serverSyncTree_,c.path,z,c.currentWriteId,c.applyLocally)),i=i.concat(Je(t.serverSyncTree_,C,!0))}else h=!0,d="nodata",i=i.concat(Je(t.serverSyncTree_,c.currentWriteId,!0))}ve(t.eventQueue_,n,i),i=[],h&&(e[l].status=2,function(L){setTimeout(L,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(d==="nodata"?r.push(function(){return e[l].onComplete(null,!1,e[l].currentInputSnapshot)}):r.push(function(){return e[l].onComplete(new Error(d),!1,null)})))},u=0;u<e.length;u++)a(u);ar(t,t.transactionQueueTree_);for(var u=0;u<r.length;u++)Rt(r[u]);sr(t,t.transactionQueueTree_)}}function qa(t,e){var n,r=t.transactionQueueTree_;for(n=I(e);n!==null&&pt(r)===void 0;)r=tr(r,n),e=O(e),n=I(e);return r}function Ka(t,e){var n=[];return za(t,e,n),n.sort(function(r,i){return r.order-i.order}),n}function za(t,e,n){var r=pt(e);if(r)for(var i=0;i<r.length;i++)n.push(r[i]);nr(e,function(o){za(t,o,n)})}function ar(t,e){var n=pt(e);if(n){for(var r=0,i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,Di(e,n.length>0?n:void 0)}nr(e,function(o){ar(t,o)})}function Gi(t,e){var n=hn(qa(t,e)),r=tr(t.transactionQueueTree_,e);return ud(r,function(i){qi(t,i)}),qi(t,r),xa(r,function(i){qi(t,i)}),n}function qi(t,e){var n=pt(e);if(n){for(var r=[],i=[],o=-1,s=0;s<n.length;s++)n[s].status===3||(n[s].status===1?(_(o===s-1,"All SENT items should be at beginning of queue."),o=s,n[s].status=3,n[s].abortReason="set"):(_(n[s].status===0,"Unexpected transaction status in abort"),n[s].unwatcher(),i=i.concat(Je(t.serverSyncTree_,n[s].currentWriteId,!0)),n[s].onComplete&&r.push(n[s].onComplete.bind(null,new Error("set"),!1,null))));o===-1?Di(e,void 0):n.length=o+1,ve(t.eventQueue_,hn(e),i);for(var s=0;s<r.length;s++)Rt(r[s])}}/**
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
 */function Fd(t){for(var e="",n=t.split("/"),r=0;r<n.length;r++)if(n[r].length>0){var i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Ud(t){var e,n,r={};t.charAt(0)==="?"&&(t=t.substring(1));try{for(var i=te(t.split("&")),o=i.next();!o.done;o=i.next()){var s=o.value;if(s.length!==0){var a=s.split("=");a.length===2?r[decodeURIComponent(a[0])]=decodeURIComponent(a[1]):Q("Invalid query segment '"+s+"' in query '"+t+"'")}}}catch(u){e={error:u}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}var Ki=function(t,e){var n=Bd(t),r=n.namespace;n.domain==="firebase.com"&&Pe(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Pe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||xc();var i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new $r(n.host,n.secure,r,e,i,"",r!==n.subdomain),path:new A(n.pathString)}},Bd=function(t){var e="",n="",r="",i="",o="",s=!0,a="https",u=443;if(typeof t=="string"){var l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));var c=t.indexOf("/");c===-1&&(c=t.length);var f=t.indexOf("?");f===-1&&(f=t.length),e=t.substring(0,Math.min(c,f)),c<f&&(i=Fd(t.substring(c,f)));var h=Ud(t.substring(Math.min(t.length,f)));l=e.indexOf(":"),l>=0?(s=a==="https"||a==="wss",u=parseInt(e.substring(l+1),10)):l=e.length;var d=e.slice(0,l);if(d.toLowerCase()==="localhost")n="localhost";else if(d.split(".").length<=2)n=d;else{var p=e.indexOf(".");r=e.substring(0,p).toLowerCase(),n=e.substring(p+1),o=r}"ns"in h&&(o=h.ns)}return{host:e,port:u,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}};/**
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
 */var $a=function(){function t(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}return t.prototype.getPath=function(){var e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path},t.prototype.getEventType=function(){return this.eventType},t.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},t.prototype.toString=function(){return this.getPath().toString()+":"+this.eventType+":"+W(this.snapshot.exportVal())},t}(),Qa=function(){function t(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}return t.prototype.getPath=function(){return this.path},t.prototype.getEventType=function(){return"cancel"},t.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},t.prototype.toString=function(){return this.path.toString()+":cancel"},t}();/**
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
 */var Ya=function(){function t(e,n){this.snapshotCallback=e,this.cancelCallback=n}return t.prototype.onValue=function(e,n){this.snapshotCallback.call(null,e,n)},t.prototype.onCancel=function(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)},Object.defineProperty(t.prototype,"hasCancelCallback",{get:function(){return!!this.cancelCallback},enumerable:!1,configurable:!0}),t.prototype.matches=function(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context},t}();/**
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
 */var Wd=function(){function t(e,n){this._repo=e,this._path=n}return t.prototype.cancel=function(){var e=new $;return Rd(this._repo,this._path,e.wrapCallback(function(){})),e.promise},t.prototype.remove=function(){pe("OnDisconnect.remove",this._path);var e=new $;return Ha(this._repo,this._path,null,e.wrapCallback(function(){})),e.promise},t.prototype.set=function(e){pe("OnDisconnect.set",this._path),Me("OnDisconnect.set",e,this._path,!1);var n=new $;return Ha(this._repo,this._path,e,n.wrapCallback(function(){})),n.promise},t.prototype.setWithPriority=function(e,n){pe("OnDisconnect.setWithPriority",this._path),Me("OnDisconnect.setWithPriority",e,this._path,!1),Ui("OnDisconnect.setWithPriority",n,!1);var r=new $;return kd(this._repo,this._path,e,n,r.wrapCallback(function(){})),r.promise},t.prototype.update=function(e){pe("OnDisconnect.update",this._path),La("OnDisconnect.update",e,this._path,!1);var n=new $;return Ad(this._repo,this._path,e,n.wrapCallback(function(){})),n.promise},t}();/**
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
 */var ge=function(){function t(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}return Object.defineProperty(t.prototype,"key",{get:function(){return S(this._path)?null:ei(this._path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ref",{get:function(){return new xe(this._repo,this._path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_queryIdentifier",{get:function(){var e=ea(this._queryParams),n=Gr(e);return n==="{}"?"default":n},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_queryObject",{get:function(){return ea(this._queryParams)},enumerable:!1,configurable:!0}),t.prototype.isEqual=function(e){if(e=U(e),!(e instanceof t))return!1;var n=this._repo===e._repo,r=ti(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i},t.prototype.toJSON=function(){return this.toString()},t.prototype.toString=function(){return this._repo.toString()+mf(this._path)},t}();function ur(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function et(t){var e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===Oe){var r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){var o=t.getIndexStartName();if(o!==Ue)throw new Error(r);if(typeof e!="string")throw new Error(i)}if(t.hasEnd()){var s=t.getIndexEndName();if(s!==Ne)throw new Error(r);if(typeof n!="string")throw new Error(i)}}else if(t.getIndex()===M){if(e!=null&&!dn(e)||n!=null&&!dn(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(_(t.getIndex()instanceof oi||t.getIndex()===si,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function lr(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}var xe=function(t){x(e,t);function e(n,r){return t.call(this,n,r,new Js,!1)||this}return Object.defineProperty(e.prototype,"parent",{get:function(){var n=Ls(this._path);return n===null?null:new e(this._repo,n)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){for(var n=this;n.parent!==null;)n=n.parent;return n},enumerable:!1,configurable:!0}),e}(ge),cr=function(){function t(e,n,r){this._node=e,this.ref=n,this._index=r}return Object.defineProperty(t.prototype,"priority",{get:function(){return this._node.getPriority().val()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"key",{get:function(){return this.ref.key},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return this._node.numChildren()},enumerable:!1,configurable:!0}),t.prototype.child=function(e){var n=new A(e),r=vt(this.ref,e);return new t(this._node.getChild(n),r,M)},t.prototype.exists=function(){return!this._node.isEmpty()},t.prototype.exportVal=function(){return this._node.val(!0)},t.prototype.forEach=function(e){var n=this;if(this._node.isLeafNode())return!1;var r=this._node;return!!r.forEachChild(this._index,function(i,o){return e(new t(o,vt(n.ref,i),M))})},t.prototype.hasChild=function(e){var n=new A(e);return!this._node.getChild(n).isEmpty()},t.prototype.hasChildren=function(){return this._node.isLeafNode()?!1:!this._node.isEmpty()},t.prototype.toJSON=function(){return this.exportVal()},t.prototype.val=function(){return this._node.val()},t}();function Xa(t,e){return t=U(t),t._checkNotDeleted("ref"),e!==void 0?vt(t._root,e):t._root}function Ja(t,e){t=U(t),t._checkNotDeleted("refFromURL");var n=Ki(e,t._repo.repoInfo_.nodeAdmin);Fa("refFromURL",n);var r=n.repoInfo;return!t._repo.repoInfo_.isCustomHost()&&r.host!==t._repo.repoInfo_.host&&Pe("refFromURL: Host name does not match the current database: (found "+r.host+" but expected "+t._repo.repoInfo_.host+")"),Xa(t,n.path.toString())}function vt(t,e){return t=U(t),I(t._path)===null?vd("child","path",e,!1):gn("child","path",e,!1),new xe(t._repo,D(t._path,e))}function jd(t,e){t=U(t),pe("push",t._path),Me("push",e,t._path,!0);var n=Wa(t._repo),r=Wf(n),i=vt(t,r),o=vt(t,r),s;return e!=null?s=zi(o,e).then(function(){return o}):s=Promise.resolve(o),i.then=s.then.bind(s),i.catch=s.then.bind(s,void 0),i}function Vd(t){return pe("remove",t._path),zi(t,null)}function zi(t,e){t=U(t),pe("set",t._path),Me("set",e,t._path,!1);var n=new $;return ji(t._repo,t._path,e,null,n.wrapCallback(function(){})),n.promise}function Hd(t,e){t=U(t),pe("setPriority",t._path),Ui("setPriority",e,!1);var n=new $;return ji(t._repo,D(t._path,".priority"),e,null,n.wrapCallback(function(){})),n.promise}function Gd(t,e,n){if(pe("setWithPriority",t._path),Me("setWithPriority",e,t._path,!1),Ui("setWithPriority",n,!1),t.key===".length"||t.key===".keys")throw"setWithPriority failed: "+t.key+" is a read-only object.";var r=new $;return ji(t._repo,t._path,e,n,r.wrapCallback(function(){})),r.promise}function qd(t,e){La("update",e,t._path,!1);var n=new $;return Id(t._repo,t._path,e,n.wrapCallback(function(){})),n.promise}function Kd(t){return t=U(t),Cd(t._repo,t).then(function(e){return new cr(e,new xe(t._repo,t._path),t._queryParams.getIndex())})}var Za=function(){function t(e){this.callbackContext=e}return t.prototype.respondsTo=function(e){return e==="value"},t.prototype.createEvent=function(e,n){var r=n._queryParams.getIndex();return new $a("value",this,new cr(e.snapshotNode,new xe(n._repo,n._path),r))},t.prototype.getEventRunner=function(e){var n=this;return e.getEventType()==="cancel"?function(){return n.callbackContext.onCancel(e.error)}:function(){return n.callbackContext.onValue(e.snapshot,null)}},t.prototype.createCancelEvent=function(e,n){return this.callbackContext.hasCancelCallback?new Qa(this,e,n):null},t.prototype.matches=function(e){return e instanceof t?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1},t.prototype.hasAnyCallback=function(){return this.callbackContext!==null},t}(),eu=function(){function t(e,n){this.eventType=e,this.callbackContext=n}return t.prototype.respondsTo=function(e){var n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n},t.prototype.createCancelEvent=function(e,n){return this.callbackContext.hasCancelCallback?new Qa(this,e,n):null},t.prototype.createEvent=function(e,n){_(e.childName!=null,"Child events should have a childName.");var r=vt(new xe(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new $a(e.type,this,new cr(e.snapshotNode,r,i),e.prevName)},t.prototype.getEventRunner=function(e){var n=this;return e.getEventType()==="cancel"?function(){return n.callbackContext.onCancel(e.error)}:function(){return n.callbackContext.onValue(e.snapshot,e.prevName)}},t.prototype.matches=function(e){return e instanceof t?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1},t.prototype.hasAnyCallback=function(){return!!this.callbackContext},t}();function mn(t,e,n,r,i){var o;if(typeof r=="object"&&(o=void 0,i=r),typeof r=="function"&&(o=r),i&&i.onlyOnce){var s=n,a=function(c,f){Vi(t._repo,t,l),s(c,f)};a.userCallback=n.userCallback,a.context=n.context,n=a}var u=new Ya(n,o||void 0),l=e==="value"?new Za(u):new eu(e,u);return Pd(t._repo,t,l),function(){return Vi(t._repo,t,l)}}function $i(t,e,n,r){return mn(t,"value",e,n,r)}function tu(t,e,n,r){return mn(t,"child_added",e,n,r)}function nu(t,e,n,r){return mn(t,"child_changed",e,n,r)}function ru(t,e,n,r){return mn(t,"child_moved",e,n,r)}function iu(t,e,n,r){return mn(t,"child_removed",e,n,r)}function ou(t,e,n){var r=null,i=n?new Ya(n):null;e==="value"?r=new Za(i):e&&(r=new eu(e,i)),Vi(t._repo,t,r)}var Se=function(){function t(){}return t}(),su=function(t){x(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){Me("endAt",this._value,n._path,!0);var r=ci(n._queryParams,this._value,this._key);if(lr(r),et(r),n._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new ge(n._repo,n._path,r,n._orderByCalled)},e}(Se);function zd(t,e){return vn("endAt","key",e,!0),new su(t,e)}var $d=function(t){x(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){Me("endBefore",this._value,n._path,!1);var r=zf(n._queryParams,this._value,this._key);if(lr(r),et(r),n._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new ge(n._repo,n._path,r,n._orderByCalled)},e}(Se);function Qd(t,e){return vn("endBefore","key",e,!0),new $d(t,e)}var au=function(t){x(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){Me("startAt",this._value,n._path,!0);var r=li(n._queryParams,this._value,this._key);if(lr(r),et(r),n._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new ge(n._repo,n._path,r,n._orderByCalled)},e}(Se);function Yd(t,e){return t===void 0&&(t=null),vn("startAt","key",e,!0),new au(t,e)}var Xd=function(t){x(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){Me("startAfter",this._value,n._path,!1);var r=Kf(n._queryParams,this._value,this._key);if(lr(r),et(r),n._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new ge(n._repo,n._path,r,n._orderByCalled)},e}(Se);function Jd(t,e){return vn("startAfter","key",e,!0),new Xd(t,e)}var Zd=function(t){x(e,t);function e(n){var r=t.call(this)||this;return r._limit=n,r}return e.prototype._apply=function(n){if(n._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new ge(n._repo,n._path,Gf(n._queryParams,this._limit),n._orderByCalled)},e}(Se);function ep(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new Zd(t)}var tp=function(t){x(e,t);function e(n){var r=t.call(this)||this;return r._limit=n,r}return e.prototype._apply=function(n){if(n._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new ge(n._repo,n._path,qf(n._queryParams,this._limit),n._orderByCalled)},e}(Se);function np(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new tp(t)}var rp=function(t){x(e,t);function e(n){var r=t.call(this)||this;return r._path=n,r}return e.prototype._apply=function(n){ur(n,"orderByChild");var r=new A(this._path);if(S(r))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");var i=new oi(r),o=Wn(n._queryParams,i);return et(o),new ge(n._repo,n._path,o,!0)},e}(Se);function ip(t){if(t==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(t==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(t==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return gn("orderByChild","path",t,!1),new rp(t)}var op=function(t){x(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(n){ur(n,"orderByKey");var r=Wn(n._queryParams,Oe);return et(r),new ge(n._repo,n._path,r,!0)},e}(Se);function sp(){return new op}var ap=function(t){x(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(n){ur(n,"orderByPriority");var r=Wn(n._queryParams,M);return et(r),new ge(n._repo,n._path,r,!0)},e}(Se);function up(){return new ap}var lp=function(t){x(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._apply=function(n){ur(n,"orderByValue");var r=Wn(n._queryParams,si);return et(r),new ge(n._repo,n._path,r,!0)},e}(Se);function cp(){return new lp}var fp=function(t){x(e,t);function e(n,r){var i=t.call(this)||this;return i._value=n,i._key=r,i}return e.prototype._apply=function(n){if(Me("equalTo",this._value,n._path,!1),n._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(n._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new su(this._value,this._key)._apply(new au(this._value,this._key)._apply(n))},e}(Se);function hp(t,e){return vn("equalTo","key",e,!0),new fp(t,e)}function Re(t){for(var e,n,r=[],i=1;i<arguments.length;i++)r[i-1]=arguments[i];var o=U(t);try{for(var s=te(r),a=s.next();!a.done;a=s.next()){var u=a.value;o=u._apply(o)}}catch(l){e={error:l}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return o}Fh(xe);Vh(xe);/**
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
 */var dp="FIREBASE_DATABASE_EMULATOR_HOST",Qi={},uu=!1;function pp(t,e,n,r){t.repoInfo_=new $r(e+":"+n,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams),r&&(t.authTokenProvider_=r)}function lu(t,e,n,r,i){var o=r||t.options.databaseURL;o===void 0&&(t.options.projectId||Pe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),K("Using default host for project ",t.options.projectId),o=t.options.projectId+"-default-rtdb.firebaseio.com");var s=Ki(o,i),a=s.repoInfo,u,l=void 0;typeof process!="undefined"&&(l=process.env[dp]),l?(u=!0,o="http://"+l+"?ns="+a.namespace,s=Ki(o,i),a=s.repoInfo):u=!s.repoInfo.secure;var c=i&&u?new Zt(Zt.OWNER):new Hc(t.name,t.options,e);Fa("Invalid Firebase Database URL",s),S(s.path)||Pe("Database URL must point to the root of a Firebase Database (not including a child path).");var f=gp(a,t,c,new Vc(t.name,n));return new mp(f,t)}function vp(t,e){var n=Qi[e];(!n||n[t.key]!==t)&&Pe("Database "+e+"("+t.repoInfo_+") has already been deleted."),Ga(t),delete n[t.key]}function gp(t,e,n,r){var i=Qi[e.name];i||(i={},Qi[e.name]=i);var o=i[t.toURLString()];return o&&Pe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new bd(t,uu,n,r),i[t.toURLString()]=o,o}function _p(t){uu=t}var mp=function(){function t(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}return Object.defineProperty(t.prototype,"_repo",{get:function(){return this._instanceStarted||(Td(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"_root",{get:function(){return this._rootInternal||(this._rootInternal=new xe(this._repo,k())),this._rootInternal},enumerable:!1,configurable:!0}),t.prototype._delete=function(){return this._rootInternal!==null&&(vp(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()},t.prototype._checkNotDeleted=function(e){this._rootInternal===null&&Pe("Cannot call "+e+" on a deleted database.")},t}();function yp(t,e,n,r){r===void 0&&(r={}),t=U(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Pe("Cannot call useEmulator() after instance has already been initialized.");var i=t._repoInternal,o=void 0;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Pe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Zt(Zt.OWNER);else if(r.mockUserToken){var s=typeof r.mockUserToken=="string"?r.mockUserToken:Yo(r.mockUserToken,t.app.options.projectId);o=new Zt(s)}pp(i,e,n,o)}function bp(t){t=U(t),t._checkNotDeleted("goOffline"),Ga(t._repo)}function Tp(t){t=U(t),t._checkNotDeleted("goOnline"),Nd(t._repo)}/**
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
 */var wp={".sv":"timestamp"};function Ep(){return wp}function Cp(t){return{".sv":{increment:t}}}/**
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
 */var Ip=function(){function t(e,n){this.committed=e,this.snapshot=n}return t.prototype.toJSON=function(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}},t}();function Sp(t,e,n){var r;if(t=U(t),pe("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";var i=(r=n==null?void 0:n.applyLocally)!==null&&r!==void 0?r:!0,o=new $,s=function(u,l,c){var f=null;u?o.reject(u):(f=new cr(c,new xe(t._repo,t._path),M),o.resolve(new Ip(l,f)))},a=$i(t,function(){});return xd(t._repo,t._path,e,s,a,i),o.promise}/**
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
 */var Rp=function(){function t(e){this._delegate=e}return t.prototype.cancel=function(e){T("OnDisconnect.cancel",0,1,arguments.length),G("OnDisconnect.cancel","onComplete",e,!0);var n=this._delegate.cancel();return e&&n.then(function(){return e(null)},function(r){return e(r)}),n},t.prototype.remove=function(e){T("OnDisconnect.remove",0,1,arguments.length),G("OnDisconnect.remove","onComplete",e,!0);var n=this._delegate.remove();return e&&n.then(function(){return e(null)},function(r){return e(r)}),n},t.prototype.set=function(e,n){T("OnDisconnect.set",1,2,arguments.length),G("OnDisconnect.set","onComplete",n,!0);var r=this._delegate.set(e);return n&&r.then(function(){return n(null)},function(i){return n(i)}),r},t.prototype.setWithPriority=function(e,n,r){T("OnDisconnect.setWithPriority",2,3,arguments.length),G("OnDisconnect.setWithPriority","onComplete",r,!0);var i=this._delegate.setWithPriority(e,n);return r&&i.then(function(){return r(null)},function(o){return r(o)}),i},t.prototype.update=function(e,n){if(T("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){for(var r={},i=0;i<e.length;++i)r[""+i]=e[i];e=r,Q("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}G("OnDisconnect.update","onComplete",n,!0);var o=this._delegate.update(e);return n&&o.then(function(){return n(null)},function(s){return n(s)}),o},t}();/**
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
 */var kp=function(){function t(e,n){this.committed=e,this.snapshot=n}return t.prototype.toJSON=function(){return T("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}},t}();/**
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
 */var yn=function(){function t(e,n){this._database=e,this._delegate=n}return t.prototype.val=function(){return T("DataSnapshot.val",0,0,arguments.length),this._delegate.val()},t.prototype.exportVal=function(){return T("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()},t.prototype.toJSON=function(){return T("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()},t.prototype.exists=function(){return T("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()},t.prototype.child=function(e){return T("DataSnapshot.child",0,1,arguments.length),e=String(e),gn("DataSnapshot.child","path",e,!1),new t(this._database,this._delegate.child(e))},t.prototype.hasChild=function(e){return T("DataSnapshot.hasChild",1,1,arguments.length),gn("DataSnapshot.hasChild","path",e,!1),this._delegate.hasChild(e)},t.prototype.getPriority=function(){return T("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority},t.prototype.forEach=function(e){var n=this;return T("DataSnapshot.forEach",1,1,arguments.length),G("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(function(r){return e(new t(n._database,r))})},t.prototype.hasChildren=function(){return T("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()},Object.defineProperty(t.prototype,"key",{get:function(){return this._delegate.key},enumerable:!1,configurable:!0}),t.prototype.numChildren=function(){return T("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size},t.prototype.getRef=function(){return T("DataSnapshot.ref",0,0,arguments.length),new gt(this._database,this._delegate.ref)},Object.defineProperty(t.prototype,"ref",{get:function(){return this.getRef()},enumerable:!1,configurable:!0}),t}(),cu=function(){function t(e,n){this.database=e,this._delegate=n}return t.prototype.on=function(e,n,r,i){var o=this,s;T("Query.on",2,4,arguments.length),G("Query.on","callback",n,!1);var a=t.getCancelAndContextArgs_("Query.on",r,i),u=function(c,f){n.call(a.context,new yn(o.database,c),f)};u.userCallback=n,u.context=a.context;var l=(s=a.cancel)===null||s===void 0?void 0:s.bind(a.context);switch(e){case"value":return $i(this._delegate,u,l),n;case"child_added":return tu(this._delegate,u,l),n;case"child_removed":return iu(this._delegate,u,l),n;case"child_changed":return nu(this._delegate,u,l),n;case"child_moved":return ru(this._delegate,u,l),n;default:throw new Error(fe("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}},t.prototype.off=function(e,n,r){if(T("Query.off",0,3,arguments.length),pd("Query.off",e,!0),G("Query.off","callback",n,!0),Qo("Query.off","context",r,!0),n){var i=function(){};i.userCallback=n,i.context=r,ou(this._delegate,e,i)}else ou(this._delegate,e)},t.prototype.get=function(){var e=this;return Kd(this._delegate).then(function(n){return new yn(e.database,n)})},t.prototype.once=function(e,n,r,i){var o=this;T("Query.once",1,4,arguments.length),G("Query.once","callback",n,!0);var s=t.getCancelAndContextArgs_("Query.once",r,i),a=new $,u=function(c,f){var h=new yn(o.database,c);n&&n.call(s.context,h,f),a.resolve(h)};u.userCallback=n,u.context=s.context;var l=function(c){s.cancel&&s.cancel.call(s.context,c),a.reject(c)};switch(e){case"value":$i(this._delegate,u,l,{onlyOnce:!0});break;case"child_added":tu(this._delegate,u,l,{onlyOnce:!0});break;case"child_removed":iu(this._delegate,u,l,{onlyOnce:!0});break;case"child_changed":nu(this._delegate,u,l,{onlyOnce:!0});break;case"child_moved":ru(this._delegate,u,l,{onlyOnce:!0});break;default:throw new Error(fe("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return a.promise},t.prototype.limitToFirst=function(e){return T("Query.limitToFirst",1,1,arguments.length),new t(this.database,Re(this._delegate,ep(e)))},t.prototype.limitToLast=function(e){return T("Query.limitToLast",1,1,arguments.length),new t(this.database,Re(this._delegate,np(e)))},t.prototype.orderByChild=function(e){return T("Query.orderByChild",1,1,arguments.length),new t(this.database,Re(this._delegate,ip(e)))},t.prototype.orderByKey=function(){return T("Query.orderByKey",0,0,arguments.length),new t(this.database,Re(this._delegate,sp()))},t.prototype.orderByPriority=function(){return T("Query.orderByPriority",0,0,arguments.length),new t(this.database,Re(this._delegate,up()))},t.prototype.orderByValue=function(){return T("Query.orderByValue",0,0,arguments.length),new t(this.database,Re(this._delegate,cp()))},t.prototype.startAt=function(e,n){return e===void 0&&(e=null),T("Query.startAt",0,2,arguments.length),new t(this.database,Re(this._delegate,Yd(e,n)))},t.prototype.startAfter=function(e,n){return e===void 0&&(e=null),T("Query.startAfter",0,2,arguments.length),new t(this.database,Re(this._delegate,Jd(e,n)))},t.prototype.endAt=function(e,n){return e===void 0&&(e=null),T("Query.endAt",0,2,arguments.length),new t(this.database,Re(this._delegate,zd(e,n)))},t.prototype.endBefore=function(e,n){return e===void 0&&(e=null),T("Query.endBefore",0,2,arguments.length),new t(this.database,Re(this._delegate,Qd(e,n)))},t.prototype.equalTo=function(e,n){return T("Query.equalTo",1,2,arguments.length),new t(this.database,Re(this._delegate,hp(e,n)))},t.prototype.toString=function(){return T("Query.toString",0,0,arguments.length),this._delegate.toString()},t.prototype.toJSON=function(){return T("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()},t.prototype.isEqual=function(e){if(T("Query.isEqual",1,1,arguments.length),!(e instanceof t)){var n="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(n)}return this._delegate.isEqual(e._delegate)},t.getCancelAndContextArgs_=function(e,n,r){var i={cancel:void 0,context:void 0};if(n&&r)i.cancel=n,G(e,"cancel",i.cancel,!0),i.context=r,Qo(e,"context",i.context,!0);else if(n)if(typeof n=="object"&&n!==null)i.context=n;else if(typeof n=="function")i.cancel=n;else throw new Error(fe(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return i},Object.defineProperty(t.prototype,"ref",{get:function(){return new gt(this.database,new xe(this._delegate._repo,this._delegate._path))},enumerable:!1,configurable:!0}),t}(),gt=function(t){x(e,t);function e(n,r){var i=t.call(this,n,new ge(r._repo,r._path,new Js,!1))||this;return i.database=n,i._delegate=r,i}return e.prototype.getKey=function(){return T("Reference.key",0,0,arguments.length),this._delegate.key},e.prototype.child=function(n){return T("Reference.child",1,1,arguments.length),typeof n=="number"&&(n=String(n)),new e(this.database,vt(this._delegate,n))},e.prototype.getParent=function(){T("Reference.parent",0,0,arguments.length);var n=this._delegate.parent;return n?new e(this.database,n):null},e.prototype.getRoot=function(){return T("Reference.root",0,0,arguments.length),new e(this.database,this._delegate.root)},e.prototype.set=function(n,r){T("Reference.set",1,2,arguments.length),G("Reference.set","onComplete",r,!0);var i=zi(this._delegate,n);return r&&i.then(function(){return r(null)},function(o){return r(o)}),i},e.prototype.update=function(n,r){if(T("Reference.update",1,2,arguments.length),Array.isArray(n)){for(var i={},o=0;o<n.length;++o)i[""+o]=n[o];n=i,Q("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}pe("Reference.update",this._delegate._path),G("Reference.update","onComplete",r,!0);var s=qd(this._delegate,n);return r&&s.then(function(){return r(null)},function(a){return r(a)}),s},e.prototype.setWithPriority=function(n,r,i){T("Reference.setWithPriority",2,3,arguments.length),G("Reference.setWithPriority","onComplete",i,!0);var o=Gd(this._delegate,n,r);return i&&o.then(function(){return i(null)},function(s){return i(s)}),o},e.prototype.remove=function(n){T("Reference.remove",0,1,arguments.length),G("Reference.remove","onComplete",n,!0);var r=Vd(this._delegate);return n&&r.then(function(){return n(null)},function(i){return n(i)}),r},e.prototype.transaction=function(n,r,i){var o=this;T("Reference.transaction",1,3,arguments.length),G("Reference.transaction","transactionUpdate",n,!1),G("Reference.transaction","onComplete",r,!0),gd("Reference.transaction","applyLocally",i,!0);var s=Sp(this._delegate,n,{applyLocally:i}).then(function(a){return new kp(a.committed,new yn(o.database,a.snapshot))});return r&&s.then(function(a){return r(null,a.committed,a.snapshot)},function(a){return r(a,!1,null)}),s},e.prototype.setPriority=function(n,r){T("Reference.setPriority",1,2,arguments.length),G("Reference.setPriority","onComplete",r,!0);var i=Hd(this._delegate,n);return r&&i.then(function(){return r(null)},function(o){return r(o)}),i},e.prototype.push=function(n,r){var i=this;T("Reference.push",0,2,arguments.length),G("Reference.push","onComplete",r,!0);var o=jd(this._delegate,n),s=o.then(function(u){return new e(i.database,u)});r&&s.then(function(){return r(null)},function(u){return r(u)});var a=new e(this.database,o);return a.then=s.then.bind(s),a.catch=s.catch.bind(s,void 0),a},e.prototype.onDisconnect=function(){return pe("Reference.onDisconnect",this._delegate._path),new Rp(new Wd(this._delegate._repo,this._delegate._path))},Object.defineProperty(e.prototype,"key",{get:function(){return this.getKey()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this.getParent()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"root",{get:function(){return this.getRoot()},enumerable:!1,configurable:!0}),e}(cu);/**
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
 */var fr=function(){function t(e,n){var r=this;this._delegate=e,this.app=n,this.INTERNAL={delete:function(){return r._delegate._delete()}}}return t.prototype.useEmulator=function(e,n,r){r===void 0&&(r={}),yp(this._delegate,e,n,r)},t.prototype.ref=function(e){if(T("database.ref",0,1,arguments.length),e instanceof gt){var n=Ja(this._delegate,e.toString());return new gt(this,n)}else{var n=Xa(this._delegate,e);return new gt(this,n)}},t.prototype.refFromURL=function(e){var n="database.refFromURL";T(n,1,1,arguments.length);var r=Ja(this._delegate,e);return new gt(this,r)},t.prototype.goOffline=function(){return T("database.goOffline",0,0,arguments.length),bp(this._delegate)},t.prototype.goOnline=function(){return T("database.goOnline",0,0,arguments.length),Tp(this._delegate)},t.ServerValue={TIMESTAMP:Ep(),increment:function(e){return Cp(e)}},t}();/**
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
 */var Ap=function(){lt.forceDisallow(),Jr.forceAllow()},Pp=function(){Jr.forceDisallow()},Np=function(){return lt.isAvailable()},Op=function(t,e){var n=t._delegate._repo.persistentConnection_;n.securityDebugCallback_=e},Mp=function(t,e){Od(t._delegate._repo,e)},xp=function(t,e){Md(t._delegate._repo,e)},Dp=function(t){return t._delegate._repo.dataUpdateCount},Lp=function(t,e){return wd(t._delegate._repo,e)};function Fp(t){var e=t.app,n=t.url,r=t.version,i=t.customAuthImpl,o=t.namespace,s=t.nodeAdmin,a=s===void 0?!1:s;es(r);var u=new wc("auth-internal",new Ec("database-standalone"));return u.setComponent(new he("auth-internal",function(){return i},"PRIVATE")),{instance:new fr(lu(e,u,void 0,n,a),e),namespace:o}}var Up=Object.freeze({__proto__:null,forceLongPolling:Ap,forceWebSockets:Pp,isWebSocketsAvailable:Np,setSecurityDebugCallback:Op,stats:Mp,statsIncrementCounter:xp,dataUpdateCount:Dp,interceptServerData:Lp,initStandalone:Fp});/**
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
 */var Bp=ft;ft.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ft.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};var Wp=Ps,jp=function(t){var e=ft.prototype.put;return ft.prototype.put=function(n,r,i,o){o!==void 0&&(o=t()),e.call(this,n,r,i,o)},function(){ft.prototype.put=e}},Vp=$r,Hp=function(t){return t._delegate._queryIdentifier},Gp=function(t){_p(t)},qp=Object.freeze({__proto__:null,DataConnection:Bp,RealTimeConnection:Wp,hijackHash:jp,ConnectionTarget:Vp,queryIdentifier:Hp,forceRestClient:Gp});/**
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
 */var Kp=fr.ServerValue;function zp(t){es(t.SDK_VERSION),t.INTERNAL.registerComponent(new he("database",function(e,n){var r=n.instanceIdentifier,i=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new fr(lu(i,o,s,r),i)},"PUBLIC").setServiceProps({Reference:gt,Query:cu,Database:fr,DataSnapshot:yn,enableLogging:os,INTERNAL:Up,ServerValue:Kp,TEST_ACCESS:qp}).setMultipleInstances(!0)),t.registerVersion(Pc,Nc)}zp(ae);/**
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
 */function $p(t){t.prototype.loadBundle=Rc,t.prototype.namedQuery=kc}$p(Ac);/**
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
 */var fu={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},Ft=function(t){x(e,t);function e(n,r,i){var o=t.call(this,r)||this;return Object.setPrototypeOf(o,e.prototype),o.code=n,o.details=i,o}return e}(Error);function Qp(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Yp(t,e,n){var r=Qp(t),i=r,o=void 0;try{var s=e&&e.error;if(s){var a=s.status;if(typeof a=="string"){if(!fu[a])return new Ft("internal","internal");r=fu[a],i=a}var u=s.message;typeof u=="string"&&(i=u),o=s.details,o!==void 0&&(o=n.decode(o))}}catch{}return r==="ok"?null:new Ft(r,i,o)}var Xp=function(){function t(e,n){var r=this;this.auth=null,this.messaging=null,this.auth=e.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||e.get().then(function(i){return r.auth=i},function(){}),this.messaging||n.get().then(function(i){return r.messaging=i},function(){})}return t.prototype.getAuthToken=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:if(!this.auth)return[2,void 0];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return e=n.sent(),e?[2,e.accessToken]:[2,void 0];case 3:return n.sent(),[2,void 0];case 4:return[2]}})})},t.prototype.getInstanceIdToken=function(){return v(this,void 0,void 0,function(){return g(this,function(e){switch(e.label){case 0:if(!this.messaging||!("Notification"in self)||Notification.permission!=="granted")return[2,void 0];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.messaging.getToken()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,void 0];case 4:return[2]}})})},t.prototype.getContext=function(){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return[4,this.getAuthToken()];case 1:return e=r.sent(),[4,this.getInstanceIdToken()];case 2:return n=r.sent(),[2,{authToken:e,instanceIdToken:n}]}})})},t}();/**
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
 */var Jp="type.googleapis.com/google.protobuf.Int64Value",Zp="type.googleapis.com/google.protobuf.UInt64Value";function hu(t,e){var n={};for(var r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}var ev=function(){function t(){}return t.prototype.encode=function(e){var n=this;if(e==null)return null;if(e instanceof Number&&(e=e.valueOf()),typeof e=="number"&&isFinite(e)||e===!0||e===!1||Object.prototype.toString.call(e)==="[object String]")return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(function(r){return n.encode(r)});if(typeof e=="function"||typeof e=="object")return hu(e,function(r){return n.encode(r)});throw new Error("Data cannot be encoded in JSON: "+e)},t.prototype.decode=function(e){var n=this;if(e==null)return e;if(e["@type"])switch(e["@type"]){case Jp:case Zp:{var r=Number(e.value);if(isNaN(r))throw new Error("Data cannot be decoded from JSON: "+e);return r}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(function(i){return n.decode(i)}):typeof e=="function"||typeof e=="object"?hu(e,function(i){return n.decode(i)}):e},t}();/**
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
 */function tv(t){var e,n=new Promise(function(r,i){e=setTimeout(function(){i(new Ft("deadline-exceeded","deadline-exceeded"))},t)});return{timer:e,promise:n}}var du=function(){function t(e,n,r,i,o,s){var a=this;o===void 0&&(o="us-central1"),this.app_=e,this.appCheckProvider=i,this.fetchImpl=s,this.serializer=new ev,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return Promise.resolve(a.deleteService())}},this.contextProvider=new Xp(n,r),this.cancelAllRequests=new Promise(function(l){a.deleteService=function(){return l()}});try{var u=new URL(o);this.customDomain=u.origin,this.region="us-central1"}catch{this.customDomain=null,this.region=o}}return Object.defineProperty(t.prototype,"app",{get:function(){return this.app_},enumerable:!1,configurable:!0}),t.prototype._url=function(e){var n=this.app_.options.projectId;if(this.emulatorOrigin!==null){var r=this.emulatorOrigin;return r+"/"+n+"/"+this.region+"/"+e}return this.customDomain!==null?this.customDomain+"/"+e:"https://"+this.region+"-"+n+".cloudfunctions.net/"+e},t.prototype.useEmulator=function(e,n){this.emulatorOrigin="http://"+e+":"+n},t.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},t.prototype.httpsCallable=function(e,n){var r=this;return function(i){return r.call(e,i,n||{})}},t.prototype.postJSON=function(e,n,r){return v(this,void 0,void 0,function(){var i,o,s;return g(this,function(a){switch(a.label){case 0:return r["Content-Type"]="application/json",[4,this.getAppCheckToken()];case 1:i=a.sent(),i!==null&&(r["X-Firebase-AppCheck"]=i),a.label=2;case 2:return a.trys.push([2,4,,5]),[4,this.fetchImpl(e,{method:"POST",body:JSON.stringify(n),headers:r})];case 3:return o=a.sent(),[3,5];case 4:return a.sent(),[2,{status:0,json:null}];case 5:s=null,a.label=6;case 6:return a.trys.push([6,8,,9]),[4,o.json()];case 7:return s=a.sent(),[3,9];case 8:return a.sent(),[3,9];case 9:return[2,{status:o.status,json:s}]}})})},t.prototype.getAppCheckToken=function(){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return e=this.appCheckProvider.getImmediate({optional:!0}),e?[4,e.getToken()]:[3,2];case 1:return n=r.sent(),[2,n.token];case 2:return[2,null]}})})},t.prototype.call=function(e,n,r){return v(this,void 0,void 0,function(){var i,o,s,a,u,l,c,f,h,d,p,m;return g(this,function(y){switch(y.label){case 0:return i=this._url(e),n=this.serializer.encode(n),o={data:n},s={},[4,this.contextProvider.getContext()];case 1:return a=y.sent(),a.authToken&&(s.Authorization="Bearer "+a.authToken),a.instanceIdToken&&(s["Firebase-Instance-ID-Token"]=a.instanceIdToken),u=r.timeout||7e4,l=tv(u),c=l.timer,f=l.promise,[4,Promise.race([pu(c,this.postJSON(i,o,s)),f,pu(c,this.cancelAllRequests)])];case 2:if(h=y.sent(),!h)throw new Ft("cancelled","Firebase Functions instance was deleted.");if(d=Yp(h.status,h.json,this.serializer),d)throw d;if(!h.json)throw new Ft("internal","Response is not valid JSON object.");if(p=h.json.data,typeof p=="undefined"&&(p=h.json.result),typeof p=="undefined")throw new Ft("internal","Response is missing data field.");return m=this.serializer.decode(p),[2,{data:m}]}})})},t}();function pu(t,e){return v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:return[4,e];case 1:return n=r.sent(),clearTimeout(t),[2,n]}})})}/**
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
 */var nv="functions";function rv(t,e){var n={Functions:du};function r(i,o){var s=o.instanceIdentifier,a=i.getProvider("app").getImmediate(),u=i.getProvider("auth-internal"),l=i.getProvider("app-check-internal"),c=i.getProvider("messaging");return new du(a,u,c,l,s,e)}t.INTERNAL.registerComponent(new he(nv,r,"PUBLIC").setServiceProps(n).setMultipleInstances(!0))}var iv="@firebase/functions",ov="0.6.15";/**
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
 */rv(ae,fetch.bind(self));ae.registerVersion(iv,ov);function sv(t){return Array.prototype.slice.call(t)}function vu(t){return new Promise(function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function hr(t,e,n){var r,i=new Promise(function(o,s){r=t[e].apply(t,n),vu(r).then(o,s)});return i.request=r,i}function av(t,e,n){var r=hr(t,e,n);return r.then(function(i){if(!!i)return new bn(i,r.request)})}function Ut(t,e,n){n.forEach(function(r){Object.defineProperty(t.prototype,r,{get:function(){return this[e][r]},set:function(i){this[e][r]=i}})})}function Yi(t,e,n,r){r.forEach(function(i){i in n.prototype&&(t.prototype[i]=function(){return hr(this[e],i,arguments)})})}function dr(t,e,n,r){r.forEach(function(i){i in n.prototype&&(t.prototype[i]=function(){return this[e][i].apply(this[e],arguments)})})}function gu(t,e,n,r){r.forEach(function(i){i in n.prototype&&(t.prototype[i]=function(){return av(this[e],i,arguments)})})}function _t(t){this._index=t}Ut(_t,"_index",["name","keyPath","multiEntry","unique"]);Yi(_t,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]);gu(_t,"_index",IDBIndex,["openCursor","openKeyCursor"]);function bn(t,e){this._cursor=t,this._request=e}Ut(bn,"_cursor",["direction","key","primaryKey","value"]);Yi(bn,"_cursor",IDBCursor,["update","delete"]);["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(bn.prototype[t]=function(){var e=this,n=arguments;return Promise.resolve().then(function(){return e._cursor[t].apply(e._cursor,n),vu(e._request).then(function(r){if(!!r)return new bn(r,e._request)})})})});function De(t){this._store=t}De.prototype.createIndex=function(){return new _t(this._store.createIndex.apply(this._store,arguments))};De.prototype.index=function(){return new _t(this._store.index.apply(this._store,arguments))};Ut(De,"_store",["name","keyPath","indexNames","autoIncrement"]);Yi(De,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]);gu(De,"_store",IDBObjectStore,["openCursor","openKeyCursor"]);dr(De,"_store",IDBObjectStore,["deleteIndex"]);function Tn(t){this._tx=t,this.complete=new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}})}Tn.prototype.objectStore=function(){return new De(this._tx.objectStore.apply(this._tx,arguments))};Ut(Tn,"_tx",["objectStoreNames","mode"]);dr(Tn,"_tx",IDBTransaction,["abort"]);function pr(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new Tn(n)}pr.prototype.createObjectStore=function(){return new De(this._db.createObjectStore.apply(this._db,arguments))};Ut(pr,"_db",["name","version","objectStoreNames"]);dr(pr,"_db",IDBDatabase,["deleteObjectStore","close"]);function vr(t){this._db=t}vr.prototype.transaction=function(){return new Tn(this._db.transaction.apply(this._db,arguments))};Ut(vr,"_db",["name","version","objectStoreNames"]);dr(vr,"_db",IDBDatabase,["close"]);["openCursor","openKeyCursor"].forEach(function(t){[De,_t].forEach(function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var n=sv(arguments),r=n[n.length-1],i=this._store||this._index,o=i[t].apply(i,n.slice(0,-1));o.onsuccess=function(){r(o.result)}})})});[_t,De].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(e,n){var r=this,i=[];return new Promise(function(o){r.iterateCursor(e,function(s){if(!s){o(i);return}if(i.push(s.value),n!==void 0&&i.length==n){o(i);return}s.continue()})})})});function Xi(t,e,n){var r=hr(indexedDB,"open",[t,e]),i=r.request;return i&&(i.onupgradeneeded=function(o){n&&n(new pr(i.result,o.oldVersion,i.transaction))}),r.then(function(o){return new vr(o)})}function Ji(t){return hr(indexedDB,"deleteDatabase",[t])}var uv="@firebase/installations",_u="0.4.32";/**
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
 */var mu=1e4,yu="w:"+_u,bu="FIS_v2",lv="https://firebaseinstallations.googleapis.com/v1",cv=60*60*1e3,fv="installations",hv="Installations";/**
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
 */var tt,dv=(tt={},tt["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',tt["not-registered"]="Firebase Installation is not registered.",tt["installation-not-found"]="Firebase Installation not found.",tt["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',tt["app-offline"]="Could not process request. Application offline.",tt["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",tt),je=new It(fv,hv,dv);function Tu(t){return t instanceof zt&&t.code.includes("request-failed")}/**
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
 */function Zi(t){var e=t.projectId;return lv+"/projects/"+e+"/installations"}function wu(t){return{token:t.token,requestStatus:2,expiresIn:pv(t.expiresIn),creationTime:Date.now()}}function eo(t,e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return[4,e.json()];case 1:return n=i.sent(),r=n.error,[2,je.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}})})}function Eu(t){var e=t.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Cu(t,e){var n=e.refreshToken,r=Eu(t);return r.append("Authorization",vv(n)),r}function to(t){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:return[4,t()];case 1:return e=n.sent(),e.status>=500&&e.status<600?[2,t()]:[2,e]}})})}function pv(t){return Number(t.replace("s","000"))}function vv(t){return bu+" "+t}/**
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
 */function gv(t,e){var n=e.fid;return v(this,void 0,void 0,function(){var r,i,o,s,a,u,l;return g(this,function(c){switch(c.label){case 0:return r=Zi(t),i=Eu(t),o={fid:n,authVersion:bu,appId:t.appId,sdkVersion:yu},s={method:"POST",headers:i,body:JSON.stringify(o)},[4,to(function(){return fetch(r,s)})];case 1:return a=c.sent(),a.ok?[4,a.json()]:[3,3];case 2:return u=c.sent(),l={fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:wu(u.authToken)},[2,l];case 3:return[4,eo("Create Installation",a)];case 4:throw c.sent()}})})}/**
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
 */function Iu(t){return new Promise(function(e){setTimeout(e,t)})}/**
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
 */function _v(t){var e=btoa(String.fromCharCode.apply(String,q([],ue(t))));return e.replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */var mv=/^[cdef][\w-]{21}$/,no="";function yv(){try{var t=new Uint8Array(17),e=self.crypto||self.msCrypto;e.getRandomValues(t),t[0]=112+t[0]%16;var n=bv(t);return mv.test(n)?n:no}catch{return no}}function bv(t){var e=_v(t);return e.substr(0,22)}/**
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
 */function Bt(t){return t.appName+"!"+t.appId}/**
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
 */var Wt=new Map;function Su(t,e){var n=Bt(t);Ru(n,e),Ev(n,e)}function Tv(t,e){ku();var n=Bt(t),r=Wt.get(n);r||(r=new Set,Wt.set(n,r)),r.add(e)}function wv(t,e){var n=Bt(t),r=Wt.get(n);!r||(r.delete(e),r.size===0&&Wt.delete(n),Au())}function Ru(t,e){var n,r,i=Wt.get(t);if(!!i)try{for(var o=te(i),s=o.next();!s.done;s=o.next()){var a=s.value;a(e)}}catch(u){n={error:u}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}function Ev(t,e){var n=ku();n&&n.postMessage({key:t,fid:e}),Au()}var mt=null;function ku(){return!mt&&"BroadcastChannel"in self&&(mt=new BroadcastChannel("[Firebase] FID Change"),mt.onmessage=function(t){Ru(t.data.key,t.data.fid)}),mt}function Au(){Wt.size===0&&mt&&(mt.close(),mt=null)}/**
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
 */var Cv="firebase-installations-database",Iv=1,yt="firebase-installations-store",ro=null;function io(){return ro||(ro=Xi(Cv,Iv,function(t){switch(t.oldVersion){case 0:t.createObjectStore(yt)}})),ro}function gr(t,e){return v(this,void 0,void 0,function(){var n,r,i,o,s;return g(this,function(a){switch(a.label){case 0:return n=Bt(t),[4,io()];case 1:return r=a.sent(),i=r.transaction(yt,"readwrite"),o=i.objectStore(yt),[4,o.get(n)];case 2:return s=a.sent(),[4,o.put(e,n)];case 3:return a.sent(),[4,i.complete];case 4:return a.sent(),(!s||s.fid!==e.fid)&&Su(t,e.fid),[2,e]}})})}function oo(t){return v(this,void 0,void 0,function(){var e,n,r;return g(this,function(i){switch(i.label){case 0:return e=Bt(t),[4,io()];case 1:return n=i.sent(),r=n.transaction(yt,"readwrite"),[4,r.objectStore(yt).delete(e)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}})})}function wn(t,e){return v(this,void 0,void 0,function(){var n,r,i,o,s,a;return g(this,function(u){switch(u.label){case 0:return n=Bt(t),[4,io()];case 1:return r=u.sent(),i=r.transaction(yt,"readwrite"),o=i.objectStore(yt),[4,o.get(n)];case 2:return s=u.sent(),a=e(s),a!==void 0?[3,4]:[4,o.delete(n)];case 3:return u.sent(),[3,6];case 4:return[4,o.put(a,n)];case 5:u.sent(),u.label=6;case 6:return[4,i.complete];case 7:return u.sent(),a&&(!s||s.fid!==a.fid)&&Su(t,a.fid),[2,a]}})})}/**
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
 */function so(t){return v(this,void 0,void 0,function(){var e,n,r;return g(this,function(i){switch(i.label){case 0:return[4,wn(t,function(o){var s=Sv(o),a=Rv(t,s);return e=a.registrationPromise,a.installationEntry})];case 1:return n=i.sent(),n.fid!==no?[3,3]:(r={},[4,e]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:e}]}})})}function Sv(t){var e=t||{fid:yv(),registrationStatus:0};return Nu(e)}function Rv(t,e){if(e.registrationStatus===0){if(!navigator.onLine){var n=Promise.reject(je.create("app-offline"));return{installationEntry:e,registrationPromise:n}}var r={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=kv(t,r);return{installationEntry:r,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Av(t)}:{installationEntry:e}}function kv(t,e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,gv(t,e)];case 1:return n=i.sent(),[2,gr(t,n)];case 2:return r=i.sent(),Tu(r)&&r.customData.serverCode===409?[4,oo(t)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,gr(t,{fid:e.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}})})}function Av(t){return v(this,void 0,void 0,function(){var e,n,r,i;return g(this,function(o){switch(o.label){case 0:return[4,Pu(t)];case 1:e=o.sent(),o.label=2;case 2:return e.registrationStatus!==1?[3,5]:[4,Iu(100)];case 3:return o.sent(),[4,Pu(t)];case 4:return e=o.sent(),[3,2];case 5:return e.registrationStatus!==0?[3,7]:[4,so(t)];case 6:return n=o.sent(),r=n.installationEntry,i=n.registrationPromise,i?[2,i]:[2,r];case 7:return[2,e]}})})}function Pu(t){return wn(t,function(e){if(!e)throw je.create("installation-not-found");return Nu(e)})}function Nu(t){return Pv(t)?{fid:t.fid,registrationStatus:0}:t}function Pv(t){return t.registrationStatus===1&&t.registrationTime+mu<Date.now()}/**
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
 */function Nv(t,e){var n=t.appConfig,r=t.platformLoggerProvider;return v(this,void 0,void 0,function(){var i,o,s,a,u,l,c,f;return g(this,function(h){switch(h.label){case 0:return i=Ov(n,e),o=Cu(n,e),s=r.getImmediate({optional:!0}),s&&o.append("x-firebase-client",s.getPlatformInfoString()),a={installation:{sdkVersion:yu}},u={method:"POST",headers:o,body:JSON.stringify(a)},[4,to(function(){return fetch(i,u)})];case 1:return l=h.sent(),l.ok?[4,l.json()]:[3,3];case 2:return c=h.sent(),f=wu(c),[2,f];case 3:return[4,eo("Generate Auth Token",l)];case 4:throw h.sent()}})})}function Ov(t,e){var n=e.fid;return Zi(t)+"/"+n+"/authTokens:generate"}/**
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
 */function ao(t,e){return e===void 0&&(e=!1),v(this,void 0,void 0,function(){var n,r,i,o;return g(this,function(s){switch(s.label){case 0:return[4,wn(t.appConfig,function(a){if(!Mu(a))throw je.create("not-registered");var u=a.authToken;if(!e&&Dv(u))return a;if(u.requestStatus===1)return n=Mv(t,e),a;if(!navigator.onLine)throw je.create("app-offline");var l=Fv(a);return n=xv(t,l),l})];case 1:return r=s.sent(),n?[4,n]:[3,3];case 2:return o=s.sent(),[3,4];case 3:o=r.authToken,s.label=4;case 4:return i=o,[2,i]}})})}function Mv(t,e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return[4,Ou(t.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return n.authToken.requestStatus!==1?[3,5]:[4,Iu(100)];case 3:return i.sent(),[4,Ou(t.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return r=n.authToken,r.requestStatus===0?[2,ao(t,e)]:[2,r]}})})}function Ou(t){return wn(t,function(e){if(!Mu(e))throw je.create("not-registered");var n=e.authToken;return Uv(n)?w(w({},e),{authToken:{requestStatus:0}}):e})}function xv(t,e){return v(this,void 0,void 0,function(){var n,r,i,r;return g(this,function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,Nv(t,e)];case 1:return n=o.sent(),r=w(w({},e),{authToken:n}),[4,gr(t.appConfig,r)];case 2:return o.sent(),[2,n];case 3:return i=o.sent(),Tu(i)&&(i.customData.serverCode===401||i.customData.serverCode===404)?[4,oo(t.appConfig)]:[3,5];case 4:return o.sent(),[3,7];case 5:return r=w(w({},e),{authToken:{requestStatus:0}}),[4,gr(t.appConfig,r)];case 6:o.sent(),o.label=7;case 7:throw i;case 8:return[2]}})})}function Mu(t){return t!==void 0&&t.registrationStatus===2}function Dv(t){return t.requestStatus===2&&!Lv(t)}function Lv(t){var e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+cv}function Fv(t){var e={requestStatus:1,requestTime:Date.now()};return w(w({},t),{authToken:e})}function Uv(t){return t.requestStatus===1&&t.requestTime+mu<Date.now()}/**
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
 */function Bv(t){return v(this,void 0,void 0,function(){var e,n,r;return g(this,function(i){switch(i.label){case 0:return[4,so(t.appConfig)];case 1:return e=i.sent(),n=e.installationEntry,r=e.registrationPromise,r?r.catch(console.error):ao(t).catch(console.error),[2,n.fid]}})})}/**
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
 */function Wv(t,e){return e===void 0&&(e=!1),v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:return[4,jv(t.appConfig)];case 1:return r.sent(),[4,ao(t,e)];case 2:return n=r.sent(),[2,n.token]}})})}function jv(t){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:return[4,so(t)];case 1:return e=n.sent().registrationPromise,e?[4,e]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}})})}/**
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
 */function Vv(t,e){return v(this,void 0,void 0,function(){var n,r,i,o;return g(this,function(s){switch(s.label){case 0:return n=Hv(t,e),r=Cu(t,e),i={method:"DELETE",headers:r},[4,to(function(){return fetch(n,i)})];case 1:return o=s.sent(),o.ok?[3,3]:[4,eo("Delete Installation",o)];case 2:throw s.sent();case 3:return[2]}})})}function Hv(t,e){var n=e.fid;return Zi(t)+"/"+n}/**
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
 */function Gv(t){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return e=t.appConfig,[4,wn(e,function(i){if(!(i&&i.registrationStatus===0))return i})];case 1:if(n=r.sent(),!n)return[3,6];if(n.registrationStatus!==1)return[3,2];throw je.create("delete-pending-registration");case 2:if(n.registrationStatus!==2)return[3,6];if(navigator.onLine)return[3,3];throw je.create("app-offline");case 3:return[4,Vv(e,n)];case 4:return r.sent(),[4,oo(e)];case 5:r.sent(),r.label=6;case 6:return[2]}})})}/**
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
 */function qv(t,e){var n=t.appConfig;return Tv(n,e),function(){wv(n,e)}}/**
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
 */function Kv(t){var e,n;if(!t||!t.options)throw uo("App Configuration");if(!t.name)throw uo("App Name");var r=["projectId","apiKey","appId"];try{for(var i=te(r),o=i.next();!o.done;o=i.next()){var s=o.value;if(!t.options[s])throw uo(s)}}catch(a){e={error:a}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function uo(t){return je.create("missing-app-config-values",{valueName:t})}/**
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
 */function zv(t){var e="installations";t.INTERNAL.registerComponent(new he(e,function(n){var r=n.getProvider("app").getImmediate(),i=Kv(r),o=n.getProvider("platform-logger"),s={appConfig:i,platformLoggerProvider:o},a={app:r,getId:function(){return Bv(s)},getToken:function(u){return Wv(s,u)},delete:function(){return Gv(s)},onIdChange:function(u){return qv(s,u)}};return a},"PUBLIC")),t.registerVersion(uv,_u)}zv(ae);/**
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
 */var V,$v=(V={},V["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',V["only-available-in-window"]="This method is available in a Window context.",V["only-available-in-sw"]="This method is available in a service worker context.",V["permission-default"]="The notification permission was not granted and dismissed instead.",V["permission-blocked"]="The notification permission was not granted and blocked instead.",V["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",V["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",V["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",V["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",V["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",V["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",V["token-update-no-token"]="FCM returned no token when updating the user to push.",V["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",V["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",V["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",V["invalid-vapid-key"]="The public VAPID key must be a string.",V["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",V),P=new It("messaging","Messaging",$v);/**
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
 */var Qv="/firebase-messaging-sw.js",Yv="/firebase-cloud-messaging-push-scope",_r="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Xv="https://fcmregistrations.googleapis.com/v1",xu="FCM_MSG",Jv="FirebaseMessaging: ",Zv="google.c.a.e",Du="google.c.a.c_id",eg="google.c.a.ts",tg="google.c.a.c_l",ng=1e3,rg=3e3;/**
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
 */var bt;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(bt||(bt={}));/**
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
 */function Ve(t){var e=new Uint8Array(t),n=btoa(String.fromCharCode.apply(String,q([],ue(e))));return n.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function ig(t){for(var e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length),o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}/**
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
 */var lo="fcm_token_details_db",og=5,Lu="fcm_token_object_Store";function sg(t){return v(this,void 0,void 0,function(){var e,n,r,i,o=this;return g(this,function(s){switch(s.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(e=s.sent(),n=e.map(function(a){return a.name}),!n.includes(lo))return[2,null];s.label=2;case 2:return r=null,[4,Xi(lo,og,function(a){return v(o,void 0,void 0,function(){var u,l,c,c,c,f;return g(this,function(h){switch(h.label){case 0:return a.oldVersion<2?[2]:a.objectStoreNames.contains(Lu)?(u=a.transaction.objectStore(Lu),[4,u.index("fcmSenderId").get(t)]):[2];case 1:return l=h.sent(),[4,u.clear()];case 2:if(h.sent(),!l)return[2];if(a.oldVersion===2){if(c=l,!c.auth||!c.p256dh||!c.endpoint)return[2];r={token:c.fcmToken,createTime:(f=c.createTime)!==null&&f!==void 0?f:Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:Ve(c.vapidKey)}}}else a.oldVersion===3?(c=l,r={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Ve(c.auth),p256dh:Ve(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Ve(c.vapidKey)}}):a.oldVersion===4&&(c=l,r={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Ve(c.auth),p256dh:Ve(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Ve(c.vapidKey)}});return[2]}})})})];case 3:return i=s.sent(),i.close(),[4,Ji(lo)];case 4:return s.sent(),[4,Ji("fcm_vapid_details_db")];case 5:return s.sent(),[4,Ji("undefined")];case 6:return s.sent(),[2,ag(r)?r:null]}})})}function ag(t){if(!t||!t.subscriptionOptions)return!1;var e=t.subscriptionOptions;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */var ug="firebase-messaging-database",lg=1,Tt="firebase-messaging-store",co=null;function fo(){return co||(co=Xi(ug,lg,function(t){switch(t.oldVersion){case 0:t.createObjectStore(Tt)}})),co}function mr(t){return v(this,void 0,void 0,function(){var e,n,r,i;return g(this,function(o){switch(o.label){case 0:return e=po(t),[4,fo()];case 1:return n=o.sent(),[4,n.transaction(Tt).objectStore(Tt).get(e)];case 2:return r=o.sent(),r?[2,r]:[3,3];case 3:return[4,sg(t.appConfig.senderId)];case 4:return i=o.sent(),i?[4,ho(t,i)]:[3,6];case 5:return o.sent(),[2,i];case 6:return[2]}})})}function ho(t,e){return v(this,void 0,void 0,function(){var n,r,i;return g(this,function(o){switch(o.label){case 0:return n=po(t),[4,fo()];case 1:return r=o.sent(),i=r.transaction(Tt,"readwrite"),[4,i.objectStore(Tt).put(e,n)];case 2:return o.sent(),[4,i.complete];case 3:return o.sent(),[2,e]}})})}function cg(t){return v(this,void 0,void 0,function(){var e,n,r;return g(this,function(i){switch(i.label){case 0:return e=po(t),[4,fo()];case 1:return n=i.sent(),r=n.transaction(Tt,"readwrite"),[4,r.objectStore(Tt).delete(e)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}})})}function po(t){var e=t.appConfig;return e.appId}/**
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
 */function fg(t,e){return v(this,void 0,void 0,function(){var n,r,i,o,s,a,u;return g(this,function(l){switch(l.label){case 0:return[4,go(t)];case 1:n=l.sent(),r=Uu(e),i={method:"POST",headers:n,body:JSON.stringify(r)},l.label=2;case 2:return l.trys.push([2,5,,6]),[4,fetch(vo(t.appConfig),i)];case 3:return s=l.sent(),[4,s.json()];case 4:return o=l.sent(),[3,6];case 5:throw a=l.sent(),P.create("token-subscribe-failed",{errorInfo:a});case 6:if(o.error)throw u=o.error.message,P.create("token-subscribe-failed",{errorInfo:u});if(!o.token)throw P.create("token-subscribe-no-token");return[2,o.token]}})})}function hg(t,e){return v(this,void 0,void 0,function(){var n,r,i,o,s,a,u;return g(this,function(l){switch(l.label){case 0:return[4,go(t)];case 1:n=l.sent(),r=Uu(e.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},l.label=2;case 2:return l.trys.push([2,5,,6]),[4,fetch(vo(t.appConfig)+"/"+e.token,i)];case 3:return s=l.sent(),[4,s.json()];case 4:return o=l.sent(),[3,6];case 5:throw a=l.sent(),P.create("token-update-failed",{errorInfo:a});case 6:if(o.error)throw u=o.error.message,P.create("token-update-failed",{errorInfo:u});if(!o.token)throw P.create("token-update-no-token");return[2,o.token]}})})}function Fu(t,e){return v(this,void 0,void 0,function(){var n,r,i,o,s,a;return g(this,function(u){switch(u.label){case 0:return[4,go(t)];case 1:n=u.sent(),r={method:"DELETE",headers:n},u.label=2;case 2:return u.trys.push([2,5,,6]),[4,fetch(vo(t.appConfig)+"/"+e,r)];case 3:return i=u.sent(),[4,i.json()];case 4:if(o=u.sent(),o.error)throw s=o.error.message,P.create("token-unsubscribe-failed",{errorInfo:s});return[3,6];case 5:throw a=u.sent(),P.create("token-unsubscribe-failed",{errorInfo:a});case 6:return[2]}})})}function vo(t){var e=t.projectId;return Xv+"/projects/"+e+"/registrations"}function go(t){var e=t.appConfig,n=t.installations;return v(this,void 0,void 0,function(){var r;return g(this,function(i){switch(i.label){case 0:return[4,n.getToken()];case 1:return r=i.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":"FIS "+r})]}})})}function Uu(t){var e=t.p256dh,n=t.auth,r=t.endpoint,i=t.vapidKey,o={web:{endpoint:r,auth:n,p256dh:e}};return i!==_r&&(o.web.applicationPubKey=i),o}/**
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
 */var dg=7*24*60*60*1e3;function _o(t,e,n){return v(this,void 0,void 0,function(){var r,i,o,s;return g(this,function(a){switch(a.label){case 0:if(Notification.permission!=="granted")throw P.create("permission-blocked");return[4,vg(e,n)];case 1:return r=a.sent(),[4,mr(t)];case 2:return i=a.sent(),o={vapidKey:n,swScope:e.scope,endpoint:r.endpoint,auth:Ve(r.getKey("auth")),p256dh:Ve(r.getKey("p256dh"))},i?[3,3]:[2,Bu(t,o)];case 3:if(gg(i.subscriptionOptions,o))return[3,8];a.label=4;case 4:return a.trys.push([4,6,,7]),[4,Fu(t,i.token)];case 5:return a.sent(),[3,7];case 6:return s=a.sent(),console.warn(s),[3,7];case 7:return[2,Bu(t,o)];case 8:return Date.now()>=i.createTime+dg?[2,pg({token:i.token,createTime:Date.now(),subscriptionOptions:o},t,e)]:[2,i.token];case 9:return[2]}})})}function En(t,e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return[4,mr(t)];case 1:return n=i.sent(),n?[4,Fu(t,n.token)]:[3,4];case 2:return i.sent(),[4,cg(t)];case 3:i.sent(),i.label=4;case 4:return[4,e.pushManager.getSubscription()];case 5:return r=i.sent(),r?[2,r.unsubscribe()]:[2,!0]}})})}function pg(t,e,n){return v(this,void 0,void 0,function(){var r,i,o;return g(this,function(s){switch(s.label){case 0:return s.trys.push([0,3,,5]),[4,hg(e,t)];case 1:return r=s.sent(),i=w(w({},t),{token:r,createTime:Date.now()}),[4,ho(e,i)];case 2:return s.sent(),[2,r];case 3:return o=s.sent(),[4,En(e,n)];case 4:throw s.sent(),o;case 5:return[2]}})})}function Bu(t,e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return[4,fg(t,e)];case 1:return n=i.sent(),r={token:n,createTime:Date.now(),subscriptionOptions:e},[4,ho(t,r)];case 2:return i.sent(),[2,r.token]}})})}function vg(t,e){return v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:return[4,t.pushManager.getSubscription()];case 1:return n=r.sent(),n?[2,n]:[2,t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:ig(e)})]}})})}function gg(t,e){var n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,i=e.auth===t.auth,o=e.p256dh===t.p256dh;return n&&r&&i&&o}/**
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
 */function _g(t){var e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcm_message_id};return mg(e,t),yg(e,t),bg(e,t),e}function mg(t,e){if(!!e.notification){t.notification={};var n=e.notification.title;n&&(t.notification.title=n);var r=e.notification.body;r&&(t.notification.body=r);var i=e.notification.image;i&&(t.notification.image=i)}}function yg(t,e){!e.data||(t.data=e.data)}function bg(t,e){if(!!e.fcmOptions){t.fcmOptions={};var n=e.fcmOptions.link;n&&(t.fcmOptions.link=n);var r=e.fcmOptions.analytics_label;r&&(t.fcmOptions.analyticsLabel=r)}}/**
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
 */function Wu(t){return typeof t=="object"&&!!t&&Du in t}/**
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
 */function ju(t){return new Promise(function(e){setTimeout(e,t)})}/**
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
 */var Tg=function(){function t(e){var n=this;this.firebaseDependencies=e,this.isOnBackgroundMessageUsed=null,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",function(r){r.waitUntil(n.onPush(r))}),self.addEventListener("pushsubscriptionchange",function(r){r.waitUntil(n.onSubChange(r))}),self.addEventListener("notificationclick",function(r){r.waitUntil(n.onNotificationClick(r))})}return Object.defineProperty(t.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),t.prototype.setBackgroundMessageHandler=function(e){if(this.isOnBackgroundMessageUsed=!1,!e||typeof e!="function")throw P.create("invalid-bg-handler");this.bgMessageHandler=e},t.prototype.onBackgroundMessage=function(e){var n=this;return this.isOnBackgroundMessageUsed=!0,this.bgMessageHandler=e,function(){n.bgMessageHandler=null}},t.prototype.getToken=function(){var e,n;return v(this,void 0,void 0,function(){var r;return g(this,function(i){switch(i.label){case 0:return this.vapidKey?[3,2]:[4,mr(this.firebaseDependencies)];case 1:r=i.sent(),this.vapidKey=(n=(e=r==null?void 0:r.subscriptionOptions)===null||e===void 0?void 0:e.vapidKey)!==null&&n!==void 0?n:_r,i.label=2;case 2:return[2,_o(this.firebaseDependencies,self.registration,this.vapidKey)]}})})},t.prototype.deleteToken=function(){return En(this.firebaseDependencies,self.registration)},t.prototype.requestPermission=function(){throw P.create("only-available-in-window")},t.prototype.usePublicVapidKey=function(e){if(this.vapidKey!==null)throw P.create("use-vapid-key-after-get-token");if(typeof e!="string"||e.length===0)throw P.create("invalid-vapid-key");this.vapidKey=e},t.prototype.useServiceWorker=function(){throw P.create("only-available-in-window")},t.prototype.onMessage=function(){throw P.create("only-available-in-window")},t.prototype.onTokenRefresh=function(){throw P.create("only-available-in-window")},t.prototype.onPush=function(e){return v(this,void 0,void 0,function(){var n,r,i,o;return g(this,function(s){switch(s.label){case 0:return n=Eg(e),n?[4,Vu()]:(console.debug(Jv+"failed to get parsed MessagePayload from the PushEvent. Skip handling the push."),[2]);case 1:return r=s.sent(),Ig(r)?[2,Sg(r,n)]:(i=!1,n.notification?[4,Rg(wg(n))]:[3,3]);case 2:s.sent(),i=!0,s.label=3;case 3:return i===!0&&this.isOnBackgroundMessageUsed===!1?[2]:(this.bgMessageHandler&&(o=_g(n),typeof this.bgMessageHandler=="function"?this.bgMessageHandler(o):this.bgMessageHandler.next(o)),[4,ju(ng)]);case 4:return s.sent(),[2]}})})},t.prototype.onSubChange=function(e){var n,r;return v(this,void 0,void 0,function(){var i,o;return g(this,function(s){switch(s.label){case 0:return i=e.newSubscription,i?[3,2]:[4,En(this.firebaseDependencies,self.registration)];case 1:return s.sent(),[2];case 2:return[4,mr(this.firebaseDependencies)];case 3:return o=s.sent(),[4,En(this.firebaseDependencies,self.registration)];case 4:return s.sent(),[4,_o(this.firebaseDependencies,self.registration,(r=(n=o==null?void 0:o.subscriptionOptions)===null||n===void 0?void 0:n.vapidKey)!==null&&r!==void 0?r:_r)];case 5:return s.sent(),[2]}})})},t.prototype.onNotificationClick=function(e){var n,r;return v(this,void 0,void 0,function(){var i,o,s,a,u;return g(this,function(l){switch(l.label){case 0:if(i=(r=(n=e.notification)===null||n===void 0?void 0:n.data)===null||r===void 0?void 0:r[xu],i){if(e.action)return[2]}else return[2];return e.stopImmediatePropagation(),e.notification.close(),o=kg(i),o?(s=new URL(o,self.location.href),a=new URL(self.location.origin),s.host!==a.host?[2]:[4,Cg(s)]):[2];case 1:return u=l.sent(),u?[3,4]:[4,self.clients.openWindow(o)];case 2:return u=l.sent(),[4,ju(rg)];case 3:return l.sent(),[3,6];case 4:return[4,u.focus()];case 5:u=l.sent(),l.label=6;case 6:return u?(i.messageType=bt.NOTIFICATION_CLICKED,i.isFirebaseMessaging=!0,[2,u.postMessage(i)]):[2]}})})},t}();function wg(t){var e,n=w({},t.notification);return n.data=(e={},e[xu]=t,e),n}function Eg(t){var e=t.data;if(!e)return null;try{return e.json()}catch{return null}}function Cg(t){return v(this,void 0,void 0,function(){var e,n,r,i,o,s,a;return g(this,function(u){switch(u.label){case 0:return[4,Vu()];case 1:e=u.sent();try{for(n=te(e),r=n.next();!r.done;r=n.next())if(i=r.value,o=new URL(i.url,self.location.href),t.host===o.host)return[2,i]}catch(l){s={error:l}}finally{try{r&&!r.done&&(a=n.return)&&a.call(n)}finally{if(s)throw s.error}}return[2,null]}})})}function Ig(t){return t.some(function(e){return e.visibilityState==="visible"&&!e.url.startsWith("chrome-extension://")})}function Sg(t,e){var n,r;e.isFirebaseMessaging=!0,e.messageType=bt.PUSH_RECEIVED;try{for(var i=te(t),o=i.next();!o.done;o=i.next()){var s=o.value;s.postMessage(e)}}catch(a){n={error:a}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}function Vu(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function Rg(t){var e,n=t.actions,r=Notification.maxActions;return n&&r&&n.length>r&&console.warn("This browser only supports "+r+" actions. The remaining actions will not be displayed."),self.registration.showNotification((e=t.title)!==null&&e!==void 0?e:"",t)}function kg(t){var e,n,r,i=(n=(e=t.fcmOptions)===null||e===void 0?void 0:e.link)!==null&&n!==void 0?n:(r=t.notification)===null||r===void 0?void 0:r.click_action;return i||(Wu(t.data)?self.location.origin:null)}/**
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
 */var Ag=function(){function t(e){var n=this;this.firebaseDependencies=e,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",function(r){return n.messageEventListener(r)})}return Object.defineProperty(t.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),t.prototype.messageEventListener=function(e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return n=e.data,n.isFirebaseMessaging?(this.onMessageCallback&&n.messageType===bt.PUSH_RECEIVED&&(typeof this.onMessageCallback=="function"?this.onMessageCallback(Ng(Object.assign({},n))):this.onMessageCallback.next(Object.assign({},n))),r=n.data,Wu(r)&&r[Zv]==="1"?[4,this.logEvent(n.messageType,r)]:[3,2]):[2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},t.prototype.getVapidKey=function(){return this.vapidKey},t.prototype.getSwReg=function(){return this.swRegistration},t.prototype.getToken=function(e){return v(this,void 0,void 0,function(){return g(this,function(n){switch(n.label){case 0:return Notification.permission!=="default"?[3,2]:[4,Notification.requestPermission()];case 1:n.sent(),n.label=2;case 2:if(Notification.permission!=="granted")throw P.create("permission-blocked");return[4,this.updateVapidKey(e==null?void 0:e.vapidKey)];case 3:return n.sent(),[4,this.updateSwReg(e==null?void 0:e.serviceWorkerRegistration)];case 4:return n.sent(),[2,_o(this.firebaseDependencies,this.swRegistration,this.vapidKey)]}})})},t.prototype.updateVapidKey=function(e){return v(this,void 0,void 0,function(){return g(this,function(n){return e?this.vapidKey=e:this.vapidKey||(this.vapidKey=_r),[2]})})},t.prototype.updateSwReg=function(e){return v(this,void 0,void 0,function(){return g(this,function(n){switch(n.label){case 0:return!e&&!this.swRegistration?[4,this.registerDefaultSw()]:[3,2];case 1:n.sent(),n.label=2;case 2:if(!e&&!!this.swRegistration)return[2];if(!(e instanceof ServiceWorkerRegistration))throw P.create("invalid-sw-registration");return this.swRegistration=e,[2]}})})},t.prototype.registerDefaultSw=function(){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),e=this,[4,navigator.serviceWorker.register(Qv,{scope:Yv})];case 1:return e.swRegistration=r.sent(),this.swRegistration.update().catch(function(){}),[3,3];case 2:throw n=r.sent(),P.create("failed-service-worker-registration",{browserErrorMessage:n.message});case 3:return[2]}})})},t.prototype.deleteToken=function(){return v(this,void 0,void 0,function(){return g(this,function(e){switch(e.label){case 0:return this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:e.sent(),e.label=2;case 2:return[2,En(this.firebaseDependencies,this.swRegistration)]}})})},t.prototype.requestPermission=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:return Notification.permission==="granted"?[2]:[4,Notification.requestPermission()];case 1:if(e=n.sent(),e==="granted")return[2];throw e==="denied"?P.create("permission-blocked"):P.create("permission-default")}})})},t.prototype.usePublicVapidKey=function(e){if(this.vapidKey!==null)throw P.create("use-vapid-key-after-get-token");if(typeof e!="string"||e.length===0)throw P.create("invalid-vapid-key");this.vapidKey=e},t.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw P.create("invalid-sw-registration");if(this.swRegistration)throw P.create("use-sw-after-get-token");this.swRegistration=e},t.prototype.onMessage=function(e){var n=this;return this.onMessageCallback=e,function(){n.onMessageCallback=null}},t.prototype.setBackgroundMessageHandler=function(){throw P.create("only-available-in-sw")},t.prototype.onBackgroundMessage=function(){throw P.create("only-available-in-sw")},t.prototype.onTokenRefresh=function(){return function(){}},t.prototype.logEvent=function(e,n){return v(this,void 0,void 0,function(){var r,i;return g(this,function(o){switch(o.label){case 0:return r=Pg(e),[4,this.firebaseDependencies.analyticsProvider.get()];case 1:return i=o.sent(),i.logEvent(r,{message_id:n[Du],message_name:n[tg],message_time:n[eg],message_device_time:Math.floor(Date.now()/1e3)}),[2]}})})},t}();function Pg(t){switch(t){case bt.NOTIFICATION_CLICKED:return"notification_open";case bt.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}function Ng(t){return delete t.messageType,delete t.isFirebaseMessaging,t}/**
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
 */function Og(t){var e,n;if(!t||!t.options)throw mo("App Configuration Object");if(!t.name)throw mo("App Name");var r=["projectId","apiKey","appId","messagingSenderId"],i=t.options;try{for(var o=te(r),s=o.next();!s.done;s=o.next()){var a=s.value;if(!i[a])throw mo(a)}}catch(u){e={error:u}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(e)throw e.error}}return{appName:t.name,projectId:i.projectId,apiKey:i.apiKey,appId:i.appId,senderId:i.messagingSenderId}}function mo(t){return P.create("missing-app-config-values",{valueName:t})}/**
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
 */var Mg="messaging";function xg(t){var e=t.getProvider("app").getImmediate(),n=Og(e),r=t.getProvider("installations").getImmediate(),i=t.getProvider("analytics-internal"),o={app:e,appConfig:n,installations:r,analyticsProvider:i};if(!Hu())throw P.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new Tg(o):new Ag(o)}var Dg={isSupported:Hu};ae.INTERNAL.registerComponent(new he(Mg,xg,"PUBLIC").setServiceProps(Dg));function Hu(){return self&&"ServiceWorkerGlobalScope"in self?Fg():Lg()}function Lg(){return"indexedDB"in window&&indexedDB!==null&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function Fg(){return"indexedDB"in self&&indexedDB!==null&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */var Gu="firebasestorage.googleapis.com",qu="storageBucket",Ug=2*60*1e3,Bg=10*60*1e3,B=function(t){x(e,t);function e(n,r){var i=t.call(this,yo(n),"Firebase Storage: "+r+" ("+yo(n)+")")||this;return i.customData={serverResponse:null},i._baseMessage=i.message,Object.setPrototypeOf(i,e.prototype),i}return e.prototype._codeEquals=function(n){return yo(n)===this.code},Object.defineProperty(e.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(n){this.customData.serverResponse=n,this.customData.serverResponse?this.message=this._baseMessage+`
`+this.customData.serverResponse:this.message=this._baseMessage},enumerable:!1,configurable:!0}),e}(zt);function yo(t){return"storage/"+t}function bo(){var t="An unknown error occurred, please check the error payload for server response.";return new B("unknown",t)}function Wg(t){return new B("object-not-found","Object '"+t+"' does not exist.")}function jg(t){return new B("quota-exceeded","Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Vg(){var t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new B("unauthenticated",t)}function Hg(){return new B("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function Gg(t){return new B("unauthorized","User does not have permission to access '"+t+"'.")}function qg(){return new B("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function Ku(){return new B("canceled","User canceled the upload/download.")}function Kg(t){return new B("invalid-url","Invalid URL '"+t+"'.")}function zg(t){return new B("invalid-default-bucket","Invalid default bucket '"+t+"'.")}function $g(){return new B("no-default-bucket","No default bucket found. Did you set the '"+qu+"' property when initializing the app?")}function zu(){return new B("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function Qg(){return new B("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.")}function Yg(){return new B("no-download-url","The given file does not have any download URLs.")}function jt(t){return new B("invalid-argument",t)}function $u(){return new B("app-deleted","The Firebase app was deleted.")}function Qu(t){return new B("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Cn(t,e){return new B("invalid-format","String does not match format '"+t+"': "+e)}function yr(t){throw new B("internal-error","Internal error: "+t)}/**
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
 */function Xg(t){return atob(t)}/**
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
 */var _e={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},To=function(){function t(e,n){this.data=e,this.contentType=n||null}return t}();function Yu(t,e){switch(t){case _e.RAW:return new To(Xu(e));case _e.BASE64:case _e.BASE64URL:return new To(Ju(t,e));case _e.DATA_URL:return new To(Zg(e),e_(e))}throw bo()}function Xu(t){for(var e=[],n=0;n<t.length;n++){var r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)==55296){var i=n<t.length-1&&(t.charCodeAt(n+1)&64512)==56320;if(!i)e.push(239,191,189);else{var o=r,s=t.charCodeAt(++n);r=65536|(o&1023)<<10|s&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}}else(r&64512)==56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Jg(t){var e;try{e=decodeURIComponent(t)}catch{throw Cn(_e.DATA_URL,"Malformed data URL.")}return Xu(e)}function Ju(t,e){switch(t){case _e.BASE64:{var n=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(n||r){var i=n?"-":"_";throw Cn(t,"Invalid character '"+i+"' found: is it base64url encoded?")}break}case _e.BASE64URL:{var o=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(o||s){var i=o?"+":"/";throw Cn(t,"Invalid character '"+i+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}}var a;try{a=Xg(e)}catch{throw Cn(t,"Invalid character found")}for(var u=new Uint8Array(a.length),l=0;l<a.length;l++)u[l]=a.charCodeAt(l);return u}var Zu=function(){function t(e){this.base64=!1,this.contentType=null;var n=e.match(/^data:([^,]+)?,/);if(n===null)throw Cn(_e.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=n[1]||null;r!=null&&(this.base64=t_(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=e.substring(e.indexOf(",")+1)}return t}();function Zg(t){var e=new Zu(t);return e.base64?Ju(_e.BASE64,e.rest):Jg(e.rest)}function e_(t){var e=new Zu(t);return e.contentType}function t_(t,e){var n=t.length>=e.length;return n?t.substring(t.length-e.length)===e:!1}/**
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
 */var n_={STATE_CHANGED:"state_changed"},re={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function wo(t){switch(t){case"running":case"pausing":case"canceling":return re.RUNNING;case"paused":return re.PAUSED;case"success":return re.SUCCESS;case"canceled":return re.CANCELED;case"error":return re.ERROR;default:return re.ERROR}}/**
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
 */var wt;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(wt||(wt={}));/**
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
 */var r_=function(){function t(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=wt.NO_ERROR,this.sendPromise_=new Promise(function(n){e.xhr_.addEventListener("abort",function(){e.errorCode_=wt.ABORT,n()}),e.xhr_.addEventListener("error",function(){e.errorCode_=wt.NETWORK_ERROR,n()}),e.xhr_.addEventListener("load",function(){n()})})}return t.prototype.send=function(e,n,r,i){if(this.sent_)throw yr("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),i!==void 0)for(var o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},t.prototype.getErrorCode=function(){if(!this.sent_)throw yr("cannot .getErrorCode() before sending");return this.errorCode_},t.prototype.getStatus=function(){if(!this.sent_)throw yr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}},t.prototype.getResponseText=function(){if(!this.sent_)throw yr("cannot .getResponseText() before sending");return this.xhr_.responseText},t.prototype.abort=function(){this.xhr_.abort()},t.prototype.getResponseHeader=function(e){return this.xhr_.getResponseHeader(e)},t.prototype.addUploadProgressListener=function(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)},t.prototype.removeUploadProgressListener=function(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)},t}();function i_(){return new r_}/**
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
 */var o_=function(){function t(){}return t.prototype.createConnection=function(){return i_()},t}();/**
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
 */var me=function(){function t(e,n){this.bucket=e,this.path_=n}return Object.defineProperty(t.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isRoot",{get:function(){return this.path.length===0},enumerable:!1,configurable:!0}),t.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},t.prototype.bucketOnlyServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"},t.makeFromBucketSpec=function(e,n){var r;try{r=t.makeFromUrl(e,n)}catch{return new t(e,"")}if(r.path==="")return r;throw zg(e)},t.makeFromUrl=function(e,n){var r=null,i="([A-Za-z0-9.\\-_]+)";function o(we){we.path.charAt(we.path.length-1)==="/"&&(we.path_=we.path_.slice(0,-1))}var s="(/(.*))?$",a=new RegExp("^gs://"+i+s,"i"),u={bucket:1,path:3};function l(we){we.path_=decodeURIComponent(we.path)}for(var c="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",d=new RegExp("^https?://"+f+"/"+c+"/b/"+i+"/o"+h,"i"),p={bucket:1,path:3},m=n===Gu?"(?:storage.googleapis.com|storage.cloud.google.com)":n,y="([^?#]*)",b=new RegExp("^https?://"+m+"/"+i+"/"+y,"i"),C={bucket:1,path:2},N=[{regex:a,indices:u,postModify:o},{regex:d,indices:p,postModify:l},{regex:b,indices:C,postModify:l}],z=0;z<N.length;z++){var L=N[z],Te=L.regex.exec(e);if(Te){var it=Te[L.indices.bucket],Ke=Te[L.indices.path];Ke||(Ke=""),r=new t(it,Ke),L.postModify(r);break}}if(r==null)throw Kg(e);return r},t}(),s_=function(){function t(e){this.promise_=Promise.reject(e)}return t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(e){},t}();/**
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
 */function a_(t,e,n){var r=1,i=null,o=!1,s=0;function a(){return s===2}var u=!1;function l(){for(var p=[],m=0;m<arguments.length;m++)p[m]=arguments[m];u||(u=!0,e.apply(null,p))}function c(p){i=setTimeout(function(){i=null,t(f,a())},p)}function f(p){for(var m=[],y=1;y<arguments.length;y++)m[y-1]=arguments[y];if(!u){if(p){l.call.apply(l,q([null,p],m));return}var b=a()||o;if(b){l.call.apply(l,q([null,p],m));return}r<64&&(r*=2);var C;s===1?(s=2,C=0):C=(r+Math.random())*1e3,c(C)}}var h=!1;function d(p){h||(h=!0,!u&&(i!==null?(p||(s=2),clearTimeout(i),c(0)):p||(s=1)))}return c(0),setTimeout(function(){o=!0,d(!0)},n),d}function u_(t){t(!1)}/**
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
 */function l_(t){return t!==void 0}function c_(t){return typeof t=="function"}function f_(t){return typeof t=="object"&&!Array.isArray(t)}function br(t){return typeof t=="string"||t instanceof String}function el(t){return Eo()&&t instanceof Blob}function Eo(){return typeof Blob!="undefined"}function Co(t,e,n,r){if(r<e)throw jt("Invalid value for '"+t+"'. Expected "+e+" or greater.");if(r>n)throw jt("Invalid value for '"+t+"'. Expected "+n+" or less.")}/**
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
 */function nt(t,e){var n=e.match(/^(\w+):\/\/.+/),r=n==null?void 0:n[1],i=e;return r==null&&(i="https://"+e),i+"/v0"+t}function tl(t){var e=encodeURIComponent,n="?";for(var r in t)if(t.hasOwnProperty(r)){var i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}/**
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
 */var h_=function(){function t(e,n,r,i,o,s,a,u,l,c,f){var h=this;this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=o.slice(),this.additionalRetryCodes_=s.slice(),this.callback_=a,this.errorCallback_=u,this.progressCallback_=c,this.timeout_=l,this.pool_=f,this.promise_=new Promise(function(d,p){h.resolve_=d,h.reject_=p,h.start_()})}return t.prototype.start_=function(){var e=this;function n(i,o){if(o){i(!1,new Tr(!1,null,!0));return}var s=e.pool_.createConnection();e.pendingConnection_=s;function a(u){var l=u.loaded,c=u.lengthComputable?u.total:-1;e.progressCallback_!==null&&e.progressCallback_(l,c)}e.progressCallback_!==null&&s.addUploadProgressListener(a),s.send(e.url_,e.method_,e.body_,e.headers_).then(function(){e.progressCallback_!==null&&s.removeUploadProgressListener(a),e.pendingConnection_=null;var u=s.getErrorCode()===wt.NO_ERROR,l=s.getStatus();if(!u||e.isRetryStatusCode_(l)){var c=s.getErrorCode()===wt.ABORT;i(!1,new Tr(!1,null,c));return}var f=e.successCodes_.indexOf(l)!==-1;i(!0,new Tr(f,s))})}function r(i,o){var s=e.resolve_,a=e.reject_,u=o.connection;if(o.wasSuccessCode)try{var l=e.callback_(u,u.getResponseText());l_(l)?s(l):s()}catch(f){a(f)}else if(u!==null){var c=bo();c.serverResponse=u.getResponseText(),e.errorCallback_?a(e.errorCallback_(u,c)):a(c)}else if(o.canceled){var c=e.appDelete_?$u():Ku();a(c)}else{var c=qg();a(c)}}this.canceled_?r(!1,new Tr(!1,null,!0)):this.backoffId_=a_(n,r,this.timeout_)},t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&u_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()},t.prototype.isRetryStatusCode_=function(e){var n=e>=500&&e<600,r=[408,429],i=r.indexOf(e)!==-1,o=this.additionalRetryCodes_.indexOf(e)!==-1;return n||i||o},t}(),Tr=function(){function t(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}return t}();function d_(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function p_(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e!=null?e:"AppManager")}function v_(t,e){e&&(t["X-Firebase-GMPID"]=e)}function g_(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function __(t,e,n,r,i,o){var s=tl(t.urlParams),a=t.url+s,u=Object.assign({},t.headers);return v_(u,e),d_(u,n),p_(u,o),g_(u,r),new h_(a,t.method,u,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i)}/**
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
 */function m_(){return typeof BlobBuilder!="undefined"?BlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:void 0}function y_(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=m_();if(n!==void 0){for(var r=new n,i=0;i<t.length;i++)r.append(t[i]);return r.getBlob()}else{if(Eo())return new Blob(t);throw new B("unsupported-environment","This browser doesn't seem to support creating Blobs")}}function b_(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
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
 */var Io=function(){function t(e,n){var r=0,i="";el(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}return t.prototype.size=function(){return this.size_},t.prototype.type=function(){return this.type_},t.prototype.slice=function(e,n){if(el(this.data_)){var r=this.data_,i=b_(r,e,n);return i===null?null:new t(i)}else{var o=new Uint8Array(this.data_.buffer,e,n-e);return new t(o,!0)}},t.getBlob=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];if(Eo()){var r=e.map(function(u){return u instanceof t?u.data_:u});return new t(y_.apply(null,r))}else{var i=e.map(function(u){return br(u)?Yu(_e.RAW,u).data:u.data_}),o=0;i.forEach(function(u){o+=u.byteLength});var s=new Uint8Array(o),a=0;return i.forEach(function(u){for(var l=0;l<u.length;l++)s[a++]=u[l]}),new t(s,!0)}},t.prototype.uploadData=function(){return this.data_},t}();/**
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
 */function So(t){var e;try{e=JSON.parse(t)}catch{return null}return f_(e)?e:null}/**
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
 */function T_(t){if(t.length===0)return null;var e=t.lastIndexOf("/");if(e===-1)return"";var n=t.slice(0,e);return n}function w_(t,e){var n=e.split("/").filter(function(r){return r.length>0}).join("/");return t.length===0?n:t+"/"+n}function nl(t){var e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */function E_(t,e){return e}var ie=function(){function t(e,n,r,i){this.server=e,this.local=n||e,this.writable=!!r,this.xform=i||E_}return t}(),wr=null;function C_(t){return!br(t)||t.length<2?t:nl(t)}function Er(){if(wr)return wr;var t=[];t.push(new ie("bucket")),t.push(new ie("generation")),t.push(new ie("metageneration")),t.push(new ie("name","fullPath",!0));function e(o,s){return C_(s)}var n=new ie("name");n.xform=e,t.push(n);function r(o,s){return s!==void 0?Number(s):s}var i=new ie("size");return i.xform=r,t.push(i),t.push(new ie("timeCreated")),t.push(new ie("updated")),t.push(new ie("md5Hash",null,!0)),t.push(new ie("cacheControl",null,!0)),t.push(new ie("contentDisposition",null,!0)),t.push(new ie("contentEncoding",null,!0)),t.push(new ie("contentLanguage",null,!0)),t.push(new ie("contentType",null,!0)),t.push(new ie("metadata","customMetadata",!0)),wr=t,wr}function I_(t,e){function n(){var r=t.bucket,i=t.fullPath,o=new me(r,i);return e._makeStorageReference(o)}Object.defineProperty(t,"ref",{get:n})}function S_(t,e,n){var r={};r.type="file";for(var i=n.length,o=0;o<i;o++){var s=n[o];r[s.local]=s.xform(r,e[s.server])}return I_(r,t),r}function rl(t,e,n){var r=So(e);if(r===null)return null;var i=r;return S_(t,i,n)}function R_(t,e,n){var r=So(e);if(r===null||!br(r.downloadTokens))return null;var i=r.downloadTokens;if(i.length===0)return null;var o=encodeURIComponent,s=i.split(","),a=s.map(function(u){var l=t.bucket,c=t.fullPath,f="/b/"+o(l)+"/o/"+o(c),h=nt(f,n),d=tl({alt:"media",token:u});return h+d});return a[0]}function Ro(t,e){for(var n={},r=e.length,i=0;i<r;i++){var o=e[i];o.writable&&(n[o.server]=t[o.local])}return JSON.stringify(n)}/**
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
 */var il="prefixes",ol="items";function k_(t,e,n){var r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[il])for(var i=0,o=n[il];i<o.length;i++){var s=o[i],a=s.replace(/\/$/,""),u=t._makeStorageReference(new me(e,a));r.prefixes.push(u)}if(n[ol])for(var l=0,c=n[ol];l<c.length;l++){var f=c[l],u=t._makeStorageReference(new me(e,f.name));r.items.push(u)}return r}function A_(t,e,n){var r=So(n);if(r===null)return null;var i=r;return k_(t,e,i)}var He=function(){function t(e,n,r,i){this.url=e,this.method=n,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}return t}();/**
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
 */function Le(t){if(!t)throw bo()}function Cr(t,e){function n(r,i){var o=rl(t,i,e);return Le(o!==null),o}return n}function P_(t,e){function n(r,i){var o=A_(t,e,i);return Le(o!==null),o}return n}function N_(t,e){function n(r,i){var o=rl(t,i,e);return Le(o!==null),R_(o,i,t.host)}return n}function Vt(t){function e(n,r){var i;return n.getStatus()===401?n.getResponseText().includes("Firebase App Check token is invalid")?i=Hg():i=Vg():n.getStatus()===402?i=jg(t.bucket):n.getStatus()===403?i=Gg(t.path):i=r,i.serverResponse=r.serverResponse,i}return e}function Ir(t){var e=Vt(t);function n(r,i){var o=e(r,i);return r.getStatus()===404&&(o=Wg(t.path)),o.serverResponse=i.serverResponse,o}return n}function sl(t,e,n){var r=e.fullServerUrl(),i=nt(r,t.host),o="GET",s=t.maxOperationRetryTime,a=new He(i,o,Cr(t,n),s);return a.errorHandler=Ir(e),a}function O_(t,e,n,r,i){var o={};e.isRoot?o.prefix="":o.prefix=e.path+"/",n&&n.length>0&&(o.delimiter=n),r&&(o.pageToken=r),i&&(o.maxResults=i);var s=e.bucketOnlyServerUrl(),a=nt(s,t.host),u="GET",l=t.maxOperationRetryTime,c=new He(a,u,P_(t,e.bucket),l);return c.urlParams=o,c.errorHandler=Vt(e),c}function M_(t,e,n){var r=e.fullServerUrl(),i=nt(r,t.host),o="GET",s=t.maxOperationRetryTime,a=new He(i,o,N_(t,n),s);return a.errorHandler=Ir(e),a}function x_(t,e,n,r){var i=e.fullServerUrl(),o=nt(i,t.host),s="PATCH",a=Ro(n,r),u={"Content-Type":"application/json; charset=utf-8"},l=t.maxOperationRetryTime,c=new He(o,s,Cr(t,r),l);return c.headers=u,c.body=a,c.errorHandler=Ir(e),c}function D_(t,e){var n=e.fullServerUrl(),r=nt(n,t.host),i="DELETE",o=t.maxOperationRetryTime;function s(u,l){}var a=new He(r,i,s,o);return a.successCodes=[200,204],a.errorHandler=Ir(e),a}function L_(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function al(t,e,n){var r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=L_(null,e)),r}function F_(t,e,n,r,i){var o=e.bucketOnlyServerUrl(),s={"X-Goog-Upload-Protocol":"multipart"};function a(){for(var N="",z=0;z<2;z++)N=N+Math.random().toString().slice(2);return N}var u=a();s["Content-Type"]="multipart/related; boundary="+u;var l=al(e,r,i),c=Ro(l,n),f="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+c+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,h=`\r
--`+u+"--",d=Io.getBlob(f,r,h);if(d===null)throw zu();var p={name:l.fullPath},m=nt(o,t.host),y="POST",b=t.maxUploadRetryTime,C=new He(m,y,Cr(t,n),b);return C.urlParams=p,C.headers=s,C.body=d.uploadData(),C.errorHandler=Vt(e),C}var Sr=function(){function t(e,n,r,i){this.current=e,this.total=n,this.finalized=!!r,this.metadata=i||null}return t}();function ko(t,e){var n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch{Le(!1)}var r=e||["active"];return Le(!!n&&r.indexOf(n)!==-1),n}function U_(t,e,n,r,i){var o=e.bucketOnlyServerUrl(),s=al(e,r,i),a={name:s.fullPath},u=nt(o,t.host),l="POST",c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":""+r.size(),"X-Goog-Upload-Header-Content-Type":s.contentType,"Content-Type":"application/json; charset=utf-8"},f=Ro(s,n),h=t.maxUploadRetryTime;function d(m){ko(m);var y;try{y=m.getResponseHeader("X-Goog-Upload-URL")}catch{Le(!1)}return Le(br(y)),y}var p=new He(u,l,d,h);return p.urlParams=a,p.headers=c,p.body=f,p.errorHandler=Vt(e),p}function B_(t,e,n,r){var i={"X-Goog-Upload-Command":"query"};function o(l){var c=ko(l,["active","final"]),f=null;try{f=l.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Le(!1)}f||Le(!1);var h=Number(f);return Le(!isNaN(h)),new Sr(h,r.size(),c==="final")}var s="POST",a=t.maxUploadRetryTime,u=new He(n,s,o,a);return u.headers=i,u.errorHandler=Vt(e),u}var ul=256*1024;function W_(t,e,n,r,i,o,s,a){var u=new Sr(0,0);if(s?(u.current=s.current,u.total=s.total):(u.current=0,u.total=r.size()),r.size()!==u.total)throw Qg();var l=u.total-u.current,c=l;i>0&&(c=Math.min(c,i));var f=u.current,h=f+c,d=c===l?"upload, finalize":"upload",p={"X-Goog-Upload-Command":d,"X-Goog-Upload-Offset":""+u.current},m=r.slice(f,h);if(m===null)throw zu();function y(z,L){var Te=ko(z,["active","final"]),it=u.current+c,Ke=r.size(),we;return Te==="final"?we=Cr(e,o)(z,L):we=null,new Sr(it,Ke,Te==="final",we)}var b="POST",C=e.maxUploadRetryTime,N=new He(n,b,y,C);return N.headers=p,N.body=m.uploadData(),N.progressCallback=a||null,N.errorHandler=Vt(t),N}/**
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
 */var j_=function(){function t(e,n,r){var i=c_(e)||n!=null||r!=null;if(i)this.next=e,this.error=n,this.complete=r;else{var o=e;this.next=o.next,this.error=o.error,this.complete=o.complete}}return t}();/**
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
 */function Ht(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];Promise.resolve().then(function(){return t.apply(void 0,e)})}}/**
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
 */var ll=function(){function t(e,n,r){var i=this;r===void 0&&(r=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=n,this._metadata=r,this._mappings=Er(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=function(o){i._request=void 0,i._chunkMultiplier=1,o._codeEquals("canceled")?(i._needToFetchStatus=!0,i.completeTransitions_()):(i._error=o,i._transition("error"))},this._metadataErrorHandler=function(o){i._request=void 0,o._codeEquals("canceled")?i.completeTransitions_():(i._error=o,i._transition("error"))},this._promise=new Promise(function(o,s){i._resolve=o,i._reject=s,i._start()}),this._promise.then(null,function(){})}return t.prototype._makeProgressCallback=function(){var e=this,n=this._transferred;return function(r){return e._updateProgress(n+r)}},t.prototype._shouldDoResumable=function(e){return e.size()>256*1024},t.prototype._start=function(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},t.prototype._resolveToken=function(e){var n=this;Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(function(r){var i=r[0],o=r[1];switch(n._state){case"running":e(i,o);break;case"canceling":n._transition("canceled");break;case"pausing":n._transition("paused");break}})},t.prototype._createResumable=function(){var e=this;this._resolveToken(function(n,r){var i=U_(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),o=e._ref.storage._makeRequest(i,n,r);e._request=o,o.getPromise().then(function(s){e._request=void 0,e._uploadUrl=s,e._needToFetchStatus=!1,e.completeTransitions_()},e._errorHandler)})},t.prototype._fetchStatus=function(){var e=this,n=this._uploadUrl;this._resolveToken(function(r,i){var o=B_(e._ref.storage,e._ref._location,n,e._blob),s=e._ref.storage._makeRequest(o,r,i);e._request=s,s.getPromise().then(function(a){a=a,e._request=void 0,e._updateProgress(a.current),e._needToFetchStatus=!1,a.finalized&&(e._needToFetchMetadata=!0),e.completeTransitions_()},e._errorHandler)})},t.prototype._continueUpload=function(){var e=this,n=ul*this._chunkMultiplier,r=new Sr(this._transferred,this._blob.size()),i=this._uploadUrl;this._resolveToken(function(o,s){var a;try{a=W_(e._ref._location,e._ref.storage,i,e._blob,n,e._mappings,r,e._makeProgressCallback())}catch(l){e._error=l,e._transition("error");return}var u=e._ref.storage._makeRequest(a,o,s);e._request=u,u.getPromise().then(function(l){e._increaseMultiplier(),e._request=void 0,e._updateProgress(l.current),l.finalized?(e._metadata=l.metadata,e._transition("success")):e.completeTransitions_()},e._errorHandler)})},t.prototype._increaseMultiplier=function(){var e=ul*this._chunkMultiplier;e<32*1024*1024&&(this._chunkMultiplier*=2)},t.prototype._fetchMetadata=function(){var e=this;this._resolveToken(function(n,r){var i=sl(e._ref.storage,e._ref._location,e._mappings),o=e._ref.storage._makeRequest(i,n,r);e._request=o,o.getPromise().then(function(s){e._request=void 0,e._metadata=s,e._transition("success")},e._metadataErrorHandler)})},t.prototype._oneShotUpload=function(){var e=this;this._resolveToken(function(n,r){var i=F_(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),o=e._ref.storage._makeRequest(i,n,r);e._request=o,o.getPromise().then(function(s){e._request=void 0,e._metadata=s,e._updateProgress(e._blob.size()),e._transition("success")},e._errorHandler)})},t.prototype._updateProgress=function(e){var n=this._transferred;this._transferred=e,this._transferred!==n&&this._notifyObservers()},t.prototype._transition=function(e){if(this._state!==e)switch(e){case"canceling":this._state=e,this._request!==void 0&&this._request.cancel();break;case"pausing":this._state=e,this._request!==void 0&&this._request.cancel();break;case"running":var n=this._state==="paused";this._state=e,n&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Ku(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}},t.prototype.completeTransitions_=function(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}},Object.defineProperty(t.prototype,"snapshot",{get:function(){var e=wo(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}},enumerable:!1,configurable:!0}),t.prototype.on=function(e,n,r,i){var o=this,s=new j_(n,r,i);return this._addObserver(s),function(){o._removeObserver(s)}},t.prototype.then=function(e,n){return this._promise.then(e,n)},t.prototype.catch=function(e){return this.then(null,e)},t.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},t.prototype._removeObserver=function(e){var n=this._observers.indexOf(e);n!==-1&&this._observers.splice(n,1)},t.prototype._notifyObservers=function(){var e=this;this._finishPromise();var n=this._observers.slice();n.forEach(function(r){e._notifyObserver(r)})},t.prototype._finishPromise=function(){if(this._resolve!==void 0){var e=!0;switch(wo(this._state)){case re.SUCCESS:Ht(this._resolve.bind(null,this.snapshot))();break;case re.CANCELED:case re.ERROR:var n=this._reject;Ht(n.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}},t.prototype._notifyObserver=function(e){var n=wo(this._state);switch(n){case re.RUNNING:case re.PAUSED:e.next&&Ht(e.next.bind(e,this.snapshot))();break;case re.SUCCESS:e.complete&&Ht(e.complete.bind(e))();break;case re.CANCELED:case re.ERROR:e.error&&Ht(e.error.bind(e,this._error))();break;default:e.error&&Ht(e.error.bind(e,this._error))()}},t.prototype.resume=function(){var e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e},t.prototype.pause=function(){var e=this._state==="running";return e&&this._transition("pausing"),e},t.prototype.cancel=function(){var e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e},t}();/**
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
 */var Rr=function(){function t(e,n){this._service=e,n instanceof me?this._location=n:this._location=me.makeFromUrl(n,e.host)}return t.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},t.prototype._newRef=function(e,n){return new t(e,n)},Object.defineProperty(t.prototype,"root",{get:function(){var e=new me(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return nl(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parent",{get:function(){var e=T_(this._location.path);if(e===null)return null;var n=new me(this._location.bucket,e);return new t(this._service,n)},enumerable:!1,configurable:!0}),t.prototype._throwIfRoot=function(e){if(this._location.path==="")throw Qu(e)},t}();function V_(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new ll(t,new Io(e),n)}function H_(t){var e={prefixes:[],items:[]};return cl(t,e).then(function(){return e})}function cl(t,e,n){return v(this,void 0,void 0,function(){var r,i,o,s;return g(this,function(a){switch(a.label){case 0:return r={pageToken:n},[4,fl(t,r)];case 1:return i=a.sent(),(o=e.prefixes).push.apply(o,i.prefixes),(s=e.items).push.apply(s,i.items),i.nextPageToken==null?[3,3]:[4,cl(t,e,i.nextPageToken)];case 2:a.sent(),a.label=3;case 3:return[2]}})})}function fl(t,e){return v(this,void 0,void 0,function(){var n,r;return g(this,function(i){switch(i.label){case 0:return e!=null&&typeof e.maxResults=="number"&&Co("options.maxResults",1,1e3,e.maxResults),n=e||{},r=O_(t.storage,t._location,"/",n.pageToken,n.maxResults),[4,t.storage.makeRequestWithTokens(r)];case 1:return[2,i.sent().getPromise()]}})})}function G_(t){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:return t._throwIfRoot("getMetadata"),e=sl(t.storage,t._location,Er()),[4,t.storage.makeRequestWithTokens(e)];case 1:return[2,n.sent().getPromise()]}})})}function q_(t,e){return v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:return t._throwIfRoot("updateMetadata"),n=x_(t.storage,t._location,e,Er()),[4,t.storage.makeRequestWithTokens(n)];case 1:return[2,r.sent().getPromise()]}})})}function K_(t){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:return t._throwIfRoot("getDownloadURL"),e=M_(t.storage,t._location,Er()),[4,t.storage.makeRequestWithTokens(e)];case 1:return[2,n.sent().getPromise().then(function(r){if(r===null)throw Yg();return r})]}})})}function z_(t){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:return t._throwIfRoot("deleteObject"),e=D_(t.storage,t._location),[4,t.storage.makeRequestWithTokens(e)];case 1:return[2,n.sent().getPromise()]}})})}function hl(t,e){var n=w_(t._location.path,e),r=new me(t._location.bucket,n);return new Rr(t.storage,r)}/**
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
 */function Ao(t){return/^[A-Za-z]+:\/\//.test(t)}function $_(t,e){return new Rr(t,e)}function dl(t,e){if(t instanceof kr){var n=t;if(n._bucket==null)throw $g();var r=new Rr(n,n._bucket);return e!=null?dl(r,e):r}else return e!==void 0?hl(t,e):t}function Q_(t,e){if(e&&Ao(e)){if(t instanceof kr)return $_(t,e);throw jt("To use ref(service, url), the first argument must be a Storage instance.")}else return dl(t,e)}function pl(t,e){var n=e==null?void 0:e[qu];return n==null?null:me.makeFromBucketSpec(n,t)}function Y_(t,e,n,r){r===void 0&&(r={}),t.host="http://"+e+":"+n;var i=r.mockUserToken;i&&(t._overrideAuthToken=typeof i=="string"?i:Yo(i,t.app.options.projectId))}var kr=function(){function t(e,n,r,i,o,s){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._pool=i,this._url=o,this._firebaseVersion=s,this._bucket=null,this._host=Gu,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ug,this._maxUploadRetryTime=Bg,this._requests=new Set,o!=null?this._bucket=me.makeFromBucketSpec(o,this._host):this._bucket=pl(this._host,this.app.options)}return Object.defineProperty(t.prototype,"host",{get:function(){return this._host},set:function(e){this._host=e,this._url!=null?this._bucket=me.makeFromBucketSpec(this._url,e):this._bucket=pl(e,this.app.options)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(e){Co("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(e){Co("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e},enumerable:!1,configurable:!0}),t.prototype._getAuthToken=function(){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return this._overrideAuthToken?[2,this._overrideAuthToken]:(e=this._authProvider.getImmediate({optional:!0}),e?[4,e.getToken()]:[3,2]);case 1:if(n=r.sent(),n!==null)return[2,n.accessToken];r.label=2;case 2:return[2,null]}})})},t.prototype._getAppCheckToken=function(){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return e=this._appCheckProvider.getImmediate({optional:!0}),e?[4,e.getToken()]:[3,2];case 1:return n=r.sent(),[2,n.token];case 2:return[2,null]}})})},t.prototype._delete=function(){return this._deleted||(this._deleted=!0,this._requests.forEach(function(e){return e.cancel()}),this._requests.clear()),Promise.resolve()},t.prototype._makeStorageReference=function(e){return new Rr(this,e)},t.prototype._makeRequest=function(e,n,r){var i=this;if(this._deleted)return new s_($u());var o=__(e,this._appId,n,r,this._pool,this._firebaseVersion);return this._requests.add(o),o.getPromise().then(function(){return i._requests.delete(o)},function(){return i._requests.delete(o)}),o},t.prototype.makeRequestWithTokens=function(e){return v(this,void 0,void 0,function(){var n,r,i;return g(this,function(o){switch(o.label){case 0:return[4,Promise.all([this._getAuthToken(),this._getAppCheckToken()])];case 1:return n=o.sent(),r=n[0],i=n[1],[2,this._makeRequest(e,r,i)]}})})},t}();/**
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
 */function X_(t,e,n){return t=U(t),V_(t,e,n)}function J_(t){return t=U(t),G_(t)}function Z_(t,e){return t=U(t),q_(t,e)}function em(t,e){return t=U(t),fl(t,e)}function tm(t){return t=U(t),H_(t)}function nm(t){return t=U(t),K_(t)}function rm(t){return t=U(t),z_(t)}function vl(t,e){return t=U(t),Q_(t,e)}function im(t,e){return hl(t,e)}function om(t,e,n,r){r===void 0&&(r={}),Y_(t,e,n,r)}/**
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
 */var Ar=function(){function t(e,n,r){this._delegate=e,this.task=n,this.ref=r}return Object.defineProperty(t.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),t}();/**
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
 */var gl=function(){function t(e,n){this._delegate=e,this._ref=n,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}return Object.defineProperty(t.prototype,"snapshot",{get:function(){return new Ar(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),t.prototype.then=function(e,n){var r=this;return this._delegate.then(function(i){if(e)return e(new Ar(i,r,r._ref))},n)},t.prototype.on=function(e,n,r,i){var o=this,s=void 0;return n&&(typeof n=="function"?s=function(a){return n(new Ar(a,o,o._ref))}:s={next:n.next?function(a){return n.next(new Ar(a,o,o._ref))}:void 0,complete:n.complete||void 0,error:n.error||void 0}),this._delegate.on(e,s,r||void 0,i||void 0)},t}(),_l=function(){function t(e,n){this._delegate=e,this._service=n}return Object.defineProperty(t.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map(function(n){return new In(n,e._service)})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){var e=this;return this._delegate.items.map(function(n){return new In(n,e._service)})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),t}();/**
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
 */var In=function(){function t(e,n){this._delegate=e,this.storage=n}return Object.defineProperty(t.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),t.prototype.toString=function(){return this._delegate.toString()},t.prototype.child=function(e){var n=im(this._delegate,e);return new t(n,this.storage)},Object.defineProperty(t.prototype,"root",{get:function(){return new t(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"parent",{get:function(){var e=this._delegate.parent;return e==null?null:new t(e,this.storage)},enumerable:!1,configurable:!0}),t.prototype.put=function(e,n){return this._throwIfRoot("put"),new gl(X_(this._delegate,e,n),this)},t.prototype.putString=function(e,n,r){n===void 0&&(n=_e.RAW),this._throwIfRoot("putString");var i=Yu(n,e),o=w({},r);return o.contentType==null&&i.contentType!=null&&(o.contentType=i.contentType),new gl(new ll(this._delegate,new Io(i.data,!0),o),this)},t.prototype.listAll=function(){var e=this;return tm(this._delegate).then(function(n){return new _l(n,e.storage)})},t.prototype.list=function(e){var n=this;return em(this._delegate,e||void 0).then(function(r){return new _l(r,n.storage)})},t.prototype.getMetadata=function(){return J_(this._delegate)},t.prototype.updateMetadata=function(e){return Z_(this._delegate,e)},t.prototype.getDownloadURL=function(){return nm(this._delegate)},t.prototype.delete=function(){return this._throwIfRoot("delete"),rm(this._delegate)},t.prototype._throwIfRoot=function(e){if(this._delegate._location.path==="")throw Qu(e)},t}();/**
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
 */var sm=function(){function t(e,n){this.app=e,this._delegate=n}return Object.defineProperty(t.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),t.prototype.ref=function(e){if(Ao(e))throw jt("ref() expected a child path but got a URL, use refFromURL instead.");return new In(vl(this._delegate,e),this)},t.prototype.refFromURL=function(e){if(!Ao(e))throw jt("refFromURL() expected a full URL but got a child path, use ref() instead.");try{me.makeFromUrl(e,this._delegate.host)}catch{throw jt("refFromUrl() expected a valid full URL but got an invalid one.")}return new In(vl(this._delegate,e),this)},t.prototype.setMaxUploadRetryTime=function(e){this._delegate.maxUploadRetryTime=e},t.prototype.setMaxOperationRetryTime=function(e){this._delegate.maxOperationRetryTime=e},t.prototype.useEmulator=function(e,n,r){r===void 0&&(r={}),om(this._delegate,e,n,r)},t}(),am="@firebase/storage",um="0.7.0";/**
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
 */var lm="storage";function cm(t,e){var n=e.instanceIdentifier,r=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal"),s=new sm(r,new kr(r,i,o,new o_,n,ae.SDK_VERSION));return s}function fm(t){var e={TaskState:re,TaskEvent:n_,StringFormat:_e,Storage:kr,Reference:In};t.INTERNAL.registerComponent(new he(lm,cm,"PUBLIC").setServiceProps(e).setMultipleInstances(!0)),t.registerVersion(am,um)}fm(ae);var hm="@firebase/performance",ml="0.4.18";/**
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
 */var yl=ml,dm="FB-PERF-TRACE-START",pm="FB-PERF-TRACE-STOP",Po="FB-PERF-TRACE-MEASURE",bl="_wt_",Tl="_fp",wl="_fcp",El="_fid",Cl="@firebase/performance/config",Il="@firebase/performance/configexpire",vm="performance",Sl="Performance";/**
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
 */var Y,gm=(Y={},Y["trace started"]="Trace {$traceName} was started before.",Y["trace stopped"]="Trace {$traceName} is not running.",Y["nonpositive trace startTime"]="Trace {$traceName} startTime should be positive.",Y["nonpositive trace duration"]="Trace {$traceName} duration should be positive.",Y["no window"]="Window is not available.",Y["no app id"]="App id is not available.",Y["no project id"]="Project id is not available.",Y["no api key"]="Api key is not available.",Y["invalid cc log"]="Attempted to queue invalid cc event",Y["FB not default"]="Performance can only start when Firebase app instance is the default one.",Y["RC response not ok"]="RC response is not ok",Y["invalid attribute name"]="Attribute name {$attributeName} is invalid.",Y["invalid attribute value"]="Attribute value {$attributeValue} is invalid.",Y["invalid custom metric name"]="Custom metric name {$customMetricName} is invalid",Y["invalid String merger input"]="Input for String merger is invalid, contact support team to resolve.",Y),J=new It(vm,Sl,gm);/**
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
 */var Ge=new Kt(Sl);Ge.logLevel=Ct.INFO;/**
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
 */var No,Rl,Z=function(){function t(e){if(this.window=e,!e)throw J.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(e){!this.performance||!this.performance.mark||this.performance.mark(e)},t.prototype.measure=function(e,n,r){!this.performance||!this.performance.measure||this.performance.measure(e,n,r)},t.prototype.getEntriesByType=function(e){return!this.performance||!this.performance.getEntriesByType?[]:this.performance.getEntriesByType(e)},t.prototype.getEntriesByName=function(e){return!this.performance||!this.performance.getEntriesByName?[]:this.performance.getEntriesByName(e)},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.requiredApisAvailable=function(){return!fetch||!Promise||!this.navigator||!this.navigator.cookieEnabled?(Ge.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1):$t()?!0:(Ge.info("IndexedDB is not supported by current browswer"),!1)},t.prototype.setupObserver=function(e,n){if(!!this.PerformanceObserver){var r=new this.PerformanceObserver(function(i){for(var o=0,s=i.getEntries();o<s.length;o++){var a=s[o];n(a)}});r.observe({entryTypes:[e]})}},t.getInstance=function(){return No===void 0&&(No=new t(Rl)),No},t}();function _m(t){Rl=t}/**
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
 */function kl(t,e){var n=t.length-e.length;if(n<0||n>1)throw J.create("invalid String merger input");for(var r=[],i=0;i<t.length;i++)r.push(t.charAt(i)),e.length>i&&r.push(e.charAt(i));return r.join("")}/**
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
 */var Oo,H=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=kl("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=kl("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getAppId=function(){var e=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!e)throw J.create("no app id");return e},t.prototype.getProjectId=function(){var e=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!e)throw J.create("no project id");return e},t.prototype.getApiKey=function(){var e=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!e)throw J.create("no api key");return e},t.prototype.getFlTransportFullUrl=function(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)},t.getInstance=function(){return Oo===void 0&&(Oo=new t),Oo},t}();/**
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
 */var Al;function mm(){var t=H.getInstance().installationsService.getId();return t.then(function(e){Al=e}),t}function Mo(){return Al}function ym(){var t=H.getInstance().installationsService.getToken();return t.then(function(e){}),t}/**
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
 */var Gt;(function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"})(Gt||(Gt={}));var bm=["firebase_","google_","ga_"],Tm=new RegExp("^[a-zA-Z]\\w*$"),wm=40,Em=100;function Cm(){var t=Z.getInstance().navigator;return"serviceWorker"in t?t.serviceWorker.controller?2:3:1}function Pl(){var t=Z.getInstance().document,e=t.visibilityState;switch(e){case"visible":return Gt.VISIBLE;case"hidden":return Gt.HIDDEN;default:return Gt.UNKNOWN}}function Im(){var t=Z.getInstance().navigator,e=t.connection,n=e&&e.effectiveType;switch(n){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}function Sm(t){if(t.length===0||t.length>wm)return!1;var e=bm.some(function(n){return t.startsWith(n)});return!e&&!!t.match(Tm)}function Rm(t){return t.length!==0&&t.length<=Em}/**
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
 */var km="0.0.1",Am={loggingEnabled:!0},Pm="FIREBASE_INSTALLATIONS_AUTH";function Nm(t){var e=Om();return e?(Nl(e),Promise.resolve()):Dm(t).then(Nl).then(function(n){return Mm(n)},function(){})}function Om(){var t=Z.getInstance().localStorage;if(!!t){var e=t.getItem(Il);if(!(!e||!Lm(e))){var n=t.getItem(Cl);if(!!n)try{var r=JSON.parse(n);return r}catch{return}}}}function Mm(t){var e=Z.getInstance().localStorage;!t||!e||(e.setItem(Cl,JSON.stringify(t)),e.setItem(Il,String(Date.now()+H.getInstance().configTimeToLive*60*60*1e3)))}var xm="Could not fetch config, will use default configs";function Dm(t){return ym().then(function(e){var n=H.getInstance().getProjectId(),r="https://firebaseremoteconfig.googleapis.com/v1/projects/"+n+"/namespaces/fireperf:fetch?key="+H.getInstance().getApiKey(),i=new Request(r,{method:"POST",headers:{Authorization:Pm+" "+e},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:H.getInstance().getAppId(),app_version:yl,sdk_version:km})});return fetch(i).then(function(o){if(o.ok)return o.json();throw J.create("RC response not ok")})}).catch(function(){Ge.info(xm)})}function Nl(t){if(!t)return t;var e=H.getInstance(),n=t.entries||{};return n.fpr_enabled!==void 0?e.loggingEnabled=String(n.fpr_enabled)==="true":e.loggingEnabled=Am.loggingEnabled,n.fpr_log_source&&(e.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(e.logEndPointUrl=n.fpr_log_endpoint_url),n.fpr_log_transport_key&&(e.transportKey=n.fpr_log_transport_key),n.fpr_vc_network_request_sampling_rate!==void 0&&(e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),n.fpr_vc_trace_sampling_rate!==void 0&&(e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=Ol(e.tracesSamplingRate),e.logNetworkAfterSampling=Ol(e.networkRequestsSamplingRate),t}function Lm(t){return Number(t)>Date.now()}function Ol(t){return Math.random()<=t}/**
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
 */var xo=1,Do;function Ml(){return xo=2,Do=Do||Um(),Do}function Fm(){return xo===3}function Um(){return Bm().then(function(){return mm()}).then(function(t){return Nm(t)}).then(function(){return xl()},function(){return xl()})}function Bm(){var t=Z.getInstance().document;return new Promise(function(e){if(t&&t.readyState!=="complete"){var n=function(){t.readyState==="complete"&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()})}function xl(){xo=3}/**
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
 */var Lo=10*1e3,Wm=5.5*1e3,Dl=3,jm=1e3,Pr=Dl,rt=[],Ll=!1;function Vm(){Ll||(Nr(Wm),Ll=!0)}function Nr(t){setTimeout(function(){if(Pr!==0){if(!rt.length)return Nr(Lo);Hm()}},t)}function Hm(){var t=rt.splice(0,jm),e=t.map(function(r){return{source_extension_json_proto3:r.message,event_time_ms:String(r.eventTime)}}),n={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:H.getInstance().logSource,log_event:e};Gm(n,t).catch(function(){rt=q(q([],t),rt),Pr--,Ge.info("Tries left: "+Pr+"."),Nr(Lo)})}function Gm(t,e){return qm(t).then(function(n){return n.ok||Ge.info("Call to Firebase backend failed."),n.json()}).then(function(n){var r=Number(n.nextRequestWaitMillis),i=Lo;isNaN(r)||(i=Math.max(r,i));var o=n.logResponseDetails;Array.isArray(o)&&o.length>0&&o[0].responseAction==="RETRY_REQUEST_LATER"&&(rt=q(q([],e),rt),Ge.info("Retry transport request later.")),Pr=Dl,Nr(i)})}function qm(t){var e=H.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}function Km(t){if(!t.eventTime||!t.message)throw J.create("invalid cc log");rt=q(q([],rt),[t])}function zm(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=t.apply(void 0,e);Km({message:r,eventTime:Date.now()})}}/**
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
 */var Fo;function Fl(t,e){Fo||(Fo=zm(Qm)),Fo(t,e)}function Or(t){var e=H.getInstance();!e.instrumentationEnabled&&t.isAuto||!e.dataCollectionEnabled&&!t.isAuto||!Z.getInstance().requiredApisAvailable()||t.isAuto&&Pl()!==Gt.VISIBLE||(Fm()?Uo(t):Ml().then(function(){return Uo(t)},function(){return Uo(t)}))}function Uo(t){if(!!Mo()){var e=H.getInstance();!e.loggingEnabled||!e.logTraceAfterSampling||setTimeout(function(){return Fl(t,1)},0)}}function $m(t){var e=H.getInstance();if(!!e.instrumentationEnabled){var n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n===r||n===i||!e.loggingEnabled||!e.logNetworkAfterSampling||setTimeout(function(){return Fl(t,0)},0)}}function Qm(t,e){return e===0?Ym(t):Xm(t)}function Ym(t){var e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},n={application_info:Ul(),network_request_metric:e};return JSON.stringify(n)}function Xm(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};Object.keys(t.counters).length!==0&&(e.counters=t.counters);var n=t.getAttributes();Object.keys(n).length!==0&&(e.custom_attributes=n);var r={application_info:Ul(),trace_metric:e};return JSON.stringify(r)}function Ul(){return{google_app_id:H.getInstance().getAppId(),app_instance_id:Mo(),web_app_info:{sdk_version:yl,page_url:Z.getInstance().getUrl(),service_worker_status:Cm(),visibility_state:Pl(),effective_connection_type:Im()},application_process_state:0}}/**
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
 */var Jm=100,Zm="_",ey=[Tl,wl,El];function ty(t,e){return t.length===0||t.length>Jm?!1:e&&e.startsWith(bl)&&ey.indexOf(t)>-1||!t.startsWith(Zm)}function ny(t){var e=Math.floor(t);return e<t&&Ge.info("Metric value should be an Integer, setting the value as : "+e+"."),e}/**
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
 */var Sn=function(){function t(e,n,r){n===void 0&&(n=!1),this.name=e,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=Z.getInstance(),this.randomId=Math.floor(Math.random()*1e6),this.isAuto||(this.traceStartMark=dm+"-"+this.randomId+"-"+this.name,this.traceStopMark=pm+"-"+this.randomId+"-"+this.name,this.traceMeasure=r||Po+"-"+this.randomId+"-"+this.name,r&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(this.state!==1)throw J.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(this.state!==2)throw J.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),Or(this)},t.prototype.record=function(e,n,r){if(e<=0)throw J.create("nonpositive trace startTime",{traceName:this.name});if(n<=0)throw J.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(n*1e3),this.startTimeUs=Math.floor(e*1e3),r&&r.attributes&&(this.customAttributes=w({},r.attributes)),r&&r.metrics)for(var i=0,o=Object.keys(r.metrics);i<o.length;i++){var s=o[i];isNaN(Number(r.metrics[s]))||(this.counters[s]=Number(Math.floor(r.metrics[s])))}Or(this)},t.prototype.incrementMetric=function(e,n){n===void 0&&(n=1),this.counters[e]===void 0?this.putMetric(e,n):this.putMetric(e,this.counters[e]+n)},t.prototype.putMetric=function(e,n){if(ty(e,this.name))this.counters[e]=ny(n);else throw J.create("invalid custom metric name",{customMetricName:e})},t.prototype.getMetric=function(e){return this.counters[e]||0},t.prototype.putAttribute=function(e,n){var r=Sm(e),i=Rm(n);if(r&&i){this.customAttributes[e]=n;return}if(!r)throw J.create("invalid attribute name",{attributeName:e});if(!i)throw J.create("invalid attribute value",{attributeValue:n})},t.prototype.getAttribute=function(e){return this.customAttributes[e]},t.prototype.removeAttribute=function(e){this.customAttributes[e]!==void 0&&delete this.customAttributes[e]},t.prototype.getAttributes=function(){return w({},this.customAttributes)},t.prototype.setStartTime=function(e){this.startTimeUs=e},t.prototype.setDuration=function(e){this.durationUs=e},t.prototype.calculateTraceMetrics=function(){var e=this.api.getEntriesByName(this.traceMeasure),n=e&&e[0];n&&(this.durationUs=Math.floor(n.duration*1e3),this.startTimeUs=Math.floor((n.startTime+this.api.getTimeOrigin())*1e3))},t.createOobTrace=function(e,n,r){var i=Z.getInstance().getUrl();if(!!i){var o=new t(bl+i,!0),s=Math.floor(Z.getInstance().getTimeOrigin()*1e3);o.setStartTime(s),e&&e[0]&&(o.setDuration(Math.floor(e[0].duration*1e3)),o.putMetric("domInteractive",Math.floor(e[0].domInteractive*1e3)),o.putMetric("domContentLoadedEventEnd",Math.floor(e[0].domContentLoadedEventEnd*1e3)),o.putMetric("loadEventEnd",Math.floor(e[0].loadEventEnd*1e3)));var a="first-paint",u="first-contentful-paint";if(n){var l=n.find(function(f){return f.name===a});l&&l.startTime&&o.putMetric(Tl,Math.floor(l.startTime*1e3));var c=n.find(function(f){return f.name===u});c&&c.startTime&&o.putMetric(wl,Math.floor(c.startTime*1e3)),r&&o.putMetric(El,Math.floor(r*1e3))}Or(o)}},t.createUserTimingTrace=function(e){var n=new t(e,!1,e);Or(n)},t}();/**
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
 */function Bl(t){var e=t;if(!(!e||e.responseStart===void 0)){var n=Z.getInstance().getTimeOrigin(),r=Math.floor((e.startTime+n)*1e3),i=e.responseStart?Math.floor((e.responseStart-e.startTime)*1e3):void 0,o=Math.floor((e.responseEnd-e.startTime)*1e3),s=e.name&&e.name.split("?")[0],a={url:s,responsePayloadBytes:e.transferSize,startTimeUs:r,timeToResponseInitiatedUs:i,timeToResponseCompletedUs:o};$m(a)}}/**
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
 */var ry=5e3;function Wl(){!Mo()||(setTimeout(function(){return oy()},0),setTimeout(function(){return iy()},0),setTimeout(function(){return sy()},0))}function iy(){for(var t=Z.getInstance(),e=t.getEntriesByType("resource"),n=0,r=e;n<r.length;n++){var i=r[n];Bl(i)}t.setupObserver("resource",Bl)}function oy(){var t=Z.getInstance(),e=t.getEntriesByType("navigation"),n=t.getEntriesByType("paint");if(t.onFirstInputDelay){var r=setTimeout(function(){Sn.createOobTrace(e,n),r=void 0},ry);t.onFirstInputDelay(function(i){r&&(clearTimeout(r),Sn.createOobTrace(e,n,i))})}else Sn.createOobTrace(e,n)}function sy(){for(var t=Z.getInstance(),e=t.getEntriesByType("measure"),n=0,r=e;n<r.length;n++){var i=r[n];jl(i)}t.setupObserver("measure",jl)}function jl(t){var e=t.name;e.substring(0,Po.length)!==Po&&Sn.createUserTimingTrace(e)}/**
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
 */var ay=function(){function t(e){this.app=e,Z.getInstance().requiredApisAvailable()&&Wr().then(function(n){n&&(Vm(),Ml().then(Wl,Wl))}).catch(function(n){Ge.info("Environment doesn't support IndexedDB: "+n)})}return t.prototype.trace=function(e){return new Sn(e)},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return H.getInstance().instrumentationEnabled},set:function(e){H.getInstance().instrumentationEnabled=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return H.getInstance().dataCollectionEnabled},set:function(e){H.getInstance().dataCollectionEnabled=e},enumerable:!1,configurable:!0}),t}();/**
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
 */var uy="[DEFAULT]";function ly(t){var e=function(n,r){if(n.name!==uy)throw J.create("FB not default");if(typeof window=="undefined")throw J.create("no window");return _m(window),H.getInstance().firebaseAppInstance=n,H.getInstance().installationsService=r,new ay(n)};t.INTERNAL.registerComponent(new he("performance",function(n){var r=n.getProvider("app").getImmediate(),i=n.getProvider("installations").getImmediate();return e(r,i)},"PUBLIC")),t.registerVersion(hm,ml)}ly(ae);/**
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
 */var cy="firebase_id",fy="origin",hy=60*1e3,dy="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Vl="https://www.googletagmanager.com/gtag/js",ee;(function(t){t.EVENT="event",t.SET="set",t.CONFIG="config"})(ee||(ee={}));var Bo;(function(t){t.ADD_SHIPPING_INFO="add_shipping_info",t.ADD_PAYMENT_INFO="add_payment_info",t.ADD_TO_CART="add_to_cart",t.ADD_TO_WISHLIST="add_to_wishlist",t.BEGIN_CHECKOUT="begin_checkout",t.CHECKOUT_PROGRESS="checkout_progress",t.EXCEPTION="exception",t.GENERATE_LEAD="generate_lead",t.LOGIN="login",t.PAGE_VIEW="page_view",t.PURCHASE="purchase",t.REFUND="refund",t.REMOVE_FROM_CART="remove_from_cart",t.SCREEN_VIEW="screen_view",t.SEARCH="search",t.SELECT_CONTENT="select_content",t.SELECT_ITEM="select_item",t.SELECT_PROMOTION="select_promotion",t.SET_CHECKOUT_OPTION="set_checkout_option",t.SHARE="share",t.SIGN_UP="sign_up",t.TIMING_COMPLETE="timing_complete",t.VIEW_CART="view_cart",t.VIEW_ITEM="view_item",t.VIEW_ITEM_LIST="view_item_list",t.VIEW_PROMOTION="view_promotion",t.VIEW_SEARCH_RESULTS="view_search_results"})(Bo||(Bo={}));/**
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
 */function py(t,e,n,r,i){return v(this,void 0,void 0,function(){var o,s;return g(this,function(a){switch(a.label){case 0:return i&&i.global?(t(ee.EVENT,n,r),[2]):[3,1];case 1:return[4,e];case 2:o=a.sent(),s=w(w({},r),{send_to:o}),t(ee.EVENT,n,s),a.label=3;case 3:return[2]}})})}function vy(t,e,n,r){return v(this,void 0,void 0,function(){var i;return g(this,function(o){switch(o.label){case 0:return r&&r.global?(t(ee.SET,{screen_name:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,e];case 2:i=o.sent(),t(ee.CONFIG,i,{update:!0,screen_name:n}),o.label=3;case 3:return[2]}})})}function gy(t,e,n,r){return v(this,void 0,void 0,function(){var i;return g(this,function(o){switch(o.label){case 0:return r&&r.global?(t(ee.SET,{user_id:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,e];case 2:i=o.sent(),t(ee.CONFIG,i,{update:!0,user_id:n}),o.label=3;case 3:return[2]}})})}function _y(t,e,n,r){return v(this,void 0,void 0,function(){var i,o,s,a,u;return g(this,function(l){switch(l.label){case 0:if(!(r&&r.global))return[3,1];for(i={},o=0,s=Object.keys(n);o<s.length;o++)a=s[o],i["user_properties."+a]=n[a];return t(ee.SET,i),[2,Promise.resolve()];case 1:return[4,e];case 2:u=l.sent(),t(ee.CONFIG,u,{update:!0,user_properties:n}),l.label=3;case 3:return[2]}})})}function my(t,e){return v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:return[4,t];case 1:return n=r.sent(),window["ga-disable-"+n]=!e,[2]}})})}/**
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
 */var X=new Kt("@firebase/analytics");/**
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
 */function yy(t,e){var n=document.createElement("script");n.src=Vl+"?l="+t+"&id="+e,n.async=!0,document.head.appendChild(n)}function by(t){var e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}function Ty(t,e,n,r,i,o){return v(this,void 0,void 0,function(){var s,a,u,l;return g(this,function(c){switch(c.label){case 0:s=r[i],c.label=1;case 1:return c.trys.push([1,7,,8]),s?[4,e[s]]:[3,3];case 2:return c.sent(),[3,6];case 3:return[4,Promise.all(n)];case 4:return a=c.sent(),u=a.find(function(f){return f.measurementId===i}),u?[4,e[u.appId]]:[3,6];case 5:c.sent(),c.label=6;case 6:return[3,8];case 7:return l=c.sent(),X.error(l),[3,8];case 8:return t(ee.CONFIG,i,o),[2]}})})}function wy(t,e,n,r,i){return v(this,void 0,void 0,function(){var o,s,a,u,l,c,f,h,d;return g(this,function(p){switch(p.label){case 0:return p.trys.push([0,4,,5]),o=[],i&&i.send_to?(s=i.send_to,Array.isArray(s)||(s=[s]),[4,Promise.all(n)]):[3,2];case 1:for(a=p.sent(),u=function(m){var y=a.find(function(C){return C.measurementId===m}),b=y&&e[y.appId];if(b)o.push(b);else return o=[],"break"},l=0,c=s;l<c.length&&(f=c[l],h=u(f),h!=="break");l++);p.label=2;case 2:return o.length===0&&(o=Object.values(e)),[4,Promise.all(o)];case 3:return p.sent(),t(ee.EVENT,r,i||{}),[3,5];case 4:return d=p.sent(),X.error(d),[3,5];case 5:return[2]}})})}function Ey(t,e,n,r){function i(o,s,a){return v(this,void 0,void 0,function(){var u;return g(this,function(l){switch(l.label){case 0:return l.trys.push([0,6,,7]),o!==ee.EVENT?[3,2]:[4,wy(t,e,n,s,a)];case 1:return l.sent(),[3,5];case 2:return o!==ee.CONFIG?[3,4]:[4,Ty(t,e,n,r,s,a)];case 3:return l.sent(),[3,5];case 4:t(ee.SET,s),l.label=5;case 5:return[3,7];case 6:return u=l.sent(),X.error(u),[3,7];case 7:return[2]}})})}return i}function Cy(t,e,n,r,i){var o=function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(o=window[i]),window[i]=Ey(o,t,e,n),{gtagCore:o,wrappedGtag:window[i]}}function Iy(){for(var t=window.document.getElementsByTagName("script"),e=0,n=Object.values(t);e<n.length;e++){var r=n[e];if(r.src&&r.src.includes(Vl))return r}return null}/**
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
 */var ke,Sy=(ke={},ke["already-exists"]="A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",ke["already-initialized"]="Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",ke["interop-component-reg-failed"]="Firebase Analytics Interop Component failed to instantiate: {$reason}",ke["invalid-analytics-context"]="Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",ke["indexeddb-unavailable"]="IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",ke["fetch-throttle"]="The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",ke["config-fetch-failed"]="Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",ke["no-api-key"]='The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',ke["no-app-id"]='The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',ke),ye=new It("analytics","Analytics",Sy);/**
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
 */var Ry=30,ky=1e3,Ay=function(){function t(e,n){e===void 0&&(e={}),n===void 0&&(n=ky),this.throttleMetadata=e,this.intervalMillis=n}return t.prototype.getThrottleMetadata=function(e){return this.throttleMetadata[e]},t.prototype.setThrottleMetadata=function(e,n){this.throttleMetadata[e]=n},t.prototype.deleteThrottleMetadata=function(e){delete this.throttleMetadata[e]},t}(),Hl=new Ay;function Py(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}function Ny(t){var e;return v(this,void 0,void 0,function(){var n,r,i,o,s,a,u;return g(this,function(l){switch(l.label){case 0:return n=t.appId,r=t.apiKey,i={method:"GET",headers:Py(r)},o=dy.replace("{app-id}",n),[4,fetch(o,i)];case 1:if(s=l.sent(),!(s.status!==200&&s.status!==304))return[3,6];a="",l.label=2;case 2:return l.trys.push([2,4,,5]),[4,s.json()];case 3:return u=l.sent(),((e=u.error)===null||e===void 0?void 0:e.message)&&(a=u.error.message),[3,5];case 4:return l.sent(),[3,5];case 5:throw ye.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a});case 6:return[2,s.json()]}})})}function Oy(t,e,n){return e===void 0&&(e=Hl),v(this,void 0,void 0,function(){var r,i,o,s,a,u,l=this;return g(this,function(c){if(r=t.options,i=r.appId,o=r.apiKey,s=r.measurementId,!i)throw ye.create("no-app-id");if(!o){if(s)return[2,{measurementId:s,appId:i}];throw ye.create("no-api-key")}return a=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new Dy,setTimeout(function(){return v(l,void 0,void 0,function(){return g(this,function(f){return u.abort(),[2]})})},n!==void 0?n:hy),[2,Gl({appId:i,apiKey:o,measurementId:s},a,u,e)]})})}function Gl(t,e,n,r){var i=e.throttleEndTimeMillis,o=e.backoffCount;return r===void 0&&(r=Hl),v(this,void 0,void 0,function(){var s,a,u,l,c,f,h;return g(this,function(d){switch(d.label){case 0:s=t.appId,a=t.measurementId,d.label=1;case 1:return d.trys.push([1,3,,4]),[4,My(n,i)];case 2:return d.sent(),[3,4];case 3:if(u=d.sent(),a)return X.warn("Timed out fetching this Firebase app's measurement ID from the server."+(" Falling back to the measurement ID "+a)+(' provided in the "measurementId" field in the local Firebase config. ['+u.message+"]")),[2,{appId:s,measurementId:a}];throw u;case 4:return d.trys.push([4,6,,7]),[4,Ny(t)];case 5:return l=d.sent(),r.deleteThrottleMetadata(s),[2,l];case 6:if(c=d.sent(),!xy(c)){if(r.deleteThrottleMetadata(s),a)return X.warn("Failed to fetch this Firebase app's measurement ID from the server."+(" Falling back to the measurement ID "+a)+(' provided in the "measurementId" field in the local Firebase config. ['+c.message+"]")),[2,{appId:s,measurementId:a}];throw c}return f=Number(c.customData.httpStatus)===503?jr(o,r.intervalMillis,Ry):jr(o,r.intervalMillis),h={throttleEndTimeMillis:Date.now()+f,backoffCount:o+1},r.setThrottleMetadata(s,h),X.debug("Calling attemptFetch again in "+f+" millis"),[2,Gl(t,h,n,r)];case 7:return[2]}})})}function My(t,e){return new Promise(function(n,r){var i=Math.max(e-Date.now(),0),o=setTimeout(n,i);t.addEventListener(function(){clearTimeout(o),r(ye.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function xy(t){if(!(t instanceof zt)||!t.customData)return!1;var e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}var Dy=function(){function t(){this.listeners=[]}return t.prototype.addEventListener=function(e){this.listeners.push(e)},t.prototype.abort=function(){this.listeners.forEach(function(e){return e()})},t}();/**
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
 */function Ly(){return v(this,void 0,void 0,function(){var t;return g(this,function(e){switch(e.label){case 0:return $t()?[3,1]:(X.warn(ye.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),[2,!1]);case 1:return e.trys.push([1,3,,4]),[4,Wr()];case 2:return e.sent(),[3,4];case 3:return t=e.sent(),X.warn(ye.create("indexeddb-unavailable",{errorInfo:t}).message),[2,!1];case 4:return[2,!0]}})})}function Fy(t,e,n,r,i,o){return v(this,void 0,void 0,function(){var s,a,u,l,c,f,h;return g(this,function(d){switch(d.label){case 0:return s=Oy(t),s.then(function(p){n[p.measurementId]=p.appId,t.options.measurementId&&p.measurementId!==t.options.measurementId&&X.warn("The measurement ID in the local Firebase config ("+t.options.measurementId+")"+(" does not match the measurement ID fetched from the server ("+p.measurementId+").")+" To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.")}).catch(function(p){return X.error(p)}),e.push(s),a=Ly().then(function(p){if(p)return r.getId()}),[4,Promise.all([s,a])];case 1:return u=d.sent(),l=u[0],c=u[1],Iy()||yy(o,l.measurementId),i("js",new Date),f=(h={},h[fy]="firebase",h.update=!0,h),c!=null&&(f[cy]=c),i(ee.CONFIG,l.measurementId,f),[2,l.measurementId]}})})}/**
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
 */var qe={},ql=[],Kl={},Mr="dataLayer",zl="gtag",$l,Rn,Wo=!1;function Uy(t){if(Wo)throw ye.create("already-initialized");t.dataLayerName&&(Mr=t.dataLayerName),t.gtagName&&(zl=t.gtagName)}function By(){var t=[];if(Xo()&&t.push("This is a browser extension environment."),Jo()||t.push("Cookies are not available."),t.length>0){var e=t.map(function(r,i){return"("+(i+1)+") "+r}).join(" "),n=ye.create("invalid-analytics-context",{errorInfo:e});X.warn(n.message)}}function Wy(t,e){By();var n=t.options.appId;if(!n)throw ye.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)X.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest'+(" measurement ID for this Firebase app. Falling back to the measurement ID "+t.options.measurementId)+' provided in the "measurementId" field in the local Firebase config.');else throw ye.create("no-api-key");if(qe[n]!=null)throw ye.create("already-exists",{id:n});if(!Wo){by(Mr);var r=Cy(qe,ql,Kl,Mr,zl),i=r.wrappedGtag,o=r.gtagCore;Rn=i,$l=o,Wo=!0}qe[n]=Fy(t,ql,Kl,e,$l,Mr);var s={app:t,logEvent:function(a,u,l){py(Rn,qe[n],a,u,l).catch(function(c){return X.error(c)})},setCurrentScreen:function(a,u){vy(Rn,qe[n],a,u).catch(function(l){return X.error(l)})},setUserId:function(a,u){gy(Rn,qe[n],a,u).catch(function(l){return X.error(l)})},setUserProperties:function(a,u){_y(Rn,qe[n],a,u).catch(function(l){return X.error(l)})},setAnalyticsCollectionEnabled:function(a){my(qe[n],a).catch(function(u){return X.error(u)})},INTERNAL:{delete:function(){return delete qe[n],Promise.resolve()}}};return s}var jy="@firebase/analytics",Vy="0.6.18",Ql="analytics";function Hy(t){t.INTERNAL.registerComponent(new he(Ql,function(n){var r=n.getProvider("app").getImmediate(),i=n.getProvider("installations").getImmediate();return Wy(r,i)},"PUBLIC").setServiceProps({settings:Uy,EventName:Bo,isSupported:Gy})),t.INTERNAL.registerComponent(new he("analytics-internal",e,"PRIVATE")),t.registerVersion(jy,Vy);function e(n){try{var r=n.getProvider(Ql).getImmediate();return{logEvent:r.logEvent}}catch(i){throw ye.create("interop-component-reg-failed",{reason:i})}}}Hy(ae);function Gy(){return v(this,void 0,void 0,function(){var t;return g(this,function(e){switch(e.label){case 0:if(Xo())return[2,!1];if(!Jo())return[2,!1];if(!$t())return[2,!1];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Wr()];case 2:return t=e.sent(),[2,t];case 3:return e.sent(),[2,!1];case 4:return[2]}})})}/**
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
 */var qy=function(){function t(e,n,r,i){this.client=e,this.storage=n,this.storageCache=r,this.logger=i}return t.prototype.isCachedDataFresh=function(e,n){if(!n)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;var r=Date.now()-n,i=r<=e;return this.logger.debug("Config fetch cache check."+(" Cache age millis: "+r+".")+(" Cache max age millis (minimumFetchIntervalMillis setting): "+e+".")+(" Is cache hit: "+i+".")),i},t.prototype.fetch=function(e){return v(this,void 0,void 0,function(){var n,r,i,o,s;return g(this,function(a){switch(a.label){case 0:return[4,Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()])];case 1:return n=a.sent(),r=n[0],i=n[1],i&&this.isCachedDataFresh(e.cacheMaxAgeMillis,r)?[2,i]:(e.eTag=i&&i.eTag,[4,this.client.fetch(e)]);case 2:return o=a.sent(),s=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())],o.status===200&&s.push(this.storage.setLastSuccessfulFetchResponse(o)),[4,Promise.all(s)];case 3:return a.sent(),[2,o]}})})},t}();/**
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
 */var oe,Ky=(oe={},oe["registration-window"]="Undefined window object. This SDK only supports usage in a browser environment.",oe["registration-project-id"]="Undefined project identifier. Check Firebase app initialization.",oe["registration-api-key"]="Undefined API key. Check Firebase app initialization.",oe["registration-app-id"]="Undefined app identifier. Check Firebase app initialization.",oe["storage-open"]="Error thrown when opening storage. Original error: {$originalErrorMessage}.",oe["storage-get"]="Error thrown when reading from storage. Original error: {$originalErrorMessage}.",oe["storage-set"]="Error thrown when writing to storage. Original error: {$originalErrorMessage}.",oe["storage-delete"]="Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",oe["fetch-client-network"]="Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",oe["fetch-timeout"]='The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',oe["fetch-throttle"]='The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',oe["fetch-client-parse"]="Fetch client could not parse response. Original error: {$originalErrorMessage}.",oe["fetch-status"]="Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",oe),be=new It("remoteconfig","Remote Config",Ky);function zy(t,e){return t instanceof zt&&t.code.indexOf(e)!==-1}/**
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
 */function $y(t){return t===void 0&&(t=navigator),t.languages&&t.languages[0]||t.language}/**
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
 */var Qy=function(){function t(e,n,r,i,o,s){this.firebaseInstallations=e,this.sdkVersion=n,this.namespace=r,this.projectId=i,this.apiKey=o,this.appId=s}return t.prototype.fetch=function(e){return v(this,void 0,void 0,function(){var n,r,i,o,s,a,u,l,c,f,h,d,p,m,y,b,C,N,z;return g(this,function(L){switch(L.label){case 0:return[4,Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()])];case 1:n=L.sent(),r=n[0],i=n[1],o=window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com",s=o+"/v1/projects/"+this.projectId+"/namespaces/"+this.namespace+":fetch?key="+this.apiKey,a={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":e.eTag||"*"},u={sdk_version:this.sdkVersion,app_instance_id:r,app_instance_id_token:i,app_id:this.appId,language_code:$y()},l={method:"POST",headers:a,body:JSON.stringify(u)},c=fetch(s,l),f=new Promise(function(Te,it){e.signal.addEventListener(function(){var Ke=new Error("The operation was aborted.");Ke.name="AbortError",it(Ke)})}),L.label=2;case 2:return L.trys.push([2,5,,6]),[4,Promise.race([c,f])];case 3:return L.sent(),[4,c];case 4:return h=L.sent(),[3,6];case 5:throw d=L.sent(),p="fetch-client-network",d.name==="AbortError"&&(p="fetch-timeout"),be.create(p,{originalErrorMessage:d.message});case 6:if(m=h.status,y=h.headers.get("ETag")||void 0,h.status!==200)return[3,11];N=void 0,L.label=7;case 7:return L.trys.push([7,9,,10]),[4,h.json()];case 8:return N=L.sent(),[3,10];case 9:throw z=L.sent(),be.create("fetch-client-parse",{originalErrorMessage:z.message});case 10:b=N.entries,C=N.state,L.label=11;case 11:if(C==="INSTANCE_STATE_UNSPECIFIED"?m=500:C==="NO_CHANGE"?m=304:(C==="NO_TEMPLATE"||C==="EMPTY_CONFIG")&&(b={}),m!==304&&m!==200)throw be.create("fetch-status",{httpStatus:m});return[2,{status:m,eTag:y,config:b}]}})})},t}();/**
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
 */var Yy=function(){function t(){this.listeners=[]}return t.prototype.addEventListener=function(e){this.listeners.push(e)},t.prototype.abort=function(){this.listeners.forEach(function(e){return e()})},t}();/**
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
 */var Xy=!1,Jy="",Yl=0,Zy=["1","true","t","yes","y","on"],jo=function(){function t(e,n){n===void 0&&(n=Jy),this._source=e,this._value=n}return t.prototype.asString=function(){return this._value},t.prototype.asBoolean=function(){return this._source==="static"?Xy:Zy.indexOf(this._value.toLowerCase())>=0},t.prototype.asNumber=function(){if(this._source==="static")return Yl;var e=Number(this._value);return isNaN(e)&&(e=Yl),e},t.prototype.getSource=function(){return this._source},t}();/**
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
 */var eb=60*1e3,tb=12*60*60*1e3,nb=function(){function t(e,n,r,i,o){this.app=e,this._client=n,this._storageCache=r,this._storage=i,this._logger=o,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:eb,minimumFetchIntervalMillis:tb},this.defaultConfig={}}return t.prototype.setLogLevel=function(e){switch(e){case"debug":this._logger.logLevel=Ct.DEBUG;break;case"silent":this._logger.logLevel=Ct.SILENT;break;default:this._logger.logLevel=Ct.ERROR}},Object.defineProperty(t.prototype,"fetchTimeMillis",{get:function(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lastFetchStatus",{get:function(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"},enumerable:!1,configurable:!0}),t.prototype.activate=function(){return v(this,void 0,void 0,function(){var e,n,r;return g(this,function(i){switch(i.label){case 0:return[4,Promise.all([this._storage.getLastSuccessfulFetchResponse(),this._storage.getActiveConfigEtag()])];case 1:return e=i.sent(),n=e[0],r=e[1],!n||!n.config||!n.eTag||n.eTag===r?[2,!1]:[4,Promise.all([this._storageCache.setActiveConfig(n.config),this._storage.setActiveConfigEtag(n.eTag)])];case 2:return i.sent(),[2,!0]}})})},t.prototype.ensureInitialized=function(){var e=this;return this._initializePromise||(this._initializePromise=this._storageCache.loadFromStorage().then(function(){e._isInitializationComplete=!0})),this._initializePromise},t.prototype.fetch=function(){return v(this,void 0,void 0,function(){var e,n,r,i=this;return g(this,function(o){switch(o.label){case 0:e=new Yy,setTimeout(function(){return v(i,void 0,void 0,function(){return g(this,function(s){return e.abort(),[2]})})},this.settings.fetchTimeoutMillis),o.label=1;case 1:return o.trys.push([1,4,,6]),[4,this._client.fetch({cacheMaxAgeMillis:this.settings.minimumFetchIntervalMillis,signal:e})];case 2:return o.sent(),[4,this._storageCache.setLastFetchStatus("success")];case 3:return o.sent(),[3,6];case 4:return n=o.sent(),r=zy(n,"fetch-throttle")?"throttle":"failure",[4,this._storageCache.setLastFetchStatus(r)];case 5:throw o.sent(),n;case 6:return[2]}})})},t.prototype.fetchAndActivate=function(){return v(this,void 0,void 0,function(){return g(this,function(e){switch(e.label){case 0:return[4,this.fetch()];case 1:return e.sent(),[2,this.activate()]}})})},t.prototype.getAll=function(){var e=this;return rb(this._storageCache.getActiveConfig(),this.defaultConfig).reduce(function(n,r){return n[r]=e.getValue(r),n},{})},t.prototype.getBoolean=function(e){return this.getValue(e).asBoolean()},t.prototype.getNumber=function(e){return this.getValue(e).asNumber()},t.prototype.getString=function(e){return this.getValue(e).asString()},t.prototype.getValue=function(e){this._isInitializationComplete||this._logger.debug('A value was requested for key "'+e+'" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.');var n=this._storageCache.getActiveConfig();return n&&n[e]!==void 0?new jo("remote",n[e]):this.defaultConfig&&this.defaultConfig[e]!==void 0?new jo("default",String(this.defaultConfig[e])):(this._logger.debug('Returning static value for key "'+e+'". Define a default or remote value if this is unintentional.'),new jo("static"))},t}();function rb(t,e){return t===void 0&&(t={}),e===void 0&&(e={}),Object.keys(w(w({},t),e))}/**
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
 */function xr(t,e){var n=t.target.error||void 0;return be.create(e,{originalErrorMessage:n&&n.message})}var Et="app_namespace_store",ib="firebase_remote_config",ob=1;function sb(){return new Promise(function(t,e){var n=indexedDB.open(ib,ob);n.onerror=function(r){e(xr(r,"storage-open"))},n.onsuccess=function(r){t(r.target.result)},n.onupgradeneeded=function(r){var i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(Et,{keyPath:"compositeKey"})}}})}var ab=function(){function t(e,n,r,i){i===void 0&&(i=sb()),this.appId=e,this.appName=n,this.namespace=r,this.openDbPromise=i}return t.prototype.getLastFetchStatus=function(){return this.get("last_fetch_status")},t.prototype.setLastFetchStatus=function(e){return this.set("last_fetch_status",e)},t.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.get("last_successful_fetch_timestamp_millis")},t.prototype.setLastSuccessfulFetchTimestampMillis=function(e){return this.set("last_successful_fetch_timestamp_millis",e)},t.prototype.getLastSuccessfulFetchResponse=function(){return this.get("last_successful_fetch_response")},t.prototype.setLastSuccessfulFetchResponse=function(e){return this.set("last_successful_fetch_response",e)},t.prototype.getActiveConfig=function(){return this.get("active_config")},t.prototype.setActiveConfig=function(e){return this.set("active_config",e)},t.prototype.getActiveConfigEtag=function(){return this.get("active_config_etag")},t.prototype.setActiveConfigEtag=function(e){return this.set("active_config_etag",e)},t.prototype.getThrottleMetadata=function(){return this.get("throttle_metadata")},t.prototype.setThrottleMetadata=function(e){return this.set("throttle_metadata",e)},t.prototype.deleteThrottleMetadata=function(){return this.delete("throttle_metadata")},t.prototype.get=function(e){return v(this,void 0,void 0,function(){var n,r=this;return g(this,function(i){switch(i.label){case 0:return[4,this.openDbPromise];case 1:return n=i.sent(),[2,new Promise(function(o,s){var a=n.transaction([Et],"readonly"),u=a.objectStore(Et),l=r.createCompositeKey(e);try{var c=u.get(l);c.onerror=function(f){s(xr(f,"storage-get"))},c.onsuccess=function(f){var h=f.target.result;o(h?h.value:void 0)}}catch(f){s(be.create("storage-get",{originalErrorMessage:f&&f.message}))}})]}})})},t.prototype.set=function(e,n){return v(this,void 0,void 0,function(){var r,i=this;return g(this,function(o){switch(o.label){case 0:return[4,this.openDbPromise];case 1:return r=o.sent(),[2,new Promise(function(s,a){var u=r.transaction([Et],"readwrite"),l=u.objectStore(Et),c=i.createCompositeKey(e);try{var f=l.put({compositeKey:c,value:n});f.onerror=function(h){a(xr(h,"storage-set"))},f.onsuccess=function(){s()}}catch(h){a(be.create("storage-set",{originalErrorMessage:h&&h.message}))}})]}})})},t.prototype.delete=function(e){return v(this,void 0,void 0,function(){var n,r=this;return g(this,function(i){switch(i.label){case 0:return[4,this.openDbPromise];case 1:return n=i.sent(),[2,new Promise(function(o,s){var a=n.transaction([Et],"readwrite"),u=a.objectStore(Et),l=r.createCompositeKey(e);try{var c=u.delete(l);c.onerror=function(f){s(xr(f,"storage-delete"))},c.onsuccess=function(){o()}}catch(f){s(be.create("storage-delete",{originalErrorMessage:f&&f.message}))}})]}})})},t.prototype.createCompositeKey=function(e){return[this.appId,this.appName,this.namespace,e].join()},t}();/**
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
 */var ub=function(){function t(e){this.storage=e}return t.prototype.getLastFetchStatus=function(){return this.lastFetchStatus},t.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.lastSuccessfulFetchTimestampMillis},t.prototype.getActiveConfig=function(){return this.activeConfig},t.prototype.loadFromStorage=function(){return v(this,void 0,void 0,function(){var e,n,r,i,o,s;return g(this,function(a){switch(a.label){case 0:return e=this.storage.getLastFetchStatus(),n=this.storage.getLastSuccessfulFetchTimestampMillis(),r=this.storage.getActiveConfig(),[4,e];case 1:return i=a.sent(),i&&(this.lastFetchStatus=i),[4,n];case 2:return o=a.sent(),o&&(this.lastSuccessfulFetchTimestampMillis=o),[4,r];case 3:return s=a.sent(),s&&(this.activeConfig=s),[2]}})})},t.prototype.setLastFetchStatus=function(e){return this.lastFetchStatus=e,this.storage.setLastFetchStatus(e)},t.prototype.setLastSuccessfulFetchTimestampMillis=function(e){return this.lastSuccessfulFetchTimestampMillis=e,this.storage.setLastSuccessfulFetchTimestampMillis(e)},t.prototype.setActiveConfig=function(e){return this.activeConfig=e,this.storage.setActiveConfig(e)},t}();/**
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
 */function lb(t,e){return new Promise(function(n,r){var i=Math.max(e-Date.now(),0),o=setTimeout(n,i);t.addEventListener(function(){clearTimeout(o),r(be.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function cb(t){if(!(t instanceof zt)||!t.customData)return!1;var e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}var fb=function(){function t(e,n){this.client=e,this.storage=n}return t.prototype.fetch=function(e){return v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:return[4,this.storage.getThrottleMetadata()];case 1:return n=r.sent()||{backoffCount:0,throttleEndTimeMillis:Date.now()},[2,this.attemptFetch(e,n)]}})})},t.prototype.attemptFetch=function(e,n){var r=n.throttleEndTimeMillis,i=n.backoffCount;return v(this,void 0,void 0,function(){var o,s,a;return g(this,function(u){switch(u.label){case 0:return[4,lb(e.signal,r)];case 1:u.sent(),u.label=2;case 2:return u.trys.push([2,5,,7]),[4,this.client.fetch(e)];case 3:return o=u.sent(),[4,this.storage.deleteThrottleMetadata()];case 4:return u.sent(),[2,o];case 5:if(s=u.sent(),!cb(s))throw s;return a={throttleEndTimeMillis:Date.now()+jr(i),backoffCount:i+1},[4,this.storage.setThrottleMetadata(a)];case 6:return u.sent(),[2,this.attemptFetch(e,a)];case 7:return[2]}})})},t}(),Xl="@firebase/remote-config",hb="0.1.43";/**
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
 */function db(t){t.INTERNAL.registerComponent(new he("remoteConfig",e,"PUBLIC").setMultipleInstances(!0)),t.registerVersion(Xl,hb);function e(n,r){var i=r.instanceIdentifier,o=n.getProvider("app").getImmediate(),s=n.getProvider("installations").getImmediate();if(typeof window=="undefined")throw be.create("registration-window");var a=o.options,u=a.projectId,l=a.apiKey,c=a.appId;if(!u)throw be.create("registration-project-id");if(!l)throw be.create("registration-api-key");if(!c)throw be.create("registration-app-id");i=i||"firebase";var f=new ab(c,o.name,i),h=new ub(f),d=new Kt(Xl);d.logLevel=Ct.ERROR;var p=new Qy(s,t.SDK_VERSION,i,u,l,c),m=new fb(p,f),y=new qy(m,f,h,d),b=new nb(o,y,h,f,d);return b.ensureInitialized(),b}}db(ae);/**
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
 */var Ae,pb=(Ae={},Ae["already-activated"]="You are trying to activate AppCheck for FirebaseApp {$appName}, while it is already activated. AppCheck can only be activated once.",Ae["use-before-activation"]="AppCheck is being used before activate() is called for FirebaseApp {$appName}. Please make sure you call activate() before instantiating other Firebase services.",Ae["fetch-network-error"]="Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",Ae["fetch-parse-error"]="Fetch client could not parse response. Original error: {$originalErrorMessage}.",Ae["fetch-status-error"]="Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",Ae["storage-open"]="Error thrown when opening storage. Original error: {$originalErrorMessage}.",Ae["storage-get"]="Error thrown when reading from storage. Original error: {$originalErrorMessage}.",Ae["storage-set"]="Error thrown when writing to storage. Original error: {$originalErrorMessage}.",Ae["recaptcha-error"]="ReCAPTCHA error.",Ae),ce=new It("appCheck","AppCheck",pb);/**
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
 */var Jl=new Map,vb={activated:!1,tokenObservers:[]},gb={enabled:!1};function se(t){return Jl.get(t)||vb}function Fe(t,e){Jl.set(t,e)}function Vo(){return gb}/**
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
 */var Zl="https://content-firebaseappcheck.googleapis.com/v1beta",_b="exchangeRecaptchaToken",mb="exchangeDebugToken",ec={OFFSET_DURATION:5*60*1e3,RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3};/**
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
 */var yb=function(){function t(e,n,r,i,o){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=i,i>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}return t.prototype.start=function(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(function(){})},t.prototype.stop=function(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)},t.prototype.isRunning=function(){return!!this.pending},t.prototype.process=function(e){return v(this,void 0,void 0,function(){var n;return g(this,function(r){switch(r.label){case 0:this.stop(),r.label=1;case 1:return r.trys.push([1,6,,7]),this.pending=new $,[4,bb(this.getNextRun(e))];case 2:return r.sent(),this.pending.resolve(),[4,this.pending.promise];case 3:return r.sent(),this.pending=new $,[4,this.operation()];case 4:return r.sent(),this.pending.resolve(),[4,this.pending.promise];case 5:return r.sent(),this.process(!0).catch(function(){}),[3,7];case 6:return n=r.sent(),this.retryPolicy(n)?this.process(!1).catch(function(){}):this.stop(),[3,7];case 7:return[2]}})})},t.prototype.getNextRun=function(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();var n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n},t}();function bb(t){return new Promise(function(e){setTimeout(e,t)})}/**
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
 */function tc(){return self.grecaptcha}function nc(t){if(!se(t).activated)throw ce.create("use-before-activation",{appName:t.name})}function Tb(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=Math.random()*16|0,n=t==="x"?e:e&3|8;return n.toString(16)})}function wb(t){return zo.encodeString(JSON.stringify(t),!1)}/**
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
 */function rc(t,e){var n=t.url,r=t.body;return v(this,void 0,void 0,function(){var i,o,s,a,u,l,c,f,h,d;return g(this,function(p){switch(p.label){case 0:i={"Content-Type":"application/json"},o=e.getImmediate({optional:!0}),o&&(i["X-Firebase-Client"]=o.getPlatformInfoString()),s={method:"POST",body:JSON.stringify(r),headers:i},p.label=1;case 1:return p.trys.push([1,3,,4]),[4,fetch(n,s)];case 2:return a=p.sent(),[3,4];case 3:throw u=p.sent(),ce.create("fetch-network-error",{originalErrorMessage:u.message});case 4:if(a.status!==200)throw ce.create("fetch-status-error",{httpStatus:a.status});p.label=5;case 5:return p.trys.push([5,7,,8]),[4,a.json()];case 6:return l=p.sent(),[3,8];case 7:throw c=p.sent(),ce.create("fetch-parse-error",{originalErrorMessage:c.message});case 8:if(f=l.ttl.match(/^([\d.]+)(s)$/),!f||!f[2]||isNaN(Number(f[1])))throw ce.create("fetch-parse-error",{originalErrorMessage:"ttl field (timeToLive) is not in standard Protobuf Duration "+("format: "+l.ttl)});return h=Number(f[1])*1e3,d=Date.now(),[2,{token:l.attestationToken,expireTimeMillis:d+h,issuedAtTimeMillis:d}]}})})}function Eb(t,e){var n=t.options,r=n.projectId,i=n.appId,o=n.apiKey;return{url:Zl+"/projects/"+r+"/apps/"+i+":"+_b+"?key="+o,body:{recaptcha_token:e}}}function Cb(t,e){var n=t.options,r=n.projectId,i=n.appId,o=n.apiKey;return{url:Zl+"/projects/"+r+"/apps/"+i+":"+mb+"?key="+o,body:{debug_token:e}}}/**
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
 */var Ib="firebase-app-check-database",Sb=1,kn="firebase-app-check-store",ic="debug-token",Dr=null;function oc(){return Dr||(Dr=new Promise(function(t,e){try{var n=indexedDB.open(Ib,Sb);n.onsuccess=function(r){t(r.target.result)},n.onerror=function(r){var i;e(ce.create("storage-open",{originalErrorMessage:(i=r.target.error)===null||i===void 0?void 0:i.message}))},n.onupgradeneeded=function(r){var i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(kn,{keyPath:"compositeKey"})}}}catch(r){e(ce.create("storage-open",{originalErrorMessage:r.message}))}}),Dr)}function Rb(t){return ac(uc(t))}function kb(t,e){return sc(uc(t),e)}function Ab(t){return sc(ic,t)}function Pb(){return ac(ic)}function sc(t,e){return v(this,void 0,void 0,function(){var n,r,i,o;return g(this,function(s){switch(s.label){case 0:return[4,oc()];case 1:return n=s.sent(),r=n.transaction(kn,"readwrite"),i=r.objectStore(kn),o=i.put({compositeKey:t,value:e}),[2,new Promise(function(a,u){o.onsuccess=function(l){a()},r.onerror=function(l){var c;u(ce.create("storage-set",{originalErrorMessage:(c=l.target.error)===null||c===void 0?void 0:c.message}))}})]}})})}function ac(t){return v(this,void 0,void 0,function(){var e,n,r,i;return g(this,function(o){switch(o.label){case 0:return[4,oc()];case 1:return e=o.sent(),n=e.transaction(kn,"readonly"),r=n.objectStore(kn),i=r.get(t),[2,new Promise(function(s,a){i.onsuccess=function(u){var l=u.target.result;s(l?l.value:void 0)},n.onerror=function(u){var l;a(ce.create("storage-get",{originalErrorMessage:(l=u.target.error)===null||l===void 0?void 0:l.message}))}})]}})})}function uc(t){return t.options.appId+"-"+t.name}/**
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
 */var Lr=new Kt("@firebase/app-check");/**
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
 */function Nb(t){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:if(!$t())return[3,5];e=void 0,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,Rb(t)];case 2:return e=r.sent(),[3,4];case 3:return n=r.sent(),Lr.warn("Failed to read token from indexeddb. Error: "+n),[3,4];case 4:return[2,e];case 5:return[2,void 0]}})})}function lc(t,e){return $t()?kb(t,e).catch(function(n){Lr.warn("Failed to write token to indexeddb. Error: "+n)}):Promise.resolve()}function Ob(){return v(this,void 0,void 0,function(){var t,e;return g(this,function(n){switch(n.label){case 0:t=void 0,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,Pb()];case 2:return t=n.sent(),[3,4];case 3:return n.sent(),[3,4];case 4:return t?[2,t]:(e=Tb(),Ab(e).catch(function(r){return Lr.warn("Failed to persist debug token to indexeddb. Error: "+r)}),console.log("AppCheck debug token: "+e+". You will need to whitelist it in the Firebase console for it to work"),[2,e])}})})}/**
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
 */function Mb(){var t=Vo();return t.enabled}function xb(){return v(this,void 0,void 0,function(){var t;return g(this,function(e){if(t=Vo(),t.enabled&&t.token)return[2,t.token.promise];throw Error(`
            Can't get debug token in production mode.
        `)})})}function Db(){var t=Ic();if(!(typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)){var e=Vo();e.enabled=!0;var n=new $;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(Ob())}}/**
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
 */var Lb={error:"UNKNOWN_ERROR"};function Fr(t,e,n){return n===void 0&&(n=!1),v(this,void 0,void 0,function(){var r,i,o,s,a,u,l,c,f,h;return g(this,function(d){switch(d.label){case 0:return nc(t),r=se(t),i=r.token,o=void 0,i?[3,2]:[4,r.cachedTokenPromise];case 1:s=d.sent(),s&&An(s)&&(i=s,Fe(t,w(w({},r),{token:i})),fc(t,{token:i.token})),d.label=2;case 2:return!n&&i&&An(i)?[2,{token:i.token}]:Mb()?(u=rc,l=Cb,c=[t],[4,xb()]):[3,6];case 3:return[4,u.apply(void 0,[l.apply(void 0,c.concat([d.sent()])),e])];case 4:return a=d.sent(),[4,lc(t,a)];case 5:return d.sent(),Fe(t,w(w({},r),{token:a})),[2,{token:a.token}];case 6:return d.trys.push([6,8,,9]),[4,r.provider.getToken()];case 7:return i=d.sent(),[3,9];case 8:return f=d.sent(),Lr.error(f),o=f,[3,9];case 9:return i?[3,10]:(h=Ub(o),[3,12]);case 10:return h={token:i.token},Fe(t,w(w({},r),{token:i})),[4,lc(t,i)];case 11:d.sent(),d.label=12;case 12:return fc(t,h),[2,h]}})})}function cc(t,e,n,r,i){var o=se(t),s={next:r,error:i,type:n},a=w(w({},o),{tokenObservers:q(q([],o.tokenObservers),[s])});if(!a.tokenRefresher){var u=Fb(t,e);a.tokenRefresher=u}if(!a.tokenRefresher.isRunning()&&o.isTokenAutoRefreshEnabled&&a.tokenRefresher.start(),o.token&&An(o.token)){var l=o.token;Promise.resolve().then(function(){return r({token:l.token})}).catch(function(){})}else o.token==null&&o.cachedTokenPromise.then(function(c){c&&An(c)&&r({token:c.token})}).catch(function(){});Fe(t,a)}function Ho(t,e){var n=se(t),r=n.tokenObservers.filter(function(i){return i.next!==e});r.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),Fe(t,w(w({},n),{tokenObservers:r}))}function Fb(t,e){var n=this;return new yb(function(){return v(n,void 0,void 0,function(){var r,i;return g(this,function(o){switch(o.label){case 0:return r=se(t),r.token?[3,2]:[4,Fr(t,e)];case 1:return i=o.sent(),[3,4];case 2:return[4,Fr(t,e,!0)];case 3:i=o.sent(),o.label=4;case 4:if(i.error)throw i.error;return[2]}})})},function(){return!0},function(){var r=se(t);if(r.token){var i=r.token.issuedAtTimeMillis+(r.token.expireTimeMillis-r.token.issuedAtTimeMillis)*.5+5*60*1e3,o=r.token.expireTimeMillis-5*60*1e3;return i=Math.min(i,o),Math.max(0,i-Date.now())}else return 0},ec.RETRIAL_MIN_WAIT,ec.RETRIAL_MAX_WAIT)}function fc(t,e){for(var n=se(t).tokenObservers,r=0,i=n;r<i.length;r++){var o=i[r];try{o.type==="EXTERNAL"&&e.error!=null?o.error(e.error):o.next(e)}catch{}}}function An(t){return t.expireTimeMillis-Date.now()>0}function Ub(t){return{token:wb(Lb),error:t}}/**
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
 */var Bb="https://www.google.com/recaptcha/api.js";function Wb(t,e){var n=se(t),r=new $;Fe(t,w(w({},n),{reCAPTCHAState:{initialized:r}}));var i="fire_app_check_"+t.name,o=document.createElement("div");o.id=i,o.style.display="none",document.body.appendChild(o);var s=tc();return s?s.ready(function(){hc(t,e,s,i),r.resolve(s)}):Vb(function(){var a=tc();if(!a)throw new Error("no recaptcha");a.ready(function(){hc(t,e,a,i),r.resolve(a)})}),r.promise}function jb(t){return v(this,void 0,void 0,function(){var e,n;return g(this,function(r){switch(r.label){case 0:return nc(t),e=se(t).reCAPTCHAState,[4,e.initialized.promise];case 1:return n=r.sent(),[2,new Promise(function(i,o){var s=se(t).reCAPTCHAState;n.ready(function(){i(n.execute(s.widgetId,{action:"fire_app_check"}))})})]}})})}function hc(t,e,n,r){var i=n.render(r,{sitekey:e,size:"invisible"}),o=se(t);Fe(t,w(w({},o),{reCAPTCHAState:w(w({},o.reCAPTCHAState),{widgetId:i})}))}function Vb(t){var e=document.createElement("script");e.src=""+Bb,e.onload=t,document.head.appendChild(e)}/**
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
 */var Go=function(){function t(e){this._siteKey=e}return t.prototype.getToken=function(){return v(this,void 0,void 0,function(){var e;return g(this,function(n){switch(n.label){case 0:if(!this._app||!this._platformLoggerProvider)throw ce.create("use-before-activation",{appName:""});n.label=1;case 1:return n.trys.push([1,3,,4]),[4,jb(this._app)];case 2:return e=n.sent(),[3,4];case 3:throw n.sent(),ce.create("recaptcha-error");case 4:return[2,rc(Eb(this._app,e),this._platformLoggerProvider)]}})})},t.prototype.initialize=function(e,n){this._app=e,this._platformLoggerProvider=n,Wb(e,this._siteKey).catch(function(){})},t}(),qo=function(){function t(e){this._customProviderOptions=e}return t.prototype.getToken=function(){return v(this,void 0,void 0,function(){var e,n,r;return g(this,function(i){switch(i.label){case 0:if(!this._app)throw ce.create("use-before-activation",{appName:""});return[4,this._customProviderOptions.getToken()];case 1:return e=i.sent(),n=Sc(e.token),r=n!==null&&n<Date.now()&&n>0?n*1e3:Date.now(),[2,w(w({},e),{issuedAtTimeMillis:r})]}})})},t.prototype.initialize=function(e){this._app=e},t}();/**
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
 */function Hb(t,e,n,r){var i=se(t);if(i.activated)throw ce.create("already-activated",{appName:t.name});var o=w(w({},i),{activated:!0});o.cachedTokenPromise=Nb(t).then(function(s){return s&&An(s)&&Fe(t,w(w({},se(t)),{token:s})),s}),typeof e=="string"?o.provider=new Go(e):e instanceof Go||e instanceof qo?o.provider=e:o.provider=new qo({getToken:e.getToken}),o.isTokenAutoRefreshEnabled=r===void 0?t.automaticDataCollectionEnabled:r,Fe(t,o),o.provider.initialize(t,n)}function Gb(t,e){var n=se(t);n.tokenRefresher&&(e===!0?n.tokenRefresher.start():n.tokenRefresher.stop()),Fe(t,w(w({},n),{isTokenAutoRefreshEnabled:e}))}function qb(t,e,n){return v(this,void 0,void 0,function(){var r;return g(this,function(i){switch(i.label){case 0:return[4,Fr(t,e,n)];case 1:if(r=i.sent(),r.error)throw r.error;return[2,{token:r.token}]}})})}function Kb(t,e,n,r,i){var o=function(){},s=function(){};return n.next!=null?o=n.next.bind(n):o=n,n.error!=null?s=n.error.bind(n):r&&(s=r),cc(t,e,"EXTERNAL",o,s),function(){return Ho(t,o)}}/**
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
 */function zb(t,e){return{app:t,activate:function(n,r){return Hb(t,n,e,r)},setTokenAutoRefreshEnabled:function(n){return Gb(t,n)},getToken:function(n){return qb(t,e,n)},onTokenChanged:function(n,r,i){return Kb(t,e,n,r)},INTERNAL:{delete:function(){for(var n=se(t).tokenObservers,r=0,i=n;r<i.length;r++){var o=i[r];Ho(t,o.next)}return Promise.resolve()}}}}function $b(t,e){return{getToken:function(n){return Fr(t,e,n)},addTokenListener:function(n){return cc(t,e,"INTERNAL",n)},removeTokenListener:function(n){return Ho(t,n)}}}var Qb="@firebase/app-check",Yb="0.3.2";/**
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
 */var Xb="appCheck",dc="app-check-internal";function Jb(t){t.INTERNAL.registerComponent(new he(Xb,function(e){var n=e.getProvider("app").getImmediate(),r=e.getProvider("platform-logger");return zb(n,r)},"PUBLIC").setServiceProps({ReCaptchaV3Provider:Go,CustomProvider:qo}).setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(function(e,n,r){var i=e.getProvider(dc);i.initialize()})),t.INTERNAL.registerComponent(new he(dc,function(e){var n=e.getProvider("app").getImmediate(),r=e.getProvider("platform-logger");return $b(n,r)},"PUBLIC").setInstantiationMode("EXPLICIT")),t.registerVersion(Qb,Yb)}Jb(ae);Db();var Zb="firebase",pc="8.10.0";/**
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
 */ae.registerVersion(Zb,pc,"app");ae.SDK_VERSION=pc;var eT="firebase",tT="8.10.0";/**
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
`);ae.registerVersion(eT,tT);export{aT as default};
