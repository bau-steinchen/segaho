const express = require('express');
const router = express.Router();
//const server = require(".././server/matchServer");

router.post("/start", async (req, res) => {
    const { players } = req.body;

    if (!players || players.length === 0) {
        return res.status(400).json({ error: "No Players Found" });
    }

    //const gameInfo = await server.startMatchServer(players);
    //if (!gameInfo) return res.status(500).json({ error: "Cannot start match successfull" });

    //res.json(gameInfo);
    res.json(true);
})

module.exports = router;