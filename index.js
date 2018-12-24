var express = require('express');
var socket = require('socket.io');

// App setup

var app = express();
var server = app.listen(5000, () => {
   console.log('App is listening to 5000');
});


// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);
io.on('connection',  (sc) => {
   console.log('Made socket connection',sc.id);
   sc.on('chat', (data) => {
      io.sockets.emit('chat', data);
   });

   sc.on('typing', (data) => {
      sc.broadcast.emit('typing', data);
   })
})