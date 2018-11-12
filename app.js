const express = require('express');
const { middleware } = require("@line/bot-sdk");

const app = express();
const eventHandler = require('./lib/eventHandler.js')

app.use('/webhook', middleware({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
}), (req, res) => {
    const events = req.body.events;
    Promise.all(events.map(eventHandler)).then(() => {
        res.sendStatus(200);
    });
});

module.exports = app;
