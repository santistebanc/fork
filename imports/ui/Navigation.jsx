import React from 'react';
import { IonTabs, IonTab } from 'reactionic';

export default class Navigation extends React.Component {
  render() {
    return (
      <IonTabs customClasses="tabs-striped tabs-background-light">
         <IonTab customClasses="big-text" to="/inicio" label="Inicio" />
         <IonTab customClasses="big-text" to="/menu" label="Menu" />
         <IonTab customClasses="big-text" to="/ordenes" label="Ordenes" />
      </IonTabs>
    );
  }
}
