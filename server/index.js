const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');

const router = require("./router");
const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
// usado para requests em tempo real

app.use(cors());

// socketio config
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

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

    callback();
  });

  // aguardando o evento de envio no backend
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("Desconectado");
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
