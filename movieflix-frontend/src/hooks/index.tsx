import React, { PropsWithChildren, ReactNode } from 'react';
import { TmdbProvider } from './useTmdb';

const AppProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  return <TmdbProvider>{children}</TmdbProvider>;
};

export default AppProvider;
