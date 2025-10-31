import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AT</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">Anime Tracker</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your favorite anime and TV series with ease. Built for anime enthusiasts.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Track Progress</li>
              <li>• Join Clubs</li>
              <li>• Rate & Review</li>
              <li>• Discover New Shows</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Project Info</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Capstone Project • {new Date().getFullYear()}
              <br />
              Local Storage Demo
              <br />
              Powered by Jikan API
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Anime Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
