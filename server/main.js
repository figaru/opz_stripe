import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  	//setup stripe
  	stripe = require("stripe")(
	  Meteor.settings.private.stripe
	);

});

