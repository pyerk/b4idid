import { createSupabaseAdminClient, createSupabaseClient } from './client'

/**
 * Get public URL for an image in storage
 */
export function getStorageUrl(bucket: string, path: string): string {
  const supabase = createSupabaseClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Upload an image to storage (client-side)
 * Returns the public URL of the uploaded image
 */
export async function uploadImage(
  bucket: 'photos' | 'thumbnails',
  file: File,
  path: string
): Promise<{ url: string; path: string } | null> {
  const supabase = createSupabaseClient()

  // Upload the file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  // Get the public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  
  return {
    url: urlData.publicUrl,
    path: data.path,
  }
}

/**
 * Upload an image using service role (server-side/admin)
 */
export async function uploadImageAdmin(
  bucket: 'photos' | 'thumbnails',
  file: File | Buffer,
  path: string,
  contentType?: string
): Promise<{ url: string; path: string } | null> {
  const supabase = createSupabaseAdminClient()

  // Convert File to Buffer if needed
  let buffer: Buffer
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
  } else {
    buffer = file
  }

  // Upload the file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: contentType || 'image/jpeg',
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  // Get the public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  
  return {
    url: urlData.publicUrl,
    path: data.path,
  }
}

/**
 * Delete an image from storage
 */
export async function deleteImage(
  bucket: 'photos' | 'thumbnails',
  path: string
): Promise<boolean> {
  const supabase = createSupabaseClient()

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    console.error('Error deleting image:', error)
    return false
  }

  return true
}

/**
 * Generate a unique file path for an image
 */
export function generateImagePath(galleryId: string, filename: string): string {
  const timestamp = Date.now()
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `${galleryId}/${timestamp}-${sanitizedFilename}`
}

