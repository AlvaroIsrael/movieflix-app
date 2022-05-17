import React, { PropsWithChildren, ElementType } from 'react';
import { RouteProps as ReactDomRouteProps, Route as ReactDomRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface RouteProps extends Omit<ReactDomRouteProps, 'component'> {
  isPrivate?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: PropsWithChildren<RouteProps>) => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

Route.defaultProps = {
  isPrivate: false,
};

export default Route;
