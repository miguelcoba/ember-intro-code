App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
	this.route('register');
	this.route('registered');
	this.route('attendants', function() {
		this.route('about', { path: '/:attendant_id/about'});
	});
});

App.RegisterRoute = Ember.Route.extend({
	model: function() {
		return { firstName: "", lastName: "", email: ""}
	}
});

App.RegisterController = Ember.Controller.extend({
	isInvalid: true,

	validForm: function() {
		var isValid = this.get('model.firstName') != "" && this.get('model.lastName') != "" && this.get('model.email') != "";
		this.set('isInvalid', !isValid);
	}.observes('model.firstName', 'model.lastName', 'model.email'),

	actions: {
		register: function() {
			var newAttendant = Ember.copy(this.get('model'));
			var self = this;

			Ember.$.post('http://localhost:3000/attendants', newAttendant).then(function(data) {
				self.transitionToRoute('index');
			});
		}
	}
});

App.AttendantsRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('http://localhost:3000/attendants');
  }
});

App.AttendantsAboutRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('http://localhost:3000/attendants/' + params.attendant_id);
  }
});
