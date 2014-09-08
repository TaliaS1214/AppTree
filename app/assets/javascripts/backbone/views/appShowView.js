Discovr.Views.AppShow = Backbone.View.extend({
  el: '#app-list-container',

  initialize: function() {
    this.appShowTemplate = HandlebarsTemplates['apps/expanded'];
  },

  events: {
    'click #app-detail-header .send-to-device' : 'sendToDevice',
    'click .upvote-button-show'  : 'toggleUpvote'
  },

  render: function() {
    this.model.set('currentURL', document.URL);
    this.model.set('screenshot_urls', this.model.get('screenshot_urls').split(','));
    this.$el.html(this.appShowTemplate(this.model.toJSON()));
  },

  sendToDevice: function() {
    $.ajax( '/apps/'+ this.model.id + '/send', {
      type: 'put'
    });
  },

  toggleUpvote: function() {
    if (Discovr.Models.currentUser.get('email')) {
      if (this.model.get('id')){
        this.model.fetch({
          url: '/apps/' + this.model.id + '/upvote',
          type: 'put',
          success: function() {
            this.render();
          }.bind(this)
        });
      }
      else {
        this.model.save();
      }
      this.$('.upvote').toggleClass('upvoted');
    }
    else {
      $('.modal').empty().show().append(Discovr.Views.nav.signInTemplate());
    }
  }
});
