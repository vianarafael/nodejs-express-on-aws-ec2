const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.static(__dirname + "/build"));
app.get("/test", (req, res) => {
  res.send("<h1>Chess App</h1> <h4>This is a test</h4> <p>Version 0.0</p>");
});

const server = app.listen(port, () => {
  console.log(`Demo app is up and listening to port: ${port}`);
});

// socket setup
const io = socket(server, {
  cors: {
    origin: "https://chess-backend-2021-rafa.herokuapp.com/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let numClients = 1;

let gameRoom = Math.random();

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);
  numClients++;

  if (numClients > 2) {
    numClients = 1;
    gameRoom = Math.random();
  }

  socket.join(gameRoom);
  io.emit("stats", { numClients, gameRoom });

  socket.on("move", (data) => {
    if (data.gameRoom) io.to(data.gameRoom).emit("move", data);
  });
});
