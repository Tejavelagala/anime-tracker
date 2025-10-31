import React, { useEffect, useState } from 'react'
import { loadData, addShow, updateShow } from '../utils/storage'
import ShowCard from './ShowCard'

export default function Watchlist() {
  const [dataVersion, setDataVersion] = useState(0)
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({ 
    title: '', 
    totalEpisodes: 12, 
    tags: '', 
    spoiler: '', 
    status: 'Plan to Watch',
    streamingLinks: {
      netflix: '',
      crunchyroll: '',
      funimation: '',
      hulu: '',
      amazonPrime: '',
      disneyPlus: '',
      other: ''
    }
  })
  const [showStreamingForm, setShowStreamingForm] = useState(false)

  function refresh() { setDataVersion(v=>v+1) }

  const data = loadData()
  const shows = data.shows || []

  const menu = ['All','Watching','Completed','On Hold','Dropped','Plan to Watch']

  function addNew(e) {
    e.preventDefault()
    if (!form.title || form.title.trim().length < 1) return alert('Please enter a title for the show.')
    const episodes = Number(form.totalEpisodes)
    if (!episodes || episodes < 1) return alert('Total episodes must be at least 1.')

    const s = {
      title: form.title.trim(),
      totalEpisodes: episodes,
      tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
      spoiler: form.spoiler,
      status: form.status,
      streamingLinks: form.streamingLinks
    }
    addShow(s)
    setForm({ 
      title: '', 
      totalEpisodes: 12, 
      tags: '', 
      spoiler: '', 
      status: 'Plan to Watch',
      streamingLinks: {
        netflix: '',
        crunchyroll: '',
        funimation: '',
        hulu: '',
        amazonPrime: '',
        disneyPlus: '',
        other: ''
      }
    })
    setShowStreamingForm(false)
    refresh()
    alert('Show added to your watchlist.')
  }

  const filtered = shows.filter(s => filter === 'All' ? true : s.status === filter)

  useEffect(()=>{
    // noop
  },[dataVersion])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          My Watchlist
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Track and manage your anime collection</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {menu.map(m => (
          <button 
            key={m} 
            onClick={()=>setFilter(m)} 
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter===m 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <form onSubmit={addNew} className="card mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>➕</span>
          Add New Show
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input 
            required 
            placeholder="Show Title" 
            value={form.title} 
            onChange={e=>setForm({...form, title:e.target.value})} 
            className="input-field" 
          />
          <input 
            required 
            type="number" 
            min={1} 
            placeholder="Total Episodes" 
            value={form.totalEpisodes} 
            onChange={e=>setForm({...form, totalEpisodes:e.target.value})} 
            className="input-field" 
          />
          <input 
            placeholder="Tags (comma separated)" 
            value={form.tags} 
            onChange={e=>setForm({...form, tags:e.target.value})} 
            className="input-field" 
          />
          <select 
            value={form.status} 
            onChange={e=>setForm({...form, status:e.target.value})} 
            className="input-field"
          >
            <option>Watching</option>
            <option>Completed</option>
            <option>On Hold</option>
            <option>Dropped</option>
            <option>Plan to Watch</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            placeholder="Spoiler/Review (optional)" 
            value={form.spoiler} 
            onChange={e=>setForm({...form, spoiler:e.target.value})} 
            className="input-field flex-1" 
          />
          <button 
            type="button"
            onClick={() => setShowStreamingForm(!showStreamingForm)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            {showStreamingForm ? '🔼 Hide' : '📺'} Streaming Links
          </button>
          <button className="btn-success">
            <span className="mr-2">➕</span>
            Add Show
          </button>
        </div>

        {showStreamingForm && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span>🔗</span>
              Add Streaming Platform Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="Netflix URL"
                value={form.streamingLinks.netflix}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, netflix: e.target.value}})}
                className="input-field text-sm"
              />
              <input
                placeholder="Crunchyroll URL"
                value={form.streamingLinks.crunchyroll}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, crunchyroll: e.target.value}})}
                className="input-field text-sm"
              />
              <input
                placeholder="Funimation URL"
                value={form.streamingLinks.funimation}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, funimation: e.target.value}})}
                className="input-field text-sm"
              />
              <input
                placeholder="Hulu URL"
                value={form.streamingLinks.hulu}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, hulu: e.target.value}})}
                className="input-field text-sm"
              />
              <input
                placeholder="Amazon Prime URL"
                value={form.streamingLinks.amazonPrime}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, amazonPrime: e.target.value}})}
                className="input-field text-sm"
              />
              <input
                placeholder="Disney+ URL"
                value={form.streamingLinks.disneyPlus}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, disneyPlus: e.target.value}})}
                className="input-field text-sm"
              />
              <input
                placeholder="Other Platform URL"
                value={form.streamingLinks.other}
                onChange={e=>setForm({...form, streamingLinks: {...form.streamingLinks, other: e.target.value}})}
                className="input-field text-sm sm:col-span-2"
              />
            </div>
          </div>
        )}
      </form>

      {filtered.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">📺</div>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {filter === 'All' ? 'No shows in your watchlist' : `No shows with status "${filter}"`}
          </div>
          <div className="text-gray-500">
            {filter === 'All' ? 'Add your first anime to get started!' : 'Try selecting a different filter or add new shows.'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map(show => (
            <ShowCard key={show.id} show={show} onChange={refresh} />
          ))}
        </div>
      )}
    </div>
  )
}
