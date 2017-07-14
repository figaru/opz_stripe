import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {

    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


function create(){
	console.log(Stripe);
	/*stripe.customers.create(
		{ email: 'customer@example.com' },
		function(err, customer) {
			console.log(err); // null if no error occurred
			console.log(customer); // the created customer object
		}
	);*/
}