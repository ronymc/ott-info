'use client';

// Define streaming platforms with their IDs and names
const STREAMING_PLATFORMS = [
  { id: 8, name: 'Netflix' },
  { id: 119, name: 'Prime' },
  { id: 2336, name: 'Hotstar' },
  { id: 237, name: 'SonyLIV' },
  { id: 482, name: 'Zee5' },
  { id: 2177, name: 'JioCinema' }
];

interface PlatformFilterProps {
  selectedPlatform: number | null;
  onPlatformChange: (platformId: number | null) => void;
}

export default function PlatformFilter({ selectedPlatform, onPlatformChange }: PlatformFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onPlatformChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selectedPlatform === null
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        All Platforms
      </button>
      {STREAMING_PLATFORMS.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onPlatformChange(platform.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedPlatform === platform.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {platform.name}
        </button>
      ))}
    </div>
  );
} 