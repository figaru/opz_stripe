Meteor.methods({
	'stripe.init': () => {
		//delete plans
		Meteor.users.remove({});
		Meteor.call('stripe.customers.deleteAll', function(err, data){
			
		});
		PlanTypes.remove({});

		//recreate plans
		setupPlans();
	}
});


setupPlans = function(){
	var plans = PlanTypes.find().fetch();
	if(plans.length === 0){

		console.log('Creating plans..');
		
		var planTypes = [
			{
				plan_id: 'free_plan',
				name: 'Free Plan',
				interval: 'month',
				interval_count: 1,
				currency: 'eur',
				amount: 0000, //14.99€
				trial_period_days: 30,
				statement_descriptor: 'Opz.io Free Plan',
				metadata: {
					minUsers: 6,
					maxUsers: 15,
					maxProjects: 50,
					canInviteExternal: true,
				}
			},
			{
				plan_id: 'lite_plan',
				name: 'Lite Plan',
				interval: 'month',
				interval_count: 1,
				currency: 'eur',
				amount: 1699, //16.99€
				trial_period_days: 30,
				statement_descriptor: 'Opz.io Lite Plan',
				metadata: {
					minUsers: 1,
					maxUsers: 5,
					maxProjects: 25,
					canInviteExternal: false,
				}
			},
			{
				plan_id: 'normal_plan',
				name: 'Normal Plan',
				interval: 'month',
				interval_count: 1,
				currency: 'eur',
				amount: 1299, //12.99€
				trial_period_days: 30,
				statement_descriptor: 'Opz.io Normal Plan',
				metadata: {
					minUsers: 16,
					maxUsers: 30,
					maxProjects: null,
					canInviteExternal: true,
				}
			},
		]

		for(var i=0; i<planTypes.length; i++){

			PlanTypes.insert({
				plan_id: planTypes[i].plan_id,
				name: planTypes[i].name,
				interval: planTypes[i].interval,
				interval_count: planTypes[i].interval_count,
				currency: planTypes[i].currency,
				amount: planTypes[i].amount,
				trial_period_days: planTypes[i].trial_period_days,
				statement_descriptor: planTypes[i].statement_descriptor,
				metadata: planTypes[i].metadata
			});

			console.log('Inserted plan ' + planTypes[i].name);

			stripe.plans.create({
				id: planTypes[i].plan_id,
				name: planTypes[i].name,
				interval: planTypes[i].interval,
				interval_count: planTypes[i].interval_count,
				currency: planTypes[i].currency,
				amount: planTypes[i].amount,
				trial_period_days: planTypes[i].trial_period_days,
				statement_descriptor: planTypes[i].statement_descriptor,
				metadata: planTypes[i].metadata
			}, function(err, plan) {
				if(err){
					//console.log(err)
				}
				else{
					console.log('[STRIPE] created plan');
				}
			});
		}

	}
}