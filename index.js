var app = require('express')();

var http = require('http').Server(app);
// 此处将Http 绑定到 app中
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", function (socket) {
    console.log("a user connected");

    // 此处来监听网页发过来的数据,按照频道来区分发送过来的数据
    socket.on('chat message', function (msg) {
        // 此处将数据发送给所有的网页端
        console.log("message: " + msg);
        io.emit('chat message', msg);
    });
});

http.listen(port, function () {
    console.log('Listening on * : ' + port);
});


