const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const router = require("./router");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
// usado para requests em tempo real

// socketio config
io.on("connection", (socket) => {
  console.log("Conectado");
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
