Discovr.Collections.Genre = Backbone.Collection.extend({
  initialize: function() {
    console.log('New Genre Collection Created');
  },
  model: Discovr.Models.Genre,
  url: '/genres'
});
