// importing all libraries and packages

const http =  require("http");
const express = require("express");
const path = require('path');
// const io = require('socket.io')(server);


// setup app with express and creating server
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");

//creating io instance for further use
const io = new Server(server);


app.use(express.static(path.resolve("./")));

//index html file path
app.get("/" ,(req , res)=> {
          return res.sendFile("/index.html");
});

// connection establishment in port 9000 , you can give any port number for localhost
server.listen(9000 ,() =>  console.log('server started at PORT :9000'));

//making connection and emit messages to all user
// io.on('connection' , (socket) => {
//           socket.on("user-message" , (message) => {
//                     io.emit("message", message);
//           });
// });


io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        io.emit('message', message); // Broadcast the message to all clients
    });
});


