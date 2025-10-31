import React, { useEffect, useState, useRef } from 'react'
import { addShow } from '../utils/storage'

const JIKAN_SEARCH_URL = (q) => `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=12`
const CACHE_KEY = 'anime_jikan_cache_v1'

export default function Discover() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      setError(null)
      return
    }

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const q = query.trim()
      const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
      if (cache[q]) {
        setResults(cache[q])
        setError(null)
        return
      }

      setLoading(true)
      setError(null)
      fetch(JIKAN_SEARCH_URL(q))
        .then(res => {
          if (!res.ok) throw new Error('API error: ' + res.status)
          return res.json()
        })
        .then(json => {
          const mapped = (json.data || []).map(item => ({
            title: item.title,
            totalEpisodes: item.episodes || 12,
            tags: (item.genres || []).map(g => g.name),
            image: item.images?.jpg?.image_url || (item.images?.webp?.image_url || ''),
            synopsis: item.synopsis || ''
          }))
          setResults(mapped)
          // update cache
          const next = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
          next[q] = mapped
          localStorage.setItem(CACHE_KEY, JSON.stringify(next))
        })
        .catch(err => {
          setError(err.message || 'Failed to fetch')
        })
        .finally(() => setLoading(false))
    }, 350)
  }, [query])

  function add(item) {
    addShow({ title: item.title, totalEpisodes: item.totalEpisodes || 12, tags: item.tags || [], spoiler: '', description: item.synopsis || '', status: 'Plan to Watch' })
    alert('Added to watchlist (local only)')
  }

  function clearCache() {
    localStorage.removeItem(CACHE_KEY)
    alert('Search cache cleared')
  }

  function loadCache() {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
  }

  function useHistoryQuery(q) {
    const cache = loadCache()
    if (cache[q]) {
      setQuery(q)
      setResults(cache[q])
      setError(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Discover Anime
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium shadow-md">
              Powered by Jikan API
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Search thousands of anime titles from MyAnimeList</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input 
            placeholder=" Search anime (type 2+ characters)..." 
            value={query} 
            onChange={e=>setQuery(e.target.value)} 
            className="input-field pl-10 text-lg" 
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={clearCache} className="btn-secondary text-sm">
          🗑️ Clear Search Cache
        </button>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">Cached searches:</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{Object.keys(JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')).length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="card text-center py-12">
              <div className="text-5xl mb-4 animate-pulse">⏳</div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Searching anime...</div>
            </div>
          ) : error ? (
            <div className="card text-center py-12 border-2 border-red-300 dark:border-red-700">
              <div className="text-5xl mb-4">⚠️</div>
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">Error: {error}</div>
            </div>
          ) : results.length === 0 ? (
            <div className="card text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <div className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Start Discovering</div>
              <div className="text-gray-500 dark:text-gray-400">Type in the search box to find your favorite anime</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {results.map((r, i) => (
                <div key={i} className="card group hover:scale-[1.02] transition-transform">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {r.image ? (
                      <img 
                        src={r.image} 
                        alt={r.title} 
                        className="w-full sm:w-24 h-48 sm:h-32 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow" 
                      />
                    ) : (
                      <div className="w-full sm:w-24 h-48 sm:h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">📺</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{r.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(r.tags||[]).slice(0,4).map((tag, idx) => (
                          <span key={idx} className="badge">{tag}</span>
                        ))}
                      </div>
                      {r.synopsis && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{r.synopsis}</p>
                      )}
                    </div>
                    <div className="w-full sm:w-auto">
                      <button onClick={()=>add(r)} className="btn-primary w-full sm:w-auto">
                        ➕ Add to Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <span>🕒</span>
                Search History
              </h3>
              <button onClick={clearCache} className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
                Clear All
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Click any query to search again</div>
            <div className="space-y-2 max-h-96 overflow-auto">
              {Object.keys(JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')).length === 0 ? (
                <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-sm">No search history yet</div>
                </div>
              ) : (
                Object.keys(JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')).map((q) => (
                  <div key={q} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <button 
                      onClick={() => useHistoryQuery(q)} 
                      className="text-left text-sm truncate flex-1 font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {q}
                    </button>
                    <button 
                      onClick={() => { 
                        const c = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); 
                        delete c[q]; 
                        localStorage.setItem(CACHE_KEY, JSON.stringify(c)); 
                        setError(null); 
                        alert('Removed cache entry'); 
                      }} 
                      className="text-xs text-gray-400 hover:text-red-500 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
