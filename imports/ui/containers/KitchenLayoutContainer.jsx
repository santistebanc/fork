import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { DishCategories, Dishes, Tables, ActiveTables, Orders } from '../../../lib/collections.js'
import KitchenLayout from '../KitchenLayout.jsx';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

export default KitchenLayoutContainer = createContainer(({ location, params }) => {

  let activeTablesSub = Meteor.subscribe('activeTables');
  let ordersSub = Meteor.subscribe('orders');
  let tablesSub = Meteor.subscribe('tables');
  let dishesSub = Meteor.subscribe('dishes.menu');
  let dishCategoriesSub = Meteor.subscribe('dishCategories');
  let loggedinUserSub = Meteor.subscribe('loggedinuser');
  let usersSub = Meteor.subscribe('users.restaurant');

  let tables = Tables.find().fetch();
  let users = Meteor.users.find().fetch();
  let activeTables = ActiveTables.find().fetch();
  let ordersRaw = new ReactiveVar(Orders.find({open: true}).fetch());
  let orders = ordersRaw.get().map(order=>{
    return {order, dish: Dishes.findOne({_id: order.dishId})};
  });

  const handleAcceptOrder = (orderId)=>{
      Meteor.call('acceptOrder', {
      orderId: orderId,
      }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          //success!
        }
      });
    }

    const handleReadyOrder = (orderId)=>{
        Meteor.call('readyOrder', {
        orderId: orderId,
        }, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            //success!
          }
        });
      }

  let loadingDishes = new ReactiveVar(!dishesSub.ready() || !dishCategoriesSub.ready());
  let loadingOrders = new ReactiveVar(!ordersSub.ready());
  let dishes = Dishes.find().fetch();
  let dishCategories = DishCategories.find().fetch();

  return {
    loadingDishes: loadingDishes.get(),
    loadingOrders: loadingOrders.get(),
    dishes,
    dishCategories,
    location,
    activeTables,
    orders,
    tables,
    users,
    handleAcceptOrder,
    handleReadyOrder
  };
}, KitchenLayout);
