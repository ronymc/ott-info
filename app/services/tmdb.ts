const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Indian streaming service provider IDs
const INDIAN_WATCH_PROVIDERS = [
  8,    // Netflix
  119,  // Amazon Prime
  2336, // Disney+ Hotstar
  237,  // SonyLIV
  232,  // Zee5
  2177  // Manorama Max Amazon
];

// Common Indian languages with their ISO codes
export const INDIAN_LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'en', name: 'English' }
];

// Provider ID to name mapping
export const PROVIDER_NAMES: Record<number, string> = {
  8: 'Netflix',
  119: 'Prime',
  2336: 'Hotstar',
  237: 'SonyLIV',
  232: 'Zee5',
  2177: 'Manorama Max Amazon'
};

// Provider ID to logo path mapping
export const PROVIDER_LOGOS: Record<number, string> = {
  8: '/provider-logos/netflix.svg',
  119: '/provider-logos/prime.svg',
  2336: '/provider-logos/hotstar.svg',
  237: '/provider-logos/sonyliv.svg',
  232: '/provider-logos/zee5.svg',
  2177: '/provider-logos/jiocinema.svg'
};

interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface MediaItem {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  watch_providers: WatchProvider[];
  original_language: string;
}

export interface MediaResponse {
  items: MediaItem[];
  totalPages: number;
  currentPage: number;
}

async function fetchWatchProviders(type: 'movie' | 'tv', id: number): Promise<WatchProvider[]> {
  const providersResponse = await fetch(
    `${TMDB_BASE_URL}/${type}/${id}/watch/providers?api_key=${TMDB_API_KEY}`
  );

  if (!providersResponse.ok) {
    return [];
  }

  const providersData = await providersResponse.json();
  const indiaProviders = providersData.results.IN?.flatrate || [];

  return indiaProviders.map((provider: any) => ({
    provider_id: provider.provider_id,
    provider_name: provider.provider_name,
    logo_path: provider.logo_path,
  }));
}

export async function getMovies(
  language?: string,
  platformId?: number,
  page: number = 1
): Promise<MediaResponse> {
  const watchProvidersString = INDIAN_WATCH_PROVIDERS.join('|');
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_origin_country=IN&language=en-US&page=${page}&with_watch_providers=${watchProvidersString}&watch_region=IN&sort_by=primary_release_date.desc${language ? `&with_original_language=${language}` : ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  const movies: MediaItem[] = [];

  for (const movie of data.results) {
    const watchProviders = await fetchWatchProviders('movie', movie.id);

    // If platform filter is active, only include movies available on that platform
    if (platformId && !watchProviders.some(provider => provider.provider_id === platformId)) {
      continue;
    }

    movies.push({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      media_type: 'movie',
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      original_language: movie.original_language,
      watch_providers: watchProviders,
    });
  }

  return {
    items: movies,
    totalPages: Math.min(data.total_pages, 500), // TMDB API limits to 500 pages
    currentPage: page
  };
}

export async function getTVShows(
  language?: string,
  platformId?: number,
  page: number = 1
): Promise<MediaResponse> {
  const watchProvidersString = INDIAN_WATCH_PROVIDERS.join('|');
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_origin_country=IN&language=en-US&page=${page}&with_watch_providers=${watchProvidersString}&watch_region=IN&sort_by=first_air_date.desc${language ? `&with_original_language=${language}` : ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch TV shows');
  }

  const data = await response.json();
  const tvShows: MediaItem[] = [];

  for (const show of data.results) {
    const watchProviders = await fetchWatchProviders('tv', show.id);

    // If platform filter is active, only include shows available on that platform
    if (platformId && !watchProviders.some(provider => provider.provider_id === platformId)) {
      continue;
    }

    tvShows.push({
      id: show.id,
      title: show.name,
      overview: show.overview,
      poster_path: show.poster_path,
      media_type: 'tv',
      release_date: show.first_air_date,
      vote_average: show.vote_average,
      original_language: show.original_language,
      watch_providers: watchProviders,
    });
  }

  return {
    items: tvShows,
    totalPages: Math.min(data.total_pages, 500), // TMDB API limits to 500 pages
    currentPage: page
  };
} 