Discovr.Views.App = Backbone.View.extend({
  className: 'app-single',

  tagName: 'li',

  initialize: function() {
    this.appTemplate = HandlebarsTemplates['apps/small'];
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  events: {
    'click .upvote-button'  : 'toggleUpvote',
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

  toggleUpvote: function() {
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
      Discovr.Views.nav.loadSignInPage();
    }
  },

  sendToDevice: function() {
    var currentPhoneNumber = Discovr.Models.currentUser.get('phone_number');
    if (!currentPhoneNumber) {
      $('.modal').append(Discovr.Views.nav.signInTemplate()).show();
    } else if(currentPhoneNumber != "") {
      $.ajax( '/apps/'+ this.model.id + '/send', {
        type: 'put',
        success: function() {

          // when user clicks send to phone button a confirmation
          // is produced.
          this.$('.confirm-send-to-phone').text('Sent!');

          setTimeout(function() {
            this.$('.confirm-send-to-phone').fadeOut(400, function() {
                this.$('.confirm-send-to-phone').remove();
            }.bind(this));

          }.bind(this), 1000);

        }.bind(this)
      });

      $('<div class="confirm-send-to-phone">')
        .appendTo(this.$el)
        .text('Sending...');
    } else {
      $('.modal').append(Discovr.Views.modal.phoneNumberTemplate()).show();
    }
  },

  openShowPage: function() {
    Discovr.Routers.app.navigate('apps/' + this.model.id);

    $('body').attr('class', 'app-detail');
    // Emptying not-needed divs
    $('#app-list-container').empty();
    $('#profile-page').empty();
    // Show the appropriate page
    $('#main-content').show();

    Discovr.Views.appShow.model = this.model;
    Discovr.Views.appShow.render();
    Discovr.Views.commentList.collection = Discovr.Collections.comments
    Discovr.Collections.comments.fetch({
      url: '/apps/' + this.model.id + '/comments',
      success: function() {
        Discovr.Views.commentList.el = '#review-list';
        Discovr.Views.commentList.renderAll();
      }
    });
  }

});
