Discovr.Routers.App = Backbone.Router.extend({
  initialize: function() {
    // Signs in current user
    Discovr.Models.currentUser = new Discovr.Models.User({id: 'current'});
    Discovr.Models.currentUser.fetch();

    // Creates navigation bar
    Discovr.Views.nav = new Discovr.Views.Navigation({model: Discovr.Models.currentUser});

    // Creating modal for sign-in/sign-up
    Discovr.Views.modal = new Discovr.Views.Modal();

    // Creating Search Bar
    Discovr.Views.search = new Discovr.Views.Search();

    Discovr.Collections.genres = new Discovr.Collections.Genre();
    Discovr.Collections.genres.fetch({
      success: function() {
        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
      }
    });
  },

  routes: {
    '' : 'index',
    'myHome' : 'userHome',
    'discover' : 'discover',
    'genres/:genre_name' : 'loadGenre',
    'profile' : 'loadUserProfile'
  },

  index: function() {
    $('body').attr('class', 'home/discover');
    Discovr.Collections.topApps = new Discovr.Collections.App();
    Discovr.Collections.topApps.url = '/apps/top';
    Discovr.Collections.topApps.fetch({
      success: function() {
        Discovr.Views.genreList.renderAll();
        Discovr.Views.appList = new Discovr.Views.AppList({collection: Discovr.Collections.topApps});
        Discovr.Views.appList.renderTopApps();
      }
    });
  },

  discover: function() {
    $('body').attr('class', 'home/discover');
    $('#genre-list').empty();
    Discovr.Models.currentUser.fetch({
      success: function() {
        Discovr.Views.genreList.renderAll();
      }
    });
  },

  loadUserProfile: function() {
    $('#main-content').hide();
  }


});
