import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/home' exact component={Home} />
  </Switch>
);

export default Routes;
