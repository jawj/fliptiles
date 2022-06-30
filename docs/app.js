(()=>{"use strict";var e={18:(e,t,n)=>{var r=n(178);e.exports=function(e,t,n){var o=[],i=!1,a=-1;function l(){for(a=0;a<o.length;a+=2)try{e(o[a],r(o[a+1]),s)}catch(e){n.error(e)}a=-1}function s(){i||(i=!0,t((function(){i=!1,l()})))}return s.sync=l,{mount:function(t,n){if(null!=n&&null==n.view&&"function"!=typeof n)throw new TypeError("m.mount expects a component, not a vnode.");var i=o.indexOf(t);i>=0&&(o.splice(i,2),i<=a&&(a-=2),e(t,[])),null!=n&&(o.push(t,n),e(t,r(n),s))},redraw:s}}},223:(e,t,n)=>{var r=n(178),o=n(373),i=n(164),a=n(249),l=n(561),s=n(562),u=n(641),f=n(542),c={};function d(e){try{return decodeURIComponent(e)}catch(t){return e}}e.exports=function(e,t){var n,p,h,v,m,g,y=null==e?null:"function"==typeof e.setImmediate?e.setImmediate:e.setTimeout,w=i.resolve(),b=!1,x=!1,k=0,S=c,j={onbeforeupdate:function(){return!(!(k=k?2:1)||c===S)},onremove:function(){e.removeEventListener("popstate",C,!1),e.removeEventListener("hashchange",A,!1)},view:function(){if(k&&c!==S){var e=[r(h,v.key,v)];return S&&(e=S.render(e[0])),e}}},E=T.SKIP={};function A(){b=!1;var r=e.location.hash;"#"!==T.prefix[0]&&(r=e.location.search+r,"?"!==T.prefix[0]&&"/"!==(r=e.location.pathname+r)[0]&&(r="/"+r));var o=r.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,d).slice(T.prefix.length),i=l(o);function a(e){console.error(e),N(p,null,{replace:!0})}u(i.params,e.history.state),function e(r){for(;r<n.length;r++)if(n[r].check(i)){var l=n[r].component,s=n[r].route,u=l,f=g=function(n){if(f===g){if(n===E)return e(r+1);h=null==n||"function"!=typeof n.view&&"function"!=typeof n?"div":n,v=i.params,m=o,g=null,S=l.render?l:null,2===k?t.redraw():(k=2,t.redraw.sync())}};return void(l.view||"function"==typeof l?(l={},f(u)):l.onmatch?w.then((function(){return l.onmatch(i.params,o,s)})).then(f,o===p?null:a):f("div"))}if(o===p)throw new Error("Could not resolve default route "+p+".");N(p,null,{replace:!0})}(0)}function C(){b||(b=!0,y(A))}function N(t,n,r){if(t=a(t,n),x){C();var o=r?r.state:null,i=r?r.title:null;r&&r.replace?e.history.replaceState(o,i,T.prefix+t):e.history.pushState(o,i,T.prefix+t)}else e.location.href=T.prefix+t}function T(r,o,i){if(!r)throw new TypeError("DOM element being rendered to does not exist.");if(n=Object.keys(i).map((function(e){if("/"!==e[0])throw new SyntaxError("Routes must start with a '/'.");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.");return{route:e,component:i[e],check:s(e)}})),p=o,null!=o){var a=l(o);if(!n.some((function(e){return e.check(a)})))throw new ReferenceError("Default route doesn't match any known routes.")}"function"==typeof e.history.pushState?e.addEventListener("popstate",C,!1):"#"===T.prefix[0]&&e.addEventListener("hashchange",A,!1),x=!0,t.mount(r,j),A()}return T.set=function(e,t,n){null!=g&&((n=n||{}).replace=!0),g=null,N(e,t,n)},T.get=function(){return m},T.prefix="#!",T.Link={view:function(e){var t,n,r,i=o(e.attrs.selector||"a",f(e.attrs,["options","params","selector","onclick"]),e.children);return(i.attrs.disabled=Boolean(i.attrs.disabled))?(i.attrs.href=null,i.attrs["aria-disabled"]="true"):(t=e.attrs.options,n=e.attrs.onclick,r=a(i.attrs.href,e.attrs.params),i.attrs.href=T.prefix+r,i.attrs.onclick=function(e){var o;"function"==typeof n?o=n.call(e.currentTarget,e):null==n||"object"!=typeof n||"function"==typeof n.handleEvent&&n.handleEvent(e),!1===o||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,T.set(r,null,t))}),i}},T.param=function(e){return v&&null!=e?v[e]:v},T}},262:(e,t,n)=>{var r=n(373);r.trust=n(742),r.fragment=n(621),e.exports=r},865:(e,t,n)=>{var r=n(262),o=n(74),i=n(165),a=function(){return r.apply(this,arguments)};a.m=r,a.trust=r.trust,a.fragment=r.fragment,a.Fragment="[",a.mount=i.mount,a.route=n(843),a.render=n(358),a.redraw=i.redraw,a.request=o.request,a.jsonp=o.jsonp,a.parseQueryString=n(874),a.buildQueryString=n(478),a.parsePathname=n(561),a.buildPathname=n(249),a.vnode=n(178),a.PromisePolyfill=n(803),a.censor=n(542),e.exports=a},165:(e,t,n)=>{var r=n(358);e.exports=n(18)(r,"undefined"!=typeof requestAnimationFrame?requestAnimationFrame:null,"undefined"!=typeof console?console:null)},249:(e,t,n)=>{var r=n(478),o=n(641);e.exports=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.");if(null==t)return e;var n=e.indexOf("?"),i=e.indexOf("#"),a=i<0?e.length:i,l=n<0?a:n,s=e.slice(0,l),u={};o(u,t);var f=s.replace(/:([^\/\.-]+)(\.{3})?/g,(function(e,n,r){return delete u[n],null==t[n]?e:r?t[n]:encodeURIComponent(String(t[n]))})),c=f.indexOf("?"),d=f.indexOf("#"),p=d<0?f.length:d,h=c<0?p:c,v=f.slice(0,h);n>=0&&(v+=e.slice(n,a)),c>=0&&(v+=(n<0?"?":"&")+f.slice(c,p));var m=r(u);return m&&(v+=(n<0&&c<0?"?":"&")+m),i>=0&&(v+=e.slice(i)),d>=0&&(v+=(i<0?"":"&")+f.slice(d)),v}},562:(e,t,n)=>{var r=n(561);e.exports=function(e){var t=r(e),n=Object.keys(t.params),o=[],i=new RegExp("^"+t.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,(function(e,t,n){return null==t?"\\"+e:(o.push({k:t,r:"..."===n}),"..."===n?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||""))}))+"$");return function(e){for(var r=0;r<n.length;r++)if(t.params[n[r]]!==e.params[n[r]])return!1;if(!o.length)return i.test(e.path);var a=i.exec(e.path);if(null==a)return!1;for(r=0;r<o.length;r++)e.params[o[r].k]=o[r].r?a[r+1]:decodeURIComponent(a[r+1]);return!0}}},561:(e,t,n)=>{var r=n(874);e.exports=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),o=n<0?e.length:n,i=t<0?o:t,a=e.slice(0,i).replace(/\/{2,}/g,"/");return a?("/"!==a[0]&&(a="/"+a),a.length>1&&"/"===a[a.length-1]&&(a=a.slice(0,-1))):a="/",{path:a,params:t<0?{}:r(e.slice(t+1,o))}}},803:e=>{var t=function(e){if(!(this instanceof t))throw new Error("Promise must be called with 'new'.");if("function"!=typeof e)throw new TypeError("executor must be a function.");var n=this,r=[],o=[],i=u(r,!0),a=u(o,!1),l=n._instance={resolvers:r,rejectors:o},s="function"==typeof setImmediate?setImmediate:setTimeout;function u(e,t){return function i(u){var c;try{if(!t||null==u||"object"!=typeof u&&"function"!=typeof u||"function"!=typeof(c=u.then))s((function(){t||0!==e.length||console.error("Possible unhandled promise rejection:",u);for(var n=0;n<e.length;n++)e[n](u);r.length=0,o.length=0,l.state=t,l.retry=function(){i(u)}}));else{if(u===n)throw new TypeError("Promise can't be resolved with itself.");f(c.bind(u))}}catch(e){a(e)}}}function f(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(a);try{e(n(i),r)}catch(e){r(e)}}f(e)};t.prototype.then=function(e,n){var r,o,i=this._instance;function a(e,t,n,a){t.push((function(t){if("function"!=typeof e)n(t);else try{r(e(t))}catch(e){o&&o(e)}})),"function"==typeof i.retry&&a===i.state&&i.retry()}var l=new t((function(e,t){r=e,o=t}));return a(e,i.resolvers,r,!0),a(n,i.rejectors,o,!1),l},t.prototype.catch=function(e){return this.then(null,e)},t.prototype.finally=function(e){return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){return t.reject(n)}))}))},t.resolve=function(e){return e instanceof t?e:new t((function(t){t(e)}))},t.reject=function(e){return new t((function(t,n){n(e)}))},t.all=function(e){return new t((function(t,n){var r=e.length,o=0,i=[];if(0===e.length)t([]);else for(var a=0;a<e.length;a++)!function(a){function l(e){o++,i[a]=e,o===r&&t(i)}null==e[a]||"object"!=typeof e[a]&&"function"!=typeof e[a]||"function"!=typeof e[a].then?l(e[a]):e[a].then(l,n)}(a)}))},t.race=function(e){return new t((function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)}))},e.exports=t},164:(e,t,n)=>{var r=n(803);"undefined"!=typeof window?(void 0===window.Promise?window.Promise=r:window.Promise.prototype.finally||(window.Promise.prototype.finally=r.prototype.finally),e.exports=window.Promise):void 0!==n.g?(void 0===n.g.Promise?n.g.Promise=r:n.g.Promise.prototype.finally||(n.g.Promise.prototype.finally=r.prototype.finally),e.exports=n.g.Promise):e.exports=r},478:e=>{e.exports=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)r(n,e[n]);return t.join("&");function r(e,n){if(Array.isArray(n))for(var o=0;o<n.length;o++)r(e+"["+o+"]",n[o]);else if("[object Object]"===Object.prototype.toString.call(n))for(var o in n)r(e+"["+o+"]",n[o]);else t.push(encodeURIComponent(e)+(null!=n&&""!==n?"="+encodeURIComponent(n):""))}}},874:e=>{function t(e){try{return decodeURIComponent(e)}catch(t){return e}}e.exports=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var n=e.split("&"),r={},o={},i=0;i<n.length;i++){var a=n[i].split("="),l=t(a[0]),s=2===a.length?t(a[1]):"";"true"===s?s=!0:"false"===s&&(s=!1);var u=l.split(/\]\[?|\[/),f=o;l.indexOf("[")>-1&&u.pop();for(var c=0;c<u.length;c++){var d=u[c],p=u[c+1],h=""==p||!isNaN(parseInt(p,10));if(""===d)null==r[l=u.slice(0,c).join()]&&(r[l]=Array.isArray(f)?f.length:0),d=r[l]++;else if("__proto__"===d)break;if(c===u.length-1)f[d]=s;else{var v=Object.getOwnPropertyDescriptor(f,d);null!=v&&(v=v.value),null==v&&(f[d]=v=h?[]:{}),f=v}}}return o}},358:(e,t,n)=>{e.exports=n(452)("undefined"!=typeof window?window:null)},621:(e,t,n)=>{var r=n(178),o=n(359);e.exports=function(){var e=o.apply(0,arguments);return e.tag="[",e.children=r.normalizeChildren(e.children),e}},373:(e,t,n)=>{var r=n(178),o=n(359),i=n(188),a=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,l={};function s(e){for(var t in e)if(i.call(e,t))return!1;return!0}function u(e){for(var t,n="div",r=[],o={};t=a.exec(e);){var i=t[1],s=t[2];if(""===i&&""!==s)n=s;else if("#"===i)o.id=s;else if("."===i)r.push(s);else if("["===t[3][0]){var u=t[6];u&&(u=u.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?r.push(u):o[t[4]]=""===u?u:u||!0}}return r.length>0&&(o.className=r.join(" ")),l[e]={tag:n,attrs:o}}function f(e,t){var n=t.attrs,r=i.call(n,"class"),o=r?n.class:n.className;if(t.tag=e.tag,t.attrs={},!s(e.attrs)&&!s(n)){var a={};for(var l in n)i.call(n,l)&&(a[l]=n[l]);n=a}for(var l in e.attrs)i.call(e.attrs,l)&&"className"!==l&&!i.call(n,l)&&(n[l]=e.attrs[l]);for(var l in null==o&&null==e.attrs.className||(n.className=null!=o?null!=e.attrs.className?String(e.attrs.className)+" "+String(o):o:null!=e.attrs.className?e.attrs.className:null),r&&(n.class=null),n)if(i.call(n,l)&&"key"!==l){t.attrs=n;break}return t}e.exports=function(e){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var t=o.apply(1,arguments);return"string"==typeof e&&(t.children=r.normalizeChildren(t.children),"["!==e)?f(l[e]||u(e),t):(t.tag=e,t)}},359:(e,t,n)=>{var r=n(178);e.exports=function(){var e,t=arguments[this],n=this+1;if(null==t?t={}:("object"!=typeof t||null!=t.tag||Array.isArray(t))&&(t={},n=this),arguments.length===n+1)e=arguments[n],Array.isArray(e)||(e=[e]);else for(e=[];n<arguments.length;)e.push(arguments[n++]);return r("",t.key,t,e)}},452:(e,t,n)=>{var r=n(178);e.exports=function(e){var t,n=e&&e.document,o={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function i(e){return e.attrs&&e.attrs.xmlns||o[e.tag]}function a(e,t){if(e.state!==t)throw new Error("'vnode.state' must not be modified.")}function l(e){var t=e.state;try{return this.apply(t,arguments)}finally{a(e,t)}}function s(){try{return n.activeElement}catch(e){return null}}function u(e,t,n,r,o,i,a){for(var l=n;l<r;l++){var s=t[l];null!=s&&f(e,s,o,a,i)}}function f(e,t,o,a,s){var c=t.tag;if("string"==typeof c)switch(t.state={},null!=t.attrs&&M(t.attrs,t,o),c){case"#":!function(e,t,r){t.dom=n.createTextNode(t.children),b(e,t.dom,r)}(e,t,s);break;case"<":d(e,t,a,s);break;case"[":!function(e,t,r,o,i){var a=n.createDocumentFragment();if(null!=t.children){var l=t.children;u(a,l,0,l.length,r,null,o)}t.dom=a.firstChild,t.domSize=a.childNodes.length,b(e,a,i)}(e,t,o,a,s);break;default:!function(e,t,r,o,a){var l=t.tag,s=t.attrs,f=s&&s.is,c=(o=i(t)||o)?f?n.createElementNS(o,l,{is:f}):n.createElementNS(o,l):f?n.createElement(l,{is:f}):n.createElement(l);if(t.dom=c,null!=s&&function(e,t,n){"input"===e.tag&&null!=t.type&&e.dom.setAttribute("type",t.type);var r=null!=t&&"input"===e.tag&&"file"===t.type;for(var o in t)C(e,o,null,t[o],n,r)}(t,s,o),b(e,c,a),!x(t)&&null!=t.children){var d=t.children;u(c,d,0,d.length,r,null,o),"select"===t.tag&&null!=s&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;e.dom.value===n&&-1!==e.dom.selectedIndex||(e.dom.value=n)}"selectedIndex"in t&&C(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,s)}}(e,t,o,a,s)}else!function(e,t,n,o,i){(function(e,t){var n;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(n=e.state.view).$$reentrantLock$$)return;n.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(n=e.tag).$$reentrantLock$$)return;n.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}if(M(e.state,e,t),null!=e.attrs&&M(e.attrs,e,t),e.instance=r.normalize(l.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");n.$$reentrantLock$$=null})(t,n),null!=t.instance?(f(e,t.instance,n,o,i),t.dom=t.instance.dom,t.domSize=null!=t.dom?t.instance.domSize:0):t.domSize=0}(e,t,o,a,s)}var c={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function d(e,t,r,o){var i=t.children.match(/^\s*?<(\w+)/im)||[],a=n.createElement(c[i[1]]||"div");"http://www.w3.org/2000/svg"===r?(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",a=a.firstChild):a.innerHTML=t.children,t.dom=a.firstChild,t.domSize=a.childNodes.length,t.instance=[];for(var l,s=n.createDocumentFragment();l=a.firstChild;)t.instance.push(l),s.appendChild(l);b(e,s,o)}function p(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)u(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)k(e,t,0,t.length);else{var a=null!=t[0]&&null!=t[0].key,l=null!=n[0]&&null!=n[0].key,s=0,c=0;if(!a)for(;c<t.length&&null==t[c];)c++;if(!l)for(;s<n.length&&null==n[s];)s++;if(a!==l)k(e,t,c,t.length),u(e,n,s,n.length,r,o,i);else if(l){for(var d,p,w,b,x,j=t.length-1,E=n.length-1;j>=c&&E>=s&&(w=t[j],b=n[E],w.key===b.key);)w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),j--,E--;for(;j>=c&&E>=s&&(d=t[c],p=n[s],d.key===p.key);)c++,s++,d!==p&&h(e,d,p,r,g(t,c,o),i);for(;j>=c&&E>=s&&s!==E&&d.key===b.key&&w.key===p.key;)y(e,w,x=g(t,c,o)),w!==p&&h(e,w,p,r,x,i),++s<=--E&&y(e,d,o),d!==b&&h(e,d,b,r,o,i),null!=b.dom&&(o=b.dom),c++,w=t[--j],b=n[E],d=t[c],p=n[s];for(;j>=c&&E>=s&&w.key===b.key;)w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),E--,w=t[--j],b=n[E];if(s>E)k(e,t,c,j+1);else if(c>j)u(e,n,s,E+1,r,o,i);else{var A,C,N=o,T=E-s+1,z=new Array(T),O=0,P=0,_=2147483647,I=0;for(P=0;P<T;P++)z[P]=-1;for(P=E;P>=s;P--){null==A&&(A=v(t,c,j+1));var L=A[(b=n[P]).key];null!=L&&(_=L<_?L:-1,z[P-s]=L,w=t[L],t[L]=null,w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),I++)}if(o=N,I!==j-c+1&&k(e,t,c,j+1),0===I)u(e,n,s,E+1,r,o,i);else if(-1===_)for(C=function(e){var t=[0],n=0,r=0,o=0,i=m.length=e.length;for(o=0;o<i;o++)m[o]=e[o];for(o=0;o<i;++o)if(-1!==e[o]){var a=t[t.length-1];if(e[a]<e[o])m[o]=a,t.push(o);else{for(n=0,r=t.length-1;n<r;){var l=(n>>>1)+(r>>>1)+(n&r&1);e[t[l]]<e[o]?n=l+1:r=l}e[o]<e[t[n]]&&(n>0&&(m[o]=t[n-1]),t[n]=o)}}for(r=t[(n=t.length)-1];n-- >0;)t[n]=r,r=m[r];return m.length=0,t}(z),O=C.length-1,P=E;P>=s;P--)p=n[P],-1===z[P-s]?f(e,p,r,i,o):C[O]===P-s?O--:y(e,p,o),null!=p.dom&&(o=n[P].dom);else for(P=E;P>=s;P--)p=n[P],-1===z[P-s]&&f(e,p,r,i,o),null!=p.dom&&(o=n[P].dom)}}else{var R=t.length<n.length?t.length:n.length;for(s=s<c?s:c;s<R;s++)(d=t[s])===(p=n[s])||null==d&&null==p||(null==d?f(e,p,r,i,g(t,s+1,o)):null==p?S(e,d):h(e,d,p,r,g(t,s+1,o),i));t.length>R&&k(e,t,s,t.length),n.length>R&&u(e,n,s,n.length,r,o,i)}}}function h(e,t,n,o,a,s){var u=t.tag;if(u===n.tag){if(n.state=t.state,n.events=t.events,function(e,t){do{var n;if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate&&void 0!==(n=l.call(e.attrs.onbeforeupdate,e,t))&&!n)break;if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate&&void 0!==(n=l.call(e.state.onbeforeupdate,e,t))&&!n)break;return!1}while(0);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(n,t))return;if("string"==typeof u)switch(null!=n.attrs&&D(n.attrs,n,o),u){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children),t.dom=e.dom}(t,n);break;case"<":!function(e,t,n,r,o){t.children!==n.children?(j(e,t),d(e,n,r,o)):(n.dom=t.dom,n.domSize=t.domSize,n.instance=t.instance)}(e,t,n,s,a);break;case"[":!function(e,t,n,r,o,i){p(e,t.children,n.children,r,o,i);var a=0,l=n.children;if(n.dom=null,null!=l){for(var s=0;s<l.length;s++){var u=l[s];null!=u&&null!=u.dom&&(null==n.dom&&(n.dom=u.dom),a+=u.domSize||1)}1!==a&&(n.domSize=a)}}(e,t,n,o,a,s);break;default:!function(e,t,n,r){var o=t.dom=e.dom;r=i(t)||r,"textarea"===t.tag&&null==t.attrs&&(t.attrs={}),function(e,t,n,r){if(t&&t===n&&console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major"),null!=n){"input"===e.tag&&null!=n.type&&e.dom.setAttribute("type",n.type);var o="input"===e.tag&&"file"===n.type;for(var i in n)C(e,i,t&&t[i],n[i],r,o)}var a;if(null!=t)for(var i in t)null==(a=t[i])||null!=n&&null!=n[i]||N(e,i,a,r)}(t,e.attrs,t.attrs,r),x(t)||p(o,e.children,t.children,n,null,r)}(t,n,o,s)}else!function(e,t,n,o,i,a){if(n.instance=r.normalize(l.call(n.state.view,n)),n.instance===n)throw Error("A view cannot return the vnode it received as argument");D(n.state,n,o),null!=n.attrs&&D(n.attrs,n,o),null!=n.instance?(null==t.instance?f(e,n.instance,o,a,i):h(e,t.instance,n.instance,o,i,a),n.dom=n.instance.dom,n.domSize=n.instance.domSize):null!=t.instance?(S(e,t.instance),n.dom=void 0,n.domSize=0):(n.dom=t.dom,n.domSize=t.domSize)}(e,t,n,o,a,s)}else S(e,t),f(e,n,o,s,a)}function v(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}var m=[];function g(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function y(e,t,r){var o=n.createDocumentFragment();w(e,o,t),b(e,o,r)}function w(e,t,n){for(;null!=n.dom&&n.dom.parentNode===e;){if("string"!=typeof n.tag){if(null!=(n=n.instance))continue}else if("<"===n.tag)for(var r=0;r<n.instance.length;r++)t.appendChild(n.instance[r]);else if("["!==n.tag)t.appendChild(n.dom);else if(1===n.children.length){if(null!=(n=n.children[0]))continue}else for(r=0;r<n.children.length;r++){var o=n.children[r];null!=o&&w(e,t,o)}break}}function b(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function x(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted.");return!0}function k(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&S(e,i)}}function S(e,t){var n,r,o,i=0,s=t.state;if("string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&null!=(o=l.call(t.state.onbeforeremove,t))&&"function"==typeof o.then&&(i=1,n=o),t.attrs&&"function"==typeof t.attrs.onbeforeremove&&null!=(o=l.call(t.attrs.onbeforeremove,t))&&"function"==typeof o.then&&(i|=2,r=o),a(t,s),i){if(null!=n){var u=function(){1&i&&((i&=2)||f())};n.then(u,u)}null!=r&&(u=function(){2&i&&((i&=1)||f())},r.then(u,u))}else A(t),E(e,t);function f(){a(t,s),A(t),E(e,t)}}function j(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function E(e,t){for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)j(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&E(e,r)}}break}}function A(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&l.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&l.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&A(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&A(r)}}}function C(e,t,r,o,i,a){if(!("key"===t||"is"===t||null==o||T(t)||r===o&&!function(e,t){return"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===s()||"option"===e.tag&&e.dom.parentNode===n.activeElement}(e,t)&&"object"!=typeof o||"type"===t&&"input"===e.tag)){if("o"===t[0]&&"n"===t[1])return $(e,t,o);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),o);else if("style"===t)L(e.dom,r,o);else if(z(e,t,i)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+o&&(a||e.dom===s()))return;if("select"===e.tag&&null!==r&&e.dom.value===""+o)return;if("option"===e.tag&&null!==r&&e.dom.value===""+o)return;if(a&&""+o!="")return void console.error("`value` is read-only on file inputs!")}e.dom[t]=o}else"boolean"==typeof o?o?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,o)}}function N(e,t,n,r){if("key"!==t&&"is"!==t&&null!=n&&!T(t))if("o"===t[0]&&"n"===t[1])$(e,t,void 0);else if("style"===t)L(e.dom,n,null);else if(!z(e,t,r)||"className"===t||"title"===t||"value"===t&&("option"===e.tag||"select"===e.tag&&-1===e.dom.selectedIndex&&e.dom===s())||"input"===e.tag&&"type"===t){var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}else e.dom[t]=null}function T(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function z(e,t,n){return void 0===n&&(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}var O,P=/[A-Z]/g;function _(e){return"-"+e.toLowerCase()}function I(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(P,_)}function L(e,t,n){if(t===n);else if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)for(var r in e.style.cssText="",n)null!=(o=n[r])&&e.style.setProperty(I(r),String(o));else{for(var r in n){var o;null!=(o=n[r])&&(o=String(o))!==String(t[r])&&e.style.setProperty(I(r),o)}for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(I(r))}}function R(){this._=t}function $(e,n,r){if(null!=e.events){if(e.events._=t,e.events[n]===r)return;null==r||"function"!=typeof r&&"object"!=typeof r?(null!=e.events[n]&&e.dom.removeEventListener(n.slice(2),e.events,!1),e.events[n]=void 0):(null==e.events[n]&&e.dom.addEventListener(n.slice(2),e.events,!1),e.events[n]=r)}else null==r||"function"!=typeof r&&"object"!=typeof r||(e.events=new R,e.dom.addEventListener(n.slice(2),e.events,!1),e.events[n]=r)}function M(e,t,n){"function"==typeof e.oninit&&l.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(l.bind(e.oncreate,t))}function D(e,t,n){"function"==typeof e.onupdate&&n.push(l.bind(e.onupdate,t))}return R.prototype=Object.create(null),R.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(e,n,o){if(!e)throw new TypeError("DOM element being rendered to does not exist.");if(null!=O&&e.contains(O))throw new TypeError("Node is currently being rendered to and thus is locked.");var i=t,a=O,l=[],u=s(),f=e.namespaceURI;O=e,t="function"==typeof o?o:void 0;try{null==e.vnodes&&(e.textContent=""),n=r.normalizeChildren(Array.isArray(n)?n:[n]),p(e,e.vnodes,n,l,null,"http://www.w3.org/1999/xhtml"===f?void 0:f),e.vnodes=n,null!=u&&s()!==u&&"function"==typeof u.focus&&u.focus();for(var c=0;c<l.length;c++)l[c]()}finally{t=i,O=a}}}},742:(e,t,n)=>{var r=n(178);e.exports=function(e){return null==e&&(e=""),r("<",void 0,void 0,e,void 0,void 0)}},178:e=>{function t(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,events:void 0,instance:void 0}}t.normalize=function(e){return Array.isArray(e)?t("[",void 0,void 0,t.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:t("#",void 0,void 0,String(e),void 0,void 0)},t.normalizeChildren=function(e){var n=[];if(e.length){for(var r=null!=e[0]&&null!=e[0].key,o=1;o<e.length;o++)if((null!=e[o]&&null!=e[o].key)!==r)throw new TypeError(!r||null==e[o]&&"boolean"!=typeof e[o]?"In fragments, vnodes must either all have keys or none have keys.":"In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole.");for(o=0;o<e.length;o++)n[o]=t.normalize(e[o])}return n},e.exports=t},74:(e,t,n)=>{var r=n(164),o=n(165);e.exports=n(775)("undefined"!=typeof window?window:null,r,o.redraw)},775:(e,t,n)=>{var r=n(249),o=n(188);e.exports=function(e,t,n){var i=0;function a(e){return new t(e)}function l(e){return function(o,i){"string"!=typeof o?(i=o,o=o.url):null==i&&(i={});var l=new t((function(t,n){e(r(o,i.params),i,(function(e){if("function"==typeof i.type)if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]=new i.type(e[n]);else e=new i.type(e);t(e)}),n)}));if(!0===i.background)return l;var s=0;function u(){0==--s&&"function"==typeof n&&n()}return function e(t){var n=t.then;return t.constructor=a,t.then=function(){s++;var r=n.apply(t,arguments);return r.then(u,(function(e){if(u(),0===s)throw e})),e(r)},t}(l)}}function s(e,t){for(var n in e.headers)if(o.call(e.headers,n)&&n.toLowerCase()===t)return!0;return!1}return a.prototype=t.prototype,a.__proto__=t,{request:l((function(t,n,r,i){var a,l=null!=n.method?n.method.toUpperCase():"GET",u=n.body,f=(null==n.serialize||n.serialize===JSON.serialize)&&!(u instanceof e.FormData||u instanceof e.URLSearchParams),c=n.responseType||("function"==typeof n.extract?"":"json"),d=new e.XMLHttpRequest,p=!1,h=!1,v=d,m=d.abort;for(var g in d.abort=function(){p=!0,m.call(this)},d.open(l,t,!1!==n.async,"string"==typeof n.user?n.user:void 0,"string"==typeof n.password?n.password:void 0),f&&null!=u&&!s(n,"content-type")&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof n.deserialize||s(n,"accept")||d.setRequestHeader("Accept","application/json, text/*"),n.withCredentials&&(d.withCredentials=n.withCredentials),n.timeout&&(d.timeout=n.timeout),d.responseType=c,n.headers)o.call(n.headers,g)&&d.setRequestHeader(g,n.headers[g]);d.onreadystatechange=function(e){if(!p&&4===e.target.readyState)try{var o,a=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),l=e.target.response;if("json"===c){if(!e.target.responseType&&"function"!=typeof n.extract)try{l=JSON.parse(e.target.responseText)}catch(e){l=null}}else c&&"text"!==c||null==l&&(l=e.target.responseText);if("function"==typeof n.extract?(l=n.extract(e.target,n),a=!0):"function"==typeof n.deserialize&&(l=n.deserialize(l)),a)r(l);else{var s=function(){try{o=e.target.responseText}catch(e){o=l}var t=new Error(o);t.code=e.target.status,t.response=l,i(t)};0===d.status?setTimeout((function(){h||s()})):s()}}catch(e){i(e)}},d.ontimeout=function(e){h=!0;var t=new Error("Request timed out");t.code=e.target.status,i(t)},"function"==typeof n.config&&(d=n.config(d,n,t)||d)!==v&&(a=d.abort,d.abort=function(){p=!0,a.call(this)}),null==u?d.send():"function"==typeof n.serialize?d.send(n.serialize(u)):u instanceof e.FormData||u instanceof e.URLSearchParams?d.send(u):d.send(JSON.stringify(u))})),jsonp:l((function(t,n,r,o){var a=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+i++,l=e.document.createElement("script");e[a]=function(t){delete e[a],l.parentNode.removeChild(l),r(t)},l.onerror=function(){delete e[a],l.parentNode.removeChild(l),o(new Error("JSONP request failed"))},l.src=t+(t.indexOf("?")<0?"?":"&")+encodeURIComponent(n.callbackKey||"callback")+"="+encodeURIComponent(a),e.document.documentElement.appendChild(l)}))}}},843:(e,t,n)=>{var r=n(165);e.exports=n(223)("undefined"!=typeof window?window:null,r)},641:(e,t,n)=>{var r=n(188);e.exports=Object.assign||function(e,t){for(var n in t)r.call(t,n)&&(e[n]=t[n])}},542:(e,t,n)=>{var r=n(188),o=new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$");e.exports=function(e,t){var n={};if(null!=t)for(var i in e)r.call(e,i)&&!o.test(i)&&t.indexOf(i)<0&&(n[i]=e[i]);else for(var i in e)r.call(e,i)&&!o.test(i)&&(n[i]=e[i]);return n}},188:e=>{e.exports={}.hasOwnProperty},607:function(e,t,n){var r,o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o.apply(this,arguments)},i=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Fliptiles=void 0;var s=l(n(865)),u="234567bcdfghjkmnpqrstvwxyz-",f=Object.fromEntries(u.split("").map((function(e,t){return[e,t]}))),c=m([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,2,2,2,2,2,2,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]),d="/:flagsCode/:boardStr/:lastPieceStr/:turnStr",p="/0/".concat(c,"/-/0"),h=[{name:"Black",colour:"#000"},{name:"White",colour:"#fff"}],v=[{rightwards:1,downwards:0},{rightwards:1,downwards:1},{rightwards:0,downwards:1},{rightwards:-1,downwards:1},{rightwards:-1,downwards:0},{rightwards:-1,downwards:-1},{rightwards:0,downwards:-1},{rightwards:1,downwards:-1}];function m(e){return(e.join("")+"22").match(/.{1,3}/g).map((function(e){return u.charAt(parseInt(e,3))})).join("")}function g(e){return e.split("").flatMap((function(e){return(27+f[e]).toString(3).slice(-3).split("").map(Number)})).slice(0,64)}function y(e){return 1*(e.gridNos?1:0)+2*(e.ai0?1:0)+4*(e.ai1?1:0)}function w(e){return{gridNos:!!(1&e),ai0:!!(2&e),ai1:!!(4&e)}}function b(e){if(!(e<0||e>=64))return{downwards:Math.floor(e/8),rightwards:e%8}}function x(e){if(!(e.downwards<0||e.downwards>=8||e.rightwards<0||e.rightwards>=8))return 8*e.downwards+e.rightwards}function k(e,t){e.rightwards+=t.rightwards,e.downwards+=t.downwards}function S(e,t,n){var r=1-n;return v.map((function(i){for(var a=0,l=o({},t);;){k(l,i);var s=x(l);if(e[s]!==r)return e[s]===n?a:0;a+=1}}))}function j(e,t,n){if(2===e[t]){var r=b(t),l=S(e,r,n);if(0!==l.reduce((function(e,t){return e+t}))){var s=a([],i(e),!1);return s[t]=n,function(e,t,n){for(var r=0;r<v.length;r++)for(var i=v[r],a=o({},t),l=0;l<n[r];l++){k(a,i);var s=x(a);e[s]=1-e[s]}}(s,r,l),s}}}function E(e,t,n,r){var i=j(e,t,n);return!!Array.isArray(i)&&(s.default.route.set(d,o(o({},r.attrs),{boardStr:m(i),lastPieceStr:t,turnStr:1-n})),!0)}function A(e,t){return e.some((function(n,r){return 2===n&&S(e,b(r),t).reduce((function(e,t){return e+t}))>0}))}function C(e,t,n,r,o){return void 0===n&&(n=3),void 0===r&&(r=2),void 0===o&&(o=1),e.reduce((function(e,i,a){return e+(i!==t?0:0===a||7===a||56===a||63===a?n:a<=7||a>=56||a%8==0||a%8==7?r:o)}),0)}function N(){var e,t,n;function r(t){e=void 0,void 0!==n&&clearTimeout(n),n=void 0;var r=t.attrs,o=r.boardStr,i=r.turnStr,a=r.flagsCode,l=Number(i),s=w(a);if(0===l&&s.ai0||1===l&&s.ai1){var u=g(o),f=function(e,t){for(var n=1-t,r=-1/0,o=[],i=0;i<64;i++){var a=j(e,i,t);if(Array.isArray(a)){for(var l=1/0,s=0;s<64;s++){var u=j(a,s,n);if(Array.isArray(u)){var f=C(u,t)-C(u,n);f<l&&(l=f)}}l===r?o.push(i):l>r&&(r=l,o=[i])}}return o}(u,l),c=f[Math.floor(Math.random()*f.length)];void 0!==c&&(n=setTimeout((function(){return E(u,c,l,t)}),2e3))}}return{oncreate:r,onupdate:r,view:function(r){var i=r.attrs,a=i.boardStr,l=i.turnStr,u=i.lastPieceStr,f=i.flagsCode,p=w(f),v=g(a),m=Number(l),x="-"===u?void 0:Number(u),k=b(null!=x?x:-1),S=function(e){return e.reduce((function(e,t){return e[t]+=1,e}),[0,0,0])}(v),j=S[2],C=void 0===t||j===t-1,N=A(v,m),T=1-m,z=!N&&A(v,T),O=!N&&!z,P=S[0]>S[1]?0:S[1]>S[0]?1:void 0;return t=j,(0,s.default)(".game",{style:{width:"760px",margin:"0 auto"}},h.map((function(e,t){return(0,s.default)(".player",{style:{position:"relative",height:"40px",width:"380px",borderRadius:"20px",background:O||m!==t||N?!O&&t===m&&0===t||O&&t===P&&0===t?"#000":!O&&t===m&&1===t||O&&t===P&&1===t?"#fff":"transparent":"#fc0",color:O||m!==t||N?!O&&t===m&&0===t||O&&0===P&&0===t?"#fff":!O&&t===m&&1===t||O&&P&&1===t?"#000":"inherit":"#000",margin:"0 0 15px",float:"left",transition:"background-color .2s .8s, color .2s .8s"}},(0,s.default)(".piece",{style:{width:"16px",height:"16px",borderRadius:"16px",border:"1px solid #999",position:"absolute",top:"11px",left:"15px",background:e.colour}}),(0,s.default)(".playerText",{style:{position:"absolute",left:"40px",top:"6.5px"}},e.name," (",S[t],") ",t===m&&N&&" to play ",O&&P===t&&(0,s.default)("b"," wins "),O&&void 0===P&&(0,s.default)("b"," draws "),t===m&&!N&&z&&[(0,s.default)("b"," can’t play ")," — ",(0,s.default)(s.default.route.Link,{href:d,params:o(o({},r.attrs),{turnStr:T})},"Pass")]),(0,s.default)("label",{style:{position:"absolute",right:"18px",top:"6.5px"}},(0,s.default)("input[type=checkbox]",{checked:p[0===t?"ai0":"ai1"],onchange:function(){var e,n=y(o(o({},p),((e={})["ai".concat(t)]=!p[0===t?"ai0":"ai1"],e)));s.default.route.set(d,o(o({},r.attrs),{flagsCode:n}))}})," AI"))})),(0,s.default)(".board",{style:{background:"#372",width:"720px",height:"720px",borderRadius:"55px",margin:"10px 0 25px",padding:"20px",clear:"left"}},v.map((function(t,i){var a={width:"80px",height:"80px",borderRadius:"80px"},l=b(i),u=void 0===k?1:Math.sqrt(Math.pow(l.rightwards-k.rightwards,2)+Math.pow(l.downwards-k.downwards,2)),f=o(o({},a),{position:"absolute",backfaceVisibility:"hidden",top:2===t?"-20px":"0",zIndex:10,transition:i===x?"top .25s":"transform .5s ".concat(.15*(1+u*(C?1:0)),"s")});return(0,s.default)("div",{style:o(o({},a),{position:"relative",float:"left",margin:"5px",transition:"box-shadow .25s .25s, background .5s",background:i===e?"#f60":0===m?"rgba(0, 0, 0, .075)":"rgba(255, 255, 255, .075)",boxShadow:i===x?"0 0 12px #fff":"none",cursor:2===t?"pointer":"default",color:"#372",fontSize:"36px",textAlign:"center",lineHeight:"77px",fontWeight:"bold"}),onclick:function(){void 0===n&&(E(v,i,m,r)||2!==v[i]||(e=i,setTimeout(s.default.redraw,750)))}},p.gridNos&&[["A","B","C","D","E","F","G","H"][l.rightwards],l.downwards+1],(0,s.default)(".piece0",{style:o(o({},f),{transform:0===t?"rotateY(0deg)":1===t?"rotateY(180deg)":"rotateY(90deg)",background:2!==t?h[0].colour:"transparent"})}),(0,s.default)(".piece1",{style:o(o({},f),{transform:0===t?"rotateY(180deg)":1===t?"rotateY(0deg)":"rotateY(90deg)",background:2!==t?h[1].colour:"transparent"})}))}))),(0,s.default)("label",{style:{float:"right"}},(0,s.default)("input[type=checkbox]",{checked:p.gridNos,onchange:function(){var e=y(o(o({},p),{gridNos:!p.gridNos}));s.default.route.set(d,o(o({},r.attrs),{flagsCode:e}))}})," Named cells"),(0,s.default)(s.default.route.Link,{href:"/:flagsCode/".concat(c,"/-/0"),params:{flagsCode:f},style:{fontWeight:"bold"}},"Start again"),s.default.trust(" &nbsp; "),(0,s.default)("a",{href:"https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english"},"How to play"),s.default.trust(" &nbsp; "),(0,s.default)("a",{href:"https://github.com/jawj/fliptiles",style:{color:"#bbb"}},"Code on GitHub"))}}}t.Fliptiles=N,s.default.route(document.body,p,((r={})[d]=N,r))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n(607)})();