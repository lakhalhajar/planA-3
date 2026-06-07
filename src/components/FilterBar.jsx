import React from 'react'

export default function FilterBar({
  categories = [],
  locations = [],
  category,
  location,
  onChangeCategory,
  onChangeLocation,
}) {
  return (
    <div className="flex gap-3">
      <select
        value={category || 'All'}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="All">All Categories</option>
        {Array.from(new Set(categories)).map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={location || 'All'}
        onChange={(e) => onChangeLocation(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="All">All Locations</option>
        {Array.from(new Set(locations)).map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </div>
  )
}
