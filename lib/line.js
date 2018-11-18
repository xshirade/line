const line = require("@line/bot-sdk");

const credential = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
};
const client = new line.Client(credential);
const middleware = line.middleware(credential);

module.exports = {
    client,
    middleware
}