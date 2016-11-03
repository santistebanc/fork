import React from 'react';
import { IonItem, IonIcon, IonButton } from 'reactionic';
import { browserHistory } from 'react-router';

export default class OrderEntry extends React.Component {
  handleClickEntry(e){
    browserHistory.push('dish/'+this.props.dish._id);
  }
  handleClickCancel(e){
    e.stopPropagation();
    this.props.handleCancelOrder(this.props.order._id);
  }
  render() {
    const dish = this.props.dish || {};
    const userName = this.props.getTableUserName(this.props.order.userId);
    const status = ()=>{
      if(this.props.order.status == 'received'){
        return <strong className={'dark'}>orden en espera</strong>
      }else if(this.props.order.status == 'accepted'){
        return <strong className={'royal'}>orden en preparación</strong>
      }else if(this.props.order.status == 'ready'){
        return <strong className={'balanced'}>orden lista!</strong>
      }
    }
    return (
          <IonItem thumbnailLeft customClasses={"custom"} onClick={this.handleClickEntry.bind(this)}>
            <img src={`img/${dish.thumbnail}`} />
            <div className="row custom">
              <div className="col custom">
                  <h2>{dish.title}</h2>
                  <h3><strong className={'positive'}>{userName}</strong></h3>
                  <h4>{status()}</h4>
                </div>
                <div className="col col-25 custom">
                  <div className={"float-right"}>
                  <h3>{"$"}{dish.price}</h3>
                  <br/>
                  {this.props.tableIsRegistered && this.props.order.cancelable && <IonButton customClasses={"float-right"} onClick={this.handleClickCancel.bind(this)} icon="ion-close" color="assertive" size="small" />}
                  </div>
                </div>
              </div>
          </IonItem>
    );
  }
}
