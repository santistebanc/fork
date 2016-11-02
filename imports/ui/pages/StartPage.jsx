import React from 'react';
import ReactDOM from 'react-dom';
import { IonContent, IonButton, IonCard, IonList ,IonItem, IonSpinner, IonPopoverButton, IonIcon } from 'reactionic';

export default class StartPage extends React.Component {
  constructor(props){
    super(props);
    let table = this.props.tables.find(t=>t._id == this.props.activeTable.tableId) || {};
    this.state = {selectedTable: false, table: table, name: props.nickName};
  }
  handleChangeTable(newtable){
    this.props.handleRegisterTable(newtable._id);
    this.setState({table: newtable, selectedTable: true});
  }
  handleChangeName(e){
    this.setState({name: e.target.value});
    this.props.handleChangeUserName(e.target.value);
  }
  renderPopover(){
    let popover = <TablePopover handleChangeTable={this.handleChangeTable.bind(this)} tables={this.props.tables} table={this.state.table}/>
    this.context.ionShowPopover(popover);
  }
  componentWillReceiveProps(nextProps, nextContext){
    let table = nextProps.tables.find(t=>t._id == nextProps.activeTable.tableId) || {};
    if(nextProps.nickName){
      let newname = nextProps.nickName;
      this.setState({name: newname});
    }
    if(table._id == this.state.table._id && this.state.selectedTable){
      nextContext.ionPopover = false;
      this.setState({selectedTable: false});
    }
    if(JSON.stringify(table) != JSON.stringify(this.state.table)){
      this.setState({table: table});
    }

  }
  componentDidUpdate(prevProps, prevState, prevContext){
    if(this.context.ionPopover != false){
      this.renderPopover();
    }else{
      this.context.ionShowPopover(false);
    }
  }
  render() {
    const nameTextBox = <label className="item-input-wrapper tablenuminput textinputmargin">
          <input type="text" placeholder="Usuario" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
      </label>

return (
      <IonContent customClasses={"has-tabs-top"}>
        <IonCard customClasses={"logo-space"}>
          <img src={'img/italian-logo.png'}/>
        </IonCard>
        <IonCard><IonList>
            {!this.props.userIsReady?
              <IonItem customClasses={"item-input-wrap"}>
                <IonSpinner icon="lines" />
                <i>{this.props.userStatusDetails}</i>
              </IonItem>:
            <IonItem customClasses={"item-input-inset"}>
              <strong className="title">Nombre: </strong>
              {nameTextBox}
            </IonItem>}
            <IonItem buttonRight>
            <strong className="input-label title">Tu mesa es: </strong>
            <IonPopoverButton type="clear" onClick={this.renderPopover.bind(this)} >
              {`Mesa ${this.state.table.num}`}<IonIcon icon={"ion-arrow-down-b"}/>
            </IonPopoverButton>
          </IonItem>
            <IonItem>
              <IonButton icon={'ion-qr-scanner'} customClasses={'float-right'} iconPosition="left" color="dark">
                  Escanear
                </IonButton>
                <IonButton icon={'ion-log-in'} iconPosition="left" color="calm">
                    Iniciar Sesión
                  </IonButton>
            </IonItem>
        </IonList></IonCard>
      </IonContent>
    );
  }
}

StartPage.contextTypes = {
    ionShowPopover: React.PropTypes.func,
    ionPopover: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.bool])
  };

class TablePopover extends React.Component {
    render(){
    return  <IonCard customClasses={"no-margin"}><IonList>
        {this.props.tables.map((t,i)=>
          <IonItem key={i} customClasses={"custom item-icon-right"} onClick={this.props.handleChangeTable.bind(null, t)}>
            {this.props.table._id == t._id?<strong className={"positive"}>{`Mesa ${t.num}`}</strong>:<span>{`Mesa ${t.num}`}</span>}
            <IonIcon icon="ios-arrow-right" />
          </IonItem>)}
      </IonList></IonCard>
      }
}
