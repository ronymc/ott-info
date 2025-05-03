'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 py-4">
          <Link
            href="/movies"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/movies'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/tv'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            TV Shows
          </Link>
        </div>
      </div>
    </nav>
  );
} 