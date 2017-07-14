Meteor.methods({
	'stripe.plans.retrieve': function(planId){
		check(planId, String);
		//check(this.userId, String);

		stripe.plans.retrieve(
			planId,
			function(err, plan) {
				console.log(plan)
			}
		);
	},
	'stripe.plans.list': function(planId){
		check(planId, String);
		//check(this.userId, String);

		stripe.plans.list(
			{},
			function(err, plan) {
				console.log(plan)
			}
		);
	},
	'stripe.plans.deleteAll': function(){
		
		stripe.plans.list(
			{},
			function(err, response) {
				if(response !== null){
					if(response.data.length > 0){
						_.each(response.data, function(el, k){
							stripe.plans.del(
							  el.id,
							  function(err, confirmation) {
							    console.log(err)
							    console.log(confirmation)
							    console.log('----------------------')
							  }
							);
						})
					}
				}
			}
		);
	},
})