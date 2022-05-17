import React, { PropsWithChildren, ReactNode } from 'react';
import { TmdbProvider } from './useTmdb';
import { MoviesProvider } from './useMovies';
import { AuthProvider } from './useAuth';

const AppProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <AuthProvider>
      <MoviesProvider>
        <TmdbProvider>{children}</TmdbProvider>
      </MoviesProvider>
    </AuthProvider>
  );
};

export default AppProvider;
