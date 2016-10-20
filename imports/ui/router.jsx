import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createHistory, useBasename } from 'history';
import { IonBody } from 'reactionic';
import getPlatform from '../utils/getPlatform.js'


import MainLayoutContainer from './containers/MainLayoutContainer.jsx';
import StartPage from './pages/StartPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import DishDetailsPage from './pages/DishDetailsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { Session } from 'meteor/session'

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

let navigationPaths = ['/inicio', '/menu', '/ordenes'];
let prevState = null;
let transDir = "forward";

const entering = function(nextState) {
  const ps = prevState && prevState.location.pathname;
  const ns = nextState && nextState.location.pathname;
  //console.log(ps, ' --> ', ns);
  transDir = "forward";
  if(navigationPaths.indexOf(ns) == -1){
    transDir = "forward";
  }else if(navigationPaths.indexOf(ps) == -1){
    transDir = "back";
  }else if(navigationPaths.indexOf(ns) < navigationPaths.indexOf(ps)){
    transDir = "back";
  }
    nextState.location.state = {...nextState.location.state, transDir: transDir};
};

const leaving = function(pState) {
  prevState = pState;
};

const IonBodyModified = class extends IonBody{
  getChildContext(){
    let obj = super.getChildContext();
    obj.ionNavDirection = this.props.transDir;
    return obj;
  }
}

const WithBody = (Layout) => class Body extends React.Component {
  render() {
    return <IonBodyModified location={this.props.location} platform={getPlatform()} transDir={transDir} >
      <Layout {...this.props}/>
    </IonBodyModified>
  }
}

const enterleave = {
  onLeave: leaving,
  onEnter: entering
};

const registerTable = function(nextState, replace){
  Session.set("table", nextState.params.num );
  replace({pathname: '/inicio'});
}

export default (
    <Router history={browserHistory}>
      <Route path="/" component={WithBody(MainLayoutContainer)}>
        // <IndexRoute component={StartPage}/>
        <Route path="/inicio" component={StartPage} {...enterleave}/>
        <Route path="/menu" component={MenuPage} {...enterleave}/>
        <Route path="/ordenes" component={OrdersPage} {...enterleave}/>
        <Route path="/dish/:id" component={DishDetailsPage} {...enterleave}/>
        <Route path="/registrar/:num" component={OrdersPage} onEnter={registerTable}/>
        <Route path="*" component={NotFoundPage} {...enterleave}/>
      </Route>
    </Router>
)
