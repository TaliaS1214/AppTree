Discovr.Views.Navigation = Backbone.View.extend({
  el: '.top-bar',
  initialize: function() {

  },
  events: {
    'click #home-button'   : 'loadUserGenres',
    'click #discovr-button': 'loadAllGenres'
  },

  loadUserGenres: function(event) {
    event.preventDefault();
    Discovr.Routers.app.navigate('');
    var genres = [];

    Discovr.Models.currentUser.get('genres').forEach(function(genre) {
      genres.push({name: genre});
    });

    Discovr.Collections.genres.reset(genres);
  },

  loadAllGenres: function(event) {
    event.preventDefault();
    Discovr.Routers.app.navigate('discovr');
    Discovr.Collections.genres.fetch({ reset: true });
  }
});
