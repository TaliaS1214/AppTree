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
    var genreName = this.model.get('name');
    Discovr.Routers.app.navigate('/' + genreName + '/apps');
    $('body').attr('class', 'browse-genre');
    this.$el.siblings().removeClass('active');
    this.$el.addClass('active');
    $('#results-title').empty();
    $('#app-list-container').empty();

    Discovr.Collections.apps.url = '/' + genreName + '/apps';
    Discovr.Collections.apps.fetch({
      success: function() {
        Discovr.Views.appList.collection = Discovr.Collections.apps;
        $('#results-title').html('<strong>' + genreName + '</strong>');
        Discovr.Views.appList.renderGenreApps();
      }
    });
  }
});
