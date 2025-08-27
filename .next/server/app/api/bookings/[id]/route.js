"use strict";(()=>{var e={};e.id=3570,e.ids=[3570],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},25528:e=>{e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},63477:e=>{e.exports=require("querystring")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},82522:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>y,originalPathname:()=>_,patchFetch:()=>k,requestAsyncStorage:()=>b,routeModule:()=>A,serverHooks:()=>v,staticGenerationAsyncStorage:()=>S,staticGenerationBailout:()=>f});var a={};o.r(a),o.d(a,{DELETE:()=>x,GET:()=>h,PATCH:()=>T});var r=o(95419),n=o(69108),s=o(99678),i=o(78070),d=o(81355),l=o(3205),p=o(44843),u=o(25252),c=o(52178),E=o(89391),g=o(11896);let m=u.Ry({status:u.Km(["PENDING","CONFIRMED","CHECKED_IN","CHECKED_OUT","CANCELLED"]).optional(),paymentStatus:u.Km(["PENDING","PAID","FAILED","REFUNDED"]).optional(),paymentMethod:u.Z_().optional(),specialRequests:u.Z_().optional()});async function h(e,{params:t}){try{let e=await (0,d.getServerSession)(l.L);if(!e)return i.Z.json({error:"Authentication required"},{status:401});let o=await p.Z.booking.findUnique({where:{id:t.id},include:{user:{select:{id:!0,name:!0,email:!0,phone:!0}},room:{select:{id:!0,number:!0,type:!0,price:!0,description:!0,amenities:!0}},invoice:!0}});if(!o)return i.Z.json({error:"Booking not found"},{status:404});if("GUEST"===e.user.role&&o.userId!==e.user.id)return i.Z.json({error:"Unauthorized"},{status:403});return i.Z.json(o)}catch(e){return console.error("Error fetching booking:",e),i.Z.json({error:"Failed to fetch booking"},{status:500})}}async function T(e,{params:t}){try{let o=await (0,d.getServerSession)(l.L);if(!o||!["SUPER_ADMIN","MANAGER","RECEPTIONIST"].includes(o.user.role))return i.Z.json({error:"Unauthorized"},{status:401});let a=await e.json(),r=m.parse(a),n=await p.Z.booking.findUnique({where:{id:t.id},include:{room:!0,user:{select:{id:!0,name:!0,email:!0}}}});if(!n)return i.Z.json({error:"Booking not found"},{status:404});let s=n.status,u=n.paymentStatus;r.status&&r.status!==n.status&&("CHECKED_IN"===r.status?await p.Z.room.update({where:{id:n.roomId},data:{status:"OCCUPIED"}}):("CHECKED_OUT"===r.status||"CANCELLED"===r.status)&&await p.Z.room.update({where:{id:n.roomId},data:{status:"AVAILABLE"}}));let c=await p.Z.booking.update({where:{id:t.id},data:r,include:{user:{select:{id:!0,name:!0,email:!0,phone:!0}},room:{select:{id:!0,number:!0,type:!0,price:!0}}}});try{r.status&&r.status!==s&&await (0,g.e0)(n.user.email,n.user.name||"Guest",n.id,n.room.number,r.status,n.checkIn)}catch(e){console.error("Failed to send status update email:",e)}return await (0,E.ar)(e,o.user.id,E.sZ.BOOKING_UPDATE,"Booking",n.id,{oldStatus:s,newStatus:r.status,oldPaymentStatus:u,newPaymentStatus:r.paymentStatus}),i.Z.json(c)}catch(e){if(e instanceof c.jm)return i.Z.json({error:"Validation error",details:e.errors},{status:400});return console.error("Error updating booking:",e),i.Z.json({error:"Failed to update booking"},{status:500})}}async function x(e,{params:t}){try{let e=await (0,d.getServerSession)(l.L);if(!e||"SUPER_ADMIN"!==e.user.role)return i.Z.json({error:"Unauthorized"},{status:401});let o=await p.Z.booking.findUnique({where:{id:t.id}});if(!o)return i.Z.json({error:"Booking not found"},{status:404});if(!["PENDING","CANCELLED"].includes(o.status))return i.Z.json({error:"Cannot delete active bookings"},{status:400});return await p.Z.booking.delete({where:{id:t.id}}),i.Z.json({message:"Booking deleted successfully"})}catch(e){return console.error("Error deleting booking:",e),i.Z.json({error:"Failed to delete booking"},{status:500})}}let A=new r.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/bookings/[id]/route",pathname:"/api/bookings/[id]",filename:"route",bundlePath:"app/api/bookings/[id]/route"},resolvedPagePath:"C:\\Users\\asith\\Documents\\SmartHotel\\app\\api\\bookings\\[id]\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:b,staticGenerationAsyncStorage:S,serverHooks:v,headerHooks:y,staticGenerationBailout:f}=A,_="/api/bookings/[id]/route";function k(){return(0,s.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:S})}},89391:(e,t,o)=>{o.d(t,{ar:()=>s,sZ:()=>n});var a=o(44843);async function r(e){try{await a.Z.auditLog.create({data:{userId:e.userId||"",action:e.action,entityType:e.resource,entityId:e.resourceId||"",details:e.details||void 0,ipAddress:e.ipAddress||void 0,userAgent:e.userAgent||void 0}})}catch(e){console.error("Failed to create audit log:",e)}}let n={USER_LOGIN:"USER_LOGIN",USER_LOGOUT:"USER_LOGOUT",USER_REGISTER:"USER_REGISTER",USER_UPDATE:"USER_UPDATE",USER_DELETE:"USER_DELETE",STAFF_CREATE:"STAFF_CREATE",STAFF_UPDATE:"STAFF_UPDATE",STAFF_DELETE:"STAFF_DELETE",ROOM_CREATE:"ROOM_CREATE",ROOM_UPDATE:"ROOM_UPDATE",ROOM_DELETE:"ROOM_DELETE",ROOM_STATUS_CHANGE:"ROOM_STATUS_CHANGE",BOOKING_CREATE:"BOOKING_CREATE",BOOKING_UPDATE:"BOOKING_UPDATE",BOOKING_CANCEL:"BOOKING_CANCEL",BOOKING_STATUS_CHANGE:"BOOKING_STATUS_CHANGE",BOOKING_CHECK_IN:"BOOKING_CHECK_IN",BOOKING_CHECK_OUT:"BOOKING_CHECK_OUT",PAYMENT_CREATE:"PAYMENT_CREATE",PAYMENT_SUCCESS:"PAYMENT_SUCCESS",PAYMENT_FAILED:"PAYMENT_FAILED",PAYMENT_REFUND:"PAYMENT_REFUND",TASK_CREATE:"TASK_CREATE",TASK_ASSIGN:"TASK_ASSIGN",TASK_UPDATE:"TASK_UPDATE",TASK_COMPLETE:"TASK_COMPLETE",TASK_DELETE:"TASK_DELETE",INVENTORY_CREATE:"INVENTORY_CREATE",INVENTORY_UPDATE:"INVENTORY_UPDATE",INVENTORY_DELETE:"INVENTORY_DELETE",INVENTORY_ADJUST:"INVENTORY_ADJUST",SETTING_UPDATE:"SETTING_UPDATE",BACKUP_CREATE:"BACKUP_CREATE",SYSTEM_MAINTENANCE:"SYSTEM_MAINTENANCE"};async function s(e,t,o,a,n,s){let{ipAddress:i,userAgent:d}=function(e){let t=e.headers.get("x-forwarded-for");return{ipAddress:t?t.split(",")[0]:e.ip||"unknown",userAgent:e.headers.get("user-agent")||"unknown"}}(e);await r({userId:t,action:o,resource:a,resourceId:n,details:s,ipAddress:i,userAgent:d})}},3205:(e,t,o)=>{o.d(t,{L:()=>d});var a=o(54896),r=o(86485),n=o(6521),s=o.n(n),i=o(44843);let d={adapter:(0,a.N)(i.Z),providers:[(0,r.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let t=await i.Z.user.findUnique({where:{email:e.email}});return t&&await s().compare(e.password,t.password)?{id:t.id,email:t.email,name:t.name,role:t.role}:null}})],session:{strategy:"jwt",maxAge:86400,updateAge:3600},jwt:{maxAge:86400},callbacks:{jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.role=t.role),e),session:async({session:e,token:t})=>(t&&(e.user.id=t.id,e.user.role=t.role),e)},pages:{signIn:"/auth/signin"},secret:process.env.NEXTAUTH_SECRET,cookies:{sessionToken:{name:"next-auth.session-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0,maxAge:86400}},callbackUrl:{name:"next-auth.callback-url",options:{sameSite:"lax",path:"/",secure:!0}},csrfToken:{name:"next-auth.csrf-token",options:{httpOnly:!0,sameSite:"lax",path:"/",secure:!0}}}}},44843:(e,t,o)=>{o.d(t,{Z:()=>r});let a=require("@prisma/client"),r=globalThis.prisma??new a.PrismaClient},11896:(e,t,o)=>{o.d(t,{LR:()=>d,e0:()=>l,jJ:()=>i});var a=o(68140),r=o(76788);let n=null;async function s(e,t,o){if(!n)return console.warn("Email transporter not initialized"),!1;try{let a=await n.sendMail({from:`"SmartHotel" <${process.env.SMTP_USER}>`,to:e,subject:t,html:o});return console.log("Email sent:",a.messageId),!0}catch(e){return console.error("Failed to send email:",e),!1}}async function i(e){let t=function(e){let t=(0,r.Z)(e.checkIn,"EEEE, MMMM do, yyyy"),o=(0,r.Z)(e.checkOut,"EEEE, MMMM do, yyyy"),a=Math.ceil((e.checkOut.getTime()-e.checkIn.getTime())/864e5);return`
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
  `}(e);return await s(e.guestEmail,"Booking Confirmation - SmartHotel",t)}async function d(e){let t=process.env.ADMIN_EMAIL||process.env.SMTP_USER;if(!t)return console.warn("Admin email not configured"),!1;let o=function(e){let t=(0,r.Z)(e.checkIn,"EEEE, MMMM do, yyyy"),o=(0,r.Z)(e.checkOut,"EEEE, MMMM do, yyyy");return`
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
  `}(e);return await s(t,"New Booking Alert - SmartHotel",o)}async function l(e,t,o,a,n,i){let d=function(e,t,o,a,n){let s=(0,r.Z)(n,"EEEE, MMMM do, yyyy"),i="CONFIRMED"===a?"#059669":"CANCELLED"===a?"#dc2626":"#d97706";return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Status Update - SmartHotel</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${i}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .status { font-size: 24px; font-weight: bold; color: ${i}; }
        .button { display: inline-block; background: ${i}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
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
            <p>Check-in: ${s}</p>
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
  `}(t,o,a,n,i);return await s(e,`Booking ${n.replace("_"," ")} - SmartHotel`,d)}process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS?n=a.createTransport({host:process.env.SMTP_HOST,port:parseInt(process.env.SMTP_PORT||"587"),secure:"465"===process.env.SMTP_PORT,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}):console.warn("Email configuration not found. Email notifications will be disabled.")}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),a=t.X(0,[1638,9990,5640,8070,7382,5252,6788,8140],()=>o(82522));module.exports=a})();