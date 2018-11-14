const express = require('express');
const async = require('async');
const { middleware } = require("@line/bot-sdk");

const app = express();
const eventHandler = require('./lib/eventHandler.js')

app.use('/health', (req, res) => {
    res.sendStatus(200);
});

app.use('/webhook', middleware({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
}), (req, res) => {
    async.map(req.body.events, eventHandler, (err, events) => {
        err ? res.statusCode(500).send(err.toString()) : Promise.all(events).then(() => res.sendStatus(200))
    });
});

module.exports = app;
