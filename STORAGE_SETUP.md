# Storage Setup Complete! 🎉

Your Supabase storage buckets have been successfully configured for your photography portfolio.

## 📦 Storage Buckets Created

### 1. **photos** bucket
- **Public**: Yes (images are publicly accessible)
- **File size limit**: 10MB
- **Allowed MIME types**: 
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `image/gif`

### 2. **thumbnails** bucket
- **Public**: Yes (thumbnails are publicly accessible)
- **File size limit**: 2MB
- **Allowed MIME types**:
  - `image/jpeg`
  - `image/png`
  - `image/webp`

## 🔐 Storage Policies

### Public Access
- ✅ Anyone can view/download images from both buckets
- ✅ Images are served via CDN for fast delivery

### Authenticated Access (Admin)
- ✅ Authenticated users can upload images
- ✅ Authenticated users can update images
- ✅ Authenticated users can delete images

**Note**: Currently, policies require authentication. For admin uploads, you'll need to:
1. Set up Supabase Auth for admin users
2. Or use the service role key in API routes (already configured)

## 🛠️ Helper Functions

I've created helper functions in `lib/supabase/storage.ts`:

### `getStorageUrl(bucket, path)`
Get the public URL for an image in storage.

### `uploadImage(bucket, file, path)`
Upload an image from the client-side (requires authentication).

### `uploadImageAdmin(bucket, file, path, contentType)`
Upload an image using service role (for API routes, no auth needed).

### `deleteImage(bucket, path)`
Delete an image from storage.

### `generateImagePath(galleryId, filename)`
Generate a unique file path for organizing images by gallery.

## 📝 Usage Examples

### Getting a public URL
```typescript
import { getStorageUrl } from '@/lib/supabase/storage'

const imageUrl = getStorageUrl('photos', 'gallery-123/photo.jpg')
```

### Uploading via API route (admin)
```typescript
import { uploadImageAdmin, generateImagePath } from '@/lib/supabase/storage'

const path = generateImagePath(galleryId, file.name)
const result = await uploadImageAdmin('photos', file, path, file.type)

if (result) {
  // Use result.url in your database
  console.log('Image uploaded:', result.url)
}
```

### Uploading from client (requires auth)
```typescript
import { uploadImage } from '@/lib/supabase/storage'

const result = await uploadImage('photos', file, path)
```

## 🚀 Next Steps

1. **Test image upload**: Create an admin interface to upload photos
2. **Generate thumbnails**: Set up image processing to create thumbnails
3. **Update photo URLs**: When uploading, save the storage URL to the `photos` table

## 📍 Storage URLs

Your images will be accessible at:
- Photos: `https://auimzuragmkgkghyitsx.supabase.co/storage/v1/object/public/photos/[path]`
- Thumbnails: `https://auimzuragmkgkghyitsx.supabase.co/storage/v1/object/public/thumbnails/[path]`

The helper functions automatically generate these URLs for you!

## ✅ Status

Storage buckets are ready to use! You can now:
- Upload photos to the `photos` bucket
- Store thumbnails in the `thumbnails` bucket
- Access images via public URLs
- Use the helper functions for easy integration

