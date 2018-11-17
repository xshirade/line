const { Client, middleware } = require("@line/bot-sdk");

const credential = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
};
const client = new Client(credential);
const middleware = middleware(credential);

module.exports = {
    client,
    middleware
}