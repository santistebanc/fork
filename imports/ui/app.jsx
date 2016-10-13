import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';

import MainLayout from './MainLayout.jsx';
import StartPage from './pages/StartPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import DishDetailsPage from './pages/DishDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        // <IndexRoute component={StartPage}/>
        <Route path="inicio" component={StartPage}/>
        <Route path="menu" component={MenuPage} onEnter={requireAuth}/>
        <Route path="dish/:id" component={DishDetailsPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Router>,
    document.getElementById('app'));
});
