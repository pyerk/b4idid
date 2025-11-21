import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/client'
import { generateImagePath } from '@/lib/supabase/storage'
import sharp from 'sharp'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const galleryId = formData.get('galleryId') as string
    const title = formData.get('title') as string | null
    const description = formData.get('description') as string | null
    const isAvailableForPrint = formData.get('isAvailableForPrint') === 'true'
    const orderIndex = parseInt(formData.get('orderIndex') as string) || 0

    if (!file || !galleryId) {
      return NextResponse.json(
        { error: 'Missing required fields: file and galleryId' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseAdminClient()

    // Generate file paths
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const imagePath = generateImagePath(galleryId, filename)
    const thumbnailPath = generateImagePath(galleryId, `thumb_${filename}`)

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Process original image (resize if too large, max 2000px on longest side)
    const processedImage = await sharp(buffer)
      .resize(2000, 2000, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85 })
      .toBuffer()

    // Generate thumbnail (500px on longest side)
    const thumbnail = await sharp(buffer)
      .resize(500, 500, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toBuffer()

    // Upload original image to photos bucket
    const { data: imageData, error: imageError } = await supabase.storage
      .from('photos')
      .upload(imagePath, processedImage, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      })

    if (imageError) {
      console.error('Error uploading image:', imageError)
      return NextResponse.json(
        { error: 'Failed to upload image', details: imageError.message },
        { status: 500 }
      )
    }

    // Upload thumbnail to thumbnails bucket
    const { data: thumbnailData, error: thumbnailError } = await supabase.storage
      .from('thumbnails')
      .upload(thumbnailPath, thumbnail, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      })

    if (thumbnailError) {
      console.error('Error uploading thumbnail:', thumbnailError)
      // Continue even if thumbnail fails - we can regenerate it later
    }

    // Get public URLs
    const { data: imageUrlData } = supabase.storage
      .from('photos')
      .getPublicUrl(imageData.path)

    const { data: thumbnailUrlData } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(thumbnailData?.path || '')

    // Save photo record to database
    const { data: photo, error: dbError } = await supabase
      .from('photos')
      .insert({
        gallery_id: galleryId,
        image_url: imageUrlData.publicUrl,
        thumbnail_url: thumbnailUrlData.publicUrl || null,
        title: title || null,
        description: description || null,
        order_index: orderIndex,
        is_available_for_print: isAvailableForPrint,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving photo to database:', dbError)
      // Try to clean up uploaded files
      await supabase.storage.from('photos').remove([imageData.path])
      if (thumbnailData) {
        await supabase.storage.from('thumbnails').remove([thumbnailData.path])
      }
      return NextResponse.json(
        { error: 'Failed to save photo record', details: dbError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      photo: {
        ...photo,
        image_url: imageUrlData.publicUrl,
        thumbnail_url: thumbnailUrlData.publicUrl || null,
      },
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error in upload route:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

