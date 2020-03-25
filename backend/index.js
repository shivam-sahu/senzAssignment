const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3003;
const {
  registeringDevice
} = require("./sender");
const {
  registerReceiver,
} = require("./receiver.js");


io.on("connection", socket=>{
  console.log("A user connected");
  socket.on("send",  msg => {
    registeringDevice(msg);
  });
  socket.on("receive",async msg => {
    registerReceiver(msg).then(data =>{
      io.emit('receive', data);
    })
  });
});

server.listen(port, ()=>console.log("server running on port "+ port));