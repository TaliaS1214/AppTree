Discovr.Views.Search = Backbone.View.extend({
  el: '#search',

  initialize: function() {
    this.loadingTemplate = HandlebarsTemplates['apps/loading'];
  },

  events: {
    'click #search-button': 'searchAndRender'
  },

  searchAndRender: function(event) {
    event.preventDefault();
    $('body').attr('class', 'search-results');
    
    var searchTerm = this.$('#search-bar').val();
    $('#results-title').html('Search Results for "' + searchTerm + '"');
    Discovr.Collections.apps = new Discovr.Collections.App();
    Discovr.Collections.apps.url = '/apps/search';
    Discovr.Collections.apps.fetch({
      data: {search_term: searchTerm},
      success: function() {
        Discovr.Views.appList = new Discovr.Views.AppList({collection: Discovr.Collections.apps});
        Discovr.Views.appList.renderSearchResults();
      }
    });

    $('#app-list-container').html(this.loadingTemplate());
  }
});
