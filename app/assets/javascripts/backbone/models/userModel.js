Discovr.Models.User = Backbone.Model.extend({
  initialize: function() {
    console.log('New User Model');
    this.newApps = [];
    this.sessionStatus = false;
  },
  urlRoot: '/users'
});
