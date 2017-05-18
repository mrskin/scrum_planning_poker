var express = require('express'),
    app     = express(),
    config  = require('./config'),
    ws      = require('socket.io')(),
    sockets = {},
    server  = null,
    userUniqueId = 0;


console.log('===================== Websockets Server Starting =====================');
console.log("\tSockets:");
console.log("\t\tChannel: " + config.socket.channel);
console.log("\t\tConnection: ws://" + config.socket.host + ":" + config.socket.port);
server = ws.listen(config.socket.port);

console.log('===================== Web Server Starting =====================');
console.log("\tConnection: //0.0.0.0:" + config.web.port);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.get('/',function(req,res){
  res.sendFile('index.html');
});
app.listen(config.web.port);


/* Websockets Handler */
var currentTitle = null,
    currentUsers = function() {
      var list = [];
      for(var i in sockets) {
        list.push(sockets[i].data);
      }
      return list;
    },
    logUserIn = function(socket) {
      socket.send('users:list', currentUsers());
      socket.send('title:update', currentTitle);
    };

server.on('connection', function(socket) {
  var socketId = socket.id,
      user_id;

  socket.on('rt.user', function(message) {
    userUniqueId++;
    if (message.id) {
      user_id = message.id;
      userUniqueId = userUniqueId * 2;
    } else {
      user_id = message.id = userUniqueId;
    }

    console.log("Socket Event: Connect [" + JSON.stringify(message) + "]");
    username = message.username;

    sockets[socketId] = { data: message, socket: socket };
    socket.send('authorized', message);
    ws.sockets.send('users:add', message);
    logUserIn(socket);
  });

  socket.on('rt.title', function(message) {
    console.log("Socket Event: Update Title [" + message + "]");
    currentTitle = message;
    ws.sockets.send('title:update', message);
  });

  socket.on('rt.vote', function(message) {
    console.log("Socket Event: Update Vote [" + message + "]");
    sockets[socketId].data.vote = message;
    ws.sockets.send('vote:update', {
      id: sockets[socketId].data.id,
      vote: message
    });
  });

  socket.on('disconnect',function(){
    console.log("Socket Event: Disconnect");
    ws.sockets.send('users:remove', user_id);
    delete sockets[socketId];
  });

  socket.on('message', function(message) {
    console.log('message!', JSON.stringify(message));
  });
});
