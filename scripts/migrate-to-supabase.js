require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  console.log('🚀 Starting data migration to Supabase...\n');

  try {
    // Read local JSON files
    const dataDir = path.join(process.cwd(), 'data');
    const profileData = JSON.parse(fs.readFileSync(path.join(dataDir, 'profile.json'), 'utf-8'));
    const customBlogData = JSON.parse(fs.readFileSync(path.join(dataDir, 'custom-blog.json'), 'utf-8'));
    const blogData = JSON.parse(fs.readFileSync(path.join(dataDir, 'blog.json'), 'utf-8'));

    console.log('📖 Read local data:');
    console.log(`  - Profile: ${profileData.name}`);
    console.log(`  - Custom Blog Posts: ${customBlogData.length} posts`);
    console.log(`  - Video Posts: ${blogData.length} videos\n`);

    // Migrate Profile
    console.log('📝 Migrating profile...');
    const { data: existingProfile } = await supabase
      .from('profile')
      .select('*')
      .eq('name', profileData.name)
      .single();

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profile')
        .update({
          title: profileData.title,
          hero_image: profileData.heroImage,
          bio: profileData.bio,
          social_links: profileData.socialLinks
        })
        .eq('name', profileData.name);

      if (updateError) throw updateError;
      console.log('✅ Profile updated successfully');
    } else {
      const { error: insertError } = await supabase
        .from('profile')
        .insert([{
          name: profileData.name,
          title: profileData.title,
          hero_image: profileData.heroImage,
          bio: profileData.bio,
          social_links: profileData.socialLinks
        }]);

      if (insertError) throw insertError;
      console.log('✅ Profile inserted successfully');
    }

    // Migrate Custom Blog Posts
    console.log('\n📝 Migrating custom blog posts...');
    
    // Delete existing posts
    await supabase.from('custom_blog_posts').delete().neq('id', '');
    
    if (customBlogData.length > 0) {
      const customBlogPosts = customBlogData.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        date: post.date,
        cover_image: post.coverImage,
        tags: post.tags || []
      }));

      const { error: customBlogError } = await supabase
        .from('custom_blog_posts')
        .insert(customBlogPosts);

      if (customBlogError) throw customBlogError;
      console.log(`✅ Inserted ${customBlogData.length} custom blog posts`);
    } else {
      console.log('ℹ️  No custom blog posts to migrate');
    }

    // Migrate Blog Posts (Videos)
    console.log('\n📝 Migrating video posts...');
    
    // Delete existing posts
    await supabase.from('blog_posts').delete().neq('id', '');
    
    if (blogData.length > 0) {
      const blogPosts = blogData.map(post => ({
        id: post.id,
        title: post.title,
        description: post.description,
        youtube_id: post.youtubeId,
        category: post.category,
        date: post.date,
        thumbnail: post.thumbnail || ''
      }));

      const { error: blogError } = await supabase
        .from('blog_posts')
        .insert(blogPosts);

      if (blogError) throw blogError;
      console.log(`✅ Inserted ${blogData.length} video posts`);
    } else {
      console.log('ℹ️  No video posts to migrate');
    }

    // Verify migration
    console.log('\n🔍 Verifying migration...');
    
    const { data: verifyProfile } = await supabase.from('profile').select('*').single();
    const { data: verifyCustomBlogs } = await supabase.from('custom_blog_posts').select('*');
    const { data: verifyBlogs } = await supabase.from('blog_posts').select('*');

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📊 Data in Supabase:');
    console.log(`  - Profile: ${verifyProfile?.name || 'None'}`);
    console.log(`  - Custom Blog Posts: ${verifyCustomBlogs?.length || 0}`);
    console.log(`  - Video Posts: ${verifyBlogs?.length || 0}`);
    
    console.log('\n🎉 All data has been migrated to Supabase!');
    console.log('You can now check your Supabase dashboard to verify the data.');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
