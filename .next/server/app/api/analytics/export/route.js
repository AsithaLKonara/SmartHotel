"use strict";(()=>{var e={};e.id=2280,e.ids=[2280],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},25528:e=>{e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},86616:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>h,originalPathname:()=>f,patchFetch:()=>w,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>x,staticGenerationAsyncStorage:()=>y,staticGenerationBailout:()=>g});var a={};r.r(a),r.d(a,{GET:()=>c});var n=r(95419),s=r(69108),o=r(99678),i=r(78070),l=r(81355),p=r(3205),u=r(76788);async function c(e){try{let t=await (0,l.getServerSession)(p.L);if(!t||!["SUPER_ADMIN","MANAGER"].includes(t.user.role))return i.Z.json({error:"Unauthorized"},{status:401});let{searchParams:r}=new URL(e.url),a=r.get("type")||"pdf",n=r.get("range")||"month";if("pdf"===a){let e=`SmartHotel Analytics Report
Generated on: ${(0,u.Z)(new Date,"MMMM d, yyyy")}
Date Range: ${n}

This is a placeholder for the PDF report.
In a real implementation, this would contain:
- Revenue summary
- Occupancy rates
- Booking statistics
- Top performing rooms
- Guest source analysis
- Monthly trends

The actual PDF would be generated using a library like jsPDF or puppeteer.`;return new i.Z(e,{headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="analytics-${n}-${(0,u.Z)(new Date,"yyyy-MM-dd")}.pdf"`}})}if("excel"!==a)return i.Z.json({error:'Invalid export type. Use "pdf" or "excel"'},{status:400});{let e=`SmartHotel Analytics Report - ${n}
Generated on: ${(0,u.Z)(new Date,"MMMM d, yyyy")}

Revenue Summary:
Total Revenue,10000
This Month,5000
This Week,1200
Today,200

Occupancy:
Current Rate,75%
Average Rate,70%
Trend,+5%

Bookings:
Total,150
Confirmed,120
Pending,20
Cancelled,10

This is a placeholder for the Excel report.
In a real implementation, this would be a proper .xlsx file
generated using a library like xlsx or exceljs.`;return new i.Z(e,{headers:{"Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","Content-Disposition":`attachment; filename="analytics-${n}-${(0,u.Z)(new Date,"yyyy-MM-dd")}.xlsx"`}})}}catch(e){return console.error("Error exporting analytics:",e),i.Z.json({error:"Failed to export analytics data"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/analytics/export/route",pathname:"/api/analytics/export",filename:"route",bundlePath:"app/api/analytics/export/route"},resolvedPagePath:"C:\\Users\\asith\\Documents\\SmartHotel\\app\\api\\analytics\\export\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:m,staticGenerationAsyncStorage:y,serverHooks:x,headerHooks:h,staticGenerationBailout:g}=d,f="/api/analytics/export/route";function w(){return(0,o.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:y})}},3205:(e,t,r)=>{r.d(t,{L:()=>l});var a=r(54896),n=r(86485),s=r(6521),o=r.n(s),i=r(44843);let l={adapter:(0,a.N)(i.Z),providers:[(0,n.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await i.Z.user.findUnique({where:{email:e.email}});return t&&await o().compare(e.password,t.password)?{id:t.id,email:t.email,name:t.name,role:t.role}:null}})],session:{strategy:"jwt",maxAge:86400,updateAge:3600},jwt:{maxAge:86400},callbacks:{jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.role=t.role),e),session:async({session:e,token:t})=>(t&&(e.user.id=t.id,e.user.role=t.role),e)},pages:{signIn:"/auth/signin"},secret:process.env.NEXTAUTH_SECRET,cookies:{sessionToken:{name:"next-auth.session-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0,maxAge:86400}},callbackUrl:{name:"next-auth.callback-url",options:{sameSite:"lax",path:"/",secure:!0}},csrfToken:{name:"next-auth.csrf-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}}}},44843:(e,t,r)=>{r.d(t,{Z:()=>n});let a=require("@prisma/client"),n=globalThis.prisma??new a.PrismaClient}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[1638,9990,5640,8070,7382,6788],()=>r(86616));module.exports=a})();