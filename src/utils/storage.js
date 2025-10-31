import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'anime_tracker_data_v1'

const defaultState = {
  // Seeded demo data for first-run to make the app more useful out-of-the-box
  shows: [
    { id: uuidv4(), title: 'Fullmetal Alchemist: Brotherhood', totalEpisodes: 64, watched: 12, tags: ['Action','Adventure','2009'], spoiler: 'Amazing pacing and payoff.', status: 'Watching' },
    { id: uuidv4(), title: 'Cowboy Bebop', totalEpisodes: 26, watched: 26, tags: ['Sci-Fi','Action','1998'], spoiler: 'A classic with great music.', status: 'Completed' },
    { id: uuidv4(), title: 'Breaking Bad', totalEpisodes: 62, watched: 30, tags: ['Crime','Drama','2008'], spoiler: 'Dark and addictive.', status: 'Watching' }
  ],
  clubs: [
    { id: uuidv4(), name: 'General Anime', members: ['You'], posts: [
      { id: uuidv4(), author: 'Admin', createdAt: Date.now(), content: 'Welcome to the General Anime club!', comments: [] }
    ] },
    { id: uuidv4(), name: 'Sci-Fi Fans', members: [], posts: [] }
  ],
  polls: [
    { id: uuidv4(), contextId: null, question: 'Best anime of the 2000s?', options: ['Fullmetal Alchemist','Death Note','Code Geass'], votes: {} }
  ],
  ratings: {},
  settings: {
    theme: 'light'
  }
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return JSON.parse(raw)
  } catch (e) {
    console.error('loadData error', e)
    return defaultState
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY)
}

export function addShow(show) {
  const data = loadData()
  const newShow = { id: uuidv4(), ...show, watched: 0 }
  data.shows.unshift(newShow)
  saveData(data)
  return newShow
}

export function updateShow(id, patch) {
  const data = loadData()
  data.shows = data.shows.map(s => s.id === id ? { ...s, ...patch } : s)
  saveData(data)
}

export function deleteShow(id) {
  const data = loadData()
  data.shows = data.shows.filter(s => s.id !== id)
  saveData(data)
}

// Clubs & posts
export function addClub(club) {
  const data = loadData()
  const newClub = { id: uuidv4(), members: [], posts: [], ...club }
  data.clubs.push(newClub)
  saveData(data)
  return newClub
}

export function addPostToClub(clubId, post) {
  const data = loadData()
  const club = data.clubs.find(c => c.id === clubId)
  if (!club) return
  club.posts.push({ id: uuidv4(), createdAt: Date.now(), comments: [], ...post })
  saveData(data)
}

export function addCommentToPost(clubId, postId, comment) {
  const data = loadData()
  const club = data.clubs.find(c => c.id === clubId)
  if (!club) return
  const post = club.posts.find(p => p.id === postId)
  if (!post) return
  post.comments.push({ id: uuidv4(), createdAt: Date.now(), ...comment })
  saveData(data)
}

// Polls & Ratings
export function addPoll(poll) {
  const data = loadData()
  const newPoll = { id: uuidv4(), votes: {}, ...poll }
  data.polls.push(newPoll)
  saveData(data)
  return newPoll
}

export function votePoll(pollId, option) {
  const data = loadData()
  const poll = data.polls.find(p => p.id === pollId)
  if (!poll) return
  poll.votes[option] = (poll.votes[option] || 0) + 1
  saveData(data)
}

export function rateShow(showId, rating) {
  const data = loadData()
  data.ratings = data.ratings || {}
  data.ratings[showId] = data.ratings[showId] || []
  data.ratings[showId].push({ id: uuidv4(), value: Number(rating), createdAt: Date.now() })
  saveData(data)
}

export function getAverageRating(showId) {
  const data = loadData()
  const arr = data.ratings?.[showId] || []
  if (!arr.length) return { avg: 0, count: 0 }
  const sum = arr.reduce((s,i)=>s + Number(i.value), 0)
  return { avg: +(sum / arr.length).toFixed(1), count: arr.length }
}

// Simple mocked recommendations: in real app you'd call AI.
export function getAiRecommendations(favoriteTags=[]) {
  const all = [
    { title: 'Attack on Titan', tags: ['Action','Drama','2013'] },
    { title: 'Fullmetal Alchemist: Brotherhood', tags: ['Action','Adventure','2009'] },
    { title: 'Breaking Bad', tags: ['Crime','Drama','2008'] },
    { title: 'Cowboy Bebop', tags: ['Sci-Fi','Action','1998'] },
    { title: 'Steins;Gate', tags: ['Sci-Fi','Thriller','2011'] },
    { title: 'One Piece', tags: ['Adventure','Comedy','1999'] }
  ]
  if (!favoriteTags || favoriteTags.length === 0) return all
  return all.filter(item => item.tags.some(t => favoriteTags.includes(t)))
}
