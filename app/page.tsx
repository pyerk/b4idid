import GalleryGrid from '@/components/gallery/GalleryGrid'
import { getGalleries } from '@/lib/supabase/queries'
import { Database } from '@/types/supabase'

type Gallery = Database['public']['Tables']['galleries']['Row'] & {
  photo_count?: number
}

// Force dynamic rendering to avoid build-time errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  // Always initialize with empty array to ensure page renders
  let galleries: Gallery[] = []
  
  try {
    galleries = await getGalleries()
  } catch (error) {
    // Log error but don't throw - ensure page still renders
    console.error('Error in Home page:', error)
    galleries = []
  }

  // Page will always render, even if galleries is empty
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Photography Portfolio
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Capturing life&apos;s most precious moments through the lens
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Work</h2>
        <GalleryGrid galleries={galleries} />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white mt-20">
        <h2 className="text-3xl font-bold mb-4">Ready to Book Your Session?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Let&apos;s work together to create beautiful memories that will last a lifetime.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Book a Photoshoot
        </a>
      </div>
    </div>
  )
}
