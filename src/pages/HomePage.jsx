import React from 'react'
import ListingsGrid from '../components/ListingsGrid'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-4xl font-bold">Business & Tourism Directory</h1>
          <p className="mt-2 text-gray-600">Discover local businesses and attractions.</p>
        </header>

        <main>
          <ListingsGrid />
        </main>
      </div>
    </div>
  )
}
