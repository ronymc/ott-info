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
  watch_providers?: {
    provider_id: number;
    logo_path: string;
    provider_name: string;
  }[];
  original_language: string;
}

export async function getIndianMedia(
  language?: string, 
  platformId?: number,
  mediaType?: string
): Promise<MediaItem[]> {
  const mediaTypes = mediaType ? [mediaType] : ['movie', 'tv'];
  const allMedia: MediaItem[] = [];
  const watchProvidersString = INDIAN_WATCH_PROVIDERS.join('|');

  for (const type of mediaTypes) {
    // Use different sort parameters for movies and TV shows
    const sortBy = type === 'movie' 
      ? 'primary_release_date.desc' 
      : 'first_air_date.desc';
    
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_origin_country=IN&language=en-US&page=1&with_watch_providers=${watchProvidersString}
      &watch_region=IN&sort_by=${sortBy}${language ? `&with_original_language=${language}` : ''
      }`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} data`);
    }

    const data = await response.json();
    const items = data.results.slice(0, 10);

    for (const item of items) {
      // Fetch watch providers for each item
      const providersResponse = await fetch(
        `${TMDB_BASE_URL}/${type}/${item.id}/watch/providers?api_key=${TMDB_API_KEY}`
      );

      if (providersResponse.ok) {
        const providersData = await providersResponse.json();
        const indiaProviders = providersData.results.IN?.flatrate || [];

        // If platform filter is active, only include items available on that platform
        if (platformId && !indiaProviders.some((provider: any) => provider.provider_id === platformId)) {
          continue;
        }

        const watchProviders = indiaProviders.map((provider: any) => ({
          provider_id: provider.provider_id,
          provider_name: provider.provider_name,
          logo_path: provider.logo_path,
        }));

        allMedia.push({
          id: item.id,
          title: item.title || item.name,
          overview: item.overview,
          poster_path: item.poster_path,
          media_type: type as 'movie' | 'tv',
          release_date: item.release_date || item.first_air_date,
          vote_average: item.vote_average,
          original_language: item.original_language,
          watch_providers: watchProviders,
        });
      }
    }
  }

  return allMedia;
} 