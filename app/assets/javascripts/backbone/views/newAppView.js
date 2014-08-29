App.Views.NewApp = Backbone.View.extend({
  el: '#modal-form',
  initialize: function() {
    this.appTemplate = HandlebarsTemplates['apps/small']
    this.searchBarTemplate = HandlebarsTemplates['apps/search']
  }

});
