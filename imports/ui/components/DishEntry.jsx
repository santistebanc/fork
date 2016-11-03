import React from 'react';
import { IonItem, IonIcon, IonButton } from 'reactionic';
import { browserHistory } from 'react-router';

export default class DishEntry extends React.Component {
  handleClickEntry(e){
    browserHistory.push('dish/'+this.props._id);
  }
  handleClickOrder(e){
    e.stopPropagation();
    this.props.handlePlaceOrder(this.props._id);
  }
  render() {
    let ordersnum = this.props.orders.reduce((c,o)=>o.dish._id == this.props._id?c+1:c,0)
    return (
          <IonItem thumbnailLeft onClick={this.handleClickEntry.bind(this)}>
            <img className={'thum'} src={`img/${this.props.thumbnail}`} />
              <div className="row custom">
                <div className="col custom">
                  <h2 className={'text-wrap'}>{this.props.title}</h2>
                  <p className="wrapit">{this.props.brief}</p>
                </div>
                <div className="col col-25 custom">
                  <div className={"float-right"}>
                  <h3>{"$"}{this.props.price}</h3>
                  <br/>
                  {this.props.tableIsRegistered && <IonButton onClick={this.handleClickOrder.bind(this)} className={"float-right"} color="balanced" size={'small'}>
                  <strong className={'big-text'}>{ordersnum==0?<IonIcon icon={"plus-round"}/>:ordersnum}</strong>
                </IonButton>}
                  </div>
                </div>
              </div>
          </IonItem>
    );
  }
}
