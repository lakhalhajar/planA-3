import React, { useState, useMemo } from 'react'
import useFetchListings from '../hooks/useFetchListings'
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import ListingCard from './ListingCard'

export default function ListingsGrid() {
  const [category, setCategory] = useState('All')
  const [location, setLocation] = useState('All')
  const [search, setSearch] = useState('')

  const { listings, loading, error } = useFetchListings(
    category === 'All' ? null : category,
    location === 'All' ? null : location,
    search
  )

  const categories = useMemo(() => listings.map((l) => l.category).filter(Boolean), [listings])
  const locations = useMemo(() => listings.map((l) => l.location).filter(Boolean), [listings])

  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <SearchBar onSearch={(q) => setSearch(q)} />
        </div>
        <div className="w-full md:w-auto">
          <FilterBar
            categories={categories}
            locations={locations}
            category={category}
            location={location}
            onChangeCategory={(c) => setCategory(c)}
            onChangeLocation={(l) => setLocation(l)}
          />
        </div>
      </div>

      {loading && <div className="text-center py-8">Loading listings...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          !loading && <div className="text-center text-gray-500 col-span-full">No listings found.</div>
        )}
      </div>
    </section>
  )
}
