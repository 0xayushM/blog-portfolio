# JSON File Storage Implementation

## Overview

Your portfolio now uses **JSON file storage** for persistent data management. This means all your content (profile, books, blog posts) is saved to files and will persist across server restarts.

## How It Works

### Storage Location

All data is stored in the `/data` directory:

```
blog-portfolio/
└── data/
    ├── profile.json    # Your profile information
    ├── books.json      # Your published books
    └── blog.json       # Your blog/video posts
```

### Automatic Initialization

When you first start the application:
1. The `/data` directory is automatically created
2. Three JSON files are initialized with default content
3. You can then customize everything through the admin panel

### Data Flow

```
Admin Panel → API Routes → Storage Functions → JSON Files → Disk
     ↓                                                          ↑
User Site ← API Routes ← Storage Functions ← JSON Files ← Disk
```

## Benefits

✅ **Persistent**: Data survives server restarts
✅ **Simple**: Easy to understand and manage
✅ **Portable**: Just copy the `/data` folder to backup
✅ **No Database**: No need for PostgreSQL, MongoDB, etc.
✅ **Version Control**: Can use git for data versioning (optional)
✅ **Human Readable**: JSON files are easy to read and edit

## Files Created

### Core Storage System

1. **`lib/storage.ts`** - File system utilities
   - Read/write functions for each data type
   - Automatic directory creation
   - CRUD operations for books and blog posts

2. **`app/api/content/route.ts`** - Updated API routes
   - GET: Read data from JSON files
   - POST: Create new entries
   - PUT: Update existing entries
   - DELETE: Remove entries

### Data Files (Auto-generated)

1. **`data/profile.json`**
   ```json
   {
     "name": "John Doe",
     "title": "Your professional title",
     "heroImage": "/profile.jpg",
     "bio": "Your bio..."
   }
   ```

2. **`data/books.json`**
   ```json
   [
     {
       "id": "1",
       "title": "Book Title",
       "description": "Description...",
       "cover": "/book1.jpg",
       "link": "#"
     }
   ]
   ```

3. **`data/blog.json`**
   ```json
   [
     {
       "id": "1",
       "title": "Video Title",
       "category": "Sales Strategy",
       "date": "Nov 15, 2023",
       "youtubeId": "dQw4w9WgXcQ",
       "description": "Description..."
     }
   ]
   ```

## Usage

### Through Admin Panel (Recommended)

1. Go to `/admin`
2. Login with your password
3. Make changes through the UI
4. Data is automatically saved to JSON files

### Manual Editing (Advanced)

You can also edit the JSON files directly:

1. Stop the server
2. Edit files in `/data` directory
3. Ensure valid JSON format
4. Restart the server

**⚠️ Warning**: Manual editing can break the site if JSON is invalid. Use the admin panel when possible.

## Backup & Restore

### Quick Backup

```bash
# Copy the data folder
cp -r data data-backup-$(date +%Y%m%d)

# Or compress it
tar -czf data-backup.tar.gz data/
```

### Restore

```bash
# From folder
cp -r data-backup-YYYYMMDD data

# From compressed
tar -xzf data-backup.tar.gz
```

See [BACKUP_GUIDE.md](./BACKUP_GUIDE.md) for detailed backup instructions.

## Security

### Data Protection

- The `/data` folder is in `.gitignore`
- Your content won't be committed to version control
- Keep backups in secure locations

### Access Control

- Only admin users can modify data
- Password-protected admin panel
- API routes handle validation

## Performance

### For Personal Portfolio

JSON file storage is perfect because:
- Fast read/write operations
- Low server resource usage
- No database overhead
- Suitable for small to medium data sets

### Limitations

Consider upgrading to a database if:
- You have 1000+ books or blog posts
- Multiple admins editing simultaneously
- Need advanced search/filtering
- High traffic (10,000+ visitors/day)

## Troubleshooting

### Data Not Saving

1. Check file permissions on `/data` folder
2. Ensure server has write access
3. Check console for errors
4. Verify JSON format is valid

### Data Lost After Restart

1. Confirm `/data` folder exists
2. Check if files are empty
3. Restore from backup
4. Check server logs for errors

### Can't Read Data

1. Verify JSON files exist
2. Check file permissions
3. Ensure valid JSON format
4. Try deleting `/data` and restarting (will reset to defaults)

## Migration Path

### To Database (Future)

If you need to scale, migration is straightforward:

1. **Export current data**
   ```bash
   # Data is already in JSON format
   cp -r data data-export
   ```

2. **Set up database** (PostgreSQL, MongoDB, etc.)

3. **Create migration script**
   ```javascript
   // Read JSON files
   const profile = require('./data/profile.json');
   const books = require('./data/books.json');
   const blog = require('./data/blog.json');
   
   // Insert into database
   await db.profile.create(profile);
   await db.books.insertMany(books);
   await db.blog.insertMany(blog);
   ```

4. **Update storage.ts** to use database instead of files

## Best Practices

1. **Regular Backups**: Backup weekly or before major changes
2. **Use Admin Panel**: Avoid manual JSON editing
3. **Validate Changes**: Check the site after updates
4. **Keep Backups**: Store in multiple locations
5. **Monitor Size**: If files get too large, consider database

## Support

For issues or questions:
- Check [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
- Review [BACKUP_GUIDE.md](./BACKUP_GUIDE.md)
- See [README.md](./README.md) for general info

## Summary

✨ Your portfolio now has **persistent JSON file storage**!

- Data survives restarts
- Easy to backup and restore
- Simple and reliable
- Perfect for personal portfolios
- No database required

Start adding your content through the admin panel at `/admin`!
