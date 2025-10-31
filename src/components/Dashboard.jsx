import React, { useState, useEffect } from 'react'
import { loadData } from '../utils/storage'
import axios from 'axios'
import { API_URL } from '../config/api'

export default function Dashboard({ token }){
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Fallback to localStorage if API fails
  const data = loadData()
  const shows = data.shows || []
  const totalShows = shows.length
  const totalEpisodes = shows.reduce((s,i) => s + (Number(i.totalEpisodes)||0), 0)
  const watchedEpisodes = shows.reduce((s,i) => s + (Number(i.watched)||0), 0)
  const pct = totalEpisodes ? Math.round((watchedEpisodes/totalEpisodes)*100) : 0

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${API_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (response.data.success) {
          setStats(response.data.stats)
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err)
        setError('Using local data')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [token])

  const displayStats = stats?.overview || {
    totalShows,
    totalEpisodes,
    watchedEpisodes,
    overallProgress: pct,
    completionRate: totalShows > 0 ? Math.round((shows.filter(s => s.status === 'Completed').length / totalShows) * 100) : 0,
    avgEpisodesPerShow: totalShows > 0 ? Math.round(totalEpisodes / totalShows) : 0
  }

  const statusStats = stats?.byStatus || {
    watching: shows.filter(s => s.status === 'Watching').length,
    completed: shows.filter(s => s.status === 'Completed').length,
    onHold: shows.filter(s => s.status === 'On Hold').length,
    dropped: shows.filter(s => s.status === 'Dropped').length,
    planToWatch: shows.filter(s => s.status === 'Plan to Watch').length
  }

  const socialStats = stats?.social || {
    clubs: 0,
    polls: 0,
    ratings: 0
  }

  const mainStats = [
    { label: 'Total Shows', value: displayStats.totalShows, icon: '📺', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Episodes', value: displayStats.totalEpisodes, icon: '🎬', color: 'from-purple-500 to-pink-500' },
    { label: 'Watched', value: displayStats.watchedEpisodes, icon: '✅', color: 'from-green-500 to-emerald-500' },
    { label: 'Progress', value: `${displayStats.overallProgress}%`, icon: '📊', color: 'from-orange-500 to-red-500' }
  ]

  const detailStats = [
    { label: 'Completion Rate', value: `${displayStats.completionRate}%`, icon: '🎯', color: 'from-indigo-500 to-purple-500' },
    { label: 'Avg Episodes/Show', value: displayStats.avgEpisodesPerShow, icon: '📈', color: 'from-cyan-500 to-blue-500' },
    { label: 'Clubs Joined', value: socialStats.clubs, icon: '🏛️', color: 'from-pink-500 to-rose-500' },
    { label: 'Total Ratings', value: socialStats.ratings, icon: '⭐', color: 'from-yellow-500 to-orange-500' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Track your anime watching progress</p>
        {error && <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">⚠️ {error}</p>}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 animate-pulse">⏳</div>
          <div className="text-lg text-gray-700 dark:text-gray-300">Loading statistics...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mainStats.map((stat, idx) => (
              <div key={idx} className="card group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {detailStats.map((stat, idx) => (
              <div key={idx} className="card group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Shows by Status */}
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <span>📊</span>
              Shows by Status
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statusStats.watching}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Watching</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{statusStats.completed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{statusStats.onHold}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">On Hold</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{statusStats.dropped}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Dropped</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{statusStats.planToWatch}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Plan to Watch</div>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <span>📈</span>
              Overall Progress
            </h3>
            <div className="progress-bar">
              <div style={{width: `${displayStats.overallProgress}%`}} className="progress-fill"></div>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{displayStats.watchedEpisodes} / {displayStats.totalEpisodes} episodes</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{displayStats.overallProgress}%</span>
            </div>
          </div>

          {/* Recent Activity */}
          {stats?.recentActivity && stats.recentActivity.length > 0 && (
            <div className="card mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <span>🕒</span>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {stats.recentActivity.map((show, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{show.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {show.watched}/{show.totalEpisodes} episodes • {show.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(show.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
