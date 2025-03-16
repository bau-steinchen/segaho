const express = require('express');
const router = express.Router();
//default route
router.get('/', (req, res) => {
    console.log('request was made: /default' + req.url)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
})

//queue status
router.get('/status', (req, res) => {
    console.log('request was made: /default' + req.url)
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var json = { status: 'success' };
    res.end(JSON.stringify(json));
})

module.exports = router;