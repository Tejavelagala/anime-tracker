import React, { useState, useEffect } from 'react'
import { loadData, addShow } from '../utils/storage'

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [algorithm, setAlgorithm] = useState('content-based') // content-based or popularity

  useEffect(() => {
    generateRecommendations()
  }, [algorithm])

  function generateRecommendations() {
    setLoading(true)
    const data = loadData()
    const shows = data.shows || []
    const ratings = data.ratings || {}

    if (algorithm === 'content-based') {
      // Content-based filtering: recommend based on tags and ratings
      const userTags = new Map()
      const highlyRatedShows = shows.filter(show => {
        const showRatings = ratings[show.id] || []
        const avgRating = showRatings.length > 0 
          ? showRatings.reduce((sum, r) => sum + r.value, 0) / showRatings.length 
          : 0
        return avgRating >= 4
      })

      // Collect tags from highly rated and completed shows
      highlyRatedShows.forEach(show => {
        if (show.status === 'Completed' || show.status === 'Watching') {
          show.tags?.forEach(tag => {
            userTags.set(tag, (userTags.get(tag) || 0) + 1)
          })
        }
      })

      // Get top tags
      const topTags = Array.from(userTags.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag]) => tag)

      // Recommendation database (simulating AI)
      const recommendationDB = [
        { 
          title: 'Attack on Titan', 
          tags: ['Action', 'Drama', 'Dark Fantasy', '2013'], 
          description: 'Humanity fights for survival against giant humanoid Titans in a post-apocalyptic world.',
          image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
          totalEpisodes: 75,
          score: 9.0,
          matchReason: 'Popular action series with intense storytelling'
        },
        { 
          title: 'Steins;Gate', 
          tags: ['Sci-Fi', 'Thriller', 'Time Travel', '2011'], 
          description: 'A self-proclaimed mad scientist discovers time travel and faces its consequences.',
          image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
          totalEpisodes: 24,
          score: 9.1,
          matchReason: 'Mind-bending sci-fi thriller'
        },
        { 
          title: 'Death Note', 
          tags: ['Psychological', 'Thriller', 'Supernatural', '2006'], 
          description: 'A high school student finds a supernatural notebook that grants the power to kill.',
          image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
          totalEpisodes: 37,
          score: 9.0,
          matchReason: 'Psychological masterpiece with cat-and-mouse game'
        },
        { 
          title: 'One Punch Man', 
          tags: ['Action', 'Comedy', 'Superhero', '2015'], 
          description: 'A hero who can defeat any opponent with a single punch searches for a worthy challenge.',
          image: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
          totalEpisodes: 24,
          score: 8.5,
          matchReason: 'Action-packed comedy with amazing animation'
        },
        { 
          title: 'Code Geass', 
          tags: ['Action', 'Drama', 'Mecha', '2006'], 
          description: 'An exiled prince gains the power of absolute obedience and leads a rebellion.',
          image: 'https://cdn.myanimelist.net/images/anime/5/50331.jpg',
          totalEpisodes: 50,
          score: 8.7,
          matchReason: 'Strategic battles and complex plot twists'
        },
        { 
          title: 'My Hero Academia', 
          tags: ['Action', 'Superhero', 'School', '2016'], 
          description: 'A boy born without superpowers dreams of becoming a hero in a world where they are common.',
          image: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
          totalEpisodes: 113,
          score: 8.4,
          matchReason: 'Inspiring hero journey with great character development'
        },
        { 
          title: 'Hunter x Hunter (2011)', 
          tags: ['Action', 'Adventure', 'Shounen', '2011'], 
          description: 'A young boy searches for his father, a legendary Hunter, while becoming one himself.',
          image: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg',
          totalEpisodes: 148,
          score: 9.0,
          matchReason: 'Epic adventure with amazing power system'
        },
        { 
          title: 'Demon Slayer', 
          tags: ['Action', 'Historical', 'Demons', '2019'], 
          description: 'A boy becomes a demon slayer to avenge his family and cure his sister.',
          image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
          totalEpisodes: 44,
          score: 8.6,
          matchReason: 'Stunning animation with emotional story'
        },
        { 
          title: 'Mob Psycho 100', 
          tags: ['Action', 'Comedy', 'Supernatural', '2016'], 
          description: 'An emotionally reserved psychic tries to live a normal life while controlling his powers.',
          image: 'https://cdn.myanimelist.net/images/anime/8/80356.jpg',
          totalEpisodes: 25,
          score: 8.5,
          matchReason: 'Unique animation with heartwarming themes'
        },
        { 
          title: 'Vinland Saga', 
          tags: ['Action', 'Adventure', 'Historical', '2019'], 
          description: 'A young Viking warrior seeks revenge while caught in the politics of medieval Europe.',
          image: 'https://cdn.myanimelist.net/images/anime/1500/103005.jpg',
          totalEpisodes: 24,
          score: 8.7,
          matchReason: 'Mature historical drama with incredible battles'
        },
        { 
          title: 'Jujutsu Kaisen', 
          tags: ['Action', 'Supernatural', 'School', '2020'], 
          description: 'A high school student joins a secret organization to fight deadly curses.',
          image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
          totalEpisodes: 24,
          score: 8.6,
          matchReason: 'Modern supernatural action with great fights'
        },
        { 
          title: 'Violet Evergarden', 
          tags: ['Drama', 'Fantasy', 'Slice of Life', '2018'], 
          description: 'A former soldier becomes a letter writer to understand human emotions.',
          image: 'https://cdn.myanimelist.net/images/anime/1795/95088.jpg',
          totalEpisodes: 13,
          score: 8.6,
          matchReason: 'Beautiful emotional journey with stunning visuals'
        }
      ]

      // Filter out shows already in watchlist
      const watchlistTitles = shows.map(s => s.title.toLowerCase())
      let filtered = recommendationDB.filter(rec => 
        !watchlistTitles.includes(rec.title.toLowerCase())
      )

      // Score based on tag matching
      if (topTags.length > 0) {
        filtered = filtered.map(rec => {
          const matchScore = rec.tags.filter(tag => topTags.includes(tag)).length
          return { ...rec, matchScore }
        }).sort((a, b) => b.matchScore - a.matchScore || b.score - a.score)
      } else {
        // No user preferences, sort by score
        filtered.sort((a, b) => b.score - a.score)
      }

      setRecommendations(filtered.slice(0, 12))
    } else {
      // Popularity-based: recommend highest rated shows
      const popularShows = [
        { 
          title: 'Fullmetal Alchemist: Brotherhood', 
          tags: ['Action', 'Adventure', 'Fantasy', '2009'], 
          description: 'Two brothers search for the Philosopher\'s Stone to restore their bodies.',
          image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
          totalEpisodes: 64,
          score: 9.1,
          matchReason: 'Highest rated anime of all time'
        },
        { 
          title: 'Steins;Gate', 
          tags: ['Sci-Fi', 'Thriller', '2011'], 
          description: 'A self-proclaimed mad scientist discovers time travel.',
          image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
          totalEpisodes: 24,
          score: 9.1,
          matchReason: 'Masterpiece sci-fi thriller'
        },
        { 
          title: 'Hunter x Hunter (2011)', 
          tags: ['Action', 'Adventure', '2011'], 
          description: 'A young boy becomes a Hunter to find his father.',
          image: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg',
          totalEpisodes: 148,
          score: 9.0,
          matchReason: 'Epic adventure series'
        },
        { 
          title: 'Attack on Titan', 
          tags: ['Action', 'Drama', '2013'], 
          description: 'Humanity fights against giant Titans.',
          image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
          totalEpisodes: 75,
          score: 9.0,
          matchReason: 'Intense action and mystery'
        },
        { 
          title: 'Death Note', 
          tags: ['Psychological', 'Thriller', '2006'], 
          description: 'A supernatural notebook that can kill.',
          image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
          totalEpisodes: 37,
          score: 9.0,
          matchReason: 'Psychological cat-and-mouse game'
        },
        { 
          title: 'Code Geass', 
          tags: ['Action', 'Mecha', '2006'], 
          description: 'A prince leads a rebellion with supernatural powers.',
          image: 'https://cdn.myanimelist.net/images/anime/5/50331.jpg',
          totalEpisodes: 50,
          score: 8.7,
          matchReason: 'Strategic battles and plot twists'
        }
      ]

      const watchlistTitles = shows.map(s => s.title.toLowerCase())
      const filtered = popularShows.filter(rec => 
        !watchlistTitles.includes(rec.title.toLowerCase())
      )

      setRecommendations(filtered)
    }

    setLoading(false)
  }

  function addToWatchlist(rec) {
    const newShow = {
      title: rec.title,
      totalEpisodes: rec.totalEpisodes,
      tags: rec.tags,
      description: rec.description,
      status: 'Plan to Watch',
      image: rec.image
    }
    addShow(newShow)
    alert(`Added "${rec.title}" to your watchlist!`)
    generateRecommendations() // Refresh to remove added show
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          AI Recommendations
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Personalized anime suggestions based on your preferences</p>
      </div>

      {/* Algorithm Selector */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-gray-200">Recommendation Algorithm</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose how we find shows for you</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAlgorithm('content-based')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                algorithm === 'content-based'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              🎯 For You
            </button>
            <button
              onClick={() => setAlgorithm('popularity')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                algorithm === 'popularity'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              🔥 Popular
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 animate-pulse">🤖</div>
          <div className="text-lg text-gray-700 dark:text-gray-300">Generating recommendations...</div>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">🎬</div>
          <div className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">No Recommendations Available</div>
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            Add some shows to your watchlist and rate them to get personalized recommendations!
          </div>
          <button
            onClick={() => window.location.href = '/discover'}
            className="btn-primary"
          >
            🔍 Discover Anime
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-3">
              <div className="text-3xl">
                {algorithm === 'content-based' ? '🎯' : '🔥'}
              </div>
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">
                  {algorithm === 'content-based' 
                    ? 'Personalized Based on Your Tastes' 
                    : 'Most Popular Anime of All Time'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {algorithm === 'content-based'
                    ? 'Matched using your watched shows, ratings, and favorite tags'
                    : 'Highest rated shows on MyAnimeList'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="card group hover:scale-105 transition-all duration-300">
                <div className="relative mb-4">
                  {rec.image ? (
                    <img 
                      src={rec.image} 
                      alt={rec.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
                    style={{ display: rec.image ? 'none' : 'flex' }}
                  >
                    <span className="text-6xl">🎬</span>
                  </div>
                  <div className="absolute top-2 right-2 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold shadow-lg">
                    ⭐ {rec.score}
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{rec.title}</h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {rec.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="badge">{tag}</span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                  {rec.description}
                </p>

                <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                    💡 {rec.matchReason}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>📺 {rec.totalEpisodes} episodes</span>
                  {rec.matchScore !== undefined && (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {rec.matchScore} tags match
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToWatchlist(rec)}
                  className="btn-primary w-full"
                >
                  ➕ Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
