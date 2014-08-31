Discovr.Collections.App = Backbone.Collection.extend({
  initialize: function() {
    console.log('New App Collection');
  },
  model: Discovr.Models.App
});
