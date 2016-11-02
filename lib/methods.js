import { Meteor } from 'meteor/meteor';
import { Tables, ActiveTables, Orders } from './collections.js'

Meteor.methods({
  'registerTable'({ tableId, userId }) {
    const table = Tables.findOne({_id: tableId});
    const existingActTables = ActiveTables.find({members: {$in: [userId]}}).fetch();
    if(existingActTables.length>0){
      ActiveTables.update({members: {$in: [userId]}},{$pull:{members: userId}})
    }
    if(table){
      const alreadyActiveTable = ActiveTables.findOne({tableId: table._id});
      if(alreadyActiveTable){
        if(alreadyActiveTable.members.indexOf(userId) == -1){
          let updatedmembers = [...alreadyActiveTable.members, userId];
          ActiveTables.update({_id:alreadyActiveTable._id},{$set:{members: updatedmembers}});
        }
      }else{
        ActiveTables.insert({tableId: table._id, num: table.num, members: [userId]});
      }
    }else{
      throw new Meteor.Error('tableInexistent',
        `The table ${tableId} does not exist`);
    }
  },
  'placeOrder'({ userId, activeTableId, dish }) {
      Orders.insert({
        userId: userId,
        dishId: dish,
        activeTableId: activeTableId
      });
  },
  'confirmOrders'({ orderIds }) {
      Orders.update({_id:{$in: orderIds}},{$set: {sent: true, status: "received", dateSent: new Date()}}, {multi: true})
  },
  'acceptOrder'({ orderId }) {
      Orders.update({_id: orderId},{'$set':{
        status: 'accepted',
        dateAccepted: new Date()
      }})
  },
  'readyOrder'({ orderId }) {
      Orders.update({_id: orderId},{'$set':{
        status: 'ready',
        dateFinished: new Date()
      }})
  },
  'cancelOrder'({ orderId }) {
      Orders.update({_id: orderId},{'$set':{
        status: 'canceled',
        open: false,
        dateClosed: new Date()
      }})
  },
  'changeUserNick'({ userId, newName }) {
    Meteor.users.update(userId, {$set: {nickName: newName}});
  }
});
