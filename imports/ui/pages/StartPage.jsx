import React from 'react';
import { IonContent, IonButton, IonList ,IonItem } from 'reactionic';

export default class StartPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {num: "", name: props.defaultUserName};
  }
  handleChangeNum(e){
    this.setState({num: e.target.value});
  }
  handleChangeName(e){
    this.setState({num: e.target.value});
  }
  handleClickRegister(){
    this.props.handleRegisterTable(this.state.num);
  }
  render() {
    return (
      <IonContent customClasses={"has-tabs-top"}>
        <IonList>
          <IonItem divider>
            <h1 className="title">ForkApp</h1>
          </IonItem>
          <IonItem wrap>
            <p>
              <span className="darkerText big-text">Ordenar tus
              platillos favoritos directamente desde tu celular. </span>
            <br/>
            <small>NOTA: Actualmente la App se encuentra en periodo de prueba.</small>
            </p>
            </IonItem>
            <IonItem customClasses={"item-input-inset"}>
              <strong className="title">Nombre: </strong>
              <label className="item-input-wrapper tablenuminput textinputmargin">
                <input type="text" placeholder="Usuario" value={this.state.num} onChange={this.handleChangeNum.bind(this)}/>
              </label>
            </IonItem>
            <IonItem wrap>
                <strong className="title">Tu mesa es: </strong>
                <strong className="item-note big-text positive">{this.props.tableIsRegistered?`Mesa ${this.props.tableNum}`:"sin registrar"}</strong>
              </IonItem>
              {!this.props.tableIsRegistered && <IonItem wrap>
                  <h2 className="title">Registro</h2>
                  <p className="darkerText">
                    Para poder tomar tu orden se necesita <strong>registrar
                    la mesa</strong> en la que te encuentras.
                  </p>
                  <br/>
                  <p className="darkerText">
                    Para registrar tu mesa ingresa el <i>número de
                  identificación</i> de la mesa. También puedes
                  registrar la mesa escaneando el código QR.
                </p>
              </IonItem>}
          <IonItem customClasses={"item-input-inset"}>
            <label className="item-input-wrapper tablenuminput">
              <input type="text" placeholder="Número" value={this.state.num} onChange={this.handleChangeNum.bind(this)}/>
            </label>
            <IonButton onClick={this.handleClickRegister.bind(this)} color="dark">{this.props.tableIsRegistered?"Cambiar Mesa":"Registrar Mesa"}</IonButton>
        </IonItem>
        </IonList>
      </IonContent>
    );
  }
}
