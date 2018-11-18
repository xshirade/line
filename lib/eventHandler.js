const cheerio = require('cheerio');
const { client } = require('./line');

const request = require('./request')

const eventHandler = (event, callback) => {
    const text = event.message.text;
    if (text.match(/教えて/) !== null) {
        request.get((err, body) => {
            if (err) {
                callback(err);
            }
            const $ = cheerio.load(body);
            const title = $('.event_name').innerText;
            console.log(title);
            const text = title.match(/空/) ? `${title.match(/^【.+】(.+)$/)[1]}にキャンセルが出ました！\n${process.env.URL}` : `${title.match(/^【.+】(.+)$/)[1]}は満員です！`;
            callback(null, client.replyMessage(event.replyToken, {
                type: 'text',
                text: text
            }));
        })
    } else {
        callback(null, client.replyMessage(event.replyToken, {
            type: 'text',
            text: '寝てないよ！開発中だよ！'
        }));
    }
};

module.exports = eventHandler;