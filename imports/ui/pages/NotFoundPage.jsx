import React from 'react';
import { IonContent } from 'reactionic';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <IonContent customClasses={"has-tabs-top"}>
        <h1>Error al cargar</h1>
      </IonContent>
    );
  }
}
