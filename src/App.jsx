import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Watchlist from './components/Watchlist'
import Discover from './components/Discover'
import Clubs from './components/Clubs'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import Help from './components/Help'
import Recommendations from './components/Recommendations'
import Footer from './components/Footer'
import Login from './components/Login'
import { loadData, saveData } from './utils/storage'

export default function App(){
  const [theme, setTheme] = useState('light')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(()=>{
    // Check for existing auth
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }

    const data = loadData()
    const t = data.settings?.theme || 'light'
    setTheme(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
    saveData(data)
  },[])

  const handleLogin = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
  }

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  // Admin only route wrapper
  const AdminRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    if (user?.role !== 'admin') {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar theme={theme} setTheme={setTheme} user={user} onLogout={handleLogout} />}
      <main className="flex-1 py-8">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route path="/" element={<ProtectedRoute><Watchlist token={token} /></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute><Discover token={token} /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/clubs" element={<ProtectedRoute><Clubs token={token} user={user} /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard token={token} /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPanel token={token} user={user} /></AdminRoute>} />
        </Routes>
      </main>
      {isAuthenticated && <Footer />}
    </div>
  )
}
