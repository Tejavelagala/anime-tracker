import React, { useState } from 'react'

export default function Help() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = {
    'getting-started': {
      title: '🚀 Getting Started',
      content: (
        <>
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">Welcome to Anime Tracker!</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Anime Tracker is your ultimate companion for managing and tracking your anime and TV series watchlist. 
            Follow these steps to get started:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">1. Create an Account</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Click on "Login" in the navigation bar and select "Create Account". Fill in your details to register.
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">2. Add Your First Show</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Navigate to "My Watchlist" and use the "Add New Show" form to add anime or TV series you want to track.
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">3. Discover New Anime</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Use the "Discover" feature to search for anime using the Jikan API (MyAnimeList database).
              </p>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">4. Track Your Progress</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Use the +/- buttons on each show card to track episodes watched. View your statistics in the Dashboard.
              </p>
            </div>
          </div>
        </>
      )
    },
    'features': {
      title: '✨ Features Guide',
      content: (
        <>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Complete Features List</h3>
          
          <div className="space-y-3">
            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>📋</span> Watchlist Management
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Add shows with title, total episodes, tags, and status</li>
                <li>Track watched episodes with +/- controls</li>
                <li>Filter by status: All, Watching, Completed, On Hold, Dropped, Plan to Watch</li>
                <li>Add streaming platform links (Netflix, Crunchyroll, Funimation, etc.)</li>
                <li>Set reminders for upcoming episodes</li>
                <li>Add spoilers/reviews with hide/reveal functionality</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>📊</span> Dashboard & Analytics
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>View total shows, episodes, and watched count</li>
                <li>Track overall progress percentage</li>
                <li>Completion rate and average episodes per show</li>
                <li>Status breakdown visualization</li>
                <li>Recent activity timeline</li>
                <li>Social statistics (clubs, polls, ratings)</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>🔍</span> Discover & Search
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Search anime using Jikan API (MyAnimeList)</li>
                <li>View anime details: synopsis, tags, images</li>
                <li>Add anime directly to watchlist from search results</li>
                <li>Search cache for faster repeat searches</li>
                <li>Search history sidebar</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>🏛️</span> Clubs & Discussion
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Create custom clubs for specific anime/genres</li>
                <li>Post discussions and share thoughts</li>
                <li>Comment on posts from other members</li>
                <li>Join multiple clubs</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>⭐</span> Ratings & Polls
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Rate shows with 5-star system</li>
                <li>View average ratings from all users</li>
                <li>Create polls with multiple options</li>
                <li>Vote on polls and see results</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>🎨</span> Customization
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Dark and Light mode toggle</li>
                <li>Persistent theme preference</li>
                <li>Animated gradient backgrounds</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>🤖</span> AI Recommendations
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Get personalized anime recommendations</li>
                <li>Based on your watched shows and ratings</li>
                <li>Tag-based filtering for similar content</li>
                <li>Discover new shows matching your preferences</li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
                <span>🔐</span> Admin Panel (Admin Only)
              </h4>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>System-wide statistics and metrics</li>
                <li>User management and role assignment</li>
                <li>Data validation and integrity checks</li>
                <li>Import/Export functionality</li>
                <li>Raw data editor</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    'faq': {
      title: '❓ Frequently Asked Questions',
      content: (
        <>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Common Questions</h3>
          
          <div className="space-y-4">
            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: How do I add streaming links to my shows?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                When adding a new show in the Watchlist, click the "📺 Streaming Links" button to expand the streaming platform form. 
                Enter URLs for Netflix, Crunchyroll, Funimation, Hulu, Amazon Prime, Disney+, or other platforms where the show is available.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: How does the recommendation system work?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The AI-powered recommendation system analyzes your watched shows, ratings, and favorite tags to suggest similar anime. 
                It uses content-based filtering to match shows with similar genres, themes, and styles.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: Is my data saved?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Yes! Your data is saved in two places: LocalStorage (browser cache) and MongoDB database (when logged in). 
                Your watchlist, clubs, polls, and ratings are synced with the backend for persistent storage.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: Can I share my watchlist with friends?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Yes! Click the "📤 Share" button on any show card to copy the show data as JSON to your clipboard. 
                You can then share it with friends via messaging apps or social media.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: What is the Discover feature?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The Discover feature lets you search for anime using the Jikan API, which connects to MyAnimeList's database. 
                Type 2+ characters to search, view details including synopsis and tags, and add shows directly to your watchlist.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: How do I become an admin?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Admin access is restricted. The first user can be promoted to admin using MongoDB shell or Compass. 
                See the ADMIN_SETUP.md documentation file for detailed instructions.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: Can I create polls for specific shows?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Yes! Polls are contextual and can be created for individual shows. Scroll to the bottom of any show card 
                to create polls, and club members can vote on them.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: How do spoilers work?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                When adding a show, you can include spoilers/reviews in the optional field. These are hidden by default. 
                Click the "👁️ Reveal Spoiler" button on the show card to view the content.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: What browsers are supported?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Anime Tracker works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. 
                For best performance, use the latest version of your preferred browser.
              </p>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Q: Is the app mobile-friendly?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Absolutely! The entire app is built with a mobile-first responsive design. All features work seamlessly 
                on phones, tablets, and desktop computers.
              </p>
            </div>
          </div>
        </>
      )
    },
    'troubleshooting': {
      title: '🔧 Troubleshooting',
      content: (
        <>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Common Issues & Solutions</h3>
          
          <div className="space-y-4">
            <div className="card border-l-4 border-yellow-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>⚠️</span> Shows not saving
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Check if you're logged in - login required for database sync</li>
                <li>Check browser console for errors (F12 → Console tab)</li>
                <li>Ensure MongoDB is running (if using local backend)</li>
                <li>Clear browser cache and reload the page</li>
              </ul>
            </div>

            <div className="card border-l-4 border-red-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>❌</span> Login/Registration failing
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Verify backend server is running (http://localhost:5000)</li>
                <li>Check MongoDB connection in backend logs</li>
                <li>Ensure email format is valid</li>
                <li>Password must be at least 6 characters</li>
              </ul>
            </div>

            <div className="card border-l-4 border-blue-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>🔍</span> Discover search not working
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Type at least 2 characters in the search box</li>
                <li>Wait for debounce delay (350ms)</li>
                <li>Check internet connection - Jikan API requires connectivity</li>
                <li>Try clearing search cache</li>
                <li>Jikan API may have rate limits - wait a few seconds between searches</li>
              </ul>
            </div>

            <div className="card border-l-4 border-purple-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>🎨</span> Dark mode not working
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Click the theme toggle button in the navbar (sun/moon icon)</li>
                <li>Preference is saved in localStorage</li>
                <li>Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)</li>
              </ul>
            </div>

            <div className="card border-l-4 border-green-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>📊</span> Dashboard shows wrong stats
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Dashboard loads from API - ensure you're logged in</li>
                <li>If API fails, it falls back to localStorage data</li>
                <li>Check backend logs for errors</li>
                <li>Refresh the page to reload statistics</li>
              </ul>
            </div>

            <div className="card border-l-4 border-orange-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>⚡</span> App is slow or laggy
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Clear browser cache and cookies</li>
                <li>Close unused browser tabs</li>
                <li>Use latest browser version</li>
                <li>Check if backend server is running locally (slower than production)</li>
                <li>Reduce number of shows in watchlist (large datasets slow down localStorage)</li>
              </ul>
            </div>

            <div className="card border-l-4 border-indigo-500">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>🔐</span> Admin panel not accessible
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Solution:</strong>
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-disc">
                <li>Only users with admin role can access the admin panel</li>
                <li>Check your user role in database (MongoDB)</li>
                <li>See ADMIN_SETUP.md for instructions on creating admin users</li>
                <li>Admin link only appears in navbar if user.role === 'admin'</li>
              </ul>
            </div>

            <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span>💡</span> Still having issues?
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If none of these solutions work, try these steps:
              </p>
              <ol className="text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-6 list-decimal mt-2">
                <li>Check browser console for error messages (F12)</li>
                <li>Verify all environment variables are set correctly</li>
                <li>Restart both frontend (Vite) and backend (Node.js) servers</li>
                <li>Check MongoDB connection status</li>
                <li>Review README_FULLSTACK.md for setup instructions</li>
              </ol>
            </div>
          </div>
        </>
      )
    },
    'shortcuts': {
      title: '⌨️ Keyboard Shortcuts & Tips',
      content: (
        <>
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Tips & Tricks</h3>
          
          <div className="space-y-4">
            <div className="card">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Quick Tips</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Use the filter buttons in Watchlist to quickly find shows by status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Add tags when creating shows for better organization and recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Rate shows to get better AI recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Use search history in Discover to quickly re-run previous searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Click on club posts to view and add comments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Toggle dark mode for comfortable viewing at night</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Add streaming links when creating shows for quick access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Check Dashboard regularly to track your progress and statistics</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Best Practices</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Keep your watchlist organized</p>
                  <p className="text-gray-700 dark:text-gray-300">Regularly update show statuses and episode counts to maintain accurate statistics</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Engage with the community</p>
                  <p className="text-gray-700 dark:text-gray-300">Join clubs, create discussions, and participate in polls to enhance your experience</p>
                </div>
                <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Backup your data</p>
                  <p className="text-gray-700 dark:text-gray-300">Use the Admin Panel export feature to backup your watchlist regularly</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Explore recommendations</p>
                  <p className="text-gray-700 dark:text-gray-300">Check the Recommendations page to discover new anime based on your preferences</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Help & Documentation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Everything you need to know about using Anime Tracker</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Topics</h3>
            <div className="space-y-2">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === key
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="card">
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  )
}
