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
    // If there is a current user, then...
    Discovr.Models.currentUser.fetch({
      success: function() {
        this.setGenres();
      }.bind(this),
    });

  },

  discover: function() {
    $('#genre-list').empty();
    Discovr.Models.currentUser.fetch();
    Discovr.Collections.genres = new Discovr.Collections.Genre();
    Discovr.Collections.genres.fetch({
      success: function() {
        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
      }
    });
  },









  //::::::::: helper methods :::::::::
  setGenres: function() {
    Discovr.Collections.genres = new Discovr.Collections.Genre();
    Discovr.Collections.genres.fetch({
      success: function() {
        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
      }
    });
  }
});
