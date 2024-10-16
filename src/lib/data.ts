import { db } from '@/db';
import {
  collectionMedia,
  collections,
  movies,
  userMedia,
  users,
} from '@/db/schema';
import {
  Movie,
  MovieGenre,
  MovieList,
  SearchParams,
  TVShow,
  TVShowList,
} from '@/lib/definitions';
import { verifySession } from '@/lib/session';
import { and, eq, inArray } from 'drizzle-orm';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await verifySession();

  const user = await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users)
    .where(eq(users.id, session.userId as string));

  return user[0];
});

export async function getMovie(movieId: number): Promise<Movie | null> {
  const query = new URLSearchParams();
  query.append('language', 'en-US');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getTVShow(tvShowId: number): Promise<TVShow | null> {
  const query = new URLSearchParams();
  query.append('language', 'en-US');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvShowId}?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getNowPlayingMovies(): Promise<MovieList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getPopularMovies(): Promise<MovieList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getTopRatedMovies(): Promise<MovieList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/top_rated', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getUpcomingMovies(): Promise<MovieList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/upcoming', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getAiringToday(): Promise<TVShowList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getOnTheAir(): Promise<TVShowList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getPopularTVShows(): Promise<TVShowList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getTopRatedTVShows(): Promise<TVShowList[] | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getMovieGenres(): Promise<MovieGenre[] | null> {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.genres;
  } catch (error) {
    return null;
  }
}

export async function getDiscoverMovies(
  searchParams: SearchParams
): Promise<{ results: MovieList[]; pages: number } | null> {
  const query = new URLSearchParams();
  query.append('include_adult', 'false');
  query.append('include_video', 'false');
  query.append('language', 'en-US');
  query.append('page', '1');

  if (searchParams.sort_by) query.append('sort_by', searchParams.sort_by);

  if (searchParams.genre)
    query.append('with_genres', searchParams.genre.toString());

  if (searchParams.from)
    query.append('release_date.gte', `${searchParams.from}-01-01`);

  if (searchParams.to)
    query.append('release_date.lte', `${searchParams.to}-01-01`);

  if (searchParams.with_release_type)
    query.append('with_release_type', searchParams.with_release_type);

  if (searchParams.min_date)
    query.append('release_date.gte', searchParams.min_date);

  if (searchParams.max_date)
    query.append('release_date.lte', searchParams.max_date);

  if (searchParams.without_genres)
    query.append('without_genres', searchParams.without_genres);

  if (searchParams.vote_count)
    query.append('vote_count.gte', searchParams.vote_count);

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return {
      results: data.results,
      pages: data.total_pages,
    };
  } catch (error) {
    return null;
  }
}

export async function getUserMedia(userId: string) {
  const media = await db
    .select()
    .from(userMedia)
    .where(eq(userMedia.userId, userId));

  return media;
}

export async function getLikedCollection(userId: string) {
  const collection = await db
    .select()
    .from(collections)
    .where(and(eq(collections.userId, userId), eq(collections.name, 'Liked')))
    .limit(1);

  return collection[0];
}

export async function isMediaLiked(userId: string, tmdbId: number) {
  const media = await getUserMedia(userId);
  
  const currentMedia = media.filter((m) => m.tmdbId === tmdbId);
  if (currentMedia.length === 0) {
    return false;
  }

  const likedCollection = await getLikedCollection(userId);
  if (!likedCollection) {
    return false;
  }
  const collectionId = likedCollection.id;

  const likedMedia = await db
    .select()
    .from(collectionMedia)
    .where(
      and(
        eq(collectionMedia.collectionId, collectionId),
        eq(collectionMedia.mediaId, currentMedia[0].id)
      )
    )
    .limit(1);

  return likedMedia.length > 0;
}

export async function getLikedMovies(userId: string) {
  const likedCollection = await getLikedCollection(userId);
  if (!likedCollection) {
    return [];
  }
  const collectionId = likedCollection.id;

  const likedMedia = await db
    .select({
      mediaId: collectionMedia.mediaId,
    })
    .from(collectionMedia)
    .where(eq(collectionMedia.collectionId, collectionId));
  if (likedMedia.length === 0) {
    return [];
  }
  const mediaIdList = likedMedia.map((m) => m.mediaId);

  const likedMovies = await db
    .select()
    .from(movies)
    .where(inArray(movies.mediaId, mediaIdList));

  return likedMovies;
}
