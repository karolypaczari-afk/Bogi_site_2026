// Backend API endpoint for sending emails via Hostinger SMTP
// Deploy this to your Hostinger server or use as a serverless function

const nodemailer = require('nodemailer');

// CORS headers for allowing requests from your domain
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://bogihorvath.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function sendEmail(req, res) {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).send();
  }

  if (req.method !== 'POST') {
    return res.status(405).set(corsHeaders).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, subject, topic, datetime } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).set(corsHeaders).json({
        error: 'Missing required fields: name, email, message'
      });
    }

    // Create transporter using Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com', // Hostinger SMTP server
      port: 465, // SSL port (use 587 for TLS)
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER || 'info@bogihorvath.com',
        pass: process.env.SMTP_PASS // Set this in your environment variables
      }
    });

    // Verify SMTP connection
    await transporter.verify();

    // Determine email subject
    const emailSubject = subject ||
      (topic ? `New Consultation Request from ${name}` : `New Contact Message from ${name}`);

    // Build email body
    let emailBody = `
<table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr style="background-color: #4b68e9;">
    <td colspan="2" style="padding: 20px; text-align: center; color: white; font-size: 24px; font-weight: bold;">
      ${emailSubject}
    </td>
  </tr>
  <tr>
    <td style="padding: 12px; background-color: #f0f4ff; font-weight: bold; border: 1px solid #e0e0e0; width: 30%;">
      Name
    </td>
    <td style="padding: 12px; border: 1px solid #e0e0e0;">
      ${name}
    </td>
  </tr>
  <tr>
    <td style="padding: 12px; background-color: #f0f4ff; font-weight: bold; border: 1px solid #e0e0e0;">
      Email
    </td>
    <td style="padding: 12px; border: 1px solid #e0e0e0;">
      <a href="mailto:${email}" style="color: #4b68e9;">${email}</a>
    </td>
  </tr>`;

    // Add optional fields for consultation requests
    if (topic) {
      emailBody += `
  <tr>
    <td style="padding: 12px; background-color: #f0f4ff; font-weight: bold; border: 1px solid #e0e0e0;">
      Topic
    </td>
    <td style="padding: 12px; border: 1px solid #e0e0e0;">
      ${topic}
    </td>
  </tr>`;
    }

    if (datetime) {
      emailBody += `
  <tr>
    <td style="padding: 12px; background-color: #f0f4ff; font-weight: bold; border: 1px solid #e0e0e0;">
      Preferred Date & Time
    </td>
    <td style="padding: 12px; border: 1px solid #e0e0e0;">
      ${new Date(datetime).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Brussels'
      })}
    </td>
  </tr>`;
    }

    emailBody += `
  <tr>
    <td style="padding: 12px; background-color: #f0f4ff; font-weight: bold; border: 1px solid #e0e0e0; vertical-align: top;">
      Message
    </td>
    <td style="padding: 12px; border: 1px solid #e0e0e0;">
      ${message.replace(/\n/g, '<br>')}
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 20px; text-align: center; background-color: #f8f9fa; border-top: 2px solid #4b68e9;">
      <p style="margin: 0; color: #666; font-size: 12px;">
        This email was sent from the contact form at <a href="https://bogihorvath.com" style="color: #4b68e9;">bogihorvath.com</a>
      </p>
    </td>
  </tr>
</table>`;

    // Email options
    const mailOptions = {
      from: `"Bogi Horvath Website" <info@bogihorvath.com>`,
      to: 'info@bogihorvath.com',
      cc: [
        'horvath.boglarka@hotmail.com',
        'karolypaczari@gmail.com',
        'hbogica1987@gmail.com'
      ].join(', '),
      replyTo: `"${name}" <${email}>`,
      subject: emailSubject,
      html: emailBody,
      text: `
Name: ${name}
Email: ${email}
${topic ? `Topic: ${topic}\n` : ''}
${datetime ? `Preferred Date & Time: ${new Date(datetime).toLocaleString()}\n` : ''}
Message: ${message}
      `.trim()
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).set(corsHeaders).json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);

    return res.status(500).set(corsHeaders).json({
      success: false,
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Export for different deployment platforms
module.exports = sendEmail;

// For Express.js
if (require.main === module) {
  const express = require('express');
  const app = express();

  app.use(express.json());
  app.post('/api/send-email', sendEmail);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Email API server running on port ${PORT}`);
  });
}
