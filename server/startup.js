import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	Future = Npm.require('fibers/future');
	Fiber  = Npm.require('fibers');

  	//instantiate stripe
  	stripe = require("stripe")(
	  Meteor.settings.private.stripe
	);


  	//console.log(stripe.getToken({hey: "hey"}));
  	//setup stripe -> plans, etc
  	Meteor.call("stripe.init");
});

