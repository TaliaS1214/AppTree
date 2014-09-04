Discovr.Views.AppShow = Backbone.View.extend({
  el: '#app-list-container',

  initialize: function() {
    this.appShowTemplate = HandlebarsTemplates['apps/expanded'];
    this.render();
  },

  events: {
    'click .send-to-device': 'sendToDevice'
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
  }
});
