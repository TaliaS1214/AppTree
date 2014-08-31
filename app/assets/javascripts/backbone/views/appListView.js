Discovr.Views.AppList = Backbone.View.extend({
  el: '#app-list-container',
  initialize: function() {
    this.renderAll();
  },
  events: {
  },
  renderAll: function() {
    this.$el.empty();
    this.collection.forEach(function(appModel) {
      this.renderOne(appModel);
    }, this);
  },
  renderOne: function(appModel) {
    var appView = new Discovr.Views.App({model: appModel});
    this.$el.append(appView.$el);
  }
});
