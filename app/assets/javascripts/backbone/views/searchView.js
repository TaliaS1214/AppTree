Discovr.Views.Search = Backbone.View.extend({
  el: '#search',
  initialize: function() {
    this.loadingTemplate = HandlebarsTemplates['apps/loading'];
  },

  events: {
    'click #search-button': 'searchAndRender'
  },
  searchAndRender: function() {
    var searchTerm = this.$('#search-bar').val();
    var apps = new Discovr.Collections.App();
    apps.url = '/apps/search';
    apps.fetch({
      data: {search_term: searchTerm},
      success: function() {
        var appListView = new Discovr.Views.AppList({collection: apps});
      }
    });

    $('#app-list-container').html(this.loadingTemplate());
  }
});
