# Supabase Setup Complete! 🎉

Your Supabase database has been successfully configured for your photography portfolio website.

## 📊 Database Schema

The following tables have been created:

### 1. **galleries**
- Stores photo galleries/photoshoots
- Fields: id, title, description, cover_image_url, date, timestamps

### 2. **photos**
- Stores individual photos
- Fields: id, gallery_id, image_url, thumbnail_url, title, description, order_index, is_available_for_print

### 3. **print_products**
- Stores print size and pricing options
- Fields: id, photo_id, size, price, stripe_price_id, is_active

### 4. **orders**
- Stores customer orders
- Fields: id, stripe_checkout_session_id, customer info, total_amount, status, shipping_address

### 5. **order_items**
- Stores individual items in orders
- Fields: id, order_id, photo_id, print_size, quantity, price

### 6. **bookings**
- Stores photoshoot inquiries
- Fields: id, client info, event_type, event_date, message, status

## 🔐 Security

- Row Level Security (RLS) is enabled on all tables
- Public read access for galleries, photos, and print products
- Public insert access for bookings
- All tables have proper indexes for performance

## 🔑 Connection Information

Your Supabase project details:
- **Project URL**: `https://auimzuragmkgkghyitsx.supabase.co`
- **Project ID**: `auimzuragmkgkghyitsx`
- **Anon Key**: (See `.env.local` file)

## 📦 Storage Setup (Manual Step Required)

You'll need to set up a storage bucket in the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the sidebar
3. Click **New bucket**
4. Create a bucket named `photos` with:
   - **Public bucket**: Yes (for public image access)
   - **File size limit**: Set as needed (e.g., 10MB)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`

5. (Optional) Create a second bucket `thumbnails` for optimized thumbnails

6. Set up storage policies:
   - **Public read access** for the `photos` bucket
   - **Authenticated write access** for admin uploads (you'll set this up when adding auth)

## 🚀 Next Steps

1. **Update your `.env.local` file** with the Supabase credentials (already done if you followed setup)

2. **Test the connection** by running:
   ```bash
   npm run dev
   ```

3. **Start building**:
   - Replace mock data in your pages with Supabase queries
   - Set up image upload functionality
   - Connect the booking form to save to the database

## 📝 Environment Variables

Make sure your `.env.local` file includes:
```
NEXT_PUBLIC_SUPABASE_URL=https://auimzuragmkgkghyitsx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Note**: You'll need to get the service role key from your Supabase dashboard:
1. Go to Project Settings → API
2. Copy the `service_role` key (keep this secret!)

## ✅ Database Status

All tables are created and ready to use. You can start querying data immediately!

