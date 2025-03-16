require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDb = require("./database/connection");

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDb().then(() => {
    console.log("MongoDb connected");
});

// Namespace for /queue/join
require("./socketio/queue")(io);

const PORT = 8080;

//Routes
app.use('/queue', require('./routes/queue'));
app.use('/match', require('./routes/match'));

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));