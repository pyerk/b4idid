'use client'

import { useState, useEffect } from 'react'
import PhotoUpload from '@/components/admin/PhotoUpload'
import GalleryManager from '@/components/admin/GalleryManager'
import { Database } from '@/types/supabase'

type Gallery = Database['public']['Tables']['galleries']['Row']

export default function AdminPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/galleries')
      if (response.ok) {
        const data = await response.json()
        setGalleries(data.galleries || [])
      }
    } catch (error) {
      console.error('Error fetching galleries:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your galleries and upload photos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery Manager */}
        <div>
          <GalleryManager
            galleries={galleries}
            onGalleryCreated={fetchGalleries}
          />
        </div>

        {/* Photo Upload */}
        <div>
          <PhotoUpload
            galleries={galleries}
            onUploadSuccess={() => {
              // Refresh galleries to show updated photo counts
              fetchGalleries()
            }}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Upload Information</h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Images are automatically resized to max 2000px on the longest side</li>
          <li>Thumbnails are generated at 500px on the longest side</li>
          <li>All images are optimized for web delivery</li>
          <li>Maximum file size: 10MB per image</li>
          <li>Supported formats: JPEG, PNG, WebP, GIF</li>
        </ul>
      </div>
    </div>
  )
}

