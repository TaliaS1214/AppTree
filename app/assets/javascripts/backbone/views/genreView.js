Discovr.Views.Genre = Backbone.View.extend({
  tagName: 'li',
  className: 'genre-link',
  initialize: function() {
    console.log('New Genre View Created');
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
    var apps = new Discovr.Collections.App();
    apps.url = '/apps/' + genreName;
    apps.fetch({
      success: function() {
        Discovr.Views.appList = new Discovr.Views.AppList({collection: apps});
      }
    });
  }

});
