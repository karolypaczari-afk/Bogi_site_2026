# Hostinger SMTP Email Setup Guide

This guide explains how to set up and deploy the email API backend that uses Hostinger's SMTP server to send emails from your website.

---

## 🎯 Overview

**Current Setup:** FormSubmit.co (third-party service)
**New Setup:** Custom backend API using Hostinger SMTP
**Primary Email:** info@bogihorvath.com
**CC Recipients:** horvath.boglarka@hotmail.com, karolypaczari@gmail.com, hbogica1987@gmail.com

---

## 📋 Prerequisites

1. **Hostinger Email Account**
   - Email: info@bogihorvath.com
   - Password: (you should have this from Hostinger)

2. **Hostinger SMTP Settings**
   - **Server:** smtp.hostinger.com
   - **Port:** 465 (SSL) or 587 (TLS)
   - **Username:** info@bogihorvath.com
   - **Password:** Your email password

3. **Node.js** installed (v16 or higher)

---

## 🚀 Deployment Options

You have several options for deploying the email API:

### **Option 1: Deploy on Hostinger VPS/Shared Hosting (Recommended)**

If you have Node.js support on your Hostinger hosting:

1. **Upload the `/api` folder to your Hostinger server**
   - Use FTP/SFTP or Hostinger File Manager
   - Upload to: `/path/to/your/domain/api/`

2. **Install dependencies**
   ```bash
   cd /path/to/your/domain/api
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   nano .env
   ```

   Add your credentials:
   ```env
   SMTP_USER=info@bogihorvath.com
   SMTP_PASS=your_actual_password_here
   PORT=3000
   NODE_ENV=production
   ALLOWED_ORIGIN=https://bogihorvath.com
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Set up PM2 for auto-restart** (recommended)
   ```bash
   npm install -g pm2
   pm2 start send-email.js --name bogihorvath-email-api
   pm2 save
   pm2 startup
   ```

6. **Configure reverse proxy** (if needed)
   - Set up Nginx or Apache to proxy requests to the Node.js server
   - Example Nginx configuration:
   ```nginx
   location /api/send-email {
       proxy_pass http://localhost:3000/api/send-email;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

---

### **Option 2: Deploy as Serverless Function (Vercel/Netlify)**

#### **Vercel Deployment:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json` in the root**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/send-email.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/send-email",
         "dest": "api/send-email.js"
       }
     ],
     "env": {
       "SMTP_USER": "info@bogihorvath.com",
       "SMTP_PASS": "@smtp_pass"
     }
   }
   ```

3. **Add environment variables in Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add `SMTP_PASS` with your email password

4. **Deploy**
   ```bash
   vercel --prod
   ```

---

### **Option 3: Deploy on Railway/Render**

1. **Push code to GitHub**
2. **Connect your GitHub repo to Railway or Render**
3. **Set environment variables in the dashboard:**
   - `SMTP_USER=info@bogihorvath.com`
   - `SMTP_PASS=your_password`
   - `PORT=3000`
4. **Deploy automatically**

---

## 🔧 Frontend Integration

After deploying the backend, update your frontend forms:

### **Contact Form** (`components/Sections/Contact.tsx`)

Replace the fetch URL:
```javascript
// OLD (FormSubmit.co)
const response = await fetch('https://formsubmit.co/ajax/horvath.boglarka@hotmail.com', {

// NEW (Your Hostinger SMTP API)
const response = await fetch('https://bogihorvath.com/api/send-email', {
```

### **Booking Modal** (`components/Modals/BookingModal.tsx`)

Replace the fetch URL:
```javascript
// OLD (FormSubmit.co)
const response = await fetch('https://formsubmit.co/ajax/horvath.boglarka@hotmail.com', {

// NEW (Your Hostinger SMTP API)
const response = await fetch('https://bogihorvath.com/api/send-email', {
```

Remove FormSubmit-specific fields (`_subject`, `_template`, `_cc`, `_captcha`) as they're now handled by the backend.

---

## 🧪 Testing

### **Test the API locally:**

1. **Start the server**
   ```bash
   cd api
   npm install
   npm start
   ```

2. **Test with cURL**
   ```bash
   curl -X POST http://localhost:3000/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "message": "This is a test message"
     }'
   ```

3. **Check your inbox**
   - info@bogihorvath.com should receive the email
   - CC recipients should also receive copies

---

## 🔐 Security Best Practices

1. **Never commit `.env` file to Git**
   - Add `.env` to `.gitignore`
   - Only commit `.env.example`

2. **Use environment variables for sensitive data**
   - SMTP password
   - API keys
   - Database credentials

3. **Enable CORS only for your domain**
   - Restrict `Access-Control-Allow-Origin` to `https://bogihorvath.com`

4. **Rate limiting** (recommended)
   - Add rate limiting to prevent abuse
   - Example using `express-rate-limit`:
   ```javascript
   const rateLimit = require('express-rate-limit');

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5 // limit each IP to 5 requests per windowMs
   });

   app.use('/api/send-email', limiter);
   ```

5. **Input validation**
   - The API already validates required fields
   - Consider adding email format validation
   - Sanitize inputs to prevent injection attacks

---

## 🐛 Troubleshooting

### **Email not sending:**

1. **Check SMTP credentials**
   ```bash
   node -e "require('./send-email.js')"
   ```

2. **Verify Hostinger SMTP settings**
   - Login to Hostinger webmail
   - Check SMTP server and port
   - Ensure email account is active

3. **Check server logs**
   ```bash
   pm2 logs bogihorvath-email-api
   ```

### **CORS errors:**

1. **Verify CORS headers in API**
   - Check `Access-Control-Allow-Origin` matches your domain
   - Ensure preflight OPTIONS requests are handled

2. **Check browser console**
   - Look for specific CORS error messages
   - Verify frontend is using HTTPS (not HTTP)

### **Port already in use:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm start
```

---

## 📊 Monitoring

### **Check email delivery:**

1. **Server logs**
   ```bash
   tail -f /path/to/logs/email-api.log
   ```

2. **Email bounce messages**
   - Monitor info@bogihorvath.com for bounce notifications
   - Check Hostinger webmail spam folder

3. **PM2 monitoring** (if using PM2)
   ```bash
   pm2 monit
   pm2 logs
   ```

---

## 🔄 Migration Steps

To switch from FormSubmit.co to Hostinger SMTP:

1. ✅ **Deploy backend API** (follow deployment steps above)
2. ✅ **Test API** with cURL or Postman
3. ✅ **Update frontend forms** to use new API endpoint
4. ✅ **Build and deploy frontend**
5. ✅ **Test on production** by submitting forms
6. ✅ **Monitor for 24 hours** to ensure emails deliver correctly
7. ✅ **Remove old FormSubmit.co code** (optional)

---

## 📞 Support

If you encounter issues:

1. **Check Hostinger documentation:** https://support.hostinger.com/
2. **Review server logs**
3. **Test SMTP connection** using a tool like Telnet or MailHog
4. **Contact Hostinger support** for SMTP-related issues

---

## 📝 API Endpoint Details

### **POST /api/send-email**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "subject": "Optional custom subject",
  "topic": "Optional (for consultation requests)",
  "datetime": "Optional (for consultation requests)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "messageId": "<unique-message-id>",
  "message": "Email sent successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to send email",
  "details": "Error description (dev mode only)"
}
```

---

**Last Updated:** 2026-01-16
**Version:** 1.0 (Initial Hostinger SMTP setup)
