require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + "/assets"));

io.on("connection", (socket) => {
  socket.on("chat message", (data) => {
    io.emit("chat message", {
      messages: data.messages,
      name: data.name,
    });
  });
});

http.listen(process.env.PORT, () => {
  console.log("Server started port:", process.env.PORT);
});
