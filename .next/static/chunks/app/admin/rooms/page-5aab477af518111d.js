(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[565],{42482:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]])},49617:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]])},9883:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},41827:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},45367:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},49672:function(e,t,r){Promise.resolve().then(r.bind(r,46037))},46037:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var a=r(57437),s=r(2265),i=r(82749),n=r(9883),o=r(41827),l=r(42482),c=r(49617),d=r(45367),u=r(85754),m=r(27815),f=r(31478),p=r(5925);function h(){let[e,t]=(0,s.useState)([]),[r,h]=(0,s.useState)(!0),[x,g]=(0,s.useState)(""),[y,b]=(0,s.useState)("all"),[v,j]=(0,s.useState)("all"),[N,w]=(0,s.useState)(!1),[k,C]=(0,s.useState)(null),{data:E}=(0,i.useSession)();(0,s.useEffect)(()=>{A()},[]);let A=async()=>{try{let e=await fetch("/api/rooms");if(e.ok){let r=await e.json();t(r)}else p.default.error("Failed to fetch rooms")}catch(e){p.default.error("Error fetching rooms")}finally{h(!1)}},S=async e=>{if(confirm("Are you sure you want to delete this room?"))try{let t=await fetch("/api/rooms/".concat(e),{method:"DELETE"});if(t.ok)p.default.success("Room deleted successfully"),A();else{let e=await t.json();p.default.error(e.error||"Failed to delete room")}}catch(e){p.default.error("Error deleting room")}},z=async(e,t)=>{try{let r=await fetch("/api/rooms/".concat(e),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"AVAILABLE"===t?"MAINTENANCE":"AVAILABLE"})});if(r.ok)p.default.success("Room status updated successfully"),A();else{let e=await r.json();p.default.error(e.error||"Failed to update room status")}}catch(e){p.default.error("Error updating room status")}},D=e.filter(e=>{let t=e.number.toLowerCase().includes(x.toLowerCase())||e.type.toLowerCase().includes(x.toLowerCase()),r="all"===y||e.type===y,a="all"===v||e.status===v;return t&&r&&a});return r?(0,a.jsx)("div",{className:"min-h-screen bg-gray-50 dark:bg-gray-900",children:(0,a.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,a.jsxs)("div",{className:"animate-pulse",children:[(0,a.jsx)("div",{className:"h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[...Array(6)].map((e,t)=>(0,a.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6",children:[(0,a.jsx)("div",{className:"h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"}),(0,a.jsx)("div",{className:"h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"}),(0,a.jsx)("div",{className:"h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"})]},t))})]})})}):(0,a.jsx)("div",{className:"min-h-screen bg-gray-50 dark:bg-gray-900",children:(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold",children:"Room Management"}),(0,a.jsxs)(u.z,{onClick:()=>w(!0),className:"btn-primary",children:[(0,a.jsx)(n.Z,{className:"w-4 h-4 mr-2"}),"Add Room"]})]}),(0,a.jsx)(m.Zb,{className:"mb-6",children:(0,a.jsx)(m.aY,{className:"p-6",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Search"}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(o.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"}),(0,a.jsx)("input",{type:"text",placeholder:"Search rooms...",value:x,onChange:e=>g(e.target.value),className:"pl-10 input-field"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Type"}),(0,a.jsxs)("select",{value:y,onChange:e=>b(e.target.value),className:"input-field",children:[(0,a.jsx)("option",{value:"all",children:"All Types"}),(0,a.jsx)("option",{value:"Standard",children:"Standard"}),(0,a.jsx)("option",{value:"Deluxe",children:"Deluxe"}),(0,a.jsx)("option",{value:"Suite",children:"Suite"}),(0,a.jsx)("option",{value:"Presidential",children:"Presidential"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Status"}),(0,a.jsxs)("select",{value:v,onChange:e=>j(e.target.value),className:"input-field",children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"AVAILABLE",children:"Available"}),(0,a.jsx)("option",{value:"OCCUPIED",children:"Occupied"}),(0,a.jsx)("option",{value:"MAINTENANCE",children:"Maintenance"})]})]}),(0,a.jsx)("div",{className:"flex items-end",children:(0,a.jsxs)(u.z,{variant:"outline",onClick:()=>{g(""),b("all"),j("all")},className:"w-full",children:[(0,a.jsx)(l.Z,{className:"w-4 h-4 mr-2"}),"Clear Filters"]})})]})})}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:D.map(e=>(0,a.jsxs)(m.Zb,{className:"overflow-hidden",children:[(0,a.jsx)(m.Ol,{className:"pb-3",children:(0,a.jsxs)("div",{className:"flex justify-between items-start",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)(m.ll,{className:"text-xl",children:["Room ",e.number]}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:e.type})]}),(0,a.jsx)(f.C,{className:"AVAILABLE"===e.status?"bg-green-100 text-green-800":"OCCUPIED"===e.status?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800",children:e.status})]})}),(0,a.jsxs)(m.aY,{children:[(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-gray-600 dark:text-gray-300",children:"Price:"}),(0,a.jsxs)("span",{className:"font-semibold",children:["$",e.price,"/night"]})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-gray-600 dark:text-gray-300",children:"Capacity:"}),(0,a.jsxs)("span",{children:[e.capacity," guests"]})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("span",{className:"text-gray-600 dark:text-gray-300",children:"Amenities:"}),(0,a.jsxs)("span",{className:"text-sm",children:[e.amenities.slice(0,2).join(", "),"..."]})]})]}),(0,a.jsxs)("div",{className:"flex gap-2 mt-4",children:[(0,a.jsxs)(u.z,{variant:"outline",size:"sm",onClick:()=>C(e),className:"flex-1",children:[(0,a.jsx)(c.Z,{className:"w-4 h-4 mr-1"}),"Edit"]}),(0,a.jsx)(u.z,{variant:"outline",size:"sm",onClick:()=>z(e.id,e.status),className:"flex-1",children:"AVAILABLE"===e.status?"Set Maintenance":"Set Available"}),(0,a.jsx)(u.z,{variant:"outline",size:"sm",onClick:()=>S(e.id),className:"text-red-600 hover:text-red-700 hover:bg-red-50",children:(0,a.jsx)(d.Z,{className:"w-4 h-4"})})]})]})]},e.id))}),0===D.length&&(0,a.jsx)("div",{className:"text-center py-12",children:(0,a.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:"No rooms found matching your criteria."})}),N&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,a.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md",children:[(0,a.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Add New Room"}),(0,a.jsxs)("div",{className:"flex gap-2 mt-6",children:[(0,a.jsx)(u.z,{onClick:()=>w(!1),variant:"outline",className:"flex-1",children:"Cancel"}),(0,a.jsx)(u.z,{className:"flex-1",children:"Save Room"})]})]})}),k&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,a.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md",children:[(0,a.jsxs)("h2",{className:"text-xl font-bold mb-4",children:["Edit Room ",k.number]}),(0,a.jsxs)("div",{className:"flex gap-2 mt-6",children:[(0,a.jsx)(u.z,{onClick:()=>C(null),variant:"outline",className:"flex-1",children:"Cancel"}),(0,a.jsx)(u.z,{className:"flex-1",children:"Update Room"})]})]})})]})})}},31478:function(e,t,r){"use strict";r.d(t,{C:function(){return o}});var a=r(57437);r(2265);var s=r(96061),i=r(1657);let n=(0,s.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function o(e){let{className:t,variant:r,...s}=e;return(0,a.jsx)("div",{className:(0,i.cn)(n({variant:r}),t),...s})}},85754:function(e,t,r){"use strict";r.d(t,{z:function(){return l}});var a=r(57437),s=r(2265),i=r(96061),n=r(1657);let o=(0,i.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),l=s.forwardRef((e,t)=>{let{className:r,variant:s,size:i,asChild:l=!1,...c}=e;return(0,a.jsx)("button",{className:(0,n.cn)(o({variant:s,size:i,className:r})),ref:t,...c})});l.displayName="Button"},27815:function(e,t,r){"use strict";r.d(t,{Ol:function(){return o},SZ:function(){return c},Zb:function(){return n},aY:function(){return d},ll:function(){return l}});var a=r(57437),s=r(2265),i=r(1657);let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...s})});n.displayName="Card";let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",r),...s})});o.displayName="CardHeader";let l=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("h3",{ref:t,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",r),...s})});l.displayName="CardTitle";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("p",{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",r),...s})});c.displayName="CardDescription";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("p-6 pt-0",r),...s})});d.displayName="CardContent",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,i.cn)("flex items-center p-6 pt-0",r),...s})}).displayName="CardFooter"},1657:function(e,t,r){"use strict";r.d(t,{T4:function(){return n},cn:function(){return i},p6:function(){return o}});var a=r(57042),s=r(74769);function i(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,a.W)(t))}function n(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"USD";return new Intl.NumberFormat("en-US",{style:"currency",currency:t}).format(e)}function o(e){return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e))}},5925:function(e,t,r){"use strict";let a,s;r.r(t),r.d(t,{CheckmarkIcon:function(){return G},ErrorIcon:function(){return U},LoaderIcon:function(){return Y},ToastBar:function(){return eo},ToastIcon:function(){return et},Toaster:function(){return eu},default:function(){return em},resolveValue:function(){return k},toast:function(){return Z},useToaster:function(){return _},useToasterStore:function(){return T}});var i,n=r(2265);let o={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},f={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},h=(e,t,r,a,s)=>{var i;let n=p(e),o=f[n]||(f[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!f[o]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);f[o]=m(s?{["@keyframes "+o]:t}:t,r?"":"."+o)}let l=r&&f.g?f.g:null;return r&&(f.g=f[o]),i=f[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),o},x=(e,t,r)=>e.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,b,v,j=g.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:b&&b()},o),r.o=/ *go\d+/.test(l),o.className=g.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),v&&c[0]&&v(o),y(c,o)}return t?t(s):s}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,C=(a=0,()=>(++a).toString()),E=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},A=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return A(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},S=[],z={toasts:[],pausedAt:void 0},D=e=>{z=A(z,e),S.forEach(e=>{e(z)})},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=(e={})=>{let[t,r]=(0,n.useState)(z),a=(0,n.useRef)(z);(0,n.useEffect)(()=>(a.current!==z&&r(z),S.push(r),()=>{let e=S.indexOf(r);e>-1&&S.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},L=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),O=e=>(t,r)=>{let a=L(t,e,r);return D({type:2,toast:a}),a.id},Z=(e,t)=>O("blank")(e,t);Z.error=O("error"),Z.success=O("success"),Z.loading=O("loading"),Z.custom=O("custom"),Z.dismiss=e=>{D({type:3,toastId:e})},Z.remove=e=>D({type:4,toastId:e}),Z.promise=(e,t,r)=>{let a=Z.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?Z.success(s,{id:a,...r,...null==r?void 0:r.success}):Z.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?Z.error(s,{id:a,...r,...null==r?void 0:r.error}):Z.dismiss(a)}),e};var $=(e,t)=>{D({type:1,toast:{id:e,height:t}})},M=()=>{D({type:5,time:Date.now()})},R=new Map,P=1e3,F=(e,t=P)=>{if(R.has(e))return;let r=setTimeout(()=>{R.delete(e),D({type:4,toastId:e})},t);R.set(e,r)},_=e=>{let{toasts:t,pausedAt:r}=T(e);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&Z.dismiss(t.id);return}return setTimeout(()=>Z.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,n.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),s=(0,n.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=r||{},n=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,n.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)F(e.id,e.removeDelay);else{let t=R.get(e.id);t&&(clearTimeout(t),R.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:$,startPause:M,endPause:a,calculateOffset:s}}},V=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${q} 1s linear infinite;
`,J=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,G=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=N("div")`
  position: absolute;
`,Q=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(ee,null,t):t:"blank"===r?null:n.createElement(Q,null,n.createElement(Y,{...a}),"loading"!==r&&n.createElement(K,null,"error"===r?n.createElement(U,{...a}):n.createElement(G,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=N("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ei=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(et,{toast:e}),o=n.createElement(ei,{...e.ariaProps},k(e.message,e));return n.createElement(es,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ed=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:i,containerClassName:o})=>{let{toasts:l,handlers:c}=_(r);return n.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let i=r.position||t,o=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:o},"custom"===r.type?k(r.message,r):s?s(r):n.createElement(eo,{toast:r,position:i}))}))},em=Z}},function(e){e.O(0,[250,749,971,938,744],function(){return e(e.s=49672)}),_N_E=e.O()}]);