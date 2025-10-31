import React, { useState, useRef } from 'react'
import { loadData, resetData, saveData } from '../utils/storage'

export default function AdminPanel(){
  const current = loadData()
  const [text, setText] = useState(JSON.stringify(current, null, 2))
  const [msg, setMsg] = useState('')
  const [view, setView] = useState('overview') // overview, editor, dump
  const fileRef = useRef()

  // Stats
  const stats = {
    totalShows: current.shows?.length || 0,
    totalClubs: current.clubs?.length || 0,
    totalPolls: current.polls?.length || 0,
    totalRatings: Object.keys(current.ratings || {}).length,
    cacheSize: Object.keys(JSON.parse(localStorage.getItem('anime_jikan_cache_v1') || '{}')).length,
    storageUsed: ((JSON.stringify(current).length / 1024).toFixed(2)) + ' KB'
  }

  function doReset(){
    if(!confirm('Reset all local data? This cannot be undone.')) return
    resetData()
    window.location.reload()
  }

  function downloadJson(){
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'anime-tracker-data.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function applyJson(){
    try{
      const parsed = JSON.parse(text)
      saveData(parsed)
      setMsg('Saved to localStorage')
      setTimeout(()=>setMsg(''),3000)
    }catch(e){
      setMsg('Invalid JSON: ' + e.message)
    }
  }

  function onFileChange(e){
    const f = e.target.files && e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => {
      setText(reader.result)
      setMsg('Loaded file into editor')
    }
    reader.readAsText(f)
  }

  function copyToClipboard(){
    navigator.clipboard?.writeText(text)
    setMsg('Copied JSON to clipboard')
    setTimeout(()=>setMsg(''),2000)
  }

  // Seed demo data (same shape used on first-run)
  function restoreSeed(){
    const seed = {
      shows: [
        { id: 'seed-1', title: 'Fullmetal Alchemist: Brotherhood', totalEpisodes: 64, watched: 0, tags: ['Action','Adventure','2009'], spoiler: '', description: 'Seeded demo show', status: 'Plan to Watch' }
      ],
      clubs: [],
      polls: [],
      ratings: {},
      settings: { theme: 'light' }
    }
    saveData(seed)
    setText(JSON.stringify(seed, null, 2))
    setMsg('Seed data restored')
    setTimeout(()=>setMsg(''),2000)
  }

  function exportCurrent(){
    const d = loadData()
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'anime-tracker-export.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function clearCache(){
    localStorage.removeItem('anime_jikan_cache_v1')
    setMsg('Search cache cleared')
    setTimeout(()=>setMsg(''),2000)
  }

  function validateData(){
    try{
      const d = loadData()
      const issues = []
      if(!Array.isArray(d.shows)) issues.push('Shows must be an array')
      if(!Array.isArray(d.clubs)) issues.push('Clubs must be an array')
      if(!Array.isArray(d.polls)) issues.push('Polls must be an array')
      if(typeof d.ratings !== 'object') issues.push('Ratings must be an object')
      if(typeof d.settings !== 'object') issues.push('Settings must be an object')
      
      if(issues.length > 0){
        setMsg('Validation errors: ' + issues.join(', '))
      } else {
        setMsg('✓ Data structure is valid')
        setTimeout(()=>setMsg(''),3000)
      }
    }catch(e){
      setMsg('Validation error: ' + e.message)
    }
  }

  function refreshEditor(){
    const d = loadData()
    setText(JSON.stringify(d, null, 2))
    setMsg('Editor refreshed from localStorage')
    setTimeout(()=>setMsg(''),2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Admin Panel
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your application data and settings</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3">
        <button 
          onClick={()=>setView('overview')} 
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            view==='overview'
              ?'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
              :'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          📊 Overview
        </button>
        <button 
          onClick={()=>setView('editor')} 
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            view==='editor'
              ?'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
              :'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          ✏️ Data Editor
        </button>
        <button 
          onClick={()=>setView('dump')} 
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            view==='dump'
              ?'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
              :'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          📄 Raw Dump
        </button>
      </div>

      {/* Overview */}
      {view === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="card group hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📺</span>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Shows</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalShows}</div>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🏛️</span>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Clubs</div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalClubs}</div>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📊</span>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Polls</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalPolls}</div>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">⭐</span>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ratings Count</div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.totalRatings}</div>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">💾</span>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Search Cache</div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.cacheSize}</div>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">💿</span>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Storage Used</div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.storageUsed}</div>
            </div>
          </div>

          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button onClick={doReset} className="btn-danger">
                🔄 Reset All Data
              </button>
              <button onClick={restoreSeed} className="btn-success">
                🌱 Restore Seed Data
              </button>
              <button onClick={exportCurrent} className="btn-primary">
                📥 Download JSON
              </button>
              <button onClick={clearCache} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                🗑️ Clear Search Cache
              </button>
              <button onClick={validateData} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                ✅ Validate Data
              </button>
            </div>
            {msg && <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg text-sm font-medium animate-fade-in">{msg}</div>}
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>ℹ️</span>
              System Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">Browser</div>
                  <div className="text-gray-600 dark:text-gray-400">{navigator.userAgent.split(' ').slice(-2).join(' ')}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💾</span>
                <div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">LocalStorage</div>
                  <div className="text-gray-600 dark:text-gray-400">{typeof(Storage) !== 'undefined' ? '✅ Available' : '❌ Not Available'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">Theme</div>
                  <div className="text-gray-600 dark:text-gray-400">{current.settings?.theme || 'light'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">App Version</div>
                  <div className="text-gray-600 dark:text-gray-400">1.0.0</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Data Editor */}
      {view === 'editor' && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span>✏️</span>
            Edit LocalStorage JSON
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Edit the JSON representation of your app data and click Apply to save.</div>
          <textarea 
            value={text} 
            onChange={e=>setText(e.target.value)} 
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-xs bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
          />
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <button onClick={applyJson} className="btn-success">
              💾 Apply JSON
            </button>
            <button onClick={refreshEditor} className="btn-primary">
              🔄 Refresh from Storage
            </button>
            <button onClick={downloadJson} className="btn-secondary">
              📥 Download Editor JSON
            </button>
            <button onClick={copyToClipboard} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
              📋 Copy to Clipboard
            </button>
            <label className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="text-sm font-medium">📂 Upload JSON File</span>
              <input ref={fileRef} type="file" accept="application/json" onChange={onFileChange} className="hidden" />
            </label>
          </div>
          {msg && <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg text-sm font-medium animate-fade-in">{msg}</div>}
        </div>
      )}

      {/* Raw Dump */}
      {view === 'dump' && (
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>📄</span>
              LocalStorage Dump (read-only)
            </h3>
            <button 
              onClick={()=>navigator.clipboard?.writeText(JSON.stringify(current,null,2))} 
              className="btn-secondary text-sm w-full sm:w-auto"
            >
              📋 Copy to Clipboard
            </button>
          </div>
          <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-4 overflow-auto max-h-[600px] border border-gray-300 dark:border-gray-700 rounded-lg">{JSON.stringify(current, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
