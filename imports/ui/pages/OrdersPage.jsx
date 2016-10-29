import React from 'react';
import { IonContent, IonList, IonItem, IonSubFooterBar, IonButton, IonSpinner, IonCard } from 'reactionic';
import OrderEntry from '../components/OrderEntry.jsx';

export default class OrdersPage extends React.Component {
  handleClickConfirm(orders){
      let orderIds = orders.map(o=>o.order._id);
      this.props.handleConfirmOrders(orderIds);
  }
  render() {
    let totalAmount = this.props.orders.reduce((sum, o)=>sum+o.dish.price,0);
    let open = this.props.orders.filter(o=>o.order.status == "open");
    let received = this.props.orders.filter(o=>o.order.sent);
    let confirmedOrders = ()=>{
      if(received.length>0){
        return received.map((order,k)=>
          <OrderEntry key={k} {...this.props} {...order} />
        );
      }
    }
    return (
      <div>
      <IonContent customClasses={"has-tabs-top has-sub-footer"}>
        {this.props.loadingOrders?
          <IonSpinner icon="dots"/>:open.length>0 && <IonCard><IonList>
          <IonItem divider>{`${open.length} platillo${open.length>1?'s':''} agregado${open.length>1?'s':''}`}
            <IonButton onClick={this.handleClickConfirm.bind(this, open)} customClasses={'float-right'} color="balanced">
            Enviar Orden
          </IonButton></IonItem>
          {open.length>0 && open.map((order,k)=>
            <OrderEntry key={k} {...this.props} {...order} />
          )}</IonList></IonCard>}
          {received.length>0 && <IonCard><IonList>
              <IonItem divider>Ordenes Enviadas</IonItem>
              {received.map((order,k)=>
                <OrderEntry key={k} {...this.props} {...order} />
              )}
            </IonList></IonCard>}
        {this.props.orders.length==0 && <p className={'with-padding'}>No se han agregado ordenes...</p>}
      </IonContent>
      <IonSubFooterBar>
        <div className={'float-right paddingRight'}>
        <span>Total: </span>
        <strong className={'positive big-text'}>{" $"+totalAmount}</strong>
        </div>
      </IonSubFooterBar>
      </div>
    );
  }
}
