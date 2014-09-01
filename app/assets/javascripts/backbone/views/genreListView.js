Discovr.Views.GenreList = Backbone.View.extend({
  el: '#genre-list',
  initialize: function(){
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.renderAll();
  },
  events: {
  },
  renderAll: function() {
    this.$el.empty();
    this.collection.forEach(function(genreModel){
      this.renderOne(genreModel);
    }, this);
  },
  renderOne: function(genreModel) {
    var genreView = new Discovr.Views.Genre({model: genreModel});
    this.$el.append(genreView.$el);
  }
})
