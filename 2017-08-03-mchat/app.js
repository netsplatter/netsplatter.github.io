var HISTORY_PATH = 'history.log'
  , LINE_BREAK = '\r\n';

var http = require("https")
  , express = require("express")
  , fs = require('fs')
  , io = require('socket.io');

var app = express()
  , port = process.env.PORT || 5000
  , http_server = http.createServer(app)
  , socket_server;

app.use(express.static(__dirname + "/"));
app.use(express.static('public'));

http_server.listen(port);
socket_server = io.listen(http_server);

console.log("http server listening on %d", port);

var connection_counter = 0,
    history_stream = fs.createWriteStream(HISTORY_PATH, {
        'flags': 'a'
    });

socket_server.on('connection', function(socket) {
    // Обновленное кол-во подключенных юзеров рассылаем всем
    socket_server.sockets.emit('users_online', ++connection_counter);
    // Сообщение о новом юзере рассылаем всем, кроме текущего сокета
    socket.broadcast.emit('sys_message', 'adept is connected!');

    socket.on('chat_message', function(msg) {
        socket_server.emit('chat_message', msg);
        history_stream.write(msg + LINE_BREAK);
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('sys_message', 'adept is disconnected!');
        socket.broadcast.emit('users_online', --connection_counter);
    });

    socket.on('fetch_history', function(cb) {
      fs.readFile('history.log', function(err, data) {
          if (err) throw err;
          cb(data.toString().split(LINE_BREAK));
      })
    })
});