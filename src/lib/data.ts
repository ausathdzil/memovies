import { db } from '@/db';
import { users } from '@/db/schema';
import {
  Movie,
  MovieGenre,
  MovieList,
  SearchParams,
  TVShow,
  TVShowList,
} from '@/lib/definitions';
import { verifySession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await verifySession();
  const data = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId as string));
  const user = data[0];
  const filteredUser = userDTO(user);
  return filteredUser;
});

function userDTO(user: {
  id: string;
  name: string;
  email: string;
  password: string;
}) {
  return {
    name: user.name,
    email: user.email,
  };
}

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
