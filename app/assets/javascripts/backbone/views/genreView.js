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
    $('body').attr('class', 'browse-genre');
    this.$el.siblings().removeClass('active');
    this.$el.addClass('active');

    $('#app-list-container').empty();

    var genreName = this.model.get('name');
    Discovr.Routers.app.navigate('/' + genreName + '/apps');
    // Discovr.Collections.apps = new Discovr.Collections.App();
    Discovr.Collections.apps.url = '/' + genreName + '/apps';
    Discovr.Collections.apps.fetch({
      success: function() {
        Discovr.Views.appList.collection = Discovr.Collections.apps
        $('#results-title').html(genreName);
        Discovr.Views.appList.renderGenreApps();
      }
    });
  }

});
