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
          <IonItem thumbnailLeft buttonRight onClick={this.handleClickEntry.bind(this)}>
            <img src={`img/${this.props.image}`} />
            <h2>{this.props.title}</h2>
            <p className="wrapit">{this.props.brief}</p>
            <div className="listAbsoluteRight">
              <h3>{"$"}{this.props.price}</h3>
              {this.props.tableIsRegistered && <IonButton onClick={this.handleClickOrder.bind(this)} icon="ion-plus-round" color="balanced" />}
            </div>
          </IonItem>
    );
  }
}
