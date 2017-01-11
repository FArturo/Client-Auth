import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/auth/feature';
import RequireAuth from './components/auth/requireAuth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER, UNAUTH_USER } from './actions/type';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');


if(token) {
    store.dispatch({ type: AUTH_USER});
} else if(!token) {
    store.dispatch({ type: UNAUTH_USER});
}



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path={"/"} component={App}>
            <IndexRoute component={Welcome}/>
            <Route path="signin" components={Signin}/>
            <Route path="signout" components={Signout}/>
            <Route path="signup" component={Signup}/>
            <Route path="feature" components={RequireAuth(Feature)}/>
        </Route>
    </Router>
  </Provider>
, document.querySelector('.container'));


