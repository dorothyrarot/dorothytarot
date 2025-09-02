const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("사용자 접속:", socket.id);

  socket.on("pickCard", (card) => {
    io.emit("pickCard", card);
  });

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", { user: socket.id, text: msg });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`서버 실행중: ${PORT}`));
