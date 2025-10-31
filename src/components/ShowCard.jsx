import React, { useState } from 'react'
import { updateShow, deleteShow, rateShow, loadData, getAverageRating } from '../utils/storage'
import Polls from './Polls'

export default function ShowCard({ show, onChange }) {
  const [showSpoiler, setShowSpoiler] = useState(false)
  const [showDesc, setShowDesc] = useState(false)
  const data = loadData()
  const { avg, count } = getAverageRating(show.id)
  const rating = Math.round(avg)

  function incWatched() {
    if (show.watched >= show.totalEpisodes) return
    updateShow(show.id, { watched: show.watched + 1 })
    onChange && onChange()
  }

  function decWatched() {
    if (show.watched <= 0) return
    updateShow(show.id, { watched: show.watched - 1 })
    onChange && onChange()
  }

  function setStatus(e) {
    updateShow(show.id, { status: e.target.value })
    onChange && onChange()
  }

  function remove() {
    if (!confirm('Delete this show?')) return
    deleteShow(show.id)
    onChange && onChange()
  }

  function setReminder() {
    alert(`Reminder set (demo) for ${show.title}`)
  }

  function share() {
    const payload = JSON.stringify(show, null, 2)
    navigator.clipboard?.writeText(payload)
    alert('Show JSON copied to clipboard (mock share)')
  }

  function handleRate(star) {
    rateShow(show.id, star)
    onChange && onChange()
  }

  const progress = Math.round((show.watched / Math.max(1, show.totalEpisodes)) * 100)

  return (
    <div className="card group">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{show.title}</h3>
            <div className="flex flex-wrap gap-1">
              {show.tags?.map((tag, i) => (
                <span key={i} className="badge">{tag}</span>
              ))}
            </div>
          </div>

          {show.description && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {showDesc ? show.description : (show.description.length > 220 ? show.description.slice(0,220) + '...' : show.description)}
              </div>
              {show.description.length > 220 && (
                <button onClick={() => setShowDesc(s => !s)} className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium hover:underline">
                  {showDesc ? '▲ Show less' : '▼ Read more'}
                </button>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-gray-600 dark:text-gray-400">Episodes:</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{show.watched}</span>
              <span className="text-gray-400">/</span>
              <span className="text-lg">{show.totalEpisodes}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={decWatched} className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-bold">
                -
              </button>
              <button onClick={incWatched} className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-bold">
                +
              </button>
            </div>
          </div>

          <div className="mb-4">
            <select value={show.status} onChange={setStatus} className="input-field text-sm">
              <option>Watching</option>
              <option>Completed</option>
              <option>On Hold</option>
              <option>Dropped</option>
              <option>Plan to Watch</option>
            </select>
          </div>

          <div className="mb-4">
            <div className="progress-bar">
              <div style={{width: `${progress}%`}} className="progress-fill"></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => setShowSpoiler(s => !s)} className="px-3 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium hover:shadow-md transition-all">
              {showSpoiler ? '🙈 Hide' : '👁️ Reveal'} Spoiler
            </button>
            <button onClick={setReminder} className="px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium hover:shadow-md transition-all">
              ⏰ Reminder
            </button>
            <button onClick={share} className="px-3 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium hover:shadow-md transition-all">
              📤 Share
            </button>
            <button onClick={remove} className="btn-danger text-sm">
              🗑️ Delete
            </button>
          </div>

          {/* Streaming Links */}
          {show.streamingLinks && Object.values(show.streamingLinks).some(link => link) && (
            <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>📺</span>
                Available on Streaming Platforms:
              </div>
              <div className="flex flex-wrap gap-2">
                {show.streamingLinks.netflix && (
                  <a href={show.streamingLinks.netflix} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors flex items-center gap-1">
                    <span>▶️</span> Netflix
                  </a>
                )}
                {show.streamingLinks.crunchyroll && (
                  <a href={show.streamingLinks.crunchyroll} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors flex items-center gap-1">
                    <span>▶️</span> Crunchyroll
                  </a>
                )}
                {show.streamingLinks.funimation && (
                  <a href={show.streamingLinks.funimation} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors flex items-center gap-1">
                    <span>▶️</span> Funimation
                  </a>
                )}
                {show.streamingLinks.hulu && (
                  <a href={show.streamingLinks.hulu} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors flex items-center gap-1">
                    <span>▶️</span> Hulu
                  </a>
                )}
                {show.streamingLinks.amazonPrime && (
                  <a href={show.streamingLinks.amazonPrime} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
                    <span>▶️</span> Prime Video
                  </a>
                )}
                {show.streamingLinks.disneyPlus && (
                  <a href={show.streamingLinks.disneyPlus} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1">
                    <span>▶️</span> Disney+
                  </a>
                )}
                {show.streamingLinks.other && (
                  <a href={show.streamingLinks.other} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-gray-600 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors flex items-center gap-1">
                    <span>▶️</span> Other
                  </a>
                )}
              </div>
            </div>
          )}

          {showSpoiler && (
            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg animate-fade-in">
              <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Spoiler Alert</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{show.spoiler || 'No spoilers added.'}</div>
            </div>
          )}

          <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-sm text-gray-700 dark:text-gray-300">Your Rating:</div>
              <div className="text-xs text-gray-500">{avg.toFixed(1)} ★ ({count} {count === 1 ? 'rating' : 'ratings'})</div>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(n => (
                <button 
                  key={n} 
                  onClick={() => handleRate(n)} 
                  className={`text-3xl transition-all hover:scale-125 ${n <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <Polls contextId={show.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
