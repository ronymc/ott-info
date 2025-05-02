import Image from 'next/image';
import { MediaItem } from '../services/tmdb';

interface MediaCardProps {
  media: MediaItem;
}

export default function MediaCard({ media }: MediaCardProps) {
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : '/placeholder-poster.jpg';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-[400px] w-full">
        <Image
          src={posterUrl}
          alt={media.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-grow">
            {media.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {media.media_type.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          {/* Streaming Platforms */}
          {media.watch_providers && media.watch_providers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {media.watch_providers.map((provider) => (
                <div 
                  key={provider.provider_id} 
                  className="w-6 h-6 relative"
                  title={provider.provider_name}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={`Watch on ${provider.provider_name}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Not streaming
            </div>
          )}
          
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {media.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 