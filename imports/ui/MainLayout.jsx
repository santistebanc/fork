import React from 'react';
import { IonBody, IonHeaderBar, IonFooterBar, IonNavView, IonView, IonButton } from 'reactionic';
import Navigation from './Navigation.jsx';

export default class MainLayout extends React.Component {
  constructor(props){
    super(props);
  }
  handleClickCallWaiter(){

  }
  handleClickPayBill(){

  }
  render() {
    return (
    <div>
      <IonHeaderBar customClasses="bar-calm italian-font" title="Forchetta" />
      <IonFooterBar customClasses="bar-dark">
      <IonButton onClick={this.handleClickCallWaiter.bind(this)} icon={'ion-chatbox-working'} iconPosition="left" customClasses={'text-center big-text center'} color="royal" size={"large"}>
          Llamar a Mesero
        </IonButton>
      </IonFooterBar>
      <Navigation/>
      <IonNavView>
        <IonView>
          {React.cloneElement(this.props.children, {...this.props})}
        </IonView>
      </IonNavView>
    </div>
    );
  }
}
