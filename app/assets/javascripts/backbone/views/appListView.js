Discovr.Views.AppList = Backbone.View.extend({
  el: '#app-list-container',

  initialize: function() {
  },

  renderTopApps: function() {
    this.$el.empty();
    this.$el.append('<div id="top-apps">');
    this.renderAll('top');
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
    this.renderAll('search');
    $('#apps-in-database').prepend('<h2 class="in-database">Ranking on AppTree</h2>');
    $('#apps-not-in-database').prepend('<h2 class="not-in-database">iTunes App Store - Be the first to add to AppTree</h2>');
  },

  renderProfileApps: function() {
    this.renderAll('profile');
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
    }
    else if (buttonClicked === 'search'){
      appStorageContainer = appModel.id ? this.$('#apps-in-database') : this.$('#apps-not-in-database');
    }
    else if (buttonClicked === 'top'){
      appStorageContainer = this.$('#top-apps');
    }
    else if (buttonClicked === 'profile upvoted'){
      appStorageContainer
    }

    appStorageContainer.append(appView.$el);
  }
});
