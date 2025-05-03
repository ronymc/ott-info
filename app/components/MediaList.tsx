'use client';

import { useEffect, useState } from 'react';
import { MediaItem, getMovies, getTVShows } from '../services/tmdb';
import MediaCard from './MediaCard';

interface MediaListProps {
  selectedLanguage: string | null;
  selectedPlatform: number | null;
  selectedMediaType: string;
}

export default function MediaList({ 
  selectedLanguage, 
  selectedPlatform,
  selectedMediaType 
}: MediaListProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true);
        let data: MediaItem[];
        
        if (selectedMediaType === 'movie') {
          data = await getMovies(
            selectedLanguage || undefined,
            selectedPlatform || undefined
          );
        } else {
          data = await getTVShows(
            selectedLanguage || undefined,
            selectedPlatform || undefined
          );
        }
        
        setMedia(data);
      } catch (err) {
        setError('Failed to load media content. Please try again later.');
        console.error('Error fetching media:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [selectedLanguage, selectedPlatform, selectedMediaType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {media.map((item) => (
        <MediaCard key={`${item.media_type}-${item.id}`} media={item} />
      ))}
    </div>
  );
} 