import React, { createContext, PropsWithChildren, ReactNode, useCallback, useState, useContext } from 'react';
import tmdbApi from '../services/tmdbApi';

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
};

type SearchResult = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const searchResultInitialState = {
  page: 0,
  results: [
    {
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 0,
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '',
      title: '',
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
  ],
  total_pages: 0,
  total_results: 0,
};

type TmdbContextState = {
  isFetching: boolean;
  hasMovies: boolean;
  hasError: boolean;
  movies: SearchResult;
  searchMovie(movieName: string): Promise<SearchResult>;
};

const Tmdb = createContext<TmdbContextState>({} as TmdbContextState);

export const TmdbProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMovies, setHasMovies] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(true);
  const [movies, setMovies] = useState<SearchResult>(searchResultInitialState);

  const searchMovie = useCallback(async (movieName: string): Promise<SearchResult> => {
    setIsFetching(true);
    setHasError(false);
    try {
      const response = await tmdbApi.get('/search/movie?language=en-US&page=1&include_adult=false', {
        params: { query: movieName },
      });
      setHasMovies(response.data.results.length > 0);
      setMovies(response.data as SearchResult);
      return response.data as SearchResult;
    } catch (error) {
      setHasMovies(false);
      setHasError(true);
      return searchResultInitialState;
    } finally {
      setIsFetching(false);
    }
  }, []);

  return <Tmdb.Provider value={{ searchMovie, isFetching, movies, hasMovies, hasError }}>{children}</Tmdb.Provider>;
};

export const useTmdb = (): TmdbContextState => {
  const context = useContext(Tmdb);

  if (!context) {
    throw new Error('useTmdb methods must be invoked within a TmdbProvider.');
  }

  return context;
};
