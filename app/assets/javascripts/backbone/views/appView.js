Discovr.Views.App = Backbone.View.extend({
  className: 'app-single',

  initialize: function() {
    this.appTemplate = HandlebarsTemplates['apps/small'];
    //this.searchBarTemplate = HandlebarsTemplates['apps/search'];
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  events: {
    'click .upvote-button' : 'increaseUpvoteCount',
    'click .send-to-device' : 'sendToDevice'
  },

  render: function() {
    this.$el.html(this.appTemplate(this.model.toJSON()));
  },

  increaseUpvoteCount: function() {
    if (this.model.get('id')){
      this.model.fetch({
        url: '/apps/' + this.model.id + '/upvote',
        type: 'put',
      });
    }
    else {
      this.model.save();
    }

  },

  sendToDevice: function() {
    $.ajax( '/apps/'+ this.model.id + '/send', {
      type: 'put'
    });
  }

});
