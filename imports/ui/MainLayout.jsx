import React from 'react';
import { IonBody, IonHeaderBar, IonNavView, IonView } from 'reactionic';
import Navigation from './Navigation.jsx';

export default class MainLayout extends React.Component {
  render() {
    return (
    <IonBody location={this.props.location}>
      <IonHeaderBar customClasses="bar-positive" title="Restaurant" />
      <IonNavView>
        <IonView>{this.props.children}</IonView>
      </IonNavView>
      <Navigation/>
    </IonBody>
    );
  }
}
