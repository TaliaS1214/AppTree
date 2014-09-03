Discovr.Views.AppShow = Backbone.View.extend({
  el: '#app-list-container',

  initialize: function() {
    this.appShowTemplate = HandlebarsTemplates['apps/expanded'];
    this.render();
  },

  render: function() {
    this.model.set('currentURL', document.URL);
    this.$el.html(this.appShowTemplate(this.model.toJSON()));
  }
});
