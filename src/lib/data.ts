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
  MovieList,
  SearchParams,
  TVShow,
  TVShowList,
} from '@/lib/definitions';
import { verifySession } from '@/lib/session';
import { and, desc, eq, sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await verifySession();

  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.userId as string));

  return user[0];
});

export async function getMovie(movieId: number): Promise<Movie | null> {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getTVShow(tvShowId: number): Promise<TVShow | null> {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getNowPlayingMovies(): Promise<MovieList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getPopularMovies(): Promise<MovieList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getTopRatedMovies(): Promise<MovieList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/top_rated', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getUpcomingMovies(): Promise<MovieList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/upcoming', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getAiringToday(): Promise<TVShowList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/tv/airing_today', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getOnTheAir(): Promise<TVShowList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/tv/on_the_air', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getPopularTVShows(): Promise<TVShowList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/tv/popular', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getTopRatedTVShows(): Promise<TVShowList[] | null> {
  try {
    const res = await fetch('https://api.themoviedb.org/3/tv/top_rated', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getDiscoverMovies(
  searchParams: SearchParams
): Promise<{ results: MovieList[]; pages: number } | null> {
  const query = new URLSearchParams();
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
        next: {
          revalidate: 3600,
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

export async function getSearchMovies(
  query: string
): Promise<{ results: MovieList[]; pages: number } | null> {
  const searchParams = new URLSearchParams();
  searchParams.append('query', query);

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?${searchParams}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
        next: {
          revalidate: 3600,
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

export const isMediaLiked = (userId: string, tmdbId: number) =>
  unstable_cache(
    async () => {
      const result = await db
        .select({
          media: userMedia,
          isLiked: sql<boolean>`CASE WHEN collection_media.id IS NOT NULL THEN true ELSE false END`,
        })
        .from(userMedia)
        .leftJoin(
          collections,
          and(
            eq(collections.userId, userMedia.userId),
            eq(collections.name, 'Liked')
          )
        )
        .leftJoin(
          collectionMedia,
          and(
            eq(collectionMedia.mediaId, userMedia.id),
            eq(collectionMedia.collectionId, collections.id)
          )
        )
        .where(and(eq(userMedia.userId, userId), eq(userMedia.tmdbId, tmdbId)))
        .limit(1);

      return result[0] ? result[0].isLiked : false;
    },
    [`user-${userId}-media-${tmdbId}`],
    { revalidate: 600, tags: [`user-${userId}-media-${tmdbId}`] }
  )();

export const getLikedMovies = (userId: string) =>
  unstable_cache(
    async () => {
      const likedMovies = await db
        .select({
          movie: movies,
        })
        .from(movies)
        .innerJoin(userMedia, eq(userMedia.id, movies.mediaId))
        .innerJoin(collectionMedia, eq(collectionMedia.mediaId, userMedia.id))
        .innerJoin(
          collections,
          and(
            eq(collections.id, collectionMedia.collectionId),
            eq(collections.userId, userId),
            eq(collections.name, 'Liked')
          )
        );

      return likedMovies.map(({ movie }) => movie);
    },
    [`liked-movies-${userId}`],
    { revalidate: 600, tags: [`liked-movies-${userId}`] }
  )();

export const getCollections = (userId: string) =>
  unstable_cache(
    async () => {
      const userCollections = await db
        .select()
        .from(collections)
        .where(eq(collections.userId, userId));

      return userCollections;
    },
    [`collections-${userId}`],
    { revalidate: 600, tags: [`collections-${userId}`] }
  )();

export const getSortedUserMedias = (userId: string) =>
  unstable_cache(
    async () => {
      const userMedias = await db
        .select()
        .from(userMedia)
        .where(eq(userMedia.userId, userId))
        .orderBy(desc(userMedia.createdAt))
        .limit(5);

      return userMedias;
    },
    [`user-medias-${userId}`],
    { revalidate: 600, tags: [`user-medias-${userId}`] }
  )();
