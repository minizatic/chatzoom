
Meteor.startup(function(){
  Hooks.init();
});



Meteor.subscribe("Rooms");
Meteor.subscribe("userStatus");



Accounts.ui.config({passwordSignupFields: 'USERNAME_ONLY'});

Meteor.Router.add({
  '/' : function(){
  	Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: {room: undefined}}});
  	return 'main';
  },
  '/rooms/:id' : function(id){
  	Session.set("currentRoom", id);
  	Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: {room: id}}});
  	return 'room';
  },
  '*': 'not_found'
});

Handlebars.registerHelper("areCreator", function(creator) {
  if(creator == Meteor.user().username){
    return true;
  }else{
    return false;
  }
});