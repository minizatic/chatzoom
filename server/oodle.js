
Meteor.publish("Rooms", function(){
	return Rooms.find({});
});

Meteor.publish("userStatus", function(){
	return Meteor.users.find({});
});

Hooks.onCloseSession = function (userId) {
	Meteor.users.update({_id: userId}, {$set: {profile: {room: undefined}}});
}

Hooks.onLoggedOut = function (userId) {
	Meteor.users.update({_id: userId}, {$set: {profile: {room: undefined}}});
}