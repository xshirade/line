const { Client } = require("@line/bot-sdk");
const client = new Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
});

const eventHandler = event => { 
    client.replyMessage(event.replyToken, {
        type: 'text',
        text: '寝てないよ！開発中だよ！'
    });
};

module.exports = eventHandler;