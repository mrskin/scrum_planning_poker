App.vent = _.extend({}, Backbone.Events)

$(document).ready(function() {
  var loginView = new App.LoginScreen();
  var render = function(view) {
    $('#content').html(view.render().el);
  };


  App.vent.on('user:login', function(username) {
    console.log('Login', username);
  });

  render(loginView);
});
