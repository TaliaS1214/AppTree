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
    'discovr' : 'discovr'
  },

  index: function() {
    // If there is a current user, then...
    Discovr.Models.currentUser.fetch({
      success: function() {
        this.navigate('favorites');
        this.setUserAndGenres();
      }.bind(this),

      error: function() {
        this.setGenres();
      }.bind(this)
    });

  },

  discovr: function() {
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
  setUserAndGenres: function() {
    var currentUser = Discovr.Models.currentUser;
    currentUser.sessionStatus = true;
    currentUser.get('genres').forEach(function(genre) {
      var newAppsByGenre = new Discovr.Collections.App({genre: genre});
      newAppsByGenre.fetch({ url: '/apps/' + genre });
      currentUser.newApps.push(newAppsByGenre);
    });
    Discovr.Collections.genres = new Discovr.Collections.Genre();

    currentUser.get('genres').forEach(function(element) {
      Discovr.Collections.genres.add({name: element});
    });

    Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
  },

  setGenres: function() {
    Discovr.Collections.genres = new Discovr.Collections.Genre();
    Discovr.Collections.genres.fetch({
      success: function() {
        Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
      }
    });
  }
});
