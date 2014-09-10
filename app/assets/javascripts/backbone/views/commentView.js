Discovr.Views.Comment = Backbone.View.extend({
  tagName: 'li',
  className: 'review',
  initialize: function() {
    this.template = HandlebarsTemplates['comments/comment'];
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.render);
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }
});
