var express = require('express'),
    app     = express(),
    config  = require('./config');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.listen(config.port);
console.log('listening on port ' + config.port);
