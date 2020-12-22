const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// Initializations
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Settings
app.set('port', process.env.PORT || 3000);

// Static file
app.use(express.static(path.join(__dirname, 'public'))); //determine the location of the public files

// Ssockets
require('../src/public/js/sockets')(io);

// Starting the server
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

