import { Movie, MovieList, TVShow, TVShowList } from '@/lib/definitions';

export async function getMovies(): Promise<MovieList[] | null> {
  const url =
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  try {
    const res = await fetch(url, {
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

export async function getTVShows(): Promise<TVShowList[] | null> {
  const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';

  try {
    const res = await fetch(url, {
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

export async function getMovie(movieId: number): Promise<Movie | null> {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  try {
    const res = await fetch(url, {
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
  const url = `https://api.themoviedb.org/3/tv/${tvShowId}`;

  try {
    const res = await fetch(url, {
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
