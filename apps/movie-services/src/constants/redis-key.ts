export const REDIS_KEY = {
  MOVIES: 'movies',
  MOVIES_BY_ID: (id: string) => `movies:${id}`,
  MOVIES_PAGINATED: (
    page: number,
    limit: number,
    genreId?: string,
    search?: string,
  ) => `movies:${page}:${limit}:${genreId}:${search}`,
  MOVIES_TOTAL_COUNT: (
    page: number,
    limit: number,
    genreId?: string,
    search?: string,
  ) => `movies:${page}:${limit}:${genreId}:${search}:total`,
  GENRES: 'genres',
  GENRES_BY_ID: (id: string) => `genres:${id}`,
};
