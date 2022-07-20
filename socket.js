const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

const io  = require("socket.io")(server,{
    cors:{origin:"*"}
});

var defaultTasks = {
    getAllTasks: '        <div class="column" id="allTasks">\n' +
        '\n' +
        '                <h1>All Tasks</h1>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="column" >\n' +
        '\n' +
        '                <h1>InProgress</h1>\n' +
        '\n' +
        '        </div>\n' +
        '        <div class="column">\n' +
        '\n' +
        '                <h1>Hold</h1>\n' +
        '\n' +
        '        </div>\n' +
        '        <div class="column">\n' +
        '\n' +
        '                <h1>Completed</h1>\n' +
        '\n' +
        '        </div>\n' +
        '        <div class="column">\n' +
        '\n' +
        '                <h1>Cancelled</h1>\n' +
        '\n' +
        '        </div>'
};

io.on("connection", (socket) => {

    socket.on("send", (arg) => {
        defaultTasks = arg;
        io.sockets.emit("displayAllTasks", arg);
    });

    socket.on("getAll", (arg) => {
        socket.emit("displayAllTasks", defaultTasks);
    });

});

