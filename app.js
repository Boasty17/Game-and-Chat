var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (client) {
    console.log('on connect')
    client.on('message', function (message) {
        try {
            //посылаем сообщение себе
            client.emit('message', message);
            //посылаем сообщение всем клиентам, кроме себя
            client.broadcast.emit('message', message);
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
});
server.listen(PORT);