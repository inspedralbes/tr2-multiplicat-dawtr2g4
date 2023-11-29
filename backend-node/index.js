const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io'); // npm install socket.io --> That will install the module and add the dependency to package.json

const app = express();
const server = createServer(app); // Express initializes app to be a function handler that you can supply to an HTTP server
//const io = new Server(server); // We initialize a new instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Reemplaza con la URL de tu aplicación Vue.js
    methods: ["GET", "POST"]
  }
});
const port = 3000 //node és el seu propi servidor. a la nostra aplicació que escolti per aquest port

app.get('/', (req, res) => { // We define a route handler / that gets called when we hit our website home.
    res.sendFile(join(__dirname, 'index.html')); // We serve index.html file
});

io.on('connection', (socket) => { // We listen on the connection event for incoming sockets and log it to the console.
    console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('seleccionar base', (msg) => {
    io.emit('seleccionar base', msg);
  });
  
});

server.listen(port, () => { // We make the http server listen on port 3000.
  console.log('server running at http://localhost:3000');
});

