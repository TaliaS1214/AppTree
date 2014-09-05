Discovr.Views.Profile = Backbone.View.extend({
  el: '#profile-page',

  initialize: function() {
    this.model = Discovr.Models.currentUser;
    this.profileTemplate = HandlebarsTemplates['users/profile'];
    this.upvoteCollection = new Discovr.Collections.App();
    this.upvoteCollection.url = '/users/apps/upvoted';
    this.bookmarkCollection = new Discovr.Collections.App();
    this.bookmarkCollection.url =  '/users/apps/bookmarked';

    this.upvoteCollection.fetch({
      success: function() {
        this.bookmarkCollection.fetch({
          success: function() {
            this.render();
          }.bind(this)
        })
      }.bind(this)
    });

    this.render();
  },

  render: function() {
    this.$el.html(this.profileTemplate(this.model.toJSON()));
    var upvotedAppsView = new Discovr.Views.AppList({collection: this.upvoteCollection});
    var bookmarkedAppsView = new Discovr.Views.AppList({collection: this.bookmarkCollection});

    upvotedAppsView.renderAll('profile upvoted apps');
    bookmarkedAppsView.renderAll('profile bookmarked apps');
  }
});
