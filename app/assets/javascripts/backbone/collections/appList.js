Discovr.Collections.AppList = Backbone.Collection.extend({
  initialize: function() {
    console.log('New App Collection');
  },
  model: Discovr.Models.App,
  url: '/'+ this.genre +'/apps'
});
