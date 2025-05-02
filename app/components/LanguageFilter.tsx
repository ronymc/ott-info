'use client';

import { INDIAN_LANGUAGES } from '../services/tmdb';

interface LanguageFilterProps {
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
}

export default function LanguageFilter({ selectedLanguage, onLanguageChange }: LanguageFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onLanguageChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selectedLanguage === null
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        All Languages
      </button>
      {INDIAN_LANGUAGES.map((language) => (
        <button
          key={language.code}
          onClick={() => onLanguageChange(language.code)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedLanguage === language.code
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {language.name}
        </button>
      ))}
    </div>
  );
} 