# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Start the Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

### 2. Access Admin Panel

Go to: **http://localhost:3000/admin**

**Login with:**
- Password: `admin123`

### 3. Customize Your Portfolio

#### Update Your Profile
1. Click on **"Profile & Images"** tab
2. Enter your name, title, and bio
3. Add your profile image URL
4. Click **"Save Changes"**

#### Add Your Books
1. Click on **"Books"** tab
2. Click **"+ Add Book"**
3. Fill in:
   - Title
   - Description
   - Cover image URL
   - Purchase link
4. Click **"Add Book"**

#### Add YouTube Videos
1. Click on **"Blog Videos"** tab
2. Click **"+ Add Video"**
3. Paste YouTube URL or video ID
4. Select category
5. Add description
6. Click **"Add Video"**

### 4. View Your Changes

Click **"View Site →"** in the admin header to see your updated portfolio!

## 📝 Tips

### Getting Image URLs
- Upload to [Imgur](https://imgur.com) (free)
- Use [Unsplash](https://unsplash.com) for stock photos
- Or use any image hosting service

### YouTube Video ID
From: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
ID is: `dQw4w9WgXcQ`

Or just paste the full URL - it will extract the ID automatically!

### Categories
Choose from:
- Sales Strategy
- Team Building
- Leadership
- Technology

## 🔒 Change Password

Create `.env.local` file:

```bash
NEXT_PUBLIC_ADMIN_PASSWORD=your_new_password
```

Restart the server after changing.

## ❓ Need Help?

- **Admin Guide**: See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
- **Full Features**: See [FEATURES.md](./FEATURES.md)
- **README**: See [README.md](./README.md)

## 🎉 You're All Set!

Your portfolio is ready to customize. Start adding your content through the admin panel!
