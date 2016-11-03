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

  let tables = Tables.find().fetch();
  let activeTable = new ReactiveVar(ActiveTables.findOne({members: {$in: [Meteor.userId()]}}));
  let tableIsRegistered = new ReactiveVar(!!activeTable.get());
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

  const handleConfirmOrders = (orderIds)=>{
      Meteor.call('confirmOrders', {
      orderIds: orderIds,
      }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          //success!
        }
      });
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

    const handleRegisterTable = (id)=>{
      if(Meteor.userId()){
      Meteor.call('registerTable', {
      tableId: id,
      userId: Meteor.userId()
      }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('registered successfully table ', id)
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


  let loadingDishes = new ReactiveVar(!dishesSub.ready() || !dishCategoriesSub.ready());
  let loadingOrders = new ReactiveVar(!ordersSub.ready());
  let dishes = Dishes.find().fetch();
  let dishCategories = DishCategories.find().fetch();

  let userStatusDetails = (()=>{
    if(Meteor.userId() && Session.get('userIsReady')){
      return "inicio de sesión exitosa";
    }else if(Meteor.loggingIn() && Session.get('isGuest')){
      return "iniciando sesión de invitado";
    }else if(Meteor.loggingIn() && !Session.get('isGuest')){
      return "iniciando sesión de usuario";
    }else if(Session.get('userIsReady')){
      return "inicio de sesión exitosa";
    }else{
      return "error al iniciar sesión";
    }
  })()

  let tableDetails = (()=>{
    if(Session.get("tableIsReady") && !Session.get("table") == undefined){
      return `mesa ${Session.get("table")} registrada exitosamente`;
    }else if(Session.get("tableIsReady")){
      return `no se ha registrado mesa`;
    }else if(Session.get("table")){
      return `registrando mesa ${Session.get("table")}`;
    }else{
      return "error al registrar mesa";
    }
  })()

  return {
    loadingDishes: loadingDishes.get(),
    loadingOrders: loadingOrders.get(),
    tables,
    dishes,
    dishCategories,
    location,
    handlePlaceOrder,
    handleCancelOrder,
    handleRegisterTable,
    handleChangeUserName,
    handleConfirmOrders,
    tableIsRegistered: tableIsRegistered.get(),
    activeTable: activeTable.get(),
    orders,
    getTableUserName,
    userIsReady,
    tableIsReady,
    nickName: nickName.get(),
    userStatusDetails,
    tableDetails
  };
}, MainLayout);
