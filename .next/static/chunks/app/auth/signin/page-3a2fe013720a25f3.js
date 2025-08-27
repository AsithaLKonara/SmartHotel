(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[98],{77216:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},99670:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},59325:function(e,t,r){Promise.resolve().then(r.bind(r,75158))},75158:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return y}});var a=r(57437),s=r(2265),o=r(82749),i=r(24033),n=r(61396),l=r.n(n),d=r(98253),c=r(77216),u=r(99670),p=r(85754),m=r(27815),f=r(5925);function y(){let[e,t]=(0,s.useState)(""),[r,n]=(0,s.useState)(""),[y,g]=(0,s.useState)(!1),[h,x]=(0,s.useState)(!1),b=(0,i.useRouter)(),v=async t=>{t.preventDefault(),x(!0);try{let t=await (0,o.signIn)("credentials",{email:e,password:r,redirect:!1});if(null==t?void 0:t.error)f.default.error("Invalid email or password");else{let e=await (0,o.getSession)();(null==e?void 0:e.user.role)==="GUEST"?b.push("/"):b.push("/admin"),f.default.success("Signed in successfully")}}catch(e){f.default.error("An error occurred during sign in")}finally{x(!1)}};return(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"max-w-md w-full space-y-8",children:[(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900",children:(0,a.jsx)(d.Z,{className:"h-6 w-6 text-primary-600 dark:text-primary-400"})}),(0,a.jsx)("h2",{className:"mt-6 text-3xl font-bold text-gray-900 dark:text-white",children:"Sign in to SmartHotel"}),(0,a.jsx)("p",{className:"mt-2 text-sm text-gray-600 dark:text-gray-400",children:"Access your account to manage bookings and hotel operations"})]}),(0,a.jsxs)(m.Zb,{children:[(0,a.jsxs)(m.Ol,{children:[(0,a.jsx)(m.ll,{children:"Welcome back"}),(0,a.jsx)(m.SZ,{children:"Enter your credentials to access your account"})]}),(0,a.jsxs)(m.aY,{children:[(0,a.jsxs)("form",{onSubmit:v,className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Email address"}),(0,a.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,value:e,onChange:e=>t(e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Enter your email"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"password",name:"password",type:y?"text":"password",autoComplete:"current-password",required:!0,value:r,onChange:e=>n(e.target.value),className:"block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Enter your password"}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>g(!y),children:y?(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(u.Z,{className:"h-5 w-5 text-gray-400"})})]})]}),(0,a.jsx)(p.z,{type:"submit",disabled:h,className:"w-full",children:h?"Signing in...":"Sign in"})]}),(0,a.jsx)("div",{className:"mt-6 text-center",children:(0,a.jsxs)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Don't have an account?"," ",(0,a.jsx)(l(),{href:"/auth/signup",className:"font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400",children:"Sign up"})]})})]})]})]})})}},85754:function(e,t,r){"use strict";r.d(t,{z:function(){return l}});var a=r(57437),s=r(2265),o=r(96061),i=r(1657);let n=(0,o.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),l=s.forwardRef((e,t)=>{let{className:r,variant:s,size:o,asChild:l=!1,...d}=e;return(0,a.jsx)("button",{className:(0,i.cn)(n({variant:s,size:o,className:r})),ref:t,...d})});l.displayName="Button"},27815:function(e,t,r){"use strict";r.d(t,{Ol:function(){return n},SZ:function(){return d},Zb:function(){return i},aY:function(){return c},ll:function(){return l}});var a=r(57437),s=r(2265),o=r(1657);let i=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...s})});i.displayName="Card";let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("flex flex-col space-y-1.5 p-6",r),...s})});n.displayName="CardHeader";let l=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("h3",{ref:t,className:(0,o.cn)("text-2xl font-semibold leading-none tracking-tight",r),...s})});l.displayName="CardTitle";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("p",{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",r),...s})});d.displayName="CardDescription";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("p-6 pt-0",r),...s})});c.displayName="CardContent",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("flex items-center p-6 pt-0",r),...s})}).displayName="CardFooter"},1657:function(e,t,r){"use strict";r.d(t,{T4:function(){return i},cn:function(){return o},p6:function(){return n}});var a=r(57042),s=r(74769);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,a.W)(t))}function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"USD";return new Intl.NumberFormat("en-US",{style:"currency",currency:t}).format(e)}function n(e){return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e))}},24033:function(e,t,r){e.exports=r(15313)},5925:function(e,t,r){"use strict";let a,s;r.r(t),r.d(t,{CheckmarkIcon:function(){return J},ErrorIcon:function(){return B},LoaderIcon:function(){return V},ToastBar:function(){return en},ToastIcon:function(){return et},Toaster:function(){return eu},default:function(){return ep},resolveValue:function(){return N},toast:function(){return Z},useToaster:function(){return H},useToasterStore:function(){return I}});var o,i=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?p(i,o):o+"{"+p(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=p(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=p.p?p.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},m={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},y=(e,t,r,a,s)=>{var o;let i=f(e),n=m[i]||(m[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!m[n]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);m[n]=p(s?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&m.g?m.g:null;return r&&(m.g=m[n]),o=m[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),n},g=(e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return y(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let x,b,v,w=h.bind({k:1});function j(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=h.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),x(d,n)}return t?t(s):s}}var k=e=>"function"==typeof e,N=(e,t)=>k(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},S=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return S(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},D=[],$={toasts:[],pausedAt:void 0},O=e=>{$=S($,e),D.forEach(e=>{e($)})},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={})=>{let[t,r]=(0,i.useState)($),a=(0,i.useRef)($);(0,i.useEffect)(()=>(a.current!==$&&r($),D.push(r),()=>{let e=D.indexOf(r);e>-1&&D.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},T=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),A=e=>(t,r)=>{let a=T(t,e,r);return O({type:2,toast:a}),a.id},Z=(e,t)=>A("blank")(e,t);Z.error=A("error"),Z.success=A("success"),Z.loading=A("loading"),Z.custom=A("custom"),Z.dismiss=e=>{O({type:3,toastId:e})},Z.remove=e=>O({type:4,toastId:e}),Z.promise=(e,t,r)=>{let a=Z.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?N(t.success,e):void 0;return s?Z.success(s,{id:a,...r,...null==r?void 0:r.success}):Z.dismiss(a),e}).catch(e=>{let s=t.error?N(t.error,e):void 0;s?Z.error(s,{id:a,...r,...null==r?void 0:r.error}):Z.dismiss(a)}),e};var _=(e,t)=>{O({type:1,toast:{id:e,height:t}})},F=()=>{O({type:5,time:Date.now()})},M=new Map,P=1e3,R=(e,t=P)=>{if(M.has(e))return;let r=setTimeout(()=>{M.delete(e),O({type:4,toastId:e})},t);M.set(e,r)},H=e=>{let{toasts:t,pausedAt:r}=I(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&Z.dismiss(t.id);return}return setTimeout(()=>Z.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,i.useCallback)(()=>{r&&O({type:6,time:Date.now()})},[r]),s=(0,i.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=r||{},i=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)R(e.id,e.removeDelay);else{let t=M.get(e.id);t&&(clearTimeout(t),M.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:_,startPause:F,endPause:a,calculateOffset:s}}},U=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,W=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=w`
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
}`,J=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
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
`,K=j("div")`
  position: absolute;
`,Q=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?i.createElement(ee,null,t):t:"blank"===r?null:i.createElement(Q,null,i.createElement(V,{...a}),"loading"!==r&&i.createElement(K,null,"error"===r?i.createElement(B,{...a}):i.createElement(J,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=j("div")`
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
`,eo=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=i.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(et,{toast:e}),n=i.createElement(eo,{...e.ariaProps},N(e.message,e));return i.createElement(es,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,p.p=void 0,x=o,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=i.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return i.createElement("div",{ref:o,className:t,style:r},s)},ed=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ec=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=H(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,n=ed(o,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return i.createElement(el,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:n},"custom"===r.type?N(r.message,r):s?s(r):i.createElement(en,{toast:r,position:o}))}))},ep=Z}},function(e){e.O(0,[250,749,284,971,938,744],function(){return e(e.s=59325)}),_N_E=e.O()}]);