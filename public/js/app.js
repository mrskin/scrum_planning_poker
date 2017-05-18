App.vent = _.extend({}, Backbone.Events)

$(document).ready(function() {
  var socket    = io.connect(window.location.protocol+'//'+window.location.hostname+':1625'),
      loginView = new App.LoginScreen(),
      users     = new App.UsersCollection(),
      story     = new App.StoryModel(),
      pokerView = new App.PokerView({collection: users, model: story}),
      render    = function(view) {
        $('#content').html(view.render().el);
      },
      addUser   = function(user) {
        var exists = !!users.find({id: user.id});
        if (!exists) { users.add(user); }
      },
      updateVote = function(data) {
        model = users.find({id: data.id});
        model.set('vote', data.vote);
      },
      currentUser = {};

  App.vent.on('user:login', function(username, type) {
    console.log('Login', username, type);
    socket.emit('rt.user', { username: username,
                             type: type });
  });

  App.vent.on('title:changed', function(value) {
    socket.emit('rt.title', value);
  });

  App.vent.on('vote:selected', function(value) {
    socket.emit('rt.vote', value);
  });

  /* Socket Event Handlers */
  socket.on('connect', function() {
    console.log('connected.');
    if (currentUser.username) {
      socket.emit('rt.user', currentUser);
    }
  });

  socket.on('reconnect', function() {
    console.log('reconnect!');
    socket.emit('rt.title', story.get('title'));
  });

  socket.on('connect_error', function() {
    console.log('connect_error!');
  });

  socket.on('disconnect', function() {
    pokerView.remove();
  });

  socket.on('message', function(title, message) {
    console.log('message:', arguments);
    switch(title) {
      case 'title:update':
        story.set('title', message);
      case 'users:remove':
        users.remove(message);
        break;
      case 'users:add':
        addUser(message);
        break;
      case 'users:list':
        _.each(message, function(user) {
          addUser(user);
        });
        break;
      case 'authorized':
        currentUser = message;
        render(pokerView);
        break;
      case 'vote:update':
        updateVote(message)
        break;
    }
  });

  render(loginView);
});
