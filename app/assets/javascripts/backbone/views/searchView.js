Discovr.Views.Search = Backbone.View.extend({
  el: '#search',
  initialize: function() {

  },

  events: {
    'click #search-button': 'searchAndRender'
  },
  searchAndRender: function() {
    console.log('Yo');
    var searchTerm = this.$('#search-bar').val();
    var apps = new Discovr.Collections.App();
    apps.url = '/apps/search';
    apps.fetch({
      data: {search_term: searchTerm},
      success: function() {
        var appListView = new Discovr.Views.AppList({collection: apps});
      }
    });
  }
});
