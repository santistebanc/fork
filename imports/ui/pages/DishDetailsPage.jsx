import React from 'react';
import { IonContent,IonButton } from 'reactionic';

export default class DishDetailsPage extends React.Component {
  render() {
    return (
      <IonContent>
        <IonButton  icon="ion-chevron-left" iconPosition="left" link="/menu" color="dark" type="outline">Menu</IonButton>
        <IonButton  icon="ion-plus-round" iconPosition="right" color="balanced" >Ordenar</IonButton>

        <div className="list card">

          <div className="item item-divider">
            <h1>Prosciutto</h1>
          </div>

          <div className="item item-body">
            <img className="full-image" src="../img/prosciutto.jpg" />
            <p>
              El término <em>prosciutto</em> significa literalmente <em><strong>jamón</strong></em> y es que este plato no es otra cosa que las
              clásicas lonchas de jamón que también se sirven en España tradicionalmente como tapa o entremés.
              Se caracteriza porque se corta en lonchas muy finas, casi transparentes.
            <br /><br />
              Se sirve sin cocinar, de modo que en Italia es conocido como <em>prosciutto crudo</em>; en cambio, cuando
              se sirve cocido recibe el nombre de <em>prosciutto cotto</em>. Las piezas de <em>prosciutto</em> de más valor y
              consideradas como un lujo gastronómico son las procedentes del norte y el centro de Italia, en
              especial de Parma, San Daniele y Friuli-Venezia Giulia.
            </p>
            <p>
              <a href="#" className="subdued">1 Like</a>
              <a href="#" className="subdued">5 Comments</a>
            </p>
          </div>

        </div>
      </IonContent>
    );
  }
}
