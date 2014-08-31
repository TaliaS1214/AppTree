Discovr.Routers.App = Backbone.Router.extend({
  initialize: function() {
    Discovr.Models.currentUser = new Discovr.Models.User({id: 'current'});
    var currentUser = Discovr.Models.currentUser
    currentUser.fetch({
      success: function() {
        currentUser.sessionStatus = true;
        currentUser.get('genres').forEach(function(genre) {
          var newAppsByGenre = new Discovr.Collections.App({genre: genre});
          newAppsByGenre.fetch({ url: '/apps/' + genre });
          currentUser.newApps.push(newAppsByGenre);
        });
      }
    });
  }
});
