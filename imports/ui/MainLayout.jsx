import React from 'react';
import { IonBody, IonHeaderBar, IonFooterBar, IonNavView, IonView } from 'reactionic';
import Navigation from './Navigation.jsx';
import getPlatform from '../utils/getPlatform.js'
import { Link } from 'react-router';

export default class MainLayout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const footertitle = !this.props.tableIsRegistered?<small className={'anchorDownRight'}><em><Link to={"/inicio"}>registra</Link> tu mesa para ordenar</em></small>:""
    return (
    <div>
      <IonHeaderBar customClasses="bar-positive" title="Restaurant" />
      <IonFooterBar>{footertitle}</IonFooterBar>
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
