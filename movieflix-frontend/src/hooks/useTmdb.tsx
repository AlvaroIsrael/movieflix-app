import React, { createContext, PropsWithChildren, ReactNode, useCallback, useState, useContext, Dispatch } from 'react';
import tmdbApi from '../services/tmdbApi';

export type FoundMovie = {
  id: number;
  backdropPath: string;
  genre: string;
  director: string;
  title: string;
  overview: string;
  posterPath: string;
  year: string;
  voteAverage: number;
  voteCount: number;
};

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre?: string;
  director?: string;
};

type SearchResult = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const movieInitialState = {
  id: 0,
  backdropPath: '',
  genre: '',
  title: '',
  director: '',
  overview: '',
  posterPath: '',
  year: '',
  voteAverage: 0,
  voteCount: 0,
};

type Genre = {
  id: number;
  name: string;
};

type Crew = {
  adult: boolean;
  gender?: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  department: number;
  job: string;
};

type TmdbContextState = {
  isFetching: boolean;
  hasMovies: boolean;
  hasError: boolean;
  movie: FoundMovie;
  searchMovie(movieName: string): Promise<FoundMovie>;
  setMovie: Dispatch<React.SetStateAction<FoundMovie>>;
  clearMovieFields(): void;
};

const Tmdb = createContext<TmdbContextState>({} as TmdbContextState);

export const TmdbProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMovies, setHasMovies] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(true);
  const [movie, setMovie] = useState<FoundMovie>(movieInitialState);

  const clearMovieFields = useCallback(async () => {
    setMovie(movieInitialState);
  }, []);

  const searchMovie = useCallback(async (movieName: string): Promise<FoundMovie> => {
    setIsFetching(true);
    setHasError(false);
    try {
      const response = await tmdbApi.get<SearchResult>('/search/movie?language=en-US&page=1&include_adult=false', {
        params: { query: movieName },
      });

      setHasMovies(response.data.results.length > 0);

      if (response.data.results.length > 0) {
        const foundMovie = response.data.results[0];

        const genresResponse = await tmdbApi.get('/genre/movie/list', {
          params: { language: 'en-US' },
        });

        genresResponse.data.genres.forEach((genre: Genre) => {
          if (genre.id === foundMovie.genre_ids[0]) {
            Object.assign(foundMovie, { genre: genre.name });
          }
        });

        const directorResponse = await tmdbApi.get(`/movie/${foundMovie.id}/credits`, {
          params: { language: 'en-US' },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        directorResponse.data.crew.forEach((crew: Crew) => {
          if (crew.job === 'Director') {
            Object.assign(foundMovie, { director: crew.name });
          }
        });

        setMovie({
          id: foundMovie.id,
          backdropPath: foundMovie.backdrop_path,
          genre: foundMovie.genre || '',
          title: foundMovie.title,
          director: foundMovie.director || '',
          overview: foundMovie.overview,
          posterPath: foundMovie.poster_path,
          year: foundMovie.release_date.split('-')[0],
          voteAverage: foundMovie.vote_average,
          voteCount: foundMovie.vote_count,
        });

        return {
          id: foundMovie.id,
          backdropPath: foundMovie.backdrop_path,
          genre: foundMovie.genre || '',
          title: foundMovie.title,
          director: foundMovie.director || '',
          overview: foundMovie.overview,
          posterPath: foundMovie.poster_path,
          year: foundMovie.release_date.split('-')[0],
          voteAverage: foundMovie.vote_average,
          voteCount: foundMovie.vote_count,
        };
      }

      return movieInitialState;
    } catch (error) {
      setHasMovies(false);
      setHasError(true);
      return movieInitialState;
    } finally {
      setIsFetching(false);
    }
  }, []);

  return (
    <Tmdb.Provider value={{ searchMovie, isFetching, movie, hasMovies, hasError, setMovie, clearMovieFields }}>
      {children}
    </Tmdb.Provider>
  );
};

export const useTmdb = (): TmdbContextState => {
  const context = useContext(Tmdb);

  if (!context) {
    throw new Error('useTmdb methods must be invoked within a TmdbProvider.');
  }

  return context;
};
