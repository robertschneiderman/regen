import App from './app';
import Home from './Home';
import PageNotFound from './PageNotFound';

const routes = {
  path: '/',
  name: 'App',
  indexRoute: { component: Home },
  component: App,
  childRoutes: [
    { path: '*', name: 'Page not found', component: PageNotFound },
  ],
};

export default routes;