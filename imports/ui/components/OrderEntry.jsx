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
    return (
          <IonItem thumbnailLeft customClasses={"custom"} onClick={this.handleClickEntry.bind(this)}>
            <img src={`img/${dish.image}`} />
            <div className="row custom">
              <div className="col col-60 custom">
                  <h2>{dish.title}</h2>
                  <h3><strong className={'positive'}>{userName}</strong></h3>
                </div>
                <div className="col custom">
                  <div className={"float-right"}>
                  {this.props.tableIsRegistered && <IonButton customClasses={"float-right"} onClick={this.handleClickCancel.bind(this)} icon="ion-close" color="assertive" size="small" />}
                  <br/><br/><br/>
                  <h3>{"$"}{dish.price}</h3>
                  </div>
                </div>
              </div>
          </IonItem>
    );
  }
}
