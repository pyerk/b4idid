'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Photo {
  id: string
  image_url: string
  thumbnail_url: string | null
  title: string | null
  description: string | null
  is_available_for_print: boolean
}

interface Gallery {
  id: string
  title: string
  description: string | null
  date: string | null
  photos: Photo[]
}

// Mock data - will be replaced with Supabase data
const mockGallery: Gallery = {
  id: '1',
  title: 'Wedding Photography',
  description: 'Beautiful wedding moments captured in this special day.',
  date: '2024-01-15',
  photos: [
    {
      id: '1',
      image_url: '/placeholder.jpg',
      thumbnail_url: null,
      title: 'Bridal Portrait',
      description: 'Elegant bridal portrait',
      is_available_for_print: true,
    },
    {
      id: '2',
      image_url: '/placeholder.jpg',
      thumbnail_url: null,
      title: 'Ceremony',
      description: 'Wedding ceremony moments',
      is_available_for_print: true,
    },
    {
      id: '3',
      image_url: '/placeholder.jpg',
      thumbnail_url: null,
      title: 'Reception',
      description: 'Celebration at the reception',
      is_available_for_print: true,
    },
  ],
}

interface PageProps {
  params: { id: string }
}

export default function GalleryPage({ params }: PageProps) {
  const { id } = params
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const gallery = mockGallery // Will fetch from Supabase based on id

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>

      {/* Gallery Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {gallery.title}
        </h1>
        {gallery.date && (
          <p className="text-gray-600 mb-4">
            {new Date(gallery.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
        {gallery.description && (
          <p className="text-lg text-gray-700 max-w-3xl">{gallery.description}</p>
        )}
      </div>

      {/* Photo Grid */}
      {gallery.photos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No photos in this gallery yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Photo {photo.id}</span>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Print Badge */}
              {photo.is_available_for_print && (
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  Available for Print
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="w-full h-[80vh] bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-400">Photo Preview</span>
              </div>
              
              {selectedPhoto.title && (
                <h3 className="text-white text-xl font-bold mt-4">
                  {selectedPhoto.title}
                </h3>
              )}
              {selectedPhoto.description && (
                <p className="text-gray-300 mt-2">{selectedPhoto.description}</p>
              )}
              
              {selectedPhoto.is_available_for_print && (
                <a
                  href={`/prints?photo=${selectedPhoto.id}`}
                  className="inline-block mt-4 bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  Buy Print
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

