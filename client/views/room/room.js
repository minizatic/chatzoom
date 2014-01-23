Template.room.events({
	'click #postChat': function(e){
		e.preventDefault();
		var msg = $("textarea#message").val();
		if(msg == ""){
			$('.chatError').html(Meteor.render(Template.error({error: "Message may not be blank"})));
		}else{
			var data = {
				user: Meteor.user().username,
				message: msg,
				date: new Date()
			};
			Rooms.update({_id: Session.get("currentRoom")}, {$push: {messages: data}});
			$("textarea#message").val("");
		}
	}
});

Template.room.messages = function(){
	var room = Rooms.find({_id: Session.get("currentRoom")}).fetch()[0];
	return room.messages;
}
