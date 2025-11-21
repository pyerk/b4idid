'use client'

import { useState } from 'react'
import { Database } from '@/types/supabase'

type Gallery = Database['public']['Tables']['galleries']['Row']

interface GalleryManagerProps {
  galleries: Gallery[]
  onGalleryCreated?: () => void
}

export default function GalleryManager({ galleries, onGalleryCreated }: GalleryManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/galleries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          date: formData.date || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create gallery')
      }

      // Reset form
      setFormData({ title: '', description: '', date: '' })
      setShowForm(false)
      if (onGalleryCreated) {
        onGalleryCreated()
      }
    } catch (error: any) {
      console.error('Error creating gallery:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Galleries</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {showForm ? 'Cancel' : '+ New Gallery'}
        </button>
      </div>

      {/* Create Gallery Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Gallery'}
          </button>
        </form>
      )}

      {/* Galleries List */}
      <div className="space-y-2">
        {galleries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No galleries yet. Create one to get started!</p>
        ) : (
          galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-gray-900">{gallery.title}</h3>
              {gallery.description && (
                <p className="text-sm text-gray-600 mt-1">{gallery.description}</p>
              )}
              {gallery.date && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(gallery.date).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

