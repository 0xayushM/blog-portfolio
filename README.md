# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, React 19, and TailwindCSS 4.

## Features

### Public Website
- **Hero Section** - Eye-catching introduction with professional profile
- **About Section** - Detailed career journey and skills showcase
- **Books Section** - Display published books with descriptions
- **Blog Section** - YouTube video embeds with filtering by category
- **Contact Section** - Social media links and contact information
- **Responsive Design** - Optimized for all device sizes
- **Dark Theme** - Modern dark color scheme with blue accents
- **Smooth Animations** - Hover effects and transitions throughout

### Admin Panel (NEW! 🎉)
- **Secure Login** - Password-protected admin access at `/admin`
- **Profile Management** - Update name, title, bio, and profile image
- **Books Management** - Add, edit, and delete published books
- **Blog Management** - Add YouTube videos with categories and descriptions
- **Image Upload** - Drag-and-drop image upload from your computer
- **Real-time Updates** - Changes reflect immediately on the main site
- **User-friendly Interface** - Clean, intuitive dashboard design

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** TailwindCSS 4
- **Language:** TypeScript
- **Font:** Geist Sans & Geist Mono

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Access admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)
   - Default password: `admin123`

## Admin Panel

### Quick Start

1. Navigate to `/admin`
2. Login with password: `admin123`
3. Manage your content from the dashboard

### Change Admin Password

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

**⚠️ Important for Production:**
- Change the default password immediately
- Implement proper authentication (OAuth, JWT, etc.)
- Use environment variables for sensitive data
- Backup your `/data` folder regularly

**💾 Data Storage:**
- Content is stored in JSON files in the `/data` directory
- Data persists across server restarts
- Easy to backup - just copy the `/data` folder
- The `/data` folder is gitignored to keep your content private

**📸 Image Upload:**
- Drag-and-drop image upload directly from your computer
- Supports PNG, JPG, GIF, WebP (max 5MB)
- Images stored in `/public/uploads/` directory
- Still supports external image URLs
- See [IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md) for details

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for detailed admin panel documentation.

## Project Structure

```
blog-portfolio/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx          # Admin dashboard
│   ├── api/
│   │   └── content/
│   │       └── route.ts          # API routes for content management
│   ├── globals.css               # Global styles and theme variables
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main portfolio page
├── components/
│   ├── admin/                    # Admin panel components
│   │   ├── ProfileEditor.tsx
│   │   ├── BooksManager.tsx
│   │   └── BlogManager.tsx
│   ├── Navigation.tsx            # Site navigation
│   ├── Hero.tsx                  # Hero section
│   ├── About.tsx                 # About section
│   ├── Books.tsx                 # Books section
│   ├── Blog.tsx                  # Blog section
│   ├── Contact.tsx               # Contact section
│   └── Footer.tsx                # Footer
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   ├── data.ts                   # Data types and defaults
│   └── storage.ts                # JSON file storage utilities
├── data/                         # JSON data storage (auto-created)
│   ├── profile.json              # Profile data
│   ├── books.json                # Books data
│   └── blog.json                 # Blog posts data
├── public/
│   └── uploads/                  # Uploaded images (auto-created)
└── package.json                  # Dependencies
```

## Customization

### Using the Admin Panel (Recommended)

The easiest way to customize your portfolio is through the admin panel:

1. Go to `/admin` and login
2. Update profile information, books, and blog videos
3. Changes appear immediately on the main site

### Manual Customization

If you prefer to edit code directly:

**Profile Data:** Edit `lib/data.ts` to change default values

**Theme Colors:** Edit `app/globals.css` to modify:
- Background colors
- Primary/accent colors
- Text colors

**Career Journey:** Edit `components/About.tsx` for career history and skills

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Quick Deploy

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **For production:**
   ```bash
   vercel --prod
   ```

### Or Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

### ⚠️ Important: Storage on Vercel

The app automatically switches to **in-memory storage** on Vercel because the file system is read-only. This means:

- ✅ Works immediately without setup
- ❌ Data resets on each deployment
- ❌ Not suitable for production with real users

**For production**, you should use a database:
- Vercel KV (Redis)
- Vercel Postgres
- MongoDB Atlas
- Supabase

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide and database setup.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/blog-portfolio)

## License

MIT License - feel free to use this template for your own portfolio!
