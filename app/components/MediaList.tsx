'use client';

import { useEffect, useState } from 'react';
import { MediaItem, getMovies, getTVShows, MediaResponse } from '../services/tmdb';
import MediaCard from './MediaCard';
import Pagination from './Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true);
        let response: MediaResponse;
        
        if (selectedMediaType === 'movie') {
          response = await getMovies(
            selectedLanguage || undefined,
            selectedPlatform || undefined,
            currentPage
          );
        } else {
          response = await getTVShows(
            selectedLanguage || undefined,
            selectedPlatform || undefined,
            currentPage
          );
        }
        
        setMedia(response.items);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Failed to load media content. Please try again later.');
        console.error('Error fetching media:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [selectedLanguage, selectedPlatform, selectedMediaType, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {media.map((item) => (
          <MediaCard key={`${item.media_type}-${item.id}`} media={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 