Discovr.Views.Modal = Backbone.View.extend({
  el: '.modal',

  initialize: function() {
    console.log('New Modal View');
  },

  events: {
    'click #form-sign-up-button' : 'createUser',
    'click #form-sign-in-button' : 'signUserIn',
    'click .close' : 'closeModal'
  },

  createUser: function() {
    event.preventDefault();
    var userObject = {
      user: {
        email: $('#sign-up-email').val(),
        password: $('#sign-up-password').val(),
        password_confirmation: $('#sign-up-password-confirmation').val(),
        phoneNumber: $('#sign-up-phone-number').val()
      }
    }
    Discovr.Models.currentUser.fetch({
      url: '/users',
      data: userObject,
      type: 'post',
      success: function() {
        this.closeModal();
      }.bind(this)
    });

  },

  signUserIn: function() {
    event.preventDefault();

    var user = {
      email: $('#sign-in-email').val(),
      password: $('#sign-in-password').val()
    }

    Discovr.Models.currentUser.fetch({
      url: '/sessions',
      data: user,
      type: 'post',
      success: function() {
        var genres = [];
        Discovr.Models.currentUser.get('genres').forEach(function(element) {
          genres.push({name: element});
        });

        Discovr.Collections.genres.reset(genres);
        this.closeModal();
      }.bind(this)
    })
  },

  closeModal: function() {
    this.$el.empty();
    this.$el.hide();
  }

});
