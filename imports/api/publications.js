import { Meteor } from 'meteor/meteor';
import { DishCategories, Dishes, Tables, Orders, ActiveTables } from '../../lib/collections.js'

Meteor.publish('dishCategories', function() {
  return DishCategories.find();
});


Meteor.publish('dishes.menu', function() {
  return Dishes.find({}, {
    fields: Dishes.publicFields
  });
});

Meteor.publish('tables', function() {
  return Tables.find();
});

Meteor.publish('activeTables', function() {
  return ActiveTables.find({open: true});
});

Meteor.publish('orders', function() {
    return Orders.find({open:true});
});