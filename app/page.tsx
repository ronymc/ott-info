'use client';

import { useState } from 'react';
import MediaList from './components/MediaList';
import LanguageFilter from './components/LanguageFilter';
import PlatformFilter from './components/PlatformFilter';
import MediaTypeFilter from './components/MediaTypeFilter';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              OTT Info
            </h1>
            <div className="flex items-center space-x-4">
              <input
                type="search"
                placeholder="Search movies..."
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 mb-8">
          <MediaTypeFilter
            selectedMediaType={selectedMediaType}
            onMediaTypeChange={setSelectedMediaType}
          />
          <LanguageFilter
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          <PlatformFilter
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
          />
        </div>
        <MediaList 
          selectedLanguage={selectedLanguage} 
          selectedPlatform={selectedPlatform}
          selectedMediaType={selectedMediaType}
        />
      </main>
    </div>
  );
}
