import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, MovieDetails } from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/details/:id' exact component={MovieDetails} />
  </Switch>
);

export default Routes;
