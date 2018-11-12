const { Client } = require("@line/bot-sdk");
const client = new Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET 
});

const eventHandler = event => {
    const text = event.message.text;
    if (text.match(/確認して/) !== null) {
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: '確認するからちょっと待ってね！'
        });
    } else {
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: '寝てないよ！開発中だよ！'
        });
    }
};

module.exports = eventHandler;