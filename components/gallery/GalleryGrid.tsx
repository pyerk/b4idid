'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Gallery {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  date: string | null
  photo_count?: number
}

interface GalleryGridProps {
  galleries: Gallery[]
}

export default function GalleryGrid({ galleries }: GalleryGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  if (galleries.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No galleries available yet.</p>
        <p className="text-gray-400 mt-2">Check back soon for new work!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleries.map((gallery) => (
        <Link
          key={gallery.id}
          href={`/gallery/${gallery.id}`}
          className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3]"
          onMouseEnter={() => setHoveredId(gallery.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {gallery.cover_image_url ? (
            <Image
              src={gallery.cover_image_url}
              alt={gallery.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              hoveredId === gallery.id ? 'opacity-60' : 'opacity-40'
            }`}
          />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl font-bold mb-1 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
              {gallery.title}
            </h3>
            {gallery.date && (
              <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {new Date(gallery.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            {gallery.description && (
              <p className="text-sm text-gray-200 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {gallery.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

