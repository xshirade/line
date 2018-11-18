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
            const text = $('.event_name').text().replace(/\s+/g, '');
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