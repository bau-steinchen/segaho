const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameId: String,
    containerId: String,
    containerName: String,
    ip: String,
    port: Number,
    players: [String], // contains Player-IDs
    status: { type: String, enum: ["waiting", "running", "finished"], default: "waiting" }
});

module.exports = mongoose.model("Game", gameSchema);
