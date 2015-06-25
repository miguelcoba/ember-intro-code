App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'http://localhost:3000'
});

App.Attendant = DS.Model.extend({
	firstName: DS.attr(), // default type: string
	lastName: DS.attr(),
	email: DS.attr()
});

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
			var newAttendant = this.store.createRecord('attendant', {
				firstName: this.get('model.firstName'),
				lastName: this.get('model.lastName'),
				email: this.get('model.email'),
			});
			var self = this;

			newAttendant.save().then(function(data) {	// save() triggers a POST request 
				self.transitionToRoute('index');
			});
		}
	}
});

App.AttendantsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('attendant');
  }
});

App.AttendantsAboutRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('attendant', params.attendant_id);
  }
});
