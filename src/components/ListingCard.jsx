import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ListingCard({ listing }) {
  const {
    title,
    description,
    category,
    location,
    image_url,
    rating,
    phone,
    website,
  } = listing || {}

  return (
    <Link to={`/listings/${listing.id}`} className="block">
      <motion.article
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden border"
      >
      <div className="h-44 bg-gray-100 w-full overflow-hidden">
        {image_url ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={image_url} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div>
            <span className="mr-2">{category}</span>
            <span className="text-xs">• {location}</span>
          </div>
          <div className="text-yellow-500 font-medium">{rating ?? '—'}</div>
        </div>

        <div className="mt-3 flex gap-2">
          {phone && (
            <a href={`tel:${phone}`} className="text-xs text-blue-600">Call</a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noreferrer" className="text-xs text-blue-600">Website</a>
          )}
        </div>
      </div>
      </motion.article>
    </Link>
  )
}
