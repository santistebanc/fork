import React from 'react';
import { IonContent,IonButton } from 'reactionic';
import DishDetails from '../components/DishDetails.jsx';

export default class DishDetailsPage extends React.Component {
  render() {
    let dish = this.props.dishes.find(d=>d._id == this.props.params.id);
    return (
      <IonContent customClasses={"has-tabs-top"}>
        <IonButton icon="ion-chevron-left" iconPosition="left" link="/menu" color="dark" type="outline">Menu</IonButton>
        <IonButton icon="ion-plus-round" iconPosition="right" color="balanced" >Ordenar</IonButton>
        <DishDetails {...dish}/>
      </IonContent>
    );
  }
}
