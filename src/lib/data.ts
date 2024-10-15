import { db } from '@/db';
import { users } from '@/db/schema';
import { Movie, MovieList, TVShow, TVShowList } from '@/lib/definitions';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { verifySession } from './session';

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

export async function getMovies(): Promise<MovieList[] | null> {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
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

export async function getTVShows(): Promise<TVShowList[] | null> {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
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

export async function getMovie(movieId: number): Promise<Movie | null> {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}
