(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,n){t.exports=n(22)},18:function(t,e,n){},20:function(t,e,n){},22:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),i=n(8),c=n.n(i),l=(n(18),n(12)),r=n(11),s=n(10),u=n(2),d=n(3),h=n(5),v=n(4),m=n(6),f=n(1),p=(n(20),n(9)),g=n.n(p),w=function(t){return function(e){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}},b=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(h.a)(this,Object(v.a)(e).call(this,t))).state={},n}return Object(m.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){this.loadLocation().then(this.props.onChange)}},{key:"render",value:function(){var t=this.props,e=t.latitude,n=t.longitude;return o.a.createElement("div",null,(!e||!n)&&o.a.createElement("div",null,"Location access is required."),e&&n&&o.a.createElement("div",null,"Your location: ",o.a.createElement("a",{href:"https://www.google.com/maps/search/?api=1&query=".concat(e,",").concat(n)},w(4)(e),",",w(4)(n))))}},{key:"loadLocation",value:function(){var t=this;return new Promise(function(e,n){navigator.geolocation.getCurrentPosition(function(n){t.setState({location:n});var a=n.coords,o=a.latitude,i=a.longitude;e({latitude:o,longitude:i})},function(t){n(t)})})}}]),e}(a.Component),k=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(h.a)(this,Object(v.a)(e).call(this,t))).state={vehicles:JSON.parse(localStorage.getItem("blinkees"))||{}},n.handleLocationChange=n.handleLocationChange.bind(Object(f.a)(Object(f.a)(n))),n.handleReload=n.handleReload.bind(Object(f.a)(Object(f.a)(n))),n}return Object(m.a)(e,t),Object(d.a)(e,[{key:"componentDidMount",value:function(){this.state.vehicles.timestamp||this.loadData()}},{key:"render",value:function(){var t,e,n,a=this.state,i=a.location,c=(i=void 0===i?{}:i).latitude,l=i.longitude,r=a.vehicles,u=void 0===r?{}:r,d=a.distances,h=void 0===d?new Map:d;if(h.size>0){var v=Object(s.a)(Array.from(h)[0],2);e=v[0],n=v[1],t=u.items.find(function(t){return t.id===e})}return o.a.createElement("div",null,o.a.createElement(b,{latitude:c,longitude:l,onChange:this.handleLocationChange}),u.timestamp&&o.a.createElement("div",null,u.totalItems," blinkees loaded on ",new Date(u.timestamp).toString()),o.a.createElement("button",{onClick:this.handleReload},"Reload blinkee data"),t&&o.a.createElement("div",null,"Closest blinkee: ",o.a.createElement("a",{href:"https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=".concat(c,",").concat(l,"&destination=").concat(t.position.lat,",").concat(t.position.lng)},n," meters")))}},{key:"handleLocationChange",value:function(t){var e=this;return new Promise(function(n){var a=e.calculateDistances(t,e.state.vehicles);e.setState({location:t,distances:a},function(){return n()})})}},{key:"handleReload",value:function(){this.loadData()}},{key:"loadData",value:function(){var t=this;return fetch("https://blinkee.city/api/regions/11/vehicles").then(function(t){return t.json()}).then(function(t){var e=t.data;return e.timestamp=+new Date,window.localStorage.setItem("blinkees",JSON.stringify(e)),e}).then(function(e){var n=t.calculateDistances(t.state.location,e);t.setState({vehicles:e,distances:n})})}},{key:"calculateDistances",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.latitude,n=t.longitude,a=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).items,o=void 0===a?[]:a;return e&&n?new Map(Object(r.a)(o).map(function(t){return Object.assign(Object(l.a)({distance:Math.round(1e3*g()(e,n,t.position.lat,t.position.lng))},t))}).sort(function(t,e){return t.distance<e.distance?-1:e.distance<t.distance?1:0}).map(function(t){return[t.id,t.distance]})):new Map}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[13,2,1]]]);
//# sourceMappingURL=main.d55128ce.chunk.js.map