import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import Welcome from './welcome';

import store from './store'; 

import { PageNotFound } from '../components';
import homeRoute from '../features/home/route';

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    homeRoute,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ],
}];

export default routes;