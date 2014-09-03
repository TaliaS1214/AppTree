Discovr.Views.Genre = Backbone.View.extend({
  tagName: 'li',

  className: 'genre-link',

  initialize: function() {
    this.render();
  },

  events: {
    'click' : 'displayApps'
  },

  render: function() {
    this.$el.html(this.model.get('name'));
  },

  displayApps: function() {
    this.$el.siblings().removeClass('active');
    this.$el.addClass('active');
    var genreName = this.model.get('name');
    Discovr.Routers.app.navigate('genres/' + genreName);
    Discovr.Collections.apps = new Discovr.Collections.App();
    Discovr.Collections.apps.url = '/apps/' + genreName;
    Discovr.Collections.apps.fetch({
      success: function() {
        Discovr.Views.appList = new Discovr.Views.AppList({
          collection: Discovr.Collections.apps
        });
        $('#results-title').html(genreName);
        Discovr.Views.appList.renderGenreApps();
      }
    });
  }

});
