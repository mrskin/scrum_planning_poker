App.Router = (function() {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'create',
      '*room': 'room'
    }
  });

  return Router;
})();
