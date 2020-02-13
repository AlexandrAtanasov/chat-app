const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

// set the port number for prod and for local usage  
const PORT = process.env.PORT || 5000 ;

// connect the created express router
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set up socketio.io 
io.on('connection', (socket) => {
    
    // watching a specific socket for a join event 
    socket.on('join', ( {name, room}, callback ) => {
        const { error, user } = addUser( {id: socket.id, name, room});

        if (error) return callback(error);

        // welcome message for a specific user
        // emmit evet from back to front
        socket.emit('message', {user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
        // information message for everyone in the room
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} join the room}`})

        // joining user to the room
        socket.join(user.room);

        callback();
    });

    // waiting on back for a user message sending
    socket.on('sendMessage', (message, callback) => {
        // identify a specific user
        const user = getUser(socket.id);

        io.to(user.room).emit('message',  {user: user.name, text: message});

        callback();
    })

    // watching a specific socket for a disconnection 
    socket.on('disconnect', () => {
        console.log('User has left!');
    })
});

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port - ${PORT}`);
});