Meteor.methods({
	//usin sync as seen in https://forums.meteor.com/t/using-wrapasync-with-bindenvironment-correctly/19005/3
	'stripe.customers.create': async function(userId, email){
		//check(userId, String);
		var customer = await stripe.customers.create({
			email: email,
			description: 'TEST USER'
		}, function(err, customer) {
			if(err) {
				console.log(err);
			}else{
				console.log('--------------');
				console.log(customer);
			}
			
		});
	},
	'stripe.customers.list': function(){
		stripe.customers.list(
		{},
		function(err, customers) {
			console.log(customers)
		});
	},
	'stripe.customers.del': async function(customerId){
		check(customerId, String);
		stripe.customers.del(
		  customerId,
		  function(err, confirmation) {
		    console.log(err)
		    console.log(confirmation)
		    console.log('----------------------')
		  }
		);
	},
	'stripe.customers.deleteAll': async function(){
		stripe.customers.list(
		{},
		function(err, customers) {
			//console.log(customers)
			_.each(customers.data, function(el, k){
				stripe.customers.del(
				  el.id,
				  function(err, confirmation) {
				    console.log(err)
				    console.log(confirmation)
				    console.log('----------------------')
				  }
				);
			});
		});
	},
})