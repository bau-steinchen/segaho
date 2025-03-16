const { Server } = require("socket.io");
const Game = require(".././models/game");
const docker = new (require("dockerode"))();

let playerQueue = [];
const MAX_Player = 2;

module.exports = (io) => {
    const queueNamespace = io.of("/queue/join");

    queueNamespace.on("connection", (socket) => {
        console.log("New player joined Queue:", socket.id);

        socket.on("searchMatch", async (userId) => {
            console.log(`Startet searching for player: ${userId}`);
            playerQueue.push({ userId, socket });

            if (playerQueue.length >= MAX_Player) {
                const player = playerQueue.splice(0, MAX_Player);
                const playerIds = player.map(p => p.userId);

                console.log(`Match found: ${playerIds}`);
                const gameInfo = await starteSpielServer(playerIds);

                player.forEach(p => p.socket.emit("foundMatch", gameInfo));
            }
        });

        socket.on("disconnect", () => {
            playerQueue = playerQueue.filter(p => p.socket !== socket);
            console.log("PlayerLeft:", socket.id);
        });
    });
};

// Docker-Game-Server start
async function startMatchServer(playerIds) {
    try {
        console.log("Start new Matchserver...");

        const container = await docker.createContainer({
            Image: "hello-world", // default test image
            ExposedPorts: { "3000/tcp": {} },
            HostConfig: { PortBindings: { "3000/tcp": [{ HostPort: "" }] } }
        });

        await container.start();
        const details = await container.inspect();

        const ip = details.NetworkSettings.IPAddress;
        const port = Object.keys(details.NetworkSettings.Ports)[0].split("/")[0];

        const newGame = await Game.create({
            gameId: container.id,
            containerId: container.id,
            ip,
            port,
            players: playerIds,
            status: "running"
        });

        console.log("Match starting up:", newGame);
        return { ip, port, gameId: newGame.gameId };
    } catch (err) {
        console.error("Error at starting Match server:", err);
        return null;
    }
}
