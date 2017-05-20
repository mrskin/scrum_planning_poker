window.App = {
  vent: _.extend({}, Backbone.Events),
  socket: io.connect(location.origin.replace(/^http/, 'ws')),
  Cards: [0, '.5', 1, 2, 3, 5, 8, 13, 20, 40, 100]
};
