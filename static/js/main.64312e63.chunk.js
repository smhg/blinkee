(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(22)},18:function(e,t,n){},20:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(8),c=n.n(i),r=(n(18),n(12)),l=n(11),s=n(10),u=n(2),d=n(3),h=n(5),f=n(4),v=n(6),g=n(1),p=(n(20),n(9)),m=n.n(p),w=function(e){return function(t){return Math.round(t*Math.pow(10,e))/Math.pow(10,e)}},b=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).state={},n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.loadLocation().then(this.props.onChange)}},{key:"render",value:function(){var e=this.props,t=e.latitude,n=e.longitude;return o.a.createElement("div",null,(!t||!n)&&o.a.createElement("div",null,"Location access is required."),t&&n&&o.a.createElement("div",null,"Your location: ",o.a.createElement("a",{href:"https://www.google.com/maps/search/?api=1&query=".concat(t,",").concat(n)},w(4)(t),",",w(4)(n))))}},{key:"loadLocation",value:function(){var e=this;return new Promise(function(t,n){navigator.geolocation.getCurrentPosition(function(n){e.setState({location:n});var a=n.coords,o=a.latitude,i=a.longitude;t({latitude:o,longitude:i})},function(e){n(e)})})}}]),t}(a.Component),k=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).state={vehicles:JSON.parse(localStorage.getItem("blinkees"))||{}},n.handleLocationChange=n.handleLocationChange.bind(Object(g.a)(Object(g.a)(n))),n.handleReload=n.handleReload.bind(Object(g.a)(Object(g.a)(n))),n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.state.vehicles.timestamp||this.loadData()}},{key:"render",value:function(){var e,t,n,a=this.state,i=a.location,c=(i=void 0===i?{}:i).latitude,r=i.longitude,l=a.vehicles,u=void 0===l?{}:l,d=a.distances,h=void 0===d?new Map:d;if(h.size>0){var f=Object(s.a)(Array.from(h)[0],2);t=f[0],n=f[1],e=u.items.find(function(e){return e.id===t})}return o.a.createElement("div",null,o.a.createElement(b,{latitude:c,longitude:r,onChange:this.handleLocationChange}),u.timestamp&&o.a.createElement("div",null,u.totalItems," blinkees loaded on ",new Date(u.timestamp).toString()),o.a.createElement("button",{onClick:this.handleReload},"Reload blinkee data"),e&&o.a.createElement("div",null,"Closest blinkee: ",o.a.createElement("a",{href:"https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=".concat(c,",").concat(r,"&destination=").concat(e.position.lat,",").concat(e.position.lng)},n," meters")))}},{key:"handleLocationChange",value:function(e){var t=this;return new Promise(function(n){var a=t.calculateDistances(e,t.state.vehicles);t.setState({location:e,distances:a},function(){return n()})})}},{key:"handleReload",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;return fetch("https://blinkee.city/api/regions/11/vehicles").then(function(e){return e.json()}).then(function(e){var t=e.data;return t.timestamp=+new Date,window.localStorage.setItem("blinkees",JSON.stringify(t)),t}).then(function(t){var n=e.calculateDistances(e.state.location,t);e.setState({vehicles:t,distances:n})})}},{key:"calculateDistances",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.latitude,n=e.longitude,a=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).items,o=void 0===a?[]:a;return t&&n?new Map(Object(l.a)(o).map(function(e){return Object.assign(Object(r.a)({distance:Math.round(1e3*m()(t,n,e.position.lat,e.position.lng))},e))}).sort(function(e,t){return e.distance<t.distance?-1:t.distance<e.distance?1:0}).map(function(e){return[e.id,e.distance]})):new Map}}]),t}(a.Component),j=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(o.a.createElement(k,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/blinkee",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/blinkee","/service-worker.js");j?(function(e,t){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):O(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):O(t,e)})}}()}},[[13,2,1]]]);
//# sourceMappingURL=main.64312e63.chunk.js.map