Discovr.Routers.App = Backbone.Router.extend({
  initialize: function() {
    // Signs in current user
    Discovr.Models.currentUser = new Discovr.Models.User({id: 'current'});

    // Creates navigation bar
    Discovr.Views.nav = new Discovr.Views.Navigation({model: Discovr.Models.currentUser});

    // Creating modal for sign-in/sign-up
    Discovr.Views.modal = new Discovr.Views.Modal();

    // Creating Search Bar
    Discovr.Views.search = new Discovr.Views.Search();
  },

  routes: {
    '' : 'index',
    'myHome' : 'userHome',
    'discover' : 'discover'
  },

  index: function() {
    this.listAllGenres();
    Discovr.Collections.topApps = new Discovr.Collections.App();
    Discovr.Collections.topApps.url = '/apps/top';
    Discovr.Collections.topApps.fetch({
      success: function() {
        Discovr.Views.appList = new Discovr.Views.AppList({collection: Discovr.Collections.topApps});
        Discovr.Views.appList.renderTopApps();
      }
    });
  },

  discover: function() {
    $('#genre-list').empty();
    Discovr.Models.currentUser.fetch();
    this.listAllGenres();
  },

  //::::::::: helper methods :::::::::

  listAllGenres: function() {
    Discovr.Collections.genres = new Discovr.Collections.Genre();
    Discovr.Collections.genres.fetch({
      success: function() {
        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
      }
    });
  }
});
