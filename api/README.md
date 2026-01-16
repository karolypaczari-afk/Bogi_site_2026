# Email API Backend

Custom email API backend for bogihorvath.com using Hostinger SMTP server.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Hostinger SMTP credentials
   ```

3. **Start server:**
   ```bash
   npm start
   ```

4. **Test the API:**
   ```bash
   curl -X POST http://localhost:3000/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## Configuration

### Hostinger SMTP Settings

- **Server:** smtp.hostinger.com
- **Port:** 465 (SSL) or 587 (TLS)
- **User:** info@bogihorvath.com
- **Pass:** (set in .env file)

### Email Recipients

- **Primary:** info@bogihorvath.com
- **CC:** horvath.boglarka@hotmail.com, karolypaczari@gmail.com, hbogica1987@gmail.com

## Documentation

See [HOSTINGER_SMTP_SETUP.md](./HOSTINGER_SMTP_SETUP.md) for complete deployment instructions and troubleshooting guide.

## Security

- Never commit `.env` file
- Use environment variables for sensitive data
- Enable CORS only for your domain
- Consider adding rate limiting in production

## Deployment

Supports deployment to:
- Hostinger VPS/Shared Hosting
- Vercel Serverless Functions
- Railway/Render
- Any Node.js hosting provider

See deployment guide in HOSTINGER_SMTP_SETUP.md for detailed instructions.
