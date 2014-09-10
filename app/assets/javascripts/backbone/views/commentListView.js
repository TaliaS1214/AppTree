Discovr.Views.CommentList = Backbone.View.extend({

  initialize: function() {
  },

  renderAll: function() {
    this.collection.each(function(comment) {
      var commentView = new Discovr.Views.Comment({ model: comment });
      this.renderOne(commentView);
    }, this);
  },

  renderOne: function(commentView) {
    $('#review-list').append(commentView.$el);
  }

});
