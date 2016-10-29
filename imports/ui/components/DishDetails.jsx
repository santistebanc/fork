import React from 'react';
import { IonContent,IonButton, IonCard, IonList, IonItem } from 'reactionic';

export default class DishDetails extends React.Component {
  render() {
    return (
        <IonCard><IonList>

          <IonItem divider>
            <h1>{this.props.title}</h1>
          </IonItem>

          <IonItem>
            <img className="full-image" src={`../img/${this.props.image}`} />
            {this.props.description}
          </IonItem>

        </IonList></IonCard>
    );
  }
}

//
// <p>
//   El término <em>prosciutto</em> significa literalmente <em><strong>jamón</strong></em> y es que este plato no es otra cosa que las
//   clásicas lonchas de jamón que también se sirven en España tradicionalmente como tapa o entremés.
//   Se caracteriza porque se corta en lonchas muy finas, casi transparentes.
// <br /><br />
//   Se sirve sin cocinar, de modo que en Italia es conocido como <em>prosciutto crudo</em>; en cambio, cuando
//   se sirve cocido recibe el nombre de <em>prosciutto cotto</em>. Las piezas de <em>prosciutto</em> de más valor y
//   consideradas como un lujo gastronómico son las procedentes del norte y el centro de Italia, en
//   especial de Parma, San Daniele y Friuli-Venezia Giulia.
// </p>
// <p>
//   <a href="#" className="subdued">1 Like</a>
//   <a href="#" className="subdued">5 Comments</a>
// </p>
