Discovr.Views.App = Backbone.View.extend({
  className: 'app-single',
  initialize: function() {
    this.appTemplate = HandlebarsTemplates['apps/small'];
    this.searchBarTemplate = HandlebarsTemplates['apps/search'];
    this.render(this.appTemplate);
  },
  render: function(template) {
    this.$el.html(template(this.model.toJSON()));
  }

});
