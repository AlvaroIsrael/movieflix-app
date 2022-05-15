import React, { PropsWithChildren, ReactNode } from 'react';

const AppProvider: React.FC = ({ children }: PropsWithChildren<ReactNode>) => {
  return <>{children}</>;
};

export default AppProvider;
