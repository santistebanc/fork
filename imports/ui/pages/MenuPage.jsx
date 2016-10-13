import React from 'react';
import { IonContent, IonList, IonItem, IonIcon, IonButton } from 'reactionic';
    import { browserHistory } from 'react-router'

export default class MenuPage extends React.Component {
  handleClickItem(e){
    browserHistory.push('dish/'+2)
  }
  render() {
    return (
      <IonContent>
        <IonList>
          <IonItem divider>Entrada</IonItem>
          <IonItem thumbnailLeft buttonRight onClick={this.handleClickItem.bind(this)}>
            <img src="img/prosciutto.jpg" />
            <h2>Prosciutto</h2>
            <p className="wrapit">clásicas rebanadas de jamón ibérico</p>
            <div className="listAbsoluteRight">
              <h3>$67</h3>
              <IonButton icon="ion-plus-round" color="balanced" />
            </div>
          </IonItem>
          <IonItem divider>Plato Fuerte</IonItem>
          <IonItem thumbnailLeft buttonRight>
            <img src="img/pizza.jpg" />
            <h2>Pizza Mexicana</h2>
            <p className="wrapit">peperoni, champiñones, pimiento, cebolla.</p>
            <div className="listAbsoluteRight">
              <h3>$112</h3>
              <IonButton icon="ion-plus-round" color="balanced" />
            </div>
        </IonItem>
        </IonList>
      </IonContent>
    );
  }
}
