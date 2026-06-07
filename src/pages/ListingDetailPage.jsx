import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function ListingDetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchListing = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('listings').select('*').eq('id', id).single()
        if (error) throw error
        if (mounted) setListing(data)
      } catch (err) {
        if (mounted) setError(err.message || String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (id) fetchListing()
    return () => { mounted = false }
  }, [id])

  if (loading) return <div className="p-6">Loading listing...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!listing) return <div className="p-6">Listing not found.</div>

  const {
    title,
    description,
    category,
    location,
    image_url,
    rating,
    phone,
    website,
    created_at,
  } = listing

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/" className="text-sm text-blue-600">← Back to directory</Link>

        <div className="bg-white rounded-lg shadow mt-4 overflow-hidden">
          {image_url && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={image_url} alt={title} className="w-full h-64 object-cover" />
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="mt-2 text-sm text-gray-600">
              <span className="mr-2">{category}</span>
              <span>• {location}</span>
              {created_at && (
                <span className="ml-4 text-xs text-gray-400">Added {new Date(created_at).toLocaleDateString()}</span>
              )}
            </div>

            <p className="mt-4 text-gray-700">{description}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="text-lg font-semibold text-yellow-500">{rating ?? '—'}</div>

              {phone && (
                <a href={`tel:${phone}`} className="px-4 py-2 bg-green-600 text-white rounded-md">Call</a>
              )}

              {website && (
                <a href={website} target="_blank" rel="noreferrer" className="px-4 py-2 border rounded-md text-sm text-blue-600">Visit Website</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
