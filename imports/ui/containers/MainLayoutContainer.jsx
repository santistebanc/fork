import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { DishCategories, Dishes, Tables, ActiveTables, Orders } from '../../../lib/collections.js'
import MainLayout from '../MainLayout.jsx';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

export default MainLayoutContainer = createContainer(({ location, params }) => {

  let activeTablesSub = Meteor.subscribe('activeTables');
  let ordersSub = Meteor.subscribe('orders');
  let tablesSub = Meteor.subscribe('tables');
  let dishesSub = Meteor.subscribe('dishes.menu');
  let dishCategoriesSub = Meteor.subscribe('dishCategories');
  let loggedinUserSub = Meteor.subscribe('loggedinuser');
  let usersSub = Meteor.subscribe('users.basicinfo');

  let activeTable = new ReactiveVar(ActiveTables.findOne({members: {$in: [Meteor.userId()]}}));
  let tableIsRegistered = new ReactiveVar(!!activeTable.get());
  let tableNum = tableIsRegistered.get() && activeTable.get().num;
  let ordersRaw = new ReactiveVar(tableIsRegistered.get()?Orders.find({open: true, activeTableId: activeTable.get()._id}).fetch():[]);
  let orders = ordersRaw.get().map(order=>{
    return {order, dish: Dishes.findOne({_id: order.dishId})};
  });

  const handleChangeUserName = (newName)=>{
    if(Meteor.userId()){
      Meteor.call('changeUserNick', {
      userId: Meteor.userId(),
      newName: newName
      }, (err, res) => {if (err) console.log(err)});
    }
  }


  const handlePlaceOrder = (dish)=>{
    if(Meteor.userId() && tableIsRegistered.get()){
      Meteor.call('placeOrder', {
      userId: Meteor.userId(),
      activeTableId: activeTable.get()._id,
      dish: dish
      }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          Bert.alert({
            title: 'Orden agregada',
            type: 'success',
            style: 'growl-bottom-right',
            icon: 'fa-check'
          });
        }
      });
    }else{
      console.log('error: table is not yet registered');
    }
  }

  const handleCancelOrder = (orderId)=>{
      Meteor.call('cancelOrder', {
      orderId: orderId,
      }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          //success!
        }
      });
    }

    const handleRegisterTable = (num)=>{
      if(Meteor.userId()){
      Meteor.call('registerTable', {
      number: num,
      userId: Meteor.userId()
      }, (err, res) => {
        if (err) {
          if(err.error == 'tableInexistent'){
            Bert.alert({
              title: 'El número de mesa ingresado no existe',
              type: 'danger',
              style: 'growl-bottom-right',
              icon: 'fa-remove'
            });
          }
          console.log(err);
        } else {
          Bert.alert({
            title: 'Mesa registrada exitosamente.',
            type: 'success',
            style: 'growl-bottom-right',
            icon: 'fa-check'
          });
          console.log('registered successfully table ', num)
        }
      });
    }
  }

  let getTableUserName = (userId=Meteor.userId())=>{
      let user = Meteor.users.findOne(userId) || {};
      if(!user.nickName && tableIsRegistered.get()){
        return `usuario ${activeTable.get().members.indexOf(userId)+1}`;
      }else{
        return user.nickName;
      }
  }

  let nickName = new ReactiveVar(getTableUserName());


  let userIsReady = !!Session.get('userIsReady');
  let tableIsReady = !!Session.get('tableIsReady');


  let loading = !dishesSub.ready() || !dishCategoriesSub.ready();
  let dishes = Dishes.find().fetch();
  let dishCategories = DishCategories.find().fetch();

  return {
    loading,
    dishes,
    dishCategories,
    location,
    handlePlaceOrder,
    handleCancelOrder,
    handleRegisterTable,
    handleChangeUserName,
    tableIsRegistered: tableIsRegistered.get(),
    tableNum,
    activeTable: activeTable.get(),
    orders,
    getTableUserName,
    userIsReady,
    tableIsReady,
    nickName: nickName.get()
  };
}, MainLayout);
