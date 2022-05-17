import React, { PropsWithChildren, ReactNode } from 'react';
import { TmdbProvider } from './useTmdb';
import { MoviesProvider } from './useMovies';

const AppProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <MoviesProvider>
      <TmdbProvider>{children}</TmdbProvider>
    </MoviesProvider>
  );
};

export default AppProvider;
