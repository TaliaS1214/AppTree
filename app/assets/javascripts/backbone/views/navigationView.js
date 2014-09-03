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
    'click #profile-button'     : 'loadProfilePage',
    'click #sign-in-button'     : 'loadSignInPage',
    'click #sign-out-button'    : 'logOut'
  },

  loadAllGenres: function() {
    $('#app-show-page').hide();
    $('#profile-page').hide();
    $('#main-content').show();

    Discovr.Routers.app.navigate('discover');
    Discovr.Collections.genres.fetch({ reset: true });
  },

  loadProfilePage: function() {
    $('#app-show-page').hide();
    $('#main-content').hide();
    $('#profile-page').show();

    Discovr.Routers.app.navigate('profile');
    Discovr.Views.profile = new Discovr.Views.Profile();
  },

  loadSignInPage: function() {
    Discovr.Routers.app.navigate('signin-or-signup');

    $('.modal').empty().show().append(this.signInTemplate());
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
