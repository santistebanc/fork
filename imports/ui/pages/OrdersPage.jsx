import React from 'react';
import { IonContent, IonList, IonItem, IonSubFooterBar, IonButton, IonSpinner } from 'reactionic';
import OrderEntry from '../components/OrderEntry.jsx';

export default class OrdersPage extends React.Component {
  handleClickConfirm(orders){
      let orderIds = orders.map(o=>o.order._id);
      this.props.handleConfirmOrders(orderIds);
  }
  render() {
    let totalAmount = this.props.orders.reduce((sum, o)=>sum+o.dish.price,0);
    let open = this.props.orders.filter(o=>o.order.status == "open");
    let received = this.props.orders.filter(o=>o.order.status == "received");
    let confirmedOrders = ()=>{
      if(received.length>0){
        return received.map((order,k)=>
          <OrderEntry key={k} {...this.props} {...order} />
        );
      }
    }
    return (
      <div>
      <IonContent customClasses={"has-tabs-top"}>
        {this.props.loadingOrders?<IonSpinner icon="dots"/>:<IonList>
          {open.map((order,k)=>
            <OrderEntry key={k} {...this.props} {...order} />
          )}
          {received.length>0 && <IonItem divider>Ordenes Confirmadas</IonItem>}
          {received.length>0 && received.map((order,k)=>
            <OrderEntry key={k} {...this.props} {...order} />
          )}
        </IonList>}
        {this.props.orders.length==0 && <p className={'with-padding'}>No se han agregado ordenes...</p>}
      </IonContent>
      <IonSubFooterBar>
        {open.length>0 && <IonButton onClick={this.handleClickConfirm.bind(this, open)} color="positive" size={'large'}>
          Enviar Orden
        </IonButton>}
        {open.length>0 && <span>{` (${open.length} platillo${open.length>1?'s':''})`}</span>}
        <div className={'float-right paddingRight'}>
        <span>Total: </span>
        <strong className={'positive big-text'}>{" $"+totalAmount}</strong>
        </div>
      </IonSubFooterBar>
      </div>
    );
  }
}
