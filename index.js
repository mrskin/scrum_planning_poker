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
var currentTitle = {},
    ROOM_PREFIX = 'rt.room_',
    isEmptyRoom = function(room) {
      var empty = true;
      for(var i in sockets) {
        if (sockets[i].data.room == room) {
          empty = false;
        }
      }
      return empty;
    },
    removeRoom = function(room) {
      delete currentTitle[ room ];
      return true;
    },
    sendToRoom = function(room, key, message) {
      ws.sockets
        .in(ROOM_PREFIX+room)
        .send(key, message);
    },
    currentUsers = function(room) {
      var list = [];
      for(var i in sockets) {
        if (sockets[i].data.room == room) {
          list.push(sockets[i].data);
        }
      }
      return list;
    },
    logUserIn = function(socket, message) {
      socket.join(ROOM_PREFIX + message.room);
      socket.send('authorized', message);
      console.log("Socket Event: Connect [" + JSON.stringify(message) + "]");

      sendToRoom(message.room, 'users:list', currentUsers(message.room));
      sendToRoom(message.room, 'title:update', currentTitle[message.room]);
    };

server.on('connection', function(socket) {
  var socketId  = socket.id,
      user_id   = Math.random().toString(36).slice(2),
      room      = null;

  // Users Join a Room & Logs in.
  socket.on('rt.user', function(message) {
    // Data
    room = message.room;
    if (message.id) {
      user_id = message.id;
    } else {
      message.id = user_id;
    }

    sockets[socketId] = { data: message, socket: socket };
    logUserIn(socket, message);
  });

  socket.on('rt.title', function(title) {
    console.log("Socket Event: Update Title [" + title + "]");
    currentTitle[room] = title;
    sendToRoom(room, 'title:update', title);
  });

  socket.on('rt.vote', function(value) {
    console.log("Socket Event: Update Vote [" + value + "]");

    var data = {
      id: sockets[socketId].data.id,
      vote: value
    };
    sockets[socketId].data.vote = value;
    sendToRoom(room, 'vote:update', data);
  });

  socket.on('disconnect',function(){
    console.log("Socket Event: Disconnect");
    sendToRoom(room, 'users:remove', user_id);
    delete sockets[socketId];
    if (isEmptyRoom(room)) {
      removeRoom(room);
    }
  });

  socket.on('message', function(message) {
    console.log('message!', JSON.stringify(message));
  });
});
