# Form Submissions Dashboard & Email Configuration

## 📧 Email Recipients Configuration

All form submissions from https://bogihorvath.com are sent to the following addresses:

### **Primary Recipient:**
- `horvath.boglarka@hotmail.com` (receives all submissions)

### **CC Recipients:**
- `karolypaczari@gmail.com` (receives copy of all submissions)
- `hbogica1987@gmail.com` (receives copy of all submissions)

### **Reply-To:**
- Sender's email address (allows direct replies to inquirers)

---

## 🗄️ Form Submission Storage & Dashboard

All form submissions are automatically stored by FormSubmit.co and can be accessed through their dashboard.

### **Dashboard URL:**
https://formsubmit.co/forms/horvath.boglarka@hotmail.com

### **How to Access the Dashboard:**

1. **First-Time Setup** (One-time verification required):
   - Submit a test form from your website
   - Check `horvath.boglarka@hotmail.com` inbox for verification email
   - Click the verification link in the email
   - This activates form submission storage

2. **Access Stored Submissions**:
   - Visit: https://formsubmit.co/forms/horvath.boglarka@hotmail.com
   - Login with email: `horvath.boglarka@hotmail.com`
   - You'll receive a magic link to your email
   - Click the magic link to access the dashboard

3. **Dashboard Features**:
   - View all form submissions in chronological order
   - Filter by date range
   - Export submissions as CSV
   - View submission details (name, email, message, timestamp)
   - Delete old submissions if needed

---

## 📝 Form Types on Website

### **1. Contact Form** (`#contact` section)
**Fields:**
- Name
- Email
- Message

**Email Subject:** "New Contact Message from [Name]"

### **2. Booking/Consultation Modal** (Hero section button)
**Fields:**
- Name
- Email
- Topic (dropdown)
- Preferred Date & Time
- Brief Context (message)

**Email Subject:** "New Consultation Request from [Name]"

---

## ✅ Verification Checklist

After deploying to https://bogihorvath.com, verify:

### **Email Delivery Test:**
- [ ] Submit test from Contact Form
- [ ] Check `horvath.boglarka@hotmail.com` inbox
- [ ] Check `karolypaczari@gmail.com` inbox
- [ ] Check `hbogica1987@gmail.com` inbox
- [ ] Verify all 3 emails received identical copies

### **Dashboard Access Test:**
- [ ] Visit dashboard URL
- [ ] Request magic link login
- [ ] Check email for magic link
- [ ] Access dashboard successfully
- [ ] Verify test submission appears in dashboard
- [ ] Test CSV export functionality

### **Reply-To Test:**
- [ ] Reply to any received form submission email
- [ ] Verify reply goes to sender's email (not FormSubmit)

---

## 🔧 Technical Details

### **FormSubmit.co Configuration Parameters:**
```javascript
{
  _subject: "New Contact Message from [Name]",
  _template: "table",
  _cc: "karolypaczari@gmail.com,hbogica1987@gmail.com",
  _replyto: sender.email,
  _captcha: false
}
```

### **API Endpoint:**
```
POST https://formsubmit.co/ajax/horvath.boglarka@hotmail.com
Content-Type: application/json
```

### **Email Format:**
- **From:** noreply@formsubmit.co
- **To:** horvath.boglarka@hotmail.com
- **CC:** karolypaczari@gmail.com, hbogica1987@gmail.com
- **Reply-To:** [Sender's Email]
- **Format:** Table layout with all form fields

---

## 🚨 Important Notes

1. **Verification Required:** The first submission to each form requires email verification. Check all 3 inboxes for verification emails from FormSubmit.co.

2. **Dashboard Login:** Uses "magic link" authentication - no password needed. A new link is sent to your email each time you want to access the dashboard.

3. **Spam Folder:** If you don't receive form submissions, check spam/junk folders for all 3 email addresses.

4. **Rate Limiting:** FormSubmit.co has rate limits. If you receive many submissions in a short time, some may be delayed.

5. **Data Retention:** FormSubmit.co stores submissions indefinitely unless manually deleted from the dashboard.

---

## 📞 Support

If you experience issues with form submissions:

1. **Check FormSubmit Status:** https://formsubmit.co/status
2. **Verify Email Configuration:** Ensure all 3 email addresses are valid and can receive emails
3. **Test Forms:** Submit test messages and track delivery
4. **Alternative:** Use `mailto:` links as fallback

---

## 🎯 Quick Links

- **Website:** https://bogihorvath.com
- **Dashboard:** https://formsubmit.co/forms/horvath.boglarka@hotmail.com
- **FormSubmit Docs:** https://formsubmit.co/documentation
- **Support:** https://formsubmit.co/help

---

**Last Updated:** 2026-01-16
**Version:** 2.0 (Added hbogica1987@gmail.com CC)
