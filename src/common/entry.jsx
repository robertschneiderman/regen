import React from 'react';
import ReactDOM from 'react-dom';

// import store from './store'; 
// import * as userActions from './user/actions';
// import { AUTH_USER } from './auth/types';

// const token = localStorage.getItem('token');
// const currentUser = localStorage.getItem('currentUser');

// if (token) {
//   store.dispatch({ type: AUTH_USER });
// }

// if (currentUser) {
//   store.dispatch(userActions.requestUser(currentUser));
// }
// window.store = store;

ReactDOM.render(<Root />, document.querySelector('#root'));