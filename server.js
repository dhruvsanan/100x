const express = require( 'express');
const http = require('http' ); 
const socketIo = require( 'socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
let onlineUsers = 0;
io.on('connection', (socket) => {
    onlineUsers++; // Increase the count when a user connects
    io.emit('update users', onlineUsers); 
    console.log(onlineUsers);
    console.log('a user connected'); 
    socket.on('disconnect', () => {
        onlineUsers--; // Decrease the count when a user disconnects
        io.emit('update users', onlineUsers); 
        console.log( 'user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log( `Server is running on http://localhost:${PORT}`);
});
