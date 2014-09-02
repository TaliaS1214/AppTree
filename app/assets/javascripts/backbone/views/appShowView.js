Discovr.Views.AppShow = Backbone.View.extend({
  el: '#app-show-page',
  initialize: function() {
    this.appShowTemplate = HandlebarsTemplates['apps/expanded'];
    this.render();
  },

  render: function() {
    $('#main-content').hide();
    this.$el.html(this.appShowTemplate(this.model.toJSON()));
    this.$el.show();
  }
});
