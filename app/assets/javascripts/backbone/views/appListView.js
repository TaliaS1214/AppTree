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
    this.renderAll();
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
      appStorageContainer = appModel.id ? this.$('#apps-in-database') : this.$('#apps-not-in-database');
    }
    appStorageContainer.append(appView.$el);
  }
});
