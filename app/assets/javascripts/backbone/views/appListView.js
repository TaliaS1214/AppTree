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
    var paidApps = $('<div class="paid-apps">').appendTo(this.$el).append('<h2 class="app-column-header">Paid Apps</h2>');
    var freeApps = $('<div class="free-apps">').appendTo(this.$el).append('<h2 class="app-column-header">Free Apps</h2>');
    var paidList = $('<ul class="list" id="browse-genre-paid">').appendTo(paidApps);
    var freeList = $('<ul class="list" id="browse-genre-free">').appendTo(freeApps);
    //this.$el.append('<ul class="pagination">');
    this.renderAll('genre');
    if (paidList.children().length == 0) {
      paidList.append('<li class="empty">There are no paid apps for this genre yet!</li>')
    }
    if (freeList.children().length == 0) {
      freeList.append('<li class="empty">There are no free apps for this genre yet!</li>')
    }
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
