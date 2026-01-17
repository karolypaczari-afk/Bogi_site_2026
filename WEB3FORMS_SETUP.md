# Web3Forms Setup Guide

## What is Web3Forms?

Web3Forms is a free contact form API that sends form submissions directly to your email. It's perfect for static websites and requires no backend server.

**Features:**
- ✅ Free (250 submissions/month)
- ✅ No email verification required to start
- ✅ Works immediately after signup
- ✅ Secure & reliable
- ✅ AJAX/Fetch API support
- ✅ CC multiple recipients

## Quick Setup (2 minutes)

### Step 1: Get Your Access Key

1. Visit: **https://web3forms.com**
2. Enter your email: `info@bogihorvath.com` (or any email where you want to receive form submissions)
3. Click "Create Access Key"
4. **Check your email** - You'll receive your access key instantly
5. Copy the access key (it looks like: `a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6`)

### Step 2: Add Access Key to Your Project

1. Copy the `.env.example` file to create `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your access key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

3. Save the file

### Step 3: Restart Development Server

If your dev server is running, restart it to load the new environment variable:

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

### Step 4: Test the Form

1. Go to http://localhost:3000 on your website
2. Scroll to the contact form at the bottom
3. Fill in the form fields:
   - Name: Test User
   - Email: test@example.com
   - Message: Testing contact form
4. Click "Send Message"
5. Check if you receive a success message
6. **Check your inbox** (`info@bogihorvath.com`) - you should receive the email!

## Email Recipients

The contact form sends emails to:
1. **Primary:** `info@bogihorvath.com` (set in Web3Forms)
2. **CC:**
   - `karolypaczari@gmail.com`
   - `hbogica1987@gmail.com`
   - `info@bogihorvath.com`

## Deployment

When deploying to production (e.g., Hostinger, Vercel, Netlify):

1. **Add environment variable** in your hosting platform's settings:
   - Variable name: `VITE_WEB3FORMS_ACCESS_KEY`
   - Variable value: your access key

2. **Rebuild your application** so it includes the environment variable

3. Test the form on your live site

## Troubleshooting

### Form shows error message
- Check that your `.env` file exists and has the correct access key
- Restart your dev server
- Check browser console for any error messages

### Email not received
- Check spam/junk folder
- Verify the access key is correct
- Make sure you're using the email address you signed up with on Web3Forms

### Environment variable not working
- Make sure the variable starts with `VITE_` (required by Vite)
- Restart dev server after changing .env file
- Check that .env is in the project root directory

## Need Help?

- **Web3Forms Documentation:** https://docs.web3forms.com
- **Web3Forms Support:** https://web3forms.com/support
- **React Integration Guide:** https://web3forms.com/platforms/react-contact-form

## Security Note

The Web3Forms access key is **not a secret** and can be safely included in your public code. It only allows sending emails to the registered email address, nothing else.
