'use client';

// Define media types
const MEDIA_TYPES = [
  { id: 'all', name: 'All' },
  { id: 'movie', name: 'Movies' },
  { id: 'tv', name: 'TV Shows' }
];

interface MediaTypeFilterProps {
  selectedMediaType: string;
  onMediaTypeChange: (mediaType: string) => void;
}

export default function MediaTypeFilter({ selectedMediaType, onMediaTypeChange }: MediaTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {MEDIA_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => onMediaTypeChange(type.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedMediaType === type.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
} 