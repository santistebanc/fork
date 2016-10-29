import React from 'react';
import { IonBody, IonHeaderBar, IonFooterBar, IonNavView, IonView, IonButton } from 'reactionic';
// import Navigation from './Navigation.jsx';

export default class KitchenLayout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
    <div>
      <IonHeaderBar customClasses="bar-calm italian-font" title="Forchetta" />
      <IonFooterBar customClasses="bar-dark">

      </IonFooterBar>
      <IonNavView>
        <IonView>
          {React.cloneElement(this.props.children, {...this.props})}
        </IonView>
      </IonNavView>
    </div>
    );
  }
}
