(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(t,e,n){t.exports=n(20)},16:function(t,e,n){},18:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),i=n(8),c=n.n(i),l=(n(16),n(10)),r=n(2),s=n(3),u=n(5),d=n(4),h=n(6),v=n(1),m=(n(18),n(9)),f=n.n(m),g=function(t){return function(e){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}},p=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(u.a)(this,Object(d.a)(e).call(this,t))).state={},n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.loadLocation().then(this.props.onChange)}},{key:"render",value:function(){var t=this.props,e=t.latitude,n=t.longitude;return o.a.createElement("div",null,(!e||!n)&&o.a.createElement("div",null,"Location access is required."),e&&n&&o.a.createElement("div",null,"Your location: ",o.a.createElement("a",{href:"https://www.google.com/maps/@".concat(e,",").concat(n)},g(4)(e),",",g(4)(n))))}},{key:"loadLocation",value:function(){var t=this;return new Promise(function(e,n){navigator.geolocation.getCurrentPosition(function(n){t.setState({location:n});var a=n.coords,o=a.latitude,i=a.longitude;e({latitude:o,longitude:i})},function(t){n(t)})})}}]),e}(a.Component),b=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(u.a)(this,Object(d.a)(e).call(this,t))).state={vehicles:JSON.parse(localStorage.getItem("blinkees"))||{}},n.handleLocationChange=n.handleLocationChange.bind(Object(v.a)(Object(v.a)(n))),n.handleReload=n.handleReload.bind(Object(v.a)(Object(v.a)(n))),n}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.state.vehicles.timestamp||this.loadData()}},{key:"render",value:function(){var t=this.state,e=t.location,n=(e=void 0===e?{}:e).latitude,a=e.longitude,i=t.vehicles,c=void 0===i?{}:i,l=t.distances,r=void 0===l?new Map:l;return o.a.createElement("div",null,o.a.createElement(p,{latitude:n,longitude:a,onChange:this.handleLocationChange}),c.timestamp&&o.a.createElement("div",null,c.totalItems," blinkees loaded on ",new Date(c.timestamp).toString()),o.a.createElement("button",{onClick:this.handleReload},"Reload blinkee data"),n&&a&&c.items&&c.items.length>0&&o.a.createElement("div",null,"Closest vehicle: ",Array.from(r)[0][1]," meters"))}},{key:"handleLocationChange",value:function(t){var e=this;return new Promise(function(n){var a=e.calculateDistances(t,e.state.vehicles);e.setState({location:t,distances:a},function(){return n()})})}},{key:"handleReload",value:function(){this.loadData()}},{key:"loadData",value:function(){var t=this;return fetch("https://blinkee.city/api/regions/11/vehicles").then(function(t){return t.json()}).then(function(t){var e=t.data;return e.timestamp=+new Date,window.localStorage.setItem("blinkees",JSON.stringify(e)),e}).then(function(e){var n=t.calculateDistances(t.state.location,e);t.setState({vehicles:e,distances:n})})}},{key:"calculateDistances",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.latitude,n=t.longitude,a=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).items;return new Map(Object(l.a)(a).map(function(t){return t.distance=Math.round(1e3*f()(e,n,t.position.lat,t.position.lng)),t}).sort(function(t,e){return t.distance<e.distance?-1:e.distance<t.distance?1:0}).map(function(t){return[t.id,t.distance]}))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[11,2,1]]]);
//# sourceMappingURL=main.7c870d92.chunk.js.map