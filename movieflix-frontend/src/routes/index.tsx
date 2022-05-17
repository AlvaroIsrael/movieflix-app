import React from 'react';
import { Switch } from 'react-router-dom';
import { Home, MovieDetails, SignIn, SignUp } from '../pages';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={SignIn} />
    <Route path='/signin' exact component={SignIn} />
    <Route path='/signup' exact component={SignUp} />
    <Route path='/home' exact component={Home} isPrivate />
    <Route path='/details/:id' exact component={MovieDetails} isPrivate />
  </Switch>
);

export default Routes;
