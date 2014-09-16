Discovr.Views.AppShow = Backbone.View.extend({
  el: '#app-list-container',

  initialize: function() {
    this.appShowTemplate = HandlebarsTemplates['apps/expanded'];
  },

  events: {
    'click #app-detail-header .send-to-device'  : 'sendToDevice',
    'click .upvote-button-show'                 : 'toggleUpvote',
    'click #add-review-button'                  : 'showReviewDiv',
    'click #submit-review-button'               : 'submitReview'
  },

  render: function() {
    //this.model.set('currentURL', document.URL);
    this.model.set('screenshot_urls', this.model.get('screenshot_urls').split(','));
    var genreName = this.model.get('tags').split(',')[0];
    var appName = this.model.get('name');
    $('#results-title').html('<span class="app-show-header"><strong id="genre-name">' + genreName + '</strong>' + ' > ' + '<span id="app-name">' + appName + '</span>'+ '</span>');
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
      Discovr.Views.nav.loadSignInPage();
    }
  },

  showReviewDiv: function() {
    if (Discovr.Models.currentUser.get('email')) {
      $('#review-input').show();
    } else {
      $('.modal').empty().show().append(Discovr.Views.nav.signInTemplate());
    }
  },

  submitReview: function() {
    var reviewText = $('#review-input-box').val();
    var commentUrl = '/apps/' + this.model.id + '/comments';
    $.ajax({
      type: 'POST',
      url: commentUrl,
      data: {
        comment: {
          content: reviewText,
          user_id: Discovr.Models.currentUser.id,
          app_id: this.model.id
        }
      },
      success: function(data) {
        // Create a new comment model
        var commentModel = new Discovr.Models.Comment({
          content: data['content'],
          user: data['user'],
          created_at: data['created_at']
        });
        // Create a new comment view
        var commentView = new Discovr.Views.Comment({model: commentModel});
        // Add the new view to the comment list view
        $('#review-list').prepend(commentView.$el);
        $('#review-input-box').val('');
      }
    });
  }

});
