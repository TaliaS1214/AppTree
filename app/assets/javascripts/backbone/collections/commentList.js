Discovr.Collections.Comment = Backbone.Collection.extend({
  initialize: function() {
    console.log('New Comment Collection Created');
  },

  model: Discovr.Models.Comment
});
