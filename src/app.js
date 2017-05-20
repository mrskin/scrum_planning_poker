App.vent    = _.extend({}, Backbone.Events);
App.socket  = io.connect(window.location.protocol+'//'+window.location.hostname+':1625');

$(document).ready(function() {
  var USER_ROOM_ID = null,
      socket      = App.socket,
      users       = new App.UsersCollection(),
      story       = new App.StoryModel(),
      pokerView   = new App.MainView({ collection: users,
                                       model: story,
                                       socket: socket}),
      loginView   = new App.LoginScreen(),
      router      = new App.Router();

  /* Reusable Methods */
  var render = function(view) {
        $('#content').html(view.render().el);
      },
      fetchUserFromCookie = function() {
        if ($.cookie('_user')) {
          try {
            return JSON.parse($.cookie('_user'));
          } catch(e) {
            return {};
          }
        } else {
          return {};
        }
      },
      storeUser = function(user) {
        data = _.omit(user, 'room', 'id');
        $.cookie('_user', JSON.stringify(data), { expires: 7 * 4 });
      },
      authenticated = function() {
        return !!user.username;
      },
      user = fetchUserFromCookie();

  /* App Listener */
  App.vent.on('user:login', function(username, type) {
    user = { username: username,
             type: type,
             room: USER_ROOM_ID };

    storeUser(user);
    socket.emit('rt.user', user);
  });

  App.vent.on('user:logout', function() {
    storeUser({});
    location.reload();
  });


  /* Socket Listeners */
  socket.on('reconnect', function() {
    socket.emit('rt.user', user);
    // We need to let the server know?
    // socket.emit('rt.title', story.get('title'));
  });

  socket.on('disconnect', function() {
    /* Show D/C overlay */
  });

  socket.on('message', function(title, message) {
    switch(title) {
      case 'authorized':
        user = message;
        story.set('username', message.username);
        story.set('type', message.type);
        render(pokerView);
        break;
    }
  });

  /* Router */
  router.on('route:create', function(actions) {
    router.navigate(Math.random().toString(36).slice(2), {trigger: true});
  });

  router.on('route:roomNumber', function(room) {
    USER_ROOM_ID = room;
    if (authenticated()) {
      App.vent.trigger('user:login', user.username, user.type);
    } else {
      render(loginView);
    }
  });
  Backbone.history.start();
});
