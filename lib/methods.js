import { Meteor } from 'meteor/meteor';
import { Tables, ActiveTables, Orders } from './collections.js'

Meteor.methods({
  'registerTable'({ number, userId }) {
    const table = Tables.findOne({num: Number(number)});
    const existingActTables = ActiveTables.find({members: {$in: [userId]}}).fetch();
    console.log(existingActTables);
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
        `The table with num ${number} does not exist`);
    }
  },
  'placeOrder'({ userId, activeTableId, dish }) {
      Orders.insert({
        userId: userId,
        dishId: dish,
        activeTableId: activeTableId
      });
  },
  'cancelOrder'({ orderId }) {
    console.log(orderId, Orders.find({_id: orderId}).fetch());
      console.log(Orders.update({_id: orderId},{'$set':{
        status: 'canceled',
        open: false,
        dateClosed: new Date()
      }}));
  },
  'changeUserNick'({ userId, newName }) {
    Meteor.users.update(userId, {$set: {nickName: newName}});
  }
});
