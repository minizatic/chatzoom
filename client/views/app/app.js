Template.app.loggedIn = function(){
	return Meteor.user();
}
Template.app.rooms = function(){
	var rooms = Rooms.find({$or: [{users: Meteor.user().username}, {open: true}]}).fetch();
	for(i=0; i<rooms.length; i++){
		var users;
		if(rooms[i].open){
			users = Meteor.users.find({"profile.room": rooms[i]._id, username: {$not: Meteor.user().username}}).fetch();
		}else{
			users = Meteor.users.find({"profile.room": rooms[i]._id, username: {$in: rooms[i].users, $not: Meteor.user().username}}).fetch();
		}
		rooms[i].users = users;
	}
	return rooms;
}
Template.app.selectUsers = function(){
	return Meteor.users.find({}).fetch();
}
Template.app.events({
	'click #newRoom': function(e){
		e.preventDefault();
		var data = {
			name: $('#roomName').val(),
			date: new Date(),
			points: [],
			messages: [],
			creator: Meteor.user().username
		};
		if($('#roomName').val() == ""){
			$('.roomError').html(Meteor.render(Template.error({error: "Name may not be blank"})));
		}
		else{
			if (!$("#roomUsers option:selected").length){
				data.open = true;
			}else{
				var sel = $("#roomUsers").val();
				data.users = [];
				$.each(sel, function(key,value){
					data.users.push(value);
				});
				data.users.push(Meteor.user().username);
			}
			Rooms.insert(data);
		}
	},
	'click .deleteRoom': function(e){
		Rooms.remove({_id: $(e.target).attr("id")});
	}
});