import React from 'react';
import { IonBody, IonHeaderBar, IonFooterBar, IonNavView, IonView, IonButton } from 'reactionic';
import Navigation from './Navigation.jsx';
import getPlatform from '../utils/getPlatform.js'
import { Link } from 'react-router';

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
        <IonButton onClick={this.handleClickPayBill.bind(this)} customClasses={'big-text'} color="assertive" size={"large"}>
          Pagar Cuenta
        </IonButton>
        <IonButton onClick={this.handleClickCallWaiter.bind(this)} customClasses={'float-right big-text'} color="royal" size={"large"}>
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
