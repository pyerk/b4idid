import Link from 'next/link'
import { getGallery } from '@/lib/supabase/queries'
import GalleryView from '@/components/gallery/GalleryView'

interface PageProps {
  params: { id: string }
}

export default async function GalleryPage({ params }: PageProps) {
  const { id } = params
  const gallery = await getGallery(id)

  if (!gallery) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gallery Not Found</h1>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 underline"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  return <GalleryView gallery={gallery} />
}

