App.Router = (function() {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'create',
      '*room': 'roomNumber'
    }
  });

  return Router;
})();
