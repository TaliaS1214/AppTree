// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require handlebars
//= require_self
//= require_tree ./backbone/routers
//= require_tree ./backbone/models
//= require_tree ./backbone/collections
//= require_tree ./backbone/views
//= require_tree ./templates
//= require foundation
//= require_tree .

Discovr = {
  Models:      {},
  Collections: {},
  Views:       {},
  Routers:     {}
};

$(function() {
  $(document).foundation();

  Discovr.Routers.user = new Discovr.Routers.User();
  Discovr.Routers.app = new Discovr.Routers.App();
  Backbone.history.start();

  var genres = new Discovr.Collections.Genre();
  genres.fetch({
    success: function() {
      var genreListView = new Discovr.Views.GenreList({collection: genres});
    }
  });
});
