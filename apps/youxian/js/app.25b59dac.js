(function(e){function t(t){for(var r,a,u=t[0],i=t[1],f=t[2],d=0,s=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&s.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);l&&l(t);while(s.length)s.shift()();return o.push.apply(o,f||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==c[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0aba9c":"a724dd68","chunk-2d0c1074":"b0532136","chunk-2d21d4fb":"3cc7dcb9","chunk-2d229803":"1009ca25","chunk-2d230cb3":"35812645","chunk-53646661":"dd735be3","chunk-7d4ab0b8":"ff5af165","chunk-bb428cc2":"f9306898","chunk-fc3e7484":"f447e494"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-53646661":1,"chunk-7d4ab0b8":1,"chunk-bb428cc2":1,"chunk-fc3e7484":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0aba9c":"31d6cfe0","chunk-2d0c1074":"31d6cfe0","chunk-2d21d4fb":"31d6cfe0","chunk-2d229803":"31d6cfe0","chunk-2d230cb3":"31d6cfe0","chunk-53646661":"a22df8f4","chunk-7d4ab0b8":"c7b78a47","chunk-bb428cc2":"7b706af0","chunk-fc3e7484":"69302839"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var f=o[u],d=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(d===r||d===c))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){f=s[u],d=f.getAttribute("data-href");if(d===r||d===c)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],l.parentNode.removeChild(l),n(o)},l.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(l)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=o);var f,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=u(e);var s=new Error;f=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,n[1](s)}c[e]=void 0}};var l=setTimeout((function(){f({type:"timeout",target:d})}),12e4);d.onerror=d.onload=f,document.head.appendChild(d)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],d=f.push.bind(f);f.push=t,f=f.slice();for(var s=0;s<f.length;s++)t(f[s]);var l=d;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},4360:function(e,t,n){"use strict";var r=n("2909"),a=n("2b0e"),c=n("2f62");a["default"].use(c["a"]);var o=new c["a"].Store({state:{isShowLoading:!1,menuItems:[{name:"home",size:18,type:"md-home",text:"系统主页"},{text:"设备信息",type:"ios-paper",children:[{type:"ios-grid",name:"t1",text:"路由信息"}]}]},mutations:{setMenus:function(e,t){e.menuItems=Object(r["a"])(t)},setLoading:function(e,t){e.isShowLoading=t}}});t["a"]=o},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=n("bc3a"),c=n.n(a),o=n("5c96"),u=n.n(o),i=n("f825"),f=n.n(i),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view"),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowLoading,expression:"isShowLoading"}],staticClass:"global-loading"},[n("Spin",{attrs:{size:"large"}})],1)],1)},s=[],l=(n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),h=n("2f62");function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){Object(l["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m={name:"App",data:function(){return{keepAliveData:["manage"]}},computed:b({},Object(h["b"])(["isShowLoading"]))},g=m,v=(n("034f"),n("2877")),y=Object(v["a"])(g,d,s,!1,null,null,null),k=y.exports,w=n("4360"),O=n("a18c"),j=(n("f8ce"),n("96cf"),n("1da1"));n("b0c0"),n("d3b7");function S(e){var t=[],r=[];return t.push({path:"/",component:function(){return n.e("chunk-7d4ab0b8").then(n.bind(null,"86d6"))},children:r}),e.forEach((function(e){P(r,e)})),t.push({path:"*",redirect:"/404"}),t}function P(e,t){t.name?O["a"][t.name]&&e.push(O["a"][t.name]):t.children&&t.children.forEach((function(t){P(e,t)}))}var E=n("ed08"),x=!1;O["b"].beforeEach(function(){var e=Object(j["a"])(regeneratorRuntime.mark((function e(t,n,r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(document.title=Object(E["a"])(t.meta.title),i["LoadingBar"].start(),localStorage.getItem("token"))if("/login"===t.path)r({path:"/"});else if(x)r();else try{a=S(w["a"].state.menuItems),O["b"].addRoutes(a),x=!0,r({path:t.path||"/"})}catch(n){Object(E["b"])(),r("/login?redirect=".concat(t.path))}else x=!1,"/login"===t.path?r():r("/login?redirect=".concat(t.path));case 3:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()),O["b"].afterEach((function(){i["LoadingBar"].finish()}));n("0fae");r["default"].config.productionTip=!1,r["default"].use(f.a),r["default"].use(u.a),r["default"].prototype.$axios=c.a,new r["default"]({el:"#app",router:O["b"],store:w["a"],render:function(e){return e(k)}})},"85ec":function(e,t,n){},a18c:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return f}));n("d3b7");var r=n("2b0e"),a=n("8c4f");r["default"].use(a["a"]);var c=[{path:"/login",name:"login",meta:{title:"登录"},component:function(){return n.e("chunk-bb428cc2").then(n.bind(null,"578a"))}},{path:"/other",name:"other",meta:{title:"单独的路由"},component:function(){return n.e("chunk-2d21d4fb").then(n.bind(null,"d180"))}},{path:"/404",name:"404",meta:{title:"404"},component:function(){return n.e("chunk-53646661").then(n.bind(null,"7746"))}},{path:"/",redirect:"/home"}],o={home:{path:"home",name:"home",meta:{title:"主页"},component:function(){return n.e("chunk-fc3e7484").then(n.bind(null,"bb51"))}},t1:{path:"t1",name:"t1",meta:{title:"表格"},component:function(){return n.e("chunk-2d0aba9c").then(n.bind(null,"15df"))}},password:{path:"password",name:"password",meta:{title:"修改密码"},component:function(){return n.e("chunk-2d0c1074").then(n.bind(null,"43fe"))}},msg:{path:"msg",name:"msg",meta:{title:"通知消息"},component:function(){return n.e("chunk-2d229803").then(n.bind(null,"de5a"))}},userinfo:{path:"userinfo",name:"userinfo",meta:{title:"用户信息"},component:function(){return n.e("chunk-2d230cb3").then(n.bind(null,"ee96"))}}},u=function(){return new a["a"]({routes:c})},i=u();function f(){var e=u();i.matcher=e.matcher}t["b"]=i},ed08:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return o}));var r=n("a18c");function a(){localStorage.setItem("token",""),localStorage.setItem("userImg",""),localStorage.setItem("userName",""),Object(r["c"])()}var c="vue-admin-template";function o(e){return e?"".concat(c," - ").concat(e):"".concat(c)}}});
//# sourceMappingURL=app.25b59dac.js.map