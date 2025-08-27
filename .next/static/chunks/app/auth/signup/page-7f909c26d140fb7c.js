(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[271],{77216:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},99670:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},74626:function(e,t,r){Promise.resolve().then(r.bind(r,70409))},70409:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var a=r(57437),s=r(2265),o=r(24033),n=r(61396),i=r.n(n),l=r(98253),d=r(77216),c=r(99670),u=r(85754),m=r(27815),p=r(5925);function f(){let[e,t]=(0,s.useState)({name:"",email:"",password:"",confirmPassword:"",phone:"",address:""}),[r,n]=(0,s.useState)(!1),[f,y]=(0,s.useState)(!1),[g,h]=(0,s.useState)(!1),x=(0,o.useRouter)(),b=(e,r)=>{t(t=>({...t,[e]:r}))},v=async t=>{if(t.preventDefault(),h(!0),e.password!==e.confirmPassword){p.default.error("Passwords do not match"),h(!1);return}if(e.password.length<6){p.default.error("Password must be at least 6 characters long"),h(!1);return}try{let t=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name,email:e.email,password:e.password,phone:e.phone,address:e.address})}),r=await t.json();t.ok?(p.default.success("Account created successfully! Please sign in."),x.push("/auth/signin")):p.default.error(r.error||"Failed to create account")}catch(e){p.default.error("An error occurred during registration")}finally{h(!1)}};return(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"max-w-md w-full space-y-8",children:[(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)("div",{className:"mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900",children:(0,a.jsx)(l.Z,{className:"h-6 w-6 text-primary-600 dark:text-primary-400"})}),(0,a.jsx)("h2",{className:"mt-6 text-3xl font-bold text-gray-900 dark:text-white",children:"Create your account"}),(0,a.jsx)("p",{className:"mt-2 text-sm text-gray-600 dark:text-gray-400",children:"Join SmartHotel to start booking and managing your stays"})]}),(0,a.jsxs)(m.Zb,{children:[(0,a.jsxs)(m.Ol,{children:[(0,a.jsx)(m.ll,{children:"Sign up"}),(0,a.jsx)(m.SZ,{children:"Create your account to access all features"})]}),(0,a.jsxs)(m.aY,{children:[(0,a.jsxs)("form",{onSubmit:v,className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Full Name"}),(0,a.jsx)("input",{id:"name",name:"name",type:"text",required:!0,value:e.name,onChange:e=>b("name",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Enter your full name"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Email address"}),(0,a.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,value:e.email,onChange:e=>b("email",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Enter your email"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Phone Number"}),(0,a.jsx)("input",{id:"phone",name:"phone",type:"tel",value:e.phone,onChange:e=>b("phone",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Enter your phone number"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"address",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Address"}),(0,a.jsx)("textarea",{id:"address",name:"address",rows:3,value:e.address,onChange:e=>b("address",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Enter your address"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"password",name:"password",type:r?"text":"password",required:!0,value:e.password,onChange:e=>b("password",e.target.value),className:"block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Create a password"}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>n(!r),children:r?(0,a.jsx)(d.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Confirm Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:f?"text":"password",required:!0,value:e.confirmPassword,onChange:e=>b("confirmPassword",e.target.value),className:"block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white",placeholder:"Confirm your password"}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>y(!f),children:f?(0,a.jsx)(d.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]}),(0,a.jsx)(u.z,{type:"submit",disabled:g,className:"w-full",children:g?"Creating account...":"Create account"})]}),(0,a.jsx)("div",{className:"mt-6 text-center",children:(0,a.jsxs)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Already have an account?"," ",(0,a.jsx)(i(),{href:"/auth/signin",className:"font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400",children:"Sign in"})]})})]})]})]})})}},85754:function(e,t,r){"use strict";r.d(t,{z:function(){return l}});var a=r(57437),s=r(2265),o=r(96061),n=r(1657);let i=(0,o.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),l=s.forwardRef((e,t)=>{let{className:r,variant:s,size:o,asChild:l=!1,...d}=e;return(0,a.jsx)("button",{className:(0,n.cn)(i({variant:s,size:o,className:r})),ref:t,...d})});l.displayName="Button"},27815:function(e,t,r){"use strict";r.d(t,{Ol:function(){return i},SZ:function(){return d},Zb:function(){return n},aY:function(){return c},ll:function(){return l}});var a=r(57437),s=r(2265),o=r(1657);let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...s})});n.displayName="Card";let i=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("flex flex-col space-y-1.5 p-6",r),...s})});i.displayName="CardHeader";let l=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("h3",{ref:t,className:(0,o.cn)("text-2xl font-semibold leading-none tracking-tight",r),...s})});l.displayName="CardTitle";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("p",{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",r),...s})});d.displayName="CardDescription";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("p-6 pt-0",r),...s})});c.displayName="CardContent",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,o.cn)("flex items-center p-6 pt-0",r),...s})}).displayName="CardFooter"},1657:function(e,t,r){"use strict";r.d(t,{T4:function(){return n},cn:function(){return o},p6:function(){return i}});var a=r(57042),s=r(74769);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,a.W)(t))}function n(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"USD";return new Intl.NumberFormat("en-US",{style:"currency",currency:t}).format(e)}function i(e){return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e))}},24033:function(e,t,r){e.exports=r(15313)},5925:function(e,t,r){"use strict";let a,s;r.r(t),r.d(t,{CheckmarkIcon:function(){return G},ErrorIcon:function(){return B},LoaderIcon:function(){return J},ToastBar:function(){return ei},ToastIcon:function(){return et},Toaster:function(){return eu},default:function(){return em},resolveValue:function(){return N},toast:function(){return T},useToaster:function(){return H},useToasterStore:function(){return z}});var o,n=r(2265);let i={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||i,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",a="",s="";for(let o in e){let n=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+n+";":a+="f"==o[1]?m(n,o):o+"{"+m(n,"k"==o[1]?"":t)+"}":"object"==typeof n?a+=m(n,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=n&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(o,n):o+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},y=(e,t,r,a,s)=>{var o;let n=f(e),i=p[n]||(p[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!p[i]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[i]=m(s?{["@keyframes "+i]:t}:t,r?"":"."+i)}let l=r&&p.g?p.g:null;return r&&(p.g=p[i]),o=p[i],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),i},g=(e,t,r)=>e.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return y(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}h.bind({g:1});let x,b,v,w=h.bind({k:1});function k(e,t){let r=this||{};return function(){let a=arguments;function s(o,n){let i=Object.assign({},o),l=i.className||s.className;r.p=Object.assign({theme:b&&b()},i),r.o=/ *go\d+/.test(l),i.className=h.apply(r,a)+(l?" "+l:""),t&&(i.ref=n);let d=e;return e[0]&&(d=i.as||e,delete i.as),v&&d[0]&&v(i),x(d,i)}return t?t(s):s}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,C=(a=0,()=>(++a).toString()),E=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},P=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return P(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},S=[],O={toasts:[],pausedAt:void 0},D=e=>{O=P(O,e),S.forEach(e=>{e(O)})},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,r]=(0,n.useState)(O),a=(0,n.useRef)(O);(0,n.useEffect)(()=>(a.current!==O&&r(O),S.push(r),()=>{let e=S.indexOf(r);e>-1&&S.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},A=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),F=e=>(t,r)=>{let a=A(t,e,r);return D({type:2,toast:a}),a.id},T=(e,t)=>F("blank")(e,t);T.error=F("error"),T.success=F("success"),T.loading=F("loading"),T.custom=F("custom"),T.dismiss=e=>{D({type:3,toastId:e})},T.remove=e=>D({type:4,toastId:e}),T.promise=(e,t,r)=>{let a=T.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?N(t.success,e):void 0;return s?T.success(s,{id:a,...r,...null==r?void 0:r.success}):T.dismiss(a),e}).catch(e=>{let s=t.error?N(t.error,e):void 0;s?T.error(s,{id:a,...r,...null==r?void 0:r.error}):T.dismiss(a)}),e};var Z=(e,t)=>{D({type:1,toast:{id:e,height:t}})},I=()=>{D({type:5,time:Date.now()})},_=new Map,M=1e3,R=(e,t=M)=>{if(_.has(e))return;let r=setTimeout(()=>{_.delete(e),D({type:4,toastId:e})},t);_.set(e,r)},H=e=>{let{toasts:t,pausedAt:r}=z(e);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&T.dismiss(t.id);return}return setTimeout(()=>T.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,n.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),s=(0,n.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=r||{},n=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),i=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<i&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,n.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)R(e.id,e.removeDelay);else{let t=_.get(e.id);t&&(clearTimeout(t),_.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:Z,startPause:I,endPause:a,calculateOffset:s}}},q=w`
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
}`,U=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${U} 0.15s ease-out forwards;
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
`,J=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,V=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=w`
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
}`,G=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,K=k("div")`
  position: absolute;
`,Q=k("div")`
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
}`,ee=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(ee,null,t):t:"blank"===r?null:n.createElement(Q,null,n.createElement(J,{...a}),"loading"!==r&&n.createElement(K,null,"error"===r?n.createElement(B,{...a}):n.createElement(G,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=k("div")`
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
`,eo=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=n.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},o=n.createElement(et,{toast:e}),i=n.createElement(eo,{...e.ariaProps},N(e.message,e));return n.createElement(es,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:o,message:i}):n.createElement(n.Fragment,null,o,i))});o=n.createElement,m.p=void 0,x=o,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let o=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:o,className:t,style:r},s)},ed=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ec=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:o,containerClassName:i})=>{let{toasts:l,handlers:d}=H(r);return n.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:i,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let o=r.position||t,i=ed(o,d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(el,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?ec:"",style:i},"custom"===r.type?N(r.message,r):s?s(r):n.createElement(ei,{toast:r,position:o}))}))},em=T}},function(e){e.O(0,[250,284,971,938,744],function(){return e(e.s=74626)}),_N_E=e.O()}]);