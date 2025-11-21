'use client'

import { useState, useRef } from 'react'
import { Database } from '@/types/supabase'

type Gallery = Database['public']['Tables']['galleries']['Row']

interface PhotoUploadProps {
  galleries: Gallery[]
  onUploadSuccess?: () => void
}

export default function PhotoUpload({ galleries, onUploadSuccess }: PhotoUploadProps) {
  const [selectedGallery, setSelectedGallery] = useState<string>('')
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<{ [key: string]: number }>({})
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!selectedGallery) {
      setErrors(['Please select a gallery'])
      return
    }

    if (files.length === 0) {
      setErrors(['Please select at least one file'])
      return
    }

    setUploading(true)
    setErrors([])
    const newProgress: { [key: string]: number } = {}

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('galleryId', selectedGallery)
        formData.append('orderIndex', i.toString())
        formData.append('isAvailableForPrint', 'true')

        newProgress[file.name] = 0
        setProgress({ ...newProgress })

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Upload failed')
          }

          newProgress[file.name] = 100
          setProgress({ ...newProgress })
        } catch (error: any) {
          console.error(`Error uploading ${file.name}:`, error)
          setErrors(prev => [...prev, `${file.name}: ${error.message}`])
        }
      }

      // Clear files after successful upload
      if (Object.keys(errors).length === 0) {
        setFiles([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        if (onUploadSuccess) {
          onUploadSuccess()
        }
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Photos</h2>

      {/* Gallery Selection */}
      <div className="mb-6">
        <label htmlFor="gallery" className="block text-sm font-medium text-gray-700 mb-2">
          Select Gallery *
        </label>
        <select
          id="gallery"
          value={selectedGallery}
          onChange={(e) => setSelectedGallery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          disabled={uploading}
        >
          <option value="">Choose a gallery...</option>
          {galleries.map((gallery) => (
            <option key={gallery.id} value={gallery.id}>
              {gallery.title}
            </option>
          ))}
        </select>
      </div>

      {/* File Input */}
      <div className="mb-6">
        <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-2">
          Select Photos *
        </label>
        <input
          ref={fileInputRef}
          type="file"
          id="files"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          disabled={uploading}
        />
        <p className="mt-2 text-sm text-gray-500">
          Max 10MB per file. Supports JPEG, PNG, WebP, and GIF.
        </p>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Files ({files.length})
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {progress[file.name] !== undefined && (
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${progress[file.name]}%` }}
                      />
                    </div>
                  )}
                </div>
                {!uploading && (
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="w-5 h-5"
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 mb-2">Errors:</h4>
          <ul className="list-disc list-inside text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0 || !selectedGallery}
        className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : `Upload ${files.length} Photo${files.length !== 1 ? 's' : ''}`}
      </button>
    </div>
  )
}

