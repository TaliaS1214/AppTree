Discovr.Views.Profile = Backbone.View.extend({
  el: '#profile-page',
  initialize: function() {
    this.model = Discovr.Models.currentUser;
    this.profileTemplate = HandlebarsTemplates['users/profile'];
    this.render();
  },

  render: function() {
    this.$el.html(this.profileTemplate(this.model.toJSON()));
  }
});
