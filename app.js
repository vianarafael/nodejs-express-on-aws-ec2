const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(
    "<h1>Express Demo App</h1> <h4>Message: Is this working?</h4> <p>Version 42.0</p>"
  );
});

app.get("/products", (req, res) => {
  res.send([
    {
      productId: "101",
      price: 100,
    },
    {
      productId: "102",
      price: 150,
    },
  ]);
});

const server = app.listen(port, () => {
  console.log(`Demo app is up and listening to port: ${port}`);
});

app.use(cors());

// socket setup
const io = socket(server, {
  cors: {
    origin: "https://multi-chess.s3.us-east-2.amazonaws.com/index.html",
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
