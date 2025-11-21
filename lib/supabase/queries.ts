import { createSupabaseServerClient } from './client'
import { Database } from '@/types/supabase'

type Gallery = Database['public']['Tables']['galleries']['Row']
type Photo = Database['public']['Tables']['photos']['Row']
type Booking = Database['public']['Tables']['bookings']['Insert']

// Get all galleries
export async function getGalleries() {
  try {
    const supabase = createSupabaseServerClient()
    
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching galleries:', error)
      return []
    }

    // Get photo count for each gallery
    const galleriesWithCounts = await Promise.all(
      (data || []).map(async (gallery) => {
        const { count } = await supabase
          .from('photos')
          .select('*', { count: 'exact', head: true })
          .eq('gallery_id', gallery.id)
        
        return {
          ...gallery,
          photo_count: count || 0,
        }
      })
    )

    return galleriesWithCounts
  } catch (error) {
    console.error('Error in getGalleries:', error)
    return []
  }
}

// Get a single gallery by ID
export async function getGallery(id: string) {
  const supabase = createSupabaseServerClient()
  
  const { data: gallery, error: galleryError } = await supabase
    .from('galleries')
    .select('*')
    .eq('id', id)
    .single()

  if (galleryError || !gallery) {
    console.error('Error fetching gallery:', galleryError)
    return null
  }

  // Get photos for this gallery
  const { data: photos, error: photosError } = await supabase
    .from('photos')
    .select('*')
    .eq('gallery_id', id)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true })

  if (photosError) {
    console.error('Error fetching photos:', photosError)
    return { ...gallery, photos: [] }
  }

  return {
    ...gallery,
    photos: photos || [],
  }
}

// Get photos for a gallery
export async function getPhotosByGallery(galleryId: string) {
  const supabase = createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('gallery_id', galleryId)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching photos:', error)
    return []
  }

  return data || []
}

// Create a booking
export async function createBooking(booking: Booking) {
  const supabase = createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()

  if (error) {
    console.error('Error creating booking:', error)
    throw error
  }

  return data
}

// Get print products for a photo
export async function getPrintProducts(photoId: string) {
  const supabase = createSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('print_products')
    .select('*')
    .eq('photo_id', photoId)
    .eq('is_active', true)
    .order('price', { ascending: true })

  if (error) {
    console.error('Error fetching print products:', error)
    return []
  }

  return data || []
}

