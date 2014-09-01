Discovr.Routers.App = Backbone.Router.extend({
  initialize: function() {
    Discovr.Models.currentUser = new Discovr.Models.User({id: 'current'});
    Discovr.Views.nav = new Discovr.Views.Navigation();

    // Creating Search Bar
    Discovr.Views.search = new Discovr.Views.Search();
  },

  routes: {
    '' : 'index',
    'myHome' : 'userHome',
    'discovr' : 'discovr'
  },

  index: function() {
    // Create a current user
    var currentUser = Discovr.Models.currentUser

    // If there is a current user, then
    currentUser.fetch({
      success: function() {
        currentUser.sessionStatus = true;
        currentUser.get('genres').forEach(function(genre) {
          var newAppsByGenre = new Discovr.Collections.App({genre: genre});
          newAppsByGenre.fetch({ url: '/apps/' + genre });
          currentUser.newApps.push(newAppsByGenre);
        });
        Discovr.Collections.genres = new Discovr.Collections.Genre();

        currentUser.get('genres').forEach(function(element) {
          Discovr.Collections.genres.add({name: element})
        });

        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
      },

      error: function() {
        Discovr.Collections.genres = new Discovr.Collections.Genre();
        Discovr.Collections.genres.fetch({
          success: function() {
            Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
          }
        });
      }
    });

  },

  discovr: function() {
    $('#genre-list').empty();
    Discovr.Models.currentUser.fetch();
    Discovr.Views.genres = new Discovr.Collections.Genre();
    Discovr.Views.genres.fetch({
      success: function() {
        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Views.genres});
      }
    });
  }
});
