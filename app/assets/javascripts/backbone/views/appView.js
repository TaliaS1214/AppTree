Discovr.Views.App = Backbone.View.extend({
  className: 'app-single',

  initialize: function() {
    this.appTemplate = HandlebarsTemplates['apps/small'];
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  events: {
    'click .upvote-button'  : 'increaseUpvoteCount',
    'click .send-to-device' : 'sendToDevice',
    'click .app-name'       : 'openShowPage'
  },

  render: function() {
    if (this.model.get('price') == 0.0) { this.model.set('free', true);1 }
    if (Discovr.Models.currentUser.get('email')) {
        this.model.set('signed_in', true);
      }
    this.$el.html(this.appTemplate(this.model.toJSON()));
    if (!Discovr.Models.currentUser.get('email')) {
      this.$('.upvote').removeClass('upvoted');
    }
  },

  increaseUpvoteCount: function() {
    if (Discovr.Models.currentUser.get('email')) {
      if (this.model.get('id')){
        this.model.fetch({
          url: '/apps/' + this.model.id + '/upvote',
          type: 'put',
          success: function() {
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
  },

  sendToDevice: function() {
    $.ajax( '/apps/'+ this.model.id + '/send', {
      type: 'put'
    });
  },

  openShowPage: function() {
    Discovr.Routers.app.navigate('apps/' + this.model.id);

    $('body').attr('class', 'app-detail');

    Discovr.Views.appShow = new Discovr.Views.AppShow({model: this.model});
  }

});
