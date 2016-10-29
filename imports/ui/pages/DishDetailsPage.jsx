import React from 'react';
import { IonContent,IonButton } from 'reactionic';
import DishDetails from '../components/DishDetails.jsx';
import { browserHistory } from 'react-router';

export default class DishDetailsPage extends React.Component {
  handleClickOrder(){
    this.props.handlePlaceOrder(this.props.dishes.find(d=>d._id == this.props.params.id)._id);
  }
  render() {
    let dish = this.props.dishes.find(d=>d._id == this.props.params.id);
    return (
      <IonContent customClasses={"has-tabs-top"}>
        <IonButton onClick={browserHistory.goBack} icon="ion-chevron-left" iconPosition="left" >Atras</IonButton>
        {this.props.tableIsRegistered && <IonButton onClick={this.handleClickOrder.bind(this)} icon="ion-plus-round" iconPosition="right" color="balanced" >Ordenar</IonButton>}
        <DishDetails {...dish}/>
      </IonContent>
    );
  }
}
