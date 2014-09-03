Discovr.Views.AppList = Backbone.View.extend({
  el: '#app-list-container',
  initialize: function() {
  },

  renderGenreApps: function() {
    this.$el.empty();
    this.$el.append('<div id="browse-genre">');
    this.renderAll('genre');
  },

  renderSearchResults: function() {
    this.$el.empty();
    $('<div id="search-results">').appendTo(this.$el)
      .append('<div id="apps-in-database">')
      .append('<div id="apps-not-in-database">');
    this.renderAll(null);
  },

  renderAll: function(buttonClicked) {
    this.collection.forEach(function(appModel) {
      this.renderOne(appModel, buttonClicked);
    }, this);
  },

  renderOne: function(appModel, buttonClicked) {
    var appView = new Discovr.Views.App({model: appModel});
    var appStorageContainer;
    if (buttonClicked === 'genre') {
      appStorageContainer = this.$el.find('#browse-genre');
    } else {
      if (appModel.id) {
        appStorageContainer = this.$('#apps-in-database');
      } else {
        appStorageContainer = this.$('#apps-not-in-database');
      }
    }
    appStorageContainer.append(appView.$el);
  }
});
