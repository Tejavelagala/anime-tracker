import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { loadData, saveData } from '../utils/storage'

export default function Navbar({ theme, setTheme, user, onLogout }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  function toggleTheme() {
    const data = loadData()
    const next = theme === 'dark' ? 'light' : 'dark'
    data.settings = { ...(data.settings || {}), theme: next }
    saveData(data)
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-xl">AT</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Anime Tracker
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>Watchlist</NavLink>
            <NavLink to="/discover" className={navLinkClass}>Discover</NavLink>
            <NavLink to="/recommendations" className={navLinkClass}>
              <span className="flex items-center gap-1">
                🤖 AI Picks
              </span>
            </NavLink>
            <NavLink to="/clubs" className={navLinkClass}>Clubs</NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/help" className={navLinkClass}>
              <span className="flex items-center gap-1">
                ❓ Help
              </span>
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={navLinkClass}>
                <span className="flex items-center gap-1">
                  ⚙️ Admin
                </span>
              </NavLink>
            )}
          </nav>

          {/* Theme Toggle & User Menu & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            {/* User Menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="font-medium hidden lg:block">{user?.username || 'User'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      onLogout()
                      navigate('/login')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-1 animate-fade-in">
            <NavLink to="/" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Watchlist</NavLink>
            <NavLink to="/discover" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Discover</NavLink>
            <NavLink to="/recommendations" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>🤖 AI Picks</NavLink>
            <NavLink to="/clubs" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Clubs</NavLink>
            <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/help" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>❓ Help</NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                ⚙️ Admin Panel
              </NavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
