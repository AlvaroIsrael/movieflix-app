import React, { createContext, PropsWithChildren, ReactNode, useCallback, useState, useContext } from 'react';
import appApi from '../services/appApi';

type Movie = {
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

export type NewMovie = {
  id: number;
  tmdbId: number;
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

const movieInitialState = {
  id: 0,
  tmdbId: 0,
  backdropPath: '',
  genre: '',
  director: '',
  title: '',
  overview: '',
  posterPath: '',
  year: '',
  voteAverage: 0,
  voteCount: 0,
};

type MoviesContextState = {
  isDeleting: boolean;
  isFetching: boolean;
  hasError: boolean;
  error: string;
  newMovie: NewMovie;
  addMovie(movie: Movie): Promise<Movie>;
  editMovie(movie: NewMovie): Promise<NewMovie>;
  listMovies({ page, pageLimit }: IListRequest): Promise<NewMovie[]>;
  listOneMovie(id: string): Promise<NewMovie>;
  removeMovie(id: string): Promise<void>;
  clearAddMovieError(): void;
};

export type IListRequest = {
  page: number;
  pageLimit: number;
};

const Movies = createContext<MoviesContextState>({} as MoviesContextState);

export const MoviesProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [newMovie, setNewMovie] = useState<NewMovie>(movieInitialState);

  const clearAddMovieError = useCallback(async () => {
    setHasError(false);
    setError('');
  }, []);

  const editMovie = useCallback(async (movie: NewMovie): Promise<NewMovie> => {
    setIsFetching(true);
    try {
      const response = await appApi.put(`/v1/movies/${movie.id}`, {
        ...movie,
      });
      return response.data;
    } catch (e) {
      return movieInitialState;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const listOneMovie = useCallback(async (id: string): Promise<NewMovie> => {
    setIsFetching(true);
    try {
      const response = await appApi.get(`/v1/movies/${id}`);
      return response.data;
    } catch (e) {
      return movieInitialState;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const listMovies = useCallback(async ({ page, pageLimit }: IListRequest): Promise<NewMovie[]> => {
    setIsFetching(true);
    try {
      const response = await appApi.get('/v1/movies', {
        params: {
          page,
          pageLimit,
        },
      });
      return response.data;
    } catch (e) {
      return [movieInitialState];
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addMovie = useCallback(async (movie: Movie): Promise<NewMovie> => {
    setIsFetching(true);
    setHasError(false);
    try {
      const response = await appApi.post<NewMovie>('/v1/movies', {
        ...movie,
      });

      if (response.data) {
        setNewMovie(response.data);
        setError('');
        return response.data;
      }
      setError('');
      return movieInitialState;
    } catch (e) {
      setHasError(true);
      setError(e.response.data.message);
      return movieInitialState;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const removeMovie = useCallback(async (id: string): Promise<void> => {
    setIsDeleting(true);
    try {
      await appApi.delete(`/v1/movies/${id}`);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return (
    <Movies.Provider
      value={{
        isFetching,
        isDeleting,
        hasError,
        addMovie,
        newMovie,
        error,
        clearAddMovieError,
        listMovies,
        listOneMovie,
        removeMovie,
        editMovie,
      }}
    >
      {children}
    </Movies.Provider>
  );
};

export const useMovies = (): MoviesContextState => {
  const context = useContext(Movies);

  if (!context) {
    throw new Error('useMovies methods must be invoked within a MoviesProvider.');
  }

  return context;
};
