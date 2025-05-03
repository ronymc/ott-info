'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            OTT Info
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            href="/movies"
            className="block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Movies
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Browse and discover movies available on various streaming platforms in India.
            </p>
          </Link>
          
          <Link 
            href="/tv"
            className="block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              TV Shows
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore TV shows and series streaming on Indian OTT platforms.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
