import React, { useState } from 'react'
import { loadData, addClub, addPostToClub, addCommentToPost } from '../utils/storage'

export default function Clubs(){
  const [clubName, setClubName] = useState('')
  const [selected, setSelected] = useState(null)
  const [postText, setPostText] = useState('')
  const [commentText, setCommentText] = useState('')

  const data = loadData()
  const clubs = data.clubs || []

  function createClub(){
    if(!clubName) return
    addClub({ name: clubName })
    setClubName('')
    // refresh via reload
    window.location.reload()
  }

  function makePost(){
    if(!selected || !postText) return
    addPostToClub(selected.id, { author: 'You', content: postText })
    setPostText('')
    window.location.reload()
  }

  function makeComment(postId){
    if(!commentText) return
    addCommentToPost(selected.id, postId, { author: 'You', content: commentText })
    setCommentText('')
    window.location.reload()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Clubs & Discussion Boards
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Join communities and discuss your favorite anime</p>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            placeholder="Enter new club name..." 
            value={clubName} 
            onChange={e=>setClubName(e.target.value)} 
            className="input-field flex-1" 
          />
          <button onClick={createClub} className="btn-success">
            <span className="mr-2">➕</span>
            Create Club
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🏛️</span>
            All Clubs
          </h3>
          <div className="space-y-3">
            {clubs.length === 0 ? (
              <div className="card text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🏛️</div>
                <div>No clubs yet. Create one!</div>
              </div>
            ) : (
              clubs.map(c => (
                <div 
                  key={c.id} 
                  onClick={()=>setSelected(c)} 
                  className={`card cursor-pointer transition-all duration-200 ${
                    selected?.id===c.id 
                      ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="font-semibold text-lg mb-1">{c.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{(c.posts||[]).length} posts</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>💬</span>
                {selected.name}
              </h3>
              
              <div className="card mb-6">
                <h4 className="font-semibold mb-3">Create New Post</h4>
                <textarea 
                  placeholder="Share your thoughts with the community..." 
                  value={postText} 
                  onChange={e=>setPostText(e.target.value)} 
                  className="input-field min-h-[100px] resize-none" 
                />
                <div className="mt-3 flex gap-2">
                  <button onClick={makePost} className="btn-primary">
                    <span className="mr-2">📝</span>
                    Post
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {(selected.posts||[]).length === 0 ? (
                  <div className="card text-center py-12 text-gray-500">
                    <div className="text-5xl mb-3">💬</div>
                    <div className="text-lg">No posts yet</div>
                    <div className="text-sm">Be the first to start a discussion!</div>
                  </div>
                ) : (
                  (selected.posts||[]).map(p => (
                    <div key={p.id} className="card">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full font-medium">
                          {p.author}
                        </span>
                        <span>•</span>
                        <span>{new Date(p.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">{p.content}</div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <span>💭</span>
                          Comments ({(p.comments||[]).length})
                        </div>
                        {(p.comments||[]).length > 0 && (
                          <div className="space-y-2 mb-3">
                            {p.comments.map(c => (
                              <div key={c.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    {c.author}
                                  </span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">{c.content}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <input 
                            placeholder="Add a comment..." 
                            value={commentText} 
                            onChange={e=>setCommentText(e.target.value)} 
                            className="input-field flex-1" 
                          />
                          <button onClick={()=>makeComment(p.id)} className="btn-success">
                            💬 Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="card text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">👈</div>
              <div className="text-xl mb-2">Select a Club</div>
              <div className="text-sm">Choose a club from the list to view posts and join the discussion</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
