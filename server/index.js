const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const router = require("./router");
const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
// usado para requests em tempo real

// socketio config
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // mensagem ao usuário
    socket.emit("message", {
      user: "admin",
      text: `Bem vindo(a) ${user.name}, você está na sala ${user.room}`,
    });
    // mensagem aos usuários da sala
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} entrou na sala.` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // aguardando o evento de envio no backend
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} deixou a sala.`,
      });
    }
  });
});

// routes
app.use(router);

//server configs
const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Servidor executando na porta ${PORT}`);
  }
});
