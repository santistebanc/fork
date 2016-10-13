import { Meteor } from 'meteor/meteor';
//import { Users } from '../../api/lists/x.js';
import { createContainer } from 'meteor/react-meteor-data';
import WelcomeTitle from './welcomeTitle.jsx';

export default WelcomeTitleContainer = createContainer(({ params }) => {
  //const { id } = params;
  const userName = 'cacatua';
  //const todosHandle = Meteor.subscribe('todos.inList', id);
  //const loading = !todosHandle.ready();
  // const list = Lists.findOne(id);
  // const listExists = !loading && !!list;
  return {
    //loading,
    userName,
  };
}, WelcomeTitle);
