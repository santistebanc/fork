import { Meteor } from 'meteor/meteor';
import React from 'react';
import router from './router.jsx';
import ReactDOM from 'react-dom';
import { AccountsAnonymous } from 'meteor/brettle:accounts-anonymous';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

Meteor.startup(() => {
  if(!Meteor.userId()){
    AccountsAnonymous.login((err)=>{
    if(err) {
      console.log(err);
    }else{
      console.log('logged in guest ', Meteor.userId());
    }
    });
  }
  Tracker.autorun(function (c) {
    let table = Session.get("table");
    if (!Meteor.userId() || !Session.get("table")) return;
    c.stop();
    callRegisterTable(table);
  });
  ReactDOM.render(router, document.getElementById('app'));
});


const callRegisterTable = (num)=>{
  Meteor.call('registerTable', {
  number: num,
  userId: Meteor.userId()
  }, (err, res) => {
    if (err) {
      Bert.alert( 'Error al registrar mesa. Intenta registrarla por número.' );
      console.log(err);
    } else {
      console.log('registered successfully table ', num)
    }
  });
}
