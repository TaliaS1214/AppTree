Discovr.Views.Navigation = Backbone.View.extend({
  el: '.top-bar',
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.navBarTemplate = HandlebarsTemplates['navigation/navbar'];
    this.signInTemplate = HandlebarsTemplates['users/signin'];
    this.render();
  },

  render: function() {
    this.$el.empty();
    this.$el.html(this.navBarTemplate(Discovr.Models.currentUser.toJSON()));
  },

  events: {
    'click #favorites-button'   : 'loadUserGenres',
    'click #discover-button'    : 'loadAllGenres',
    'click #sign-in-button'     : 'loadSignInPage',
    'click #sign-out-button'    : 'logOut'
  },

  loadUserGenres: function(event) {
    event.preventDefault();

    Discovr.Routers.app.navigate('favorites');
    var genres = [];

    Discovr.Models.currentUser.get('genres').forEach(function(genre) {
      genres.push({name: genre});
    });

    Discovr.Collections.genres.reset(genres);
  },

  loadAllGenres: function() {
    Discovr.Routers.app.navigate('discover');

    event.preventDefault();
    Discovr.Routers.app.navigate('discovr');
    Discovr.Collections.genres.fetch({ reset: true });
  },

  loadSignInPage: function() {
    event.preventDefault();

    Discovr.Routers.app.navigate('signin-or-signup');
    var $modal = $('.modal');
    $modal.empty().show().append(this.signInTemplate());
  },

  logOut: function() {
    Discovr.Routers.app.navigate('');

    Discovr.Models.currentUser.fetch({
      url: '/sessions/' + Discovr.Models.currentUser.id,
      type: 'delete',
      success: function() {
        this.model = {};
        this.render();
      }.bind(this)
    })
  }
});
