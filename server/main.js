import { Meteor } from 'meteor/meteor';
import { italianFixture } from "../imports/startup/server/fixtures.js";
import { Dishes } from '../lib/collections.js'

Meteor.startup(() => {
  if (Dishes.find().fetch().length === 0) {
    italianFixture();
  }
});


import "../imports/api/publications.js";
