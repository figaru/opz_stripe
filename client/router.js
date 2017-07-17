Router.configure({
  notFoundTemplate: 'notFound',
  layoutTemplate: 'layout'
});


Router.route('/', {
  path: '/',
  template: 'signup',
  onBeforeAction: function(){
    Session.set('currentRoute', 'home');
    this.next();
  }
});