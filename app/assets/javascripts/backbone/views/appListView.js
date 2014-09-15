Discovr.Views.AppList = Backbone.View.extend({
  el: '#app-list-container',

  initialize: function() {
  },

  renderTopApps: function() {
    this.$el.empty();
    this.$el.append('<ul id="top-apps">');
    this.renderAll('top');
  },

  renderGenreApps: function() {
    this.$el.empty();
    var paidApps = $('<div class="paid-apps">').appendTo(this.$el).append('<h2 class="paid-header">Paid</h2>');
    var freeApps = $('<div class="free-apps">').appendTo(this.$el).append('<h2 class="free-header">Free</h2>');
    paidApps.append('<ul class="list" id="browse-genre-paid">');
    freeApps.append('<ul class="list" id="browse-genre-free">');
    //this.$el.append('<ul class="pagination">');
    this.renderAll('genre');
  },

  renderSearchResults: function() {
    this.$el.empty();
    $('<div id="search-results">').appendTo(this.$el)
      .append('<ul id="apps-in-database">')
      .append('<ul id="apps-not-in-database">');
    $('#apps-in-database').prepend('<h2 class="in-database">Ranking on AppTree</h2>');
    $('#apps-not-in-database').prepend('<h2 class="not-in-database">iTunes App Store - Be the first to add to AppTree</h2>');
    this.renderAll('search');
  },

  renderAll: function(buttonClicked) {
    this.collection.forEach(function(appModel) {
      this.renderOne(appModel, buttonClicked);
    }, this);
  },

  renderOne: function(appModel, buttonClicked) {
    var appView = new Discovr.Views.App({model: appModel});
    var appStorageContainer = this.determineContainer(appModel, buttonClicked);
    appStorageContainer.append(appView.$el);
  },

  determineContainer: function(appModel, buttonClicked) {
    switch(buttonClicked) {
      case 'genre':
        return appModel.get('price') != "0.0" ? this.$('#browse-genre-paid') : this.$('#browse-genre-free');
      case 'search':
        return appModel.id ? this.$('#apps-in-database') : this.$('#apps-not-in-database');
      case 'top':
        return this.$('#top-apps');
      case 'profile upvoted apps':
        return $('#upvoted-apps-list');
      case 'profile bookmarked apps':
        return $('#bookmarked-apps-list');
    }
  }
});
