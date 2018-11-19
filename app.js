const express = require('express');
const async = require('async');

require('./lib/cron');
const app = express();
const line = require('./lib/line');
const eventHandler = require('./lib/eventHandler.js');

app.use('/health', (req, res) => {
    res.sendStatus(200);
});

app.use('/webhook', line.middleware, (req, res) => {
    async.map(req.body.events, eventHandler, (err, events) => {
        err ? res.statusCode(500).send(err.toString()) : Promise.all(events).then(() => res.sendStatus(200))
    });
});

module.exports = app;
