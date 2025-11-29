# Admin Panel Guide

## Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Enter the admin password (default: `admin123`)
3. You'll be redirected to the dashboard

## Features

### 1. Profile & Images
- Update your name and professional title
- Edit your bio/description
- Change your profile image (provide image URL)
- Changes reflect immediately on the main site

### 2. Books Management
- **Add Books**: Click "+ Add Book" to add a new published book
  - Title: Book name
  - Description: Brief description
  - Cover Image URL: Link to book cover image
  - Purchase Link: Where users can buy the book
- **Edit Books**: Click "Edit" on any book card to modify details
- **Delete Books**: Click "Delete" to remove a book (with confirmation)

### 3. Blog Videos Management
- **Add Videos**: Click "+ Add Video" to add YouTube content
  - Title: Video title
  - Category: Select from predefined categories
  - YouTube URL/ID: Paste full YouTube URL or just the video ID
  - Description: Brief description of the video content
  - Custom Thumbnail: Optional custom thumbnail URL
- **Edit Videos**: Modify existing video details
- **Delete Videos**: Remove videos from the blog section
- **Preview**: See YouTube embed preview before publishing

## Security

### Changing the Admin Password

Set the `NEXT_PUBLIC_ADMIN_PASSWORD` environment variable:

```bash
# .env.local
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

**Important**: In production, implement proper authentication with:
- Secure password hashing
- Session management
- Database-backed authentication
- Rate limiting

## Data Storage

Data is stored in JSON files in the `/data` directory. This provides persistent storage that survives server restarts.

### How It Works

- **Profile data**: Stored in `data/profile.json`
- **Books data**: Stored in `data/books.json`
- **Blog posts**: Stored in `data/blog.json`

The data directory is automatically created on first use with default content.

### Backup Your Data

Since your content is stored in JSON files, backing up is simple:

1. Copy the entire `/data` folder
2. Store it somewhere safe (external drive, cloud storage, etc.)
3. To restore, just copy the folder back

### Data Directory Location

```
blog-portfolio/
└── data/
    ├── profile.json
    ├── books.json
    └── blog.json
```

**Note**: The `/data` folder is in `.gitignore` to prevent committing personal content to version control.

### For Scaling (Future)

If you need more advanced features, consider:

1. **Database Migration**
   - PostgreSQL, MongoDB, or Firebase
   - Better for high-traffic sites
   - Supports advanced queries

2. **CMS Integration**
   - Contentful, Sanity, or Strapi
   - Full-featured content management
   - Built-in media handling

## Image Upload

### Drag and Drop Upload (NEW! 🎉)

You can now upload images directly from your computer:

1. **Drag and drop** an image file onto the upload area
2. **Or click** to browse and select a file
3. Wait for upload to complete
4. Image URL is automatically filled!

**Supported formats:** PNG, JPG, GIF, WebP (max 5MB)

**Where images are stored:** `public/uploads/` directory

See [IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md) for detailed instructions.

### Alternative: Use Image URLs

You can still paste image URLs if you prefer:
- Imgur
- Cloudinary
- AWS S3
- Any publicly accessible image URL

- **YouTube Videos**: 
  - Get video ID from URL: `youtube.com/watch?v=VIDEO_ID`
  - Or paste the full URL and it will extract the ID automatically

- **Backup**: Regularly export your content before making major changes

## Troubleshooting

**Can't login?**
- Check if password matches the environment variable
- Clear browser cache and try again

**Changes not showing?**
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for errors

**Images not loading?**
- Verify the image URL is publicly accessible
- Check if the URL starts with `https://`
- Ensure CORS is enabled on the image host

## Future Enhancements

- [ ] Image upload functionality
- [ ] Rich text editor for descriptions
- [ ] Drag-and-drop reordering
- [ ] Analytics dashboard
- [ ] SEO management
- [ ] Multi-user support with roles
