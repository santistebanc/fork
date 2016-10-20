import React from 'react';
import { IonContent, IonList, IonItem } from 'reactionic';
import OrderEntry from '../components/OrderEntry.jsx';

export default class OrdersPage extends React.Component {
  render() {
    return (
      <IonContent customClasses={"has-tabs-top"}>
        <IonList>
          {this.props.orders.map((order,k)=>
            <OrderEntry key={k} {...this.props} {...order} />
          )}
          {!this.props.orders && <IonItem wrap><p>No se han agregado ordenes...</p></IonItem>}
        </IonList>
      </IonContent>
    );
  }
}
