import React from 'react';
import { IonItem, IonIcon, IonButton } from 'reactionic';
import { browserHistory } from 'react-router';

export default class KitchenOrderEntry extends React.Component {
  handleClickReject(e){
    e.stopPropagation();
    //this.props.handleCancelOrder(this.props.order._id);
  }
  handleClickAccept(){
    this.props.handleAcceptOrder(this.props.order._id);
  }
  handleClickReady(){
    this.props.handleReadyOrder(this.props.order._id);
  }
  handleClickNotify(){

  }
  render() {
    const dish = this.props.dish || {};
    const tableId = this.props.activeTables && this.props.order && this.props.activeTables.find(a=>a._id == this.props.order.activeTableId).tableId
    const table = this.props.tables && tableId && this.props.tables.find(t=>t._id == tableId);
    const tableName = table?"Mesa "+table.num:'';
    const userName = this.props.users && this.props.order?this.props.users.find(u=>u._id == this.props.order.userId).nickName:'';
    return (
          <IonItem thumbnailLeft customClasses={"custom"}>
            <img src={`img/${dish.thumbnail}`} />
            <div className="row custom responsive-sm">
              <div className="col col-50 custom">
                  <h2>{dish.title}</h2>
                  <h2><strong className={'positive'}>{tableName}</strong></h2>
                  <h3 className={'assertive'}>{userName}</h3>
                </div>
                <div className="col col-15 custom">
                    <p className={'wrapit'}><span data-livestamp={this.props.order.dateSent}></span></p>
                  </div>
                <div className="col col-center custom">
                  {this.props.order.status == "received" && <IonButton onClick={this.handleClickAccept.bind(this)} customClasses={"float-right"} icon="ion-pinpoint" color="dark" size={'large'}/>}
                  {this.props.order.status == "accepted" && <IonButton onClick={this.handleClickReady.bind(this)} customClasses={"float-right"} icon="ion-checkmark" color="balanced" size={'large'}/>}
                  <IonButton customClasses={"float-right margin-right"} onClick={this.handleClickNotify.bind(this)} icon="ion-chatbubble-working" iconPosition="left" color="royal" size={'small'}>
                    notificar
                  </IonButton>
                  <IonButton customClasses={"float-right margin-right"} onClick={this.handleClickReject.bind(this)} icon="ion-close" iconPosition="left" color="assertive" size={'small'}>
                    rechazar
                  </IonButton>
                </div>
                </div>
          </IonItem>
    );
  }
}
