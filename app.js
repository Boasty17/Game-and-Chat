var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
var users = 0;
io.sockets.on('connection', function (client) {
    console.log(client);
    users++;
    console.log(users)
    client.on('count', function () {
        client.emit('count', users);
    })
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