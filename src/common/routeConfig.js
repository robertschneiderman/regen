import App from './app';
import Home from './Home';
import PageNotFound from './PageNotFound';

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    { path: '', name: 'Home', component: Home, isIndex: true },
    { path: '*', name: 'Page not found', component: PageNotFound },
  ],
}];

export default routes;