# Data Backup Guide

## Why Backup?

Your portfolio content (profile, books, blog posts) is stored in JSON files in the `/data` directory. While this is persistent across server restarts, it's important to backup your data regularly.

## Quick Backup

### Manual Backup (Easiest)

1. **Copy the data folder**
   ```bash
   cp -r data data-backup-$(date +%Y%m%d)
   ```

2. **Or compress it**
   ```bash
   tar -czf data-backup-$(date +%Y%m%d).tar.gz data/
   ```

3. **Store the backup somewhere safe**
   - External hard drive
   - Cloud storage (Dropbox, Google Drive, iCloud)
   - USB drive

### Restore from Backup

1. **Stop the server** (if running)

2. **Replace the data folder**
   ```bash
   rm -rf data
   cp -r data-backup-YYYYMMDD data
   ```

3. **Or extract from compressed backup**
   ```bash
   tar -xzf data-backup-YYYYMMDD.tar.gz
   ```

4. **Restart the server**

## Automated Backup Script

Create a file `backup.sh` in your project root:

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="backups"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_NAME="portfolio-backup-$DATE"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup
echo "Creating backup: $BACKUP_NAME"
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" data/

# Keep only last 10 backups
cd $BACKUP_DIR
ls -t | tail -n +11 | xargs -r rm

echo "Backup completed: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
echo "Total backups: $(ls -1 | wc -l)"
```

Make it executable:
```bash
chmod +x backup.sh
```

Run it:
```bash
./backup.sh
```

## Schedule Automatic Backups

### On macOS/Linux (using cron)

1. Open crontab:
   ```bash
   crontab -e
   ```

2. Add this line to backup daily at 2 AM:
   ```
   0 2 * * * cd /path/to/blog-portfolio && ./backup.sh
   ```

### On Windows (using Task Scheduler)

1. Open Task Scheduler
2. Create a new task
3. Set trigger to daily at 2 AM
4. Set action to run the backup script

## Cloud Backup Options

### 1. Google Drive Backup

Install `rclone`:
```bash
brew install rclone  # macOS
# or
sudo apt install rclone  # Linux
```

Configure and sync:
```bash
rclone copy data/ gdrive:portfolio-backup/
```

### 2. Dropbox Backup

Similar to Google Drive using `rclone`:
```bash
rclone copy data/ dropbox:portfolio-backup/
```

### 3. Git Backup (Private Repo)

If you want version control for your data:

1. Create a private GitHub repository
2. Initialize git in the data folder:
   ```bash
   cd data
   git init
   git add .
   git commit -m "Backup $(date)"
   git remote add origin <your-private-repo-url>
   git push -u origin main
   ```

3. Create a backup script:
   ```bash
   #!/bin/bash
   cd data
   git add .
   git commit -m "Backup $(date)"
   git push
   ```

## What Gets Backed Up

### Data Files (`/data` directory)
- `profile.json` - Your profile information
- `books.json` - Your published books
- `blog.json` - Your blog/video posts

### Uploaded Images (`/public/uploads` directory)
- Profile photos
- Book covers
- Blog thumbnails
- Any other uploaded images

### Complete Backup Command

To backup everything (data + images):
```bash
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz data/ public/uploads/
```

## Backup Checklist

- [ ] Backup before major updates
- [ ] Backup weekly (at minimum)
- [ ] Store backups in multiple locations
- [ ] Test restore process occasionally
- [ ] Keep at least 3-5 recent backups
- [ ] Document your backup location

## Emergency Recovery

If you lose your data:

1. Check your backup locations
2. Find the most recent backup
3. Follow the restore steps above
4. Verify data in admin panel

## Best Practices

1. **Regular Schedule**: Backup at least weekly
2. **Multiple Locations**: Keep backups in 2-3 different places
3. **Test Restores**: Occasionally test that your backups work
4. **Before Updates**: Always backup before updating the site
5. **Version Control**: Consider using git for data versioning

## Need Help?

If you lose data and don't have a backup:
- The default data is in `lib/data.ts`
- You can manually recreate your content through the admin panel
- Consider setting up automated backups going forward
