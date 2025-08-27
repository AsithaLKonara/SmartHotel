"use strict";(()=>{var e={};e.id=1946,e.ids=[1946],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},25528:e=>{e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},63477:e=>{e.exports=require("querystring")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},61192:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>N,originalPathname:()=>M,patchFetch:()=>C,requestAsyncStorage:()=>_,routeModule:()=>S,serverHooks:()=>R,staticGenerationAsyncStorage:()=>I,staticGenerationBailout:()=>O});var a={};o.r(a),o.d(a,{GET:()=>f,POST:()=>k});var n=o(95419),r=o(69108),i=o(99678),s=o(78070),d=o(81355),l=o(3205),c=o(44843),p=o(25252),u=o(52178);class g{constructor(e){this.config=e,this.requests=new Map}isAllowed(e){let t=Date.now(),o=this.requests.get(e);return!o||t>o.resetTime?(this.requests.set(e,{count:1,resetTime:t+this.config.interval}),!0):!(o.count>=this.config.limit)&&(o.count++,!0)}getRemaining(e){let t=this.requests.get(e);return t?Math.max(0,this.config.limit-t.count):this.config.limit}getResetTime(e){let t=this.requests.get(e);return t?.resetTime||Date.now()+this.config.interval}}let m=new g({interval:9e5,limit:5}),E=new g({interval:6e4,limit:10}),h=new g({interval:6e4,limit:100});function T(e,t="api"){let o;let a=function(e){let t=e.headers.get("x-forwarded-for");return t?t.split(",")[0]:e.ip||"unknown"}(e);switch(t){case"auth":o=m;break;case"booking":o=E;break;default:o=h}return{allowed:o.isAllowed(a),remaining:o.getRemaining(a),resetTime:o.getResetTime(a)}}function x(e,t){let o=new Date(t).toISOString();return s.Z.json({error:"Too many requests",message:"Rate limit exceeded. Please try again later.",resetTime:o},{status:429,headers:{"X-RateLimit-Remaining":e.toString(),"X-RateLimit-Reset":o,"Retry-After":Math.ceil((t-Date.now())/1e3).toString()}})}var b=o(89391),w=o(91211),y=o(11896);let v=new w.Z(process.env.STRIPE_SECRET_KEY,{apiVersion:"2023-10-16"}),A=p.Ry({roomId:p.Z_().min(1,"Room ID is required"),checkIn:p.Z_().datetime(),checkOut:p.Z_().datetime(),guests:p.Rx().min(1).max(10),specialRequests:p.Z_().optional(),paymentMethod:p.Km(["pay_now","pay_later"]).default("pay_later")});async function f(e){let t=T(e,"api");if(!t.allowed)return x(t.remaining,t.resetTime);let o=await (0,d.getServerSession)(l.L);if(!o)return s.Z.json({error:"Unauthorized"},{status:401});try{let{searchParams:t}=new URL(e.url),a=t.get("status"),n=t.get("userId"),r={};a&&"all"!==a&&(r.status=a),n?r.userId=n:"GUEST"===o.user.role&&(r.userId=o.user.id);let i=await c.Z.booking.findMany({where:r,include:{room:!0,user:{select:{id:!0,name:!0,email:!0}},invoice:!0},orderBy:{createdAt:"desc"}});return s.Z.json(i)}catch(e){return console.error("Error fetching bookings:",e),s.Z.json({error:"Failed to fetch bookings"},{status:500})}}async function k(e){let t=T(e,"booking");if(!t.allowed)return x(t.remaining,t.resetTime);let o=await (0,d.getServerSession)(l.L);if(!o)return s.Z.json({error:"Unauthorized"},{status:401});try{let t=await e.json(),a=A.parse(t),n=await c.Z.room.findUnique({where:{id:a.roomId}});if(!n)return s.Z.json({error:"Room not found"},{status:404});if("AVAILABLE"!==n.status)return s.Z.json({error:"Room is not available"},{status:400});if(await c.Z.booking.findFirst({where:{roomId:a.roomId,status:{in:["PENDING","CONFIRMED","CHECKED_IN"]},OR:[{checkIn:{lt:new Date(a.checkOut)},checkOut:{gt:new Date(a.checkIn)}}]}}))return s.Z.json({error:"Room is not available for the selected dates"},{status:400});let r=new Date(a.checkIn),i=new Date(a.checkOut),d=Math.ceil((i.getTime()-r.getTime())/864e5),l=n.price*d,p=await c.Z.booking.create({data:{roomId:a.roomId,userId:o.user.id,checkIn:r,checkOut:i,guests:a.guests,totalAmount:l,specialRequests:a.specialRequests,status:"PENDING",paymentStatus:(a.paymentMethod,"PENDING")},include:{room:!0,user:{select:{id:!0,name:!0,email:!0}}}}),u=.1*l,g=await c.Z.invoice.create({data:{bookingId:p.id,amount:l,tax:u,total:l+u,dueDate:new Date(Date.now()+864e5),status:"PENDING"}}),m=null;"pay_now"===a.paymentMethod&&(m=await v.paymentIntents.create({amount:Math.round((l+u)*100),currency:"usd",metadata:{bookingId:p.id,roomId:n.id,userId:o.user.id},description:`Booking for Room ${n.number} - ${d} nights`}),await c.Z.booking.update({where:{id:p.id},data:{paymentIntentId:m.id}}));try{await (0,y.jJ)({guestName:o.user.name||"Guest",guestEmail:o.user.email,roomNumber:n.number,roomType:n.type,checkIn:r,checkOut:i,guests:a.guests,totalAmount:l,bookingId:p.id,specialRequests:a.specialRequests}),await (0,y.LR)({bookingId:p.id,guestName:o.user.name||"Guest",roomNumber:n.number,checkIn:r,checkOut:i,totalAmount:l})}catch(e){console.error("Failed to send email notifications:",e)}return await (0,b.ar)(e,o.user.id,b.sZ.BOOKING_CREATE,"Booking",p.id,{roomId:n.id,roomNumber:n.number,checkIn:a.checkIn,checkOut:a.checkOut,guests:a.guests,totalAmount:l,paymentMethod:a.paymentMethod}),s.Z.json({booking:{...p,invoice:g,paymentIntent:m?{id:m.id,clientSecret:m.client_secret}:null}},{status:201})}catch(e){if(e instanceof u.jm)return s.Z.json({error:"Validation error",details:e.errors},{status:400});return console.error("Error creating booking:",e),s.Z.json({error:"Failed to create booking"},{status:500})}}let S=new n.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/bookings/route",pathname:"/api/bookings",filename:"route",bundlePath:"app/api/bookings/route"},resolvedPagePath:"C:\\Users\\asith\\Documents\\SmartHotel\\app\\api\\bookings\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:_,staticGenerationAsyncStorage:I,serverHooks:R,headerHooks:N,staticGenerationBailout:O}=S,M="/api/bookings/route";function C(){return(0,i.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:I})}},89391:(e,t,o)=>{o.d(t,{ar:()=>i,sZ:()=>r});var a=o(44843);async function n(e){try{await a.Z.auditLog.create({data:{userId:e.userId||"",action:e.action,entityType:e.resource,entityId:e.resourceId||"",details:e.details||void 0,ipAddress:e.ipAddress||void 0,userAgent:e.userAgent||void 0}})}catch(e){console.error("Failed to create audit log:",e)}}let r={USER_LOGIN:"USER_LOGIN",USER_LOGOUT:"USER_LOGOUT",USER_REGISTER:"USER_REGISTER",USER_UPDATE:"USER_UPDATE",USER_DELETE:"USER_DELETE",STAFF_CREATE:"STAFF_CREATE",STAFF_UPDATE:"STAFF_UPDATE",STAFF_DELETE:"STAFF_DELETE",ROOM_CREATE:"ROOM_CREATE",ROOM_UPDATE:"ROOM_UPDATE",ROOM_DELETE:"ROOM_DELETE",ROOM_STATUS_CHANGE:"ROOM_STATUS_CHANGE",BOOKING_CREATE:"BOOKING_CREATE",BOOKING_UPDATE:"BOOKING_UPDATE",BOOKING_CANCEL:"BOOKING_CANCEL",BOOKING_STATUS_CHANGE:"BOOKING_STATUS_CHANGE",BOOKING_CHECK_IN:"BOOKING_CHECK_IN",BOOKING_CHECK_OUT:"BOOKING_CHECK_OUT",PAYMENT_CREATE:"PAYMENT_CREATE",PAYMENT_SUCCESS:"PAYMENT_SUCCESS",PAYMENT_FAILED:"PAYMENT_FAILED",PAYMENT_REFUND:"PAYMENT_REFUND",TASK_CREATE:"TASK_CREATE",TASK_ASSIGN:"TASK_ASSIGN",TASK_UPDATE:"TASK_UPDATE",TASK_COMPLETE:"TASK_COMPLETE",TASK_DELETE:"TASK_DELETE",INVENTORY_CREATE:"INVENTORY_CREATE",INVENTORY_UPDATE:"INVENTORY_UPDATE",INVENTORY_DELETE:"INVENTORY_DELETE",INVENTORY_ADJUST:"INVENTORY_ADJUST",SETTING_UPDATE:"SETTING_UPDATE",BACKUP_CREATE:"BACKUP_CREATE",SYSTEM_MAINTENANCE:"SYSTEM_MAINTENANCE"};async function i(e,t,o,a,r,i){let{ipAddress:s,userAgent:d}=function(e){let t=e.headers.get("x-forwarded-for");return{ipAddress:t?t.split(",")[0]:e.ip||"unknown",userAgent:e.headers.get("user-agent")||"unknown"}}(e);await n({userId:t,action:o,resource:a,resourceId:r,details:i,ipAddress:s,userAgent:d})}},3205:(e,t,o)=>{o.d(t,{L:()=>d});var a=o(54896),n=o(86485),r=o(6521),i=o.n(r),s=o(44843);let d={adapter:(0,a.N)(s.Z),providers:[(0,n.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await s.Z.user.findUnique({where:{email:e.email}});return t&&await i().compare(e.password,t.password)?{id:t.id,email:t.email,name:t.name,role:t.role}:null}})],session:{strategy:"jwt",maxAge:86400,updateAge:3600},jwt:{maxAge:86400},callbacks:{jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.role=t.role),e),session:async({session:e,token:t})=>(t&&(e.user.id=t.id,e.user.role=t.role),e)},pages:{signIn:"/auth/signin"},secret:process.env.NEXTAUTH_SECRET,cookies:{sessionToken:{name:"next-auth.session-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0,maxAge:86400}},callbackUrl:{name:"next-auth.callback-url",options:{sameSite:"lax",path:"/",secure:!0}},csrfToken:{name:"next-auth.csrf-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}}}},44843:(e,t,o)=>{o.d(t,{Z:()=>n});let a=require("@prisma/client"),n=globalThis.prisma??new a.PrismaClient},11896:(e,t,o)=>{o.d(t,{LR:()=>d,e0:()=>l,jJ:()=>s});var a=o(68140),n=o(76788);let r=null;async function i(e,t,o){if(!r)return console.warn("Email transporter not initialized"),!1;try{let a=await r.sendMail({from:`"SmartHotel" <${process.env.SMTP_USER}>`,to:e,subject:t,html:o});return console.log("Email sent:",a.messageId),!0}catch(e){return console.error("Failed to send email:",e),!1}}async function s(e){let t=function(e){let t=(0,n.Z)(e.checkIn,"EEEE, MMMM do, yyyy"),o=(0,n.Z)(e.checkOut,"EEEE, MMMM do, yyyy"),a=Math.ceil((e.checkOut.getTime()-e.checkIn.getTime())/864e5);return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - SmartHotel</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .total { font-weight: bold; font-size: 18px; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Thank you for choosing SmartHotel</p>
        </div>
        
        <div class="content">
          <p>Dear ${e.guestName},</p>
          
          <p>Your booking has been successfully confirmed! We're excited to welcome you to SmartHotel.</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>${e.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${e.roomNumber} - ${e.roomType}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${t}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${o}</span>
            </div>
            <div class="detail-row">
              <span><strong>Duration:</strong></span>
              <span>${a} night${a>1?"s":""}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guests:</strong></span>
              <span>${e.guests}</span>
            </div>
            <div class="detail-row total">
              <span><strong>Total Amount:</strong></span>
              <span>$${e.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          ${e.specialRequests?`
            <div class="booking-details">
              <h3>Special Requests</h3>
              <p>${e.specialRequests}</p>
            </div>
          `:""}

          <p><strong>Important Information:</strong></p>
          <ul>
            <li>Check-in time: 3:00 PM</li>
            <li>Check-out time: 11:00 AM</li>
            <li>Please bring a valid ID and the credit card used for booking</li>
            <li>Free cancellation up to 24 hours before check-in</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/my-bookings" class="button">View My Bookings</a>
          </div>

          <p>If you have any questions or need to modify your booking, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The SmartHotel Team</p>
        </div>
        
        <div class="footer">
          <p>SmartHotel | 123 Hotel Street, City, Country</p>
          <p>Phone: +1 (555) 123-4567 | Email: info@smarthotel.com</p>
        </div>
      </div>
    </body>
    </html>
  `}(e);return await i(e.guestEmail,"Booking Confirmation - SmartHotel",t)}async function d(e){let t=process.env.ADMIN_EMAIL||process.env.SMTP_USER;if(!t)return console.warn("Admin email not configured"),!1;let o=function(e){let t=(0,n.Z)(e.checkIn,"EEEE, MMMM do, yyyy"),o=(0,n.Z)(e.checkOut,"EEEE, MMMM do, yyyy");return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Alert - SmartHotel Admin</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .alert-box { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Booking Alert</h1>
          <p>SmartHotel Management System</p>
        </div>
        
        <div class="content">
          <div class="alert-box">
            <h3>New booking received!</h3>
            <p>A new booking has been made and requires your attention.</p>
          </div>
          
          <div class="booking-details">
            <h3>Booking Information</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>${e.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guest Name:</strong></span>
              <span>${e.guestName}</span>
            </div>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${e.roomNumber}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${t}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${o}</span>
            </div>
            <div class="detail-row">
              <span><strong>Total Amount:</strong></span>
              <span>$${e.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/admin/bookings" class="button">View Booking Details</a>
          </div>

          <p>Please review the booking and take any necessary actions.</p>
          
          <p>Best regards,<br>SmartHotel Management System</p>
        </div>
      </div>
    </body>
    </html>
  `}(e);return await i(t,"New Booking Alert - SmartHotel",o)}async function l(e,t,o,a,r,s){let d=function(e,t,o,a,r){let i=(0,n.Z)(r,"EEEE, MMMM do, yyyy"),s="CONFIRMED"===a?"#059669":"CANCELLED"===a?"#dc2626":"#d97706";return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Status Update - SmartHotel</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${s}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .status { font-size: 24px; font-weight: bold; color: ${s}; }
        .button { display: inline-block; background: ${s}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Booking Status Update</h1>
          <p>SmartHotel</p>
        </div>
        
        <div class="content">
          <p>Dear ${e},</p>
          
          <p>Your booking status has been updated.</p>
          
          <div class="status-box">
            <div class="status">${a.replace("_"," ")}</div>
            <p>Booking ID: ${t}</p>
            <p>Room: ${o}</p>
            <p>Check-in: ${i}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/my-bookings" class="button">View My Bookings</a>
          </div>

          <p>If you have any questions, please contact us.</p>
          
          <p>Best regards,<br>The SmartHotel Team</p>
        </div>
      </div>
    </body>
    </html>
  `}(t,o,a,r,s);return await i(e,`Booking ${r.replace("_"," ")} - SmartHotel`,d)}process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS?r=a.createTransport({host:process.env.SMTP_HOST,port:parseInt(process.env.SMTP_PORT||"587"),secure:"465"===process.env.SMTP_PORT,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}):console.warn("Email configuration not found. Email notifications will be disabled.")}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),a=t.X(0,[1638,9990,5640,8070,7382,5252,6788,8140,1211],()=>o(61192));module.exports=a})();