# Production Deployment Guide

## Setting up Visitor Tracking for Production

### Option 1: Vercel KV (Recommended for Vercel Deployments)

1. **Create a Vercel KV Database:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to **Storage** tab
   - Click **Create Database** → Select **KV (Redis)**
   - Give it a name (e.g., `attendance-calculator-kv`)

2. **Connect to Your Project:**
   - After creating the database, click **Connect to Project**
   - Select your project
   - Vercel will automatically add the required environment variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Add production visitor tracking"
   git push
   ```

### Option 2: Upstash Redis (Alternative)

1. **Create an Upstash Redis Database:**
   - Go to [Upstash Console](https://console.upstash.com/)
   - Create a new Redis database
   - Copy the REST API credentials

2. **Add Environment Variables:**
   In your Vercel project settings or `.env.local`:
   ```env
   KV_REST_API_URL=your_upstash_url
   KV_REST_API_TOKEN=your_upstash_token
   ```

### Development Mode

For local development, you can:
- Leave environment variables empty to use in-memory storage (data resets on restart)
- Or set up a local Redis instance and configure the environment variables

### Testing Production Setup

After deployment, the visitor tracking will:
- ✅ Persist data across server restarts
- ✅ Work in serverless/edge environments
- ✅ Track visitors accurately
- ✅ Scale automatically with traffic

### Environment Variables

Copy `.env.example` to `.env.local` for local development:
```bash
cp .env.example .env.local
```

Then add your credentials if you want to test with a real database locally.

## Features

- **Automatic Fallback:** Uses in-memory storage in development when KV is not configured
- **Production Ready:** Uses Redis for persistent, scalable storage in production
- **Serverless Compatible:** Works perfectly with Vercel's serverless functions
- **No Configuration Required:** Works out of the box in both dev and production

## Monitoring

Check your visitor statistics at:
- Local: `http://localhost:3000`
- Production: Your deployed URL

The counter updates every 5 seconds automatically.
