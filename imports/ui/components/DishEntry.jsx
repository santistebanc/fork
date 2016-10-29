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
    return (
          <IonItem thumbnailLeft onClick={this.handleClickEntry.bind(this)}>
            <img src={`img/${this.props.image}`} />
              <div className="row custom">
                <div className="col custom">
                  <h2 clasName={'text-wrap'}>{this.props.title}</h2>
                  <p className="wrapit">{this.props.brief}</p>
                </div>
                <div className="col col-25 custom">
                  <div className={"float-right"}>
                  <h3>{"$"}{this.props.price}</h3>
                  {this.props.tableIsRegistered && <IonButton onClick={this.handleClickOrder.bind(this)} className={"float-right"} icon="ion-plus-round" color="balanced" />}
                  </div>
                </div>
              </div>
          </IonItem>
    );
  }
}
