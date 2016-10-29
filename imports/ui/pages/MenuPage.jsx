import React from 'react';
import { IonContent, IonList, IonItem, IonSpinner, IonCard } from 'reactionic';
import DishEntry from '../components/DishEntry.jsx';

export default class MenuPage extends React.Component {
  render() {
    return (
      <IonContent customClasses={"has-tabs-top"}>
        {this.props.loadingDishes?
          <IonSpinner icon="dots"/>:
          this.props.dishCategories.map((c,i)=>
              <IonCard key={i}><IonList>
                <IonItem divider>{c.name}</IonItem>
                {this.props.dishes.filter(i=>i.categories.indexOf(c._id) !== -1).map((dish,k)=><DishEntry key={k} {...dish} {...this.props}/>)}
              </IonList></IonCard>)
        }
      </IonContent>
    );
  }
}
