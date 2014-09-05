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
    'click #home'               : 'loadHomePage',
    'click #discover-button'    : 'loadAllGenres',
    'click #profile-button'     : 'loadProfilePage',
    'click #sign-in-button'     : 'loadSignInPage',
    'click #sign-out-button'    : 'logOut'
  },

  loadHomePage: function() {
    Discovr.Routers.app.navigate('');
    $('body').attr('class', 'discover');

    Discovr.Views.genreList = new Discovr.Views.GenreList({collection: Discovr.Collections.genres});
    Discovr.Views.genreList.renderAll();

    $('#app-show-page').empty().hide();
    $('#profile-page').empty().hide();
    $('#main-content').show();

    $('#results-title').html('Top Apps on AppTree');

    Discovr.Collections.topApps = new Discovr.Collections.App();
    Discovr.Collections.topApps.url = '/apps/top';
    Discovr.Collections.topApps.fetch({
      success: function() {
        Discovr.Views.appList = new Discovr.Views.AppList({collection: Discovr.Collections.topApps});
        Discovr.Views.appList.renderTopApps();
      }
    });
  },

  loadAllGenres: function() {
    Discovr.Routers.app.navigate('discover');
    $('body').attr('class', 'discover');

    $('#app-show-page').empty().hide();
    $('#profile-page').empty().hide();
    $('#main-content').show();

    $('#results-title').html('Find the Best Apps!');
    $('#app-list-container').empty();
    Discovr.Collections.genres.fetch({ reset: true });
  },

  loadProfilePage: function() {
    Discovr.Routers.app.navigate('users/profile');

    $('#app-show-page').empty().hide();
    $('#main-content').empty().hide();
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
        Discovr.Models.currentUser.clear();
        Discovr.Models.currentUser.set('id', 'current');
        Discovr.Models.currentUser.id = 'current';
        this.render();
      }.bind(this)
    })
  }
});
