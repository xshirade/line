const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const line = require("@line/bot-sdk");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/webhook', line.middleware({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
}), (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = app;
