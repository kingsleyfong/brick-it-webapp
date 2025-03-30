function Zv(n,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in n)){const o=Object.getOwnPropertyDescriptor(i,r);o&&Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();function qm(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ym={exports:{}},kl={},Zm={exports:{}},He={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ks=Symbol.for("react.element"),Kv=Symbol.for("react.portal"),Jv=Symbol.for("react.fragment"),Qv=Symbol.for("react.strict_mode"),ex=Symbol.for("react.profiler"),tx=Symbol.for("react.provider"),nx=Symbol.for("react.context"),ix=Symbol.for("react.forward_ref"),rx=Symbol.for("react.suspense"),ox=Symbol.for("react.memo"),sx=Symbol.for("react.lazy"),Hf=Symbol.iterator;function ax(n){return n===null||typeof n!="object"?null:(n=Hf&&n[Hf]||n["@@iterator"],typeof n=="function"?n:null)}var Km={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Jm=Object.assign,Qm={};function Vo(n,e,t){this.props=n,this.context=e,this.refs=Qm,this.updater=t||Km}Vo.prototype.isReactComponent={};Vo.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};Vo.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function eg(){}eg.prototype=Vo.prototype;function Dd(n,e,t){this.props=n,this.context=e,this.refs=Qm,this.updater=t||Km}var Nd=Dd.prototype=new eg;Nd.constructor=Dd;Jm(Nd,Vo.prototype);Nd.isPureReactComponent=!0;var Wf=Array.isArray,tg=Object.prototype.hasOwnProperty,Id={current:null},ng={key:!0,ref:!0,__self:!0,__source:!0};function ig(n,e,t){var i,r={},o=null,s=null;if(e!=null)for(i in e.ref!==void 0&&(s=e.ref),e.key!==void 0&&(o=""+e.key),e)tg.call(e,i)&&!ng.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var c=Array(a),l=0;l<a;l++)c[l]=arguments[l+2];r.children=c}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Ks,type:n,key:o,ref:s,props:r,_owner:Id.current}}function lx(n,e){return{$$typeof:Ks,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function Ud(n){return typeof n=="object"&&n!==null&&n.$$typeof===Ks}function cx(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var jf=/\/+/g;function cc(n,e){return typeof n=="object"&&n!==null&&n.key!=null?cx(""+n.key):e.toString(36)}function Xa(n,e,t,i,r){var o=typeof n;(o==="undefined"||o==="boolean")&&(n=null);var s=!1;if(n===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(n.$$typeof){case Ks:case Kv:s=!0}}if(s)return s=n,r=r(s),n=i===""?"."+cc(s,0):i,Wf(r)?(t="",n!=null&&(t=n.replace(jf,"$&/")+"/"),Xa(r,e,t,"",function(l){return l})):r!=null&&(Ud(r)&&(r=lx(r,t+(!r.key||s&&s.key===r.key?"":(""+r.key).replace(jf,"$&/")+"/")+n)),e.push(r)),1;if(s=0,i=i===""?".":i+":",Wf(n))for(var a=0;a<n.length;a++){o=n[a];var c=i+cc(o,a);s+=Xa(o,e,t,c,r)}else if(c=ax(n),typeof c=="function")for(n=c.call(n),a=0;!(o=n.next()).done;)o=o.value,c=i+cc(o,a++),s+=Xa(o,e,t,c,r);else if(o==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return s}function ia(n,e,t){if(n==null)return n;var i=[],r=0;return Xa(n,i,"","",function(o){return e.call(t,o,r++)}),i}function ux(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var Qt={current:null},$a={transition:null},dx={ReactCurrentDispatcher:Qt,ReactCurrentBatchConfig:$a,ReactCurrentOwner:Id};function rg(){throw Error("act(...) is not supported in production builds of React.")}He.Children={map:ia,forEach:function(n,e,t){ia(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return ia(n,function(){e++}),e},toArray:function(n){return ia(n,function(e){return e})||[]},only:function(n){if(!Ud(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};He.Component=Vo;He.Fragment=Jv;He.Profiler=ex;He.PureComponent=Dd;He.StrictMode=Qv;He.Suspense=rx;He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=dx;He.act=rg;He.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=Jm({},n.props),r=n.key,o=n.ref,s=n._owner;if(e!=null){if(e.ref!==void 0&&(o=e.ref,s=Id.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(c in e)tg.call(e,c)&&!ng.hasOwnProperty(c)&&(i[c]=e[c]===void 0&&a!==void 0?a[c]:e[c])}var c=arguments.length-2;if(c===1)i.children=t;else if(1<c){a=Array(c);for(var l=0;l<c;l++)a[l]=arguments[l+2];i.children=a}return{$$typeof:Ks,type:n.type,key:r,ref:o,props:i,_owner:s}};He.createContext=function(n){return n={$$typeof:nx,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:tx,_context:n},n.Consumer=n};He.createElement=ig;He.createFactory=function(n){var e=ig.bind(null,n);return e.type=n,e};He.createRef=function(){return{current:null}};He.forwardRef=function(n){return{$$typeof:ix,render:n}};He.isValidElement=Ud;He.lazy=function(n){return{$$typeof:sx,_payload:{_status:-1,_result:n},_init:ux}};He.memo=function(n,e){return{$$typeof:ox,type:n,compare:e===void 0?null:e}};He.startTransition=function(n){var e=$a.transition;$a.transition={};try{n()}finally{$a.transition=e}};He.unstable_act=rg;He.useCallback=function(n,e){return Qt.current.useCallback(n,e)};He.useContext=function(n){return Qt.current.useContext(n)};He.useDebugValue=function(){};He.useDeferredValue=function(n){return Qt.current.useDeferredValue(n)};He.useEffect=function(n,e){return Qt.current.useEffect(n,e)};He.useId=function(){return Qt.current.useId()};He.useImperativeHandle=function(n,e,t){return Qt.current.useImperativeHandle(n,e,t)};He.useInsertionEffect=function(n,e){return Qt.current.useInsertionEffect(n,e)};He.useLayoutEffect=function(n,e){return Qt.current.useLayoutEffect(n,e)};He.useMemo=function(n,e){return Qt.current.useMemo(n,e)};He.useReducer=function(n,e,t){return Qt.current.useReducer(n,e,t)};He.useRef=function(n){return Qt.current.useRef(n)};He.useState=function(n){return Qt.current.useState(n)};He.useSyncExternalStore=function(n,e,t){return Qt.current.useSyncExternalStore(n,e,t)};He.useTransition=function(){return Qt.current.useTransition()};He.version="18.3.1";Zm.exports=He;var z=Zm.exports;const Zn=qm(z),fx=Zv({__proto__:null,default:Zn},[z]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hx=z,px=Symbol.for("react.element"),mx=Symbol.for("react.fragment"),gx=Object.prototype.hasOwnProperty,vx=hx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,xx={key:!0,ref:!0,__self:!0,__source:!0};function og(n,e,t){var i,r={},o=null,s=null;t!==void 0&&(o=""+t),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(s=e.ref);for(i in e)gx.call(e,i)&&!xx.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:px,type:n,key:o,ref:s,props:r,_owner:vx.current}}kl.Fragment=mx;kl.jsx=og;kl.jsxs=og;Ym.exports=kl;var kd=Ym.exports;const As=kd.Fragment,C=kd.jsx,X=kd.jsxs;var xu={},sg={exports:{}},Mn={},ag={exports:{}},lg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(U,H){var G=U.length;U.push(H);e:for(;0<G;){var de=G-1>>>1,ie=U[de];if(0<r(ie,H))U[de]=H,U[G]=ie,G=de;else break e}}function t(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var H=U[0],G=U.pop();if(G!==H){U[0]=G;e:for(var de=0,ie=U.length,q=ie>>>1;de<q;){var Q=2*(de+1)-1,he=U[Q],pe=Q+1,j=U[pe];if(0>r(he,G))pe<ie&&0>r(j,he)?(U[de]=j,U[pe]=G,de=pe):(U[de]=he,U[Q]=G,de=Q);else if(pe<ie&&0>r(j,G))U[de]=j,U[pe]=G,de=pe;else break e}}return H}function r(U,H){var G=U.sortIndex-H.sortIndex;return G!==0?G:U.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;n.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();n.unstable_now=function(){return s.now()-a}}var c=[],l=[],u=1,f=null,h=3,p=!1,_=!1,x=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(U){for(var H=t(l);H!==null;){if(H.callback===null)i(l);else if(H.startTime<=U)i(l),H.sortIndex=H.expirationTime,e(c,H);else break;H=t(l)}}function y(U){if(x=!1,g(U),!_)if(t(c)!==null)_=!0,$(M);else{var H=t(l);H!==null&&K(y,H.startTime-U)}}function M(U,H){_=!1,x&&(x=!1,d(T),T=-1),p=!0;var G=h;try{for(g(H),f=t(c);f!==null&&(!(f.expirationTime>H)||U&&!V());){var de=f.callback;if(typeof de=="function"){f.callback=null,h=f.priorityLevel;var ie=de(f.expirationTime<=H);H=n.unstable_now(),typeof ie=="function"?f.callback=ie:f===t(c)&&i(c),g(H)}else i(c);f=t(c)}if(f!==null)var q=!0;else{var Q=t(l);Q!==null&&K(y,Q.startTime-H),q=!1}return q}finally{f=null,h=G,p=!1}}var E=!1,P=null,T=-1,S=5,w=-1;function V(){return!(n.unstable_now()-w<S)}function k(){if(P!==null){var U=n.unstable_now();w=U;var H=!0;try{H=P(!0,U)}finally{H?R():(E=!1,P=null)}}else E=!1}var R;if(typeof v=="function")R=function(){v(k)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,F=D.port2;D.port1.onmessage=k,R=function(){F.postMessage(null)}}else R=function(){m(k,0)};function $(U){P=U,E||(E=!0,R())}function K(U,H){T=m(function(){U(n.unstable_now())},H)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(U){U.callback=null},n.unstable_continueExecution=function(){_||p||(_=!0,$(M))},n.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<U?Math.floor(1e3/U):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return t(c)},n.unstable_next=function(U){switch(h){case 1:case 2:case 3:var H=3;break;default:H=h}var G=h;h=H;try{return U()}finally{h=G}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(U,H){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var G=h;h=U;try{return H()}finally{h=G}},n.unstable_scheduleCallback=function(U,H,G){var de=n.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?de+G:de):G=de,U){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=G+ie,U={id:u++,callback:H,priorityLevel:U,startTime:G,expirationTime:ie,sortIndex:-1},G>de?(U.sortIndex=G,e(l,U),t(c)===null&&U===t(l)&&(x?(d(T),T=-1):x=!0,K(y,G-de))):(U.sortIndex=ie,e(c,U),_||p||(_=!0,$(M))),U},n.unstable_shouldYield=V,n.unstable_wrapCallback=function(U){var H=h;return function(){var G=h;h=H;try{return U.apply(this,arguments)}finally{h=G}}}})(lg);ag.exports=lg;var _x=ag.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yx=z,Sn=_x;function ue(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var cg=new Set,Ps={};function Or(n,e){Lo(n,e),Lo(n+"Capture",e)}function Lo(n,e){for(Ps[n]=e,n=0;n<e.length;n++)cg.add(e[n])}var yi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_u=Object.prototype.hasOwnProperty,Sx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xf={},$f={};function Mx(n){return _u.call($f,n)?!0:_u.call(Xf,n)?!1:Sx.test(n)?$f[n]=!0:(Xf[n]=!0,!1)}function wx(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Ex(n,e,t,i){if(e===null||typeof e>"u"||wx(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function en(n,e,t,i,r,o,s){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=o,this.removeEmptyString=s}var kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){kt[n]=new en(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];kt[e]=new en(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){kt[n]=new en(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){kt[n]=new en(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){kt[n]=new en(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){kt[n]=new en(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){kt[n]=new en(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){kt[n]=new en(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){kt[n]=new en(n,5,!1,n.toLowerCase(),null,!1,!1)});var Od=/[\-:]([a-z])/g;function zd(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(Od,zd);kt[e]=new en(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(Od,zd);kt[e]=new en(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(Od,zd);kt[e]=new en(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){kt[n]=new en(n,1,!1,n.toLowerCase(),null,!1,!1)});kt.xlinkHref=new en("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){kt[n]=new en(n,1,!1,n.toLowerCase(),null,!0,!0)});function Fd(n,e,t,i){var r=kt.hasOwnProperty(e)?kt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Ex(e,t,r,i)&&(t=null),i||r===null?Mx(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var Ei=yx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ra=Symbol.for("react.element"),ao=Symbol.for("react.portal"),lo=Symbol.for("react.fragment"),Bd=Symbol.for("react.strict_mode"),yu=Symbol.for("react.profiler"),ug=Symbol.for("react.provider"),dg=Symbol.for("react.context"),Gd=Symbol.for("react.forward_ref"),Su=Symbol.for("react.suspense"),Mu=Symbol.for("react.suspense_list"),Vd=Symbol.for("react.memo"),Di=Symbol.for("react.lazy"),fg=Symbol.for("react.offscreen"),qf=Symbol.iterator;function Qo(n){return n===null||typeof n!="object"?null:(n=qf&&n[qf]||n["@@iterator"],typeof n=="function"?n:null)}var pt=Object.assign,uc;function hs(n){if(uc===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);uc=e&&e[1]||""}return`
`+uc+n}var dc=!1;function fc(n,e){if(!n||dc)return"";dc=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(l){var i=l}Reflect.construct(n,[],e)}else{try{e.call()}catch(l){i=l}n.call(e.prototype)}else{try{throw Error()}catch(l){i=l}n()}}catch(l){if(l&&i&&typeof l.stack=="string"){for(var r=l.stack.split(`
`),o=i.stack.split(`
`),s=r.length-1,a=o.length-1;1<=s&&0<=a&&r[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(r[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||r[s]!==o[a]){var c=`
`+r[s].replace(" at new "," at ");return n.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",n.displayName)),c}while(1<=s&&0<=a);break}}}finally{dc=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?hs(n):""}function bx(n){switch(n.tag){case 5:return hs(n.type);case 16:return hs("Lazy");case 13:return hs("Suspense");case 19:return hs("SuspenseList");case 0:case 2:case 15:return n=fc(n.type,!1),n;case 11:return n=fc(n.type.render,!1),n;case 1:return n=fc(n.type,!0),n;default:return""}}function wu(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case lo:return"Fragment";case ao:return"Portal";case yu:return"Profiler";case Bd:return"StrictMode";case Su:return"Suspense";case Mu:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case dg:return(n.displayName||"Context")+".Consumer";case ug:return(n._context.displayName||"Context")+".Provider";case Gd:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Vd:return e=n.displayName||null,e!==null?e:wu(n.type)||"Memo";case Di:e=n._payload,n=n._init;try{return wu(n(e))}catch{}}return null}function Cx(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wu(e);case 8:return e===Bd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Zi(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function hg(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Tx(n){var e=hg(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,o=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(s){i=""+s,o.call(this,s)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(s){i=""+s},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function oa(n){n._valueTracker||(n._valueTracker=Tx(n))}function pg(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=hg(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function cl(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Eu(n,e){var t=e.checked;return pt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Yf(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=Zi(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function mg(n,e){e=e.checked,e!=null&&Fd(n,"checked",e,!1)}function bu(n,e){mg(n,e);var t=Zi(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Cu(n,e.type,t):e.hasOwnProperty("defaultValue")&&Cu(n,e.type,Zi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function Zf(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Cu(n,e,t){(e!=="number"||cl(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var ps=Array.isArray;function So(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+Zi(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function Tu(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ue(91));return pt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Kf(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(ue(92));if(ps(t)){if(1<t.length)throw Error(ue(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:Zi(t)}}function gg(n,e){var t=Zi(e.value),i=Zi(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Jf(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function vg(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Au(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?vg(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var sa,xg=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(sa=sa||document.createElement("div"),sa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=sa.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Ls(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var _s={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ax=["Webkit","ms","Moz","O"];Object.keys(_s).forEach(function(n){Ax.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),_s[e]=_s[n]})});function _g(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||_s.hasOwnProperty(n)&&_s[n]?(""+e).trim():e+"px"}function yg(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=_g(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var Px=pt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pu(n,e){if(e){if(Px[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ue(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ue(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ue(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ue(62))}}function Lu(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ru=null;function Hd(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Du=null,Mo=null,wo=null;function Qf(n){if(n=ea(n)){if(typeof Du!="function")throw Error(ue(280));var e=n.stateNode;e&&(e=Gl(e),Du(n.stateNode,n.type,e))}}function Sg(n){Mo?wo?wo.push(n):wo=[n]:Mo=n}function Mg(){if(Mo){var n=Mo,e=wo;if(wo=Mo=null,Qf(n),e)for(n=0;n<e.length;n++)Qf(e[n])}}function wg(n,e){return n(e)}function Eg(){}var hc=!1;function bg(n,e,t){if(hc)return n(e,t);hc=!0;try{return wg(n,e,t)}finally{hc=!1,(Mo!==null||wo!==null)&&(Eg(),Mg())}}function Rs(n,e){var t=n.stateNode;if(t===null)return null;var i=Gl(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(ue(231,e,typeof t));return t}var Nu=!1;if(yi)try{var es={};Object.defineProperty(es,"passive",{get:function(){Nu=!0}}),window.addEventListener("test",es,es),window.removeEventListener("test",es,es)}catch{Nu=!1}function Lx(n,e,t,i,r,o,s,a,c){var l=Array.prototype.slice.call(arguments,3);try{e.apply(t,l)}catch(u){this.onError(u)}}var ys=!1,ul=null,dl=!1,Iu=null,Rx={onError:function(n){ys=!0,ul=n}};function Dx(n,e,t,i,r,o,s,a,c){ys=!1,ul=null,Lx.apply(Rx,arguments)}function Nx(n,e,t,i,r,o,s,a,c){if(Dx.apply(this,arguments),ys){if(ys){var l=ul;ys=!1,ul=null}else throw Error(ue(198));dl||(dl=!0,Iu=l)}}function zr(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function Cg(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function eh(n){if(zr(n)!==n)throw Error(ue(188))}function Ix(n){var e=n.alternate;if(!e){if(e=zr(n),e===null)throw Error(ue(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var o=r.alternate;if(o===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===o.child){for(o=r.child;o;){if(o===t)return eh(r),n;if(o===i)return eh(r),e;o=o.sibling}throw Error(ue(188))}if(t.return!==i.return)t=r,i=o;else{for(var s=!1,a=r.child;a;){if(a===t){s=!0,t=r,i=o;break}if(a===i){s=!0,i=r,t=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===t){s=!0,t=o,i=r;break}if(a===i){s=!0,i=o,t=r;break}a=a.sibling}if(!s)throw Error(ue(189))}}if(t.alternate!==i)throw Error(ue(190))}if(t.tag!==3)throw Error(ue(188));return t.stateNode.current===t?n:e}function Tg(n){return n=Ix(n),n!==null?Ag(n):null}function Ag(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Ag(n);if(e!==null)return e;n=n.sibling}return null}var Pg=Sn.unstable_scheduleCallback,th=Sn.unstable_cancelCallback,Ux=Sn.unstable_shouldYield,kx=Sn.unstable_requestPaint,xt=Sn.unstable_now,Ox=Sn.unstable_getCurrentPriorityLevel,Wd=Sn.unstable_ImmediatePriority,Lg=Sn.unstable_UserBlockingPriority,fl=Sn.unstable_NormalPriority,zx=Sn.unstable_LowPriority,Rg=Sn.unstable_IdlePriority,Ol=null,ni=null;function Fx(n){if(ni&&typeof ni.onCommitFiberRoot=="function")try{ni.onCommitFiberRoot(Ol,n,void 0,(n.current.flags&128)===128)}catch{}}var jn=Math.clz32?Math.clz32:Vx,Bx=Math.log,Gx=Math.LN2;function Vx(n){return n>>>=0,n===0?32:31-(Bx(n)/Gx|0)|0}var aa=64,la=4194304;function ms(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function hl(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,o=n.pingedLanes,s=t&268435455;if(s!==0){var a=s&~r;a!==0?i=ms(a):(o&=s,o!==0&&(i=ms(o)))}else s=t&~r,s!==0?i=ms(s):o!==0&&(i=ms(o));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,o=e&-e,r>=o||r===16&&(o&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-jn(e),r=1<<t,i|=n[t],e&=~r;return i}function Hx(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Wx(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,o=n.pendingLanes;0<o;){var s=31-jn(o),a=1<<s,c=r[s];c===-1?(!(a&t)||a&i)&&(r[s]=Hx(a,e)):c<=e&&(n.expiredLanes|=a),o&=~a}}function Uu(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Dg(){var n=aa;return aa<<=1,!(aa&4194240)&&(aa=64),n}function pc(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function Js(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-jn(e),n[e]=t}function jx(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-jn(t),o=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~o}}function jd(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-jn(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var Qe=0;function Ng(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var Ig,Xd,Ug,kg,Og,ku=!1,ca=[],Bi=null,Gi=null,Vi=null,Ds=new Map,Ns=new Map,Ui=[],Xx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function nh(n,e){switch(n){case"focusin":case"focusout":Bi=null;break;case"dragenter":case"dragleave":Gi=null;break;case"mouseover":case"mouseout":Vi=null;break;case"pointerover":case"pointerout":Ds.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ns.delete(e.pointerId)}}function ts(n,e,t,i,r,o){return n===null||n.nativeEvent!==o?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:o,targetContainers:[r]},e!==null&&(e=ea(e),e!==null&&Xd(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function $x(n,e,t,i,r){switch(e){case"focusin":return Bi=ts(Bi,n,e,t,i,r),!0;case"dragenter":return Gi=ts(Gi,n,e,t,i,r),!0;case"mouseover":return Vi=ts(Vi,n,e,t,i,r),!0;case"pointerover":var o=r.pointerId;return Ds.set(o,ts(Ds.get(o)||null,n,e,t,i,r)),!0;case"gotpointercapture":return o=r.pointerId,Ns.set(o,ts(Ns.get(o)||null,n,e,t,i,r)),!0}return!1}function zg(n){var e=vr(n.target);if(e!==null){var t=zr(e);if(t!==null){if(e=t.tag,e===13){if(e=Cg(t),e!==null){n.blockedOn=e,Og(n.priority,function(){Ug(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function qa(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Ou(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);Ru=i,t.target.dispatchEvent(i),Ru=null}else return e=ea(t),e!==null&&Xd(e),n.blockedOn=t,!1;e.shift()}return!0}function ih(n,e,t){qa(n)&&t.delete(e)}function qx(){ku=!1,Bi!==null&&qa(Bi)&&(Bi=null),Gi!==null&&qa(Gi)&&(Gi=null),Vi!==null&&qa(Vi)&&(Vi=null),Ds.forEach(ih),Ns.forEach(ih)}function ns(n,e){n.blockedOn===e&&(n.blockedOn=null,ku||(ku=!0,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,qx)))}function Is(n){function e(r){return ns(r,n)}if(0<ca.length){ns(ca[0],n);for(var t=1;t<ca.length;t++){var i=ca[t];i.blockedOn===n&&(i.blockedOn=null)}}for(Bi!==null&&ns(Bi,n),Gi!==null&&ns(Gi,n),Vi!==null&&ns(Vi,n),Ds.forEach(e),Ns.forEach(e),t=0;t<Ui.length;t++)i=Ui[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<Ui.length&&(t=Ui[0],t.blockedOn===null);)zg(t),t.blockedOn===null&&Ui.shift()}var Eo=Ei.ReactCurrentBatchConfig,pl=!0;function Yx(n,e,t,i){var r=Qe,o=Eo.transition;Eo.transition=null;try{Qe=1,$d(n,e,t,i)}finally{Qe=r,Eo.transition=o}}function Zx(n,e,t,i){var r=Qe,o=Eo.transition;Eo.transition=null;try{Qe=4,$d(n,e,t,i)}finally{Qe=r,Eo.transition=o}}function $d(n,e,t,i){if(pl){var r=Ou(n,e,t,i);if(r===null)Ec(n,e,i,ml,t),nh(n,i);else if($x(r,n,e,t,i))i.stopPropagation();else if(nh(n,i),e&4&&-1<Xx.indexOf(n)){for(;r!==null;){var o=ea(r);if(o!==null&&Ig(o),o=Ou(n,e,t,i),o===null&&Ec(n,e,i,ml,t),o===r)break;r=o}r!==null&&i.stopPropagation()}else Ec(n,e,i,null,t)}}var ml=null;function Ou(n,e,t,i){if(ml=null,n=Hd(i),n=vr(n),n!==null)if(e=zr(n),e===null)n=null;else if(t=e.tag,t===13){if(n=Cg(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return ml=n,null}function Fg(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ox()){case Wd:return 1;case Lg:return 4;case fl:case zx:return 16;case Rg:return 536870912;default:return 16}default:return 16}}var Oi=null,qd=null,Ya=null;function Bg(){if(Ya)return Ya;var n,e=qd,t=e.length,i,r="value"in Oi?Oi.value:Oi.textContent,o=r.length;for(n=0;n<t&&e[n]===r[n];n++);var s=t-n;for(i=1;i<=s&&e[t-i]===r[o-i];i++);return Ya=r.slice(n,1<i?1-i:void 0)}function Za(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function ua(){return!0}function rh(){return!1}function wn(n){function e(t,i,r,o,s){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?ua:rh,this.isPropagationStopped=rh,this}return pt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=ua)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=ua)},persist:function(){},isPersistent:ua}),e}var Ho={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yd=wn(Ho),Qs=pt({},Ho,{view:0,detail:0}),Kx=wn(Qs),mc,gc,is,zl=pt({},Qs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zd,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==is&&(is&&n.type==="mousemove"?(mc=n.screenX-is.screenX,gc=n.screenY-is.screenY):gc=mc=0,is=n),mc)},movementY:function(n){return"movementY"in n?n.movementY:gc}}),oh=wn(zl),Jx=pt({},zl,{dataTransfer:0}),Qx=wn(Jx),e_=pt({},Qs,{relatedTarget:0}),vc=wn(e_),t_=pt({},Ho,{animationName:0,elapsedTime:0,pseudoElement:0}),n_=wn(t_),i_=pt({},Ho,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),r_=wn(i_),o_=pt({},Ho,{data:0}),sh=wn(o_),s_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},a_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},l_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function c_(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=l_[n])?!!e[n]:!1}function Zd(){return c_}var u_=pt({},Qs,{key:function(n){if(n.key){var e=s_[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Za(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?a_[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zd,charCode:function(n){return n.type==="keypress"?Za(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Za(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),d_=wn(u_),f_=pt({},zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ah=wn(f_),h_=pt({},Qs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zd}),p_=wn(h_),m_=pt({},Ho,{propertyName:0,elapsedTime:0,pseudoElement:0}),g_=wn(m_),v_=pt({},zl,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),x_=wn(v_),__=[9,13,27,32],Kd=yi&&"CompositionEvent"in window,Ss=null;yi&&"documentMode"in document&&(Ss=document.documentMode);var y_=yi&&"TextEvent"in window&&!Ss,Gg=yi&&(!Kd||Ss&&8<Ss&&11>=Ss),lh=String.fromCharCode(32),ch=!1;function Vg(n,e){switch(n){case"keyup":return __.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hg(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var co=!1;function S_(n,e){switch(n){case"compositionend":return Hg(e);case"keypress":return e.which!==32?null:(ch=!0,lh);case"textInput":return n=e.data,n===lh&&ch?null:n;default:return null}}function M_(n,e){if(co)return n==="compositionend"||!Kd&&Vg(n,e)?(n=Bg(),Ya=qd=Oi=null,co=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Gg&&e.locale!=="ko"?null:e.data;default:return null}}var w_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function uh(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!w_[n.type]:e==="textarea"}function Wg(n,e,t,i){Sg(i),e=gl(e,"onChange"),0<e.length&&(t=new Yd("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Ms=null,Us=null;function E_(n){t0(n,0)}function Fl(n){var e=ho(n);if(pg(e))return n}function b_(n,e){if(n==="change")return e}var jg=!1;if(yi){var xc;if(yi){var _c="oninput"in document;if(!_c){var dh=document.createElement("div");dh.setAttribute("oninput","return;"),_c=typeof dh.oninput=="function"}xc=_c}else xc=!1;jg=xc&&(!document.documentMode||9<document.documentMode)}function fh(){Ms&&(Ms.detachEvent("onpropertychange",Xg),Us=Ms=null)}function Xg(n){if(n.propertyName==="value"&&Fl(Us)){var e=[];Wg(e,Us,n,Hd(n)),bg(E_,e)}}function C_(n,e,t){n==="focusin"?(fh(),Ms=e,Us=t,Ms.attachEvent("onpropertychange",Xg)):n==="focusout"&&fh()}function T_(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Fl(Us)}function A_(n,e){if(n==="click")return Fl(e)}function P_(n,e){if(n==="input"||n==="change")return Fl(e)}function L_(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var $n=typeof Object.is=="function"?Object.is:L_;function ks(n,e){if($n(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!_u.call(e,r)||!$n(n[r],e[r]))return!1}return!0}function hh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function ph(n,e){var t=hh(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=hh(t)}}function $g(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?$g(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function qg(){for(var n=window,e=cl();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=cl(n.document)}return e}function Jd(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function R_(n){var e=qg(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&$g(t.ownerDocument.documentElement,t)){if(i!==null&&Jd(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,o=Math.min(i.start,r);i=i.end===void 0?o:Math.min(i.end,r),!n.extend&&o>i&&(r=i,i=o,o=r),r=ph(t,o);var s=ph(t,i);r&&s&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==s.node||n.focusOffset!==s.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),o>i?(n.addRange(e),n.extend(s.node,s.offset)):(e.setEnd(s.node,s.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var D_=yi&&"documentMode"in document&&11>=document.documentMode,uo=null,zu=null,ws=null,Fu=!1;function mh(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Fu||uo==null||uo!==cl(i)||(i=uo,"selectionStart"in i&&Jd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ws&&ks(ws,i)||(ws=i,i=gl(zu,"onSelect"),0<i.length&&(e=new Yd("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=uo)))}function da(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var fo={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionend:da("Transition","TransitionEnd")},yc={},Yg={};yi&&(Yg=document.createElement("div").style,"AnimationEvent"in window||(delete fo.animationend.animation,delete fo.animationiteration.animation,delete fo.animationstart.animation),"TransitionEvent"in window||delete fo.transitionend.transition);function Bl(n){if(yc[n])return yc[n];if(!fo[n])return n;var e=fo[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in Yg)return yc[n]=e[t];return n}var Zg=Bl("animationend"),Kg=Bl("animationiteration"),Jg=Bl("animationstart"),Qg=Bl("transitionend"),e0=new Map,gh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qi(n,e){e0.set(n,e),Or(e,[n])}for(var Sc=0;Sc<gh.length;Sc++){var Mc=gh[Sc],N_=Mc.toLowerCase(),I_=Mc[0].toUpperCase()+Mc.slice(1);Qi(N_,"on"+I_)}Qi(Zg,"onAnimationEnd");Qi(Kg,"onAnimationIteration");Qi(Jg,"onAnimationStart");Qi("dblclick","onDoubleClick");Qi("focusin","onFocus");Qi("focusout","onBlur");Qi(Qg,"onTransitionEnd");Lo("onMouseEnter",["mouseout","mouseover"]);Lo("onMouseLeave",["mouseout","mouseover"]);Lo("onPointerEnter",["pointerout","pointerover"]);Lo("onPointerLeave",["pointerout","pointerover"]);Or("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Or("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Or("onBeforeInput",["compositionend","keypress","textInput","paste"]);Or("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Or("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Or("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var gs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),U_=new Set("cancel close invalid load scroll toggle".split(" ").concat(gs));function vh(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,Nx(i,e,void 0,n),n.currentTarget=null}function t0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var o=void 0;if(e)for(var s=i.length-1;0<=s;s--){var a=i[s],c=a.instance,l=a.currentTarget;if(a=a.listener,c!==o&&r.isPropagationStopped())break e;vh(r,a,l),o=c}else for(s=0;s<i.length;s++){if(a=i[s],c=a.instance,l=a.currentTarget,a=a.listener,c!==o&&r.isPropagationStopped())break e;vh(r,a,l),o=c}}}if(dl)throw n=Iu,dl=!1,Iu=null,n}function ot(n,e){var t=e[Wu];t===void 0&&(t=e[Wu]=new Set);var i=n+"__bubble";t.has(i)||(n0(e,n,2,!1),t.add(i))}function wc(n,e,t){var i=0;e&&(i|=4),n0(t,n,i,e)}var fa="_reactListening"+Math.random().toString(36).slice(2);function Os(n){if(!n[fa]){n[fa]=!0,cg.forEach(function(t){t!=="selectionchange"&&(U_.has(t)||wc(t,!1,n),wc(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[fa]||(e[fa]=!0,wc("selectionchange",!1,e))}}function n0(n,e,t,i){switch(Fg(e)){case 1:var r=Yx;break;case 4:r=Zx;break;default:r=$d}t=r.bind(null,e,t,n),r=void 0,!Nu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function Ec(n,e,t,i,r){var o=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var s=i.tag;if(s===3||s===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(s===4)for(s=i.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;s=s.return}for(;a!==null;){if(s=vr(a),s===null)return;if(c=s.tag,c===5||c===6){i=o=s;continue e}a=a.parentNode}}i=i.return}bg(function(){var l=o,u=Hd(t),f=[];e:{var h=e0.get(n);if(h!==void 0){var p=Yd,_=n;switch(n){case"keypress":if(Za(t)===0)break e;case"keydown":case"keyup":p=d_;break;case"focusin":_="focus",p=vc;break;case"focusout":_="blur",p=vc;break;case"beforeblur":case"afterblur":p=vc;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=oh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Qx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=p_;break;case Zg:case Kg:case Jg:p=n_;break;case Qg:p=g_;break;case"scroll":p=Kx;break;case"wheel":p=x_;break;case"copy":case"cut":case"paste":p=r_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=ah}var x=(e&4)!==0,m=!x&&n==="scroll",d=x?h!==null?h+"Capture":null:h;x=[];for(var v=l,g;v!==null;){g=v;var y=g.stateNode;if(g.tag===5&&y!==null&&(g=y,d!==null&&(y=Rs(v,d),y!=null&&x.push(zs(v,y,g)))),m)break;v=v.return}0<x.length&&(h=new p(h,_,null,t,u),f.push({event:h,listeners:x}))}}if(!(e&7)){e:{if(h=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",h&&t!==Ru&&(_=t.relatedTarget||t.fromElement)&&(vr(_)||_[Si]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(_=t.relatedTarget||t.toElement,p=l,_=_?vr(_):null,_!==null&&(m=zr(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=l),p!==_)){if(x=oh,y="onMouseLeave",d="onMouseEnter",v="mouse",(n==="pointerout"||n==="pointerover")&&(x=ah,y="onPointerLeave",d="onPointerEnter",v="pointer"),m=p==null?h:ho(p),g=_==null?h:ho(_),h=new x(y,v+"leave",p,t,u),h.target=m,h.relatedTarget=g,y=null,vr(u)===l&&(x=new x(d,v+"enter",_,t,u),x.target=g,x.relatedTarget=m,y=x),m=y,p&&_)t:{for(x=p,d=_,v=0,g=x;g;g=Br(g))v++;for(g=0,y=d;y;y=Br(y))g++;for(;0<v-g;)x=Br(x),v--;for(;0<g-v;)d=Br(d),g--;for(;v--;){if(x===d||d!==null&&x===d.alternate)break t;x=Br(x),d=Br(d)}x=null}else x=null;p!==null&&xh(f,h,p,x,!1),_!==null&&m!==null&&xh(f,m,_,x,!0)}}e:{if(h=l?ho(l):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var M=b_;else if(uh(h))if(jg)M=P_;else{M=T_;var E=C_}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(M=A_);if(M&&(M=M(n,l))){Wg(f,M,t,u);break e}E&&E(n,h,l),n==="focusout"&&(E=h._wrapperState)&&E.controlled&&h.type==="number"&&Cu(h,"number",h.value)}switch(E=l?ho(l):window,n){case"focusin":(uh(E)||E.contentEditable==="true")&&(uo=E,zu=l,ws=null);break;case"focusout":ws=zu=uo=null;break;case"mousedown":Fu=!0;break;case"contextmenu":case"mouseup":case"dragend":Fu=!1,mh(f,t,u);break;case"selectionchange":if(D_)break;case"keydown":case"keyup":mh(f,t,u)}var P;if(Kd)e:{switch(n){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else co?Vg(n,t)&&(T="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(T="onCompositionStart");T&&(Gg&&t.locale!=="ko"&&(co||T!=="onCompositionStart"?T==="onCompositionEnd"&&co&&(P=Bg()):(Oi=u,qd="value"in Oi?Oi.value:Oi.textContent,co=!0)),E=gl(l,T),0<E.length&&(T=new sh(T,n,null,t,u),f.push({event:T,listeners:E}),P?T.data=P:(P=Hg(t),P!==null&&(T.data=P)))),(P=y_?S_(n,t):M_(n,t))&&(l=gl(l,"onBeforeInput"),0<l.length&&(u=new sh("onBeforeInput","beforeinput",null,t,u),f.push({event:u,listeners:l}),u.data=P))}t0(f,e)})}function zs(n,e,t){return{instance:n,listener:e,currentTarget:t}}function gl(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,o=r.stateNode;r.tag===5&&o!==null&&(r=o,o=Rs(n,t),o!=null&&i.unshift(zs(n,o,r)),o=Rs(n,e),o!=null&&i.push(zs(n,o,r))),n=n.return}return i}function Br(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function xh(n,e,t,i,r){for(var o=e._reactName,s=[];t!==null&&t!==i;){var a=t,c=a.alternate,l=a.stateNode;if(c!==null&&c===i)break;a.tag===5&&l!==null&&(a=l,r?(c=Rs(t,o),c!=null&&s.unshift(zs(t,c,a))):r||(c=Rs(t,o),c!=null&&s.push(zs(t,c,a)))),t=t.return}s.length!==0&&n.push({event:e,listeners:s})}var k_=/\r\n?/g,O_=/\u0000|\uFFFD/g;function _h(n){return(typeof n=="string"?n:""+n).replace(k_,`
`).replace(O_,"")}function ha(n,e,t){if(e=_h(e),_h(n)!==e&&t)throw Error(ue(425))}function vl(){}var Bu=null,Gu=null;function Vu(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Hu=typeof setTimeout=="function"?setTimeout:void 0,z_=typeof clearTimeout=="function"?clearTimeout:void 0,yh=typeof Promise=="function"?Promise:void 0,F_=typeof queueMicrotask=="function"?queueMicrotask:typeof yh<"u"?function(n){return yh.resolve(null).then(n).catch(B_)}:Hu;function B_(n){setTimeout(function(){throw n})}function bc(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),Is(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);Is(e)}function Hi(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Sh(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var Wo=Math.random().toString(36).slice(2),ei="__reactFiber$"+Wo,Fs="__reactProps$"+Wo,Si="__reactContainer$"+Wo,Wu="__reactEvents$"+Wo,G_="__reactListeners$"+Wo,V_="__reactHandles$"+Wo;function vr(n){var e=n[ei];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Si]||t[ei]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Sh(n);n!==null;){if(t=n[ei])return t;n=Sh(n)}return e}n=t,t=n.parentNode}return null}function ea(n){return n=n[ei]||n[Si],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ho(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(ue(33))}function Gl(n){return n[Fs]||null}var ju=[],po=-1;function er(n){return{current:n}}function at(n){0>po||(n.current=ju[po],ju[po]=null,po--)}function it(n,e){po++,ju[po]=n.current,n.current=e}var Ki={},Ht=er(Ki),an=er(!1),Cr=Ki;function Ro(n,e){var t=n.type.contextTypes;if(!t)return Ki;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},o;for(o in t)r[o]=e[o];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function ln(n){return n=n.childContextTypes,n!=null}function xl(){at(an),at(Ht)}function Mh(n,e,t){if(Ht.current!==Ki)throw Error(ue(168));it(Ht,e),it(an,t)}function i0(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ue(108,Cx(n)||"Unknown",r));return pt({},t,i)}function _l(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Ki,Cr=Ht.current,it(Ht,n),it(an,an.current),!0}function wh(n,e,t){var i=n.stateNode;if(!i)throw Error(ue(169));t?(n=i0(n,e,Cr),i.__reactInternalMemoizedMergedChildContext=n,at(an),at(Ht),it(Ht,n)):at(an),it(an,t)}var mi=null,Vl=!1,Cc=!1;function r0(n){mi===null?mi=[n]:mi.push(n)}function H_(n){Vl=!0,r0(n)}function tr(){if(!Cc&&mi!==null){Cc=!0;var n=0,e=Qe;try{var t=mi;for(Qe=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}mi=null,Vl=!1}catch(r){throw mi!==null&&(mi=mi.slice(n+1)),Pg(Wd,tr),r}finally{Qe=e,Cc=!1}}return null}var mo=[],go=0,yl=null,Sl=0,Cn=[],Tn=0,Tr=null,gi=1,vi="";function dr(n,e){mo[go++]=Sl,mo[go++]=yl,yl=n,Sl=e}function o0(n,e,t){Cn[Tn++]=gi,Cn[Tn++]=vi,Cn[Tn++]=Tr,Tr=n;var i=gi;n=vi;var r=32-jn(i)-1;i&=~(1<<r),t+=1;var o=32-jn(e)+r;if(30<o){var s=r-r%5;o=(i&(1<<s)-1).toString(32),i>>=s,r-=s,gi=1<<32-jn(e)+r|t<<r|i,vi=o+n}else gi=1<<o|t<<r|i,vi=n}function Qd(n){n.return!==null&&(dr(n,1),o0(n,1,0))}function ef(n){for(;n===yl;)yl=mo[--go],mo[go]=null,Sl=mo[--go],mo[go]=null;for(;n===Tr;)Tr=Cn[--Tn],Cn[Tn]=null,vi=Cn[--Tn],Cn[Tn]=null,gi=Cn[--Tn],Cn[Tn]=null}var _n=null,vn=null,ut=!1,Bn=null;function s0(n,e){var t=Pn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Eh(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,_n=n,vn=Hi(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,_n=n,vn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Tr!==null?{id:gi,overflow:vi}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Pn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,_n=n,vn=null,!0):!1;default:return!1}}function Xu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function $u(n){if(ut){var e=vn;if(e){var t=e;if(!Eh(n,e)){if(Xu(n))throw Error(ue(418));e=Hi(t.nextSibling);var i=_n;e&&Eh(n,e)?s0(i,t):(n.flags=n.flags&-4097|2,ut=!1,_n=n)}}else{if(Xu(n))throw Error(ue(418));n.flags=n.flags&-4097|2,ut=!1,_n=n}}}function bh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;_n=n}function pa(n){if(n!==_n)return!1;if(!ut)return bh(n),ut=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Vu(n.type,n.memoizedProps)),e&&(e=vn)){if(Xu(n))throw a0(),Error(ue(418));for(;e;)s0(n,e),e=Hi(e.nextSibling)}if(bh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(ue(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){vn=Hi(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}vn=null}}else vn=_n?Hi(n.stateNode.nextSibling):null;return!0}function a0(){for(var n=vn;n;)n=Hi(n.nextSibling)}function Do(){vn=_n=null,ut=!1}function tf(n){Bn===null?Bn=[n]:Bn.push(n)}var W_=Ei.ReactCurrentBatchConfig;function rs(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(ue(309));var i=t.stateNode}if(!i)throw Error(ue(147,n));var r=i,o=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===o?e.ref:(e=function(s){var a=r.refs;s===null?delete a[o]:a[o]=s},e._stringRef=o,e)}if(typeof n!="string")throw Error(ue(284));if(!t._owner)throw Error(ue(290,n))}return n}function ma(n,e){throw n=Object.prototype.toString.call(e),Error(ue(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Ch(n){var e=n._init;return e(n._payload)}function l0(n){function e(d,v){if(n){var g=d.deletions;g===null?(d.deletions=[v],d.flags|=16):g.push(v)}}function t(d,v){if(!n)return null;for(;v!==null;)e(d,v),v=v.sibling;return null}function i(d,v){for(d=new Map;v!==null;)v.key!==null?d.set(v.key,v):d.set(v.index,v),v=v.sibling;return d}function r(d,v){return d=$i(d,v),d.index=0,d.sibling=null,d}function o(d,v,g){return d.index=g,n?(g=d.alternate,g!==null?(g=g.index,g<v?(d.flags|=2,v):g):(d.flags|=2,v)):(d.flags|=1048576,v)}function s(d){return n&&d.alternate===null&&(d.flags|=2),d}function a(d,v,g,y){return v===null||v.tag!==6?(v=Nc(g,d.mode,y),v.return=d,v):(v=r(v,g),v.return=d,v)}function c(d,v,g,y){var M=g.type;return M===lo?u(d,v,g.props.children,y,g.key):v!==null&&(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Di&&Ch(M)===v.type)?(y=r(v,g.props),y.ref=rs(d,v,g),y.return=d,y):(y=il(g.type,g.key,g.props,null,d.mode,y),y.ref=rs(d,v,g),y.return=d,y)}function l(d,v,g,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==g.containerInfo||v.stateNode.implementation!==g.implementation?(v=Ic(g,d.mode,y),v.return=d,v):(v=r(v,g.children||[]),v.return=d,v)}function u(d,v,g,y,M){return v===null||v.tag!==7?(v=Er(g,d.mode,y,M),v.return=d,v):(v=r(v,g),v.return=d,v)}function f(d,v,g){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Nc(""+v,d.mode,g),v.return=d,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ra:return g=il(v.type,v.key,v.props,null,d.mode,g),g.ref=rs(d,null,v),g.return=d,g;case ao:return v=Ic(v,d.mode,g),v.return=d,v;case Di:var y=v._init;return f(d,y(v._payload),g)}if(ps(v)||Qo(v))return v=Er(v,d.mode,g,null),v.return=d,v;ma(d,v)}return null}function h(d,v,g,y){var M=v!==null?v.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return M!==null?null:a(d,v,""+g,y);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ra:return g.key===M?c(d,v,g,y):null;case ao:return g.key===M?l(d,v,g,y):null;case Di:return M=g._init,h(d,v,M(g._payload),y)}if(ps(g)||Qo(g))return M!==null?null:u(d,v,g,y,null);ma(d,g)}return null}function p(d,v,g,y,M){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(g)||null,a(v,d,""+y,M);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ra:return d=d.get(y.key===null?g:y.key)||null,c(v,d,y,M);case ao:return d=d.get(y.key===null?g:y.key)||null,l(v,d,y,M);case Di:var E=y._init;return p(d,v,g,E(y._payload),M)}if(ps(y)||Qo(y))return d=d.get(g)||null,u(v,d,y,M,null);ma(v,y)}return null}function _(d,v,g,y){for(var M=null,E=null,P=v,T=v=0,S=null;P!==null&&T<g.length;T++){P.index>T?(S=P,P=null):S=P.sibling;var w=h(d,P,g[T],y);if(w===null){P===null&&(P=S);break}n&&P&&w.alternate===null&&e(d,P),v=o(w,v,T),E===null?M=w:E.sibling=w,E=w,P=S}if(T===g.length)return t(d,P),ut&&dr(d,T),M;if(P===null){for(;T<g.length;T++)P=f(d,g[T],y),P!==null&&(v=o(P,v,T),E===null?M=P:E.sibling=P,E=P);return ut&&dr(d,T),M}for(P=i(d,P);T<g.length;T++)S=p(P,d,T,g[T],y),S!==null&&(n&&S.alternate!==null&&P.delete(S.key===null?T:S.key),v=o(S,v,T),E===null?M=S:E.sibling=S,E=S);return n&&P.forEach(function(V){return e(d,V)}),ut&&dr(d,T),M}function x(d,v,g,y){var M=Qo(g);if(typeof M!="function")throw Error(ue(150));if(g=M.call(g),g==null)throw Error(ue(151));for(var E=M=null,P=v,T=v=0,S=null,w=g.next();P!==null&&!w.done;T++,w=g.next()){P.index>T?(S=P,P=null):S=P.sibling;var V=h(d,P,w.value,y);if(V===null){P===null&&(P=S);break}n&&P&&V.alternate===null&&e(d,P),v=o(V,v,T),E===null?M=V:E.sibling=V,E=V,P=S}if(w.done)return t(d,P),ut&&dr(d,T),M;if(P===null){for(;!w.done;T++,w=g.next())w=f(d,w.value,y),w!==null&&(v=o(w,v,T),E===null?M=w:E.sibling=w,E=w);return ut&&dr(d,T),M}for(P=i(d,P);!w.done;T++,w=g.next())w=p(P,d,T,w.value,y),w!==null&&(n&&w.alternate!==null&&P.delete(w.key===null?T:w.key),v=o(w,v,T),E===null?M=w:E.sibling=w,E=w);return n&&P.forEach(function(k){return e(d,k)}),ut&&dr(d,T),M}function m(d,v,g,y){if(typeof g=="object"&&g!==null&&g.type===lo&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case ra:e:{for(var M=g.key,E=v;E!==null;){if(E.key===M){if(M=g.type,M===lo){if(E.tag===7){t(d,E.sibling),v=r(E,g.props.children),v.return=d,d=v;break e}}else if(E.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Di&&Ch(M)===E.type){t(d,E.sibling),v=r(E,g.props),v.ref=rs(d,E,g),v.return=d,d=v;break e}t(d,E);break}else e(d,E);E=E.sibling}g.type===lo?(v=Er(g.props.children,d.mode,y,g.key),v.return=d,d=v):(y=il(g.type,g.key,g.props,null,d.mode,y),y.ref=rs(d,v,g),y.return=d,d=y)}return s(d);case ao:e:{for(E=g.key;v!==null;){if(v.key===E)if(v.tag===4&&v.stateNode.containerInfo===g.containerInfo&&v.stateNode.implementation===g.implementation){t(d,v.sibling),v=r(v,g.children||[]),v.return=d,d=v;break e}else{t(d,v);break}else e(d,v);v=v.sibling}v=Ic(g,d.mode,y),v.return=d,d=v}return s(d);case Di:return E=g._init,m(d,v,E(g._payload),y)}if(ps(g))return _(d,v,g,y);if(Qo(g))return x(d,v,g,y);ma(d,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,v!==null&&v.tag===6?(t(d,v.sibling),v=r(v,g),v.return=d,d=v):(t(d,v),v=Nc(g,d.mode,y),v.return=d,d=v),s(d)):t(d,v)}return m}var No=l0(!0),c0=l0(!1),Ml=er(null),wl=null,vo=null,nf=null;function rf(){nf=vo=wl=null}function of(n){var e=Ml.current;at(Ml),n._currentValue=e}function qu(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function bo(n,e){wl=n,nf=vo=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(sn=!0),n.firstContext=null)}function Rn(n){var e=n._currentValue;if(nf!==n)if(n={context:n,memoizedValue:e,next:null},vo===null){if(wl===null)throw Error(ue(308));vo=n,wl.dependencies={lanes:0,firstContext:n}}else vo=vo.next=n;return e}var xr=null;function sf(n){xr===null?xr=[n]:xr.push(n)}function u0(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,sf(e)):(t.next=r.next,r.next=t),e.interleaved=t,Mi(n,i)}function Mi(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var Ni=!1;function af(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function d0(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function xi(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function Wi(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,Ze&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Mi(n,t)}return r=i.interleaved,r===null?(e.next=e,sf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Mi(n,t)}function Ka(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,jd(n,t)}}function Th(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var s={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?r=o=s:o=o.next=s,t=t.next}while(t!==null);o===null?r=o=e:o=o.next=e}else r=o=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:o,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function El(n,e,t,i){var r=n.updateQueue;Ni=!1;var o=r.firstBaseUpdate,s=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var c=a,l=c.next;c.next=null,s===null?o=l:s.next=l,s=c;var u=n.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==s&&(a===null?u.firstBaseUpdate=l:a.next=l,u.lastBaseUpdate=c))}if(o!==null){var f=r.baseState;s=0,u=l=c=null,a=o;do{var h=a.lane,p=a.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=n,x=a;switch(h=e,p=t,x.tag){case 1:if(_=x.payload,typeof _=="function"){f=_.call(p,f,h);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=x.payload,h=typeof _=="function"?_.call(p,f,h):_,h==null)break e;f=pt({},f,h);break e;case 2:Ni=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(l=u=p,c=f):u=u.next=p,s|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(1);if(u===null&&(c=f),r.baseState=c,r.firstBaseUpdate=l,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do s|=r.lane,r=r.next;while(r!==e)}else o===null&&(r.shared.lanes=0);Pr|=s,n.lanes=s,n.memoizedState=f}}function Ah(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(ue(191,r));r.call(i)}}}var ta={},ii=er(ta),Bs=er(ta),Gs=er(ta);function _r(n){if(n===ta)throw Error(ue(174));return n}function lf(n,e){switch(it(Gs,e),it(Bs,n),it(ii,ta),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Au(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=Au(e,n)}at(ii),it(ii,e)}function Io(){at(ii),at(Bs),at(Gs)}function f0(n){_r(Gs.current);var e=_r(ii.current),t=Au(e,n.type);e!==t&&(it(Bs,n),it(ii,t))}function cf(n){Bs.current===n&&(at(ii),at(Bs))}var ft=er(0);function bl(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Tc=[];function uf(){for(var n=0;n<Tc.length;n++)Tc[n]._workInProgressVersionPrimary=null;Tc.length=0}var Ja=Ei.ReactCurrentDispatcher,Ac=Ei.ReactCurrentBatchConfig,Ar=0,ht=null,wt=null,Lt=null,Cl=!1,Es=!1,Vs=0,j_=0;function Ot(){throw Error(ue(321))}function df(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!$n(n[t],e[t]))return!1;return!0}function ff(n,e,t,i,r,o){if(Ar=o,ht=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ja.current=n===null||n.memoizedState===null?Y_:Z_,n=t(i,r),Es){o=0;do{if(Es=!1,Vs=0,25<=o)throw Error(ue(301));o+=1,Lt=wt=null,e.updateQueue=null,Ja.current=K_,n=t(i,r)}while(Es)}if(Ja.current=Tl,e=wt!==null&&wt.next!==null,Ar=0,Lt=wt=ht=null,Cl=!1,e)throw Error(ue(300));return n}function hf(){var n=Vs!==0;return Vs=0,n}function Kn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Lt===null?ht.memoizedState=Lt=n:Lt=Lt.next=n,Lt}function Dn(){if(wt===null){var n=ht.alternate;n=n!==null?n.memoizedState:null}else n=wt.next;var e=Lt===null?ht.memoizedState:Lt.next;if(e!==null)Lt=e,wt=n;else{if(n===null)throw Error(ue(310));wt=n,n={memoizedState:wt.memoizedState,baseState:wt.baseState,baseQueue:wt.baseQueue,queue:wt.queue,next:null},Lt===null?ht.memoizedState=Lt=n:Lt=Lt.next=n}return Lt}function Hs(n,e){return typeof e=="function"?e(n):e}function Pc(n){var e=Dn(),t=e.queue;if(t===null)throw Error(ue(311));t.lastRenderedReducer=n;var i=wt,r=i.baseQueue,o=t.pending;if(o!==null){if(r!==null){var s=r.next;r.next=o.next,o.next=s}i.baseQueue=r=o,t.pending=null}if(r!==null){o=r.next,i=i.baseState;var a=s=null,c=null,l=o;do{var u=l.lane;if((Ar&u)===u)c!==null&&(c=c.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),i=l.hasEagerState?l.eagerState:n(i,l.action);else{var f={lane:u,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null};c===null?(a=c=f,s=i):c=c.next=f,ht.lanes|=u,Pr|=u}l=l.next}while(l!==null&&l!==o);c===null?s=i:c.next=a,$n(i,e.memoizedState)||(sn=!0),e.memoizedState=i,e.baseState=s,e.baseQueue=c,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do o=r.lane,ht.lanes|=o,Pr|=o,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Lc(n){var e=Dn(),t=e.queue;if(t===null)throw Error(ue(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,o=e.memoizedState;if(r!==null){t.pending=null;var s=r=r.next;do o=n(o,s.action),s=s.next;while(s!==r);$n(o,e.memoizedState)||(sn=!0),e.memoizedState=o,e.baseQueue===null&&(e.baseState=o),t.lastRenderedState=o}return[o,i]}function h0(){}function p0(n,e){var t=ht,i=Dn(),r=e(),o=!$n(i.memoizedState,r);if(o&&(i.memoizedState=r,sn=!0),i=i.queue,pf(v0.bind(null,t,i,n),[n]),i.getSnapshot!==e||o||Lt!==null&&Lt.memoizedState.tag&1){if(t.flags|=2048,Ws(9,g0.bind(null,t,i,r,e),void 0,null),Dt===null)throw Error(ue(349));Ar&30||m0(t,e,r)}return r}function m0(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=ht.updateQueue,e===null?(e={lastEffect:null,stores:null},ht.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function g0(n,e,t,i){e.value=t,e.getSnapshot=i,x0(e)&&_0(n)}function v0(n,e,t){return t(function(){x0(e)&&_0(n)})}function x0(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!$n(n,t)}catch{return!0}}function _0(n){var e=Mi(n,1);e!==null&&Xn(e,n,1,-1)}function Ph(n){var e=Kn();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Hs,lastRenderedState:n},e.queue=n,n=n.dispatch=q_.bind(null,ht,n),[e.memoizedState,n]}function Ws(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=ht.updateQueue,e===null?(e={lastEffect:null,stores:null},ht.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function y0(){return Dn().memoizedState}function Qa(n,e,t,i){var r=Kn();ht.flags|=n,r.memoizedState=Ws(1|e,t,void 0,i===void 0?null:i)}function Hl(n,e,t,i){var r=Dn();i=i===void 0?null:i;var o=void 0;if(wt!==null){var s=wt.memoizedState;if(o=s.destroy,i!==null&&df(i,s.deps)){r.memoizedState=Ws(e,t,o,i);return}}ht.flags|=n,r.memoizedState=Ws(1|e,t,o,i)}function Lh(n,e){return Qa(8390656,8,n,e)}function pf(n,e){return Hl(2048,8,n,e)}function S0(n,e){return Hl(4,2,n,e)}function M0(n,e){return Hl(4,4,n,e)}function w0(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function E0(n,e,t){return t=t!=null?t.concat([n]):null,Hl(4,4,w0.bind(null,e,n),t)}function mf(){}function b0(n,e){var t=Dn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&df(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function C0(n,e){var t=Dn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&df(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function T0(n,e,t){return Ar&21?($n(t,e)||(t=Dg(),ht.lanes|=t,Pr|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,sn=!0),n.memoizedState=t)}function X_(n,e){var t=Qe;Qe=t!==0&&4>t?t:4,n(!0);var i=Ac.transition;Ac.transition={};try{n(!1),e()}finally{Qe=t,Ac.transition=i}}function A0(){return Dn().memoizedState}function $_(n,e,t){var i=Xi(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},P0(n))L0(e,t);else if(t=u0(n,e,t,i),t!==null){var r=Zt();Xn(t,n,i,r),R0(t,e,i)}}function q_(n,e,t){var i=Xi(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(P0(n))L0(e,r);else{var o=n.alternate;if(n.lanes===0&&(o===null||o.lanes===0)&&(o=e.lastRenderedReducer,o!==null))try{var s=e.lastRenderedState,a=o(s,t);if(r.hasEagerState=!0,r.eagerState=a,$n(a,s)){var c=e.interleaved;c===null?(r.next=r,sf(e)):(r.next=c.next,c.next=r),e.interleaved=r;return}}catch{}finally{}t=u0(n,e,r,i),t!==null&&(r=Zt(),Xn(t,n,i,r),R0(t,e,i))}}function P0(n){var e=n.alternate;return n===ht||e!==null&&e===ht}function L0(n,e){Es=Cl=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function R0(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,jd(n,t)}}var Tl={readContext:Rn,useCallback:Ot,useContext:Ot,useEffect:Ot,useImperativeHandle:Ot,useInsertionEffect:Ot,useLayoutEffect:Ot,useMemo:Ot,useReducer:Ot,useRef:Ot,useState:Ot,useDebugValue:Ot,useDeferredValue:Ot,useTransition:Ot,useMutableSource:Ot,useSyncExternalStore:Ot,useId:Ot,unstable_isNewReconciler:!1},Y_={readContext:Rn,useCallback:function(n,e){return Kn().memoizedState=[n,e===void 0?null:e],n},useContext:Rn,useEffect:Lh,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Qa(4194308,4,w0.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Qa(4194308,4,n,e)},useInsertionEffect:function(n,e){return Qa(4,2,n,e)},useMemo:function(n,e){var t=Kn();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=Kn();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=$_.bind(null,ht,n),[i.memoizedState,n]},useRef:function(n){var e=Kn();return n={current:n},e.memoizedState=n},useState:Ph,useDebugValue:mf,useDeferredValue:function(n){return Kn().memoizedState=n},useTransition:function(){var n=Ph(!1),e=n[0];return n=X_.bind(null,n[1]),Kn().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=ht,r=Kn();if(ut){if(t===void 0)throw Error(ue(407));t=t()}else{if(t=e(),Dt===null)throw Error(ue(349));Ar&30||m0(i,e,t)}r.memoizedState=t;var o={value:t,getSnapshot:e};return r.queue=o,Lh(v0.bind(null,i,o,n),[n]),i.flags|=2048,Ws(9,g0.bind(null,i,o,t,e),void 0,null),t},useId:function(){var n=Kn(),e=Dt.identifierPrefix;if(ut){var t=vi,i=gi;t=(i&~(1<<32-jn(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=Vs++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=j_++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},Z_={readContext:Rn,useCallback:b0,useContext:Rn,useEffect:pf,useImperativeHandle:E0,useInsertionEffect:S0,useLayoutEffect:M0,useMemo:C0,useReducer:Pc,useRef:y0,useState:function(){return Pc(Hs)},useDebugValue:mf,useDeferredValue:function(n){var e=Dn();return T0(e,wt.memoizedState,n)},useTransition:function(){var n=Pc(Hs)[0],e=Dn().memoizedState;return[n,e]},useMutableSource:h0,useSyncExternalStore:p0,useId:A0,unstable_isNewReconciler:!1},K_={readContext:Rn,useCallback:b0,useContext:Rn,useEffect:pf,useImperativeHandle:E0,useInsertionEffect:S0,useLayoutEffect:M0,useMemo:C0,useReducer:Lc,useRef:y0,useState:function(){return Lc(Hs)},useDebugValue:mf,useDeferredValue:function(n){var e=Dn();return wt===null?e.memoizedState=n:T0(e,wt.memoizedState,n)},useTransition:function(){var n=Lc(Hs)[0],e=Dn().memoizedState;return[n,e]},useMutableSource:h0,useSyncExternalStore:p0,useId:A0,unstable_isNewReconciler:!1};function zn(n,e){if(n&&n.defaultProps){e=pt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Yu(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:pt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Wl={isMounted:function(n){return(n=n._reactInternals)?zr(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=Zt(),r=Xi(n),o=xi(i,r);o.payload=e,t!=null&&(o.callback=t),e=Wi(n,o,r),e!==null&&(Xn(e,n,r,i),Ka(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=Zt(),r=Xi(n),o=xi(i,r);o.tag=1,o.payload=e,t!=null&&(o.callback=t),e=Wi(n,o,r),e!==null&&(Xn(e,n,r,i),Ka(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=Zt(),i=Xi(n),r=xi(t,i);r.tag=2,e!=null&&(r.callback=e),e=Wi(n,r,i),e!==null&&(Xn(e,n,i,t),Ka(e,n,i))}};function Rh(n,e,t,i,r,o,s){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,o,s):e.prototype&&e.prototype.isPureReactComponent?!ks(t,i)||!ks(r,o):!0}function D0(n,e,t){var i=!1,r=Ki,o=e.contextType;return typeof o=="object"&&o!==null?o=Rn(o):(r=ln(e)?Cr:Ht.current,i=e.contextTypes,o=(i=i!=null)?Ro(n,r):Ki),e=new e(t,o),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Wl,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=o),e}function Dh(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&Wl.enqueueReplaceState(e,e.state,null)}function Zu(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},af(n);var o=e.contextType;typeof o=="object"&&o!==null?r.context=Rn(o):(o=ln(e)?Cr:Ht.current,r.context=Ro(n,o)),r.state=n.memoizedState,o=e.getDerivedStateFromProps,typeof o=="function"&&(Yu(n,e,o,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Wl.enqueueReplaceState(r,r.state,null),El(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function Uo(n,e){try{var t="",i=e;do t+=bx(i),i=i.return;while(i);var r=t}catch(o){r=`
Error generating stack: `+o.message+`
`+o.stack}return{value:n,source:e,stack:r,digest:null}}function Rc(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Ku(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var J_=typeof WeakMap=="function"?WeakMap:Map;function N0(n,e,t){t=xi(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){Pl||(Pl=!0,ad=i),Ku(n,e)},t}function I0(n,e,t){t=xi(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){Ku(n,e)}}var o=n.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Ku(n,e),typeof i!="function"&&(ji===null?ji=new Set([this]):ji.add(this));var s=e.stack;this.componentDidCatch(e.value,{componentStack:s!==null?s:""})}),t}function Nh(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new J_;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=fy.bind(null,n,e,t),e.then(n,n))}function Ih(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Uh(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=xi(-1,1),e.tag=2,Wi(t,e,1))),t.lanes|=1),n)}var Q_=Ei.ReactCurrentOwner,sn=!1;function $t(n,e,t,i){e.child=n===null?c0(e,null,t,i):No(e,n.child,t,i)}function kh(n,e,t,i,r){t=t.render;var o=e.ref;return bo(e,r),i=ff(n,e,t,i,o,r),t=hf(),n!==null&&!sn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,wi(n,e,r)):(ut&&t&&Qd(e),e.flags|=1,$t(n,e,i,r),e.child)}function Oh(n,e,t,i,r){if(n===null){var o=t.type;return typeof o=="function"&&!wf(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=o,U0(n,e,o,i,r)):(n=il(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(o=n.child,!(n.lanes&r)){var s=o.memoizedProps;if(t=t.compare,t=t!==null?t:ks,t(s,i)&&n.ref===e.ref)return wi(n,e,r)}return e.flags|=1,n=$i(o,i),n.ref=e.ref,n.return=e,e.child=n}function U0(n,e,t,i,r){if(n!==null){var o=n.memoizedProps;if(ks(o,i)&&n.ref===e.ref)if(sn=!1,e.pendingProps=i=o,(n.lanes&r)!==0)n.flags&131072&&(sn=!0);else return e.lanes=n.lanes,wi(n,e,r)}return Ju(n,e,t,i,r)}function k0(n,e,t){var i=e.pendingProps,r=i.children,o=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},it(_o,gn),gn|=t;else{if(!(t&1073741824))return n=o!==null?o.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,it(_o,gn),gn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=o!==null?o.baseLanes:t,it(_o,gn),gn|=i}else o!==null?(i=o.baseLanes|t,e.memoizedState=null):i=t,it(_o,gn),gn|=i;return $t(n,e,r,t),e.child}function O0(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Ju(n,e,t,i,r){var o=ln(t)?Cr:Ht.current;return o=Ro(e,o),bo(e,r),t=ff(n,e,t,i,o,r),i=hf(),n!==null&&!sn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,wi(n,e,r)):(ut&&i&&Qd(e),e.flags|=1,$t(n,e,t,r),e.child)}function zh(n,e,t,i,r){if(ln(t)){var o=!0;_l(e)}else o=!1;if(bo(e,r),e.stateNode===null)el(n,e),D0(e,t,i),Zu(e,t,i,r),i=!0;else if(n===null){var s=e.stateNode,a=e.memoizedProps;s.props=a;var c=s.context,l=t.contextType;typeof l=="object"&&l!==null?l=Rn(l):(l=ln(t)?Cr:Ht.current,l=Ro(e,l));var u=t.getDerivedStateFromProps,f=typeof u=="function"||typeof s.getSnapshotBeforeUpdate=="function";f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==i||c!==l)&&Dh(e,s,i,l),Ni=!1;var h=e.memoizedState;s.state=h,El(e,i,s,r),c=e.memoizedState,a!==i||h!==c||an.current||Ni?(typeof u=="function"&&(Yu(e,t,u,i),c=e.memoizedState),(a=Ni||Rh(e,t,a,i,h,c,l))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=l,i=a):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,d0(n,e),a=e.memoizedProps,l=e.type===e.elementType?a:zn(e.type,a),s.props=l,f=e.pendingProps,h=s.context,c=t.contextType,typeof c=="object"&&c!==null?c=Rn(c):(c=ln(t)?Cr:Ht.current,c=Ro(e,c));var p=t.getDerivedStateFromProps;(u=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==f||h!==c)&&Dh(e,s,i,c),Ni=!1,h=e.memoizedState,s.state=h,El(e,i,s,r);var _=e.memoizedState;a!==f||h!==_||an.current||Ni?(typeof p=="function"&&(Yu(e,t,p,i),_=e.memoizedState),(l=Ni||Rh(e,t,l,i,h,_,c)||!1)?(u||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,_,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,_,c)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),s.props=i,s.state=_,s.context=c,i=l):(typeof s.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),i=!1)}return Qu(n,e,t,i,o,r)}function Qu(n,e,t,i,r,o){O0(n,e);var s=(e.flags&128)!==0;if(!i&&!s)return r&&wh(e,t,!1),wi(n,e,o);i=e.stateNode,Q_.current=e;var a=s&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&s?(e.child=No(e,n.child,null,o),e.child=No(e,null,a,o)):$t(n,e,a,o),e.memoizedState=i.state,r&&wh(e,t,!0),e.child}function z0(n){var e=n.stateNode;e.pendingContext?Mh(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Mh(n,e.context,!1),lf(n,e.containerInfo)}function Fh(n,e,t,i,r){return Do(),tf(r),e.flags|=256,$t(n,e,t,i),e.child}var ed={dehydrated:null,treeContext:null,retryLane:0};function td(n){return{baseLanes:n,cachePool:null,transitions:null}}function F0(n,e,t){var i=e.pendingProps,r=ft.current,o=!1,s=(e.flags&128)!==0,a;if((a=s)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(o=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),it(ft,r&1),n===null)return $u(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(s=i.children,n=i.fallback,o?(i=e.mode,o=e.child,s={mode:"hidden",children:s},!(i&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=$l(s,i,0,null),n=Er(n,i,t,null),o.return=e,n.return=e,o.sibling=n,e.child=o,e.child.memoizedState=td(t),e.memoizedState=ed,n):gf(e,s));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return ey(n,e,s,i,a,r,t);if(o){o=i.fallback,s=e.mode,r=n.child,a=r.sibling;var c={mode:"hidden",children:i.children};return!(s&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=c,e.deletions=null):(i=$i(r,c),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?o=$i(a,o):(o=Er(o,s,t,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,i=o,o=e.child,s=n.child.memoizedState,s=s===null?td(t):{baseLanes:s.baseLanes|t,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=n.childLanes&~t,e.memoizedState=ed,i}return o=n.child,n=o.sibling,i=$i(o,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function gf(n,e){return e=$l({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function ga(n,e,t,i){return i!==null&&tf(i),No(e,n.child,null,t),n=gf(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function ey(n,e,t,i,r,o,s){if(t)return e.flags&256?(e.flags&=-257,i=Rc(Error(ue(422))),ga(n,e,s,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(o=i.fallback,r=e.mode,i=$l({mode:"visible",children:i.children},r,0,null),o=Er(o,r,s,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,e.mode&1&&No(e,n.child,null,s),e.child.memoizedState=td(s),e.memoizedState=ed,o);if(!(e.mode&1))return ga(n,e,s,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,o=Error(ue(419)),i=Rc(o,i,void 0),ga(n,e,s,i)}if(a=(s&n.childLanes)!==0,sn||a){if(i=Dt,i!==null){switch(s&-s){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|s)?0:r,r!==0&&r!==o.retryLane&&(o.retryLane=r,Mi(n,r),Xn(i,n,r,-1))}return Mf(),i=Rc(Error(ue(421))),ga(n,e,s,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=hy.bind(null,n),r._reactRetry=e,null):(n=o.treeContext,vn=Hi(r.nextSibling),_n=e,ut=!0,Bn=null,n!==null&&(Cn[Tn++]=gi,Cn[Tn++]=vi,Cn[Tn++]=Tr,gi=n.id,vi=n.overflow,Tr=e),e=gf(e,i.children),e.flags|=4096,e)}function Bh(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),qu(n.return,e,t)}function Dc(n,e,t,i,r){var o=n.memoizedState;o===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=i,o.tail=t,o.tailMode=r)}function B0(n,e,t){var i=e.pendingProps,r=i.revealOrder,o=i.tail;if($t(n,e,i.children,t),i=ft.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Bh(n,t,e);else if(n.tag===19)Bh(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(it(ft,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&bl(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),Dc(e,!1,r,t,o);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&bl(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}Dc(e,!0,t,null,o);break;case"together":Dc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function el(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function wi(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Pr|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(ue(153));if(e.child!==null){for(n=e.child,t=$i(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=$i(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function ty(n,e,t){switch(e.tag){case 3:z0(e),Do();break;case 5:f0(e);break;case 1:ln(e.type)&&_l(e);break;case 4:lf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;it(Ml,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(it(ft,ft.current&1),e.flags|=128,null):t&e.child.childLanes?F0(n,e,t):(it(ft,ft.current&1),n=wi(n,e,t),n!==null?n.sibling:null);it(ft,ft.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return B0(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),it(ft,ft.current),i)break;return null;case 22:case 23:return e.lanes=0,k0(n,e,t)}return wi(n,e,t)}var G0,nd,V0,H0;G0=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};nd=function(){};V0=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,_r(ii.current);var o=null;switch(t){case"input":r=Eu(n,r),i=Eu(n,i),o=[];break;case"select":r=pt({},r,{value:void 0}),i=pt({},i,{value:void 0}),o=[];break;case"textarea":r=Tu(n,r),i=Tu(n,i),o=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=vl)}Pu(t,i);var s;t=null;for(l in r)if(!i.hasOwnProperty(l)&&r.hasOwnProperty(l)&&r[l]!=null)if(l==="style"){var a=r[l];for(s in a)a.hasOwnProperty(s)&&(t||(t={}),t[s]="")}else l!=="dangerouslySetInnerHTML"&&l!=="children"&&l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Ps.hasOwnProperty(l)?o||(o=[]):(o=o||[]).push(l,null));for(l in i){var c=i[l];if(a=r!=null?r[l]:void 0,i.hasOwnProperty(l)&&c!==a&&(c!=null||a!=null))if(l==="style")if(a){for(s in a)!a.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(t||(t={}),t[s]="");for(s in c)c.hasOwnProperty(s)&&a[s]!==c[s]&&(t||(t={}),t[s]=c[s])}else t||(o||(o=[]),o.push(l,t)),t=c;else l==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(o=o||[]).push(l,c)):l==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(l,""+c):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&(Ps.hasOwnProperty(l)?(c!=null&&l==="onScroll"&&ot("scroll",n),o||a===c||(o=[])):(o=o||[]).push(l,c))}t&&(o=o||[]).push("style",t);var l=o;(e.updateQueue=l)&&(e.flags|=4)}};H0=function(n,e,t,i){t!==i&&(e.flags|=4)};function os(n,e){if(!ut)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function zt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function ny(n,e,t){var i=e.pendingProps;switch(ef(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return ln(e.type)&&xl(),zt(e),null;case 3:return i=e.stateNode,Io(),at(an),at(Ht),uf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(pa(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Bn!==null&&(ud(Bn),Bn=null))),nd(n,e),zt(e),null;case 5:cf(e);var r=_r(Gs.current);if(t=e.type,n!==null&&e.stateNode!=null)V0(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ue(166));return zt(e),null}if(n=_r(ii.current),pa(e)){i=e.stateNode,t=e.type;var o=e.memoizedProps;switch(i[ei]=e,i[Fs]=o,n=(e.mode&1)!==0,t){case"dialog":ot("cancel",i),ot("close",i);break;case"iframe":case"object":case"embed":ot("load",i);break;case"video":case"audio":for(r=0;r<gs.length;r++)ot(gs[r],i);break;case"source":ot("error",i);break;case"img":case"image":case"link":ot("error",i),ot("load",i);break;case"details":ot("toggle",i);break;case"input":Yf(i,o),ot("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!o.multiple},ot("invalid",i);break;case"textarea":Kf(i,o),ot("invalid",i)}Pu(t,o),r=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?i.textContent!==a&&(o.suppressHydrationWarning!==!0&&ha(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&ha(i.textContent,a,n),r=["children",""+a]):Ps.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&ot("scroll",i)}switch(t){case"input":oa(i),Zf(i,o,!0);break;case"textarea":oa(i),Jf(i);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(i.onclick=vl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{s=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=vg(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=s.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=s.createElement(t,{is:i.is}):(n=s.createElement(t),t==="select"&&(s=n,i.multiple?s.multiple=!0:i.size&&(s.size=i.size))):n=s.createElementNS(n,t),n[ei]=e,n[Fs]=i,G0(n,e,!1,!1),e.stateNode=n;e:{switch(s=Lu(t,i),t){case"dialog":ot("cancel",n),ot("close",n),r=i;break;case"iframe":case"object":case"embed":ot("load",n),r=i;break;case"video":case"audio":for(r=0;r<gs.length;r++)ot(gs[r],n);r=i;break;case"source":ot("error",n),r=i;break;case"img":case"image":case"link":ot("error",n),ot("load",n),r=i;break;case"details":ot("toggle",n),r=i;break;case"input":Yf(n,i),r=Eu(n,i),ot("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=pt({},i,{value:void 0}),ot("invalid",n);break;case"textarea":Kf(n,i),r=Tu(n,i),ot("invalid",n);break;default:r=i}Pu(t,r),a=r;for(o in a)if(a.hasOwnProperty(o)){var c=a[o];o==="style"?yg(n,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&xg(n,c)):o==="children"?typeof c=="string"?(t!=="textarea"||c!=="")&&Ls(n,c):typeof c=="number"&&Ls(n,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ps.hasOwnProperty(o)?c!=null&&o==="onScroll"&&ot("scroll",n):c!=null&&Fd(n,o,c,s))}switch(t){case"input":oa(n),Zf(n,i,!1);break;case"textarea":oa(n),Jf(n);break;case"option":i.value!=null&&n.setAttribute("value",""+Zi(i.value));break;case"select":n.multiple=!!i.multiple,o=i.value,o!=null?So(n,!!i.multiple,o,!1):i.defaultValue!=null&&So(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=vl)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return zt(e),null;case 6:if(n&&e.stateNode!=null)H0(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ue(166));if(t=_r(Gs.current),_r(ii.current),pa(e)){if(i=e.stateNode,t=e.memoizedProps,i[ei]=e,(o=i.nodeValue!==t)&&(n=_n,n!==null))switch(n.tag){case 3:ha(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&ha(i.nodeValue,t,(n.mode&1)!==0)}o&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[ei]=e,e.stateNode=i}return zt(e),null;case 13:if(at(ft),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(ut&&vn!==null&&e.mode&1&&!(e.flags&128))a0(),Do(),e.flags|=98560,o=!1;else if(o=pa(e),i!==null&&i.dehydrated!==null){if(n===null){if(!o)throw Error(ue(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(ue(317));o[ei]=e}else Do(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;zt(e),o=!1}else Bn!==null&&(ud(Bn),Bn=null),o=!0;if(!o)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||ft.current&1?Et===0&&(Et=3):Mf())),e.updateQueue!==null&&(e.flags|=4),zt(e),null);case 4:return Io(),nd(n,e),n===null&&Os(e.stateNode.containerInfo),zt(e),null;case 10:return of(e.type._context),zt(e),null;case 17:return ln(e.type)&&xl(),zt(e),null;case 19:if(at(ft),o=e.memoizedState,o===null)return zt(e),null;if(i=(e.flags&128)!==0,s=o.rendering,s===null)if(i)os(o,!1);else{if(Et!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(s=bl(n),s!==null){for(e.flags|=128,os(o,!1),i=s.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)o=t,n=i,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=n,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,n=s.dependencies,o.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return it(ft,ft.current&1|2),e.child}n=n.sibling}o.tail!==null&&xt()>ko&&(e.flags|=128,i=!0,os(o,!1),e.lanes=4194304)}else{if(!i)if(n=bl(s),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),os(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!ut)return zt(e),null}else 2*xt()-o.renderingStartTime>ko&&t!==1073741824&&(e.flags|=128,i=!0,os(o,!1),e.lanes=4194304);o.isBackwards?(s.sibling=e.child,e.child=s):(t=o.last,t!==null?t.sibling=s:e.child=s,o.last=s)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=xt(),e.sibling=null,t=ft.current,it(ft,i?t&1|2:t&1),e):(zt(e),null);case 22:case 23:return Sf(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?gn&1073741824&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),null;case 24:return null;case 25:return null}throw Error(ue(156,e.tag))}function iy(n,e){switch(ef(e),e.tag){case 1:return ln(e.type)&&xl(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Io(),at(an),at(Ht),uf(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return cf(e),null;case 13:if(at(ft),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(ue(340));Do()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return at(ft),null;case 4:return Io(),null;case 10:return of(e.type._context),null;case 22:case 23:return Sf(),null;case 24:return null;default:return null}}var va=!1,Vt=!1,ry=typeof WeakSet=="function"?WeakSet:Set,be=null;function xo(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){gt(n,e,i)}else t.current=null}function id(n,e,t){try{t()}catch(i){gt(n,e,i)}}var Gh=!1;function oy(n,e){if(Bu=pl,n=qg(),Jd(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var s=0,a=-1,c=-1,l=0,u=0,f=n,h=null;t:for(;;){for(var p;f!==t||r!==0&&f.nodeType!==3||(a=s+r),f!==o||i!==0&&f.nodeType!==3||(c=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===n)break t;if(h===t&&++l===r&&(a=s),h===o&&++u===i&&(c=s),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}t=a===-1||c===-1?null:{start:a,end:c}}else t=null}t=t||{start:0,end:0}}else t=null;for(Gu={focusedElem:n,selectionRange:t},pl=!1,be=e;be!==null;)if(e=be,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,be=n;else for(;be!==null;){e=be;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var x=_.memoizedProps,m=_.memoizedState,d=e.stateNode,v=d.getSnapshotBeforeUpdate(e.elementType===e.type?x:zn(e.type,x),m);d.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ue(163))}}catch(y){gt(e,e.return,y)}if(n=e.sibling,n!==null){n.return=e.return,be=n;break}be=e.return}return _=Gh,Gh=!1,_}function bs(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var o=r.destroy;r.destroy=void 0,o!==void 0&&id(e,t,o)}r=r.next}while(r!==i)}}function jl(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function rd(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function W0(n){var e=n.alternate;e!==null&&(n.alternate=null,W0(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[ei],delete e[Fs],delete e[Wu],delete e[G_],delete e[V_])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function j0(n){return n.tag===5||n.tag===3||n.tag===4}function Vh(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||j0(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function od(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=vl));else if(i!==4&&(n=n.child,n!==null))for(od(n,e,t),n=n.sibling;n!==null;)od(n,e,t),n=n.sibling}function sd(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(sd(n,e,t),n=n.sibling;n!==null;)sd(n,e,t),n=n.sibling}var Nt=null,Fn=!1;function Ci(n,e,t){for(t=t.child;t!==null;)X0(n,e,t),t=t.sibling}function X0(n,e,t){if(ni&&typeof ni.onCommitFiberUnmount=="function")try{ni.onCommitFiberUnmount(Ol,t)}catch{}switch(t.tag){case 5:Vt||xo(t,e);case 6:var i=Nt,r=Fn;Nt=null,Ci(n,e,t),Nt=i,Fn=r,Nt!==null&&(Fn?(n=Nt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Nt.removeChild(t.stateNode));break;case 18:Nt!==null&&(Fn?(n=Nt,t=t.stateNode,n.nodeType===8?bc(n.parentNode,t):n.nodeType===1&&bc(n,t),Is(n)):bc(Nt,t.stateNode));break;case 4:i=Nt,r=Fn,Nt=t.stateNode.containerInfo,Fn=!0,Ci(n,e,t),Nt=i,Fn=r;break;case 0:case 11:case 14:case 15:if(!Vt&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var o=r,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&id(t,e,s),r=r.next}while(r!==i)}Ci(n,e,t);break;case 1:if(!Vt&&(xo(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){gt(t,e,a)}Ci(n,e,t);break;case 21:Ci(n,e,t);break;case 22:t.mode&1?(Vt=(i=Vt)||t.memoizedState!==null,Ci(n,e,t),Vt=i):Ci(n,e,t);break;default:Ci(n,e,t)}}function Hh(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new ry),e.forEach(function(i){var r=py.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function In(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var o=n,s=e,a=s;e:for(;a!==null;){switch(a.tag){case 5:Nt=a.stateNode,Fn=!1;break e;case 3:Nt=a.stateNode.containerInfo,Fn=!0;break e;case 4:Nt=a.stateNode.containerInfo,Fn=!0;break e}a=a.return}if(Nt===null)throw Error(ue(160));X0(o,s,r),Nt=null,Fn=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(l){gt(r,e,l)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)$0(e,n),e=e.sibling}function $0(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(In(e,n),qn(n),i&4){try{bs(3,n,n.return),jl(3,n)}catch(x){gt(n,n.return,x)}try{bs(5,n,n.return)}catch(x){gt(n,n.return,x)}}break;case 1:In(e,n),qn(n),i&512&&t!==null&&xo(t,t.return);break;case 5:if(In(e,n),qn(n),i&512&&t!==null&&xo(t,t.return),n.flags&32){var r=n.stateNode;try{Ls(r,"")}catch(x){gt(n,n.return,x)}}if(i&4&&(r=n.stateNode,r!=null)){var o=n.memoizedProps,s=t!==null?t.memoizedProps:o,a=n.type,c=n.updateQueue;if(n.updateQueue=null,c!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&mg(r,o),Lu(a,s);var l=Lu(a,o);for(s=0;s<c.length;s+=2){var u=c[s],f=c[s+1];u==="style"?yg(r,f):u==="dangerouslySetInnerHTML"?xg(r,f):u==="children"?Ls(r,f):Fd(r,u,f,l)}switch(a){case"input":bu(r,o);break;case"textarea":gg(r,o);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!o.multiple;var p=o.value;p!=null?So(r,!!o.multiple,p,!1):h!==!!o.multiple&&(o.defaultValue!=null?So(r,!!o.multiple,o.defaultValue,!0):So(r,!!o.multiple,o.multiple?[]:"",!1))}r[Fs]=o}catch(x){gt(n,n.return,x)}}break;case 6:if(In(e,n),qn(n),i&4){if(n.stateNode===null)throw Error(ue(162));r=n.stateNode,o=n.memoizedProps;try{r.nodeValue=o}catch(x){gt(n,n.return,x)}}break;case 3:if(In(e,n),qn(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{Is(e.containerInfo)}catch(x){gt(n,n.return,x)}break;case 4:In(e,n),qn(n);break;case 13:In(e,n),qn(n),r=n.child,r.flags&8192&&(o=r.memoizedState!==null,r.stateNode.isHidden=o,!o||r.alternate!==null&&r.alternate.memoizedState!==null||(_f=xt())),i&4&&Hh(n);break;case 22:if(u=t!==null&&t.memoizedState!==null,n.mode&1?(Vt=(l=Vt)||u,In(e,n),Vt=l):In(e,n),qn(n),i&8192){if(l=n.memoizedState!==null,(n.stateNode.isHidden=l)&&!u&&n.mode&1)for(be=n,u=n.child;u!==null;){for(f=be=u;be!==null;){switch(h=be,p=h.child,h.tag){case 0:case 11:case 14:case 15:bs(4,h,h.return);break;case 1:xo(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,t=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(x){gt(i,t,x)}}break;case 5:xo(h,h.return);break;case 22:if(h.memoizedState!==null){jh(f);continue}}p!==null?(p.return=h,be=p):jh(f)}u=u.sibling}e:for(u=null,f=n;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,l?(o=r.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=f.stateNode,c=f.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=_g("display",s))}catch(x){gt(n,n.return,x)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=l?"":f.memoizedProps}catch(x){gt(n,n.return,x)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===n)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===n)break e;for(;f.sibling===null;){if(f.return===null||f.return===n)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:In(e,n),qn(n),i&4&&Hh(n);break;case 21:break;default:In(e,n),qn(n)}}function qn(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(j0(t)){var i=t;break e}t=t.return}throw Error(ue(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ls(r,""),i.flags&=-33);var o=Vh(n);sd(n,o,r);break;case 3:case 4:var s=i.stateNode.containerInfo,a=Vh(n);od(n,a,s);break;default:throw Error(ue(161))}}catch(c){gt(n,n.return,c)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function sy(n,e,t){be=n,q0(n)}function q0(n,e,t){for(var i=(n.mode&1)!==0;be!==null;){var r=be,o=r.child;if(r.tag===22&&i){var s=r.memoizedState!==null||va;if(!s){var a=r.alternate,c=a!==null&&a.memoizedState!==null||Vt;a=va;var l=Vt;if(va=s,(Vt=c)&&!l)for(be=r;be!==null;)s=be,c=s.child,s.tag===22&&s.memoizedState!==null?Xh(r):c!==null?(c.return=s,be=c):Xh(r);for(;o!==null;)be=o,q0(o),o=o.sibling;be=r,va=a,Vt=l}Wh(n)}else r.subtreeFlags&8772&&o!==null?(o.return=r,be=o):Wh(n)}}function Wh(n){for(;be!==null;){var e=be;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Vt||jl(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Vt)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:zn(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var o=e.updateQueue;o!==null&&Ah(e,o,i);break;case 3:var s=e.updateQueue;if(s!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Ah(e,s,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&t.focus();break;case"img":c.src&&(t.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var l=e.alternate;if(l!==null){var u=l.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Is(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ue(163))}Vt||e.flags&512&&rd(e)}catch(h){gt(e,e.return,h)}}if(e===n){be=null;break}if(t=e.sibling,t!==null){t.return=e.return,be=t;break}be=e.return}}function jh(n){for(;be!==null;){var e=be;if(e===n){be=null;break}var t=e.sibling;if(t!==null){t.return=e.return,be=t;break}be=e.return}}function Xh(n){for(;be!==null;){var e=be;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{jl(4,e)}catch(c){gt(e,t,c)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(c){gt(e,r,c)}}var o=e.return;try{rd(e)}catch(c){gt(e,o,c)}break;case 5:var s=e.return;try{rd(e)}catch(c){gt(e,s,c)}}}catch(c){gt(e,e.return,c)}if(e===n){be=null;break}var a=e.sibling;if(a!==null){a.return=e.return,be=a;break}be=e.return}}var ay=Math.ceil,Al=Ei.ReactCurrentDispatcher,vf=Ei.ReactCurrentOwner,Ln=Ei.ReactCurrentBatchConfig,Ze=0,Dt=null,Mt=null,It=0,gn=0,_o=er(0),Et=0,js=null,Pr=0,Xl=0,xf=0,Cs=null,rn=null,_f=0,ko=1/0,pi=null,Pl=!1,ad=null,ji=null,xa=!1,zi=null,Ll=0,Ts=0,ld=null,tl=-1,nl=0;function Zt(){return Ze&6?xt():tl!==-1?tl:tl=xt()}function Xi(n){return n.mode&1?Ze&2&&It!==0?It&-It:W_.transition!==null?(nl===0&&(nl=Dg()),nl):(n=Qe,n!==0||(n=window.event,n=n===void 0?16:Fg(n.type)),n):1}function Xn(n,e,t,i){if(50<Ts)throw Ts=0,ld=null,Error(ue(185));Js(n,t,i),(!(Ze&2)||n!==Dt)&&(n===Dt&&(!(Ze&2)&&(Xl|=t),Et===4&&ki(n,It)),cn(n,i),t===1&&Ze===0&&!(e.mode&1)&&(ko=xt()+500,Vl&&tr()))}function cn(n,e){var t=n.callbackNode;Wx(n,e);var i=hl(n,n===Dt?It:0);if(i===0)t!==null&&th(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&th(t),e===1)n.tag===0?H_($h.bind(null,n)):r0($h.bind(null,n)),F_(function(){!(Ze&6)&&tr()}),t=null;else{switch(Ng(i)){case 1:t=Wd;break;case 4:t=Lg;break;case 16:t=fl;break;case 536870912:t=Rg;break;default:t=fl}t=nv(t,Y0.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Y0(n,e){if(tl=-1,nl=0,Ze&6)throw Error(ue(327));var t=n.callbackNode;if(Co()&&n.callbackNode!==t)return null;var i=hl(n,n===Dt?It:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=Rl(n,i);else{e=i;var r=Ze;Ze|=2;var o=K0();(Dt!==n||It!==e)&&(pi=null,ko=xt()+500,wr(n,e));do try{uy();break}catch(a){Z0(n,a)}while(1);rf(),Al.current=o,Ze=r,Mt!==null?e=0:(Dt=null,It=0,e=Et)}if(e!==0){if(e===2&&(r=Uu(n),r!==0&&(i=r,e=cd(n,r))),e===1)throw t=js,wr(n,0),ki(n,i),cn(n,xt()),t;if(e===6)ki(n,i);else{if(r=n.current.alternate,!(i&30)&&!ly(r)&&(e=Rl(n,i),e===2&&(o=Uu(n),o!==0&&(i=o,e=cd(n,o))),e===1))throw t=js,wr(n,0),ki(n,i),cn(n,xt()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(ue(345));case 2:fr(n,rn,pi);break;case 3:if(ki(n,i),(i&130023424)===i&&(e=_f+500-xt(),10<e)){if(hl(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){Zt(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=Hu(fr.bind(null,n,rn,pi),e);break}fr(n,rn,pi);break;case 4:if(ki(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var s=31-jn(i);o=1<<s,s=e[s],s>r&&(r=s),i&=~o}if(i=r,i=xt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*ay(i/1960))-i,10<i){n.timeoutHandle=Hu(fr.bind(null,n,rn,pi),i);break}fr(n,rn,pi);break;case 5:fr(n,rn,pi);break;default:throw Error(ue(329))}}}return cn(n,xt()),n.callbackNode===t?Y0.bind(null,n):null}function cd(n,e){var t=Cs;return n.current.memoizedState.isDehydrated&&(wr(n,e).flags|=256),n=Rl(n,e),n!==2&&(e=rn,rn=t,e!==null&&ud(e)),n}function ud(n){rn===null?rn=n:rn.push.apply(rn,n)}function ly(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],o=r.getSnapshot;r=r.value;try{if(!$n(o(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ki(n,e){for(e&=~xf,e&=~Xl,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-jn(e),i=1<<t;n[t]=-1,e&=~i}}function $h(n){if(Ze&6)throw Error(ue(327));Co();var e=hl(n,0);if(!(e&1))return cn(n,xt()),null;var t=Rl(n,e);if(n.tag!==0&&t===2){var i=Uu(n);i!==0&&(e=i,t=cd(n,i))}if(t===1)throw t=js,wr(n,0),ki(n,e),cn(n,xt()),t;if(t===6)throw Error(ue(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,fr(n,rn,pi),cn(n,xt()),null}function yf(n,e){var t=Ze;Ze|=1;try{return n(e)}finally{Ze=t,Ze===0&&(ko=xt()+500,Vl&&tr())}}function Lr(n){zi!==null&&zi.tag===0&&!(Ze&6)&&Co();var e=Ze;Ze|=1;var t=Ln.transition,i=Qe;try{if(Ln.transition=null,Qe=1,n)return n()}finally{Qe=i,Ln.transition=t,Ze=e,!(Ze&6)&&tr()}}function Sf(){gn=_o.current,at(_o)}function wr(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,z_(t)),Mt!==null)for(t=Mt.return;t!==null;){var i=t;switch(ef(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&xl();break;case 3:Io(),at(an),at(Ht),uf();break;case 5:cf(i);break;case 4:Io();break;case 13:at(ft);break;case 19:at(ft);break;case 10:of(i.type._context);break;case 22:case 23:Sf()}t=t.return}if(Dt=n,Mt=n=$i(n.current,null),It=gn=e,Et=0,js=null,xf=Xl=Pr=0,rn=Cs=null,xr!==null){for(e=0;e<xr.length;e++)if(t=xr[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,o=t.pending;if(o!==null){var s=o.next;o.next=r,i.next=s}t.pending=i}xr=null}return n}function Z0(n,e){do{var t=Mt;try{if(rf(),Ja.current=Tl,Cl){for(var i=ht.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Cl=!1}if(Ar=0,Lt=wt=ht=null,Es=!1,Vs=0,vf.current=null,t===null||t.return===null){Et=1,js=e,Mt=null;break}e:{var o=n,s=t.return,a=t,c=e;if(e=It,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var l=c,u=a,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Ih(s);if(p!==null){p.flags&=-257,Uh(p,s,a,o,e),p.mode&1&&Nh(o,l,e),e=p,c=l;var _=e.updateQueue;if(_===null){var x=new Set;x.add(c),e.updateQueue=x}else _.add(c);break e}else{if(!(e&1)){Nh(o,l,e),Mf();break e}c=Error(ue(426))}}else if(ut&&a.mode&1){var m=Ih(s);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Uh(m,s,a,o,e),tf(Uo(c,a));break e}}o=c=Uo(c,a),Et!==4&&(Et=2),Cs===null?Cs=[o]:Cs.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,e&=-e,o.lanes|=e;var d=N0(o,c,e);Th(o,d);break e;case 1:a=c;var v=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof v.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(ji===null||!ji.has(g)))){o.flags|=65536,e&=-e,o.lanes|=e;var y=I0(o,a,e);Th(o,y);break e}}o=o.return}while(o!==null)}Q0(t)}catch(M){e=M,Mt===t&&t!==null&&(Mt=t=t.return);continue}break}while(1)}function K0(){var n=Al.current;return Al.current=Tl,n===null?Tl:n}function Mf(){(Et===0||Et===3||Et===2)&&(Et=4),Dt===null||!(Pr&268435455)&&!(Xl&268435455)||ki(Dt,It)}function Rl(n,e){var t=Ze;Ze|=2;var i=K0();(Dt!==n||It!==e)&&(pi=null,wr(n,e));do try{cy();break}catch(r){Z0(n,r)}while(1);if(rf(),Ze=t,Al.current=i,Mt!==null)throw Error(ue(261));return Dt=null,It=0,Et}function cy(){for(;Mt!==null;)J0(Mt)}function uy(){for(;Mt!==null&&!Ux();)J0(Mt)}function J0(n){var e=tv(n.alternate,n,gn);n.memoizedProps=n.pendingProps,e===null?Q0(n):Mt=e,vf.current=null}function Q0(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=iy(t,e),t!==null){t.flags&=32767,Mt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Et=6,Mt=null;return}}else if(t=ny(t,e,gn),t!==null){Mt=t;return}if(e=e.sibling,e!==null){Mt=e;return}Mt=e=n}while(e!==null);Et===0&&(Et=5)}function fr(n,e,t){var i=Qe,r=Ln.transition;try{Ln.transition=null,Qe=1,dy(n,e,t,i)}finally{Ln.transition=r,Qe=i}return null}function dy(n,e,t,i){do Co();while(zi!==null);if(Ze&6)throw Error(ue(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(ue(177));n.callbackNode=null,n.callbackPriority=0;var o=t.lanes|t.childLanes;if(jx(n,o),n===Dt&&(Mt=Dt=null,It=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||xa||(xa=!0,nv(fl,function(){return Co(),null})),o=(t.flags&15990)!==0,t.subtreeFlags&15990||o){o=Ln.transition,Ln.transition=null;var s=Qe;Qe=1;var a=Ze;Ze|=4,vf.current=null,oy(n,t),$0(t,n),R_(Gu),pl=!!Bu,Gu=Bu=null,n.current=t,sy(t),kx(),Ze=a,Qe=s,Ln.transition=o}else n.current=t;if(xa&&(xa=!1,zi=n,Ll=r),o=n.pendingLanes,o===0&&(ji=null),Fx(t.stateNode),cn(n,xt()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(Pl)throw Pl=!1,n=ad,ad=null,n;return Ll&1&&n.tag!==0&&Co(),o=n.pendingLanes,o&1?n===ld?Ts++:(Ts=0,ld=n):Ts=0,tr(),null}function Co(){if(zi!==null){var n=Ng(Ll),e=Ln.transition,t=Qe;try{if(Ln.transition=null,Qe=16>n?16:n,zi===null)var i=!1;else{if(n=zi,zi=null,Ll=0,Ze&6)throw Error(ue(331));var r=Ze;for(Ze|=4,be=n.current;be!==null;){var o=be,s=o.child;if(be.flags&16){var a=o.deletions;if(a!==null){for(var c=0;c<a.length;c++){var l=a[c];for(be=l;be!==null;){var u=be;switch(u.tag){case 0:case 11:case 15:bs(8,u,o)}var f=u.child;if(f!==null)f.return=u,be=f;else for(;be!==null;){u=be;var h=u.sibling,p=u.return;if(W0(u),u===l){be=null;break}if(h!==null){h.return=p,be=h;break}be=p}}}var _=o.alternate;if(_!==null){var x=_.child;if(x!==null){_.child=null;do{var m=x.sibling;x.sibling=null,x=m}while(x!==null)}}be=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,be=s;else e:for(;be!==null;){if(o=be,o.flags&2048)switch(o.tag){case 0:case 11:case 15:bs(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,be=d;break e}be=o.return}}var v=n.current;for(be=v;be!==null;){s=be;var g=s.child;if(s.subtreeFlags&2064&&g!==null)g.return=s,be=g;else e:for(s=v;be!==null;){if(a=be,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:jl(9,a)}}catch(M){gt(a,a.return,M)}if(a===s){be=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,be=y;break e}be=a.return}}if(Ze=r,tr(),ni&&typeof ni.onPostCommitFiberRoot=="function")try{ni.onPostCommitFiberRoot(Ol,n)}catch{}i=!0}return i}finally{Qe=t,Ln.transition=e}}return!1}function qh(n,e,t){e=Uo(t,e),e=N0(n,e,1),n=Wi(n,e,1),e=Zt(),n!==null&&(Js(n,1,e),cn(n,e))}function gt(n,e,t){if(n.tag===3)qh(n,n,t);else for(;e!==null;){if(e.tag===3){qh(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ji===null||!ji.has(i))){n=Uo(t,n),n=I0(e,n,1),e=Wi(e,n,1),n=Zt(),e!==null&&(Js(e,1,n),cn(e,n));break}}e=e.return}}function fy(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=Zt(),n.pingedLanes|=n.suspendedLanes&t,Dt===n&&(It&t)===t&&(Et===4||Et===3&&(It&130023424)===It&&500>xt()-_f?wr(n,0):xf|=t),cn(n,e)}function ev(n,e){e===0&&(n.mode&1?(e=la,la<<=1,!(la&130023424)&&(la=4194304)):e=1);var t=Zt();n=Mi(n,e),n!==null&&(Js(n,e,t),cn(n,t))}function hy(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),ev(n,t)}function py(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(ue(314))}i!==null&&i.delete(e),ev(n,t)}var tv;tv=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||an.current)sn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return sn=!1,ty(n,e,t);sn=!!(n.flags&131072)}else sn=!1,ut&&e.flags&1048576&&o0(e,Sl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;el(n,e),n=e.pendingProps;var r=Ro(e,Ht.current);bo(e,t),r=ff(null,e,i,n,r,t);var o=hf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ln(i)?(o=!0,_l(e)):o=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,af(e),r.updater=Wl,e.stateNode=r,r._reactInternals=e,Zu(e,i,n,t),e=Qu(null,e,i,!0,o,t)):(e.tag=0,ut&&o&&Qd(e),$t(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(el(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=gy(i),n=zn(i,n),r){case 0:e=Ju(null,e,i,n,t);break e;case 1:e=zh(null,e,i,n,t);break e;case 11:e=kh(null,e,i,n,t);break e;case 14:e=Oh(null,e,i,zn(i.type,n),t);break e}throw Error(ue(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),Ju(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),zh(n,e,i,r,t);case 3:e:{if(z0(e),n===null)throw Error(ue(387));i=e.pendingProps,o=e.memoizedState,r=o.element,d0(n,e),El(e,i,null,t);var s=e.memoizedState;if(i=s.element,o.isDehydrated)if(o={element:i,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},e.updateQueue.baseState=o,e.memoizedState=o,e.flags&256){r=Uo(Error(ue(423)),e),e=Fh(n,e,i,t,r);break e}else if(i!==r){r=Uo(Error(ue(424)),e),e=Fh(n,e,i,t,r);break e}else for(vn=Hi(e.stateNode.containerInfo.firstChild),_n=e,ut=!0,Bn=null,t=c0(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Do(),i===r){e=wi(n,e,t);break e}$t(n,e,i,t)}e=e.child}return e;case 5:return f0(e),n===null&&$u(e),i=e.type,r=e.pendingProps,o=n!==null?n.memoizedProps:null,s=r.children,Vu(i,r)?s=null:o!==null&&Vu(i,o)&&(e.flags|=32),O0(n,e),$t(n,e,s,t),e.child;case 6:return n===null&&$u(e),null;case 13:return F0(n,e,t);case 4:return lf(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=No(e,null,i,t):$t(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),kh(n,e,i,r,t);case 7:return $t(n,e,e.pendingProps,t),e.child;case 8:return $t(n,e,e.pendingProps.children,t),e.child;case 12:return $t(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,o=e.memoizedProps,s=r.value,it(Ml,i._currentValue),i._currentValue=s,o!==null)if($n(o.value,s)){if(o.children===r.children&&!an.current){e=wi(n,e,t);break e}}else for(o=e.child,o!==null&&(o.return=e);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var c=a.firstContext;c!==null;){if(c.context===i){if(o.tag===1){c=xi(-1,t&-t),c.tag=2;var l=o.updateQueue;if(l!==null){l=l.shared;var u=l.pending;u===null?c.next=c:(c.next=u.next,u.next=c),l.pending=c}}o.lanes|=t,c=o.alternate,c!==null&&(c.lanes|=t),qu(o.return,t,e),a.lanes|=t;break}c=c.next}}else if(o.tag===10)s=o.type===e.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(ue(341));s.lanes|=t,a=s.alternate,a!==null&&(a.lanes|=t),qu(s,t,e),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===e){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}$t(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,bo(e,t),r=Rn(r),i=i(r),e.flags|=1,$t(n,e,i,t),e.child;case 14:return i=e.type,r=zn(i,e.pendingProps),r=zn(i.type,r),Oh(n,e,i,r,t);case 15:return U0(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:zn(i,r),el(n,e),e.tag=1,ln(i)?(n=!0,_l(e)):n=!1,bo(e,t),D0(e,i,r),Zu(e,i,r,t),Qu(null,e,i,!0,n,t);case 19:return B0(n,e,t);case 22:return k0(n,e,t)}throw Error(ue(156,e.tag))};function nv(n,e){return Pg(n,e)}function my(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pn(n,e,t,i){return new my(n,e,t,i)}function wf(n){return n=n.prototype,!(!n||!n.isReactComponent)}function gy(n){if(typeof n=="function")return wf(n)?1:0;if(n!=null){if(n=n.$$typeof,n===Gd)return 11;if(n===Vd)return 14}return 2}function $i(n,e){var t=n.alternate;return t===null?(t=Pn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function il(n,e,t,i,r,o){var s=2;if(i=n,typeof n=="function")wf(n)&&(s=1);else if(typeof n=="string")s=5;else e:switch(n){case lo:return Er(t.children,r,o,e);case Bd:s=8,r|=8;break;case yu:return n=Pn(12,t,e,r|2),n.elementType=yu,n.lanes=o,n;case Su:return n=Pn(13,t,e,r),n.elementType=Su,n.lanes=o,n;case Mu:return n=Pn(19,t,e,r),n.elementType=Mu,n.lanes=o,n;case fg:return $l(t,r,o,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case ug:s=10;break e;case dg:s=9;break e;case Gd:s=11;break e;case Vd:s=14;break e;case Di:s=16,i=null;break e}throw Error(ue(130,n==null?n:typeof n,""))}return e=Pn(s,t,e,r),e.elementType=n,e.type=i,e.lanes=o,e}function Er(n,e,t,i){return n=Pn(7,n,i,e),n.lanes=t,n}function $l(n,e,t,i){return n=Pn(22,n,i,e),n.elementType=fg,n.lanes=t,n.stateNode={isHidden:!1},n}function Nc(n,e,t){return n=Pn(6,n,null,e),n.lanes=t,n}function Ic(n,e,t){return e=Pn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function vy(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pc(0),this.expirationTimes=pc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Ef(n,e,t,i,r,o,s,a,c){return n=new vy(n,e,t,a,c),e===1?(e=1,o===!0&&(e|=8)):e=0,o=Pn(3,null,null,e),n.current=o,o.stateNode=n,o.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},af(o),n}function xy(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ao,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function iv(n){if(!n)return Ki;n=n._reactInternals;e:{if(zr(n)!==n||n.tag!==1)throw Error(ue(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ln(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ue(171))}if(n.tag===1){var t=n.type;if(ln(t))return i0(n,t,e)}return e}function rv(n,e,t,i,r,o,s,a,c){return n=Ef(t,i,!0,n,r,o,s,a,c),n.context=iv(null),t=n.current,i=Zt(),r=Xi(t),o=xi(i,r),o.callback=e??null,Wi(t,o,r),n.current.lanes=r,Js(n,r,i),cn(n,i),n}function ql(n,e,t,i){var r=e.current,o=Zt(),s=Xi(r);return t=iv(t),e.context===null?e.context=t:e.pendingContext=t,e=xi(o,s),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=Wi(r,e,s),n!==null&&(Xn(n,r,s,o),Ka(n,r,s)),s}function Dl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Yh(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function bf(n,e){Yh(n,e),(n=n.alternate)&&Yh(n,e)}function _y(){return null}var ov=typeof reportError=="function"?reportError:function(n){console.error(n)};function Cf(n){this._internalRoot=n}Yl.prototype.render=Cf.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(ue(409));ql(n,e,null,null)};Yl.prototype.unmount=Cf.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Lr(function(){ql(null,n,null,null)}),e[Si]=null}};function Yl(n){this._internalRoot=n}Yl.prototype.unstable_scheduleHydration=function(n){if(n){var e=kg();n={blockedOn:null,target:n,priority:e};for(var t=0;t<Ui.length&&e!==0&&e<Ui[t].priority;t++);Ui.splice(t,0,n),t===0&&zg(n)}};function Tf(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Zl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Zh(){}function yy(n,e,t,i,r){if(r){if(typeof i=="function"){var o=i;i=function(){var l=Dl(s);o.call(l)}}var s=rv(e,i,n,0,null,!1,!1,"",Zh);return n._reactRootContainer=s,n[Si]=s.current,Os(n.nodeType===8?n.parentNode:n),Lr(),s}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var l=Dl(c);a.call(l)}}var c=Ef(n,0,!1,null,null,!1,!1,"",Zh);return n._reactRootContainer=c,n[Si]=c.current,Os(n.nodeType===8?n.parentNode:n),Lr(function(){ql(e,c,t,i)}),c}function Kl(n,e,t,i,r){var o=t._reactRootContainer;if(o){var s=o;if(typeof r=="function"){var a=r;r=function(){var c=Dl(s);a.call(c)}}ql(e,s,n,r)}else s=yy(t,e,n,r,i);return Dl(s)}Ig=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=ms(e.pendingLanes);t!==0&&(jd(e,t|1),cn(e,xt()),!(Ze&6)&&(ko=xt()+500,tr()))}break;case 13:Lr(function(){var i=Mi(n,1);if(i!==null){var r=Zt();Xn(i,n,1,r)}}),bf(n,1)}};Xd=function(n){if(n.tag===13){var e=Mi(n,134217728);if(e!==null){var t=Zt();Xn(e,n,134217728,t)}bf(n,134217728)}};Ug=function(n){if(n.tag===13){var e=Xi(n),t=Mi(n,e);if(t!==null){var i=Zt();Xn(t,n,e,i)}bf(n,e)}};kg=function(){return Qe};Og=function(n,e){var t=Qe;try{return Qe=n,e()}finally{Qe=t}};Du=function(n,e,t){switch(e){case"input":if(bu(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=Gl(i);if(!r)throw Error(ue(90));pg(i),bu(i,r)}}}break;case"textarea":gg(n,t);break;case"select":e=t.value,e!=null&&So(n,!!t.multiple,e,!1)}};wg=yf;Eg=Lr;var Sy={usingClientEntryPoint:!1,Events:[ea,ho,Gl,Sg,Mg,yf]},ss={findFiberByHostInstance:vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},My={bundleType:ss.bundleType,version:ss.version,rendererPackageName:ss.rendererPackageName,rendererConfig:ss.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ei.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Tg(n),n===null?null:n.stateNode},findFiberByHostInstance:ss.findFiberByHostInstance||_y,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _a=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_a.isDisabled&&_a.supportsFiber)try{Ol=_a.inject(My),ni=_a}catch{}}Mn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sy;Mn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Tf(e))throw Error(ue(200));return xy(n,e,null,t)};Mn.createRoot=function(n,e){if(!Tf(n))throw Error(ue(299));var t=!1,i="",r=ov;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Ef(n,1,!1,null,null,t,!1,i,r),n[Si]=e.current,Os(n.nodeType===8?n.parentNode:n),new Cf(e)};Mn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(ue(188)):(n=Object.keys(n).join(","),Error(ue(268,n)));return n=Tg(e),n=n===null?null:n.stateNode,n};Mn.flushSync=function(n){return Lr(n)};Mn.hydrate=function(n,e,t){if(!Zl(e))throw Error(ue(200));return Kl(null,n,e,!0,t)};Mn.hydrateRoot=function(n,e,t){if(!Tf(n))throw Error(ue(405));var i=t!=null&&t.hydratedSources||null,r=!1,o="",s=ov;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),e=rv(e,null,n,1,t??null,r,!1,o,s),n[Si]=e.current,Os(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new Yl(e)};Mn.render=function(n,e,t){if(!Zl(e))throw Error(ue(200));return Kl(null,n,e,!1,t)};Mn.unmountComponentAtNode=function(n){if(!Zl(n))throw Error(ue(40));return n._reactRootContainer?(Lr(function(){Kl(null,null,n,!1,function(){n._reactRootContainer=null,n[Si]=null})}),!0):!1};Mn.unstable_batchedUpdates=yf;Mn.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!Zl(t))throw Error(ue(200));if(n==null||n._reactInternals===void 0)throw Error(ue(38));return Kl(n,e,t,!1,i)};Mn.version="18.3.1-next-f1338f8080-20240426";function sv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sv)}catch(n){console.error(n)}}sv(),sg.exports=Mn;var wy=sg.exports,Kh=wy;xu.createRoot=Kh.createRoot,xu.hydrateRoot=Kh.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Xs(){return Xs=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n},Xs.apply(this,arguments)}var Fi;(function(n){n.Pop="POP",n.Push="PUSH",n.Replace="REPLACE"})(Fi||(Fi={}));const Jh="popstate";function Ey(n){n===void 0&&(n={});function e(i,r){let{pathname:o,search:s,hash:a}=i.location;return dd("",{pathname:o,search:s,hash:a},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function t(i,r){return typeof r=="string"?r:Nl(r)}return Cy(e,t,null,n)}function _t(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function av(n,e){if(!n){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function by(){return Math.random().toString(36).substr(2,8)}function Qh(n,e){return{usr:n.state,key:n.key,idx:e}}function dd(n,e,t,i){return t===void 0&&(t=null),Xs({pathname:typeof n=="string"?n:n.pathname,search:"",hash:""},typeof e=="string"?jo(e):e,{state:t,key:e&&e.key||i||by()})}function Nl(n){let{pathname:e="/",search:t="",hash:i=""}=n;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function jo(n){let e={};if(n){let t=n.indexOf("#");t>=0&&(e.hash=n.substr(t),n=n.substr(0,t));let i=n.indexOf("?");i>=0&&(e.search=n.substr(i),n=n.substr(0,i)),n&&(e.pathname=n)}return e}function Cy(n,e,t,i){i===void 0&&(i={});let{window:r=document.defaultView,v5Compat:o=!1}=i,s=r.history,a=Fi.Pop,c=null,l=u();l==null&&(l=0,s.replaceState(Xs({},s.state,{idx:l}),""));function u(){return(s.state||{idx:null}).idx}function f(){a=Fi.Pop;let m=u(),d=m==null?null:m-l;l=m,c&&c({action:a,location:x.location,delta:d})}function h(m,d){a=Fi.Push;let v=dd(x.location,m,d);t&&t(v,m),l=u()+1;let g=Qh(v,l),y=x.createHref(v);try{s.pushState(g,"",y)}catch(M){if(M instanceof DOMException&&M.name==="DataCloneError")throw M;r.location.assign(y)}o&&c&&c({action:a,location:x.location,delta:1})}function p(m,d){a=Fi.Replace;let v=dd(x.location,m,d);t&&t(v,m),l=u();let g=Qh(v,l),y=x.createHref(v);s.replaceState(g,"",y),o&&c&&c({action:a,location:x.location,delta:0})}function _(m){let d=r.location.origin!=="null"?r.location.origin:r.location.href,v=typeof m=="string"?m:Nl(m);return v=v.replace(/ $/,"%20"),_t(d,"No window.location.(origin|href) available to create URL for href: "+v),new URL(v,d)}let x={get action(){return a},get location(){return n(r,s)},listen(m){if(c)throw new Error("A history only accepts one active listener");return r.addEventListener(Jh,f),c=m,()=>{r.removeEventListener(Jh,f),c=null}},createHref(m){return e(r,m)},createURL:_,encodeLocation(m){let d=_(m);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:p,go(m){return s.go(m)}};return x}var ep;(function(n){n.data="data",n.deferred="deferred",n.redirect="redirect",n.error="error"})(ep||(ep={}));function Ty(n,e,t){return t===void 0&&(t="/"),Ay(n,e,t,!1)}function Ay(n,e,t,i){let r=typeof e=="string"?jo(e):e,o=Af(r.pathname||"/",t);if(o==null)return null;let s=lv(n);Py(s);let a=null;for(let c=0;a==null&&c<s.length;++c){let l=By(o);a=zy(s[c],l,i)}return a}function lv(n,e,t,i){e===void 0&&(e=[]),t===void 0&&(t=[]),i===void 0&&(i="");let r=(o,s,a)=>{let c={relativePath:a===void 0?o.path||"":a,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};c.relativePath.startsWith("/")&&(_t(c.relativePath.startsWith(i),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(i.length));let l=qi([i,c.relativePath]),u=t.concat(c);o.children&&o.children.length>0&&(_t(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+l+'".')),lv(o.children,e,u,l)),!(o.path==null&&!o.index)&&e.push({path:l,score:ky(l,o.index),routesMeta:u})};return n.forEach((o,s)=>{var a;if(o.path===""||!((a=o.path)!=null&&a.includes("?")))r(o,s);else for(let c of cv(o.path))r(o,s,c)}),e}function cv(n){let e=n.split("/");if(e.length===0)return[];let[t,...i]=e,r=t.endsWith("?"),o=t.replace(/\?$/,"");if(i.length===0)return r?[o,""]:[o];let s=cv(i.join("/")),a=[];return a.push(...s.map(c=>c===""?o:[o,c].join("/"))),r&&a.push(...s),a.map(c=>n.startsWith("/")&&c===""?"/":c)}function Py(n){n.sort((e,t)=>e.score!==t.score?t.score-e.score:Oy(e.routesMeta.map(i=>i.childrenIndex),t.routesMeta.map(i=>i.childrenIndex)))}const Ly=/^:[\w-]+$/,Ry=3,Dy=2,Ny=1,Iy=10,Uy=-2,tp=n=>n==="*";function ky(n,e){let t=n.split("/"),i=t.length;return t.some(tp)&&(i+=Uy),e&&(i+=Dy),t.filter(r=>!tp(r)).reduce((r,o)=>r+(Ly.test(o)?Ry:o===""?Ny:Iy),i)}function Oy(n,e){return n.length===e.length&&n.slice(0,-1).every((i,r)=>i===e[r])?n[n.length-1]-e[e.length-1]:0}function zy(n,e,t){t===void 0&&(t=!1);let{routesMeta:i}=n,r={},o="/",s=[];for(let a=0;a<i.length;++a){let c=i[a],l=a===i.length-1,u=o==="/"?e:e.slice(o.length)||"/",f=np({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},u),h=c.route;if(!f&&l&&t&&!i[i.length-1].route.index&&(f=np({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},u)),!f)return null;Object.assign(r,f.params),s.push({params:r,pathname:qi([o,f.pathname]),pathnameBase:Wy(qi([o,f.pathnameBase])),route:h}),f.pathnameBase!=="/"&&(o=qi([o,f.pathnameBase]))}return s}function np(n,e){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[t,i]=Fy(n.path,n.caseSensitive,n.end),r=e.match(t);if(!r)return null;let o=r[0],s=o.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:i.reduce((l,u,f)=>{let{paramName:h,isOptional:p}=u;if(h==="*"){let x=a[f]||"";s=o.slice(0,o.length-x.length).replace(/(.)\/+$/,"$1")}const _=a[f];return p&&!_?l[h]=void 0:l[h]=(_||"").replace(/%2F/g,"/"),l},{}),pathname:o,pathnameBase:s,pattern:n}}function Fy(n,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),av(n==="*"||!n.endsWith("*")||n.endsWith("/*"),'Route path "'+n+'" will be treated as if it were '+('"'+n.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+n.replace(/\*$/,"/*")+'".'));let i=[],r="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,a,c)=>(i.push({paramName:a,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return n.endsWith("*")?(i.push({paramName:"*"}),r+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?r+="\\/*$":n!==""&&n!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function By(n){try{return n.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return av(!1,'The URL path "'+n+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),n}}function Af(n,e){if(e==="/")return n;if(!n.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,i=n.charAt(t);return i&&i!=="/"?null:n.slice(t)||"/"}function Gy(n,e){e===void 0&&(e="/");let{pathname:t,search:i="",hash:r=""}=typeof n=="string"?jo(n):n;return{pathname:t?t.startsWith("/")?t:Vy(t,e):e,search:jy(i),hash:Xy(r)}}function Vy(n,e){let t=e.replace(/\/+$/,"").split("/");return n.split("/").forEach(r=>{r===".."?t.length>1&&t.pop():r!=="."&&t.push(r)}),t.length>1?t.join("/"):"/"}function Uc(n,e,t,i){return"Cannot include a '"+n+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Hy(n){return n.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Pf(n,e){let t=Hy(n);return e?t.map((i,r)=>r===t.length-1?i.pathname:i.pathnameBase):t.map(i=>i.pathnameBase)}function Lf(n,e,t,i){i===void 0&&(i=!1);let r;typeof n=="string"?r=jo(n):(r=Xs({},n),_t(!r.pathname||!r.pathname.includes("?"),Uc("?","pathname","search",r)),_t(!r.pathname||!r.pathname.includes("#"),Uc("#","pathname","hash",r)),_t(!r.search||!r.search.includes("#"),Uc("#","search","hash",r)));let o=n===""||r.pathname==="",s=o?"/":r.pathname,a;if(s==null)a=t;else{let f=e.length-1;if(!i&&s.startsWith("..")){let h=s.split("/");for(;h[0]==="..";)h.shift(),f-=1;r.pathname=h.join("/")}a=f>=0?e[f]:"/"}let c=Gy(r,a),l=s&&s!=="/"&&s.endsWith("/"),u=(o||s===".")&&t.endsWith("/");return!c.pathname.endsWith("/")&&(l||u)&&(c.pathname+="/"),c}const qi=n=>n.join("/").replace(/\/\/+/g,"/"),Wy=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),jy=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,Xy=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n;function $y(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}const uv=["post","put","patch","delete"];new Set(uv);const qy=["get",...uv];new Set(qy);/**
 * React Router v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function $s(){return $s=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n},$s.apply(this,arguments)}const Rf=z.createContext(null),Yy=z.createContext(null),nr=z.createContext(null),Jl=z.createContext(null),ir=z.createContext({outlet:null,matches:[],isDataRoute:!1}),dv=z.createContext(null);function Zy(n,e){let{relative:t}=e===void 0?{}:e;Xo()||_t(!1);let{basename:i,navigator:r}=z.useContext(nr),{hash:o,pathname:s,search:a}=hv(n,{relative:t}),c=s;return i!=="/"&&(c=s==="/"?i:qi([i,s])),r.createHref({pathname:c,search:a,hash:o})}function Xo(){return z.useContext(Jl)!=null}function $o(){return Xo()||_t(!1),z.useContext(Jl).location}function fv(n){z.useContext(nr).static||z.useLayoutEffect(n)}function qo(){let{isDataRoute:n}=z.useContext(ir);return n?cS():Ky()}function Ky(){Xo()||_t(!1);let n=z.useContext(Rf),{basename:e,future:t,navigator:i}=z.useContext(nr),{matches:r}=z.useContext(ir),{pathname:o}=$o(),s=JSON.stringify(Pf(r,t.v7_relativeSplatPath)),a=z.useRef(!1);return fv(()=>{a.current=!0}),z.useCallback(function(l,u){if(u===void 0&&(u={}),!a.current)return;if(typeof l=="number"){i.go(l);return}let f=Lf(l,JSON.parse(s),o,u.relative==="path");n==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:qi([e,f.pathname])),(u.replace?i.replace:i.push)(f,u.state,u)},[e,i,s,o,n])}function hv(n,e){let{relative:t}=e===void 0?{}:e,{future:i}=z.useContext(nr),{matches:r}=z.useContext(ir),{pathname:o}=$o(),s=JSON.stringify(Pf(r,i.v7_relativeSplatPath));return z.useMemo(()=>Lf(n,JSON.parse(s),o,t==="path"),[n,s,o,t])}function Jy(n,e){return Qy(n,e)}function Qy(n,e,t,i){Xo()||_t(!1);let{navigator:r,static:o}=z.useContext(nr),{matches:s}=z.useContext(ir),a=s[s.length-1],c=a?a.params:{};a&&a.pathname;let l=a?a.pathnameBase:"/";a&&a.route;let u=$o(),f;if(e){var h;let d=typeof e=="string"?jo(e):e;l==="/"||(h=d.pathname)!=null&&h.startsWith(l)||_t(!1),f=d}else f=u;let p=f.pathname||"/",_=p;if(l!=="/"){let d=l.replace(/^\//,"").split("/");_="/"+p.replace(/^\//,"").split("/").slice(d.length).join("/")}let x=!o&&t&&t.matches&&t.matches.length>0?t.matches:Ty(n,{pathname:_}),m=rS(x&&x.map(d=>Object.assign({},d,{params:Object.assign({},c,d.params),pathname:qi([l,r.encodeLocation?r.encodeLocation(d.pathname).pathname:d.pathname]),pathnameBase:d.pathnameBase==="/"?l:qi([l,r.encodeLocation?r.encodeLocation(d.pathnameBase).pathname:d.pathnameBase])})),s,t,i);return e&&m?z.createElement(Jl.Provider,{value:{location:$s({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:Fi.Pop}},m):m}function eS(){let n=lS(),e=$y(n)?n.status+" "+n.statusText:n instanceof Error?n.message:JSON.stringify(n),t=n instanceof Error?n.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},o=null;return z.createElement(z.Fragment,null,z.createElement("h2",null,"Unexpected Application Error!"),z.createElement("h3",{style:{fontStyle:"italic"}},e),t?z.createElement("pre",{style:r},t):null,o)}const tS=z.createElement(eS,null);class nS extends z.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?z.createElement(ir.Provider,{value:this.props.routeContext},z.createElement(dv.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function iS(n){let{routeContext:e,match:t,children:i}=n,r=z.useContext(Rf);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),z.createElement(ir.Provider,{value:e},i)}function rS(n,e,t,i){var r;if(e===void 0&&(e=[]),t===void 0&&(t=null),i===void 0&&(i=null),n==null){var o;if(!t)return null;if(t.errors)n=t.matches;else if((o=i)!=null&&o.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)n=t.matches;else return null}let s=n,a=(r=t)==null?void 0:r.errors;if(a!=null){let u=s.findIndex(f=>f.route.id&&(a==null?void 0:a[f.route.id])!==void 0);u>=0||_t(!1),s=s.slice(0,Math.min(s.length,u+1))}let c=!1,l=-1;if(t&&i&&i.v7_partialHydration)for(let u=0;u<s.length;u++){let f=s[u];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(l=u),f.route.id){let{loaderData:h,errors:p}=t,_=f.route.loader&&h[f.route.id]===void 0&&(!p||p[f.route.id]===void 0);if(f.route.lazy||_){c=!0,l>=0?s=s.slice(0,l+1):s=[s[0]];break}}}return s.reduceRight((u,f,h)=>{let p,_=!1,x=null,m=null;t&&(p=a&&f.route.id?a[f.route.id]:void 0,x=f.route.errorElement||tS,c&&(l<0&&h===0?(uS("route-fallback",!1),_=!0,m=null):l===h&&(_=!0,m=f.route.hydrateFallbackElement||null)));let d=e.concat(s.slice(0,h+1)),v=()=>{let g;return p?g=x:_?g=m:f.route.Component?g=z.createElement(f.route.Component,null):f.route.element?g=f.route.element:g=u,z.createElement(iS,{match:f,routeContext:{outlet:u,matches:d,isDataRoute:t!=null},children:g})};return t&&(f.route.ErrorBoundary||f.route.errorElement||h===0)?z.createElement(nS,{location:t.location,revalidation:t.revalidation,component:x,error:p,children:v(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):v()},null)}var pv=function(n){return n.UseBlocker="useBlocker",n.UseRevalidator="useRevalidator",n.UseNavigateStable="useNavigate",n}(pv||{}),Il=function(n){return n.UseBlocker="useBlocker",n.UseLoaderData="useLoaderData",n.UseActionData="useActionData",n.UseRouteError="useRouteError",n.UseNavigation="useNavigation",n.UseRouteLoaderData="useRouteLoaderData",n.UseMatches="useMatches",n.UseRevalidator="useRevalidator",n.UseNavigateStable="useNavigate",n.UseRouteId="useRouteId",n}(Il||{});function oS(n){let e=z.useContext(Rf);return e||_t(!1),e}function sS(n){let e=z.useContext(Yy);return e||_t(!1),e}function aS(n){let e=z.useContext(ir);return e||_t(!1),e}function mv(n){let e=aS(),t=e.matches[e.matches.length-1];return t.route.id||_t(!1),t.route.id}function lS(){var n;let e=z.useContext(dv),t=sS(Il.UseRouteError),i=mv(Il.UseRouteError);return e!==void 0?e:(n=t.errors)==null?void 0:n[i]}function cS(){let{router:n}=oS(pv.UseNavigateStable),e=mv(Il.UseNavigateStable),t=z.useRef(!1);return fv(()=>{t.current=!0}),z.useCallback(function(r,o){o===void 0&&(o={}),t.current&&(typeof r=="number"?n.navigate(r):n.navigate(r,$s({fromRouteId:e},o)))},[n,e])}const ip={};function uS(n,e,t){!e&&!ip[n]&&(ip[n]=!0)}function dS(n,e){n==null||n.v7_startTransition,(n==null?void 0:n.v7_relativeSplatPath)===void 0&&(!e||e.v7_relativeSplatPath),e&&(e.v7_fetcherPersist,e.v7_normalizeFormMethod,e.v7_partialHydration,e.v7_skipActionErrorRevalidation)}function fS(n){let{to:e,replace:t,state:i,relative:r}=n;Xo()||_t(!1);let{future:o,static:s}=z.useContext(nr),{matches:a}=z.useContext(ir),{pathname:c}=$o(),l=qo(),u=Lf(e,Pf(a,o.v7_relativeSplatPath),c,r==="path"),f=JSON.stringify(u);return z.useEffect(()=>l(JSON.parse(f),{replace:t,state:i,relative:r}),[l,f,r,t,i]),null}function hi(n){_t(!1)}function hS(n){let{basename:e="/",children:t=null,location:i,navigationType:r=Fi.Pop,navigator:o,static:s=!1,future:a}=n;Xo()&&_t(!1);let c=e.replace(/^\/*/,"/"),l=z.useMemo(()=>({basename:c,navigator:o,static:s,future:$s({v7_relativeSplatPath:!1},a)}),[c,a,o,s]);typeof i=="string"&&(i=jo(i));let{pathname:u="/",search:f="",hash:h="",state:p=null,key:_="default"}=i,x=z.useMemo(()=>{let m=Af(u,c);return m==null?null:{location:{pathname:m,search:f,hash:h,state:p,key:_},navigationType:r}},[c,u,f,h,p,_,r]);return x==null?null:z.createElement(nr.Provider,{value:l},z.createElement(Jl.Provider,{children:t,value:x}))}function pS(n){let{children:e,location:t}=n;return Jy(fd(e),t)}new Promise(()=>{});function fd(n,e){e===void 0&&(e=[]);let t=[];return z.Children.forEach(n,(i,r)=>{if(!z.isValidElement(i))return;let o=[...e,r];if(i.type===z.Fragment){t.push.apply(t,fd(i.props.children,o));return}i.type!==hi&&_t(!1),!i.props.index||!i.props.children||_t(!1);let s={id:i.props.id||o.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(s.children=fd(i.props.children,o)),t.push(s)}),t}/**
 * React Router DOM v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function hd(){return hd=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n},hd.apply(this,arguments)}function mS(n,e){if(n==null)return{};var t={},i=Object.keys(n),r,o;for(o=0;o<i.length;o++)r=i[o],!(e.indexOf(r)>=0)&&(t[r]=n[r]);return t}function gS(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function vS(n,e){return n.button===0&&(!e||e==="_self")&&!gS(n)}const xS=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],_S="6";try{window.__reactRouterVersion=_S}catch{}const yS="startTransition",rp=fx[yS];function SS(n){let{basename:e,children:t,future:i,window:r}=n,o=z.useRef();o.current==null&&(o.current=Ey({window:r,v5Compat:!0}));let s=o.current,[a,c]=z.useState({action:s.action,location:s.location}),{v7_startTransition:l}=i||{},u=z.useCallback(f=>{l&&rp?rp(()=>c(f)):c(f)},[c,l]);return z.useLayoutEffect(()=>s.listen(u),[s,u]),z.useEffect(()=>dS(i),[i]),z.createElement(hS,{basename:e,children:t,location:a.location,navigationType:a.action,navigator:s,future:i})}const MS=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",wS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Vn=z.forwardRef(function(e,t){let{onClick:i,relative:r,reloadDocument:o,replace:s,state:a,target:c,to:l,preventScrollReset:u,viewTransition:f}=e,h=mS(e,xS),{basename:p}=z.useContext(nr),_,x=!1;if(typeof l=="string"&&wS.test(l)&&(_=l,MS))try{let g=new URL(window.location.href),y=l.startsWith("//")?new URL(g.protocol+l):new URL(l),M=Af(y.pathname,p);y.origin===g.origin&&M!=null?l=M+y.search+y.hash:x=!0}catch{}let m=Zy(l,{relative:r}),d=ES(l,{replace:s,state:a,target:c,preventScrollReset:u,relative:r,viewTransition:f});function v(g){i&&i(g),g.defaultPrevented||d(g)}return z.createElement("a",hd({},h,{href:_||m,onClick:x||o?i:v,ref:t,target:c}))});var op;(function(n){n.UseScrollRestoration="useScrollRestoration",n.UseSubmit="useSubmit",n.UseSubmitFetcher="useSubmitFetcher",n.UseFetcher="useFetcher",n.useViewTransitionState="useViewTransitionState"})(op||(op={}));var sp;(function(n){n.UseFetcher="useFetcher",n.UseFetchers="useFetchers",n.UseScrollRestoration="useScrollRestoration"})(sp||(sp={}));function ES(n,e){let{target:t,replace:i,state:r,preventScrollReset:o,relative:s,viewTransition:a}=e===void 0?{}:e,c=qo(),l=$o(),u=hv(n,{relative:s});return z.useCallback(f=>{if(vS(f,t)){f.preventDefault();let h=i!==void 0?i:Nl(l)===Nl(u);c(n,{replace:h,state:r,preventScrollReset:o,relative:s,viewTransition:a})}},[l,c,u,i,r,t,n,o,s,a])}const gv=z.createContext(),rr=()=>z.useContext(gv),bS=({children:n})=>{const[e,t]=z.useState(null),[i,r]=z.useState(null),[o,s]=z.useState(null),[a,c]=z.useState(null),[l,u]=z.useState(""),[f,h]=z.useState(null),[p,_]=z.useState(null),[x,m]=z.useState(null),[d,v]=z.useState([]),[g,y]=z.useState({yellow:{rgb:[255,204,0],dispenser:1},red:{rgb:[237,28,36],dispenser:2},blue:{rgb:[0,114,206],dispenser:3},green:{rgb:[0,158,73],dispenser:4},orange:{rgb:[243,112,33],dispenser:5},light_gray:{rgb:[178,178,178],dispenser:6},dark_gray:{rgb:[77,77,77],dispenser:7}}),[M,E]=z.useState("yellow"),[P,T]=z.useState("dark_gray");z.useEffect(()=>{(()=>{try{const D=window.location.pathname,F=localStorage.getItem("colorConfig");F&&y(JSON.parse(F));const $=localStorage.getItem("recentProjects");if($&&v(JSON.parse($)),D.includes("mosaic")||D.includes("crop")||D.includes("preview")){const K=localStorage.getItem("originalImage"),U=localStorage.getItem("croppedImage"),H=localStorage.getItem("pixelatedImage"),G=localStorage.getItem("legoImage"),de=localStorage.getItem("aiPrompt"),ie=localStorage.getItem("cropArea");K&&t(K),U&&r(U),H&&s(H),G&&c(G),de&&u(de),ie&&h(JSON.parse(ie))}if(D.includes("3d")){const K=localStorage.getItem("modelFile"),U=localStorage.getItem("voxelizedModel"),H=localStorage.getItem("modelColor"),G=localStorage.getItem("supportColor");K&&_(K),U&&m(JSON.parse(U)),H&&E(H),G&&T(G)}}catch(D){console.error("Error loading from localStorage:",D)}})()},[]),z.useEffect(()=>{g&&localStorage.setItem("colorConfig",JSON.stringify(g)),d.length>0&&localStorage.setItem("recentProjects",JSON.stringify(d)),(e||i||o||a||l||f)&&(e&&localStorage.setItem("originalImage",e),i&&localStorage.setItem("croppedImage",i),o&&localStorage.setItem("pixelatedImage",o),a&&localStorage.setItem("legoImage",a),l&&localStorage.setItem("aiPrompt",l),f&&localStorage.setItem("cropArea",JSON.stringify(f))),(p||x||M||P)&&(p&&localStorage.setItem("modelFile",p),x&&localStorage.setItem("voxelizedModel",JSON.stringify(x)),M&&localStorage.setItem("modelColor",M),P&&localStorage.setItem("supportColor",P))},[e,i,o,a,l,f,p,x,g,M,P,d]);const S=(R,D,F=null)=>{try{const $={id:Date.now().toString(),name:R||`Untitled ${D==="mosaic"?"Mosaic":"3D Model"}`,type:D,thumbnail:F,date:new Date().toISOString()},K=[$,...d].slice(0,10);return v(K),$.id}catch($){return console.error("Error saving project:",$),null}},w=R=>{try{const D=d.filter(F=>F.id!==R);v(D)}catch(D){console.error("Error deleting project:",D)}},V=()=>{t(null),r(null),s(null),c(null),u(""),h(null),localStorage.removeItem("originalImage"),localStorage.removeItem("croppedImage"),localStorage.removeItem("pixelatedImage"),localStorage.removeItem("legoImage"),localStorage.removeItem("aiPrompt"),localStorage.removeItem("cropArea")},k=()=>{_(null),m(null),localStorage.removeItem("modelFile"),localStorage.removeItem("voxelizedModel")};return C(gv.Provider,{value:{originalImage:e,setOriginalImage:t,croppedImage:i,setCroppedImage:r,pixelatedImage:o,setPixelatedImage:s,legoImage:a,setLegoImage:c,aiPrompt:l,setAiPrompt:u,cropArea:f,setCropArea:h,clearMosaicData:V,modelFile:p,setModelFile:_,voxelizedModel:x,setVoxelizedModel:m,clear3DData:k,colorConfig:g,setColorConfig:y,modelColor:M,setModelColor:E,supportColor:P,setSupportColor:T,recentProjects:d,saveProject:S,deleteProject:w},children:n})},CS=({onClose:n})=>{const{colorConfig:e,setColorConfig:t}=rr(),[i,r]=z.useState({...e});z.useEffect(()=>{const l=u=>{u.key==="Escape"&&n()};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[n]);const o=(l,u,f)=>{r(h=>({...h,[l]:{...h[l],[u]:f}}))},s=()=>{t(i),n()},a=([l,u,f])=>`#${l.toString(16).padStart(2,"0")}${u.toString(16).padStart(2,"0")}${f.toString(16).padStart(2,"0")}`,c=l=>{const u=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(l);return u?[parseInt(u[1],16),parseInt(u[2],16),parseInt(u[3],16)]:[0,0,0]};return C("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:X("div",{className:"bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto",children:[X("div",{className:"flex justify-between items-center mb-4",children:[C("h2",{className:"text-xl font-bold text-gray-800",children:"LEGO Color Setup"}),C("button",{onClick:n,className:"text-gray-500 hover:text-gray-700",children:"×"})]}),C("p",{className:"mb-4 text-gray-800",children:"Configure the colors for each dispenser in your LEGO machine."}),C("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:Object.entries(i).map(([l,u])=>X("div",{className:"border rounded-lg p-4 flex flex-col space-y-3",children:[X("div",{className:"flex items-center space-x-2",children:[C("div",{className:"w-8 h-8 rounded-full border",style:{backgroundColor:a(u.rgb)}}),C("h3",{className:"font-medium text-gray-800",children:l.replace("_"," ").replace(/\b\w/g,f=>f.toUpperCase())})]}),X("div",{children:[C("label",{className:"block text-sm text-gray-800 mb-1",children:"Color (HEX)"}),C("input",{type:"color",value:a(u.rgb),onChange:f=>o(l,"rgb",c(f.target.value)),className:"w-full rounded border p-1 h-10"})]}),X("div",{children:[C("label",{className:"block text-sm text-gray-800 mb-1",children:"Dispenser Number"}),C("input",{type:"number",min:"1",max:"16",value:u.dispenser,onChange:f=>o(l,"dispenser",parseInt(f.target.value)),className:"w-full rounded border p-2"})]})]},l))}),X("div",{className:"flex justify-end space-x-3",children:[C("button",{onClick:n,className:"px-4 py-2 border rounded text-gray-600 hover:bg-gray-100",children:"Cancel"}),C("button",{onClick:s,className:"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",children:"Save Configuration"})]})]})})},TS=({onClose:n})=>(z.useEffect(()=>{const e=t=>{t.key==="Escape"&&n()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[n]),z.useState(null),C("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:X("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto",children:[X("div",{className:"flex justify-between items-center mb-4",children:[C("h2",{className:"text-xl font-bold text-gray-800 dark:text-white",children:"Help & Information"}),C("button",{onClick:n,className:"text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white","aria-label":"Close",children:"×"})]}),X("div",{className:"prose prose-lg dark:prose-invert",children:[C("h3",{children:"About Brick It"}),C("p",{children:"Brick It is a web application that transforms images and 3D models into LEGO-compatible instructions. The app runs entirely in your browser - no data is sent to any server."}),C("h3",{children:"Mosaic Mode"}),X("p",{children:[C("strong",{children:"Step 1:"})," Upload an image or generate one with AI"]}),X("p",{children:[C("strong",{children:"Step 2:"})," Crop the image to your preferred composition (it will be converted to a 16x16 grid)"]}),X("p",{children:[C("strong",{children:"Step 3:"})," The app will automatically convert your image to a LEGO mosaic using the color configuration set"]}),X("p",{children:[C("strong",{children:"Step 4:"})," Export as PNG for reference, or as a .txt file for use with LEGO building machines"]}),X("p",{children:[C("strong",{children:"Step 5:"})," Optionally save your project as JSON to continue working on it later"]}),C("h3",{children:"3D Model Mode"}),X("p",{children:[C("strong",{children:"Step 1:"})," Upload an STL file (3D model)"]}),X("p",{children:[C("strong",{children:"Step 2:"})," The app will automatically voxelize the model (convert it to LEGO bricks)"]}),X("p",{children:[C("strong",{children:"Step 3:"})," View the model in 3D and adjust settings"]}),X("p",{children:[C("strong",{children:"Step 4:"})," Use layer-by-layer viewing to see detailed construction steps"]}),X("p",{children:[C("strong",{children:"Step 5:"})," Export as a .txt file for use with LEGO building machines"]}),C("h3",{children:"Color Configuration"}),C("p",{children:'You can configure the colors for each dispenser in your LEGO machine by clicking the "Color Setup" button in the header. Each color can be assigned to a specific dispenser number.'}),C("h3",{children:"Mobile Usage Tips"}),C("p",{children:"Brick It is fully optimized for mobile devices. Here are some tips for the best experience:"}),X("ul",{children:[X("li",{children:[C("strong",{children:"Orientation:"})," Landscape mode works best for the 3D viewer"]}),X("li",{children:[C("strong",{children:"Pinch to zoom:"})," Use pinch gestures to zoom in/out of the 3D model"]}),X("li",{children:[C("strong",{children:"Long press:"})," Long press on bricks for additional options"]}),X("li",{children:[C("strong",{children:"Save often:"})," Use the save feature to avoid losing work"]}),X("li",{children:[C("strong",{children:"Layer navigation:"})," Swipe left/right to navigate 3D model layers"]})]}),C("h3",{children:"Output Format"}),C("p",{children:"The .txt output is in a simple format that can be used with LEGO building machines:"}),C("pre",{className:"bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto",children:"<x> <y> <z> <color index>"}),C("p",{children:"Where:"}),X("ul",{children:[X("li",{children:[C("strong",{children:"x, y, z"})," are coordinates (1-based)"]}),X("li",{children:[C("strong",{children:"color index"})," is the dispenser number"]})]}),C("h3",{children:"Credits"}),C("p",{children:"Brick It was created by Kingsley Fong at the University of Washington."}),C("p",{children:"LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web app."})]}),C("div",{className:"flex justify-end mt-6",children:C("button",{onClick:n,className:"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",children:"Close"})})]})})),AS=()=>{const[n,e]=z.useState(!1),[t,i]=z.useState(!1),r=$o();return X("header",{className:"bg-red-600 text-white shadow-md",children:[X("div",{className:"container mx-auto px-4 py-3 flex items-center justify-between",children:[X(Vn,{to:"/",className:"text-2xl font-bold flex items-center",children:[C("span",{className:"mr-2",children:"🧱"})," Brick It"]}),X("div",{className:"flex space-x-4",children:[r.pathname!=="/"&&X(As,{children:[C(Vn,{to:"/",className:"px-3 py-1 rounded hover:bg-red-700 transition-colors",children:"Home"}),C(Vn,{to:"/dashboard",className:"px-3 py-1 rounded hover:bg-red-700 transition-colors",children:"Dashboard"}),C("button",{onClick:()=>e(!0),className:"px-3 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-400 transition-colors",children:"Color Setup"})]}),C("button",{onClick:()=>i(!0),className:"px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400 transition-colors",children:"Help"})]})]}),n&&C(CS,{onClose:()=>e(!1)}),t&&C(TS,{onClose:()=>i(!1)})]})},PS=()=>{const{clearMosaicData:n,clear3DData:e}=rr(),[t,i]=z.useState(!1);return z.useEffect(()=>{localStorage.getItem("hasVisitedBefore")||(i(!0),localStorage.setItem("hasVisitedBefore","true"))},[]),X("div",{className:"container mx-auto px-4 py-8",children:[t&&X("div",{className:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 relative",children:[C("button",{onClick:()=>{i(!1)},className:"absolute top-2 right-2 text-gray-600 hover:text-gray-800","aria-label":"Close",children:"×"}),C("h2",{className:"text-xl font-bold text-blue-700 mb-2",children:"👋 Welcome to Brick It!"}),C("p",{className:"text-blue-600 mb-2",children:"Brick It helps you transform your images and 3D models into LEGO-compatible instructions."}),X("p",{className:"text-sm text-blue-600",children:[C("strong",{children:"Getting Started:"})," Choose either Mosaic Mode to create LEGO pixel art, or 3D Model Mode to convert your 3D models (.stl files) into buildable LEGO structures."]})]}),X("h1",{className:"text-4xl font-bold text-center mb-8",children:["Welcome to ",C("span",{className:"text-red-600",children:"Brick It"})]}),C("p",{className:"text-center text-lg max-w-2xl mx-auto mb-8",children:"Transform your images and 3D models into LEGO-compatible instructions. Choose a mode to get started."}),X("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8",children:[X("div",{className:"bg-white rounded-lg shadow-lg overflow-hidden",children:[C("div",{className:"h-48 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center",children:C("span",{className:"text-6xl",children:"🎨"})}),X("div",{className:"p-6",children:[C("h2",{className:"text-2xl font-bold mb-2",children:"Mosaic Mode"}),C("p",{className:"text-gray-600 mb-4",children:"Generate or upload an image, crop it, and convert it to a LEGO mosaic."}),C(Vn,{to:"/mosaic",onClick:n,className:"block w-full text-center py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition",children:"Start Mosaic"})]})]}),X("div",{className:"bg-white rounded-lg shadow-lg overflow-hidden",children:[C("div",{className:"h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center",children:C("span",{className:"text-6xl",children:"🧊"})}),X("div",{className:"p-6",children:[C("h2",{className:"text-2xl font-bold mb-2",children:"3D Model Mode"}),C("p",{className:"text-gray-600 mb-4",children:"Upload a 3D model (.stl file) and convert it to LEGO instructions."}),C(Vn,{to:"/3d",onClick:e,className:"block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition",children:"Start 3D Model"})]})]})]}),X("div",{className:"max-w-4xl mx-auto mb-12",children:[C(Vn,{to:"/dashboard",className:"block w-full text-center py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition",children:"View Your Dashboard"}),C("p",{className:"text-center text-sm text-gray-500 mt-2",children:"Access your recent projects, settings, and app statistics"})]}),X("div",{className:"mt-12 text-center text-sm text-gray-500",children:[C("p",{children:"LEGO® is a trademark of the LEGO Group, which does not sponsor, authorize or endorse this web app."}),C("p",{children:"Built by Kingsley Fong at the University of Washington."})]})]})},LS=()=>{const{clearMosaicData:n,clear3DData:e}=rr(),[t,i]=z.useState([]),[r,o]=z.useState([]),[s,a]=z.useState({mosaics:0,models:0}),[c,l]=z.useState(""),[u,f]=z.useState("all"),[h,p]=z.useState("newest");z.useEffect(()=>{_()},[]),z.useEffect(()=>{x()},[t,c,u,h]);const _=()=>{try{const g=localStorage.getItem("recentProjects");if(g){const y=JSON.parse(g);i(y),o(y);const M=y.filter(P=>P.type==="mosaic").length,E=y.filter(P=>P.type==="3d").length;a({mosaics:M,models:E})}}catch(g){console.error("Error loading recent projects:",g)}},x=()=>{let g=[...t];if(u!=="all"&&(g=g.filter(y=>y.type===u)),c.trim()!==""){const y=c.toLowerCase();g=g.filter(M=>M.name.toLowerCase().includes(y)||M.type.toLowerCase().includes(y))}h==="newest"?g.sort((y,M)=>new Date(M.date)-new Date(y.date)):h==="oldest"?g.sort((y,M)=>new Date(y.date)-new Date(M.date)):h==="name"&&g.sort((y,M)=>y.name.localeCompare(M.name)),o(g)},m=()=>{if(window.confirm("Are you sure you want to clear all saved data? This action cannot be undone."))try{n(),e(),localStorage.clear(),i([]),o([]),a({mosaics:0,models:0}),alert("All data cleared successfully.")}catch(g){console.error("Error clearing data:",g),alert("Error clearing data: "+g.message)}},d=g=>{try{const y=t.filter(P=>P.id!==g);localStorage.setItem("recentProjects",JSON.stringify(y)),i(y);const M=y.filter(P=>P.type==="mosaic").length,E=y.filter(P=>P.type==="3d").length;a({mosaics:M,models:E})}catch(y){console.error("Error deleting project:",y)}},v=({clearMosaicData:g,clear3DData:y})=>X("div",{className:"bg-white rounded-lg shadow-md p-8 text-center mb-8",children:[C("div",{className:"text-6xl mb-4",children:"🧱"}),C("h2",{className:"text-2xl font-bold mb-4",children:"Welcome to Your Dashboard!"}),C("p",{className:"text-gray-600 mb-6",children:"This is where all your projects will be saved for easy access. Start creating your first project to see it here!"}),X("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto",children:[X(Vn,{to:"/mosaic",onClick:g,className:"flex items-center justify-center py-3 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition",children:[C("span",{className:"mr-2",children:"🎨"})," Create Mosaic"]}),X(Vn,{to:"/3d",onClick:y,className:"flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition",children:[C("span",{className:"mr-2",children:"🧊"})," Create 3D Model"]})]}),X("div",{className:"mt-6 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto",children:[C("h3",{className:"font-semibold mb-2",children:"Quick Tips"}),X("ul",{className:"text-sm text-left text-gray-700 space-y-1",children:[C("li",{children:"• For Mosaics: Upload an image or use AI generation"}),C("li",{children:"• For 3D Models: Upload an STL file"}),C("li",{children:"• Projects are saved automatically when you export"}),C("li",{children:"• All processing happens in your browser - your data stays private"})]})]})]});return X("div",{className:"container mx-auto px-4 py-8",children:[C("h1",{className:"text-3xl font-bold text-center mb-8",children:"Your Brick It Dashboard"}),t.length>0?X(As,{children:[X("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[C("h2",{className:"text-xl font-semibold mb-2",children:"Total Projects"}),C("p",{className:"text-4xl font-bold text-blue-600",children:t.length})]}),X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[C("h2",{className:"text-xl font-semibold mb-2",children:"Mosaic Projects"}),C("p",{className:"text-4xl font-bold text-red-600",children:s.mosaics})]}),X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[C("h2",{className:"text-xl font-semibold mb-2",children:"3D Model Projects"}),C("p",{className:"text-4xl font-bold text-green-600",children:s.models})]})]}),X("div",{className:"mb-8",children:[C("h2",{className:"text-2xl font-bold mb-4",children:"Start a New Project"}),X("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[C(Vn,{to:"/mosaic",onClick:n,className:"block w-full py-3 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition text-center",children:"New Mosaic Project"}),C(Vn,{to:"/3d",onClick:e,className:"block w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center",children:"New 3D Model Project"})]})]}),X("div",{className:"mb-8",children:[X("div",{className:"flex justify-between items-center mb-4",children:[C("h2",{className:"text-2xl font-bold",children:"Recent Projects"}),C("button",{onClick:m,className:"px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700",children:"Clear All Data"})]}),C("div",{className:"bg-white rounded-lg shadow-md p-4 mb-4",children:X("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[X("div",{children:[C("label",{htmlFor:"search",className:"block text-sm font-medium text-gray-700 mb-1",children:"Search Projects"}),C("input",{type:"text",id:"search",value:c,onChange:g=>l(g.target.value),placeholder:"Search by name...",className:"w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"})]}),X("div",{children:[C("label",{htmlFor:"filter",className:"block text-sm font-medium text-gray-700 mb-1",children:"Filter by Type"}),X("select",{id:"filter",value:u,onChange:g=>f(g.target.value),className:"w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500",children:[C("option",{value:"all",children:"All Projects"}),C("option",{value:"mosaic",children:"Mosaics Only"}),C("option",{value:"3d",children:"3D Models Only"})]})]}),X("div",{children:[C("label",{htmlFor:"sort",className:"block text-sm font-medium text-gray-700 mb-1",children:"Sort By"}),X("select",{id:"sort",value:h,onChange:g=>p(g.target.value),className:"w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500",children:[C("option",{value:"newest",children:"Newest First"}),C("option",{value:"oldest",children:"Oldest First"}),C("option",{value:"name",children:"Name (A-Z)"})]})]})]})}),r.length===0?X("div",{className:"bg-white rounded-lg shadow-md p-6 text-center",children:[C("p",{className:"text-gray-600",children:"No projects match your search criteria."}),C("button",{onClick:()=>{l(""),f("all"),p("newest")},className:"mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",children:"Clear Filters"})]}):C("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:r.map(g=>X("div",{className:"bg-white rounded-lg shadow-md overflow-hidden",children:[g.thumbnail?C("div",{className:"h-40 bg-gray-200 flex items-center justify-center",children:C("img",{src:g.thumbnail,alt:g.name,className:"object-cover w-full h-full"})}):C("div",{className:"h-40 bg-gray-200 flex items-center justify-center",children:C("span",{className:"text-4xl",children:g.type==="mosaic"?"🎨":"🧊"})}),X("div",{className:"p-4",children:[X("div",{className:"flex justify-between items-start mb-2",children:[C("h3",{className:"font-semibold truncate",children:g.name}),C("span",{className:`px-2 py-1 text-xs rounded ${g.type==="mosaic"?"bg-red-100 text-red-800":"bg-blue-100 text-blue-800"}`,children:g.type==="mosaic"?"Mosaic":"3D Model"})]}),C("p",{className:"text-gray-600 text-sm mb-4",children:new Date(g.date).toLocaleDateString()}),X("div",{className:"flex justify-between",children:[C(Vn,{to:g.type==="mosaic"?"/mosaic":"/3d",className:"px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700",children:"Open"}),C("button",{onClick:()=>d(g.id),className:"px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300",children:"Delete"})]})]})]},g.id))})]}),X("div",{children:[C("h2",{className:"text-2xl font-bold mb-4",children:"Settings"}),X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[X("div",{className:"mb-4",children:[C("h3",{className:"font-semibold mb-2",children:"Storage Usage"}),C("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:C("div",{className:"bg-blue-600 h-2.5 rounded-full",style:{width:`${Math.min(t.length*10,100)}%`}})}),X("p",{className:"text-sm text-gray-600 mt-1",children:["Using approximately ",Math.round(t.length*1.2*100)/100," MB of localStorage space."]})]}),X("div",{className:"mb-4",children:[C("h3",{className:"font-semibold mb-2",children:"Browser Compatibility"}),C("p",{className:"text-sm text-gray-600",children:typeof WebAssembly=="object"?"✅ Your browser fully supports all Brick It features, including AI image generation.":"⚠️ Your browser may not support the AI image generation feature. Consider using Chrome or Edge for full functionality."})]}),X("div",{children:[C("button",{onClick:m,className:"px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700",children:"Clear All Data"}),C("p",{className:"text-xs text-gray-500 mt-1",children:"This will clear all saved projects and settings. This action cannot be undone."})]})]})]})]}):C(v,{clearMosaicData:n,clear3DData:e})]})},RS=async n=>{try{return DS(n)}catch(e){throw console.error("Error generating image:",e),e}},DS=n=>new Promise(e=>{const t=document.createElement("canvas");t.width=512,t.height=512;const i=t.getContext("2d"),r=NS(n.toLowerCase()),o=r%360,s=i.createLinearGradient(0,0,512,512);s.addColorStop(0,`hsl(${o}, 100%, 70%)`),s.addColorStop(1,`hsl(${(o+60)%360}, 100%, 40%)`),i.fillStyle=s,i.fillRect(0,0,512,512);const a=r%10+5;for(let l=0;l<a;l++){const u=r*(l+1)%512,f=r*(l+2)%512,h=r*(l+3)%50+20;i.fillStyle=`hsla(${(o+180)%360}, 100%, 50%, 0.5)`,l%3===0?(i.beginPath(),i.arc(u,f,h,0,Math.PI*2),i.fill()):l%3===1?i.fillRect(u-h/2,f-h/2,h,h):(i.beginPath(),i.moveTo(u,f-h/2),i.lineTo(u+h/2,f+h/2),i.lineTo(u-h/2,f+h/2),i.closePath(),i.fill())}i.font="16px Arial",i.fillStyle="rgba(255, 255, 255, 0.7)",i.textAlign="center",i.fillText(`"${n}"`,256,480);const c=t.toDataURL("image/png");setTimeout(()=>{e(c)},2e3)}),NS=n=>{let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);e=(e<<5)-e+i,e=e&e}return Math.abs(e)},ap=()=>!1,IS=()=>{const n=qo(),{setOriginalImage:e,aiPrompt:t,setAiPrompt:i,clearMosaicData:r}=rr(),[o,s]=z.useState(!1),[a,c]=z.useState(null),[l,u]=z.useState("upload"),f=z.useRef(null),[h,p]=z.useState(""),[_,x]=z.useState(null),m=["a cute cat wearing a hat","sunset over mountains","lego minifigure astronaut","pixel art landscape"],[d,v]=z.useState(!1);z.useEffect(()=>{l==="ai"&&g()},[l]);const g=async()=>{try{const T=ap();x(T);try{const S=await fetch("/models/tiny-stable-diffusion.onnx"),w=await fetch("/models/vocab.json");S.ok&&w.ok?x("full"):x("fallback")}catch{x("fallback")}}catch{x(!1)}};z.useEffect(()=>{(async()=>{try{const w=await fetch("/pikachu.png");w.ok?(v(!0),console.log("Default image loaded successfully")):console.error("Failed to load default image:",w.statusText)}catch(S){console.error("Error loading default image:",S)}})()},[]);const y=T=>{const S=T.target.files[0];if(!S)return;v(!1),c(null);const w=new FileReader;w.onload=V=>{e(V.target.result),n("/crop")},w.onerror=()=>{c("Error reading file")},w.readAsDataURL(S)},M=async()=>{if(!t.trim()){c("Please enter a prompt");return}c(null),s(!0),p("Initializing AI model...");try{if(!ap()){c("Your browser may not support AI image generation. Please try on a desktop Chrome browser."),s(!1);return}p("Processing your prompt...");const S=await RS(t);p("Finalizing image..."),e(S),s(!1),n("/crop")}catch(T){c("Error generating image: "+T.message),s(!1),p("")}},E=()=>{e("/pikachu.png"),n("/crop")},P=T=>{i(T)};return X("div",{className:"container mx-auto px-4 py-8",children:[C("h1",{className:"text-3xl font-bold text-center text-gray-800 mb-8",children:"LEGO Mosaic Creator"}),X("div",{className:"max-w-lg mx-auto",children:[X("div",{className:"flex mb-6 bg-gray-100 rounded-lg overflow-hidden",children:[C("button",{className:`flex-1 py-3 ${l==="upload"?"bg-blue-600 text-white":"text-gray-800"}`,onClick:()=>u("upload"),children:"Upload Image"}),C("button",{className:`flex-1 py-3 ${l==="ai"?"bg-blue-600 text-white":"text-gray-800"}`,onClick:()=>u("ai"),children:"Generate with AI"})]}),l==="upload"&&X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[X("div",{className:"border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors",onClick:()=>f.current.click(),children:[X("svg",{className:"mx-auto h-12 w-12 text-gray-500",stroke:"currentColor",fill:"none",viewBox:"0 0 48 48",children:[C("path",{d:"M24 8l-4 4h-8v24h32v-24h-8l-4-4h-8z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),C("path",{d:"M12 32l8-8 4 4 8-8 8 8",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),C("p",{className:"mt-2 text-sm text-gray-800",children:"Click to select an image, or drag and drop"}),C("p",{className:"text-xs text-gray-700 mt-1",children:"PNG, JPG, GIF up to 10MB"}),C("input",{ref:f,type:"file",className:"hidden",accept:"image/*",onChange:y})]}),d&&C("div",{className:"mt-4",children:C("button",{className:"w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition",onClick:E,children:"Use Default Image (Pikachu)"})})]}),l==="ai"&&X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[_==="full"&&X("div",{className:"mb-4 p-2 bg-green-100 text-green-700 rounded-lg",children:[C("p",{className:"text-sm font-medium",children:"✅ Full AI model available"}),C("p",{className:"text-xs",children:"Your browser will use the installed ONNX model for high-quality generation."})]}),_==="fallback"&&X("div",{className:"mb-4 p-2 bg-yellow-100 text-yellow-700 rounded-lg",children:[C("p",{className:"text-sm font-medium",children:"ℹ️ Using fallback generator"}),C("p",{className:"text-xs",children:"The full AI model is not installed. A simple placeholder generator will be used instead."})]}),_===!1&&X("div",{className:"mb-4 p-2 bg-red-100 text-red-700 rounded-lg",children:[C("p",{className:"text-sm font-medium",children:"⚠️ AI generation may not work"}),C("p",{className:"text-xs",children:"Your browser might not support WebAssembly, which is required for AI image generation."})]}),C("p",{className:"text-gray-800 mb-2",children:"Enter a description of the image you'd like to create:"}),C("textarea",{className:"w-full p-3 border rounded-lg mb-3 h-24",placeholder:"e.g., A cute cat wearing a hat",value:t,onChange:T=>i(T.target.value),disabled:o}),X("div",{className:"mb-4",children:[C("p",{className:"text-sm text-gray-800 mb-2",children:"Try an example prompt:"}),C("div",{className:"flex flex-wrap gap-2",children:m.map((T,S)=>C("button",{onClick:()=>P(T),className:"px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300",disabled:o,children:T},S))})]}),C("button",{className:`w-full py-3 rounded-lg ${o?"bg-gray-400 cursor-not-allowed":"bg-blue-600 hover:bg-blue-700 text-white"}`,onClick:M,disabled:o,children:o?"Generating...":"Generate Image"}),o&&h&&X("div",{className:"mt-3 text-center",children:[C("div",{className:"animate-pulse",children:C("p",{className:"text-sm text-blue-600",children:h})}),C("div",{className:"w-full bg-gray-200 rounded-full h-1.5 mt-2",children:C("div",{className:"bg-blue-600 h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]",style:{width:"50%"}})})]}),C("p",{className:"text-sm text-gray-700 mt-3",children:"The image generation runs entirely in your browser and may take a few moments."})]}),a&&C("div",{className:"mt-4 p-3 bg-red-100 text-red-700 rounded-lg",children:a})]})]})};/*! *****************************************************************************
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
***************************************************************************** */var pd=function(n,e){return pd=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])},pd(n,e)};function US(n,e){pd(n,e);function t(){this.constructor=n}n.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var Gt=function(){return Gt=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++){t=arguments[i];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Gt.apply(this,arguments)},lp=!1,mr,md,gd,rl,ol,vv,sl,vd,xd,_d,xv,yd,Sd,_v,yv;function nn(){if(!lp){lp=!0;var n=navigator.userAgent,e=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(n),t=/(Mac OS X)|(Windows)|(Linux)/.exec(n);if(yd=/\b(iPhone|iP[ao]d)/.exec(n),Sd=/\b(iP[ao]d)/.exec(n),_d=/Android/i.exec(n),_v=/FBAN\/\w+;/i.exec(n),yv=/Mobile/i.exec(n),xv=!!/Win64/.exec(n),e){mr=e[1]?parseFloat(e[1]):e[5]?parseFloat(e[5]):NaN,mr&&document&&document.documentMode&&(mr=document.documentMode);var i=/(?:Trident\/(\d+.\d+))/.exec(n);vv=i?parseFloat(i[1])+4:mr,md=e[2]?parseFloat(e[2]):NaN,gd=e[3]?parseFloat(e[3]):NaN,rl=e[4]?parseFloat(e[4]):NaN,rl?(e=/(?:Chrome\/(\d+\.\d+))/.exec(n),ol=e&&e[1]?parseFloat(e[1]):NaN):ol=NaN}else mr=md=gd=ol=rl=NaN;if(t){if(t[1]){var r=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(n);sl=r?parseFloat(r[1].replace("_",".")):!0}else sl=!1;vd=!!t[2],xd=!!t[3]}else sl=vd=xd=!1}}var Md={ie:function(){return nn()||mr},ieCompatibilityMode:function(){return nn()||vv>mr},ie64:function(){return Md.ie()&&xv},firefox:function(){return nn()||md},opera:function(){return nn()||gd},webkit:function(){return nn()||rl},safari:function(){return Md.webkit()},chrome:function(){return nn()||ol},windows:function(){return nn()||vd},osx:function(){return nn()||sl},linux:function(){return nn()||xd},iphone:function(){return nn()||yd},mobile:function(){return nn()||yd||Sd||_d||yv},nativeApp:function(){return nn()||_v},android:function(){return nn()||_d},ipad:function(){return nn()||Sd}},kS=Md,ya=!!(typeof window<"u"&&window.document&&window.document.createElement),OS={canUseDOM:ya,canUseWorkers:typeof Worker<"u",canUseEventListeners:ya&&!!(window.addEventListener||window.attachEvent),canUseViewport:ya&&!!window.screen,isInWorker:!ya},zS=OS,Sv=zS,Mv;Sv.canUseDOM&&(Mv=document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0);/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function FS(n,e){if(!Sv.canUseDOM||e&&!("addEventListener"in document))return!1;var t="on"+n,i=t in document;if(!i){var r=document.createElement("div");r.setAttribute(t,"return;"),i=typeof r[t]=="function"}return!i&&Mv&&n==="wheel"&&(i=document.implementation.hasFeature("Events.wheel","3.0")),i}var BS=FS,GS=kS,VS=BS,cp=10,up=40,dp=800;function wv(n){var e=0,t=0,i=0,r=0;return"detail"in n&&(t=n.detail),"wheelDelta"in n&&(t=-n.wheelDelta/120),"wheelDeltaY"in n&&(t=-n.wheelDeltaY/120),"wheelDeltaX"in n&&(e=-n.wheelDeltaX/120),"axis"in n&&n.axis===n.HORIZONTAL_AXIS&&(e=t,t=0),i=e*cp,r=t*cp,"deltaY"in n&&(r=n.deltaY),"deltaX"in n&&(i=n.deltaX),(i||r)&&n.deltaMode&&(n.deltaMode==1?(i*=up,r*=up):(i*=dp,r*=dp)),i&&!e&&(e=i<1?-1:1),r&&!t&&(t=r<1?-1:1),{spinX:e,spinY:t,pixelX:i,pixelY:r}}wv.getEventType=function(){return GS.firefox()?"DOMMouseScroll":VS("wheel")?"wheel":"mousewheel"};var HS=wv,WS=HS;const jS=qm(WS);function XS(n,e,t,i,r,o){o===void 0&&(o=0);var s=Oo(n,e,o),a=s.width,c=s.height,l=Math.min(a,t),u=Math.min(c,i);return l>u*r?{width:u*r,height:u}:{width:l,height:l/r}}function $S(n){return n.width>n.height?n.width/n.naturalWidth:n.height/n.naturalHeight}function Sa(n,e,t,i,r){r===void 0&&(r=0);var o=Oo(e.width,e.height,r),s=o.width,a=o.height;return{x:fp(n.x,s,t.width,i),y:fp(n.y,a,t.height,i)}}function fp(n,e,t,i){var r=e*i/2-t/2;return Ql(n,-r,r)}function hp(n,e){return Math.sqrt(Math.pow(n.y-e.y,2)+Math.pow(n.x-e.x,2))}function pp(n,e){return Math.atan2(e.y-n.y,e.x-n.x)*180/Math.PI}function qS(n,e,t,i,r,o,s){o===void 0&&(o=0),s===void 0&&(s=!0);var a=s?YS:ZS,c=Oo(e.width,e.height,o),l=Oo(e.naturalWidth,e.naturalHeight,o),u={x:a(100,((c.width-t.width/r)/2-n.x/r)/c.width*100),y:a(100,((c.height-t.height/r)/2-n.y/r)/c.height*100),width:a(100,t.width/c.width*100/r),height:a(100,t.height/c.height*100/r)},f=Math.round(a(l.width,u.width*l.width/100)),h=Math.round(a(l.height,u.height*l.height/100)),p=l.width>=l.height*i,_=p?{width:Math.round(h*i),height:h}:{width:f,height:Math.round(f/i)},x=Gt(Gt({},_),{x:Math.round(a(l.width-_.width,u.x*l.width/100)),y:Math.round(a(l.height-_.height,u.y*l.height/100))});return{croppedAreaPercentages:u,croppedAreaPixels:x}}function YS(n,e){return Math.min(n,Math.max(0,e))}function ZS(n,e){return e}function KS(n,e,t,i,r,o){var s=Oo(e.width,e.height,t),a=Ql(i.width/s.width*(100/n.width),r,o),c={x:a*s.width/2-i.width/2-s.width*a*(n.x/100),y:a*s.height/2-i.height/2-s.height*a*(n.y/100)};return{crop:c,zoom:a}}function JS(n,e,t){var i=$S(e);return t.height>t.width?t.height/(n.height*i):t.width/(n.width*i)}function QS(n,e,t,i,r,o){t===void 0&&(t=0);var s=Oo(e.naturalWidth,e.naturalHeight,t),a=Ql(JS(n,e,i),r,o),c=i.height>i.width?i.height/n.height:i.width/n.width,l={x:((s.width-n.width)/2-n.x)*c,y:((s.height-n.height)/2-n.y)*c};return{crop:l,zoom:a}}function mp(n,e){return{x:(e.x+n.x)/2,y:(e.y+n.y)/2}}function eM(n){return n*Math.PI/180}function Oo(n,e,t){var i=eM(t);return{width:Math.abs(Math.cos(i)*n)+Math.abs(Math.sin(i)*e),height:Math.abs(Math.sin(i)*n)+Math.abs(Math.cos(i)*e)}}function Ql(n,e,t){return Math.min(Math.max(n,e),t)}function Ma(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return n.filter(function(t){return typeof t=="string"&&t.length>0}).join(" ").trim()}var tM=`.reactEasyCrop_Container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reactEasyCrop_Image,
.reactEasyCrop_Video {
  will-change: transform; /* this improves performances and prevent painting issues on iOS Chrome */
}

.reactEasyCrop_Contain {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.reactEasyCrop_Cover_Horizontal {
  width: 100%;
  height: auto;
}
.reactEasyCrop_Cover_Vertical {
  width: auto;
  height: 100%;
}

.reactEasyCrop_CropArea {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0 0 9999em;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.reactEasyCrop_CropAreaRound {
  border-radius: 50%;
}

.reactEasyCrop_CropAreaGrid::before {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 0;
  bottom: 0;
  left: 33.33%;
  right: 33.33%;
  border-top: 0;
  border-bottom: 0;
}

.reactEasyCrop_CropAreaGrid::after {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 33.33%;
  bottom: 33.33%;
  left: 0;
  right: 0;
  border-left: 0;
  border-right: 0;
}
`,nM=1,iM=3,rM=function(n){US(e,n);function e(){var t=n!==null&&n.apply(this,arguments)||this;return t.imageRef=Zn.createRef(),t.videoRef=Zn.createRef(),t.containerRef=null,t.styleRef=null,t.containerRect=null,t.mediaSize={width:0,height:0,naturalWidth:0,naturalHeight:0},t.dragStartPosition={x:0,y:0},t.dragStartCrop={x:0,y:0},t.gestureZoomStart=0,t.gestureRotationStart=0,t.isTouching=!1,t.lastPinchDistance=0,t.lastPinchRotation=0,t.rafDragTimeout=null,t.rafPinchTimeout=null,t.wheelTimer=null,t.currentDoc=typeof document<"u"?document:null,t.currentWindow=typeof window<"u"?window:null,t.resizeObserver=null,t.state={cropSize:null,hasWheelJustStarted:!1},t.initResizeObserver=function(){if(!(typeof window.ResizeObserver>"u"||!t.containerRef)){var i=!0;t.resizeObserver=new window.ResizeObserver(function(r){if(i){i=!1;return}t.computeSizes()}),t.resizeObserver.observe(t.containerRef)}},t.preventZoomSafari=function(i){return i.preventDefault()},t.cleanEvents=function(){t.currentDoc&&(t.currentDoc.removeEventListener("mousemove",t.onMouseMove),t.currentDoc.removeEventListener("mouseup",t.onDragStopped),t.currentDoc.removeEventListener("touchmove",t.onTouchMove),t.currentDoc.removeEventListener("touchend",t.onDragStopped),t.currentDoc.removeEventListener("gesturemove",t.onGestureMove),t.currentDoc.removeEventListener("gestureend",t.onGestureEnd))},t.clearScrollEvent=function(){t.containerRef&&t.containerRef.removeEventListener("wheel",t.onWheel),t.wheelTimer&&clearTimeout(t.wheelTimer)},t.onMediaLoad=function(){var i=t.computeSizes();i&&(t.emitCropData(),t.setInitialCrop(i)),t.props.onMediaLoaded&&t.props.onMediaLoaded(t.mediaSize)},t.setInitialCrop=function(i){if(t.props.initialCroppedAreaPercentages){var r=KS(t.props.initialCroppedAreaPercentages,t.mediaSize,t.props.rotation,i,t.props.minZoom,t.props.maxZoom),o=r.crop,s=r.zoom;t.props.onCropChange(o),t.props.onZoomChange&&t.props.onZoomChange(s)}else if(t.props.initialCroppedAreaPixels){var a=QS(t.props.initialCroppedAreaPixels,t.mediaSize,t.props.rotation,i,t.props.minZoom,t.props.maxZoom),o=a.crop,s=a.zoom;t.props.onCropChange(o),t.props.onZoomChange&&t.props.onZoomChange(s)}},t.computeSizes=function(){var i,r,o,s,a,c,l=t.imageRef.current||t.videoRef.current;if(l&&t.containerRef){t.containerRect=t.containerRef.getBoundingClientRect();var u=t.containerRect.width/t.containerRect.height,f=((i=t.imageRef.current)===null||i===void 0?void 0:i.naturalWidth)||((r=t.videoRef.current)===null||r===void 0?void 0:r.videoWidth)||0,h=((o=t.imageRef.current)===null||o===void 0?void 0:o.naturalHeight)||((s=t.videoRef.current)===null||s===void 0?void 0:s.videoHeight)||0,p=l.offsetWidth<f||l.offsetHeight<h,_=f/h,x=void 0;if(p)switch(t.props.objectFit){default:case"contain":x=u>_?{width:t.containerRect.height*_,height:t.containerRect.height}:{width:t.containerRect.width,height:t.containerRect.width/_};break;case"horizontal-cover":x={width:t.containerRect.width,height:t.containerRect.width/_};break;case"vertical-cover":x={width:t.containerRect.height*_,height:t.containerRect.height};break;case"auto-cover":x=f>h?{width:t.containerRect.width,height:t.containerRect.width/_}:{width:t.containerRect.height*_,height:t.containerRect.height};break}else x={width:l.offsetWidth,height:l.offsetHeight};t.mediaSize=Gt(Gt({},x),{naturalWidth:f,naturalHeight:h}),t.props.setMediaSize&&t.props.setMediaSize(t.mediaSize);var m=t.props.cropSize?t.props.cropSize:XS(t.mediaSize.width,t.mediaSize.height,t.containerRect.width,t.containerRect.height,t.props.aspect,t.props.rotation);return(((a=t.state.cropSize)===null||a===void 0?void 0:a.height)!==m.height||((c=t.state.cropSize)===null||c===void 0?void 0:c.width)!==m.width)&&t.props.onCropSizeChange&&t.props.onCropSizeChange(m),t.setState({cropSize:m},t.recomputeCropPosition),t.props.setCropSize&&t.props.setCropSize(m),m}},t.onMouseDown=function(i){t.currentDoc&&(i.preventDefault(),t.currentDoc.addEventListener("mousemove",t.onMouseMove),t.currentDoc.addEventListener("mouseup",t.onDragStopped),t.onDragStart(e.getMousePoint(i)))},t.onMouseMove=function(i){return t.onDrag(e.getMousePoint(i))},t.onTouchStart=function(i){t.currentDoc&&(t.isTouching=!0,!(t.props.onTouchRequest&&!t.props.onTouchRequest(i))&&(t.currentDoc.addEventListener("touchmove",t.onTouchMove,{passive:!1}),t.currentDoc.addEventListener("touchend",t.onDragStopped),i.touches.length===2?t.onPinchStart(i):i.touches.length===1&&t.onDragStart(e.getTouchPoint(i.touches[0]))))},t.onTouchMove=function(i){i.preventDefault(),i.touches.length===2?t.onPinchMove(i):i.touches.length===1&&t.onDrag(e.getTouchPoint(i.touches[0]))},t.onGestureStart=function(i){t.currentDoc&&(i.preventDefault(),t.currentDoc.addEventListener("gesturechange",t.onGestureMove),t.currentDoc.addEventListener("gestureend",t.onGestureEnd),t.gestureZoomStart=t.props.zoom,t.gestureRotationStart=t.props.rotation)},t.onGestureMove=function(i){if(i.preventDefault(),!t.isTouching){var r=e.getMousePoint(i),o=t.gestureZoomStart-1+i.scale;if(t.setNewZoom(o,r,{shouldUpdatePosition:!0}),t.props.onRotationChange){var s=t.gestureRotationStart+i.rotation;t.props.onRotationChange(s)}}},t.onGestureEnd=function(i){t.cleanEvents()},t.onDragStart=function(i){var r,o,s=i.x,a=i.y;t.dragStartPosition={x:s,y:a},t.dragStartCrop=Gt({},t.props.crop),(o=(r=t.props).onInteractionStart)===null||o===void 0||o.call(r)},t.onDrag=function(i){var r=i.x,o=i.y;t.currentWindow&&(t.rafDragTimeout&&t.currentWindow.cancelAnimationFrame(t.rafDragTimeout),t.rafDragTimeout=t.currentWindow.requestAnimationFrame(function(){if(t.state.cropSize&&!(r===void 0||o===void 0)){var s=r-t.dragStartPosition.x,a=o-t.dragStartPosition.y,c={x:t.dragStartCrop.x+s,y:t.dragStartCrop.y+a},l=t.props.restrictPosition?Sa(c,t.mediaSize,t.state.cropSize,t.props.zoom,t.props.rotation):c;t.props.onCropChange(l)}}))},t.onDragStopped=function(){var i,r;t.isTouching=!1,t.cleanEvents(),t.emitCropData(),(r=(i=t.props).onInteractionEnd)===null||r===void 0||r.call(i)},t.onWheel=function(i){if(t.currentWindow&&!(t.props.onWheelRequest&&!t.props.onWheelRequest(i))){i.preventDefault();var r=e.getMousePoint(i),o=jS(i).pixelY,s=t.props.zoom-o*t.props.zoomSpeed/200;t.setNewZoom(s,r,{shouldUpdatePosition:!0}),t.state.hasWheelJustStarted||t.setState({hasWheelJustStarted:!0},function(){var a,c;return(c=(a=t.props).onInteractionStart)===null||c===void 0?void 0:c.call(a)}),t.wheelTimer&&clearTimeout(t.wheelTimer),t.wheelTimer=t.currentWindow.setTimeout(function(){return t.setState({hasWheelJustStarted:!1},function(){var a,c;return(c=(a=t.props).onInteractionEnd)===null||c===void 0?void 0:c.call(a)})},250)}},t.getPointOnContainer=function(i){var r=i.x,o=i.y;if(!t.containerRect)throw new Error("The Cropper is not mounted");return{x:t.containerRect.width/2-(r-t.containerRect.left),y:t.containerRect.height/2-(o-t.containerRect.top)}},t.getPointOnMedia=function(i){var r=i.x,o=i.y,s=t.props,a=s.crop,c=s.zoom;return{x:(r+a.x)/c,y:(o+a.y)/c}},t.setNewZoom=function(i,r,o){var s=o===void 0?{}:o,a=s.shouldUpdatePosition,c=a===void 0?!0:a;if(!(!t.state.cropSize||!t.props.onZoomChange)){var l=Ql(i,t.props.minZoom,t.props.maxZoom);if(c){var u=t.getPointOnContainer(r),f=t.getPointOnMedia(u),h={x:f.x*l-u.x,y:f.y*l-u.y},p=t.props.restrictPosition?Sa(h,t.mediaSize,t.state.cropSize,l,t.props.rotation):h;t.props.onCropChange(p)}t.props.onZoomChange(l)}},t.getCropData=function(){if(!t.state.cropSize)return null;var i=t.props.restrictPosition?Sa(t.props.crop,t.mediaSize,t.state.cropSize,t.props.zoom,t.props.rotation):t.props.crop;return qS(i,t.mediaSize,t.state.cropSize,t.getAspect(),t.props.zoom,t.props.rotation,t.props.restrictPosition)},t.emitCropData=function(){var i=t.getCropData();if(i){var r=i.croppedAreaPercentages,o=i.croppedAreaPixels;t.props.onCropComplete&&t.props.onCropComplete(r,o),t.props.onCropAreaChange&&t.props.onCropAreaChange(r,o)}},t.emitCropAreaChange=function(){var i=t.getCropData();if(i){var r=i.croppedAreaPercentages,o=i.croppedAreaPixels;t.props.onCropAreaChange&&t.props.onCropAreaChange(r,o)}},t.recomputeCropPosition=function(){if(t.state.cropSize){var i=t.props.restrictPosition?Sa(t.props.crop,t.mediaSize,t.state.cropSize,t.props.zoom,t.props.rotation):t.props.crop;t.props.onCropChange(i),t.emitCropData()}},t}return e.prototype.componentDidMount=function(){!this.currentDoc||!this.currentWindow||(this.containerRef&&(this.containerRef.ownerDocument&&(this.currentDoc=this.containerRef.ownerDocument),this.currentDoc.defaultView&&(this.currentWindow=this.currentDoc.defaultView),this.initResizeObserver(),typeof window.ResizeObserver>"u"&&this.currentWindow.addEventListener("resize",this.computeSizes),this.props.zoomWithScroll&&this.containerRef.addEventListener("wheel",this.onWheel,{passive:!1}),this.containerRef.addEventListener("gesturestart",this.onGestureStart)),this.props.disableAutomaticStylesInjection||(this.styleRef=this.currentDoc.createElement("style"),this.styleRef.setAttribute("type","text/css"),this.props.nonce&&this.styleRef.setAttribute("nonce",this.props.nonce),this.styleRef.innerHTML=tM,this.currentDoc.head.appendChild(this.styleRef)),this.imageRef.current&&this.imageRef.current.complete&&this.onMediaLoad(),this.props.setImageRef&&this.props.setImageRef(this.imageRef),this.props.setVideoRef&&this.props.setVideoRef(this.videoRef))},e.prototype.componentWillUnmount=function(){var t,i;!this.currentDoc||!this.currentWindow||(typeof window.ResizeObserver>"u"&&this.currentWindow.removeEventListener("resize",this.computeSizes),(t=this.resizeObserver)===null||t===void 0||t.disconnect(),this.containerRef&&this.containerRef.removeEventListener("gesturestart",this.preventZoomSafari),this.styleRef&&((i=this.styleRef.parentNode)===null||i===void 0||i.removeChild(this.styleRef)),this.cleanEvents(),this.props.zoomWithScroll&&this.clearScrollEvent())},e.prototype.componentDidUpdate=function(t){var i,r,o,s,a,c,l,u,f;t.rotation!==this.props.rotation?(this.computeSizes(),this.recomputeCropPosition()):t.aspect!==this.props.aspect?this.computeSizes():t.zoom!==this.props.zoom?this.recomputeCropPosition():((i=t.cropSize)===null||i===void 0?void 0:i.height)!==((r=this.props.cropSize)===null||r===void 0?void 0:r.height)||((o=t.cropSize)===null||o===void 0?void 0:o.width)!==((s=this.props.cropSize)===null||s===void 0?void 0:s.width)?this.computeSizes():(((a=t.crop)===null||a===void 0?void 0:a.x)!==((c=this.props.crop)===null||c===void 0?void 0:c.x)||((l=t.crop)===null||l===void 0?void 0:l.y)!==((u=this.props.crop)===null||u===void 0?void 0:u.y))&&this.emitCropAreaChange(),t.zoomWithScroll!==this.props.zoomWithScroll&&this.containerRef&&(this.props.zoomWithScroll?this.containerRef.addEventListener("wheel",this.onWheel,{passive:!1}):this.clearScrollEvent()),t.video!==this.props.video&&((f=this.videoRef.current)===null||f===void 0||f.load())},e.prototype.getAspect=function(){var t=this.props,i=t.cropSize,r=t.aspect;return i?i.width/i.height:r},e.prototype.onPinchStart=function(t){var i=e.getTouchPoint(t.touches[0]),r=e.getTouchPoint(t.touches[1]);this.lastPinchDistance=hp(i,r),this.lastPinchRotation=pp(i,r),this.onDragStart(mp(i,r))},e.prototype.onPinchMove=function(t){var i=this;if(!(!this.currentDoc||!this.currentWindow)){var r=e.getTouchPoint(t.touches[0]),o=e.getTouchPoint(t.touches[1]),s=mp(r,o);this.onDrag(s),this.rafPinchTimeout&&this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout),this.rafPinchTimeout=this.currentWindow.requestAnimationFrame(function(){var a=hp(r,o),c=i.props.zoom*(a/i.lastPinchDistance);i.setNewZoom(c,s,{shouldUpdatePosition:!1}),i.lastPinchDistance=a;var l=pp(r,o),u=i.props.rotation+(l-i.lastPinchRotation);i.props.onRotationChange&&i.props.onRotationChange(u),i.lastPinchRotation=l})}},e.prototype.render=function(){var t=this,i=this.props,r=i.image,o=i.video,s=i.mediaProps,a=i.transform,c=i.crop,l=c.x,u=c.y,f=i.rotation,h=i.zoom,p=i.cropShape,_=i.showGrid,x=i.style,m=x.containerStyle,d=x.cropAreaStyle,v=x.mediaStyle,g=i.classes,y=g.containerClassName,M=g.cropAreaClassName,E=g.mediaClassName,P=i.objectFit;return Zn.createElement("div",{onMouseDown:this.onMouseDown,onTouchStart:this.onTouchStart,ref:function(S){return t.containerRef=S},"data-testid":"container",style:m,className:Ma("reactEasyCrop_Container",y)},r?Zn.createElement("img",Gt({alt:"",className:Ma("reactEasyCrop_Image",P==="contain"&&"reactEasyCrop_Contain",P==="horizontal-cover"&&"reactEasyCrop_Cover_Horizontal",P==="vertical-cover"&&"reactEasyCrop_Cover_Vertical",P==="auto-cover"&&(this.mediaSize.naturalWidth>this.mediaSize.naturalHeight?"reactEasyCrop_Cover_Horizontal":"reactEasyCrop_Cover_Vertical"),E)},s,{src:r,ref:this.imageRef,style:Gt(Gt({},v),{transform:a||"translate(".concat(l,"px, ").concat(u,"px) rotate(").concat(f,"deg) scale(").concat(h,")")}),onLoad:this.onMediaLoad})):o&&Zn.createElement("video",Gt({autoPlay:!0,loop:!0,muted:!0,className:Ma("reactEasyCrop_Video",P==="contain"&&"reactEasyCrop_Contain",P==="horizontal-cover"&&"reactEasyCrop_Cover_Horizontal",P==="vertical-cover"&&"reactEasyCrop_Cover_Vertical",P==="auto-cover"&&(this.mediaSize.naturalWidth>this.mediaSize.naturalHeight?"reactEasyCrop_Cover_Horizontal":"reactEasyCrop_Cover_Vertical"),E)},s,{ref:this.videoRef,onLoadedMetadata:this.onMediaLoad,style:Gt(Gt({},v),{transform:a||"translate(".concat(l,"px, ").concat(u,"px) rotate(").concat(f,"deg) scale(").concat(h,")")}),controls:!1}),(Array.isArray(o)?o:[{src:o}]).map(function(T){return Zn.createElement("source",Gt({key:T.src},T))})),this.state.cropSize&&Zn.createElement("div",{style:Gt(Gt({},d),{width:this.state.cropSize.width,height:this.state.cropSize.height}),"data-testid":"cropper",className:Ma("reactEasyCrop_CropArea",p==="round"&&"reactEasyCrop_CropAreaRound",_&&"reactEasyCrop_CropAreaGrid",M)}))},e.defaultProps={zoom:1,rotation:0,aspect:4/3,maxZoom:iM,minZoom:nM,cropShape:"rect",objectFit:"contain",showGrid:!0,style:{},classes:{},mediaProps:{},zoomSpeed:1,restrictPosition:!0,zoomWithScroll:!0},e.getMousePoint=function(t){return{x:Number(t.clientX),y:Number(t.clientY)}},e.getTouchPoint=function(t){return{x:Number(t.clientX),y:Number(t.clientY)}},e}(Zn.Component);const oM=()=>{const n=qo(),{originalImage:e,setCroppedImage:t,setCropArea:i}=rr(),r=z.useRef(null),[o,s]=z.useState({x:0,y:0}),[a,c]=z.useState(1),[l,u]=z.useState(null);z.useEffect(()=>{e||n("/mosaic")},[e,n]);const f=z.useCallback((p,_)=>{u(_)},[]);z.useEffect(()=>{const p=x=>{x.preventDefault();const m=Math.max(1,Math.min(3,a+(x.deltaY>0?-.005:.005)));c(m)},_=r.current;return _&&_.addEventListener("wheel",p,{passive:!1}),()=>{_&&_.removeEventListener("wheel",p)}},[a]);const h=z.useCallback(async()=>{try{const p=new Image;p.src=e,await new Promise(d=>{p.onload=d});const _=document.createElement("canvas"),x=_.getContext("2d");_.width=l.width,_.height=l.height,x.drawImage(p,l.x,l.y,l.width,l.height,0,0,l.width,l.height);const m=_.toDataURL("image/png");t(m),i(l),n("/mosaic-generator")}catch(p){console.error("Error creating cropped image:",p)}},[e,l,t,i,n]);return X("div",{className:"flex flex-col h-screen",children:[C("div",{className:"bg-white p-4 shadow-md",children:X("div",{className:"container mx-auto",children:[C("h1",{className:"text-2xl font-bold mb-2",children:"Crop Your Image"}),C("p",{className:"text-gray-600 mb-4",children:"Ensure your image is cropped to a square for the best results. The selected area will be converted to a 16x16 LEGO mosaic."}),X("div",{className:"flex justify-between items-center",children:[C("button",{className:"px-4 py-2 border rounded text-gray-600 hover:bg-gray-100",onClick:()=>n("/mosaic"),children:"Back"}),C("button",{className:"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",onClick:h,disabled:!l,children:"Continue"})]})]})}),X("div",{ref:r,className:"relative flex-grow",children:[e&&C(rM,{image:e,crop:o,zoom:a,aspect:1,onCropChange:s,onZoomChange:c,onCropComplete:f,zoomSpeed:.05,style:{containerStyle:{position:"absolute",top:0,left:0,right:0,bottom:0}}}),X("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center",children:[C("span",{className:"text-gray-500",children:"Zoom:"}),C("input",{type:"range",min:1,max:3,step:.005,value:a,onChange:p=>c(parseFloat(p.target.value)),className:"mx-2 w-32"}),X("span",{className:"text-xs text-gray-500 ml-1 w-10",children:[a.toFixed(2),"x"]})]})]})]})},sM=()=>{const n=qo(),{croppedImage:e,setPixelatedImage:t,setLegoImage:i,colorConfig:r}=rr(),[o,s]=z.useState(!0),[a,c]=z.useState(null),[l,u]=z.useState(0),f=16;z.useEffect(()=>{e||n("/mosaic")},[e,n]);const h=z.useCallback((p,_,x)=>{let m=1/0,d=null,v=null;return Object.entries(r).forEach(([g,y])=>{const[M,E,P]=y.rgb,T=Math.sqrt(Math.pow(p-M,2)+Math.pow(_-E,2)+Math.pow(x-P,2));T<m&&(m=T,d=y.rgb,v=g)}),{rgb:d,name:v}},[r]);return z.useEffect(()=>{(async()=>{if(e)try{s(!0),u(10);const _=new Image;_.src=e,await new Promise(S=>{_.onload=S}),u(30);const x=document.createElement("canvas");x.width=f,x.height=f;const m=x.getContext("2d");m.drawImage(_,0,0,f,f);const d=m.getImageData(0,0,f,f),{data:v}=d;u(50);const g=document.createElement("canvas");g.width=f*16,g.height=f*16;const y=g.getContext("2d"),M=document.createElement("canvas");M.width=f*16,M.height=f*16;const E=M.getContext("2d");u(70);for(let S=0;S<f;S++)for(let w=0;w<f;w++){const V=(S*f+w)*4,k=v[V],R=v[V+1],D=v[V+2];y.fillStyle=`rgb(${k}, ${R}, ${D})`,y.fillRect(w*16,S*16,16,16);const F=h(k,R,D),[$,K,U]=F.rgb;E.fillStyle=`rgb(${$}, ${K}, ${U})`,E.fillRect(w*16,S*16,16,16),E.beginPath(),E.arc(w*16+8,S*16+8,4,0,Math.PI*2),E.fillStyle="rgba(255, 255, 255, 0.3)",E.fill(),E.strokeStyle="rgba(0, 0, 0, 0.2)",E.lineWidth=1,E.stroke()}u(90);const P=g.toDataURL("image/png"),T=M.toDataURL("image/png");t(P),i(T),u(100),s(!1),n("/preview")}catch(_){console.error("Error processing image:",_),c("Error processing image: "+_.message),s(!1)}})()},[e,f,h,t,i,n]),X("div",{className:"container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen",children:[C("h1",{className:"text-3xl font-bold mb-8 text-center",children:"Creating Your LEGO Mosaic"}),C("div",{className:"w-full max-w-md bg-white rounded-lg shadow-md p-6",children:o?X(As,{children:[C("p",{className:"text-center text-gray-700 mb-4",children:"Please wait while we process your image..."}),C("div",{className:"w-full bg-gray-200 rounded-full h-4 mb-4",children:C("div",{className:"bg-blue-600 h-4 rounded-full transition-all duration-300",style:{width:`${l}%`}})}),C("p",{className:"text-center text-sm text-gray-500",children:"Converting your image to a 16x16 LEGO mosaic"})]}):a?X(As,{children:[C("div",{className:"text-center p-4 bg-red-100 text-red-700 rounded-lg mb-4",children:a}),C("button",{className:"w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700",onClick:()=>n("/mosaic"),children:"Start Over"})]}):null})]})},aM=()=>{const n=qo(),{legoImage:e,pixelatedImage:t,colorConfig:i,originalImage:r,croppedImage:o,setOriginalImage:s,setCroppedImage:a,saveProject:c}=rr(),l=z.useRef(null),[u,f]=z.useState(!0),[h,p]=z.useState(""),[_,x]=z.useState(null),[m,d]=z.useState(!1),[v,g]=z.useState({});z.useEffect(()=>{const T=new Date,S=`${T.getHours().toString().padStart(2,"0")}-${T.getMinutes().toString().padStart(2,"0")}-${T.getDate().toString().padStart(2,"0")}-${(T.getMonth()+1).toString().padStart(2,"0")}`;p(S)},[]),z.useEffect(()=>{e||n("/mosaic")},[e,n]),z.useEffect(()=>{if(!t)return;(async()=>{try{const S=new Image;S.src=t,await new Promise(F=>{S.onload=F});const w=document.createElement("canvas");w.width=16,w.height=16;const V=w.getContext("2d");V.drawImage(S,0,0,16,16);const k=V.getImageData(0,0,16,16),{data:R}=k,D={};for(let F=0;F<R.length;F+=4){const $=R[F],K=R[F+1],U=R[F+2];let H=1/0,G=null;Object.entries(i).forEach(([de,ie])=>{const[q,Q,he]=ie.rgb,pe=Math.sqrt(Math.pow($-q,2)+Math.pow(K-Q,2)+Math.pow(U-he,2));pe<H&&(H=pe,G=de)}),G&&(D[G]=(D[G]||0)+1)}g(D)}catch(S){console.error("Error counting colors:",S)}})()},[t,i]);const y=z.useCallback(()=>{try{const T=document.createElement("a");T.href=e,T.download=`${h}.png`,document.body.appendChild(T),T.click(),document.body.removeChild(T),d(!0),setTimeout(()=>d(!1),3e3)}catch(T){console.error("Error exporting PNG:",T),x("Error exporting PNG: "+T.message)}},[e,h]),M=z.useCallback(()=>{if(!h.trim()){x("Please enter a file name."),setTimeout(()=>x(null),5e3);return}const T=h.trim().replace(/[\\/:*?"<>|]/g,"_"),S=T.endsWith(".txt")?T.slice(0,-4):T;try{const w=()=>{const k=new Image;k.src=e;const R=document.createElement("canvas"),D=R.getContext("2d"),F=256,$=F,K=F;return R.width=$,R.height=K,D.fillStyle="#f0f0f0",D.fillRect(0,0,$,K),new Promise(U=>{k.onload=()=>{const H=Math.min($/k.width,K/k.height),G=k.width*H,de=k.height*H,ie=($-G)/2,q=(K-de)/2;D.drawImage(k,0,0,k.width,k.height,ie,q,G,de),D.strokeStyle="#ccc",D.lineWidth=4,D.strokeRect(ie,q,G,de),D.fillStyle="#e00025",D.fillRect(0,K-30,$,30),D.font="bold 16px Arial",D.fillStyle="white",D.textAlign="center",D.textBaseline="middle",D.fillText("BRICK IT MOSAIC",$/2,K-15);const Q=R.toDataURL("image/png",.9);U(Q)},k.onerror=()=>{U(e)}})},V=()=>new Promise((k,R)=>{try{let D="";const F=new Image;F.src=e;const $=document.createElement("canvas");$.width=16,$.height=16;const K=$.getContext("2d");F.onload=()=>{K.drawImage(F,0,0,16,16);const U=K.getImageData(0,0,16,16),{data:H}=U;for(let G=0;G<16;G++)for(let de=0;de<16;de++){const ie=(G*16+de)*4,q=H[ie],Q=H[ie+1],he=H[ie+2];let pe=1/0,j=0;Object.entries(i).forEach(([Re,Te])=>{const[me,Le,Be]=Te.rgb,Ae=Math.sqrt(Math.pow(q-me,2)+Math.pow(Q-Le,2)+Math.pow(he-Be,2));Ae<pe&&(pe=Ae,j=Te.dispenser)}),D+=`${de+1} ${G+1} 1 ${j}
`}k(D)},F.onerror=()=>{R(new Error("Failed to load the LEGO image"))}}catch(D){R(D)}});Promise.all([w(),V()]).then(([k,R])=>{const D=new Blob([R],{type:"text/plain"}),F=URL.createObjectURL(D),$=document.createElement("a");$.href=F,$.download=`${S}.txt`,document.body.appendChild($),$.click(),document.body.removeChild($),URL.revokeObjectURL(F),c(S,"mosaic",k),d(!0),setTimeout(()=>d(!1),5e3)}).catch(k=>{console.error("Error exporting TXT:",k),x("Error exporting TXT: "+k.message),setTimeout(()=>x(null),7e3)})}catch(w){console.error("Error in exportAsTXT:",w),x("Error exporting TXT: "+w.message),setTimeout(()=>x(null),7e3)}},[e,h,i,c]),E=z.useCallback(()=>{try{(()=>{const S=new Image;S.src=e;const w=document.createElement("canvas"),V=w.getContext("2d"),k=256,R=k,D=k;return w.width=R,w.height=D,V.fillStyle="#f0f0f0",V.fillRect(0,0,R,D),new Promise(F=>{S.onload=()=>{const $=Math.min(R/S.width,D/S.height),K=S.width*$,U=S.height*$,H=(R-K)/2,G=(D-U)/2;V.drawImage(S,0,0,S.width,S.height,H,G,K,U),V.strokeStyle="#ccc",V.lineWidth=4,V.strokeRect(H,G,K,U),V.fillStyle="#e00025",V.fillRect(0,D-30,R,30),V.font="bold 16px Arial",V.fillStyle="white",V.textAlign="center",V.textBaseline="middle",V.fillText("BRICK IT MOSAIC",R/2,D-15);const de=w.toDataURL("image/png",.9);F(de)},S.onerror=()=>{F(e)}})})().then(S=>{const w={originalImage:r,croppedImage:o,pixelatedImage:t,legoImage:e,colorConfig:i,version:"1.0",dateCreated:new Date().toISOString()},V=new Blob([JSON.stringify(w)],{type:"application/json"}),k=document.createElement("a");k.href=URL.createObjectURL(V),k.download=`${h}.json`,document.body.appendChild(k),k.click(),document.body.removeChild(k),c(h,"mosaic",S),d(!0),setTimeout(()=>d(!1),3e3)}).catch(S=>{console.error("Error generating thumbnail:",S),x("Error generating thumbnail: "+S.message)})}catch(T){console.error("Error exporting JSON:",T),x("Error exporting JSON: "+T.message)}},[r,o,t,e,i,h,c]),P=T=>{const S=T.target.files[0];if(!S)return;x(null);const w=new FileReader;w.onload=V=>{try{const k=JSON.parse(V.target.result);if(!k.originalImage||!k.croppedImage||!k.legoImage)throw new Error("Invalid project file format");s(k.originalImage),a(k.croppedImage),d(!0),setTimeout(()=>{d(!1),n("/mosaic-generator")},2e3)}catch(k){console.error("Error importing project:",k),x("Error importing project: "+k.message)}},w.onerror=()=>{x("Error reading file")},w.readAsText(S)};return X("div",{className:"container mx-auto px-4 py-8",children:[C("h1",{className:"text-3xl font-bold text-center text-gray-800 mb-8",children:"Your LEGO Mosaic"}),X("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[C("div",{className:"flex justify-center mb-4 relative",children:e&&X("div",{className:"relative inline-block border border-gray-300",children:[C("img",{src:e,alt:"LEGO Mosaic",className:"w-auto max-h-[50vh]"}),u&&X("div",{className:"absolute inset-0 grid grid-cols-16 grid-rows-16 pointer-events-none",children:[Array.from({length:16}).map((T,S)=>C("div",{className:"border-r border-black border-opacity-10",style:{gridColumn:S+1,gridRow:"span 16"}},`col-${S}`)),Array.from({length:16}).map((T,S)=>C("div",{className:"border-b border-black border-opacity-10",style:{gridRow:S+1,gridColumn:"span 16"}},`row-${S}`))]})]})}),C("div",{className:"flex justify-center mb-6",children:X("label",{className:"inline-flex items-center",children:[C("input",{type:"checkbox",checked:u,onChange:T=>f(T.target.checked),className:"form-checkbox h-5 w-5 text-blue-600"}),C("span",{className:"ml-2 text-gray-800 font-medium",children:"Show Grid"})]})}),X("div",{className:"flex space-x-4",children:[C("button",{className:"flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700",onClick:()=>n("/mosaic"),children:"Create New"}),C("button",{className:"flex-1 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700",onClick:y,children:"Export PNG"})]})]}),X("div",{className:"bg-white rounded-lg shadow-md p-6",children:[C("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"Export for LEGO Printer"}),X("div",{className:"mb-4",children:[C("label",{className:"block text-sm font-medium text-gray-800 mb-1",children:"File Name"}),C("input",{type:"text",value:h,onChange:T=>p(T.target.value),className:"w-full rounded border p-2 text-gray-800"})]}),C("button",{className:"w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 mb-4",onClick:M,children:"Export for LEGO Printer (.txt)"}),X("div",{className:"flex space-x-4 mb-6",children:[C("button",{className:"flex-1 py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700",onClick:E,children:"Save Project (.json)"}),C("button",{className:"flex-1 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700",onClick:()=>l.current.click(),children:"Load Project"}),C("input",{ref:l,type:"file",className:"hidden",accept:".json",onChange:P})]}),C("h3",{className:"text-lg font-semibold text-gray-800 mb-2",children:"Brick Count"}),C("div",{className:"max-h-[200px] overflow-y-auto border rounded-lg p-3 bg-gray-50",children:X("table",{className:"w-full text-sm",children:[C("thead",{children:X("tr",{className:"border-b",children:[C("th",{className:"text-left py-1 text-gray-800",children:"Color"}),C("th",{className:"text-right py-1 text-gray-800",children:"Count"})]})}),C("tbody",{children:Object.entries(v).map(([T,S])=>X("tr",{className:"border-b border-gray-200",children:[X("td",{className:"py-1 flex items-center text-gray-800",children:[C("div",{className:"w-4 h-4 rounded-full mr-2",style:{backgroundColor:`rgb(${i[T].rgb.join(",")})`}}),T.replace("_"," ").replace(/\b\w/g,w=>w.toUpperCase())]}),C("td",{className:"text-right py-1 text-gray-800",children:S})]},T))})]})}),m&&C("div",{className:"mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded-lg shadow-md",children:C("span",{className:"font-medium",children:m===!0?"Operation successful!":m})}),_&&C("div",{className:"mt-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded-lg shadow-md",children:C("span",{className:"font-medium",children:_})})]})]})]})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Df="151",Gr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Vr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lM=0,gp=1,cM=2,Ev=1,uM=2,vs=3,Ji=0,un=1,ti=2,Yi=0,To=1,vp=2,xp=3,_p=4,dM=5,so=100,fM=101,hM=102,yp=103,Sp=104,pM=200,mM=201,gM=202,vM=203,bv=204,Cv=205,xM=206,_M=207,yM=208,SM=209,MM=210,wM=0,EM=1,bM=2,wd=3,CM=4,TM=5,AM=6,PM=7,Tv=0,LM=1,RM=2,_i=0,DM=1,NM=2,IM=3,UM=4,kM=5,Av=300,zo=301,Fo=302,Ed=303,bd=304,ec=306,Cd=1e3,Hn=1001,Td=1002,qt=1003,Mp=1004,kc=1005,An=1006,OM=1007,qs=1008,Rr=1009,zM=1010,FM=1011,Pv=1012,BM=1013,yr=1014,Sr=1015,Ys=1016,GM=1017,VM=1018,Ao=1020,HM=1021,Wn=1023,WM=1024,jM=1025,br=1026,Bo=1027,XM=1028,$M=1029,qM=1030,YM=1031,ZM=1033,Oc=33776,zc=33777,Fc=33778,Bc=33779,wp=35840,Ep=35841,bp=35842,Cp=35843,KM=36196,Tp=37492,Ap=37496,Pp=37808,Lp=37809,Rp=37810,Dp=37811,Np=37812,Ip=37813,Up=37814,kp=37815,Op=37816,zp=37817,Fp=37818,Bp=37819,Gp=37820,Vp=37821,Gc=36492,JM=36283,Hp=36284,Wp=36285,jp=36286,Dr=3e3,st=3001,QM=3200,ew=3201,Lv=0,tw=1,Jn="srgb",Zs="srgb-linear",Rv="display-p3",Vc=7680,nw=519,Xp=35044,$p="300 es",Ad=1035;class Fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hc=Math.PI/180,Pd=180/Math.PI;function na(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function Yt(n,e,t){return Math.max(e,Math.min(t,n))}function iw(n,e){return(n%e+e)%e}function Wc(n,e,t){return(1-t)*n+t*e}function qp(n){return(n&n-1)===0&&n!==0}function rw(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function wa(n,e){switch(e.constructor){case Float32Array:return n;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fn(n,e){switch(e.constructor){case Float32Array:return n;case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ve{constructor(e=0,t=0){Ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $e{constructor(){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,i,r,o,s,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],p=i[5],_=i[8],x=r[0],m=r[3],d=r[6],v=r[1],g=r[4],y=r[7],M=r[2],E=r[5],P=r[8];return o[0]=s*x+a*v+c*M,o[3]=s*m+a*g+c*E,o[6]=s*d+a*y+c*P,o[1]=l*x+u*v+f*M,o[4]=l*m+u*g+f*E,o[7]=l*d+u*y+f*P,o[2]=h*x+p*v+_*M,o[5]=h*m+p*g+_*E,o[8]=h*d+p*y+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*a*l-i*o*u+i*a*c+r*o*l-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*s-a*l,h=a*c-u*o,p=l*o-s*c,_=t*f+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=f*x,e[1]=(r*l-u*i)*x,e[2]=(a*i-r*s)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*o-a*t)*x,e[6]=p*x,e[7]=(i*c-l*t)*x,e[8]=(s*t-i*o)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,o,s,a){const c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*s+l*a)+s+e,-r*l,r*c,-r*(-l*s+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(jc.makeScale(e,t)),this}rotate(e){return this.premultiply(jc.makeRotation(-e)),this}translate(e,t){return this.premultiply(jc.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jc=new $e;function Dv(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ul(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Po(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xc(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ow=new $e().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),sw=new $e().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function aw(n){return n.convertSRGBToLinear().applyMatrix3(sw)}function lw(n){return n.applyMatrix3(ow).convertLinearToSRGB()}const cw={[Zs]:n=>n,[Jn]:n=>n.convertSRGBToLinear(),[Rv]:aw},uw={[Zs]:n=>n,[Jn]:n=>n.convertLinearToSRGB(),[Rv]:lw},hn={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return Zs},set workingColorSpace(n){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=cw[e],r=uw[t];if(i===void 0||r===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)}};let Hr;class Nv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hr===void 0&&(Hr=Ul("canvas")),Hr.width=e.width,Hr.height=e.height;const i=Hr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Hr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ul("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=Po(o[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Po(t[i]/255)*255):t[i]=Po(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Iv{constructor(e=null){this.isSource=!0,this.uuid=na(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push($c(r[s].image)):o.push($c(r[s]))}else o=$c(r);i.url=o}return t||(e.images[this.uuid]=i),i}}function $c(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Nv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dw=0;class yn extends Fr{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,i=Hn,r=Hn,o=An,s=qs,a=Wn,c=Rr,l=yn.DEFAULT_ANISOTROPY,u=Dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dw++}),this.uuid=na(),this.name="",this.source=new Iv(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Av)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cd:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Td:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cd:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Td:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Av;yn.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,i=0,r=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,o;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],p=c[5],_=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const g=(l+1)/2,y=(p+1)/2,M=(d+1)/2,E=(u+h)/4,P=(f+x)/4,T=(_+m)/4;return g>y&&g>M?g<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(g),r=E/i,o=P/i):y>M?y<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(y),i=E/r,o=T/r):M<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(M),i=P/o,r=T/o),this.set(i,r,o,t),this}let v=Math.sqrt((m-_)*(m-_)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(f-x)/v,this.z=(h-u)/v,this.w=Math.acos((l+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nr extends Fr{constructor(e=1,t=1,i={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const r={width:e,height:t,depth:1};this.texture=new yn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:An,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Iv(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Uv extends yn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fw extends yn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ir{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,o,s,a){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3];const h=o[s+0],p=o[s+1],_=o[s+2],x=o[s+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=_,e[t+3]=x;return}if(f!==x||c!==h||l!==p||u!==_){let m=1-a;const d=c*h+l*p+u*_+f*x,v=d>=0?1:-1,g=1-d*d;if(g>Number.EPSILON){const M=Math.sqrt(g),E=Math.atan2(M,d*v);m=Math.sin(m*E)/M,a=Math.sin(a*E)/M}const y=a*v;if(c=c*m+h*y,l=l*m+p*y,u=u*m+_*y,f=f*m+x*y,m===1-a){const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,o,s){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=o[s],h=o[s+1],p=o[s+2],_=o[s+3];return e[t]=a*_+u*f+c*p-l*h,e[t+1]=c*_+u*h+l*f-a*p,e[t+2]=l*_+u*p+a*h-c*f,e[t+3]=u*_-a*f-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),f=a(o/2),h=c(i/2),p=c(r/2),_=c(o/2);switch(s){case"XYZ":this._x=h*u*f+l*p*_,this._y=l*p*f-h*u*_,this._z=l*u*_+h*p*f,this._w=l*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+l*p*_,this._y=l*p*f-h*u*_,this._z=l*u*_-h*p*f,this._w=l*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-l*p*_,this._y=l*p*f+h*u*_,this._z=l*u*_+h*p*f,this._w=l*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-l*p*_,this._y=l*p*f+h*u*_,this._z=l*u*_-h*p*f,this._w=l*u*f+h*p*_;break;case"YZX":this._x=h*u*f+l*p*_,this._y=l*p*f+h*u*_,this._z=l*u*_-h*p*f,this._w=l*u*f-h*p*_;break;case"XZY":this._x=h*u*f-l*p*_,this._y=l*p*f-h*u*_,this._z=l*u*_+h*p*f,this._w=l*u*f+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],o=t[8],s=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(o-l)*p,this._z=(s-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(o+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(o-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(s-r)/p,this._x=(o+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Yt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,o=e._z,s=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-i*l,this._z=o*u+s*l+i*c-r*a,this._w=s*u-i*a-r*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,o=this._z,s=this._w;let a=s*e._w+i*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*s+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*o+t*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=s*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=o*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(o),i*Math.cos(o),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*r,this.y=o[1]*t+o[4]*i+o[7]*r,this.z=o[2]*t+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,c=e.w,l=c*t+s*r-a*i,u=c*i+a*t-o*r,f=c*r+o*i-s*t,h=-o*t-s*i-a*r;return this.x=l*c+h*-o+u*-a-f*-s,this.y=u*c+h*-s+f*-o-l*-a,this.z=f*c+h*-a+l*-s-u*-o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r,this.y=o[1]*t+o[5]*i+o[9]*r,this.z=o[2]*t+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,o=e.z,s=t.x,a=t.y,c=t.z;return this.x=r*c-o*a,this.y=o*s-i*c,this.z=i*a-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return qc.copy(this).projectOnVector(e),this.sub(qc)}reflect(e){return this.sub(qc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qc=new O,Yp=new Ir;class ri{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox),Wr.applyMatrix4(e.matrixWorld),this.union(Wr);else{const r=e.geometry;if(r!==void 0)if(t&&r.attributes!==void 0&&r.attributes.position!==void 0){const o=r.attributes.position;for(let s=0,a=o.count;s<a;s++)ai.fromBufferAttribute(o,s).applyMatrix4(e.matrixWorld),this.expandByPoint(ai)}else r.boundingBox===null&&r.computeBoundingBox(),Wr.copy(r.boundingBox),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(as),Ea.subVectors(this.max,as),jr.subVectors(e.a,as),Xr.subVectors(e.b,as),$r.subVectors(e.c,as),Ti.subVectors(Xr,jr),Ai.subVectors($r,Xr),lr.subVectors(jr,$r);let t=[0,-Ti.z,Ti.y,0,-Ai.z,Ai.y,0,-lr.z,lr.y,Ti.z,0,-Ti.x,Ai.z,0,-Ai.x,lr.z,0,-lr.x,-Ti.y,Ti.x,0,-Ai.y,Ai.x,0,-lr.y,lr.x,0];return!Yc(t,jr,Xr,$r,Ea)||(t=[1,0,0,0,1,0,0,0,1],!Yc(t,jr,Xr,$r,Ea))?!1:(ba.crossVectors(Ti,Ai),t=[ba.x,ba.y,ba.z],Yc(t,jr,Xr,$r,Ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new O,new O,new O,new O,new O,new O,new O,new O],ai=new O,Wr=new ri,jr=new O,Xr=new O,$r=new O,Ti=new O,Ai=new O,lr=new O,as=new O,Ea=new O,ba=new O,cr=new O;function Yc(n,e,t,i,r){for(let o=0,s=n.length-3;o<=s;o+=3){cr.fromArray(n,o);const a=r.x*Math.abs(cr.x)+r.y*Math.abs(cr.y)+r.z*Math.abs(cr.z),c=e.dot(cr),l=t.dot(cr),u=i.dot(cr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const hw=new ri,ls=new O,Zc=new O;class Yo{constructor(e=new O,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):hw.setFromPoints(e).getCenter(i);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ls.subVectors(e,this.center);const t=ls.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ls,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ls.copy(e.center).add(Zc)),this.expandByPoint(ls.copy(e.center).sub(Zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new O,Kc=new O,Ca=new O,Pi=new O,Jc=new O,Ta=new O,Qc=new O;class Nf{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Kc.copy(e).add(t).multiplyScalar(.5),Ca.copy(t).sub(e).normalize(),Pi.copy(this.origin).sub(Kc);const o=e.distanceTo(t)*.5,s=-this.direction.dot(Ca),a=Pi.dot(this.direction),c=-Pi.dot(Ca),l=Pi.lengthSq(),u=Math.abs(1-s*s);let f,h,p,_;if(u>0)if(f=s*c-a,h=s*a-c,_=o*u,f>=0)if(h>=-_)if(h<=_){const x=1/u;f*=x,h*=x,p=f*(f+s*h+2*a)+h*(s*f+h+2*c)+l}else h=o,f=Math.max(0,-(s*h+a)),p=-f*f+h*(h+2*c)+l;else h=-o,f=Math.max(0,-(s*h+a)),p=-f*f+h*(h+2*c)+l;else h<=-_?(f=Math.max(0,-(-s*o+a)),h=f>0?-o:Math.min(Math.max(-o,-c),o),p=-f*f+h*(h+2*c)+l):h<=_?(f=0,h=Math.min(Math.max(-o,-c),o),p=h*(h+2*c)+l):(f=Math.max(0,-(s*o+a)),h=f>0?o:Math.min(Math.max(-o,-c),o),p=-f*f+h*(h+2*c)+l);else h=s>0?-o:o,f=Math.max(0,-(s*h+a)),p=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Kc).addScaledVector(Ca,h),p}intersectSphere(e,t){li.subVectors(e.center,this.origin);const i=li.dot(this.direction),r=li.dot(li)-i*i,o=e.radius*e.radius;if(r>o)return null;const s=Math.sqrt(o-r),a=i-s,c=i+s;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,o,s,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(o=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(o=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),i>s||o>r||((o>i||isNaN(i))&&(i=o),(s<r||isNaN(r))&&(r=s),f>=0?(a=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,i,r,o){Jc.subVectors(t,e),Ta.subVectors(i,e),Qc.crossVectors(Jc,Ta);let s=this.direction.dot(Qc),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Pi.subVectors(this.origin,e);const c=a*this.direction.dot(Ta.crossVectors(Pi,Ta));if(c<0)return null;const l=a*this.direction.dot(Jc.cross(Pi));if(l<0||c+l>s)return null;const u=-a*Pi.dot(Qc);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,i,r,o,s,a,c,l,u,f,h,p,_,x,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=o,d[5]=s,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/qr.setFromMatrixColumn(e,0).length(),o=1/qr.setFromMatrixColumn(e,1).length(),s=1/qr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,o=e.z,s=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),f=Math.sin(o);if(e.order==="XYZ"){const h=s*u,p=s*f,_=a*u,x=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=p+_*l,t[5]=h-x*l,t[9]=-a*c,t[2]=x-h*l,t[6]=_+p*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,p=c*f,_=l*u,x=l*f;t[0]=h+x*a,t[4]=_*a-p,t[8]=s*l,t[1]=s*f,t[5]=s*u,t[9]=-a,t[2]=p*a-_,t[6]=x+h*a,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,p=c*f,_=l*u,x=l*f;t[0]=h-x*a,t[4]=-s*f,t[8]=_+p*a,t[1]=p+_*a,t[5]=s*u,t[9]=x-h*a,t[2]=-s*l,t[6]=a,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,p=s*f,_=a*u,x=a*f;t[0]=c*u,t[4]=_*l-p,t[8]=h*l+x,t[1]=c*f,t[5]=x*l+h,t[9]=p*l-_,t[2]=-l,t[6]=a*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,p=s*l,_=a*c,x=a*l;t[0]=c*u,t[4]=x-h*f,t[8]=_*f+p,t[1]=f,t[5]=s*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*f+_,t[10]=h-x*f}else if(e.order==="XZY"){const h=s*c,p=s*l,_=a*c,x=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+x,t[5]=s*u,t[9]=p*f-_,t[2]=_*f-p,t[6]=a*u,t[10]=x*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pw,e,mw)}lookAt(e,t,i){const r=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Li.crossVectors(i,pn),Li.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Li.crossVectors(i,pn)),Li.normalize(),Aa.crossVectors(pn,Li),r[0]=Li.x,r[4]=Aa.x,r[8]=pn.x,r[1]=Li.y,r[5]=Aa.y,r[9]=pn.y,r[2]=Li.z,r[6]=Aa.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],p=i[13],_=i[2],x=i[6],m=i[10],d=i[14],v=i[3],g=i[7],y=i[11],M=i[15],E=r[0],P=r[4],T=r[8],S=r[12],w=r[1],V=r[5],k=r[9],R=r[13],D=r[2],F=r[6],$=r[10],K=r[14],U=r[3],H=r[7],G=r[11],de=r[15];return o[0]=s*E+a*w+c*D+l*U,o[4]=s*P+a*V+c*F+l*H,o[8]=s*T+a*k+c*$+l*G,o[12]=s*S+a*R+c*K+l*de,o[1]=u*E+f*w+h*D+p*U,o[5]=u*P+f*V+h*F+p*H,o[9]=u*T+f*k+h*$+p*G,o[13]=u*S+f*R+h*K+p*de,o[2]=_*E+x*w+m*D+d*U,o[6]=_*P+x*V+m*F+d*H,o[10]=_*T+x*k+m*$+d*G,o[14]=_*S+x*R+m*K+d*de,o[3]=v*E+g*w+y*D+M*U,o[7]=v*P+g*V+y*F+M*H,o[11]=v*T+g*k+y*$+M*G,o[15]=v*S+g*R+y*K+M*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],o=e[12],s=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],p=e[14],_=e[3],x=e[7],m=e[11],d=e[15];return _*(+o*c*f-r*l*f-o*a*h+i*l*h+r*a*p-i*c*p)+x*(+t*c*p-t*l*h+o*s*h-r*s*p+r*l*u-o*c*u)+m*(+t*l*f-t*a*p-o*s*f+i*s*p+o*a*u-i*l*u)+d*(-r*a*u-t*c*f+t*a*h+r*s*f-i*s*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],p=e[11],_=e[12],x=e[13],m=e[14],d=e[15],v=f*m*l-x*h*l+x*c*p-a*m*p-f*c*d+a*h*d,g=_*h*l-u*m*l-_*c*p+s*m*p+u*c*d-s*h*d,y=u*x*l-_*f*l+_*a*p-s*x*p-u*a*d+s*f*d,M=_*f*c-u*x*c-_*a*h+s*x*h+u*a*m-s*f*m,E=t*v+i*g+r*y+o*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/E;return e[0]=v*P,e[1]=(x*h*o-f*m*o-x*r*p+i*m*p+f*r*d-i*h*d)*P,e[2]=(a*m*o-x*c*o+x*r*l-i*m*l-a*r*d+i*c*d)*P,e[3]=(f*c*o-a*h*o-f*r*l+i*h*l+a*r*p-i*c*p)*P,e[4]=g*P,e[5]=(u*m*o-_*h*o+_*r*p-t*m*p-u*r*d+t*h*d)*P,e[6]=(_*c*o-s*m*o-_*r*l+t*m*l+s*r*d-t*c*d)*P,e[7]=(s*h*o-u*c*o+u*r*l-t*h*l-s*r*p+t*c*p)*P,e[8]=y*P,e[9]=(_*f*o-u*x*o-_*i*p+t*x*p+u*i*d-t*f*d)*P,e[10]=(s*x*o-_*a*o+_*i*l-t*x*l-s*i*d+t*a*d)*P,e[11]=(u*a*o-s*f*o-u*i*l+t*f*l+s*i*p-t*a*p)*P,e[12]=M*P,e[13]=(u*x*r-_*f*r+_*i*h-t*x*h-u*i*m+t*f*m)*P,e[14]=(_*a*r-s*x*r-_*i*c+t*x*c+s*i*m-t*a*m)*P,e[15]=(s*f*r-u*a*r+u*i*c-t*f*c-s*i*h+t*a*h)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,o=e.z;return t[0]*=i,t[4]*=r,t[8]*=o,t[1]*=i,t[5]*=r,t[9]*=o,t[2]*=i,t[6]*=r,t[10]*=o,t[3]*=i,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),o=1-i,s=e.x,a=e.y,c=e.z,l=o*s,u=o*a;return this.set(l*s+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,o,s){return this.set(1,i,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,o=t._x,s=t._y,a=t._z,c=t._w,l=o+o,u=s+s,f=a+a,h=o*l,p=o*u,_=o*f,x=s*u,m=s*f,d=a*f,v=c*l,g=c*u,y=c*f,M=i.x,E=i.y,P=i.z;return r[0]=(1-(x+d))*M,r[1]=(p+y)*M,r[2]=(_-g)*M,r[3]=0,r[4]=(p-y)*E,r[5]=(1-(h+d))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(_+g)*P,r[9]=(m-v)*P,r[10]=(1-(h+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let o=qr.set(r[0],r[1],r[2]).length();const s=qr.set(r[4],r[5],r[6]).length(),a=qr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const l=1/o,u=1/s,f=1/a;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=f,Un.elements[9]*=f,Un.elements[10]*=f,t.setFromRotationMatrix(Un),i.x=o,i.y=s,i.z=a,this}makePerspective(e,t,i,r,o,s){const a=this.elements,c=2*o/(t-e),l=2*o/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r),h=-(s+o)/(s-o),p=-2*s*o/(s-o);return a[0]=c,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=l,a[9]=f,a[13]=0,a[2]=0,a[6]=0,a[10]=h,a[14]=p,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,i,r,o,s){const a=this.elements,c=1/(t-e),l=1/(i-r),u=1/(s-o),f=(t+e)*c,h=(i+r)*l,p=(s+o)*u;return a[0]=2*c,a[4]=0,a[8]=0,a[12]=-f,a[1]=0,a[5]=2*l,a[9]=0,a[13]=-h,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-p,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const qr=new O,Un=new rt,pw=new O(0,0,0),mw=new O(1,1,1),Li=new O,Aa=new O,pn=new O,Zp=new rt,Kp=new Ir;class tc{constructor(e=0,t=0,i=0,r=tc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,o=r[0],s=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Yt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Yt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zp,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kp.setFromEuler(this),this.setFromQuaternion(Kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tc.DEFAULT_ORDER="XYZ";class If{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gw=0;const Jp=new O,Yr=new Ir,ci=new rt,Pa=new O,cs=new O,vw=new O,xw=new Ir,Qp=new O(1,0,0),em=new O(0,1,0),tm=new O(0,0,1),_w={type:"added"},nm={type:"removed"};class Ut extends Fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gw++}),this.uuid=na(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new O,t=new tc,i=new Ir,r=new O(1,1,1);function o(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new $e}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new If,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yr.setFromAxisAngle(e,t),this.quaternion.multiply(Yr),this}rotateOnWorldAxis(e,t){return Yr.setFromAxisAngle(e,t),this.quaternion.premultiply(Yr),this}rotateX(e){return this.rotateOnAxis(Qp,e)}rotateY(e){return this.rotateOnAxis(em,e)}rotateZ(e){return this.rotateOnAxis(tm,e)}translateOnAxis(e,t){return Jp.copy(e).applyQuaternion(this.quaternion),this.position.add(Jp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qp,e)}translateY(e){return this.translateOnAxis(em,e)}translateZ(e){return this.translateOnAxis(tm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Pa.copy(e):Pa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(cs,Pa,this.up):ci.lookAt(Pa,cs,this.up),this.quaternion.setFromRotationMatrix(ci),r&&(ci.extractRotation(r.matrixWorld),Yr.setFromRotationMatrix(ci),this.quaternion.premultiply(Yr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(_w)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nm)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(nm)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let r=0,o=this.children.length;r<o;r++){const s=this.children[r].getObjectsByProperty(e,t);s.length>0&&(i=i.concat(s))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,e,vw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,xw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const o=t[i];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let o=0,s=r.length;o<s;o++){const a=r[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];o(e.shapes,f)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(e.materials,this.material[c]));r.material=a}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(o(e.animations,c))}}if(t){const a=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),f=s(e.shapes),h=s(e.skeletons),p=s(e.animations),_=s(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function s(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ut.DEFAULT_UP=new O(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new O,ui=new O,eu=new O,di=new O,Zr=new O,Kr=new O,im=new O,tu=new O,nu=new O,iu=new O;let La=!1;class Gn{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),kn.subVectors(e,t),r.cross(kn);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,i,r,o){kn.subVectors(r,t),ui.subVectors(i,t),eu.subVectors(e,t);const s=kn.dot(kn),a=kn.dot(ui),c=kn.dot(eu),l=ui.dot(ui),u=ui.dot(eu),f=s*l-a*a;if(f===0)return o.set(-2,-1,-1);const h=1/f,p=(l*c-a*u)*h,_=(s*u-a*c)*h;return o.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,di),di.x>=0&&di.y>=0&&di.x+di.y<=1}static getUV(e,t,i,r,o,s,a,c){return La===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),La=!0),this.getInterpolation(e,t,i,r,o,s,a,c)}static getInterpolation(e,t,i,r,o,s,a,c){return this.getBarycoord(e,t,i,r,di),c.setScalar(0),c.addScaledVector(o,di.x),c.addScaledVector(s,di.y),c.addScaledVector(a,di.z),c}static isFrontFacing(e,t,i,r){return kn.subVectors(i,t),ui.subVectors(e,t),kn.cross(ui).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),kn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,o){return La===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),La=!0),Gn.getInterpolation(e,this.a,this.b,this.c,t,i,r,o)}getInterpolation(e,t,i,r,o){return Gn.getInterpolation(e,this.a,this.b,this.c,t,i,r,o)}containsPoint(e){return Gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,o=this.c;let s,a;Zr.subVectors(r,i),Kr.subVectors(o,i),tu.subVectors(e,i);const c=Zr.dot(tu),l=Kr.dot(tu);if(c<=0&&l<=0)return t.copy(i);nu.subVectors(e,r);const u=Zr.dot(nu),f=Kr.dot(nu);if(u>=0&&f<=u)return t.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(Zr,s);iu.subVectors(e,o);const p=Zr.dot(iu),_=Kr.dot(iu);if(_>=0&&p<=_)return t.copy(o);const x=p*l-c*_;if(x<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(i).addScaledVector(Kr,a);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return im.subVectors(o,r),a=(f-u)/(f-u+(p-_)),t.copy(r).addScaledVector(im,a);const d=1/(m+x+h);return s=x*d,a=h*d,t.copy(i).addScaledVector(Zr,s).addScaledVector(Kr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let yw=0;class Zo extends Fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yw++}),this.uuid=na(),this.name="",this.type="Material",this.blending=To,this.side=Ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=bv,this.blendDst=Cv,this.blendEquation=so,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=wd,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nw,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vc,this.stencilZFail=Vc,this.stencilZPass=Vc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==To&&(i.blending=this.blending),this.side!==Ji&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(i.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){const s=[];for(const a in o){const c=o[a];delete c.metadata,s.push(c)}return s}if(t){const o=r(e.textures),s=r(e.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const kv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Ra={h:0,s:0,l:0};function ru(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&i===void 0?this.set(e):this.setRGB(e,t,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,hn.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=hn.workingColorSpace){return this.r=e,this.g=t,this.b=i,hn.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=hn.workingColorSpace){if(e=iw(e,1),t=Yt(t,0,1),i=Yt(i,0,1),t===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+t):i+t-i*t,s=2*i-o;this.r=ru(s,o,e+1/3),this.g=ru(s,o,e),this.b=ru(s,o,e-1/3)}return hn.toWorkingColorSpace(this,r),this}setStyle(e,t=Jn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(o[1],10))/255,this.g=Math.min(255,parseInt(o[2],10))/255,this.b=Math.min(255,parseInt(o[3],10))/255,hn.toWorkingColorSpace(this,t),i(o[4]),this;if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(o[1],10))/100,this.g=Math.min(100,parseInt(o[2],10))/100,this.b=Math.min(100,parseInt(o[3],10))/100,hn.toWorkingColorSpace(this,t),i(o[4]),this;break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const c=parseFloat(o[1])/360,l=parseFloat(o[2])/100,u=parseFloat(o[3])/100;return i(o[4]),this.setHSL(c,l,u,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jn){const i=kv[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Po(e.r),this.g=Po(e.g),this.b=Po(e.b),this}copyLinearToSRGB(e){return this.r=Xc(e.r),this.g=Xc(e.g),this.b=Xc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jn){return hn.fromWorkingColorSpace(Bt.copy(this),e),Yt(Bt.r*255,0,255)<<16^Yt(Bt.g*255,0,255)<<8^Yt(Bt.b*255,0,255)<<0}getHexString(e=Jn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=hn.workingColorSpace){hn.fromWorkingColorSpace(Bt.copy(this),t);const i=Bt.r,r=Bt.g,o=Bt.b,s=Math.max(i,r,o),a=Math.min(i,r,o);let c,l;const u=(a+s)/2;if(a===s)c=0,l=0;else{const f=s-a;switch(l=u<=.5?f/(s+a):f/(2-s-a),s){case i:c=(r-o)/f+(r<o?6:0);break;case r:c=(o-i)/f+2;break;case o:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=hn.workingColorSpace){return hn.fromWorkingColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=Jn){hn.fromWorkingColorSpace(Bt.copy(this),e);const t=Bt.r,i=Bt.g,r=Bt.b;return e!==Jn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${t*255|0},${i*255|0},${r*255|0})`}offsetHSL(e,t,i){return this.getHSL(On),On.h+=e,On.s+=t,On.l+=i,this.setHSL(On.h,On.s,On.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(Ra);const i=Wc(On.h,Ra.h,t),r=Wc(On.s,Ra.s,t),o=Wc(On.l,Ra.l,t);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*r,this.g=o[1]*t+o[4]*i+o[7]*r,this.b=o[2]*t+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new Ye;Ye.NAMES=kv;class Ii extends Zo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Tv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new O,Da=new Ve;class Kt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xp,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wa(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wa(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wa(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array),o=fn(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xp&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Ov extends Kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zv extends Kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class vt extends Kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Sw=0;const bn=new rt,ou=new Ut,Jr=new O,mn=new ri,us=new ri,Pt=new O;class Jt extends Fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sw++}),this.uuid=na(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dv(e)?zv:Ov)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new $e().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,i){return bn.makeTranslation(e,t,i),this.applyMatrix4(bn),this}scale(e,t,i){return bn.makeScale(e,t,i),this.applyMatrix4(bn),this}lookAt(e){return ou.lookAt(e),ou.updateMatrix(),this.applyMatrix4(ou.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jr).negate(),this.translate(Jr.x,Jr.y,Jr.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new vt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const o=t[i];mn.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){const a=t[o];us.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(mn.min,us.min),mn.expandByPoint(Pt),Pt.addVectors(mn.max,us.max),mn.expandByPoint(Pt)):(mn.expandByPoint(us.min),mn.expandByPoint(us.max))}mn.getCenter(i);let r=0;for(let o=0,s=e.count;o<s;o++)Pt.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(Pt));if(t)for(let o=0,s=t.length;o<s;o++){const a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Pt.fromBufferAttribute(a,l),c&&(Jr.fromBufferAttribute(e,l),Pt.add(Jr)),r=Math.max(r,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,o=t.normal.array,s=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let w=0;w<a;w++)l[w]=new O,u[w]=new O;const f=new O,h=new O,p=new O,_=new Ve,x=new Ve,m=new Ve,d=new O,v=new O;function g(w,V,k){f.fromArray(r,w*3),h.fromArray(r,V*3),p.fromArray(r,k*3),_.fromArray(s,w*2),x.fromArray(s,V*2),m.fromArray(s,k*2),h.sub(f),p.sub(f),x.sub(_),m.sub(_);const R=1/(x.x*m.y-m.x*x.y);isFinite(R)&&(d.copy(h).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(R),v.copy(p).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar(R),l[w].add(d),l[V].add(d),l[k].add(d),u[w].add(v),u[V].add(v),u[k].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let w=0,V=y.length;w<V;++w){const k=y[w],R=k.start,D=k.count;for(let F=R,$=R+D;F<$;F+=3)g(i[F+0],i[F+1],i[F+2])}const M=new O,E=new O,P=new O,T=new O;function S(w){P.fromArray(o,w*3),T.copy(P);const V=l[w];M.copy(V),M.sub(P.multiplyScalar(P.dot(V))).normalize(),E.crossVectors(T,V);const R=E.dot(u[w])<0?-1:1;c[w*4]=M.x,c[w*4+1]=M.y,c[w*4+2]=M.z,c[w*4+3]=R}for(let w=0,V=y.length;w<V;++w){const k=y[w],R=k.start,D=k.count;for(let F=R,$=R+D;F<$;F+=3)S(i[F+0]),S(i[F+1]),S(i[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new O,o=new O,s=new O,a=new O,c=new O,l=new O,u=new O,f=new O;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,o),f.subVectors(r,o),u.cross(f),a.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),a.add(u),c.add(u),l.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),o.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,o),f.subVectors(r,o),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let p=0,_=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let d=0;d<u;d++)h[_++]=l[p++]}return new Kt(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],p=e(h,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,c=s.length;a<c;a++){const l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const p=l[f];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const o=e.morphAttributes;for(const l in o){const u=[],f=o[l];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const f=s[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rm=new rt,Yn=new Nf,Na=new Yo,om=new O,Qr=new O,eo=new O,to=new O,su=new O,Ia=new O,Ua=new Ve,ka=new Ve,Oa=new Ve,sm=new O,am=new O,lm=new O,za=new O,Fa=new O;class xn extends Ut{constructor(e=new Jt,t=new Ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){const a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(o&&a){Ia.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const u=a[c],f=o[c];u!==0&&(su.fromBufferAttribute(f,e),s?Ia.addScaledVector(su,u):Ia.addScaledVector(su.sub(t),u))}t.add(Ia)}return this.isSkinnedMesh&&this.applyBoneTransform(e,t),t}raycast(e,t){const i=this.geometry,r=this.material,o=this.matrixWorld;if(r===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),Na.copy(i.boundingSphere),Na.applyMatrix4(o),Yn.copy(e.ray).recast(e.near),Na.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(Na,om)===null||Yn.origin.distanceToSquared(om)>(e.far-e.near)**2))||(rm.copy(o).invert(),Yn.copy(e.ray).applyMatrix4(rm),i.boundingBox!==null&&Yn.intersectsBox(i.boundingBox)===!1))return;let s;const a=i.index,c=i.attributes.position,l=i.attributes.uv,u=i.attributes.uv2,f=i.attributes.normal,h=i.groups,p=i.drawRange;if(a!==null)if(Array.isArray(r))for(let _=0,x=h.length;_<x;_++){const m=h[_],d=r[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,M=g;y<M;y+=3){const E=a.getX(y),P=a.getX(y+1),T=a.getX(y+2);s=Ba(this,d,e,Yn,l,u,f,E,P,T),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=_,d=x;m<d;m+=3){const v=a.getX(m),g=a.getX(m+1),y=a.getX(m+2);s=Ba(this,r,e,Yn,l,u,f,v,g,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let _=0,x=h.length;_<x;_++){const m=h[_],d=r[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,M=g;y<M;y+=3){const E=y,P=y+1,T=y+2;s=Ba(this,d,e,Yn,l,u,f,E,P,T),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=_,d=x;m<d;m+=3){const v=m,g=m+1,y=m+2;s=Ba(this,r,e,Yn,l,u,f,v,g,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Mw(n,e,t,i,r,o,s,a){let c;if(e.side===un?c=i.intersectTriangle(s,o,r,!0,a):c=i.intersectTriangle(r,o,s,e.side===Ji,a),c===null)return null;Fa.copy(a),Fa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Fa);return l<t.near||l>t.far?null:{distance:l,point:Fa.clone(),object:n}}function Ba(n,e,t,i,r,o,s,a,c,l){n.getVertexPosition(a,Qr),n.getVertexPosition(c,eo),n.getVertexPosition(l,to);const u=Mw(n,e,t,i,Qr,eo,to,za);if(u){r&&(Ua.fromBufferAttribute(r,a),ka.fromBufferAttribute(r,c),Oa.fromBufferAttribute(r,l),u.uv=Gn.getInterpolation(za,Qr,eo,to,Ua,ka,Oa,new Ve)),o&&(Ua.fromBufferAttribute(o,a),ka.fromBufferAttribute(o,c),Oa.fromBufferAttribute(o,l),u.uv2=Gn.getInterpolation(za,Qr,eo,to,Ua,ka,Oa,new Ve)),s&&(sm.fromBufferAttribute(s,a),am.fromBufferAttribute(s,c),lm.fromBufferAttribute(s,l),u.normal=Gn.getInterpolation(za,Qr,eo,to,sm,am,lm,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new O,materialIndex:0};Gn.getNormal(Qr,eo,to,f.normal),u.face=f}return u}class Ur extends Jt{constructor(e=1,t=1,i=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:o,depthSegments:s};const a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);const c=[],l=[],u=[],f=[];let h=0,p=0;_("z","y","x",-1,-1,i,t,e,s,o,0),_("z","y","x",1,-1,i,t,-e,s,o,1),_("x","z","y",1,1,e,i,t,r,s,2),_("x","z","y",1,-1,e,i,-t,r,s,3),_("x","y","z",1,-1,e,t,i,r,o,4),_("x","y","z",-1,-1,e,t,-i,r,o,5),this.setIndex(c),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(u,3)),this.setAttribute("uv",new vt(f,2));function _(x,m,d,v,g,y,M,E,P,T,S){const w=y/P,V=M/T,k=y/2,R=M/2,D=E/2,F=P+1,$=T+1;let K=0,U=0;const H=new O;for(let G=0;G<$;G++){const de=G*V-R;for(let ie=0;ie<F;ie++){const q=ie*w-k;H[x]=q*v,H[m]=de*g,H[d]=D,l.push(H.x,H.y,H.z),H[x]=0,H[m]=0,H[d]=E>0?1:-1,u.push(H.x,H.y,H.z),f.push(ie/P),f.push(1-G/T),K+=1}}for(let G=0;G<T;G++)for(let de=0;de<P;de++){const ie=h+de+F*G,q=h+de+F*(G+1),Q=h+(de+1)+F*(G+1),he=h+(de+1)+F*G;c.push(ie,q,he),c.push(q,Q,he),U+=6}a.addGroup(p,U,S),p+=U,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Go(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Xt(n){const e={};for(let t=0;t<n.length;t++){const i=Go(n[t]);for(const r in i)e[r]=i[r]}return e}function ww(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Fv(n){return n.getRenderTarget()===null&&n.outputEncoding===st?Jn:Zs}const Ew={clone:Go,merge:Xt};var bw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kr extends Zo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bw,this.fragmentShader=Cw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Go(e.uniforms),this.uniformsGroups=ww(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bv extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class on extends Bv{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Pd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pd*2*Math.atan(Math.tan(Hc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hc*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,o=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const no=-90,io=1;class Tw extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i;const r=new on(no,io,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(1,0,0),this.add(r);const o=new on(no,io,e,t);o.layers=this.layers,o.up.set(0,1,0),o.lookAt(-1,0,0),this.add(o);const s=new on(no,io,e,t);s.layers=this.layers,s.up.set(0,0,-1),s.lookAt(0,1,0),this.add(s);const a=new on(no,io,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const c=new on(no,io,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,1),this.add(c);const l=new on(no,io,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,-1),this.add(l)}update(e,t){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget,[r,o,s,a,c,l]=this.children,u=e.getRenderTarget(),f=e.toneMapping,h=e.xr.enabled;e.toneMapping=_i,e.xr.enabled=!1;const p=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,r),e.setRenderTarget(i,1),e.render(t,o),e.setRenderTarget(i,2),e.render(t,s),e.setRenderTarget(i,3),e.render(t,a),e.setRenderTarget(i,4),e.render(t,c),i.texture.generateMipmaps=p,e.setRenderTarget(i,5),e.render(t,l),e.setRenderTarget(u),e.toneMapping=f,e.xr.enabled=h,i.texture.needsPMREMUpdate=!0}}class Gv extends yn{constructor(e,t,i,r,o,s,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:zo,super(e,t,i,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Aw extends Nr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Gv(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:An}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ur(5,5,5),o=new kr({name:"CubemapFromEquirect",uniforms:Go(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Yi});o.uniforms.tEquirect.value=t;const s=new xn(r,o),a=t.minFilter;return t.minFilter===qs&&(t.minFilter=An),new Tw(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,r){const o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(o)}}const au=new O,Pw=new O,Lw=new $e;class hr{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=au.subVectors(i,t).cross(Pw.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(au),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Lw.getNormalMatrix(e),r=this.coplanarPoint(au).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ur=new Yo,Ga=new O;class Uf{constructor(e=new hr,t=new hr,i=new hr,r=new hr,o=new hr,s=new hr){this.planes=[e,t,i,r,o,s]}set(e,t,i,r,o,s){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){const t=this.planes,i=e.elements,r=i[0],o=i[1],s=i[2],a=i[3],c=i[4],l=i[5],u=i[6],f=i[7],h=i[8],p=i[9],_=i[10],x=i[11],m=i[12],d=i[13],v=i[14],g=i[15];return t[0].setComponents(a-r,f-c,x-h,g-m).normalize(),t[1].setComponents(a+r,f+c,x+h,g+m).normalize(),t[2].setComponents(a+o,f+l,x+p,g+d).normalize(),t[3].setComponents(a-o,f-l,x-p,g-d).normalize(),t[4].setComponents(a-s,f-u,x-_,g-v).normalize(),t[5].setComponents(a+s,f+u,x+_,g+v).normalize(),this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ur.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ur)}intersectsSprite(e){return ur.center.set(0,0,0),ur.radius=.7071067811865476,ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(ur)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ga.x=r.normal.x>0?e.max.x:e.min.x,Ga.y=r.normal.y>0?e.max.y:e.min.y,Ga.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ga)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vv(){let n=null,e=!1,t=null,i=null;function r(o,s){t(o,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){n=o}}}function Rw(n,e){const t=e.isWebGL2,i=new WeakMap;function r(l,u){const f=l.array,h=l.usage,p=n.createBuffer();n.bindBuffer(u,p),n.bufferData(u,f,h),l.onUploadCallback();let _;if(f instanceof Float32Array)_=5126;else if(f instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=5123;else if(f instanceof Int16Array)_=5122;else if(f instanceof Uint32Array)_=5125;else if(f instanceof Int32Array)_=5124;else if(f instanceof Int8Array)_=5120;else if(f instanceof Uint8Array)_=5121;else if(f instanceof Uint8ClampedArray)_=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:p,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:l.version}}function o(l,u,f){const h=u.array,p=u.updateRange;n.bindBuffer(f,l),p.count===-1?n.bufferSubData(f,0,h):(t?n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);u&&(n.deleteBuffer(u.buffer),i.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const h=i.get(l);(!h||h.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const f=i.get(l);f===void 0?i.set(l,r(l,u)):f.version<l.version&&(o(f.buffer,l,u),f.version=l.version)}return{get:s,remove:a,update:c}}class nc extends Jt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const o=e/2,s=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,f=e/a,h=t/c,p=[],_=[],x=[],m=[];for(let d=0;d<u;d++){const v=d*h-s;for(let g=0;g<l;g++){const y=g*f-o;_.push(y,-v,0),x.push(0,0,1),m.push(g/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<a;v++){const g=v+l*d,y=v+l*(d+1),M=v+1+l*(d+1),E=v+1+l*d;p.push(g,y,E),p.push(y,M,E)}this.setIndex(p),this.setAttribute("position",new vt(_,3)),this.setAttribute("normal",new vt(x,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nc(e.width,e.height,e.widthSegments,e.heightSegments)}}var Dw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iw=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Uw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kw=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ow=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zw="vec3 transformed = vec3( position );",Fw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Ww=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$w=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Zw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Kw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qw=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,e1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,t1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,n1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,i1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,r1="gl_FragColor = linearToOutputTexel( gl_FragColor );",o1=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,s1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,a1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,l1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,c1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,d1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,f1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,p1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,m1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,g1=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,v1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,x1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,y1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,S1=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,M1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,w1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,C1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,T1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,A1=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,P1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,L1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,R1=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,D1=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N1=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,I1=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,U1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,k1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,O1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,z1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,B1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G1=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,H1=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,W1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,j1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,X1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Z1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,K1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,J1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Q1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,iE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,oE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,aE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,uE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,mE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_E=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,SE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,ME=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,wE=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,EE=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bE=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,CE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const TE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,PE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,RE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,NE=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,IE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,UE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,OE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,FE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,GE=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,VE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,XE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$E=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,YE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,JE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,nb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ib=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ob=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ge={alphamap_fragment:Dw,alphamap_pars_fragment:Nw,alphatest_fragment:Iw,alphatest_pars_fragment:Uw,aomap_fragment:kw,aomap_pars_fragment:Ow,begin_vertex:zw,beginnormal_vertex:Fw,bsdfs:Bw,iridescence_fragment:Gw,bumpmap_pars_fragment:Vw,clipping_planes_fragment:Hw,clipping_planes_pars_fragment:Ww,clipping_planes_pars_vertex:jw,clipping_planes_vertex:Xw,color_fragment:$w,color_pars_fragment:qw,color_pars_vertex:Yw,color_vertex:Zw,common:Kw,cube_uv_reflection_fragment:Jw,defaultnormal_vertex:Qw,displacementmap_pars_vertex:e1,displacementmap_vertex:t1,emissivemap_fragment:n1,emissivemap_pars_fragment:i1,encodings_fragment:r1,encodings_pars_fragment:o1,envmap_fragment:s1,envmap_common_pars_fragment:a1,envmap_pars_fragment:l1,envmap_pars_vertex:c1,envmap_physical_pars_fragment:S1,envmap_vertex:u1,fog_vertex:d1,fog_pars_vertex:f1,fog_fragment:h1,fog_pars_fragment:p1,gradientmap_pars_fragment:m1,lightmap_fragment:g1,lightmap_pars_fragment:v1,lights_lambert_fragment:x1,lights_lambert_pars_fragment:_1,lights_pars_begin:y1,lights_toon_fragment:M1,lights_toon_pars_fragment:w1,lights_phong_fragment:E1,lights_phong_pars_fragment:b1,lights_physical_fragment:C1,lights_physical_pars_fragment:T1,lights_fragment_begin:A1,lights_fragment_maps:P1,lights_fragment_end:L1,logdepthbuf_fragment:R1,logdepthbuf_pars_fragment:D1,logdepthbuf_pars_vertex:N1,logdepthbuf_vertex:I1,map_fragment:U1,map_pars_fragment:k1,map_particle_fragment:O1,map_particle_pars_fragment:z1,metalnessmap_fragment:F1,metalnessmap_pars_fragment:B1,morphcolor_vertex:G1,morphnormal_vertex:V1,morphtarget_pars_vertex:H1,morphtarget_vertex:W1,normal_fragment_begin:j1,normal_fragment_maps:X1,normal_pars_fragment:$1,normal_pars_vertex:q1,normal_vertex:Y1,normalmap_pars_fragment:Z1,clearcoat_normal_fragment_begin:K1,clearcoat_normal_fragment_maps:J1,clearcoat_pars_fragment:Q1,iridescence_pars_fragment:eE,output_fragment:tE,packing:nE,premultiplied_alpha_fragment:iE,project_vertex:rE,dithering_fragment:oE,dithering_pars_fragment:sE,roughnessmap_fragment:aE,roughnessmap_pars_fragment:lE,shadowmap_pars_fragment:cE,shadowmap_pars_vertex:uE,shadowmap_vertex:dE,shadowmask_pars_fragment:fE,skinbase_vertex:hE,skinning_pars_vertex:pE,skinning_vertex:mE,skinnormal_vertex:gE,specularmap_fragment:vE,specularmap_pars_fragment:xE,tonemapping_fragment:_E,tonemapping_pars_fragment:yE,transmission_fragment:SE,transmission_pars_fragment:ME,uv_pars_fragment:wE,uv_pars_vertex:EE,uv_vertex:bE,worldpos_vertex:CE,background_vert:TE,background_frag:AE,backgroundCube_vert:PE,backgroundCube_frag:LE,cube_vert:RE,cube_frag:DE,depth_vert:NE,depth_frag:IE,distanceRGBA_vert:UE,distanceRGBA_frag:kE,equirect_vert:OE,equirect_frag:zE,linedashed_vert:FE,linedashed_frag:BE,meshbasic_vert:GE,meshbasic_frag:VE,meshlambert_vert:HE,meshlambert_frag:WE,meshmatcap_vert:jE,meshmatcap_frag:XE,meshnormal_vert:$E,meshnormal_frag:qE,meshphong_vert:YE,meshphong_frag:ZE,meshphysical_vert:KE,meshphysical_frag:JE,meshtoon_vert:QE,meshtoon_frag:eb,points_vert:tb,points_frag:nb,shadow_vert:ib,shadow_frag:rb,sprite_vert:ob,sprite_frag:sb},_e={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaTest:{value:0}}},Qn={basic:{uniforms:Xt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Xt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Xt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Xt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Xt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Xt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Xt([_e.points,_e.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Xt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Xt([_e.common,_e.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Xt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Xt([_e.sprite,_e.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Xt([_e.common,_e.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Xt([_e.lights,_e.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Qn.physical={uniforms:Xt([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Va={r:0,b:0,g:0};function ab(n,e,t,i,r,o,s){const a=new Ye(0);let c=o===!0?0:1,l,u,f=null,h=0,p=null;function _(m,d){let v=!1,g=d.isScene===!0?d.background:null;g&&g.isTexture&&(g=(d.backgroundBlurriness>0?t:e).get(g));const y=n.xr,M=y.getSession&&y.getSession();M&&M.environmentBlendMode==="additive"&&(g=null),g===null?x(a,c):g&&g.isColor&&(x(g,1),v=!0),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),g&&(g.isCubeTexture||g.mapping===ec)?(u===void 0&&(u=new xn(new Ur(1,1,1),new kr({name:"BackgroundCubeMaterial",uniforms:Go(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,P,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=g.encoding!==st,(f!==g||h!==g.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=g,h=g.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(l===void 0&&(l=new xn(new nc(2,2),new kr({name:"BackgroundMaterial",uniforms:Go(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Ji,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=g,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=g.encoding!==st,g.matrixAutoUpdate===!0&&g.updateMatrix(),l.material.uniforms.uvTransform.value.copy(g.matrix),(f!==g||h!==g.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,f=g,h=g.version,p=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,d){m.getRGB(Va,Fv(n)),i.buffers.color.setClear(Va.r,Va.g,Va.b,d,s)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),c=d,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(a,c)},render:_}}function lb(n,e,t,i){const r=n.getParameter(34921),o=i.isWebGL2?null:e.get("OES_vertex_array_object"),s=i.isWebGL2||o!==null,a={},c=m(null);let l=c,u=!1;function f(D,F,$,K,U){let H=!1;if(s){const G=x(K,$,F);l!==G&&(l=G,p(l.object)),H=d(D,K,$,U),H&&v(D,K,$,U)}else{const G=F.wireframe===!0;(l.geometry!==K.id||l.program!==$.id||l.wireframe!==G)&&(l.geometry=K.id,l.program=$.id,l.wireframe=G,H=!0)}U!==null&&t.update(U,34963),(H||u)&&(u=!1,T(D,F,$,K),U!==null&&n.bindBuffer(34963,t.get(U).buffer))}function h(){return i.isWebGL2?n.createVertexArray():o.createVertexArrayOES()}function p(D){return i.isWebGL2?n.bindVertexArray(D):o.bindVertexArrayOES(D)}function _(D){return i.isWebGL2?n.deleteVertexArray(D):o.deleteVertexArrayOES(D)}function x(D,F,$){const K=$.wireframe===!0;let U=a[D.id];U===void 0&&(U={},a[D.id]=U);let H=U[F.id];H===void 0&&(H={},U[F.id]=H);let G=H[K];return G===void 0&&(G=m(h()),H[K]=G),G}function m(D){const F=[],$=[],K=[];for(let U=0;U<r;U++)F[U]=0,$[U]=0,K[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:$,attributeDivisors:K,object:D,attributes:{},index:null}}function d(D,F,$,K){const U=l.attributes,H=F.attributes;let G=0;const de=$.getAttributes();for(const ie in de)if(de[ie].location>=0){const Q=U[ie];let he=H[ie];if(he===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(he=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(he=D.instanceColor)),Q===void 0||Q.attribute!==he||he&&Q.data!==he.data)return!0;G++}return l.attributesNum!==G||l.index!==K}function v(D,F,$,K){const U={},H=F.attributes;let G=0;const de=$.getAttributes();for(const ie in de)if(de[ie].location>=0){let Q=H[ie];Q===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor));const he={};he.attribute=Q,Q&&Q.data&&(he.data=Q.data),U[ie]=he,G++}l.attributes=U,l.attributesNum=G,l.index=K}function g(){const D=l.newAttributes;for(let F=0,$=D.length;F<$;F++)D[F]=0}function y(D){M(D,0)}function M(D,F){const $=l.newAttributes,K=l.enabledAttributes,U=l.attributeDivisors;$[D]=1,K[D]===0&&(n.enableVertexAttribArray(D),K[D]=1),U[D]!==F&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,F),U[D]=F)}function E(){const D=l.newAttributes,F=l.enabledAttributes;for(let $=0,K=F.length;$<K;$++)F[$]!==D[$]&&(n.disableVertexAttribArray($),F[$]=0)}function P(D,F,$,K,U,H){i.isWebGL2===!0&&($===5124||$===5125)?n.vertexAttribIPointer(D,F,$,U,H):n.vertexAttribPointer(D,F,$,K,U,H)}function T(D,F,$,K){if(i.isWebGL2===!1&&(D.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const U=K.attributes,H=$.getAttributes(),G=F.defaultAttributeValues;for(const de in H){const ie=H[de];if(ie.location>=0){let q=U[de];if(q===void 0&&(de==="instanceMatrix"&&D.instanceMatrix&&(q=D.instanceMatrix),de==="instanceColor"&&D.instanceColor&&(q=D.instanceColor)),q!==void 0){const Q=q.normalized,he=q.itemSize,pe=t.get(q);if(pe===void 0)continue;const j=pe.buffer,Re=pe.type,Te=pe.bytesPerElement;if(q.isInterleavedBufferAttribute){const me=q.data,Le=me.stride,Be=q.offset;if(me.isInstancedInterleavedBuffer){for(let Ae=0;Ae<ie.locationSize;Ae++)M(ie.location+Ae,me.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Ae=0;Ae<ie.locationSize;Ae++)y(ie.location+Ae);n.bindBuffer(34962,j);for(let Ae=0;Ae<ie.locationSize;Ae++)P(ie.location+Ae,he/ie.locationSize,Re,Q,Le*Te,(Be+he/ie.locationSize*Ae)*Te)}else{if(q.isInstancedBufferAttribute){for(let me=0;me<ie.locationSize;me++)M(ie.location+me,q.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let me=0;me<ie.locationSize;me++)y(ie.location+me);n.bindBuffer(34962,j);for(let me=0;me<ie.locationSize;me++)P(ie.location+me,he/ie.locationSize,Re,Q,he*Te,he/ie.locationSize*me*Te)}}else if(G!==void 0){const Q=G[de];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(ie.location,Q);break;case 3:n.vertexAttrib3fv(ie.location,Q);break;case 4:n.vertexAttrib4fv(ie.location,Q);break;default:n.vertexAttrib1fv(ie.location,Q)}}}}E()}function S(){k();for(const D in a){const F=a[D];for(const $ in F){const K=F[$];for(const U in K)_(K[U].object),delete K[U];delete F[$]}delete a[D]}}function w(D){if(a[D.id]===void 0)return;const F=a[D.id];for(const $ in F){const K=F[$];for(const U in K)_(K[U].object),delete K[U];delete F[$]}delete a[D.id]}function V(D){for(const F in a){const $=a[F];if($[D.id]===void 0)continue;const K=$[D.id];for(const U in K)_(K[U].object),delete K[U];delete $[D.id]}}function k(){R(),u=!0,l!==c&&(l=c,p(l.object))}function R(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:k,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:V,initAttributes:g,enableAttribute:y,disableUnusedAttributes:E}}function cb(n,e,t,i){const r=i.isWebGL2;let o;function s(l){o=l}function a(l,u){n.drawArrays(o,l,u),t.update(u,o,1)}function c(l,u,f){if(f===0)return;let h,p;if(r)h=n,p="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](o,l,u,f),t.update(u,o,f)}this.setMode=s,this.render=a,this.renderInstances=c}function ub(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(P){if(P==="highp"){if(n.getShaderPrecisionFormat(35633,36338).precision>0&&n.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(35633,36337).precision>0&&n.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=o(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=s||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(34930),h=n.getParameter(35660),p=n.getParameter(3379),_=n.getParameter(34076),x=n.getParameter(34921),m=n.getParameter(36347),d=n.getParameter(36348),v=n.getParameter(36349),g=h>0,y=s||e.has("OES_texture_float"),M=g&&y,E=s?n.getParameter(36183):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:y,floatVertexTextures:M,maxSamples:E}}function db(n){const e=this;let t=null,i=0,r=!1,o=!1;const s=new hr,a=new $e,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const _=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||_===null||_.length===0||o&&!m)o?u(null):l();else{const v=o?0:i,g=v*4;let y=d.clippingState||null;c.value=y,y=u(_,h,g,p);for(let M=0;M!==g;++M)y[M]=t[M];d.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,_){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const d=p+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let g=0,y=p;g!==x;++g,y+=4)s.copy(f[g]).applyMatrix4(v,a),s.normal.toArray(m,y),m[y+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function fb(n){let e=new WeakMap;function t(s,a){return a===Ed?s.mapping=zo:a===bd&&(s.mapping=Fo),s}function i(s){if(s&&s.isTexture&&s.isRenderTargetTexture===!1){const a=s.mapping;if(a===Ed||a===bd)if(e.has(s)){const c=e.get(s).texture;return t(c,s.mapping)}else{const c=s.image;if(c&&c.height>0){const l=new Aw(c.height/2);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){const a=s.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}class Hv extends Bv{constructor(e=-1,t=1,i=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=i-e,s=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const yo=4,cm=[.125,.215,.35,.446,.526,.582],gr=20,lu=new Hv,um=new Ye;let cu=null;const pr=(1+Math.sqrt(5))/2,ro=1/pr,dm=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,pr,ro),new O(0,pr,-ro),new O(ro,0,pr),new O(-ro,0,pr),new O(pr,ro,0),new O(-pr,ro,0)];class fm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){cu=this._renderer.getRenderTarget(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(cu),e.scissorTest=!1,Ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zo||e.mapping===Fo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cu=this._renderer.getRenderTarget();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:An,minFilter:An,generateMipmaps:!1,type:Ys,format:Wn,encoding:Dr,depthBuffer:!1},r=hm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hm(e,t,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hb(o)),this._blurMaterial=pb(o,e,t)}return r}_compileMaterial(e){const t=new xn(this._lodPlanes[0],e);this._renderer.compile(t,lu)}_sceneToCubeUV(e,t,i,r){const a=new on(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(um),u.toneMapping=_i,u.autoClear=!1;const p=new Ii({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),_=new xn(new Ur,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(um),x=!0);for(let d=0;d<6;d++){const v=d%3;v===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):v===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const g=this._cubeSize;Ha(r,v*g,d>2?g:0,g,g),u.setRenderTarget(r),x&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===zo||e.mapping===Fo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pm());const o=r?this._cubemapMaterial:this._equirectMaterial,s=new xn(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const c=this._cubeSize;Ha(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,lu)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),s=dm[(r-1)%dm.length];this._blur(e,r-1,r,o,s)}t.autoClear=i}_blur(e,t,i,r,o){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",o),this._halfBlur(s,e,i,i,r,"longitudinal",o)}_halfBlur(e,t,i,r,o,s,a){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new xn(this._lodPlanes[r],l),h=l.uniforms,p=this._sizeLods[i]-1,_=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*gr-1),x=o/_,m=isFinite(o)?1+Math.floor(u*x):gr;m>gr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gr}`);const d=[];let v=0;for(let P=0;P<gr;++P){const T=P/x,S=Math.exp(-T*T/2);d.push(S),P===0?v+=S:P<m&&(v+=2*S)}for(let P=0;P<d.length;P++)d[P]=d[P]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=_,h.mipInt.value=g-i;const y=this._sizeLods[r],M=3*y*(r>g-yo?r-g+yo:0),E=4*(this._cubeSize-y);Ha(t,M,E,3*y,2*y),c.setRenderTarget(t),c.render(f,lu)}}function hb(n){const e=[],t=[],i=[];let r=n;const o=n-yo+1+cm.length;for(let s=0;s<o;s++){const a=Math.pow(2,r);t.push(a);let c=1/a;s>n-yo?c=cm[s-n+yo-1]:s===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,x=3,m=2,d=1,v=new Float32Array(x*_*p),g=new Float32Array(m*_*p),y=new Float32Array(d*_*p);for(let E=0;E<p;E++){const P=E%3*2/3-1,T=E>2?0:-1,S=[P,T,0,P+2/3,T,0,P+2/3,T+1,0,P,T,0,P+2/3,T+1,0,P,T+1,0];v.set(S,x*_*E),g.set(h,m*_*E);const w=[E,E,E,E,E,E];y.set(w,d*_*E)}const M=new Jt;M.setAttribute("position",new Kt(v,x)),M.setAttribute("uv",new Kt(g,m)),M.setAttribute("faceIndex",new Kt(y,d)),e.push(M),r>yo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function hm(n,e,t){const i=new Nr(n,e,t);return i.texture.mapping=ec,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ha(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function pb(n,e,t){const i=new Float32Array(gr),r=new O(0,1,0);return new kr({name:"SphericalGaussianBlur",defines:{n:gr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function pm(){return new kr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function mm(){return new kr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function kf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mb(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ed||c===bd,u=c===zo||c===Fo;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new fm(n)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(l&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new fm(n));const h=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",o),h.texture}else return null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function gb(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function vb(n,e,t,i){const r={},o=new WeakMap;function s(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",s),delete r[h.id];const p=o.get(h);p&&(e.remove(p),o.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const _ in h)e.update(h[_],34962);const p=f.morphAttributes;for(const _ in p){const x=p[_];for(let m=0,d=x.length;m<d;m++)e.update(x[m],34962)}}function l(f){const h=[],p=f.index,_=f.attributes.position;let x=0;if(p!==null){const v=p.array;x=p.version;for(let g=0,y=v.length;g<y;g+=3){const M=v[g+0],E=v[g+1],P=v[g+2];h.push(M,E,E,P,P,M)}}else{const v=_.array;x=_.version;for(let g=0,y=v.length/3-1;g<y;g+=3){const M=g+0,E=g+1,P=g+2;h.push(M,E,E,P,P,M)}}const m=new(Dv(h)?zv:Ov)(h,1);m.version=x;const d=o.get(f);d&&e.remove(d),o.set(f,m)}function u(f){const h=o.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&l(f)}else l(f);return o.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function xb(n,e,t,i){const r=i.isWebGL2;let o;function s(h){o=h}let a,c;function l(h){a=h.type,c=h.bytesPerElement}function u(h,p){n.drawElements(o,p,a,h*c),t.update(p,o,1)}function f(h,p,_){if(_===0)return;let x,m;if(r)x=n,m="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[m](o,p,a,h*c,_),t.update(p,o,_)}this.setMode=s,this.setIndex=l,this.render=u,this.renderInstances=f}function _b(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(t.calls++,s){case 4:t.triangles+=a*(o/3);break;case 1:t.lines+=a*(o/2);break;case 3:t.lines+=a*(o-1);break;case 2:t.lines+=a*o;break;case 0:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function yb(n,e){return n[0]-e[0]}function Sb(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Mb(n,e,t){const i={},r=new Float32Array(8),o=new WeakMap,s=new Rt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,f){const h=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,x=_!==void 0?_.length:0;let m=o.get(u);if(m===void 0||m.count!==x){let F=function(){R.dispose(),o.delete(u),u.removeEventListener("dispose",F)};var p=F;m!==void 0&&m.texture.dispose();const g=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,M=u.morphAttributes.color!==void 0,E=u.morphAttributes.position||[],P=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let S=0;g===!0&&(S=1),y===!0&&(S=2),M===!0&&(S=3);let w=u.attributes.position.count*S,V=1;w>e.maxTextureSize&&(V=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const k=new Float32Array(w*V*4*x),R=new Uv(k,w,V,x);R.type=Sr,R.needsUpdate=!0;const D=S*4;for(let $=0;$<x;$++){const K=E[$],U=P[$],H=T[$],G=w*V*4*$;for(let de=0;de<K.count;de++){const ie=de*D;g===!0&&(s.fromBufferAttribute(K,de),k[G+ie+0]=s.x,k[G+ie+1]=s.y,k[G+ie+2]=s.z,k[G+ie+3]=0),y===!0&&(s.fromBufferAttribute(U,de),k[G+ie+4]=s.x,k[G+ie+5]=s.y,k[G+ie+6]=s.z,k[G+ie+7]=0),M===!0&&(s.fromBufferAttribute(H,de),k[G+ie+8]=s.x,k[G+ie+9]=s.y,k[G+ie+10]=s.z,k[G+ie+11]=H.itemSize===4?s.w:1)}}m={count:x,texture:R,size:new Ve(w,V)},o.set(u,m),u.addEventListener("dispose",F)}let d=0;for(let g=0;g<h.length;g++)d+=h[g];const v=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const _=h===void 0?0:h.length;let x=i[u.id];if(x===void 0||x.length!==_){x=[];for(let y=0;y<_;y++)x[y]=[y,0];i[u.id]=x}for(let y=0;y<_;y++){const M=x[y];M[0]=y,M[1]=h[y]}x.sort(Sb);for(let y=0;y<8;y++)y<_&&x[y][1]?(a[y][0]=x[y][0],a[y][1]=x[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(yb);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const M=a[y],E=M[0],P=M[1];E!==Number.MAX_SAFE_INTEGER&&P?(m&&u.getAttribute("morphTarget"+y)!==m[E]&&u.setAttribute("morphTarget"+y,m[E]),d&&u.getAttribute("morphNormal"+y)!==d[E]&&u.setAttribute("morphNormal"+y,d[E]),r[y]=P,v+=P):(m&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),d&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),r[y]=0)}const g=u.morphTargetsRelative?1:1-v;f.getUniforms().setValue(n,"morphTargetBaseInfluence",g),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function wb(n,e,t,i){let r=new WeakMap;function o(c){const l=i.render.frame,u=c.geometry,f=e.get(c,u);return r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),t.update(c.instanceMatrix,34962),c.instanceColor!==null&&t.update(c.instanceColor,34962)),f}function s(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:s}}const Wv=new yn,jv=new Uv,Xv=new fw,$v=new Gv,gm=[],vm=[],xm=new Float32Array(16),_m=new Float32Array(9),ym=new Float32Array(4);function Ko(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let o=gm[r];if(o===void 0&&(o=new Float32Array(r),gm[r]=o),e!==0){i.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,n[s].toArray(o,a)}return o}function bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ic(n,e){let t=vm[e];t===void 0&&(t=new Int32Array(e),vm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Eb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function bb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2fv(this.addr,e),Ct(t,e)}}function Cb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;n.uniform3fv(this.addr,e),Ct(t,e)}}function Tb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4fv(this.addr,e),Ct(t,e)}}function Ab(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(bt(t,i))return;ym.set(i),n.uniformMatrix2fv(this.addr,!1,ym),Ct(t,i)}}function Pb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(bt(t,i))return;_m.set(i),n.uniformMatrix3fv(this.addr,!1,_m),Ct(t,i)}}function Lb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(bt(t,i))return;xm.set(i),n.uniformMatrix4fv(this.addr,!1,xm),Ct(t,i)}}function Rb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Db(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2iv(this.addr,e),Ct(t,e)}}function Nb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3iv(this.addr,e),Ct(t,e)}}function Ib(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4iv(this.addr,e),Ct(t,e)}}function Ub(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function kb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2uiv(this.addr,e),Ct(t,e)}}function Ob(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3uiv(this.addr,e),Ct(t,e)}}function zb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4uiv(this.addr,e),Ct(t,e)}}function Fb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2D(e||Wv,r)}function Bb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Xv,r)}function Gb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$v,r)}function Vb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||jv,r)}function Hb(n){switch(n){case 5126:return Eb;case 35664:return bb;case 35665:return Cb;case 35666:return Tb;case 35674:return Ab;case 35675:return Pb;case 35676:return Lb;case 5124:case 35670:return Rb;case 35667:case 35671:return Db;case 35668:case 35672:return Nb;case 35669:case 35673:return Ib;case 5125:return Ub;case 36294:return kb;case 36295:return Ob;case 36296:return zb;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Bb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Vb}}function Wb(n,e){n.uniform1fv(this.addr,e)}function jb(n,e){const t=Ko(e,this.size,2);n.uniform2fv(this.addr,t)}function Xb(n,e){const t=Ko(e,this.size,3);n.uniform3fv(this.addr,t)}function $b(n,e){const t=Ko(e,this.size,4);n.uniform4fv(this.addr,t)}function qb(n,e){const t=Ko(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Yb(n,e){const t=Ko(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Zb(n,e){const t=Ko(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Kb(n,e){n.uniform1iv(this.addr,e)}function Jb(n,e){n.uniform2iv(this.addr,e)}function Qb(n,e){n.uniform3iv(this.addr,e)}function eC(n,e){n.uniform4iv(this.addr,e)}function tC(n,e){n.uniform1uiv(this.addr,e)}function nC(n,e){n.uniform2uiv(this.addr,e)}function iC(n,e){n.uniform3uiv(this.addr,e)}function rC(n,e){n.uniform4uiv(this.addr,e)}function oC(n,e,t){const i=this.cache,r=e.length,o=ic(t,r);bt(i,o)||(n.uniform1iv(this.addr,o),Ct(i,o));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||Wv,o[s])}function sC(n,e,t){const i=this.cache,r=e.length,o=ic(t,r);bt(i,o)||(n.uniform1iv(this.addr,o),Ct(i,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Xv,o[s])}function aC(n,e,t){const i=this.cache,r=e.length,o=ic(t,r);bt(i,o)||(n.uniform1iv(this.addr,o),Ct(i,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||$v,o[s])}function lC(n,e,t){const i=this.cache,r=e.length,o=ic(t,r);bt(i,o)||(n.uniform1iv(this.addr,o),Ct(i,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||jv,o[s])}function cC(n){switch(n){case 5126:return Wb;case 35664:return jb;case 35665:return Xb;case 35666:return $b;case 35674:return qb;case 35675:return Yb;case 35676:return Zb;case 5124:case 35670:return Kb;case 35667:case 35671:return Jb;case 35668:case 35672:return Qb;case 35669:case 35673:return eC;case 5125:return tC;case 36294:return nC;case 36295:return iC;case 36296:return rC;case 35678:case 36198:case 36298:case 36306:case 35682:return oC;case 35679:case 36299:case 36307:return sC;case 35680:case 36300:case 36308:case 36293:return aC;case 36289:case 36303:case 36311:case 36292:return lC}}class uC{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=Hb(t.type)}}class dC{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=cC(t.type)}}class fC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let o=0,s=r.length;o!==s;++o){const a=r[o];a.setValue(e,t[a.id],i)}}}const uu=/(\w+)(\])?(\[|\.)?/g;function Sm(n,e){n.seq.push(e),n.map[e.id]=e}function hC(n,e,t){const i=n.name,r=i.length;for(uu.lastIndex=0;;){const o=uu.exec(i),s=uu.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){Sm(t,l===void 0?new uC(a,n,e):new dC(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new fC(a),Sm(t,f)),t=f}}}class al{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,35718);for(let r=0;r<i;++r){const o=e.getActiveUniform(t,r),s=e.getUniformLocation(t,o.name);hC(o,s,this)}}setValue(e,t,i,r){const o=this.map[t];o!==void 0&&o.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let o=0,s=t.length;o!==s;++o){const a=t[o],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,o=e.length;r!==o;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function Mm(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}let pC=0;function mC(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){const a=s+1;i.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return i.join(`
`)}function gC(n){switch(n){case Dr:return["Linear","( value )"];case st:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",n),["Linear","( value )"]}}function wm(n,e,t){const i=n.getShaderParameter(e,35713),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+mC(n.getShaderSource(e),s)}else return r}function vC(n,e){const t=gC(e);return"vec4 "+n+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function xC(n,e){let t;switch(e){case DM:t="Linear";break;case NM:t="Reinhard";break;case IM:t="OptimizedCineon";break;case UM:t="ACESFilmic";break;case kM:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function _C(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(xs).join(`
`)}function yC(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function SC(n,e){const t={},i=n.getProgramParameter(e,35721);for(let r=0;r<i;r++){const o=n.getActiveAttrib(e,r),s=o.name;let a=1;o.type===35674&&(a=2),o.type===35675&&(a=3),o.type===35676&&(a=4),t[s]={type:o.type,location:n.getAttribLocation(e,s),locationSize:a}}return t}function xs(n){return n!==""}function Em(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const MC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ld(n){return n.replace(MC,wC)}function wC(n,e){const t=Ge[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Ld(t)}const EC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cm(n){return n.replace(EC,bC)}function bC(n,e,t,i){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Tm(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function CC(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ev?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===uM?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===vs&&(e="SHADOWMAP_TYPE_VSM"),e}function TC(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case zo:case Fo:e="ENVMAP_TYPE_CUBE";break;case ec:e="ENVMAP_TYPE_CUBE_UV";break}return e}function AC(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Fo:e="ENVMAP_MODE_REFRACTION";break}return e}function PC(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Tv:e="ENVMAP_BLENDING_MULTIPLY";break;case LM:e="ENVMAP_BLENDING_MIX";break;case RM:e="ENVMAP_BLENDING_ADD";break}return e}function LC(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function RC(n,e,t,i){const r=n.getContext(),o=t.defines;let s=t.vertexShader,a=t.fragmentShader;const c=CC(t),l=TC(t),u=AC(t),f=PC(t),h=LC(t),p=t.isWebGL2?"":_C(t),_=yC(o),x=r.createProgram();let m,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=[_].filter(xs).join(`
`),m.length>0&&(m+=`
`),d=[p,_].filter(xs).join(`
`),d.length>0&&(d+=`
`)):(m=[Tm(t),"#define SHADER_NAME "+t.shaderName,_,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs2?"#define USE_UV2":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),d=[p,Tm(t),"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs2?"#define USE_UV2":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?Ge.tonemapping_pars_fragment:"",t.toneMapping!==_i?xC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.encodings_pars_fragment,vC("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xs).join(`
`)),s=Ld(s),s=Em(s,t),s=bm(s,t),a=Ld(a),a=Em(a,t),a=bm(a,t),s=Cm(s),a=Cm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===$p?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$p?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const g=v+m+s,y=v+d+a,M=Mm(r,35633,g),E=Mm(r,35632,y);if(r.attachShader(x,M),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x),n.debug.checkShaderErrors){const S=r.getProgramInfoLog(x).trim(),w=r.getShaderInfoLog(M).trim(),V=r.getShaderInfoLog(E).trim();let k=!0,R=!0;if(r.getProgramParameter(x,35714)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,M,E);else{const D=wm(r,M,"vertex"),F=wm(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,35715)+`

Program Info Log: `+S+`
`+D+`
`+F)}else S!==""?console.warn("THREE.WebGLProgram: Program Info Log:",S):(w===""||V==="")&&(R=!1);R&&(this.diagnostics={runnable:k,programLog:S,vertexShader:{log:w,prefix:m},fragmentShader:{log:V,prefix:d}})}r.deleteShader(M),r.deleteShader(E);let P;this.getUniforms=function(){return P===void 0&&(P=new al(r,x)),P};let T;return this.getAttributes=function(){return T===void 0&&(T=SC(r,x)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.name=t.shaderName,this.id=pC++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=E,this}let DC=0;class NC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new IC(e),t.set(e,i)),i}}class IC{constructor(e){this.id=DC++,this.code=e,this.usedTimes=0}}function UC(n,e,t,i,r,o,s){const a=new If,c=new NC,l=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return S===1?"uv2":"uv"}function m(S,w,V,k,R){const D=k.fog,F=R.geometry,$=S.isMeshStandardMaterial?k.environment:null,K=(S.isMeshStandardMaterial?t:e).get(S.envMap||$),U=K&&K.mapping===ec?K.image.height:null,H=_[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const G=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,de=G!==void 0?G.length:0;let ie=0;F.morphAttributes.position!==void 0&&(ie=1),F.morphAttributes.normal!==void 0&&(ie=2),F.morphAttributes.color!==void 0&&(ie=3);let q,Q,he,pe;if(H){const ge=Qn[H];q=ge.vertexShader,Q=ge.fragmentShader}else q=S.vertexShader,Q=S.fragmentShader,c.update(S),he=c.getVertexShaderID(S),pe=c.getFragmentShaderID(S);const j=n.getRenderTarget(),Re=R.isInstancedMesh===!0,Te=!!S.map,me=!!S.matcap,Le=!!K,Be=!!S.aoMap,Ae=!!S.lightMap,Fe=!!S.bumpMap,lt=!!S.normalMap,ct=!!S.displacementMap,mt=!!S.emissiveMap,dt=!!S.metalnessMap,We=!!S.roughnessMap,et=S.clearcoat>0,Tt=S.iridescence>0,L=S.sheen>0,b=S.transmission>0,J=et&&!!S.clearcoatMap,le=et&&!!S.clearcoatNormalMap,ce=et&&!!S.clearcoatRoughnessMap,ye=Tt&&!!S.iridescenceMap,I=Tt&&!!S.iridescenceThicknessMap,re=L&&!!S.sheenColorMap,Y=L&&!!S.sheenRoughnessMap,Se=!!S.specularMap,ne=!!S.specularColorMap,ae=!!S.specularIntensityMap,oe=b&&!!S.transmissionMap,xe=b&&!!S.thicknessMap,Pe=!!S.gradientMap,De=!!S.alphaMap,je=S.alphaTest>0,N=!!S.extensions,Z=!!F.attributes.uv2;return{isWebGL2:u,shaderID:H,shaderName:S.type,vertexShader:q,fragmentShader:Q,defines:S.defines,customVertexShaderID:he,customFragmentShaderID:pe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,instancing:Re,instancingColor:Re&&R.instanceColor!==null,supportsVertexTextures:h,outputEncoding:j===null?n.outputEncoding:j.isXRRenderTarget===!0?j.texture.encoding:Dr,map:Te,matcap:me,envMap:Le,envMapMode:Le&&K.mapping,envMapCubeUVHeight:U,aoMap:Be,lightMap:Ae,bumpMap:Fe,normalMap:lt,displacementMap:h&&ct,emissiveMap:mt,normalMapObjectSpace:lt&&S.normalMapType===tw,normalMapTangentSpace:lt&&S.normalMapType===Lv,decodeVideoTexture:Te&&S.map.isVideoTexture===!0&&S.map.encoding===st,metalnessMap:dt,roughnessMap:We,clearcoat:et,clearcoatMap:J,clearcoatNormalMap:le,clearcoatRoughnessMap:ce,iridescence:Tt,iridescenceMap:ye,iridescenceThicknessMap:I,sheen:L,sheenColorMap:re,sheenRoughnessMap:Y,specularMap:Se,specularColorMap:ne,specularIntensityMap:ae,transmission:b,transmissionMap:oe,thicknessMap:xe,gradientMap:Pe,opaque:S.transparent===!1&&S.blending===To,alphaMap:De,alphaTest:je,combine:S.combine,mapUv:Te&&x(S.map.channel),aoMapUv:Be&&x(S.aoMap.channel),lightMapUv:Ae&&x(S.lightMap.channel),bumpMapUv:Fe&&x(S.bumpMap.channel),normalMapUv:lt&&x(S.normalMap.channel),displacementMapUv:ct&&x(S.displacementMap.channel),emissiveMapUv:mt&&x(S.emissiveMap.channel),metalnessMapUv:dt&&x(S.metalnessMap.channel),roughnessMapUv:We&&x(S.roughnessMap.channel),clearcoatMapUv:J&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:le&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:I&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:re&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Y&&x(S.sheenRoughnessMap.channel),specularMapUv:Se&&x(S.specularMap.channel),specularColorMapUv:ne&&x(S.specularColorMap.channel),specularIntensityMapUv:ae&&x(S.specularIntensityMap.channel),transmissionMapUv:oe&&x(S.transmissionMap.channel),thicknessMapUv:xe&&x(S.thicknessMap.channel),alphaMapUv:De&&x(S.alphaMap.channel),vertexTangents:lt&&!!F.attributes.tangent,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUvs2:Z,pointsUvs:R.isPoints===!0&&!!F.attributes.uv&&(Te||De),fog:!!D,useFog:S.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:R.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:ie,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&V.length>0,shadowMapType:n.shadowMap.type,toneMapping:S.toneMapped?n.toneMapping:_i,useLegacyLights:n.useLegacyLights,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ti,flipSided:S.side===un,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:N&&S.extensions.derivatives===!0,extensionFragDepth:N&&S.extensions.fragDepth===!0,extensionDrawBuffers:N&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:N&&S.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),customProgramCacheKey:S.customProgramCacheKey()}}function d(S){const w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(const V in S.defines)w.push(V),w.push(S.defines[V]);return S.isRawShaderMaterial===!1&&(v(w,S),g(w,S),w.push(n.outputEncoding)),w.push(S.customProgramCacheKey),w.join()}function v(S,w){S.push(w.precision),S.push(w.outputEncoding),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function g(S,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUvs2&&a.enable(13),w.vertexTangents&&a.enable(14),S.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.decodeVideoTexture&&a.enable(17),w.opaque&&a.enable(18),w.pointsUvs&&a.enable(19),S.push(a.mask)}function y(S){const w=_[S.type];let V;if(w){const k=Qn[w];V=Ew.clone(k.uniforms)}else V=S.uniforms;return V}function M(S,w){let V;for(let k=0,R=l.length;k<R;k++){const D=l[k];if(D.cacheKey===w){V=D,++V.usedTimes;break}}return V===void 0&&(V=new RC(n,w,S,o),l.push(V)),V}function E(S){if(--S.usedTimes===0){const w=l.indexOf(S);l[w]=l[l.length-1],l.pop(),S.destroy()}}function P(S){c.remove(S)}function T(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:M,releaseProgram:E,releaseShaderCache:P,programs:l,dispose:T}}function kC(){let n=new WeakMap;function e(o){let s=n.get(o);return s===void 0&&(s={},n.set(o,s)),s}function t(o){n.delete(o)}function i(o,s,a){n.get(o)[s]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function OC(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Am(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Pm(){const n=[];let e=0;const t=[],i=[],r=[];function o(){e=0,t.length=0,i.length=0,r.length=0}function s(f,h,p,_,x,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:_,renderOrder:f.renderOrder,z:x,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=_,d.renderOrder=f.renderOrder,d.z=x,d.group=m),e++,d}function a(f,h,p,_,x,m){const d=s(f,h,p,_,x,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function c(f,h,p,_,x,m){const d=s(f,h,p,_,x,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function l(f,h){t.length>1&&t.sort(f||OC),i.length>1&&i.sort(h||Am),r.length>1&&r.sort(h||Am)}function u(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:o,push:a,unshift:c,finish:u,sort:l}}function zC(){let n=new WeakMap;function e(i,r){const o=n.get(i);let s;return o===void 0?(s=new Pm,n.set(i,[s])):r>=o.length?(s=new Pm,o.push(s)):s=o[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function FC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ye};break;case"SpotLight":t={position:new O,direction:new O,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function BC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let GC=0;function VC(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function HC(n,e){const t=new FC,i=BC(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)r.probe.push(new O);const o=new O,s=new rt,a=new rt;function c(u,f){let h=0,p=0,_=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let x=0,m=0,d=0,v=0,g=0,y=0,M=0,E=0,P=0,T=0;u.sort(VC);const S=f===!0?Math.PI:1;for(let V=0,k=u.length;V<k;V++){const R=u[V],D=R.color,F=R.intensity,$=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=D.r*F*S,p+=D.g*F*S,_+=D.b*F*S;else if(R.isLightProbe)for(let U=0;U<9;U++)r.probe[U].addScaledVector(R.sh.coefficients[U],F);else if(R.isDirectionalLight){const U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity*S),R.castShadow){const H=R.shadow,G=i.get(R);G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,r.directionalShadow[x]=G,r.directionalShadowMap[x]=K,r.directionalShadowMatrix[x]=R.shadow.matrix,y++}r.directional[x]=U,x++}else if(R.isSpotLight){const U=t.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(D).multiplyScalar(F*S),U.distance=$,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,r.spot[d]=U;const H=R.shadow;if(R.map&&(r.spotLightMap[P]=R.map,P++,H.updateMatrices(R),R.castShadow&&T++),r.spotLightMatrix[d]=H.matrix,R.castShadow){const G=i.get(R);G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,r.spotShadow[d]=G,r.spotShadowMap[d]=K,E++}d++}else if(R.isRectAreaLight){const U=t.get(R);U.color.copy(D).multiplyScalar(F),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),r.rectArea[v]=U,v++}else if(R.isPointLight){const U=t.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity*S),U.distance=R.distance,U.decay=R.decay,R.castShadow){const H=R.shadow,G=i.get(R);G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,G.shadowCameraNear=H.camera.near,G.shadowCameraFar=H.camera.far,r.pointShadow[m]=G,r.pointShadowMap[m]=K,r.pointShadowMatrix[m]=R.shadow.matrix,M++}r.point[m]=U,m++}else if(R.isHemisphereLight){const U=t.get(R);U.skyColor.copy(R.color).multiplyScalar(F*S),U.groundColor.copy(R.groundColor).multiplyScalar(F*S),r.hemi[g]=U,g++}}v>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=_;const w=r.hash;(w.directionalLength!==x||w.pointLength!==m||w.spotLength!==d||w.rectAreaLength!==v||w.hemiLength!==g||w.numDirectionalShadows!==y||w.numPointShadows!==M||w.numSpotShadows!==E||w.numSpotMaps!==P)&&(r.directional.length=x,r.spot.length=d,r.rectArea.length=v,r.point.length=m,r.hemi.length=g,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=M,r.pointShadowMap.length=M,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=M,r.spotLightMatrix.length=E+P-T,r.spotLightMap.length=P,r.numSpotLightShadowsWithMaps=T,w.directionalLength=x,w.pointLength=m,w.spotLength=d,w.rectAreaLength=v,w.hemiLength=g,w.numDirectionalShadows=y,w.numPointShadows=M,w.numSpotShadows=E,w.numSpotMaps=P,r.version=GC++)}function l(u,f){let h=0,p=0,_=0,x=0,m=0;const d=f.matrixWorldInverse;for(let v=0,g=u.length;v<g;v++){const y=u[v];if(y.isDirectionalLight){const M=r.directional[h];M.direction.setFromMatrixPosition(y.matrixWorld),o.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(o),M.direction.transformDirection(d),h++}else if(y.isSpotLight){const M=r.spot[_];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(y.matrixWorld),o.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(o),M.direction.transformDirection(d),_++}else if(y.isRectAreaLight){const M=r.rectArea[x];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),a.identity(),s.copy(y.matrixWorld),s.premultiply(d),a.extractRotation(s),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const M=r.point[p];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const M=r.hemi[m];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(d),m++}}}return{setup:c,setupView:l,state:r}}function Lm(n,e){const t=new HC(n,e),i=[],r=[];function o(){i.length=0,r.length=0}function s(f){i.push(f)}function a(f){r.push(f)}function c(f){t.setup(i,f)}function l(f){t.setupView(i,f)}return{init:o,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:s,pushShadow:a}}function WC(n,e){let t=new WeakMap;function i(o,s=0){const a=t.get(o);let c;return a===void 0?(c=new Lm(n,e),t.set(o,[c])):s>=a.length?(c=new Lm(n,e),a.push(c)):c=a[s],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class jC extends Zo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=QM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class XC extends Zo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $C=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function YC(n,e,t){let i=new Uf;const r=new Ve,o=new Ve,s=new Rt,a=new jC({depthPacking:ew}),c=new XC,l={},u=t.maxTextureSize,f={[Ji]:un,[un]:Ji,[ti]:ti},h=new kr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:$C,fragmentShader:qC}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new Jt;_.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new xn(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ev,this.render=function(y,M,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const P=n.getRenderTarget(),T=n.getActiveCubeFace(),S=n.getActiveMipmapLevel(),w=n.state;w.setBlending(Yi),w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);for(let V=0,k=y.length;V<k;V++){const R=y[V],D=R.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",R,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const F=D.getFrameExtents();if(r.multiply(F),o.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/F.x),r.x=o.x*F.x,D.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/F.y),r.y=o.y*F.y,D.mapSize.y=o.y)),D.map===null){const K=this.type!==vs?{minFilter:qt,magFilter:qt}:{};D.map=new Nr(r.x,r.y,K),D.map.texture.name=R.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();const $=D.getViewportCount();for(let K=0;K<$;K++){const U=D.getViewport(K);s.set(o.x*U.x,o.y*U.y,o.x*U.z,o.y*U.w),w.viewport(s),D.updateMatrices(R,K),i=D.getFrustum(),g(M,E,D.camera,R,this.type)}D.isPointLightShadow!==!0&&this.type===vs&&d(D,E),D.needsUpdate=!1}m.needsUpdate=!1,n.setRenderTarget(P,T,S)};function d(y,M){const E=e.update(x);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Nr(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(M,null,E,h,x,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(M,null,E,p,x,null)}function v(y,M,E,P){let T=null;const S=E.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(S!==void 0)T=S;else if(T=E.isPointLight===!0?c:a,n.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const w=T.uuid,V=M.uuid;let k=l[w];k===void 0&&(k={},l[w]=k);let R=k[V];R===void 0&&(R=T.clone(),k[V]=R),T=R}if(T.visible=M.visible,T.wireframe=M.wireframe,P===vs?T.side=M.shadowSide!==null?M.shadowSide:M.side:T.side=M.shadowSide!==null?M.shadowSide:f[M.side],T.alphaMap=M.alphaMap,T.alphaTest=M.alphaTest,T.map=M.map,T.clipShadows=M.clipShadows,T.clippingPlanes=M.clippingPlanes,T.clipIntersection=M.clipIntersection,T.displacementMap=M.displacementMap,T.displacementScale=M.displacementScale,T.displacementBias=M.displacementBias,T.wireframeLinewidth=M.wireframeLinewidth,T.linewidth=M.linewidth,E.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const w=n.properties.get(T);w.light=E}return T}function g(y,M,E,P,T){if(y.visible===!1)return;if(y.layers.test(M.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&T===vs)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,y.matrixWorld);const V=e.update(y),k=y.material;if(Array.isArray(k)){const R=V.groups;for(let D=0,F=R.length;D<F;D++){const $=R[D],K=k[$.materialIndex];if(K&&K.visible){const U=v(y,K,P,T);n.renderBufferDirect(E,null,V,U,y,$)}}}else if(k.visible){const R=v(y,k,P,T);n.renderBufferDirect(E,null,V,R,y,null)}}const w=y.children;for(let V=0,k=w.length;V<k;V++)g(w[V],M,E,P,T)}}function ZC(n,e,t){const i=t.isWebGL2;function r(){let N=!1;const Z=new Rt;let se=null;const ge=new Rt(0,0,0,0);return{setMask:function(Me){se!==Me&&!N&&(n.colorMask(Me,Me,Me,Me),se=Me)},setLocked:function(Me){N=Me},setClear:function(Me,Oe,Ie,Ke,Je){Je===!0&&(Me*=Ke,Oe*=Ke,Ie*=Ke),Z.set(Me,Oe,Ie,Ke),ge.equals(Z)===!1&&(n.clearColor(Me,Oe,Ie,Ke),ge.copy(Z))},reset:function(){N=!1,se=null,ge.set(-1,0,0,0)}}}function o(){let N=!1,Z=null,se=null,ge=null;return{setTest:function(Me){Me?j(2929):Re(2929)},setMask:function(Me){Z!==Me&&!N&&(n.depthMask(Me),Z=Me)},setFunc:function(Me){if(se!==Me){switch(Me){case wM:n.depthFunc(512);break;case EM:n.depthFunc(519);break;case bM:n.depthFunc(513);break;case wd:n.depthFunc(515);break;case CM:n.depthFunc(514);break;case TM:n.depthFunc(518);break;case AM:n.depthFunc(516);break;case PM:n.depthFunc(517);break;default:n.depthFunc(515)}se=Me}},setLocked:function(Me){N=Me},setClear:function(Me){ge!==Me&&(n.clearDepth(Me),ge=Me)},reset:function(){N=!1,Z=null,se=null,ge=null}}}function s(){let N=!1,Z=null,se=null,ge=null,Me=null,Oe=null,Ie=null,Ke=null,Je=null;return{setTest:function(Ue){N||(Ue?j(2960):Re(2960))},setMask:function(Ue){Z!==Ue&&!N&&(n.stencilMask(Ue),Z=Ue)},setFunc:function(Ue,Ne,ke){(se!==Ue||ge!==Ne||Me!==ke)&&(n.stencilFunc(Ue,Ne,ke),se=Ue,ge=Ne,Me=ke)},setOp:function(Ue,Ne,ke){(Oe!==Ue||Ie!==Ne||Ke!==ke)&&(n.stencilOp(Ue,Ne,ke),Oe=Ue,Ie=Ne,Ke=ke)},setLocked:function(Ue){N=Ue},setClear:function(Ue){Je!==Ue&&(n.clearStencil(Ue),Je=Ue)},reset:function(){N=!1,Z=null,se=null,ge=null,Me=null,Oe=null,Ie=null,Ke=null,Je=null}}}const a=new r,c=new o,l=new s,u=new WeakMap,f=new WeakMap;let h={},p={},_=new WeakMap,x=[],m=null,d=!1,v=null,g=null,y=null,M=null,E=null,P=null,T=null,S=!1,w=null,V=null,k=null,R=null,D=null;const F=n.getParameter(35661);let $=!1,K=0;const U=n.getParameter(7938);U.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(U)[1]),$=K>=1):U.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),$=K>=2);let H=null,G={};const de=n.getParameter(3088),ie=n.getParameter(2978),q=new Rt().fromArray(de),Q=new Rt().fromArray(ie);function he(N,Z,se){const ge=new Uint8Array(4),Me=n.createTexture();n.bindTexture(N,Me),n.texParameteri(N,10241,9728),n.texParameteri(N,10240,9728);for(let Oe=0;Oe<se;Oe++)n.texImage2D(Z+Oe,0,6408,1,1,0,6408,5121,ge);return Me}const pe={};pe[3553]=he(3553,3553,1),pe[34067]=he(34067,34069,6),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),j(2929),c.setFunc(wd),ct(!1),mt(gp),j(2884),Fe(Yi);function j(N){h[N]!==!0&&(n.enable(N),h[N]=!0)}function Re(N){h[N]!==!1&&(n.disable(N),h[N]=!1)}function Te(N,Z){return p[N]!==Z?(n.bindFramebuffer(N,Z),p[N]=Z,i&&(N===36009&&(p[36160]=Z),N===36160&&(p[36009]=Z)),!0):!1}function me(N,Z){let se=x,ge=!1;if(N)if(se=_.get(Z),se===void 0&&(se=[],_.set(Z,se)),N.isWebGLMultipleRenderTargets){const Me=N.texture;if(se.length!==Me.length||se[0]!==36064){for(let Oe=0,Ie=Me.length;Oe<Ie;Oe++)se[Oe]=36064+Oe;se.length=Me.length,ge=!0}}else se[0]!==36064&&(se[0]=36064,ge=!0);else se[0]!==1029&&(se[0]=1029,ge=!0);ge&&(t.isWebGL2?n.drawBuffers(se):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(se))}function Le(N){return m!==N?(n.useProgram(N),m=N,!0):!1}const Be={[so]:32774,[fM]:32778,[hM]:32779};if(i)Be[yp]=32775,Be[Sp]=32776;else{const N=e.get("EXT_blend_minmax");N!==null&&(Be[yp]=N.MIN_EXT,Be[Sp]=N.MAX_EXT)}const Ae={[pM]:0,[mM]:1,[gM]:768,[bv]:770,[MM]:776,[yM]:774,[xM]:772,[vM]:769,[Cv]:771,[SM]:775,[_M]:773};function Fe(N,Z,se,ge,Me,Oe,Ie,Ke){if(N===Yi){d===!0&&(Re(3042),d=!1);return}if(d===!1&&(j(3042),d=!0),N!==dM){if(N!==v||Ke!==S){if((g!==so||E!==so)&&(n.blendEquation(32774),g=so,E=so),Ke)switch(N){case To:n.blendFuncSeparate(1,771,1,771);break;case vp:n.blendFunc(1,1);break;case xp:n.blendFuncSeparate(0,769,0,1);break;case _p:n.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case To:n.blendFuncSeparate(770,771,1,771);break;case vp:n.blendFunc(770,1);break;case xp:n.blendFuncSeparate(0,769,0,1);break;case _p:n.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,M=null,P=null,T=null,v=N,S=Ke}return}Me=Me||Z,Oe=Oe||se,Ie=Ie||ge,(Z!==g||Me!==E)&&(n.blendEquationSeparate(Be[Z],Be[Me]),g=Z,E=Me),(se!==y||ge!==M||Oe!==P||Ie!==T)&&(n.blendFuncSeparate(Ae[se],Ae[ge],Ae[Oe],Ae[Ie]),y=se,M=ge,P=Oe,T=Ie),v=N,S=!1}function lt(N,Z){N.side===ti?Re(2884):j(2884);let se=N.side===un;Z&&(se=!se),ct(se),N.blending===To&&N.transparent===!1?Fe(Yi):Fe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.premultipliedAlpha),c.setFunc(N.depthFunc),c.setTest(N.depthTest),c.setMask(N.depthWrite),a.setMask(N.colorWrite);const ge=N.stencilWrite;l.setTest(ge),ge&&(l.setMask(N.stencilWriteMask),l.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),l.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),We(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?j(32926):Re(32926)}function ct(N){w!==N&&(N?n.frontFace(2304):n.frontFace(2305),w=N)}function mt(N){N!==lM?(j(2884),N!==V&&(N===gp?n.cullFace(1029):N===cM?n.cullFace(1028):n.cullFace(1032))):Re(2884),V=N}function dt(N){N!==k&&($&&n.lineWidth(N),k=N)}function We(N,Z,se){N?(j(32823),(R!==Z||D!==se)&&(n.polygonOffset(Z,se),R=Z,D=se)):Re(32823)}function et(N){N?j(3089):Re(3089)}function Tt(N){N===void 0&&(N=33984+F-1),H!==N&&(n.activeTexture(N),H=N)}function L(N,Z,se){se===void 0&&(H===null?se=33984+F-1:se=H);let ge=G[se];ge===void 0&&(ge={type:void 0,texture:void 0},G[se]=ge),(ge.type!==N||ge.texture!==Z)&&(H!==se&&(n.activeTexture(se),H=se),n.bindTexture(N,Z||pe[N]),ge.type=N,ge.texture=Z)}function b(){const N=G[H];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ce(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function I(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function oe(N){q.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),q.copy(N))}function xe(N){Q.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Q.copy(N))}function Pe(N,Z){let se=f.get(Z);se===void 0&&(se=new WeakMap,f.set(Z,se));let ge=se.get(N);ge===void 0&&(ge=n.getUniformBlockIndex(Z,N.name),se.set(N,ge))}function De(N,Z){const ge=f.get(Z).get(N);u.get(Z)!==ge&&(n.uniformBlockBinding(Z,ge,N.__bindingPointIndex),u.set(Z,ge))}function je(){n.disable(3042),n.disable(2884),n.disable(2929),n.disable(32823),n.disable(3089),n.disable(2960),n.disable(32926),n.blendEquation(32774),n.blendFunc(1,0),n.blendFuncSeparate(1,0,1,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(513),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(519,0,4294967295),n.stencilOp(7680,7680,7680),n.clearStencil(0),n.cullFace(1029),n.frontFace(2305),n.polygonOffset(0,0),n.activeTexture(33984),n.bindFramebuffer(36160,null),i===!0&&(n.bindFramebuffer(36009,null),n.bindFramebuffer(36008,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},H=null,G={},p={},_=new WeakMap,x=[],m=null,d=!1,v=null,g=null,y=null,M=null,E=null,P=null,T=null,S=!1,w=null,V=null,k=null,R=null,D=null,q.set(0,0,n.canvas.width,n.canvas.height),Q.set(0,0,n.canvas.width,n.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:j,disable:Re,bindFramebuffer:Te,drawBuffers:me,useProgram:Le,setBlending:Fe,setMaterial:lt,setFlipSided:ct,setCullFace:mt,setLineWidth:dt,setPolygonOffset:We,setScissorTest:et,activeTexture:Tt,bindTexture:L,unbindTexture:b,compressedTexImage2D:J,compressedTexImage3D:le,texImage2D:ne,texImage3D:ae,updateUBOMapping:Pe,uniformBlockBinding:De,texStorage2D:Y,texStorage3D:Se,texSubImage2D:ce,texSubImage3D:ye,compressedTexSubImage2D:I,compressedTexSubImage3D:re,scissor:oe,viewport:xe,reset:je}}function KC(n,e,t,i,r,o,s){const a=r.isWebGL2,c=r.maxTextures,l=r.maxCubemapSize,u=r.maxTextureSize,f=r.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let x;const m=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,b){return d?new OffscreenCanvas(L,b):Ul("canvas")}function g(L,b,J,le){let ce=1;if((L.width>le||L.height>le)&&(ce=le/Math.max(L.width,L.height)),ce<1||b===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const ye=b?rw:Math.floor,I=ye(ce*L.width),re=ye(ce*L.height);x===void 0&&(x=v(I,re));const Y=J?v(I,re):x;return Y.width=I,Y.height=re,Y.getContext("2d").drawImage(L,0,0,I,re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+I+"x"+re+")."),Y}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function y(L){return qp(L.width)&&qp(L.height)}function M(L){return a?!1:L.wrapS!==Hn||L.wrapT!==Hn||L.minFilter!==qt&&L.minFilter!==An}function E(L,b){return L.generateMipmaps&&b&&L.minFilter!==qt&&L.minFilter!==An}function P(L){n.generateMipmap(L)}function T(L,b,J,le,ce=!1){if(a===!1)return b;if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ye=b;return b===6403&&(J===5126&&(ye=33326),J===5131&&(ye=33325),J===5121&&(ye=33321)),b===33319&&(J===5126&&(ye=33328),J===5131&&(ye=33327),J===5121&&(ye=33323)),b===6408&&(J===5126&&(ye=34836),J===5131&&(ye=34842),J===5121&&(ye=le===st&&ce===!1?35907:32856),J===32819&&(ye=32854),J===32820&&(ye=32855)),(ye===33325||ye===33326||ye===33327||ye===33328||ye===34842||ye===34836)&&e.get("EXT_color_buffer_float"),ye}function S(L,b,J){return E(L,J)===!0||L.isFramebufferTexture&&L.minFilter!==qt&&L.minFilter!==An?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function w(L){return L===qt||L===Mp||L===kc?9728:9729}function V(L){const b=L.target;b.removeEventListener("dispose",V),R(b),b.isVideoTexture&&_.delete(b)}function k(L){const b=L.target;b.removeEventListener("dispose",k),F(b)}function R(L){const b=i.get(L);if(b.__webglInit===void 0)return;const J=L.source,le=m.get(J);if(le){const ce=le[b.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&D(L),Object.keys(le).length===0&&m.delete(J)}i.remove(L)}function D(L){const b=i.get(L);n.deleteTexture(b.__webglTexture);const J=L.source,le=m.get(J);delete le[b.__cacheKey],s.memory.textures--}function F(L){const b=L.texture,J=i.get(L),le=i.get(b);if(le.__webglTexture!==void 0&&(n.deleteTexture(le.__webglTexture),s.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++)n.deleteFramebuffer(J.__webglFramebuffer[ce]),J.__webglDepthbuffer&&n.deleteRenderbuffer(J.__webglDepthbuffer[ce]);else{if(n.deleteFramebuffer(J.__webglFramebuffer),J.__webglDepthbuffer&&n.deleteRenderbuffer(J.__webglDepthbuffer),J.__webglMultisampledFramebuffer&&n.deleteFramebuffer(J.__webglMultisampledFramebuffer),J.__webglColorRenderbuffer)for(let ce=0;ce<J.__webglColorRenderbuffer.length;ce++)J.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(J.__webglColorRenderbuffer[ce]);J.__webglDepthRenderbuffer&&n.deleteRenderbuffer(J.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let ce=0,ye=b.length;ce<ye;ce++){const I=i.get(b[ce]);I.__webglTexture&&(n.deleteTexture(I.__webglTexture),s.memory.textures--),i.remove(b[ce])}i.remove(b),i.remove(L)}let $=0;function K(){$=0}function U(){const L=$;return L>=c&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+c),$+=1,L}function H(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.encoding),b.join()}function G(L,b){const J=i.get(L);if(L.isVideoTexture&&et(L),L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){const le=L.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(J,L,b);return}}t.bindTexture(3553,J.__webglTexture,33984+b)}function de(L,b){const J=i.get(L);if(L.version>0&&J.__version!==L.version){Re(J,L,b);return}t.bindTexture(35866,J.__webglTexture,33984+b)}function ie(L,b){const J=i.get(L);if(L.version>0&&J.__version!==L.version){Re(J,L,b);return}t.bindTexture(32879,J.__webglTexture,33984+b)}function q(L,b){const J=i.get(L);if(L.version>0&&J.__version!==L.version){Te(J,L,b);return}t.bindTexture(34067,J.__webglTexture,33984+b)}const Q={[Cd]:10497,[Hn]:33071,[Td]:33648},he={[qt]:9728,[Mp]:9984,[kc]:9986,[An]:9729,[OM]:9985,[qs]:9987};function pe(L,b,J){if(J?(n.texParameteri(L,10242,Q[b.wrapS]),n.texParameteri(L,10243,Q[b.wrapT]),(L===32879||L===35866)&&n.texParameteri(L,32882,Q[b.wrapR]),n.texParameteri(L,10240,he[b.magFilter]),n.texParameteri(L,10241,he[b.minFilter])):(n.texParameteri(L,10242,33071),n.texParameteri(L,10243,33071),(L===32879||L===35866)&&n.texParameteri(L,32882,33071),(b.wrapS!==Hn||b.wrapT!==Hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(L,10240,w(b.magFilter)),n.texParameteri(L,10241,w(b.minFilter)),b.minFilter!==qt&&b.minFilter!==An&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const le=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===qt||b.minFilter!==kc&&b.minFilter!==qs||b.type===Sr&&e.has("OES_texture_float_linear")===!1||a===!1&&b.type===Ys&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||i.get(b).__currentAnisotropy)&&(n.texParameterf(L,le.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy)}}function j(L,b){let J=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",V));const le=b.source;let ce=m.get(le);ce===void 0&&(ce={},m.set(le,ce));const ye=H(b);if(ye!==L.__cacheKey){ce[ye]===void 0&&(ce[ye]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,J=!0),ce[ye].usedTimes++;const I=ce[L.__cacheKey];I!==void 0&&(ce[L.__cacheKey].usedTimes--,I.usedTimes===0&&D(b)),L.__cacheKey=ye,L.__webglTexture=ce[ye].texture}return J}function Re(L,b,J){let le=3553;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(le=35866),b.isData3DTexture&&(le=32879);const ce=j(L,b),ye=b.source;t.bindTexture(le,L.__webglTexture,33984+J);const I=i.get(ye);if(ye.version!==I.__version||ce===!0){t.activeTexture(33984+J),n.pixelStorei(37440,b.flipY),n.pixelStorei(37441,b.premultiplyAlpha),n.pixelStorei(3317,b.unpackAlignment),n.pixelStorei(37443,0);const re=M(b)&&y(b.image)===!1;let Y=g(b.image,re,!1,u);Y=Tt(b,Y);const Se=y(Y)||a,ne=o.convert(b.format,b.encoding);let ae=o.convert(b.type),oe=T(b.internalFormat,ne,ae,b.encoding,b.isVideoTexture);pe(le,b,Se);let xe;const Pe=b.mipmaps,De=a&&b.isVideoTexture!==!0,je=I.__version===void 0||ce===!0,N=S(b,Y,Se);if(b.isDepthTexture)oe=6402,a?b.type===Sr?oe=36012:b.type===yr?oe=33190:b.type===Ao?oe=35056:oe=33189:b.type===Sr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===br&&oe===6402&&b.type!==Pv&&b.type!==yr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=yr,ae=o.convert(b.type)),b.format===Bo&&oe===6402&&(oe=34041,b.type!==Ao&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Ao,ae=o.convert(b.type))),je&&(De?t.texStorage2D(3553,1,oe,Y.width,Y.height):t.texImage2D(3553,0,oe,Y.width,Y.height,0,ne,ae,null));else if(b.isDataTexture)if(Pe.length>0&&Se){De&&je&&t.texStorage2D(3553,N,oe,Pe[0].width,Pe[0].height);for(let Z=0,se=Pe.length;Z<se;Z++)xe=Pe[Z],De?t.texSubImage2D(3553,Z,0,0,xe.width,xe.height,ne,ae,xe.data):t.texImage2D(3553,Z,oe,xe.width,xe.height,0,ne,ae,xe.data);b.generateMipmaps=!1}else De?(je&&t.texStorage2D(3553,N,oe,Y.width,Y.height),t.texSubImage2D(3553,0,0,0,Y.width,Y.height,ne,ae,Y.data)):t.texImage2D(3553,0,oe,Y.width,Y.height,0,ne,ae,Y.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){De&&je&&t.texStorage3D(35866,N,oe,Pe[0].width,Pe[0].height,Y.depth);for(let Z=0,se=Pe.length;Z<se;Z++)xe=Pe[Z],b.format!==Wn?ne!==null?De?t.compressedTexSubImage3D(35866,Z,0,0,0,xe.width,xe.height,Y.depth,ne,xe.data,0,0):t.compressedTexImage3D(35866,Z,oe,xe.width,xe.height,Y.depth,0,xe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?t.texSubImage3D(35866,Z,0,0,0,xe.width,xe.height,Y.depth,ne,ae,xe.data):t.texImage3D(35866,Z,oe,xe.width,xe.height,Y.depth,0,ne,ae,xe.data)}else{De&&je&&t.texStorage2D(3553,N,oe,Pe[0].width,Pe[0].height);for(let Z=0,se=Pe.length;Z<se;Z++)xe=Pe[Z],b.format!==Wn?ne!==null?De?t.compressedTexSubImage2D(3553,Z,0,0,xe.width,xe.height,ne,xe.data):t.compressedTexImage2D(3553,Z,oe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?t.texSubImage2D(3553,Z,0,0,xe.width,xe.height,ne,ae,xe.data):t.texImage2D(3553,Z,oe,xe.width,xe.height,0,ne,ae,xe.data)}else if(b.isDataArrayTexture)De?(je&&t.texStorage3D(35866,N,oe,Y.width,Y.height,Y.depth),t.texSubImage3D(35866,0,0,0,0,Y.width,Y.height,Y.depth,ne,ae,Y.data)):t.texImage3D(35866,0,oe,Y.width,Y.height,Y.depth,0,ne,ae,Y.data);else if(b.isData3DTexture)De?(je&&t.texStorage3D(32879,N,oe,Y.width,Y.height,Y.depth),t.texSubImage3D(32879,0,0,0,0,Y.width,Y.height,Y.depth,ne,ae,Y.data)):t.texImage3D(32879,0,oe,Y.width,Y.height,Y.depth,0,ne,ae,Y.data);else if(b.isFramebufferTexture){if(je)if(De)t.texStorage2D(3553,N,oe,Y.width,Y.height);else{let Z=Y.width,se=Y.height;for(let ge=0;ge<N;ge++)t.texImage2D(3553,ge,oe,Z,se,0,ne,ae,null),Z>>=1,se>>=1}}else if(Pe.length>0&&Se){De&&je&&t.texStorage2D(3553,N,oe,Pe[0].width,Pe[0].height);for(let Z=0,se=Pe.length;Z<se;Z++)xe=Pe[Z],De?t.texSubImage2D(3553,Z,0,0,ne,ae,xe):t.texImage2D(3553,Z,oe,ne,ae,xe);b.generateMipmaps=!1}else De?(je&&t.texStorage2D(3553,N,oe,Y.width,Y.height),t.texSubImage2D(3553,0,0,0,ne,ae,Y)):t.texImage2D(3553,0,oe,ne,ae,Y);E(b,Se)&&P(le),I.__version=ye.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function Te(L,b,J){if(b.image.length!==6)return;const le=j(L,b),ce=b.source;t.bindTexture(34067,L.__webglTexture,33984+J);const ye=i.get(ce);if(ce.version!==ye.__version||le===!0){t.activeTexture(33984+J),n.pixelStorei(37440,b.flipY),n.pixelStorei(37441,b.premultiplyAlpha),n.pixelStorei(3317,b.unpackAlignment),n.pixelStorei(37443,0);const I=b.isCompressedTexture||b.image[0].isCompressedTexture,re=b.image[0]&&b.image[0].isDataTexture,Y=[];for(let Z=0;Z<6;Z++)!I&&!re?Y[Z]=g(b.image[Z],!1,!0,l):Y[Z]=re?b.image[Z].image:b.image[Z],Y[Z]=Tt(b,Y[Z]);const Se=Y[0],ne=y(Se)||a,ae=o.convert(b.format,b.encoding),oe=o.convert(b.type),xe=T(b.internalFormat,ae,oe,b.encoding),Pe=a&&b.isVideoTexture!==!0,De=ye.__version===void 0||le===!0;let je=S(b,Se,ne);pe(34067,b,ne);let N;if(I){Pe&&De&&t.texStorage2D(34067,je,xe,Se.width,Se.height);for(let Z=0;Z<6;Z++){N=Y[Z].mipmaps;for(let se=0;se<N.length;se++){const ge=N[se];b.format!==Wn?ae!==null?Pe?t.compressedTexSubImage2D(34069+Z,se,0,0,ge.width,ge.height,ae,ge.data):t.compressedTexImage2D(34069+Z,se,xe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?t.texSubImage2D(34069+Z,se,0,0,ge.width,ge.height,ae,oe,ge.data):t.texImage2D(34069+Z,se,xe,ge.width,ge.height,0,ae,oe,ge.data)}}}else{N=b.mipmaps,Pe&&De&&(N.length>0&&je++,t.texStorage2D(34067,je,xe,Y[0].width,Y[0].height));for(let Z=0;Z<6;Z++)if(re){Pe?t.texSubImage2D(34069+Z,0,0,0,Y[Z].width,Y[Z].height,ae,oe,Y[Z].data):t.texImage2D(34069+Z,0,xe,Y[Z].width,Y[Z].height,0,ae,oe,Y[Z].data);for(let se=0;se<N.length;se++){const Me=N[se].image[Z].image;Pe?t.texSubImage2D(34069+Z,se+1,0,0,Me.width,Me.height,ae,oe,Me.data):t.texImage2D(34069+Z,se+1,xe,Me.width,Me.height,0,ae,oe,Me.data)}}else{Pe?t.texSubImage2D(34069+Z,0,0,0,ae,oe,Y[Z]):t.texImage2D(34069+Z,0,xe,ae,oe,Y[Z]);for(let se=0;se<N.length;se++){const ge=N[se];Pe?t.texSubImage2D(34069+Z,se+1,0,0,ae,oe,ge.image[Z]):t.texImage2D(34069+Z,se+1,xe,ae,oe,ge.image[Z])}}}E(b,ne)&&P(34067),ye.__version=ce.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function me(L,b,J,le,ce){const ye=o.convert(J.format,J.encoding),I=o.convert(J.type),re=T(J.internalFormat,ye,I,J.encoding);i.get(b).__hasExternalTextures||(ce===32879||ce===35866?t.texImage3D(ce,0,re,b.width,b.height,b.depth,0,ye,I,null):t.texImage2D(ce,0,re,b.width,b.height,0,ye,I,null)),t.bindFramebuffer(36160,L),We(b)?h.framebufferTexture2DMultisampleEXT(36160,le,ce,i.get(J).__webglTexture,0,dt(b)):(ce===3553||ce>=34069&&ce<=34074)&&n.framebufferTexture2D(36160,le,ce,i.get(J).__webglTexture,0),t.bindFramebuffer(36160,null)}function Le(L,b,J){if(n.bindRenderbuffer(36161,L),b.depthBuffer&&!b.stencilBuffer){let le=33189;if(J||We(b)){const ce=b.depthTexture;ce&&ce.isDepthTexture&&(ce.type===Sr?le=36012:ce.type===yr&&(le=33190));const ye=dt(b);We(b)?h.renderbufferStorageMultisampleEXT(36161,ye,le,b.width,b.height):n.renderbufferStorageMultisample(36161,ye,le,b.width,b.height)}else n.renderbufferStorage(36161,le,b.width,b.height);n.framebufferRenderbuffer(36160,36096,36161,L)}else if(b.depthBuffer&&b.stencilBuffer){const le=dt(b);J&&We(b)===!1?n.renderbufferStorageMultisample(36161,le,35056,b.width,b.height):We(b)?h.renderbufferStorageMultisampleEXT(36161,le,35056,b.width,b.height):n.renderbufferStorage(36161,34041,b.width,b.height),n.framebufferRenderbuffer(36160,33306,36161,L)}else{const le=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ce=0;ce<le.length;ce++){const ye=le[ce],I=o.convert(ye.format,ye.encoding),re=o.convert(ye.type),Y=T(ye.internalFormat,I,re,ye.encoding),Se=dt(b);J&&We(b)===!1?n.renderbufferStorageMultisample(36161,Se,Y,b.width,b.height):We(b)?h.renderbufferStorageMultisampleEXT(36161,Se,Y,b.width,b.height):n.renderbufferStorage(36161,Y,b.width,b.height)}}n.bindRenderbuffer(36161,null)}function Be(L,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),G(b.depthTexture,0);const le=i.get(b.depthTexture).__webglTexture,ce=dt(b);if(b.depthTexture.format===br)We(b)?h.framebufferTexture2DMultisampleEXT(36160,36096,3553,le,0,ce):n.framebufferTexture2D(36160,36096,3553,le,0);else if(b.depthTexture.format===Bo)We(b)?h.framebufferTexture2DMultisampleEXT(36160,33306,3553,le,0,ce):n.framebufferTexture2D(36160,33306,3553,le,0);else throw new Error("Unknown depthTexture format")}function Ae(L){const b=i.get(L),J=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!b.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");Be(b.__webglFramebuffer,L)}else if(J){b.__webglDepthbuffer=[];for(let le=0;le<6;le++)t.bindFramebuffer(36160,b.__webglFramebuffer[le]),b.__webglDepthbuffer[le]=n.createRenderbuffer(),Le(b.__webglDepthbuffer[le],L,!1)}else t.bindFramebuffer(36160,b.__webglFramebuffer),b.__webglDepthbuffer=n.createRenderbuffer(),Le(b.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function Fe(L,b,J){const le=i.get(L);b!==void 0&&me(le.__webglFramebuffer,L,L.texture,36064,3553),J!==void 0&&Ae(L)}function lt(L){const b=L.texture,J=i.get(L),le=i.get(b);L.addEventListener("dispose",k),L.isWebGLMultipleRenderTargets!==!0&&(le.__webglTexture===void 0&&(le.__webglTexture=n.createTexture()),le.__version=b.version,s.memory.textures++);const ce=L.isWebGLCubeRenderTarget===!0,ye=L.isWebGLMultipleRenderTargets===!0,I=y(L)||a;if(ce){J.__webglFramebuffer=[];for(let re=0;re<6;re++)J.__webglFramebuffer[re]=n.createFramebuffer()}else{if(J.__webglFramebuffer=n.createFramebuffer(),ye)if(r.drawBuffers){const re=L.texture;for(let Y=0,Se=re.length;Y<Se;Y++){const ne=i.get(re[Y]);ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&We(L)===!1){const re=ye?b:[b];J.__webglMultisampledFramebuffer=n.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,J.__webglMultisampledFramebuffer);for(let Y=0;Y<re.length;Y++){const Se=re[Y];J.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(36161,J.__webglColorRenderbuffer[Y]);const ne=o.convert(Se.format,Se.encoding),ae=o.convert(Se.type),oe=T(Se.internalFormat,ne,ae,Se.encoding,L.isXRRenderTarget===!0),xe=dt(L);n.renderbufferStorageMultisample(36161,xe,oe,L.width,L.height),n.framebufferRenderbuffer(36160,36064+Y,36161,J.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(36161,null),L.depthBuffer&&(J.__webglDepthRenderbuffer=n.createRenderbuffer(),Le(J.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}}if(ce){t.bindTexture(34067,le.__webglTexture),pe(34067,b,I);for(let re=0;re<6;re++)me(J.__webglFramebuffer[re],L,b,36064,34069+re);E(b,I)&&P(34067),t.unbindTexture()}else if(ye){const re=L.texture;for(let Y=0,Se=re.length;Y<Se;Y++){const ne=re[Y],ae=i.get(ne);t.bindTexture(3553,ae.__webglTexture),pe(3553,ne,I),me(J.__webglFramebuffer,L,ne,36064+Y,3553),E(ne,I)&&P(3553)}t.unbindTexture()}else{let re=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?re=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(re,le.__webglTexture),pe(re,b,I),me(J.__webglFramebuffer,L,b,36064,re),E(b,I)&&P(re),t.unbindTexture()}L.depthBuffer&&Ae(L)}function ct(L){const b=y(L)||a,J=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let le=0,ce=J.length;le<ce;le++){const ye=J[le];if(E(ye,b)){const I=L.isWebGLCubeRenderTarget?34067:3553,re=i.get(ye).__webglTexture;t.bindTexture(I,re),P(I),t.unbindTexture()}}}function mt(L){if(a&&L.samples>0&&We(L)===!1){const b=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],J=L.width,le=L.height;let ce=16384;const ye=[],I=L.stencilBuffer?33306:36096,re=i.get(L),Y=L.isWebGLMultipleRenderTargets===!0;if(Y)for(let Se=0;Se<b.length;Se++)t.bindFramebuffer(36160,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+Se,36161,null),t.bindFramebuffer(36160,re.__webglFramebuffer),n.framebufferTexture2D(36009,36064+Se,3553,null,0);t.bindFramebuffer(36008,re.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,re.__webglFramebuffer);for(let Se=0;Se<b.length;Se++){ye.push(36064+Se),L.depthBuffer&&ye.push(I);const ne=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(ne===!1&&(L.depthBuffer&&(ce|=256),L.stencilBuffer&&(ce|=1024)),Y&&n.framebufferRenderbuffer(36008,36064,36161,re.__webglColorRenderbuffer[Se]),ne===!0&&(n.invalidateFramebuffer(36008,[I]),n.invalidateFramebuffer(36009,[I])),Y){const ae=i.get(b[Se]).__webglTexture;n.framebufferTexture2D(36009,36064,3553,ae,0)}n.blitFramebuffer(0,0,J,le,0,0,J,le,ce,9728),p&&n.invalidateFramebuffer(36008,ye)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),Y)for(let Se=0;Se<b.length;Se++){t.bindFramebuffer(36160,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+Se,36161,re.__webglColorRenderbuffer[Se]);const ne=i.get(b[Se]).__webglTexture;t.bindFramebuffer(36160,re.__webglFramebuffer),n.framebufferTexture2D(36009,36064+Se,3553,ne,0)}t.bindFramebuffer(36009,re.__webglMultisampledFramebuffer)}}function dt(L){return Math.min(f,L.samples)}function We(L){const b=i.get(L);return a&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function et(L){const b=s.render.frame;_.get(L)!==b&&(_.set(L,b),L.update())}function Tt(L,b){const J=L.encoding,le=L.format,ce=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Ad||J!==Dr&&(J===st?a===!1?e.has("EXT_sRGB")===!0&&le===Wn?(L.format=Ad,L.minFilter=An,L.generateMipmaps=!1):b=Nv.sRGBToLinear(b):(le!==Wn||ce!==Rr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",J)),b}this.allocateTextureUnit=U,this.resetTextureUnits=K,this.setTexture2D=G,this.setTexture2DArray=de,this.setTexture3D=ie,this.setTextureCube=q,this.rebindTextures=Fe,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=me,this.useMultisampledRTT=We}function JC(n,e,t){const i=t.isWebGL2;function r(o,s=null){let a;if(o===Rr)return 5121;if(o===GM)return 32819;if(o===VM)return 32820;if(o===zM)return 5120;if(o===FM)return 5122;if(o===Pv)return 5123;if(o===BM)return 5124;if(o===yr)return 5125;if(o===Sr)return 5126;if(o===Ys)return i?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===HM)return 6406;if(o===Wn)return 6408;if(o===WM)return 6409;if(o===jM)return 6410;if(o===br)return 6402;if(o===Bo)return 34041;if(o===Ad)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===XM)return 6403;if(o===$M)return 36244;if(o===qM)return 33319;if(o===YM)return 33320;if(o===ZM)return 36249;if(o===Oc||o===zc||o===Fc||o===Bc)if(s===st)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Oc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===zc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Fc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Bc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Oc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===zc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Fc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Bc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===wp||o===Ep||o===bp||o===Cp)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===wp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Ep)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===bp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Cp)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===KM)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Tp||o===Ap)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(o===Tp)return s===st?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===Ap)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===Pp||o===Lp||o===Rp||o===Dp||o===Np||o===Ip||o===Up||o===kp||o===Op||o===zp||o===Fp||o===Bp||o===Gp||o===Vp)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(o===Pp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Lp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Rp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Dp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Np)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Ip)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Up)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===kp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===Op)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===zp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Fp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Bp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Gp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Vp)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Gc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(o===Gc)return s===st?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(o===JM||o===Hp||o===Wp||o===jp)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(o===Gc)return a.COMPRESSED_RED_RGTC1_EXT;if(o===Hp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Wp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===jp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===Ao?i?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[o]!==void 0?n[o]:null}return{convert:r}}class QC extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Mr extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const eT={type:"move"};class du{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,o=null,s=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;l.inputState.pinching&&h>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(eT)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Mr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class tT extends yn{constructor(e,t,i,r,o,s,a,c,l,u){if(u=u!==void 0?u:br,u!==br&&u!==Bo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===br&&(i=yr),i===void 0&&u===Bo&&(i=Ao),super(null,r,o,s,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:qt,this.minFilter=c!==void 0?c:qt,this.flipY=!1,this.generateMipmaps=!1}}class nT extends Fr{constructor(e,t){super();const i=this;let r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,p=null,_=null;const x=t.getContextAttributes();let m=null,d=null;const v=[],g=[],y=new Set,M=new Map,E=new on;E.layers.enable(1),E.viewport=new Rt;const P=new on;P.layers.enable(2),P.viewport=new Rt;const T=[E,P],S=new QC;S.layers.enable(1),S.layers.enable(2);let w=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=v[q];return Q===void 0&&(Q=new du,v[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=v[q];return Q===void 0&&(Q=new du,v[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=v[q];return Q===void 0&&(Q=new du,v[q]=Q),Q.getHandSpace()};function k(q){const Q=g.indexOf(q.inputSource);if(Q===-1)return;const he=v[Q];he!==void 0&&he.dispatchEvent({type:q.type,data:q.inputSource})}function R(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",R),r.removeEventListener("inputsourceschange",D);for(let q=0;q<v.length;q++){const Q=g[q];Q!==null&&(g[q]=null,v[q].disconnect(Q))}w=null,V=null,e.setRenderTarget(m),p=null,h=null,f=null,r=null,d=null,ie.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",R),r.addEventListener("inputsourceschange",D),x.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:x.alpha,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(r,t,Q),r.updateRenderState({baseLayer:p}),d=new Nr(p.framebufferWidth,p.framebufferHeight,{format:Wn,type:Rr,encoding:e.outputEncoding,stencilBuffer:x.stencil})}else{let Q=null,he=null,pe=null;x.depth&&(pe=x.stencil?35056:33190,Q=x.stencil?Bo:br,he=x.stencil?Ao:yr);const j={colorFormat:32856,depthFormat:pe,scaleFactor:o};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(j),r.updateRenderState({layers:[h]}),d=new Nr(h.textureWidth,h.textureHeight,{format:Wn,type:Rr,depthTexture:new tT(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:x.stencil,encoding:e.outputEncoding,samples:x.antialias?4:0});const Re=e.properties.get(d);Re.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(a),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function D(q){for(let Q=0;Q<q.removed.length;Q++){const he=q.removed[Q],pe=g.indexOf(he);pe>=0&&(g[pe]=null,v[pe].disconnect(he))}for(let Q=0;Q<q.added.length;Q++){const he=q.added[Q];let pe=g.indexOf(he);if(pe===-1){for(let Re=0;Re<v.length;Re++)if(Re>=g.length){g.push(he),pe=Re;break}else if(g[Re]===null){g[Re]=he,pe=Re;break}if(pe===-1)break}const j=v[pe];j&&j.connect(he)}}const F=new O,$=new O;function K(q,Q,he){F.setFromMatrixPosition(Q.matrixWorld),$.setFromMatrixPosition(he.matrixWorld);const pe=F.distanceTo($),j=Q.projectionMatrix.elements,Re=he.projectionMatrix.elements,Te=j[14]/(j[10]-1),me=j[14]/(j[10]+1),Le=(j[9]+1)/j[5],Be=(j[9]-1)/j[5],Ae=(j[8]-1)/j[0],Fe=(Re[8]+1)/Re[0],lt=Te*Ae,ct=Te*Fe,mt=pe/(-Ae+Fe),dt=mt*-Ae;Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(dt),q.translateZ(mt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const We=Te+mt,et=me+mt,Tt=lt-dt,L=ct+(pe-dt),b=Le*me/et*We,J=Be*me/et*We;q.projectionMatrix.makePerspective(Tt,L,b,J,We,et),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function U(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;S.near=P.near=E.near=q.near,S.far=P.far=E.far=q.far,(w!==S.near||V!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),w=S.near,V=S.far);const Q=q.parent,he=S.cameras;U(S,Q);for(let pe=0;pe<he.length;pe++)U(he[pe],Q);he.length===2?K(S,E,P):S.projectionMatrix.copy(E.projectionMatrix),H(q,S,Q)};function H(q,Q,he){he===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(he.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0);const pe=q.children;for(let j=0,Re=pe.length;j<Re;j++)pe[j].updateMatrixWorld(!0);q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Pd*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.getPlanes=function(){return y};let G=null;function de(q,Q){if(u=Q.getViewerPose(l||s),_=Q,u!==null){const he=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let pe=!1;he.length!==S.cameras.length&&(S.cameras.length=0,pe=!0);for(let j=0;j<he.length;j++){const Re=he[j];let Te=null;if(p!==null)Te=p.getViewport(Re);else{const Le=f.getViewSubImage(h,Re);Te=Le.viewport,j===0&&(e.setRenderTargetTextures(d,Le.colorTexture,h.ignoreDepthValues?void 0:Le.depthStencilTexture),e.setRenderTarget(d))}let me=T[j];me===void 0&&(me=new on,me.layers.enable(j),me.viewport=new Rt,T[j]=me),me.matrix.fromArray(Re.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(Re.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Te.x,Te.y,Te.width,Te.height),j===0&&(S.matrix.copy(me.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),pe===!0&&S.cameras.push(me)}}for(let he=0;he<v.length;he++){const pe=g[he],j=v[he];pe!==null&&j!==void 0&&j.update(pe,Q,l||s)}if(G&&G(q,Q),Q.detectedPlanes){i.dispatchEvent({type:"planesdetected",data:Q.detectedPlanes});let he=null;for(const pe of y)Q.detectedPlanes.has(pe)||(he===null&&(he=[]),he.push(pe));if(he!==null)for(const pe of he)y.delete(pe),M.delete(pe),i.dispatchEvent({type:"planeremoved",data:pe});for(const pe of Q.detectedPlanes)if(!y.has(pe))y.add(pe),M.set(pe,Q.lastChangedTime),i.dispatchEvent({type:"planeadded",data:pe});else{const j=M.get(pe);pe.lastChangedTime>j&&(M.set(pe,pe.lastChangedTime),i.dispatchEvent({type:"planechanged",data:pe}))}}_=null}const ie=new Vv;ie.setAnimationLoop(de),this.setAnimationLoop=function(q){G=q},this.dispose=function(){}}}function iT(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Fv(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,v,g,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?o(m,d):d.isMeshToonMaterial?(o(m,d),f(m,d)):d.isMeshPhongMaterial?(o(m,d),u(m,d)):d.isMeshStandardMaterial?(o(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(o(m,d),_(m,d)):d.isMeshDepthMaterial?o(m,d):d.isMeshDistanceMaterial?(o(m,d),x(m,d)):d.isMeshNormalMaterial?o(m,d):d.isLineBasicMaterial?(s(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,v,g):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function o(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===un&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===un&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const v=e.get(d).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const g=n.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*g,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function s(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,v,g){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=g*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===un&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function rT(n,e,t,i){let r={},o={},s=[];const a=t.isWebGL2?n.getParameter(35375):0;function c(v,g){const y=g.program;i.uniformBlockBinding(v,y)}function l(v,g){let y=r[v.id];y===void 0&&(_(v),y=u(v),r[v.id]=y,v.addEventListener("dispose",m));const M=g.program;i.updateUBOMapping(v,M);const E=e.render.frame;o[v.id]!==E&&(h(v),o[v.id]=E)}function u(v){const g=f();v.__bindingPointIndex=g;const y=n.createBuffer(),M=v.__size,E=v.usage;return n.bindBuffer(35345,y),n.bufferData(35345,M,E),n.bindBuffer(35345,null),n.bindBufferBase(35345,g,y),y}function f(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const g=r[v.id],y=v.uniforms,M=v.__cache;n.bindBuffer(35345,g);for(let E=0,P=y.length;E<P;E++){const T=y[E];if(p(T,E,M)===!0){const S=T.__offset,w=Array.isArray(T.value)?T.value:[T.value];let V=0;for(let k=0;k<w.length;k++){const R=w[k],D=x(R);typeof R=="number"?(T.__data[0]=R,n.bufferSubData(35345,S+V,T.__data)):R.isMatrix3?(T.__data[0]=R.elements[0],T.__data[1]=R.elements[1],T.__data[2]=R.elements[2],T.__data[3]=R.elements[0],T.__data[4]=R.elements[3],T.__data[5]=R.elements[4],T.__data[6]=R.elements[5],T.__data[7]=R.elements[0],T.__data[8]=R.elements[6],T.__data[9]=R.elements[7],T.__data[10]=R.elements[8],T.__data[11]=R.elements[0]):(R.toArray(T.__data,V),V+=D.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(35345,S,T.__data)}}n.bindBuffer(35345,null)}function p(v,g,y){const M=v.value;if(y[g]===void 0){if(typeof M=="number")y[g]=M;else{const E=Array.isArray(M)?M:[M],P=[];for(let T=0;T<E.length;T++)P.push(E[T].clone());y[g]=P}return!0}else if(typeof M=="number"){if(y[g]!==M)return y[g]=M,!0}else{const E=Array.isArray(y[g])?y[g]:[y[g]],P=Array.isArray(M)?M:[M];for(let T=0;T<E.length;T++){const S=E[T];if(S.equals(P[T])===!1)return S.copy(P[T]),!0}}return!1}function _(v){const g=v.uniforms;let y=0;const M=16;let E=0;for(let P=0,T=g.length;P<T;P++){const S=g[P],w={boundary:0,storage:0},V=Array.isArray(S.value)?S.value:[S.value];for(let k=0,R=V.length;k<R;k++){const D=V[k],F=x(D);w.boundary+=F.boundary,w.storage+=F.storage}if(S.__data=new Float32Array(w.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=y,P>0){E=y%M;const k=M-E;E!==0&&k-w.boundary<0&&(y+=M-E,S.__offset=y)}y+=w.storage}return E=y%M,E>0&&(y+=M-E),v.__size=y,v.__cache={},this}function x(v){const g={boundary:0,storage:0};return typeof v=="number"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function m(v){const g=v.target;g.removeEventListener("dispose",m);const y=s.indexOf(g.__bindingPointIndex);s.splice(y,1),n.deleteBuffer(r[g.id]),delete r[g.id],delete o[g.id]}function d(){for(const v in r)n.deleteBuffer(r[v]);s=[],r={},o={}}return{bind:c,update:l,dispose:d}}function oT(){const n=Ul("canvas");return n.style.display="block",n}class ll{constructor(e={}){const{canvas:t=oT(),context:i=null,depth:r=!0,stencil:o=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=s;let p=null,_=null;const x=[],m=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Dr,this.useLegacyLights=!0,this.toneMapping=_i,this.toneMappingExposure=1;const d=this;let v=!1,g=0,y=0,M=null,E=-1,P=null;const T=new Rt,S=new Rt;let w=null,V=t.width,k=t.height,R=1,D=null,F=null;const $=new Rt(0,0,V,k),K=new Rt(0,0,V,k);let U=!1;const H=new Uf;let G=!1,de=!1,ie=null;const q=new rt,Q=new O,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function pe(){return M===null?R:1}let j=i;function Re(A,W){for(let ee=0;ee<A.length;ee++){const B=A[ee],te=t.getContext(B,W);if(te!==null)return te}return null}try{const A={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Df}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",De,!1),j===null){const W=["webgl2","webgl","experimental-webgl"];if(d.isWebGL1Renderer===!0&&W.shift(),j=Re(W,A),j===null)throw Re(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}j.getShaderPrecisionFormat===void 0&&(j.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Te,me,Le,Be,Ae,Fe,lt,ct,mt,dt,We,et,Tt,L,b,J,le,ce,ye,I,re,Y,Se,ne;function ae(){Te=new gb(j),me=new ub(j,Te,e),Te.init(me),Y=new JC(j,Te,me),Le=new ZC(j,Te,me),Be=new _b,Ae=new kC,Fe=new KC(j,Te,Le,Ae,me,Y,Be),lt=new fb(d),ct=new mb(d),mt=new Rw(j,me),Se=new lb(j,Te,mt,me),dt=new vb(j,mt,Be,Se),We=new wb(j,dt,mt,Be),ye=new Mb(j,me,Fe),J=new db(Ae),et=new UC(d,lt,ct,Te,me,Se,J),Tt=new iT(d,Ae),L=new zC,b=new WC(Te,me),ce=new ab(d,lt,ct,Le,We,h,c),le=new YC(d,We,me),ne=new rT(j,Be,me,Le),I=new cb(j,Te,Be,me),re=new xb(j,Te,Be,me),Be.programs=et.programs,d.capabilities=me,d.extensions=Te,d.properties=Ae,d.renderLists=L,d.shadowMap=le,d.state=Le,d.info=Be}ae();const oe=new nT(d,j);this.xr=oe,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const A=Te.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Te.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(A){A!==void 0&&(R=A,this.setSize(V,k,!1))},this.getSize=function(A){return A.set(V,k)},this.setSize=function(A,W,ee=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=A,k=W,t.width=Math.floor(A*R),t.height=Math.floor(W*R),ee===!0&&(t.style.width=A+"px",t.style.height=W+"px"),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(V*R,k*R).floor()},this.setDrawingBufferSize=function(A,W,ee){V=A,k=W,R=ee,t.width=Math.floor(A*ee),t.height=Math.floor(W*ee),this.setViewport(0,0,A,W)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy($)},this.setViewport=function(A,W,ee,B){A.isVector4?$.set(A.x,A.y,A.z,A.w):$.set(A,W,ee,B),Le.viewport(T.copy($).multiplyScalar(R).floor())},this.getScissor=function(A){return A.copy(K)},this.setScissor=function(A,W,ee,B){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,W,ee,B),Le.scissor(S.copy(K).multiplyScalar(R).floor())},this.getScissorTest=function(){return U},this.setScissorTest=function(A){Le.setScissorTest(U=A)},this.setOpaqueSort=function(A){D=A},this.setTransparentSort=function(A){F=A},this.getClearColor=function(A){return A.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(A=!0,W=!0,ee=!0){let B=0;A&&(B|=16384),W&&(B|=256),ee&&(B|=1024),j.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",De,!1),L.dispose(),b.dispose(),Ae.dispose(),lt.dispose(),ct.dispose(),We.dispose(),Se.dispose(),ne.dispose(),et.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Me),oe.removeEventListener("sessionend",Oe),ie&&(ie.dispose(),ie=null),Ie.stop()};function xe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function Pe(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const A=Be.autoReset,W=le.enabled,ee=le.autoUpdate,B=le.needsUpdate,te=le.type;ae(),Be.autoReset=A,le.enabled=W,le.autoUpdate=ee,le.needsUpdate=B,le.type=te}function De(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function je(A){const W=A.target;W.removeEventListener("dispose",je),N(W)}function N(A){Z(A),Ae.remove(A)}function Z(A){const W=Ae.get(A).programs;W!==void 0&&(W.forEach(function(ee){et.releaseProgram(ee)}),A.isShaderMaterial&&et.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,ee,B,te,we){W===null&&(W=he);const fe=te.isMesh&&te.matrixWorld.determinant()<0,ve=tn(A,W,ee,B,te);Le.setMaterial(B,fe);let Ee=ee.index,Ce=1;B.wireframe===!0&&(Ee=dt.getWireframeAttribute(ee),Ce=2);const ze=ee.drawRange,Xe=ee.attributes.position;let tt=ze.start*Ce,Wt=(ze.start+ze.count)*Ce;we!==null&&(tt=Math.max(tt,we.start*Ce),Wt=Math.min(Wt,(we.start+we.count)*Ce)),Ee!==null?(tt=Math.max(tt,0),Wt=Math.min(Wt,Ee.count)):Xe!=null&&(tt=Math.max(tt,0),Wt=Math.min(Wt,Xe.count));const Nn=Wt-tt;if(Nn<0||Nn===1/0)return;Se.setup(te,B,ve,ee,Ee);let or,yt=I;if(Ee!==null&&(or=mt.get(Ee),yt=re,yt.setIndex(or)),te.isMesh)B.wireframe===!0?(Le.setLineWidth(B.wireframeLinewidth*pe()),yt.setMode(1)):yt.setMode(4);else if(te.isLine){let qe=B.linewidth;qe===void 0&&(qe=1),Le.setLineWidth(qe*pe()),te.isLineSegments?yt.setMode(1):te.isLineLoop?yt.setMode(2):yt.setMode(3)}else te.isPoints?yt.setMode(0):te.isSprite&&yt.setMode(4);if(te.isInstancedMesh)yt.renderInstances(tt,Nn,te.count);else if(ee.isInstancedBufferGeometry){const qe=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,oc=Math.min(ee.instanceCount,qe);yt.renderInstances(tt,Nn,oc)}else yt.render(tt,Nn)},this.compile=function(A,W){function ee(B,te,we){B.transparent===!0&&B.side===ti&&B.forceSinglePass===!1?(B.side=un,B.needsUpdate=!0,nt(B,te,we),B.side=Ji,B.needsUpdate=!0,nt(B,te,we),B.side=ti):nt(B,te,we)}_=b.get(A),_.init(),m.push(_),A.traverseVisible(function(B){B.isLight&&B.layers.test(W.layers)&&(_.pushLight(B),B.castShadow&&_.pushShadow(B))}),_.setupLights(d.useLegacyLights),A.traverse(function(B){const te=B.material;if(te)if(Array.isArray(te))for(let we=0;we<te.length;we++){const fe=te[we];ee(fe,A,B)}else ee(te,A,B)}),m.pop(),_=null};let se=null;function ge(A){se&&se(A)}function Me(){Ie.stop()}function Oe(){Ie.start()}const Ie=new Vv;Ie.setAnimationLoop(ge),typeof self<"u"&&Ie.setContext(self),this.setAnimationLoop=function(A){se=A,oe.setAnimationLoop(A),A===null?Ie.stop():Ie.start()},oe.addEventListener("sessionstart",Me),oe.addEventListener("sessionend",Oe),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(W),W=oe.getCamera()),A.isScene===!0&&A.onBeforeRender(d,A,W,M),_=b.get(A,m.length),_.init(),m.push(_),q.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),H.setFromProjectionMatrix(q),de=this.localClippingEnabled,G=J.init(this.clippingPlanes,de),p=L.get(A,x.length),p.init(),x.push(p),Ke(A,W,0,d.sortObjects),p.finish(),d.sortObjects===!0&&p.sort(D,F),G===!0&&J.beginShadows();const ee=_.state.shadowsArray;if(le.render(ee,A,W),G===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset(),ce.render(p,A),_.setupLights(d.useLegacyLights),W.isArrayCamera){const B=W.cameras;for(let te=0,we=B.length;te<we;te++){const fe=B[te];Je(p,A,fe,fe.viewport)}}else Je(p,A,W);M!==null&&(Fe.updateMultisampleRenderTarget(M),Fe.updateRenderTargetMipmap(M)),A.isScene===!0&&A.onAfterRender(d,A,W),Se.resetDefaultState(),E=-1,P=null,m.pop(),m.length>0?_=m[m.length-1]:_=null,x.pop(),x.length>0?p=x[x.length-1]:p=null};function Ke(A,W,ee,B){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)ee=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||H.intersectsSprite(A)){B&&Q.setFromMatrixPosition(A.matrixWorld).applyMatrix4(q);const fe=We.update(A),ve=A.material;ve.visible&&p.push(A,fe,ve,ee,Q.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(A.isSkinnedMesh&&A.skeleton.frame!==Be.render.frame&&(A.skeleton.update(),A.skeleton.frame=Be.render.frame),!A.frustumCulled||H.intersectsObject(A))){B&&Q.setFromMatrixPosition(A.matrixWorld).applyMatrix4(q);const fe=We.update(A),ve=A.material;if(Array.isArray(ve)){const Ee=fe.groups;for(let Ce=0,ze=Ee.length;Ce<ze;Ce++){const Xe=Ee[Ce],tt=ve[Xe.materialIndex];tt&&tt.visible&&p.push(A,fe,tt,ee,Q.z,Xe)}}else ve.visible&&p.push(A,fe,ve,ee,Q.z,null)}}const we=A.children;for(let fe=0,ve=we.length;fe<ve;fe++)Ke(we[fe],W,ee,B)}function Je(A,W,ee,B){const te=A.opaque,we=A.transmissive,fe=A.transparent;_.setupLightsView(ee),G===!0&&J.setGlobalState(d.clippingPlanes,ee),we.length>0&&Ue(te,we,W,ee),B&&Le.viewport(T.copy(B)),te.length>0&&Ne(te,W,ee),we.length>0&&Ne(we,W,ee),fe.length>0&&Ne(fe,W,ee),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function Ue(A,W,ee,B){if(ie===null){const ve=me.isWebGL2;ie=new Nr(1024,1024,{generateMipmaps:!0,type:Te.has("EXT_color_buffer_half_float")?Ys:Rr,minFilter:qs,samples:ve&&a===!0?4:0})}const te=d.getRenderTarget();d.setRenderTarget(ie),d.clear();const we=d.toneMapping;d.toneMapping=_i,Ne(A,ee,B),Fe.updateMultisampleRenderTarget(ie),Fe.updateRenderTargetMipmap(ie);let fe=!1;for(let ve=0,Ee=W.length;ve<Ee;ve++){const Ce=W[ve],ze=Ce.object,Xe=Ce.geometry,tt=Ce.material,Wt=Ce.group;if(tt.side===ti&&ze.layers.test(B.layers)){const Nn=tt.side;tt.side=un,tt.needsUpdate=!0,ke(ze,ee,B,Xe,tt,Wt),tt.side=Nn,tt.needsUpdate=!0,fe=!0}}fe===!0&&(Fe.updateMultisampleRenderTarget(ie),Fe.updateRenderTargetMipmap(ie)),d.setRenderTarget(te),d.toneMapping=we}function Ne(A,W,ee){const B=W.isScene===!0?W.overrideMaterial:null;for(let te=0,we=A.length;te<we;te++){const fe=A[te],ve=fe.object,Ee=fe.geometry,Ce=B===null?fe.material:B,ze=fe.group;ve.layers.test(ee.layers)&&ke(ve,W,ee,Ee,Ce,ze)}}function ke(A,W,ee,B,te,we){A.onBeforeRender(d,W,ee,B,te,we),A.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),te.onBeforeRender(d,W,ee,B,A,we),te.transparent===!0&&te.side===ti&&te.forceSinglePass===!1?(te.side=un,te.needsUpdate=!0,d.renderBufferDirect(ee,W,B,te,A,we),te.side=Ji,te.needsUpdate=!0,d.renderBufferDirect(ee,W,B,te,A,we),te.side=ti):d.renderBufferDirect(ee,W,B,te,A,we),A.onAfterRender(d,W,ee,B,te,we)}function nt(A,W,ee){W.isScene!==!0&&(W=he);const B=Ae.get(A),te=_.state.lights,we=_.state.shadowsArray,fe=te.state.version,ve=et.getParameters(A,te.state,we,W,ee),Ee=et.getProgramCacheKey(ve);let Ce=B.programs;B.environment=A.isMeshStandardMaterial?W.environment:null,B.fog=W.fog,B.envMap=(A.isMeshStandardMaterial?ct:lt).get(A.envMap||B.environment),Ce===void 0&&(A.addEventListener("dispose",je),Ce=new Map,B.programs=Ce);let ze=Ce.get(Ee);if(ze!==void 0){if(B.currentProgram===ze&&B.lightsStateVersion===fe)return En(A,ve),ze}else ve.uniforms=et.getUniforms(A),A.onBuild(ee,ve,d),A.onBeforeCompile(ve,d),ze=et.acquireProgram(ve,Ee),Ce.set(Ee,ze),B.uniforms=ve.uniforms;const Xe=B.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Xe.clippingPlanes=J.uniform),En(A,ve),B.needsLights=oi(A),B.lightsStateVersion=fe,B.needsLights&&(Xe.ambientLightColor.value=te.state.ambient,Xe.lightProbe.value=te.state.probe,Xe.directionalLights.value=te.state.directional,Xe.directionalLightShadows.value=te.state.directionalShadow,Xe.spotLights.value=te.state.spot,Xe.spotLightShadows.value=te.state.spotShadow,Xe.rectAreaLights.value=te.state.rectArea,Xe.ltc_1.value=te.state.rectAreaLTC1,Xe.ltc_2.value=te.state.rectAreaLTC2,Xe.pointLights.value=te.state.point,Xe.pointLightShadows.value=te.state.pointShadow,Xe.hemisphereLights.value=te.state.hemi,Xe.directionalShadowMap.value=te.state.directionalShadowMap,Xe.directionalShadowMatrix.value=te.state.directionalShadowMatrix,Xe.spotShadowMap.value=te.state.spotShadowMap,Xe.spotLightMatrix.value=te.state.spotLightMatrix,Xe.spotLightMap.value=te.state.spotLightMap,Xe.pointShadowMap.value=te.state.pointShadowMap,Xe.pointShadowMatrix.value=te.state.pointShadowMatrix);const tt=ze.getUniforms(),Wt=al.seqWithValue(tt.seq,Xe);return B.currentProgram=ze,B.uniformsList=Wt,ze}function En(A,W){const ee=Ae.get(A);ee.outputEncoding=W.outputEncoding,ee.instancing=W.instancing,ee.skinning=W.skinning,ee.morphTargets=W.morphTargets,ee.morphNormals=W.morphNormals,ee.morphColors=W.morphColors,ee.morphTargetsCount=W.morphTargetsCount,ee.numClippingPlanes=W.numClippingPlanes,ee.numIntersection=W.numClipIntersection,ee.vertexAlphas=W.vertexAlphas,ee.vertexTangents=W.vertexTangents,ee.toneMapping=W.toneMapping}function tn(A,W,ee,B,te){W.isScene!==!0&&(W=he),Fe.resetTextureUnits();const we=W.fog,fe=B.isMeshStandardMaterial?W.environment:null,ve=M===null?d.outputEncoding:M.isXRRenderTarget===!0?M.texture.encoding:Dr,Ee=(B.isMeshStandardMaterial?ct:lt).get(B.envMap||fe),Ce=B.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,ze=!!B.normalMap&&!!ee.attributes.tangent,Xe=!!ee.morphAttributes.position,tt=!!ee.morphAttributes.normal,Wt=!!ee.morphAttributes.color,Nn=B.toneMapped?d.toneMapping:_i,or=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,yt=or!==void 0?or.length:0,qe=Ae.get(B),oc=_.state.lights;if(G===!0&&(de===!0||A!==P)){const dn=A===P&&B.id===E;J.setState(B,A,dn)}let At=!1;B.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==oc.state.version||qe.outputEncoding!==ve||te.isInstancedMesh&&qe.instancing===!1||!te.isInstancedMesh&&qe.instancing===!0||te.isSkinnedMesh&&qe.skinning===!1||!te.isSkinnedMesh&&qe.skinning===!0||qe.envMap!==Ee||B.fog===!0&&qe.fog!==we||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==J.numPlanes||qe.numIntersection!==J.numIntersection)||qe.vertexAlphas!==Ce||qe.vertexTangents!==ze||qe.morphTargets!==Xe||qe.morphNormals!==tt||qe.morphColors!==Wt||qe.toneMapping!==Nn||me.isWebGL2===!0&&qe.morphTargetsCount!==yt)&&(At=!0):(At=!0,qe.__version=B.version);let sr=qe.currentProgram;At===!0&&(sr=nt(B,W,te));let Gf=!1,Jo=!1,sc=!1;const jt=sr.getUniforms(),ar=qe.uniforms;if(Le.useProgram(sr.program)&&(Gf=!0,Jo=!0,sc=!0),B.id!==E&&(E=B.id,Jo=!0),Gf||P!==A){if(jt.setValue(j,"projectionMatrix",A.projectionMatrix),me.logarithmicDepthBuffer&&jt.setValue(j,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),P!==A&&(P=A,Jo=!0,sc=!0),B.isShaderMaterial||B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshStandardMaterial||B.envMap){const dn=jt.map.cameraPosition;dn!==void 0&&dn.setValue(j,Q.setFromMatrixPosition(A.matrixWorld))}(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&jt.setValue(j,"isOrthographic",A.isOrthographicCamera===!0),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial||B.isShadowMaterial||te.isSkinnedMesh)&&jt.setValue(j,"viewMatrix",A.matrixWorldInverse)}if(te.isSkinnedMesh){jt.setOptional(j,te,"bindMatrix"),jt.setOptional(j,te,"bindMatrixInverse");const dn=te.skeleton;dn&&(me.floatVertexTextures?(dn.boneTexture===null&&dn.computeBoneTexture(),jt.setValue(j,"boneTexture",dn.boneTexture,Fe),jt.setValue(j,"boneTextureSize",dn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const ac=ee.morphAttributes;if((ac.position!==void 0||ac.normal!==void 0||ac.color!==void 0&&me.isWebGL2===!0)&&ye.update(te,ee,sr),(Jo||qe.receiveShadow!==te.receiveShadow)&&(qe.receiveShadow=te.receiveShadow,jt.setValue(j,"receiveShadow",te.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(ar.envMap.value=Ee,ar.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Jo&&(jt.setValue(j,"toneMappingExposure",d.toneMappingExposure),qe.needsLights&&bi(ar,sc),we&&B.fog===!0&&Tt.refreshFogUniforms(ar,we),Tt.refreshMaterialUniforms(ar,B,R,k,ie),al.upload(j,qe.uniformsList,ar,Fe)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(al.upload(j,qe.uniformsList,ar,Fe),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&jt.setValue(j,"center",te.center),jt.setValue(j,"modelViewMatrix",te.modelViewMatrix),jt.setValue(j,"normalMatrix",te.normalMatrix),jt.setValue(j,"modelMatrix",te.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const dn=B.uniformsGroups;for(let lc=0,Yv=dn.length;lc<Yv;lc++)if(me.isWebGL2){const Vf=dn[lc];ne.update(Vf,sr),ne.bind(Vf,sr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return sr}function bi(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function oi(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return g},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(A,W,ee){Ae.get(A.texture).__webglTexture=W,Ae.get(A.depthTexture).__webglTexture=ee;const B=Ae.get(A);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=ee===void 0,B.__autoAllocateDepthBuffer||Te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,W){const ee=Ae.get(A);ee.__webglFramebuffer=W,ee.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,ee=0){M=A,g=W,y=ee;let B=!0,te=null,we=!1,fe=!1;if(A){const Ee=Ae.get(A);Ee.__useDefaultFramebuffer!==void 0?(Le.bindFramebuffer(36160,null),B=!1):Ee.__webglFramebuffer===void 0?Fe.setupRenderTarget(A):Ee.__hasExternalTextures&&Fe.rebindTextures(A,Ae.get(A.texture).__webglTexture,Ae.get(A.depthTexture).__webglTexture);const Ce=A.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(fe=!0);const ze=Ae.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(te=ze[W],we=!0):me.isWebGL2&&A.samples>0&&Fe.useMultisampledRTT(A)===!1?te=Ae.get(A).__webglMultisampledFramebuffer:te=ze,T.copy(A.viewport),S.copy(A.scissor),w=A.scissorTest}else T.copy($).multiplyScalar(R).floor(),S.copy(K).multiplyScalar(R).floor(),w=U;if(Le.bindFramebuffer(36160,te)&&me.drawBuffers&&B&&Le.drawBuffers(A,te),Le.viewport(T),Le.scissor(S),Le.setScissorTest(w),we){const Ee=Ae.get(A.texture);j.framebufferTexture2D(36160,36064,34069+W,Ee.__webglTexture,ee)}else if(fe){const Ee=Ae.get(A.texture),Ce=W||0;j.framebufferTextureLayer(36160,36064,Ee.__webglTexture,ee||0,Ce)}E=-1},this.readRenderTargetPixels=function(A,W,ee,B,te,we,fe){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Ae.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve){Le.bindFramebuffer(36160,ve);try{const Ee=A.texture,Ce=Ee.format,ze=Ee.type;if(Ce!==Wn&&Y.convert(Ce)!==j.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=ze===Ys&&(Te.has("EXT_color_buffer_half_float")||me.isWebGL2&&Te.has("EXT_color_buffer_float"));if(ze!==Rr&&Y.convert(ze)!==j.getParameter(35738)&&!(ze===Sr&&(me.isWebGL2||Te.has("OES_texture_float")||Te.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-B&&ee>=0&&ee<=A.height-te&&j.readPixels(W,ee,B,te,Y.convert(Ce),Y.convert(ze),we)}finally{const Ee=M!==null?Ae.get(M).__webglFramebuffer:null;Le.bindFramebuffer(36160,Ee)}}},this.copyFramebufferToTexture=function(A,W,ee=0){const B=Math.pow(2,-ee),te=Math.floor(W.image.width*B),we=Math.floor(W.image.height*B);Fe.setTexture2D(W,0),j.copyTexSubImage2D(3553,ee,0,0,A.x,A.y,te,we),Le.unbindTexture()},this.copyTextureToTexture=function(A,W,ee,B=0){const te=W.image.width,we=W.image.height,fe=Y.convert(ee.format),ve=Y.convert(ee.type);Fe.setTexture2D(ee,0),j.pixelStorei(37440,ee.flipY),j.pixelStorei(37441,ee.premultiplyAlpha),j.pixelStorei(3317,ee.unpackAlignment),W.isDataTexture?j.texSubImage2D(3553,B,A.x,A.y,te,we,fe,ve,W.image.data):W.isCompressedTexture?j.compressedTexSubImage2D(3553,B,A.x,A.y,W.mipmaps[0].width,W.mipmaps[0].height,fe,W.mipmaps[0].data):j.texSubImage2D(3553,B,A.x,A.y,fe,ve,W.image),B===0&&ee.generateMipmaps&&j.generateMipmap(3553),Le.unbindTexture()},this.copyTextureToTexture3D=function(A,W,ee,B,te=0){if(d.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const we=A.max.x-A.min.x+1,fe=A.max.y-A.min.y+1,ve=A.max.z-A.min.z+1,Ee=Y.convert(B.format),Ce=Y.convert(B.type);let ze;if(B.isData3DTexture)Fe.setTexture3D(B,0),ze=32879;else if(B.isDataArrayTexture)Fe.setTexture2DArray(B,0),ze=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(37440,B.flipY),j.pixelStorei(37441,B.premultiplyAlpha),j.pixelStorei(3317,B.unpackAlignment);const Xe=j.getParameter(3314),tt=j.getParameter(32878),Wt=j.getParameter(3316),Nn=j.getParameter(3315),or=j.getParameter(32877),yt=ee.isCompressedTexture?ee.mipmaps[0]:ee.image;j.pixelStorei(3314,yt.width),j.pixelStorei(32878,yt.height),j.pixelStorei(3316,A.min.x),j.pixelStorei(3315,A.min.y),j.pixelStorei(32877,A.min.z),ee.isDataTexture||ee.isData3DTexture?j.texSubImage3D(ze,te,W.x,W.y,W.z,we,fe,ve,Ee,Ce,yt.data):ee.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),j.compressedTexSubImage3D(ze,te,W.x,W.y,W.z,we,fe,ve,Ee,yt.data)):j.texSubImage3D(ze,te,W.x,W.y,W.z,we,fe,ve,Ee,Ce,yt),j.pixelStorei(3314,Xe),j.pixelStorei(32878,tt),j.pixelStorei(3316,Wt),j.pixelStorei(3315,Nn),j.pixelStorei(32877,or),te===0&&B.generateMipmaps&&j.generateMipmap(ze),Le.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?Fe.setTextureCube(A,0):A.isData3DTexture?Fe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Fe.setTexture2DArray(A,0):Fe.setTexture2D(A,0),Le.unbindTexture()},this.resetState=function(){g=0,y=0,M=null,Le.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}}class sT extends ll{}sT.prototype.isWebGL1Renderer=!0;class fu extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Rm extends Kt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const oo=new rt,Dm=new rt,Wa=[],Nm=new ri,aT=new rt,ds=new xn,fs=new Yo;class Ri extends xn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rm(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,aT)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ri),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,oo),Nm.copy(e.boundingBox).applyMatrix4(oo),this.boundingBox.union(Nm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,oo),fs.copy(e.boundingSphere).applyMatrix4(oo),this.boundingSphere.union(fs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(ds.geometry=this.geometry,ds.material=this.material,ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fs.copy(this.boundingSphere),fs.applyMatrix4(i),e.ray.intersectsSphere(fs)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,oo),Dm.multiplyMatrices(i,oo),ds.matrixWorld=Dm,ds.raycast(e,Wa);for(let s=0,a=Wa.length;s<a;s++){const c=Wa[s];c.instanceId=o,c.object=this,t.push(c)}Wa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Rm(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class rc extends Zo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Im=new O,Um=new O,km=new rt,hu=new Nf,ja=new Yo;class lT extends Ut{constructor(e=new Jt,t=new rc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,o=t.count;r<o;r++)Im.fromBufferAttribute(t,r-1),Um.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Im.distanceTo(Um);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(r),ja.radius+=o,e.ray.intersectsSphere(ja)===!1)return;km.copy(r).invert(),hu.copy(e.ray).applyMatrix4(km);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new O,u=new O,f=new O,h=new O,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){const d=Math.max(0,s.start),v=Math.min(_.count,s.start+s.count);for(let g=d,y=v-1;g<y;g+=p){const M=_.getX(g),E=_.getX(g+1);if(l.fromBufferAttribute(m,M),u.fromBufferAttribute(m,E),hu.distanceSqToSegment(l,u,h,f)>c)continue;h.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(h);T<e.near||T>e.far||t.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,s.start),v=Math.min(m.count,s.start+s.count);for(let g=d,y=v-1;g<y;g+=p){if(l.fromBufferAttribute(m,g),u.fromBufferAttribute(m,g+1),hu.distanceSqToSegment(l,u,h,f)>c)continue;h.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(h);E<e.near||E>e.far||t.push({distance:E,point:f.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){const a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}const Om=new O,zm=new O;class Of extends lT{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,o=t.count;r<o;r+=2)Om.fromBufferAttribute(t,r),zm.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Om.distanceTo(zm);e.setAttribute("lineDistance",new vt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zf extends Jt{constructor(e=1,t=1,i=1,r=32,o=1,s=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),o=Math.floor(o);const u=[],f=[],h=[],p=[];let _=0;const x=[],m=i/2;let d=0;v(),s===!1&&(e>0&&g(!0),t>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new vt(f,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(p,2));function v(){const y=new O,M=new O;let E=0;const P=(t-e)/i;for(let T=0;T<=o;T++){const S=[],w=T/o,V=w*(t-e)+e;for(let k=0;k<=r;k++){const R=k/r,D=R*c+a,F=Math.sin(D),$=Math.cos(D);M.x=V*F,M.y=-w*i+m,M.z=V*$,f.push(M.x,M.y,M.z),y.set(F,P,$).normalize(),h.push(y.x,y.y,y.z),p.push(R,1-w),S.push(_++)}x.push(S)}for(let T=0;T<r;T++)for(let S=0;S<o;S++){const w=x[S][T],V=x[S+1][T],k=x[S+1][T+1],R=x[S][T+1];u.push(w,V,R),u.push(V,k,R),E+=6}l.addGroup(d,E,0),d+=E}function g(y){const M=_,E=new Ve,P=new O;let T=0;const S=y===!0?e:t,w=y===!0?1:-1;for(let k=1;k<=r;k++)f.push(0,m*w,0),h.push(0,w,0),p.push(.5,.5),_++;const V=_;for(let k=0;k<=r;k++){const D=k/r*c+a,F=Math.cos(D),$=Math.sin(D);P.x=S*$,P.y=m*w,P.z=S*F,f.push(P.x,P.y,P.z),h.push(0,w,0),E.x=F*.5+.5,E.y=$*.5*w+.5,p.push(E.x,E.y),_++}for(let k=0;k<r;k++){const R=M+k,D=V+k;y===!0?u.push(D,D+1,R):u.push(D+1,D,R),T+=3}l.addGroup(d,T,y===!0?1:2),d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zf(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ff extends Jt{constructor(e=1,t=32,i=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(s+a,Math.PI);let l=0;const u=[],f=new O,h=new O,p=[],_=[],x=[],m=[];for(let d=0;d<=i;d++){const v=[],g=d/i;let y=0;d===0&&s===0?y=.5/t:d===i&&c===Math.PI&&(y=-.5/t);for(let M=0;M<=t;M++){const E=M/t;f.x=-e*Math.cos(r+E*o)*Math.sin(s+g*a),f.y=e*Math.cos(s+g*a),f.z=e*Math.sin(r+E*o)*Math.sin(s+g*a),_.push(f.x,f.y,f.z),h.copy(f).normalize(),x.push(h.x,h.y,h.z),m.push(E+y,1-g),v.push(l++)}u.push(v)}for(let d=0;d<i;d++)for(let v=0;v<t;v++){const g=u[d][v+1],y=u[d][v],M=u[d+1][v],E=u[d+1][v+1];(d!==0||s>0)&&p.push(g,y,E),(d!==i-1||c<Math.PI)&&p.push(y,M,E)}this.setIndex(p),this.setAttribute("position",new vt(_,3)),this.setAttribute("normal",new vt(x,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ff(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class pu extends Zo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lv,this.normalScale=new Ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Fm={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class cT{constructor(e,t,i){const r=this;let o=!1,s=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,o===!1&&r.onStart!==void 0&&r.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,a),s===a&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const p=l[f],_=l[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null}}}const uT=new cT;class qv{constructor(e){this.manager=e!==void 0?e:uT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,o){i.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const fi={};class dT extends Error{constructor(e,t){super(e),this.response=t}}class fT extends qv{constructor(e){super(e)}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=Fm.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(fi[e]!==void 0){fi[e].push({onLoad:t,onProgress:i,onError:r});return}fi[e]=[],fi[e].push({onLoad:t,onProgress:i,onError:r});const s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(s).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=fi[e],f=l.body.getReader(),h=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=h?parseInt(h):0,_=p!==0;let x=0;const m=new ReadableStream({start(d){v();function v(){f.read().then(({done:g,value:y})=>{if(g)d.close();else{x+=y.byteLength;const M=new ProgressEvent("progress",{lengthComputable:_,loaded:x,total:p});for(let E=0,P=u.length;E<P;E++){const T=u[E];T.onProgress&&T.onProgress(M)}d.enqueue(y),v()}})}}});return new Response(m)}else throw new dT(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(h);return l.arrayBuffer().then(_=>p.decode(_))}}}).then(l=>{Fm.add(e,l);const u=fi[e];delete fi[e];for(let f=0,h=u.length;f<h;f++){const p=u[f];p.onLoad&&p.onLoad(l)}}).catch(l=>{const u=fi[e];if(u===void 0)throw this.manager.itemError(e),l;delete fi[e];for(let f=0,h=u.length;f<h;f++){const p=u[f];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Bf extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const mu=new rt,Bm=new O,Gm=new O;class hT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ve(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uf,this._frameExtents=new Ve(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Bm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bm),Gm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gm),t.updateMatrixWorld(),mu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class pT extends hT{constructor(){super(new Hv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mT extends Bf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new pT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gT extends Bf{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class vT{constructor(e,t,i=0,r=1/0){this.ray=new Nf(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new If,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Rd(e,this,i,t),i.sort(Vm),i}intersectObjects(e,t=!0,i=[]){for(let r=0,o=e.length;r<o;r++)Rd(e[r],this,i,t);return i.sort(Vm),i}}function Vm(n,e){return n.distance-e.distance}function Rd(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let o=0,s=r.length;o<s;o++)Rd(r[o],e,t,!0)}}class Hm{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Yt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Wm extends Of{constructor(e=10,t=10,i=4473924,r=8947848){i=new Ye(i),r=new Ye(r);const o=t/2,s=e/t,a=e/2,c=[],l=[];for(let h=0,p=0,_=-a;h<=t;h++,_+=s){c.push(-a,0,_,a,0,_),c.push(_,0,-a,_,0,a);const x=h===o?i:r;x.toArray(l,p),p+=3,x.toArray(l,p),p+=3,x.toArray(l,p),p+=3,x.toArray(l,p),p+=3}const u=new Jt;u.setAttribute("position",new vt(c,3)),u.setAttribute("color",new vt(l,3));const f=new rc({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class xT extends Of{constructor(e,t=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),r=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],o=new Jt;o.setIndex(new Kt(i,1)),o.setAttribute("position",new vt(r,3)),super(o,new rc({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class jm extends Of{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Jt;r.setAttribute("position",new vt(t,3)),r.setAttribute("color",new vt(i,3));const o=new rc({vertexColors:!0,toneMapped:!1});super(r,o),this.type="AxesHelper"}setColors(e,t,i){const r=new Ye,o=this.geometry.attributes.color.array;return r.set(e),r.toArray(o,0),r.toArray(o,3),r.set(t),r.toArray(o,6),r.toArray(o,9),r.set(i),r.toArray(o,12),r.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Df}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Df);class _T extends qv{constructor(e){super(e)}load(e,t,i,r){const o=this,s=new fT(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(a){try{t(o.parse(a))}catch(c){r?r(c):console.error(c),o.manager.itemError(e)}},i,r)}parse(e){function t(l){const u=new DataView(l),f=32/8*3+32/8*3*3+16/8,h=u.getUint32(80,!0);if(80+32/8+h*f===u.byteLength)return!0;const _=[115,111,108,105,100];for(let x=0;x<5;x++)if(i(_,u,x))return!1;return!0}function i(l,u,f){for(let h=0,p=l.length;h<p;h++)if(l[h]!==u.getUint8(f+h))return!1;return!0}function r(l){const u=new DataView(l),f=u.getUint32(80,!0);let h,p,_,x=!1,m,d,v,g,y;for(let w=0;w<80-10;w++)u.getUint32(w,!1)==1129270351&&u.getUint8(w+4)==82&&u.getUint8(w+5)==61&&(x=!0,m=new Float32Array(f*3*3),d=u.getUint8(w+6)/255,v=u.getUint8(w+7)/255,g=u.getUint8(w+8)/255,y=u.getUint8(w+9)/255);const M=84,E=12*4+2,P=new Jt,T=new Float32Array(f*3*3),S=new Float32Array(f*3*3);for(let w=0;w<f;w++){const V=M+w*E,k=u.getFloat32(V,!0),R=u.getFloat32(V+4,!0),D=u.getFloat32(V+8,!0);if(x){const F=u.getUint16(V+48,!0);F&32768?(h=d,p=v,_=g):(h=(F&31)/31,p=(F>>5&31)/31,_=(F>>10&31)/31)}for(let F=1;F<=3;F++){const $=V+F*12,K=w*3*3+(F-1)*3;T[K]=u.getFloat32($,!0),T[K+1]=u.getFloat32($+4,!0),T[K+2]=u.getFloat32($+8,!0),S[K]=k,S[K+1]=R,S[K+2]=D,x&&(m[K]=h,m[K+1]=p,m[K+2]=_)}}return P.setAttribute("position",new Kt(T,3)),P.setAttribute("normal",new Kt(S,3)),x&&(P.setAttribute("color",new Kt(m,3)),P.hasColors=!0,P.alpha=y),P}function o(l){const u=new Jt,f=/solid([\s\S]*?)endsolid/g,h=/facet([\s\S]*?)endfacet/g;let p=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,x=new RegExp("vertex"+_+_+_,"g"),m=new RegExp("normal"+_+_+_,"g"),d=[],v=[],g=new O;let y,M=0,E=0,P=0;for(;(y=f.exec(l))!==null;){E=P;const T=y[0];for(;(y=h.exec(T))!==null;){let V=0,k=0;const R=y[0];for(;(y=m.exec(R))!==null;)g.x=parseFloat(y[1]),g.y=parseFloat(y[2]),g.z=parseFloat(y[3]),k++;for(;(y=x.exec(R))!==null;)d.push(parseFloat(y[1]),parseFloat(y[2]),parseFloat(y[3])),v.push(g.x,g.y,g.z),V++,P++;k!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+p),V!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+p),p++}const S=E,w=P-E;u.addGroup(S,w,M),M++}return u.setAttribute("position",new vt(d,3)),u.setAttribute("normal",new vt(v,3)),u}function s(l){return typeof l!="string"?new TextDecoder().decode(l):l}function a(l){if(typeof l=="string"){const u=new Uint8Array(l.length);for(let f=0;f<l.length;f++)u[f]=l.charCodeAt(f)&255;return u.buffer||u}else return l}const c=a(e);return t(c)?r(c):o(s(e))}}const Xm={type:"change"},gu={type:"start"},$m={type:"end"};class vu extends Fr{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gr.ROTATE,MIDDLE:Gr.DOLLY,RIGHT:Gr.PAN},this.touches={ONE:Vr.ROTATE,TWO:Vr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",et),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",et),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Xm),i.update(),o=r.NONE},this.update=function(){const I=new O,re=new Ir().setFromUnitVectors(e.up,new O(0,1,0)),Y=re.clone().invert(),Se=new O,ne=new Ir,ae=2*Math.PI;return function(){const xe=i.object.position;I.copy(xe).sub(i.target),I.applyQuaternion(re),a.setFromVector3(I),i.autoRotate&&o===r.NONE&&S(P()),i.enableDamping?(a.theta+=c.theta*i.dampingFactor,a.phi+=c.phi*i.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let Pe=i.minAzimuthAngle,De=i.maxAzimuthAngle;return isFinite(Pe)&&isFinite(De)&&(Pe<-Math.PI?Pe+=ae:Pe>Math.PI&&(Pe-=ae),De<-Math.PI?De+=ae:De>Math.PI&&(De-=ae),Pe<=De?a.theta=Math.max(Pe,Math.min(De,a.theta)):a.theta=a.theta>(Pe+De)/2?Math.max(Pe,a.theta):Math.min(De,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=l,a.radius=Math.max(i.minDistance,Math.min(i.maxDistance,a.radius)),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),I.setFromSpherical(a),I.applyQuaternion(Y),xe.copy(i.target).add(I),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),u.set(0,0,0)),l=1,f||Se.distanceToSquared(i.object.position)>s||8*(1-ne.dot(i.object.quaternion))>s?(i.dispatchEvent(Xm),Se.copy(i.object.position),ne.copy(i.object.quaternion),f=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",b),i.domElement.removeEventListener("pointerdown",Fe),i.domElement.removeEventListener("pointercancel",ct),i.domElement.removeEventListener("wheel",We),i.domElement.removeEventListener("pointermove",lt),i.domElement.removeEventListener("pointerup",ct),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",et),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=r.NONE;const s=1e-6,a=new Hm,c=new Hm;let l=1;const u=new O;let f=!1;const h=new Ve,p=new Ve,_=new Ve,x=new Ve,m=new Ve,d=new Ve,v=new Ve,g=new Ve,y=new Ve,M=[],E={};function P(){return 2*Math.PI/60/60*i.autoRotateSpeed}function T(){return Math.pow(.95,i.zoomSpeed)}function S(I){c.theta-=I}function w(I){c.phi-=I}const V=function(){const I=new O;return function(Y,Se){I.setFromMatrixColumn(Se,0),I.multiplyScalar(-Y),u.add(I)}}(),k=function(){const I=new O;return function(Y,Se){i.screenSpacePanning===!0?I.setFromMatrixColumn(Se,1):(I.setFromMatrixColumn(Se,0),I.crossVectors(i.object.up,I)),I.multiplyScalar(Y),u.add(I)}}(),R=function(){const I=new O;return function(Y,Se){const ne=i.domElement;if(i.object.isPerspectiveCamera){const ae=i.object.position;I.copy(ae).sub(i.target);let oe=I.length();oe*=Math.tan(i.object.fov/2*Math.PI/180),V(2*Y*oe/ne.clientHeight,i.object.matrix),k(2*Se*oe/ne.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(V(Y*(i.object.right-i.object.left)/i.object.zoom/ne.clientWidth,i.object.matrix),k(Se*(i.object.top-i.object.bottom)/i.object.zoom/ne.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function D(I){i.object.isPerspectiveCamera?l/=I:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*I)),i.object.updateProjectionMatrix(),f=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function F(I){i.object.isPerspectiveCamera?l*=I:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/I)),i.object.updateProjectionMatrix(),f=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function $(I){h.set(I.clientX,I.clientY)}function K(I){v.set(I.clientX,I.clientY)}function U(I){x.set(I.clientX,I.clientY)}function H(I){p.set(I.clientX,I.clientY),_.subVectors(p,h).multiplyScalar(i.rotateSpeed);const re=i.domElement;S(2*Math.PI*_.x/re.clientHeight),w(2*Math.PI*_.y/re.clientHeight),h.copy(p),i.update()}function G(I){g.set(I.clientX,I.clientY),y.subVectors(g,v),y.y>0?D(T()):y.y<0&&F(T()),v.copy(g),i.update()}function de(I){m.set(I.clientX,I.clientY),d.subVectors(m,x).multiplyScalar(i.panSpeed),R(d.x,d.y),x.copy(m),i.update()}function ie(I){I.deltaY<0?F(T()):I.deltaY>0&&D(T()),i.update()}function q(I){let re=!1;switch(I.code){case i.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?w(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(0,i.keyPanSpeed),re=!0;break;case i.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?w(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(0,-i.keyPanSpeed),re=!0;break;case i.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?S(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(i.keyPanSpeed,0),re=!0;break;case i.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?S(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(-i.keyPanSpeed,0),re=!0;break}re&&(I.preventDefault(),i.update())}function Q(){if(M.length===1)h.set(M[0].pageX,M[0].pageY);else{const I=.5*(M[0].pageX+M[1].pageX),re=.5*(M[0].pageY+M[1].pageY);h.set(I,re)}}function he(){if(M.length===1)x.set(M[0].pageX,M[0].pageY);else{const I=.5*(M[0].pageX+M[1].pageX),re=.5*(M[0].pageY+M[1].pageY);x.set(I,re)}}function pe(){const I=M[0].pageX-M[1].pageX,re=M[0].pageY-M[1].pageY,Y=Math.sqrt(I*I+re*re);v.set(0,Y)}function j(){i.enableZoom&&pe(),i.enablePan&&he()}function Re(){i.enableZoom&&pe(),i.enableRotate&&Q()}function Te(I){if(M.length==1)p.set(I.pageX,I.pageY);else{const Y=ye(I),Se=.5*(I.pageX+Y.x),ne=.5*(I.pageY+Y.y);p.set(Se,ne)}_.subVectors(p,h).multiplyScalar(i.rotateSpeed);const re=i.domElement;S(2*Math.PI*_.x/re.clientHeight),w(2*Math.PI*_.y/re.clientHeight),h.copy(p)}function me(I){if(M.length===1)m.set(I.pageX,I.pageY);else{const re=ye(I),Y=.5*(I.pageX+re.x),Se=.5*(I.pageY+re.y);m.set(Y,Se)}d.subVectors(m,x).multiplyScalar(i.panSpeed),R(d.x,d.y),x.copy(m)}function Le(I){const re=ye(I),Y=I.pageX-re.x,Se=I.pageY-re.y,ne=Math.sqrt(Y*Y+Se*Se);g.set(0,ne),y.set(0,Math.pow(g.y/v.y,i.zoomSpeed)),D(y.y),v.copy(g)}function Be(I){i.enableZoom&&Le(I),i.enablePan&&me(I)}function Ae(I){i.enableZoom&&Le(I),i.enableRotate&&Te(I)}function Fe(I){i.enabled!==!1&&(M.length===0&&(i.domElement.setPointerCapture(I.pointerId),i.domElement.addEventListener("pointermove",lt),i.domElement.addEventListener("pointerup",ct)),J(I),I.pointerType==="touch"?Tt(I):mt(I))}function lt(I){i.enabled!==!1&&(I.pointerType==="touch"?L(I):dt(I))}function ct(I){le(I),M.length===0&&(i.domElement.releasePointerCapture(I.pointerId),i.domElement.removeEventListener("pointermove",lt),i.domElement.removeEventListener("pointerup",ct)),i.dispatchEvent($m),o=r.NONE}function mt(I){let re;switch(I.button){case 0:re=i.mouseButtons.LEFT;break;case 1:re=i.mouseButtons.MIDDLE;break;case 2:re=i.mouseButtons.RIGHT;break;default:re=-1}switch(re){case Gr.DOLLY:if(i.enableZoom===!1)return;K(I),o=r.DOLLY;break;case Gr.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enablePan===!1)return;U(I),o=r.PAN}else{if(i.enableRotate===!1)return;$(I),o=r.ROTATE}break;case Gr.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enableRotate===!1)return;$(I),o=r.ROTATE}else{if(i.enablePan===!1)return;U(I),o=r.PAN}break;default:o=r.NONE}o!==r.NONE&&i.dispatchEvent(gu)}function dt(I){switch(o){case r.ROTATE:if(i.enableRotate===!1)return;H(I);break;case r.DOLLY:if(i.enableZoom===!1)return;G(I);break;case r.PAN:if(i.enablePan===!1)return;de(I);break}}function We(I){i.enabled===!1||i.enableZoom===!1||o!==r.NONE||(I.preventDefault(),i.dispatchEvent(gu),ie(I),i.dispatchEvent($m))}function et(I){i.enabled===!1||i.enablePan===!1||q(I)}function Tt(I){switch(ce(I),M.length){case 1:switch(i.touches.ONE){case Vr.ROTATE:if(i.enableRotate===!1)return;Q(),o=r.TOUCH_ROTATE;break;case Vr.PAN:if(i.enablePan===!1)return;he(),o=r.TOUCH_PAN;break;default:o=r.NONE}break;case 2:switch(i.touches.TWO){case Vr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;j(),o=r.TOUCH_DOLLY_PAN;break;case Vr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Re(),o=r.TOUCH_DOLLY_ROTATE;break;default:o=r.NONE}break;default:o=r.NONE}o!==r.NONE&&i.dispatchEvent(gu)}function L(I){switch(ce(I),o){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Te(I),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;me(I),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Be(I),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ae(I),i.update();break;default:o=r.NONE}}function b(I){i.enabled!==!1&&I.preventDefault()}function J(I){M.push(I)}function le(I){delete E[I.pointerId];for(let re=0;re<M.length;re++)if(M[re].pointerId==I.pointerId){M.splice(re,1);return}}function ce(I){let re=E[I.pointerId];re===void 0&&(re=new Ve,E[I.pointerId]=re),re.set(I.pageX,I.pageY)}function ye(I){const re=I.pointerId===M[0].pointerId?M[1]:M[0];return E[re.pointerId]}i.domElement.addEventListener("contextmenu",b),i.domElement.addEventListener("pointerdown",Fe),i.domElement.addEventListener("pointercancel",ct),i.domElement.addEventListener("wheel",We,{passive:!1}),this.update()}}function yT(n,e=16,t=16,i=1){console.time("voxelization");const r=Array(e).fill().map(()=>Array(e).fill().map(()=>Array(t).fill(0))),o=Array(e).fill().map(()=>Array(e).fill().map(()=>Array(t).fill(0))),s=new ri().setFromObject(n),a=new O;s.getSize(a);const c=Math.max(a.x,a.z)/e,l=e/2,u=new vT,f=[new O(0,-1,0),new O(0,1,0),new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1)],h=n.clone();for(let x=0;x<e;x++)for(let m=0;m<e;m++){const d=(x-l+.5)*c,v=(m-l+.5)*c,g=new O(d,s.max.y+1,v);u.set(g,f[0]);const y=u.intersectObject(h,!0);if(y.length>0){y.sort((M,E)=>M.distance-E.distance);for(let M=0;M<y.length;M++){const P=y[M].point.y,T=Math.floor((P-s.min.y)/c);if(T>=0&&T<t){r[x][m][T]=1;for(let S=0;S<T;S++)u.ray.direction.y<0&&(r[x][m][S]=1)}}}}for(let x=1;x<e-1;x++)for(let m=1;m<e-1;m++)for(let d=1;d<t-1;d++)if(r[x][m][d]===0){let v=0;r[x+1][m][d]===1&&v++,r[x-1][m][d]===1&&v++,r[x][m+1][d]===1&&v++,r[x][m-1][d]===1&&v++,r[x][m][d+1]===1&&v++,r[x][m][d-1]===1&&v++,v>=5&&(r[x][m][d]=1)}let p=0,_=0;for(let x=0;x<e;x++)for(let m=0;m<e;m++){let d=!1;for(let v=t-1;v>=0;v--)r[x][m][v]===1?(p++,v>0&&r[x][m][v-1]===0?d=!0:d=!1):d&&(o[x][m][v]=1,_++)}return console.timeEnd("voxelization"),{voxels:r,supportVoxels:o,stats:{modelVoxels:p,supportVoxels:_,totalVoxels:p+_,dimensions:{width:e,depth:e,height:t}}}}const ST=(n,e,t,i,r)=>{var c,l;let o="";const s=((c=t[i])==null?void 0:c.dispenser)||1,a=((l=t[r])==null?void 0:l.dispenser)||7;for(let u=0;u<n.length;u++)for(let f=0;f<n[u].length;f++)for(let h=0;h<n[u][f].length;h++)n[u][f][h]&&(o+=`${u+1} ${f+1} ${h+1} ${s}
`);for(let u=0;u<e.length;u++)for(let f=0;f<e[u].length;f++)for(let h=0;h<e[u][f].length;h++)e[u][f][h]&&!n[u][f][h]&&(o+=`${u+1} ${f+1} ${h+1} ${a}
`);return o},MT=()=>{const{modelFile:n,setModelFile:e,colorConfig:t,modelColor:i,setModelColor:r,supportColor:o,setSupportColor:s,saveProject:a}=rr(),[c,l]=z.useState(!1),[u,f]=z.useState(0),[h,p]=z.useState(""),[_,x]=z.useState(null),[m,d]=z.useState(""),[v,g]=z.useState({totalBricks:0,modelBricks:0,supportBricks:0}),[y,M]=z.useState(!1),[E,P]=z.useState(null),[T,S]=z.useState(1),[w,V]=z.useState(!1),[k,R]=z.useState(null),[D,F]=z.useState(0),[$,K]=z.useState(!1),U=z.useRef(null),H=z.useRef(null),G=z.useRef(null),de=z.useRef(null),ie=z.useRef(null),q=z.useRef(null),Q=z.useRef(null),he=z.useRef(null),pe=z.useRef(null),j=z.useRef(null),Re=z.useRef(null),Te=z.useRef(null),me=z.useRef(null),Le=z.useRef(null),Be=z.useRef(null),Ae=z.useRef(null),[Fe,lt]=z.useState({x:15,y:15,z:15}),[ct,mt]=z.useState({x:0,y:0,z:0}),[dt,We]=z.useState(!1);z.useEffect(()=>{if(!U.current||!q.current||!Re.current)return;const ne=U.current.parentElement.clientWidth,ae=U.current.clientHeight,oe=new fu,xe=new fu,Pe=new fu;oe.background=new Ye(15790320),xe.background=new Ye(15790320),Pe.background=new Ye(15790320);const De=Math.floor(ne/3),je=Math.floor(ne/3),N=Math.floor(ne/3),Z=De/ae,se=je/ae,ge=N/ae,Me=new on(75,Z,.1,1e3);Me.position.set(12,10,12),Me.lookAt(0,2,0);const Oe=new on(75,se,.1,1e3);Oe.position.set(12,10,12),Oe.lookAt(0,2,0);const Ie=new on(75,ge,.1,1e3);Ie.position.set(12,10,12),Ie.lookAt(0,2,0);const Ke=new ll({antialias:!0});Ke.setSize(De,ae),Ke.setPixelRatio(window.devicePixelRatio);const Je=new ll({antialias:!0});Je.setSize(je,ae),Je.setPixelRatio(window.devicePixelRatio);const Ue=new ll({antialias:!0});for(Ue.setSize(N,ae),Ue.setPixelRatio(window.devicePixelRatio);U.current.firstChild;)U.current.removeChild(U.current.firstChild);for(;q.current.firstChild;)q.current.removeChild(q.current.firstChild);for(;Re.current.firstChild;)Re.current.removeChild(Re.current.firstChild);U.current.appendChild(Ke.domElement),q.current.appendChild(Je.domElement),Re.current.appendChild(Ue.domElement);const Ne=new vu(Me,Ke.domElement);Ne.enableDamping=!0,Ne.dampingFactor=.25;const ke=new vu(Oe,Je.domElement);ke.enableDamping=!0,ke.dampingFactor=.25;const nt=new vu(Ie,Ue.domElement);nt.enableDamping=!0,nt.dampingFactor=.25;let En=!1;const tn=(te,we,fe)=>{En||(En=!0,we.position.copy(te.position),we.rotation.copy(te.rotation),fe.target.copy(Ne.target),fe.update(),En=!1)};Ne.addEventListener("change",()=>{En||(tn(Me,Oe,ke),tn(Me,Ie,nt))}),ke.addEventListener("change",()=>{En||(tn(Oe,Me,Ne),tn(Oe,Ie,nt))}),nt.addEventListener("change",()=>{En||(tn(Ie,Me,Ne),tn(Ie,Oe,ke))});const bi=new gT(16777215,.6);oe.add(bi.clone()),xe.add(bi.clone()),Pe.add(bi.clone());const oi=new mT(16777215,.8);oi.position.set(5,10,7.5),oe.add(oi.clone()),xe.add(oi.clone()),Pe.add(oi.clone());const A=new Wm(16,16,8947848,13421772);oe.add(A.clone()),xe.add(A.clone()),Pe.add(A.clone());const W=new jm(8);oe.add(W.clone()),xe.add(W.clone()),Pe.add(W.clone());const ee=()=>{requestAnimationFrame(ee),Ne.update(),ke.update(),nt.update(),Ke.render(oe,Me),Je.render(xe,Oe),Ue.render(Pe,Ie)};ee();const B=()=>{if(!U.current)return;const te=U.current.parentElement.clientWidth,we=U.current.clientHeight,fe=Math.floor(te/3),ve=Math.floor(te/3),Ee=Math.floor(te/3);Me.aspect=fe/we,Me.updateProjectionMatrix(),Oe.aspect=ve/we,Oe.updateProjectionMatrix(),Ie.aspect=Ee/we,Ie.updateProjectionMatrix(),Ke.setSize(fe,we),Je.setSize(ve,we),Ue.setSize(Ee,we)};return window.addEventListener("resize",B),H.current=oe,G.current=Me,de.current=Ke,ie.current=Ne,Q.current=xe,he.current=Oe,pe.current=Je,j.current=ke,Te.current=Pe,me.current=Ie,Le.current=Ue,Be.current=nt,lt({x:Me.position.x.toFixed(2),y:Me.position.y.toFixed(2),z:Me.position.z.toFixed(2)}),mt({x:Ne.target.x.toFixed(2),y:Ne.target.y.toFixed(2),z:Ne.target.z.toFixed(2)}),()=>{window.removeEventListener("resize",B),Ke.dispose(),Je.dispose(),Ue.dispose(),Ne.removeEventListener("change",tn),ke.removeEventListener("change",tn),nt.removeEventListener("change",tn),H.current=null,G.current=null,de.current=null,ie.current=null,Q.current=null,he.current=null,pe.current=null,j.current=null,Te.current=null,me.current=null,Le.current=null,Be.current=null}},[]),z.useEffect(()=>{(async()=>{try{const oe=await fetch("/gengar.stl");oe.ok?(V(!0),console.log("Default model available")):console.error("Default model not available:",oe.statusText)}catch(ae){console.error("Error checking default model:",ae)}})()},[]),z.useEffect(()=>{const ne=new Date,ae=`${ne.getHours().toString().padStart(2,"0")}-${ne.getMinutes().toString().padStart(2,"0")}-${ne.getDate().toString().padStart(2,"0")}-${(ne.getMonth()+1).toString().padStart(2,"0")}`;d(ae)},[]);const et=ne=>{const ae=ne.target.files[0];if(!ae)return;x(null);const oe=new FileReader;oe.onload=xe=>{e(xe.target.result),b(xe.target.result)},oe.onerror=()=>{x("Error reading file")},oe.readAsArrayBuffer(ae)},Tt=async()=>{try{l(!0),f(10),p("Loading default model...");const ae=await fetch("/gengar.stl");if(!ae.ok)throw new Error(`Failed to load default model: ${ae.statusText}`);f(30),p("Processing STL data...");const oe=await ae.arrayBuffer();e(oe),b(oe)}catch(ne){console.error("Error loading default model:",ne),x(`Error loading default model: ${ne.message}`),l(!1)}},L=(ne,ae)=>{const oe=new ri().setFromObject(ne),xe=new xT(oe,16711680);xe.name="debugBoxHelper";const Pe=new nc(20,20),De=new Ii({color:65535,transparent:!0,opacity:.2,side:ti}),je=new xn(Pe,De);je.position.set(0,0,0),je.rotation.x=Math.PI/2,je.name="debugGroundMarker";const N=new O;oe.getCenter(N);const Z=new Ff(.2),se=new Ii({color:16711935}),ge=new xn(Z,se);ge.position.copy(N),ge.name="debugCenterMarker",ae.add(xe),ae.add(je),ae.add(ge),console.log("Debug - Model Bounding Box:",{min:oe.min,max:oe.max,center:N,size:new O().subVectors(oe.max,oe.min)})},b=ne=>{l(!0),f(0);try{const ae=[{progress:0,message:"Starting STL processing..."},{progress:10,message:"Clearing previous models..."},{progress:20,message:"Loading STL data..."},{progress:40,message:"Voxelizing model..."},{progress:70,message:"Creating visualizations..."},{progress:90,message:"Finalizing..."},{progress:100,message:"Complete!"}],oe=Ne=>{const ke=ae[Ne];f(ke.progress),p(ke.message)};oe(0),(()=>{[H,Q,Te].forEach(Ne=>{if(!Ne.current)return;const ke=[];Ne.current.traverse(nt=>{!(nt instanceof Bf)&&nt!==Ne.current&&ke.push(nt)}),ke.forEach(nt=>{Ne.current.remove(nt)})})})(),oe(1),(()=>{const Ne=new Wm(16,16,8947848,13421772);Ne.position.set(0,0,0);const ke=new jm(8);H.current&&(H.current.add(Ne.clone()),H.current.add(ke.clone())),Q.current&&(Q.current.add(Ne.clone()),Q.current.add(ke.clone())),Te.current&&(Te.current.add(Ne.clone()),Te.current.add(ke.clone()))})();const je=new _T().parse(ne);oe(2);const N=new pu({color:2003199,metalness:.1,roughness:.5}),Z=new xn(je,N);je.computeBoundingBox();const se=je.boundingBox.clone(),ge=new O;se.getSize(ge),Z.position.set(0,0,0),Z.scale.set(1,1,1);const Ie=12/Math.max(ge.x,ge.y,ge.z)*T;Z.scale.set(Ie,Ie,Ie);const Ke=new ri().setFromObject(Z),Je=new O;Ke.getCenter(Je),Z.position.set(-Je.x,-Ke.min.y,-Je.z);const Ue=new Mr;Ue.name="modelGroup",Ue.add(Z),H.current.add(Ue),L(Ue,H.current),setTimeout(()=>{oe(3);const Ne=Z.clone(),ke=yT(Ne,16,16,Ie);P(ke),g(ke.stats),setTimeout(()=>{oe(4),J(ke.voxels,ke.supportVoxels),Y(),oe(5),setTimeout(()=>{oe(6),l(!1)},500)},100)},100)}catch(ae){console.error("Error processing STL file:",ae),x("Error processing STL file: "+ae.message),l(!1),(ae.message.includes("out of memory")||ae.message.includes("allocation failed")||ne.byteLength>1e7)&&We(!0)}},J=(ne,ae)=>{const oe=fe=>{const ve=fe.getObjectByName("voxelGroup");ve&&fe.remove(ve)};Q.current&&oe(Q.current),Te.current&&oe(Te.current);const xe=new Ii({color:2003199,wireframe:!0,transparent:!0,opacity:.5}),Pe=new Ii({color:2003199,transparent:!0,opacity:.3}),De=new Ii({color:65280,wireframe:!0,transparent:!0,opacity:.5}),je=new Ii({color:65280,transparent:!0,opacity:.3}),N=ne.reduce((fe,ve)=>fe+ve.reduce((Ee,Ce)=>Ee+Ce.filter(ze=>ze===1).length,0),0),Z=ae.reduce((fe,ve)=>fe+ve.reduce((Ee,Ce)=>Ee+Ce.filter(ze=>ze===1).length,0),0),se=new Mr;se.name="voxelGroup";const ge=new Ur(1,1,1),Me=new Ri(ge,Pe,N),Oe=new Ri(ge,xe,N),Ie=new Ri(ge,je,Z),Ke=new Ri(ge,De,Z),Je=8,Ue=new rt;let Ne=0,ke=0;for(let fe=0;fe<ne.length;fe++)if(!($&&k!==fe)){for(let ve=0;ve<ne[fe].length;ve++)for(let Ee=0;Ee<ne[fe][ve].length;Ee++)if(ne[fe][ve][Ee]===1){const Ce=new O(Ee-Je+.5,fe+.5,ve-Je+.5);Ue.makeTranslation(Ce.x,Ce.y,Ce.z),Me.setMatrixAt(Ne,Ue),Oe.setMatrixAt(Ne,Ue),Ne++}}for(let fe=0;fe<ae.length;fe++)if(!($&&k!==fe)){for(let ve=0;ve<ae[fe].length;ve++)for(let Ee=0;Ee<ae[fe][ve].length;Ee++)if(ae[fe][ve][Ee]===1){const Ce=new O(Ee-Je+.5,fe+.5,ve-Je+.5);Ue.makeTranslation(Ce.x,Ce.y,Ce.z),Ie.setMatrixAt(ke,Ue),Ke.setMatrixAt(ke,Ue),ke++}}se.add(Me),se.add(Oe),se.add(Ie),se.add(Ke),Q.current.add(se),L(se,Q.current);const nt=new Mr;nt.name="voxelGroup";const En=new Ur(1,.5,1),tn=new zf(.2,.2,.1,16),bi=new pu({color:16711680,metalness:.1,roughness:.3}),oi=new pu({color:16776960,metalness:.1,roughness:.3}),A=new Ri(En,bi,N),W=new Ri(tn,bi,N),ee=new Ri(En,oi,Z),B=new Ri(tn,oi,Z),te=new rt,we=new rt;Ne=0,ke=0;for(let fe=0;fe<ne.length;fe++)if(!($&&k!==fe)){for(let ve=0;ve<ne[fe].length;ve++)for(let Ee=0;Ee<ne[fe][ve].length;Ee++)if(ne[fe][ve][Ee]===1){const Ce=new O(Ee-Je+.5,fe+.25,ve-Je+.5);te.makeTranslation(Ce.x,Ce.y,Ce.z),A.setMatrixAt(Ne,te),we.identity(),we.makeRotationX(Math.PI/2),we.setPosition(Ce.x,Ce.y+.25+.05,Ce.z),W.setMatrixAt(Ne,we),Ne++}}for(let fe=0;fe<ae.length;fe++)if(!($&&k!==fe)){for(let ve=0;ve<ae[fe].length;ve++)for(let Ee=0;Ee<ae[fe][ve].length;Ee++)if(ae[fe][ve][Ee]===1){const Ce=new O(Ee-Je+.5,fe+.25,ve-Je+.5);te.makeTranslation(Ce.x,Ce.y,Ce.z),ee.setMatrixAt(ke,te),we.identity(),we.makeRotationX(Math.PI/2),we.setPosition(Ce.x,Ce.y+.25+.05,Ce.z),B.setMatrixAt(ke,we),ke++}}nt.add(A),nt.add(W),nt.add(ee),nt.add(B),Te.current.add(nt)},le=()=>{const ne=!$;K(ne),ne&&R(D),E&&J(E.voxels,E.supportVoxels)},ce=ne=>{const ae=parseInt(ne.target.value,10);R(ae),E&&J(E.voxels,E.supportVoxels)},ye=()=>{if(k<D){const ne=k+1;R(ne),E&&J(E.voxels,E.supportVoxels)}},I=()=>{if(k>0){const ne=k-1;R(ne),E&&J(E.voxels,E.supportVoxels)}},re=()=>{n&&b(n)},Y=()=>{ie.current&&(G.current.position.set(10,8,10),ie.current.target.set(0,4,0),ie.current.update()),j.current&&(he.current.position.copy(G.current.position),j.current.target.copy(ie.current.target),j.current.update()),Be.current&&(me.current.position.copy(G.current.position),Be.current.target.copy(ie.current.target),Be.current.update())},Se=z.useCallback(()=>{if(!E){x("No model data to export. Please load an STL file first."),setTimeout(()=>x(null),5e3);return}if(!m.trim()){x("Please enter a file name."),setTimeout(()=>x(null),5e3);return}const ne=m.trim().replace(/[\\/:*?"<>|]/g,"_"),ae=ne.endsWith(".txt")?ne.slice(0,-4):ne;l(!0),p("Generating TXT file..."),f(30);try{const oe=ST(E.voxels,E.supportVoxels,t,i,o);f(60),p("Creating thumbnail...");const xe=new Blob([oe],{type:"text/plain"}),Pe=URL.createObjectURL(xe);if(de.current){H.current&&G.current&&de.current.render(H.current,G.current);const De=de.current.domElement.toDataURL("image/png");if(f(80),p("Saving project..."),a(ae,"3d",De)){f(90),p("Finalizing export...");const N=document.createElement("a");N.href=Pe,N.download=`${ae}.txt`,document.body.appendChild(N),N.click(),document.body.removeChild(N),URL.revokeObjectURL(Pe),f(100),p("Export complete!"),M(!0),setTimeout(()=>M(!1),5e3)}else throw new Error("Failed to save project.")}else throw new Error("Could not create thumbnail: renderer not available.")}catch(oe){console.error("Error exporting TXT:",oe),x("Error exporting TXT: "+oe.message),setTimeout(()=>x(null),7e3)}finally{setTimeout(()=>{l(!1),p("")},1e3)}},[E,m,t,i,o,a,de,H,G]);return z.useEffect(()=>{E&&J(E.voxels,E.supportVoxels)},[i,o,E]),X("div",{className:"container mx-auto px-4 py-8",children:[C("h1",{className:"text-3xl font-bold text-center mb-4",children:"LEGO 3D Model Creator"}),X("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-6",children:[X("div",{className:"lg:col-span-1",children:[X("div",{className:"bg-white rounded-lg shadow-md p-4 mb-4",children:[C("h2",{className:"text-xl font-bold mb-4",children:"Model Options"}),X("div",{className:"mb-4",children:[C("button",{className:"w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700",onClick:()=>Ae.current.click(),children:"Upload STL File"}),C("input",{ref:Ae,type:"file",className:"hidden",accept:".stl",onChange:et}),C("p",{className:"text-sm text-gray-500 mt-1",children:"Select an .stl file to convert to LEGO bricks"})]}),w&&C("div",{className:"mb-4",children:C("button",{className:"w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700",onClick:Tt,children:"Use Default Model (Gengar)"})}),X("div",{className:"mb-4",children:[X("label",{className:"block text-sm text-gray-600 mb-1",children:["Scale: ",T.toFixed(1),"x"]}),X("div",{className:"flex items-center",children:[C("input",{type:"range",min:"0.1",max:"3.0",step:"0.1",value:T,onChange:ne=>S(parseFloat(ne.target.value)),className:"flex-grow mr-2"}),C("button",{className:"px-3 py-1 bg-gray-200 rounded hover:bg-gray-300",onClick:re,children:"Apply"})]})]}),E&&X("div",{className:"mb-4 border-t pt-4",children:[X("div",{className:"flex items-center justify-between mb-2",children:[C("label",{className:"text-sm font-medium text-gray-800",children:"Layer View:"}),C("button",{className:`px-3 py-1 rounded ${$?"bg-blue-600 text-white":"bg-gray-200 text-gray-800"}`,onClick:le,children:$?"Enabled":"Disabled"})]}),$&&X(As,{children:[X("div",{className:"flex items-center justify-between mb-2",children:[C("button",{className:"px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300",onClick:()=>I(),disabled:k===0,children:"-"}),X("span",{className:"font-medium text-gray-800",children:["Layer ",k+1," of ",D+1]}),C("button",{className:"px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300",onClick:()=>ye(),disabled:k===D,children:"+"})]}),C("input",{type:"range",min:"0",max:D,step:"1",value:k,onChange:ce,className:"w-full"})]})]}),C("div",{className:"mb-4",children:C("button",{className:"w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300",onClick:Y,children:"Reset View"})}),X("div",{className:"mb-4",children:[C("label",{className:"block text-sm font-medium text-gray-800 mb-1",children:"Model Brick Color"}),C("select",{value:i,onChange:ne=>r(ne.target.value),className:"w-full p-2 border rounded text-gray-800 bg-white",children:Object.entries(t).map(([ne,ae])=>C("option",{value:ne,children:ne.replace("_"," ").replace(/\b\w/g,oe=>oe.toUpperCase())},ne))})]}),X("div",{className:"mb-4",children:[C("label",{className:"block text-sm font-medium text-gray-800 mb-1",children:"Support Brick Color"}),C("select",{value:o,onChange:ne=>s(ne.target.value),className:"w-full p-2 border rounded text-gray-800 bg-white",children:Object.entries(t).map(([ne,ae])=>C("option",{value:ne,children:ne.replace("_"," ").replace(/\b\w/g,oe=>oe.toUpperCase())},ne))})]})]}),X("div",{className:"bg-white rounded-lg shadow-md p-4",children:[C("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"Export"}),X("div",{className:"mb-4",children:[C("label",{className:"block text-sm font-medium text-gray-800 mb-1",children:"File Name"}),C("input",{type:"text",value:m,onChange:ne=>d(ne.target.value),className:"w-full rounded border p-2 text-gray-800"})]}),C("button",{className:"w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 mb-4",onClick:Se,disabled:!E,children:"Export for LEGO Printer (.txt)"}),X("div",{className:"bg-gray-50 p-3 rounded-lg",children:[C("h3",{className:"font-semibold text-gray-800 mb-2",children:"Brick Statistics"}),X("div",{className:"text-sm",children:[X("div",{className:"flex justify-between",children:[C("span",{className:"text-gray-800",children:"Total Bricks:"}),C("span",{className:"font-medium text-gray-800",children:v.totalBricks})]}),X("div",{className:"flex justify-between",children:[C("span",{className:"text-gray-800",children:"Model Bricks:"}),C("span",{className:"font-medium text-gray-800",children:v.modelBricks})]}),X("div",{className:"flex justify-between",children:[C("span",{className:"text-gray-800",children:"Support Bricks:"}),C("span",{className:"font-medium text-gray-800",children:v.supportBricks})]})]})]}),y&&C("div",{className:"mt-4 p-3 bg-green-100 text-green-700 rounded-lg",children:"Export successful!"}),_&&C("div",{className:"mt-4 p-3 bg-red-100 text-red-700 rounded-lg",children:_})]})]}),X("div",{className:"lg:col-span-3",children:[X("div",{className:"grid grid-cols-3 gap-4 mb-2",children:[C("div",{className:"text-center viewport-label",children:"Original STL Model"}),C("div",{className:"text-center viewport-label",children:"Voxelized Grid"}),C("div",{className:"text-center viewport-label",children:"LEGO Brick Render"})]}),X("div",{className:"grid grid-cols-3 gap-4",children:[C("div",{className:"bg-white rounded-lg shadow-md p-2 h-[500px] relative",ref:U,children:c&&C("div",{className:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10",children:C("div",{className:"animate-pulse text-high-contrast",children:"Processing..."})})}),C("div",{className:"bg-white rounded-lg shadow-md p-2 h-[500px] relative",ref:q,children:c&&C("div",{className:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10",children:C("div",{className:"animate-pulse text-high-contrast",children:"Processing..."})})}),C("div",{className:"bg-white rounded-lg shadow-md p-2 h-[500px] relative",ref:Re,children:c&&C("div",{className:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10",children:C("div",{className:"animate-pulse text-high-contrast",children:"Processing..."})})})]}),c&&C("div",{className:"fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50",children:X("div",{className:"bg-white rounded-lg shadow-lg p-6 max-w-md w-full",children:[C("h3",{className:"text-xl font-bold text-gray-800 mb-4 text-center",children:"Processing Model"}),C("div",{className:"w-full bg-gray-200 rounded-full h-6 mb-3",children:C("div",{className:"bg-blue-600 h-6 rounded-full transition-all duration-300",style:{width:`${u}%`}})}),X("p",{className:"text-center text-gray-800 font-medium mb-2",children:[u,"% Complete"]}),C("p",{className:"text-center text-gray-700",children:h})]})})]})]}),dt&&C("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:X("div",{className:"bg-white rounded-lg p-6 max-w-2xl w-full",children:[X("div",{className:"flex justify-between items-center mb-4",children:[C("h2",{className:"text-xl font-bold text-gray-800",children:"Performance Tips"}),C("button",{onClick:()=>We(!1),className:"text-gray-500 hover:text-gray-700",children:"×"})]}),X("div",{className:"prose prose-lg",children:[C("p",{className:"text-yellow-600 font-medium",children:"Your STL file appears to be quite large. Here are some tips to improve performance:"}),X("ul",{className:"list-disc pl-5 space-y-2",children:[C("li",{children:"Try reducing the polygon count of your STL file before uploading"}),C("li",{children:"Use the scale slider to create a smaller model"}),C("li",{children:"Modern browsers work best (Chrome, Firefox, Edge)"}),C("li",{children:"Close other tabs and applications to free up memory"}),C("li",{children:"If your device has a dedicated GPU, make sure your browser is using it"})]}),C("p",{className:"mt-4",children:"If you continue to experience issues, you might need to use a computer with more RAM and a better GPU."})]}),C("div",{className:"flex justify-end mt-6",children:C("button",{onClick:()=>We(!1),className:"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",children:"Got it"})})]})}),y&&C("div",{className:"fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded shadow-md z-50",children:C("span",{className:"font-medium",children:"Export successful!"})}),_&&C("div",{className:"fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded shadow-md z-50",children:C("span",{className:"font-medium",children:_})})]})};function wT(){return C(SS,{children:C(bS,{children:X("div",{className:"min-h-screen flex flex-col",children:[C(AS,{}),C("main",{className:"flex-grow",children:X(pS,{children:[C(hi,{path:"/",element:C(PS,{})}),C(hi,{path:"/dashboard",element:C(LS,{})}),C(hi,{path:"/mosaic",element:C(IS,{})}),C(hi,{path:"/crop",element:C(oM,{})}),C(hi,{path:"/mosaic-generator",element:C(sM,{})}),C(hi,{path:"/preview",element:C(aM,{})}),C(hi,{path:"/3d",element:C(MT,{})}),C(hi,{path:"*",element:C(fS,{to:"/",replace:!0})})]})})]})})})}xu.createRoot(document.getElementById("root")).render(C(Zn.StrictMode,{children:C(wT,{})}));
