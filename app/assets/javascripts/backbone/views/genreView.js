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
    Discovr.Collections.apps = new Discovr.Collections.App();
    Discovr.Collections.apps.url = '/apps/' + genreName;
    Discovr.Collections.apps.fetch({
      success: function() {
        Discovr.Views.appList = new Discovr.Views.AppList({collection: Discovr.Collections.apps});
      }
    });
  }

});
