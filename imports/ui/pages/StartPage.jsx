import React from 'react';
import { IonContent, IonButton, IonCard, IonList ,IonItem, IonSpinner } from 'reactionic';

export default class StartPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {num: "", name: props.nickName, currentName: props.nickName, nameButState: 0};
  }
  handleChangeNum(e){
    this.setState({num: e.target.value});
  }
  handleChangeName(e){
    this.setState({name: e.target.value, nameButState: this.state.currentName != e.target.value?1:0});
  }
  handleClickRegister(){
    this.props.handleRegisterTable(this.state.num);
  }
  handleClickChangeName(){
    this.setState({nameButState: 2});
    this.props.handleChangeUserName(this.state.name);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.nickName){
      let newname = nextProps.nickName;
      this.setState({nameButState: 0, currentName: newname, name: newname});
    }
  }
  render() {
    const nameTextBox = <label className="item-input-wrapper tablenuminput textinputmargin">
          <input type="text" placeholder="Usuario" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
      </label>

    const nameButton = <IonButton onClick={this.handleClickChangeName.bind(this)} color="dark">{this.state.nameButState == 2?<IonSpinner icon="dots" customClasses={'inloader spinner-light'}/>:"Cambiar"}</IonButton>

    return (
      <IonContent customClasses={"has-tabs-top"}>
        <IonCard customClasses={"logo-space"}>
          <img src={'img/italian-logo.png'}/>
        </IonCard>
        <IonCard><IonList>
            <IonItem customClasses={"item-input-inset"}>
              <strong className="title">Nombre: </strong>
              {this.props.userIsReady?nameTextBox:<div className={'textinputmargin'}><IonSpinner icon="dots" /></div>}
              {this.state.nameButState == 0?'':nameButton}
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
        </IonList></IonCard>
      </IonContent>
    );
  }
}
