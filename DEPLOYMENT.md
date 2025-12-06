# Deployment Guide for Vercel

## Quick Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"

## Important Notes

### Storage Solution

The app currently uses **in-memory storage** on Vercel, which means:
- ✅ Works immediately without setup
- ❌ Data resets on each deployment
- ❌ Not suitable for production with real users

### For Production Use

If you need persistent data, you have these options:

#### Option 1: Vercel KV (Redis)
```bash
# Install Vercel KV
npm install @vercel/kv

# Add to your Vercel project dashboard:
# Storage → KV → Create Database
```

#### Option 2: Vercel Postgres
```bash
# Install Vercel Postgres
npm install @vercel/postgres

# Add to your Vercel project dashboard:
# Storage → Postgres → Create Database
```

#### Option 3: External Database
- MongoDB Atlas
- Supabase
- PlanetScale
- Any other cloud database

## Environment Variables

If you add a database, set these in Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add your database connection strings

## Build Configuration

The app is configured to automatically detect Vercel environment:
- **Development**: Uses file-based storage (`lib/storage.ts`)
- **Production/Vercel**: Uses in-memory storage (`lib/storage-vercel.ts`)

## Troubleshooting

### Error: "EROFS: read-only file system"
This means you're trying to write to the file system on Vercel. The app now automatically uses in-memory storage on Vercel.

### Error: "Module not found"
Run `npm install` before deploying:
```bash
npm install
```

### Build fails
Check the build logs in Vercel dashboard and ensure all dependencies are in `package.json`.

## Admin Access

After deployment:
1. Visit `https://your-app.vercel.app/admin`
2. Use the default credentials (you should change these!)
3. Note: Changes will reset on redeployment with in-memory storage

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Recommended Next Steps

1. ✅ Deploy to Vercel (works immediately)
2. ⚠️ Set up persistent database (for production)
3. 🔒 Implement proper authentication (current is basic)
4. 📸 Set up image hosting (Vercel Blob, Cloudinary, etc.)
5. 🔐 Add environment variables for sensitive data
