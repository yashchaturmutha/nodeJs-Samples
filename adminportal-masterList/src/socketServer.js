const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const port = 3001;
const cors = require("cors");
app.use(cors());

const io = new Server(http, {
  cors: {
    origin: "http://192.168.1.68:3000",
    methods: ["GET", "POST"],
    pingTimeout: 1000,
    pingInterval: 500
  },
});
let masterRegex = /master/;
let targetRegex =- /target/;

io.on("connection", (socket) => {
  console.log("User connected with id: " + socket.id, "SocketDetails => ", socket, socket.handshake.query.token);
  try {
    if ((socket?.handshake?.query?.token != "master" || socket?.handshake?.query?.token != 'target')) {
      console.log("token not present or incorrect token");
      socket.emit("unauthorisedUser", { message: 'user is not authorised' });
      // socket.emit("close" , {message: 'Disconnect socket'});
      return;
    }
  } catch (error) {
    console.log("In error: Token not present or some error")
    socket.emit("unauthorisedUser", { message: 'user is not authorised' });
    socket.emit("close" , {message: 'Disconnect socket'});
    return;
  }

  socket.on("disconnect", () => {
    console.log(`user disconnected with id: ${socket.id}`);
  });
  socket.on("joinRoom", (data) => {
    console.log("data=========", data);
    let rooms = data.prevrooms;
    socket.join(rooms);
    let noOfUser = io.sockets.adapter.rooms.get(data.roomno).size;
    if(noOfUser > 3) {
      socket.emit("close" , {message: 'Disconnect socket'});
      return;
    }
    io.to(data.roomno).emit("noofuser", io.sockets.adapter.rooms.get(data.roomno).size);
    for (let room in rooms) {
      socket.to(room).emit("userjoinedroomno", { message: data.message });
    }
    // socket.to(data.lane).emit("userjoinedlaneno",{message: data.message})
    // socket.to(data.roomno).emit("userjoinedroomno",{message: data.message})
  });
  socket.on("sendMessage", (data) => {
    console.log("data++++", data)
    // io.to(data.roomno).emit("messageSent", {
    socket.to(data.roomno).emit("messageSent", {
      username: data.username,
      message: data.message,
      messagelist: data.messagelist
    });
  });
  socket.on("leavechat", (data) => {
    rooms = [data.roomno, data.laneno]
    socket.leave(rooms);
    // socket.leaveAll();
    socket.disconnect();
    //  socket.to(data.laneno).emit("userleftlaneno",{username:data.username});
    //  socket.to(data.roomno).emit("userleftroomno",{username:data.username});
    io.to(data.laneno).emit("userleftlaneno", { username: data.username });
    io.to(data.roomno).emit("userleftroomno", { username: data.username });
    io.to(data.roomno).emit("noofremaininguser", io.sockets.adapter.rooms.get(data.roomno).size)
  })
});

http.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
