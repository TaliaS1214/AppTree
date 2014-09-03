Discovr.Views.Modal = Backbone.View.extend({
  el: '.modal',

  initialize: function() {

  },

  events: {
    'click #form-sign-up-button' : 'createUser',
    'click #form-sign-in-button' : 'signUserIn',
    'click .close' : 'closeModal'
  },

  createUser: function() {
    event.preventDefault();

    Discovr.Routers.app.navigate('');

    var userObject = {
      user: {
        email: $('#sign-up-email').val(),
        password: $('#sign-up-password').val(),
        password_confirmation: $('#sign-up-password-confirmation').val(),
        phone_number: $('#sign-up-phone-number').val()
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

    Discovr.Routers.app.navigate('');

    var user = {
      email: $('#sign-in-email').val(),
      password: $('#sign-in-password').val()
    }

    Discovr.Models.currentUser.fetch({
      url: '/sessions',
      data: user,
      type: 'post',
      success: function() {
        Discovr.Routers.app.navigate('');
        Discovr.Views.genreList.renderAll();
        this.closeModal();
      }.bind(this)
    });
  },

  closeModal: function() {
    this.$el.empty();
    this.$el.hide();
  }

});
