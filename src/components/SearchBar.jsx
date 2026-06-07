import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={submit} className="w-full flex">
      <input
        type="text"
        placeholder="Search listings..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-md">
        Search
      </button>
    </form>
  )
}
