import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const DishCategories = new Mongo.Collection('DishCategories');
const Dishes = new Mongo.Collection('Dishes');
const Orders = new Mongo.Collection('Orders');

const Tables = new Mongo.Collection('Tables');
const ActiveTables = new Mongo.Collection('ActiveTables');

var Schemas = {};
Schemas.Orders = new SimpleSchema({
  userId: {type: String, regEx: SimpleSchema.RegEx.Id},
  open: {type: Boolean, defaultValue: true},
  dateOpened: {type:Date, autoValue: ()=>new Date()},
  dateClosed: {type: Date, optional: true},
  dishId: {type: String, regEx: SimpleSchema.RegEx.Id},
  activeTableId: {type: String, regEx: SimpleSchema.RegEx.Id},
  status: {type: String, defaultValue: "open"}
});
Orders.attachSchema(Schemas.Orders);

Schemas.Tables = new SimpleSchema({
  num: {type: Number},
  title: {type: String, optional: true}
});
Tables.attachSchema(Schemas.Tables);

Schemas.ActiveTables = new SimpleSchema({
  tableId: {type: String, regEx: SimpleSchema.RegEx.Id},
  num: {type: Number},
  title: {type: String, optional: true},
  open: {type: Boolean, defaultValue: true},
  dateOpened: {type:Date, autoValue: ()=>new Date()},
  dateClosed: {type: Date, optional: true},
  members: {type: [String], regEx: SimpleSchema.RegEx.Id, defaultValue: []}
});
ActiveTables.attachSchema(Schemas.ActiveTables);

Schemas.DishCategories = new SimpleSchema({
  name: {type: String}
});
DishCategories.attachSchema(Schemas.DishCategories);

Schemas.Dishes = new SimpleSchema({
  title: {type: String},
  image: {type: String},
  brief: {type: String},
  price: {type: Number},
  categories: {type: [String], regEx: SimpleSchema.RegEx.Id}
});
Dishes.attachSchema(Schemas.Dishes);

export { DishCategories, Dishes, Orders, Tables, ActiveTables };
