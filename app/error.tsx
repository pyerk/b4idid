'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

