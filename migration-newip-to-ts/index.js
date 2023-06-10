(()=>{"use strict";var r={722:(r,n,e)=>{e.d(n,{Z:()=>i});var t=e(645),o=e.n(t)()((function(r){return r[1]}));o.push([r.id,".news {\r\n    position: fixed;\r\n    align-items: center;\r\n    justify-content: center;\r\n    top: 21.25rem;\r\n    left: 0;\r\n    /* margin-top: 390px; */\r\n    overflow: auto;\r\n    width: 100vw;\r\n    height: calc(100vh - 6.25rem - 21.25rem);\r\n}\r\n\r\n.news__item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin: 1rem auto;\r\n    margin-bottom: 1.6%;\r\n    background: #fff;\r\n    color: #333;\r\n    line-height: 1.4;\r\n    font-family: Arial, sans-serif;\r\n    border-radius: 5px;\r\n    overflow: hidden;\r\n}\r\n\r\n.news__item:hover .news__meta-photo {\r\n    transform: scale(1.3) rotate(3deg);\r\n}\r\n\r\n.news__item .news__meta {\r\n    position: relative;\r\n    height: 12.5rem;\r\n    /* height: 200px; */\r\n}\r\n\r\n.news__item .news__meta-photo {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    background-size: cover;\r\n    background-position: center;\r\n    transition: transform 0.2s;\r\n}\r\n\r\n.news__item .news__meta-details,\r\n.news__item .news__meta-details ul {\r\n    margin: auto;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\n.news__item .news__meta-details {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: -120%;\r\n    margin: auto;\r\n    transition: left 0.2s;\r\n    background: rgba(0, 0, 0, 0.6);\r\n    color: #fff;\r\n    padding: 10px;\r\n    width: 100%;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.news__item .news__description {\r\n    padding: 1rem;\r\n    background: #fff;\r\n    position: relative;\r\n    z-index: 1;\r\n}\r\n\r\n.news__item .news__description h2 {\r\n    line-height: 1;\r\n    margin: 0;\r\n    font-size: 1.7rem;\r\n}\r\n\r\n.news__item .news__description h3 {\r\n    font-size: 1rem;\r\n    font-weight: 300;\r\n    text-transform: uppercase;\r\n    color: #a2a2a2;\r\n    margin-top: 5px;\r\n}\r\n\r\n.news__item .news__description .news__read-more {\r\n    text-align: right;\r\n}\r\n\r\n.news__item .news__description .news__read-more a {\r\n    color: #5ad67d;\r\n    display: inline-block;\r\n    position: relative;\r\n    text-decoration: none;\r\n    font-weight: 800;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:after {\r\n    content: '→';\r\n    margin-left: -10px;\r\n    opacity: 0;\r\n    vertical-align: middle;\r\n    transition: margin 0.3s, opacity 0.3s;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:hover:after {\r\n    margin-left: 5px;\r\n    opacity: 1;\r\n}\r\n\r\n.news__item p {\r\n    margin: 1rem 0 0;\r\n}\r\n\r\n.news__item p:first-of-type {\r\n    margin-top: 1.25rem;\r\n    position: relative;\r\n}\r\n\r\n.news__item p:first-of-type:before {\r\n    content: '';\r\n    position: absolute;\r\n    height: 5px;\r\n    background: #5ad67d;\r\n    width: 35px;\r\n    top: -0.75rem;\r\n    border-radius: 3px;\r\n}\r\n\r\n.news__item:hover .news__meta-details {\r\n    left: 0%;\r\n}\r\n\r\n@media (min-width: 640px) {\r\n    .news__item {\r\n        flex-direction: row;\r\n        max-width: 700px;\r\n    }\r\n\r\n    .news__item .news__meta {\r\n        flex-basis: 40%;\r\n        height: auto;\r\n    }\r\n\r\n    .news__item .news__description {\r\n        flex-basis: 60%;\r\n    }\r\n\r\n    .news__item .news__description:before {\r\n        -webkit-transform: skewX(-3deg);\r\n        transform: skewX(-3deg);\r\n        content: '';\r\n        background: #fff;\r\n        width: 30px;\r\n        position: absolute;\r\n        left: -10px;\r\n        top: 0;\r\n        bottom: 0;\r\n        z-index: -1;\r\n    }\r\n\r\n    .news__item.alt {\r\n        flex-direction: row-reverse;\r\n    }\r\n\r\n    .news__item.alt .news__description:before {\r\n        left: inherit;\r\n        right: -10px;\r\n        -webkit-transform: skew(3deg);\r\n        transform: skew(3deg);\r\n    }\r\n\r\n    .news__item.alt .news__meta-details {\r\n        padding-left: 25px;\r\n    }\r\n}\r\n",""]);const i=o},92:(r,n,e)=>{e.d(n,{Z:()=>i});var t=e(645),o=e.n(t)()((function(r){return r[1]}));o.push([r.id,".sources {\r\n    display: flex;\r\n    /* flex-wrap: nowrap; */\r\n    flex-wrap: wrap;\r\n    width: 100%;\r\n    /* height: 120px; */\r\n    height: 12.5rem;\r\n    overflow: auto;\r\n    align-items: center;\r\n    font: 300 1em 'Fira Sans', sans-serif;\r\n\r\n    position: fixed;\r\n    top: 8rem;\r\n    left: 0;\r\n}\r\n\r\n.source__item {\r\n    background: none;\r\n    border: 2px solid #30c5ff;\r\n    font: inherit;\r\n    line-height: 1;\r\n    margin: 0.5em;\r\n    padding: 1em 2em;\r\n    color: #70d6ff;\r\n    transition: 0.25s;\r\n    cursor: pointer;\r\n    flex: 1 0 12.5%;\r\n    /* width: calc(100% / 6); */\r\n    text-align: center;\r\n}\r\n\r\n.source__item:hover,\r\n.source__item:focus {\r\n    border-color: #3fcc59;\r\n    color: #69db7e;\r\n    box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\r\n    transform: translateY(-0.25em);\r\n}\r\n\r\n.source__item-name {\r\n    font-weight: 400;\r\n    white-space: nowrap;\r\n}\r\n",""]);const i=o},727:(r,n,e)=>{e.d(n,{Z:()=>d});var t=e(645),o=e.n(t),i=e(667),s=e.n(i),a=e(315),c=o()((function(r){return r[1]})),l=s()(a);c.push([r.id,"html {\r\n    font-size: 16px;\r\n    /* height: 100%; */\r\n}\r\n\r\nbody {\r\n    color: #fff;\r\n    background: #17181c;\r\n    font-family: sans-serif;\r\n}\r\n\r\nheader {\r\n    padding: 0.625rem 1.875rem;\r\n\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\nheader h1 {\r\n    font-size: 2.5rem;\r\n    font-weight: 800;\r\n}\r\n\r\nfooter {\r\n    height: 6.25rem;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    position: absolute;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n}\r\nfooter .copyright {\r\n    font-size: 0.875rem;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\nfooter .copyright a {\r\n    color: #444;\r\n}\r\nfooter .copyright a:hover {\r\n    color: #555;\r\n}\r\nfooter .copyright:before {\r\n    content: '©';\r\n}\r\n\r\n.copyright,\r\n.year,\r\n.github,\r\n.rsschool-link {\r\n    margin-left: 1.25rem;\r\n}\r\n\r\n.rsschool-logo {\r\n    width: 60px;\r\n    height: 40px;\r\n    background-image: url("+l+");\r\n    /* mask-image: url(../src/img/rs_school_js.svg); */\r\n    background-repeat: none;\r\n    background-size: cover;\r\n}\r\n\r\n.github a {\r\n    text-decoration: none;\r\n    color: white;\r\n    font-size: 1.125rem;\r\n    font-weight: 700;\r\n}\r\n\r\n@media screen and (max-width: 1200px) {\r\n    html {\r\n        font-size: 14px;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 780px) {\r\n    html {\r\n        font-size: 12px;\r\n    }\r\n}\r\n\r\n/* @media screen and (max-width: 368) {\r\n    html {\r\n        font-size: 10px;\r\n    }\r\n} */\r\n",""]);const d=c},645:r=>{r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var e=r(n);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(r,e,t){"string"==typeof r&&(r=[[null,r,""]]);var o={};if(t)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<r.length;a++){var c=[].concat(r[a]);t&&o[c[0]]||(e&&(c[2]?c[2]="".concat(e," and ").concat(c[2]):c[2]=e),n.push(c))}},n}},667:r=>{r.exports=function(r,n){return n||(n={}),"string"!=typeof(r=r&&r.__esModule?r.default:r)?r:(/^['"].*['"]$/.test(r)&&(r=r.slice(1,-1)),n.hash&&(r+=n.hash),/["'() \t\n]/.test(r)||n.needQuotes?'"'.concat(r.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):r)}},379:(r,n,e)=>{var t,o=function(){var r={};return function(n){if(void 0===r[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}r[n]=e}return r[n]}}(),i=[];function s(r){for(var n=-1,e=0;e<i.length;e++)if(i[e].identifier===r){n=e;break}return n}function a(r,n){for(var e={},t=[],o=0;o<r.length;o++){var a=r[o],c=n.base?a[0]+n.base:a[0],l=e[c]||0,d="".concat(c," ").concat(l);e[c]=l+1;var u=s(d),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(p)):i.push({identifier:d,updater:h(p,n),references:1}),t.push(d)}return t}function c(r){var n=document.createElement("style"),t=r.attributes||{};if(void 0===t.nonce){var i=e.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(r){n.setAttribute(r,t[r])})),"function"==typeof r.insert)r.insert(n);else{var s=o(r.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}return n}var l,d=(l=[],function(r,n){return l[r]=n,l.filter(Boolean).join("\n")});function u(r,n,e,t){var o=e?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(r.styleSheet)r.styleSheet.cssText=d(n,o);else{var i=document.createTextNode(o),s=r.childNodes;s[n]&&r.removeChild(s[n]),s.length?r.insertBefore(i,s[n]):r.appendChild(i)}}function p(r,n,e){var t=e.css,o=e.media,i=e.sourceMap;if(o?r.setAttribute("media",o):r.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),r.styleSheet)r.styleSheet.cssText=t;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(t))}}var f=null,m=0;function h(r,n){var e,t,o;if(n.singleton){var i=m++;e=f||(f=c(n)),t=u.bind(null,e,i,!1),o=u.bind(null,e,i,!0)}else e=c(n),t=p.bind(null,e,n),o=function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(e)};return t(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap)return;t(r=n)}else o()}}r.exports=function(r,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var e=a(r=r||[],n);return function(r){if(r=r||[],"[object Array]"===Object.prototype.toString.call(r)){for(var t=0;t<e.length;t++){var o=s(e[t]);i[o].references--}for(var c=a(r,n),l=0;l<e.length;l++){var d=s(e[l]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}e=c}}}},315:(r,n,e)=>{r.exports=e.p+"img\\rs_school_js.ad577ba8ebf1c328c244.svg"}},n={};function e(t){var o=n[t];if(void 0!==o)return o.exports;var i=n[t]={id:t,exports:{}};return r[t](i,i.exports,e),i.exports}e.n=r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return e.d(n,{a:n}),n},e.d=(r,n)=>{for(var t in n)e.o(n,t)&&!e.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:n[t]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),e.o=(r,n)=>Object.prototype.hasOwnProperty.call(r,n),(()=>{var r;e.g.importScripts&&(r=e.g.location+"");var n=e.g.document;if(!r&&n&&(n.currentScript&&(r=n.currentScript.src),!r)){var t=n.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&!r;)r=t[o--].src}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=r})(),e.nc=void 0,(()=>{const r=class{constructor(r,n){this.baseLink=r,this.options=n}getResp({endpoint:r="",options:n={}},e=(()=>{console.error("No callback for GET response")})){this.load("GET",r,e,n)}errorHandler(r){if(!r.ok)throw 401!==r.status&&404!==r.status||console.log(`Sorry, but there is ${r.status} error: ${r.statusText}`),Error(r.statusText);return r}makeUrl(r,n){const e=Object.assign(Object.assign({},this.options),r);let t=`${this.baseLink}${n}?`;return Object.keys(e).forEach((r=>{t+=`${r}=${e[r]}&`})),t.slice(0,-1)}load(r,n,e,t={}){fetch(this.makeUrl(t,n),{method:r}).then(this.errorHandler).then((r=>r.json())).then((r=>e(r))).catch((r=>console.error(r)))}},n=class extends r{constructor(){super("https://newsapi.org/v2/",{apiKey:"f4e7ac2d5bec4aa3a63a49c9bb3a9ea3"})}},t=class extends n{getSources(r){super.getResp({endpoint:"sources"},r)}getNews(r,n){let e=r.target;const t=r.currentTarget;for(;e!==t;){if(e.classList.contains("source__item")){const r=e.getAttribute("data-source-id");return void(t.getAttribute("data-source")!==r&&null!==r&&(t.setAttribute("data-source",r),super.getResp({endpoint:"everything",options:{sources:r}},n)))}e=e.parentNode}}};var o=e(379),i=e.n(o),s=e(722);i()(s.Z,{insert:"head",singleton:!1}),s.Z.locals;var a=e(92);i()(a.Z,{insert:"head",singleton:!1}),a.Z.locals;class c{constructor(){this.news=new class{draw(r){var n;const e=r.length>=10?r.filter(((r,n)=>n<10)):r,t=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp");e.forEach(((r,n)=>{var e,i;if(!o)throw new Error("error");const s=o.content.cloneNode(!0);n%2&&(null===(e=s.querySelector(".news__item"))||void 0===e||e.classList.add("alt")),s.querySelector(".news__meta-photo").style.backgroundImage=`url(${r.urlToImage||"../../../img/news_placeholder.jpg"})`,s.querySelector(".news__meta-author").textContent=r.author||r.source.name,s.querySelector(".news__meta-date").textContent=r.publishedAt.slice(0,10).split("-").reverse().join("-"),s.querySelector(".news__description-title").textContent=r.title,s.querySelector(".news__description-source").textContent=r.source.name,s.querySelector(".news__description-content").textContent=r.description,null===(i=s.querySelector(".news__read-more a"))||void 0===i||i.setAttribute("href",r.url),t.append(s)})),document.querySelector(".news").innerHTML="",null===(n=document.querySelector(".news"))||void 0===n||n.appendChild(t)}},this.sources=new class{draw(r){var n;const e=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");r.forEach((r=>{if(!t)throw new Error("error");const n=t.content.cloneNode(!0);n.querySelector(".source__item-name").textContent=r.name,n.querySelector(".source__item").setAttribute("data-source-id",r.id),e.append(n)})),null===(n=document.querySelector(".sources"))||void 0===n||n.append(e)}}}drawNews(r){const n=(null==r?void 0:r.articles)?null==r?void 0:r.articles:[];this.news.draw(n)}drawSources(r){const n=(null==r?void 0:r.sources)?null==r?void 0:r.sources:[];this.sources.draw(n)}}var l=e(727);i()(l.Z,{insert:"head",singleton:!1}),l.Z.locals,(new class{constructor(){this.controller=new t,this.view=new c}start(){document.querySelector(".sources").addEventListener("click",(r=>this.controller.getNews(r,(r=>this.view.drawNews(r))))),this.controller.getSources((r=>this.view.drawSources(r)))}}).start()})()})();