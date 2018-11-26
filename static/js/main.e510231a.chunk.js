(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(27),i=n.n(r),c=(n(62),n(11)),l=n(12),u=n(14),s=n(13),p=n(15),d=n(17),h=n(118),m=n(119),f=n(23),g=n.n(f),v=n(54),b=n.n(v),E=n(56);function w(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=function(e){d.a.set(Object(E.a)({page:e},n)),d.a.pageview(e)};return function(n){function a(){return Object(c.a)(this,a),Object(u.a)(this,Object(s.a)(a).apply(this,arguments))}return Object(p.a)(a,n),Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.location.pathname;r(e)}},{key:"componentWillReceiveProps",value:function(e){var t=this.props.location.pathname,n=e.location.pathname;t!==n&&r(n)}},{key:"render",value:function(){return o.a.createElement(e,Object.assign({},this.props,t))}}]),a}(a.Component)}var y=n(22),k=n.n(y),j=n(51),O=n.n(j),D=n(29),C=n.n(D),T=n(18),U=n.n(T),x=n(21),B=n.n(x),I=n(52),S=n.n(I),W=n(28),A=n.n(W),F="http://notepad.ahmet.se:3001",L=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={data:[],message:null,idToUpdate:null,objectToUpdate:null},n.getDataFromDb=function(){fetch("".concat(F,"/api/getData")).then(function(e){return e.json()}).then(function(e){return n.setState({data:e.data})})},n.putDataToDB=function(e){k.a.post("".concat(F,"/api/putData"),{message:e}),n.refreshUI()},n.deleteFromDB=function(e){k.a.delete("".concat(F,"/api/deleteData"),{data:{_id:e}}),n.refreshUI()},n.updateDB=function(e,t){k.a.post("".concat(F,"/api/updateData"),{id:e,update:{message:t}}),n.refreshUI()},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.data;return o.a.createElement(O.a,null,o.a.createElement(S.a,{className:"justify-content-md-center"},o.a.createElement(B.a,{md:12},o.a.createElement(U.a,null,o.a.createElement(U.a.Body,null,o.a.createElement(U.a.Title,null,o.a.createElement(A.a.Group,{controlId:"exampleForm.ControlTextarea1"},o.a.createElement(A.a.Control,{as:"textarea",rows:"3",onChange:function(t){return e.setState({message:t.target.value})},placeholder:"add something in the database"}))),o.a.createElement(C.a,{onClick:function(){return e.putDataToDB(e.state.message)}},"Save")))),t.length<=0?"You have not taken any notes.":t.map(function(t){return o.a.createElement(B.a,{md:12},o.a.createElement(U.a,null,o.a.createElement(U.a.Body,null,o.a.createElement(U.a.Title,null,t.message),o.a.createElement(C.a,{variant:"danger",onClick:function(){return e.deleteFromDB(t._id)}},"Delete"))))})),o.a.createElement("div",{style:{padding:"10px"}},o.a.createElement("input",{type:"text",style:{width:"200px"},onChange:function(t){return e.setState({idToUpdate:t.target.value})},placeholder:"id of item to update here"}),o.a.createElement("input",{type:"text",style:{width:"200px"},onChange:function(t){return e.setState({updateToApply:t.target.value})},placeholder:"put new value of the item here"}),o.a.createElement("button",{onClick:function(){return e.updateDB(e.state.idToUpdate,e.state.updateToApply)}},"UPDATE")))}},{key:"componentDidMount",value:function(){this.refreshUI()}},{key:"refreshUI",value:function(){this.getDataFromDb()}}]),t}(a.Component),M=[{component:L,link:"Home"}],N=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={data:[]},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(h.a,null,o.a.createElement("div",null,o.a.createElement(g.a,{bg:"light",expand:"lg"},o.a.createElement(g.a.Brand,{href:"/#/home"},"Notepad"),o.a.createElement(b.a,{key:"info",variant:"info"},"Under construction - ",o.a.createElement(d.a.OutboundLink,{eventLabel:"https://github.com/ayildirim/notepad",to:"https://github.com/ayildirim/notepad",target:"_blank"},"See what's cooking")),o.a.createElement(g.a.Toggle,{"aria-controls":"basic-navbar-nav"})),o.a.createElement(m.a,{path:"/",exact:!0,component:w(L)}),M.map(function(e){return o.a.createElement(m.a,{path:"/".concat((t=e.link,t.replace(/\W+(.)/g,function(e,t){return t.toUpperCase()}))),exact:!0,component:w(e.component)});var t})))}}]),t}(a.Component),_=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){d.a.initialize("UA-129029377-1",{testMode:!1})}},{key:"render",value:function(){return o.a.createElement(N,null)}}]),t}(a.Component),J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}n(113);i.a.render(o.a.createElement(_,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");J?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):P(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):P(e)})}}()},57:function(e,t,n){e.exports=n(115)},62:function(e,t,n){}},[[57,2,1]]]);
//# sourceMappingURL=main.e510231a.chunk.js.map