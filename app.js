const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const line = require("@line/bot-sdk");

const app = express();

app.use(logger('dev'));

app.use('/webhook', line.middleware({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
}), (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

module.exports = app;
