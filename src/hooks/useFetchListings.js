import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const useFetchListings = (category = null, location = null, search = '') => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchListings = async () => {
      try {
        setLoading(true)
        let query = supabase.from('listings').select('*').order('created_at', { ascending: false })

        if (category && category !== 'All') {
          query = query.eq('category', category)
        }
        if (location && location !== 'All') {
          query = query.eq('location', location)
        }
        if (search && search.trim() !== '') {
          // match title or description (case-insensitive)
          const like = `%${search.replace(/%/g, '\\%')}%`
          query = query.or(`title.ilike.${like},description.ilike.${like}`)
        }

        const { data, error } = await query
        if (error) throw error
        if (isMounted) setListings(data || [])
      } catch (err) {
        if (isMounted) setError(err.message || String(err))
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchListings()

    return () => {
      isMounted = false
    }
  }, [category, location, search])

  return { listings, loading, error }
}

export default useFetchListings
