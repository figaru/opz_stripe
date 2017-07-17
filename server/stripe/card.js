
Meteor.methods({
  'stripe.card.createToken': function(card) {
    check(card, {
      number: String,
      exp_month: String,
      exp_year: String,
      cvc: String
    });

    var cardToken = new Future();

    stripe.tokens.create({card: card}, function(err, data) {
      if (err) {
        //console.log(err);
        cardToken.return(err);
      } else {
        // Call our setToken method below to apply the token to the form.
        cardToken.return(data);
      }
    });

    return cardToken.wait();
  }
});
