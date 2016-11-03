import { Meteor } from 'meteor/meteor';
import React from 'react';
import router from './router.jsx';
import ReactDOM from 'react-dom';
import { AccountsAnonymous } from 'meteor/brettle:accounts-anonymous';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { moment } from 'meteor/momentjs:moment'

Meteor.startup(() => {
  moment.locale("es")
  if(!Meteor.userId()){
    AccountsAnonymous.login((err)=>{
    Session.set("isGuest", true );
    if(err) {
      console.log(err);
    }else{
      console.log('logged in guest ', Meteor.userId());
    }
    });
  }else{
    console.log('already logged in as ', Meteor.userId());
  }
  Tracker.autorun(function(c){
    if(Meteor.user()) {
      c.stop();
      Session.set("userIsReady", true );
    }
  });
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
      Session.set("tableIsReady", true );
    }
  });
}
