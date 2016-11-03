import React from 'react';
import { IonContent, IonList, IonItem, IonSpinner, IonCard } from 'reactionic';
import KitchenOrderEntry from '../components/KitchenOrderEntry.jsx';

export default class KitchenPage extends React.Component {
  render() {
    let filteredOrders = this.props.orders.filter(o=>o.order.sent);
    let newOrders = filteredOrders.filter(o=>o.order.status !== "ready");
    let readyOrders = filteredOrders.filter(o=>o.order.status == "ready");
    return (
      <IonContent>
        <div className="row custom">
          <div className="col custom">
            {this.props.loadingOrders?
              <IonSpinner icon="dots"/>:filteredOrders.length>0 && <IonCard><IonList>
              <IonItem divider>{"Ordenes Nuevas"}</IonItem>
              {newOrders.map((order,k)=>
                <KitchenOrderEntry key={k} {...this.props} {...order} />
              )}
              <IonItem divider>{"Ordenes Listas"}</IonItem>
              {readyOrders.map((order,k)=>
                <KitchenOrderEntry key={k} {...this.props} {...order} />
              )}
            </IonList></IonCard>}
          </div>
        </div>
      </IonContent>
    );
  }
}
