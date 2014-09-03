Discovr.Views.Profile = Backbone.View.extend({
  el: '#profile-page',

  initialize: function() {
    this.model = Discovr.Models.currentUser;
    this.profileTemplate = HandlebarsTemplates['users/profile'];
    this.upvoteCollection = Discovr.Collections.App({url: '/apps/upvoted'});
    this.bookmarkCollection = Discovr.Collections.App({url: '/apps/bookmarked'});

    this.upvoteCollection.fetch({
      success: function() {
        this.bookmarkedCollection.fetch({
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

    this.$('#downloaded-apps-list')
  }
});
