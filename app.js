const express = require('express');
const app = express();
require('./lib/cron');

app.get('/health', (_, res) => {
    res.sendStatus(200);
});

module.exports = app;
